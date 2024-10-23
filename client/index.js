const socket = io("http://localhost:3000");

// register user
socket.on("connect", () => {
  console.log("new user socket id:", socket.id);
  userId = socket.id;
  socket.emit("register", userId);
});

// Listen for notification events from server
socket.on("notification", (data) => {
  const notificationDiv = document.getElementById("notifications");
  const newNotification = document.createElement("div");
  newNotification.classList.add("notification");
  newNotification.innerText = `User ${data.userId}: ${data.message}`;
  notificationDiv.appendChild(newNotification);
});

// Send notification to one user
document.getElementById("sendNotificationBtn").addEventListener("click", async () => {
  const userId = document.getElementById("userIdInput").value;
  const message = document.getElementById("notificationInput").value;

  if (userId && message) {
    try {
      await fetch("http://localhost:3000/notification/single", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, message }),
      });
      alert(`Notification sent to User ID: ${userId}`);
      // document.getElementById("userIdInput").value = "";
      // document.getElementById("notificationInput").value = "";
    } catch (error) {
      console.error("Error sending notification:", error);
      alert("Error sending notification");
    }
  } else {
    alert("Please enter both User ID and Notification Message");
  }
});

// // Send notification to multiple users
// document.getElementById("sendToMultipleUsersBtn").addEventListener("click", async () => {
//   const message = document.getElementById("notificationInput").value;

//   if (message) {
//     try {
//       await fetch("/notification/multiple", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message }),
//       });
//       alert("Notification sent to multiple users");
//       document.getElementById("notificationInput").value = ""; // Clear input field
//     } catch (error) {
//       console.error("Error sending notification:", error);
//       alert("Error sending notification");
//     }
//   } else {
//     alert("Please enter a Notification Message");
//   }
// });
