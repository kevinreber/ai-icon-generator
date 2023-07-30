import { getS3BucketURL } from "~/utils";

const MOCK_IMAGE_ID = "cliid9qad0001r2q9pscacuj0";

export const getMockDataResponse = (numberOfImages = 1) => {
  const imageURL = getS3BucketURL(MOCK_IMAGE_ID);
  const mockDallEImage = {
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
  const mockData = new Array(numberOfImages).fill(mockDallEImage);

  return mockData;
};
