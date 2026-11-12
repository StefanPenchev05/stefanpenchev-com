import Image from "next/image";
import { identity } from "@/content/profile";
import { assets, publicAssetUrl } from "@/lib/assets";

export function HomeHero() {
  const [givenName, ...surname] = identity.name.split(" ");

  return (
    <section className="home-hero bg-stone" aria-labelledby="hero-name">
      <div className="site-container hero-grid">
        <div className="hero-copy">
          <h1 id="hero-name" className="hero-name">
            <span>{givenName}</span>{" "}
            <span>{surname.join(" ")}</span>
          </h1>
          <div className="hero-intro">
            <p className="lead">{identity.role}</p>
            <p>{identity.intro}</p>
            <p className="text-muted">Based in {identity.location}. On-site here, or remote across Europe.</p>
          </div>
          <ul className="hero-actions">
            <li>
              <a className="standalone-link hero-work-link" href="#selected-work">
                View my work <span aria-hidden="true">↓</span>
              </a>
            </li>
            <li><a className="standalone-link" href="#contact">Get in touch</a></li>
          </ul>
        </div>
        <Image
          className="hero-portrait"
          src={publicAssetUrl(assets.portrait)}
          alt={`Portrait of ${identity.name}`}
          width={800}
          height={800}
          loading="eager"
          fetchPriority="high"
        />
      </div>
    </section>
  );
}
