"use client";

import { create } from "zustand";
import { chapters } from "@/lib/data/chapters";

export type PerformanceTier = "low" | "medium" | "high";

type ExperienceState = {
  activeChapter: number;
  progress: number;
  reducedMotion: boolean;
  performanceTier: PerformanceTier;
  setActiveChapter: (activeChapter: number) => void;
  setProgress: (progress: number) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setPerformanceTier: (performanceTier: PerformanceTier) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  activeChapter: 0,
  progress: 0,
  reducedMotion: false,
  performanceTier: "high",
  setActiveChapter: (activeChapter) => set({ activeChapter }),
  setProgress: (progress) => set({ progress }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setPerformanceTier: (performanceTier) => set({ performanceTier })
}));

export function chapterFromProgress(progress: number) {
  const lastIndex = chapters.length - 1;
  return Math.min(lastIndex, Math.max(0, Math.round(progress * lastIndex)));
}
