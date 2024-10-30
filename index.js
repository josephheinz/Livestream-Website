const express = require("express");
const path = require("path");
const cors = require("cors");
const app = express();

app.use(cors());

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "index.html"));
});

app.use("/hls", express.static(path.join(__dirname, "hls")));

app.listen(2541, () => {
	console.log("nodejs server running on localhost:2541");
});
