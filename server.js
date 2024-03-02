const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");


const server = http.createServer(app, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const io = new Server(server);

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);
})




server.listen(5000, () => {
    console.log("server running on 5000");
})
