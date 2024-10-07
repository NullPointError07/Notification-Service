import { Server, Socket } from "socket.io";

// imagine 3 topics at the start
const topics = ["topic1", "topic2", "topic3"];

export function notificationSocket(io: Server) {
  io.on("connection", (socket: Socket) => {
    console.log(`User connected: ${socket.id}`);

    socket.on("subscribe", (topic) => {
      if (topics.includes(topic)) {
        socket.join(topic);
        console.log(`User ${socket.id} subscribed to ${topic}`);
        socket.emit("subscriptionSuccess", `Subscribed to ${topic}`);
      } else {
        socket.emit("subscriptionError", "Invalid topic");
      }
    });

    socket.on("unsubscribe", (topic) => {
      if (topics.includes(topic)) {
        socket.leave(topic);
        console.log(`User ${socket.id} unsubscribed from ${topic}`);
        socket.emit("unsubscriptionSuccess", `Unsubscribed from ${topic}`);
      } else {
        socket.emit("unsubscriptionError", "Invalid topic");
      }
    });

    socket.on("sendNotificationToTopic", ({ topic, message }) => {
      if (topics.includes(topic)) {
        console.log(`Sending notification to ${topic}: ${message}`);
        io.to(topic).emit("receiveNotification", { message });
      } else {
        socket.emit("notificationError", "Invalid topic");
      }
    });

    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });
}
