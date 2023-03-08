import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { useNavigate } from "react-router-dom";
import { findSession } from "../lib/session";
import { createPost, deletePost, updatePost } from "../services/posts";
import { Post } from "../types";

type Props = {
  post?: Post | null;
};

export default function Editor({ post }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [preview, setPreview] = useState(false);
  const [status, setStatus] = useState("unpublished");
  const [isChecked, setIsChecked] = useState(false);
  const [toUpdate, setToUpdate] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setStatus(post.status);
      post.status === "published" ? setIsChecked(true) : setIsChecked(false);
      setToUpdate(true);
    } else {
      setTitle("Your Insightful Post Title Goes Here");
      setContent("### Hello, world!");
    }
  }, [post]);

  useEffect(() => {
    if (isChecked) {
      setStatus("published");
    } else {
      setStatus("unpublished");
    }
  }, [isChecked]);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (toUpdate && post) {
      updatePost(post.id, post.UserId, title, content, status).then((post) => {
        toast.success("Post updated");
        console.log(post);
        return navigate(`/posts/${post[1][0].id}`);
      });
    } else {
      if (findSession()) {
        createPost(findSession()?.id!, title, content, status).then((post) => {
          toast.success("Post created");
          return navigate(`/posts/${post.id}`);
        });
      }
    }
  };

  const deleteOnClick = () => {
    if (post) {
      deletePost(post.id, findSession()?.id!).then((res) => {
        if(res === 204){
          toast.success("Post deleted");
          return navigate(`/users/${findSession()?.username}`);
        }
      });
    }
  };

  return (
    <main className="px-32 py-10">
      <div className="grid grid-cols-[3fr_1fr] gap-6">
        <div>
          {preview ? (
            <div className="flex flex-1 flex-col bg-white gap-4 min-h-[70vh] p-10 shadow-sm rounded border border-slate-300">
              <article className="prose">
                <h1 className="w-max">{title}</h1>
                <ReactMarkdown children={content} />
              </article>
            </div>
          ) : (
            <form
              onSubmit={onSubmit}
              className="flex flex-1 flex-col gap-4 w-full"
            >
              <div>
                <input
                  type={"text"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-slate-100 font-bold w-full text-2xl outline-0 underline"
                  required
                  minLength={1}
                />
              </div>
              <div>
                <textarea
                  className="w-full outline-0 rounded p-2 text-lg shadow-sm"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  rows={12}
                  required
                  minLength={1}
                />
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-lg text-white font-bold p-3 px-4 rounded">
                Save
              </button>
            </form>
          )}
        </div>
        <div className="max-w-sm flex flex-col mt-12 gap-4">
          <button
            onClick={() => setPreview((prev) => !prev)}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 px-4 rounded"
          >
            Preview
          </button>
          {toUpdate ? (
            <button
              onClick={deleteOnClick}
              className="bg-red-600 hover:bg-red-700 text-white font-bold p-3 px-4 rounded"
            >
              Delete
            </button>
          ) : null}
          <div className="flex items-center">
            <input
              className="mr-2 h-4 w-4"
              type="checkbox"
              id="checkbox"
              checked={isChecked}
              onChange={() => setIsChecked((prev) => !prev)}
            />
            <label htmlFor="checkbox">Published</label>
          </div>
        </div>
      </div>
    </main>
  );
}
