import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { Server } from "socket.io";

export const webSocketServer = {
  name: "webSocketServer",
  configureServer(server) {
    const io = new Server(server.httpServer);

    let viewers = 0;

    io.on('connection', (socket) => {
      viewers++;
      console.log('User connected', socket.id);
      io.emit("viewer-update", viewers);

      socket.on("message", (message) => {
        io.emit("message", message);
        //console.log(message)
      });

      socket.on("disconnecting", () => {
        viewers--;
        console.log("User disconnected", socket.id);
        io.emit("viewer-update", viewers);
      });
    });
  }
}

export default defineConfig({
  plugins: [sveltekit(), webSocketServer]
});
