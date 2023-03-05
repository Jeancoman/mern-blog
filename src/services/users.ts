import { Auth, User } from "../types";

const findByUsername = async (username: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users?username=${username}`
  );
  return (await response.json()) as User;
};

const usernameExist = async (username: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users?username=${username}`
  );

  if(response.status === 200){
    return true;
  }
  return false;
};

const authenticate = async (username: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/auth`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  return (await response.json()) as Auth;
};

const singIn = async (username: string, accountName: string, password: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      accountName,
      password,
    }),
  });
  return (await response.json()) as User;
};

export { findByUsername, authenticate, usernameExist, singIn };
