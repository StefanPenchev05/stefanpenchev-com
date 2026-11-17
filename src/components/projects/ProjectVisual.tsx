import { themes, type Project } from "@/data/projects";

type Variant = "main" | "detail" | "system";

/** Conceptual compositions only — never presented as screenshots of the real products. */
export function ProjectVisual({
  project,
  variant = "main",
}: {
  project: Project;
  variant?: Variant;
}) {
  if (variant === "system") return <SystemCard project={project} />;
  if (variant === "detail") return <FlowCard project={project} />;
  const body = (() => {
    switch (project.visual) {
      case "care":
      case "dto":
      case "skald":
        return <ProjectCover project={project} />;
      case "book":
        return <Book />;
      case "dns":
        return <Dns />;
      default:
        return <FlowCard project={project} />;
    }
  })();
  return (
    <div className="relative h-full w-full">
      {body}
      <Tag />
    </div>
  );
}

function Tag() {
  return (
    <span className="pointer-events-none absolute bottom-3 right-3 rounded-full bg-obsidian/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-ivory">
      Conceptual illustration
    </span>
  );
}

function ProjectCover({ project }: { project: Project }) {
  const t = themes[project.scene];
  return (
    <div
      className={`grain relative flex h-full w-full flex-col justify-center gap-5 overflow-hidden p-[10%] ${t.bg} ${t.fg}`}
    >
      <p className={`font-mono text-[10px] uppercase tracking-widest ${t.accentText}`}>
        {project.category}
      </p>
      <p className="font-display text-[clamp(2rem,4.5vw,5rem)] font-bold leading-none tracking-tight">
        {project.name}
      </p>
      <p className="max-w-md font-mono text-[11px] leading-relaxed">{project.stack.join(" / ")}</p>
      {project.status && (
        <p className="font-mono text-[10px] uppercase tracking-widest opacity-70">
          {project.status}
        </p>
      )}
    </div>
  );
}

function Book() {
  return (
    <div className="grain relative flex h-full w-full items-center justify-center gap-6 overflow-hidden bg-book-bg p-6 text-book-fg">
      <svg
        aria-hidden
        viewBox="0 0 400 300"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <circle
            key={i}
            cx="290"
            cy="160"
            r={20 + i * 22}
            fill="none"
            stroke="var(--book-accent)"
            strokeOpacity={0.12 + (i % 3) * 0.08}
          />
        ))}
      </svg>
      <div className="relative aspect-[9/18] h-[88%] rounded-[1.6rem] border-[5px] border-book-fg bg-book-soft p-3 shadow-2xl">
        <div className="mx-auto mb-3 h-1.5 w-10 rounded-full bg-book-fg/40" />
        <div className="font-mono text-[8px] uppercase tracking-widest">Near you</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className={`aspect-[3/4] rounded ${i === 1 ? "bg-book-accent" : "bg-book-fg/15"}`}
            />
          ))}
        </div>
        <div className="mt-3 h-2 w-3/4 rounded-full bg-book-fg/30" />
        <div className="mt-1.5 h-2 w-1/2 rounded-full bg-book-fg/20" />
      </div>
      <div className="relative hidden max-w-[12rem] sm:block">
        <div className="font-display text-[clamp(1.8rem,3.6vw,3rem)] font-bold leading-[0.9] tracking-tight">
          Books, one street away.
        </div>
        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest opacity-70">
          Discover · Exchange · Share
        </p>
      </div>
    </div>
  );
}

const DNS_FIELDS = [
  ["ID", 16],
  ["QR·OPCODE·AA·TC·RD", 8],
  ["RA·Z·RCODE", 8],
  ["QDCOUNT", 16],
  ["ANCOUNT", 16],
  ["NSCOUNT", 16],
  ["ARCOUNT", 16],
] as const;

function Dns() {
  return (
    <div className="grain relative flex h-full w-full flex-col justify-center gap-4 overflow-hidden bg-dto-bg p-6 text-dto-fg">
      <div className="font-mono text-[10px] uppercase tracking-widest text-dto-accent">
        DNS header · 12 bytes
      </div>
      <div className="grid grid-cols-4 gap-1.5 font-mono text-[10px]">
        {DNS_FIELDS.map(([f, bits], i) => (
          <div
            key={f}
            className={`rounded-sm border px-2 py-2 ${bits === 16 ? "col-span-2" : "col-span-1"} ${i === 0 ? "border-dto-accent text-dto-accent" : "border-dto-fg/25"}`}
          >
            {f}
            <span className="block opacity-50">{bits} bits</span>
          </div>
        ))}
      </div>
      <div className="font-mono text-[11px] leading-relaxed opacity-80">
        <span className="text-dto-accent">QUESTION</span> 07 example 03 com 00 · TYPE A · CLASS IN
      </div>
    </div>
  );
}

function FlowCard({ project }: { project: Project }) {
  const t = themes[project.scene];
  return (
    <div
      className={`grain relative flex h-full w-full flex-col justify-between gap-4 overflow-hidden p-6 ${t.soft} ${t.fg}`}
    >
      <div className="font-mono text-[10px] uppercase tracking-widest opacity-70">
        {project.name} / project themes
      </div>
      <ol className="flex flex-wrap items-center gap-2 font-mono text-[11px]">
        {project.flow.map((f, i) => (
          <li key={f} className="flex items-center gap-2">
            <span
              className={`rounded border px-3 py-2 ${i === 1 ? `${t.border} ${t.accentText}` : "border-current/30"}`}
            >
              {f}
            </span>
            {i < project.flow.length - 1 && (
              <span aria-hidden className="opacity-50">
                →
              </span>
            )}
          </li>
        ))}
      </ol>
      <div className="flex flex-wrap gap-2">
        {project.stack.map((s) => (
          <span
            key={s}
            className={`rounded-full border px-3 py-1 font-mono text-[10px] ${t.border}`}
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}

function SystemCard({ project }: { project: Project }) {
  const t = themes[project.scene];
  return (
    <div className={`grain relative grid h-full w-full grid-cols-3 overflow-hidden ${t.fg}`}>
      <div className={`${t.bg} flex items-end p-4 font-mono text-[10px]`}>BASE</div>
      <div className={`${t.accent} flex items-end p-4 font-mono text-[10px]`}>ACCENT</div>
      <div className={`${t.soft} flex flex-col justify-between p-4`}>
        <span className="font-display text-5xl font-extrabold">Aa</span>
        <span className="font-mono text-[10px]">{project.stack[0] ?? project.name}</span>
      </div>
    </div>
  );
}
