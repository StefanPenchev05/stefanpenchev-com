"use client";

import { chapters } from "@/lib/data/chapters";
import { profile } from "@/lib/data/portfolio";
import { useExperienceStore } from "@/lib/scroll/useExperienceStore";

export function DomOverlay() {
  const activeChapter = useExperienceStore((state) => state.activeChapter);
  const chapter = chapters[activeChapter] ?? chapters[0];
  const scrollToChapter = (index: number) => {
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const target = maxScroll * (index / (chapters.length - 1));
    window.scrollTo({ top: target, behavior: "smooth" });
  };

  return (
    <>
      <a className="skip-link" href="#portfolio-content">
        Skip to portfolio content
      </a>
      <nav className="chapter-nav" aria-label="Portfolio scenes">
        {chapters.map((item, index) => (
          <button
            className={`chapter-nav__item ${index === activeChapter ? "is-active" : ""}`}
            key={item.id}
            onClick={() => scrollToChapter(index)}
            type="button"
          >
            <span className="chapter-nav__index">
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="chapter-nav__label">{item.title}</span>
          </button>
        ))}
      </nav>
      <section className="dom-overlay" aria-live="polite">
        <article className={`chapter-panel ${activeChapter === 0 ? "chapter-panel--identity" : ""}`}>
          <p className="chapter-panel__eyebrow">{chapter.eyebrow}</p>
          {activeChapter === 0 ? (
            <>
              <h1>{profile.name}</h1>
              <div className="role-stack" aria-label="Professional roles">
                <span>{profile.title}</span>
              </div>
              <p>{profile.positioning}</p>
              <div className="hero-actions">
                <button type="button" onClick={() => scrollToChapter(1)}>
                  Explore Projects
                </button>
                <button type="button" onClick={() => scrollToChapter(5)}>
                  Contact
                </button>
              </div>
            </>
          ) : (
            <>
              <h2>{chapter.title}</h2>
              <p>{chapter.description}</p>
              <div className="signals" aria-label="Scene signals">
                {chapter.signals.map((signal) => (
                  <span className="signal" key={signal}>
                    {signal}
                  </span>
                ))}
              </div>
            </>
          )}
        </article>
      </section>
    </>
  );
}
