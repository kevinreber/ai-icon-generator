import { useRouteLoaderData } from "@remix-run/react";
import { RootLoaderData } from "~/root";
import { invariantResponse } from "~/utils";

export function useOptionalUser() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  return data?.userData ?? null;
}

export function useLoggedInUser() {
  const maybeUser = useOptionalUser();
  invariantResponse(
    maybeUser,
    "No user found in root loader, but user is required by useLoggedInUser. If user is optional, try useOptionalUser instead.",
  );
  return maybeUser;
}
