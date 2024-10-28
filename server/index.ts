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

const userSockets = new Map();

io.on("connection", (socket) => {
  console.log("New user connected:", socket.id);

  // registering when new user connects with socket server
  socket.on("register", (userId) => {
    userSockets.set(userId, socket.id);
    console.log(userSockets);
    console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  });

  // Emnitting A Like event from client
  socket.on("like", async (data) => {
    try {
      // Save the notification in the database
      await likeNotification(data);

      // Emit the notification back to the specific client
      const receiverSocketId = userSockets.get(data.receiverId);
      if (receiverSocketId) {
        console.log("---tick tock---");
        socket.to(receiverSocketId).emit("notification", data);
      }

      // Broadcast the notification to all clients, including the receiver
      // will work on it later!
      // io.emit("notification", notification);
    } catch (error) {
      console.error("Failed to handle like notification:", error);
    }
  });

  socket.on("disconnect", () => {
    // Remove the user from userSockets when they disconnect
    for (const [userId, id] of userSockets.entries()) {
      if (id === socket.id) {
        userSockets.delete(userId);
        break;
      }
    }
    console.log("User disconnected:", socket.id);
  });
});

export { io };

app.use("/notification", NotificationRoutes);

// Start the server
const PORT = process.env.PORT || 6969;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
