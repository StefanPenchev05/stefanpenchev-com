import { SmoothScroll } from "./components/layout/SmoothScroll";
import { Navigation } from "./components/navigation/Navigation";
import { Story } from "./components/layout/Story";
import { Projects } from "./sections/Projects/Projects";
import { Architecture } from "./sections/Architecture/Architecture";
import { Skills } from "./sections/Skills/Skills";
import { Experience } from "./sections/Experience/Experience";
import { Playground } from "./sections/Playground/Playground";
import { About } from "./sections/About/About";
import { Contact } from "./sections/Contact/Contact";
import { Footer } from "./components/layout/Footer";
import { RouteEffects } from "./components/layout/RouteEffects";
import { Routes, Route, useLocation } from "react-router-dom";
import CaseStudy, { NotFound } from "./pages/CaseStudy";
export function Home() {
  return (
    <>
      <Story />
      <Projects />
      <Architecture />
      <Skills />
      <Experience />
      <Playground />
      <About />
      <Contact />
    </>
  );
}
export function App() {
  const location = useLocation();
  return (
    <SmoothScroll key={location.pathname}>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <RouteEffects />
    </SmoothScroll>
  );
}
