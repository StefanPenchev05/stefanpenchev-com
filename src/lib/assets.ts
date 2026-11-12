import { normalizeBasePath } from "./base-path.mjs";

export const assets = {
  portrait: "/images/stefan-penchev.png",
  cv: "/files/stefan-penchev-cv.pdf",
} as const;

export function publicAssetUrl(
  path: `/images/${string}` | `/files/${string}`,
  basePath = process.env.NEXT_PUBLIC_BASE_PATH,
): string {
  return normalizeBasePath(basePath) + path;
}
