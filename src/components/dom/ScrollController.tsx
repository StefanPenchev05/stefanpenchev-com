"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  chapterFromProgress,
  useExperienceStore
} from "@/lib/scroll/useExperienceStore";
import { detectPerformanceTier } from "@/lib/three/performanceTier";

gsap.registerPlugin(ScrollTrigger);

export function ScrollController() {
  const setActiveChapter = useExperienceStore((state) => state.setActiveChapter);
  const setProgress = useExperienceStore((state) => state.setProgress);
  const setReducedMotion = useExperienceStore((state) => state.setReducedMotion);
  const setPerformanceTier = useExperienceStore((state) => state.setPerformanceTier);

  useEffect(() => {
    const reducedQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(reducedQuery.matches);

    updateReducedMotion();
    setPerformanceTier(detectPerformanceTier());

    reducedQuery.addEventListener("change", updateReducedMotion);

    const updateFromProgress = (progress: number) => {
      setProgress(progress);
      setActiveChapter(chapterFromProgress(progress));
    };

    const trigger = ScrollTrigger.create({
      start: 0,
      end: () => document.documentElement.scrollHeight - window.innerHeight,
      scrub: reducedQuery.matches ? false : 1,
      onUpdate: (self) => updateFromProgress(self.progress)
    });

    const updateInitial = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      updateFromProgress(maxScroll > 0 ? window.scrollY / maxScroll : 0);
      ScrollTrigger.refresh();
    };

    const resizeTimer = window.setTimeout(updateInitial, 80);
    window.addEventListener("resize", updateInitial);

    return () => {
      window.clearTimeout(resizeTimer);
      window.removeEventListener("resize", updateInitial);
      reducedQuery.removeEventListener("change", updateReducedMotion);
      trigger.kill();
    };
  }, [setActiveChapter, setPerformanceTier, setProgress, setReducedMotion]);

  return null;
}
