var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: !0 });
};

// app/entry.server.tsx
var entry_server_exports = {};
__export(entry_server_exports, {
  default: () => handleRequest
});
import { PassThrough } from "node:stream";
import { createReadableStreamFromReadable } from "@remix-run/node";
import { RemixServer } from "@remix-run/react";
import isbot from "isbot";
import { renderToPipeableStream } from "react-dom/server";
import { jsxDEV } from "react/jsx-dev-runtime";
var ABORT_DELAY = 5e3;
function handleRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return isbot(request.headers.get("user-agent")) ? handleBotRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  ) : handleBrowserRequest(
    request,
    responseStatusCode,
    responseHeaders,
    remixContext
  );
}
function handleBotRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 46,
          columnNumber: 7
        },
        this
      ),
      {
        onAllReady() {
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          responseStatusCode = 500, console.error(error);
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}
function handleBrowserRequest(request, responseStatusCode, responseHeaders, remixContext) {
  return new Promise((resolve, reject) => {
    let { pipe, abort } = renderToPipeableStream(
      /* @__PURE__ */ jsxDEV(
        RemixServer,
        {
          context: remixContext,
          url: request.url,
          abortDelay: ABORT_DELAY
        },
        void 0,
        !1,
        {
          fileName: "app/entry.server.tsx",
          lineNumber: 89,
          columnNumber: 7
        },
        this
      ),
      {
        onShellReady() {
          let body = new PassThrough(), stream = createReadableStreamFromReadable(body);
          responseHeaders.set("Content-Type", "text/html"), resolve(
            new Response(stream, {
              headers: responseHeaders,
              status: responseStatusCode
            })
          ), pipe(body);
        },
        onShellError(error) {
          reject(error);
        },
        onError(error) {
          console.error(error), responseStatusCode = 500;
        }
      }
    );
    setTimeout(abort, ABORT_DELAY);
  });
}

// app/root.tsx
var root_exports = {};
__export(root_exports, {
  ThemeFormSchema: () => ThemeFormSchema,
  action: () => action2,
  default: () => App,
  links: () => links,
  loader: () => loader
});
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData as useLoaderData3
} from "@remix-run/react";
import { Layout as Layout2 } from "antd";
import {
  json as json3,
  redirect as redirect4
} from "@remix-run/node";

// app/services/auth.server.ts
import { Authenticator } from "remix-auth";
import { GoogleStrategy, SocialsProvider } from "remix-auth-socials";

// app/services/session.server.ts
import { createCookieSessionStorage } from "@remix-run/node";
var sessionStorage2 = createCookieSessionStorage({
  cookie: {
    name: "_session",
    // use any name you want here
    sameSite: "lax",
    // this helps with CSRF
    path: "/",
    // remember to add this so the cookie will work in all routes
    httpOnly: !0,
    // for security reasons, make this cookie http only
    secrets: ["s3cr3t"],
    // replace this with an actual secret
    secure: !1
    // enable this in prod only
  }
}), { getSession, commitSession, destroySession } = sessionStorage2;

// app/services/auth.server.ts
import bcrypt from "bcryptjs";

// app/services/prisma.server.ts
import { PrismaClient } from "@prisma/client";
import chalk from "chalk";

// app/utils/getS3BucketURL.ts
var getS3BucketURL = (id) => `${process.env.S3_BUCKET_URL_AWS}/${id}`;

// app/utils/fallbackImageSource.ts
var fallbackImageSource = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==";

// app/utils/getCurrentLocaleDateAsString.ts
import moment from "moment";
var getCurrentLocaleDateAsString = () => moment().format("YYYY-MM-DD HH:mm:ss");

// app/utils/downloadImage.ts
var downloadBase64Image = async (base64Image, imageName) => {
  console.log("downloading image .....");
  let nowDate = getCurrentLocaleDateAsString(), link = window.document.createElement("a");
  link.href = `data:application/octet-stream;base64,${base64Image}`, link.download = `${imageName}_${nowDate}.png`, document.body.appendChild(link), link.click(), document.body.removeChild(link);
};

// app/utils/convertUtcDateToLocalDateString.ts
var convertUtcDateToLocalDateString = (date) => new Date(date).toLocaleString();

// app/utils/getPaginationRange/getPaginationRange.ts
var getPaginationRange = (currentPage = 0, pageSize = 0, totalItems = 0) => {
  let startRange = (currentPage - 1) * pageSize + 1, endRange = Math.min(currentPage * pageSize, totalItems);
  return { startRange, endRange };
};

// app/utils/convertNumberToLocaleString.ts
var convertNumberToLocaleString = (value = 0) => value.toLocaleString("en-US");

// app/utils/getS3BucketThumbnailURL.ts
var getS3BucketThumbnailURL = (id) => `${process.env.S3_BUCKET_THUMBNAIL_URL_AWS}/resized-${id}`;

// app/utils/removeEmptyValuesFromObject.ts
var removeEmptyValuesFromObject = (obj) => {
  let result = {}, stack = Object.entries(obj);
  for (; stack.length > 0; ) {
    let [key, value] = stack.pop();
    if (value != null && value !== "")
      if (typeof value == "object") {
        let nested = Object.entries(value).filter(
          ([_, v]) => v != null && v !== ""
        );
        nested.length > 0 && (result[key] = Object.fromEntries(nested));
      } else
        result[key] = value;
  }
  return result;
};

// app/utils/getErrorMessage.ts
var getErrorMessage = (error) => typeof error == "string" ? error : error && typeof error == "object" && "message" in error && typeof error.message == "string" ? error.message : (console.error("Unable to get error message for error", error), "Unknown Error");

// app/utils/constants.ts
var LANGUAGE_MODEL_OPTIONS = [
  {
    label: "Dall-E",
    value: "dall-e"
  },
  {
    label: "Stable Diffusion XL",
    value: "stable-diffusion-xl"
  },
  {
    label: "Stable Diffusion 1.5",
    value: "stable-diffusion-1-5"
  },
  {
    label: "Stable Diffusion 2.1",
    value: "stable-diffusion-2-1"
  }
], STABLE_DIFFUSION_IMAGE_PRESETS = [
  { value: "3d-model", label: "3d-model" },
  { value: "analog-film", label: "analog-film" },
  { value: "anime", label: "anime" },
  { value: "cinematic", label: "cinematic" },
  { value: "comic-book", label: "comic-book" },
  { value: "digital-art", label: "digital-art" },
  { value: "enhance", label: "enhance" },
  { value: "fantasy-art", label: "fantasy-art" },
  { value: "isometric", label: "isometric" },
  { value: "line-art", label: "line-art" },
  { value: "low-poly", label: "low-poly" },
  { value: "modeling-compound", label: "modeling-compound" },
  { value: "neon-punk", label: "neon-punk" },
  { value: "origami", label: "origami" },
  { value: "photographic", label: "photographic" },
  { value: "pixel-art", label: "pixel-art" },
  { value: "tile-texture", label: "tile-texture" }
];

// app/utils/invariantResponse.ts
function invariantResponse(condition, message, responseInit) {
  if (!condition)
    throw new Response(
      typeof message == "function" ? message() : message || "An invariant failed, please provide a message to explain why.",
      { status: 400, ...responseInit }
    );
}

// app/utils/buildClassName.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
var buildClassName = (...inputs) => twMerge(clsx(inputs));

// app/utils/honeypot.server.ts
import { Honeypot, SpamError } from "remix-utils/honeypot/server";
var honeypot = new Honeypot({
  randomizeNameFieldName: !1,
  nameFieldName: "name__confirm",
  validFromFieldName: "from__confirm",
  // null to disable it
  encryptionSeed: process.env.HONEYPOT_SECRET
  // Ideally it should be unique even between processes
}), checkHoneypot = (formData) => {
  try {
    honeypot.check(formData);
  } catch (error) {
    throw error instanceof SpamError ? new Response("Invalid form", { status: 400 }) : error;
  }
};

// app/utils/csrf.server.ts
import { createCookie } from "@remix-run/node";
import { CSRF, CSRFError } from "remix-utils/csrf/server";
var cookie = createCookie("csrf", {
  path: "/",
  httpOnly: !0,
  secure: !1,
  sameSite: "lax",
  secrets: process.env.SESSION_SECRET?.split(",")
}), csrf = new CSRF({ cookie });
async function validateCSRF(formData, headers) {
  try {
    await csrf.validate(formData, headers);
  } catch (error) {
    throw error instanceof CSRFError ? new Response("Invalid CSRF token", { status: 403 }) : error;
  }
}

// app/utils/singleton.server.ts
function singleton(name, value) {
  let yolo = global;
  return yolo.__singletons ??= {}, yolo.__singletons[name] ??= value(), yolo.__singletons[name];
}

// app/utils/theme.server.ts
import * as cookie2 from "cookie";
var cookieName = "theme";
function getTheme(request) {
  let cookieHeader = request.headers.get("cookie"), parsed = cookieHeader ? cookie2.parse(cookieHeader)[cookieName] : "light";
  return parsed === "light" || parsed === "dark" ? parsed : "light";
}
function setTheme(theme) {
  return cookie2.serialize(cookieName, theme, { path: "/" });
}

// app/utils/toast.server.ts
import { createCookieSessionStorage as createCookieSessionStorage2, redirect } from "@remix-run/node";
import { z } from "zod";
import { createId as cuid } from "@paralleldrive/cuid2";
var toastKey = "toast", TypeSchema = z.enum(["message", "success", "error"]), ToastSchema = z.object({
  description: z.string(),
  id: z.string().default(() => cuid()),
  title: z.string().optional(),
  type: TypeSchema.default("message")
}), toastSessionStorage = createCookieSessionStorage2({
  cookie: {
    name: "aiig_toast",
    // "aiig" stands for "AI Image Generator"
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: !1
  }
});
async function getToast(request) {
  let session = await toastSessionStorage.getSession(
    request.headers.get("cookie")
  ), result = ToastSchema.safeParse(session.get(toastKey)), toast = result.success ? result.data : null;
  return {
    toast,
    headers: toast ? new Headers({
      "set-cookie": await toastSessionStorage.destroySession(session)
    }) : null
  };
}

// app/utils/combineHeaders.ts
var combineHeaders = (...headers) => {
  let combined = new Headers();
  for (let header of headers)
    if (header)
      for (let [key, value] of new Headers(header).entries())
        combined.append(key, value);
  return combined;
};

// app/utils/session.server.ts
import { createCookieSessionStorage as createCookieSessionStorage3 } from "@remix-run/node";
var sessionStorage3 = createCookieSessionStorage3({
  cookie: {
    name: "aiig_session",
    // "aiig" stands for "AI Image Generator"
    sameSite: "lax",
    path: "/",
    httpOnly: !0,
    secrets: process.env.SESSION_SECRET.split(","),
    secure: !1
  }
});

// app/utils/userValidation.ts
import { z as z2 } from "zod";
var UsernameSchema = z2.string({ required_error: "Username is required" }).min(3, { message: "Username is too short" }).max(20, { message: "Username is too long" }).regex(/^[a-zA-Z0-9_]+$/, {
  message: "Username can only include letters, numbers, and underscores"
}).transform((value) => value.toLowerCase()), PasswordSchema = z2.string({ required_error: "Password is required" }).min(6, { message: "Password is too short" }).max(100, { message: "Password is too long" }), NameSchema = z2.string({ required_error: "Name is required" }).min(3, { message: "Name is too short" }).max(40, { message: "Name is too long" }), EmailSchema = z2.string({ required_error: "Email is required" }).email({ message: "Email is invalid" }).min(3, { message: "Email is too short" }).max(100, { message: "Email is too long" }).transform((value) => value.toLowerCase());

// app/utils/getSessionExpirationDate.ts
var getSessionExpirationDate = () => new Date(Date.now() + 2592e6);

// app/utils/permissions.ts
import { json } from "@remix-run/node";
var requireUserWithPermission = async (request, permission) => {
  let userId = await requireUserId(request), permissionData = parsePermissionString(permission), user = await prisma.user.findFirst({
    select: { id: !0 },
    where: {
      id: userId,
      roles: {
        some: {
          permissions: {
            some: {
              ...permissionData,
              access: permissionData.access ? { in: permissionData.access } : void 0
            }
          }
        }
      }
    }
  });
  if (!user)
    throw json(
      {
        error: "Unauthorized",
        requiredPermission: permissionData,
        message: `Unauthorized: required permissions: ${permission}`
      },
      { status: 403 }
    );
  return user.id;
}, requireUserWithRole = async (request, name) => {
  let userId = await requireUserId(request);
  console.log(userId);
  let user = await prisma.user.findFirst({
    select: { id: !0 },
    where: { id: userId, roles: { some: { name } } }
  });
  if (!user)
    throw json(
      {
        error: "Unauthorized",
        requiredRole: name,
        message: `Unauthorized: required role: ${name}`
      },
      { status: 403 }
    );
  return user.id;
}, parsePermissionString = (permissionString) => {
  let [action19, entity, access] = permissionString.split(":");
  return {
    action: action19,
    entity,
    access: access ? access.split(",") : void 0
  };
};

// app/services/prisma.server.ts
var prisma = singleton("prisma", () => {
  let client = new PrismaClient({
    log: [
      { level: "query", emit: "event" },
      { level: "error", emit: "stdout" },
      { level: "info", emit: "stdout" },
      { level: "warn", emit: "stdout" }
    ]
  });
  return client.$on("query", async (e) => {
    if (e.duration < 0)
      return;
    let color = e.duration < 0 * 1.1 ? "green" : e.duration < 0 * 1.2 ? "blue" : e.duration < 0 * 1.3 ? "yellow" : e.duration < 0 * 1.4 ? "redBright" : "red", dur = chalk[color](`${e.duration}ms`);
    console.info(`prisma:query - ${dur} - ${e.query}`);
  }), client.$connect(), client;
});

// app/services/auth.server.ts
import { redirect as redirect2 } from "@remix-run/node";
var SESSION_KEY = "_session", authenticator = new Authenticator(sessionStorage2, {
  sessionKey: SESSION_KEY
}), getCallback = (provider) => `${process.env.ORIGIN}/auth/${provider}/callback`;
authenticator.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: getCallback(SocialsProvider.GOOGLE)
    },
    async ({ profile }) => profile
  )
);
var userIdKey = "userId", getUserId = async (request) => {
  let userId = (await sessionStorage2.getSession(
    request.headers.get("cookie")
  )).get(userIdKey);
  return console.log(userId), (await authenticator.isAuthenticated(request))?.id || "";
  if (!userId)
    return null;
  let user = await prisma.user.findUnique({
    select: { id: !0 },
    where: { id: userId }
  });
  return user ? user.id : authenticator.logout(request, { redirectTo: "/" });
}, requireUserId = async (request, { redirectTo } = {}) => {
  let userId = await getUserId(request);
  if (!userId) {
    let requestUrl = new URL(request.url);
    redirectTo = redirectTo === null ? null : redirectTo ?? `${requestUrl.pathname}${requestUrl.search}`;
    let loginRedirect = ["/login", (redirectTo ? new URLSearchParams({ redirectTo }) : null)?.toString()].filter(Boolean).join("?");
    throw redirect2(loginRedirect);
  }
  return userId;
};

// app/server/createImageFromDallEAPI/createImageFromDallEAPI.ts
import { Configuration, OpenAIApi } from "openai";
import { setTimeout as setTimeout2 } from "timers/promises";

// app/server/createImageFromDallEAPI/utils/getMockDataResponse.ts
var MOCK_IMAGE_ID = "cliid9qad0001r2q9pscacuj0", getMockDataResponse = (numberOfImages = 1) => {
  let imageURL = getS3BucketURL(MOCK_IMAGE_ID), thumbnailURL = getS3BucketThumbnailURL(MOCK_IMAGE_ID), mockDallEImage = {
    id: MOCK_IMAGE_ID,
    prompt: "using mock data",
    userId: "testUser123",
    createdAt: "2023-06-26 03:17:19",
    user: {
      userId: "123456789",
      username: "testUser123"
    },
    url: imageURL,
    thumbnailURL,
    comments: []
  };
  return new Array(numberOfImages).fill(mockDallEImage);
};

// app/server/createImageFromDallEAPI/createImageFromDallEAPI.ts
var configuration = new Configuration({
  apiKey: process.env.DALLE_API_KEY
}), openai = new OpenAIApi(configuration), DEFAULT_NUMBER_OF_IMAGES_CREATED = 1, IMAGE_SIZE = "1024x1024", DEFAULT_AI_IMAGE_LANGUAGE_MODEL = "dall-e", DEFAULT_IS_IMAGE_PRIVATE = !1, THREE_SECONDS_IN_MS = 1e3 * 3, BASE_64_FORMAT = "b64_json", DEFAULT_PAYLOAD = {
  prompt: "",
  numberOfImages: DEFAULT_NUMBER_OF_IMAGES_CREATED,
  model: DEFAULT_AI_IMAGE_LANGUAGE_MODEL,
  private: DEFAULT_IS_IMAGE_PRIVATE
}, createDallEImages = async (prompt, numberOfImages = DEFAULT_NUMBER_OF_IMAGES_CREATED) => {
  let promptMessage = prompt, numberOfImagesToGenerate = Math.round(numberOfImages);
  return (await openai.createImage({
    prompt: promptMessage,
    n: numberOfImagesToGenerate,
    size: IMAGE_SIZE,
    response_format: BASE_64_FORMAT
  })).data.data.map(
    (result) => result.b64_json
  );
}, createImageFromDallEAPI = async (formData = DEFAULT_PAYLOAD, userId) => {
  let {
    prompt,
    numberOfImages,
    model,
    private: isImagePrivate = !1
  } = formData;
  try {
    if (process.env.USE_MOCK_DALLE === "true") {
      console.log(
        "\x1B[33m \u26A0\uFE0F Warning \u2013 Using Mock Data ************************* \x1B[0m"
      );
      let mockData = getMockDataResponse(numberOfImages);
      return await setTimeout2(THREE_SECONDS_IN_MS), { images: mockData };
    }
    let imagesImages = await createDallEImages(prompt, numberOfImages);
    return { images: await Promise.all(
      imagesImages.map(async (imageImage) => {
        let imageData = await addNewImageToDB({
          prompt,
          userId,
          model,
          preset: "",
          isImagePrivate
        });
        console.log("Stored Image Data in DB: ", imageData.id), await addBase64EncodedImageToAWS(imageImage, imageData.id), console.log("Stored S3 Data for Image ID: ", imageData.id);
        let imageURL = getS3BucketURL(imageData.id), thumbnailURL = getS3BucketThumbnailURL(imageData.id);
        return {
          ...imageData,
          url: imageURL,
          thumbnailURL
        };
      })
    ) };
  } catch (error) {
    return console.error(error), { images: [] };
  }
};

// app/server/addBase64EncodedImageToAWS/addBase64EncodedImageToAWS.ts
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
var s3Client = new S3Client({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
  },
  region: process.env.REGION_AWS
}), addBase64EncodedImageToAWS = async (base64EncodedImage, iconId) => {
  let putObjectCommand = new PutObjectCommand({
    Key: iconId,
    Bucket: process.env.S3_BUCKET_NAME_AWS,
    Body: Buffer.from(base64EncodedImage, "base64"),
    ContentType: "image/png",
    ContentEncoding: "base64"
  });
  try {
    return await s3Client.send(putObjectCommand);
  } catch (error) {
    throw console.warn("Error Saving image to AWS S3 Bucket"), console.error(error), new Error("Error Saving image to AWS S3 Bucket");
  }
};

// app/server/getLoggedInUserData/getLoggedInUserData.ts
var getLoggedInUserData = async (userGoogleData, request) => {
  let userId = userGoogleData.id, userData = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: !0,
      name: !0,
      username: !0,
      email: !0,
      image: !0,
      createdAt: !0,
      credits: !0,
      collections: {
        select: {
          id: !0,
          title: !0,
          description: !0,
          images: {
            select: {
              imageId: !0
            }
          }
        }
      },
      roles: {
        select: {
          name: !0,
          permissions: {
            select: {
              action: !0,
              entity: !0,
              access: !0
            }
          }
        }
      }
    }
  });
  if (!userData?.id) {
    let { name, email, picture } = userGoogleData._json;
    userData = await prisma.user.create({
      data: {
        id: userId,
        name,
        username: userGoogleData.displayName,
        email,
        image: picture,
        roles: { connect: { name: "user" } }
      }
    });
  }
  return userData;
};

// app/server/addNewImageToDB/addNewImageToDB.ts
var addNewImageToDB = async ({
  prompt,
  userId,
  model,
  preset = "",
  isImagePrivate = !1
}) => await prisma.image.create({
  data: {
    prompt,
    userId,
    model,
    stylePreset: preset,
    private: isImagePrivate
  }
});

// app/server/getImages/getImages.ts
import { z as z3 } from "zod";
var DEFAULT_CURRENT_PAGE = 1, DEFAULT_PAGE_SIZE = 50, ImagesSearchResultSchema = z3.object({
  id: z3.string(),
  title: z3.string().nullable().optional(),
  prompt: z3.string(),
  model: z3.string(),
  stylePreset: z3.string().nullable().optional(),
  userId: z3.string(),
  createdAt: z3.date()
}), ImagesSearchResultsSchema = z3.array(ImagesSearchResultSchema), getImages = async (searchTerm = "", page = DEFAULT_CURRENT_PAGE, pageSize = DEFAULT_PAGE_SIZE) => {
  let like = `%${searchTerm ?? ""}%`, rawImages = await prisma.$queryRaw`
  SELECT i.id, i.title, i.prompt, i.model, i."stylePreset", i."userId", i."createdAt" 
  FROM "Image" i
  WHERE i.private = false AND (i.title LIKE ${like} OR i.prompt LIKE ${like} OR i."stylePreset" LIKE ${like})
  ORDER BY i."createdAt" DESC
  LIMIT ${pageSize} OFFSET ${(page - 1) * pageSize};
  `, result = ImagesSearchResultsSchema.safeParse(rawImages);
  return result.success ? {
    status: "idle",
    images: result.data.map((image) => ({
      ...image,
      url: getS3BucketURL(image.id),
      thumbnailURL: getS3BucketThumbnailURL(image.id)
    }))
  } : {
    status: "error",
    error: result.error.message,
    images: []
  };
};

// app/server/deleteImageFromDB/deleteImageFromDB.ts
var deleteImageFromDB = async (imageId) => {
  try {
    return await prisma.image.delete({
      where: {
        id: imageId
      }
    });
  } catch (error) {
    return console.warn("Error removing image from DB"), console.error(error), error;
  }
};

// app/server/deleteImageFromS3Bucket/deleteImageFromS3Bucket.ts
import { S3Client as S3Client2, DeleteObjectCommand } from "@aws-sdk/client-s3";
var s3Client2 = new S3Client2({
  credentials: {
    accessKeyId: process.env.ACCESS_KEY_ID_AWS,
    secretAccessKey: process.env.SECRET_ACCESS_KEY_AWS
  },
  region: process.env.REGION_AWS
}), deleteImageFromS3Bucket = async (imageId) => {
  let deleteObjectCommand = new DeleteObjectCommand({
    Key: imageId,
    Bucket: process.env.S3_BUCKET_NAME_AWS
  });
  try {
    return await s3Client2.send(deleteObjectCommand);
  } catch (error) {
    return console.warn("Error removing image from AWS S3 Bucket"), console.error(error), error;
  }
};

// app/server/deleteUserImage/deleteUserImage.ts
var deleteUserImage = async (imageId) => {
  try {
    let deleteImageResponse = await deleteImageFromDB(imageId);
    console.log("Delete from DB -------------"), console.log(deleteImageResponse);
    let deleteImageFromS3BucketResponse = await deleteImageFromS3Bucket(imageId);
    return console.log("Delete from S3 -------------"), console.log(deleteImageFromS3BucketResponse), {
      success: !0,
      data: {
        imageId,
        message: `Successfully removed Image ID: ${imageId}`,
        deleteImageResponse,
        deleteImageFromS3BucketResponse
      }
    };
  } catch (error) {
    return console.error(error), {
      success: !1,
      data: {
        imageId,
        message: `Error removing Image ID: ${imageId}`,
        error
      }
    };
  }
};

// app/server/getImageBase64/getImageBase64.ts
var getImageBase64 = async (imageId) => {
  let imageURL = getS3BucketURL(imageId);
  return await fetch(imageURL).then((response) => response.arrayBuffer()).then((blob) => Buffer.from(blob).toString("base64"));
};

