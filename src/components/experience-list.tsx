import { experience } from "@/content/profile";

export function ExperienceList() {
  return (
    <ul className="divide-y divide-rule">
      {experience.map(({ organization, title, period, location, arrangement, summary }) => (
        <li key={organization} className="space-y-1 py-5">
          <h3>{title} · {organization}</h3>
          <p className="metadata">{[period, location, arrangement].filter(Boolean).join(" · ")}</p>
          <p>{summary}</p>
        </li>
      ))}
    </ul>
  );
}
