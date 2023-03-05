import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { setSession } from "../lib/session";
import { authenticate } from "../services/users";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  document.title = "Login";

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const auth = await authenticate(username, password);
    if (auth.isValidCredentials && auth.User) {
      setSession(auth.User);
      return navigate("/");
    } else {
      toast.error(auth.message!);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="flex place-content-center">
        <div className="bg-white w-fit h-fit mt-[10%] rounded-lg shadow">
          <form
            onSubmit={onSubmit}
            className="flex flex-col place-items-center gap-4 w-80 p-10"
          >
            <h1 className="self-start text-xl font-bold">Login</h1>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength={1}
              className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={1}
              className="w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
            <button className="w-full px-6 py-2.5 bg-blue-600 text-white font-bold text-sm leading-tight rounded hover:bg-blue-700 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-800">
              Continue
            </button>
            <div className="flex gap-2">
              <p>Don't have an account?</p>
              <NavLink
                to="/signup"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Sign Up
              </NavLink>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
