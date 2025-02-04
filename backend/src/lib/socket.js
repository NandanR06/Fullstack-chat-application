import { Server } from "socket.io";
import express from "express";
import http from "http";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});
// online user
export function getReceiverSocketId(userId) {
    return userSocketMap[userId]

}

// getting socket with depend on the user id
const userSocketMap = {};



io.on("connection", (socket) => {
  console.log("A user connected : ", socket.id);

  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id; 
  
  io.emit('getOnlineUsers',Object.keys(userSocketMap));



  socket.on("disconnect", () => {
    console.log("A user disconnected : ", socket.id);

    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap))
  });
});

export { io, server, app };
