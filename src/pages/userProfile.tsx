import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { findPostsByUsername } from "../services/posts";
import { findByUsername } from "../services/users";
import { Posts, User } from "../types";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Posts | null>(null);
  const navigate = useNavigate();

  document.title = user?.username || "Loading...";

  useEffect(() => {
    if (!user) {
      findByUsername(username!).then((user) => {
        if (user.message) {
          return navigate("/404");
        }
        setUser(user);
      });
    }

    if (!posts && user) {
      findPostsByUsername(user.username).then((posts) => {
        if (posts.length > 0) {
          setPosts(posts);
        }
      });
    }
  }, [user, posts]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex justify-center pt-10">
        <div className="flex flex-col items-center">
          <img
            src="/assets/anonymous-user.png"
            className="h-40 w-40 rounded-full bg-white"
          />
          <p className="mt-4">
            {user ? "@" : null}
            {user?.username}
          </p>
          <p className="text-3xl mt-8 font-bold">{user?.accountName}</p>
        </div>
      </div>
      <Feed posts={posts} />
    </div>
  );
}
