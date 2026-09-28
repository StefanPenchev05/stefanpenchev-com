import { RouteBoundary } from "./components/layout/RouteBoundary";
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
import { lazy, Suspense } from "react";
import { NotFound } from "./pages/NotFound";
const CaseStudy = lazy(() => import("./pages/CaseStudy"));
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
      <a
        className="skip-link"
        href="#main"
        onClick={() => document.getElementById("main")?.focus()}
      >
        Skip to content
      </a>
      <Navigation />
      <main id="main" tabIndex={-1}>
        <RouteBoundary>
          <Suspense
            fallback={
              <p className="page-width route-loading" role="status">
                Loading project…
              </p>
            }
          >
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Home />
                    <RouteEffects />
                  </>
                }
              />
              <Route
                path="/work/:slug"
                element={
                  <>
                    <CaseStudy />
                    <RouteEffects />
                  </>
                }
              />
              <Route
                path="*"
                element={
                  <>
                    <NotFound />
                    <RouteEffects />
                  </>
                }
              />
            </Routes>
          </Suspense>
        </RouteBoundary>
      </main>
      <Footer />
    </SmoothScroll>
  );
}
