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
          end: "bottom 50%",
          onToggle: (s) => s.isActive && setScene(el.dataset["scene"]!),
        }),
    );
    ScrollTrigger.refresh();
    return () => triggers.forEach((t) => t.kill());
  }, [initial]);
}
