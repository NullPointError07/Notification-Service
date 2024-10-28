import { connectDB } from "@/app/lib/connectDB";
import Post from "@/app/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { postId: string } }) {
  const { postId } = params;

  await connectDB();

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return NextResponse.json({ message: "Post not found" }, { status: 404 });
    }

    post.isLiked = !post.isLiked;
    await post.save();

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Internal server error", error }, { status: 500 });
  }
}
