import express from "express";
import http from "http";
import cors from "cors";
import { Server } from "socket.io";
import { registerUser, removeUser } from "./src/services/socket";
import { NotificationRoutes } from "./src/routes/notificationRouter";
import { connectDB } from "./src/db/connectDB";

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

  // Register user with their ID
  socket.on("register", (userId: string) => {
    registerUser(socket, userId);
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    removeUser(socket.id);
  });
});

export { io };

app.use("/notification", NotificationRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
