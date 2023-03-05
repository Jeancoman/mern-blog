import { User } from "../types";

const setSession = (user: User) => {
  localStorage.setItem("user_session", JSON.stringify(user));
};

const findSession = () => {
  const session = localStorage.getItem("user_session");

  if (session) {
    return JSON.parse(session) as User;
  }

  return null;
};

const revokeSession = () => {
  localStorage.removeItem("user_session");
};

export { setSession, findSession, revokeSession };
