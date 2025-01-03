import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";
import { Server } from "socket.io";

export const webSocketServer = {
  name: "webSocketServer",
  configureServer(server) {
    const io = new Server(server.httpServer);

    let viewers = 0;

    io.on("connection", (socket) => {
      viewers++;
      console.log("User connected", socket.id);
      io.emit("viewer-update", viewers);

      socket.on("message", (message) => {
        if (
          message?.username !== undefined &&
          message?.username.trim() !== ""
        ) {
          io.emit("message", message);
        } else {
          console.log("Non-Empty Username required");
        }
      });

      socket.on("disconnecting", () => {
        viewers--;
        console.log("User disconnected", socket.id);
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
