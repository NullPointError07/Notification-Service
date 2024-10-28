import { connectDB } from "@/app/lib/connectDB";
import Post, { IPost } from "@/app/models/post";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();
  const { userId, post }: { userId: string; post: string } = await req.json();

  if (!userId || !post) {
    return NextResponse.json({ error: "User ID and post content are required." }, { status: 400 });
  }

  try {
    const newPost: IPost = new Post({ createdBy: userId, post });
    await newPost.save();
    return NextResponse.json({ message: "Post created successfully!" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create post." }, { status: 500 });
  }
}

export async function GET() {
  await connectDB();

  try {
    const posts = await Post.find().populate("createdBy", "username");
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch posts." }, { status: 500 });
  }
}
