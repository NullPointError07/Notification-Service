"use client";

import { useState } from "react";
import CreatePost from "@/app/components/createPost";
import FetchPosts from "@/app/components/fetchPosts";

export default function Home() {
  const [refreshPosts, setRefreshPosts] = useState(false);

  const handlePostCreated = () => {
    setRefreshPosts(!refreshPosts);
  };

  return (
    <div>
      <CreatePost onPostCreated={handlePostCreated} />
      <FetchPosts refreshPosts={refreshPosts} />
    </div>
  );
}
