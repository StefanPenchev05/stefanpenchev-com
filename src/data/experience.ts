export type ExperienceEntry = {
  id: string;
  period: string;
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
export const experience: ExperienceEntry[] = [
  {
    id: "placeholder-01",
    period: "PERIOD TO VERIFY",
    title: "Replace with verified work experience",
    type: "work",
    placeholder: true,
    summary:
      "Development placeholder. Add a verified role, organization and the responsibilities behind the work.",
    details: [
      "Replace with a specific responsibility you can discuss.",
      "Include an outcome only when it can be verified.",
    ],
  },
  {
    id: "placeholder-02",
    period: "PERIOD TO VERIFY",
    title: "Replace with verified education",
    type: "education",
    placeholder: true,
    summary:
      "Development placeholder. Add a verified course, qualification or period of independent study.",
    details: [
      "Add the institution or learning context, if applicable.",
      "Describe the technical foundations you studied.",
    ],
  },
  {
    id: "placeholder-03",
    period: "PERIOD TO VERIFY",
    title: "Replace with verified project experience",
    type: "project",
    placeholder: true,
    summary:
      "Development placeholder. Add a real project and explain your contribution to its design and implementation.",
    details: [
      "Describe your own contribution and the constraints.",
      "Add verified technologies and a real project link.",
    ],
  },
];
