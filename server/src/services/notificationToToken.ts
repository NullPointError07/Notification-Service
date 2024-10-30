import { Request, Response } from "express";
import { io, userSockets } from "../..";

export const sendNotificationToToken = (req: Request, res: Response) => {
  const { body } = req.body;
  console.log(body);
  const receiverToken = userSockets.get(body.receiverId.id);
  console.log("user sockets", userSockets);
  console.log("receiver token 1", receiverToken);

  if (receiverToken) {
    console.log("receiver token 2", receiverToken);
    io.to(receiverToken).emit("notification-to-token", req.body);
  }

  res.send("notification sent successfully");
};
