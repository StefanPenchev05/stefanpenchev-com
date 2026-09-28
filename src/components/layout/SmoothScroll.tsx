import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "../../animations/scroll/gsap";
import { useMediaQuery } from "../../hooks/useMediaQuery";
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reducedMotion = useMediaQuery("(prefers-reduced-motion: reduce)");
  const touch = useMediaQuery("(pointer: coarse)");
  useEffect(() => {
    // Native scrolling on touch and reduced motion. Exactly one ticker on desktop.
    if (reducedMotion || touch) return;
    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
      autoRaf: false,
      anchors: { offset: -84 },
      prevent: (node) => node.closest("dialog") !== null,
    });
    const update = (time: number) => lenis.raf(time * 1000);
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(update);
    return () => {
      gsap.ticker.remove(update);
      lenis.off("scroll", ScrollTrigger.update);
      lenis.destroy();
    };
  }, [reducedMotion, touch]);
  useEffect(() => {
    let active = true;
    const refresh = () => {
      if (active) ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    return () => {
      active = false;
    };
  }, []);
  return <>{children}</>;
}
