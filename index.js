import express from "express";
import { Server } from "socket.io";
import { createServer } from "http";
import path from "path";
import cors from "cors";
import { handler } from "./build/handler.js";
import { fileURLToPath } from "url";

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);


app.use(cors());
app.use(handler);

app.use("/img", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "\\static")));
app.use("/hls", express.static(path.join(path.dirname(fileURLToPath(import.meta.url)), "\\hls")));

httpServer.listen(2541, () => {
	console.log("nodejs server running on localhost:2541");
});
