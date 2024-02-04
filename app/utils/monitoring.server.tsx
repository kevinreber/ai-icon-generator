import * as Sentry from "@sentry/remix";
/**
 * By default, Remix will handle generating the HTTP Response for you.
 * You are free to delete this file if you'd like to, but if you ever want it revealed again, you can run `npx remix reveal` ✨
 * For more information, see https://remix.run/docs/en/main/file-conventions/entry.server
 */

import { prisma } from "~/services/prisma.server";

export function init() {
  Sentry.init({
    dsn: "https://b1d58bbbf18e16501f1b26b6de2fa6a7@o4506551058759680.ingest.sentry.io/4506551062757376",
    tracesSampleRate: 1,
    integrations: [new Sentry.Integrations.Prisma({ client: prisma })],
  });
}
