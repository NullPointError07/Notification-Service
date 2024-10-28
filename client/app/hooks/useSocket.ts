import { useContext, useEffect } from "react";
import { SocketContext } from "../context/socket";

export const useSocket = () => {
  const socket = useContext(SocketContext);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (socket && userId) {
      socket.emit("register", userId);
    }
  }, [socket]);

  return socket;
};
