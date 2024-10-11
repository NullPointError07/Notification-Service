import express from "express";
import http from "http";
import { Server } from "socket.io";
import { registerUser, removeUser } from "./src/services/socket";

const app = express();
const server = http.createServer(app);
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Register user with their ID
  socket.on("register", (userId: string) => {
    registerUser(socket, userId);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
