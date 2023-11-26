import { useFetchers, useLoaderData } from "@remix-run/react";
import { RootLoaderData } from "~/root";

export const useTheme = () => {
  const data = useLoaderData<RootLoaderData>();
  const fetchers = useFetchers();
  const themeFetcher = fetchers.find(
    (fetcher) => fetcher.formData?.get("intent") === "update-theme",
  );
  const optimisticTheme = themeFetcher?.formData?.get("theme");
  if (optimisticTheme === "light" || optimisticTheme === "dark") {
    return optimisticTheme;
  }
  return data.theme;
};
