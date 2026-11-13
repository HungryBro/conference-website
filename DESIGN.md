# DESIGN.md — Mini-Conference · 300-1412 Seminar in CPE · CDTI

Rules for anyone (or any AI tool) editing this site. Keep the look consistent with cdti.ac.th.

## Brand
- Light, formal, friendly. Blue on white. **No black** — use navy for text.
- Two languages: Thai site at `dist/`, English at `dist/en/`, built from the same data. The ไทย/EN switch sits in the gray utility pill (top right) and links to the same page in the other language. Text fields in the data file are `{ th, en }`; plain strings show in both.

## Color tokens (`app/src/css/style.css`) — sampled from cdti.ac.th
| Token | Hex | Use |
|---|---|---|
| `--page` | #F3F3F3 | page background |
| `--navy` | #22374D | top bar, dark sections, footer, headings, table headers |
| `--slate` | #536583 | buttons, photo-card bands, circle arrow buttons, active tab (darkened from CDTI #607698 so yellow text passes 4.5:1) |
| `--yellow` | #F5EB14 | text on slate buttons (18px bold), numbers on navy, footer headings |
| `--blue` | #4B78BC | focus ring, decoration (CDTI accent) |
| `--link` | #446FB0 | text links, current menu item (passes 4.5:1 on white and gray) |
| `--sky-50` | #EEF3FB | icon tiles, hover backgrounds |
| `--text` | #34445A | body text (no black) |
| `--muted` | #5E6D82 | secondary text and placeholders |

Do not add new colors in components; use the tokens.

## Type
- Font: Niramit (same as cdti.ac.th), 400/500/600/700. Body 17px, line-height 1.7.

## Shape & depth
- Radius 10 / 18 / 28px. Cards white on the gray page; on white sections cards use the gray page color.
- Soft navy-tinted shadows only.

## Structure
- Layout copies cdti.ac.th: navy announcement bar → white header (logo left, gray utility pill + main nav with outlined "ส่งบทความ" button) → photo banner with overlapping white quick-link card → news block (navy feature card + rows with circle arrows) → navy band with photo cards → navy footer.
- Home = one long page with a sticky section nav (ECTI-FIT style) + "ดูทั้งหมด" links to sub-pages.
- Sub-pages via dropdown menu (CCAT style): About ▸ Charter / Committee / Archive, Papers ▸ CFP / Submission, Program, Registration, Venue, Contact.

## Images
- Logo: `app/src/img/cdti-logo.svg`, the official file from cdti.ac.th. Header: logo | divider | conference acronym (logo only on phones). Footer: logo on a white tile.
- Photos live in `app/src/img/`, listed with credits in `images` in the data file. All from Wikimedia Commons, public domain or CC0. Replace with real event photos when available.

## Content
- All content lives in `app/src/data/conference-data.js`. Then run `npm run build` in `app/`.
- Placeholders: `[...]`, `รอประกาศ` / `TBA`, `---`. They render faded automatically. Do not invent facts.
- Plain, short Thai sentences. No marketing language.

## Accessibility
- All text meets WCAG AA 4.5:1. Check new colors before adding them.
- Dropdowns close when focus leaves; the mobile drawer traps focus and makes the page behind it inert; tabs support arrows, Home, End and keep the choice in `?tab=`.
- Images get width/height from the file at build time; the first banner image loads with `fetchpriority="high"`.
- Touch targets ≥ 44px, visible focus ring, respects reduced motion, works at 375px width.
