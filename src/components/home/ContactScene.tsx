import { useRef } from "react";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";
import { contactOptions } from "@/lib/contact";
import { profile, socials } from "@/data/profile";
import { Magnetic } from "@/components/animation/MagneticButton";

export function ContactScene() {
  const root = useRef<HTMLElement>(null);
  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, () => {
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: { trigger: el, start: "top 85%", end: "top 5%", scrub: 1 },
      });
      tl.from(".ct-line .mask-inner", { yPercent: 110, stagger: 0.15 }, 0)
        .from(".ct-circle", { scale: 0.1, xPercent: 120, yPercent: -60, rotate: -120 }, 0.1)
        .from(".ct-last", { letterSpacing: "0.2em", opacity: 0.2 }, 0.3);
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="contact"
      data-chapter="06"
      data-chapter-name="CONTACT"
      data-scene="obsidian"
      className="grain relative overflow-hidden px-5 pb-10 pt-28 text-ivory md:px-10 md:pt-40"
    >
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">06 / What's next?</p>
      <div className="relative mt-8">
        <h2 className="font-display text-[clamp(3.4rem,12vw,13rem)] font-extrabold uppercase leading-[0.84] tracking-[-0.05em]">
          <span className="ct-line mask">
            <span className="mask-inner">Let's build</span>
          </span>
          <span className="ct-line mask">
            <span className="mask-inner text-outline">something</span>
          </span>
          <span className="ct-line mask">
            <span className="ct-last mask-inner inline-block text-lime">meaningful.</span>
          </span>
        </h2>
        <div className="ct-circle mt-10 md:absolute md:right-0 md:top-1/2 md:mt-0 md:-translate-y-1/2">
          <Magnetic strength={0.25}>
            <a
              href={`mailto:${profile.email}`}
              data-cursor="WRITE"
              className="group flex aspect-square w-[min(60vw,15rem)] flex-col items-center justify-center rounded-full bg-lime p-6 text-center text-obsidian transition-transform duration-500 hover:scale-105 md:w-[clamp(12rem,20vw,19rem)]"
            >
              <ArrowUpRight className="mb-3 h-8 w-8 transition-transform duration-500 group-hover:rotate-45" />
              <span className="font-display text-lg font-extrabold uppercase leading-tight tracking-tight md:text-xl">
                Start a<br />
                conversation
              </span>
              <span className="mt-2 break-all font-mono text-[10px]">{profile.email}</span>
            </a>
          </Magnetic>
        </div>
      </div>

      <div className="mt-24 grid gap-16 border-t border-slate/30 pt-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="max-w-sm text-sm leading-relaxed text-slate">
            {profile.location}. Contact me about employment or a freelance application or backend
            project.
          </p>
          <ul className="mt-8 space-y-3">
            {socials.map((s) => (
              <li key={s.label} className="border-b border-slate/20 pb-3">
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor="OPEN"
                  className="group flex items-center justify-between font-mono text-sm uppercase tracking-[0.15em] hover:text-lime"
                >
                  <span>{s.label}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-500 group-hover:rotate-45" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid gap-8 lg:col-span-8 sm:grid-cols-2">
          {contactOptions.map((option) => (
            <div
              key={option.label}
              className="flex flex-col items-start border-t border-slate/30 pt-6"
            >
              <h3 className="font-display text-2xl font-bold">{option.label}</h3>
              <p className="mb-8 mt-4 text-sm leading-relaxed text-slate">{option.detail}</p>
              <a
                href={option.href}
                data-cursor="WRITE"
                className="mt-auto rounded-full border border-lime px-6 py-4 font-mono text-xs uppercase tracking-[0.15em] text-lime transition-colors hover:bg-lime hover:text-obsidian"
              >
                {option.label} ↗
              </a>
            </div>
          ))}
        </div>
      </div>

      <footer className="mt-32 flex flex-col gap-6 border-t border-slate/30 pt-8 font-mono text-[10px] uppercase tracking-[0.25em] text-slate md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <svg aria-hidden viewBox="0 0 40 40" className="spin-slow h-8 w-8 text-lime">
            <circle
              cx="20"
              cy="20"
              r="17"
              fill="none"
              stroke="currentColor"
              strokeDasharray="2 4"
            />
            <path d="M12 26 L20 12 L28 26 Z" fill="none" stroke="currentColor" />
          </svg>
          <span className="text-ivory">
            {profile.name} © {new Date().getFullYear()}
          </span>
        </div>
        <span>Engineered with curiosity.</span>
        <button
          onClick={() => scrollToTarget(0)}
          className="link-line inline-flex items-center gap-2 self-start text-ivory md:self-auto"
          data-cursor="UP"
        >
          Back to top <ArrowUp className="h-3 w-3" />
        </button>
      </footer>
    </section>
  );
}
