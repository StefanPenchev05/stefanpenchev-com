import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { getProject, nextProject, projects, themes } from "@/data/projects";
import { profile } from "@/data/profile";
import { MOTION, gsap, setScene, useIsoLayoutEffect } from "@/lib/gsap";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { useTransitionGo } from "@/components/layout/PageTransition";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.project;
    const title = p
      ? `${p.fullName} — Project overview | ${profile.name}`
      : `Project overview | ${profile.name}`;
    const desc = p ? p.summary : `A project overview from ${profile.name}'s portfolio.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "author", content: profile.name },
        { name: "twitter:card", content: "summary" },
        ...(p ? [] : [{ name: "robots", content: "noindex" }]),
      ],
    };
  },
  component: CaseStudy,
});

function CaseStudy() {
  const { project: p } = Route.useLoaderData();
  const next = nextProject(p.slug);
  const go = useTransitionGo();
  const navigate = useNavigate();
  const root = useRef<HTMLDivElement>(null);
  const t = themes[p.scene];
  const long = p.name.length > 10;

  useIsoLayoutEffect(() => {
    setScene(p.scene);
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(MOTION, () => {
      gsap
        .timeline({ defaults: { ease: "expo.out" }, delay: 0.25 })
        .from(".cs-title .mask-inner", { yPercent: 110, duration: 1.2 })
        .from(".cs-meta", { opacity: 0, y: 20, stagger: 0.08, duration: 0.8 }, "-=0.9")
        .from(".cs-hero-media", { clipPath: "inset(40% 10% 40% 10%)", duration: 1.4 }, "-=1");
      gsap.to(".cs-hero-inner", {
        yPercent: 10,
        scale: 1.06,
        ease: "none",
        scrollTrigger: {
          trigger: ".cs-hero-media",
          start: "top 70%",
          end: "bottom top",
          scrub: true,
        },
      });
      gsap.to(".cs-title", {
        xPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "+=600", scrub: true },
      });
      gsap.utils.toArray<HTMLElement>(".cs-reveal").forEach((n) =>
        gsap.from(n, {
          y: 60,
          opacity: 0,
          ease: "power2.out",
          scrollTrigger: { trigger: n, start: "top 90%", end: "top 60%", scrub: true },
        }),
      );
      gsap.utils.toArray<HTMLElement>(".cs-show").forEach((n, i) =>
        gsap.fromTo(
          n,
          { clipPath: "inset(0% 0% 100% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            ease: "none",
            scrollTrigger: {
              trigger: n,
              start: "top 95%",
              end: `top ${50 - i * 5}%`,
              scrub: true,
            },
          },
        ),
      );
      gsap.fromTo(
        ".cs-next-word",
        { xPercent: 20 },
        {
          xPercent: -10,
          ease: "none",
          scrollTrigger: {
            trigger: ".cs-next",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    });
    return () => mm.revert();
  }, [p.slug]);

  const back = (e: React.MouseEvent) => {
    e.preventDefault();
    go(async () => {
      await navigate({ to: "/", hash: "work" });
    }, profile.name);
  };
  const toNext = (e: React.MouseEvent) => {
    e.preventDefault();
    go(() => navigate({ to: "/work/$slug", params: { slug: next.slug } }), next.name);
  };

  return (
    <main ref={root} className={`min-h-screen ${t.fg}`}>
      <section className="px-5 pb-16 pt-32 md:px-10">
        <a
          href="/#work"
          onClick={back}
          className="cs-meta link-line inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> All work
        </a>
        <div className="mt-10 flex flex-wrap items-end justify-between gap-6">
          <p className={`cs-meta font-mono text-xs uppercase tracking-[0.25em] ${t.accentText}`}>
            Project {p.index} / {String(projects.length).padStart(2, "0")}
          </p>
          <p className="cs-meta font-mono text-xs uppercase tracking-[0.25em] opacity-70">
            {p.category}
          </p>
        </div>
        <h1
          className={`cs-title mt-4 font-display ${long ? "text-[clamp(3rem,10.5vw,12rem)]" : "text-[clamp(4rem,17vw,19rem)]"} font-extrabold uppercase leading-[0.85] tracking-[-0.06em]`}
        >
          <span className="mask">
            <span className="mask-inner">
              {p.name}
              <span className={t.accentText}>.</span>
            </span>
          </span>
        </h1>
        <p className="cs-meta mt-8 max-w-2xl text-xl leading-snug">{p.summary}</p>
        <div className="cs-meta mt-6 flex flex-wrap items-center gap-6">
          <span className="font-mono text-xs uppercase tracking-[0.2em] opacity-80">
            Role — {p.role}
          </span>
          {p.links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="OPEN"
              className={`link-line inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em] ${t.accentText}`}
            >
              {l.label} <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          ))}
        </div>
        <dl className="cs-meta mt-8 grid gap-5 border-t border-current/20 pt-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Status", p.status],
            ["Visitor access", p.access],
            ["Source", p.source],
            ["Contribution", p.period],
          ].map(([label, value]) =>
            value ? (
              <div key={label}>
                <dt className="font-mono text-[10px] uppercase tracking-widest opacity-70">
                  {label}
                </dt>
                <dd className="mt-2 text-sm">{value}</dd>
              </div>
            ) : null,
          )}
        </dl>
        <div className="cs-hero-media relative mt-14 aspect-[16/10] overflow-hidden md:aspect-[16/8]">
          <div className="cs-hero-inner h-full w-full">
            <ProjectVisual project={p} />
          </div>
        </div>
      </section>

      <section className="grid gap-12 px-5 py-20 md:px-10 lg:grid-cols-12">
        <div className="cs-reveal lg:col-span-5">
          <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${t.accentText}`}>
            Context
          </p>
          <h2 className="mt-4 font-display text-[clamp(1.8rem,3.4vw,3.2rem)] font-bold leading-[1.05] tracking-[-0.03em]">
            {p.context}
          </h2>
        </div>
        <div className="space-y-10 lg:col-span-6 lg:col-start-7">
          {p.sections.map((sec, i) => (
            <div key={sec.title} className="cs-reveal border-t border-current/20 pt-5">
              <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${t.accentText}`}>
                {String(i + 1).padStart(2, "0")} — {sec.title}
              </p>
              {sec.body.map((b) => (
                <p key={b} className="mt-4 text-lg leading-relaxed">
                  {b}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      {p.stack.length > 0 && (
        <section className="px-5 py-16 md:px-10">
          <p className="cs-reveal font-mono text-xs uppercase tracking-[0.25em] opacity-70">
            Technology
          </p>
          <ul className="cs-reveal mt-6 flex flex-wrap gap-x-10 gap-y-2">
            {p.stack.map((s) => (
              <li
                key={s}
                className="font-display text-[clamp(2rem,5vw,4.5rem)] font-extrabold uppercase tracking-[-0.04em]"
              >
                {s}
                <span className={t.accentText}>/</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section
        className="grid gap-4 px-5 py-16 md:grid-cols-12 md:px-10"
        aria-label="Visual showcase"
      >
        <div className="cs-show aspect-[4/3] md:col-span-7">
          <ProjectVisual project={p} variant="detail" />
        </div>
        <div className="cs-show aspect-[4/3] md:col-span-5 md:mt-24">
          <ProjectVisual project={p} variant="system" />
        </div>
        <div className="cs-show aspect-[16/7] md:col-span-10 md:col-start-2">
          <ProjectVisual project={p} />
        </div>
      </section>

      <section className="px-5 py-20 md:px-10">
        <p className="cs-reveal font-mono text-xs uppercase tracking-[0.25em] opacity-70">
          What I took away
        </p>
        <ol className="mt-8 grid gap-10 md:grid-cols-3">
          {p.learnings.map((l, i) => (
            <li key={l} className="cs-reveal border-t border-current/20 pt-5">
              <p className={`font-mono text-xs ${t.accentText}`}>
                {String(i + 1).padStart(2, "0")}
              </p>
              <p className="mt-3 font-display text-[clamp(1.4rem,2.4vw,2.2rem)] font-bold leading-[1.1] tracking-[-0.02em]">
                {l}
              </p>
            </li>
          ))}
        </ol>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.2em] opacity-60">
          Project visuals are illustrative covers and do not show product interfaces.
        </p>
      </section>

      <a
        href={`/work/${next.slug}`}
        onClick={toNext}
        data-cursor="NEXT"
        className="cs-next group block overflow-hidden border-t border-current/20 px-5 py-24 md:px-10"
      >
        <p className="font-mono text-xs uppercase tracking-[0.25em] opacity-70">
          Next project — {next.index}/{String(projects.length).padStart(2, "0")}
        </p>
        <div className="cs-next-word mt-4 flex items-center gap-6 whitespace-nowrap font-display text-[clamp(3rem,11vw,12rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.06em]">
          {next.name}
          <ArrowUpRight className="h-[0.6em] w-[0.6em] shrink-0 transition-transform duration-500 group-hover:rotate-45" />
        </div>
      </a>
      <footer className="flex justify-between px-5 pb-8 font-mono text-[10px] uppercase tracking-[0.25em] opacity-60 md:px-10">
        <span>
          {profile.name} © {new Date().getFullYear()}
        </span>
        <span>Engineered with curiosity.</span>
      </footer>
    </main>
  );
}
