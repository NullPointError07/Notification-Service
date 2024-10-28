"use client";

import { useState } from "react";

interface CreatePostProps {
  onPostCreated: () => void;
}

const CreatePost: React.FC<CreatePostProps> = ({ onPostCreated }) => {
  const [postContent, setPostContent] = useState("");
  const [message, setMessage] = useState("");

  const handlePostSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const userId = localStorage.getItem("userId");
    if (!userId) {
      setMessage("Please log in to create a post.");
      return;
    }

    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, post: postContent }),
    });

    const data = await res.json();
    setMessage(data.message || data.error);
    setPostContent("");
    onPostCreated();
  };

  return (
    <form onSubmit={handlePostSubmit} className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-black">Create a Post</h2>
      <textarea
        placeholder="Write your post here..."
        value={postContent}
        onChange={(e) => setPostContent(e.target.value)}
        className="w-full px-4 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        required
      />
      <button type="submit" className="w-full py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg">
        Submit
      </button>
      {message && <p className="text-center text-green-500 mt-4">{message}</p>}
    </form>
  );
};

export default CreatePost;
