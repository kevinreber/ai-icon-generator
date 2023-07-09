export type Comment = {
  id: string;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: {
    id: string;
    username: string;
  };
  parentId: string;
};

export type ImageType = {
  id: string;
  prompt: string;
  title?: string;
  url: string;
  createdAt: Date;
  // createdBy: string;
  user: {
    id: string;
    username: string;
  };
  comments: Comment[];
  likes: { userId: string }[];
};
