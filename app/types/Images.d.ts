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
  model: string;
  stylePreset?: string;
  title?: string;
  url: string;
  thumbnailURL: string;
  createdAt: Date;
  user: {
    id: string;
    username: string;
  };
  comments: Comment[];
  likes: { userId: string }[];
  private: boolean;
};
