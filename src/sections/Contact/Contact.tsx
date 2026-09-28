import { contacts, contactHref, type ContactItem } from "../../data/contact";
import styles from "./Contact.module.css";
export function Contact({ items = contacts }: { items?: ContactItem[] }) {
  return (
    <section
      id="contact"
      className={`page-width ${styles.section}`}
      aria-labelledby="contact-title"
    >
      <p className="eyebrow">
        <span className="accent">08 /</span> CONTACT
      </p>
      <h2 id="contact-title">
        LET’S BUILD
        <br />
        SOMETHING<span className="accent">.</span>
      </h2>
      <div>
        {items.map((item) => {
          const href = contactHref(item);
          const content = (
            <>
              <span className={styles.label}>{item.label}</span>
              <span className={styles.value}>
                {item.value || "Verified contact details to be added"}
              </span>
              <span aria-hidden="true">{href ? "↗" : "—"}</span>
            </>
          );
          return href ? (
            <a className={styles.row} key={item.id} href={href}>
              {content}
            </a>
          ) : (
            <div className={styles.row} key={item.id} aria-disabled="true">
              {content}
            </div>
          );
        })}
      </div>
    </section>
  );
}
