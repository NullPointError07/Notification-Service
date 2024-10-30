"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";

const TokenNotification = () => {
  const [notifications, setNotifications] = useState<string[]>([]); // Initialize an array for notifications
  const socket = useSocket();

  useEffect(() => {
    socket?.on("notification-to-token", (notification) => {
      console.log("Notification received:", notification);
      // Append the new notification to the existing array
      setNotifications((prevNotifications) => [...prevNotifications, notification.body.message]);
    });

    return () => {
      socket?.off("notification-to-token");
    };
  }, [socket]);

  return (
    <div>
      <h2>Token Notification</h2>
      {notifications.length > 0 ? (
        <ul>
          {notifications.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      ) : (
        <p>No notifications yet.</p>
      )}
    </div>
  );
};

export default TokenNotification;
