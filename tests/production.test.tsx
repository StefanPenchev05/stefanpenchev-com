import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { MemoryRouter } from "react-router-dom";
import { afterEach, expect, it, vi } from "vitest";
import { CaseStudyContent } from "../src/pages/CaseStudy";
import { projects } from "../src/data/projects";
import { profile, site } from "../src/data/profile";
import { Contact } from "../src/sections/Contact/Contact";
import { ProjectMedia, validMedia } from "../src/components/ui/ProjectMedia";
import { RouteEffects } from "../src/components/layout/RouteEffects";
import { SceneBoundary } from "../src/three/Scene/SceneBoundary";
import { Story } from "../src/components/layout/Story";
import { App } from "../src/App";
import { ScrollTrigger } from "../src/animations/scroll/gsap";
import { setMedia } from "./setup";
let root: Root | undefined;
let host: HTMLDivElement;
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  host?.remove();
  document.head.querySelectorAll("[data-test-meta]").forEach((n) => n.remove());
  ScrollTrigger.killAll();
  setMedia(1440);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});
async function mount(node: React.ReactNode, path = "/") {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(<MemoryRouter initialEntries={[path]}>{node}</MemoryRouter>),
  );
}
it("displays each explicit project status independently of optional content", () => {
  for (const status of ["completed", "in-progress", "concept"] as const) {
    const html = renderToStaticMarkup(
      <CaseStudyContent project={{ ...projects[0], status, caseStudy: {} }} />,
    );
    expect(html).toContain(
      status === "concept"
        ? "NOT COMPLETED WORK"
        : status === "completed"
          ? "COMPLETED"
          : "IN PROGRESS",
    );
  }
});
it("missing optional media creates no gallery or empty video", () => {
  const html = renderToStaticMarkup(
    <CaseStudyContent project={{ ...projects[0], caseStudy: {} }} />,
  );
  expect(html).not.toContain("<video");
  expect(html).not.toContain("Project media");
  expect(html).not.toContain("<h2>");
});
it("empty, whitespace, disabled and unsafe contact destinations never produce links", () => {
  for (const href of [undefined, "", "   ", "javascript:alert(1)"]) {
    const html = renderToStaticMarkup(
      <Contact
        items={[
          {
            id: "invalid",
            label: "Contact",
            value: "Test",
            enabled: true,
            href,
          },
        ]}
      />,
    );
    expect(html).not.toContain("<a ");
  }
  expect(
    renderToStaticMarkup(
      <Contact
        items={[
          {
            id: "disabled",
            label: "EMAIL",
            value: profile.email,
            href: `mailto:${profile.email}`,
            enabled: false,
          },
        ]}
      />,
    ),
  ).not.toContain("<a ");
});
it("rejects invalid media and preserves a safe fallback for failed images", async () => {
  expect(validMedia({ type: "image", src: "", alt: "Missing" })).toBe(false);
  expect(
    validMedia({ type: "image", src: "/image.webp", alt: "Image", width: -1 }),
  ).toBe(false);
  expect(validMedia({ type: "image", src: "/image.webp" })).toBe(false);
  await mount(
    <ProjectMedia
      media={{
        type: "image",
        src: "/missing.webp",
        alt: "Unavailable image",
        width: 800,
        height: 600,
      }}
    />,
  );
  const image = host.querySelector("img")!;
  expect(image.width).toBe(800);
  expect(image.height).toBe(600);
  await act(async () => image.dispatchEvent(new Event("error")));
  expect(host.querySelector("img")).toBeNull();
  expect(host.textContent).toContain("Media unavailable");
  expect(host.querySelector("[style]")?.getAttribute("style")).toContain(
    "800 / 600",
  );
});
it("uses user-verified contact hrefs", () => {
  const doc = new DOMParser().parseFromString(
    renderToStaticMarkup(<Contact />),
    "text/html",
  );
  expect(
    [...doc.querySelectorAll("a")].map((a) => a.getAttribute("href")),
  ).toEqual([`mailto:${profile.email}`, profile.github, profile.linkedin]);
});
it("restores accurate home metadata without inventing a canonical domain", async () => {
  for (const [attribute, key] of [
    ["name", "description"],
    ["property", "og:title"],
    ["property", "og:description"],
  ]) {
    const meta = document.createElement("meta");
    meta.setAttribute(attribute, key);
    meta.setAttribute("data-test-meta", "");
    document.head.append(meta);
  }
  await mount(<RouteEffects />);
  expect(document.title).toBe(site.title);
  expect(
    document.querySelector("meta[name=description]")?.getAttribute("content"),
  ).toBe(site.description);
  expect(
    document
      .querySelector('meta[property="og:title"]')
      ?.getAttribute("content"),
  ).toBe(site.title);
  expect(document.querySelector("link[rel=canonical]")).toBeNull();
});
it("direct lazy project entry focuses its heading and supports skip-to-main", async () => {
  setMedia(390, true);
  Object.defineProperty(document, "fonts", {
    configurable: true,
    value: { ready: Promise.resolve() },
  });
  await mount(<App />, "/work/local-context");
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 30));
  });
  expect(host.querySelector("h1")?.textContent).toBe("Local Context");
  expect(document.title).toContain("Local Context — Concept");
  expect(document.activeElement).toBe(host.querySelector("h1"));
  await act(async () =>
    host.querySelector<HTMLAnchorElement>(".skip-link")!.click(),
  );
  expect(document.activeElement).toBe(host.querySelector("main"));
});
it("renders an accessible static fallback after a WebGL subtree failure", async () => {
  vi.spyOn(console, "error").mockImplementation(() => {});
  function Failure(): never {
    throw new Error("test-only simulated GPU failure");
  }
  await mount(
    <SceneBoundary>
      <Failure />
    </SceneBoundary>,
  );
  expect(
    host.querySelector("svg[role=img]")?.getAttribute("aria-label"),
  ).toContain("database and cache");
  expect(host.textContent).not.toContain("GPU failure");
});
it("reduced motion renders the static story without initializing a canvas", async () => {
  setMedia(390, true);
  await mount(<Story />);
  expect(host.querySelector("canvas")).toBeNull();
  expect(host.querySelector("svg[role=img]")).not.toBeNull();
  expect(ScrollTrigger.getAll()).toHaveLength(0);
});
it("video is user-controlled, does not preload, pauses offscreen and cleans up", async () => {
  let callback: IntersectionObserverCallback;
  const disconnect = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        callback = cb;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  const pause = vi
    .spyOn(HTMLMediaElement.prototype, "pause")
    .mockImplementation(() => {});
  await mount(
    <ProjectMedia
      media={{
        type: "video",
        src: "/projects/test/demo.mp4",
        alt: "Demo",
        width: 1280,
        height: 720,
      }}
    />,
  );
  const video = host.querySelector("video")!;
  expect(video.controls).toBe(true);
  expect(video.autoplay).toBe(false);
  expect(video.preload).toBe("none");
  await act(async () =>
    callback!(
      [
        {
          isIntersecting: true,
          intersectionRatio: 0.05,
        } as IntersectionObserverEntry,
      ],
      {} as IntersectionObserver,
    ),
  );
  expect(pause).toHaveBeenCalled();
  await act(async () => root!.unmount());
  root = undefined;
  expect(disconnect).toHaveBeenCalledOnce();
});
