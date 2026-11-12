import Link from "next/link";
import { ExperienceList } from "@/components/experience-list";
import { HomeHero } from "@/components/home-hero";
import { ProjectList } from "@/components/project-list";
import { services, story } from "@/content/profile";
import { projects } from "@/content/projects";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <section id="selected-work" tabIndex={-1} className="site-container section space-y-5" aria-labelledby="work-heading">
        <h2 id="work-heading">Selected work</h2>
        <ProjectList projects={projects.filter((project) => project.featured)} heading="h3" />
        <Link href="/work/" className="standalone-link">View all projects</Link>
      </section>
      <div className="border-y border-rule">
        <section className="site-container section space-y-4">
          <h2>About me</h2>
          <p>{story.intro}</p>
          <Link href="/about/" className="standalone-link">Read my story</Link>
        </section>
      </div>
      <section className="site-container section space-y-5">
        <h2>Services</h2>
        <ul className="grid gap-6 sm:grid-cols-2">
          {services.map(({ title, summary }) => (
            <li key={title} className="space-y-1">
              <h3>{title}</h3>
              <p>{summary}</p>
            </li>
          ))}
        </ul>
      </section>
      <div className="border-t border-rule">
        <section className="site-container section">
          <h2>Experience</h2>
          <ExperienceList />
        </section>
      </div>
    </>
  );
}
