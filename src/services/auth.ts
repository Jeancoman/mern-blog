const logIn = async (username: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/login`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  return (await response.json()).token;
};

const singIn = async (username: string, password: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/auth/signup`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }
  );
  return (await response.json()).token;
};

const singInWithGoogle = async () => {
   window.open(`${import.meta.env.VITE_BACKEND_URL}/api/auth/google`);
};

export const AuthService = {
  logIn,
  singIn,
  singInWithGoogle
};
