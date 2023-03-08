export interface User {
  id: string;
  accountName: string;
  username: string;
  createdAt?: string;
  updatedAt?: string;
  userType?: string;
  message?: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  UserId: string;
  User: User;
  message?: string;
}

export type Posts = Post[];

export interface Auth {
  User?: User;
  message?: string;
  isValidCredentials: boolean;
}

export type UpdateRes = [number, Posts];

