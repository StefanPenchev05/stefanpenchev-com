"use client";

import { create } from "zustand";
import { chapters } from "@/lib/data/chapters";
import { featuredProjects } from "@/lib/data/portfolio";

export type PerformanceTier = "low" | "medium" | "high";

export type RequestStage = {
  state: string;
  label: string;
  description: string;
  nodeLabel: string;
};

type ExperienceState = {
  activeChapter: number;
  progress: number;
  reducedMotion: boolean;
  performanceTier: PerformanceTier;
  selectedProjectId: string;
  requestStage: RequestStage | null;
  setActiveChapter: (activeChapter: number) => void;
  setProgress: (progress: number) => void;
  setReducedMotion: (reducedMotion: boolean) => void;
  setPerformanceTier: (performanceTier: PerformanceTier) => void;
  setSelectedProjectId: (selectedProjectId: string) => void;
  setRequestStage: (requestStage: RequestStage | null) => void;
};

export const useExperienceStore = create<ExperienceState>((set) => ({
  activeChapter: 0,
  progress: 0,
  reducedMotion: false,
  performanceTier: "high",
  selectedProjectId: featuredProjects[0]?.id ?? "",
  requestStage: null,
  setActiveChapter: (activeChapter) => set({ activeChapter }),
  setProgress: (progress) => set({ progress }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
  setPerformanceTier: (performanceTier) => set({ performanceTier }),
  setSelectedProjectId: (selectedProjectId) => set({ selectedProjectId }),
  setRequestStage: (requestStage) => set({ requestStage })
}));

export function chapterFromProgress(progress: number) {
  const lastIndex = chapters.length - 1;
  return Math.min(lastIndex, Math.max(0, Math.round(progress * lastIndex)));
}
