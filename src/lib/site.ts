export const SITE_BASE_PATH = "/stefanpenchev-com/";
export const SITE_URL = `https://stefanpenchev05.github.io${SITE_BASE_PATH}`;

/** Prefix plain HTML links and public files. Router Link/navigate targets stay unprefixed. */
export function sitePath(path: string): string {
  return `${SITE_BASE_PATH}${path.replace(/^\/+/, "")}`;
}
