/** @type {import('@remix-run/dev').AppConfig} */

export default {
  serverModuleFormat: "esm",
  ignoredRouteFiles: ["**/.*"],
  serverPlatform: "node",
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
  browserNodeBuiltinsPolyfill: { modules: { crypto: true } },
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
