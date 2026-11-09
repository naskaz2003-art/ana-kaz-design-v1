# AnaKaz — portfolio site

The home page built from the Figma file *Site-anakazdesign* (page **Ready for publish**, desktop 1440 and mobile 393 frames).
Static site on [Astro](https://astro.build), published with GitHub Pages:
**https://naskaz2003-art.github.io/ana-kaz-design-v1/**

Every change pushed to the `main` branch is published automatically in 1–2 minutes (tab **Actions** shows the progress).

---

## Where to change things

All the content is in four small files. You can edit them right on GitHub: open the file → pencil icon → **Commit changes**.

| What | File |
|---|---|
| Links: resume, Telegram, Behance, LinkedIn, email | `src/data/site.json` → `"links"` |
| Texts: name, role, buttons, section labels, About, footer | `src/data/site.json` |
| Project cards: order, client, category, year, title, case link, cover | `src/data/projects.json` |
| Hero slideshow: slides, their labels and photos, slide time | `src/data/slides.json` (time: `site.json` → `hero.slideSeconds`) |
| Client logos in “Selected brand experience” | `src/assets/brands/` + `site.json` → `about.brands` |
| Colours, spacing, radii (design tokens from Figma) | `src/styles/tokens.css` |

### Links

In `src/data/site.json`:

```json
"links": {
  "resume": "https://…/Kaznacheevskaia-CV.pdf",
  "telegram": "https://t.me/username",
  "behance": "https://www.behance.net/username",
  "linkedin": "https://www.linkedin.com/in/username",
  "email": "name@example.com"
}
```

- An **empty** value (`""`) means the link has not been added yet: the button or link is shown as in the layout but does nothing. No fake `#` links.
- `resume` is used by four places at once: *Resume* in the header, *Download resume* (About and mobile menu), *Resume / CV* in the footer.
- `email` is just the address; the site makes the `mailto:` link and shows the address in the footer instead of the placeholder.
- To host the resume file on this site, put the PDF into the folder `public/` (for example `public/resume.pdf`) and write just the file name: `"resume": "resume.pdf"`.
- Links to other sites open in a new tab.

### Project cards (`src/data/projects.json`)

```json
{
  "client": "Siderra",
  "category": "Branding",
  "year": "2025",
  "title": "Brand identity and marketplace design for Siderra",
  "url": "",
  "image": "",
  "imageAlt": ""
}
```

- **Order** of cards on the page = order in the file. To move a card, move its whole `{ … }` block (keep the commas between blocks).
- **`url`** — address of the case (Behance, a PDF, a future case page). When it is filled, the whole card becomes a link and gets the hover animation from Figma (cover zooms in, the orange arrow badge appears; on phones the badge is always visible). While it is empty, the card is not clickable and has no badge.
- **`image`** — file name of the cover. Put the photo into `src/assets/projects/` and write its name here, e.g. `"siderra.jpg"`. Covers are square; 1600 × 1600 px is enough. While it is empty, a light grey placeholder with the client name is shown.
- **`imageAlt`** — short description of the picture for screen readers, e.g. `"Siderra packaging on a marketplace page"`.

### Hero slideshow (`src/data/slides.json`)

Each slide has a `label` (the text under the progress line), an `image` and an `imageAlt`.
Photos go into `src/assets/hero/` (landscape, 2880 × 1800 px or larger); write the file name into `image`.
While `image` is empty, the slide is the brand blue from the layout. Slides change every 5 seconds with a 0.8 s cross-fade, can be paused, and do not play by themselves when the visitor has “reduce motion” turned on.

Images are resized and converted automatically when the site is built (several sizes, modern formats), so you can upload large JPG/PNG files.

### Texts

All texts are in `src/data/site.json`. Accent parts (orange words) are separate fields: `statementAccent` in About and in the footer.
Keep the quotes and commas as they are; only change the words inside the quotes.

---

## Links still missing (as of the first publication)

These elements are in the layout but Figma has no address for them, so they are not clickable yet:

- **Cases:** Siderra, EctoControl, GASTREET → `src/data/projects.json` → `url`
- **Resume file** (Resume, Download resume, Resume / CV) → `site.json` → `links.resume`
- **Telegram**, **Behance**, **LinkedIn** → `site.json` → `links`
- **Email**: the layout shows the placeholder `ana.kaz.design@example` → `site.json` → `links.email`

---

## For developers

```bash
npm install
npm run dev       # http://localhost:4321/ana-kaz-design-v1/
npm run build     # static files in dist/
npm run preview
```

- Requires Node 22.23.4 or newer.
- Structure: `src/pages/index.astro` (page) → `src/components/` (Header, Hero, SelectedWork, ProjectCard, About, FacetsDiagram, Footer, BackToTop, Icon, Logo).
- No frameworks on the client: the header state, mobile menu, slideshow and back-to-top button are small inline scripts.
- `design-tokens/figma-variables.json` is the raw export of the Figma variables; `src/styles/tokens.css` was generated from it, names match the Figma Dev Mode code syntax.
- Deploy: `.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to the `gh-pages` branch. In the repository settings, **Pages → Source** must be *Deploy from a branch*, branch `gh-pages`, folder `/ (root)`.
- If you connect your own domain later, set `site` to it in `astro.config.mjs` and remove `base`.
