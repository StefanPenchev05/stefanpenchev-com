"use client";

import type { PerformanceTier } from "@/lib/scroll/useExperienceStore";

export function detectPerformanceTier(): PerformanceTier {
  if (typeof window === "undefined") {
    return "high";
  }

  const cores = navigator.hardwareConcurrency || 4;
  const memory = "deviceMemory" in navigator ? Number(navigator.deviceMemory) : 8;
  const mobile = window.matchMedia("(max-width: 760px)").matches;
  const highDpr = window.devicePixelRatio > 2;

  if (mobile || cores <= 4 || memory <= 4) {
    return "low";
  }

  if (highDpr || cores <= 8) {
    return "medium";
  }

  return "high";
}
