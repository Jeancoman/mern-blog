import session from "../utils/session";
import { Likes, Post, Posts } from "../types";

const findAll = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts`);
  return (await response.json()) as Posts;
};

const findPostsByUserName = async (username: string) => {
  if (
    session.find()?.user.userName == username ||
    session.find()?.user.userType === "ADMIN"
  ) {
    const response = await fetch(
      `${
        import.meta.env.VITE_BACKEND_URL
      }/api/users/${username}/protected/posts`,
      {
        method: "GET",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          Authorization: session.find()?.token,
        },
      }
    );
    return (await response.json()) as Posts;
  }

  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/users/${username}/public/posts`
  );

  return (await response.json()) as Posts;
};

const findById = async (id: string) => {
  if (session.find()) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/protected`,
      {
        method: "GET",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          Authorization: session.find()?.token,
        },
      }
    );
    return (await response.json()) as Post;
  }
  const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/public`);
  return await response.json() as Post;
};

const updatePost = async (
  id: string,
  title: string,
  content: string,
  published: boolean
) => {
  if (session.find()) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
      {
        method: "PATCH",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          Authorization: session.find()?.token,
        },
        body: JSON.stringify({
          id,
          title,
          content,
          published,
        }),
      }
    );
    return (await response.json()) as Post;
  }
};

const createPost = async (
  title: string,
  content: string,
  published: boolean
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts`,
    {
      method: "POST",
      // @ts-ignore
      headers: {
        "Content-Type": "application/json",
        Authorization: session.find()?.token,
      },
      body: JSON.stringify({
        title,
        content,
        published,
      }),
    }
  );
  return (await response.json()) as Post;
};

const deletePost = async (id: string) => {
  if (session.find()) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}`,
      {
        method: "DELETE",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          Authorization: session.find()?.token,
        },
      }
    );
    return response.status;
  }
};

const incrementViews = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/views`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return (await response.json()) as Post;
};

const like = async (id: string) => {
  if (session.find()) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/likes`,
      {
        method: "POST",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          Authorization: session.find()?.token,
        },
        body: JSON.stringify({
          like: true,
          dislike: false,
        }),
      }
    );
    return response.status;
  }
};

const dislike = async (id: string) => {
  if (session.find()) {
    const response = await fetch(
      `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/likes`,
      {
        method: "POST",
        // @ts-ignore
        headers: {
          "Content-Type": "application/json",
          Authorization: session.find()?.token,
        },
        body: JSON.stringify({
          like: false,
          dislike: true,
        }),
      }
    );
    return response.status;
  }
};

const findLikes = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/posts/${id}/likes`
  );
  return (await response.json()) as Likes;
};

export const PostService = {
  findAll,
  findPostsByUserName,
  findById,
  updatePost,
  createPost,
  deletePost,
  incrementViews,
  like,
  dislike,
  findLikes,
};
