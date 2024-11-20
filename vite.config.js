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
      console.log('User connected', viewers);
	    io.emit("viewer-update", viewers);

	    socket.on("disconnect", () => {
		    viewers--;
        console.log("User disconnected", viewers);
		    io.emit("viewer-update", viewers);
	    });
    });
  }
}

export default defineConfig({
	plugins: [sveltekit(),webSocketServer]
});
