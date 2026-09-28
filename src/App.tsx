import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navigation } from "./components/navigation/Navigation";
import { Story } from "./components/layout/Story";
import { Projects } from "./sections/Projects/Projects";
import { Architecture } from "./sections/Architecture/Architecture";
import { Skills } from "./sections/Skills/Skills";
import { Experience } from "./sections/Experience/Experience";
import { Playground } from "./sections/Playground/Playground";
export function App() {
  return (
    <SmoothScroll>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main">
        <Story />
        <Projects />
        <Architecture />
        <Skills />
        <Experience />
        <Playground />
        {/* TODO: About and Contact. Navigation stays inactive. */}
      </main>
      <footer className="page-width site-footer">
        <span>STEFAN PENCHEV</span>
        <span>INTERFACE TO INFRASTRUCTURE.</span>
        <span>© 2026</span>
      </footer>
    </SmoothScroll>
  );
}
