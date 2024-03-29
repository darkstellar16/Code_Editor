const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const ACTIONS = require("./src/Action");


const server = http.createServer(app, {
    cors: {
        origin: "http://localhost:3000"
    }
});
const io = new Server(server);

const userSocketMap = {};

const getAllClients = (roomID) => {
    console.log(roomID);
    // Map (io.socket.adapter.rooms.get(roomID))
    return Array.from(io.sockets?.adapter.rooms.get(roomID) || []).map((socketId) => {
        return {
            socketId,
            userName: userSocketMap[socketId],
        }
    });
}

io.on("connection", (socket) => {
    console.log("socket connected", socket.id);

    socket.on(ACTIONS.JOIN, ({ roomID, userName }) => {
        userSocketMap[socket.id] = userName;
        socket.join(roomID);
        const clients = getAllClients(roomID);

        clients.forEach(({ socketId }) => {
            io.to(socketId).emit(ACTIONS.JOINED, {
                clients,
                userName,
                socketId: socket.id
            })
        })
    })

    socket.on(ACTIONS.CODE_CHANGE, ({ roomID, code }) => {
        console.log("receving", code, roomID);
        socket.in(roomID).emit(ACTIONS.CODE_CHANGE, { code })
    })


    socket.on('disconnecting', () => {
        const rooms = [...socket.rooms];
        rooms.forEach((roomID) => {
            socket.in(roomID).emit(ACTIONS.DISCONNETED, {
                socketId: socket.id,
                userName: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
    })
})



server.listen(5000, () => {
    console.log("server running on 5000");
})
