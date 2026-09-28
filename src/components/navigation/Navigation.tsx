import { useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ScrollTrigger } from "../../animations/scroll/gsap";
import styles from "./Navigation.module.css";
const items = [
  { id: "index", label: "INDEX", number: "01" },
  { id: "work", label: "WORK", number: "02" },
  { id: "about", label: "ABOUT", number: "07" },
  { id: "contact", label: "CONTACT", number: "08" },
];
export function Navigation() {
  const ref = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  useEffect(() => {
    const update = () => {
      ref.current?.classList.toggle(styles.compact, window.scrollY > 48);
      let current = pathname.startsWith("/work/") ? "work" : "index";
      if (pathname === "/")
        for (const item of items) {
          const section = document.getElementById(item.id);
          if (
            section &&
            section.getBoundingClientRect().top <= window.innerHeight * 0.4
          )
            current = item.id;
        }
      ref.current
        ?.querySelectorAll<HTMLAnchorElement>("nav a")
        .forEach((link) => {
          if (link.dataset.section === current)
            link.setAttribute(
              "aria-current",
              pathname === "/" ? "location" : "page",
            );
          else link.removeAttribute("aria-current");
        });
    };
    const trigger = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: update,
      onRefresh: update,
    });
    update();
    return () => trigger.kill();
  }, [pathname]);
  return (
    <header className={styles.header} ref={ref}>
      <Link
        className={styles.name}
        to="/#index"
        aria-label="Stefan Penchev — index"
      >
        STEFAN PENCHEV
        <span className={styles.dot} />
      </Link>
      <nav aria-label="Main navigation">
        {items.map((item) => (
          <Link key={item.id} data-section={item.id} to={`/#${item.id}`}>
            {item.label}
            <span>{item.number}</span>
          </Link>
        ))}
      </nav>
    </header>
  );
}
