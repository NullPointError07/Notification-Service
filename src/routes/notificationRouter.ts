import express, { Router } from "express";
import { sendNotificationToMultipleUsers, sendNotificationToSingleUser } from "../controller/notification";

const router: Router = express.Router();

export default (io: any): Router => {
  // Route for sending notification to a single user
  router.post("/send-notification", sendNotificationToSingleUser(io));

  // Route for sending notification to multiple users
  router.post("/send-multiple-notifications", sendNotificationToMultipleUsers(io));

  return router;
};
