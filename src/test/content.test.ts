import { describe, expect, it } from "vitest";
import { getProject, projects } from "@/data/projects";
import { experience } from "@/data/experience";

describe("Approved public claims", () => {
  it("keeps the private DTO platform separate from the public company website", () => {
    const platform = getProject("dto-recruitment-platform")!;
    const website = getProject("dto-company-website")!;
    expect(platform.stack).toEqual(
      expect.arrayContaining(["Angular", "Rust", "PostgreSQL", "Redis"]),
    );
    expect(platform.stack).not.toContain("Go");
    expect(platform.status).toBe("In development");
    expect(platform.links).toEqual([]);
    expect(website.links[0]!.href).toBe("https://dtopartners.com/");
    expect(website.stack).toEqual([]);
  });

  it("limits attribution and makes restricted visitor access explicit", () => {
    const skald = getProject("skald-lab-ops")!;
    expect(skald.role).toMatch(/^Backend developer/);
    expect(skald.stack).toEqual(["Django"]);
    expect(getProject("artaicare")!.links[0]!.label).toBe("Platform sign-in");
    expect(getProject("artaicare")!.period).toContain("20 September 2025");
    expect(getProject("egil")!.links).toEqual([]);
    expect(getProject("egil")!.source).toBe("Private source");
  });

  it("retains the five owner-confirmed additions and unique project routes", () => {
    for (const slug of [
      "the-book-next-door",
      "dns-server-cpp",
      "budget-buddy",
      "lets-talk",
      "autonomous-racing-cars",
    ]) {
      expect(getProject(slug)).toBeDefined();
    }
    expect(projects).toHaveLength(10);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(projects.length);
    expect(experience.find((job) => job.org === "ArtAICare")!.role).toBe("Software Engineer");
    expect(experience.find((job) => job.org === "Skald Solutions")!.meta).toContain("Jul–Oct 2026");
  });
});
