import { format } from "date-fns";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { PostService } from "../services/posts";
import { Post } from "../types";

export default function PostContent() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);
  const navigate = useNavigate();

  document.title = post?.title || "Loading...";

  useEffect(() => {
    if (!post) {
      PostService.findById(postId!).then((post) => {
        if(!post){
          return navigate("/404")
        }
        setPost(post);
        PostService.incrementViews(post._id);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="px-32 py-10">
        <div className="w-full">
          <div className="flex flex-1 flex-col w-full bg-white gap-4 min-h-[70vh] p-10 shadow-sm rounded-2xl border border-slate-300">
            {post ? (
              <>
                <p className="text-xs sm:text-base w-full">
                  Writen by{" "}
                  <NavLink
                    to={`/users/${typeof post.user !== "string" ? post?.user.userName : null}`}
                    className="text-blue-600 font-bold"
                  >
                    @{typeof post.user !== "string" ? post?.user.userName : null}
                  </NavLink>{" "}
                  on {format(new Date(post?.createdAt), 'yyyy-MM-dd')}
                </p>
                <article className="prose-sm sm:prose">
                  <h1>{post?.title}</h1>
                  <ReactMarkdown children={post?.content} />
                </article>
              </>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
