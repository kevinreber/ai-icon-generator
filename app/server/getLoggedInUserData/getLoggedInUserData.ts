import { prisma } from "~/services/prisma.server";

type UserGoogleData = {
  provider: "google";
  displayName: string;
  emails: string[];
  id: string;
  photos: string[];
  _json: {
    email: string;
    family_name: string;
    given_name: string;
    locale: string;
    name: string;
    picture: string;
    sub: string;
  };
};

export const getLoggedInUserData = async (userGoogleData: UserGoogleData) => {
  let userData = await prisma.user.findUnique({
    where: { id: userGoogleData.id },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      createdAt: true,
      collections: {
        select: {
          id: true,
          title: true,
          description: true,
          images: {
            select: {
              imageId: true,
            },
          },
        },
      },
    },
  });

  if (!userData?.id) {
    const { name, email, picture } = userGoogleData._json;

    const newUser = {
      id: userGoogleData.id,
      name,
      username: userGoogleData.displayName,
      email,
      image: picture,
    };

    // If new user is created, no collections will exist
    // @ts-ignore
    userData = await prisma.user.create({ data: newUser });
  }

  return userData;
};
