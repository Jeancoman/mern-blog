import session from "../utils/session";
import { Post, Posts, UpdateRes } from "../types";

const findAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
  return (await response.json()) as Posts;
};

const findPostsByUserName = async (username: string) => {
  if (session.find()) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/users/${username}/posts`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return (await response.json()) as Posts;
  }
  
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${username}/posts`
  );
  return (await response.json()) as Posts;
};

const findById = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`
  );
  return (await response.json()) as Post;
};

const updatePost = async (
  id: string,
  title: string,
  content: string,
  published: boolean
) => {
  if (session.find()?.user.userType === "ADMIN") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          content,
          published,
        }),
      }
    );
    return (await response.json()) as UpdateRes;
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/api/posts/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        published,
      }),
    }
  );
  return (await response.json()) as UpdateRes;
};

const createPost = async (
  userId: string,
  title: string,
  content: string,
  published: boolean
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        published,
        userId,
      }),
    }
  );
  return (await response.json()) as Post;
};

const deletePost = async (id: string) => {
  if (session.find()?.user.userType === "USER") {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.status;
  }
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/admin/api/posts/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.status;
};

export const PostService = {
  findAll,
  findPostsByUserName,
  findById,
  updatePost,
  createPost,
  deletePost,
};
