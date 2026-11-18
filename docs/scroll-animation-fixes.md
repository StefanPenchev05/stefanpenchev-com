# Scroll animation fixes

Scope: the five reported visual bugs in `portfolio_4`. The existing palette, fonts, section order, content, assets, pins, smooth scrolling, cursor, project pages and transition design are retained.

## Causes and corrections

| Issue                      | Cause observed in the browser                                                                                                                                                                                                          | Correction                                                                                                                                                                                                   |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Portrait missing on return | The entrance and scrub timelines both controlled the frame's clipping; the scrub captured the entrance's hidden state. Image scale and supporting-element transforms also had overlapping ownership.                                   | Keep entrance clipping/scale on the existing portrait's inner layers and scroll transforms on their outer layers. Give the scrub explicit reversible clipping and scale states. The image is not duplicated. |
| Surname ghost              | Both name exits ended at opacity `0.12`.                                                                                                                                                                                               | Exit both name layers to opacity zero at the existing timeline position. Reverse scrolling restores them.                                                                                                    |
| About phrase clipped       | A residual pixel translation remained alongside `yPercent`; the reveal mask did not accommodate the full font bounds. Long phrases could also exceed the column, and a tall sibling could stretch the text column beyond the viewport. | Explicitly reset pixel `y`, retain the rotating percentage-based reveal, size the mask for the glyphs, fit only overflowing phrases, and cap the phrase column to the available pinned height.               |
| BUILD never fully readable | The original translation/scale sweep had no centered, complete state.                                                                                                                                                                  | Calculate scale from the rendered word and available width. Keep the entrance/exit motion and hold the complete word plus arrow in the center for the middle 20% of the existing scroll span.                |
| INTELLIGENCE truncated     | The preferred display font exceeded its masked column.                                                                                                                                                                                 | Fit actual rendered heading text to its column only when necessary; keep the authored sizes for headings that already fit. The configured names remain Frontend, Backend, Systems and Intelligence.          |

The small shared `fitTextToContainer` utility measures the configured font, responds to container resizing and font completion, and refreshes existing ScrollTriggers after a size change. Its observer, font listener and scheduled animation frame are cleaned up on unmount.

## Related lifecycle corrections

- The hero's timeline now sets its initial frame geometry at time zero, recalculating responsive dimensions on refresh.
- Scene backdrop triggers account for the entire pinned duration and restore the current scene on refresh and reverse entry. This keeps About ivory at its readable state.
- Browser scroll anchoring is disabled only on the home page, where ScrollTrigger owns pin spacing.
- Initial restoration reapplies the router's saved scroll position after scene setup. Lenis refreshes its dimensions before an immediate scroll, avoiding a clamp against the shorter pre-pin page. The old home hash-restoration timeout was removed.
- Decorative SVG coordinates are rounded below visible precision to avoid server/browser floating-point differences producing hydration warnings.

These changes use the existing timelines and triggers. No browser detection, animation timeouts, visibility-forcing scroll listeners, extra pins or extra ScrollTriggers were added.

The router restoration integration uses its existing [`useElementScrollRestoration` API](https://tanstack.com/router/latest/docs/framework/react/guide/scroll-restoration#manual-scroll-restoration). GSAP's documented [refresh behavior](<https://gsap.com/docs/v3/Plugins/ScrollTrigger/refresh()/>) informs the responsive measurements.

## Repeating the browser checks

Start the Vite development server, then run the real-browser regression script with Python Playwright installed:

```sh
PORTFOLIO_URL=http://127.0.0.1:5173 python tests/scroll_animations.py chrome
PORTFOLIO_URL=http://127.0.0.1:5173 python tests/scroll_animations.py webkit
```

`chrome` uses installed Google Chrome. Other Playwright engines can be selected with `chromium`, `webkit` or `firefox`, provided their browser is installed. The optional second argument selects `widths`, `lifecycle` or `fonts`; the default is `all`. Output goes to `.artifacts/scroll-fixes/`, or `PORTFOLIO_ARTIFACTS` if supplied. The tests import development module exports; no debugging hooks are shipped in the application.

The checks measure actual DOM text ranges, computed clipping/opacity and real ScrollTrigger progress. They exercise all seven requested widths, five hero cycles at each width, every About phrase and Toolkit category in both directions, the BUILD readable interval, full-page round trips, wheel/navigation input, reload restoration, resizing across breakpoints, route cleanup, delayed fonts and the reduced-motion fallback.

## Verification environment

Checks use Node.js 24.15.0 and a clean `npm ci` installation of the unchanged package lockfile in an isolated local runtime. The runtime source matches the edited project byte for byte. The existing installed development runtime was unresponsive; it was not replaced or terminated.

- `npm run typecheck`: passed.
- `npm test`: 3 test files, 5 tests passed.
- `npm run lint`: no errors; the 7 existing Fast Refresh warnings remain in unchanged files.
- `npm run build`: passed.
- Production smoke check: hero exit/return, About and Intelligence bounds, and a restored reload inside Toolkit passed with no console errors.
- Chrome 157.0.8103.80 and Playwright WebKit 27.2 are the automated browser engines used.
- Actual Safari automation was unavailable because Safari's “Allow remote automation” setting is disabled. WebKit results are not claimed as an actual Safari run.
- Firefox was installed, but its process failed to start with “Could not find profile folder,” including an explicit-profile retry. Firefox is not claimed as verified.

All `src/data` files and public assets match their pre-task SHA-256 hashes. The package manifest and lockfile are unchanged. No Git repository was initialized and nothing was deployed.
