import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import { findSession } from "../lib/session";
import { findById } from "../services/posts";
import { Post } from "../types";

export default function Edit() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  document.title = "Edit";

  useEffect(() => {
    if (!post) {
      findById(postId!).then((post) => {
        setPost(post);
      });
    }
    if (post) {
      const session = findSession();
      if (!session) {
        return navigate("/login");
      }

      if (post.UserId !== session.id) {
        return navigate("/");
      }
    }
  }, [post]);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <Editor post={post} />
    </div>
  );
}
