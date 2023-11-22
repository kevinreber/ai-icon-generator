import { json, type ActionFunctionArgs, redirect } from "@remix-run/node";
import { updateUserData } from "~/server";
import { getSession } from "~/services";
import { z } from "zod";
import { parse } from "@conform-to/zod";
import { invariantResponse } from "~/utils/invariantResponse";
import { honeypot } from "~/utils";
import { SpamError } from "remix-utils/honeypot/server";

const MAX_PROMPT_CHARACTERS = 25;

export const EditUserFormSchema = z.object({
  username: z
    .string()
    .trim()
    .min(1, { message: "Username can not be empty" })
    .max(MAX_PROMPT_CHARACTERS, {
      message: `Username must be ${MAX_PROMPT_CHARACTERS} characters or less`,
    }),
});

export async function action({ request, params }: ActionFunctionArgs) {
  const session = await getSession(request.headers.get("Cookie"));
  const googleSessionData = (await session.get("_session")) || undefined;
  const userId = googleSessionData.id;

  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Edit user data",
  );

  switch (request.method.toUpperCase()) {
    case "PATCH": {
      const formData = await request.formData();

      try {
        // honeypot to verify our form isn't being spammed
        honeypot.check(formData);
      } catch (error) {
        if (error instanceof SpamError) {
          throw new Response("Invalid form", { status: 400 });
        }
        throw error;
      }

      // const payload = JSON.parse(formData.get("body") as string);

      const submission = parse(formData, {
        schema: EditUserFormSchema,
      });

      if (submission.intent !== "submit") {
        return json({ status: "idle", submission } as const);
      }

      if (!submission.value) {
        return json({ status: "error", submission } as const, {
          status: 400,
        });
      }
      const payload = submission.value;

      const response = await updateUserData(userId, payload);
      console.log(response);

      // return response;
      return redirect("/settings");
    }
    default: {
      return {};
    }
  }
}
