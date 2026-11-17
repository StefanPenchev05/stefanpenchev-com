import { useEffect, useRef, useState } from "react";
import { useLocation } from "@tanstack/react-router";
import { gsap } from "@/lib/gsap";

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [label, setLabel] = useState("");
  const [hovering, setHovering] = useState(false);

  const { pathname } = useLocation();
  useEffect(() => {
    setLabel("");
    setHovering(false);
  }, [pathname]);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return;
    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled || !dot.current || !ring.current) return;
    document.documentElement.classList.add("has-cursor");
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.12, ease: "power3" });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.12, ease: "power3" });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.5, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.5, ease: "power3" });
    const move = (e: PointerEvent) => {
      if (root.current) root.current.style.opacity = "1";
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = (e.target as HTMLElement | null)?.closest?.(
        "[data-cursor], a, button, [role=button]",
      ) as HTMLElement | null;
      setHovering(!!t);
      setLabel(t?.dataset["cursor"] ?? "");
    };
    const leave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const enter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });
    window.addEventListener("pointermove", move);
    document.addEventListener("pointerleave", leave);
    document.addEventListener("pointerenter", enter);
    return () => {
      document.documentElement.classList.remove("has-cursor");
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", leave);
      document.removeEventListener("pointerenter", enter);
    };
  }, [enabled]);

  if (!enabled) return null;
  const big = !!label;
  return (
    <div
      ref={root}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[100] mix-blend-difference"
      style={{ opacity: 0 }}
    >
      <div ref={dot} className="absolute left-0 top-0 -ml-1 -mt-1 h-2 w-2 rounded-full bg-lime" />
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ivory transition-all duration-300 ease-out ${
            big ? "h-24 w-24 border-lime bg-lime" : hovering ? "h-14 w-14" : "h-9 w-9 opacity-60"
          }`}
        >
          <span
            className={`font-mono text-[10px] tracking-[0.2em] text-obsidian transition-opacity ${big ? "opacity-100" : "opacity-0"}`}
          >
            {label}
          </span>
        </div>
      </div>
    </div>
  );
}
