import express from "express";
import http from "http";
import { Server } from "socket.io";
import { NotificationRouter } from "./src/routes/notificationRouter.js";
import { notificationSocket } from "./src/sockets/notificationSocket.js";

// Initialize Express
const app = express();
const server = http.createServer(app);

app.use(express.json());

// lets just have a router for notification
app.use("/", NotificationRouter);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// lets take notification socket elsewhere , modularized
notificationSocket(io);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