// app/server/updateUserData/updateUserData.ts
var updateUserData = async (userId, payload) => {
  try {
    let message = `Success updating User Data for userID: ${userId}`, { username } = payload;
    return {
      success: !0,
      data: await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          username
        }
      }),
      message
    };
  } catch (error) {
    let message = `Error updating User Data for userID: ${userId}`;
    return console.error(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/comments/createComment/createComment.ts
var createComment = async ({
  imageId,
  userId,
  comment
}) => {
  try {
    return await prisma.comment.create({
      data: {
        imageId,
        userId,
        message: comment
      }
    });
  } catch (error) {
    return console.warn("Error creating comment to DB"), console.error(error), error;
  }
};

// app/server/comments/deleteComment/deleteComment.ts
var deleteComment = async (commentId) => {
  try {
    return await prisma.comment.delete({
      where: {
        id: commentId
      }
    });
  } catch (error) {
    return console.warn("Error deleting comment from DB"), console.error(error), error;
  }
};

// app/server/comments/toggleCommentLikes.ts
var toggleCommentLikes = async ({
  commentId,
  userId
}) => {
  try {
    let data = { userId, commentId };
    return await prisma.commentLike.findUnique({
      where: { userId_commentId: data }
    }) == null ? {
      success: !0,
      addLike: !0,
      data: await createCommentLike({ userId, commentId }),
      message: "Successfully liked comment"
    } : {
      success: !0,
      addLike: !1,
      data: await deleteCommentLike({ userId, commentId }),
      message: "Successfully unliked comment"
    };
  } catch (error) {
    let message = `Error adding Like to commentID: ${commentId}`;
    return console.warn(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/comments/createCommentLike.ts
var createCommentLike = async ({
  commentId,
  userId
}) => {
  let data = { userId, commentId };
  return await prisma.commentLike.create({ data });
};

// app/server/comments/deleteCommentLike.ts
var deleteCommentLike = async ({
  commentId,
  userId
}) => {
  let data = { userId, commentId };
  return await prisma.commentLike.delete({
    where: { userId_commentId: data }
  });
};

// app/server/images/toggleImageLikes.ts
var toggleImageLikes = async ({
  imageId,
  userId
}) => {
  try {
    let data = { userId, imageId };
    return await prisma.imageLike.findUnique({
      where: { userId_imageId: data }
    }) == null ? {
      success: !0,
      addLike: !0,
      data: await createImageLike({ userId, imageId }),
      message: "Successfully liked image"
    } : {
      success: !0,
      addLike: !1,
      data: await deleteImageLike({ userId, imageId }),
      message: "Successfully unliked image"
    };
  } catch (error) {
    let message = `Error adding Like to imageID: ${imageId}`;
    return console.warn(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/images/createImageLike.ts
var createImageLike = async ({
  imageId,
  userId
}) => {
  let data = { userId, imageId };
  return await prisma.imageLike.create({ data });
};

// app/server/images/deleteImageLike.ts
var deleteImageLike = async ({
  imageId,
  userId
}) => {
  let data = { userId, imageId };
  return await prisma.imageLike.delete({
    where: { userId_imageId: data }
  });
};

// app/server/images/updateImageData.ts
var updateImageData = async (imageId, payload) => {
  try {
    let message = `Success updating Image Data for imageID: ${imageId}`, formattedPayload = removeEmptyValuesFromObject(payload);
    return {
      success: !0,
      data: await prisma.image.update({
        where: {
          id: imageId
        },
        data: {
          ...formattedPayload
        }
      }),
      message
    };
  } catch (error) {
    let message = `Error updating Image Data for imageID: ${imageId}`;
    return console.error(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/createImageFromStableDiffusionAPI/createImageFromStableDiffusionAPI.ts
import { setTimeout as setTimeout3 } from "timers/promises";

// app/server/createImageFromStableDiffusionAPI/utils/getMockDataResponse.ts
var MOCK_IMAGE_ID2 = "stable-diffusion-xl-futuristic-bonsai-tree", getMockDataResponse2 = (numberOfImages = 1) => {
  let imageURL = getS3BucketURL(MOCK_IMAGE_ID2), thumbnailURL = getS3BucketThumbnailURL(MOCK_IMAGE_ID2), mockImageData = {
    id: MOCK_IMAGE_ID2,
    prompt: "using mock data",
    userId: "testUser123",
    createdAt: "2023-06-26 03:17:19",
    user: {
      userId: "123456789",
      username: "testUser123"
    },
    url: imageURL,
    thumbnailURL,
    comments: []
  };
  return new Array(numberOfImages).fill(mockImageData);
};

// app/server/createImageFromStableDiffusionAPI/utils/getEngineId.ts
var STABLE_DIFFUSION_XL_ID = "stable-diffusion-xl-1024-v1-0", STABLE_DIFFUSION_1_5_ID = "stable-diffusion-v1-5", STABLE_DIFFUSION_2_1_ID = "stable-diffusion-512-v2-1", getEngineId = (model) => {
  let engineId = STABLE_DIFFUSION_XL_ID;
  return model.includes("1-5") && (engineId = STABLE_DIFFUSION_1_5_ID), model.includes("2-5") && (engineId = STABLE_DIFFUSION_2_1_ID), engineId;
};

// app/server/createImageFromStableDiffusionAPI/createImageFromStableDiffusionAPI.ts
var IMAGE_HEIGHT = 1024, IMAGE_WIDTH = 1024, THREE_SECONDS_IN_MS2 = 1e3 * 3, DEFAULT_NUMBER_OF_IMAGES_CREATED2 = 1, DEFAULT_AI_IMAGE_LANGUAGE_MODEL2 = "stable-diffusion-xl", DEFAULT_IMAGE_STYLE_PRESET = void 0, DEFAULT_IS_IMAGE_PRIVATE2 = !1, DEFAULT_PAYLOAD2 = {
  prompt: "",
  numberOfImages: DEFAULT_NUMBER_OF_IMAGES_CREATED2,
  model: DEFAULT_AI_IMAGE_LANGUAGE_MODEL2,
  stylePreset: DEFAULT_IMAGE_STYLE_PRESET,
  private: DEFAULT_IS_IMAGE_PRIVATE2
}, createStableDiffusionImages = async ({
  prompt,
  numberOfImages = DEFAULT_NUMBER_OF_IMAGES_CREATED2,
  model = DEFAULT_AI_IMAGE_LANGUAGE_MODEL2,
  stylePreset = DEFAULT_IMAGE_STYLE_PRESET
}) => {
  let promptMessage = prompt, numberOfImagesToGenerate = Math.round(numberOfImages), engineId = getEngineId(model), body = {
    /**
     * `cfg_scale` is how strictly the diffusion process adheres to the prompt text.
     * The higher values keep your image closer to your prompt (Ex: 1-35)
     */
    cfg_scale: 7,
    height: IMAGE_HEIGHT,
    width: IMAGE_WIDTH,
    steps: 40,
    style_preset: stylePreset,
    samples: numberOfImagesToGenerate,
    text_prompts: [
      {
        text: promptMessage,
        weight: 1
      }
    ]
  };
  try {
    let response = await fetch(
      `${process.env.STABLE_DIFFUSION_API_ENDPOINT}/v1/generation/${engineId}/text-to-image`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${process.env.STABLE_DIFFUSION_API_KEY}`
        },
        body: JSON.stringify(body)
      }
    );
    if (!response.ok)
      throw new Error("Invalid Response");
    let responseJSON = await response.json();
    return console.log(responseJSON), responseJSON;
  } catch (error) {
    throw console.error(error), new Error(`Error creating image using language model: ${model}`);
  }
}, createImageFromStableDiffusionAPI = async (formData = DEFAULT_PAYLOAD2, userId) => {
  let {
    prompt,
    numberOfImages,
    model,
    stylePreset,
    private: isImagePrivate = !1
  } = formData;
  try {
    if (process.env.USE_MOCK_DALLE === "tru") {
      console.log(
        "\x1B[33m \u26A0\uFE0F Warning \u2013 Using Mock Data ************************* \x1B[0m"
      );
      let mockData = getMockDataResponse2(numberOfImages);
      return await setTimeout3(THREE_SECONDS_IN_MS2), { images: mockData };
    }
    let images = await createStableDiffusionImages({
      prompt,
      numberOfImages,
      model,
      stylePreset
    });
    return { images: await Promise.all(
      images.artifacts.map(async (image) => {
        if (image.finishReason !== "ERROR") {
          let imageData = await addNewImageToDB({
            prompt,
            userId,
            model,
            preset: stylePreset,
            isImagePrivate
          });
          console.log("Stored Image Data in DB: ", imageData.id), await addBase64EncodedImageToAWS(image.base64, imageData.id), console.log("Stored S3 Data for Image ID: ", imageData.id);
          let imageURL = getS3BucketURL(imageData.id), thumbnailURL = getS3BucketThumbnailURL(imageData.id);
          return {
            ...imageData,
            url: imageURL,
            thumbnailURL
          };
        }
      })
    ) };
  } catch (error) {
    return console.error(error), { images: [] };
  }
};

// app/server/getUserData/getUserData.ts
var DEFAULT_CURRENT_PAGE2 = 1, DEFAULT_PAGE_SIZE2 = 50, createImageSelectQuery = () => ({
  select: {
    id: !0,
    title: !0,
    prompt: !0,
    model: !0,
    stylePreset: !0,
    private: !0,
    user: {
      select: {
        id: !0,
        username: !0
      }
    },
    createdAt: !0,
    comments: {
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: !0,
        message: !0,
        createdAt: !0,
        updatedAt: !0,
        user: {
          select: {
            id: !0,
            username: !0,
            image: !0
          }
        },
        parentId: !0,
        likes: !0
      }
    },
    likes: {
      select: {
        userId: !0
      }
    }
  }
}), getUserData = async (userId, page = DEFAULT_CURRENT_PAGE2, pageSize = DEFAULT_PAGE_SIZE2) => {
  let selectImageQuery = createImageSelectQuery(), count = await prisma.image.count({
    where: {
      userId
    }
  }), userData = await prisma.user.findUnique({
    where: {
      id: userId
    },
    select: {
      id: !0,
      name: !0,
      username: !0,
      image: !0,
      createdAt: !0,
      // @ts-ignore
      images: {
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: "desc"
        },
        ...selectImageQuery
      }
    }
  }), formattedImages = userData?.images.map((image) => ({
    ...image,
    url: getS3BucketURL(image.id),
    thumbnailURL: getS3BucketThumbnailURL(image.id)
  }));
  return { user: userData, images: formattedImages, count };
};

// app/server/getUserCollections/getUserCollections.ts
var DEFAULT_CURRENT_PAGE3 = 1, DEFAULT_PAGE_SIZE3 = 50, getUserCollections = async (userId, page = DEFAULT_CURRENT_PAGE3, pageSize = DEFAULT_PAGE_SIZE3) => {
  let count = await prisma.collection.count({
    where: {
      userId
    }
  });
  return { collections: await prisma.collection.findMany({
    take: pageSize,
    skip: (page - 1) * pageSize,
    where: {
      userId
    },
    orderBy: {
      createdAt: "desc"
    },
    select: {
      id: !0,
      title: !0,
      description: !0,
      user: {
        select: {
          id: !0,
          username: !0
        }
      },
      createdAt: !0,
      updatedAt: !0,
      images: {
        select: {
          id: !0
        }
      }
    }
  }), count };
};

// app/server/createNewCollection/createNewCollection.ts
var createNewCollection = async ({
  userId,
  title,
  description = ""
}) => {
  try {
    return await prisma.collection.create({
      data: {
        userId,
        title,
        description
      }
    });
  } catch (error) {
    return console.warn("Error creating collection to DB"), console.error(error), error;
  }
};

// app/server/deleteCollection/deleteCollection.ts
var deleteCollection = async (collectionId) => {
  try {
    return await prisma.collection.delete({
      where: {
        id: collectionId
      }
    });
  } catch (error) {
    return console.warn("Error deleting collection from DB: ", collectionId), console.error(error), error;
  }
};

// app/server/updateCollection/updateCollection.ts
var updateCollection = async (collectionId, payload) => {
  try {
    let message = `Success updating Collection Data for collectionId: ${collectionId}`, { title, description } = payload;
    return {
      success: !0,
      data: await prisma.collection.update({
        where: {
          id: collectionId
        },
        data: {
          title,
          description
        }
      }),
      message
    };
  } catch (error) {
    let message = `Error updating Collection Data for collectionId: ${collectionId}`;
    return console.error(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/getCollectionData/getCollectionData.ts
var getCollectionData = async (collectionId) => {
  try {
    return { collection: await prisma.collection.findUnique({
      where: {
        id: collectionId
      },
      select: {
        id: !0,
        title: !0,
        description: !0,
        user: {
          select: {
            id: !0,
            username: !0
          }
        },
        createdAt: !0,
        updatedAt: !0,
        images: {
          select: {
            image: {
              select: {
                id: !0,
                prompt: !0,
                model: !0,
                stylePreset: !0,
                title: !0,
                createdAt: !0,
                comments: !0,
                user: {
                  select: {
                    id: !0,
                    username: !0
                  }
                },
                likes: !0
              }
            }
          }
        }
      }
    }) };
  } catch (error) {
    throw console.error(error), new Error(error);
  }
};

// app/server/addImageToCollection/addImageToCollection.ts
var addImageToCollection = async ({
  collectionId,
  imageId
}) => {
  try {
    let message = "Successfully added Image to Collection";
    return {
      success: !0,
      data: await prisma.collectionHasImage.create({
        data: {
          collectionId,
          imageId
        }
      }),
      message
    };
  } catch (error) {
    let message = "Error adding Image to Collection";
    return console.error(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/removeImageFromCollection/removeImageFromCollection.ts
var removeImageFromCollection = async ({
  collectionId,
  imageId
}) => {
  try {
    let message = "Successfully removed Image from Collection";
    return {
      success: !0,
      data: await prisma.collectionHasImage.deleteMany({
        where: {
          collectionId,
          imageId
        }
      }),
      message
    };
  } catch (error) {
    let message = "Error removing Image from Collection";
    return console.error(message), console.error(error), {
      success: !1,
      data: {},
      message,
      error
    };
  }
};

// app/server/getUserDataByUsername/getUserDataByUsername.ts
var DEFAULT_CURRENT_PAGE4 = 1, DEFAULT_PAGE_SIZE4 = 50, createImageSelectQuery2 = () => ({
  // Make sure we aren't returning private images to logged in user
  where: { private: !1 },
  select: {
    id: !0,
    title: !0,
    prompt: !0,
    model: !0,
    stylePreset: !0,
    private: !0,
    user: {
      select: {
        id: !0,
        username: !0
      }
    },
    createdAt: !0,
    comments: {
      orderBy: {
        createdAt: "desc"
      },
      select: {
        id: !0,
        message: !0,
        createdAt: !0,
        updatedAt: !0,
        user: {
          select: {
            id: !0,
            username: !0,
            image: !0
          }
        },
        parentId: !0,
        likes: !0
      }
    },
    likes: {
      select: {
        userId: !0
      }
    }
  }
}), getUserDataByUsername = async (username, page = DEFAULT_CURRENT_PAGE4, pageSize = DEFAULT_PAGE_SIZE4) => {
  let selectImageQuery = createImageSelectQuery2(), count = await prisma.image.count({
    where: {
      user: {
        username
      }
    }
  }), userData = await prisma.user.findUnique({
    where: {
      username
    },
    select: {
      id: !0,
      name: !0,
      username: !0,
      image: !0,
      createdAt: !0,
      // @ts-ignore
      images: {
        take: pageSize,
        skip: (page - 1) * pageSize,
        orderBy: {
          createdAt: "desc"
        },
        ...selectImageQuery
      }
    }
  }), formattedImages = userData?.images.map((image) => ({
    ...image,
    url: getS3BucketURL(image.id),
    thumbnailURL: getS3BucketThumbnailURL(image.id)
  }));
  return { user: userData, images: formattedImages, count };
};

// app/server/getImage/getImage.ts
var getImage = async (imageId) => ({
  ...await prisma.image.findUnique({
    where: { id: imageId },
    select: {
      id: !0,
      title: !0,
      prompt: !0,
      model: !0,
      stylePreset: !0,
      private: !0,
      user: {
        select: {
          id: !0,
          username: !0
        }
      },
      createdAt: !0,
      comments: {
        orderBy: {
          createdAt: "desc"
        },
        select: {
          id: !0,
          message: !0,
          createdAt: !0,
          updatedAt: !0,
          user: {
            select: {
              id: !0,
              username: !0,
              image: !0
            }
          },
          parentId: !0,
          likes: !0
        }
      },
      likes: {
        select: {
          userId: !0
        }
      }
    }
  }),
  url: getS3BucketURL(imageId),
  thumbnailURL: getS3BucketThumbnailURL(imageId)
});

// app/components/UserAvatar/UserAvatar.tsx
import React24 from "react";
import { Popover, Button, Avatar, Space, notification, Typography } from "antd";

// node_modules/@ant-design/icons/es/components/Context.js
import { createContext } from "react";
var IconContext = /* @__PURE__ */ createContext({}), Context_default = IconContext;

// node_modules/@ant-design/icons/es/components/AntdIcon.js
import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray2 from "@babel/runtime/helpers/esm/slicedToArray";
import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties2 from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React3 from "react";
import classNames from "classnames";
import { blue } from "@ant-design/colors";

// node_modules/@ant-design/icons/es/components/IconBase.js
import _objectWithoutProperties from "@babel/runtime/helpers/esm/objectWithoutProperties";
import _objectSpread2 from "@babel/runtime/helpers/esm/objectSpread2";
import * as React2 from "react";

// node_modules/@ant-design/icons/es/utils.js
import _objectSpread from "@babel/runtime/helpers/esm/objectSpread2";
import _typeof from "@babel/runtime/helpers/esm/typeof";
import { generate as generateColor } from "@ant-design/colors";

// node_modules/rc-util/es/Dom/canUseDom.js
function canUseDom() {
  return !!(typeof window < "u" && window.document && window.document.createElement);
}

// node_modules/rc-util/es/Dom/contains.js
function contains(root, n) {
  if (!root)
    return !1;
  if (root.contains)
    return root.contains(n);
  for (var node = n; node; ) {
    if (node === root)
      return !0;
    node = node.parentNode;
  }
  return !1;
}

// node_modules/rc-util/es/Dom/dynamicCSS.js
var APPEND_ORDER = "data-rc-order", APPEND_PRIORITY = "data-rc-priority", MARK_KEY = "rc-util-key", containerCache = /* @__PURE__ */ new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
  return mark ? mark.startsWith("data-") ? mark : "data-".concat(mark) : MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo)
    return option.attachTo;
  var head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  return prepend === "queue" ? "prependQueue" : prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function(node) {
    return node.tagName === "STYLE";
  });
}
function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!canUseDom())
    return null;
  var csp = option.csp, prepend = option.prepend, _option$priority = option.priority, priority = _option$priority === void 0 ? 0 : _option$priority, mergedOrder = getOrder(prepend), isPrependQueue = mergedOrder === "prependQueue", styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, mergedOrder), isPrependQueue && priority && styleNode.setAttribute(APPEND_PRIORITY, "".concat(priority)), csp != null && csp.nonce && (styleNode.nonce = csp?.nonce), styleNode.innerHTML = css;
  var container = getContainer(option), firstChild = container.firstChild;
  if (prepend) {
    if (isPrependQueue) {
      var existStyle = findStyles(container).filter(function(node) {
        if (!["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER)))
          return !1;
        var nodePriority = Number(node.getAttribute(APPEND_PRIORITY) || 0);
        return priority >= nodePriority;
      });
      if (existStyle.length)
        return container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling), styleNode;
    }
    container.insertBefore(styleNode, firstChild);
  } else
    container.appendChild(styleNode);
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, container = getContainer(option);
  return findStyles(container).find(function(node) {
    return node.getAttribute(getMark(option)) === key;
  });
}
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !contains(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS("", option), parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode), container.removeChild(placeholderStyle);
  }
}
function updateCSS(css, key) {
  var option = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {}, container = getContainer(option);
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    return existNode.innerHTML !== css && (existNode.innerHTML = css), existNode;
  }
  var newNode = injectCSS(css, option);
  return newNode.setAttribute(getMark(option), key), newNode;
}

// node_modules/rc-util/es/Dom/shadow.js
function getRoot(ele) {
  var _ele$getRootNode;
  return ele == null || (_ele$getRootNode = ele.getRootNode) === null || _ele$getRootNode === void 0 ? void 0 : _ele$getRootNode.call(ele);
}
function inShadow(ele) {
  return getRoot(ele) instanceof ShadowRoot;
}
function getShadowRoot(ele) {
  return inShadow(ele) ? getRoot(ele) : null;
}

// node_modules/rc-util/es/warning.js
var warned = {}, preWarningFns = [], preMessage = function(fn) {
  preWarningFns.push(fn);
};
function warning(valid, message) {
  if (!valid && console !== void 0) {
    var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg ?? "", "warning");
    }, message);
    finalMessage && console.error("Warning: ".concat(finalMessage));
  }
}
function note(valid, message) {
  if (!valid && console !== void 0) {
    var finalMessage = preWarningFns.reduce(function(msg, preMessageFn) {
      return preMessageFn(msg ?? "", "note");
    }, message);
    finalMessage && console.warn("Note: ".concat(finalMessage));
  }
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message) {
  !valid && !warned[message] && (method(!1, message), warned[message] = !0);
}
function warningOnce(valid, message) {
  call(warning, valid, message);
}
function noteOnce(valid, message) {
  call(note, valid, message);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
var warning_default = warningOnce;

// node_modules/@ant-design/icons/es/utils.js
import React, { useContext, useEffect } from "react";
function camelCase(input) {
  return input.replace(/-(.)/g, function(match, g) {
    return g.toUpperCase();
  });
}
function warning2(valid, message) {
  warning_default(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return _typeof(target) === "object" && typeof target.name == "string" && typeof target.theme == "string" && (_typeof(target.icon) === "object" || typeof target.icon == "function");
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(attrs).reduce(function(acc, key) {
    var val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val, delete acc.class;
        break;
      default:
        delete acc[key], acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  return rootProps ? /* @__PURE__ */ React.createElement(node.tag, _objectSpread(_objectSpread({
    key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  })) : /* @__PURE__ */ React.createElement(node.tag, _objectSpread({
    key
  }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index));
  }));
}
function getSecondaryColor(primaryColor) {
  return generateColor(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  return twoToneColor ? Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor] : [];
}
var svgBaseProps = {
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false"
}, iconStyles = `
.anticon {
  display: inline-block;
  color: inherit;
  font-style: normal;
  line-height: 0;
  text-align: center;
  text-transform: none;
  vertical-align: -0.125em;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.anticon > * {
  line-height: 1;
}

.anticon svg {
  display: inline-block;
}

.anticon::before {
  display: none;
}

.anticon .anticon-icon {
  display: block;
}

.anticon[tabindex] {
  cursor: pointer;
}

.anticon-spin::before,
.anticon-spin {
  display: inline-block;
  -webkit-animation: loadingCircle 1s infinite linear;
  animation: loadingCircle 1s infinite linear;
}

@-webkit-keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

@keyframes loadingCircle {
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}
`, useInsertStyles = function(eleRef) {
  var _useContext = useContext(Context_default), csp = _useContext.csp, prefixCls = _useContext.prefixCls, mergedStyleStr = iconStyles;
  prefixCls && (mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls)), useEffect(function() {
    var ele = eleRef.current, shadowRoot = getShadowRoot(ele);
    updateCSS(mergedStyleStr, "@ant-design-icons", {
      prepend: !0,
      csp,
      attachTo: shadowRoot
    });
  }, []);
};

// node_modules/@ant-design/icons/es/components/IconBase.js
var _excluded = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"], twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: !1
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor, twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor), twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return _objectSpread2({}, twoToneColorPalette);
}
var IconBase = function(props) {
  var icon = props.icon, className = props.className, onClick = props.onClick, style = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = _objectWithoutProperties(props, _excluded), svgRef = React2.useRef(), colors = twoToneColorPalette;
  if (primaryColor && (colors = {
    primaryColor,
    secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
  }), useInsertStyles(svgRef), warning2(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon)), !isIconDefinition(icon))
    return null;
  var target = icon;
  return target && typeof target.icon == "function" && (target = _objectSpread2(_objectSpread2({}, target), {}, {
    icon: target.icon(colors.primaryColor, colors.secondaryColor)
  })), generate(target.icon, "svg-".concat(target.name), _objectSpread2(_objectSpread2({
    className,
    onClick,
    style,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, restProps), {}, {
    ref: svgRef
  }));
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
var IconBase_default = IconBase;

// node_modules/@ant-design/icons/es/components/twoTonePrimaryColor.js
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return IconBase_default.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = IconBase_default.getTwoToneColors();
  return colors.calculated ? [colors.primaryColor, colors.secondaryColor] : colors.primaryColor;
}

// node_modules/@ant-design/icons/es/components/AntdIcon.js
var _excluded2 = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
setTwoToneColor(blue.primary);
var Icon = /* @__PURE__ */ React3.forwardRef(function(props, ref) {
  var _classNames, className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = _objectWithoutProperties2(props, _excluded2), _React$useContext = React3.useContext(Context_default), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName, classString = classNames(rootClassName, prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), _classNames), className), iconTabIndex = tabIndex;
  iconTabIndex === void 0 && onClick && (iconTabIndex = -1);
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0, _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray2(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return /* @__PURE__ */ React3.createElement("span", _extends({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), /* @__PURE__ */ React3.createElement(IconBase_default, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = "AntdIcon";
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
var AntdIcon_default = Icon;

// node_modules/@ant-design/icons/es/icons/BookFilled.js
import _extends2 from "@babel/runtime/helpers/esm/extends";
import * as React4 from "react";

// node_modules/@ant-design/icons-svg/es/asn/BookFilled.js
var BookFilled = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zM668 345.9L621.5 312 572 347.4V124h96v221.9z" } }] }, name: "book", theme: "filled" }, BookFilled_default = BookFilled;

// node_modules/@ant-design/icons/es/icons/BookFilled.js
var BookFilled2 = function(props, ref) {
  return /* @__PURE__ */ React4.createElement(AntdIcon_default, _extends2({}, props, {
    ref,
    icon: BookFilled_default
  }));
};
BookFilled2.displayName = "BookFilled";
var BookFilled_default2 = /* @__PURE__ */ React4.forwardRef(BookFilled2);

// node_modules/@ant-design/icons/es/icons/BookOutlined.js
import _extends3 from "@babel/runtime/helpers/esm/extends";
import * as React5 from "react";

// node_modules/@ant-design/icons-svg/es/asn/BookOutlined.js
var BookOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M832 64H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V96c0-17.7-14.3-32-32-32zm-260 72h96v209.9L621.5 312 572 347.4V136zm220 752H232V136h280v296.9c0 3.3 1 6.6 3 9.3a15.9 15.9 0 0022.3 3.7l83.8-59.9 81.4 59.4c2.7 2 6 3.1 9.4 3.1 8.8 0 16-7.2 16-16V136h64v752z" } }] }, name: "book", theme: "outlined" }, BookOutlined_default = BookOutlined;

// node_modules/@ant-design/icons/es/icons/BookOutlined.js
var BookOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React5.createElement(AntdIcon_default, _extends3({}, props, {
    ref,
    icon: BookOutlined_default
  }));
};
BookOutlined2.displayName = "BookOutlined";
var BookOutlined_default2 = /* @__PURE__ */ React5.forwardRef(BookOutlined2);

// node_modules/@ant-design/icons/es/icons/DeleteOutlined.js
import _extends4 from "@babel/runtime/helpers/esm/extends";
import * as React6 from "react";

// node_modules/@ant-design/icons-svg/es/asn/DeleteOutlined.js
var DeleteOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z" } }] }, name: "delete", theme: "outlined" }, DeleteOutlined_default = DeleteOutlined;

// node_modules/@ant-design/icons/es/icons/DeleteOutlined.js
var DeleteOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React6.createElement(AntdIcon_default, _extends4({}, props, {
    ref,
    icon: DeleteOutlined_default
  }));
};
DeleteOutlined2.displayName = "DeleteOutlined";
var DeleteOutlined_default2 = /* @__PURE__ */ React6.forwardRef(DeleteOutlined2);

// node_modules/@ant-design/icons/es/icons/DollarOutlined.js
import _extends5 from "@babel/runtime/helpers/esm/extends";
import * as React7 from "react";

// node_modules/@ant-design/icons-svg/es/asn/DollarOutlined.js
var DollarOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372zm47.7-395.2l-25.4-5.9V348.6c38 5.2 61.5 29 65.5 58.2.5 4 3.9 6.9 7.9 6.9h44.9c4.7 0 8.4-4.1 8-8.8-6.1-62.3-57.4-102.3-125.9-109.2V263c0-4.4-3.6-8-8-8h-28.1c-4.4 0-8 3.6-8 8v33c-70.8 6.9-126.2 46-126.2 119 0 67.6 49.8 100.2 102.1 112.7l24.7 6.3v142.7c-44.2-5.9-69-29.5-74.1-61.3-.6-3.8-4-6.6-7.9-6.6H363c-4.7 0-8.4 4-8 8.7 4.5 55 46.2 105.6 135.2 112.1V761c0 4.4 3.6 8 8 8h28.4c4.4 0 8-3.6 8-8.1l-.2-31.7c78.3-6.9 134.3-48.8 134.3-124-.1-69.4-44.2-100.4-109-116.4zm-68.6-16.2c-5.6-1.6-10.3-3.1-15-5-33.8-12.2-49.5-31.9-49.5-57.3 0-36.3 27.5-57 64.5-61.7v124zM534.3 677V543.3c3.1.9 5.9 1.6 8.8 2.2 47.3 14.4 63.2 34.4 63.2 65.1 0 39.1-29.4 62.6-72 66.4z" } }] }, name: "dollar", theme: "outlined" }, DollarOutlined_default = DollarOutlined;

// node_modules/@ant-design/icons/es/icons/DollarOutlined.js
var DollarOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React7.createElement(AntdIcon_default, _extends5({}, props, {
    ref,
    icon: DollarOutlined_default
  }));
};
DollarOutlined2.displayName = "DollarOutlined";
var DollarOutlined_default2 = /* @__PURE__ */ React7.forwardRef(DollarOutlined2);

// node_modules/@ant-design/icons/es/icons/DownloadOutlined.js
import _extends6 from "@babel/runtime/helpers/esm/extends";
import * as React8 from "react";

// node_modules/@ant-design/icons-svg/es/asn/DownloadOutlined.js
var DownloadOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M505.7 661a8 8 0 0012.6 0l112-141.7c4.1-5.2.4-12.9-6.3-12.9h-74.1V168c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v338.3H400c-6.7 0-10.4 7.7-6.3 12.9l112 141.8zM878 626h-60c-4.4 0-8 3.6-8 8v154H214V634c0-4.4-3.6-8-8-8h-60c-4.4 0-8 3.6-8 8v198c0 17.7 14.3 32 32 32h684c17.7 0 32-14.3 32-32V634c0-4.4-3.6-8-8-8z" } }] }, name: "download", theme: "outlined" }, DownloadOutlined_default = DownloadOutlined;

// node_modules/@ant-design/icons/es/icons/DownloadOutlined.js
var DownloadOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React8.createElement(AntdIcon_default, _extends6({}, props, {
    ref,
    icon: DownloadOutlined_default
  }));
};
DownloadOutlined2.displayName = "DownloadOutlined";
var DownloadOutlined_default2 = /* @__PURE__ */ React8.forwardRef(DownloadOutlined2);

// node_modules/@ant-design/icons/es/icons/EditOutlined.js
import _extends7 from "@babel/runtime/helpers/esm/extends";
import * as React9 from "react";

// node_modules/@ant-design/icons-svg/es/asn/EditOutlined.js
var EditOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z" } }] }, name: "edit", theme: "outlined" }, EditOutlined_default = EditOutlined;

// node_modules/@ant-design/icons/es/icons/EditOutlined.js
var EditOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React9.createElement(AntdIcon_default, _extends7({}, props, {
    ref,
    icon: EditOutlined_default
  }));
};
EditOutlined2.displayName = "EditOutlined";
var EditOutlined_default2 = /* @__PURE__ */ React9.forwardRef(EditOutlined2);

// node_modules/@ant-design/icons/es/icons/HeartFilled.js
import _extends8 from "@babel/runtime/helpers/esm/extends";
import * as React10 from "react";

// node_modules/@ant-design/icons-svg/es/asn/HeartFilled.js
var HeartFilled = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9z" } }] }, name: "heart", theme: "filled" }, HeartFilled_default = HeartFilled;

// node_modules/@ant-design/icons/es/icons/HeartFilled.js
var HeartFilled2 = function(props, ref) {
  return /* @__PURE__ */ React10.createElement(AntdIcon_default, _extends8({}, props, {
    ref,
    icon: HeartFilled_default
  }));
};
HeartFilled2.displayName = "HeartFilled";
var HeartFilled_default2 = /* @__PURE__ */ React10.forwardRef(HeartFilled2);

// node_modules/@ant-design/icons/es/icons/HeartOutlined.js
import _extends9 from "@babel/runtime/helpers/esm/extends";
import * as React11 from "react";

// node_modules/@ant-design/icons-svg/es/asn/HeartOutlined.js
var HeartOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M923 283.6a260.04 260.04 0 00-56.9-82.8 264.4 264.4 0 00-84-55.5A265.34 265.34 0 00679.7 125c-49.3 0-97.4 13.5-139.2 39-10 6.1-19.5 12.8-28.5 20.1-9-7.3-18.5-14-28.5-20.1-41.8-25.5-89.9-39-139.2-39-35.5 0-69.9 6.8-102.4 20.3-31.4 13-59.7 31.7-84 55.5a258.44 258.44 0 00-56.9 82.8c-13.9 32.3-21 66.6-21 101.9 0 33.3 6.8 68 20.3 103.3 11.3 29.5 27.5 60.1 48.2 91 32.8 48.9 77.9 99.9 133.9 151.6 92.8 85.7 184.7 144.9 188.6 147.3l23.7 15.2c10.5 6.7 24 6.7 34.5 0l23.7-15.2c3.9-2.5 95.7-61.6 188.6-147.3 56-51.7 101.1-102.7 133.9-151.6 20.7-30.9 37-61.5 48.2-91 13.5-35.3 20.3-70 20.3-103.3.1-35.3-7-69.6-20.9-101.9zM512 814.8S156 586.7 156 385.5C156 283.6 240.3 201 344.3 201c73.1 0 136.5 40.8 167.7 100.4C543.2 241.8 606.6 201 679.7 201c104 0 188.3 82.6 188.3 184.5 0 201.2-356 429.3-356 429.3z" } }] }, name: "heart", theme: "outlined" }, HeartOutlined_default = HeartOutlined;

// node_modules/@ant-design/icons/es/icons/HeartOutlined.js
var HeartOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React11.createElement(AntdIcon_default, _extends9({}, props, {
    ref,
    icon: HeartOutlined_default
  }));
};
HeartOutlined2.displayName = "HeartOutlined";
var HeartOutlined_default2 = /* @__PURE__ */ React11.forwardRef(HeartOutlined2);

// node_modules/@ant-design/icons/es/icons/InfoCircleOutlined.js
import _extends10 from "@babel/runtime/helpers/esm/extends";
import * as React12 from "react";

// node_modules/@ant-design/icons-svg/es/asn/InfoCircleOutlined.js
var InfoCircleOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { tag: "path", attrs: { d: "M464 336a48 48 0 1096 0 48 48 0 10-96 0zm72 112h-48c-4.4 0-8 3.6-8 8v272c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V456c0-4.4-3.6-8-8-8z" } }] }, name: "info-circle", theme: "outlined" }, InfoCircleOutlined_default = InfoCircleOutlined;

// node_modules/@ant-design/icons/es/icons/InfoCircleOutlined.js
var InfoCircleOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React12.createElement(AntdIcon_default, _extends10({}, props, {
    ref,
    icon: InfoCircleOutlined_default
  }));
};
InfoCircleOutlined2.displayName = "InfoCircleOutlined";
var InfoCircleOutlined_default2 = /* @__PURE__ */ React12.forwardRef(InfoCircleOutlined2);

// node_modules/@ant-design/icons/es/icons/MessageOutlined.js
import _extends11 from "@babel/runtime/helpers/esm/extends";
import * as React13 from "react";

// node_modules/@ant-design/icons-svg/es/asn/MessageOutlined.js
var MessageOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M464 512a48 48 0 1096 0 48 48 0 10-96 0zm200 0a48 48 0 1096 0 48 48 0 10-96 0zm-400 0a48 48 0 1096 0 48 48 0 10-96 0zm661.2-173.6c-22.6-53.7-55-101.9-96.3-143.3a444.35 444.35 0 00-143.3-96.3C630.6 75.7 572.2 64 512 64h-2c-60.6.3-119.3 12.3-174.5 35.9a445.35 445.35 0 00-142 96.5c-40.9 41.3-73 89.3-95.2 142.8-23 55.4-34.6 114.3-34.3 174.9A449.4 449.4 0 00112 714v152a46 46 0 0046 46h152.1A449.4 449.4 0 00510 960h2.1c59.9 0 118-11.6 172.7-34.3a444.48 444.48 0 00142.8-95.2c41.3-40.9 73.8-88.7 96.5-142 23.6-55.2 35.6-113.9 35.9-174.5.3-60.9-11.5-120-34.8-175.6zm-151.1 438C704 845.8 611 884 512 884h-1.7c-60.3-.3-120.2-15.3-173.1-43.5l-8.4-4.5H188V695.2l-4.5-8.4C155.3 633.9 140.3 574 140 513.7c-.4-99.7 37.7-193.3 107.6-263.8 69.8-70.5 163.1-109.5 262.8-109.9h1.7c50 0 98.5 9.7 144.2 28.9 44.6 18.7 84.6 45.6 119 80 34.3 34.3 61.3 74.4 80 119 19.4 46.2 29.1 95.2 28.9 145.8-.6 99.6-39.7 192.9-110.1 262.7z" } }] }, name: "message", theme: "outlined" }, MessageOutlined_default = MessageOutlined;

// node_modules/@ant-design/icons/es/icons/MessageOutlined.js
var MessageOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React13.createElement(AntdIcon_default, _extends11({}, props, {
    ref,
    icon: MessageOutlined_default
  }));
};
MessageOutlined2.displayName = "MessageOutlined";
var MessageOutlined_default2 = /* @__PURE__ */ React13.forwardRef(MessageOutlined2);

// node_modules/@ant-design/icons/es/icons/PlusCircleOutlined.js
import _extends12 from "@babel/runtime/helpers/esm/extends";
import * as React14 from "react";

// node_modules/@ant-design/icons-svg/es/asn/PlusCircleOutlined.js
var PlusCircleOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M696 480H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8z" } }, { tag: "path", attrs: { d: "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }] }, name: "plus-circle", theme: "outlined" }, PlusCircleOutlined_default = PlusCircleOutlined;

// node_modules/@ant-design/icons/es/icons/PlusCircleOutlined.js
var PlusCircleOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React14.createElement(AntdIcon_default, _extends12({}, props, {
    ref,
    icon: PlusCircleOutlined_default
  }));
};
PlusCircleOutlined2.displayName = "PlusCircleOutlined";
var PlusCircleOutlined_default2 = /* @__PURE__ */ React14.forwardRef(PlusCircleOutlined2);

// node_modules/@ant-design/icons/es/icons/SearchOutlined.js
import _extends13 from "@babel/runtime/helpers/esm/extends";
import * as React15 from "react";

// node_modules/@ant-design/icons-svg/es/asn/SearchOutlined.js
var SearchOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" } }] }, name: "search", theme: "outlined" }, SearchOutlined_default = SearchOutlined;

// node_modules/@ant-design/icons/es/icons/SearchOutlined.js
var SearchOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React15.createElement(AntdIcon_default, _extends13({}, props, {
    ref,
    icon: SearchOutlined_default
  }));
};
SearchOutlined2.displayName = "SearchOutlined";
var SearchOutlined_default2 = /* @__PURE__ */ React15.forwardRef(SearchOutlined2);

// node_modules/@ant-design/icons/es/icons/SendOutlined.js
import _extends14 from "@babel/runtime/helpers/esm/extends";
import * as React16 from "react";

// node_modules/@ant-design/icons-svg/es/asn/SendOutlined.js
var SendOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "defs", attrs: {}, children: [{ tag: "style", attrs: {} }] }, { tag: "path", attrs: { d: "M931.4 498.9L94.9 79.5c-3.4-1.7-7.3-2.1-11-1.2a15.99 15.99 0 00-11.7 19.3l86.2 352.2c1.3 5.3 5.2 9.6 10.4 11.3l147.7 50.7-147.6 50.7c-5.2 1.8-9.1 6-10.3 11.3L72.2 926.5c-.9 3.7-.5 7.6 1.2 10.9 3.9 7.9 13.5 11.1 21.5 7.2l836.5-417c3.1-1.5 5.6-4.1 7.2-7.1 3.9-8 .7-17.6-7.2-21.6zM170.8 826.3l50.3-205.6 295.2-101.3c2.3-.8 4.2-2.6 5-5 1.4-4.2-.8-8.7-5-10.2L221.1 403 171 198.2l628 314.9-628.2 313.2z" } }] }, name: "send", theme: "outlined" }, SendOutlined_default = SendOutlined;

// node_modules/@ant-design/icons/es/icons/SendOutlined.js
var SendOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React16.createElement(AntdIcon_default, _extends14({}, props, {
    ref,
    icon: SendOutlined_default
  }));
};
SendOutlined2.displayName = "SendOutlined";
var SendOutlined_default2 = /* @__PURE__ */ React16.forwardRef(SendOutlined2);

// node_modules/@ant-design/icons/es/icons/SettingOutlined.js
import _extends15 from "@babel/runtime/helpers/esm/extends";
import * as React17 from "react";

// node_modules/@ant-design/icons-svg/es/asn/SettingOutlined.js
var SettingOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 009.3-35.2l-.9-2.6a443.74 443.74 0 00-79.7-137.9l-1.8-2.1a32.12 32.12 0 00-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 00-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 00-25.8 25.7l-15.8 85.4a351.86 351.86 0 00-99 57.4l-81.9-29.1a32 32 0 00-35.1 9.5l-1.8 2.1a446.02 446.02 0 00-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1 0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 00-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0035.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0025.8 25.7l2.7.5a449.4 449.4 0 00159 0l2.7-.5a32.05 32.05 0 0025.8-25.7l15.7-85a350 350 0 0099.7-57.6l81.3 28.9a32 32 0 0035.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1 74.7 63.9a370.03 370.03 0 01-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3-17.9 97a377.5 377.5 0 01-85 0l-17.9-97.2-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5 0-15.3 1.2-30.6 3.7-45.5l6.5-40-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2 31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3 17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97 38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8 92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176 176-78.8 176-176-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 01512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 01400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 01624 502c0 29.9-11.7 58-32.8 79.2z" } }] }, name: "setting", theme: "outlined" }, SettingOutlined_default = SettingOutlined;

// node_modules/@ant-design/icons/es/icons/SettingOutlined.js
var SettingOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React17.createElement(AntdIcon_default, _extends15({}, props, {
    ref,
    icon: SettingOutlined_default
  }));
};
SettingOutlined2.displayName = "SettingOutlined";
var SettingOutlined_default2 = /* @__PURE__ */ React17.forwardRef(SettingOutlined2);

// node_modules/@ant-design/icons/es/icons/ToolOutlined.js
import _extends16 from "@babel/runtime/helpers/esm/extends";
import * as React18 from "react";

// node_modules/@ant-design/icons-svg/es/asn/ToolOutlined.js
var ToolOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M876.6 239.5c-.5-.9-1.2-1.8-2-2.5-5-5-13.1-5-18.1 0L684.2 409.3l-67.9-67.9L788.7 169c.8-.8 1.4-1.6 2-2.5 3.6-6.1 1.6-13.9-4.5-17.5-98.2-58-226.8-44.7-311.3 39.7-67 67-89.2 162-66.5 247.4l-293 293c-3 3-2.8 7.9.3 11l169.7 169.7c3.1 3.1 8.1 3.3 11 .3l292.9-292.9c85.5 22.8 180.5.7 247.6-66.4 84.4-84.5 97.7-213.1 39.7-311.3zM786 499.8c-58.1 58.1-145.3 69.3-214.6 33.6l-8.8 8.8-.1-.1-274 274.1-79.2-79.2 230.1-230.1s0 .1.1.1l52.8-52.8c-35.7-69.3-24.5-156.5 33.6-214.6a184.2 184.2 0 01144-53.5L537 318.9a32.05 32.05 0 000 45.3l124.5 124.5a32.05 32.05 0 0045.3 0l132.8-132.8c3.7 51.8-14.4 104.8-53.6 143.9z" } }] }, name: "tool", theme: "outlined" }, ToolOutlined_default = ToolOutlined;

// node_modules/@ant-design/icons/es/icons/ToolOutlined.js
var ToolOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React18.createElement(AntdIcon_default, _extends16({}, props, {
    ref,
    icon: ToolOutlined_default
  }));
};
ToolOutlined2.displayName = "ToolOutlined";
var ToolOutlined_default2 = /* @__PURE__ */ React18.forwardRef(ToolOutlined2);

// node_modules/@ant-design/icons/es/icons/UserOutlined.js
import _extends17 from "@babel/runtime/helpers/esm/extends";
import * as React19 from "react";

// node_modules/@ant-design/icons-svg/es/asn/UserOutlined.js
var UserOutlined = { icon: { tag: "svg", attrs: { viewBox: "64 64 896 896", focusable: "false" }, children: [{ tag: "path", attrs: { d: "M858.5 763.6a374 374 0 00-80.6-119.5 375.63 375.63 0 00-119.5-80.6c-.4-.2-.8-.3-1.2-.5C719.5 518 760 444.7 760 362c0-137-111-248-248-248S264 225 264 362c0 82.7 40.5 156 102.8 201.1-.4.2-.8.3-1.2.5-44.8 18.9-85 46-119.5 80.6a375.63 375.63 0 00-80.6 119.5A371.7 371.7 0 00136 901.8a8 8 0 008 8.2h60c4.4 0 7.9-3.5 8-7.8 2-77.2 33-149.5 87.8-204.3 56.7-56.7 132-87.9 212.2-87.9s155.5 31.2 212.2 87.9C779 752.7 810 825 812 902.2c.1 4.4 3.6 7.8 8 7.8h60a8 8 0 008-8.2c-1-47.8-10.9-94.3-29.5-138.2zM512 534c-45.9 0-89.1-17.9-121.6-50.4S340 407.9 340 362c0-45.9 17.9-89.1 50.4-121.6S466.1 190 512 190s89.1 17.9 121.6 50.4S684 316.1 684 362c0 45.9-17.9 89.1-50.4 121.6S557.9 534 512 534z" } }] }, name: "user", theme: "outlined" }, UserOutlined_default = UserOutlined;

// node_modules/@ant-design/icons/es/icons/UserOutlined.js
var UserOutlined2 = function(props, ref) {
  return /* @__PURE__ */ React19.createElement(AntdIcon_default, _extends17({}, props, {
    ref,
    icon: UserOutlined_default
  }));
};
UserOutlined2.displayName = "UserOutlined";
var UserOutlined_default2 = /* @__PURE__ */ React19.forwardRef(UserOutlined2);

// node_modules/@ant-design/icons/es/components/IconFont.js
import _extends19 from "@babel/runtime/helpers/esm/extends";
import _objectWithoutProperties4 from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React22 from "react";

// node_modules/@ant-design/icons/es/components/Icon.js
import _extends18 from "@babel/runtime/helpers/esm/extends";
import _objectSpread3 from "@babel/runtime/helpers/esm/objectSpread2";
import _defineProperty2 from "@babel/runtime/helpers/esm/defineProperty";
import _objectWithoutProperties3 from "@babel/runtime/helpers/esm/objectWithoutProperties";
import * as React21 from "react";
import classNames2 from "classnames";

// node_modules/rc-util/es/ref.js
import _typeof2 from "@babel/runtime/helpers/esm/typeof";
import { isValidElement } from "react";
import { isFragment, isMemo } from "react-is";

// node_modules/rc-util/es/hooks/useMemo.js
import * as React20 from "react";
function useMemo(getValue, condition, shouldUpdate) {
  var cacheRef = React20.useRef({});
  return (!("value" in cacheRef.current) || shouldUpdate(cacheRef.current.condition, condition)) && (cacheRef.current.value = getValue(), cacheRef.current.condition = condition), cacheRef.current.value;
}

// node_modules/rc-util/es/ref.js
function fillRef(ref, node) {
  typeof ref == "function" ? ref(node) : _typeof2(ref) === "object" && ref && "current" in ref && (ref.current = node);
}
function composeRef() {
  for (var _len = arguments.length, refs = new Array(_len), _key = 0; _key < _len; _key++)
    refs[_key] = arguments[_key];
  var refList = refs.filter(function(ref) {
    return ref;
  });
  return refList.length <= 1 ? refList[0] : function(node) {
    refs.forEach(function(ref) {
      fillRef(ref, node);
    });
  };
}
function useComposeRef() {
  for (var _len2 = arguments.length, refs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)
    refs[_key2] = arguments[_key2];
  return useMemo(function() {
    return composeRef.apply(void 0, refs);
  }, refs, function(prev, next) {
    return prev.length !== next.length || prev.every(function(ref, i) {
      return ref !== next[i];
    });
  });
}

// node_modules/@ant-design/icons/es/components/Icon.js
var _excluded3 = ["className", "component", "viewBox", "spin", "rotate", "tabIndex", "onClick", "children"], Icon2 = /* @__PURE__ */ React21.forwardRef(function(props, ref) {
  var className = props.className, Component = props.component, viewBox = props.viewBox, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, children = props.children, restProps = _objectWithoutProperties3(props, _excluded3), iconRef = React21.useRef(), mergedRef = useComposeRef(iconRef, ref);
  warning2(Boolean(Component || children), "Should have `component` prop or `children`."), useInsertStyles(iconRef);
  var _React$useContext = React21.useContext(Context_default), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName, classString = classNames2(rootClassName, prefixCls, className), svgClassString = classNames2(_defineProperty2({}, "".concat(prefixCls, "-spin"), !!spin)), svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0, innerSvgProps = _objectSpread3(_objectSpread3({}, svgBaseProps), {}, {
    className: svgClassString,
    style: svgStyle,
    viewBox
  });
  viewBox || delete innerSvgProps.viewBox;
  var renderInnerNode = function() {
    return Component ? /* @__PURE__ */ React21.createElement(Component, innerSvgProps, children) : children ? (warning2(Boolean(viewBox) || React21.Children.count(children) === 1 && /* @__PURE__ */ React21.isValidElement(children) && React21.Children.only(children).type === "use", "Make sure that you provide correct `viewBox` prop (default `0 0 1024 1024`) to the icon."), /* @__PURE__ */ React21.createElement("svg", _extends18({}, innerSvgProps, {
      viewBox
    }), children)) : null;
  }, iconTabIndex = tabIndex;
  return iconTabIndex === void 0 && onClick && (iconTabIndex = -1), /* @__PURE__ */ React21.createElement("span", _extends18({
    role: "img"
  }, restProps, {
    ref: mergedRef,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), renderInnerNode());
});
Icon2.displayName = "AntdIcon";
var Icon_default = Icon2;

// node_modules/@ant-design/icons/es/components/IconFont.js
var _excluded4 = ["type", "children"], customCache = /* @__PURE__ */ new Set();
function isValidCustomScriptUrl(scriptUrl) {
  return Boolean(typeof scriptUrl == "string" && scriptUrl.length && !customCache.has(scriptUrl));
}
function createScriptUrlElements(scriptUrls) {
  var index = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0, currentScriptUrl = scriptUrls[index];
  if (isValidCustomScriptUrl(currentScriptUrl)) {
    var script = document.createElement("script");
    script.setAttribute("src", currentScriptUrl), script.setAttribute("data-namespace", currentScriptUrl), scriptUrls.length > index + 1 && (script.onload = function() {
      createScriptUrlElements(scriptUrls, index + 1);
    }, script.onerror = function() {
      createScriptUrlElements(scriptUrls, index + 1);
    }), customCache.add(currentScriptUrl), document.body.appendChild(script);
  }
}
function create() {
  var options = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, scriptUrl = options.scriptUrl, _options$extraCommonP = options.extraCommonProps, extraCommonProps = _options$extraCommonP === void 0 ? {} : _options$extraCommonP;
  scriptUrl && typeof document < "u" && typeof window < "u" && typeof document.createElement == "function" && (Array.isArray(scriptUrl) ? createScriptUrlElements(scriptUrl.reverse()) : createScriptUrlElements([scriptUrl]));
  var Iconfont = /* @__PURE__ */ React22.forwardRef(function(props, ref) {
    var type = props.type, children = props.children, restProps = _objectWithoutProperties4(props, _excluded4), content = null;
    return props.type && (content = /* @__PURE__ */ React22.createElement("use", {
      xlinkHref: "#".concat(type)
    })), children && (content = children), /* @__PURE__ */ React22.createElement(Icon_default, _extends19({}, extraCommonProps, restProps, {
      ref
    }), content);
  });
  return Iconfont.displayName = "Iconfont", Iconfont;
}

// node_modules/@ant-design/icons/es/index.js
var IconProvider = Context_default.Provider;

// app/hooks/useRemixFetcher.ts
import React23 from "react";
import { useFetcher } from "@remix-run/react";
var useRemixFetcher = ({ onError, onSuccess } = {}) => {
  let fetcher = useFetcher(), isLoadingFetcher = fetcher.state !== "idle";
  return React23.useEffect(() => {
    onSuccess && fetcher?.data?.success === !0 ? onSuccess(fetcher.data) : onError && fetcher?.data?.success === !1 && onError(fetcher.data);
  }, [fetcher.state]), {
    fetcher,
    isLoadingFetcher
  };
};

// app/hooks/useIsSubmitting.ts
import { useFormAction, useNavigation } from "@remix-run/react";
function useIsSubmitting({
  formAction,
  formMethod = "POST"
} = {}) {
  let contextualFormAction = useFormAction(), navigation = useNavigation();
  return navigation.state === "submitting" && navigation.formAction === (formAction ?? contextualFormAction) && navigation.formMethod === formMethod;
}

// app/hooks/useIsPending.ts
import { useFormAction as useFormAction2, useNavigation as useNavigation2 } from "@remix-run/react";
import { useSpinDelay } from "spin-delay";
function useIsPending({
  formAction,
  formMethod = "POST",
  state = "non-idle"
} = {}) {
  let contextualFormAction = useFormAction2(), navigation = useNavigation2();
  return (state === "non-idle" ? navigation.state !== "idle" : navigation.state === state) && navigation.formAction === (formAction ?? contextualFormAction) && navigation.formMethod === formMethod;
}

// app/hooks/useLoggedInUser.ts
import { useRouteLoaderData } from "@remix-run/react";
function useOptionalUser() {
  return useRouteLoaderData("root")?.userData ?? null;
}
function useLoggedInUser() {
  let maybeUser = useOptionalUser();
  return invariantResponse(
    maybeUser,
    "No user found in root loader, but user is required by useLoggedInUser. If user is optional, try useOptionalUser instead."
  ), maybeUser;
}

// app/context/UserContext.ts
import { createContext as createContext2 } from "react";
var UserContext = createContext2(null);

// app/components/LogOutButton.tsx
import { Form } from "@remix-run/react";
import { AuthenticityTokenInput } from "remix-utils/csrf/react";
import { jsxDEV as jsxDEV2 } from "react/jsx-dev-runtime";
var IconFont = create({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
}), LogOutButton = () => {
  let isPending = useIsPending();
  return /* @__PURE__ */ jsxDEV2(Form, { action: "/logout", method: "POST", children: /* @__PURE__ */ jsxDEV2(
    "button",
    {
      type: "submit",
      style: { width: 130 },
      className: "w-full border-solid border-1 border-gray-600 rounded-md p-2  hover:bg-gray-800",
      disabled: isPending,
      children: [
        /* @__PURE__ */ jsxDEV2(AuthenticityTokenInput, {}, void 0, !1, {
          fileName: "app/components/LogOutButton.tsx",
          lineNumber: 21,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV2(IconFont, { type: "icon-tuichu" }, void 0, !1, {
          fileName: "app/components/LogOutButton.tsx",
          lineNumber: 22,
          columnNumber: 9
        }, this),
        " Logout"
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/LogOutButton.tsx",
      lineNumber: 15,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/LogOutButton.tsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}, LogOutButton_default = LogOutButton;

// app/components/UserAvatar/UserAvatar.tsx
import { Fragment, jsxDEV as jsxDEV3 } from "react/jsx-dev-runtime";
var IconFont2 = create({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
}), UserAvatar = () => {
  let userData = React24.useContext(UserContext), { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  }), handleLogOut = () => {
    fetcher.submit(
      { intent: "user-log-out" },
      { method: "post", action: "/logout" }
    ), notification.success({ message: "Successfully logged out" });
  };
  return /* @__PURE__ */ jsxDEV3(Fragment, { children: /* @__PURE__ */ jsxDEV3(
    Popover,
    {
      title: /* @__PURE__ */ jsxDEV3(Space, { children: [
        /* @__PURE__ */ jsxDEV3(Avatar, { style: { cursor: "pointer" }, icon: /* @__PURE__ */ jsxDEV3(UserOutlined_default2, {}, void 0, !1, {
          fileName: "app/components/UserAvatar/UserAvatar.tsx",
          lineNumber: 43,
          columnNumber: 57
        }, this) }, void 0, !1, {
          fileName: "app/components/UserAvatar/UserAvatar.tsx",
          lineNumber: 43,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV3("div", { style: { display: "flex", flexDirection: "column" }, children: [
          /* @__PURE__ */ jsxDEV3("span", { children: userData.name }, void 0, !1, {
            fileName: "app/components/UserAvatar/UserAvatar.tsx",
            lineNumber: 46,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3(Typography.Link, { strong: !0, href: `/profile/${userData.username}`, children: userData.username }, void 0, !1, {
            fileName: "app/components/UserAvatar/UserAvatar.tsx",
            lineNumber: 47,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/UserAvatar/UserAvatar.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/UserAvatar/UserAvatar.tsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      content: /* @__PURE__ */ jsxDEV3(Space, { align: "center", direction: "vertical", style: { width: "100%" }, children: [
        /* @__PURE__ */ jsxDEV3("div", { style: { display: "flex", flexDirection: "column" }, children: [
          /* @__PURE__ */ jsxDEV3(Typography.Text, { children: [
            /* @__PURE__ */ jsxDEV3(DollarOutlined_default2, { style: { marginRight: 4 } }, void 0, !1, {
              fileName: "app/components/UserAvatar/UserAvatar.tsx",
              lineNumber: 57,
              columnNumber: 17
            }, this),
            userData.credits,
            " Credits"
          ] }, void 0, !0, {
            fileName: "app/components/UserAvatar/UserAvatar.tsx",
            lineNumber: 56,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV3(Button, { size: "small", href: "/checkout", type: "link", children: "Buy Credits" }, void 0, !1, {
            fileName: "app/components/UserAvatar/UserAvatar.tsx",
            lineNumber: 60,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/UserAvatar/UserAvatar.tsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV3(
          Button,
          {
            style: { width: 130 },
            icon: /* @__PURE__ */ jsxDEV3(SettingOutlined_default2, {}, void 0, !1, {
              fileName: "app/components/UserAvatar/UserAvatar.tsx",
              lineNumber: 66,
              columnNumber: 21
            }, this),
            href: "/settings",
            children: "Settings"
          },
          void 0,
          !1,
          {
            fileName: "app/components/UserAvatar/UserAvatar.tsx",
            lineNumber: 64,
            columnNumber: 13
          },
          this
        ),
        /* @__PURE__ */ jsxDEV3(LogOutButton_default, {}, void 0, !1, {
          fileName: "app/components/UserAvatar/UserAvatar.tsx",
          lineNumber: 71,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/components/UserAvatar/UserAvatar.tsx",
        lineNumber: 54,
        columnNumber: 11
      }, this),
      trigger: "click",
      children: /* @__PURE__ */ jsxDEV3(
        Avatar,
        {
          style: { cursor: isLoadingFetcher ? "wait" : "pointer" },
          icon: /* @__PURE__ */ jsxDEV3(UserOutlined_default2, {}, void 0, !1, {
            fileName: "app/components/UserAvatar/UserAvatar.tsx",
            lineNumber: 78,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/components/UserAvatar/UserAvatar.tsx",
          lineNumber: 76,
          columnNumber: 9
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/UserAvatar/UserAvatar.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/UserAvatar/UserAvatar.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}, UserAvatar_default = UserAvatar;

// app/components/CopyToClipboardButton/CopyToClipboardButton.tsx
import { notification as notification2, Typography as Typography2 } from "antd";
import { Fragment as Fragment2, jsxDEV as jsxDEV4 } from "react/jsx-dev-runtime";
var CopyToClipboardButton = ({ stringToCopy }) => {
  let handleCopyToClipboard = () => {
    notification2.success({
      message: /* @__PURE__ */ jsxDEV4(Typography2.Paragraph, { strong: !0, children: "Copied to clipboard:" }, void 0, !1, {
        fileName: "app/components/CopyToClipboardButton/CopyToClipboardButton.tsx",
        lineNumber: 8,
        columnNumber: 9
      }, this),
      description: /* @__PURE__ */ jsxDEV4(Typography2.Paragraph, { children: stringToCopy }, void 0, !1, {
        fileName: "app/components/CopyToClipboardButton/CopyToClipboardButton.tsx",
        lineNumber: 10,
        columnNumber: 20
      }, this)
    });
  };
  return /* @__PURE__ */ jsxDEV4(Fragment2, { children: /* @__PURE__ */ jsxDEV4(
    Typography2.Text,
    {
      copyable: { text: stringToCopy, onCopy: handleCopyToClipboard }
    },
    void 0,
    !1,
    {
      fileName: "app/components/CopyToClipboardButton/CopyToClipboardButton.tsx",
      lineNumber: 16,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/CopyToClipboardButton/CopyToClipboardButton.tsx",
    lineNumber: 15,
    columnNumber: 5
  }, this);
}, CopyToClipboardButton_default = CopyToClipboardButton;

// app/components/LikeImageButton/LikeImageButton.tsx
import React25 from "react";
import { Button as Button2 } from "antd";
import { jsxDEV as jsxDEV5 } from "react/jsx-dev-runtime";
var LikeImageButton = ({ imageData }) => {
  let userId = React25.useContext(UserContext)?.id || void 0, { fetcher, isLoadingFetcher } = useRemixFetcher(), handleLikeImage = () => {
    userId && fetcher.submit(
      { intent: "image-toggle-like" },
      {
        method: "post",
        action: `/api/image/${imageData.id}/like?index`
      }
    );
  }, buttonIcon = imageData.likes.some((like) => like.userId === userId) ? /* @__PURE__ */ jsxDEV5(HeartFilled_default2, { style: { color: "#eb2f96" } }, void 0, !1, {
    fileName: "app/components/LikeImageButton/LikeImageButton.tsx",
    lineNumber: 31,
    columnNumber: 5
  }, this) : /* @__PURE__ */ jsxDEV5(HeartOutlined_default2, {}, void 0, !1, {
    fileName: "app/components/LikeImageButton/LikeImageButton.tsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
  return /* @__PURE__ */ jsxDEV5(
    Button2,
    {
      size: "small",
      style: { border: "none", boxShadow: "none" },
      icon: buttonIcon,
      onClick: handleLikeImage,
      loading: isLoadingFetcher,
      disabled: !userId,
      children: /* @__PURE__ */ jsxDEV5("span", { children: imageData.likes.length > 0 && imageData.likes.length }, void 0, !1, {
        fileName: "app/components/LikeImageButton/LikeImageButton.tsx",
        lineNumber: 45,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/LikeImageButton/LikeImageButton.tsx",
      lineNumber: 37,
      columnNumber: 5
    },
    this
  );
}, LikeImageButton_default = LikeImageButton;

// app/components/LikeCommentButton/LikeCommentButton.tsx
import React26 from "react";
import { Button as Button3 } from "antd";
import { jsxDEV as jsxDEV6 } from "react/jsx-dev-runtime";
var LikeCommentButton = ({
  imageData,
  comment
}) => {
  let userId = React26.useContext(UserContext).id || void 0, { fetcher, isLoadingFetcher } = useRemixFetcher(), handleLikeComment = () => {
    userId && fetcher.submit(
      { intent: "image-toggle-like" },
      {
        method: "post",
        action: `/api/image/${imageData.id}/comment/${comment.id}/like?index`
      }
    );
  }, buttonIcon = comment.likes.some((like) => like.userId === userId) ? /* @__PURE__ */ jsxDEV6(HeartFilled_default2, { style: { color: "#eb2f96" } }, void 0, !1, {
    fileName: "app/components/LikeCommentButton/LikeCommentButton.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this) : (
    // <HeartTwoTone twoToneColor="#eb2f96" />
    /* @__PURE__ */ jsxDEV6(HeartOutlined_default2, { style: { color: "#eb2f96" } }, void 0, !1, {
      fileName: "app/components/LikeCommentButton/LikeCommentButton.tsx",
      lineNumber: 41,
      columnNumber: 5
    }, this)
  );
  return /* @__PURE__ */ jsxDEV6(
    Button3,
    {
      size: "small",
      style: { border: "none" },
      icon: buttonIcon,
      onClick: handleLikeComment,
      loading: isLoadingFetcher,
      disabled: !userId,
      children: /* @__PURE__ */ jsxDEV6("span", { children: comment.likes.length > 0 && comment.likes.length }, void 0, !1, {
        fileName: "app/components/LikeCommentButton/LikeCommentButton.tsx",
        lineNumber: 53,
        columnNumber: 7
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/components/LikeCommentButton/LikeCommentButton.tsx",
      lineNumber: 45,
      columnNumber: 5
    },
    this
  );
}, LikeCommentButton_default = LikeCommentButton;

// app/components/ImageModal/ImageModal.tsx
import React27 from "react";
import {
  Typography as Typography3,
  Image,
  Space as Space2,
  Button as Button4,
  Modal,
  Avatar as Avatar2,
  Tabs,
  Form as Form2,
  Input
} from "antd";
import { jsxDEV as jsxDEV7 } from "react/jsx-dev-runtime";
var ImageModal = ({ imageData }) => {
  let userData = React27.useContext(UserContext), isUserLoggedIn = Boolean(userData), [showImageModal, setShowImageModal] = React27.useState(!1), [formInstance] = Form2.useForm(), { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  }), handleCommentFormSubmit = (formValues) => {
    fetcher.submit(
      { intent: "image-add-comment", body: JSON.stringify(formValues) },
      { method: "post", action: `/api/image/${imageData.id}/comment?index` }
    );
  };
  return /* @__PURE__ */ jsxDEV7("div", { children: [
    /* @__PURE__ */ jsxDEV7(
      "div",
      {
        className: "relative overflow-hidden w-full pt-[100%]",
        onClick: () => setShowImageModal(!0),
        children: /* @__PURE__ */ jsxDEV7(
          "img",
          {
            className: `inset-0 object-cover cursor-pointer 
            absolute w-full h-full 
            `,
            src: imageData.thumbnailURL,
            alt: imageData.prompt
          },
          void 0,
          !1,
          {
            fileName: "app/components/ImageModal/ImageModal.tsx",
            lineNumber: 83,
            columnNumber: 9
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/components/ImageModal/ImageModal.tsx",
        lineNumber: 79,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV7(
      Modal,
      {
        open: showImageModal,
        destroyOnClose: !0,
        onCancel: () => setShowImageModal(!1),
        width: "90%",
        footer: null,
        bodyStyle: { display: "flex", padding: 0, height: "100%" },
        style: { top: "5%", padding: 0, height: "90%" },
        children: [
          /* @__PURE__ */ jsxDEV7(
            "div",
            {
              style: {
                flex: "1 1 100%",
                background: "black",
                position: "relative"
              },
              children: /* @__PURE__ */ jsxDEV7(
                "div",
                {
                  style: {
                    position: "relative",
                    overflow: "hidden",
                    minHeight: 300,
                    paddingBottom: 0,
                    height: "100%",
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column"
                  },
                  children: /* @__PURE__ */ jsxDEV7(
                    "div",
                    {
                      style: {
                        width: "100%",
                        maxWidth: 1024,
                        margin: "auto",
                        display: "flex",
                        justifyContent: "center"
                      },
                      children: /* @__PURE__ */ jsxDEV7(
                        Image,
                        {
                          src: imageData.url,
                          alt: imageData.prompt,
                          fallback: fallbackImageSource,
                          preview: !1,
                          placeholder: /* @__PURE__ */ jsxDEV7(
                            "div",
                            {
                              style: {
                                width: 1024,
                                height: 1024,
                                background: "black"
                              }
                            },
                            void 0,
                            !1,
                            {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 148,
                              columnNumber: 19
                            },
                            this
                          )
                        },
                        void 0,
                        !1,
                        {
                          fileName: "app/components/ImageModal/ImageModal.tsx",
                          lineNumber: 142,
                          columnNumber: 15
                        },
                        this
                      )
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/ImageModal/ImageModal.tsx",
                      lineNumber: 133,
                      columnNumber: 13
                    },
                    this
                  )
                },
                void 0,
                !1,
                {
                  fileName: "app/components/ImageModal/ImageModal.tsx",
                  lineNumber: 121,
                  columnNumber: 11
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/ImageModal/ImageModal.tsx",
              lineNumber: 114,
              columnNumber: 9
            },
            this
          ),
          /* @__PURE__ */ jsxDEV7(
            "div",
            {
              style: {
                padding: 16,
                flexBasis: 420,
                display: "flex",
                flexDirection: "column"
                // justifyContent: "space-between",
              },
              children: [
                /* @__PURE__ */ jsxDEV7(Space2, { style: { marginBottom: "1rem" }, children: [
                  /* @__PURE__ */ jsxDEV7(Avatar2, { style: { cursor: "pointer" }, icon: /* @__PURE__ */ jsxDEV7(UserOutlined_default2, {}, void 0, !1, {
                    fileName: "app/components/ImageModal/ImageModal.tsx",
                    lineNumber: 171,
                    columnNumber: 57
                  }, this) }, void 0, !1, {
                    fileName: "app/components/ImageModal/ImageModal.tsx",
                    lineNumber: 171,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV7("div", { style: { display: "flex", flexDirection: "column" }, children: [
                    /* @__PURE__ */ jsxDEV7(
                      Typography3.Link,
                      {
                        strong: !0,
                        href: `/profile/${imageData.user.username}`,
                        children: imageData.user.username
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/ImageModal/ImageModal.tsx",
                        lineNumber: 174,
                        columnNumber: 15
                      },
                      this
                    ),
                    /* @__PURE__ */ jsxDEV7(Typography3.Text, { type: "secondary", style: { fontSize: 12 }, children: convertUtcDateToLocalDateString(imageData.createdAt) }, void 0, !1, {
                      fileName: "app/components/ImageModal/ImageModal.tsx",
                      lineNumber: 180,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/components/ImageModal/ImageModal.tsx",
                    lineNumber: 173,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/ImageModal/ImageModal.tsx",
                  lineNumber: 170,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV7(Space2, { style: { display: "flex", justifyContent: "space-between" }, children: [
                  /* @__PURE__ */ jsxDEV7(Typography3.Text, { strong: !0, style: { fontSize: 16 }, children: imageData.title || "Untitled" }, void 0, !1, {
                    fileName: "app/components/ImageModal/ImageModal.tsx",
                    lineNumber: 186,
                    columnNumber: 13
                  }, this),
                  /* @__PURE__ */ jsxDEV7(Space2, { size: "small", children: [
                    /* @__PURE__ */ jsxDEV7(LikeImageButton_default, { imageData }, void 0, !1, {
                      fileName: "app/components/ImageModal/ImageModal.tsx",
                      lineNumber: 190,
                      columnNumber: 15
                    }, this),
                    /* @__PURE__ */ jsxDEV7(AddImageToCollectionButton_default, { imageData }, void 0, !1, {
                      fileName: "app/components/ImageModal/ImageModal.tsx",
                      lineNumber: 191,
                      columnNumber: 15
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/components/ImageModal/ImageModal.tsx",
                    lineNumber: 189,
                    columnNumber: 13
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/ImageModal/ImageModal.tsx",
                  lineNumber: 185,
                  columnNumber: 11
                }, this),
                /* @__PURE__ */ jsxDEV7(
                  Tabs,
                  {
                    style: { height: "100%" },
                    defaultActiveKey: "comments",
                    items: [
                      {
                        label: /* @__PURE__ */ jsxDEV7("span", { children: [
                          /* @__PURE__ */ jsxDEV7(MessageOutlined_default2, {}, void 0, !1, {
                            fileName: "app/components/ImageModal/ImageModal.tsx",
                            lineNumber: 202,
                            columnNumber: 21
                          }, this),
                          "Comments"
                        ] }, void 0, !0, {
                          fileName: "app/components/ImageModal/ImageModal.tsx",
                          lineNumber: 201,
                          columnNumber: 19
                        }, this),
                        key: "comment",
                        children: /* @__PURE__ */ jsxDEV7(
                          "div",
                          {
                            style: {
                              position: "relative",
                              display: "flex",
                              flexDirection: "column",
                              height: "100%"
                            },
                            children: [
                              isUserLoggedIn && /* @__PURE__ */ jsxDEV7(
                                "div",
                                {
                                  style: {
                                    position: "absolute",
                                    width: "100%",
                                    bottom: 0
                                  },
                                  children: /* @__PURE__ */ jsxDEV7(
                                    Form2,
                                    {
                                      onFinish: handleCommentFormSubmit,
                                      initialValues: { comment: void 0 },
                                      form: formInstance,
                                      children: /* @__PURE__ */ jsxDEV7(
                                        Form2.Item,
                                        {
                                          name: "comment",
                                          style: {
                                            margin: 0
                                          },
                                          children: /* @__PURE__ */ jsxDEV7(Space2.Compact, { style: { width: "100%" }, children: [
                                            /* @__PURE__ */ jsxDEV7(Input, { placeholder: "Leave a comment", allowClear: !0 }, void 0, !1, {
                                              fileName: "app/components/ImageModal/ImageModal.tsx",
                                              lineNumber: 236,
                                              columnNumber: 31
                                            }, this),
                                            /* @__PURE__ */ jsxDEV7(
                                              Button4,
                                              {
                                                type: "primary",
                                                ghost: !0,
                                                icon: /* @__PURE__ */ jsxDEV7(SendOutlined_default2, {}, void 0, !1, {
                                                  fileName: "app/components/ImageModal/ImageModal.tsx",
                                                  lineNumber: 240,
                                                  columnNumber: 39
                                                }, this),
                                                onClick: () => formInstance.submit(),
                                                loading: isLoadingFetcher
                                              },
                                              void 0,
                                              !1,
                                              {
                                                fileName: "app/components/ImageModal/ImageModal.tsx",
                                                lineNumber: 237,
                                                columnNumber: 31
                                              },
                                              this
                                            )
                                          ] }, void 0, !0, {
                                            fileName: "app/components/ImageModal/ImageModal.tsx",
                                            lineNumber: 235,
                                            columnNumber: 29
                                          }, this)
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/components/ImageModal/ImageModal.tsx",
                                          lineNumber: 229,
                                          columnNumber: 27
                                        },
                                        this
                                      )
                                    },
                                    void 0,
                                    !1,
                                    {
                                      fileName: "app/components/ImageModal/ImageModal.tsx",
                                      lineNumber: 224,
                                      columnNumber: 25
                                    },
                                    this
                                  )
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/ImageModal/ImageModal.tsx",
                                  lineNumber: 217,
                                  columnNumber: 23
                                },
                                this
                              ),
                              imageData.comments.length ? imageData.comments.map((comment) => /* @__PURE__ */ jsxDEV7(
                                CommentCard_default,
                                {
                                  imageData,
                                  comment
                                },
                                comment.id,
                                !1,
                                {
                                  fileName: "app/components/ImageModal/ImageModal.tsx",
                                  lineNumber: 251,
                                  columnNumber: 25
                                },
                                this
                              )) : /* @__PURE__ */ jsxDEV7(
                                Typography3.Text,
                                {
                                  type: "secondary",
                                  italic: !0,
                                  style: { alignSelf: "center" },
                                  children: "No comments"
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/ImageModal/ImageModal.tsx",
                                  lineNumber: 258,
                                  columnNumber: 23
                                },
                                this
                              )
                            ]
                          },
                          void 0,
                          !0,
                          {
                            fileName: "app/components/ImageModal/ImageModal.tsx",
                            lineNumber: 208,
                            columnNumber: 19
                          },
                          this
                        )
                      },
                      {
                        label: /* @__PURE__ */ jsxDEV7("span", { children: [
                          /* @__PURE__ */ jsxDEV7(InfoCircleOutlined_default2, {}, void 0, !1, {
                            fileName: "app/components/ImageModal/ImageModal.tsx",
                            lineNumber: 272,
                            columnNumber: 21
                          }, this),
                          "Info"
                        ] }, void 0, !0, {
                          fileName: "app/components/ImageModal/ImageModal.tsx",
                          lineNumber: 271,
                          columnNumber: 19
                        }, this),
                        key: "info",
                        children: /* @__PURE__ */ jsxDEV7(Space2, { direction: "vertical", children: [
                          /* @__PURE__ */ jsxDEV7(Space2, { direction: "vertical", size: "small", children: [
                            /* @__PURE__ */ jsxDEV7(Typography3.Text, { style: { fontWeight: 600 }, children: "Engine Model" }, void 0, !1, {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 280,
                              columnNumber: 23
                            }, this),
                            /* @__PURE__ */ jsxDEV7(Typography3.Text, { italic: !0, children: imageData.model }, void 0, !1, {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 283,
                              columnNumber: 23
                            }, this)
                          ] }, void 0, !0, {
                            fileName: "app/components/ImageModal/ImageModal.tsx",
                            lineNumber: 279,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV7(Space2, { direction: "vertical", size: "small", children: [
                            /* @__PURE__ */ jsxDEV7(Typography3.Text, { style: { fontWeight: 600 }, children: "Style Preset" }, void 0, !1, {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 288,
                              columnNumber: 23
                            }, this),
                            /* @__PURE__ */ jsxDEV7(Typography3.Text, { italic: !0, children: imageData.stylePreset }, void 0, !1, {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 291,
                              columnNumber: 23
                            }, this)
                          ] }, void 0, !0, {
                            fileName: "app/components/ImageModal/ImageModal.tsx",
                            lineNumber: 287,
                            columnNumber: 21
                          }, this),
                          /* @__PURE__ */ jsxDEV7(Space2, { direction: "vertical", size: "small", children: [
                            /* @__PURE__ */ jsxDEV7(Typography3.Text, { style: { fontWeight: 600 }, children: "Prompt" }, void 0, !1, {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 296,
                              columnNumber: 23
                            }, this),
                            /* @__PURE__ */ jsxDEV7("div", { children: [
                              /* @__PURE__ */ jsxDEV7(Typography3.Text, { italic: !0, children: imageData.prompt }, void 0, !1, {
                                fileName: "app/components/ImageModal/ImageModal.tsx",
                                lineNumber: 300,
                                columnNumber: 25
                              }, this),
                              /* @__PURE__ */ jsxDEV7(
                                CopyToClipboardButton_default,
                                {
                                  stringToCopy: imageData.prompt
                                },
                                void 0,
                                !1,
                                {
                                  fileName: "app/components/ImageModal/ImageModal.tsx",
                                  lineNumber: 303,
                                  columnNumber: 25
                                },
                                this
                              )
                            ] }, void 0, !0, {
                              fileName: "app/components/ImageModal/ImageModal.tsx",
                              lineNumber: 299,
                              columnNumber: 23
                            }, this)
                          ] }, void 0, !0, {
                            fileName: "app/components/ImageModal/ImageModal.tsx",
                            lineNumber: 295,
                            columnNumber: 21
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/components/ImageModal/ImageModal.tsx",
                          lineNumber: 278,
                          columnNumber: 19
                        }, this)
                      }
                    ]
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/ImageModal/ImageModal.tsx",
                    lineNumber: 195,
                    columnNumber: 11
                  },
                  this
                )
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/ImageModal/ImageModal.tsx",
              lineNumber: 161,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/ImageModal/ImageModal.tsx",
        lineNumber: 105,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/ImageModal/ImageModal.tsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}, ImageModal_default = ImageModal;

// app/components/CommentCard/CommentCard.tsx
import React28 from "react";
import { Typography as Typography4, Card, Space as Space3, Avatar as Avatar3 } from "antd";

// app/components/CommentCard/DeleteCommentButton.tsx
import { Button as Button5 } from "antd";
import { jsxDEV as jsxDEV8 } from "react/jsx-dev-runtime";
var DeleteCommentButton = ({
  imageData,
  comment
}) => {
  let { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  }), handleDeleteComment = (commentId) => {
    fetcher.submit(
      { intent: "image-delete-comment" },
      {
        method: "delete",
        action: `/api/image/${imageData.id}/comment/${commentId}`
      }
    );
  };
  return /* @__PURE__ */ jsxDEV8(
    Button5,
    {
      size: "small",
      style: { border: "none" },
      icon: /* @__PURE__ */ jsxDEV8(DeleteOutlined_default2, {}, void 0, !1, {
        fileName: "app/components/CommentCard/DeleteCommentButton.tsx",
        lineNumber: 36,
        columnNumber: 13
      }, this),
      danger: !0,
      loading: isLoadingFetcher,
      onClick: () => handleDeleteComment(comment.id)
    },
    void 0,
    !1,
    {
      fileName: "app/components/CommentCard/DeleteCommentButton.tsx",
      lineNumber: 33,
      columnNumber: 5
    },
    this
  );
}, DeleteCommentButton_default = DeleteCommentButton;

// app/components/CommentCard/CommentCard.tsx
import { jsxDEV as jsxDEV9 } from "react/jsx-dev-runtime";
var CommentCard = ({
  imageData,
  comment
}) => {
  let userId = React28.useContext(UserContext).id || void 0, { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });
  return /* @__PURE__ */ jsxDEV9(Card, { size: "small", style: { marginBottom: 12 }, children: [
    /* @__PURE__ */ jsxDEV9(
      "header",
      {
        style: {
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ jsxDEV9("div", { children: /* @__PURE__ */ jsxDEV9(Space3, { children: [
            /* @__PURE__ */ jsxDEV9(
              Avatar3,
              {
                style: { cursor: "pointer" },
                icon: /* @__PURE__ */ jsxDEV9(UserOutlined_default2, {}, void 0, !1, {
                  fileName: "app/components/CommentCard/CommentCard.tsx",
                  lineNumber: 61,
                  columnNumber: 21
                }, this),
                size: "small"
              },
              void 0,
              !1,
              {
                fileName: "app/components/CommentCard/CommentCard.tsx",
                lineNumber: 59,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV9(Typography4.Link, { strong: !0, href: `/profile/${comment.user.username}`, children: comment.user.username }, void 0, !1, {
              fileName: "app/components/CommentCard/CommentCard.tsx",
              lineNumber: 64,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/CommentCard/CommentCard.tsx",
            lineNumber: 58,
            columnNumber: 11
          }, this) }, void 0, !1, {
            fileName: "app/components/CommentCard/CommentCard.tsx",
            lineNumber: 57,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV9(Typography4.Text, { type: "secondary", style: { fontSize: 12 }, children: convertUtcDateToLocalDateString(comment.createdAt) }, void 0, !1, {
            fileName: "app/components/CommentCard/CommentCard.tsx",
            lineNumber: 69,
            columnNumber: 9
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/CommentCard/CommentCard.tsx",
        lineNumber: 50,
        columnNumber: 7
      },
      this
    ),
    comment.message,
    /* @__PURE__ */ jsxDEV9(
      "footer",
      {
        style: {
          display: "flex",
          justifyContent: "space-between"
        },
        children: [
          /* @__PURE__ */ jsxDEV9(LikeCommentButton_default, { imageData, comment }, void 0, !1, {
            fileName: "app/components/CommentCard/CommentCard.tsx",
            lineNumber: 80,
            columnNumber: 9
          }, this),
          imageData.user.id === userId && /* @__PURE__ */ jsxDEV9(Space3, { children: /* @__PURE__ */ jsxDEV9(DeleteCommentButton_default, { imageData, comment }, void 0, !1, {
            fileName: "app/components/CommentCard/CommentCard.tsx",
            lineNumber: 91,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/CommentCard/CommentCard.tsx",
            lineNumber: 82,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/CommentCard/CommentCard.tsx",
        lineNumber: 74,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/CommentCard/CommentCard.tsx",
    lineNumber: 49,
    columnNumber: 5
  }, this);
}, CommentCard_default = CommentCard;

// app/components/NavigationSidebar/NavigationSidebar.tsx
import React29 from "react";
import { Button as Button7, Layout, Space as Space4, Typography as Typography5 } from "antd";
import { Fragment as Fragment3, jsxDEV as jsxDEV10 } from "react/jsx-dev-runtime";
var NavigationSidebar = () => {
  let userData = React29.useContext(UserContext), isLoggedIn = Boolean(userData?.id);
  return /* @__PURE__ */ jsxDEV10(
    Layout.Sider,
    {
      style: {
        overflow: "auto",
        height: "100vh",
        position: "fixed",
        left: 0,
        top: 0,
        bottom: 0,
        textAlign: "center",
        padding: 16,
        borderRight: "rgb(38, 38, 38) 1px solid",
        background: "#000"
      },
      children: /* @__PURE__ */ jsxDEV10(
        "div",
        {
          style: {
            height: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between"
          },
          children: [
            /* @__PURE__ */ jsxDEV10("div", { children: /* @__PURE__ */ jsxDEV10(
              Typography5.Link,
              {
                href: "/",
                style: {
                  color: "#e6f1ff",
                  height: 64,
                  fontSize: 20,
                  fontWeight: 600,
                  textAlign: "left",
                  padding: "0 8px"
                },
                children: "AI Image Generator"
              },
              void 0,
              !1,
              {
                fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                lineNumber: 42,
                columnNumber: 11
              },
              this
            ) }, void 0, !1, {
              fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
              lineNumber: 41,
              columnNumber: 9
            }, this),
            /* @__PURE__ */ jsxDEV10(Space4, { direction: "vertical", style: { alignItems: "flex-start" }, children: [
              /* @__PURE__ */ jsxDEV10(
                Button7,
                {
                  type: "link",
                  href: "/explore",
                  icon: /* @__PURE__ */ jsxDEV10(SearchOutlined_default2, {}, void 0, !1, {
                    fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                    lineNumber: 62,
                    columnNumber: 19
                  }, this),
                  style: { color: "#fff", fontSize: 16 },
                  children: "Explore"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                  lineNumber: 59,
                  columnNumber: 11
                },
                this
              ),
              isLoggedIn && /* @__PURE__ */ jsxDEV10(Fragment3, { children: [
                /* @__PURE__ */ jsxDEV10(
                  Button7,
                  {
                    type: "link",
                    href: "/collections",
                    icon: /* @__PURE__ */ jsxDEV10(BookOutlined_default2, {}, void 0, !1, {
                      fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                      lineNumber: 72,
                      columnNumber: 23
                    }, this),
                    style: { color: "#fff", fontSize: 16 },
                    children: "Collections"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                    lineNumber: 69,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV10(
                  Button7,
                  {
                    href: "/create",
                    type: "link",
                    style: { color: "#fff", fontSize: 16 },
                    icon: /* @__PURE__ */ jsxDEV10(PlusCircleOutlined_default2, {}, void 0, !1, {
                      fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                      lineNumber: 81,
                      columnNumber: 23
                    }, this),
                    children: "Create"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                    lineNumber: 77,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV10(
                  Button7,
                  {
                    type: "link",
                    href: `/profile/${userData.username}`,
                    icon: /* @__PURE__ */ jsxDEV10(UserOutlined_default2, {}, void 0, !1, {
                      fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                      lineNumber: 88,
                      columnNumber: 23
                    }, this),
                    style: { color: "#fff", fontSize: 16 },
                    children: "Profile"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                    lineNumber: 85,
                    columnNumber: 15
                  },
                  this
                ),
                /* @__PURE__ */ jsxDEV10(
                  Button7,
                  {
                    type: "link",
                    href: "/manage",
                    icon: /* @__PURE__ */ jsxDEV10(ToolOutlined_default2, {}, void 0, !1, {
                      fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                      lineNumber: 96,
                      columnNumber: 23
                    }, this),
                    style: { color: "#fff", fontSize: 16 },
                    children: "Manage"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                    lineNumber: 93,
                    columnNumber: 15
                  },
                  this
                )
              ] }, void 0, !0, {
                fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
                lineNumber: 68,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
              lineNumber: 58,
              columnNumber: 9
            }, this),
            isLoggedIn ? /* @__PURE__ */ jsxDEV10("div", { children: /* @__PURE__ */ jsxDEV10(UserAvatar_default, {}, void 0, !1, {
              fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
              lineNumber: 106,
              columnNumber: 13
            }, this) }, void 0, !1, {
              fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
              lineNumber: 105,
              columnNumber: 11
            }, this) : /* @__PURE__ */ jsxDEV10(Button7, { href: "/login", children: "Sign In" }, void 0, !1, {
              fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
              lineNumber: 109,
              columnNumber: 11
            }, this)
          ]
        },
        void 0,
        !0,
        {
          fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
          lineNumber: 33,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/NavigationSidebar/NavigationSidebar.tsx",
      lineNumber: 19,
      columnNumber: 5
    },
    this
  );
}, NavigationSidebar_default = NavigationSidebar;

// app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx
import React30 from "react";
import { Button as Button8, Checkbox, Space as Space5, Tooltip as Tooltip2, Typography as Typography6 } from "antd";
import { Fragment as Fragment4, jsxDEV as jsxDEV11 } from "react/jsx-dev-runtime";
var getImageIds = (collections) => {
  let imageIds = [];
  return collections.forEach((collection) => {
    collection.images.forEach((image) => {
      imageIds.push(image.imageId);
    });
  }), imageIds;
}, AddImageToCollectionButton = ({
  imageData
}) => {
  let userData = React30.useContext(UserContext), userId = userData?.id || void 0, { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   const successMessage =
    //     response.data.message || "Successfully added Image to Collection";
    //   notification.success({ message: successMessage });
    // },
    // onError: (error) => {
    //   const errorMessage =
    //     error.data.message || "Error adding Image to Collection";
    //   console.error(error);
    //   notification.error({ message: errorMessage });
    // },
  }), [showUserCollectionsModal, setShowUserCollectionsModal] = React30.useState(!1), userCollections = userData.collections || [], userCollectionImages = getImageIds(userCollections), toggleUserCollectionsModal = () => {
    setShowUserCollectionsModal(!showUserCollectionsModal);
  }, handleAddImageToCollection = (event) => {
    let collectionId = event.target.value;
    userId && (fetcher.submit(
      { intent: "_add-image-to-collection" },
      {
        method: "POST",
        action: `/api/collections/${collectionId}/images/${imageData.id}`
      }
    ), toggleUserCollectionsModal());
  }, buttonIcon = userCollectionImages.some(
    (image) => image === imageData.id
  ) ? /* @__PURE__ */ jsxDEV11(BookFilled_default2, {}, void 0, !1, {
    fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
    lineNumber: 74,
    columnNumber: 5
  }, this) : /* @__PURE__ */ jsxDEV11(BookOutlined_default2, {}, void 0, !1, {
    fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
    lineNumber: 76,
    columnNumber: 5
  }, this);
  return /* @__PURE__ */ jsxDEV11(Fragment4, { children: /* @__PURE__ */ jsxDEV11(
    Tooltip2,
    {
      title: /* @__PURE__ */ jsxDEV11(Fragment4, { children: userCollections.length ? /* @__PURE__ */ jsxDEV11(Space5, { direction: "vertical", children: [
        /* @__PURE__ */ jsxDEV11(CreateCollectionButton_default, {}, void 0, !1, {
          fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
          lineNumber: 86,
          columnNumber: 17
        }, this),
        userCollections.map((collection) => {
          let isCollectionChecked = collection.images.some(
            // @ts-ignore
            (image) => image.imageId === imageData.id
          );
          return /* @__PURE__ */ jsxDEV11(
            Checkbox,
            {
              value: collection.id,
              onClick: handleAddImageToCollection,
              checked: isCollectionChecked,
              style: { padding: 4 },
              children: collection.title
            },
            collection.id,
            !1,
            {
              fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
              lineNumber: 95,
              columnNumber: 21
            },
            this
          );
        })
      ] }, void 0, !0, {
        fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
        lineNumber: 85,
        columnNumber: 15
      }, this) : /* @__PURE__ */ jsxDEV11(Typography6.Text, { italic: !0, type: "secondary", children: "No Collections" }, void 0, !1, {
        fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
        lineNumber: 108,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
        lineNumber: 83,
        columnNumber: 11
      }, this),
      children: /* @__PURE__ */ jsxDEV11(
        Button8,
        {
          size: "small",
          style: { border: "none", boxShadow: "none" },
          icon: buttonIcon,
          onClick: toggleUserCollectionsModal,
          loading: isLoadingFetcher,
          disabled: !userId
        },
        void 0,
        !1,
        {
          fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
          lineNumber: 115,
          columnNumber: 9
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
      lineNumber: 81,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/AddImageToCollectionButton/AddImageToCollectionButton.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}, AddImageToCollectionButton_default = AddImageToCollectionButton;

// app/components/DeleteCollectionButton/DeleteCollectionButton.tsx
import { Button as Button9 } from "antd";
import { jsxDEV as jsxDEV12 } from "react/jsx-dev-runtime";
var DeleteCollectionButton = ({ collectionId }) => {
  let { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  });
  return /* @__PURE__ */ jsxDEV12(
    Button9,
    {
      size: "small",
      style: { border: "none" },
      icon: /* @__PURE__ */ jsxDEV12(DeleteOutlined_default2, {}, void 0, !1, {
        fileName: "app/components/DeleteCollectionButton/DeleteCollectionButton.tsx",
        lineNumber: 29,
        columnNumber: 13
      }, this),
      danger: !0,
      loading: isLoadingFetcher,
      onClick: () => {
        fetcher.submit(
          { intent: "_delete_collection" },
          {
            method: "DELETE",
            action: `/api/collections/${collectionId}`
          }
        );
      },
      children: "Delete"
    },
    void 0,
    !1,
    {
      fileName: "app/components/DeleteCollectionButton/DeleteCollectionButton.tsx",
      lineNumber: 26,
      columnNumber: 5
    },
    this
  );
}, DeleteCollectionButton_default = DeleteCollectionButton;

// app/components/EditCollectionButton/EditCollectionButton.tsx
import React31 from "react";
import { Button as Button10, Modal as Modal3, Form as Form3, Input as Input2, Space as Space6 } from "antd";
import { Fragment as Fragment5, jsxDEV as jsxDEV13 } from "react/jsx-dev-runtime";
var EditCollectionButton = ({ collection }) => {
  let { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    // const message =
    //   response.data.message || "Successfully updated collection";
    // notification.success({ message });
    // },
    onError: (error) => {
      console.error(error);
    }
  }), [formInstance] = Form3.useForm(), [showEditImageModal, setShowEditImageModal] = React31.useState(!1), toggleEditImageModal = () => setShowEditImageModal(!showEditImageModal), isLoadingData = isLoadingFetcher, handleSubmitEditImageData = () => {
    formInstance.submit();
  }, handleSubmitForm = (formValues) => {
    toggleEditImageModal(), fetcher.submit(
      { intent: "_edit_collection", body: JSON.stringify(formValues) },
      { method: "PATCH", action: `/api/collections/${collection.id}` }
    );
  };
  return /* @__PURE__ */ jsxDEV13(Fragment5, { children: [
    /* @__PURE__ */ jsxDEV13(
      Button10,
      {
        size: "small",
        icon: /* @__PURE__ */ jsxDEV13(EditOutlined_default2, {}, void 0, !1, {
          fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
          lineNumber: 42,
          columnNumber: 15
        }, this),
        style: { border: "none", textAlign: "left" },
        loading: isLoadingData,
        onClick: toggleEditImageModal,
        children: "Edit"
      },
      void 0,
      !1,
      {
        fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
        lineNumber: 40,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV13(
      Modal3,
      {
        open: showEditImageModal,
        footer: !1,
        onCancel: toggleEditImageModal,
        children: /* @__PURE__ */ jsxDEV13("div", { children: [
          /* @__PURE__ */ jsxDEV13(
            Form3,
            {
              form: formInstance,
              layout: "vertical",
              colon: !1,
              initialValues: {
                title: collection.title,
                description: collection.description || void 0
              },
              onFinish: handleSubmitForm,
              children: [
                /* @__PURE__ */ jsxDEV13(Form3.Item, { label: "Title", name: "title", children: /* @__PURE__ */ jsxDEV13(Input2, { placeholder: "Enter title of image" }, void 0, !1, {
                  fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
                  lineNumber: 66,
                  columnNumber: 15
                }, this) }, void 0, !1, {
                  fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
                  lineNumber: 65,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV13(Form3.Item, { label: "Description", name: "description", children: /* @__PURE__ */ jsxDEV13(Input2, { placeholder: "Enter collection description" }, void 0, !1, {
                  fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
                  lineNumber: 69,
                  columnNumber: 15
                }, this) }, void 0, !1, {
                  fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
                  lineNumber: 68,
                  columnNumber: 13
                }, this)
              ]
            },
            void 0,
            !0,
            {
              fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
              lineNumber: 55,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV13("footer", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxDEV13(Space6, { children: [
            /* @__PURE__ */ jsxDEV13(Button10, { onClick: toggleEditImageModal, children: "Cancel" }, void 0, !1, {
              fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
              lineNumber: 74,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV13(Button10, { onClick: handleSubmitEditImageData, type: "primary", children: "OK" }, void 0, !1, {
              fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
              lineNumber: 75,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
            lineNumber: 73,
            columnNumber: 13
          }, this) }, void 0, !1, {
            fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
            lineNumber: 72,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
          lineNumber: 54,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
        lineNumber: 49,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/EditCollectionButton/EditCollectionButton.tsx",
    lineNumber: 39,
    columnNumber: 5
  }, this);
}, EditCollectionButton_default = EditCollectionButton;

// app/components/CreateCollectionButton/CreateCollectionButton.tsx
import React32 from "react";
import {
  Button as Button11,
  Modal as Modal4,
  Form as Form4,
  Input as Input3
} from "antd";
import { Fragment as Fragment6, jsxDEV as jsxDEV14 } from "react/jsx-dev-runtime";
var CreateCollectionButton = () => {
  let [formInstance] = Form4.useForm(), [showCreateCollectionModal, setShowCreateCollectionModal] = React32.useState(!1), toggleCreateCollectionModal = () => setShowCreateCollectionModal(!showCreateCollectionModal), { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.data.message });
    // },
    // onError: (error) => {
    //   console.error(error);
    //   notification.error({ message: error.data.message });
    // },
  }), isLoadingData = isLoadingFetcher;
  return /* @__PURE__ */ jsxDEV14(Fragment6, { children: [
    /* @__PURE__ */ jsxDEV14(
      Button11,
      {
        icon: /* @__PURE__ */ jsxDEV14(PlusCircleOutlined_default2, {}, void 0, !1, {
          fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
          lineNumber: 53,
          columnNumber: 15
        }, this),
        onClick: toggleCreateCollectionModal,
        loading: isLoadingData,
        children: "Create Collection"
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
        lineNumber: 52,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV14(
      Modal4,
      {
        title: "Create New Collection",
        open: showCreateCollectionModal,
        onCancel: toggleCreateCollectionModal,
        onOk: () => {
          formInstance.submit();
        },
        okText: "Create",
        children: /* @__PURE__ */ jsxDEV14(
          Form4,
          {
            form: formInstance,
            onFinish: (formValues) => {
              toggleCreateCollectionModal(), fetcher.submit(
                { intent: "_create_collection", body: JSON.stringify(formValues) },
                { method: "POST", action: "/api/collections" }
              );
            },
            colon: !1,
            layout: "vertical",
            disabled: isLoadingData,
            initialValues: { label: void 0, description: void 0 },
            children: [
              /* @__PURE__ */ jsxDEV14(Form4.Item, { label: "Title", name: "title", required: !0, children: /* @__PURE__ */ jsxDEV14(Input3, { placeholder: 'Ex: "My Favorites, Inspiration"' }, void 0, !1, {
                fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
                lineNumber: 75,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
                lineNumber: 74,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV14(Form4.Item, { label: "Description", name: "description", children: /* @__PURE__ */ jsxDEV14(Input3, { placeholder: 'Ex: "My Favorites AI generated images"' }, void 0, !1, {
                fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
                lineNumber: 78,
                columnNumber: 13
              }, this) }, void 0, !1, {
                fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
                lineNumber: 77,
                columnNumber: 11
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
            lineNumber: 66,
            columnNumber: 9
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
        lineNumber: 59,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/CreateCollectionButton/CreateCollectionButton.tsx",
    lineNumber: 51,
    columnNumber: 5
  }, this);
}, CreateCollectionButton_default = CreateCollectionButton;

// app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx
import React33 from "react";
import { Button as Button12, Checkbox as Checkbox2, Popover as Popover2, Space as Space8, Typography as Typography8 } from "antd";
import { useActionData, useNavigation as useNavigation3 } from "@remix-run/react";
import { Fragment as Fragment7, jsxDEV as jsxDEV15 } from "react/jsx-dev-runtime";
var getImageIds2 = (collections) => {
  let imageIds = [];
  return collections.forEach((collection) => {
    collection.images.forEach((image) => {
      imageIds.push(image.imageId);
    });
  }), imageIds;
}, AddImagesToCollectionButton = ({ images }) => {
  let userData = React33.useContext(UserContext), userId = userData?.id || void 0, actionData = useActionData(), isLoadingData = useNavigation3().state !== "idle";
  console.log(actionData);
  let imagesGenerated = Boolean(actionData && actionData.images), imagesIds = images.map((image) => image.id), { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   const successMessage =
    //     response.data.message || "Successfully added Image to Collection";
    //   notification.success({ message: successMessage });
    // },
    // onError: (error) => {
    //   const errorMessage =
    //     error.data.message || "Error adding Image to Collection";
    //   console.error(error);
    //   notification.error({ message: errorMessage });
    // },
  }), [showUserCollectionsPopover, setShowUserCollectionsPopover] = React33.useState(!1), userCollections = userData.collections || [], userCollectionImages = getImageIds2(userCollections), toggleUserCollectionsPopover = () => {
    setShowUserCollectionsPopover(!showUserCollectionsPopover);
  }, handleAddImagesToCollection = (event) => {
    let collectionId = event.target.value;
    userId && (fetcher.submit(
      {
        intent: "_add-image-to-collection",
        body: JSON.stringify({ images: imagesIds })
      },
      {
        method: "POST",
        action: `/api/collections/${collectionId}/images?index`
      }
    ), toggleUserCollectionsPopover());
  };
  return /* @__PURE__ */ jsxDEV15(Fragment7, { children: /* @__PURE__ */ jsxDEV15(
    Popover2,
    {
      open: showUserCollectionsPopover,
      title: /* @__PURE__ */ jsxDEV15(Fragment7, { children: userCollections.length ? /* @__PURE__ */ jsxDEV15(Space8, { direction: "vertical", children: [
        /* @__PURE__ */ jsxDEV15(CreateCollectionButton_default, {}, void 0, !1, {
          fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
          lineNumber: 87,
          columnNumber: 17
        }, this),
        userCollections.map((collection) => {
          let isCollectionChecked = userCollectionImages.some(
            (imageId) => imagesIds.includes(imageId)
          );
          return /* @__PURE__ */ jsxDEV15(
            Checkbox2,
            {
              value: collection.id,
              onClick: handleAddImagesToCollection,
              checked: isCollectionChecked,
              style: { padding: 4 },
              children: collection.title
            },
            collection.id,
            !1,
            {
              fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
              lineNumber: 94,
              columnNumber: 21
            },
            this
          );
        })
      ] }, void 0, !0, {
        fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
        lineNumber: 86,
        columnNumber: 15
      }, this) : /* @__PURE__ */ jsxDEV15(Typography8.Text, { italic: !0, type: "secondary", children: "No Collections" }, void 0, !1, {
        fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
        lineNumber: 107,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
        lineNumber: 84,
        columnNumber: 11
      }, this),
      children: /* @__PURE__ */ jsxDEV15(
        Button12,
        {
          icon: /* @__PURE__ */ jsxDEV15(BookOutlined_default2, {}, void 0, !1, {
            fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
            lineNumber: 115,
            columnNumber: 17
          }, this),
          onClick: toggleUserCollectionsPopover,
          loading: isLoadingFetcher,
          disabled: !userId || !imagesGenerated || isLoadingData,
          children: "Add images to Collection"
        },
        void 0,
        !1,
        {
          fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
          lineNumber: 114,
          columnNumber: 9
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
      lineNumber: 81,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/AddImagesToCollectionButton/AddImagesToCollectionButton.tsx",
    lineNumber: 80,
    columnNumber: 5
  }, this);
}, AddImagesToCollectionButton_default = AddImagesToCollectionButton;

// app/components/GeneralErrorBoundary.tsx
import {
  isRouteErrorResponse,
  useParams,
  useRouteError
} from "@remix-run/react";
import { jsxDEV as jsxDEV16 } from "react/jsx-dev-runtime";
function GeneralErrorBoundary({
  defaultStatusHandler = ({ error }) => /* @__PURE__ */ jsxDEV16("p", { children: [
    error.status,
    " ",
    error.data
  ] }, void 0, !0, {
    fileName: "app/components/GeneralErrorBoundary.tsx",
    lineNumber: 16,
    columnNumber: 5
  }, this),
  statusHandlers,
  unexpectedErrorHandler = (error) => /* @__PURE__ */ jsxDEV16("p", { children: getErrorMessage(error) }, void 0, !1, {
    fileName: "app/components/GeneralErrorBoundary.tsx",
    lineNumber: 21,
    columnNumber: 39
  }, this)
}) {
  let error = useRouteError(), params = useParams();
  return typeof document < "u" && console.error(error), /* @__PURE__ */ jsxDEV16("div", { className: "container mx-auto flex h-full w-full items-center justify-center bg-destructive p-20 text-h2 text-destructive-foreground", children: isRouteErrorResponse(error) ? (statusHandlers?.[error.status] ?? defaultStatusHandler)({
    error,
    params
  }) : unexpectedErrorHandler(error) }, void 0, !1, {
    fileName: "app/components/GeneralErrorBoundary.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}

// app/components/Input.tsx
import * as React34 from "react";
import { jsxDEV as jsxDEV17 } from "react/jsx-dev-runtime";
var Input4 = React34.forwardRef(
  ({ className, type, ...props }, ref) => /* @__PURE__ */ jsxDEV17(
    "input",
    {
      type,
      className: buildClassName(
        "border-solid flex h-10 w-full rounded-md border border-input bg-white/5 px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 aria-[invalid]:border-input-invalid",
        className
      ),
      ref,
      ...props
    },
    void 0,
    !1,
    {
      fileName: "app/components/Input.tsx",
      lineNumber: 10,
      columnNumber: 7
    },
    this
  )
);
Input4.displayName = "Input";

// app/components/Label.tsx
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva } from "class-variance-authority";
import * as React35 from "react";
import { jsxDEV as jsxDEV18 } from "react/jsx-dev-runtime";
var labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2"
), Label = React35.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV18(
  LabelPrimitive.Root,
  {
    ref,
    className: buildClassName(labelVariants(), className),
    ...props
  },
  void 0,
  !1,
  {
    fileName: "app/components/Label.tsx",
    lineNumber: 15,
    columnNumber: 3
  },
  this
));
Label.displayName = LabelPrimitive.Root.displayName;

// app/components/EditUserForm/EditUserForm.tsx
import React36 from "react";
import { Form as Form5 } from "@remix-run/react";
import {
  conform,
  useForm
} from "@conform-to/react";
import { getFieldsetConstraint, parse as parse3 } from "@conform-to/zod";

// app/routes/api.user._index.ts
var api_user_index_exports = {};
__export(api_user_index_exports, {
  EditUserFormSchema: () => EditUserFormSchema,
  action: () => action
});
import { json as json2, redirect as redirect3 } from "@remix-run/node";
import { z as z4 } from "zod";
import { parse as parse2 } from "@conform-to/zod";
var MAX_PROMPT_CHARACTERS = 25, EditUserFormSchema = z4.object({
  username: z4.string().trim().min(1, { message: "Username can not be empty" }).max(MAX_PROMPT_CHARACTERS, {
    message: `Username must be ${MAX_PROMPT_CHARACTERS} characters or less`
  })
});
async function action({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id;
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Edit user data"
  ), request.method.toUpperCase()) {
    case "PATCH": {
      console.log("Updating User ID: ", userId);
      let formData = await request.formData();
      checkHoneypot(formData);
      let submission = parse2(formData, {
        schema: EditUserFormSchema
      });
      if (submission.intent !== "submit")
        return json2({ status: "idle", submission });
      if (!submission.value)
        return json2({ status: "error", submission }, {
          status: 400
        });
      let payload = submission.value, response = await updateUserData(userId, payload);
      console.log("Response", response);
      let toastCookieSession = await toastSessionStorage.getSession(
        request.headers.get("cookie")
      );
      return toastCookieSession.flash("toast", {
        type: "success",
        title: "Updated image",
        description: "Your image has been successfully updated"
      }), redirect3("/settings", {
        headers: {
          "set-cookie": await toastSessionStorage.commitSession(toastCookieSession)
        }
      });
    }
    default:
      return {};
  }
}

// app/components/EditUserForm/EditUserForm.tsx
import { Spin } from "antd";
import { HoneypotInputs } from "remix-utils/honeypot/react";
import { Fragment as Fragment8, jsxDEV as jsxDEV19 } from "react/jsx-dev-runtime";
var EDIT_FORM_ID = "edit-user-data", EditUserForm = () => {
  let userData = React36.useContext(UserContext), isSubmitting = useIsSubmitting(), [form, fields] = useForm({
    id: EDIT_FORM_ID,
    constraint: getFieldsetConstraint(EditUserFormSchema),
    // lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse3(formData, { schema: EditUserFormSchema });
    },
    defaultValue: {
      username: userData.username
    }
  });
  return /* @__PURE__ */ jsxDEV19(Fragment8, { children: /* @__PURE__ */ jsxDEV19(
    Form5,
    {
      action: "/api/user?index",
      method: "PATCH",
      style: { display: "flex", flexDirection: "column" },
      ...form.props,
      children: [
        /* @__PURE__ */ jsxDEV19("div", { className: "space-y-12", children: /* @__PURE__ */ jsxDEV19("div", { className: "border-b border-white/10 pb-12", children: [
          /* @__PURE__ */ jsxDEV19("h2", { className: "text-base font-semibold leading-7 text-white", children: "Profile" }, void 0, !1, {
            fileName: "app/components/EditUserForm/EditUserForm.tsx",
            lineNumber: 47,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV19("p", { className: "mt-1 text-sm leading-6 text-gray-400", children: "This information will be displayed publicly so be careful what you share." }, void 0, !1, {
            fileName: "app/components/EditUserForm/EditUserForm.tsx",
            lineNumber: 50,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV19("div", { className: "mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6", children: [
            /* @__PURE__ */ jsxDEV19("div", { className: "sm:col-span-4", children: [
              /* @__PURE__ */ jsxDEV19(
                "label",
                {
                  htmlFor: fields.username.id,
                  className: "block text-sm font-medium leading-6 text-white",
                  children: "Username"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/EditUserForm/EditUserForm.tsx",
                  lineNumber: 57,
                  columnNumber: 17
                },
                this
              ),
              /* @__PURE__ */ jsxDEV19("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV19("div", { className: "flex rounded-md bg-white/5 ring-1 ring-inset ring-white/10 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500", children: /* @__PURE__ */ jsxDEV19(
                "input",
                {
                  type: "text",
                  id: fields.username.id,
                  min: 1,
                  autoFocus: !0,
                  className: "flex-1 border-0 bg-transparent py-1.5 px-3 text-white focus:ring-0 sm:text-sm sm:leading-6",
                  ...conform.input(fields.username),
                  placeholder: "Enter a username..."
                },
                void 0,
                !1,
                {
                  fileName: "app/components/EditUserForm/EditUserForm.tsx",
                  lineNumber: 68,
                  columnNumber: 21
                },
                this
              ) }, void 0, !1, {
                fileName: "app/components/EditUserForm/EditUserForm.tsx",
                lineNumber: 64,
                columnNumber: 19
              }, this) }, void 0, !1, {
                fileName: "app/components/EditUserForm/EditUserForm.tsx",
                lineNumber: 63,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/components/EditUserForm/EditUserForm.tsx",
              lineNumber: 56,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV19(HoneypotInputs, {}, void 0, !1, {
              fileName: "app/components/EditUserForm/EditUserForm.tsx",
              lineNumber: 80,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "app/components/EditUserForm/EditUserForm.tsx",
            lineNumber: 55,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/components/EditUserForm/EditUserForm.tsx",
          lineNumber: 46,
          columnNumber: 11
        }, this) }, void 0, !1, {
          fileName: "app/components/EditUserForm/EditUserForm.tsx",
          lineNumber: 45,
          columnNumber: 9
        }, this),
        /* @__PURE__ */ jsxDEV19("div", { className: "mt-6 flex items-center justify-end gap-x-6", children: /* @__PURE__ */ jsxDEV19(
          "button",
          {
            form: form.id,
            disabled: isSubmitting,
            type: "submit",
            className: "rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500",
            children: [
              isSubmitting && /* @__PURE__ */ jsxDEV19(Spin, { size: "small", spinning: !0 }, void 0, !1, {
                fileName: "app/components/EditUserForm/EditUserForm.tsx",
                lineNumber: 304,
                columnNumber: 30
              }, this),
              "Save Changes"
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/EditUserForm/EditUserForm.tsx",
            lineNumber: 298,
            columnNumber: 11
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/EditUserForm/EditUserForm.tsx",
          lineNumber: 297,
          columnNumber: 9
        }, this)
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/EditUserForm/EditUserForm.tsx",
      lineNumber: 39,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/EditUserForm/EditUserForm.tsx",
    lineNumber: 38,
    columnNumber: 5
  }, this);
}, EditUserForm_default = EditUserForm;

// app/components/ImageModalv2/ImageModalv2.tsx
import React37 from "react";
import {
  Typography as Typography9,
  Image as Image2,
  Space as Space9,
  Button as Button13,
  Modal as Modal5,
  Avatar as Avatar4,
  Tabs as Tabs2,
  Form as Form6,
  Input as Input5
} from "antd";
import { useLoaderData, useLocation, useNavigate } from "@remix-run/react";
import { Fragment as Fragment9, jsxDEV as jsxDEV20 } from "react/jsx-dev-runtime";
var ImageModalv2 = () => {
  let userData = React37.useContext(UserContext), isUserLoggedIn = Boolean(userData), location = useLocation(), navigate = useNavigate(), imageData = useLoaderData().data, [formInstance] = Form6.useForm(), { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  }), handleCommentFormSubmit = (formValues) => {
    fetcher.submit(
      { intent: "image-add-comment", body: JSON.stringify(formValues) },
      { method: "post", action: `/api/image/${imageData.id}/comment?index` }
    );
  }, handleImageClick = () => {
    navigate(`${location.search ? `/explore${location.search}` : "/explore"}`);
  };
  return /* @__PURE__ */ jsxDEV20(Fragment9, { children: /* @__PURE__ */ jsxDEV20(
    Modal5,
    {
      open: !0,
      destroyOnClose: !0,
      onCancel: () => handleImageClick(),
      width: "90%",
      footer: null,
      bodyStyle: { display: "flex", padding: 0, height: "100%" },
      style: { top: "5%", padding: 0, height: "90%" },
      children: [
        /* @__PURE__ */ jsxDEV20(
          "div",
          {
            style: {
              flex: "1 1 100%",
              background: "black",
              position: "relative"
            },
            children: /* @__PURE__ */ jsxDEV20(
              "div",
              {
                style: {
                  position: "relative",
                  overflow: "hidden",
                  minHeight: 300,
                  paddingBottom: 0,
                  height: "100%",
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column"
                },
                children: /* @__PURE__ */ jsxDEV20(
                  "div",
                  {
                    style: {
                      width: "100%",
                      maxWidth: 1024,
                      margin: "auto",
                      display: "flex",
                      justifyContent: "center"
                    },
                    children: /* @__PURE__ */ jsxDEV20(
                      Image2,
                      {
                        src: imageData.url,
                        alt: imageData.prompt || "Generated Image",
                        fallback: fallbackImageSource,
                        preview: !1,
                        placeholder: /* @__PURE__ */ jsxDEV20(
                          "div",
                          {
                            style: {
                              width: 1024,
                              height: 1024,
                              background: "black"
                            }
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 110,
                            columnNumber: 19
                          },
                          this
                        )
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                        lineNumber: 104,
                        columnNumber: 15
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                    lineNumber: 95,
                    columnNumber: 13
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                lineNumber: 83,
                columnNumber: 11
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
            lineNumber: 76,
            columnNumber: 9
          },
          this
        ),
        /* @__PURE__ */ jsxDEV20(
          "div",
          {
            style: {
              padding: 16,
              flexBasis: 420,
              display: "flex",
              flexDirection: "column"
              // justifyContent: "space-between",
            },
            children: [
              /* @__PURE__ */ jsxDEV20(Space9, { style: { marginBottom: "1rem" }, children: [
                /* @__PURE__ */ jsxDEV20(Avatar4, { style: { cursor: "pointer" }, icon: /* @__PURE__ */ jsxDEV20(UserOutlined_default2, {}, void 0, !1, {
                  fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                  lineNumber: 133,
                  columnNumber: 57
                }, this) }, void 0, !1, {
                  fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                  lineNumber: 133,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV20("div", { style: { display: "flex", flexDirection: "column" }, children: [
                  /* @__PURE__ */ jsxDEV20(
                    Typography9.Link,
                    {
                      strong: !0,
                      href: `/profile/${imageData.user.username}`,
                      children: imageData.user.username
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                      lineNumber: 136,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV20(Typography9.Text, { type: "secondary", style: { fontSize: 12 }, children: convertUtcDateToLocalDateString(imageData.createdAt) }, void 0, !1, {
                    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                    lineNumber: 142,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                  lineNumber: 135,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                lineNumber: 132,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV20(Space9, { style: { display: "flex", justifyContent: "space-between" }, children: [
                /* @__PURE__ */ jsxDEV20(Typography9.Text, { strong: !0, style: { fontSize: 16 }, children: /* @__PURE__ */ jsxDEV20(
                  Typography9.Link,
                  {
                    href: `/p/${imageData.id}`,
                    style: { color: "inherit" },
                    children: imageData.title || "Untitled"
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                    lineNumber: 149,
                    columnNumber: 15
                  },
                  this
                ) }, void 0, !1, {
                  fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                  lineNumber: 148,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV20(Space9, { size: "small", children: [
                  /* @__PURE__ */ jsxDEV20(LikeImageButton_default, { imageData }, void 0, !1, {
                    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                    lineNumber: 157,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV20(AddImageToCollectionButton_default, { imageData }, void 0, !1, {
                    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                    lineNumber: 158,
                    columnNumber: 15
                  }, this)
                ] }, void 0, !0, {
                  fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                  lineNumber: 156,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                lineNumber: 147,
                columnNumber: 11
              }, this),
              /* @__PURE__ */ jsxDEV20(
                Tabs2,
                {
                  style: { height: "100%" },
                  defaultActiveKey: "comments",
                  items: [
                    {
                      label: /* @__PURE__ */ jsxDEV20("span", { children: [
                        /* @__PURE__ */ jsxDEV20(MessageOutlined_default2, {}, void 0, !1, {
                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                          lineNumber: 169,
                          columnNumber: 21
                        }, this),
                        "Comments"
                      ] }, void 0, !0, {
                        fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                        lineNumber: 168,
                        columnNumber: 19
                      }, this),
                      key: "comment",
                      children: /* @__PURE__ */ jsxDEV20(
                        "div",
                        {
                          style: {
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            height: "100%"
                          },
                          children: [
                            isUserLoggedIn && /* @__PURE__ */ jsxDEV20(
                              "div",
                              {
                                style: {
                                  position: "absolute",
                                  width: "100%",
                                  bottom: 0
                                },
                                children: /* @__PURE__ */ jsxDEV20(
                                  Form6,
                                  {
                                    onFinish: handleCommentFormSubmit,
                                    initialValues: { comment: void 0 },
                                    form: formInstance,
                                    children: /* @__PURE__ */ jsxDEV20(
                                      Form6.Item,
                                      {
                                        name: "comment",
                                        style: {
                                          margin: 0
                                        },
                                        children: /* @__PURE__ */ jsxDEV20(Space9.Compact, { style: { width: "100%" }, children: [
                                          /* @__PURE__ */ jsxDEV20(Input5, { placeholder: "Leave a comment", allowClear: !0 }, void 0, !1, {
                                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                            lineNumber: 203,
                                            columnNumber: 31
                                          }, this),
                                          /* @__PURE__ */ jsxDEV20(
                                            Button13,
                                            {
                                              type: "primary",
                                              ghost: !0,
                                              icon: /* @__PURE__ */ jsxDEV20(SendOutlined_default2, {}, void 0, !1, {
                                                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                                lineNumber: 207,
                                                columnNumber: 39
                                              }, this),
                                              onClick: () => formInstance.submit(),
                                              loading: isLoadingFetcher
                                            },
                                            void 0,
                                            !1,
                                            {
                                              fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                              lineNumber: 204,
                                              columnNumber: 31
                                            },
                                            this
                                          )
                                        ] }, void 0, !0, {
                                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                          lineNumber: 202,
                                          columnNumber: 29
                                        }, this)
                                      },
                                      void 0,
                                      !1,
                                      {
                                        fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                        lineNumber: 196,
                                        columnNumber: 27
                                      },
                                      this
                                    )
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                    lineNumber: 191,
                                    columnNumber: 25
                                  },
                                  this
                                )
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                lineNumber: 184,
                                columnNumber: 23
                              },
                              this
                            ),
                            imageData.comments && imageData.comments.length > 0 ? imageData.comments.map((comment) => /* @__PURE__ */ jsxDEV20(
                              CommentCard_default,
                              {
                                imageData,
                                comment
                              },
                              comment.id,
                              !1,
                              {
                                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                lineNumber: 218,
                                columnNumber: 25
                              },
                              this
                            )) : /* @__PURE__ */ jsxDEV20(
                              Typography9.Text,
                              {
                                type: "secondary",
                                italic: !0,
                                style: { alignSelf: "center" },
                                children: "No comments"
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                lineNumber: 225,
                                columnNumber: 23
                              },
                              this
                            )
                          ]
                        },
                        void 0,
                        !0,
                        {
                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                          lineNumber: 175,
                          columnNumber: 19
                        },
                        this
                      )
                    },
                    {
                      label: /* @__PURE__ */ jsxDEV20("span", { children: [
                        /* @__PURE__ */ jsxDEV20(InfoCircleOutlined_default2, {}, void 0, !1, {
                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                          lineNumber: 239,
                          columnNumber: 21
                        }, this),
                        "Info"
                      ] }, void 0, !0, {
                        fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                        lineNumber: 238,
                        columnNumber: 19
                      }, this),
                      key: "info",
                      children: /* @__PURE__ */ jsxDEV20(Space9, { direction: "vertical", children: [
                        /* @__PURE__ */ jsxDEV20(Space9, { direction: "vertical", size: "small", children: [
                          /* @__PURE__ */ jsxDEV20(Typography9.Text, { style: { fontWeight: 600 }, children: "Engine Model" }, void 0, !1, {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 247,
                            columnNumber: 23
                          }, this),
                          /* @__PURE__ */ jsxDEV20(Typography9.Text, { italic: !0, children: imageData.model }, void 0, !1, {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 250,
                            columnNumber: 23
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                          lineNumber: 246,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ jsxDEV20(Space9, { direction: "vertical", size: "small", children: [
                          /* @__PURE__ */ jsxDEV20(Typography9.Text, { style: { fontWeight: 600 }, children: "Style Preset" }, void 0, !1, {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 255,
                            columnNumber: 23
                          }, this),
                          /* @__PURE__ */ jsxDEV20(Typography9.Text, { italic: !0, children: imageData.stylePreset }, void 0, !1, {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 258,
                            columnNumber: 23
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                          lineNumber: 254,
                          columnNumber: 21
                        }, this),
                        /* @__PURE__ */ jsxDEV20(Space9, { direction: "vertical", size: "small", children: [
                          /* @__PURE__ */ jsxDEV20(Typography9.Text, { style: { fontWeight: 600 }, children: "Prompt" }, void 0, !1, {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 263,
                            columnNumber: 23
                          }, this),
                          /* @__PURE__ */ jsxDEV20("div", { children: [
                            /* @__PURE__ */ jsxDEV20(Typography9.Text, { italic: !0, children: imageData.prompt }, void 0, !1, {
                              fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                              lineNumber: 267,
                              columnNumber: 25
                            }, this),
                            /* @__PURE__ */ jsxDEV20(
                              CopyToClipboardButton_default,
                              {
                                stringToCopy: imageData.prompt || ""
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                                lineNumber: 270,
                                columnNumber: 25
                              },
                              this
                            )
                          ] }, void 0, !0, {
                            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                            lineNumber: 266,
                            columnNumber: 23
                          }, this)
                        ] }, void 0, !0, {
                          fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                          lineNumber: 262,
                          columnNumber: 21
                        }, this)
                      ] }, void 0, !0, {
                        fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                        lineNumber: 245,
                        columnNumber: 19
                      }, this)
                    }
                  ]
                },
                void 0,
                !1,
                {
                  fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
                  lineNumber: 162,
                  columnNumber: 11
                },
                this
              )
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
            lineNumber: 123,
            columnNumber: 9
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
      lineNumber: 67,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/components/ImageModalv2/ImageModalv2.tsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}, ImageModalv2_default = ImageModalv2;

// app/components/ImageV2/ImageV2.tsx
import { useLocation as useLocation2, useNavigate as useNavigate2 } from "@remix-run/react";
import { jsxDEV as jsxDEV21 } from "react/jsx-dev-runtime";
var ImageV2 = ({ imageData }) => {
  let navigate = useNavigate2(), location = useLocation2(), handleImageClick = () => {
    navigate(
      `${location.search ? `${imageData.id}${location.search}` : `${imageData.id}`}`
    );
  };
  return /* @__PURE__ */ jsxDEV21(
    "div",
    {
      className: "relative overflow-hidden w-full pt-[100%]",
      onClick: () => handleImageClick(),
      children: /* @__PURE__ */ jsxDEV21(
        "img",
        {
          className: "inset-0 object-cover cursor-pointer absolute w-full h-full",
          src: imageData.thumbnailURL,
          alt: imageData.prompt
        },
        void 0,
        !1,
        {
          fileName: "app/components/ImageV2/ImageV2.tsx",
          lineNumber: 26,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/components/ImageV2/ImageV2.tsx",
      lineNumber: 21,
      columnNumber: 5
    },
    this
  );
}, ImageV2_default = ImageV2;

// app/components/ErrorList.tsx
import { jsxDEV as jsxDEV22 } from "react/jsx-dev-runtime";
function ErrorList({
  id,
  errors
}) {
  let errorsToRender = errors?.filter(Boolean);
  return errorsToRender?.length ? /* @__PURE__ */ jsxDEV22("ul", { id, className: "flex flex-col gap-1", children: errorsToRender.map((e) => /* @__PURE__ */ jsxDEV22("li", { className: "text-[10px] text-foreground-destructive", children: e }, e, !1, {
    fileName: "app/components/ErrorList.tsx",
    lineNumber: 15,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "app/components/ErrorList.tsx",
    lineNumber: 13,
    columnNumber: 5
  }, this) : null;
}

// app/components/ShowToast.tsx
import React38 from "react";
import { toast as showToast } from "sonner";
var ShowToast = ({ toast }) => {
  let { id, type, title, description } = toast;
  return React38.useEffect(() => {
    setTimeout(() => {
      showToast[type](title, { id, description });
    }, 0);
  }, [description, id, title, type]), null;
};

// app/components/GoogleLoginButton.tsx
import { SocialsProvider as SocialsProvider2 } from "remix-auth-socials";
import { Form as Form7, useSearchParams } from "@remix-run/react";
import { jsxDEV as jsxDEV23 } from "react/jsx-dev-runtime";
var GOGLE_ACTION_STRING = `/api/auth/${SocialsProvider2.GOOGLE}`, GoogleLoginButton = () => {
  let [searchParams] = useSearchParams(), redirectTo = searchParams.get("redirectTo") || "";
  return /* @__PURE__ */ jsxDEV23("div", { className: "px-6 sm:px-0 max-w-sm", children: /* @__PURE__ */ jsxDEV23(Form7, { method: "POST", action: GOGLE_ACTION_STRING, children: [
    /* @__PURE__ */ jsxDEV23("input", { type: "hidden", name: "intent", value: "user-log-in" }, void 0, !1, {
      fileName: "app/components/GoogleLoginButton.tsx",
      lineNumber: 14,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV23("input", { type: "hidden", name: "redirectTo", value: redirectTo }, void 0, !1, {
      fileName: "app/components/GoogleLoginButton.tsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV23(
      "button",
      {
        type: "submit",
        className: "border-solid border-gray-600 flex w-full items-center justify-center gap-3 rounded-md bg-[#24292F] px-3 py-1.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#24292F]",
        children: [
          /* @__PURE__ */ jsxDEV23(
            "svg",
            {
              className: "mr-2 -ml-1 w-4 h-4",
              "aria-hidden": "true",
              focusable: "false",
              "data-prefix": "fab",
              "data-icon": "google",
              role: "img",
              xmlns: "http://www.w3.org/2000/svg",
              viewBox: "0 0 488 512",
              children: /* @__PURE__ */ jsxDEV23(
                "path",
                {
                  fill: "currentColor",
                  d: "M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
                },
                void 0,
                !1,
                {
                  fileName: "app/components/GoogleLoginButton.tsx",
                  lineNumber: 30,
                  columnNumber: 13
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/components/GoogleLoginButton.tsx",
              lineNumber: 20,
              columnNumber: 11
            },
            this
          ),
          "Google"
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/components/GoogleLoginButton.tsx",
        lineNumber: 16,
        columnNumber: 9
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/components/GoogleLoginButton.tsx",
    lineNumber: 13,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/components/GoogleLoginButton.tsx",
    lineNumber: 12,
    columnNumber: 5
  }, this);
}, GoogleLoginButton_default = GoogleLoginButton;

// app/components/FormField.tsx
import React39 from "react";
import { jsxDEV as jsxDEV24 } from "react/jsx-dev-runtime";
function Field({
  labelProps,
  inputProps,
  errors,
  className
}) {
  let fallbackId = React39.useId(), id = inputProps.id ?? fallbackId, errorId = errors?.length ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxDEV24("div", { className, children: [
    /* @__PURE__ */ jsxDEV24(Label, { htmlFor: id, ...labelProps }, void 0, !1, {
      fileName: "app/components/FormField.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24("div", { className: "mt-2", children: /* @__PURE__ */ jsxDEV24(
      Input4,
      {
        id,
        "aria-invalid": errorId ? !0 : void 0,
        "aria-describedby": errorId,
        ...inputProps
      },
      void 0,
      !1,
      {
        fileName: "app/components/FormField.tsx",
        lineNumber: 23,
        columnNumber: 9
      },
      this
    ) }, void 0, !1, {
      fileName: "app/components/FormField.tsx",
      lineNumber: 22,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV24("div", { className: "min-h-[32px] px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsxDEV24(ErrorList, { id: errorId, errors }, void 0, !1, {
      fileName: "app/components/FormField.tsx",
      lineNumber: 31,
      columnNumber: 20
    }, this) : null }, void 0, !1, {
      fileName: "app/components/FormField.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/FormField.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}

// app/components/Checkbox.tsx
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import * as React40 from "react";
import { jsxDEV as jsxDEV25 } from "react/jsx-dev-runtime";
var Checkbox3 = React40.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsxDEV25(
  CheckboxPrimitive.Root,
  {
    ref,
    className: buildClassName(
      "peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground",
      className
    ),
    ...props,
    children: /* @__PURE__ */ jsxDEV25(
      CheckboxPrimitive.Indicator,
      {
        className: buildClassName(
          "flex items-center justify-center text-current"
        ),
        children: /* @__PURE__ */ jsxDEV25("svg", { viewBox: "0 0 8 8", children: /* @__PURE__ */ jsxDEV25(
          "path",
          {
            d: "M1,4 L3,6 L7,2",
            stroke: "currentcolor",
            strokeWidth: "1",
            fill: "none"
          },
          void 0,
          !1,
          {
            fileName: "app/components/Checkbox.tsx",
            lineNumber: 30,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/components/Checkbox.tsx",
          lineNumber: 29,
          columnNumber: 7
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/components/Checkbox.tsx",
        lineNumber: 24,
        columnNumber: 5
      },
      this
    )
  },
  void 0,
  !1,
  {
    fileName: "app/components/Checkbox.tsx",
    lineNumber: 16,
    columnNumber: 3
  },
  this
));
Checkbox3.displayName = CheckboxPrimitive.Root.displayName;

// app/components/CheckboxField.tsx
import React41 from "react";
import { useInputEvent } from "@conform-to/react";
import { jsxDEV as jsxDEV26 } from "react/jsx-dev-runtime";
function CheckboxField({
  labelProps,
  buttonProps,
  errors,
  className
}) {
  let fallbackId = React41.useId(), buttonRef = React41.useRef(null), control = useInputEvent({
    // Retrieve the checkbox element by name instead as Radix does not expose the internal checkbox element
    // See https://github.com/radix-ui/primitives/discussions/874
    ref: () => buttonRef.current?.form?.elements.namedItem(buttonProps.name ?? ""),
    onFocus: () => buttonRef.current?.focus()
  }), id = buttonProps.id ?? buttonProps.name ?? fallbackId, errorId = errors?.length ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxDEV26("div", { className, children: [
    /* @__PURE__ */ jsxDEV26("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxDEV26(
        Checkbox3,
        {
          id,
          ref: buttonRef,
          "aria-invalid": errorId ? !0 : void 0,
          "aria-describedby": errorId,
          ...buttonProps,
          onCheckedChange: (state) => {
            control.change(Boolean(state.valueOf())), buttonProps.onCheckedChange?.(state);
          },
          onFocus: (event) => {
            control.focus(), buttonProps.onFocus?.(event);
          },
          onBlur: (event) => {
            control.blur(), buttonProps.onBlur?.(event);
          },
          type: "button"
        },
        void 0,
        !1,
        {
          fileName: "app/components/CheckboxField.tsx",
          lineNumber: 37,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV26(
        "label",
        {
          htmlFor: id,
          ...labelProps,
          className: "self-center text-body-xs text-muted-foreground"
        },
        void 0,
        !1,
        {
          fileName: "app/components/CheckboxField.tsx",
          lineNumber: 57,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/components/CheckboxField.tsx",
      lineNumber: 36,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV26("div", { className: "px-4 pb-3 pt-1", children: errorId ? /* @__PURE__ */ jsxDEV26(ErrorList, { id: errorId, errors }, void 0, !1, {
      fileName: "app/components/CheckboxField.tsx",
      lineNumber: 64,
      columnNumber: 20
    }, this) : null }, void 0, !1, {
      fileName: "app/components/CheckboxField.tsx",
      lineNumber: 63,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/components/CheckboxField.tsx",
    lineNumber: 35,
    columnNumber: 5
  }, this);
}

// app/root.tsx
import { HoneypotProvider } from "remix-utils/honeypot/react";
import { AuthenticityTokenProvider } from "remix-utils/csrf/react";
import { Toaster } from "sonner";

// node_modules/antd/dist/antd.css
var antd_default = "/build/_assets/antd-QAJF7YD5.css";

// app/styles/antd.dark.css
var antd_dark_default = "/build/_assets/antd.dark-PCCEJKZT.css";

// app/styles/global.css
var global_default = "/build/_assets/global-BNWIB7B2.css";

// app/styles/tailwind.css
var tailwind_default = "/build/_assets/tailwind-BMJPWOZO.css";

// node_modules/@radix-ui/themes/styles.css
var styles_default = "/build/_assets/styles-366GKUEB.css";

// app/root.tsx
import { z as z5 } from "zod";
import { parse as parse4 } from "@conform-to/zod";

// app/hooks/useTheme.ts
import { useFetchers, useLoaderData as useLoaderData2 } from "@remix-run/react";
var useTheme = () => {
  let data = useLoaderData2(), optimisticTheme = useFetchers().find(
    (fetcher) => fetcher.formData?.get("intent") === "update-theme"
  )?.formData?.get("theme");
  return optimisticTheme === "light" || optimisticTheme === "dark" ? optimisticTheme : data.theme;
};

// app/root.tsx
import { jsxDEV as jsxDEV27 } from "react/jsx-dev-runtime";
var links = () => [
  { rel: "stylesheet", href: antd_default },
  { rel: "stylesheet", href: antd_dark_default },
  { rel: "stylesheet", href: global_default },
  { rel: "stylesheet", href: tailwind_default },
  { rel: "stylesheet", href: styles_default },
  void 0 ? { rel: "stylesheet", href: void 0 } : null
].filter(Boolean), loader = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request), honeyProps = honeypot.getInputProps(), [csrfToken, csrfCookieHeader] = await csrf.commitToken(request), { toast, headers: toastHeaders } = await getToast(request), cookieSession = await sessionStorage3.getSession(
    request.headers.get("cookie")
  ), userId = cookieSession.get("userId");
  if (console.log(userId), userId && !user)
    throw redirect4("/", {
      headers: {
        "set-cookie": await sessionStorage3.destroySession(cookieSession)
      }
    });
  let userData = user ? await getLoggedInUserData(user, request) : null;
  return console.log(userData), userData && userData.id && (cookieSession.set("userId", userData.id || ""), await sessionStorage3.commitSession(cookieSession)), json3(
    { userData, honeyProps, csrfToken, theme: getTheme(request), toast },
    {
      headers: combineHeaders(
        csrfCookieHeader ? { "set-cookie": csrfCookieHeader } : null,
        toastHeaders
      )
    }
  );
}, ThemeFormSchema = z5.object({
  theme: z5.enum(["light", "dark"])
});
async function action2({ request }) {
  let formData = await request.formData();
  invariantResponse(
    formData.get("intent") === "update-theme",
    "Invalid intent",
    { status: 400 }
  );
  let submission = parse4(formData, {
    schema: ThemeFormSchema
  });
  if (submission.intent !== "submit")
    return json3({ status: "success", submission });
  if (!submission.value)
    return json3({ status: "error", submission }, { status: 400 });
  let { theme } = submission.value, responseInit = {
    headers: { "set-cookie": setTheme(theme) }
  };
  return json3({ success: !0, submission }, responseInit);
}
function App() {
  let loaderData = useLoaderData3(), userData = loaderData.userData, theme = useTheme();
  return /* @__PURE__ */ jsxDEV27("html", { lang: "en", children: [
    /* @__PURE__ */ jsxDEV27("head", { children: [
      /* @__PURE__ */ jsxDEV27(Meta, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 157,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV27(Links, {}, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 158,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 156,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV27("body", { style: { margin: 0 }, className: "dark h-full", children: [
      /* @__PURE__ */ jsxDEV27(Toaster, { closeButton: !0, position: "top-center", richColors: !0 }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 177,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV27(AuthenticityTokenProvider, { token: loaderData.csrfToken, children: /* @__PURE__ */ jsxDEV27(HoneypotProvider, { ...loaderData.honeyProps, children: [
        /* @__PURE__ */ jsxDEV27(UserContext.Provider, { value: userData, children: /* @__PURE__ */ jsxDEV27(Layout2, { children: [
          /* @__PURE__ */ jsxDEV27(NavigationSidebar_default, {}, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 183,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV27(Layout2, { style: { marginLeft: 200 }, children: /* @__PURE__ */ jsxDEV27(
            Layout2,
            {
              style: {
                minHeight: "100vh",
                width: "95%",
                margin: "0 auto"
              },
              children: /* @__PURE__ */ jsxDEV27(Layout2, { children: /* @__PURE__ */ jsxDEV27(
                Layout2.Content,
                {
                  style: {
                    padding: 24,
                    margin: 0,
                    minHeight: 280
                  },
                  children: /* @__PURE__ */ jsxDEV27(Outlet, {}, void 0, !1, {
                    fileName: "app/root.tsx",
                    lineNumber: 200,
                    columnNumber: 25
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "app/root.tsx",
                  lineNumber: 193,
                  columnNumber: 23
                },
                this
              ) }, void 0, !1, {
                fileName: "app/root.tsx",
                lineNumber: 192,
                columnNumber: 21
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/root.tsx",
              lineNumber: 185,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/root.tsx",
            lineNumber: 184,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/root.tsx",
          lineNumber: 182,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 181,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV27(ScrollRestoration, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 207,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV27(Scripts, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 208,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV27(LiveReload, {}, void 0, !1, {
          fileName: "app/root.tsx",
          lineNumber: 209,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "app/root.tsx",
        lineNumber: 179,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 178,
        columnNumber: 9
      }, this),
      loaderData.toast ? /* @__PURE__ */ jsxDEV27(ShowToast, { toast: loaderData.toast }, void 0, !1, {
        fileName: "app/root.tsx",
        lineNumber: 212,
        columnNumber: 29
      }, this) : null
    ] }, void 0, !0, {
      fileName: "app/root.tsx",
      lineNumber: 173,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/root.tsx",
    lineNumber: 155,
    columnNumber: 5
  }, this);
}

// app/routes/api.image.$imageId.comment.$commentId.like._index.ts
var api_image_imageId_comment_commentId_like_index_exports = {};
__export(api_image_imageId_comment_commentId_like_index_exports, {
  action: () => action3
});
async function action3({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, commentId = params?.commentId || "";
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Like a Comment"
  ), request.method.toUpperCase()) {
    case "POST":
      return await toggleCommentLikes({ commentId, userId });
    default:
      return {};
  }
}

// app/routes/api.collections.$collectionId.images.$imageId.ts
var api_collections_collectionId_images_imageId_exports = {};
__export(api_collections_collectionId_images_imageId_exports, {
  action: () => action4
});
async function action4({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, collectionId = params.collectionId || "", imageId = params.imageId || "";
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to add/remove Image from Collection"
  ), request.method.toUpperCase()) {
    case "POST":
      return (await prisma.collectionHasImage.findMany({
        where: {
          collectionId,
          imageId
        }
      })).length > 0 ? await removeImageFromCollection({ collectionId, imageId }) : await addImageToCollection({ collectionId, imageId });
    default:
      return {};
  }
}

// app/routes/api.image.$imageId.comment.$commentId._index.ts
var api_image_imageId_comment_commentId_index_exports = {};
__export(api_image_imageId_comment_commentId_index_exports, {
  action: () => action5
});
async function action5({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, commentId = params?.commentId || "";
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Edit a Comment"
  ), request.method.toUpperCase()) {
    case "DELETE":
      return await deleteComment(commentId);
    case "PATCH":
      return {};
    default:
      return {};
  }
}

// app/routes/api.collections.$collectionId.images._index.ts
var api_collections_collectionId_images_index_exports = {};
__export(api_collections_collectionId_images_index_exports, {
  action: () => action6,
  loader: () => loader2
});
import {
  json as json4,
  redirect as redirect5
} from "@remix-run/node";
var loader2 = async ({ request, params }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/"
  });
  let collectionId = params?.collectionId || "", collectionData = await getCollectionData(collectionId);
  if (!collectionData.collection)
    throw redirect5("/collections");
  return json4({ data: collectionData });
};
async function action6({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, collectionId = params.collectionId || "";
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to View Collection"
  ), request.method.toUpperCase()) {
    case "POST": {
      let payload = (await request.formData()).get("body"), images = (await JSON.parse(payload)).images, dataResponse = [];
      return await Promise.all(
        images.map(async (imageId) => {
          let data;
          (await prisma.collectionHasImage.findMany({
            where: {
              collectionId,
              imageId
            }
          })).length > 0 ? data = await removeImageFromCollection({
            collectionId,
            imageId
          }) : data = await addImageToCollection({
            collectionId,
            imageId
          }), dataResponse.push(data);
        })
      ).catch((error) => {
        console.error(error);
      }), dataResponse;
    }
    default:
      return {};
  }
}

// app/routes/api.collections.$collectionId._index.ts
var api_collections_collectionId_index_exports = {};
__export(api_collections_collectionId_index_exports, {
  action: () => action7
});
import { redirect as redirect6 } from "@remix-run/node";
async function action7({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, collectionId = params.collectionId || "";
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Delete Collection"
  ), request.method.toUpperCase()) {
    case "DELETE": {
      let response = await deleteCollection(collectionId);
      return console.log(response), redirect6("/collections");
    }
    case "PATCH": {
      let formData = await request.formData(), payload = JSON.parse(formData.get("body"));
      return await updateCollection(collectionId, payload);
    }
    default:
      return {};
  }
}

// app/routes/api.image.$imageId.comment._index.ts
var api_image_imageId_comment_index_exports = {};
__export(api_image_imageId_comment_index_exports, {
  action: () => action8
});
async function action8({ request, params }) {
  let googleSessionData = await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0, imageId = params?.imageId || "", userId = googleSessionData.id;
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Create a Comment"
  ), request.method.toUpperCase()) {
    case "POST": {
      let formData = await request.formData(), payload = JSON.parse(formData.get("body")), { comment } = payload;
      return await createComment({ imageId, userId, comment });
    }
    default:
      return {};
  }
}

// app/routes/api.image.$imageId.like._index.ts
var api_image_imageId_like_index_exports = {};
__export(api_image_imageId_like_index_exports, {
  action: () => action9
});
async function action9({ request, params }) {
  let googleSessionData = await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0, imageId = params?.imageId || "", userId = googleSessionData.id;
  switch (invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Like an Image"
  ), request.method.toUpperCase()) {
    case "POST":
      return await toggleImageLikes({ imageId, userId });
    default:
      return {};
  }
}

// app/routes/api.image.$imageId._index.ts
var api_image_imageId_index_exports = {};
__export(api_image_imageId_index_exports, {
  action: () => action10,
  loader: () => loader3
});
import {
  json as json5,
  redirect as redirect7
} from "@remix-run/node";
var loader3 = async ({ request, params }) => {
  let imageId = params?.imageId || "", data = await getImageBase64(imageId);
  return json5({ data });
};
async function action10({ request, params }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, imageId = params.imageId;
  invariantResponse(imageId, "Invalid Image ID"), invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Edit an Image"
  );
  let image = await prisma.image.findFirst({
    select: { id: !0, userId: !0, user: { select: { username: !0 } } },
    where: { id: imageId }
  });
  invariantResponse(image, "Image does not exist");
  let isOwner = userId === image.userId;
  switch (request.method.toUpperCase()) {
    case "PATCH": {
      await requireUserWithPermission(
        request,
        isOwner ? "update:image:own" : "update:image:any"
      ), console.log("Updating Image ID: ", imageId);
      let formData = await request.formData(), payload = JSON.parse(formData.get("body")), response = await updateImageData(imageId, payload);
      console.log("Response", response);
      let toastCookieSession = await toastSessionStorage.getSession(
        request.headers.get("cookie")
      );
      return toastCookieSession.flash("toast", {
        type: "success",
        title: "Updated image",
        description: "Your image has been successfully updated"
      }), redirect7("/manage", {
        headers: {
          "set-cookie": await toastSessionStorage.commitSession(toastCookieSession)
        }
      });
    }
    case "DELETE": {
      await requireUserWithPermission(
        request,
        isOwner ? "delete:image:own" : "delete:image:any"
      ), console.log("Deleting Image ID: ", imageId);
      let response = await deleteUserImage(imageId);
      console.log("Response", response);
      let toastCookieSession = await toastSessionStorage.getSession(
        request.headers.get("cookie")
      );
      return toastCookieSession.flash("toast", {
        type: "success",
        title: "Deleted image",
        description: "Your image has been successfully deleted"
      }), redirect7("/manage", {
        headers: {
          "set-cookie": await toastSessionStorage.commitSession(toastCookieSession)
        }
      });
    }
    default:
      return {};
  }
}

// app/routes/collections.$collectionId.tsx
var collections_collectionId_exports = {};
__export(collections_collectionId_exports, {
  default: () => Index,
  loader: () => loader4,
  meta: () => meta
});
import {
  json as json6,
  redirect as redirect8
} from "@remix-run/node";

// app/pages/CreateImagePage/CreateImagePage.tsx
import { Typography as Typography10, Image as Image3, Card as Card2, Row as Row2, Col as Col2, Space as Space10 } from "antd";

// app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx
import { useNavigation as useNavigation4, useSubmit } from "@remix-run/react";
import {
  Button as Button14,
  Form as Form8,
  Input as Input6,
  Row,
  InputNumber,
  Select
} from "antd";
import { jsxDEV as jsxDEV28 } from "react/jsx-dev-runtime";
var DEFAULT_FORM_VALUES = {
  prompt: void 0,
  color: void 0,
  shape: void 0,
  numberOfImages: 1,
  model: void 0
}, CreateImageForm = () => {
  let [formInstance] = Form8.useForm(), submit = useSubmit(), isLoadingData = useNavigation4().state !== "idle";
  return /* @__PURE__ */ jsxDEV28(
    Form8,
    {
      form: formInstance,
      onFinish: (formValues) => {
        console.log("Form Values --------------"), console.log(formValues), console.log("Form Values --------------"), submit(
          {
            intent: "_generate_image",
            body: JSON.stringify(formValues)
          },
          { method: "POST" }
        );
      },
      colon: !1,
      layout: "vertical",
      disabled: isLoadingData,
      initialValues: DEFAULT_FORM_VALUES,
      children: [
        /* @__PURE__ */ jsxDEV28(Form8.Item, { name: "prompt", label: "Describe your image", required: !0, children: /* @__PURE__ */ jsxDEV28(
          Input6.TextArea,
          {
            placeholder: 'Ex: "A happy panda"',
            style: { height: 120 },
            minLength: 1,
            showCount: !0
          },
          void 0,
          !1,
          {
            fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
            lineNumber: 58,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
          lineNumber: 57,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV28(
          Form8.Item,
          {
            name: "model",
            label: "Select which language model to use",
            required: !0,
            children: /* @__PURE__ */ jsxDEV28(
              Select,
              {
                placeholder: "Ex: Stable Diffusion XL",
                options: LANGUAGE_MODEL_OPTIONS
              },
              void 0,
              !1,
              {
                fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
                lineNumber: 70,
                columnNumber: 9
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
            lineNumber: 65,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV28(Form8.Item, { label: "Select a style for your Image", name: "style", children: /* @__PURE__ */ jsxDEV28(
          Select,
          {
            options: STABLE_DIFFUSION_IMAGE_PRESETS,
            placeholder: "Ex: anime",
            allowClear: !0,
            showSearch: !0
          },
          void 0,
          !1,
          {
            fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
            lineNumber: 91,
            columnNumber: 9
          },
          this
        ) }, void 0, !1, {
          fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
          lineNumber: 90,
          columnNumber: 7
        }, this),
        /* @__PURE__ */ jsxDEV28(
          Form8.Item,
          {
            label: "How many images do you want to generate?",
            name: "numberOfImages",
            tooltip: "Enter a number 1-10",
            required: !0,
            children: /* @__PURE__ */ jsxDEV28(
              InputNumber,
              {
                style: { width: "100%" },
                type: "number",
                placeholder: "Enter a number 1-10",
                min: 1,
                max: 10
              },
              void 0,
              !1,
              {
                fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
                lineNumber: 110,
                columnNumber: 9
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
            lineNumber: 104,
            columnNumber: 7
          },
          this
        ),
        /* @__PURE__ */ jsxDEV28(
          Row,
          {
            style: {
              justifyContent: "flex-end",
              marginTop: 40
            },
            children: [
              /* @__PURE__ */ jsxDEV28(Form8.Item, { children: /* @__PURE__ */ jsxDEV28(
                Button14,
                {
                  "aria-label": "reset",
                  style: { marginRight: "1rem", width: 160 },
                  disabled: isLoadingData,
                  onClick: () => formInstance.resetFields(),
                  children: "Reset"
                },
                void 0,
                !1,
                {
                  fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
                  lineNumber: 125,
                  columnNumber: 11
                },
                this
              ) }, void 0, !1, {
                fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
                lineNumber: 124,
                columnNumber: 9
              }, this),
              /* @__PURE__ */ jsxDEV28(Form8.Item, { children: /* @__PURE__ */ jsxDEV28(
                Button14,
                {
                  "aria-label": "submit",
                  style: { width: 160 },
                  type: "primary",
                  ghost: !0,
                  onClick: () => formInstance.submit(),
                  loading: isLoadingData,
                  children: "Generate"
                },
                void 0,
                !1,
                {
                  fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
                  lineNumber: 135,
                  columnNumber: 11
                },
                this
              ) }, void 0, !1, {
                fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
                lineNumber: 134,
                columnNumber: 9
              }, this)
            ]
          },
          void 0,
          !0,
          {
            fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
            lineNumber: 118,
            columnNumber: 7
          },
          this
        )
      ]
    },
    void 0,
    !0,
    {
      fileName: "app/pages/CreateImagePage/components/CreateImageForm/CreateImageForm.tsx",
      lineNumber: 49,
      columnNumber: 5
    },
    this
  );
}, CreateImageForm_default = CreateImageForm;

// app/pages/CreateImagePage/CreateImagePage.tsx
import { useActionData as useActionData2, useNavigation as useNavigation5 } from "@remix-run/react";
import { jsxDEV as jsxDEV29 } from "react/jsx-dev-runtime";
var CreateImagePage = () => {
  let actionData = useActionData2(), isLoadingData = useNavigation5().state !== "idle";
  console.log(actionData);
  let imagesGenerated = Boolean(actionData && actionData.images);
  return /* @__PURE__ */ jsxDEV29(Row2, { gutter: [16, 16], children: [
    /* @__PURE__ */ jsxDEV29(Col2, { span: 12, children: [
      /* @__PURE__ */ jsxDEV29(Typography10.Title, { level: 3, children: "Create Images" }, void 0, !1, {
        fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
        lineNumber: 21,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV29(CreateImageForm_default, {}, void 0, !1, {
        fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV29(Col2, { span: 12, children: [
      /* @__PURE__ */ jsxDEV29(Space10, { style: { display: "flex", justifyContent: "space-between" }, children: [
        /* @__PURE__ */ jsxDEV29(Typography10.Title, { level: 3, children: "Images Generated" }, void 0, !1, {
          fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
          lineNumber: 26,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV29(AddImagesToCollectionButton_default, { images: actionData?.images || [] }, void 0, !1, {
          fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
          lineNumber: 27,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
        lineNumber: 25,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV29(
        Card2,
        {
          loading: isLoadingData,
          style: { minHeight: 400 },
          bodyStyle: { textAlign: imagesGenerated ? "initial" : "center" },
          children: imagesGenerated ? (
            // <Image.PreviewGroup
            //   preview={{
            //     onChange: (current, prev) =>
            //       console.log(`current index: ${current}, prev index: ${prev}`),
            //   }}
            // >
            /* @__PURE__ */ jsxDEV29(Row2, { gutter: 16, children: actionData.images.map((image) => /* @__PURE__ */ jsxDEV29(Col2, { children: /* @__PURE__ */ jsxDEV29("div", { style: { marginBottom: 10 }, children: /* @__PURE__ */ jsxDEV29(
              Image3,
              {
                width: 200,
                src: image.url,
                alt: image.prompt,
                fallback: fallbackImageSource,
                style: { borderRadius: 12 },
                preview: !0
              },
              void 0,
              !1,
              {
                fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
                lineNumber: 47,
                columnNumber: 23
              },
              this
            ) }, void 0, !1, {
              fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
              lineNumber: 46,
              columnNumber: 21
            }, this) }, image.id, !1, {
              fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
              lineNumber: 45,
              columnNumber: 19
            }, this)) }, void 0, !1, {
              fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
              lineNumber: 42,
              columnNumber: 13
            }, this)
          ) : (
            // </Image.PreviewGroup>
            /* @__PURE__ */ jsxDEV29(Typography10.Text, { italic: !0, disabled: !0, children: "Images generated will appear here" }, void 0, !1, {
              fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
              lineNumber: 62,
              columnNumber: 13
            }, this)
          )
        },
        void 0,
        !1,
        {
          fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
          lineNumber: 30,
          columnNumber: 9
        },
        this
      )
    ] }, void 0, !0, {
      fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
      lineNumber: 24,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/pages/CreateImagePage/CreateImagePage.tsx",
    lineNumber: 19,
    columnNumber: 5
  }, this);
}, CreateImagePage_default = CreateImagePage;

// app/pages/LandingPage/LandingPage.tsx
import { Fragment as Fragment10, jsxDEV as jsxDEV30 } from "react/jsx-dev-runtime";
var BONSAI_TREE_SRC = "https://ai-icon-generator-resized.s3.us-east-2.amazonaws.com/resized-clov1aotv003pr2ygixlp9pmi", ISO_SPACE_STATION = "https://ai-icon-generator-resized.s3.us-east-2.amazonaws.com/resized-clov0tnth001hr2ygj2wec2wn", PIRATE_SPACE_SHIP = "https://ai-icon-generator-resized.s3.us-east-2.amazonaws.com/resized-clkp3riui0001r2wj7q3t8tav", MAN_STANDING_STARGATE = "https://ai-icon-generator-resized.s3.us-east-2.amazonaws.com/resized-cllfyj6la0001r2otvu0ms49w", BROOKLYN_BRIDGE_FROM_TRAIN = "https://ai-icon-generator-resized.s3.us-east-2.amazonaws.com/resized-clov3hb17001gr2qvnx15mvf7", LandingPage = () => /* @__PURE__ */ jsxDEV30(Fragment10, { children: /* @__PURE__ */ jsxDEV30("div", { className: "bg-white", children: [
  /* @__PURE__ */ jsxDEV30("header", { className: "absolute inset-x-0 top-0 z-50" }, void 0, !1, {
    fileName: "app/pages/LandingPage/LandingPage.tsx",
    lineNumber: 79,
    columnNumber: 9
  }, this),
  /* @__PURE__ */ jsxDEV30("main", { children: /* @__PURE__ */ jsxDEV30("div", { className: "relative isolate overflow-hidden bg-zinc-950", children: [
    /* @__PURE__ */ jsxDEV30(
      "svg",
      {
        className: "absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxDEV30("defs", { children: /* @__PURE__ */ jsxDEV30(
            "pattern",
            {
              id: "983e3e4c-de6d-4c3f-8d64-b9761d1534cc",
              width: 200,
              height: 200,
              x: "50%",
              y: -1,
              patternUnits: "userSpaceOnUse",
              children: /* @__PURE__ */ jsxDEV30("path", { d: "M.5 200V.5H200", fill: "none" }, void 0, !1, {
                fileName: "app/pages/LandingPage/LandingPage.tsx",
                lineNumber: 168,
                columnNumber: 19
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 160,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 159,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV30("svg", { x: "50%", y: -1, className: "overflow-visible fill-gray-800/20", children: /* @__PURE__ */ jsxDEV30(
            "path",
            {
              d: "M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z",
              strokeWidth: 0
            },
            void 0,
            !1,
            {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 172,
              columnNumber: 17
            },
            this
          ) }, void 0, !1, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 171,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ jsxDEV30(
            "rect",
            {
              width: "100%",
              height: "100%",
              strokeWidth: 0,
              fill: "url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
            },
            void 0,
            !1,
            {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 177,
              columnNumber: 15
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/pages/LandingPage/LandingPage.tsx",
        lineNumber: 155,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ jsxDEV30(
      "div",
      {
        className: "absolute left-1/2 right-0 top-0 -z-10 -ml-24 transform-gpu overflow-hidden blur-3xl lg:ml-24 xl:ml-48",
        "aria-hidden": "true",
        children: /* @__PURE__ */ jsxDEV30(
          "div",
          {
            className: "aspect-[801/1036] w-[50.0625rem] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30",
            style: {
              clipPath: "polygon(63.1% 29.5%, 100% 17.1%, 76.6% 3%, 48.4% 0%, 44.6% 4.7%, 54.5% 25.3%, 59.8% 49%, 55.2% 57.8%, 44.4% 57.2%, 27.8% 47.9%, 35.1% 81.5%, 0% 97.7%, 39.2% 100%, 35.2% 81.4%, 97.2% 52.8%, 63.1% 29.5%)"
            }
          },
          void 0,
          !1,
          {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 188,
            columnNumber: 15
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/pages/LandingPage/LandingPage.tsx",
        lineNumber: 184,
        columnNumber: 13
      },
      this
    ),
    /* @__PURE__ */ jsxDEV30("div", { className: "overflow-hidden", children: /* @__PURE__ */ jsxDEV30("div", { className: "mx-auto max-w-7xl px-6 pb-32 pt-36 sm:pt-60 lg:px-8 lg:pt-32", children: /* @__PURE__ */ jsxDEV30("div", { className: "mx-auto max-w-2xl gap-x-14 lg:mx-0 lg:flex lg:max-w-none lg:items-center", children: [
      /* @__PURE__ */ jsxDEV30("div", { className: "w-full max-w-xl lg:shrink-0 xl:max-w-2xl", children: [
        /* @__PURE__ */ jsxDEV30("h1", { className: "text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl", children: "Amplify your creativity effortlessly." }, void 0, !1, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 200,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV30("p", { className: "relative mt-6 text-lg leading-8 text-gray-500 sm:max-w-md lg:max-w-none", children: "Create mesmerizing AI-generated art with in seconds, no design experience needed. Join our community of creative minds and revolutionize the way you bring your ideas to life." }, void 0, !1, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 203,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV30("div", { className: "mt-10 flex items-center gap-x-6", children: /* @__PURE__ */ jsxDEV30(
          "a",
          {
            href: "/create",
            className: "rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            children: "Get started"
          },
          void 0,
          !1,
          {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 210,
            columnNumber: 23
          },
          this
        ) }, void 0, !1, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 209,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/pages/LandingPage/LandingPage.tsx",
        lineNumber: 199,
        columnNumber: 19
      }, this),
      /* @__PURE__ */ jsxDEV30("div", { className: "mt-14 flex justify-end gap-8 sm:-mt-44 sm:justify-start sm:pl-20 lg:mt-0 lg:pl-0", children: [
        /* @__PURE__ */ jsxDEV30("div", { className: "ml-auto w-44 flex-none space-y-8 pt-32 sm:ml-0 sm:pt-80 lg:order-last lg:pt-36 xl:order-none xl:pt-80", children: /* @__PURE__ */ jsxDEV30("div", { className: "relative", children: [
          /* @__PURE__ */ jsxDEV30(
            "img",
            {
              src: BONSAI_TREE_SRC,
              alt: "",
              className: "aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
            },
            void 0,
            !1,
            {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 221,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ jsxDEV30("div", { className: "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" }, void 0, !1, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 226,
            columnNumber: 25
          }, this)
        ] }, void 0, !0, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 220,
          columnNumber: 23
        }, this) }, void 0, !1, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 219,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV30("div", { className: "mr-auto w-44 flex-none space-y-8 sm:mr-0 sm:pt-52 lg:pt-36", children: [
          /* @__PURE__ */ jsxDEV30("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV30(
              "img",
              {
                src: BROOKLYN_BRIDGE_FROM_TRAIN,
                alt: "",
                className: "aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
              },
              void 0,
              !1,
              {
                fileName: "app/pages/LandingPage/LandingPage.tsx",
                lineNumber: 231,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV30("div", { className: "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" }, void 0, !1, {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 236,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 230,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV30("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV30(
              "img",
              {
                src: PIRATE_SPACE_SHIP,
                alt: "",
                className: "aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
              },
              void 0,
              !1,
              {
                fileName: "app/pages/LandingPage/LandingPage.tsx",
                lineNumber: 239,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV30("div", { className: "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" }, void 0, !1, {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 244,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 238,
            columnNumber: 23
          }, this)
        ] }, void 0, !0, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 229,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ jsxDEV30("div", { className: "w-44 flex-none space-y-8 pt-32 sm:pt-0", children: [
          /* @__PURE__ */ jsxDEV30("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV30(
              "img",
              {
                src: MAN_STANDING_STARGATE,
                alt: "",
                className: "aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
              },
              void 0,
              !1,
              {
                fileName: "app/pages/LandingPage/LandingPage.tsx",
                lineNumber: 249,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV30("div", { className: "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" }, void 0, !1, {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 254,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 248,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ jsxDEV30("div", { className: "relative", children: [
            /* @__PURE__ */ jsxDEV30(
              "img",
              {
                src: ISO_SPACE_STATION,
                alt: "",
                className: "aspect-[2/3] w-full rounded-xl bg-gray-900/5 object-cover shadow-lg"
              },
              void 0,
              !1,
              {
                fileName: "app/pages/LandingPage/LandingPage.tsx",
                lineNumber: 257,
                columnNumber: 25
              },
              this
            ),
            /* @__PURE__ */ jsxDEV30("div", { className: "pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-gray-900/10" }, void 0, !1, {
              fileName: "app/pages/LandingPage/LandingPage.tsx",
              lineNumber: 262,
              columnNumber: 25
            }, this)
          ] }, void 0, !0, {
            fileName: "app/pages/LandingPage/LandingPage.tsx",
            lineNumber: 256,
            columnNumber: 23
          }, this)
        ] }, void 0, !0, {
          fileName: "app/pages/LandingPage/LandingPage.tsx",
          lineNumber: 247,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "app/pages/LandingPage/LandingPage.tsx",
        lineNumber: 218,
        columnNumber: 19
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/LandingPage/LandingPage.tsx",
      lineNumber: 198,
      columnNumber: 17
    }, this) }, void 0, !1, {
      fileName: "app/pages/LandingPage/LandingPage.tsx",
      lineNumber: 197,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "app/pages/LandingPage/LandingPage.tsx",
      lineNumber: 196,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "app/pages/LandingPage/LandingPage.tsx",
    lineNumber: 154,
    columnNumber: 11
  }, this) }, void 0, !1, {
    fileName: "app/pages/LandingPage/LandingPage.tsx",
    lineNumber: 153,
    columnNumber: 9
  }, this)
] }, void 0, !0, {
  fileName: "app/pages/LandingPage/LandingPage.tsx",
  lineNumber: 78,
  columnNumber: 7
}, this) }, void 0, !1, {
  fileName: "app/pages/LandingPage/LandingPage.tsx",
  lineNumber: 40,
  columnNumber: 5
}, this), LandingPage_default = LandingPage;

// app/pages/ExplorePage/ExplorePage.tsx
import React42 from "react";
import { Form as Form9, useLoaderData as useLoaderData4, useSearchParams as useSearchParams2 } from "@remix-run/react";
import { Typography as Typography11 } from "antd";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Fragment as Fragment11, jsxDEV as jsxDEV31 } from "react/jsx-dev-runtime";
var ExplorePage = () => {
  let loaderData = useLoaderData4(), images = loaderData.data.images || [], [searchParams] = useSearchParams2(), initialSearchTerm = searchParams.get("q") || "", [searchTerm, setSearchTerm] = React42.useState(initialSearchTerm);
  return loaderData.data.status === "error" && console.error(loaderData.data.error), /* @__PURE__ */ jsxDEV31(Fragment11, { children: [
    /* @__PURE__ */ jsxDEV31("div", { className: "flex flex-col justify-between w-full", children: [
      /* @__PURE__ */ jsxDEV31(Typography11.Title, { level: 3, children: "Explore" }, void 0, !1, {
        fileName: "app/pages/ExplorePage/ExplorePage.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV31("div", { className: "w-full max-w-5xl", children: /* @__PURE__ */ jsxDEV31(Form9, { action: "/explore", method: "GET", children: /* @__PURE__ */ jsxDEV31("div", { className: "mt-2 flex rounded-md shadow-sm", children: [
        /* @__PURE__ */ jsxDEV31("div", { className: "relative flex flex-grow items-stretch focus-within:z-10", children: /* @__PURE__ */ jsxDEV31(
          "input",
          {
            type: "text",
            name: "q",
            id: "q",
            className: "bg-inherit block w-full rounded-l-md border-0 py-1.5 px-2 text-white ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6",
            placeholder: "Search",
            value: searchTerm,
            onChange: (e) => setSearchTerm(e.target.value)
          },
          void 0,
          !1,
          {
            fileName: "app/pages/ExplorePage/ExplorePage.tsx",
            lineNumber: 32,
            columnNumber: 17
          },
          this
        ) }, void 0, !1, {
          fileName: "app/pages/ExplorePage/ExplorePage.tsx",
          lineNumber: 31,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV31(
          "button",
          {
            type: "submit",
            className: "relative -ml-px inline-flex items-center gap-x-1.5 rounded-r-md px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-600",
            children: /* @__PURE__ */ jsxDEV31(
              MagnifyingGlassIcon,
              {
                className: "-ml-0.5 h-5 w-5 text-gray-400",
                "aria-hidden": "true"
              },
              void 0,
              !1,
              {
                fileName: "app/pages/ExplorePage/ExplorePage.tsx",
                lineNumber: 46,
                columnNumber: 17
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/pages/ExplorePage/ExplorePage.tsx",
            lineNumber: 42,
            columnNumber: 15
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "app/pages/ExplorePage/ExplorePage.tsx",
        lineNumber: 30,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "app/pages/ExplorePage/ExplorePage.tsx",
        lineNumber: 29,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/pages/ExplorePage/ExplorePage.tsx",
        lineNumber: 28,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/ExplorePage/ExplorePage.tsx",
      lineNumber: 26,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV31("div", { className: "container pt-8 max-w-5xl", children: [
      images.length > 0 ? /* @__PURE__ */ jsxDEV31("ul", { className: "grid grid-cols-3 gap-1 lg:gap-4", children: images.map(
        (image) => (
          // This removes Typescript error: "image is possibly 'null'."
          image && /* @__PURE__ */ jsxDEV31("li", { className: "hover:!opacity-60", children: /* @__PURE__ */ jsxDEV31(ImageV2_default, { imageData: image }, void 0, !1, {
            fileName: "app/pages/ExplorePage/ExplorePage.tsx",
            lineNumber: 64,
            columnNumber: 21
          }, this) }, image.id, !1, {
            fileName: "app/pages/ExplorePage/ExplorePage.tsx",
            lineNumber: 63,
            columnNumber: 19
          }, this)
        )
      ) }, void 0, !1, {
        fileName: "app/pages/ExplorePage/ExplorePage.tsx",
        lineNumber: 58,
        columnNumber: 11
      }, this) : /* @__PURE__ */ jsxDEV31(
        Typography11.Text,
        {
          type: "secondary",
          italic: !0,
          className: "text-center w-full block",
          children: "No images found"
        },
        void 0,
        !1,
        {
          fileName: "app/pages/ExplorePage/ExplorePage.tsx",
          lineNumber: 70,
          columnNumber: 11
        },
        this
      ),
      loaderData.data.status === "error" && /* @__PURE__ */ jsxDEV31(ErrorList, { errors: ["There was an error parsing the results"] }, void 0, !1, {
        fileName: "app/pages/ExplorePage/ExplorePage.tsx",
        lineNumber: 80,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/ExplorePage/ExplorePage.tsx",
      lineNumber: 55,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/pages/ExplorePage/ExplorePage.tsx",
    lineNumber: 25,
    columnNumber: 5
  }, this);
}, ExplorePage_default = ExplorePage;

// app/pages/CollectionsPage/CollectionsPage.tsx
import {
  Link,
  useLoaderData as useLoaderData5,
  useNavigation as useNavigation6,
  useSearchParams as useSearchParams3
} from "@remix-run/react";
import { Typography as Typography12, Card as Card3, List, Space as Space11, Pagination } from "antd";
import { Fragment as Fragment12, jsxDEV as jsxDEV32 } from "react/jsx-dev-runtime";
var CollectionsPage = () => {
  let loaderData = useLoaderData5(), [searchParams, setSearchParams] = useSearchParams3(), collections = loaderData.data.collections || [], currentPage = Number(searchParams.get("page")) || 1, currentPageSize = Number(searchParams.get("page_size")) || 50, isLoadingData = useNavigation6().state !== "idle", totalCollections = loaderData.data.count, handlePaginationChange = (page, pageSize) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page,
      page_size: pageSize
    }));
  }, paginationRange = getPaginationRange(
    currentPage,
    currentPageSize,
    totalCollections
  );
  return /* @__PURE__ */ jsxDEV32(Fragment12, { children: [
    /* @__PURE__ */ jsxDEV32(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline"
        },
        children: [
          /* @__PURE__ */ jsxDEV32(Typography12.Title, { level: 3, children: "Collections" }, void 0, !1, {
            fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
            lineNumber: 55,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV32(
            "div",
            {
              style: {
                display: "flex",
                justifyContent: "space-between"
              },
              children: /* @__PURE__ */ jsxDEV32(Space11, { style: { marginLeft: "auto" }, children: [
                /* @__PURE__ */ jsxDEV32(Typography12.Text, { children: paginationRange.startRange && paginationRange.endRange && totalCollections ? /* @__PURE__ */ jsxDEV32(Fragment12, { children: [
                  "Showing",
                  " ",
                  convertNumberToLocaleString(paginationRange.startRange),
                  "-",
                  convertNumberToLocaleString(paginationRange.endRange),
                  " of",
                  " ",
                  convertNumberToLocaleString(totalCollections),
                  " collections"
                ] }, void 0, !0, {
                  fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                  lineNumber: 67,
                  columnNumber: 17
                }, this) : /* @__PURE__ */ jsxDEV32(Typography12.Text, { italic: !0, type: "secondary", children: "No collections created yet" }, void 0, !1, {
                  fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                  lineNumber: 74,
                  columnNumber: 17
                }, this) }, void 0, !1, {
                  fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                  lineNumber: 63,
                  columnNumber: 13
                }, this),
                /* @__PURE__ */ jsxDEV32(CreateCollectionButton_default, {}, void 0, !1, {
                  fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                  lineNumber: 79,
                  columnNumber: 13
                }, this)
              ] }, void 0, !0, {
                fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                lineNumber: 62,
                columnNumber: 11
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
              lineNumber: 56,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
        lineNumber: 48,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV32(
      Card3,
      {
        loading: isLoadingData,
        style: {
          height: "calc(100vh - 140px)",
          overflow: "auto"
        },
        children: /* @__PURE__ */ jsxDEV32(
          List,
          {
            itemLayout: "horizontal",
            dataSource: collections,
            renderItem: (collection) => /* @__PURE__ */ jsxDEV32(
              List.Item,
              {
                actions: [
                  /* @__PURE__ */ jsxDEV32(
                    EditCollectionButton_default,
                    {
                      collection
                    },
                    "edit=collection",
                    !1,
                    {
                      fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                      lineNumber: 97,
                      columnNumber: 17
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV32(
                    DeleteCollectionButton_default,
                    {
                      collectionId: collection.id
                    },
                    "delete-collection",
                    !1,
                    {
                      fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                      lineNumber: 101,
                      columnNumber: 17
                    },
                    this
                  )
                ],
                children: [
                  /* @__PURE__ */ jsxDEV32(
                    List.Item.Meta,
                    {
                      title: /* @__PURE__ */ jsxDEV32(Link, { to: `/collections/${collection.id}`, children: collection.title }, void 0, !1, {
                        fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                        lineNumber: 109,
                        columnNumber: 19
                      }, this),
                      description: collection.description
                    },
                    void 0,
                    !1,
                    {
                      fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                      lineNumber: 107,
                      columnNumber: 15
                    },
                    this
                  ),
                  /* @__PURE__ */ jsxDEV32(Typography12.Text, { type: "secondary", children: [
                    convertNumberToLocaleString(collection.images.length),
                    " images"
                  ] }, void 0, !0, {
                    fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                    lineNumber: 115,
                    columnNumber: 15
                  }, this)
                ]
              },
              collection.id,
              !0,
              {
                fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
                lineNumber: 94,
                columnNumber: 13
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
            lineNumber: 90,
            columnNumber: 9
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
        lineNumber: 83,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV32(
      Pagination,
      {
        style: { padding: 16 },
        size: "small",
        showSizeChanger: !0,
        total: totalCollections,
        current: currentPage,
        pageSize: currentPageSize,
        pageSizeOptions: [50, 100, 150, 200],
        onChange: handlePaginationChange
      },
      void 0,
      !1,
      {
        fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
        lineNumber: 122,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/pages/CollectionsPage/CollectionsPage.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}, CollectionsPage_default = CollectionsPage;

// app/pages/UserProfilePage/UserProfilePage.tsx
import { useLoaderData as useLoaderData6 } from "@remix-run/react";
import { Avatar as Avatar5, Space as Space12, Typography as Typography13 } from "antd";
import { Fragment as Fragment13, jsxDEV as jsxDEV33 } from "react/jsx-dev-runtime";
var UserProfilePage = () => {
  let loaderData = useLoaderData6(), images = loaderData.images || [], userData = loaderData.user, totalImages = loaderData.count;
  return /* @__PURE__ */ jsxDEV33(Fragment13, { children: [
    /* @__PURE__ */ jsxDEV33(Space12, { style: { marginBottom: "1rem", alignItems: "inherit" }, children: [
      /* @__PURE__ */ jsxDEV33(
        Avatar5,
        {
          size: { xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 },
          style: { cursor: "pointer" },
          icon: /* @__PURE__ */ jsxDEV33(UserOutlined_default2, {}, void 0, !1, {
            fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
            lineNumber: 25,
            columnNumber: 17
          }, this)
        },
        void 0,
        !1,
        {
          fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
          lineNumber: 22,
          columnNumber: 9
        },
        this
      ),
      /* @__PURE__ */ jsxDEV33("div", { children: [
        /* @__PURE__ */ jsxDEV33(Typography13.Title, { level: 3, style: { marginBottom: 0 }, children: userData?.username || "" }, void 0, !1, {
          fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
          lineNumber: 28,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV33(Typography13.Text, { children: [
          totalImages,
          " images"
        ] }, void 0, !0, {
          fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
          lineNumber: 31,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
        lineNumber: 27,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
      lineNumber: 21,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV33("div", { className: "container pt-8 max-w-5xl", children: /* @__PURE__ */ jsxDEV33("ul", { className: "grid grid-cols-3 gap-1 lg:gap-4 [&:hover>li]:opacity-50", children: images.map((image) => /* @__PURE__ */ jsxDEV33("li", { className: "hover:!opacity-100", children: /* @__PURE__ */ jsxDEV33(ImageModal_default, { imageData: image }, void 0, !1, {
      fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
      lineNumber: 40,
      columnNumber: 17
    }, this) }, image.id, !1, {
      fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
      lineNumber: 39,
      columnNumber: 15
    }, this)) }, void 0, !1, {
      fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
      lineNumber: 36,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
      lineNumber: 34,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/pages/UserProfilePage/UserProfilePage.tsx",
    lineNumber: 20,
    columnNumber: 5
  }, this);
}, UserProfilePage_default = UserProfilePage;

// app/pages/ManageImagesPage/ManageImagesPage.tsx
import {
  useLoaderData as useLoaderData7,
  useNavigation as useNavigation7,
  useSearchParams as useSearchParams4
} from "@remix-run/react";
import { Typography as Typography16, Pagination as Pagination2, Table } from "antd";

// app/pages/ManageImagesPage/TableColumns.tsx
import { Space as Space14 } from "antd";

// app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx
import React43 from "react";
import { Typography as Typography14, Button as Button15, Popconfirm, notification as notification5 } from "antd";
import { Fragment as Fragment14, jsxDEV as jsxDEV34 } from "react/jsx-dev-runtime";
var DeleteImageButton = ({ image }) => {
  let { fetcher, isLoadingFetcher } = useRemixFetcher({
    onSuccess: (response) => {
      notification5.success({ message: response.data.message });
    },
    onError: (error) => {
      console.error(error), notification5.error({ message: error.data.message });
    }
  }), [showPopConfirm, setShowPopConfirm] = React43.useState(!1), togglePopConfirm = () => setShowPopConfirm(!showPopConfirm), isLoadingData = isLoadingFetcher, handleDeleteImage = () => {
    togglePopConfirm(), fetcher.submit(
      { intent: "_delete_image" },
      { method: "DELETE", action: `/api/image/${image.id}?index` }
    );
  };
  return /* @__PURE__ */ jsxDEV34(Fragment14, { children: /* @__PURE__ */ jsxDEV34(
    Popconfirm,
    {
      title: "Delete this image",
      description: /* @__PURE__ */ jsxDEV34(Fragment14, { children: [
        "Are you sure to delete the image:",
        /* @__PURE__ */ jsxDEV34("br", {}, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
          lineNumber: 39,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV34(Typography14.Text, { strong: !0, italic: !0, children: image.prompt }, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
          lineNumber: 40,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV34("br", {}, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
          lineNumber: 43,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ jsxDEV34("br", {}, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
          lineNumber: 44,
          columnNumber: 13
        }, this),
        "This action can not be undone"
      ] }, void 0, !0, {
        fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this),
      popupVisible: showPopConfirm,
      onConfirm: handleDeleteImage,
      onCancel: togglePopConfirm,
      okText: "Yes",
      cancelText: "No",
      children: /* @__PURE__ */ jsxDEV34(
        Button15,
        {
          size: "small",
          icon: /* @__PURE__ */ jsxDEV34(DeleteOutlined_default2, {}, void 0, !1, {
            fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
            lineNumber: 56,
            columnNumber: 17
          }, this),
          danger: !0,
          style: { border: "none", textAlign: "left" },
          loading: isLoadingData,
          children: "Delete"
        },
        void 0,
        !1,
        {
          fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
          lineNumber: 54,
          columnNumber: 9
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
      lineNumber: 33,
      columnNumber: 7
    },
    this
  ) }, void 0, !1, {
    fileName: "app/pages/ManageImagesPage/components/DeleteImageButton/DeleteImageButton.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}, DeleteImageButton_default = DeleteImageButton;

// app/pages/ManageImagesPage/components/DownloadImageButton/DownloadImageButton.tsx
import { Button as Button16, Tooltip as Tooltip3 } from "antd";

// app/client/getImageBlob/getImageBlob.ts
var getImageBlob = async (imageId) => {
  console.log("Get Image Blob Response ----------------------");
  let response = await fetch(`/api/image/${imageId}`);
  return console.log(response), await response.json();
};

// app/pages/ManageImagesPage/components/DownloadImageButton/DownloadImageButton.tsx
import React44 from "react";
import { Fragment as Fragment15, jsxDEV as jsxDEV35 } from "react/jsx-dev-runtime";
var DownloadImageButton = ({ image }) => {
  let [isDownloadingImage, setIsDownloadingImage] = React44.useState(!1);
  return /* @__PURE__ */ jsxDEV35(Fragment15, { children: /* @__PURE__ */ jsxDEV35(Tooltip3, { title: "Download image", children: /* @__PURE__ */ jsxDEV35(
    Button16,
    {
      size: "small",
      icon: /* @__PURE__ */ jsxDEV35(DownloadOutlined_default2, {}, void 0, !1, {
        fileName: "app/pages/ManageImagesPage/components/DownloadImageButton/DownloadImageButton.tsx",
        lineNumber: 51,
        columnNumber: 17
      }, this),
      style: { border: "none", textAlign: "left" },
      onClick: async () => {
        setIsDownloadingImage(!0), console.log("downloading.....");
        let data = await getImageBlob(image.id);
        await downloadBase64Image(data.data, image.id), setIsDownloadingImage(!1);
      },
      loading: isDownloadingImage,
      children: "Download"
    },
    void 0,
    !1,
    {
      fileName: "app/pages/ManageImagesPage/components/DownloadImageButton/DownloadImageButton.tsx",
      lineNumber: 49,
      columnNumber: 9
    },
    this
  ) }, void 0, !1, {
    fileName: "app/pages/ManageImagesPage/components/DownloadImageButton/DownloadImageButton.tsx",
    lineNumber: 48,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/pages/ManageImagesPage/components/DownloadImageButton/DownloadImageButton.tsx",
    lineNumber: 47,
    columnNumber: 5
  }, this);
}, DownloadImageButton_default = DownloadImageButton;

// app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx
import React45 from "react";
import {
  Typography as Typography15,
  Button as Button17,
  Modal as Modal6,
  Form as Form10,
  Input as Input7,
  Image as Image4,
  Space as Space13
} from "antd";
import { Fragment as Fragment16, jsxDEV as jsxDEV36 } from "react/jsx-dev-runtime";
var EditImageButton = ({ image }) => {
  let { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.data.message });
    // },
    // onError: (error) => {
    //   console.error(error);
    //   notification.error({ message: error.data.message });
    // },
  }), [formInstance] = Form10.useForm(), [showEditImageModal, setShowEditImageModal] = React45.useState(!1), toggleEditImageModal = () => setShowEditImageModal(!showEditImageModal), isLoadingData = isLoadingFetcher, handleSubmitEditImageData = () => {
    formInstance.submit();
  }, handleSubmitForm = (formValues) => {
    console.log(formValues), toggleEditImageModal(), fetcher.submit(
      { intent: "image-edit-image-data", body: JSON.stringify(formValues) },
      { method: "PATCH", action: `/api/image/${image.id}?index` }
    );
  };
  return /* @__PURE__ */ jsxDEV36(Fragment16, { children: [
    /* @__PURE__ */ jsxDEV36(
      Button17,
      {
        size: "small",
        icon: /* @__PURE__ */ jsxDEV36(EditOutlined_default2, {}, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        style: { border: "none", textAlign: "left" },
        loading: isLoadingData,
        onClick: toggleEditImageModal,
        children: "Edit"
      },
      void 0,
      !1,
      {
        fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
        lineNumber: 49,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV36(
      Modal6,
      {
        open: showEditImageModal,
        footer: !1,
        onCancel: toggleEditImageModal,
        children: /* @__PURE__ */ jsxDEV36("div", { children: [
          /* @__PURE__ */ jsxDEV36(
            "div",
            {
              style: {
                background: "#000",
                width: "100%",
                textAlign: "center"
              },
              children: /* @__PURE__ */ jsxDEV36(
                Image4,
                {
                  width: 300,
                  src: image.thumbnailURL,
                  alt: image.title,
                  fallback: fallbackImageSource,
                  style: { cursor: "pointer" }
                },
                void 0,
                !1,
                {
                  fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                  lineNumber: 71,
                  columnNumber: 13
                },
                this
              )
            },
            void 0,
            !1,
            {
              fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
              lineNumber: 64,
              columnNumber: 11
            },
            this
          ),
          /* @__PURE__ */ jsxDEV36("div", { style: { padding: 20 }, children: [
            /* @__PURE__ */ jsxDEV36("div", { style: { marginBottom: 12 }, children: /* @__PURE__ */ jsxDEV36(Typography15.Text, { children: "Edit Image" }, void 0, !1, {
              fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
              lineNumber: 81,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
              lineNumber: 80,
              columnNumber: 13
            }, this),
            /* @__PURE__ */ jsxDEV36(
              Form10,
              {
                form: formInstance,
                layout: "vertical",
                colon: !1,
                initialValues: { title: image.title || void 0 },
                onFinish: handleSubmitForm,
                children: [
                  /* @__PURE__ */ jsxDEV36(Form10.Item, { label: "Title", name: "title", children: /* @__PURE__ */ jsxDEV36(Input7, { placeholder: "Enter title of image" }, void 0, !1, {
                    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                    lineNumber: 91,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                    lineNumber: 90,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV36(Form10.Item, { label: "Engine Model", children: /* @__PURE__ */ jsxDEV36(Typography15.Text, { italic: !0, children: image.model }, void 0, !1, {
                    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                    lineNumber: 94,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                    lineNumber: 93,
                    columnNumber: 15
                  }, this),
                  /* @__PURE__ */ jsxDEV36(Form10.Item, { label: "Prompt", children: /* @__PURE__ */ jsxDEV36(Typography15.Text, { italic: !0, children: image.prompt }, void 0, !1, {
                    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                    lineNumber: 97,
                    columnNumber: 17
                  }, this) }, void 0, !1, {
                    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                    lineNumber: 96,
                    columnNumber: 15
                  }, this)
                ]
              },
              void 0,
              !0,
              {
                fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                lineNumber: 83,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV36("footer", { style: { display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ jsxDEV36(Space13, { children: [
              /* @__PURE__ */ jsxDEV36(Button17, { onClick: toggleEditImageModal, children: "Cancel" }, void 0, !1, {
                fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                lineNumber: 102,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV36(Button17, { onClick: handleSubmitEditImageData, type: "primary", children: "OK" }, void 0, !1, {
                fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
                lineNumber: 103,
                columnNumber: 17
              }, this)
            ] }, void 0, !0, {
              fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
              lineNumber: 101,
              columnNumber: 15
            }, this) }, void 0, !1, {
              fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
              lineNumber: 100,
              columnNumber: 13
            }, this)
          ] }, void 0, !0, {
            fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
            lineNumber: 79,
            columnNumber: 11
          }, this)
        ] }, void 0, !0, {
          fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
          lineNumber: 63,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
        lineNumber: 58,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/pages/ManageImagesPage/components/EditImageButton/EditImageButton.tsx",
    lineNumber: 48,
    columnNumber: 5
  }, this);
}, EditImageButton_default = EditImageButton;

// app/pages/ManageImagesPage/components/ToggleIsImagePrivateButton/ToggleIsImagePrivateButton.tsx
import { Form as Form11, Switch } from "antd";
import { jsxDEV as jsxDEV37 } from "react/jsx-dev-runtime";
var ToggleIsImagePrivateButton = ({ image }) => {
  let { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.data.message });
    // },
    // onError: (error) => {
    //   console.error(error);
    //   notification.error({ message: error.data.message });
    // },
  }), [formInstance] = Form11.useForm(), isLoadingData = isLoadingFetcher, handleSubmitEditImageData = () => {
    formInstance.submit();
  }, handleSubmitForm = (formValues) => {
    fetcher.submit(
      { intent: "image-edit-image-privacy", body: JSON.stringify(formValues) },
      { method: "PATCH", action: `/api/image/${image.id}?index` }
    );
  };
  return /* @__PURE__ */ jsxDEV37(
    Form11,
    {
      form: formInstance,
      colon: !1,
      initialValues: {
        private: image.private
      },
      onFinish: handleSubmitForm,
      disabled: isLoadingData,
      children: /* @__PURE__ */ jsxDEV37(
        Form11.Item,
        {
          label: "Private",
          name: "private",
          valuePropName: "checked",
          style: { margin: 0 },
          children: /* @__PURE__ */ jsxDEV37(
            Switch,
            {
              size: "small",
              loading: isLoadingData,
              onClick: handleSubmitEditImageData
            },
            void 0,
            !1,
            {
              fileName: "app/pages/ManageImagesPage/components/ToggleIsImagePrivateButton/ToggleIsImagePrivateButton.tsx",
              lineNumber: 47,
              columnNumber: 9
            },
            this
          )
        },
        void 0,
        !1,
        {
          fileName: "app/pages/ManageImagesPage/components/ToggleIsImagePrivateButton/ToggleIsImagePrivateButton.tsx",
          lineNumber: 41,
          columnNumber: 7
        },
        this
      )
    },
    void 0,
    !1,
    {
      fileName: "app/pages/ManageImagesPage/components/ToggleIsImagePrivateButton/ToggleIsImagePrivateButton.tsx",
      lineNumber: 32,
      columnNumber: 5
    },
    this
  );
}, ToggleIsImagePrivateButton_default = ToggleIsImagePrivateButton;

// app/pages/ManageImagesPage/TableColumns.tsx
import { jsxDEV as jsxDEV38 } from "react/jsx-dev-runtime";
var TABLE_COLUMNS = [
  {
    title: "Image",
    dataIndex: "title",
    render: (_, record) => /* @__PURE__ */ jsxDEV38("div", { className: "flex items-center", children: [
      /* @__PURE__ */ jsxDEV38("div", { className: "h-24 w-24 flex-shrink-0", children: /* @__PURE__ */ jsxDEV38(ImageModal_default, { imageData: record }, void 0, !1, {
        fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
        lineNumber: 20,
        columnNumber: 11
      }, this) }, void 0, !1, {
        fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
        lineNumber: 18,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV38("div", { className: "ml-4", children: [
        /* @__PURE__ */ jsxDEV38("div", { className: "font-medium ", children: record.title || "Untitled" }, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
          lineNumber: 23,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV38("div", { className: "mt-1 text-gray-500", children: [
          record.prompt,
          " ",
          /* @__PURE__ */ jsxDEV38(CopyToClipboardButton_default, { stringToCopy: record.prompt }, void 0, !1, {
            fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
            lineNumber: 26,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
          lineNumber: 24,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
        lineNumber: 22,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
      lineNumber: 17,
      columnNumber: 7
    }, this)
  },
  {
    title: "Private",
    dataIndex: "private",
    render: (_, record) => /* @__PURE__ */ jsxDEV38(ToggleIsImagePrivateButton_default, { image: record }, void 0, !1, {
      fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
      lineNumber: 35,
      columnNumber: 28
    }, this)
  },
  {
    title: "Created",
    dataIndex: "createdAt"
  },
  {
    title: "Actions",
    dataIndex: "actions",
    render: (_, record) => /* @__PURE__ */ jsxDEV38(Space14, { children: [
      /* @__PURE__ */ jsxDEV38(EditImageButton_default, { image: record }, void 0, !1, {
        fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV38(DownloadImageButton_default, { image: record }, void 0, !1, {
        fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV38(DeleteImageButton_default, { image: record }, void 0, !1, {
        fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
        lineNumber: 49,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/pages/ManageImagesPage/TableColumns.tsx",
      lineNumber: 46,
      columnNumber: 9
    }, this)
  }
];

// app/pages/ManageImagesPage/ManageImagesPage.tsx
import { Fragment as Fragment17, jsxDEV as jsxDEV39 } from "react/jsx-dev-runtime";
var ManageImagesPage = () => {
  let data = useLoaderData7(), [searchParams, setSearchParams] = useSearchParams4(), currentPage = Number(searchParams.get("page")) || 1, currentPageSize = Number(searchParams.get("page_size")) || 50, isLoadingData = useNavigation7().state !== "idle", images = data.images || [], totalImages = data.count, handlePaginationChange = (page, pageSize) => {
    setSearchParams((prevParams) => ({
      ...prevParams,
      page,
      page_size: pageSize
    }));
  };
  return /* @__PURE__ */ jsxDEV39(Fragment17, { children: [
    /* @__PURE__ */ jsxDEV39(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline"
        },
        children: /* @__PURE__ */ jsxDEV39(Typography16.Title, { level: 3, children: "Manage AI Generated Images" }, void 0, !1, {
          fileName: "app/pages/ManageImagesPage/ManageImagesPage.tsx",
          lineNumber: 40,
          columnNumber: 9
        }, this)
      },
      void 0,
      !1,
      {
        fileName: "app/pages/ManageImagesPage/ManageImagesPage.tsx",
        lineNumber: 33,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV39(
      Table,
      {
        rowKey: "id",
        columns: TABLE_COLUMNS,
        dataSource: images,
        bordered: !0,
        scroll: { y: "calc(100vh - 210px)" },
        pagination: !1,
        loading: isLoadingData
      },
      void 0,
      !1,
      {
        fileName: "app/pages/ManageImagesPage/ManageImagesPage.tsx",
        lineNumber: 45,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV39(
      Pagination2,
      {
        style: { padding: 16 },
        size: "small",
        showSizeChanger: !0,
        total: totalImages,
        current: currentPage,
        pageSize: currentPageSize,
        showTotal: (total, range) => `Showing ${range[0]}-${range[1]} of ${total} images`,
        pageSizeOptions: [50, 100, 150, 200],
        onChange: handlePaginationChange
      },
      void 0,
      !1,
      {
        fileName: "app/pages/ManageImagesPage/ManageImagesPage.tsx",
        lineNumber: 54,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/pages/ManageImagesPage/ManageImagesPage.tsx",
    lineNumber: 32,
    columnNumber: 5
  }, this);
}, ManageImagesPage_default = ManageImagesPage;

// app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx
import React46 from "react";
import {
  useLoaderData as useLoaderData8,
  useNavigation as useNavigation8
} from "@remix-run/react";
import {
  Typography as Typography17,
  Space as Space15,
  Empty
} from "antd";
import { Fragment as Fragment18, jsxDEV as jsxDEV40 } from "react/jsx-dev-runtime";
var DEFAULT_COLLECTION_DATA = {
  id: "",
  title: "",
  description: "",
  user: { id: "", username: "" },
  createdAt: "",
  updatedAt: "",
  images: []
}, CollectionDetailsPage = () => {
  let collectionData = useLoaderData8().data.collection || DEFAULT_COLLECTION_DATA, images = collectionData.images || [], totalImages = images.length || 0, userData = React46.useContext(UserContext), isLoadingData = useNavigation8().state !== "idle", isCurrentUsersCollection = collectionData.user.id === userData.id;
  return /* @__PURE__ */ jsxDEV40(Fragment18, { children: [
    /* @__PURE__ */ jsxDEV40(
      "div",
      {
        style: {
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          marginBottom: "1rem"
        },
        children: [
          /* @__PURE__ */ jsxDEV40(Space15, { direction: "vertical", size: "small", children: [
            /* @__PURE__ */ jsxDEV40(Typography17.Title, { level: 3, children: collectionData.title }, void 0, !1, {
              fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
              lineNumber: 94,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV40(Typography17.Text, { children: collectionData.description }, void 0, !1, {
              fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
              lineNumber: 95,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV40(Space15, { children: [
              /* @__PURE__ */ jsxDEV40(Typography17.Text, { italic: !0, children: "Created by" }, void 0, !1, {
                fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
                lineNumber: 97,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV40(
                Typography17.Link,
                {
                  italic: !0,
                  href: `/profile/${collectionData.user.username}`,
                  children: collectionData.user.username
                },
                void 0,
                !1,
                {
                  fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
                  lineNumber: 98,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV40(Typography17.Text, { italic: !0, type: "secondary", children: [
                totalImages,
                " total images"
              ] }, void 0, !0, {
                fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
                lineNumber: 104,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
              lineNumber: 96,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
            lineNumber: 93,
            columnNumber: 9
          }, this),
          isCurrentUsersCollection && /* @__PURE__ */ jsxDEV40(Space15, { style: { marginLeft: "auto" }, children: [
            /* @__PURE__ */ jsxDEV40(
              EditCollectionButton_default,
              {
                collection: collectionData
              },
              "edit-collection",
              !1,
              {
                fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
                lineNumber: 112,
                columnNumber: 13
              },
              this
            ),
            /* @__PURE__ */ jsxDEV40(
              DeleteCollectionButton_default,
              {
                collectionId: collectionData.id
              },
              "delete-collection",
              !1,
              {
                fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
                lineNumber: 117,
                columnNumber: 13
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
            lineNumber: 111,
            columnNumber: 11
          }, this)
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
        lineNumber: 85,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV40("div", { className: "container pt-8 max-w-5xl", children: images.length > 0 ? (
      // {/* highlight on hover reference: https://www.hyperui.dev/blog/highlight-hover-effect-with-tailwindcss */}
      /* @__PURE__ */ jsxDEV40("ul", { className: "grid grid-cols-3 gap-1 lg:gap-4 [&:hover>li]:opacity-50", children: images.map((image) => /* @__PURE__ */ jsxDEV40("li", { className: "hover:!opacity-100", children: /* @__PURE__ */ jsxDEV40(ImageModal_default, { imageData: image }, void 0, !1, {
        fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
        lineNumber: 131,
        columnNumber: 19
      }, this) }, image.id, !1, {
        fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
        lineNumber: 130,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
        lineNumber: 127,
        columnNumber: 11
      }, this)
    ) : /* @__PURE__ */ jsxDEV40(Empty, { image: Empty.PRESENTED_IMAGE_SIMPLE }, void 0, !1, {
      fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
      lineNumber: 137,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
      lineNumber: 124,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/pages/CollectionDetailsPage/CollectionDetailsPage.tsx",
    lineNumber: 84,
    columnNumber: 5
  }, this);
}, CollectionDetailsPage_default = CollectionDetailsPage;

// app/pages/SettingsPage/SettingsPage.tsx
import { Typography as Typography18 } from "antd";
import { Fragment as Fragment19, jsxDEV as jsxDEV41 } from "react/jsx-dev-runtime";
var SettingsPage = () => /* @__PURE__ */ jsxDEV41(Fragment19, { children: [
  /* @__PURE__ */ jsxDEV41(
    "div",
    {
      style: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "baseline"
      },
      children: /* @__PURE__ */ jsxDEV41(Typography18.Title, { level: 3, children: "Settings" }, void 0, !1, {
        fileName: "app/pages/SettingsPage/SettingsPage.tsx",
        lineNumber: 15,
        columnNumber: 9
      }, this)
    },
    void 0,
    !1,
    {
      fileName: "app/pages/SettingsPage/SettingsPage.tsx",
      lineNumber: 8,
      columnNumber: 7
    },
    this
  ),
  /* @__PURE__ */ jsxDEV41("div", { className: "container pt-8 max-w-5xl", children: /* @__PURE__ */ jsxDEV41(EditUserForm_default, {}, void 0, !1, {
    fileName: "app/pages/SettingsPage/SettingsPage.tsx",
    lineNumber: 18,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "app/pages/SettingsPage/SettingsPage.tsx",
    lineNumber: 17,
    columnNumber: 7
  }, this)
] }, void 0, !0, {
  fileName: "app/pages/SettingsPage/SettingsPage.tsx",
  lineNumber: 7,
  columnNumber: 5
}, this), SettingsPage_default = SettingsPage;

// app/routes/collections.$collectionId.tsx
import { jsxDEV as jsxDEV42 } from "react/jsx-dev-runtime";
var meta = ({ data }) => [{ title: `Collections | ${data?.data.collection?.title}` }], loader4 = async ({ request, params }) => {
  await authenticator.isAuthenticated(request, {
    failureRedirect: "/"
  });
  let collectionId = params?.collectionId || "", collectionData = await getCollectionData(collectionId), collectionImages = collectionData.collection?.images.map((imageData) => ({
    ...imageData.image,
    url: getS3BucketURL(imageData?.image?.id || ""),
    thumbnailURL: getS3BucketThumbnailURL(imageData?.image?.id || "")
  })) || [], formattedCollectionData = { ...collectionData };
  return formattedCollectionData.collection.images = collectionImages, collectionData.collection ? json6({ data: formattedCollectionData }) : redirect8("/collections");
};
function Index() {
  return /* @__PURE__ */ jsxDEV42(CollectionDetailsPage_default, {}, void 0, !1, {
    fileName: "app/routes/collections.$collectionId.tsx",
    lineNumber: 48,
    columnNumber: 10
  }, this);
}

// app/routes/api.auth.google.callback.ts
var api_auth_google_callback_exports = {};
__export(api_auth_google_callback_exports, {
  loader: () => loader5
});
import { SocialsProvider as SocialsProvider3 } from "remix-auth-socials";
var loader5 = ({ request }) => authenticator.authenticate(SocialsProvider3.GOOGLE, request, {
  successRedirect: "/create",
  failureRedirect: "/"
});

// app/routes/api.collections._index.ts
var api_collections_index_exports = {};
__export(api_collections_index_exports, {
  action: () => action11
});
async function action11({ request }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id;
  invariantResponse(
    userId,
    "Missing User ID: Must be logged in to Create a Collection"
  );
  let formData = await request.formData();
  switch (formData.get("intent")) {
    case "_create_collection": {
      let payload = JSON.parse(formData.get("body")), { title, description = "" } = payload;
      return await createNewCollection({
        userId,
        title,
        description
      });
    }
    default:
      return {};
  }
}

// app/routes/auth.google.callback.ts
var auth_google_callback_exports = {};
__export(auth_google_callback_exports, {
  loader: () => loader6,
  meta: () => meta2
});
import { SocialsProvider as SocialsProvider4 } from "remix-auth-socials";
var meta2 = () => [{ title: "User Login" }], loader6 = ({ request }) => authenticator.authenticate(SocialsProvider4.GOOGLE, request, {
  successRedirect: "/create",
  failureRedirect: "/"
});

// app/routes/collections._index.tsx
var collections_index_exports = {};
__export(collections_index_exports, {
  default: () => Index2,
  loader: () => loader7,
  meta: () => meta3
});
import { json as json7 } from "@remix-run/node";
import { jsxDEV as jsxDEV43 } from "react/jsx-dev-runtime";
var meta3 = ({ data, params, matches }) => {
  let userMatch = matches.find((match) => match.id === "root");
  return [{ title: `${userMatch?.data.data?.username || userMatch?.data.data?.name} Collections` }];
}, loader7 = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/"
  }), searchParams = new URL(request.url).searchParams, currentPage = Math.max(Number(searchParams.get("page") || 1), 1), pageSize = Number(searchParams.get("page_size")) || 50, collections = await getUserCollections(user.id, currentPage, pageSize);
  return json7({ data: collections, user });
};
function Index2() {
  return /* @__PURE__ */ jsxDEV43(CollectionsPage_default, {}, void 0, !1, {
    fileName: "app/routes/collections._index.tsx",
    lineNumber: 35,
    columnNumber: 10
  }, this);
}

// app/routes/explore.$imageId.tsx
var explore_imageId_exports = {};
__export(explore_imageId_exports, {
  ErrorBoundary: () => ErrorBoundary,
  default: () => Index3,
  loader: () => loader8,
  meta: () => meta4
});
import {
  json as json8
} from "@remix-run/node";
import { jsxDEV as jsxDEV44 } from "react/jsx-dev-runtime";
var meta4 = () => [{ title: "Explore AI Generated Images" }], loader8 = async ({ params }) => {
  let imageId = params.imageId || "";
  invariantResponse(imageId, "Image does not exist");
  let image = await getImage(imageId);
  return json8({ data: image });
};
function Index3() {
  return /* @__PURE__ */ jsxDEV44(ImageModalv2_default, {}, void 0, !1, {
    fileName: "app/routes/explore.$imageId.tsx",
    lineNumber: 28,
    columnNumber: 10
  }, this);
}
var ErrorBoundary = () => /* @__PURE__ */ jsxDEV44(
  GeneralErrorBoundary,
  {
    statusHandlers: {
      403: () => /* @__PURE__ */ jsxDEV44("p", { children: "You do not have permission" }, void 0, !1, {
        fileName: "app/routes/explore.$imageId.tsx",
        lineNumber: 35,
        columnNumber: 20
      }, this),
      404: ({ params }) => /* @__PURE__ */ jsxDEV44("p", { children: [
        'Image with id: "',
        params.imageId,
        '" does not exist'
      ] }, void 0, !0, {
        fileName: "app/routes/explore.$imageId.tsx",
        lineNumber: 37,
        columnNumber: 11
      }, this)
    }
  },
  void 0,
  !1,
  {
    fileName: "app/routes/explore.$imageId.tsx",
    lineNumber: 33,
    columnNumber: 5
  },
  this
);

// app/routes/api.auth.google.ts
var api_auth_google_exports = {};
__export(api_auth_google_exports, {
  action: () => action12
});
import { SocialsProvider as SocialsProvider5 } from "remix-auth-socials";
var action12 = async ({ request }) => authenticator.authenticate(SocialsProvider5.GOOGLE, request, {
  successRedirect: "/create",
  failureRedirect: "/"
});

// app/routes/profile.$userId.tsx
var profile_userId_exports = {};
__export(profile_userId_exports, {
  ErrorBoundary: () => ErrorBoundary2,
  default: () => Index4,
  loader: () => loader9,
  meta: () => meta5
});
import {
  json as json9
} from "@remix-run/node";
import { isRouteErrorResponse as isRouteErrorResponse2, useRouteError as useRouteError2 } from "@remix-run/react";
import { Alert } from "antd";
import { jsxDEV as jsxDEV45 } from "react/jsx-dev-runtime";
var meta5 = ({ data, params, matches }) => {
  let userId = params.userId, userMatch = matches.find((match) => match.id === "root"), username = userMatch?.data.data?.username || userMatch?.data.data?.name || userId;
  return [
    { title: `${username} | Profile` },
    {
      name: "description",
      content: `Checkout ${username}'s AI generated images`
    }
  ];
}, loader9 = async ({ request, params }) => {
  let username = params.userId || "";
  invariantResponse(username, "Username does not exist"), await authenticator.isAuthenticated(request, {
    failureRedirect: "/"
  });
  let searchParams = new URL(request.url).searchParams, currentPage = Math.max(Number(searchParams.get("page") || 1), 1), pageSize = Number(searchParams.get("page_size")) || 250, data = await getUserDataByUsername(username, currentPage, pageSize);
  return invariantResponse(data.user, "User does not exist"), json9(data);
};
function Index4() {
  return /* @__PURE__ */ jsxDEV45(UserProfilePage_default, {}, void 0, !1, {
    fileName: "app/routes/profile.$userId.tsx",
    lineNumber: 60,
    columnNumber: 10
  }, this);
}
function ErrorBoundary2() {
  let error = useRouteError2();
  return isRouteErrorResponse2(error) ? /* @__PURE__ */ jsxDEV45(
    Alert,
    {
      message: `${error.status} ${error.statusText}`,
      description: error.data,
      type: "error",
      showIcon: !0
    },
    void 0,
    !1,
    {
      fileName: "app/routes/profile.$userId.tsx",
      lineNumber: 68,
      columnNumber: 7
    },
    this
  ) : error instanceof Error ? /* @__PURE__ */ jsxDEV45(
    Alert,
    {
      message: "Error",
      description: error.message,
      type: "error",
      showIcon: !0
    },
    void 0,
    !1,
    {
      fileName: "app/routes/profile.$userId.tsx",
      lineNumber: 77,
      columnNumber: 7
    },
    this
  ) : /* @__PURE__ */ jsxDEV45(
    Alert,
    {
      message: "Error",
      description: "User Profile is currently unavailable",
      type: "error",
      showIcon: !0
    },
    void 0,
    !1,
    {
      fileName: "app/routes/profile.$userId.tsx",
      lineNumber: 93,
      columnNumber: 7
    },
    this
  );
}

// app/routes/create._index.tsx
var create_index_exports = {};
__export(create_index_exports, {
  ErrorBoundary: () => ErrorBoundary3,
  action: () => action13,
  default: () => Index5,
  loader: () => loader10,
  meta: () => meta6
});
import {
  json as json10
} from "@remix-run/node";

// app/server/updateUserCredits/updateUserCredits.ts
var updateUserCredits = async (userId, numberOfCreditsToDecrement = 1) => {
  let userData = await prisma.user.updateMany({
    where: {
      id: userId,
      credits: {
        gte: numberOfCreditsToDecrement
      }
    },
    data: {
      credits: {
        decrement: numberOfCreditsToDecrement
      }
    }
  });
  invariantResponse(userData.count > 0, "Not enough credits");
};

// app/server/createNewImages/createNewImages.ts
var DEFAULT_NUMBER_OF_IMAGES_CREATED3 = 1, DEFAULT_AI_IMAGE_LANGUAGE_MODEL3 = "stable-diffusion-xl", DEFAULT_IMAGE_STYLE_PRESET2 = void 0, DEFAULT_IS_IMAGE_PRIVATE3 = !1, DEFAULT_PAYLOAD3 = {
  prompt: "",
  numberOfImages: DEFAULT_NUMBER_OF_IMAGES_CREATED3,
  model: DEFAULT_AI_IMAGE_LANGUAGE_MODEL3,
  stylePreset: DEFAULT_IMAGE_STYLE_PRESET2,
  private: DEFAULT_IS_IMAGE_PRIVATE3
}, createNewImages = async (formData = DEFAULT_PAYLOAD3, userId) => {
  let AILanguageModelToUse = formData.model;
  invariantResponse(AILanguageModelToUse, "Must select a language model");
  try {
    return AILanguageModelToUse === "dall-e" ? await createImageFromDallEAPI(formData, userId) : AILanguageModelToUse.includes("stable-diffusion") ? await createImageFromStableDiffusionAPI(formData, userId) : { images: [] };
  } catch (error) {
    return console.error(error), { images: [] };
  }
};

// app/routes/create._index.tsx
import { Button as Button19, Result } from "antd";
import { z as z6 } from "zod";
import { jsxDEV as jsxDEV46 } from "react/jsx-dev-runtime";
var MAX_PROMPT_CHARACTERS2 = 3500, MIN_NUMBER_OF_IMAGES = 1, MAX_NUMBER_OF_IMAGES = 10, CreateImagesFormSchema = z6.object({
  prompt: z6.string().trim().min(1, { message: "Prompt can not be empty" }).max(MAX_PROMPT_CHARACTERS2, {
    message: `Prompt must be ${MAX_PROMPT_CHARACTERS2} characters or less`
  }),
  stylePreset: z6.string().min(1).optional().refine(
    (value) => {
      if (value)
        return STABLE_DIFFUSION_IMAGE_PRESETS.some(
          (preset) => preset.value.includes(value)
        );
    },
    {
      // overrides the error message here
      message: "Invalid preset selected"
    }
  ),
  model: z6.string().min(1, { message: "Language model can not be empty" }).refine(
    (value) => (
      // Check if value is invalid
      LANGUAGE_MODEL_OPTIONS.some((model) => model.value.includes(value))
    ),
    {
      // overrides the error message here
      message: "Invalid language model selected"
    }
  ),
  numberOfImages: z6.number().min(MIN_NUMBER_OF_IMAGES, {
    message: `Number of images to generate must be ${MIN_NUMBER_OF_IMAGES}-${MAX_NUMBER_OF_IMAGES}`
  }).max(MAX_NUMBER_OF_IMAGES, {
    message: `Number of images to generate must be ${MIN_NUMBER_OF_IMAGES}-${MAX_NUMBER_OF_IMAGES}`
  }),
  private: z6.boolean().optional()
}), meta6 = () => [{ title: "Create AI Images" }], loader10 = async ({ request }) => (await requireUserId(request, { redirectTo: "/create" }), await authenticator.isAuthenticated(request, {
  failureRedirect: "/"
}), json10({}));
async function action13({ request }) {
  let userId = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id, payload = (await request.formData()).get("body"), formattedPayload = await JSON.parse(payload), validateFormData = CreateImagesFormSchema.safeParse({
    prompt: formattedPayload.prompt,
    numberOfImages: formattedPayload.numberOfImages,
    model: formattedPayload.model,
    stylePreset: formattedPayload.style,
    // TODO: Setup Private field – for now default setting private to false
    private: !1
  });
  if (console.log(validateFormData.success), !validateFormData.success)
    return json10(
      {
        images: [],
        message: "Error invalid form data",
        error: validateFormData.error.flatten()
      },
      {
        status: 400
      }
    );
  try {
    console.log("updating credits...."), await updateUserCredits(userId, validateFormData.data.numberOfImages);
  } catch (error) {
    return console.error(error), json10({
      images: [],
      message: "Error updating user credits",
      error: error.message
    });
  }
  let data = await createNewImages(validateFormData.data, userId);
  return console.log("Data -----------------------"), console.log(data), console.log("Data -----------------------"), json10({ ...data, message: "Success" });
}
function Index5() {
  return /* @__PURE__ */ jsxDEV46(CreateImagePage_default, {}, void 0, !1, {
    fileName: "app/routes/create._index.tsx",
    lineNumber: 157,
    columnNumber: 10
  }, this);
}
function ErrorBoundary3() {
  return /* @__PURE__ */ jsxDEV46(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: () => /* @__PURE__ */ jsxDEV46(
          Result,
          {
            status: "404",
            title: "404",
            subTitle: "Sorry, the page you visited does not exist.",
            extra: /* @__PURE__ */ jsxDEV46(Button19, { type: "primary", href: "/", children: "Back to Home" }, void 0, !1, {
              fileName: "app/routes/create._index.tsx",
              lineNumber: 172,
              columnNumber: 15
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/create._index.tsx",
            lineNumber: 167,
            columnNumber: 11
          },
          this
        )
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/create._index.tsx",
      lineNumber: 164,
      columnNumber: 5
    },
    this
  );
}

// app/routes/auth.google.ts
var auth_google_exports = {};
__export(auth_google_exports, {
  action: () => action14
});
import { SocialsProvider as SocialsProvider6 } from "remix-auth-socials";
var action14 = async ({ request }) => authenticator.authenticate(SocialsProvider6.GOOGLE, request, {
  successRedirect: "/create",
  failureRedirect: "/"
});

// app/routes/p.$imageId.tsx
var p_imageId_exports = {};
__export(p_imageId_exports, {
  ErrorBoundary: () => ErrorBoundary4,
  default: () => Index6,
  loader: () => loader11,
  meta: () => meta7
});
import {
  json as json11
} from "@remix-run/node";
import {
  Typography as Typography19,
  Image as Image5,
  Space as Space16,
  Button as Button20,
  Avatar as Avatar6,
  Tabs as Tabs3,
  Form as Form12,
  Input as Input8
} from "antd";
import { useLoaderData as useLoaderData9 } from "@remix-run/react";
import { jsxDEV as jsxDEV47 } from "react/jsx-dev-runtime";
var meta7 = () => [{ title: "Image Details Page" }], loader11 = async ({ params }) => {
  let imageId = params.imageId || "";
  invariantResponse(imageId, "Image does not exist");
  let image = await getImage(imageId);
  return json11({ data: image });
};
function Index6() {
  let userData = useLoggedInUser(), isUserLoggedIn = Boolean(userData), imageData = useLoaderData9().data, [formInstance] = Form12.useForm(), { fetcher, isLoadingFetcher } = useRemixFetcher({
    // onSuccess: (response) => {
    //   notification.success({ message: response.message });
    // },
    // onError: (response) => {
    //   notification.error({ message: response.message });
    // },
  }), handleCommentFormSubmit = (formValues) => {
    fetcher.submit(
      { intent: "image-add-comment", body: JSON.stringify(formValues) },
      { method: "post", action: `/api/image/${imageData.id}/comment?index` }
    );
  };
  return /* @__PURE__ */ jsxDEV47("div", { className: "border rounded flex border-solid border-gray-500 m-auto w-fit", children: [
    /* @__PURE__ */ jsxDEV47(
      "div",
      {
        style: {
          flex: "1 1 100%",
          background: "black",
          position: "relative"
        },
        children: /* @__PURE__ */ jsxDEV47(
          "div",
          {
            style: {
              position: "relative",
              overflow: "hidden",
              minHeight: 300,
              paddingBottom: 0,
              height: "100%",
              display: "flex",
              justifyContent: "center",
              flexDirection: "column"
            },
            children: /* @__PURE__ */ jsxDEV47(
              "div",
              {
                style: {
                  width: "100%",
                  maxWidth: 1024,
                  margin: "auto",
                  display: "flex",
                  justifyContent: "center"
                },
                children: /* @__PURE__ */ jsxDEV47(
                  Image5,
                  {
                    src: imageData.url,
                    alt: imageData.prompt || "Generated Image",
                    fallback: fallbackImageSource,
                    preview: !1,
                    placeholder: /* @__PURE__ */ jsxDEV47(
                      "div",
                      {
                        style: {
                          width: 1024,
                          height: 1024,
                          background: "black"
                        }
                      },
                      void 0,
                      !1,
                      {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 114,
                        columnNumber: 17
                      },
                      this
                    )
                  },
                  void 0,
                  !1,
                  {
                    fileName: "app/routes/p.$imageId.tsx",
                    lineNumber: 108,
                    columnNumber: 13
                  },
                  this
                )
              },
              void 0,
              !1,
              {
                fileName: "app/routes/p.$imageId.tsx",
                lineNumber: 99,
                columnNumber: 11
              },
              this
            )
          },
          void 0,
          !1,
          {
            fileName: "app/routes/p.$imageId.tsx",
            lineNumber: 87,
            columnNumber: 9
          },
          this
        )
      },
      void 0,
      !1,
      {
        fileName: "app/routes/p.$imageId.tsx",
        lineNumber: 80,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV47(
      "div",
      {
        className: "flex flex-col p-4",
        style: { flexBasis: 420 },
        children: [
          /* @__PURE__ */ jsxDEV47(Space16, { style: { marginBottom: "1rem" }, children: [
            /* @__PURE__ */ jsxDEV47(Avatar6, { style: { cursor: "pointer" }, icon: /* @__PURE__ */ jsxDEV47(UserOutlined_default2, {}, void 0, !1, {
              fileName: "app/routes/p.$imageId.tsx",
              lineNumber: 133,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "app/routes/p.$imageId.tsx",
              lineNumber: 133,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV47("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxDEV47(
                Typography19.Link,
                {
                  strong: !0,
                  href: `/profile/${imageData.user.username}`,
                  children: imageData.user.username
                },
                void 0,
                !1,
                {
                  fileName: "app/routes/p.$imageId.tsx",
                  lineNumber: 136,
                  columnNumber: 13
                },
                this
              ),
              /* @__PURE__ */ jsxDEV47(Typography19.Text, { type: "secondary", style: { fontSize: 12 }, children: convertUtcDateToLocalDateString(imageData.createdAt) }, void 0, !1, {
                fileName: "app/routes/p.$imageId.tsx",
                lineNumber: 142,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/p.$imageId.tsx",
              lineNumber: 135,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/p.$imageId.tsx",
            lineNumber: 132,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV47(Space16, { style: { display: "flex", justifyContent: "space-between" }, children: [
            /* @__PURE__ */ jsxDEV47(Typography19.Text, { strong: !0, style: { fontSize: 16 }, children: imageData.title || "Untitled" }, void 0, !1, {
              fileName: "app/routes/p.$imageId.tsx",
              lineNumber: 148,
              columnNumber: 11
            }, this),
            /* @__PURE__ */ jsxDEV47(Space16, { size: "small", children: [
              /* @__PURE__ */ jsxDEV47(LikeImageButton_default, { imageData }, void 0, !1, {
                fileName: "app/routes/p.$imageId.tsx",
                lineNumber: 152,
                columnNumber: 13
              }, this),
              /* @__PURE__ */ jsxDEV47(AddImageToCollectionButton_default, { imageData }, void 0, !1, {
                fileName: "app/routes/p.$imageId.tsx",
                lineNumber: 153,
                columnNumber: 13
              }, this)
            ] }, void 0, !0, {
              fileName: "app/routes/p.$imageId.tsx",
              lineNumber: 151,
              columnNumber: 11
            }, this)
          ] }, void 0, !0, {
            fileName: "app/routes/p.$imageId.tsx",
            lineNumber: 147,
            columnNumber: 9
          }, this),
          /* @__PURE__ */ jsxDEV47(
            Tabs3,
            {
              style: { height: "100%" },
              defaultActiveKey: "comments",
              items: [
                {
                  label: /* @__PURE__ */ jsxDEV47("span", { children: [
                    /* @__PURE__ */ jsxDEV47(MessageOutlined_default2, {}, void 0, !1, {
                      fileName: "app/routes/p.$imageId.tsx",
                      lineNumber: 164,
                      columnNumber: 19
                    }, this),
                    "Comments"
                  ] }, void 0, !0, {
                    fileName: "app/routes/p.$imageId.tsx",
                    lineNumber: 163,
                    columnNumber: 17
                  }, this),
                  key: "comment",
                  children: /* @__PURE__ */ jsxDEV47(
                    "div",
                    {
                      style: {
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        height: "100%"
                      },
                      children: [
                        isUserLoggedIn && /* @__PURE__ */ jsxDEV47(
                          "div",
                          {
                            style: {
                              position: "absolute",
                              width: "100%",
                              bottom: 0
                            },
                            children: /* @__PURE__ */ jsxDEV47(
                              Form12,
                              {
                                onFinish: handleCommentFormSubmit,
                                initialValues: { comment: void 0 },
                                form: formInstance,
                                children: /* @__PURE__ */ jsxDEV47(
                                  Form12.Item,
                                  {
                                    name: "comment",
                                    style: {
                                      margin: 0
                                    },
                                    children: /* @__PURE__ */ jsxDEV47(Space16.Compact, { style: { width: "100%" }, children: [
                                      /* @__PURE__ */ jsxDEV47(Input8, { placeholder: "Leave a comment", allowClear: !0 }, void 0, !1, {
                                        fileName: "app/routes/p.$imageId.tsx",
                                        lineNumber: 198,
                                        columnNumber: 29
                                      }, this),
                                      /* @__PURE__ */ jsxDEV47(
                                        Button20,
                                        {
                                          type: "primary",
                                          ghost: !0,
                                          icon: /* @__PURE__ */ jsxDEV47(SendOutlined_default2, {}, void 0, !1, {
                                            fileName: "app/routes/p.$imageId.tsx",
                                            lineNumber: 202,
                                            columnNumber: 37
                                          }, this),
                                          onClick: () => formInstance.submit(),
                                          loading: isLoadingFetcher
                                        },
                                        void 0,
                                        !1,
                                        {
                                          fileName: "app/routes/p.$imageId.tsx",
                                          lineNumber: 199,
                                          columnNumber: 29
                                        },
                                        this
                                      )
                                    ] }, void 0, !0, {
                                      fileName: "app/routes/p.$imageId.tsx",
                                      lineNumber: 197,
                                      columnNumber: 27
                                    }, this)
                                  },
                                  void 0,
                                  !1,
                                  {
                                    fileName: "app/routes/p.$imageId.tsx",
                                    lineNumber: 191,
                                    columnNumber: 25
                                  },
                                  this
                                )
                              },
                              void 0,
                              !1,
                              {
                                fileName: "app/routes/p.$imageId.tsx",
                                lineNumber: 186,
                                columnNumber: 23
                              },
                              this
                            )
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/p.$imageId.tsx",
                            lineNumber: 179,
                            columnNumber: 21
                          },
                          this
                        ),
                        imageData.comments && imageData.comments.length > 0 ? imageData.comments.map((comment) => /* @__PURE__ */ jsxDEV47(
                          CommentCard_default,
                          {
                            imageData,
                            comment
                          },
                          comment.id,
                          !1,
                          {
                            fileName: "app/routes/p.$imageId.tsx",
                            lineNumber: 213,
                            columnNumber: 23
                          },
                          this
                        )) : /* @__PURE__ */ jsxDEV47(
                          Typography19.Text,
                          {
                            type: "secondary",
                            italic: !0,
                            style: { alignSelf: "center" },
                            children: "No comments"
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/p.$imageId.tsx",
                            lineNumber: 220,
                            columnNumber: 21
                          },
                          this
                        )
                      ]
                    },
                    void 0,
                    !0,
                    {
                      fileName: "app/routes/p.$imageId.tsx",
                      lineNumber: 170,
                      columnNumber: 17
                    },
                    this
                  )
                },
                {
                  label: /* @__PURE__ */ jsxDEV47("span", { children: [
                    /* @__PURE__ */ jsxDEV47(InfoCircleOutlined_default2, {}, void 0, !1, {
                      fileName: "app/routes/p.$imageId.tsx",
                      lineNumber: 234,
                      columnNumber: 19
                    }, this),
                    "Info"
                  ] }, void 0, !0, {
                    fileName: "app/routes/p.$imageId.tsx",
                    lineNumber: 233,
                    columnNumber: 17
                  }, this),
                  key: "info",
                  children: /* @__PURE__ */ jsxDEV47(Space16, { direction: "vertical", children: [
                    /* @__PURE__ */ jsxDEV47(Space16, { direction: "vertical", size: "small", children: [
                      /* @__PURE__ */ jsxDEV47(Typography19.Text, { style: { fontWeight: 600 }, children: "Engine Model" }, void 0, !1, {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 242,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV47(Typography19.Text, { italic: !0, children: imageData.model }, void 0, !1, {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 245,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/p.$imageId.tsx",
                      lineNumber: 241,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV47(Space16, { direction: "vertical", size: "small", children: [
                      /* @__PURE__ */ jsxDEV47(Typography19.Text, { style: { fontWeight: 600 }, children: "Style Preset" }, void 0, !1, {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 248,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV47(Typography19.Text, { italic: !0, children: imageData.stylePreset }, void 0, !1, {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 251,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/p.$imageId.tsx",
                      lineNumber: 247,
                      columnNumber: 19
                    }, this),
                    /* @__PURE__ */ jsxDEV47(Space16, { direction: "vertical", size: "small", children: [
                      /* @__PURE__ */ jsxDEV47(Typography19.Text, { style: { fontWeight: 600 }, children: "Prompt" }, void 0, !1, {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 256,
                        columnNumber: 21
                      }, this),
                      /* @__PURE__ */ jsxDEV47("div", { children: [
                        /* @__PURE__ */ jsxDEV47(Typography19.Text, { italic: !0, children: imageData.prompt }, void 0, !1, {
                          fileName: "app/routes/p.$imageId.tsx",
                          lineNumber: 260,
                          columnNumber: 23
                        }, this),
                        /* @__PURE__ */ jsxDEV47(
                          CopyToClipboardButton_default,
                          {
                            stringToCopy: imageData.prompt || ""
                          },
                          void 0,
                          !1,
                          {
                            fileName: "app/routes/p.$imageId.tsx",
                            lineNumber: 263,
                            columnNumber: 23
                          },
                          this
                        )
                      ] }, void 0, !0, {
                        fileName: "app/routes/p.$imageId.tsx",
                        lineNumber: 259,
                        columnNumber: 21
                      }, this)
                    ] }, void 0, !0, {
                      fileName: "app/routes/p.$imageId.tsx",
                      lineNumber: 255,
                      columnNumber: 19
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "app/routes/p.$imageId.tsx",
                    lineNumber: 240,
                    columnNumber: 17
                  }, this)
                }
              ]
            },
            void 0,
            !1,
            {
              fileName: "app/routes/p.$imageId.tsx",
              lineNumber: 157,
              columnNumber: 9
            },
            this
          )
        ]
      },
      void 0,
      !0,
      {
        fileName: "app/routes/p.$imageId.tsx",
        lineNumber: 127,
        columnNumber: 7
      },
      this
    )
  ] }, void 0, !0, {
    fileName: "app/routes/p.$imageId.tsx",
    lineNumber: 79,
    columnNumber: 5
  }, this);
}
var ErrorBoundary4 = () => /* @__PURE__ */ jsxDEV47(
  GeneralErrorBoundary,
  {
    statusHandlers: {
      403: () => /* @__PURE__ */ jsxDEV47("p", { children: "You do not have permission" }, void 0, !1, {
        fileName: "app/routes/p.$imageId.tsx",
        lineNumber: 282,
        columnNumber: 20
      }, this),
      404: ({ params }) => /* @__PURE__ */ jsxDEV47("p", { children: [
        'Image with id: "',
        params.imageId,
        '" does not exist'
      ] }, void 0, !0, {
        fileName: "app/routes/p.$imageId.tsx",
        lineNumber: 284,
        columnNumber: 11
      }, this)
    }
  },
  void 0,
  !1,
  {
    fileName: "app/routes/p.$imageId.tsx",
    lineNumber: 280,
    columnNumber: 5
  },
  this
);

// app/routes/checkout.tsx
var checkout_exports = {};
__export(checkout_exports, {
  loader: () => loader12,
  meta: () => meta8
});
import {
  redirect as redirect9
} from "@remix-run/node";

// app/services/stripe.server.ts
import Stripe from "stripe";
import { json as json12 } from "@remix-run/node";
var stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15"
}), stripeCheckout = async ({ userId }) => {
  try {
    return (await stripe.checkout.sessions.create({
      success_url: `${process.env.ORIGIN}/create`,
      cancel_url: `${process.env.ORIGIN}/create`,
      line_items: [{ price: process.env.STRIPE_CREDITS_PRICE_ID, quantity: 1 }],
      mode: "payment",
      metadata: {
        userId
      },
      payment_method_types: ["card", "us_bank_account"]
    })).url;
  } catch (error) {
    throw console.error(error), json12({ errors: [{ message: error.message }] }, 400);
  }
};

// app/routes/checkout.tsx
var loader12 = async ({ request }) => {
  let user = await authenticator.isAuthenticated(request, {
    failureRedirect: "/"
  }), url = await stripeCheckout({
    userId: user.id
  });
  return redirect9(url);
}, meta8 = ({ data, params, matches }) => {
  let userMatch = matches.find((match) => match.id === "root");
  return [{ title: `Checkout | ${userMatch?.data.data?.username || userMatch?.data.data?.name}` }];
};

// app/routes/settings.tsx
var settings_exports = {};
__export(settings_exports, {
  default: () => Index7,
  loader: () => loader13,
  meta: () => meta9
});
import { json as json13 } from "@remix-run/node";
import { jsxDEV as jsxDEV48 } from "react/jsx-dev-runtime";
var meta9 = () => [{ title: "Settings Page" }], loader13 = async () => json13({});
function Index7() {
  return /* @__PURE__ */ jsxDEV48(SettingsPage_default, {}, void 0, !1, {
    fileName: "app/routes/settings.tsx",
    lineNumber: 15,
    columnNumber: 10
  }, this);
}

// app/routes/explore.tsx
var explore_exports = {};
__export(explore_exports, {
  default: () => Index8,
  loader: () => loader14,
  meta: () => meta10
});
import {
  json as json14
} from "@remix-run/node";
import { Outlet as Outlet2 } from "@remix-run/react";
import { Fragment as Fragment20, jsxDEV as jsxDEV49 } from "react/jsx-dev-runtime";
var meta10 = () => [{ title: "Explore AI Generated Images" }], loader14 = async ({ request }) => {
  let searchParams = new URL(request.url).searchParams, searchTerm = searchParams.get("q") || "", currentPage = Math.max(Number(searchParams.get("page") || 1), 1), data = await getImages(searchTerm, currentPage);
  return json14({ data });
};
function Index8() {
  return /* @__PURE__ */ jsxDEV49(Fragment20, { children: [
    /* @__PURE__ */ jsxDEV49(ExplorePage_default, {}, void 0, !1, {
      fileName: "app/routes/explore.tsx",
      lineNumber: 30,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV49(Outlet2, {}, void 0, !1, {
      fileName: "app/routes/explore.tsx",
      lineNumber: 31,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/explore.tsx",
    lineNumber: 29,
    columnNumber: 5
  }, this);
}

// app/routes/webhook.ts
var webhook_exports = {};
__export(webhook_exports, {
  action: () => action15,
  meta: () => meta11
});
import { json as json15 } from "@remix-run/node";

// app/services/webhook.server.ts
var handleStripeEvent = async (type, data, id) => {
  try {
    if (id === "evt_00000000000000")
      return;
    switch (type) {
      case "checkout.session.completed":
        let checkoutSessionCompleted = data.object, creditsToAdd = 100;
        return await prisma.user.update({
          where: {
            id: checkoutSessionCompleted.metadata.userId
          },
          data: {
            credits: {
              increment: creditsToAdd
            }
          }
        });
      default:
        console.log(`Unhandled event type: ${type}`);
    }
    return;
  } catch (error) {
    console.error({ message: error });
  }
};

// app/routes/webhook.ts
var meta11 = () => [{ title: "Stripe Webhook" }], action15 = async ({ request }) => {
  let payload = await request.text(), sig = request.headers.get("stripe-signature");
  try {
    let { type, data, id } = stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEB_HOOK_SECRET
    );
    return { data: await handleStripeEvent(type, data, id) };
  } catch (error) {
    throw json15({ errors: [{ message: error.message }] }, 400);
  }
};

// app/routes/_index.tsx
var index_exports = {};
__export(index_exports, {
  default: () => Index9,
  loader: () => loader15,
  meta: () => meta12
});
import { json as json16 } from "@remix-run/node";
import { jsxDEV as jsxDEV50 } from "react/jsx-dev-runtime";
var meta12 = () => [{ title: "AI Image Generator" }], loader15 = async () => json16({});
function Index9() {
  return /* @__PURE__ */ jsxDEV50(LandingPage_default, {}, void 0, !1, {
    fileName: "app/routes/_index.tsx",
    lineNumber: 13,
    columnNumber: 10
  }, this);
}

// app/routes/logout.ts
var logout_exports = {};
__export(logout_exports, {
  action: () => action16,
  loader: () => loader16,
  meta: () => meta13
});
import {
  redirect as redirect10
} from "@remix-run/node";
var meta13 = () => [{ title: "User Logout" }], loader16 = () => redirect10("/"), action16 = async ({ request }) => {
  try {
    return authenticator.logout(request, { redirectTo: "/" });
  } catch (error) {
    let message = "Error while attempting to log out, please try again";
    return console.error(error), {
      success: !1,
      message,
      error
    };
  }
};

// app/routes/manage.tsx
var manage_exports = {};
__export(manage_exports, {
  ErrorBoundary: () => ErrorBoundary5,
  default: () => Index10,
  loader: () => loader17,
  meta: () => meta14
});
import {
  json as json17
} from "@remix-run/node";
import { Alert as Alert2 } from "antd";
import { jsxDEV as jsxDEV51 } from "react/jsx-dev-runtime";
var meta14 = ({ data, params, matches }) => {
  let userId = params.userId, userMatch = matches.find((match) => match.id === "root");
  return [
    { title: `${userMatch?.data.data?.username || userMatch?.data.data?.name || userId} | Manage Images` },
    {
      name: "Manage AI generated images",
      content: "Manage AI generated images"
    }
  ];
}, loader17 = async ({ request, params }) => {
  let currentLoggedInUserID = (await (await getSession(request.headers.get("Cookie"))).get("_session") || void 0).id || "";
  invariantResponse(currentLoggedInUserID, "User does not exist"), await authenticator.isAuthenticated(request, {
    failureRedirect: "/"
  });
  let searchParams = new URL(request.url).searchParams, currentPage = Math.max(Number(searchParams.get("page") || 1), 1), pageSize = Number(searchParams.get("page_size")) || 50, data = await getUserData(currentLoggedInUserID, currentPage, pageSize);
  return invariantResponse(data.user, "User does not exist"), json17(data);
};
function Index10() {
  return /* @__PURE__ */ jsxDEV51(ManageImagesPage_default, {}, void 0, !1, {
    fileName: "app/routes/manage.tsx",
    lineNumber: 64,
    columnNumber: 10
  }, this);
}
var ErrorBoundary5 = () => /* @__PURE__ */ jsxDEV51(
  GeneralErrorBoundary,
  {
    statusHandlers: {
      403: () => /* @__PURE__ */ jsxDEV51("p", { children: "You do not have permission" }, void 0, !1, {
        fileName: "app/routes/manage.tsx",
        lineNumber: 71,
        columnNumber: 20
      }, this)
    },
    unexpectedErrorHandler: (error) => /* @__PURE__ */ jsxDEV51(
      Alert2,
      {
        message: "Error",
        description: "User Profile is currently unavailable",
        type: "error",
        showIcon: !0
      },
      void 0,
      !1,
      {
        fileName: "app/routes/manage.tsx",
        lineNumber: 74,
        columnNumber: 9
      },
      this
    )
  },
  void 0,
  !1,
  {
    fileName: "app/routes/manage.tsx",
    lineNumber: 69,
    columnNumber: 5
  },
  this
);

// app/routes/signup.tsx
var signup_exports = {};
__export(signup_exports, {
  ErrorBoundary: () => ErrorBoundary6,
  action: () => action17,
  default: () => Index11,
  loader: () => loader18,
  meta: () => meta15
});
import { conform as conform2, useForm as useForm2 } from "@conform-to/react";
import { getFieldsetConstraint as getFieldsetConstraint2, parse as parse5 } from "@conform-to/zod";
import {
  json as json18,
  redirect as redirect11
} from "@remix-run/node";
import { Form as Form13, useActionData as useActionData3, useSearchParams as useSearchParams5 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput2 } from "remix-utils/csrf/react";
import { HoneypotInputs as HoneypotInputs2 } from "remix-utils/honeypot/react";
import { z as z7 } from "zod";
import bcrypt2 from "bcryptjs";
import { safeRedirect } from "remix-utils/safe-redirect";
import { jsxDEV as jsxDEV52 } from "react/jsx-dev-runtime";
var SignupFormSchema = z7.object({
  username: UsernameSchema,
  name: NameSchema,
  email: EmailSchema,
  password: PasswordSchema,
  confirmPassword: PasswordSchema,
  redirectTo: z7.string().optional(),
  agreeToTermsOfServiceAndPrivacyPolicy: z7.boolean({
    required_error: "You must agree to the terms of service and privacy policy"
  }),
  remember: z7.boolean().optional()
}).superRefine(({ confirmPassword, password }, ctx) => {
  confirmPassword !== password && ctx.addIssue({
    path: ["confirmPassword"],
    code: "custom",
    message: "The passwords must match"
  });
}), meta15 = () => [{ title: "User Sign Up" }];
async function loader18({ request }) {
  return json18({});
}
async function action17({ request }) {
  let formData = await request.formData();
  await validateCSRF(formData, request.headers), checkHoneypot(formData);
  let submission = await parse5(formData, {
    schema: SignupFormSchema.superRefine(async (data, ctx) => {
      if (await prisma.user.findUnique({
        where: { username: data.username },
        select: { id: !0 }
      })) {
        ctx.addIssue({
          path: ["username"],
          code: z7.ZodIssueCode.custom,
          message: "A user already exists with this username"
        });
        return;
      }
    }).transform(async (data) => {
      let { username, email, name, password } = data, user2 = await prisma.user.create({
        select: { id: !0 },
        data: {
          email: email.toLowerCase(),
          username: username.toLowerCase(),
          name,
          password: {
            create: {
              hash: await bcrypt2.hash(password, 10)
            }
          },
          roles: { connect: { name: "user" } }
        }
      });
      return { ...data, user: user2 };
    }),
    async: !0
  });
  if (submission.intent !== "submit")
    return json18({ status: "idle", submission });
  if (!submission.value?.user)
    return json18({ status: "error", submission }, { status: 400 });
  let { user, remember, redirectTo } = submission.value, cookieSession = await sessionStorage.getSession(
    request.headers.get("cookie")
  );
  return cookieSession.set("userId", user.id), redirect11(safeRedirect(redirectTo), {
    headers: {
      "set-cookie": await sessionStorage.commitSession(cookieSession, {
        expires: remember ? getSessionExpirationDate() : void 0
      })
    }
  });
}
function Index11() {
  let actionData = useActionData3(), isPending = useIsPending(), [searchParams] = useSearchParams5(), redirectTo = searchParams.get("redirectTo"), [form, fields] = useForm2({
    id: "signup-form",
    constraint: getFieldsetConstraint2(SignupFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse5(formData, { schema: SignupFormSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV52("div", { className: "container flex flex-col justify-center pb-32 pt-20", children: [
    /* @__PURE__ */ jsxDEV52("div", { className: "text-center", children: [
      /* @__PURE__ */ jsxDEV52("h1", { className: "text-h1", children: "Let's start your journey!" }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 151,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV52("p", { className: "mt-3 text-body-md text-muted-foreground", children: "Please enter your email." }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 152,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 150,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV52("div", { className: "mx-auto mt-16 min-w-[368px] max-w-sm", children: /* @__PURE__ */ jsxDEV52(Form13, { method: "POST", ...form.props, children: [
      /* @__PURE__ */ jsxDEV52(AuthenticityTokenInput2, {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 158,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV52(HoneypotInputs2, {}, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 159,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV52(
        Field,
        {
          labelProps: { htmlFor: fields.email.id, children: "Email" },
          inputProps: {
            ...conform2.input(fields.email),
            autoComplete: "email",
            autoFocus: !0,
            className: "lowercase"
          },
          errors: fields.email.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 160,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52(
        Field,
        {
          labelProps: { htmlFor: fields.username.id, children: "Username" },
          inputProps: {
            ...conform2.input(fields.username),
            autoComplete: "username",
            autoFocus: !0,
            className: "lowercase"
          },
          errors: fields.username.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 170,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52(
        Field,
        {
          labelProps: { htmlFor: fields.name.id, children: "Name" },
          inputProps: {
            ...conform2.input(fields.name),
            autoComplete: "name"
          },
          errors: fields.name.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 180,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52(
        Field,
        {
          labelProps: { htmlFor: fields.password.id, children: "Password" },
          inputProps: {
            ...conform2.input(fields.password, { type: "password" }),
            autoComplete: "new-password"
          },
          errors: fields.password.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 188,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52(
        Field,
        {
          labelProps: {
            htmlFor: fields.confirmPassword.id,
            children: "Confirm Password"
          },
          inputProps: {
            ...conform2.input(fields.confirmPassword, { type: "password" }),
            autoComplete: "new-password"
          },
          errors: fields.confirmPassword.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 197,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52(
        CheckboxField,
        {
          labelProps: {
            htmlFor: fields.agreeToTermsOfServiceAndPrivacyPolicy.id,
            children: "Do you agree to our Terms of Service and Privacy Policy?"
          },
          buttonProps: conform2.input(
            fields.agreeToTermsOfServiceAndPrivacyPolicy,
            { type: "checkbox" }
          ),
          errors: fields.agreeToTermsOfServiceAndPrivacyPolicy.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 209,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52(
        CheckboxField,
        {
          labelProps: {
            htmlFor: fields.remember.id,
            children: "Remember me"
          },
          buttonProps: conform2.input(fields.remember, { type: "checkbox" }),
          errors: fields.remember.errors
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 222,
          columnNumber: 11
        },
        this
      ),
      /* @__PURE__ */ jsxDEV52("input", { ...conform2.input(fields.redirectTo, { type: "hidden" }) }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 231,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV52(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 233,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ jsxDEV52("div", { className: "flex items-center justify-between gap-6", children: /* @__PURE__ */ jsxDEV52(
        "button",
        {
          className: "w-full border-solid border-1 border-gray-600 rounded-md p-2  hover:bg-gray-800",
          type: "submit",
          disabled: isPending,
          children: "Submit"
        },
        void 0,
        !1,
        {
          fileName: "app/routes/signup.tsx",
          lineNumber: 236,
          columnNumber: 13
        },
        this
      ) }, void 0, !1, {
        fileName: "app/routes/signup.tsx",
        lineNumber: 235,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 157,
      columnNumber: 9
    }, this) }, void 0, !1, {
      fileName: "app/routes/signup.tsx",
      lineNumber: 156,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 149,
    columnNumber: 5
  }, this);
}
function ErrorBoundary6() {
  return /* @__PURE__ */ jsxDEV52(GeneralErrorBoundary, {}, void 0, !1, {
    fileName: "app/routes/signup.tsx",
    lineNumber: 253,
    columnNumber: 10
  }, this);
}

// app/routes/admin.tsx
var admin_exports = {};
__export(admin_exports, {
  ErrorBoundary: () => ErrorBoundary7,
  default: () => Index12,
  loader: () => loader19,
  meta: () => meta16
});
import { json as json19 } from "@remix-run/node";
import { Alert as Alert3 } from "antd";
import { Fragment as Fragment21, jsxDEV as jsxDEV53 } from "react/jsx-dev-runtime";
var meta16 = () => [{ title: "Admin Page" }], loader19 = async ({ request }) => (await requireUserWithRole(request, "admin"), json19({}));
function Index12() {
  return /* @__PURE__ */ jsxDEV53(Fragment21, { children: [
    /* @__PURE__ */ jsxDEV53("h2", { children: "Admin Page" }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 19,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV53("p", { children: "In progress..." }, void 0, !1, {
      fileName: "app/routes/admin.tsx",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/admin.tsx",
    lineNumber: 18,
    columnNumber: 5
  }, this);
}
var ErrorBoundary7 = () => /* @__PURE__ */ jsxDEV53(
  GeneralErrorBoundary,
  {
    statusHandlers: {
      403: () => /* @__PURE__ */ jsxDEV53("p", { children: "You do not have permission" }, void 0, !1, {
        fileName: "app/routes/admin.tsx",
        lineNumber: 29,
        columnNumber: 20
      }, this)
    },
    unexpectedErrorHandler: (error) => /* @__PURE__ */ jsxDEV53(
      Alert3,
      {
        message: "Error",
        description: "You do not have permission to view this page",
        type: "error",
        showIcon: !0
      },
      void 0,
      !1,
      {
        fileName: "app/routes/admin.tsx",
        lineNumber: 32,
        columnNumber: 9
      },
      this
    )
  },
  void 0,
  !1,
  {
    fileName: "app/routes/admin.tsx",
    lineNumber: 27,
    columnNumber: 5
  },
  this
);

// app/routes/login.tsx
var login_exports = {};
__export(login_exports, {
  action: () => action18,
  default: () => Index13,
  loader: () => loader20,
  meta: () => meta17
});
import {
  json as json20,
  redirect as redirect12
} from "@remix-run/node";
import { z as z8 } from "zod";
import { getFieldsetConstraint as getFieldsetConstraint3, parse as parse6 } from "@conform-to/zod";
import { Form as Form14, Link as Link2, useActionData as useActionData4, useSearchParams as useSearchParams6 } from "@remix-run/react";
import { AuthenticityTokenInput as AuthenticityTokenInput3 } from "remix-utils/csrf/react";
import { safeRedirect as safeRedirect2 } from "remix-utils/safe-redirect";
import { HoneypotInputs as HoneypotInputs3 } from "remix-utils/honeypot/react";
import { useForm as useForm3, conform as conform3 } from "@conform-to/react";
import bcrypt3 from "bcryptjs";
import { Fragment as Fragment22, jsxDEV as jsxDEV54 } from "react/jsx-dev-runtime";
var meta17 = () => [{ title: "User Login" }], loader20 = async ({ request }) => (await authenticator.isAuthenticated(request, {
  successRedirect: "/explore"
}), json20({})), LoginFormSchema = z8.object({
  username: UsernameSchema,
  password: PasswordSchema,
  redirectTo: z8.string().optional(),
  remember: z8.boolean().optional()
});
async function action18({ request }) {
  let formData = await request.formData();
  await validateCSRF(formData, request.headers), checkHoneypot(formData);
  let submission = await parse6(formData, {
    schema: (intent) => LoginFormSchema.transform(async (data, ctx) => {
      if (intent !== "submit")
        return { ...data, user: null };
      let userWithPassword = await prisma.user.findUnique({
        select: { id: !0, password: { select: { hash: !0 } } },
        where: { username: data.username }
      });
      return !userWithPassword || !userWithPassword.password ? (ctx.addIssue({
        code: "custom",
        message: "Invalid username or password"
      }), z8.NEVER) : await bcrypt3.compare(
        data.password,
        userWithPassword.password.hash
      ) ? { ...data, user: { id: userWithPassword.id } } : (ctx.addIssue({
        code: "custom",
        message: "Invalid username or password"
      }), z8.NEVER);
    }),
    async: !0
  });
  if (delete submission.payload.password, submission.intent !== "submit")
    return delete submission.value?.password, json20({ status: "idle", submission });
  if (!submission.value?.user)
    return json20({ status: "error", submission }, { status: 400 });
  let { user, remember, redirectTo } = submission.value, cookieSession = await sessionStorage3.getSession(
    request.headers.get("cookie")
  );
  return cookieSession.set("userId", user.id), redirect12(safeRedirect2(redirectTo), {
    headers: {
      "set-cookie": await sessionStorage3.commitSession(cookieSession, {
        expires: remember ? getSessionExpirationDate() : void 0
      })
    }
  });
}
function Index13() {
  let actionData = useActionData4(), isPending = useIsPending(), [searchParams] = useSearchParams6(), redirectTo = searchParams.get("redirectTo"), [form, fields] = useForm3({
    id: "login-form",
    constraint: getFieldsetConstraint3(LoginFormSchema),
    defaultValue: { redirectTo },
    lastSubmission: actionData?.submission,
    onValidate({ formData }) {
      return parse6(formData, { schema: LoginFormSchema });
    },
    shouldRevalidate: "onBlur"
  });
  return /* @__PURE__ */ jsxDEV54(Fragment22, { children: /* @__PURE__ */ jsxDEV54("div", { className: "flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxDEV54("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: /* @__PURE__ */ jsxDEV54("h2", { className: "mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-600", children: "Sign in to your account" }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 142,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 135,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ jsxDEV54("div", { className: "mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]", children: /* @__PURE__ */ jsxDEV54("div", { className: "bg-[#24292F] px-6 py-12 shadow sm:rounded-lg sm:px-12", children: [
      /* @__PURE__ */ jsxDEV54(Form14, { className: "space-y-6", method: "POST", ...form.props, children: [
        /* @__PURE__ */ jsxDEV54(AuthenticityTokenInput3, {}, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 150,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV54(HoneypotInputs3, {}, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 151,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV54("div", { children: [
          /* @__PURE__ */ jsxDEV54(
            Field,
            {
              labelProps: { children: "Username" },
              inputProps: {
                ...conform3.input(fields.username),
                autoFocus: !0,
                className: "lowercase"
              },
              errors: fields.username.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 153,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV54(
            Field,
            {
              labelProps: { children: "Password" },
              inputProps: conform3.input(fields.password, {
                type: "password"
              }),
              errors: fields.password.errors
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 163,
              columnNumber: 17
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 152,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV54("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxDEV54("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsxDEV54(
              "input",
              {
                id: "remember-me",
                name: "remember-me",
                type: "checkbox",
                className: "h-4 w-4 rounded border-gray-300 focus:ring-indigo-600"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/login.tsx",
                lineNumber: 174,
                columnNumber: 19
              },
              this
            ),
            /* @__PURE__ */ jsxDEV54(
              "label",
              {
                htmlFor: "remember-me",
                className: "ml-3 block text-sm leading-6",
                children: "Remember me"
              },
              void 0,
              !1,
              {
                fileName: "app/routes/login.tsx",
                lineNumber: 180,
                columnNumber: 19
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "app/routes/login.tsx",
            lineNumber: 173,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ jsxDEV54("div", { className: "text-sm leading-6", children: /* @__PURE__ */ jsxDEV54(
            Link2,
            {
              to: "/forgot-password",
              className: "font-semibold text-indigo-600 hover:text-indigo-500",
              children: "Forgot password?"
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 190,
              columnNumber: 19
            },
            this
          ) }, void 0, !1, {
            fileName: "app/routes/login.tsx",
            lineNumber: 188,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 172,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV54(
          "input",
          {
            ...conform3.input(fields.redirectTo, { type: "hidden" })
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 199,
            columnNumber: 15
          },
          this
        ),
        /* @__PURE__ */ jsxDEV54(ErrorList, { errors: form.errors, id: form.errorId }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 203,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV54("div", { children: /* @__PURE__ */ jsxDEV54(
          "button",
          {
            type: "submit",
            className: "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
            disabled: isPending,
            children: "Sign in"
          },
          void 0,
          !1,
          {
            fileName: "app/routes/login.tsx",
            lineNumber: 205,
            columnNumber: 17
          },
          this
        ) }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 204,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 149,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ jsxDEV54("div", { children: [
        /* @__PURE__ */ jsxDEV54("div", { className: "relative mt-10", children: [
          /* @__PURE__ */ jsxDEV54(
            "div",
            {
              className: "absolute inset-0 flex items-center",
              "aria-hidden": "true",
              children: /* @__PURE__ */ jsxDEV54("div", { className: "w-full border-t " }, void 0, !1, {
                fileName: "app/routes/login.tsx",
                lineNumber: 223,
                columnNumber: 19
              }, this)
            },
            void 0,
            !1,
            {
              fileName: "app/routes/login.tsx",
              lineNumber: 219,
              columnNumber: 17
            },
            this
          ),
          /* @__PURE__ */ jsxDEV54("div", { className: "relative flex justify-center text-sm font-medium leading-6", children: /* @__PURE__ */ jsxDEV54("span", { className: " bg-[#24292F]", children: "Or continue with" }, void 0, !1, {
            fileName: "app/routes/login.tsx",
            lineNumber: 226,
            columnNumber: 19
          }, this) }, void 0, !1, {
            fileName: "app/routes/login.tsx",
            lineNumber: 225,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "app/routes/login.tsx",
          lineNumber: 218,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ jsxDEV54("div", { className: "mt-6", children: /* @__PURE__ */ jsxDEV54(GoogleLoginButton_default, {}, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 231,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "app/routes/login.tsx",
          lineNumber: 230,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "app/routes/login.tsx",
        lineNumber: 217,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "app/routes/login.tsx",
      lineNumber: 148,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "app/routes/login.tsx",
      lineNumber: 147,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "app/routes/login.tsx",
    lineNumber: 134,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "app/routes/login.tsx",
    lineNumber: 133,
    columnNumber: 5
  }, this);
}

// app/routes/$.tsx
var __exports = {};
__export(__exports, {
  ErrorBoundary: () => ErrorBoundary8,
  default: () => NotFound,
  loader: () => loader21,
  meta: () => meta18
});
import { Button as Button21, Result as Result2 } from "antd";
import { jsxDEV as jsxDEV55 } from "react/jsx-dev-runtime";
var meta18 = () => [{ title: "Page does not Exist" }];
async function loader21() {
  throw new Response("Not found", { status: 404 });
}
function NotFound() {
  return /* @__PURE__ */ jsxDEV55(ErrorBoundary8, {}, void 0, !1, {
    fileName: "app/routes/$.tsx",
    lineNumber: 23,
    columnNumber: 10
  }, this);
}
function ErrorBoundary8() {
  return /* @__PURE__ */ jsxDEV55(
    GeneralErrorBoundary,
    {
      statusHandlers: {
        404: () => /* @__PURE__ */ jsxDEV55(
          Result2,
          {
            status: "404",
            title: "404",
            subTitle: "Sorry, the page you visited does not exist.",
            extra: /* @__PURE__ */ jsxDEV55(Button21, { type: "primary", href: "/", children: "Back to Home" }, void 0, !1, {
              fileName: "app/routes/$.tsx",
              lineNumber: 36,
              columnNumber: 15
            }, this)
          },
          void 0,
          !1,
          {
            fileName: "app/routes/$.tsx",
            lineNumber: 31,
            columnNumber: 11
          },
          this
        )
      }
    },
    void 0,
    !1,
    {
      fileName: "app/routes/$.tsx",
      lineNumber: 28,
      columnNumber: 5
    },
    this
  );
}

// server-assets-manifest:@remix-run/dev/assets-manifest
var assets_manifest_default = { entry: { module: "/build/entry.client-BDXWHFIQ.js", imports: ["/build/_shared/chunk-QJACIIMR.js", "/build/_shared/chunk-EKWHVRVW.js", "/build/_shared/chunk-ABUHE4LZ.js", "/build/_shared/chunk-7PGEV6FY.js", "/build/_shared/chunk-6NJTHYWJ.js", "/build/_shared/chunk-O4CNLSZA.js", "/build/_shared/chunk-JEBSIHLC.js", "/build/_shared/chunk-DDY2UGSS.js", "/build/_shared/chunk-DPSM2F2X.js"] }, routes: { root: { id: "root", parentId: void 0, path: "", index: void 0, caseSensitive: void 0, module: "/build/root-GHWBX3S7.js", imports: ["/build/_shared/chunk-OPMXSJ7G.js", "/build/_shared/chunk-SWGMOGUJ.js", "/build/_shared/chunk-YCW7IV2T.js", "/build/_shared/chunk-RQWM5IYO.js", "/build/_shared/chunk-CHUWHTDX.js", "/build/_shared/chunk-6MNUWAC4.js", "/build/_shared/chunk-JLCHNSTH.js", "/build/_shared/chunk-5DNDWXBB.js", "/build/_shared/chunk-GSQBLGK7.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/$": { id: "routes/$", parentId: "root", path: "*", index: void 0, caseSensitive: void 0, module: "/build/routes/$-Y323VFJR.js", imports: ["/build/_shared/chunk-T3C34QYF.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/_index": { id: "routes/_index", parentId: "root", path: void 0, index: !0, caseSensitive: void 0, module: "/build/routes/_index-PCO5BLFX.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/admin": { id: "routes/admin", parentId: "root", path: "admin", index: void 0, caseSensitive: void 0, module: "/build/routes/admin-N3NRSRP5.js", imports: ["/build/_shared/chunk-T3C34QYF.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/api.auth.google": { id: "routes/api.auth.google", parentId: "root", path: "api/auth/google", index: void 0, caseSensitive: void 0, module: "/build/routes/api.auth.google-7MSMKWCD.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.auth.google.callback": { id: "routes/api.auth.google.callback", parentId: "routes/api.auth.google", path: "callback", index: void 0, caseSensitive: void 0, module: "/build/routes/api.auth.google.callback-YCLJGSVN.js", imports: void 0, hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/api.collections.$collectionId._index": { id: "routes/api.collections.$collectionId._index", parentId: "root", path: "api/collections/:collectionId", index: !0, caseSensitive: void 0, module: "/build/routes/api.collections.$collectionId._index-US5GIS2K.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.collections.$collectionId.images.$imageId": { id: "routes/api.collections.$collectionId.images.$imageId", parentId: "root", path: "api/collections/:collectionId/images/:imageId", index: void 0, caseSensitive: void 0, module: "/build/routes/api.collections.$collectionId.images.$imageId-NA5HRZ4M.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.collections.$collectionId.images._index": { id: "routes/api.collections.$collectionId.images._index", parentId: "root", path: "api/collections/:collectionId/images", index: !0, caseSensitive: void 0, module: "/build/routes/api.collections.$collectionId.images._index-2G3B4HBB.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/api.collections._index": { id: "routes/api.collections._index", parentId: "root", path: "api/collections", index: !0, caseSensitive: void 0, module: "/build/routes/api.collections._index-4SQ7JBQO.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.image.$imageId._index": { id: "routes/api.image.$imageId._index", parentId: "root", path: "api/image/:imageId", index: !0, caseSensitive: void 0, module: "/build/routes/api.image.$imageId._index-5DCQO3IH.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/api.image.$imageId.comment.$commentId._index": { id: "routes/api.image.$imageId.comment.$commentId._index", parentId: "root", path: "api/image/:imageId/comment/:commentId", index: !0, caseSensitive: void 0, module: "/build/routes/api.image.$imageId.comment.$commentId._index-4JCWWPZD.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.image.$imageId.comment.$commentId.like._index": { id: "routes/api.image.$imageId.comment.$commentId.like._index", parentId: "root", path: "api/image/:imageId/comment/:commentId/like", index: !0, caseSensitive: void 0, module: "/build/routes/api.image.$imageId.comment.$commentId.like._index-6E54EPTP.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.image.$imageId.comment._index": { id: "routes/api.image.$imageId.comment._index", parentId: "root", path: "api/image/:imageId/comment", index: !0, caseSensitive: void 0, module: "/build/routes/api.image.$imageId.comment._index-7OMLPGG6.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.image.$imageId.like._index": { id: "routes/api.image.$imageId.like._index", parentId: "root", path: "api/image/:imageId/like", index: !0, caseSensitive: void 0, module: "/build/routes/api.image.$imageId.like._index-VIQ7IHWR.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/api.user._index": { id: "routes/api.user._index", parentId: "root", path: "api/user", index: !0, caseSensitive: void 0, module: "/build/routes/api.user._index-H32KELQO.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/auth.google": { id: "routes/auth.google", parentId: "root", path: "auth/google", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.google-OYP5VPVB.js", imports: void 0, hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 }, "routes/auth.google.callback": { id: "routes/auth.google.callback", parentId: "routes/auth.google", path: "callback", index: void 0, caseSensitive: void 0, module: "/build/routes/auth.google.callback-RKTQUCKG.js", imports: ["/build/_shared/chunk-2IO63Z26.js", "/build/_shared/chunk-GSQBLGK7.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/checkout": { id: "routes/checkout", parentId: "root", path: "checkout", index: void 0, caseSensitive: void 0, module: "/build/routes/checkout-KOOW2K6N.js", imports: ["/build/_shared/chunk-NC5I7QPS.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/collections.$collectionId": { id: "routes/collections.$collectionId", parentId: "root", path: "collections/:collectionId", index: void 0, caseSensitive: void 0, module: "/build/routes/collections.$collectionId-EP3H3OZA.js", imports: ["/build/_shared/chunk-I2FYZ4N2.js", "/build/_shared/chunk-674GQEZF.js", "/build/_shared/chunk-P5OJEDT2.js", "/build/_shared/chunk-XTSUBOAU.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/collections._index": { id: "routes/collections._index", parentId: "root", path: "collections", index: !0, caseSensitive: void 0, module: "/build/routes/collections._index-NLI6ERLN.js", imports: ["/build/_shared/chunk-674GQEZF.js", "/build/_shared/chunk-XTSUBOAU.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/create._index": { id: "routes/create._index", parentId: "root", path: "create", index: !0, caseSensitive: void 0, module: "/build/routes/create._index-UGFBWA6T.js", imports: ["/build/_shared/chunk-T3C34QYF.js", "/build/_shared/chunk-XTSUBOAU.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/explore": { id: "routes/explore", parentId: "root", path: "explore", index: void 0, caseSensitive: void 0, module: "/build/routes/explore-MZ3ICZAV.js", imports: ["/build/_shared/chunk-MD32CPD7.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/explore.$imageId": { id: "routes/explore.$imageId", parentId: "routes/explore", path: ":imageId", index: void 0, caseSensitive: void 0, module: "/build/routes/explore.$imageId-NKTKALQY.js", imports: ["/build/_shared/chunk-T3C34QYF.js", "/build/_shared/chunk-P5OJEDT2.js", "/build/_shared/chunk-XTSUBOAU.js", "/build/_shared/chunk-YCW7IV2T.js", "/build/_shared/chunk-RQWM5IYO.js", "/build/_shared/chunk-CHUWHTDX.js", "/build/_shared/chunk-6MNUWAC4.js", "/build/_shared/chunk-JLCHNSTH.js", "/build/_shared/chunk-5DNDWXBB.js", "/build/_shared/chunk-GSQBLGK7.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/login": { id: "routes/login", parentId: "root", path: "login", index: void 0, caseSensitive: void 0, module: "/build/routes/login-YBKUVL3U.js", imports: ["/build/_shared/chunk-SEOIET4V.js", "/build/_shared/chunk-MD32CPD7.js", "/build/_shared/chunk-TMALUDUU.js", "/build/_shared/chunk-2IO63Z26.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/logout": { id: "routes/logout", parentId: "root", path: "logout", index: void 0, caseSensitive: void 0, module: "/build/routes/logout-73DJZYKZ.js", imports: void 0, hasAction: !0, hasLoader: !0, hasErrorBoundary: !1 }, "routes/manage": { id: "routes/manage", parentId: "root", path: "manage", index: void 0, caseSensitive: void 0, module: "/build/routes/manage-NIOFOZZF.js", imports: ["/build/_shared/chunk-I2FYZ4N2.js", "/build/_shared/chunk-T3C34QYF.js", "/build/_shared/chunk-P5OJEDT2.js", "/build/_shared/chunk-XTSUBOAU.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/p.$imageId": { id: "routes/p.$imageId", parentId: "root", path: "p/:imageId", index: void 0, caseSensitive: void 0, module: "/build/routes/p.$imageId-5DHPTDHE.js", imports: ["/build/_shared/chunk-T3C34QYF.js", "/build/_shared/chunk-P5OJEDT2.js", "/build/_shared/chunk-XTSUBOAU.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/profile.$userId": { id: "routes/profile.$userId", parentId: "root", path: "profile/:userId", index: void 0, caseSensitive: void 0, module: "/build/routes/profile.$userId-PQOO6N2Z.js", imports: ["/build/_shared/chunk-I2FYZ4N2.js", "/build/_shared/chunk-P5OJEDT2.js", "/build/_shared/chunk-XTSUBOAU.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !0 }, "routes/settings": { id: "routes/settings", parentId: "root", path: "settings", index: void 0, caseSensitive: void 0, module: "/build/routes/settings-P5QZARNM.js", imports: ["/build/_shared/chunk-TMALUDUU.js"], hasAction: !1, hasLoader: !0, hasErrorBoundary: !1 }, "routes/signup": { id: "routes/signup", parentId: "root", path: "signup", index: void 0, caseSensitive: void 0, module: "/build/routes/signup-JSLLOYCY.js", imports: ["/build/_shared/chunk-SEOIET4V.js", "/build/_shared/chunk-MD32CPD7.js", "/build/_shared/chunk-TMALUDUU.js", "/build/_shared/chunk-T3C34QYF.js"], hasAction: !0, hasLoader: !0, hasErrorBoundary: !0 }, "routes/webhook": { id: "routes/webhook", parentId: "root", path: "webhook", index: void 0, caseSensitive: void 0, module: "/build/routes/webhook-VEMSQMMI.js", imports: ["/build/_shared/chunk-NC5I7QPS.js"], hasAction: !0, hasLoader: !1, hasErrorBoundary: !1 } }, version: "3077b34d", hmr: { runtime: "/build/_shared/chunk-JEBSIHLC.js", timestamp: 1704656355004 }, url: "/build/manifest-3077B34D.js" };

// server-entry-module:@remix-run/dev/server-build
var mode = "development", assetsBuildDirectory = "public/build", future = { v3_fetcherPersist: !1 }, publicPath = "/build/", entry = { module: entry_server_exports }, routes = {
  root: {
    id: "root",
    parentId: void 0,
    path: "",
    index: void 0,
    caseSensitive: void 0,
    module: root_exports
  },
  "routes/api.image.$imageId.comment.$commentId.like._index": {
    id: "routes/api.image.$imageId.comment.$commentId.like._index",
    parentId: "root",
    path: "api/image/:imageId/comment/:commentId/like",
    index: !0,
    caseSensitive: void 0,
    module: api_image_imageId_comment_commentId_like_index_exports
  },
  "routes/api.collections.$collectionId.images.$imageId": {
    id: "routes/api.collections.$collectionId.images.$imageId",
    parentId: "root",
    path: "api/collections/:collectionId/images/:imageId",
    index: void 0,
    caseSensitive: void 0,
    module: api_collections_collectionId_images_imageId_exports
  },
  "routes/api.image.$imageId.comment.$commentId._index": {
    id: "routes/api.image.$imageId.comment.$commentId._index",
    parentId: "root",
    path: "api/image/:imageId/comment/:commentId",
    index: !0,
    caseSensitive: void 0,
    module: api_image_imageId_comment_commentId_index_exports
  },
  "routes/api.collections.$collectionId.images._index": {
    id: "routes/api.collections.$collectionId.images._index",
    parentId: "root",
    path: "api/collections/:collectionId/images",
    index: !0,
    caseSensitive: void 0,
    module: api_collections_collectionId_images_index_exports
  },
  "routes/api.collections.$collectionId._index": {
    id: "routes/api.collections.$collectionId._index",
    parentId: "root",
    path: "api/collections/:collectionId",
    index: !0,
    caseSensitive: void 0,
    module: api_collections_collectionId_index_exports
  },
  "routes/api.image.$imageId.comment._index": {
    id: "routes/api.image.$imageId.comment._index",
    parentId: "root",
    path: "api/image/:imageId/comment",
    index: !0,
    caseSensitive: void 0,
    module: api_image_imageId_comment_index_exports
  },
  "routes/api.image.$imageId.like._index": {
    id: "routes/api.image.$imageId.like._index",
    parentId: "root",
    path: "api/image/:imageId/like",
    index: !0,
    caseSensitive: void 0,
    module: api_image_imageId_like_index_exports
  },
  "routes/api.image.$imageId._index": {
    id: "routes/api.image.$imageId._index",
    parentId: "root",
    path: "api/image/:imageId",
    index: !0,
    caseSensitive: void 0,
    module: api_image_imageId_index_exports
  },
  "routes/collections.$collectionId": {
    id: "routes/collections.$collectionId",
    parentId: "root",
    path: "collections/:collectionId",
    index: void 0,
    caseSensitive: void 0,
    module: collections_collectionId_exports
  },
  "routes/api.auth.google.callback": {
    id: "routes/api.auth.google.callback",
    parentId: "routes/api.auth.google",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: api_auth_google_callback_exports
  },
  "routes/api.collections._index": {
    id: "routes/api.collections._index",
    parentId: "root",
    path: "api/collections",
    index: !0,
    caseSensitive: void 0,
    module: api_collections_index_exports
  },
  "routes/auth.google.callback": {
    id: "routes/auth.google.callback",
    parentId: "routes/auth.google",
    path: "callback",
    index: void 0,
    caseSensitive: void 0,
    module: auth_google_callback_exports
  },
  "routes/collections._index": {
    id: "routes/collections._index",
    parentId: "root",
    path: "collections",
    index: !0,
    caseSensitive: void 0,
    module: collections_index_exports
  },
  "routes/explore.$imageId": {
    id: "routes/explore.$imageId",
    parentId: "routes/explore",
    path: ":imageId",
    index: void 0,
    caseSensitive: void 0,
    module: explore_imageId_exports
  },
  "routes/api.auth.google": {
    id: "routes/api.auth.google",
    parentId: "root",
    path: "api/auth/google",
    index: void 0,
    caseSensitive: void 0,
    module: api_auth_google_exports
  },
  "routes/api.user._index": {
    id: "routes/api.user._index",
    parentId: "root",
    path: "api/user",
    index: !0,
    caseSensitive: void 0,
    module: api_user_index_exports
  },
  "routes/profile.$userId": {
    id: "routes/profile.$userId",
    parentId: "root",
    path: "profile/:userId",
    index: void 0,
    caseSensitive: void 0,
    module: profile_userId_exports
  },
  "routes/create._index": {
    id: "routes/create._index",
    parentId: "root",
    path: "create",
    index: !0,
    caseSensitive: void 0,
    module: create_index_exports
  },
  "routes/auth.google": {
    id: "routes/auth.google",
    parentId: "root",
    path: "auth/google",
    index: void 0,
    caseSensitive: void 0,
    module: auth_google_exports
  },
  "routes/p.$imageId": {
    id: "routes/p.$imageId",
    parentId: "root",
    path: "p/:imageId",
    index: void 0,
    caseSensitive: void 0,
    module: p_imageId_exports
  },
  "routes/checkout": {
    id: "routes/checkout",
    parentId: "root",
    path: "checkout",
    index: void 0,
    caseSensitive: void 0,
    module: checkout_exports
  },
  "routes/settings": {
    id: "routes/settings",
    parentId: "root",
    path: "settings",
    index: void 0,
    caseSensitive: void 0,
    module: settings_exports
  },
  "routes/explore": {
    id: "routes/explore",
    parentId: "root",
    path: "explore",
    index: void 0,
    caseSensitive: void 0,
    module: explore_exports
  },
  "routes/webhook": {
    id: "routes/webhook",
    parentId: "root",
    path: "webhook",
    index: void 0,
    caseSensitive: void 0,
    module: webhook_exports
  },
  "routes/_index": {
    id: "routes/_index",
    parentId: "root",
    path: void 0,
    index: !0,
    caseSensitive: void 0,
    module: index_exports
  },
  "routes/logout": {
    id: "routes/logout",
    parentId: "root",
    path: "logout",
    index: void 0,
    caseSensitive: void 0,
    module: logout_exports
  },
  "routes/manage": {
    id: "routes/manage",
    parentId: "root",
    path: "manage",
    index: void 0,
    caseSensitive: void 0,
    module: manage_exports
  },
  "routes/signup": {
    id: "routes/signup",
    parentId: "root",
    path: "signup",
    index: void 0,
    caseSensitive: void 0,
    module: signup_exports
  },
  "routes/admin": {
    id: "routes/admin",
    parentId: "root",
    path: "admin",
    index: void 0,
    caseSensitive: void 0,
    module: admin_exports
  },
  "routes/login": {
    id: "routes/login",
    parentId: "root",
    path: "login",
    index: void 0,
    caseSensitive: void 0,
    module: login_exports
  },
  "routes/$": {
    id: "routes/$",
    parentId: "root",
    path: "*",
    index: void 0,
    caseSensitive: void 0,
    module: __exports
  }
};
export {
  assets_manifest_default as assets,
  assetsBuildDirectory,
  entry,
  future,
  mode,
  publicPath,
  routes
};
//# sourceMappingURL=server.js.map
