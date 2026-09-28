import { profile } from "../../data/profile";
import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="page-width site-footer">
      <span>
        {profile.name.toUpperCase()} / © {new Date().getFullYear()}
      </span>
      <span>BUILT WITH / React · TypeScript · Three.js · GSAP</span>
      <Link to="/#index">BACK TO TOP ↑</Link>
    </footer>
  );
}
