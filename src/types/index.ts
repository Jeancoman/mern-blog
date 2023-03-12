export interface User {
  _id: string;
  displayName: string;
  userName: string;
  profileImageUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  userType?: string;
}

export interface Post {
  _id: string;
  title: string;
  content: string;
  views: number;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface JwtPayload {
  user: User;
  iat: number;
  exp: number;
}

export interface Session {
  user: User;
  token: string;
}

export interface Like {
  any: string;
  user: string;
}

export type Likes = Like[]

export type Posts = Post[];

export interface Auth {
  User?: User;
  message?: string;
  isValidCredentials: boolean;
}

export type UpdateRes = [number, Posts];

