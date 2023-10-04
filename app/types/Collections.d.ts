import { type ImageType } from "./Images";

export type Collection = {
  id: string;
  title: string;
  description: string;
  user: { id: string; username: string };
  createdAt: Date | string;
  updatedAt: Date | string;
  images: Pick<ImageType, "id">[];
};

export type GetUserCollectionsAPIResponse = {
  collections: Collection[];
  count: number;
};

export type GetCollectionDataAPIResponse = {
  collection: {
    id: string;
    title: string;
    description: string;
    user: { id: string; username: string };
    createdAt: Date | string;
    updatedAt: Date | string;
    images: ImageType[];
  };
};
