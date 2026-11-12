import type { Metadata } from "next";
import { ExperienceList } from "@/components/experience-list";
import { education, identity, skills, spokenLanguages, story } from "@/content/profile";
import { assets, publicAssetUrl } from "@/lib/assets";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <article className="site-container section space-y-12">
      <header className="space-y-3">
        <h1>About</h1>
        <p className="lead">{identity.role} based in {identity.location}.</p>
        <a className="standalone-link" href={publicAssetUrl(assets.cv)}>View CV</a>
      </header>
      <section className="space-y-5">
        <h2>My story</h2>
        {story.chapters.map(({ title, summary }) => (
          <div key={title} className="space-y-1">
            <h3>{title}</h3>
            <p>{summary}</p>
          </div>
        ))}
      </section>
      <section>
        <h2>Experience</h2>
        <ExperienceList />
      </section>
      <section className="space-y-5">
        <h2>Education</h2>
        <ul className="divide-y divide-rule">
          {education.map(({ institution, programme, period, summary }) => (
            <li key={institution} className="space-y-1 py-4">
              <h3>{institution}</h3>
              <p>{programme} · {period}</p>
              {summary && <p>{summary}</p>}
            </li>
          ))}
        </ul>
      </section>
      <section className="space-y-5">
        <h2>Skills</h2>
        <dl className="grid gap-5 sm:grid-cols-2">
          {skills.map(({ group, items }) => (
            <div key={group}>
              <dt className="font-semibold">{group}</dt>
              <dd>{items.join(", ")}</dd>
            </div>
          ))}
          <div>
            <dt className="font-semibold">Spoken languages</dt>
            <dd>{spokenLanguages.join(", ")}</dd>
          </div>
        </dl>
      </section>
    </article>
  );
}
