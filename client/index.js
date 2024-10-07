const socket = io("http://localhost:3000");

const topicSelect = document.getElementById("topic-select");
const subscribeBtn = document.getElementById("subscribe-btn");
const unsubscribeBtn = document.getElementById("unsubscribe-btn");
const notificationsDiv = document.getElementById("notifications");

// Subscribe to a topic
subscribeBtn.addEventListener("click", () => {
  const topic = topicSelect.value;
  socket.emit("subscribe", topic);
});

// Unsubscribe from a topic
unsubscribeBtn.addEventListener("click", () => {
  const topic = topicSelect.value;
  socket.emit("unsubscribe", topic);
});

// Display notifications received from the server
socket.on("receiveNotification", ({ message }) => {
  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.textContent = `Notification: ${message}`;
  notificationsDiv.appendChild(notification);
});

// Handle subscription success
socket.on("subscriptionSuccess", (msg) => {
  alert(msg);
});

// Handle unsubscription success
socket.on("unsubscriptionSuccess", (msg) => {
  alert(msg);
});

// Handle subscription error
socket.on("subscriptionError", (msg) => {
  alert(msg);
});

// Handle unsubscription error
socket.on("unsubscriptionError", (msg) => {
  alert(msg);
});
