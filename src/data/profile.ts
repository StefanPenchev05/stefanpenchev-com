export type Profile = {
  name: string;
  headline: string;
  location?: string;
  availability?: string;
  email?: string;
  github?: string;
  linkedin?: string;
};
export const profile: Profile = {
  name: "Stefan Penchev",
  headline: "Full-stack developer",
  location: "Luxembourg",
  availability:
    "Available for internships, software engineering opportunities, freelance projects, and collaborations.",
  email: "penchev.stefan@icloud.com",
  github: "https://github.com/StefanPenchev05",
  linkedin: "https://www.linkedin.com/in/stefan-penchev-31b94a318/",
};
export const site = {
  title: `${profile.name} — Full-Stack Developer`,
  description:
    "A developer portfolio exploring interfaces, backend architecture and engineering experiments.",
};
