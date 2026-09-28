import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, expect, it } from "vitest";
import { Experience } from "../src/sections/Experience/Experience";
import { ExperienceEntry } from "../src/sections/Experience/ExperienceEntry";
import { experience } from "../src/data/experience";
import { ScrollTrigger } from "../src/animations/scroll/gsap";
import { setMedia } from "./setup";
let root: Root | undefined;
let host: HTMLDivElement;
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  host?.remove();
  ScrollTrigger.killAll();
  setMedia(1440);
});
async function mount() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <StrictMode>
        <Experience />
      </StrictMode>,
    ),
  );
}
it("renders every experience entry from typed data", () => {
  const html = renderToStaticMarkup(<Experience />);
  for (const entry of experience) {
    expect(html).toContain(entry.title);
    expect(html).toContain(entry.summary);
    if (entry.period) expect(html).toContain(entry.period);
  }
});
it("marks every unverified entry as a development placeholder with no invented dates or employers", () => {
  const fixture = {
    id: "placeholder",
    title: "Unverified entry",
    type: "other" as const,
    summary: "Draft",
    placeholder: true,
  };
  expect(renderToStaticMarkup(<ExperienceEntry entry={fixture} />)).toContain(
    "DEVELOPMENT PLACEHOLDER",
  );
  expect(experience).toHaveLength(1);
  expect(experience[0].organization).toBe("University of Luxembourg");
  expect(experience[0].period).toBeUndefined();
  expect(experience[0].type).toBe("education");
  expect(renderToStaticMarkup(<Experience />)).not.toContain(
    "DEVELOPMENT PLACEHOLDER",
  );
});
it("cleans timeline triggers and mutations under StrictMode without pin spacers", async () => {
  await mount();
  expect(ScrollTrigger.getAll()).toHaveLength(1);
  expect(host.querySelector(".pin-spacer")).toBeNull();
  const line = host.querySelector("[data-timeline-progress]")!;
  await act(async () => root!.unmount());
  root = undefined;
  expect(ScrollTrigger.getAll()).toHaveLength(0);
  expect(line.getAttribute("style")).toBeNull();
});
it("keeps reduced-motion experience readable and free of animation triggers", async () => {
  setMedia(390, true);
  await mount();
  expect(ScrollTrigger.getAll()).toHaveLength(0);
  expect(host.querySelectorAll("article")).toHaveLength(experience.length);
  expect(host.querySelector("[data-position]")).toBeNull();
  expect(host.querySelectorAll("summary")).toHaveLength(
    experience.filter(
      (entry) =>
        entry.details?.length || entry.technologies?.length || entry.link,
    ).length,
  );
});
