import Image from "next/image";
import Link from "next/link";
import { ExperienceList } from "@/components/experience-list";
import { ProjectList } from "@/components/project-list";
import { identity, services, story } from "@/content/profile";
import { projects } from "@/content/projects";
import { assets, publicAssetUrl } from "@/lib/assets";

export default function HomePage() {
  return (
    <>
      <section className="bg-stone">
        <div className="site-container grid items-center gap-8 pt-10 md:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]">
          <div className="space-y-3 md:pb-10">
            <h1>{identity.name}</h1>
            <p className="lead">{identity.role}</p>
            <p>{identity.intro}</p>
            <p>Based in {identity.location}.</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 pt-2">
              <li><a className="standalone-link" href="#selected-work">View my work</a></li>
              <li><a className="standalone-link" href="#contact">Get in touch</a></li>
              <li><a className="standalone-link" href={publicAssetUrl(assets.cv)}>View CV</a></li>
            </ul>
          </div>
          <Image
            src={publicAssetUrl(assets.portrait)}
            alt="Portrait of Stefan Penchev"
            width={800}
            height={800}
            loading="eager"
            className="h-auto w-[min(100%,20rem)] justify-self-center md:self-end"
          />
        </div>
      </section>
      <section id="selected-work" className="site-container section space-y-5" aria-labelledby="work-heading">
        <h2 id="work-heading">Selected work</h2>
        <ProjectList projects={projects.filter((project) => project.featured)} />
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
