import mongoose, { Schema } from "mongoose";
import { NotificationStatus, NotificationType } from "../enum";

interface INotification extends Document {
  senderId: mongoose.Types.ObjectId;
  receiverId: mongoose.Types.ObjectId;
  type: NotificationType;
  status: NotificationStatus;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

const NotificationSchema: Schema = new Schema(
  {
    senderId: { type: Schema.Types.ObjectId, required: true },
    receiverId: { type: Schema.Types.ObjectId, required: true },
    type: { type: String, enum: Object.values(NotificationType), default: NotificationType.SOCIAL },
    status: { type: String, enum: Object.values(NotificationStatus), default: NotificationStatus.UNREAD },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

export const NotificationModel = mongoose.model<INotification>("Notification", NotificationSchema);
