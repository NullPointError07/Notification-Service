import { Router } from "express";
import { sendNotificationToMultipleUsers, sendNotificationToUser } from "../controller/notification";
import { sendNotificationToToken } from "../services/notificationToToken";

const router = Router();

// Route to send a notification to a single user
router.post("/single", sendNotificationToUser);

// Route to send a notification to multiple users
router.post("/multiple", sendNotificationToMultipleUsers);

// Route to send a notification based on token
router.post("/to-token", sendNotificationToToken);

export { router as NotificationRoutes };
