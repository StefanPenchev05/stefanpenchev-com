import { create } from "zustand";
type PortfolioState = {
  activeProject: string | null;
  openProject: (slug: string) => void;
  closeProject: () => void;
};
// Only discrete interaction state lives here. Frame/scroll values stay in refs.
export const usePortfolioStore = create<PortfolioState>((set) => ({
  activeProject: null,
  openProject: (slug) => set({ activeProject: slug }),
  closeProject: () => set({ activeProject: null }),
}));
