import mongoose, { Document, Model } from "mongoose";

export interface IPost extends Document {
  createdBy: mongoose.Types.ObjectId;
  post: string;
  isLiked: boolean;
}

const PostSchema = new mongoose.Schema(
  {
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    post: { type: String, required: true },
    isLiked: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;
