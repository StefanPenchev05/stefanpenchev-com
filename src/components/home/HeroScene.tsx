import { useRef } from "react";
import { ArrowDown } from "lucide-react";
import { profile } from "@/data/profile";
import { sitePath } from "@/lib/site";
import { DESKTOP, MOTION, gsap, useIsoLayoutEffect } from "@/lib/gsap";

export function HeroScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add({ motion: MOTION, desktop: DESKTOP }, (ctx) => {
      const { motion, desktop } = ctx.conditions as { motion: boolean; desktop: boolean };
      if (!motion) return;
      const frame = el.querySelector<HTMLElement>(
        desktop ? '[data-hero-frame="desktop"]' : '[data-hero-frame="mobile"]',
      )!;
      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .fromTo(
          ".hero-curtain",
          { yPercent: 0 },
          { yPercent: -100, duration: 1.1, ease: "expo.inOut" },
        )
        .from(".hero-line-inner", { yPercent: 110, duration: 1.2, stagger: 0.09 }, "-=0.45")
        .from(
          frame.querySelector(".hero-reveal"),
          { clipPath: "inset(100% 0% 0% 0%)", duration: 1.4 },
          "<0.1",
        )
        .from(frame.querySelector(".hero-image-arrival"), { scale: 1.35, duration: 1.8 }, "<")
        .from(".hero-fade", { opacity: 0, y: 16, stagger: 0.06, duration: 0.9 }, "-=1.2")
        .from(
          ".hero-deco-arrival",
          { scale: 0, rotate: -90, opacity: 0, duration: 1, stagger: 0.1 },
          "<",
        );

      if (!desktop) {
        gsap.to(".hero-img", {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
        });
        return;
      }
      const tl = gsap.timeline({
        defaults: { ease: "none" },
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: "+=260%",
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });
      tl.set(
        frame,
        {
          right: "5vw",
          xPercent: 0,
          top: "13vh",
          width: () => Math.min(window.innerWidth * 0.32, 540),
          height: "74vh",
        },
        0,
      )
        .to(".hero-first", { xPercent: -55, opacity: 0 }, 0)
        .to(".hero-last", { xPercent: 60, opacity: 0 }, 0)
        .to(".hero-aside", { y: -70, opacity: 0, stagger: 0.03 }, 0)
        .to(".hero-deco", { rotate: 180, scale: 1.6, opacity: 0 }, 0)
        .to(
          frame,
          {
            right: "50%",
            xPercent: 50,
            top: "8vh",
            width: "88vw",
            height: "84vh",
            ease: "power2.inOut",
            immediateRender: false,
          },
          0.05,
        )
        .fromTo(
          frame.querySelector(".hero-img"),
          { scale: 1 },
          { scale: 1.02, ease: "power2.inOut", immediateRender: false },
          0.05,
        )
        .fromTo(
          ".hero-s1 .mask-inner",
          { y: 0, yPercent: 105 },
          { yPercent: 0, stagger: 0.06 },
          0.55,
        )
        .fromTo(
          frame,
          { clipPath: "inset(0% 0% 0% 0%)" },
          { clipPath: "inset(22% 32% 22% 32%)", ease: "power2.inOut", immediateRender: false },
          1.05,
        )
        .to(".hero-s1 .mask-inner", { yPercent: -105, stagger: 0.04 }, 1.55)
        .fromTo(".hero-wipe", { y: 0, yPercent: 100 }, { yPercent: 0, ease: "power2.inOut" }, 1.5)
        .fromTo(
          ".hero-s2 .mask-inner",
          { y: 0, yPercent: 105 },
          { yPercent: 0, stagger: 0.06 },
          1.95,
        )
        .to({}, { duration: 0.3 });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="top"
      data-chapter="00"
      data-chapter-name="INTRO"
      data-scene="obsidian"
      className="grain relative min-h-[100svh] overflow-hidden text-ivory lg:h-[100svh]"
      aria-label="Introduction"
    >
      {/* Mobile / tablet composition */}
      <div className="relative z-10 flex min-h-[100svh] flex-col px-5 pb-10 pt-24 md:px-10 lg:pointer-events-none lg:absolute lg:inset-0 lg:pb-12 lg:pt-28">
        <div className="hero-aside lg:max-w-[52vw]">
          <div className="hero-fade flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.25em] text-slate">
            <span>Portfolio / 2026</span>
            <span className="hidden sm:inline">[ Engineering / Software / Curiosity ]</span>
          </div>
        </div>
        <div
          data-hero-frame="mobile"
          className="hero-frame relative mx-auto mt-8 aspect-[4/5] w-full max-w-[22rem] overflow-hidden lg:hidden"
        >
          <PortraitFrame mobile />
        </div>

        <h1 className="mt-8 font-display font-extrabold uppercase leading-[0.82] tracking-[-0.04em] lg:mt-auto">
          <span className="sr-only">
            {profile.name} — {profile.title}
          </span>
          <span
            aria-hidden
            className="hero-first mask block text-[clamp(3rem,15.5vw,8rem)] lg:text-[clamp(5.5rem,10.5vw,13rem)]"
          >
            <span className="hero-line-inner mask-inner">{profile.firstName}</span>
          </span>
          <span
            aria-hidden
            className="hero-last mask block text-[clamp(3rem,15.5vw,8rem)] lg:text-[clamp(5.5rem,10.5vw,13rem)]"
          >
            <span className="hero-line-inner mask-inner">
              {profile.lastName}
              <span className="text-lime">.</span>
            </span>
          </span>
        </h1>

        <div className="mt-6 grid gap-6 lg:max-w-[56vw] lg:grid-cols-[auto_1fr] lg:items-end lg:gap-12">
          <div className="hero-aside">
            <div className="hero-fade">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
                Full-Stack / Backend Developer
              </p>
              <p className="mt-2 max-w-xs text-lg leading-snug text-ivory/90">{profile.tagline}</p>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-slate">{profile.intro}</p>
            </div>
          </div>
          <div className="hero-aside">
            <p className="hero-fade font-mono text-[10px] uppercase tracking-[0.25em] text-slate">
              {profile.location}
            </p>
          </div>
        </div>

        <div className="hero-aside mt-10 lg:absolute lg:bottom-12 lg:right-10 lg:mt-0">
          <div className="hero-fade flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.25em] text-slate">
            <span className="nudge inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate/50">
              <ArrowDown className="h-3.5 w-3.5" />
            </span>
            Scroll to begin
          </div>
        </div>
      </div>

      {/* Desktop cinematic frame */}
      <div
        data-hero-frame="desktop"
        className="hero-frame absolute right-[5vw] top-[13vh] z-0 hidden h-[74vh] w-[min(32vw,540px)] overflow-hidden lg:block"
        style={{ clipPath: "inset(0% 0% 0% 0%)" }}
      >
        <PortraitFrame />
      </div>

      <svg
        aria-hidden
        className="hero-deco pointer-events-none absolute right-[36vw] top-[18vh] z-10 hidden h-20 w-20 text-lime lg:block"
        viewBox="0 0 80 80"
      >
        <g className="hero-deco-arrival" style={{ transformOrigin: "40px 40px" }}>
          <circle cx="40" cy="40" r="30" fill="none" stroke="currentColor" strokeDasharray="3 5" />
          <path d="M40 0v80M0 40h80" stroke="currentColor" strokeWidth="1" />
        </g>
      </svg>
      <div
        aria-hidden
        className="hero-deco absolute bottom-[18vh] right-[3vw] z-10 hidden h-3 w-3 rotate-45 lg:block"
      >
        <span className="hero-deco-arrival block h-full w-full bg-coral" />
      </div>

      <div
        aria-hidden
        className="hero-s1 pointer-events-none absolute inset-0 z-20 hidden flex-col items-center justify-center font-display text-[clamp(4rem,11vw,12rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-ivory mix-blend-difference lg:flex"
      >
        <span className="mask">
          <span className="mask-inner" style={{ transform: "translateY(105%)" }}>
            Understand
          </span>
        </span>
        <span className="mask">
          <span className="mask-inner text-outline" style={{ transform: "translateY(105%)" }}>
            the system.
          </span>
        </span>
      </div>

      <div
        className="hero-wipe absolute inset-0 z-30 hidden bg-ivory lg:block"
        style={{ transform: "translateY(100%)" }}
      />
      <div
        aria-hidden
        className="hero-s2 pointer-events-none absolute inset-0 z-40 hidden flex-col justify-center px-10 font-display text-[clamp(4rem,12vw,13rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.04em] text-obsidian lg:flex"
      >
        <span className="mask">
          <span className="mask-inner" style={{ transform: "translateY(105%)" }}>
            Then
          </span>
        </span>
        <span className="mask self-end">
          <span className="mask-inner" style={{ transform: "translateY(105%)" }}>
            build it<span className="text-coral">.</span>
          </span>
        </span>
      </div>

      <div
        aria-hidden
        className="hero-curtain pointer-events-none fixed inset-0 z-[80] flex items-end bg-lime p-10 motion-reduce:hidden"
        style={{ transform: "translateY(-100%)" }}
      >
        <span className="font-display text-[clamp(3rem,8vw,7rem)] font-extrabold uppercase leading-none tracking-tight text-obsidian">
          SP—{new Date().getFullYear()}
        </span>
      </div>
    </section>
  );
}

function PortraitFrame(_: { mobile?: boolean }) {
  return (
    <figure className="hero-reveal relative h-full w-full overflow-hidden bg-obsidian">
      <div className="hero-image-arrival absolute inset-0">
        <img
          src={sitePath(profile.portrait)}
          alt="Stefan Penchev"
          width={800}
          height={800}
          fetchPriority="high"
          className="hero-img absolute inset-0 h-full w-full object-contain object-bottom"
        />
      </div>
      <span aria-hidden className="absolute left-2 top-2 h-4 w-4 border-l border-t border-lime" />
      <span
        aria-hidden
        className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-lime"
      />
    </figure>
  );
}
