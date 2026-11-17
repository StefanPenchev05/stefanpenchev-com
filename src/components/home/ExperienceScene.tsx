import { useRef } from "react";
import { experience } from "@/data/experience";
import { education, languages } from "@/data/education";
import { MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

import { deliverySkills } from "@/data/skills";

const VALUES = ["First principles", "Curiosity", "Collaboration", "Craft"];

export function ExperienceScene() {
  const root = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, () => {
      gsap.fromTo(
        ".exp-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: ".exp-list", start: "top 60%", end: "bottom 60%", scrub: true },
        },
      );
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: item,
            start: "top 62%",
            end: "bottom 62%",
            toggleClass: "is-active",
          },
        });
        gsap.from(item.querySelector(".tl-role .mask-inner"), {
          yPercent: 110,
          ease: "power3.out",
          scrollTrigger: { trigger: item, start: "top 85%", end: "top 60%", scrub: true },
        });
      });
      gsap.from(".exp-value", {
        yPercent: 110,
        stagger: 0.25,
        ease: "none",
        scrollTrigger: { trigger: ".exp-values", start: "top 85%", end: "bottom 50%", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".edu-row").forEach((row) =>
        gsap.from(row.querySelector(".edu-name"), {
          yPercent: 110,
          ease: "power3.out",
          scrollTrigger: { trigger: row, start: "top 90%", end: "top 60%", scrub: true },
        }),
      );
      gsap.fromTo(
        ".exp-big",
        { xPercent: 10 },
        {
          xPercent: -25,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        },
      );
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="experience"
      data-chapter="04"
      data-chapter-name="JOURNEY"
      data-scene="ivory"
      className="relative overflow-hidden px-5 py-28 text-obsidian md:px-10 md:py-40"
    >
      <div
        aria-hidden
        className="exp-big pointer-events-none absolute -right-10 top-20 select-none whitespace-nowrap font-display text-[24vw] font-extrabold leading-none tracking-[-0.06em] text-obsidian/[0.04]"
      >
        SYSTEMS
      </div>
      <div className="relative grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">
              04 / The journey
            </p>
            <h2 className="mt-6 font-display text-[clamp(3rem,6vw,6.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em]">
              Real projects.
              <br />
              <span className="text-coral">Real</span> experience.
            </h2>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-obsidian/70">
              Part-time engineering, internships and teaching, with dates and roles from my CV.
            </p>
          </div>
        </div>
        <ol className="exp-list relative lg:col-span-7">
          <span aria-hidden className="absolute bottom-0 left-0 top-0 w-px bg-obsidian/15" />
          <span
            aria-hidden
            className="exp-line absolute bottom-0 left-0 top-0 w-[2px] origin-top bg-coral"
          />
          {experience.map((it) => (
            <li key={it.org} className="timeline-item relative pb-16 pl-8 md:pl-14">
              <span
                aria-hidden
                className="absolute -left-[5px] top-3 h-[11px] w-[11px] rounded-full border-2 border-coral bg-ivory"
              />
              <p className="tl-year font-mono text-sm uppercase tracking-[0.15em]">{it.kind}</p>
              <h3 className="tl-role mt-3 font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-bold leading-[1] tracking-[-0.03em]">
                <span className="mask">
                  <span className="mask-inner">{it.org}</span>
                </span>
              </h3>
              <p className="mt-2 text-lg font-semibold">{it.role}</p>
              <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-slate">
                {it.meta}
              </p>
              <div className="tl-detail">
                <p className="max-w-lg pt-4 leading-relaxed text-obsidian/80">{it.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
      <div className="relative mt-24">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">Education</p>
        <ul className="mt-6">
          {education.map((e) => (
            <li
              key={e.school}
              className="edu-row grid gap-3 border-t border-obsidian/20 py-8 md:grid-cols-12 md:gap-8"
            >
              <h3 className="mask md:col-span-6">
                <span className="edu-name mask-inner block font-display text-[clamp(2rem,4.6vw,4.6rem)] font-extrabold uppercase leading-[0.9] tracking-[-0.04em]">
                  {e.school}
                </span>
              </h3>
              <div className="md:col-span-6">
                <p className="text-lg font-semibold">{e.program}</p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-coral">
                  {e.status}
                </p>
                <p className="mt-3 max-w-lg leading-relaxed text-obsidian/75">{e.note}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <p className="relative mt-12 text-sm leading-relaxed">Languages: {languages.join(" · ")}</p>
      <p className="relative mt-4 text-sm leading-relaxed">
        Development & quality: {deliverySkills.join(" · ")}
      </p>
      <div className="exp-values relative mt-24 grid grid-cols-2 gap-y-2 border-t border-obsidian/20 pt-8 md:grid-cols-4">
        {VALUES.map((v, i) => (
          <div key={v} className="mask">
            <p className="exp-value mask-inner font-display text-[clamp(1.6rem,3.4vw,3.4rem)] font-extrabold uppercase tracking-[-0.03em]">
              <span className="mr-2 align-top font-mono text-[10px] text-coral">0{i + 1}</span>
              {v}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
