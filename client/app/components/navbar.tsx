"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FiBell } from "react-icons/fi";

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    setIsLoggedIn(false);
    router.push("/login");
  };

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
            <button
              onClick={handleLogout}
              className="text-white hover:bg-opacity-70 px-4 py-2 rounded-md transition duration-300"
            >
              Logout
            </button>
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
