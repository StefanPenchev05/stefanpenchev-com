import { useEffect } from "react";
import { ScrollTrigger, setScene } from "@/lib/gsap";

/** Watches every [data-scene] block and morphs the page backdrop as it crosses mid-screen. */
export function useSceneController(initial = "obsidian") {
  useEffect(() => {
    setScene(initial);
    const triggers = Array.from(document.querySelectorAll<HTMLElement>("main [data-scene]")).map(
      (el) =>
        ScrollTrigger.create({
          trigger: el,
          start: "top 50%",
          // The chapter stays on screen for its pin distance as well as its height.
          end: () => {
            const pinned = ScrollTrigger.getAll().find(
              (trigger) => trigger.trigger === el && trigger.pin,
            );
            return pinned ? pinned.end + el.offsetHeight - window.innerHeight * 0.5 : "bottom 50%";
          },
          onEnter: () => setScene(el.dataset["scene"]!),
          onEnterBack: () => setScene(el.dataset["scene"]!),
          onRefresh: (trigger) => {
            if (trigger.isActive) setScene(el.dataset["scene"]!);
          },
        }),
    );
    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, [initial]);
}
