# AnaKaz — portfolio site

The home page built from the Figma file *Site-anakazdesign* (page **Ready for publish**, desktop 1440 and mobile 393 frames).
Static site on [Astro](https://astro.build), published with GitHub Pages:
**https://naskaz2003-art.github.io/ana-kaz-design-v1/**

Every change pushed to the `main` branch is published automatically in 1–2 minutes (tab **Actions** shows the progress).

---

## Where to change things

All the content is in a few small data files. You can edit them right on GitHub: open the file → pencil icon → **Commit changes**.

| What | File |
|---|---|
| Links: resume, Telegram, Behance, LinkedIn, email | `src/data/site.json` → `"links"` |
| Texts: name, role, buttons, section labels, About, footer | `src/data/site.json` |
| Project cards: order, client, category, year, title, case link, cover | `src/data/projects.json` |
| Case pages: texts, project facts, photos | `src/data/cases/<case>.json` + photos in `src/assets/cases/<case>/` |
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
- **`url`** — address of the case: a page of this site (`"projects/steadycontrol-gastreet/"`), Behance, a PDF. When it is filled, the whole card becomes a link and gets the hover animation from Figma (cover zooms in, the orange arrow badge appears; on phones the badge is always visible). While it is empty, the card is not clickable and has no badge.
- **`image`** — file name of the cover. Put the photo into `src/assets/projects/` and write its name here, e.g. `"siderra.jpg"`. Covers are square; 1600 × 1600 px is enough. While it is empty, a light grey placeholder with the client name is shown.
- **`imageAlt`** — short description of the picture for screen readers, e.g. `"Siderra packaging on a marketplace page"`.

### Hero slideshow (`src/data/slides.json`)

Each slide has a `label` (the text under the progress line), an `image` and an `imageAlt`.
Photos go into `src/assets/hero/` (landscape, 2880 × 1800 px or larger); write the file name into `image`.
While `image` is empty, the slide is the brand blue from the layout. Slides change every 5 seconds with a 0.8 s cross-fade, can be paused, and do not play by themselves when the visitor has “reduce motion” turned on.

Images are resized and converted automatically when the site is built (several sizes, modern formats), so you can upload large JPG/PNG files.

### Case pages (`src/data/cases/`)

Every file in `src/data/cases/` is one case page. The file name is its address:
`steadycontrol-gastreet.json` → https://naskaz2003-art.github.io/ana-kaz-design-v1/projects/steadycontrol-gastreet/
(linked from the GASTREET card on the home page).

The file has three parts:

- **`title`** — project title (on the hero image, in the breadcrumb and the browser tab).
- **`hero`** — the big picture at the top (`image`, `imageAlt`).
- **`meta`** — the facts under the hero (*Client / brand*, *Project type*, *Year*): each is a `label` + `value`. You can change, add or remove them.
- **`blocks`** — the page from top to bottom, in this order. Four kinds of blocks:

| `type` | What it is | Fields |
|---|---|---|
| `text` | Heading on the left, text on the right | `heading`; optional `lead` (big statement), `context` (grey line), `paragraphs` (list of paragraphs), `fields` (label + value rows) |
| `image` | One full-width picture | `ratio` (`"16:9"`, `"4:3"`, `"4:5"`, `"3:2"`, `"1:1"`), `image`, `imageAlt`, `caption` |
| `summary` | “Summary” row of facts | `label`, `fields` |
| `gallery` | 2–3 pictures in a row (stacked on phones) | `ratio`, `items` — each with `image`, `imageAlt`, `caption` |

- **Text:** change only the words inside the quotes. In `paragraphs` every item is a paragraph; `\n` inside an item starts a new line within the same paragraph.
- **Photos:** put the files into `src/assets/cases/steadycontrol-gastreet/` and write the file name into `image` of the right block. While `image` is empty, a grey placeholder in the same proportions is shown (the hero placeholder is brand blue so that the white title stays readable).
- **Captions:** hidden in the layout; write text into `caption` and it appears under the picture.
- **Order / more pictures:** move, copy or delete whole blocks `{ … }` (keep the commas between them).
- **Previous / Next project** at the bottom are taken automatically from the order of cards in `projects.json`. They become clickable when those cards get a `url`.

**New case:** copy `steadycontrol-gastreet.json` under a new name (Latin letters, words joined with `-`, e.g. `siderra.json`), change the texts, create the folder `src/assets/cases/siderra/` for its photos, and write `"url": "projects/siderra/"` in that card in `projects.json`.

### Texts

All home page texts are in `src/data/site.json`. Accent parts (orange words) are separate fields: `statementAccent` in About and in the footer.
Keep the quotes and commas as they are; only change the words inside the quotes.

---

## Links still missing (as of the first publication)

These elements are in the layout but Figma has no address for them, so they are not clickable yet:

- **Cases:** Siderra, EctoControl → `src/data/projects.json` → `url` (GASTREET links to its case page)
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
- Structure: `src/pages/index.astro` (home) and `src/pages/projects/[slug].astro` (one page per file in `src/data/cases/`) → `src/components/` (Header, Hero, SelectedWork, ProjectCard, About, FacetsDiagram, Footer, BackToTop, Icon, Logo) and `src/components/case/` (CaseHero, CaseText, CaseSummary, CaseImage, InfoField, ProjectNav).
- No frameworks on the client: the header state, mobile menu, slideshow and back-to-top button are small inline scripts.
- `design-tokens/figma-variables.json` is the raw export of the Figma variables; `src/styles/tokens.css` was generated from it, names match the Figma Dev Mode code syntax.
- Deploy: `.github/workflows/deploy.yml` builds on every push to `main` and publishes `dist/` to the `gh-pages` branch. In the repository settings, **Pages → Source** must be *Deploy from a branch*, branch `gh-pages`, folder `/ (root)`.
- If you connect your own domain later, set `site` to it in `astro.config.mjs` and remove `base`.
