"use client";

import { useEffect, useState } from "react";
import { FaThumbsUp } from "react-icons/fa";

interface Post {
  _id: string;
  post: string;
  createdBy: { username: string };
  createdAt: string;
  isLiked: boolean;
}

interface FetchPostsProps {
  refreshPosts: boolean;
}

const FetchPosts: React.FC<FetchPostsProps> = ({ refreshPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  const fetchPosts = async () => {
    const res = await fetch("/api/posts");
    const data = await res.json();
    setPosts(data);
  };

  const handleLike = async (postId: string) => {
    await fetch(`/api/posts/${postId}/like`, { method: "POST" });
    fetchPosts();
  };

  useEffect(() => {
    fetchPosts();
  }, [refreshPosts]);

  return (
    <div className="w-full max-w-6xl mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {posts.map((post) => (
        <div key={post._id} className="bg-white shadow-md rounded-lg p-4 flex flex-col">
          <div className="mb-2">
            <p className="text-sm text-gray-500">Posted by: {post.createdBy.username || "Anonymous"}</p>
            <p className="text-sm text-gray-400">Date: {new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
          <p className="text-gray-800 flex-grow">{post.post}</p>
          <button
            onClick={() => handleLike(post._id)}
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
