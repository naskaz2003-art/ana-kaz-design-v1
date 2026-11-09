import site from '../data/site.json';

export type LinkKey = keyof typeof site.links;

/** Address for a link from src/data/site.json → "links". Empty string = not added yet. */
export function linkFor(key: LinkKey): string {
  const value = (site.links[key] ?? '').trim();
  if (!value) return '';
  if (key === 'email') return value.startsWith('mailto:') ? value : `mailto:${value}`;
  if (/^([a-z]+:|\/|#)/i.test(value)) return value;
  // A plain file name (e.g. "resume.pdf") = a file in the public/ folder of this site
  if (/^[^/]+\.(pdf|docx?|pptx?|png|jpe?g|webp)$/i.test(value)) return withBase(value);
  // An address typed without https:// (e.g. "t.me/username")
  return `https://${value}`;
}

/** True for addresses that open another site (they open in a new tab). */
export function isExternal(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Prefix a path inside the site with the GitHub Pages base folder. */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}/${path.replace(/^\//, '')}`;
}
