export type ContactItem = {
  id: string;
  label: string;
  value?: string;
  href?: string;
  enabled: boolean;
};
// TODO: supply verified values and destinations before enabling these items.
export const contacts: ContactItem[] = [
  { id: "email", label: "EMAIL", enabled: false },
  { id: "github", label: "GITHUB", enabled: false },
  { id: "linkedin", label: "LINKEDIN", enabled: false },
];
