// import { prisma } from "../app/services/prisma.server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient({ datasourceUrl: process.env.DATABASE_URL });

const entities = ["image", "user"];
const actions = ["create", "read", "update", "delete"];
const accesses = ["own", "any"];

console.time("🔑 Creating permissions...");
for (const entity of entities) {
  for (const action of actions) {
    for (const access of accesses) {
      await prisma.permission.create({
        data: {
          entity,
          action,
          access,
        },
      });
    }
  }
}
console.timeEnd("🔑 Created permissions...");

console.time("👑 Creating roles...");

await prisma.role.create({
  data: {
    name: "admin",
    permissions: {
      connect: await prisma.permission.findMany({
        select: { id: true },
        where: { access: "any" },
      }),
    },
  },
});

await prisma.role.create({
  data: {
    name: "user",
    permissions: {
      connect: await prisma.permission.findMany({
        select: { id: true },
        where: { access: "own" },
      }),
    },
  },
});

console.timeEnd("👑 Created roles...");
