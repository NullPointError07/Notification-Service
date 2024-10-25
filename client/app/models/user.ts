import mongoose, { Document, Model } from "mongoose";

export interface IUser extends Document {
  username: string;
  password: string;
  email: string;
}

const userSchema = new mongoose.Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
});

const User: Model<IUser> = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
