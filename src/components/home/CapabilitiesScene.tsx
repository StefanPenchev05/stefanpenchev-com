import { useRef } from "react";
import { skillGroups } from "@/data/skills";
import { DESKTOP, MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

type Box = [number, number, number, number, string]; // left, top, width, height (%), radius

const LAYOUTS: Box[][] = [
  // interface
  [
    [0, 0, 100, 8, "6px"],
    [0, 11, 22, 89, "6px"],
    [25, 11, 75, 40, "6px"],
    [25, 54, 23, 22, "6px"],
    [51, 54, 23, 22, "6px"],
    [77, 54, 23, 22, "6px"],
    [25, 79, 49, 21, "6px"],
    [77, 79, 23, 21, "6px"],
    [90, 2, 6, 4, "999px"],
  ],
  // service diagram
  [
    [2, 8, 22, 16, "4px"],
    [2, 42, 22, 16, "4px"],
    [2, 76, 22, 16, "4px"],
    [39, 25, 22, 16, "4px"],
    [39, 59, 22, 16, "4px"],
    [76, 8, 22, 16, "4px"],
    [76, 42, 22, 16, "4px"],
    [76, 76, 22, 16, "4px"],
    [46, 3, 8, 6, "999px"],
  ],
  // layered systems
  [
    [8, 10, 34, 46, "2px"],
    [52, 4, 26, 26, "999px"],
    [60, 40, 34, 50, "2px"],
    [18, 62, 20, 28, "2px"],
    [40, 30, 14, 18, "999px"],
    [80, 14, 10, 12, "2px"],
    [4, 70, 10, 14, "999px"],
    [44, 70, 12, 22, "2px"],
    [32, 48, 22, 30, "999px"],
  ],
  // neural network
  [
    [46, 4, 8, 10.6, "999px"],
    [78, 18, 8, 10.6, "999px"],
    [86, 48, 8, 10.6, "999px"],
    [74, 78, 8, 10.6, "999px"],
    [44, 86, 8, 10.6, "999px"],
    [14, 76, 8, 10.6, "999px"],
    [6, 46, 8, 10.6, "999px"],
    [16, 16, 8, 10.6, "999px"],
    [41, 39, 18, 24, "999px"],
  ],
];

const STATES = skillGroups.map((g, i) => ({ ...g, layout: LAYOUTS[i]! }));

const NODE_LABELS = ["UI", "API", "GO", "NODE", "SQL", "MONGO", "REDIS", "NGINX", "ML"];
const ROT = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [-8, 0, 6, -14, 0, 18, 0, 10, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];
const BACKEND_LINKS =
  "M24 16 L39 33 M24 50 L39 33 M24 50 L39 67 M24 84 L39 67 M61 33 L76 16 M61 33 L76 50 M61 67 L76 50 M61 67 L76 84";
const AI_LINKS =
  "M50 9 L82 23 L90 53 L78 83 L48 91 L18 81 L10 51 L20 21 Z M50 9 L50 51 M82 23 L50 51 M90 53 L50 51 M78 83 L50 51 M48 91 L50 51 M18 81 L50 51 M10 51 L50 51 M20 21 L50 51 M20 21 L90 53 M82 23 L18 81";

export function CapabilitiesScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(`${MOTION} and ${DESKTOP}`, () => {
      const pieces = gsap.utils.toArray<HTMLElement>(".cap-piece");
      const titles = gsap.utils.toArray<HTMLElement>(".cap-title");
      const infos = gsap.utils.toArray<HTMLElement>(".cap-info");
      gsap.set(titles.slice(1), { yPercent: 110 });
      gsap.set(infos.slice(1), { autoAlpha: 0, y: 30 });
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=400%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      // exploded → assembled interface
      tl.from(
        pieces,
        {
          x: (i) => (i % 2 ? 1 : -1) * (80 + i * 25),
          y: (i) => ((i % 3) - 1) * 120,
          rotate: (i) => (i % 2 ? 14 : -12),
          opacity: 0.2,
          duration: 1,
          stagger: 0.03,
        },
        0,
      );
      STATES.forEach((s, si) => {
        if (si === 0) return;
        const at = si * 1.4;
        pieces.forEach((p, i) => {
          const [l, t, w, h, r] = s.layout[i]!;
          tl.to(
            p,
            {
              left: `${l}%`,
              top: `${t}%`,
              width: `${w}%`,
              height: `${h}%`,
              borderRadius: r,
              rotate: ROT[si]![i]!,
              duration: 1,
            },
            at + i * 0.02,
          );
        });
        tl.to(titles[si - 1]!, { yPercent: -110, duration: 0.6 }, at)
          .to(titles[si]!, { yPercent: 0, duration: 0.6 }, at + 0.1)
          .to(infos[si - 1]!, { autoAlpha: 0, y: -30, duration: 0.4 }, at)
          .to(infos[si]!, { autoAlpha: 1, y: 0, duration: 0.5 }, at + 0.35)
          .to(".cap-count", { innerText: si + 1, snap: { innerText: 1 }, duration: 0.3 }, at + 0.3);
      });
      tl.fromTo(
        ".cap-links-backend",
        { strokeDashoffset: 1 },
        { strokeDashoffset: 0, duration: 0.8 },
        1.8,
      )
        .to(".cap-links-backend", { opacity: 0, duration: 0.4 }, 2.8)
        .to(".cap-glow", { opacity: (i) => (i === 1 || i === 4 ? 1 : 0), duration: 0.5 }, 2.9)
        .to(".cap-coral", { opacity: (i) => (i === 2 || i === 8 ? 1 : 0), duration: 0.5 }, 2.9)
        .to(".cap-coral", { opacity: 0, duration: 0.4 }, 4.2)
        .to(".cap-glow", { opacity: (i) => (i === 8 || i % 3 === 0 ? 1 : 0), duration: 0.5 }, 4.3)
        .fromTo(
          ".cap-links-ai",
          { strokeDashoffset: 1, opacity: 1 },
          { strokeDashoffset: 0, duration: 0.9 },
          4.5,
        )
        .to({}, { duration: 0.5 });

      const stage = el.querySelector<HTMLElement>(".cap-stage")!;
      const rx = gsap.quickTo(stage, "rotationX", { duration: 0.8, ease: "power3" });
      const ry = gsap.quickTo(stage, "rotationY", { duration: 0.8, ease: "power3" });
      const move = (e: PointerEvent) => {
        rx((e.clientY / window.innerHeight - 0.5) * -10);
        ry((e.clientX / window.innerWidth - 0.5) * 14);
      };
      window.addEventListener("pointermove", move);
      return () => window.removeEventListener("pointermove", move);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      data-chapter="02"
      data-chapter-name="TOOLKIT"
      data-scene="obsidian"
      className="grain relative overflow-hidden text-ivory lg:motion-safe:h-[100svh]"
    >
      <div className="px-5 pt-24 md:px-10 lg:absolute lg:inset-x-0 lg:top-0">
        <div className="flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">
              02 / The toolkit
            </p>
            <h2 className="mt-4 font-display text-[clamp(2.5rem,5.5vw,5.5rem)] font-extrabold uppercase leading-[0.88] tracking-[-0.04em]">
              Across the <span className="text-lime">whole stack.</span>
            </h2>
          </div>
          <p className="hidden max-w-xs text-sm leading-relaxed text-slate md:block">
            I want to understand the entire system — not just make one part of it work.
          </p>
        </div>
      </div>

      {/* Desktop pinned system */}
      <div className="hidden h-full grid-cols-12 items-center gap-8 px-10 pt-40 lg:grid lg:motion-reduce:hidden">
        <div className="col-span-5">
          <div className="flex items-center gap-3 font-mono text-xs text-slate">
            <span className="text-lime">
              0<span className="cap-count">1</span>
            </span>{" "}
            / 04
            <span className="h-px w-16 bg-slate/40" />
          </div>
          <div className="relative mt-4 h-[clamp(4rem,8vw,8rem)] overflow-hidden">
            {STATES.map((s) => (
              <h3
                key={s.key}
                className="cap-title absolute inset-0 font-display text-[clamp(3.5rem,7.5vw,8rem)] font-extrabold uppercase leading-none tracking-[-0.04em]"
              >
                {s.title}
              </h3>
            ))}
          </div>
          <div className="relative mt-6 h-60">
            {STATES.map((s) => (
              <div key={s.key} className="cap-info absolute inset-0">
                <p className="max-w-md text-lg leading-snug text-ivory/85">{s.line}</p>
                <ul className="mt-5 flex max-w-md flex-wrap gap-2">
                  {s.tech.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-slate/40 px-3 py-1 font-mono text-[11px] text-ivory/80"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-7 flex justify-center [perspective:1200px]" aria-hidden>
          <div className="cap-stage relative aspect-[4/3] w-full max-w-[44rem] [transform-style:preserve-3d] max-h-[62vh]">
            <svg
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="absolute inset-0 h-full w-full overflow-visible"
            >
              <path
                className="cap-links-backend"
                d={BACKEND_LINKS}
                pathLength={1}
                fill="none"
                stroke="var(--lime)"
                strokeWidth="0.35"
                strokeDasharray="1"
                strokeDashoffset="1"
                vectorEffect="non-scaling-stroke"
              />
              <path
                className="cap-links-ai"
                d={AI_LINKS}
                pathLength={1}
                fill="none"
                stroke="var(--lime)"
                strokeOpacity="0.6"
                strokeWidth="0.3"
                strokeDasharray="1"
                strokeDashoffset="1"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
            {STATES[0]!.layout.map(([l, t, w, h, r], i) => (
              <div
                key={i}
                className="cap-piece absolute overflow-hidden border border-ivory/25 bg-ivory/[0.06]"
                style={{
                  left: `${l}%`,
                  top: `${t}%`,
                  width: `${w}%`,
                  height: `${h}%`,
                  borderRadius: r,
                }}
              >
                <div
                  className={`cap-glow absolute inset-0 bg-lime ${i === 2 || i === 8 ? "opacity-100" : "opacity-0"}`}
                  style={{ opacity: i === 8 ? 1 : i === 2 ? 0.9 : 0 }}
                />
                <div className="cap-coral absolute inset-0 bg-coral opacity-0" />
                <div className="absolute left-2 top-2 font-mono text-[8px] text-ivory/50 mix-blend-difference">
                  {NODE_LABELS[i]}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile / reduced alternative */}
      <div className="space-y-12 px-5 pb-24 pt-14 md:px-10 lg:hidden lg:motion-reduce:block">
        {STATES.map((s, i) => (
          <article key={s.key} className="border-t border-slate/30 pt-6">
            <p className="font-mono text-xs text-lime">0{i + 1} / 04</p>
            <h3 className="mt-2 font-display text-5xl font-extrabold uppercase tracking-[-0.04em]">
              {s.title}
            </h3>
            <p className="mt-3 text-ivory/85">{s.line}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {s.tech.map((t) => (
                <li
                  key={t}
                  className="rounded-full border border-slate/40 px-3 py-1 font-mono text-[11px]"
                >
                  {t}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
}
