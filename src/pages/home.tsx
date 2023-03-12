import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { PostService } from "../services/posts";
import { Posts } from "../types";
import session from "../utils/session";
import TokenDecoder from "../utils/tokenDecoder";

export default function Home() {
  const [posts, setPosts] = useState<Posts | null>(null);
  const location = useLocation();

  document.title = "Home";

  useEffect(() => {
    if (!posts) {
      PostService.findAll().then((posts) => {
        if (posts.length > 0) {
          setPosts(posts)
        }
      });
    }
    
    const token = TokenDecoder.findTokenInUrl(location.hash);

    if(token){
      const user = TokenDecoder.decodeAndReturnUser(token);
      const newSession = {
        user,
        token,
      };
      session.set(newSession);
      window.history.replaceState({}, document.title, "/");
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Feed posts={posts}/>
    </div>
  );
}
