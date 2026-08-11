# unboundcompute.com

The source for [unboundcompute.com](https://unboundcompute.com): the UnboundCompute landing
page and the free browser based security tools that live under `/tools/`.

UnboundCompute is an autonomous security researcher for web apps and APIs. It learns how an
application is meant to work, forms ideas about where that logic could break, designs
experiments to test those ideas, and proves a finding with hard evidence before reporting it.

## Free tools

There are 26 tools under [`/tools/`](https://unboundcompute.com/tools/), covering CSP, CORS,
JWTs, security headers, MCP server configuration, secret detection, ReDoS, subdomain takeover,
and more.

**Every tool runs entirely in your browser.** There is no signup, no server side processing,
and nothing you paste in is ever transmitted anywhere. Each one is a single self contained HTML
file with its logic inline, so you can read exactly what it does before you use it, or save the
page and run it offline.

## Layout

```
index.html            landing page
about.html            trust.html       research.html
careers.html          privacy.html     terms.html
design-partners.html
tools/                26 tools plus an index
demo/                 product walkthrough
deck/                 overview deck
*.css, *.js           brand and landing page styles, loaded directly
robots.txt            sitemap.xml      llms.txt
.htaccess             security response headers and redirects
```

## Working on it

There is no build step, no bundler, and no dependencies. The site is plain HTML, CSS, and
JavaScript, served as static files. Open any page directly in a browser, or serve the directory
if you want paths to resolve the way they do in production:

```
python3 -m http.server 8000
```

Then visit `http://localhost:8000`.

When adding a page, remember to add it to `sitemap.xml`. When adding a tool, keep it self
contained and client side, and add it to the index at `tools/index.html`.

## Deployment

Static hosting on Apache or LiteSpeed. `.htaccess` carries the security response headers,
including HSTS with `includeSubDomains`, so read the notes in that file before pointing a new
subdomain at the apex domain.

## License

The tools are free to use, but this repository is published for transparency rather than reuse.
The site content, copy, brand assets, and logos are all rights reserved. If you want to reuse
something here, open an issue and ask.

Our open source work lives in [Lachesis](https://github.com/UnboundCompute/lachesis), released
under AGPL 3.0.
