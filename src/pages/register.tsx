import debounce from "lodash.debounce";
import { useCallback, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { NavLink, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import session from "../utils/session";
import { UserService } from "../services/users";
import { clsx } from 'clsx';
import { AuthService } from "../services/auth";
import TokenDecoder from "../utils/tokenDecoder";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isInvalid, setIsInvalid] = useState(true);
  const [isTaken, setIsTaken] = useState(false);
  const navigate = useNavigate();

  document.title = "Sign Up";

  useEffect(() => {
    if(session.find()){
      navigate("/")
    }
  }, [])

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const token = await AuthService.singIn(username, password);
    if (token) {
      const user = TokenDecoder.decodeAndReturnUser(token);
      const newSession = {
        user,
        token,
      };
      session.set(newSession);
      return navigate("/");
    } else {
      toast.error("Signin failure");
    }
  };

  useEffect(() => {
    checkUsername(username);
  }, [username]);

  useEffect(() => {
    if(isTaken){
      toast.error("Username already exist")
    }
  }, [isTaken])

  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const exist = await UserService.usernameExist(username);
        if(exist){
          setIsInvalid(true);
          setIsTaken(true);
        } else {
          setIsInvalid(false);
          setIsTaken(false);
        }
      }
    }, 500),
    []
  );

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const username = e.target.value.toLowerCase();
    const regex = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    if (username.length < 3) {
      setUsername(username);
      setIsInvalid(true);
      setIsTaken(false);
    } else if (regex.test(username)) {
      setUsername(username);
      setIsInvalid(true);
      setIsTaken(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <Navbar />
      <main className="grid place-items-center h-[85.2vh]">
        <div className="bg-white w-fit h-fit rounded-lg shadow">
          <form
            onSubmit={onSubmit}
            className="flex flex-col place-items-center gap-4 w-80 p-10 relative"
          >
            <h1 className="self-start text-2xl font-bold">Sign Up</h1>
            <input
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={onChange}
              required
              minLength={3}
              className={clsx({
                ["w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"]: !isTaken && isInvalid,
                ["w-full px-3 py-1.5 text-base font-normal text-red-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-red-700 focus:bg-white focus:border-red-600 focus:outline-none"]: isTaken && isInvalid,
                ["w-full px-3 py-1.5 text-base font-normal text-green-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-green-700 focus:bg-white focus:border-green-600 focus:outline-none"]: !isTaken && !isInvalid,
              })
              }
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
              disabled={isInvalid}
              className="w-full px-6 py-2.5 disabled:bg-blue-400 bg-blue-600 text-white font-bold text-sm leading-tight rounded hover:bg-blue-700 focus:bg-blue-600 focus:outline-none focus:ring-0 active:bg-blue-800"
            >
              Continue
            </button>
            <div className="flex gap-2">
              <p>Do you have an account?</p>
              <NavLink
                to="/login"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                Login
              </NavLink>
            </div>
          </form>
        </div>
      </main>
      <Toaster position="bottom-center" reverseOrder={false} />
    </div>
  );
}
