import { NotificationType } from "../enum";
import { NotificationModel } from "../models/notificationModel";

interface LikeData {
  senderId: string;
  receiverId: string;
  postId: string;
  type: NotificationType;
  message: string;
}

// store notification data
export async function likeNotification(data: LikeData) {
  try {
    return await NotificationModel.create(data);
  } catch (error) {
    throw new Error("failed to save notification");
  }
}
