import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { NavLink, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { findById } from "../services/posts";
import { Post } from "../types";

export default function PostContent() {
  const { postId } = useParams();
  const [post, setPost] = useState<Post | null>(null);

  document.title = post?.title || "Loading...";

  useEffect(() => {
    if (!post) {
      findById(postId!).then((post) => {
        setPost(post);
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="px-32 py-10">
        <div>
          <div className="flex flex-1 flex-col bg-white gap-4 min-h-[70vh] p-10 shadow-sm rounded border border-slate-300">
            {post ? (
              <>
                <p>
                  Writen by{" "}
                  <NavLink
                    to={`/users/${post?.User.username}`}
                    className="text-blue-600 font-bold"
                  >
                    {post?.User.accountName}
                  </NavLink>{" "}
                  on {post?.createdAt}
                </p>
                <article className="prose w-max">
                  <h1 className="w-max">{post?.title}</h1>
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
