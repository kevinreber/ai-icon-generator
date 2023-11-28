import { useForm } from "@conform-to/react";
import { useFetcher } from "@remix-run/react";
import { RootActionData, ThemeFormSchema } from "~/root";
import { Theme } from "~/utils";
import { ErrorList } from ".";
import { parse } from "@conform-to/zod";
import { MoonIcon, SunIcon } from "@heroicons/react/24/solid";

export const ThemeSwitch = ({ userPreference }: { userPreference?: Theme }) => {
  const fetcher = useFetcher<RootActionData>();

  const [form] = useForm({
    id: "theme-switch",
    lastSubmission: fetcher.data?.submission,
    onValidate({ formData }) {
      return parse(formData, { schema: ThemeFormSchema });
    },
  });

  const mode = userPreference ?? "light";
  const nextMode = mode === "light" ? "dark" : "light";
  const modeLabel = {
    light: (
      <SunIcon>
        <span className="sr-only">Light</span>
      </SunIcon>
    ),
    dark: (
      <MoonIcon>
        <span className="sr-only">Dark</span>
      </MoonIcon>
    ),
  };

  return (
    <fetcher.Form method="POST" {...form.props}>
      <input type="hidden" name="theme" value={nextMode} />
      <div className="flex gap-2">
        <button
          name="intent"
          value="update-theme"
          type="submit"
          className="flex h-8 w-8 cursor-pointer items-center justify-center"
        >
          {modeLabel[mode]}
        </button>
      </div>
      <ErrorList errors={form.errors} id={form.errorId} />
    </fetcher.Form>
  );
};
