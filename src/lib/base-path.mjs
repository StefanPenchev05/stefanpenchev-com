/**
 * @param {string | undefined} [value]
 * @returns {string}
 */
export function normalizeBasePath(value) {
  if (!value || value === "/") return "";

  // Use ordinary URL segments and reject ambiguous paths at build time.
  if (!/^(?:\/[A-Za-z0-9_-][A-Za-z0-9._~-]*)+\/?$/.test(value)) {
    throw new Error("NEXT_PUBLIC_BASE_PATH must be empty or a path such as /portfolio.");
  }

  return value.replace(/\/$/, "");
}
