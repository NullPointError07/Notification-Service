"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiBell } from "react-icons/fi";
import { useSocket } from "../hooks/useSocket";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();
  const socket = useSocket();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("username");
    setUsername(storedUserName);
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
    setIsLoggedIn(false);
    router.push("/login");
  };

  useEffect(() => {
    socket?.on("notification", (data) => {
      console.log("is this the data", data);
    });
  }, []);

  return (
    <nav className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white p-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1
          className="text-2xl font-bold cursor-pointer transition duration-300 hover:opacity-80"
          onClick={() => router.push("/")}
        >
          MyApp
        </h1>
        <div className="flex space-x-6 items-center">
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-3">
                <span className="bg-white text-blue-500 font-semibold px-3 py-1 rounded-full border border-blue-500">
                  {username}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-opacity-70 px-4 py-2 rounded-md transition duration-300"
                >
                  Logout
                </button>
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => router.push("/login")}
                className="text-white hover:bg-opacity-70 px-4 py-2 rounded-md transition duration-300"
              >
                Login
              </button>
              <button
                onClick={() => router.push("/signup")}
                className="text-white hover:bg-opacity-70 px-4 py-2 rounded-md transition duration-300"
              >
                Signup
              </button>
            </>
          )}
          <button
            className="flex items-center hover:bg-opacity-70 p-2 rounded-full transition duration-300"
            onClick={() => console.log("Show Notifications")}
          >
            <FiBell className="h-6 w-6" />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
