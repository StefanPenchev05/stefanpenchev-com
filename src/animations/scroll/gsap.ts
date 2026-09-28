import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
// Lenis receives unwarped ticker time, as recommended by its GSAP integration.
gsap.ticker.lagSmoothing(0);
export { gsap, ScrollTrigger };
