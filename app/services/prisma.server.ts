import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line vars-on-top, no-var
  var __db: PrismaClient | undefined;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
  prisma.$connect();
} else {
  if (!global.__db) {
    global.__db = new PrismaClient();
    global.__db.$connect();
  }

  prisma = global.__db;
}

export { prisma };
