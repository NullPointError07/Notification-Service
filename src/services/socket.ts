interface UsersMap {
  [userId: string]: string;
}

let users: UsersMap = {};

// Register the user and store the userId -> socketId mapping
export const registerUser = (socket: any, userId: string): void => {
  users[userId] = socket.id;
  console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
};

// Remove user mapping when they disconnect
export const removeUser = (socketId: string): void => {
  const userId = Object.keys(users).find((key) => users[key] === socketId);
  if (userId) {
    delete users[userId];
    console.log(`User disconnected: ${userId}`);
  }
};

// Retrieve socket ID based on userId
export const getUserSocketId = (userId: string): string | undefined => {
  return users[userId];
};
