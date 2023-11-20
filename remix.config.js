/** @type {import('@remix-run/dev').AppConfig} */
import { config } from "@netlify/remix-adapter";

export default {
  serverModuleFormat: "esm",
  ...config,
  ignoredRouteFiles: ["**/.*"],
  serverPlatform: "node",
  server:
    process.env.NETLIFY || process.env.NETLIFY_LOCAL
      ? "./server.ts"
      : undefined,
  serverBuildPath: ".netlify/functions-internal/server.js",
  // v2_routeConvention: false,
  // TODO: Setting postcss = false temporarily....
  postcss: false,
  tailwind: true,
  // For below, reference: https://github.com/ant-design/ant-design-icons/issues/605
  serverDependenciesToBundle: [
    "@radix-ui/themes",
    "@ant-design/icons",
    /^@ant-design\/icons-svg.*/,
    /^rc-util.*/,
  ],
  // serverModuleFormat: "cjs",
  // appDirectory: "app",
  // assetsBuildDirectory: "public/build",
  // publicPath: "/build/",
  // future: {
  //   v2_dev: true,
  //   v2_errorBoundary: true,
  //   v2_meta: true,
  //   v2_normalizeFormMethod: true,
  //   v2_routeConvention: false,
  // },
};
