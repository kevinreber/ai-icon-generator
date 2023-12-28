/** @type {import('@remix-run/dev').AppConfig} */
import { config } from "@netlify/remix-adapter";
import { unstable_vitePlugin as remix } from "@remix-run/dev";
import { defineConfig } from "vite";
import { installGlobals } from "@remix-run/node";
import tsconfigPaths from "vite-tsconfig-paths";

installGlobals();

export default defineConfig({
  plugins: [
    remix({
      serverModuleFormat: "esm",
      ...config,
      ignoredRouteFiles: ["**/.*"],
      // serverPlatform: "node",
      // server:
      //   process.env.NETLIFY || process.env.NETLIFY_LOCAL
      //     ? "./server.ts"
      //     : undefined,
      serverBuildPath: ".netlify/functions-internal/server.js",
      // v2_routeConvention: false,
      // For below, reference: https://github.com/ant-design/ant-design-icons/issues/605
      // browserNodeBuiltinsPolyfill: { modules: { crypto: true } },
      // serverModuleFormat: "cjs",
      // appDirectory: "app",
      // assetsBuildDirectory: "public/build",
      // publicPath: "/build/",
    }),
    tsconfigPaths(),
  ],
  ssr: {
    // Looks into thread for reference: https://github.com/remix-run/remix/issues/7865
    noExternal: [
      "@radix-ui/themes",
      "@ant-design/icons",
      /^@ant-design\/icons-svg.*/,
      /^rc-util.*/,
    ],
  },
});
