import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useLayoutEffect } from "react";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

export { gsap, ScrollTrigger };

export const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect;

export const MOTION = "(prefers-reduced-motion: no-preference)";
export const DESKTOP = "(min-width: 1024px)";

export function setScene(scene: string) {
  if (typeof document !== "undefined") document.documentElement.dataset["scene"] = scene;
}
