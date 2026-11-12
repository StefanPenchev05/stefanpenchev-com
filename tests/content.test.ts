import { readFile } from "node:fs/promises";
import { describe, expect, it } from "vitest";
import { availability, services } from "../src/content/profile";
import { projects } from "../src/content/projects";
import { assets, publicAssetUrl } from "../src/lib/assets";
import { normalizeBasePath } from "../src/lib/base-path.mjs";

describe("verified portfolio content", () => {
  it("enumerates five distinct project routes and three featured projects", () => {
    expect(projects.map(({ slug }) => slug)).toEqual([
      "dto-recruitment-platform",
      "artaicare",
      "skald-lab-ops",
      "dto-company-website",
      "egil",
    ]);
    expect(projects.filter(({ featured }) => featured).map(({ slug }) => slug))
      .toEqual(["dto-recruitment-platform", "artaicare", "skald-lab-ops"]);
  });

  it("keeps public destinations separate from source visibility and visitor access", () => {
    expect(projects.map(({ visitorAccess, externalLink }) => [visitorAccess, externalLink?.href])).toEqual([
      ["unavailable", undefined],
      ["sign-in", "https://therapy.artaicare.com/auth/signin"],
      ["public homepage only", "https://skaldlab.com/"],
      ["public website", "https://dtopartners.com/"],
      ["internal", undefined],
    ]);
    expect(projects.filter(({ sourceVisibility }) => sourceVisibility === "private").map(({ slug }) => slug))
      .toEqual(["dto-recruitment-platform", "egil"]);
    expect(projects.every(({ sourceLink, media }) => sourceLink === undefined && media === undefined)).toBe(true);
    expect(projects.find(({ slug }) => slug === "dto-company-website")?.technologies).toBeUndefined();
  });

  it("keeps technologies scoped to the project for which they were confirmed", () => {
    expect(projects.map(({ technologies }) => technologies)).toEqual([
      ["Angular", "TypeScript", "Rust", "PostgreSQL", "Redis", "Docker", "Makefile"],
      ["MongoDB", "Express.js", "React", "Node.js", "Python", "Sentence-BERT", "Nginx", "Ubuntu", "SSH"],
      ["Django"],
      undefined,
      ["Ollama", "Retrieval-augmented generation"],
    ]);
  });

  it("shows project dates only for the confirmed ArtAICare contribution period", () => {
    expect(projects.filter(({ period }) => period).map(({ slug, period }) => [slug, period]))
      .toEqual([["artaicare", "January 2025 to 20 September 2025"]]);
  });

  it("preserves fixed employment wording and two freelance services", () => {
    expect(availability.employment.title).toBe("Roles starting January 2027");
    expect(services.map(({ title }) => title)).toEqual(["Complete applications", "Backend and API development"]);
  });
});

describe("public asset paths", () => {
  it.each(["", "/"])("keeps root URLs unprefixed for %j", (basePath) => {
    expect(publicAssetUrl(assets.cv, basePath)).toBe("/files/stefan-penchev-cv.pdf");
  });

  it("normalizes a nested prefix and adds it once", () => {
    expect(publicAssetUrl(assets.portrait, "/preview/portfolio/"))
      .toBe("/preview/portfolio/images/stefan-penchev.png");
  });

  it.each(["portfolio", "//example.com", "/bad//path", "/../path", "/a?q=b", "/a#b", "/%2e%2e"])(
    "rejects an invalid prefix %j",
    (value) => expect(() => normalizeBasePath(value)).toThrow("NEXT_PUBLIC_BASE_PATH"),
  );

  it("locates the supplied PNG and PDF at the configured paths", async () => {
    const png = await readFile(`public${assets.portrait}`);
    expect(png.subarray(1, 4).toString()).toBe("PNG");
    expect([png.readUInt32BE(16), png.readUInt32BE(20), png[25]]).toEqual([800, 800, 6]);

    const pdf = await readFile(`public${assets.cv}`);
    expect(pdf.subarray(0, 5).toString()).toBe("%PDF-");
  });
});
