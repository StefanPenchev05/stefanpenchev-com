import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { renderToStaticMarkup } from "react-dom/server";
import { afterEach, describe, expect, it } from "vitest";
import { Architecture } from "../src/sections/Architecture/Architecture";
import {
  architectureNodes,
  requestSteps,
  immediateDependencies,
} from "../src/data/architecture";
import { requestAtProgress } from "../src/animations/scroll/requestPath";
import { gsap, ScrollTrigger } from "../src/animations/scroll/gsap";
import { setMedia } from "./setup";
let root: Root | undefined;
let host: HTMLDivElement;
async function mount() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <StrictMode>
        <Architecture />
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
describe("Architecture semantics and lifecycle", () => {
  it("renders every layer and explanation as HTML before animation effects run", () => {
    const html = renderToStaticMarkup(<Architecture />);
    const document = new DOMParser().parseFromString(html, "text/html");
    const buttons = [...document.querySelectorAll("button")];
    expect(buttons).toHaveLength(architectureNodes.length);
    for (const node of architectureNodes)
      expect(
        buttons.some((button) => button.textContent?.includes(node.label)),
      ).toBe(true);
    for (const step of requestSteps)
      expect(document.body.textContent).toContain(step.statement);
    expect(document.body.textContent).toContain(
      "not the architecture of a specific project",
    );
    expect(document.querySelector("svg")?.getAttribute("aria-hidden")).toBe(
      "true",
    );
  });
  it("exposes native keyboard buttons and updates the contextual details on focus", async () => {
    setMedia(1440);
    await mount();
    for (const node of architectureNodes) {
      const button = host.querySelector<HTMLButtonElement>(
        `[data-node-id="${node.id}"] button`,
      )!;
      expect(button.type).toBe("button");
      expect(button.tabIndex).toBe(0);
      await act(async () => button.focus());
      expect(button.getAttribute("aria-pressed")).toBe("true");
      expect(
        host.querySelector("#architecture-details")?.textContent,
      ).toContain(node.description);
      for (const dependency of immediateDependencies(node.id))
        expect(
          host
            .querySelector(`[data-node-id="${dependency}"]`)
            ?.getAttribute("data-dependency"),
        ).toBe("true");
    }
    expect(host.querySelector("dialog")).toBeNull();
  });
  it("reduced motion creates no continuous packet tween or transform", async () => {
    setMedia(1440, true);
    await mount();
    expect(host.querySelector("section")?.dataset.packetMotion).toBe("none");
    const packet = host.querySelector("[data-request-packet]")!;
    expect(packet.getAttribute("transform")).toBeNull();
    expect(gsap.getTweensOf(packet)).toHaveLength(0);
    expect(ScrollTrigger.getAll()).toHaveLength(1);
    expect(ScrollTrigger.getAll()[0].animation).toBeUndefined();
    const trigger = ScrollTrigger.getAll()[0];
    for (const [progress, edge] of [
      [0.5, "service-cache"],
      [0.68, "service-database"],
      [0.97, "client-api"],
    ] as const) {
      trigger.progress = progress;
      trigger.vars.onUpdate?.(trigger);
      expect(
        host
          .querySelector(`[data-edge-id="${edge}"]`)
          ?.getAttribute("data-request-active"),
      ).toBe("true");
      expect(packet.getAttribute("transform")).toBeNull();
    }
  });
  it("StrictMode has one trigger and unmount removes it and its attributes", async () => {
    setMedia(1440);
    await mount();
    const section = host.querySelector("section")!;
    expect(ScrollTrigger.getAll()).toHaveLength(1);
    expect(document.querySelectorAll(".pin-spacer")).toHaveLength(0);
    await act(async () => root!.unmount());
    root = undefined;
    expect(ScrollTrigger.getAll()).toHaveLength(0);
    expect(section.hasAttribute("data-packet-motion")).toBe(false);
  });
  it("mobile uses inline node details without pinning or packet movement", async () => {
    setMedia(390);
    await mount();
    expect(ScrollTrigger.getAll()[0].vars.pin).toBeUndefined();
    expect(host.querySelector("section")?.dataset.packetMotion).toBe("none");
    const cache = host.querySelector<HTMLButtonElement>(
      '[data-node-id="cache"] button',
    )!;
    await act(async () => cache.click());
    expect(cache.getAttribute("aria-expanded")).toBe("true");
    const panel = host.querySelector<HTMLElement>(
      "#architecture-details-cache",
    )!;
    expect(panel.hidden).toBe(false);
    expect(panel.textContent).toContain("Cache invalidation");
    for (const button of host.querySelectorAll("[aria-controls]"))
      expect(
        host.querySelector(`#${button.getAttribute("aria-controls")}`),
      ).not.toBeNull();
  });
  it("breakpoint and motion changes replace the trigger without leaking it", async () => {
    setMedia(1440);
    await mount();
    for (const [width, reduced] of [
      [390, false],
      [1440, true],
      [1440, false],
    ] as const) {
      await act(async () => {
        await new Promise((resolve) => setTimeout(resolve, 15));
        setMedia(width, reduced);
      });
      expect(ScrollTrigger.getAll()).toHaveLength(1);
      expect(host.querySelector("section")?.dataset.packetMotion).toBe(
        width >= 900 && !reduced ? "scroll" : "none",
      );
    }
  });
});
describe("conceptual request route", () => {
  it("checks cache before the database and brings the result back to the client", () => {
    expect(requestAtProgress(0.5).to).toBe("cache");
    expect(requestAtProgress(0.58).from).toBe("cache");
    expect(requestAtProgress(0.68).to).toBe("database");
    expect(requestAtProgress(0.9).returning).toBe(true);
    expect(requestAtProgress(1)).toMatchObject({
      x: 340,
      y: 85,
      to: "client",
      step: 4,
    });
  });
  it("is finite and continuous at every segment boundary", () => {
    for (const progress of [
      0, 0.13, 0.28, 0.43, 0.56, 0.63, 0.74, 0.81, 0.88, 0.94, 1,
    ]) {
      const before = requestAtProgress(progress - 1e-8),
        after = requestAtProgress(progress + 1e-8);
      expect(Math.hypot(after.x - before.x, after.y - before.y)).toBeLessThan(
        0.01,
      );
    }
  });
});
