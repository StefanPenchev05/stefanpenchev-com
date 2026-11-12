"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type MouseEvent } from "react";

const desktopQuery = "(min-width: 44rem)";

type SiteHeaderProps = { name: string; cvUrl: string };

export function SiteHeader({ name, cvUrl }: SiteHeaderProps) {
  const pathname = usePathname();
  const path = pathname.replace(/\/$/, "") || "/";
  const disclosure = useRef<HTMLDetailsElement>(null);
  const toggle = useRef<HTMLElement>(null);
  const desktopNav = useRef<HTMLElement>(null);

  function closeMenu() {
    if (disclosure.current) disclosure.current.open = false;
  }

  function closeOnCvClick(event: MouseEvent<HTMLAnchorElement>) {
    if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) closeMenu();
  }

  useEffect(closeMenu, [pathname]);

  useEffect(() => {
    const desktop = matchMedia(desktopQuery);
    // A breakpoint change can blur a control before the media query event fires.
    let lastFocused: Element | null = document.activeElement;

    function rememberFocus(event: FocusEvent) {
      lastFocused = event.target instanceof Element ? event.target : null;
    }

    function clearPointerFocus() {
      lastFocused = null;
    }

    function handleBreakpoint({ matches }: MediaQueryListEvent) {
      const focused = document.activeElement === document.body ? lastFocused : document.activeElement;
      if (matches && focused && disclosure.current?.contains(focused)) {
        const links = Array.from(desktopNav.current?.querySelectorAll("a") ?? []);
        const equivalent = links.find((link) => link.href === focused.closest("a")?.href);
        (equivalent ?? links[0])?.focus();
      } else if (!matches && focused && desktopNav.current?.contains(focused)) {
        toggle.current?.focus();
      }
      closeMenu();
    }

    desktop.addEventListener("change", handleBreakpoint);
    document.addEventListener("focusin", rememberFocus);
    document.addEventListener("pointerdown", clearPointerFocus);
    window.addEventListener("pageshow", closeMenu);
    return () => {
      desktop.removeEventListener("change", handleBreakpoint);
      document.removeEventListener("focusin", rememberFocus);
      document.removeEventListener("pointerdown", clearPointerFocus);
      window.removeEventListener("pageshow", closeMenu);
    };
  }, []);

  const items = [
    { label: "Work", href: "/work/", current: path === "/work", section: path.startsWith("/work/") },
    { label: "About", href: "/about/", current: path === "/about" },
    { label: "CV", href: cvUrl, file: true },
    { label: "Contact", href: "/#contact" },
  ];

  function renderLinks(mobile: boolean) {
    return (
      <ul className="nav-list">
        {items.map(({ label, href, current, section, file }) => (
          <li key={label}>
            {file ? (
              <a className="nav-link" href={href} onClick={mobile ? closeOnCvClick : undefined}>{label}</a>
            ) : (
              <Link
                className="nav-link"
                href={href}
                aria-current={current ? "page" : undefined}
                data-current-section={section || undefined}
                onNavigate={mobile ? closeMenu : undefined}
              >
                {label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <header className="border-b border-rule">
      <div className="site-container header-row">
        <Link href="/" className="nav-link identity-link" aria-current={path === "/" ? "page" : undefined}>
          {name}
        </Link>
        <nav ref={desktopNav} className="desktop-nav" aria-label="Main navigation">
          {renderLinks(false)}
        </nav>
        <details
          ref={disclosure}
          className="mobile-nav"
          onKeyDown={(event) => {
            if (event.key === "Escape" && event.currentTarget.open) {
              event.preventDefault();
              toggle.current?.focus();
              closeMenu();
            }
          }}
        >
          <summary ref={toggle} className="menu-toggle">
            <span className="menu-open-label">Menu</span>
            <span className="menu-close-label">Close menu</span>
            <span className="menu-icon" aria-hidden="true" />
          </summary>
          <nav aria-label="Main navigation">{renderLinks(true)}</nav>
        </details>
      </div>
    </header>
  );
}
