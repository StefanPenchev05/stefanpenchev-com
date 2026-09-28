import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navigation } from "./components/navigation/Navigation";
import { Story } from "./components/layout/Story";
import { Projects } from "./sections/Projects/Projects";
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
        {/* TODO phase 2: Architecture → Skills → Experience → Playground → About → Contact. See section README files. */}
      </main>
      <footer className="page-width site-footer">
        <span>STEFAN PENCHEV</span>
        <span>INTERFACE TO INFRASTRUCTURE.</span>
        <span>© 2026</span>
      </footer>
    </SmoothScroll>
  );
}
