# Portfolio

A static, accessibility-first portfolio site for freelance learning &
experience design work. Hand-written HTML/CSS with a touch of optional
JavaScript — no build step, hosted on GitHub Pages.

## Positioning

The site's job is to demonstrate one thing before you even read a project:
**taking dense, flat, or overwhelming material and making it navigable.** The
nav and structure are intentionally calm and legible because the IA is itself
the first proof of that skill.

## Structure

```
index.html            Home — positioning + through-line
work.html             Work — projects grouped by format, filtered by capability
approach.html         Approach — how you work (the freelance differentiator)
contact.html          Contact — Formspree form
404.html              Friendly not-found page
projects/             Self-contained project pages (decoupled from the shell)
  _template/          Copy this to start a new project
  README.md           How to add a project + the two-axis model
assets/
  css/styles.css      Design tokens + all styling (light & dark themes)
  js/site.js          Footer year + Work-page capability filter (optional)
  favicon.svg         Monogram favicon
robots.txt, sitemap.xml, .nojekyll
```

### Two design decisions worth knowing

- **Flat `.html` files at the root** (not folders) keep the nav markup identical
  on every page and portable across `github.io/portfolio` and a future custom
  domain. To edit the nav, change the `SHARED NAV` block — it's the same in
  every page (only `aria-current` differs to mark the active page).
- **The shell and the projects are decoupled.** Each project is a standalone
  folder under `projects/`. Adding one never requires touching the homepage or
  nav — you just drop a card into `work.html`. See `projects/README.md`.

## Adding a project

See [`projects/README.md`](projects/README.md). Short version: copy
`projects/_template/`, edit it, and add one card to `work.html`.

## Accessibility

Built in from the start, not bolted on: semantic landmarks (`header`/`nav`/
`main`/`footer`), one `h1` per page, a skip-to-content link, visible focus
styles, `aria-current` on the active nav item, labelled form fields with hints,
respect for `prefers-reduced-motion`, dark-mode support via
`prefers-color-scheme`, and color contrast that meets WCAG AA. Keep this bar as
you add content (real alt text on every image, in particular).

## Personalize before going live

- [ ] Replace **"Your Name"** everywhere (page titles, brand wordmark, footer).
      Find them with: `grep -rn "Your Name" .`
- [ ] Set the **Formspree** endpoint in `contact.html`
      (replace `YOUR_FORM_ID` — create a form at https://formspree.io).
- [ ] Add your **LinkedIn URL** to the footer link (`rel="me"`) on each page.
- [ ] Confirm the **contact email** in `contact.html` (currently a personal
      Gmail — swap for a professional address if you prefer).
- [ ] If you use a **custom domain**, add a `CNAME` file, update the absolute
      URLs in `sitemap.xml`, `robots.txt`, the `canonical`/`og:url` tags, and
      change `/portfolio/` paths in `404.html` to `/`.

## Enabling GitHub Pages

Repo **Settings → Pages → Build and deployment → Source: Deploy from a branch**,
then pick your published branch and `/ (root)`. The site appears at
`https://mcroney531-ctrl.github.io/portfolio/`.
