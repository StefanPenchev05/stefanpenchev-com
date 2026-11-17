import { useEffect, useRef, useState } from "react";

export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);
  const [chapter, setChapter] = useState("00");
  const [name, setName] = useState("");
  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? window.scrollY / max : 0;
      if (bar.current) bar.current.style.transform = `scaleY(${p})`;
      const secs = Array.from(document.querySelectorAll<HTMLElement>("[data-chapter]"));
      let current: HTMLElement | undefined;
      for (const s of secs)
        if (s.getBoundingClientRect().top <= window.innerHeight * 0.5) current = s;
      if (current) {
        setChapter(current.dataset["chapter"] ?? "00");
        setName(current.dataset["chapterName"] ?? "");
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed right-5 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 text-ivory mix-blend-difference md:flex"
    >
      <span className="font-mono text-[10px] tracking-[0.2em]">{chapter}</span>
      <div className="relative h-40 w-px bg-ivory/25">
        <div
          ref={bar}
          className="absolute inset-0 origin-top bg-ivory"
          style={{ transform: "scaleY(0)" }}
        />
      </div>
      <span className="font-mono text-[10px] tracking-[0.2em] [writing-mode:vertical-rl]">
        {name}
      </span>
    </div>
  );
}
