import { describe, expect, it } from "vitest";

import { getRouter } from "@/router";
import { projects } from "@/data/projects";
import { SITE_BASE_PATH } from "@/lib/site";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches the homepage at the GitHub Pages base path", () => {
    const router = getRouter();

    const location = router.buildLocation({ to: "/", hash: "work" });
    // Route matching uses the internal pathname; href includes the public base path.
    const matches = router.matchRoutes(location.pathname);

    expect(matches.at(-1)?.routeId).toBe("/");
    expect(location.href).toBe(`${SITE_BASE_PATH}#work`);
  });

  it("builds and matches every project URL with the prefix and a directory slash", () => {
    const router = getRouter();
    for (const { slug } of projects) {
      const location = router.buildLocation({ to: "/work/$slug/", params: { slug } });
      expect(location.href).toBe(`${SITE_BASE_PATH}work/${slug}/`);
      const match = router.matchRoutes(location.pathname).at(-1);
      expect(match?.routeId).toBe("/work/$slug");
      expect(match?.params).toMatchObject({ slug });
    }
  });
});
