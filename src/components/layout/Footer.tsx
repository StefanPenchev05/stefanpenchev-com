import { Link } from "react-router-dom";
export function Footer() {
  return (
    <footer className="page-width site-footer">
      <span>STEFAN PENCHEV / © 2026</span>
      <span>BUILT WITH / React · TypeScript · Three.js · GSAP</span>
      <Link to="/#index">BACK TO TOP ↑</Link>
    </footer>
  );
}
