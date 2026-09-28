import { act, StrictMode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { LoadBalancerDemo } from "../src/sections/Playground/LoadBalancer/LoadBalancerDemo";
import {
  selectLeastConnectionsServer,
  selectRandomServer,
  selectRoundRobinServer,
} from "../src/sections/Playground/LoadBalancer/simulation/algorithms";
import {
  advanceSimulation,
  createSimulation,
  MAX_EVENTS,
} from "../src/sections/Playground/LoadBalancer/simulation/engine";
import { setMedia } from "./setup";
let visibility: IntersectionObserverCallback;
const disconnect = vi.fn();
let root: Root | undefined;
let host: HTMLDivElement;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(callback: IntersectionObserverCallback) {
        visibility = callback;
      }
      observe() {}
      disconnect = disconnect;
    },
  );
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: false,
  });
});
afterEach(async () => {
  if (root) await act(async () => root!.unmount());
  root = undefined;
  host?.remove();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  disconnect.mockClear();
  setMedia(1440);
});
async function mount() {
  host = document.createElement("div");
  document.body.append(host);
  root = createRoot(host);
  await act(async () =>
    root!.render(
      <StrictMode>
        <LoadBalancerDemo />
      </StrictMode>,
    ),
  );
  await show(true);
}
async function show(value: boolean) {
  await act(async () =>
    visibility(
      [{ isIntersecting: value } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    ),
  );
}
async function click(text: string) {
  await act(async () =>
    Array.from(host.querySelectorAll("button"))
      .find((button) => button.textContent?.startsWith(text))!
      .click(),
  );
}
async function tick(ms: number) {
  await act(async () => vi.advanceTimersByTime(ms));
}
const counters = () =>
  Array.from(host.querySelectorAll("dd")).map((node) =>
    Number(node.textContent),
  );
const log = () => host.querySelector("ol")!.textContent;
it("round robin distributes sequentially and wraps", () => {
  const s = createSimulation(3).servers;
  expect([0, 1, 2, 3, 4].map((i) => selectRoundRobinServer(s, i))).toEqual([
    1, 2, 3, 1, 2,
  ]);
  expect(selectRoundRobinServer([], 0)).toBeUndefined();
});
it("random routing only selects available server ids", () => {
  const s = [
    { id: 2, active: 0, processed: 0 },
    { id: 7, active: 0, processed: 0 },
  ];
  for (const r of [0, 0.2, 0.5, 0.999, 1])
    expect([2, 7]).toContain(selectRandomServer(s, () => r));
  expect(selectRandomServer([])).toBeUndefined();
});
it("least connections selects the minimum and handles ties deterministically", () => {
  const s = createSimulation(3).servers;
  s[0].active = 3;
  s[1].active = 1;
  s[2].active = 2;
  expect(selectLeastConnectionsServer(s)).toBe(2);
  s[2].active = 1;
  expect(selectLeastConnectionsServer(s)).toBe(2);
  expect(selectLeastConnectionsServer([])).toBeUndefined();
});
it("completing jobs decreases active and increases processed without losing requests", () => {
  const s = createSimulation(3);
  for (let i = 0; i < 100; i++)
    advanceSimulation(s, 100, "least-connections", "high", () => 0);
  expect(s.servers.reduce((n, s) => n + s.active + s.processed, 0)).toBe(
    s.total,
  );
  expect(s.servers.reduce((n, s) => n + s.active, 0)).toBe(s.jobs.length);
  expect(s.servers.some((s) => s.processed > 0)).toBe(true);
});
it("caps event history while allowing a long run", () => {
  const s = createSimulation(2);
  for (let i = 0; i < 1000; i++)
    advanceSimulation(s, 100, "round-robin", "high", () => 0);
  expect(s.events).toHaveLength(MAX_EVENTS);
  expect(s.events.at(-1)?.id).toBe(s.total);
  expect(s.jobs.length).toBeLessThan(15);
});
it("server count changes safely reset jobs, counters, events and running state", async () => {
  await mount();
  await click("Start");
  await tick(1600);
  const select = host.querySelectorAll("select")[1];
  await act(async () => {
    select.value = "2";
    select.dispatchEvent(new Event("change", { bubbles: true }));
  });
  expect(host.querySelectorAll("h4")).toHaveLength(2);
  expect(counters()).toEqual([0, 0, 0, 0]);
  expect(log()).toContain("Start a run");
  expect(host.querySelector("[role=status]")?.textContent).toBe("PAUSED");
  await tick(5000);
  expect(counters()).toEqual([0, 0, 0, 0]);
});
it("pause stops new requests and freezes unfinished processing", async () => {
  await mount();
  await click("Start");
  await tick(1000);
  await click("Pause");
  const before = counters(),
    events = log();
  await tick(10000);
  expect(counters()).toEqual(before);
  expect(log()).toBe(events);
});
it("reset clears counters and event history", async () => {
  await mount();
  await click("Start");
  await tick(4000);
  await click("Reset");
  expect(counters()).toEqual([0, 0, 0, 0, 0, 0]);
  expect(log()).toContain("Start a run");
});
it("cleans the single simulation interval and observer on unmount", async () => {
  await mount();
  await click("Start");
  expect(vi.getTimerCount()).toBe(1);
  await act(async () => root!.unmount());
  root = undefined;
  expect(vi.getTimerCount()).toBe(0);
  expect(disconnect).toHaveBeenCalledTimes(2);
});
it("stops offscreen and in hidden tabs, then resumes without a catch-up burst", async () => {
  await mount();
  await click("Start");
  await tick(1000);
  await show(false);
  expect(vi.getTimerCount()).toBe(0);
  const before = log();
  await tick(10000);
  expect(log()).toBe(before);
  await show(true);
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: true,
  });
  await act(async () => document.dispatchEvent(new Event("visibilitychange")));
  expect(vi.getTimerCount()).toBe(0);
  await tick(10000);
  expect(log()).toBe(before);
  Object.defineProperty(document, "hidden", {
    configurable: true,
    value: false,
  });
  await act(async () => document.dispatchEvent(new Event("visibilitychange")));
  await tick(100);
  expect(log()).toBe(before);
});
it("reduced motion keeps routing and counters functional without traveling packets", async () => {
  setMedia(390, true);
  await mount();
  await click("Start");
  await tick(4000);
  expect(counters().some((n) => n > 0)).toBe(true);
  expect(host.querySelectorAll("circle")).toHaveLength(0);
  expect(host.querySelector("[data-destination=true]")).not.toBeNull();
});
it("uses labelled native keyboard controls and updates routing explanation", async () => {
  await mount();
  const selects = host.querySelectorAll("select");
  expect(selects).toHaveLength(3);
  for (const control of [...selects, ...host.querySelectorAll("button")]) {
    control.focus();
    expect(document.activeElement).toBe(control);
    expect(control.tabIndex).toBe(0);
  }
  expect(selects[0].labels?.[0].textContent).toContain("ALGORITHM");
  await act(async () => {
    selects[0].value = "least-connections";
    selects[0].dispatchEvent(new Event("change", { bubbles: true }));
  });
  expect(host.textContent).toContain("fewest active jobs");
  expect(host.querySelector("ol")?.hasAttribute("aria-live")).toBe(false);
});
