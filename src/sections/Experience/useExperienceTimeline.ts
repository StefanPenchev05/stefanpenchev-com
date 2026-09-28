import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "../../animations/scroll/gsap";
export function useExperienceTimeline(ref: RefObject<HTMLDivElement | null>) {
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    const entries = Array.from(
      root.querySelectorAll<HTMLElement>("[data-experience-entry]"),
    );
    const progress = root.querySelector<HTMLElement>(
      "[data-timeline-progress]",
    );
    const media = gsap.matchMedia();
    media.add(
      {
        always: "(min-width: 0px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduced) return;
        const trigger = ScrollTrigger.create({
          trigger: root,
          start: "top 65%",
          end: "bottom 65%",
          onUpdate: (self) => {
            if (progress) progress.style.transform = `scaleY(${self.progress})`;
            let current = 0;
            entries.forEach((entry, index) => {
              if (entry.offsetTop <= root.offsetHeight * self.progress)
                current = index;
            });
            entries.forEach((entry, index) => {
              entry.dataset.position =
                index === current
                  ? "current"
                  : index < current
                    ? "past"
                    : "next";
            });
          },
        });
        return () => {
          trigger.kill();
          progress?.removeAttribute("style");
          entries.forEach((entry) => delete entry.dataset.position);
        };
      },
    );
    const refresh = () => ScrollTrigger.refresh();
    root.addEventListener("toggle", refresh, true);
    return () => {
      root.removeEventListener("toggle", refresh, true);
      media.revert();
    };
  }, [ref]);
}
