import { Post, Posts, UpdateRes } from "../types";

const findAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
  return (await response.json()) as Posts;
};

const findByUserId = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${id}/posts`
  );
  return (await response.json()) as Posts;
};

const findById = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`
  );
  return (await response.json()) as Post;
};

const updatePost = async (id: string, UserId: string, title: string, content: string, status: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Id": UserId
    },
    body: JSON.stringify({
      title,
      content,
      status
    }),
  });
  return (await response.json()) as UpdateRes;
}

const createPost = async (UserId: string, title: string, content: string, status: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title,
      content,
      status,
      UserId
    }),
  });
  return (await response.json()) as Post;
}

const deletePost = async (id: string, UserId: string) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Session-Id": UserId
    }
  });
  return response.status;
}

export { findAll, findByUserId, findById, updatePost, createPost, deletePost };
