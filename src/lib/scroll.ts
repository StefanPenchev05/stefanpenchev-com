import type Lenis from "lenis";

let instance: Lenis | null = null;

export function setLenis(l: Lenis | null) {
  instance = l;
}

export function scrollToTarget(target: string | number | HTMLElement, immediate = false) {
  if (instance) {
    instance.scrollTo(target, { immediate, duration: 1.4 });
    return;
  }
  if (typeof target === "number")
    window.scrollTo({ top: target, behavior: immediate ? "auto" : "smooth" });
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target;
    el?.scrollIntoView({ behavior: immediate ? "auto" : "smooth" });
  }
}
