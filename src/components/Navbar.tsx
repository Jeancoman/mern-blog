import { NavLink, useNavigate } from "react-router-dom";
import { findSession, revokeSession } from "../lib/session";

export default function Navbar() {
  const navigate = useNavigate();

  const singOut = () => {
    revokeSession();
    return navigate("/");
  };
  return (
    <header className="bg-white h-14 border-b border-slate-300 flex items-center justify-between shadow-sm py-12 px-32 sticky">
      <NavLink
        to="/"
        className="bg-slate-800 text-white text-lg font-bold p-3 px-5 rounded"
      >
        BLOG
      </NavLink>
      {findSession() ? (
        <div className="flex gap-4 items-center">
          <NavLink
            to="/create"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 px-4 rounded"
          >
            Write Post
          </NavLink>
          <button
            onClick={singOut}
            className="bg-slate-400 hover:bg-slate-500 text-white font-bold p-3 px-4 rounded"
          >
            Sing out
          </button>
          <NavLink to={`/users/${findSession()?.username}`}>
            <img
              src="/assets/anonymous-user.png"
              className="p-1 h-14 w-14 rounded-full"
            />
          </NavLink>
        </div>
      ) : (
        <NavLink
          to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold p-3 px-4 rounded "
        >
          Login
        </NavLink>
      )}
    </header>
  );
}
