import { availability, identity } from "@/content/profile";

export function Contact() {
  return (
    <section id="contact" className="section border-t border-rule" aria-labelledby="contact-heading">
      <div className="site-container space-y-6">
        <h2 id="contact-heading">Contact</h2>
        <div className="grid gap-6 sm:grid-cols-2">
          {Object.values(availability).map(({ title, summary, action, subject }) => (
            <div key={title} className="flex flex-col items-start gap-3 border-t border-rule pt-4">
              <h3>{title}</h3>
              <p className="grow">{summary}</p>
              <a className="font-semibold" href={`mailto:${identity.email}?subject=${encodeURIComponent(subject)}`}>{action}</a>
            </div>
          ))}
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          <li><a href={`mailto:${identity.email}`}>{identity.email}</a></li>
          <li><a href={identity.linkedin}>LinkedIn</a></li>
        </ul>
      </div>
    </section>
  );
}
