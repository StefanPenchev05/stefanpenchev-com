import { profile } from "./profile";
export type ContactItem = {
  id: string;
  label: string;
  value?: string;
  href?: string;
  enabled: boolean;
};
// User-verified public destinations, maintained in profile.ts.
export const contacts: ContactItem[] = [
  {
    id: "email",
    label: "EMAIL",
    value: profile.email,
    href: profile.email ? `mailto:${profile.email}` : undefined,
    enabled: Boolean(profile.email),
  },
  {
    id: "github",
    label: "GITHUB",
    value: profile.github,
    href: profile.github,
    enabled: Boolean(profile.github),
  },
  {
    id: "linkedin",
    label: "LINKEDIN",
    value: profile.linkedin,
    href: profile.linkedin,
    enabled: Boolean(profile.linkedin),
  },
];

export function contactHref(item: ContactItem): string | undefined {
  const href = item.href?.trim();
  return item.enabled &&
    item.value?.trim() &&
    href &&
    /^(https?:\/\/[^\s]+|mailto:[^\s@]+@[^\s@]+)$/.test(href)
    ? href
    : undefined;
}
