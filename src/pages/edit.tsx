import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";
import Navbar from "../components/Navbar";
import session from "../utils/session";
import { PostService } from "../services/posts";
import { Post } from "../types";

export default function Edit() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  document.title = "Edit";

  useEffect(() => {
    if(!session.find()){
      return navigate("/login")
    }

    if (!post) {
      PostService.findById(postId!).then((post) => {
        if(!post){
          return navigate("/404")
        }
        setPost(post);
      });
    }

    if (post) {
      const user = session.find()?.user;

      if (post.user._id !== user?._id && user?.userType === "USER") {
        return navigate("/404");
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
