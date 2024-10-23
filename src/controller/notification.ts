import { Request, Response } from "express";
import { io } from "../..";

// Send notification to a single user
export const sendNotificationToUser = (req: Request, res: Response) => {
  const { userId, message } = req.body;

  // Emit the message to the specific user via Socket.IO
  io.to(userId).emit("notification", { userId, message });

  res.status(200).json({ success: true, message: `Notification sent to user ${userId}` });
};

// Send notification to multiple users
export const sendNotificationToMultipleUsers = (req: Request, res: Response) => {
  const { message } = req.body;

  // Broadcast the message to all connected clients
  io.emit("notification", { message });

  res.status(200).json({ success: true, message: "Notification sent to multiple users" });
};
