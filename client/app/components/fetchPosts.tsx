"use client";

import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";
import { useSocket } from "@/app/hooks/useSocket";

interface Post {
  _id: string;
  post: string;
  createdBy: { _id: string; username: string };
  createdAt: string;
  isLiked: boolean;
}

interface FetchPostsProps {
  refreshPosts: boolean;
}

const FetchPosts: React.FC<FetchPostsProps> = ({ refreshPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [username, setUserName] = useState<string | null>(null);
  const socket = useSocket();

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    const storedUserName = localStorage.getItem("username");
    setUserId(storedUserId);
    setUserName(storedUserName);
  }, []);

  const handleLike = async (postId: string) => {
    await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    fetchPosts();
  };

  const emitLikeEvent = async (post: Post) => {
    handleLike(post._id);

    if (userId === post.createdBy._id) return;

    const data = {
      senderId: userId,
      receiverId: post.createdBy._id,
      postId: post._id,
      type: "social",
      message: `${username} liked your post`,
    };

    socket?.emit("like", data);
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshPosts]);

  return (
    <div className="w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts?.map((post) => (
        <div key={post._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
          <div className="mb-2">
            <p className="text-sm text-gray-500">Posted by: {post.createdBy.username || "Anonymous"}</p>
            <p className="text-sm text-gray-400">Date: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          <p className="text-gray-800 flex-grow">{post.post}</p>
          <button
            onClick={() => emitLikeEvent(post)}
            className={`mt-2 p-2 rounded-md transition duration-300 ${post.isLiked ? "text-red-500" : "text-gray-600"}`}
          >
            <FaThumbsUp size={24} />
          </button>
        </div>
      ))}
    </div>
  );
};

export default FetchPosts;
