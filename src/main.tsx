import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./styles/fonts.css";
import "@fontsource/ibm-plex-mono/latin-400.css";
import "lenis/dist/lenis.css";
import "./styles/global.css";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
