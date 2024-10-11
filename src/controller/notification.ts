import { Request, Response } from "express";
import { getUserSocketId } from "../services/socket";

interface NotificationRequest extends Request {
  body: {
    userId?: string;
    userIds?: string[];
    message: string;
  };
}

export const sendNotificationToSingleUser =
  (io: any) =>
  (req: NotificationRequest, res: Response): void => {
    const { userId, message } = req.body;
    const socketId = getUserSocketId(userId!);

    if (socketId) {
      io.to(socketId).emit("notification", { message });
      res.status(200).json({ success: true, message: "Notification sent to user!" });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  };

export const sendNotificationToMultipleUsers =
  (io: any) =>
  (req: NotificationRequest, res: Response): void => {
    const { userIds, message } = req.body;
    let notifiedUsers: string[] = [];
    let failedUsers: string[] = [];

    userIds?.forEach((userId) => {
      const socketId = getUserSocketId(userId);
      if (socketId) {
        io.to(socketId).emit("notification", { message });
        notifiedUsers.push(userId);
      } else {
        failedUsers.push(userId);
      }
    });

    res.status(200).json({
      success: true,
      message: "Notification sent to multiple users!",
      notifiedUsers,
      failedUsers: failedUsers.length > 0 ? failedUsers : "None",
    });
  };
