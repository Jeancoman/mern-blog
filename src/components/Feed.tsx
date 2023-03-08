import { NavLink, useLocation } from "react-router-dom";
import { findSession } from "../lib/session";
import { Post, Posts } from "../types";

type Preview = {
  post: Post | null;
};

type Feed = {
  posts: Posts | null;
};

function Preview({ post }: Preview) {
  const wordCount = post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount! / 100 + 1).toFixed(0);
  const location = useLocation();

  return (
    <NavLink
      to={`/posts/${post?.id}`}
      className="bg-white rounded border shadow-sm border-slate-300 px-8 py-6"
    >
      <div className="flex flex-col gap-3">
        <div className="font-medium">By {post?.User.accountName}</div>
        <div className="font-bold text-xl">{post?.title}</div>
        <div className="flex justify-between">
          <div>
            {wordCount} words. {minutesToRead} min read
          </div>
          {(findSession()?.id === post?.UserId ||
            findSession()?.userType === "admin") &&
          location.pathname !== "/" ? (
            <div className="flex gap-4">
              {post?.status === "published" ? (
                <div className="capitalize text-green-500 font-medium">
                  {post?.status}
                </div>
              ) : (
                <div className="capitalize text-red-500 font-medium">
                  {post?.status}
                </div>
              )}
              <NavLink
                to={`/edit/${post?.id}`}
                className="text-end font-bold text-blue-500 hover:text-blue-600 "
              >
                Edit
              </NavLink>
            </div>
          ) : null}
        </div>
      </div>
    </NavLink>
  );
}

export default function Feed({ posts }: Feed) {
  const location = useLocation();
  return (
    <main className="px-32 py-12 flex flex-col gap-4">
      {location.pathname === "/" ? (
        <div className="bg-blue-600 text-white rounded border shadow-sm border-blue-300 px-8 py-6">
          <div>
            <h1 className="font-bold text-lg pb-2">MERN Blog Application</h1>
            <p className="font-medium pb-2">
              Welcome! This is a simple blog application made using a variation
              of the MERN stack.
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
        return <Preview post={post} key={post.id} />;
      })}
    </main>
  );
}
