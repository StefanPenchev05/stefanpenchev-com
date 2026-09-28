import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "lenis/dist/lenis.css";
import "./styles/global.css";
import { App } from "./App";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
