import { json } from "@remix-run/node";
import { useLoggedInUser } from "~/hooks";
import { requireUserId } from "~/services/auth.server";
import { prisma } from "~/services/prisma.server";

export const requireUserWithPermission = async (
  request: Request,
  permission: PermissionString,
) => {
  const userId = await requireUserId(request);
  const permissionData = parsePermissionString(permission);
  const user = await prisma.user.findFirst({
    select: { id: true },
    where: {
      id: userId,
      roles: {
        some: {
          permissions: {
            some: {
              ...permissionData,
              access: permissionData.access
                ? { in: permissionData.access }
                : undefined,
            },
          },
        },
      },
    },
  });
  if (!user) {
    throw json(
      {
        error: "Unauthorized",
        requiredPermission: permissionData,
        message: `Unauthorized: required permissions: ${permission}`,
      },
      { status: 403 },
    );
  }
  return user.id;
};

export const requireUserWithRole = async (request: Request, name: string) => {
  const userId = await requireUserId(request);
  console.log(userId);

  const user = await prisma.user.findFirst({
    select: { id: true },
    where: { id: userId, roles: { some: { name } } },
  });
  if (!user) {
    throw json(
      {
        error: "Unauthorized",
        requiredRole: name,
        message: `Unauthorized: required role: ${name}`,
      },
      { status: 403 },
    );
  }
  return user.id;
};

type Action = "create" | "read" | "update" | "delete";
// TODO: Add "collection" to entity
type Entity = "user" | "image";
type Access = "own" | "any" | "own,any" | "any,own";
type PermissionString = `${Action}:${Entity}` | `${Action}:${Entity}:${Access}`;
const parsePermissionString = (permissionString: PermissionString) => {
  const [action, entity, access] = permissionString.split(":") as [
    Action,
    Entity,
    Access | undefined,
  ];
  return {
    action,
    entity,
    access: access ? (access.split(",") as Array<Access>) : undefined,
  };
};

export const userHasPermission = (
  // @ts-ignore
  user: Pick<ReturnType<typeof useLoggedInUser>, "roles"> | null,
  permission: PermissionString,
) => {
  if (!user) return false;
  const { action, entity, access } = parsePermissionString(permission);

  // @ts-ignore
  return user.roles.some((role) =>
    role.permissions.some(
      // @ts-ignore
      (permission) =>
        permission.entity === entity &&
        permission.action === action &&
        // @ts-ignore
        (!access || access.includes(permission.access)),
    ),
  );
};

export function userHasRole(
  // @ts-ignore
  user: Pick<ReturnType<typeof useLoggedInUser>, "roles"> | null,
  role: string,
) {
  if (!user) return false;
  // @ts-ignore
  return user.roles.some((r) => r.name === role);
}
