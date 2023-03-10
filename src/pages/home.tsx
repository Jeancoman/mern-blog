import { useEffect, useState } from "react";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { PostService } from "../services/posts";
import { Posts } from "../types";

export default function Home() {
  const [posts, setPosts] = useState<Posts | null>(null);

  document.title = "Home";

  useEffect(() => {
    if (!posts) {
      PostService.findAll().then((posts) => {
        if (posts.length > 0) {
          setPosts(posts)
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Feed posts={posts}/>
    </div>
  );
}
