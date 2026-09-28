import { vi } from "vitest";
let width = 1440;
let reduced = false;
const listeners = new Set<() => void>();
export function setMedia(nextWidth: number, nextReduced = false) {
  width = nextWidth;
  reduced = nextReduced;
  listeners.forEach((listener) => listener());
}
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    media: query,
    get matches() {
      if (query.includes("prefers-reduced-motion")) return reduced;
      const minimum = query.match(/min-width:\s*(\d+)/);
      const maximum = query.match(/max-width:\s*(\d+)/);
      return (
        (!minimum || width >= Number(minimum[1])) &&
        (!maximum || width <= Number(maximum[1]))
      );
    },
    addListener: (listener: () => void) => listeners.add(listener),
    removeListener: (listener: () => void) => listeners.delete(listener),
    addEventListener: (_type: string, listener: () => void) =>
      listeners.add(listener),
    removeEventListener: (_type: string, listener: () => void) =>
      listeners.delete(listener),
  }),
});
window.scrollTo = vi.fn();
Object.assign(globalThis, { IS_REACT_ACT_ENVIRONMENT: true });
