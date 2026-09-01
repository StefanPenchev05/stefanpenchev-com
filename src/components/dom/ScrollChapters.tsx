import { chapters } from "@/lib/data/chapters";

export function ScrollChapters() {
  return (
    <div className="scroll-chapters" id="portfolio-content">
      {chapters.map((chapter, index) => (
        <section
          aria-label={chapter.title}
          className="scroll-chapter"
          id={chapter.id}
          key={chapter.id}
        >
          <div className="scroll-chapter__fallback">
            <p>{String(index + 1).padStart(2, "0")}</p>
            <h2>{chapter.title}</h2>
            <p>{chapter.description}</p>
          </div>
        </section>
      ))}
    </div>
  );
}
