"""Real-browser regression checks for the five scroll-animation bugs.

Start Vite, install Python Playwright, then run:
  PORTFOLIO_URL=http://127.0.0.1:5173/stefanpenchev-com python tests/scroll_animations.py chrome
  PORTFOLIO_URL=http://127.0.0.1:5173/stefanpenchev-com python tests/scroll_animations.py webkit
Optional second argument: widths, lifecycle, or fonts (default: all).
These checks use the development module exports, never production debug hooks.
"""

from pathlib import Path
from playwright.sync_api import sync_playwright
import json, sys, traceback, os
from urllib.parse import urlparse

out = Path(os.environ.get("PORTFOLIO_ARTIFACTS", ".artifacts/scroll-fixes"))
out.mkdir(parents=True, exist_ok=True)
url = os.environ.get("PORTFOLIO_URL", "http://127.0.0.1:5173/stefanpenchev-com").rstrip(
    "/"
)
base_path = urlparse(url).path.rstrip("/")
engine = sys.argv[1] if len(sys.argv) > 1 else "chrome"
mode = sys.argv[2] if len(sys.argv) > 2 else "all"
assert mode in ["all", "widths", "lifecycle", "fonts"]
widths = [360, 390, 768, 1024, 1440, 1536, 1920]
results = []
failures = []
with sync_playwright() as p:
    browser = (
        p.chromium.launch(channel="chrome", headless=True)
        if engine == "chrome"
        else getattr(p, engine).launch(headless=True)
    )
    page = browser.new_page(viewport={"width": 1440, "height": 900})
    errors = []
    page.on("pageerror", lambda e: errors.append(str(e)))
    page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)

    def frames():
        page.evaluate(
            "()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)))"
        )

    def setup():
        page.goto(url + "/", wait_until="networkidle")
        page.evaluate("document.fonts.ready")
        page.evaluate(
            """async()=>{const base=new URL(document.querySelector('nav a[data-cursor=HOME]').href).pathname;const {gsap,ScrollTrigger}=await import(base+'src/lib/gsap.ts');const {scrollToTarget}=await import(base+'src/lib/scroll.ts');window.probe={gsap,ScrollTrigger,scrollToTarget};}"""
        )
        page.wait_for_function(
            'getComputedStyle(document.querySelector(".hero-fade")).opacity==="1"'
        )
        frames()

    def seek(selector, fraction):
        page.evaluate(
            """([selector,fraction])=>{const st=probe.ScrollTrigger.getAll().find(t=>t.trigger===document.querySelector(selector)&&t.animation);if(!st)throw Error('Missing animated trigger: '+selector);window.activeProbe=st;window.expectedProbe=fraction;probe.scrollToTarget(st.start+(st.end-st.start)*fraction,true);}""",
            [selector, fraction],
        )
        page.wait_for_function(
            "Math.abs(activeProbe.progress-expectedProbe)<0.002 && Math.abs(activeProbe.animation.progress()-activeProbe.progress)<0.0001"
        )
        frames()

    def textbox(selector):
        return page.locator(selector).evaluate(
            """el=>{const range=document.createRange();range.selectNodeContents(el);const r=range.getBoundingClientRect(),c=el.parentElement.getBoundingClientRect();return {text:el.textContent,left:r.left,right:r.right,top:r.top,bottom:r.bottom,cl:c.left,cr:c.right,ct:c.top,cb:c.bottom,font:getComputedStyle(el).fontSize,transform:getComputedStyle(el).transform};}"""
        )

    def fits(selector, vertical=True):
        r = textbox(selector)
        assert (
            r["left"] >= max(0, r["cl"]) - 1
            and r["right"] <= min(page.viewport_size["width"], r["cr"]) + 1
        ), r
        if vertical:
            assert (
                r["top"] >= max(0, r["ct"]) - 1
                and r["bottom"] <= min(page.viewport_size["height"], r["cb"]) + 1
            ), r
        return r

    def hero():
        return page.evaluate(
            """()=>{const frame=[...document.querySelectorAll('.hero-frame')].find(e=>getComputedStyle(e).display!=='none');return [frame,...frame.querySelectorAll('.hero-reveal,.hero-image-arrival,.hero-img'),...document.querySelectorAll('.hero-first,.hero-last,.hero-aside')].map(e=>{const s=getComputedStyle(e),r=e.getBoundingClientRect();return {class:e.className,clip:s.clipPath,opacity:s.opacity,visibility:s.visibility,transform:s.transform,x:r.x,y:r.y,w:r.width,h:r.height};});}"""
        )

    def restored(initial):
        current = hero()
        for a, b in zip(initial, current):
            for key in ["clip", "visibility"]:
                assert a[key] == b[key], (key, a, b)
            assert abs(float(a["opacity"]) - float(b["opacity"])) < 0.005, (a, b)
            for key in ["x", "y", "w", "h"]:
                assert abs(a[key] - b[key]) < 1, (key, a, b)
        assert page.locator("img.hero-img").evaluate_all(
            "(els)=>els.every(e=>e.complete&&e.naturalWidth===800)"
        )

    def snapshot(name):
        page.screenshot(
            path=str(out / f'{engine}-{page.viewport_size["width"]}-{name}.png')
        )

    if mode in ["all", "widths"]:
        for width in widths:
            try:
                page.set_viewport_size(
                    {"width": width, "height": 900 if width >= 768 else 844}
                )
                setup()
                initial = hero()
                pins = page.evaluate(
                    "probe.ScrollTrigger.getAll().filter(t=>t.pin).length"
                )
                assert pins == (4 if width >= 1024 else 0), pins
                for cycle in range(5):
                    seek("#top", 0.46 if width >= 1024 else 0.85)
                    if width >= 1024:
                        assert (
                            page.locator(".hero-last").evaluate(
                                "e=>Number(getComputedStyle(e).opacity)"
                            )
                            < 0.005
                        )
                        if cycle == 0:
                            snapshot("understand")
                    seek("#top", 1)
                    seek("#top", 0)
                    restored(initial)
                snapshot("hero-returned")
                if width >= 1024:
                    for fraction, index in [
                        (0.2, 1),
                        (0.4375, 2),
                        (0.68, 3),
                        (0.92, 4),
                        (0.68, 3),
                        (0.4375, 2),
                        (0.2, 1),
                    ]:
                        seek("#about", fraction)
                        fits(f".about-phrase:nth-child({index})")
                        assert (
                            page.evaluate("document.documentElement.dataset.scene")
                            == "ivory"
                        )
                        if index == 2:
                            snapshot("about")
                else:
                    for index in range(1, 5):
                        page.locator(
                            f".about-phrase:nth-child({index})"
                        ).scroll_into_view_if_needed()
                        page.evaluate("probe.ScrollTrigger.update()")
                        frames()
                        fits(f".about-phrase:nth-child({index})", False)
                page.locator(".bridge-word").evaluate(
                    'e=>e.parentElement.id="probe-bridge"'
                )
                for fraction in [0.1, 0.3, 0.45, 0.5, 0.55, 0.8, 0.95, 0.5]:
                    seek("#probe-bridge", fraction)
                    if 0.4 <= fraction <= 0.6:
                        r = textbox(".bridge-word")
                        assert (
                            r["left"] >= -1
                            and r["right"] <= width + 1
                            and r["top"] >= -1
                            and r["bottom"] <= page.viewport_size["height"] + 1
                        ), r
                        if fraction == 0.5:
                            snapshot("build")
                headings = []
                if width >= 1024:
                    for fraction, index in [
                        (0.2, 1),
                        (0.42, 2),
                        (0.66, 3),
                        (0.92, 4),
                        (0.66, 3),
                        (0.42, 2),
                        (0.2, 1),
                    ]:
                        seek('[data-chapter="02"]', fraction)
                        headings.append(fits(f".cap-title:nth-child({index})"))
                        if index == 4:
                            snapshot("intelligence")
                else:
                    for index in range(4):
                        title = page.locator(".cap-static-title").nth(index)
                        title.scroll_into_view_if_needed()
                        frames()
                        headings.append(
                            fits(f".cap-static-title >> nth={index}", False)
                        )
                        if index == 3:
                            snapshot("intelligence")
                assert page.evaluate("document.documentElement.scrollWidth<=innerWidth")
                seek("#top", 0)
                restored(initial)
                results.append(
                    {
                        "width": width,
                        "heroCycles": 5,
                        "headings": headings,
                        "pins": pins,
                    }
                )
                print(engine, width, "PASS", flush=True)
            except Exception as e:
                failures.append({"width": width, "error": str(e)})
                print(engine, width, "FAIL", str(e)[:500], flush=True)
                snapshot("failure")
    if mode in ["all", "lifecycle"]:
        try:
            page.set_viewport_size({"width": 1440, "height": 900})
            setup()
            initial = hero()
            initial_count = page.evaluate("probe.ScrollTrigger.getAll().length")
            page.mouse.wheel(0, 1300)
            page.wait_for_function("scrollY > 1200")
            page.mouse.wheel(0, -2000)
            page.wait_for_function("scrollY < 1")
            seek("#top", 0)
            restored(initial)
            page.locator(f'nav a[href="{base_path}/#contact"]').click()
            page.wait_for_function(
                'document.querySelector("#contact").getBoundingClientRect().top < innerHeight * 0.5'
            )
            page.locator('nav a[data-cursor="HOME"]').click()
            page.wait_for_function("scrollY < 1")
            seek("#top", 0)
            restored(initial)
            print(engine, "wheel and navigation PASS", flush=True)
            # Traverse every chapter twice, including the final contact section and reverse.
            for cycle in range(2):
                maximum = page.evaluate(
                    "document.documentElement.scrollHeight-innerHeight"
                )
                positions = list(range(0, int(maximum), 450)) + [maximum]
                for y in positions + list(reversed(positions)):
                    page.evaluate("(y)=>probe.scrollToTarget(y,true)", y)
                    frames()
                seek("#top", 0)
                restored(initial)
            print(engine, "full journeys PASS", flush=True)
            # A reload must initialize the same visual state at the browser-restored scroll.
            for selector, fraction in [
                ("#top", 0.46),
                ("#about", 0.4375),
                ('[data-chapter="02"]', 0.92),
            ]:
                seek(selector, fraction)
                before = page.evaluate("scrollY")
                page.reload(wait_until="networkidle")
                page.evaluate("document.fonts.ready")
                page.evaluate(
                    "async()=>{const base=new URL(document.querySelector('nav a[data-cursor=HOME]').href).pathname;const {gsap,ScrollTrigger}=await import(base+'src/lib/gsap.ts');const {scrollToTarget}=await import(base+'src/lib/scroll.ts');window.probe={gsap,ScrollTrigger,scrollToTarget};}"
                )
                page.wait_for_function(
                    'getComputedStyle(document.querySelector(".hero-fade")).opacity==="1"'
                )
                page.wait_for_function(
                    "(s)=>{const t=probe.ScrollTrigger.getAll().find(t=>t.trigger===document.querySelector(s)&&t.animation);return Math.abs(t.animation.progress()-t.progress)<.0001}",
                    arg=selector,
                )
                frames()
                assert abs(page.evaluate("scrollY") - before) < 2, (
                    selector,
                    before,
                    page.evaluate("scrollY"),
                )
                if selector == "#top":
                    assert (
                        page.locator(".hero-last").evaluate(
                            "e=>Number(getComputedStyle(e).opacity)"
                        )
                        < 0.005
                    )
                if selector == "#about":
                    fits(".about-phrase:nth-child(2)")
                    assert (
                        page.evaluate("document.documentElement.dataset.scene")
                        == "ivory"
                    )
                if selector.startswith("["):
                    fits(".cap-title:nth-child(4)")
                seek("#top", 0)
                restored(initial)
            print(engine, "restored reloads PASS", flush=True)
            # Refresh responsive geometry at mid-scroll, including both sides of the breakpoint.
            for width, height in [(1920, 1080), (1024, 768), (390, 844), (1440, 900)]:
                seek("#top", 0.46 if page.viewport_size["width"] >= 1024 else 0.85)
                page.set_viewport_size({"width": width, "height": height})
                page.wait_for_function(
                    "(desktop)=>probe.ScrollTrigger.getAll().filter(t=>t.pin).length===(desktop?4:0)",
                    arg=width >= 1024,
                )
                page.evaluate("probe.ScrollTrigger.refresh()")
                seek("#top", 0)
                page.wait_for_function(
                    'getComputedStyle(document.querySelector(".hero-fade")).opacity==="1"'
                )
                frames()
                if width >= 1024:
                    r = page.locator('[data-hero-frame="desktop"]').evaluate(
                        "e=>e.getBoundingClientRect().toJSON()"
                    )
                    assert abs(r["width"] - min(width * 0.32, 540)) < 1, r
                    assert abs(r["top"] - height * 0.13) < 1, r
                    assert abs(r["height"] - height * 0.74) < 1, r
                    seek("#about", 0.4375)
                    fits(".about-phrase:nth-child(2)")
                    seek('[data-chapter="02"]', 0.92)
                    fits(".cap-title:nth-child(4)")
                assert page.evaluate("document.documentElement.scrollWidth<=innerWidth")
            print(engine, "resize and breakpoint changes PASS", flush=True)
            # Real case-study links unmount all home pins; remounting must not accumulate them.
            seek("#top", 0)
            for cycle in range(3):
                page.locator(f'a[href^="{base_path}/work/"]').first.evaluate(
                    "e=>e.click()"
                )
                page.wait_for_url("**/work/**")
                page.wait_for_function(
                    '!document.querySelector("#top") && document.querySelectorAll(".pin-spacer").length===0'
                )
                page.wait_for_function(
                    '[...document.querySelectorAll("div[aria-hidden]")].filter(e=>e.classList.contains("z-[90]")).flatMap(e=>[...e.children]).every(e=>getComputedStyle(e).visibility==="hidden")'
                )
                page.locator('nav a[data-cursor="HOME"]').click()
                page.wait_for_url(url + "/")
                page.wait_for_function(
                    'document.querySelectorAll(".pin-spacer").length===4 && getComputedStyle(document.querySelector(".hero-fade")).opacity==="1"'
                )
                page.wait_for_function(
                    "probe.ScrollTrigger.getAll().length===" + str(initial_count)
                )
                seek("#top", 0)
                restored(initial)
            print(engine, "route cleanup PASS", flush=True)
            # Reduced motion keeps its existing static composition and no home pins.
            page.emulate_media(reduced_motion="reduce")
            page.reload(wait_until="networkidle")
            page.evaluate("document.fonts.ready")
            page.wait_for_function(
                'document.querySelectorAll(".pin-spacer").length===0'
            )
            assert (
                page.locator(".hero-last").evaluate(
                    "e=>Number(getComputedStyle(e).opacity)"
                )
                > 0.999
            )
            assert page.evaluate("document.documentElement.scrollWidth<=innerWidth")
            print(engine, "reduced motion PASS", flush=True)
        except Exception as e:
            failures.append(str(e))
            traceback.print_exc()
            snapshot("lifecycle-failure")
    if mode in ["all", "fonts"]:
        page.emulate_media(reduced_motion="no-preference")
        try:
            held = []
            page.route("https://fonts.gstatic.com/**", lambda route: held.append(route))
            page.goto(url + "/", wait_until="domcontentloaded")
            page.wait_for_function(
                'document.fonts.status==="loading" && document.querySelectorAll(".pin-spacer").length===4'
            )
            page.evaluate(
                "async()=>{const base=new URL(document.querySelector('nav a[data-cursor=HOME]').href).pathname;const {gsap,ScrollTrigger}=await import(base+'src/lib/gsap.ts');const {scrollToTarget}=await import(base+'src/lib/scroll.ts');window.probe={gsap,ScrollTrigger,scrollToTarget};}"
            )
            # Start the scrub before the entrance finishes, while web fonts are held.
            seek("#top", 0.46)
            seek("#top", 0)
            page.wait_for_function(
                'getComputedStyle(document.querySelector(".hero-fade")).opacity==="1"'
            )
            seek('[data-chapter="02"]', 0.92)
            fits(".cap-title:nth-child(4)")
            fallback = (
                page.locator(".cap-title")
                .nth(3)
                .evaluate("e=>getComputedStyle(e).fontSize")
            )
            assert held, "Font request interception did not occur"
            for route in held:
                route.continue_()
            page.unroute("https://fonts.gstatic.com/**")
            page.evaluate("document.fonts.ready")
            frames()
            seek('[data-chapter="02"]', 0.92)
            fits(".cap-title:nth-child(4)")
            loaded = (
                page.locator(".cap-title")
                .nth(3)
                .evaluate("e=>getComputedStyle(e).fontSize")
            )
            seek("#about", 0.4375)
            fits(".about-phrase:nth-child(2)")
            seek("#top", 0)
            assert page.locator('[data-hero-frame="desktop"] .hero-reveal').evaluate(
                "e=>getComputedStyle(e).clipPath"
            ) in ["inset(0%)", "inset(0% 0% 0% 0%)", "none"]
            assert (
                page.locator(".hero-last").evaluate(
                    "e=>Number(getComputedStyle(e).opacity)"
                )
                > 0.999
            )
            print(
                engine,
                "delayed fonts and early scroll PASS",
                fallback,
                "→",
                loaded,
                flush=True,
            )
        except Exception as e:
            failures.append(str(e))
            traceback.print_exc()
            snapshot("font-failure")
    (out / f"{engine}-{mode}.json").write_text(
        json.dumps(
            {"results": results, "failures": failures, "consoleErrors": errors},
            indent=2,
        )
    )
    browser.close()
    sys.exit(bool(failures or errors))
