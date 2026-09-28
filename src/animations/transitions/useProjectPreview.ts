import { useEffect, useRef, type PointerEvent } from "react";
import { gsap } from "../scroll/gsap";
export function useProjectPreview() {
  const ref = useRef<HTMLDivElement>(null);
  const move = useRef<(x: number, y: number) => void>(() => {});
  useEffect(() => {
    const context = gsap.context(() => {
      const xTo = gsap.quickTo(ref.current, "x", {
        duration: 0.45,
        ease: "power3.out",
      });
      const yTo = gsap.quickTo(ref.current, "y", {
        duration: 0.45,
        ease: "power3.out",
      });
      move.current = (x, y) => {
        if (
          !window.matchMedia("(min-width: 1000px) and (hover: hover)").matches
        )
          return;
        const width = ref.current?.offsetWidth || 420;
        const height = ref.current?.offsetHeight || 315;
        const left = Math.max(
          24,
          Math.min(window.innerWidth - width - 30, x + 35),
        );
        const top = Math.max(
          90,
          Math.min(window.innerHeight - height - 25, y - height * 0.4),
        );
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches)
          gsap.set(ref.current, {
            x: window.innerWidth - width - 50,
            y: Math.max(90, (window.innerHeight - height) / 2),
          });
        else {
          xTo(left);
          yTo(top);
        }
      };
    });
    return () => {
      context.revert();
      move.current = () => {};
    };
  }, []);
  const onPointerMove = (event: PointerEvent) => {
    if (event.pointerType === "mouse")
      move.current(event.clientX, event.clientY);
  };
  return { ref, onPointerMove, position: move };
}
