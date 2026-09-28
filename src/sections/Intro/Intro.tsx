import styles from "./Intro.module.css";
const steps = [
  {
    number: "01",
    label: "THE INTERFACE",
    text: <>I build interfaces.</>,
    detail: "The part you see. Fast, accessible, and considered.",
  },
  {
    number: "02",
    label: "THE REQUEST",
    text: (
      <>
        But I care about what happens{" "}
        <em>after the request leaves the browser.</em>
      </>
    ),
    detail: "Where a click becomes a conversation between systems.",
  },
  {
    number: "03",
    label: "THE SYSTEM",
    text: (
      <>
        APIs. Databases.
        <br />
        Authentication.
        <br />
        <em>Infrastructure.</em>
      </>
    ),
    detail: "Independent layers. One coherent experience.",
  },
  {
    number: "04",
    label: "THE WHOLE PICTURE",
    text: (
      <>
        Full-stack means understanding <em>the whole system.</em>
      </>
    ),
    detail: "That’s the way I like to build.",
  },
];
export function Intro() {
  return (
    <section
      id="intro"
      className={styles.intro}
      aria-label="Engineering approach"
    >
      {steps.map((step) => (
        <article className={styles.step} data-story-step key={step.number}>
          <div className="eyebrow">
            <span className="accent">{step.number} /</span> {step.label}
          </div>
          <h2>{step.text}</h2>
          <p>{step.detail}</p>
        </article>
      ))}
    </section>
  );
}
