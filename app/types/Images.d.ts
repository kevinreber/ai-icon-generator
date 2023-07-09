export type CommentLike = {
  userId: string;
  commentId: string;
};

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
  likes: CommentLike[];
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
