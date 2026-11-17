import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { HeroScene } from "@/components/home/HeroScene";
import { AboutScene, BuildBridge } from "@/components/home/AboutScene";
import { CapabilitiesScene } from "@/components/home/CapabilitiesScene";
import { WorkScene } from "@/components/home/WorkScene";
import { ExperienceScene } from "@/components/home/ExperienceScene";
import { PlaygroundScene } from "@/components/home/PlaygroundScene";
import { ContactScene } from "@/components/home/ContactScene";
import { MoreWorkScene } from "@/components/home/MoreWorkScene";
import { profile, socials } from "@/data/profile";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { useSceneController } from "@/hooks/use-scene-controller";
import { scrollToTarget } from "@/lib/scroll";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stefan Penchev | Full-Stack & Backend Developer" },
      { name: "description", content: profile.siteDescription },
      { property: "og:title", content: "Stefan Penchev | Full-Stack & Backend Developer" },
      { property: "og:description", content: profile.siteDescription },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          email: `mailto:${profile.email}`,
          sameAs: socials.map((s) => s.href),
          affiliation: { "@type": "CollegeOrUniversity", name: "University of Luxembourg" },
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  useSceneController("obsidian");
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (id) setTimeout(() => scrollToTarget(`#${id}`, true), 100);
  }, []);
  return (
    <main>
      <ScrollProgress />
      <HeroScene />
      <AboutScene />
      <BuildBridge />
      <CapabilitiesScene />
      <WorkScene />
      <MoreWorkScene />
      <ExperienceScene />
      <PlaygroundScene />
      <ContactScene />
    </main>
  );
}
