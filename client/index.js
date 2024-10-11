const socket = io();

// Update connection status
socket.on("connect", () => {
  console.log("Connected to server");
});

// Handle notifications
socket.on("notification", (data) => {
  const notificationDiv = document.getElementById("notifications");
  const newNotification = document.createElement("div");
  newNotification.classList.add("notification");
  newNotification.innerText = `User ${data.userId}: ${data.message}`;
  notificationDiv.appendChild(newNotification);
});

// Send notification
document.getElementById("sendNotificationBtn").addEventListener("click", () => {
  const userId = document.getElementById("userIdInput").value;
  const message = document.getElementById("notificationInput").value;

  if (userId && message) {
    socket.emit("sendNotification", { userId, message });
    document.getElementById("notificationInput").value = ""; // Clear input field
  } else {
    alert("Please enter both User ID and Notification Message");
  }
});
