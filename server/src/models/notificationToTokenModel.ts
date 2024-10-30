import mongoose, { Document, Schema } from "mongoose";

interface IUser {
  id: mongoose.Types.ObjectId;
  username: string;
  dp: string;
  token: string;
}

interface IBody {
  senderId: IUser;
  receiverId: IUser;
  message: string;
}

export interface INotificationToToken extends Document {
  body: IBody;
  data: Record<string, any>;
}

const UserSchema: Schema = new Schema(
  {
    id: { type: Schema.Types.ObjectId, required: true },
    username: { type: String, required: true },
    dp: { type: String, required: true },
    token: { type: String, required: true },
  },
  { _id: false }
);

const BodySchema: Schema = new Schema(
  {
    senderId: { type: UserSchema, required: true },
    receiverId: { type: UserSchema, required: true },
    message: { type: String, required: true },
  },
  { _id: false }
);

const NotificationToTokenSchema: Schema = new Schema(
  {
    body: { type: BodySchema, required: true },
    data: { type: Map, of: Schema.Types.Mixed, default: {} },
  },
  {
    timestamps: true,
  }
);

export const NotificationToTokenModel = mongoose.model<INotificationToToken>(
  "NotificationToToken",
  NotificationToTokenSchema
);
