import { connectDB } from "@/app/lib/connectDB";
import User from "@/app/models/user";
import { hashPassword } from "@/app/utils/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  await connectDB();

  const { username, password, email } = await req.json();

  if (!username || !password || !email) {
    return NextResponse.json({ message: "Missing required fields" }, { status: 422 });
  }

  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return NextResponse.json({ message: "User already exists" }, { status: 409 });
  }

  const hashedPassword = await hashPassword(password);
  const newUser = new User({ username, password: hashedPassword, email });
  await newUser.save();

  return NextResponse.json({ message: "User created" }, { status: 201 });
}
