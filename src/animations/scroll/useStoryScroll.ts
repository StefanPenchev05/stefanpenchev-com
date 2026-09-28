import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "./gsap";
import type { SceneMotion } from "../../three/Scene/types";
export function useStoryScroll(
  root: RefObject<HTMLElement | null>,
  motion: RefObject<SceneMotion>,
) {
  useLayoutEffect(() => {
    if (!root.current) return;
    const media = gsap.matchMedia();
    media.add(
      {
        desktop: "(min-width: 900px)",
        reduce: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduce) {
          motion.current.progress = 1;
          return;
        }
        const desktop = context.conditions?.desktop;
        // CSS sticky pins the visual inside real content. No pin spacer or artificial scroll distance.
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: desktop ? "bottom bottom" : "center top",
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            motion.current.progress = self.progress;
          },
          onRefresh: (self) => {
            motion.current.progress = self.progress;
          },
        });
        root.current
          ?.querySelectorAll<HTMLElement>("[data-story-step]")
          .forEach((step) => {
            gsap.fromTo(
              step,
              { opacity: 0.32, y: desktop ? 18 : 0 },
              {
                opacity: 1,
                y: 0,
                ease: "none",
                scrollTrigger: {
                  trigger: step,
                  start: "top 85%",
                  end: "top 52%",
                  scrub: true,
                  invalidateOnRefresh: true,
                },
              },
            );
          });
      },
      root,
    );
    return () => {
      media.revert();
      motion.current.progress = 0;
    };
  }, [root, motion]);
}
