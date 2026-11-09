import site from '../data/site.json';

export type LinkKey = keyof typeof site.links;

/** Prefix a path inside the site with the GitHub Pages base folder. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}

/**
 * Turns what is written in the data files into a working address:
 *   ""                               → "" (link not added yet)
 *   "https://…", "mailto:…", "#…"    → as written
 *   "resume.pdf"                     → file in the public/ folder of this site
 *   "projects/steadycontrol-gastreet" → page of this site
 *   "t.me/username"                  → https://t.me/username
 */
export function resolveHref(raw: string | undefined): string {
  const value = (raw ?? '').trim();
  if (!value) return '';
  if (/^([a-z][a-z0-9+.-]*:|#)/i.test(value)) return value;
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  if (value.startsWith('/')) return base && value.startsWith(base + '/') ? value : withBase(value);
  const first = value.split('/')[0];
  const isFile = /\.(pdf|docx?|pptx?|key|png|jpe?g|webp|gif|mp4|zip)$/i.test(value) && !value.includes('/');
  if (first.includes('.') && !isFile) return `https://${value}`;
  return withBase(value);
}

/** Address for a link from src/data/site.json → "links". Empty string = not added yet. */
export function linkFor(key: LinkKey): string {
  const value = (site.links[key] ?? '').trim();
  if (!value) return '';
  if (key === 'email') return value.startsWith('mailto:') ? value : `mailto:${value}`;
  return resolveHref(value);
}

/** True for addresses that open another site (they open in a new tab). */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Link to a section of the home page: "#work" on the home page itself, "/…/#work" from other pages. */
export function homeHref(hash = '', onHome = true): string {
  if (onHome) return hash || '#top';
  return withBase('/') + hash;
}
