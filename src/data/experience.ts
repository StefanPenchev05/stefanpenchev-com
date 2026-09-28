export type ExperienceEntry = {
  id: string;
  period?: string;
  title: string;
  organization?: string;
  type: "work" | "education" | "project" | "other";
  location?: string;
  summary: string;
  details?: string[];
  technologies?: string[];
  link?: string;
  placeholder?: boolean;
};
// Verified by the owner. Exact programme title and dates have not been supplied.
export const experience: ExperienceEntry[] = [
  {
    id: "university-of-luxembourg",
    title: "Bachelor student",
    organization: "University of Luxembourg",
    type: "education",
    location: "Luxembourg",
    summary: "Bachelor studies at the University of Luxembourg.",
  },
];
