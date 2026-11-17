import { useRef } from "react";
import { DESKTOP, MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

const PHRASES = ["I question.", "I understand.", "I engineer.", "I build."];
const BIO = [
  "I'm Stefan Penchev, a Computer Science student and software developer drawn to full-stack engineering, backend architecture and intelligent applications.",
  "I like taking an idea from architecture to a working product — designing the interfaces, implementing the APIs, connecting the databases and handling deployment.",
  "That has meant AI-assisted therapy software, commercial web platforms, internal management systems, mobile apps and lower-level projects like a DNS server in C++.",
  "Mathematics, algorithms and machine learning keep me curious. What motivates me most is understanding how software works beneath the surface — then improving it.",
];

export function AboutScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(`${MOTION} and ${DESKTOP}`, () => {
      const phrases = gsap.utils.toArray<HTMLElement>(".about-phrase");
      const bios = gsap.utils.toArray<HTMLElement>(".about-bio");
      gsap.set(phrases.slice(1), { yPercent: 110 });
      gsap.set(bios, { opacity: 0.12, y: 20 });
      const tl = gsap.timeline({
        defaults: { ease: "power2.inOut" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=300%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
        },
      });
      tl.from(
        ".about-statement .mask-inner",
        { yPercent: 110, stagger: 0.05, duration: 0.6 },
        0,
      ).to(bios[0]!, { opacity: 1, y: 0, duration: 0.5 }, 0.3);
      phrases.forEach((p, i) => {
        if (i === 0) return;
        const at = i * 1;
        tl.to(phrases[i - 1]!, { yPercent: -110, rotate: -3, duration: 0.6 }, at).fromTo(
          p,
          { yPercent: 110, rotate: 3 },
          { yPercent: 0, rotate: 0, duration: 0.6 },
          at,
        );
        if (bios[i]) tl.to(bios[i]!, { opacity: 1, y: 0, duration: 0.5 }, at + 0.2);
      });
      tl.to(".about-sculpture", { rotate: 220, scale: 1.08, duration: 3.6, ease: "none" }, 0)
        .to(".about-ring", { rotate: -360, duration: 3.6, ease: "none" }, 0)
        .to(
          ".about-counter",
          { innerText: 4, snap: { innerText: 1 }, duration: 3, ease: "none" },
          0,
        )
        .to({}, { duration: 0.4 });
    });
    mm.add(`${MOTION} and (max-width: 1023px)`, () => {
      gsap.utils.toArray<HTMLElement>(".about-phrase, .about-bio").forEach((n) =>
        gsap.from(n, {
          y: 40,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: n, start: "top 90%", end: "top 60%", scrub: true },
        }),
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="about"
      data-chapter="01"
      data-chapter-name="MINDSET"
      data-scene="ivory"
      className="relative overflow-hidden text-obsidian lg:motion-safe:h-[100svh]"
    >
      <div className="grid gap-12 px-5 py-28 md:px-10 lg:h-full lg:grid-cols-12 lg:gap-8 lg:py-24">
        <div className="flex flex-col lg:col-span-7">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">
            01 / The mindset
          </p>
          <h2 className="about-statement mt-6 max-w-3xl font-display text-[clamp(2rem,4.4vw,4.5rem)] font-bold leading-[0.95] tracking-[-0.03em]">
            <span className="mask">
              <span className="mask-inner">
                From <em className="font-normal italic">first principles</em>
              </span>
            </span>
            <span className="mask">
              <span className="mask-inner">
                to <span className="bg-lime px-2">real</span> products.
              </span>
            </span>
          </h2>

          <div
            className="relative mt-14 lg:mt-auto lg:motion-safe:h-[clamp(5rem,10vw,10rem)] lg:motion-safe:overflow-hidden"
            aria-label={PHRASES.join(", ")}
          >
            {PHRASES.map((p, i) => (
              <p
                key={p}
                aria-hidden
                className={`about-phrase origin-left font-display text-[clamp(3rem,7.4vw,8rem)] font-extrabold uppercase leading-[0.95] lg:whitespace-nowrap tracking-[-0.04em] lg:motion-safe:absolute lg:inset-x-0 lg:top-0 ${
                  i === PHRASES.length - 1 ? "text-coral" : ""
                } ${i === 2 ? "text-outline" : ""}`}
              >
                {p}
              </p>
            ))}
          </div>
          <div className="mt-6 hidden items-center gap-4 font-mono text-[10px] uppercase tracking-[0.25em] text-slate lg:flex">
            <span>Phase</span>
            <span className="about-counter text-obsidian">1</span>
            <span>/ 4</span>
            <span className="h-px flex-1 bg-obsidian/20" />
          </div>
        </div>

        <div className="relative flex flex-col justify-between gap-10 lg:col-span-5">
          <div
            className="relative mx-auto aspect-square w-full max-w-[22rem] lg:max-w-[min(18rem,30vh)]"
            aria-hidden
          >
            <Sculpture />
          </div>
          <div className="space-y-5 lg:pl-10">
            {BIO.map((b, i) => (
              <p
                key={i}
                className="about-bio flex gap-4 text-base leading-relaxed lg:text-[clamp(0.95rem,1.15vw,1.1rem)]"
              >
                <span className="mt-1.5 font-mono text-[10px] text-slate">0{i + 1}</span>
                <span>{b}</span>
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Sculpture() {
  const pts = Array.from({ length: 6 }, (_, i): [number, number] => {
    const a = (i / 6) * Math.PI * 2;
    return [150 + Math.cos(a) * 110, 150 + Math.sin(a) * 110];
  });
  return (
    <svg viewBox="0 0 300 300" className="h-full w-full overflow-visible">
      <g className="about-ring" style={{ transformOrigin: "150px 150px" }}>
        <circle
          cx="150"
          cy="150"
          r="140"
          fill="none"
          stroke="var(--obsidian)"
          strokeOpacity="0.2"
          strokeDasharray="2 6"
        />
        <circle cx="290" cy="150" r="5" fill="var(--coral)" />
      </g>
      <g className="about-sculpture" style={{ transformOrigin: "150px 150px" }}>
        {pts.map(([x, y], i) => (
          <g key={i}>
            <line x1={x} y1={y} x2="150" y2="150" stroke="var(--obsidian)" strokeOpacity="0.5" />
            <line
              x1={x}
              y1={y}
              x2={pts[(i + 2) % 6]![0]}
              y2={pts[(i + 2) % 6]![1]}
              stroke="var(--obsidian)"
              strokeOpacity="0.25"
            />
            <rect
              x={x - 14}
              y={y - 9}
              width="28"
              height="18"
              rx="2"
              fill={i === 1 ? "var(--lime)" : "var(--ivory)"}
              stroke="var(--obsidian)"
            />
          </g>
        ))}
        <polygon
          points={pts.map((p) => p.join(",")).join(" ")}
          fill="none"
          stroke="var(--obsidian)"
        />
        <rect x="128" y="128" width="44" height="44" fill="var(--obsidian)" />
        <text
          x="150"
          y="155"
          textAnchor="middle"
          fontFamily="JetBrains Mono"
          fontSize="10"
          fill="var(--lime)"
        >
          {"</>"}
        </text>
      </g>
    </svg>
  );
}

export function BuildBridge() {
  const root = useRef<HTMLDivElement>(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
      });
      tl.fromTo(".bridge-word", { xPercent: 30, scale: 0.9 }, { xPercent: -60, scale: 1.6 }).fromTo(
        ".bridge-sub",
        { xPercent: -20 },
        { xPercent: 20 },
        0,
      );
    });
    return () => mm.revert();
  }, []);
  return (
    <div
      ref={root}
      data-scene="obsidian"
      className="relative overflow-hidden py-20 text-ivory md:py-32"
      aria-hidden
    >
      <div className="bridge-word whitespace-nowrap font-display text-[clamp(8rem,32vw,34rem)] font-extrabold uppercase leading-[0.8] tracking-[-0.05em]">
        Build<span className="text-lime">→</span>
      </div>
      <div className="bridge-sub mt-6 whitespace-nowrap font-mono text-xs uppercase tracking-[0.4em] text-slate">
        compile · ship · iterate · compile · ship · iterate · compile · ship · iterate
      </div>
    </div>
  );
}
