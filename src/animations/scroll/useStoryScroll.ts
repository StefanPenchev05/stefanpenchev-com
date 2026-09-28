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
        const steps = Array.from(
          root.current!.querySelectorAll<HTMLElement>("[data-story-step]"),
        );
        let stops: number[] = [];
        const measure = () => {
          stops = steps.map(
            (step) =>
              step.getBoundingClientRect().top +
              window.scrollY -
              window.innerHeight * 0.57,
          );
        };
        const sync = () => {
          if (stops.length !== 4) return;
          const y = window.scrollY;
          let index = 0;
          while (index < 3 && y >= stops[index + 1]) index++;
          const end =
            index < 3
              ? stops[index + 1]
              : stops[index] + Math.max(1, steps[index].offsetHeight * 0.65);
          const local = Math.max(
            0,
            Math.min(1, (y - stops[index]) / Math.max(1, end - stops[index])),
          );
          motion.current.progress = (index + local) / 4;
        };
        measure();
        // Real passage positions drive the visual; CSS sticky still adds zero pin spacing.
        ScrollTrigger.create({
          trigger: root.current,
          start: "top top",
          end: "bottom bottom",
          invalidateOnRefresh: true,
          onUpdate: sync,
          onRefresh: () => {
            measure();
            sync();
          },
        });
        steps.forEach((step) =>
          gsap.fromTo(
            step,
            { opacity: 0.48, y: 18 },
            {
              opacity: 1,
              y: 0,
              ease: "none",
              scrollTrigger: {
                trigger: step,
                start: "top 85%",
                end: "top 57%",
                scrub: true,
                invalidateOnRefresh: true,
              },
            },
          ),
        );
      },
      root,
    );
    return () => {
      media.revert();
      motion.current.progress = 0;
    };
  }, [root, motion]);
}
