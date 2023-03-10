import { User } from "../types";

const findByUserName = async (username: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${username}`
  );
  return (await response.json()) as User;
};

const usernameExist = async (username: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${username}`
  );

  if (response.status === 200) {
    return true;
  }
  return false;
};

export const UserService = { findByUserName, usernameExist };
