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

export const getUserData = async (userGoogleData: UserGoogleData) => {
  let userData = await prisma.user.findUnique({
    where: { id: userGoogleData.id },
  });

  if (!userData?.id) {
    const { name, email, picture } = userGoogleData._json;

    const newUser = {
      id: userGoogleData.id,
      name,
      email,
      image: picture,
    };

    await prisma.user.create({ data: newUser });

    userData = await prisma.user.findUnique({
      where: { id: userGoogleData.id },
    });
  }

  return userData;
};
