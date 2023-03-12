import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as Heart } from "../assets/heart-regular.svg";
import { ReactComponent as Chart } from "../assets/chart-simple-solid.svg";
import session from "../utils/session";
import { Post, Posts } from "../types";
import TimeAgo from "javascript-time-ago";
import { useEffect, useRef, useState } from "react";
import { PostService } from "../services/posts";
import { clsx } from "clsx";

type Preview = {
  post: Post | null;
};

type Feed = {
  posts: Posts | null;
};

function Preview({ post }: Preview) {
  const location = useLocation();
  const navigate = useNavigate();
  const timeAgo = new TimeAgo("en-US");
  const date = new Date(post?.createdAt!);
  const formated = timeAgo.format(date);
  const ref = useRef<HTMLDivElement>(null);
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState<number | null>(null);

  const likeOrDislike = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
    if (session.find()) {
      if (liked) {
        PostService.dislike(post?._id!).then(() => {
          setLikes(null);
          setLiked(false);
        });
      } else {
        PostService.like(post?._id!).then(() => setLikes(null));
      }
    } else {
      navigate("/login");
    }
  };

  useEffect(() => {
    if (post?._id) {
      const likes = PostService.findLikes(post?._id);
      likes.then((likes) => {
        if (likes) {
          setLikes(likes.length);
          likes.map((like) => {
            if (like.user === session.find()?.user._id) {
              setLiked(true);
            } else {
              setLiked(false);
            }
          });
        }
      });
    }
  }, [likes]);

  return (
    <>
      <NavLink
        to={`/posts/${post?._id}`}
        className="bg-white rounded-2xl border shadow-sm border-slate-300 px-8 py-6 cursor-pointer"
      >
        <div className="flex flex-col gap-3">
          <div className="font-medium">
            <span className="font-normal">Posted by </span>
            <span className="text-blue-600 font-bold">
              @{post?.user.userName}
            </span>{" "}
            <span className="font-normal">{formated}</span>
          </div>
          <div className="font-bold text-xl">{post?.title}</div>
          <div className="flex justify-between" ref={ref} id="blow">
            <div className="flex gap-2">
              <div
                className={clsx({
                  ["flex items-center	gap-1 py-1 px-3 rounded-2xl bg-red-200 hover:bg-red-300"]:
                    !liked,
                  ["flex items-center	gap-1 py-1 px-3 rounded-2xl bg-red-400 hover:bg-red-500"]:
                    liked,
                })}
                onClick={likeOrDislike}
              >
                <Heart
                  className={clsx({
                    ["h-5 w-5 fill-red-500"]: !liked,
                    ["h-5 w-5 fill-red-700"]: liked,
                  })}
                />
                <div
                  className={clsx({
                    ["font-medium text-red-500"]: !liked,
                    ["font-medium text-red-700"]: liked,
                  })}
                >
                  {likes}
                </div>
              </div>
              <div className="flex items-center	gap-1">
                <Chart className="h-5 w-5 fill-green-500" />
                <div className="font-medium text-green-500">
                  {Math.round(post?.views! / 2)}
                </div>
              </div>
            </div>
            {(session.find()?.user._id === post?.user._id ||
              session.find()?.user.userType === "ADMIN") &&
            location.pathname !== "/" ? (
              <div className="flex gap-4">
                {post?.published ? (
                  <div className="capitalize text-green-500 font-medium">
                    {"Published"}
                  </div>
                ) : (
                  <div className="capitalize text-red-500 font-medium">
                    {"Unpublished"}
                  </div>
                )}
                <NavLink
                  to={`/edit/${post?._id}`}
                  className="text-end font-bold text-blue-500 hover:text-blue-600 "
                >
                  Edit
                </NavLink>
              </div>
            ) : null}
          </div>
        </div>
      </NavLink>
    </>
  );
}

export default function Feed({ posts }: Feed) {
  const location = useLocation();
  return (
    <main className="px-32 py-12 flex flex-col gap-4">
      {location.pathname === "/" ? (
        <div className="bg-blue-600 text-white rounded-2xl border shadow-sm border-blue-300 px-8 py-6">
          <div>
            <h1 className="font-bold text-lg pb-2">
              MERN Blogging Application
            </h1>
            <p className="font-medium pb-2">
              Welcome! This is a simple blogging application made using the
              MERN stack.
            </p>
            <p className="font-medium pb-2">
              {" "}
              You can{" "}
              <NavLink to="/signup" className="font-bold">
                Sign Up
              </NavLink>{" "}
              an account and start writing posts. The posts are rendered using
              Markdown, so if you don't know or remember what that is, you can
              check this{" "}
              <a
                className="font-bold"
                href="https://commonmark.org/help/"
                target="_blank"
              >
                Markdown Reference
              </a>{" "}
              to learn the syntaxis.
            </p>
            <p>
              You can also check my{" "}
              <a
                className="font-bold"
                href="https://github.com/Jeancoman"
                target="_blank"
              >
                Github
              </a>{" "}
              and
              <a
                className="font-bold"
                href="https://www.linkedin.com/in/jean-bol%C3%ADvar-89266524a/"
                target="_blank"
              >
                {" "}
                Linkedin
              </a>{" "}
              profiles.
            </p>
          </div>
        </div>
      ) : null}
      {!posts && location.pathname === "/" ? (
        <div className="flex items-center justify-center">
          <div
            className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : null}
      {posts?.map((post) => {
        return <Preview post={post} key={post._id} />;
      })}
    </main>
  );
}
