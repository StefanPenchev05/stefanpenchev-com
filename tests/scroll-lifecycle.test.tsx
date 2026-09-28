import { act, StrictMode, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, describe, expect, it } from "vitest";
import { ScrollTrigger } from "../src/animations/scroll/gsap";
import { useStoryScroll } from "../src/animations/scroll/useStoryScroll";
import { setMedia } from "./setup";
function Harness() {
  const root = useRef<HTMLDivElement>(null);
  const motion = useRef({ progress: 0, pointerX: 0, pointerY: 0 });
  useStoryScroll(root, motion);
  return (
    <div ref={root}>
      {[1, 2, 3, 4].map((n) => (
        <article data-story-step key={n}>
          Readable story {n}
        </article>
      ))}
    </div>
  );
}
let root: Root | undefined;
let host: HTMLDivElement;
async function mount() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <StrictMode>
        <Harness />
      </StrictMode>,
    ),
  );
}
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  host?.remove();
  ScrollTrigger.killAll();
  setMedia(1440);
});
describe("real GSAP lifecycle (DOM emulation, not visual layout)", () => {
  it("does not duplicate triggers under StrictMode and removes them on unmount", async () => {
    setMedia(1440);
    await mount();
    expect(ScrollTrigger.getAll()).toHaveLength(5);
    expect(document.querySelectorAll(".pin-spacer")).toHaveLength(0);
    await act(async () => root!.unmount());
    root = undefined;
    expect(ScrollTrigger.getAll()).toHaveLength(0);
  });
  it("keeps all four passages readable without desktop triggers on mobile", async () => {
    setMedia(390);
    await mount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(host.querySelectorAll("article")).toHaveLength(4);
    expect(host.querySelector("article")?.style.opacity).toBe("");
  });
  it("does not create scroll animation for reduced motion", async () => {
    setMedia(1440, true);
    await mount();
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(host.textContent).toContain("Readable story 4");
  });
  it("reverts and recreates triggers as the desktop breakpoint changes", async () => {
    setMedia(1440);
    await mount();
    expect(ScrollTrigger.getAll()).toHaveLength(5);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      setMedia(390);
    });
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    await act(async () => {
      await new Promise((resolve) => setTimeout(resolve, 10));
      setMedia(1440);
    });
    expect(ScrollTrigger.getAll()).toHaveLength(5);
  });
});
