import { profile } from "@/data/profile";

export const contactOptions = [
  {
    label: "Discuss a role",
    detail: `${profile.availability}. Junior full-stack or backend startup roles, on-site in Luxembourg or remote across Europe. Internships are an alternative.`,
    href: `mailto:${profile.email}?subject=${encodeURIComponent("Employment enquiry")}`,
  },
  {
    label: "Discuss a project",
    detail: `${profile.freelanceAvailability} Full applications and backend/API development.`,
    href: `mailto:${profile.email}?subject=${encodeURIComponent("Freelance project enquiry")}`,
  },
];
