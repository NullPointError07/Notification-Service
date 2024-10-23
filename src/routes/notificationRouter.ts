import { Router } from "express";
import { sendNotificationToMultipleUsers, sendNotificationToUser } from "../controller/notification";

const router = Router();

// Route to send a notification to a single user
router.post("/single", sendNotificationToUser);

// Route to send a notification to multiple users
router.post("/multiple", sendNotificationToMultipleUsers);

export { router as NotificationRoutes };
