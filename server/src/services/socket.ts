interface UsersMap {
  [userId: string]: string;
}

let users: UsersMap = {};

// Register the user and store the userId -> socketId mapping
export const registerUser = (socket: any, userId: string): void => {
  console.log("inside register user", users);
  users[userId] = socket.id;
  console.log(`User registered: ${userId} with socket ID: ${socket.id}`);
  console.log("users after connecting one user", users);
};

// Remove user mapping when they disconnect
export const removeUser = (socketId: string): void => {
  console.log("inside remove user", users);
  const userId = Object.keys(users).find((key) => users[key] === socketId);
  if (userId) {
    delete users[userId];
    console.log(`User disconnected: ${userId}`);
  }
  console.log("users after disconnecting one user", users);
};

// Retrieve socket ID based on userId
export const getUserSocketId = (userId: string): string | undefined => {
  return users[userId];
};
