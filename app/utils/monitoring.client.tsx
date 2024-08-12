import * as Sentry from "@sentry/remix";
import { useLocation, useMatches } from "@remix-run/react";
import { useEffect } from "react";

export function init() {
  Sentry.init({
    dsn: "https://b1d58bbbf18e16501f1b26b6de2fa6a7@o4506551058759680.ingest.sentry.io/4506551062757376",
    tracesSampleRate: 1,
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1,

    integrations: [
      new Sentry.BrowserTracing({
        routingInstrumentation: Sentry.remixRouterInstrumentation(
          useEffect,
          useLocation,
          useMatches,
        ),
      }),
      new Sentry.Replay(),
    ],
  });
}
