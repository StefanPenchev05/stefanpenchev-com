import { ScrollTrigger } from "./gsap";

/** Keep the authored display size unless the actual font exceeds its own column. */
export function fitTextToContainer(root: HTMLElement, selector: string) {
  const elements = Array.from(root.querySelectorAll<HTMLElement>(selector));
  const originalSizes = elements.map((element) => element.style.fontSize);
  const containers = [...new Set(elements.map((element) => element.parentElement!))];
  const widths = new WeakMap<Element, number>();
  let disposed = false;
  let frame = 0;

  const fit = () => {
    if (disposed) return;
    let changed = false;
    const measure = document.createElement("span");
    Object.assign(measure.style, {
      position: "absolute",
      visibility: "hidden",
      pointerEvents: "none",
      whiteSpace: "pre",
    });
    measure.setAttribute("aria-hidden", "true");
    document.body.append(measure);
    elements.forEach((element, index) => {
      const previous = element.style.fontSize;
      element.style.fontSize = originalSizes[index]!;
      const style = getComputedStyle(element);
      const parent = element.parentElement!;
      const parentStyle = getComputedStyle(parent);
      const width =
        parent.clientWidth -
        parseFloat(parentStyle.paddingLeft) -
        parseFloat(parentStyle.paddingRight);
      if (width > 0) {
        Object.assign(measure.style, {
          font: style.font,
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform,
        });
        measure.textContent = element.textContent;
        const textWidth = measure.getBoundingClientRect().width;
        // Reserve a small amount for glyph overhang and the existing outline stroke.
        const available = width - parseFloat(style.fontSize) * 0.1;
        if (textWidth > available) {
          element.style.fontSize = `${((parseFloat(style.fontSize) * available) / textWidth).toFixed(2)}px`;
        }
      }
      changed ||= previous !== element.style.fontSize;
    });
    measure.remove();
    if (changed) {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!disposed) ScrollTrigger.refresh();
      });
    }
  };

  fit();
  const observer = new ResizeObserver((entries) => {
    let changed = false;
    for (const entry of entries) {
      const width = entry.contentRect.width;
      if (widths.get(entry.target) !== width) {
        widths.set(entry.target, width);
        changed = true;
      }
    }
    if (changed) fit();
  });
  containers.forEach((container) => observer.observe(container));
  document.fonts.ready.then(fit);
  document.fonts.addEventListener("loadingdone", fit);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    observer.disconnect();
    document.fonts.removeEventListener("loadingdone", fit);
    elements.forEach((element, index) => {
      element.style.fontSize = originalSizes[index]!;
    });
  };
}
