import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { Server } from "socket.io";

export const webSocketServer = {
  name: "webSocketServer",
  configureServer(server) {
    const io = new Server(server.httpServer, {
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
              reason,
              banned_at,
              expires_at,
              banned_by
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

      viewers++;
      io.emit("viewer-update", viewers);

      // Handle incoming messages
      socket.on("message", (message) => {
        if (message?.username !== undefined && message?.username.trim() !== "") {
          io.emit("message", message);
        } else {
          console.log("Non-Empty Username required");
        }
      });

      // Handle disconnection
      socket.on("disconnect", () => {
        viewers--;
        console.log(`User disconnected: ${socket.id}`);
        io.emit("viewer-update", viewers);
      });
    });
  },
};

export default defineConfig({
  plugins: [sveltekit(), webSocketServer],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5173",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
