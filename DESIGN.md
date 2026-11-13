# DESIGN.md — Mini-Conference · 300-1412 Seminar in CPE · CDTI

Rules for anyone (or any AI tool) editing this site. Keep the look consistent with cdti.ac.th.

## Brand
- Light, formal, friendly. Blue on white. **No black** — use navy for text.
- Language: Thai everywhere (menus, buttons, headings, labels). English only for proper names, the conference English name and acronym, and common tech terms (IoT, LaTeX, PDF).

## Color tokens (`app/src/css/style.css`) — sampled from cdti.ac.th
| Token | Hex | Use |
|---|---|---|
| `--page` | #F3F3F3 | page background |
| `--navy` | #22374D | top bar, dark sections, footer, headings, table headers |
| `--slate` | #607698 | buttons, photo-card bands, circle arrow buttons, active tab |
| `--yellow` | #F5EB14 | text on slate buttons (18px bold), numbers on navy, footer headings |
| `--blue` | #4B78BC | links, focus ring (CDTI accent) |
| `--sky-50` | #EEF3FB | icon tiles, hover backgrounds |
| `--text` | #34445A | body text (no black) |
| `--muted` | #66758A | secondary text |

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
- Placeholders: `[...]`, `รอประกาศ`, `---`. They render faded automatically. Do not invent facts.
- Plain, short Thai sentences. No marketing language.

## Accessibility
- Touch targets ≥ 44px, visible focus ring, respects reduced motion, works at 375px width.
