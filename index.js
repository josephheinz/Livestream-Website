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

app.use(cors());
app.use(handler);

app.use("/img", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "\\static")));
app.use("/hls", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "\\hls")));

io.on('connection', (socket) => {
	console.log('User connected');

	viewers++;
	io.emit("viewer-update", viewers);

	socket.on("disconnect", () => {
		console.log("User disconnected");
		viewers--;
		io.emit("viewer-update", viewers);
	});
});

app.use('/socket.io/', (req, res, next) => {
    io.engine.handle(req, res);  // Let Socket.IO handle the /socket.io/ requests
	next();
});

app.all('*', (req, res) => {
    return handler(req, res); // Let SvelteKit handle non-Socket.IO requests
});

httpServer.listen(2541, () => {
	console.log("nodejs server running on localhost:2541");
});
