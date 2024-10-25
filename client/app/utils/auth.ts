import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { IUser } from "../models/user";

export const hashPassword = async (password: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
  return await bcrypt.compare(password, hashedPassword);
};

export const createToken = (user: IUser) => {
  return jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET as string, {
    expiresIn: "1h",
  });
};
