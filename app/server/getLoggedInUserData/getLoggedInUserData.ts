import { prisma } from "~/services/prisma.server";
import { sessionStorage } from "~/utils";

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

export const getLoggedInUserData = async (
  userGoogleData: UserGoogleData,
  request: Request,
) => {
  const userId = userGoogleData.id;
  let userData = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      username: true,
      email: true,
      image: true,
      createdAt: true,
      credits: true,
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
      roles: true,
    },
  });

  if (!userData?.id) {
    const { name, email, picture } = userGoogleData._json;

    // If new user is created, no collections will exist
    // @ts-ignore
    userData = await prisma.user.create({
      data: {
        id: userId,
        name,
        username: userGoogleData.displayName,
        email,
        image: picture,
        roles: { connect: { name: "user" } },
      },
    });
  }

  return userData;
};
