import { useRouteLoaderData } from "@remix-run/react";
import { RootLoaderData } from "~/root";

export function useOptionalUser() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  return data?.userData ?? null;
}

export function useLoggedInUser() {
  const maybeUser = useOptionalUser();
  if (!maybeUser) {
    throw new Error(
      "No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.",
    );
  }
  return maybeUser;
}
