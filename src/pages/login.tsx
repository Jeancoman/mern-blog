import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthService } from "../services/auth";
import session from "../utils/session";
import TokenDecoder from "../utils/tokenDecoder";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  document.title = "Login";

  useEffect(() => {
    if (session.find()) {
      navigate("/");
    }
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await AuthService.logIn(username, password);
    if (token) {
      const user = TokenDecoder.decodeAndReturnUser(token);
      const newSession = {
        user,
        token,
      };
      session.set(newSession);
      return navigate("/");
    } else {
      toast.error("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="grid place-items-center h-[85.2vh]">
        <div className="bg-white w-fit h-fit rounded-lg shadow">
          <form
            onSubmit={onSubmit}
            className="flex flex-col place-items-center gap-4 w-80 p-10"
          >
            <h1 className="self-start text-2xl font-bold">Login</h1>
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
            <button
              type="submit"
              className="w-full px-6 py-2.5 bg-blue-600 text-white font-bold text-sm leading-tight rounded hover:bg-blue-700 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-800"
            >
              Continue
            </button>
            <div className="flex gap-2">
              <p>Don't have an account?</p>
              <NavLink
                to="/signup"
                className="text-blue-700 hover:text-blue-800 font-medium"
              >
                Sign Up
              </NavLink>
            </div>
            <div className="w-4/5 flex flex-auto items-center	">
              <hr className="h-[0.12rem] bg-slate-500 flex-auto" />
              <span className="px-2">OR</span>
              <hr className="h-[0.12rem] bg-slate-500 flex-auto" />
            </div>
            <button
              onClick={() => AuthService.singInWithGoogle()}
              type="button"
              className="flex place-items-center gap-4 w-full px-6 py-2.5 bg-red-600 text-white font-bold text-sm leading-tight rounded hover:bg-red-700 focus:bg-red-600 focus:outline-none focus:ring-0 active:bg-red-800"
            >
              <img
                src="/assets/google-logo-white.png"
                className="h-5 w-5 rounded-full"
              />
              <div>Sign in with Google</div>
            </button>
          </form>
        </div>
      </main>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
