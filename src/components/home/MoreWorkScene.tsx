import { useRef, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { moreProjects } from "@/data/projects";
import { MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { useTransitionGo } from "@/components/layout/PageTransition";

export function MoreWorkScene() {
  const root = useRef<HTMLElement>(null);
  const preview = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const go = useTransitionGo();
  const navigate = useNavigate();

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, () => {
      gsap.utils.toArray<HTMLElement>(".mw-row").forEach((row) => {
        gsap.from(row.querySelector(".mw-name .mask-inner"), {
          yPercent: 110,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 92%", end: "top 65%", scrub: true },
        });
        gsap.fromTo(
          row.querySelector(".mw-rule"),
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: { trigger: row, start: "top 95%", end: "top 70%", scrub: true },
          },
        );
      });
    });
    mm.add("(pointer: fine) and (min-width: 1024px)", () => {
      const xTo = gsap.quickTo(preview.current, "x", { duration: 0.6, ease: "power3" });
      const yTo = gsap.quickTo(preview.current, "y", { duration: 0.6, ease: "power3" });
      const move = (e: PointerEvent) => {
        xTo(e.clientX + 24);
        yTo(e.clientY - 120);
      };
      el.addEventListener("pointermove", move);
      return () => el.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, []);

  const current = active === null ? null : moreProjects[active];

  return (
    <section
      ref={root}
      data-scene="obsidian"
      aria-label="More projects"
      className="relative px-5 py-28 text-ivory md:px-10 md:py-36"
    >
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">03 / More work</p>
          <h2 className="mt-4 font-display text-[clamp(2.4rem,5vw,5rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
            Built from <span className="text-lime">scratch.</span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-slate">
          More work across protocols, mobile backends, .NET, robotics, multilingual websites and
          local AI tools.
        </p>
      </div>
      <ul className="mt-14" onPointerLeave={() => setActive(null)}>
        {moreProjects.map((p, i) => (
          <li key={p.slug} className="mw-row relative">
            <span
              aria-hidden
              className="mw-rule absolute inset-x-0 top-0 h-px origin-left bg-slate/40"
            />
            <a
              href={`/work/${p.slug}`}
              data-cursor="OPEN"
              onPointerEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
              onClick={(e) => {
                if (e.metaKey || e.ctrlKey) return;
                e.preventDefault();
                go(() => navigate({ to: "/work/$slug", params: { slug: p.slug } }), p.name);
              }}
              className="group grid items-baseline gap-2 py-6 transition-colors md:grid-cols-[4rem_1fr_auto] md:gap-8"
            >
              <span className="font-mono text-xs text-lime">{p.index}</span>
              <span>
                <span className="mw-name mask">
                  <span className="mask-inner block font-display text-[clamp(2rem,5.5vw,5.5rem)] font-bold uppercase leading-[0.95] tracking-[-0.04em] transition-transform duration-500 group-hover:translate-x-4">
                    {p.fullName}
                  </span>
                </span>
                <span className="mt-2 block text-sm text-ivory/70">{p.summary}</span>
              </span>
              <span className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
                {p.stack.slice(0, 3).join(" · ")}
                <ArrowUpRight className="h-4 w-4 text-ivory transition-transform duration-500 group-hover:rotate-45" />
              </span>
            </a>
          </li>
        ))}
      </ul>
      <div
        ref={preview}
        aria-hidden
        className={`pointer-events-none fixed left-0 top-0 z-30 hidden aspect-[4/3] w-[22rem] overflow-hidden transition-[opacity,clip-path] duration-500 lg:block ${current ? "opacity-100 [clip-path:inset(0_0_0_0)]" : "opacity-0 [clip-path:inset(50%_0_50%_0)]"}`}
      >
        {current && <ProjectVisual project={current} />}
      </div>
    </section>
  );
}
