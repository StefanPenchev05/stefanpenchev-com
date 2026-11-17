import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Menu, X } from "lucide-react";
import { scrollToTarget } from "@/lib/scroll";
import { useTransitionGo } from "./PageTransition";

import { profile } from "@/data/profile";

const LINKS = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

export function Navigation() {
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const go = useTransitionGo();
  const onHome = location.pathname === "/";

  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const jump = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    if (onHome) scrollToTarget(`#${id}`);
    else
      go(async () => {
        await navigate({ to: "/", hash: id });
        setTimeout(() => scrollToTarget(`#${id}`, true), 50);
      }, "Stefan Penchev");
  };

  return (
    <>
      <header className="nav-in fixed inset-x-0 top-0 z-50 text-ivory mix-blend-difference">
        <nav
          aria-label="Primary"
          className={`flex items-center justify-between px-5 transition-all duration-500 md:px-10 ${compact ? "py-3" : "py-6"}`}
        >
          <Link
            to="/"
            onClick={(e) => {
              if (onHome) {
                e.preventDefault();
                scrollToTarget(0);
              }
            }}
            className="font-display text-lg font-extrabold tracking-tight"
            data-cursor="HOME"
          >
            STEFAN PENCHEV<span className="text-lime">.</span>
          </Link>
          <ul className="hidden items-center gap-8 font-mono text-xs uppercase tracking-[0.18em] md:flex">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a href={`/#${l.id}`} onClick={jump(l.id)} className="link-line py-1">
                  {l.label}
                </a>
              </li>
            ))}
            <li>
              <a href={profile.cv} target="_blank" rel="noreferrer" className="link-line py-1">
                CV
              </a>
            </li>
          </ul>
          <div className="hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] lg:flex">
            <span className="pulse-dot h-2 w-2 rounded-full bg-lime" /> {profile.availability}
          </div>
          <button
            className="md:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
          >
            <Menu className="h-6 w-6" />
          </button>
        </nav>
      </header>
      <div
        className={`fixed inset-0 z-[60] flex flex-col bg-obsidian px-6 py-6 text-ivory transition-[clip-path] duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] md:hidden ${
          open ? "[clip-path:inset(0_0_0_0)]" : "pointer-events-none [clip-path:inset(0_0_100%_0)]"
        }`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-extrabold">
            STEFAN PENCHEV<span className="text-lime">.</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" tabIndex={open ? 0 : -1}>
            <X className="h-6 w-6" />
          </button>
        </div>
        <ul className="mt-auto space-y-2">
          {LINKS.map((l, i) => (
            <li key={l.id} className="flex items-baseline gap-4 border-b border-slate/30 py-3">
              <span className="font-mono text-xs text-lime">0{i + 1}</span>
              <a
                href={`/#${l.id}`}
                onClick={jump(l.id)}
                tabIndex={open ? 0 : -1}
                className="font-display text-5xl font-extrabold uppercase tracking-tight"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={profile.cv}
          target="_blank"
          rel="noreferrer"
          tabIndex={open ? 0 : -1}
          className="mt-6 font-mono text-sm uppercase"
        >
          View CV ↗
        </a>
        <div className="mt-10 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-slate">
          <span className="pulse-dot h-2 w-2 rounded-full bg-lime" /> {profile.availability}
        </div>
      </div>
    </>
  );
}
