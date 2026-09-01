import { DomOverlay } from "@/components/dom/DomOverlay";
import { ExperienceCanvas } from "@/components/experience/ExperienceCanvas";
import { ScrollController } from "@/components/dom/ScrollController";
import { ScrollChapters } from "@/components/dom/ScrollChapters";

export default function Home() {
  return (
    <main className="experience-page">
      <ScrollController />
      <ExperienceCanvas />
      <DomOverlay />
      <ScrollChapters />
    </main>
  );
}
