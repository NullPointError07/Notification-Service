import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { NotificationRoutes } from "./src/routes/notificationRouter";
import { connectDB } from "./src/db/connectDB";
import { likeNotification } from "./src/services/likeNotification";

const app = express();
app.use(express.json());
const server = http.createServer(app);

connectDB();

// enabling cors for all request
app.use(
  cors({
    origin: "*",
  })
);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // Emnitting A Like event from client
  socket.on("like", (data) => {
    likeNotification(data);
  });
});

export { io };

app.use("/notification", NotificationRoutes);

// Start the server
const PORT = process.env.PORT || 6969;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
