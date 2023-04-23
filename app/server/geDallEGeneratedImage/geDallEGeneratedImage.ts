import { Configuration, OpenAIApi } from "openai";

const MOCK_IMAGE1 =
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-HjwERfwsYgVn3BRgUZdIzPO3/user-sVfWNEsc3m51HwuXg57YNwMv/img-ysh7IpEOm2TKhJoXrXHQ92rz.png?st=2023-04-21T04%3A25%3A18Z&se=2023-04-21T06%3A25%3A18Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-21T05%3A15%3A26Z&ske=2023-04-22T05%3A15%3A26Z&sks=b&skv=2021-08-06&sig=LCvfK6B4wd0z2ixSKqOIFWqkSCnegx36i2fzRhu/RLs%3D";

const MOCK_IMAGE2 =
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-HjwERfwsYgVn3BRgUZdIzPO3/user-sVfWNEsc3m51HwuXg57YNwMv/img-cKvwR4Y03jPJIHVRB0h1vBeM.png?st=2023-04-21T04%3A28%3A12Z&se=2023-04-21T06%3A28%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-20T23%3A18%3A06Z&ske=2023-04-21T23%3A18%3A06Z&sks=b&skv=2021-08-06&sig=gFbrfID7F/1B5SXWSz8NK6zX1%2Bv8b2Y7KR6JHihJ4Xk%3D";

const MOCK_IMAGE3 =
  "https://oaidalleapiprodscus.blob.core.windows.net/private/org-HjwERfwsYgVn3BRgUZdIzPO3/user-sVfWNEsc3m51HwuXg57YNwMv/img-vLPbrcQB4AwV4DdSjOQLm457.png?st=2023-04-21T04%3A33%3A23Z&se=2023-04-21T06%3A33%3A23Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-04-21T00%3A28%3A09Z&ske=2023-04-22T00%3A28%3A09Z&sks=b&skv=2021-08-06&sig=C5TWBaaTNyAdiLPe4Vi3vi6p5LOpM1aS%2BvI48zq3bTw%3D";

const configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY,
});
const openai = new OpenAIApi(configuration);

const NUMBER_OF_IMAGES_CREATED = 1;
const IMAGE_SIZE = "1024x1024";

const DEFAULT_PAYLOAD = {
  prompt: "",
};

const generateIcon = async (prompt: string) => {
  if (process.env.USE_MOCK_DALLE === "true") {
    return MOCK_IMAGE1;
  }

  const promptMessage = prompt;

  const response = await openai.createImage({
    prompt: promptMessage,
    n: NUMBER_OF_IMAGES_CREATED,
    size: IMAGE_SIZE,
  });

  const imageUrl = response.data.data[0].url;
  return imageUrl;
};

export const geDallEGeneratedImage = async (formData = DEFAULT_PAYLOAD) => {
  const prompt = formData.prompt;

  try {
    const iconImage = await generateIcon(prompt);

    return { imageUrl: iconImage };
  } catch (error) {
    console.error(error);

    return { imageUrl: "" };
  }
};
