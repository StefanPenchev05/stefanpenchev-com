import { createContext, useCallback, useContext, useRef, type ReactNode } from "react";
import { useRouter } from "@tanstack/react-router";
import { gsap } from "@/lib/gsap";
import { scrollToTarget } from "@/lib/scroll";

type Go = (navigate: () => Promise<void> | void, label?: string) => void;
const Ctx = createContext<Go>((n) => void n());

export function useTransitionGo() {
  return useContext(Ctx);
}

export function PageTransitionProvider({ children }: { children: ReactNode }) {
  const panel = useRef<HTMLDivElement>(null);
  const accent = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);
  const busy = useRef(false);
  const router = useRouter();

  const go = useCallback<Go>(
    (navigate, label = "") => {
      const scrollToDestination = () => {
        const hash = router.state.location.hash;
        scrollToTarget(hash ? `#${hash}` : 0, true);
      };
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced || busy.current || !panel.current) {
        void Promise.resolve(navigate()).then(scrollToDestination);
        return;
      }
      busy.current = true;
      if (text.current) text.current.textContent = label;
      const tl = gsap.timeline();
      tl.set([panel.current, accent.current], { yPercent: 100, visibility: "visible" })
        .to(accent.current, { yPercent: 0, duration: 0.5, ease: "expo.inOut" })
        .to(panel.current, { yPercent: 0, duration: 0.55, ease: "expo.inOut" }, 0.1)
        .fromTo(
          text.current,
          { yPercent: 100, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 0.4 },
          0.35,
        )
        .add(async () => {
          tl.pause();
          await navigate();
          await router.load?.();
          scrollToDestination();
          requestAnimationFrame(() => tl.resume());
        })
        .to(text.current, { yPercent: -100, opacity: 0, duration: 0.3 })
        .to(panel.current, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "<0.05")
        .to(accent.current, { yPercent: -100, duration: 0.7, ease: "expo.inOut" }, "<0.08")
        .set([panel.current, accent.current], { visibility: "hidden" })
        .add(() => {
          busy.current = false;
        });
    },
    [router],
  );

  return (
    <Ctx.Provider value={go}>
      {children}
      <div aria-hidden className="pointer-events-none fixed inset-0 z-[90]">
        <div ref={accent} className="invisible absolute inset-0 bg-lime" />
        <div
          ref={panel}
          className="invisible absolute inset-0 flex items-center justify-center bg-obsidian"
        >
          <span className="mask">
            <span
              ref={text}
              className="mask-inner font-display text-[clamp(3rem,10vw,9rem)] font-extrabold uppercase tracking-tight text-ivory"
            />
          </span>
        </div>
      </div>
    </Ctx.Provider>
  );
}
