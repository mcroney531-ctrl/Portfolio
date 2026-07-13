# Projects

Each project lives in **its own folder** here and is fully self-contained. This
is deliberate: the site shell (nav, homepage, Approach, Contact) and the
individual projects are decoupled, so you can restructure the shell or the Work
page without re-migrating or re-linking every project.

## How to add a project

1. **Copy the template folder** `_template/` to a new folder named with a URL
   slug, e.g. `projects/onboarding-scenario/`.
2. **Edit** `projects/<slug>/index.html`: title, description, and the
   problem / what I did / outcome sections. Add images (with real alt text),
   embeds, or video as needed.
3. **Link it from the Work page.** Open `/work.html`, and inside the
   `WORK SCAFFOLD` comment:
   - Copy one `<article class="project-card">` into the correct **format group**.
   - Set `data-format` (must match the group) and `data-capabilities`
     (comma-separated, e.g. `scenario-design,accessibility`).
   - Point the card link at `projects/<slug>/`.
   - Fill in the title, one-sentence blurb, and visible capability tags.
4. **First project?** Delete the `.empty-state` block in `work.html` and
   uncomment the `WORK SCAFFOLD` block.

## The two axes

Projects are organized on two independent axes so visitors can browse *or*
search by skill:

- **Format** (the spine) — the kind of thing it is. Each project sits in exactly
  one format group on the Work page: eLearning builds, performance support,
  strategy & planning, video walkthroughs. Add or rename groups freely.
- **Capability** (the cross-cut) — the skills it demonstrates. A project can
  carry several (`data-capabilities`). The capability filter on the Work page
  lets a visitor slice across every format at once.

Because both axes live in the card's data attributes, re-organizing is a
content edit on one page — never a structural rebuild.

## Folders starting with `_`

`_template/` is prefixed with an underscore only as a naming convention to keep
it sorted at the top and easy to spot. The site uses no build step (see the
`.nojekyll` file at the repo root), so underscore-prefixed folders are served
normally. It's a template, not a published project — don't link to it.
