"""Browser checks against npm run preview (requires Python Playwright and Chrome).

python tests/static_pages.py
PORTFOLIO_URL=http://127.0.0.1:4189/stefanpenchev-com/ python tests/static_pages.py
"""

import os
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree

from playwright.sync_api import sync_playwright

url = (
    os.environ.get("PORTFOLIO_URL", "http://127.0.0.1:4173/stefanpenchev-com/").rstrip(
        "/"
    )
    + "/"
)
base_path = urlparse(url).path
origin = url.removesuffix(base_path)
artifacts = Path(".artifacts/static-pages")
artifacts.mkdir(parents=True, exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch(channel="chrome", headless=True)
    context = browser.new_context(viewport={"width": 1440, "height": 900})
    page = context.new_page()
    errors = []
    page.on("pageerror", lambda error: errors.append(str(error)))
    page.on(
        "console", lambda msg: errors.append(msg.text) if msg.type == "error" else None
    )
    page.on(
        "response",
        lambda response: (
            errors.append(f"{response.status} {response.url}")
            if response.url.startswith(origin) and response.status >= 400
            else None
        ),
    )
    sitemap = context.request.get(url + "sitemap.xml")
    assert sitemap.status == 200
    paths = [
        urlparse(element.text).path
        for element in ElementTree.fromstring(sitemap.text()).iter()
        if element.tag.endswith("}loc")
    ]
    assert len(paths) > 1 and base_path in paths

    # Every route must work as its own HTML document, including with JavaScript disabled.
    static_context = browser.new_context(java_script_enabled=False)
    static_page = static_context.new_page()
    for path in paths:
        assert path.startswith(base_path)
        for target in [page, static_page]:
            response = target.goto(origin + path, wait_until="networkidle")
            assert response.status == 200, path
            assert target.locator("main h1").inner_text().strip(), path
            assert "Stefan Penchev" in target.title(), path
        response = page.reload(wait_until="networkidle")
        assert response.status == 200, path
        print("Direct load, reload and HTML content PASS:", path, flush=True)
    static_context.close()

    for asset, content_type in [
        ("files/stefan-penchev-cv.pdf", "application/pdf"),
        ("images/stefan-penchev.png", "image/png"),
        ("favicon.svg", "image/svg+xml"),
    ]:
        response = context.request.get(url + asset)
        assert (
            response.status == 200 and content_type in response.headers["content-type"]
        )
    assert context.request.get(url + "work/missing-project/").status == 404
    assert context.request.get(origin + "/files/stefan-penchev-cv.pdf").status == 404

    # Production scripts must hydrate and run the preserved scroll animations.
    page.goto(url, wait_until="networkidle")
    page.wait_for_function(
        "document.querySelectorAll('.pin-spacer').length===4 && "
        "getComputedStyle(document.querySelector('.hero-fade')).opacity==='1'"
    )
    for _ in range(2):
        page.evaluate("window.scrollTo(0, innerHeight * 2.6 * .46)")
        page.wait_for_function(
            "Number(getComputedStyle(document.querySelector('.hero-last')).opacity)<.005"
        )
        page.locator('nav a[data-cursor="HOME"]').click()
        page.wait_for_function(
            "scrollY<1 && Number(getComputedStyle(document.querySelector('.hero-last')).opacity)>.999"
        )
    assert page.locator("img.hero-img").evaluate_all(
        "els=>els.every(e=>e.complete && e.naturalWidth===800)"
    )
    page.screenshot(path=str(artifacts / "desktop-home.png"))
    print("Hydration, desktop scroll and home navigation PASS", flush=True)

    # Exercise real clicks through the mobile menu, project pages and back-to-work link.
    page.set_viewport_size({"width": 390, "height": 844})
    page.goto(url, wait_until="networkidle")
    page.wait_for_function(
        "getComputedStyle(document.querySelector('.hero-fade')).opacity==='1'"
    )
    page.get_by_role("button", name="Open menu").click()
    page.get_by_role("link", name="Work", exact=True).click()
    project_link = page.locator(f'a[href^="{base_path}work/"]').first
    project_path = project_link.get_attribute("href")
    project_link.click()
    page.wait_for_url(origin + project_path)
    page.wait_for_function(
        "document.querySelector('.cs-title') && !document.querySelector('#top')"
    )
    assert page.locator(".pin-spacer").count() == 0
    next_link = page.locator('a[data-cursor="NEXT"]')
    next_path = next_link.get_attribute("href")
    next_link.click()
    page.wait_for_url(origin + next_path)
    page.reload(wait_until="networkidle")
    page.get_by_role("link", name="All work").click()
    page.wait_for_url(url + "#work")
    page.wait_for_function(
        "Math.abs(document.querySelector('#work').getBoundingClientRect().top)<2"
    )
    page.get_by_role("button", name="Open menu").click()
    page.get_by_role("link", name="Contact", exact=True).click()
    page.wait_for_function(
        "document.querySelector('#contact').getBoundingClientRect().top<innerHeight*.5"
    )
    page.locator('nav a[data-cursor="HOME"]').click()
    page.wait_for_function("scrollY<1")
    assert page.evaluate("document.documentElement.scrollWidth<=innerWidth")
    page.screenshot(path=str(artifacts / "mobile-home.png"))
    assert not errors, errors
    print("Mobile menu, project navigation, downloads and console PASS", flush=True)
    browser.close()
