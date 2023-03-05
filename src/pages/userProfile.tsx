import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { findSession } from "../lib/session";
import { findByUserId } from "../services/posts";
import { findByUsername } from "../services/users";
import { Posts, User } from "../types";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Posts | null>(null);

  document.title = user?.username || "Loading...";

  useEffect(() => {
    if (!user) {
      findByUsername(username!).then((user) => {
        setUser(user);
      });
    }

    if (!posts && user) {
      findByUserId(user.id).then((posts) => {
        if (posts) {
          if (findSession()) {
            if (findSession()?.id === posts[0].UserId) {
              setPosts(posts)
            }
          } else setPosts(posts.filter((post) => post.status === "published"));
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
            src="../src/assets/anonymous-user.png"
            className="h-40 w-40 rounded-full bg-white"
          />
          <p className="mt-4">@{user?.username}</p>
          <p className="text-3xl mt-8 font-bold">{user?.accountName}</p>
        </div>
      </div>
      <Feed posts={posts} />
    </div>
  );
}
