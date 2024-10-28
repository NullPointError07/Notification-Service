import { NotificationType } from "../enum";
import { NotificationModel } from "../models/notificationModel";

interface LikeData {
  senderId: string;
  receiverId: string;
  postId: string;
  type: NotificationType;
  message: string;
}

export async function likeNotification(data: LikeData) {
  try {
    await NotificationModel.create(data);
  } catch (error) {
    throw new Error("failed to save notification");
  }
}
