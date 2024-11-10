import express from "express";
import { Server as SocketIOServer} from "socket.io";
import { createServer } from "http";
import path from "path";
import cors from "cors";
import { handler } from "./build/handler.js";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

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

app.use(handler);
//app.use(cors());
app.use("/hls", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "\\hls")));


httpServer.listen(2541, () => {
	console.log("nodejs server running on localhost:2541");
});
