import { Link } from "react-router-dom";
import styles from "./CaseStudy.module.css";
export function NotFound() {
  return (
    <div className={`page-width ${styles.page}`}>
      <p className="eyebrow accent">404 / NOT FOUND</p>
      <h1 tabIndex={-1} data-route-focus>
        That page isn’t here.
      </h1>
      <p>Choose a project from the work index.</p>
      <Link to="/#work">← BACK TO WORK</Link>
    </div>
  );
}
