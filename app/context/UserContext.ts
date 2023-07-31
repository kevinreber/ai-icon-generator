import { createContext } from "react";
type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  credits: number;
  createdAt: Date;
  updateddAt: Date;
};

// @ts-ignore
export const UserContext = createContext<User>(null);
