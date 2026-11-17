export type ExperienceKind = "Part-time engagement" | "Internship" | "Paid internship" | "Teaching";
export type Experience = {
  org: string;
  role: string;
  kind: ExperienceKind;
  meta: string;
  detail: string;
};

export const experience: Experience[] = [
  {
    org: "DTO Partners",
    role: "Software Engineer",
    kind: "Part-time engagement",
    meta: "Jan 2025–present · Remote · Part-time, project-based",
    detail:
      "Architecture and implementation of a recruitment platform with Angular, Rust, PostgreSQL and Redis, alongside a separate responsive company website with English and Polish localisation. The engagement includes automated testing, Docker and CI/CD.",
  },
  {
    org: "Skald Solutions",
    role: "Software Developer",
    kind: "Paid internship",
    meta: "Jul–Oct 2026 · Bulgaria · Paid internship",
    detail:
      "Implemented the Django backend for Skald Lab Ops, built Egil, a local RAG assistant using Ollama, and contributed to a Bulgarian-language educational catalogue containing 90 projects.",
  },
  {
    org: "ArtAICare",
    role: "Software Engineer",
    kind: "Internship",
    meta: "Jan–Sep 2025 · Esch-sur-Alzette, Luxembourg · Internship",
    detail:
      "Sole programmer for the web platform within a wider team: MERN services and APIs, Python recommendations and Sentence-BERT integration, a study-specific application with EEG data, and Ubuntu VPS deployment with Nginx and SSH. Collaborated with a separate VR developer.",
  },
  {
    org: "MindHub Coding Schools",
    role: "Teacher",
    kind: "Teaching",
    meta: "Sep 2023–Sep 2024 · Pazardzhik, Bulgaria",
    detail:
      "Taught programming fundamentals, Scratch and reasoning exercises to ages 8–12; Python, JavaScript, HTML and CSS to teenagers; and hands-on micro:bit activities.",
  },
];
