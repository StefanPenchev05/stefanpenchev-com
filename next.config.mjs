import { normalizeBasePath } from "./src/lib/base-path.mjs";

/** @type {import("next").NextConfig} */
const config = {
  output: "export",
  trailingSlash: true,
  basePath: normalizeBasePath(process.env.NEXT_PUBLIC_BASE_PATH),
  images: { unoptimized: true },
};

export default config;
