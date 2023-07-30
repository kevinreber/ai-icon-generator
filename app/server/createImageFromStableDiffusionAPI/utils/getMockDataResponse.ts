import { getS3BucketURL } from "~/utils";

const MOCK_IMAGE_ID = "stable-diffusion-xl-futuristic-bonsai-tree";

export const getMockDataResponse = (numberOfImages = 1) => {
  const imageURL = getS3BucketURL(MOCK_IMAGE_ID);
  const mockImageData = {
    id: MOCK_IMAGE_ID,
    prompt: "using mock data",
    userId: "testUser123",
    createdAt: "2023-06-26 03:17:19",
    user: {
      userId: "123456789",
      username: "testUser123",
    },
    url: imageURL,
    comments: [],
  };

  const mockData = new Array(numberOfImages).fill(mockImageData);

  return mockData;
};
