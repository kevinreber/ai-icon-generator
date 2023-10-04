import { createContext } from "react";
import { type Collection } from "~/types";

type User = {
  id: string;
  name: string;
  username: string;
  email: string;
  avatar: string;
  credits: number;
  createdAt: Date;
  updateddAt: Date;
  collections: Collection[];
};

// @ts-ignore
export const UserContext = createContext<User>(null);
