#!/usr/bin/env python3
"""Run bounded, offline contract checks for the public static site."""

from __future__ import annotations

import re
import sys
from pathlib import Path
from urllib.parse import urlparse
from xml.etree import ElementTree


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_HTML = sorted(
    path
    for path in ROOT.rglob("*.html")
    if "demo" not in path.relative_to(ROOT).parts
)
SITEMAP_NS = "{http://www.sitemaps.org/schemas/sitemap/0.9}"
REQUIRED_META = {
    "canonical": re.compile(r'<link\s+rel=["\']canonical["\']\s+href=', re.I),
    "description": re.compile(r'<meta\s+name=["\']description["\']\s+content=', re.I),
    "og:title": re.compile(r'<meta\s+property=["\']og:title["\']\s+content=', re.I),
}
PRODUCT_LINKS = {
    "Map": "https://map.unboundcompute.com/",
    "Atropos": "https://atropos.unboundcompute.com/",
    "Lachesis": "https://lachesis.unboundcompute.com/",
    "Casefiles": "https://trace.unboundcompute.com/",
}


def fail(message: str, failures: list[str]) -> None:
    failures.append(message)


def local_path_from_url(url: str) -> Path | None:
    parsed = urlparse(url)
    if parsed.scheme != "https" or parsed.netloc != "unboundcompute.com":
        return None
    path = parsed.path or "/"
    relative = path.lstrip("/")
    candidate = ROOT / relative
    if path.endswith("/"):
        candidate /= "index.html"
    return candidate


def main() -> int:
    failures: list[str] = []

    for path in PUBLIC_HTML:
        text = path.read_text(encoding="utf-8")
        relative = path.relative_to(ROOT)
        for label, pattern in REQUIRED_META.items():
            if not pattern.search(text):
                fail(f"{relative}: missing {label} metadata", failures)

    robots = (ROOT / "robots.txt").read_text(encoding="utf-8")
    if "Sitemap: https://unboundcompute.com/sitemap.xml" not in robots:
        fail("robots.txt: missing primary sitemap declaration", failures)

    sitemap = ElementTree.parse(ROOT / "sitemap.xml")
    urls = sitemap.findall(f"{SITEMAP_NS}url/{SITEMAP_NS}loc")
    if not urls:
        fail("sitemap.xml: no URLs found", failures)
    for loc in urls:
        url = (loc.text or "").strip()
        path = local_path_from_url(url)
        if path is None:
            fail(f"sitemap.xml: URL is outside the local public site: {url}", failures)
        elif not path.is_file():
            fail(f"sitemap.xml: target does not exist: {path.relative_to(ROOT)}", failures)

    research = (ROOT / "research.html").read_text(encoding="utf-8")
    for product, url in PRODUCT_LINKS.items():
        if url not in research:
            fail(f"research.html: missing {product} journey link", failures)

    homepage = (ROOT / "index.html").read_text(encoding="utf-8")
    artifact = ROOT / "uc-evidence-card-linkedin.png"
    if not artifact.is_file():
        fail("index.html: referenced open-stack evidence artifact is missing", failures)
    if 'src="uc-evidence-card-linkedin.png"' not in homepage:
        fail("index.html: open-stack evidence artifact is not referenced", failures)
    if "Captured Lachesis evidence card" not in homepage:
        fail("index.html: open-stack evidence artifact is missing meaningful alt text", failures)

    if failures:
        print("Site contract failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Site contract passed: {len(PUBLIC_HTML)} public HTML pages, {len(urls)} sitemap URLs")
    return 0


if __name__ == "__main__":
    sys.exit(main())
