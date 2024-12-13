import express from "express";
import { Server as SocketIOServer } from "socket.io";
import { createServer } from "http";
import path from "path";
import cors from "cors";
import { handler } from "./build/handler.js";
import { fileURLToPath } from "url";
import supabase from "./supabase.js";
import bodyParser from 'body-parser';

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer);

let viewers = 0;

io.on('connection', (socket) => {
	viewers++;
	console.log('User connected', socket.id);
	io.emit("viewer-update", viewers);

	socket.on("message", (message) => {
		if (message?.username !== undefined || message?.username.trim() !== "") {
			io.emit("message", message);
		} else {
			console.log("asdf");
		}
		//console.log(message)
	});

	socket.on("disconnect", () => {
		viewers--;
		console.log("User disconnected", socket.id);
		io.emit("viewer-update", viewers);
	});
});

app.use(cors());
app.use(bodyParser.json());

app.post("/register", async (req, res) => {
	const { email, password } = req.body;

	const { data, error } = await supabase.auth.signUp({ email, password });

	if (error) return res.status(400).json({ error: error.message });
	res.json({ message: "User registered successfully", data });
});

app.post("/login", async (req, res) => {
	const { email, password } = req.body;

	const { data, error } = await supabase.auth.signInWithPassword({ email, password });

	if (error) return res.status(400).json({ error: error.message });
	res.json({ message: "User logged in successfully", data });
});

app.get("/user", async (req, res) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) return res.status(401).json({ error: "Authorization token is missing" });

	const { data, error } = await supabase.auth.getUser(token);

	if (error) return res.status(400).json({ error: error.message });
	res.json({ message: "User details fetched", data });
});


app.use("/hls", express.static(path.resolve(path.dirname(fileURLToPath(import.meta.url)), "hls")));

app.use(handler);

httpServer.listen(2541, () => {
	console.log("nodejs server running on localhost:2541");
});
