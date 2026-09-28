import { existsSync, readFileSync } from "node:fs";
import { expect, it } from "vitest";
import { projects } from "../src/data/projects";
it("project placeholders have unique routable slugs, real preview files and honest status", () => {
  expect(new Set(projects.map((p) => p.slug)).size).toBe(projects.length);
  expect(projects.length).toBeGreaterThanOrEqual(4);
  for (const project of projects) {
    expect(project.slug).toMatch(/^[a-z0-9-]+$/);
    expect(project.status).toBe("concept");
    expect(project.caseStudy.overview).toBeTruthy();
    expect(project.preview.alt).toBeTruthy();
    expect(existsSync(`public${project.preview.src}`)).toBe(true);
    expect(readFileSync(`public${project.preview.src}`, "utf8")).toContain(
      "<svg",
    );
  }
});
