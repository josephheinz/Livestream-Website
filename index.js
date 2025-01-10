import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import path from "path";
import cors from "cors";
import { handler } from "./build/handler.js";
import { fileURLToPath } from "url";
import supabase from "./supabase.js";
import bodyParser from "body-parser";
import { bannedChat } from "./src/store.js";

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: "*",  // Adjust as necessary
    methods: ["GET", "POST"],
    credentials: true,
  },
  pingInterval: 25_000,
  pingTimeout: 10_000,
});

let viewers = 0;

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  // Check if the user is banned
  supabase
    .from("banned_users")
    .select("reason, banned_at, expires_at, banned_by")
    .eq("user_id", userId)
    .single()
    .then(({ data, error }) => {
      if (data) {
        console.log(data)
        socket.emit("banned", {
          reason: data.reason,
          banned_at: data.banned_at,
          expires_at: data.expires_at,
          banned_by: data.banned_by
        });
        socket.disconnect(true);
      } else {
        console.log(`User ${userId} connected.`);
      }
    })
    .catch((err) => {
      console.error("Error checking banned users", err);
      socket.disconnect(true);
    });

  supabase
    .channel('banned_users_channel')
    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'banned_users' }, (payload) => {
      console.log('User added to banned_users:', payload.new);
      socket.emit('banned', payload.new); // Emit the new banned user data
    })
    .on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'banned_users' }, (payload) => {
      console.log('User removed from banned_users:', payload.old);
      socket.emit('unbanned', payload.new); // Emit the unbanned user data
    })
    .subscribe();


  viewers++;
  io.emit("viewer-update", viewers);

  // Handle incoming messages
  socket.on("message", async (message) => {
    try {
      // Check if the user is banned from sending messages
      const { data: bannedUser } = await supabase
        .from("banned_users")
        .select("user_id")
        .eq("user_id", userId)
        .single();

      if (bannedUser) {
        console.log(`User ${userId} is banned. Message blocked.`);
        return;
      }

      if (message?.username !== undefined && message?.username.trim() !== "") {
        io.emit("message", message);
      } else {
        console.log("Non-Empty Username required");
      }

    } catch (error) {
      console.error("Error checking ban status:", error);
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    viewers--;
    console.log(`User disconnected: ${socket.id}`);
    io.emit("viewer-update", viewers);
  });
});

app.use(cors());
app.use(bodyParser.json());

app.use(
  "/hls",
  express.static(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), "hls")
  )
);

app.use(handler);

httpServer.listen(2541, () => {
  console.log("nodejs server running on localhost:2541");
});
