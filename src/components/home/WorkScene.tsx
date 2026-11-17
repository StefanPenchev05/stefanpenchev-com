import { useRef } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { featuredProjects, themes, type Project } from "@/data/projects";
import { DESKTOP, MOTION, gsap, setScene, useIsoLayoutEffect } from "@/lib/gsap";
import { ProjectVisual } from "@/components/projects/ProjectVisual";
import { useTransitionGo } from "@/components/layout/PageTransition";

export function WorkScene() {
  const root = useRef<HTMLElement>(null);

  useIsoLayoutEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia(el);
    mm.add(`${MOTION} and ${DESKTOP}`, () => {
      const track = el.querySelector<HTMLElement>(".work-track")!;
      const distance = () => track.scrollWidth - window.innerWidth;
      const horiz = gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onLeaveBack: () => setScene("obsidian"),
        },
      });
      gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
        const scene = panel.dataset["projectScene"]!;
        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horiz,
            start: "left 65%",
            end: "right 65%",
            onToggle: (s) => s.isActive && setScene(scene),
          },
        });
        gsap.fromTo(
          panel.querySelector(".work-media"),
          { clipPath: "inset(12% 18% 12% 18%)", scale: 0.92 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horiz,
              start: "left right",
              end: "center center",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          panel.querySelector(".work-inner"),
          { xPercent: -12 },
          {
            xPercent: 12,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horiz,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
        gsap.fromTo(
          panel.querySelector(".work-name"),
          { xPercent: 40 },
          {
            xPercent: -20,
            ease: "none",
            scrollTrigger: {
              trigger: panel,
              containerAnimation: horiz,
              start: "left right",
              end: "right left",
              scrub: true,
            },
          },
        );
        gsap.from(panel.querySelectorAll(".work-meta"), {
          y: 30,
          opacity: 0,
          stagger: 0.08,
          ease: "power2.out",
          scrollTrigger: {
            trigger: panel,
            containerAnimation: horiz,
            start: "left 70%",
            end: "left 35%",
            scrub: true,
          },
        });
      });
      gsap.from(".work-intro-line .mask-inner", {
        yPercent: 110,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: el, start: "top 70%", end: "top 10%", scrub: true },
      });
    });
    mm.add(`(max-width: 1023px), (prefers-reduced-motion: reduce)`, () => {
      gsap.utils.toArray<HTMLElement>(".work-panel").forEach((panel) => {
        gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: "top 55%",
            end: "bottom 55%",
            onToggle: (s) => s.isActive && setScene(panel.dataset["projectScene"]!),
          },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={root}
      id="work"
      data-chapter="03"
      data-chapter-name="WORK"
      className="relative overflow-hidden lg:motion-safe:h-[100svh]"
    >
      <div className="work-track flex flex-col lg:motion-safe:h-full lg:motion-safe:w-max lg:motion-safe:flex-row">
        <div
          data-scene="obsidian"
          className="flex w-full shrink-0 flex-col justify-center px-5 py-28 text-ivory md:px-10 lg:motion-safe:w-[62vw] lg:motion-safe:py-0"
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-slate">
            03 / Selected work
          </p>
          <h2 className="mt-6 font-display text-[clamp(3rem,7vw,7.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.045em]">
            <span className="work-intro-line mask">
              <span className="mask-inner">Real</span>
            </span>
            <span className="work-intro-line mask">
              <span className="mask-inner text-outline">systems,</span>
            </span>
            <span className="work-intro-line mask">
              <span className="mask-inner">
                in progress<span className="text-coral">.</span>
              </span>
            </span>
          </h2>
          <p className="mt-8 max-w-sm text-sm leading-relaxed text-slate">
            Commercial platforms, research software, internal tools and my own products, with each
            project’s current status. Scroll to travel through them.
          </p>
        </div>
        {featuredProjects.map((p) => (
          <ProjectPanel key={p.slug} project={p} />
        ))}
        <div className="hidden w-[18vw] shrink-0 lg:motion-safe:block" aria-hidden />
      </div>
    </section>
  );
}

function ProjectPanel({ project }: { project: Project }) {
  const go = useTransitionGo();
  const navigate = useNavigate();
  const media = useRef<HTMLDivElement>(null);
  const t = themes[project.scene];

  const onMove = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !media.current) return;
    const r = media.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(media.current.querySelector(".work-tilt"), {
      rotationY: x * 8,
      rotationX: -y * 8,
      scale: 1.03,
      duration: 0.6,
      ease: "power3",
    });
  };
  const onLeave = () =>
    gsap.to(media.current?.querySelector(".work-tilt") ?? [], {
      rotationX: 0,
      rotationY: 0,
      scale: 1,
      duration: 0.8,
      ease: "power3",
    });

  const open = (e: React.MouseEvent) => {
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    go(() => navigate({ to: "/work/$slug", params: { slug: project.slug } }), project.name);
  };

  return (
    <article
      data-project-scene={project.scene}
      className={`work-panel relative flex w-full shrink-0 flex-col justify-center gap-8 px-5 py-20 md:px-10 lg:motion-safe:w-[78vw] lg:motion-safe:py-0 lg:motion-safe:pl-[6vw] ${t.fg}`}
    >
      <div className="flex items-baseline justify-between gap-4 lg:motion-safe:max-w-[66vw]">
        <h3 className="work-name font-display text-[clamp(2.6rem,8vw,8rem)] font-extrabold uppercase leading-[0.85] tracking-[-0.05em] lg:whitespace-nowrap">
          {project.name}
        </h3>
        <span className={`work-meta font-mono text-sm ${t.accentText}`}>
          {project.index}/{String(featuredProjects.length).padStart(2, "0")}
        </span>
      </div>

      <a
        href={`/work/${project.slug}`}
        onClick={open}
        data-cursor="VIEW"
        className="group relative block [perspective:1000px] lg:motion-safe:max-w-[66vw]"
        aria-label={`Open the ${project.name} project overview`}
      >
        <div
          ref={media}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
          className="work-media relative aspect-[16/10] overflow-hidden md:aspect-[16/8] lg:motion-safe:h-[48vh] lg:motion-safe:aspect-auto"
        >
          <div className="work-tilt h-full w-full [transform-style:preserve-3d]">
            <div className="work-inner -mx-[8%] h-full w-[116%]">
              <ProjectVisual project={project} />
            </div>
          </div>
          <span
            className={`pointer-events-none absolute right-5 top-5 flex h-24 w-24 scale-0 items-center justify-center rounded-full text-center font-mono text-[9px] uppercase leading-tight tracking-[0.15em] text-obsidian transition-transform duration-500 group-hover:scale-100 group-focus-visible:scale-100 ${t.accent}`}
          >
            Explore
            <br />
            project
          </span>
        </div>
      </a>

      <div className="grid gap-4 border-t border-current/20 pt-5 sm:grid-cols-[1fr_1.4fr_auto] sm:items-start lg:motion-safe:max-w-[66vw]">
        <p className="work-meta font-mono text-[11px] uppercase tracking-[0.2em] opacity-70">
          {project.category}
        </p>
        <p className="work-meta text-sm leading-relaxed">
          {project.summary}
          {project.status && <span className="mt-2 block font-mono text-xs">{project.status}</span>}
        </p>
        <a
          href={`/work/${project.slug}`}
          onClick={open}
          className="work-meta link-line inline-flex items-center gap-1 font-mono text-xs uppercase tracking-[0.2em]"
        >
          Read project <ArrowUpRight className="h-3.5 w-3.5" />
        </a>
      </div>
    </article>
  );
}
