import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Feed from "../components/Feed";
import Navbar from "../components/Navbar";
import { PostService } from "../services/posts";
import { UserService } from "../services/users";
import { Posts, User } from "../types";

export default function UserProfile() {
  const { username } = useParams();
  const [user, setUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Posts | null>(null);
  const navigate = useNavigate();

  document.title = user?.userName || "Loading...";

  useEffect(() => {
    if (!user) {
      UserService.findByUserName(username!).then((user) => {
        if (!user) {
          return navigate("/404");
        }
        setUser(user);
      });
    }

    if (!posts && user) {
      PostService.findPostsByUserName(user.userName).then((posts) => {
        if (posts.length > 0) {
          setPosts(posts);
        }
        console.log(posts)
      });
    }
  }, [user, posts]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="flex justify-center pt-10">
        <div className="flex flex-col items-center">
          <img
            src={user?.profileImageUrl ? user.profileImageUrl : "/assets/anonymous-user.png"}
            className="h-40 w-40 rounded-full bg-white"
          />
          <p className="mt-4">
            {user ? "@" : null}
            {user?.userName}
          </p>
          <p className="text-3xl mt-6 font-bold">{user?.displayName}</p>
        </div>
      </div>
      <Feed posts={posts} />
    </div>
  );
}
