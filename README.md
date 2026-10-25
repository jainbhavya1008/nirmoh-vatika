# Nirmoh Vatika: static website

A simple website made only of HTML, CSS and JavaScript. **The whole website is one scrolling page (`index.html`)**: Introduction, Jain Books, Questions, Pratiyogita and Clock to Rosary, one after another. The menu scrolls to each section. There is **no backend, no database and no login**. It can be hosted free on GitHub Pages.

## See it on your computer (do this first)
1. Open the folder `nirmoh-vatika-static`.
2. Double-click **`START-PREVIEW.bat`**. A black window opens and your browser opens http://localhost:8000/
   (Or, in a terminal opened inside this folder, type: `py -3.11 -m http.server 8000` and then open http://localhost:8000/ )
3. To stop it, click the black window and press **Ctrl+C**, or just close the window.

The preview must be started from the folder that contains `index.html`. Do not open the pages by double-clicking the `.html` files: the PDF reader will not work that way.

## What is in the folders
```
index.html           THE WEBSITE (one scrolling page with all sections)
introduction.html, books.html, questions.html, pratiyogita.html,
clock-to-rosary.html   old separate pages: no longer linked, kept as spare copies and hidden from Google
reader.html          the PDF reader (opened by the Read Online buttons)
404.html             the "page not found" page
content-data.js      THE LIST of books/documents (edit this to add PDFs)
robots.txt, sitemap.xml   crawl rules and sitemap (generated with your real address before publishing)
site-config.js            optional production-domain, Search Console and GA4 settings
generate-seo.ps1          safely writes canonical URLs, robots.txt and sitemap.xml for the real site address
favicon.ico          the browser-tab icon
START-PREVIEW.bat    starts the preview on Windows
assets/css/style.css colours, fonts, spacing
assets/js/           layout.js (header/menu/footer), list.js (book lists), reader.js (PDF reader)
assets/img/          portraits, rosary diagram, favicon, book covers
assets/vendor/pdfjs/ the PDF.js reader files (pinned version 3.11.174; do not edit)
pdfs/books|questions|pratiyogita/   the PDF files
```

## Which file do I edit to change...?
| I want to change | Edit this |
|---|---|
| Colours, fonts, spacing, buttons | `assets/css/style.css` (the first 15 lines are the colours and fonts) |
| Header, menu names, **footer** | `assets/js/layout.js` (the list of 5 menu items is at the top) |
| Introduction text | `index.html`, the section with `id="introduction"` |
| Clock to Rosary text or diagram | `index.html`, the section with `id="clock-to-rosary"`; picture `assets/img/rosary.webp` |
| Portraits in the header | replace `assets/img/vishuddh.webp` (left) and `assets/img/nirmoh.webp` (right), keep the same names |
| Introduction portrait | replace `assets/img/maharaj.webp` |
| Books, Questions, Pratiyogita lists | `content-data.js` (see `ADD-NEW-PDF-GUIDE.md`) |
| Browser-tab icon | replace `favicon.ico`, `assets/img/favicon.png`, `assets/img/apple-touch-icon.png` (square pictures) |
| Page titles and Google descriptions | the `<title>` and `<meta name="description">` lines at the top of each page |

## Notes you should know
* The website title shown in the browser tab is **Nirmoh Vatika** on the Home page. Other pages show, for example, "Jain Books – Nirmoh Vatika".
* The English PDF is large (about 81 MB). GitHub allows up to 100 MB per file but warns above 50 MB. If publishing complains, the file needs a smaller version (compress it with a PDF tool; the original is never changed by this project).
* The Questions and Pratiyogita pages say "No documents available yet." until you add PDFs.
* All paths are relative, so the site works at `https://USERNAME.github.io/nirmoh-vatika/` and on a custom domain.
* Nothing here has been published or pushed anywhere.

## Later: publish on GitHub Pages and Google (not done yet)
1. Create a free GitHub account and a repository (for example `nirmoh-vatika`), upload everything in this folder, then Settings, Pages, "Deploy from a branch", branch `main`, folder `/ (root)`.
2. Your address will be shown there. Set the final `https://` address in `site-config.js` (without a trailing slash), then run this in PowerShell from this folder:
   ```powershell
   .\generate-seo.ps1 -SiteUrl "https://your-real-site.example"
   ```
   This writes absolute canonical URLs and Open Graph URLs into the two indexable pages and creates the matching `robots.txt` and sitemap. It intentionally does not accept an unverified placeholder address.
3. Google Search Console: add your address, verify it (optionally place its verification token in `site-config.js`), submit `sitemap.xml`, and request indexing of the home page. No verification or submission is performed by this project.
4. Google Analytics is disabled. If you decide to use GA4, add the real measurement ID to `site-config.js` only after reviewing the privacy policy; visitors are asked for consent before the script is loaded.
Google decides whether and when pages are shown; nothing is guaranteed.
