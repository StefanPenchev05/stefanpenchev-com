import { useEffect, useRef, useState } from "react";
import { RotateCcw, Zap } from "lucide-react";
import { MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

type Pt = { bx: number; by: number; x: number; y: number; vx: number; vy: number };

export function PlaygroundScene() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const api = useRef<{ reset: () => void; shatter: () => void } | null>(null);
  const [broken, setBroken] = useState(false);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, () => {
      gsap.from(".pg-line .mask-inner", {
        yPercent: 110,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 80%", end: "top 25%", scrub: true },
      });
    });
    return () => mm.revert();
  }, []);

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    const ctx = c.getContext("2d")!;
    const css = getComputedStyle(document.documentElement);
    const ink = css.getPropertyValue("--obsidian").trim() || "black";
    const hot = css.getPropertyValue("--ivory").trim() || "white";
    let pts: Pt[] = [];
    let w = 0,
      h = 0,
      dpr = 1,
      raf = 0,
      visible = false,
      spring = 0.06;
    const pointer = { x: -9999, y: -9999, down: false };

    const build = () => {
      const r = c.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio, 2);
      w = r.width;
      h = r.height;
      c.width = w * dpr;
      c.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const gap = w < 640 ? 22 : 28;
      pts = [];
      for (let y = gap / 2; y < h; y += gap)
        for (let x = gap / 2; x < w; x += gap) pts.push({ bx: x, by: y, x, y, vx: 0, vy: 0 });
    };
    const frame = () => {
      raf = 0;
      ctx.clearRect(0, 0, w, h);
      const R = pointer.down ? 180 : 120;
      for (const p of pts) {
        const dx = p.x - pointer.x,
          dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < R * R) {
          const d = Math.sqrt(d2) || 1;
          const f = (1 - d / R) * (pointer.down ? 5 : 2.2);
          p.vx += (dx / d) * f;
          p.vy += (dy / d) * f;
        }
        p.vx += (p.bx - p.x) * spring;
        p.vy += (p.by - p.y) * spring;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;
        const off = Math.min(Math.hypot(p.x - p.bx, p.y - p.by) / 30, 1);
        const s = 2 + off * 5;
        ctx.fillStyle = off > 0.15 ? hot : ink;
        ctx.globalAlpha = 0.35 + off * 0.65;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(off * 1.6);
        ctx.fillRect(-s / 2, -s / 2, s, s);
        ctx.restore();
      }
      ctx.globalAlpha = 1;
      if (visible) raf = requestAnimationFrame(frame);
    };
    const start = () => {
      if (!raf && visible) raf = requestAnimationFrame(frame);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    });
    io.observe(c);
    const ro = new ResizeObserver(() => {
      build();
      start();
    });
    ro.observe(c);
    const pos = (e: PointerEvent) => {
      const r = c.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };
    const move = (e: PointerEvent) => pos(e);
    const down = (e: PointerEvent) => {
      pos(e);
      pointer.down = true;
    };
    const up = () => {
      pointer.down = false;
    };
    const leave = () => {
      pointer.x = pointer.y = -9999;
      pointer.down = false;
    };
    c.addEventListener("pointermove", move);
    c.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    c.addEventListener("pointerleave", leave);
    api.current = {
      reset: () => {
        spring = 0.06;
        for (const p of pts) {
          p.vx = 0;
          p.vy = 0;
          p.x = p.bx;
          p.y = p.by;
        }
      },
      shatter: () => {
        spring = 0.004;
        for (const p of pts) {
          p.vx += (Math.random() - 0.5) * 40;
          p.vy += (Math.random() - 0.5) * 40;
        }
      },
    };
    return () => {
      io.disconnect();
      ro.disconnect();
      cancelAnimationFrame(raf);
      c.removeEventListener("pointermove", move);
      c.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      c.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section
      ref={root}
      data-chapter="05"
      data-chapter-name="PLAYGROUND"
      data-scene="coral"
      className="relative px-5 py-28 text-obsidian md:px-10 md:py-36"
    >
      <div className="flex flex-wrap items-end justify-between gap-8">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em]">05 / Always experimenting</p>
          <h2 className="mt-6 font-display text-[clamp(2.6rem,6.5vw,7rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em]">
            <span className="pg-line mask">
              <span className="mask-inner">Always curious.</span>
            </span>
            <span className="pg-line mask">
              <span className="mask-inner text-ivory">Always building.</span>
            </span>
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed">
            Sometimes the best way to understand a system is to build one from scratch.
          </p>
        </div>
      </div>
      <div className="relative mt-12 overflow-hidden border border-obsidian/30" data-cursor="DRAG">
        <canvas
          ref={canvas}
          className="block h-[60vh] min-h-[22rem] w-full touch-none"
          aria-label="Interactive grid: move or press to push the cells around"
          role="img"
        />
        <div className="pointer-events-none absolute left-4 top-4 font-mono text-[10px] uppercase tracking-[0.25em]">
          Go ahead. Break the pattern.
        </div>
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            onClick={() => {
              api.current?.shatter();
              setBroken(true);
            }}
            className="inline-flex items-center gap-2 rounded-full bg-obsidian px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] text-ivory transition-transform hover:scale-105"
          >
            <Zap className="h-3.5 w-3.5" /> Shatter
          </button>
          <button
            onClick={() => {
              api.current?.reset();
              setBroken(false);
            }}
            disabled={!broken}
            className="inline-flex items-center gap-2 rounded-full border border-obsidian px-4 py-2 font-mono text-[11px] uppercase tracking-[0.15em] transition-opacity disabled:opacity-40"
          >
            <RotateCcw className="h-3.5 w-3.5" /> Reset
          </button>
        </div>
      </div>
    </section>
  );
}
