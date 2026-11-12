import { availability, identity } from "@/content/profile";

export function SiteFooter() {
  return (
    <footer id="contact" tabIndex={-1} className="site-footer">
      <div className="site-container section">
        <h2>Let’s build something useful.</h2>
        <div className="contact-grid">
          {Object.values(availability).map(({ title, summary, action, subject }) => (
            <div key={title} className="contact-option">
              <h3>{title}</h3>
              <p>{summary}</p>
              <a className="action-link" href={`mailto:${identity.email}?subject=${encodeURIComponent(subject)}`}>
                {action}
              </a>
            </div>
          ))}
        </div>
        <div className="footer-details">
          <p>{identity.name} · {identity.location}</p>
          <ul>
            <li><a className="standalone-link" href={`mailto:${identity.email}`}>{identity.email}</a></li>
            <li><a className="standalone-link" href={identity.linkedin}>LinkedIn</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
