/**
 * Static site builder: reads src/data/conference-data.js and writes dist/.
 * Run: npm run build   (or: node build.js)
 * Layout follows cdti.ac.th (top bar, 2-row header, banner + quick links, news rows,
 * navy band with photo cards); content structure follows ECTI-FIT + CCAT.
 */
const fs = require("fs");
const path = require("path");
const D = require("./src/data/conference-data.js");

const SRC = path.join(__dirname, "src");
const DIST = path.join(__dirname, "dist");
const IMG = D.images;

/* ---------- helpers ---------- */
const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
// Escape text and mark placeholders ([...], รอประกาศ, TBA, ---, --:--) so they render faded.
const t = (s) => {
  const raw = String(s ?? "");
  if (/^(TBA|รอประกาศ|---|--:--)$/.test(raw.trim())) return `<span class="ph">${esc(raw)}</span>`;
  return esc(raw).replace(/\[[^\]]+\]/g, (m) => `<span class="ph">${m}</span>`);
};
const plain = (s) => String(s ?? "").replace(/[\[\]]/g, "");
const join = (arr, fn) => arr.map(fn).join("");
// decorative = true → empty alt (image only sets mood behind text)
const img = (key, rel, { cls = "", lazy = true, decorative = false } = {}) =>
  `<img${cls ? ` class="${cls}"` : ""} src="${rel}/img/${IMG[key].file}" alt="${decorative ? "" : esc(IMG[key].alt)}"${lazy ? ' loading="lazy"' : ""} decoding="async">`;

const I = (d, size = 20, sw = 1.8) =>
  `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${sw}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;
const ICON = {
  calendar: '<rect x="3" y="4.5" width="18" height="16.5" rx="2.5"/><path d="M16 2.5v4M8 2.5v4M3 10h18"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>',
  mic: '<rect x="9" y="2" width="6" height="12" rx="3"/><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
  up: '<path d="M12 19V5M6 11l6-6 6 6"/>',
  info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
  phone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z"/>',
  building: '<path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16M16 9h2a2 2 0 0 1 2 2v10M2 21h20M8 7h4M8 11h4M8 15h4"/>',
  file: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6M8 13h8M8 17h5"/>',
  user: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  users: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14.5a7 7 0 0 1 4 6.5"/>',
  cpu: '<rect x="5" y="5" width="14" height="14" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 2v3M15 2v3M9 19v3M15 19v3M2 9h3M2 15h3M19 9h3M19 15h3"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  chip: '<path d="M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M2 9a15 15 0 0 1 20 0"/><circle cx="12" cy="19.5" r="1"/>',
  layers: '<path d="m12 2 10 5-10 5L2 7z"/><path d="m2 12 10 5 10-5M2 17l10 5 10-5"/>',
  archive: '<rect x="2" y="3" width="20" height="5" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8M10 12h4"/>',
  mark: '<path d="M4 19V8l8-4 8 4v11"/><path d="M8 19v-6h8v6M2 19h20"/>',
  pencil: '<path d="M17 3a2.8 2.8 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5z"/><path d="m15 5 4 4"/>',
  megaphone: '<path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  clipboard: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v1M9 11h6M9 15h4"/>',
  presentation: '<path d="M2 3h20M4 3v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3M12 16v5M8 21h8"/><path d="m8 11 3-3 2 2 3-3"/>'
};
const icon = (name, size, sw) => I(ICON[name] || ICON.info, size, sw);

/* ---------- navigation ---------- */
const PAGES = {
  home: { slug: "", th: "หน้าแรก" },
  about: { slug: "about", th: "กฎบัตรงานประชุม", desc: "เป้าหมาย ขอบเขต และแผนงาน 9 สัปดาห์", img: "panel" },
  committee: { slug: "committee", th: "คณะผู้จัดงาน", desc: "ผังองค์กรและหน้าที่ 6 ทีม", img: "research" },
  archive: { slug: "archive", th: "งานที่ผ่านมา", desc: "งานประชุมครั้งก่อน ๆ", img: "hero" },
  cfp: { slug: "cfp", th: "ประกาศรับบทความ", desc: "หัวข้อ ขอบเขต และกำหนดการ", img: "poster" },
  submission: { slug: "submission", th: "การส่งบทความ", desc: "รูปแบบบทความ เทมเพลต และระบบส่ง", img: "research" },
  program: { slug: "program", th: "กำหนดการ", img: "panel" },
  registration: { slug: "registration", th: "ลงทะเบียน", img: "hero" },
  venue: { slug: "venue", th: "สถานที่จัดงาน", nav: "สถานที่", img: "hero" },
  contact: { slug: "contact", th: "ติดต่อเรา", img: "research" }
};
const href = (key, rel) => (key === "home" ? `${rel}/index.html` : `${rel}/${PAGES[key].slug}/index.html`);

function navHtml(current, rel) {
  const cur = (k) => (current === k ? ' aria-current="page"' : "");
  const link = (key) => `<li class="nav-item"><a class="nav-link" href="${href(key, rel)}"${cur(key)}>${PAGES[key].nav || PAGES[key].th}</a></li>`;
  const drop = (label, keys, id) => `<li class="nav-item${keys.includes(current) ? " is-current" : ""}">
      <button class="nav-link" type="button" aria-expanded="false" aria-controls="dd-${id}">${label}${icon("chevron", 16)}</button>
      <div class="dropdown" id="dd-${id}">${join(keys, (k) => `<a href="${href(k, rel)}"${cur(k)}><strong>${PAGES[k].th}</strong><small>${PAGES[k].desc}</small></a>`)}</div>
    </li>`;
  return `<nav class="nav" id="site-nav" aria-label="เมนูหลัก">
    <div class="nav-top">
      <a href="${href("archive", rel)}">งานที่ผ่านมา</a>
      <a href="${href("contact", rel)}">ติดต่อเรา</a>
      <a href="${D.course.instituteUrl}" target="_blank" rel="noopener">เว็บสถาบัน ↗</a>
    </div>
    <ul class="nav-main">
      <li><a class="nav-cta" href="${href("submission", rel)}">${icon("pencil", 17)}ส่งบทความ</a></li>
      ${link("home")}
      ${drop("เกี่ยวกับงาน", ["about", "committee", "archive"], "about")}
      ${drop("บทความ", ["cfp", "submission"], "papers")}
      ${link("program")}
      ${link("registration")}
      ${link("venue")}
    </ul>
  </nav>`;
}

function layout({ key, rel, body }) {
  const C = D.conference, K = D.course;
  const title = key === "home"
    ? `${plain(C.acronym)} · งานประชุมวิชาการ ${K.code} ${K.instituteShort}`
    : `${PAGES[key].th} · ${plain(C.acronym)}`;
  const ticker = D.dates.map((d) => `${d.th} สัปดาห์ที่ ${d.week}`).join(" · ");
  return `<!DOCTYPE html>
<html lang="th">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="งานประชุมวิชาการของรายวิชา ${K.code} ${K.nameTh} ${K.facultyTh} ${K.instituteTh}">
<meta name="theme-color" content="#22374D">
<meta name="color-scheme" content="light">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Niramit:wght@400;500;600;700&display=swap" rel="stylesheet">
<link rel="stylesheet" href="${rel}/css/style.css">
<script>document.documentElement.classList.add("js")</script>
</head>
<body>
<a class="skip-link" href="#main">ข้ามไปเนื้อหา</a>

<div class="topbar">
  <div class="container">
    ${icon("megaphone", 20)}
    <div class="ticker">ประกาศ: ${esc(ticker)}</div>
    <span class="code">${K.code}</span>
    <a href="${K.instituteUrl}" target="_blank" rel="noopener">cdti.ac.th ↗</a>
  </div>
</div>

<header class="site-header">
  <div class="container">
    <a class="brand" href="${href("home", rel)}" aria-label="${esc(plain(C.acronym))} หน้าแรก">
      <img class="brand-logo" src="${rel}/img/cdti-logo.svg" alt="${K.instituteTh}" width="469" height="108">
      <span class="brand-divider" aria-hidden="true"></span>
      <span class="brand-text"><span class="brand-name">${t(C.acronym)}</span><span class="brand-sub">${K.code} Seminar in CPE</span></span>
    </a>
    <button class="menu-toggle" type="button" aria-expanded="false" aria-controls="site-nav" aria-label="เปิดเมนู">${icon("menu", 22)}</button>
    ${navHtml(key, rel)}
  </div>
</header>

<main id="main">
${body}
</main>

<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div class="footer-about">
        <a class="footer-logo" href="${K.instituteUrl}" target="_blank" rel="noopener"><img src="${rel}/img/cdti-logo.svg" alt="${K.instituteTh}" width="469" height="108" loading="lazy"></a>
        <div class="footer-acr">${t(C.acronym)}</div>
        <p>งานประชุมวิชาการของรายวิชา ${K.code} ${K.nameTh} ${K.facultyTh} ${K.instituteTh}</p>
      </div>
      <div><h2>งานประชุม</h2><ul>
        <li><a href="${href("about", rel)}">กฎบัตรงานประชุม</a></li>
        <li><a href="${href("committee", rel)}">คณะผู้จัดงาน</a></li>
        <li><a href="${href("program", rel)}">กำหนดการ</a></li>
        <li><a href="${href("archive", rel)}">งานที่ผ่านมา</a></li></ul></div>
      <div><h2>สำหรับผู้เขียน</h2><ul>
        <li><a href="${href("cfp", rel)}">ประกาศรับบทความ</a></li>
        <li><a href="${href("submission", rel)}">การส่งบทความ</a></li>
        <li><a href="${href("registration", rel)}">ลงทะเบียน</a></li></ul></div>
      <div><h2>ติดต่อ</h2><ul>
        <li><a href="${href("venue", rel)}">สถานที่จัดงาน</a></li>
        <li><a href="${href("contact", rel)}">ติดต่อเรา</a></li>
        <li><a href="${K.instituteUrl}" target="_blank" rel="noopener">${K.instituteTh} ↗</a></li></ul></div>
    </div>
    <div class="footer-bottom">
      <span>© ${K.year} ${K.code} ${K.nameTh} · ${K.instituteShort}</span>
      <span>ภาพประกอบจาก Wikimedia Commons (สาธารณสมบัติ / CC0) · <a href="${href("contact", rel)}#credits">ที่มาของภาพ</a></span>
    </div>
  </div>
</footer>

<button class="to-top" type="button" aria-label="กลับขึ้นด้านบน">${icon("up", 22)}</button>
<script src="${rel}/js/main.js" defer></script>
</body>
</html>
`;
}

/* ---------- shared blocks ---------- */
const sectionTitle = (th, sub, more, rel, moreLabel = "ดูทั้งหมด") => `
  <div class="section-title reveal">
    <div><h2>${th}</h2>${sub ? `<p>${sub}</p>` : ""}</div>
    ${more ? `<a class="more" href="${href(more, rel)}">${moreLabel} ${icon("arrow", 18)}</a>` : ""}
  </div>`;

const pageHero = (key, rel, intro) => `
  <section class="page-hero">
    ${img(PAGES[key].img, rel, { lazy: false, decorative: true })}
    <div class="container">
      <nav class="crumbs" aria-label="เส้นทางนำทาง"><a href="${href("home", rel)}">หน้าแรก</a><span aria-hidden="true">/</span><span>${PAGES[key].th}</span></nav>
      <h1>${PAGES[key].th}</h1>
      ${intro ? `<p>${intro}</p>` : ""}
    </div>
  </section>`;

// CDTI-style list rows with circle arrow buttons
const dateRows = (rel) => `<ul class="rows">${join(D.dates, (d) => `
  <li class="${d.key ? "key" : ""}"><a href="${href("cfp", rel)}">
    <div class="row-num"><small>สัปดาห์</small><b>${d.week}</b></div>
    <div class="row-text"><strong>${t(d.th)}</strong><span>${t(d.date)}</span></div>
    <span class="circle-btn">${icon("arrow", 20, 2.2)}</span>
  </a></li>`)}</ul>`;

const topicCards = () => `<div class="grid-3">${join(D.topics, (tp, i) => `
  <article class="card card-hover topic reveal">
    <span class="track">กลุ่มที่ ${i + 1}</span>
    <div class="icon-tile">${icon(tp.icon, 24)}</div>
    <h3>${t(tp.th)}</h3>
    <p>${t(tp.desc)}</p>
  </article>`)}</div>`;

const programTabs = (idPrefix) => {
  const tabs = join(D.program, (p, i) =>
    `<button class="tab" role="tab" id="${idPrefix}-tab-${i}" aria-controls="${idPrefix}-panel-${i}" aria-selected="${i === 0}" tabindex="${i === 0 ? 0 : -1}">${p.th}</button>`);
  const panels = join(D.program, (p, i) => `
    <div class="tab-panel" role="tabpanel" id="${idPrefix}-panel-${i}" aria-labelledby="${idPrefix}-tab-${i}"${i === 0 ? "" : " hidden"}>
      <ol class="timeline">${join(p.items, (it) => `
        <li class="timeline-item">
          <div class="timeline-time">${t(it.time)}</div>
          <div class="timeline-rail"><span></span></div>
          <div class="timeline-body"><div><h3>${t(it.title)}</h3>${it.en ? `<p>${t(it.en)}</p>` : ""}</div><span class="tag ${it.type}">${({ oral: "บรรยาย", poster: "โปสเตอร์", talk: "พิธีการ", break: "พัก" })[it.type]}</span></div>
        </li>`)}</ol>
    </div>`);
  return `<div class="tabs" role="tablist" aria-label="ช่วงเวลา">${tabs}</div>${panels}`;
};

const teamCard = (tm) => `
  <article class="card team reveal${tm.id === "chair" ? " is-chair" : ""}">
    <h3>${t(tm.th)}</h3>
    <p>${t(tm.duty)}</p>
    <div class="lead"><span>หัวหน้าทีม</span><span>${t(tm.lead)}</span></div>
  </article>`;

const speakerCards = () => `<div class="stack">${join(D.keynotes, (k) => `
  <article class="card speaker reveal">
    <div class="avatar">${icon("user", 38)}</div>
    <div><div class="label">วิทยากรรับเชิญ</div><h3>${t(k.name)}</h3><p>${t(k.affiliation)}</p><p>${t(k.talk)}</p></div>
  </article>`)}</div>`;

const note = (html) => `<div class="note">${icon("info", 18)}<div>${html}</div></div>`;
const kv = (rows) => `<div class="kv table-wrap">${join(rows, ([k, v]) => `<div>${k}</div><div>${v}</div>`)}</div>`;
const contactList = () => `<ul class="info-list">
  <li><span class="icon-tile">${icon("building", 22)}</span><div><div class="k">สถานที่</div><div class="v">${t(D.venue.name)}</div><div class="k">${t(D.venue.address)}</div></div></li>
  <li><span class="icon-tile">${icon("calendar", 22)}</span><div><div class="k">วันจัดงาน</div><div class="v">${t(D.conference.date)}</div><div class="k">${t(D.conference.dateNote)}</div></div></li>
  <li><span class="icon-tile">${icon("mail", 22)}</span><div><div class="k">อีเมล</div><div class="v">${t(D.contact.email)}</div></div></li>
  <li><span class="icon-tile">${icon("phone", 22)}</span><div><div class="k">โทรศัพท์</div><div class="v">${t(D.contact.phone)}</div></div></li>
</ul>`;

/* ---------- home ---------- */
function home() {
  const rel = ".", C = D.conference;
  const quick = [
    ["submission", "pencil", "ส่งบทความ"],
    ["cfp", "grid", "หัวข้อที่เปิดรับ"],
    ["program", "clock", "กำหนดการ"],
    ["committee", "users", "ทีมผู้จัดงาน"],
    ["registration", "clipboard", "ลงทะเบียน"]
  ];
  const paths = [
    ["submission", "research", "file", "ส่งบทความ", "เทมเพลตและขั้นตอนการส่ง"],
    ["cfp", "poster", "presentation", "นำเสนอผลงาน", "บรรยาย 4 เรื่อง · โปสเตอร์ 10 เรื่อง"],
    ["program", "panel", "mic", "กำหนดการวันงาน", "วิทยากรและช่วงการนำเสนอ"]
  ];
  return layout({
    key: "home", rel, body: `
<section class="hero" id="top">
  ${img("hero", rel, { cls: "hero-img", lazy: false, decorative: true })}
  <div class="container">
    <span class="status"><span class="status-dot" aria-hidden="true"></span>${esc(C.status)}</span>
    <h1>${t(C.nameTh)}</h1>
    <div class="acr">${t(C.acronym)}</div>
    <div class="flourish" aria-hidden="true"><span></span></div>
    <p class="theme">ธีม: ${t(C.themeTh)}</p>
    <div class="meta">
      <span>${icon("calendar", 18)}${t(C.date)} · ${t(C.dateNote)}</span>
      <span>${icon("pin", 18)}${t(C.venue)} · ${t(C.venueNote)}</span>
      <span>${icon("mic", 18)}${t(C.format)}</span>
    </div>
    <div class="btn-row">
      <a class="btn btn-cdti" href="${href("submission", rel)}">ส่งบทความ ${icon("arrow", 20, 2.2)}</a>
      <a class="btn btn-outline-light" href="${href("cfp", rel)}">ประกาศรับบทความ</a>
    </div>
  </div>
</section>

<div class="quick">
  <div class="container">
    <nav class="quick-card" aria-label="ทางลัด">${join(quick, ([k, ic, label]) => `
      <a href="${href(k, rel)}"><span class="quick-icon">${icon(ic, 34, 1.6)}</span><span>${label}</span></a>`)}
    </nav>
  </div>
</div>

<nav class="section-nav" aria-label="ส่วนต่าง ๆ ในหน้านี้">
  <div class="container"><ul>
    <li><a href="#news">ประกาศและกำหนดการสำคัญ</a></li>
    <li><a href="#authors">สำหรับผู้เขียน</a></li>
    <li><a href="#topics">หัวข้อ</a></li>
    <li><a href="#keynotes">วิทยากร</a></li>
    <li><a href="#program">กำหนดการวันงาน</a></li>
    <li><a href="#committee">ทีมผู้จัดงาน</a></li>
    <li><a href="#venue">สถานที่และติดต่อ</a></li>
  </ul></div>
</nav>

<section class="section" id="news">
  <div class="container">
    ${sectionTitle("ประกาศและกำหนดการสำคัญ", "วันที่จริงจะประกาศเมื่อทีมตกลงกันแล้ว ตอนนี้อ้างอิงตามสัปดาห์ของภาคเรียน")}
    <div class="news">
      <a class="feature reveal" href="${href("cfp", rel)}">
        ${img("poster", rel)}
        <div class="feature-body">
          <span class="tag">ประกาศ</span>
          <h3>ประกาศรับบทความ ${t(C.acronym)}</h3>
          <p>เปิดรับบทความด้านวิศวกรรมคอมพิวเตอร์ใน ${D.topics.length} กลุ่มหัวข้อ นำเสนอแบบบรรยาย 4 เรื่อง และโปสเตอร์ 10 เรื่อง</p>
          <div class="date">สัปดาห์ที่ 3 · ${t(D.dates[0].date)}</div>
        </div>
      </a>
      <div class="reveal">
        ${dateRows(rel)}
        <div class="news-actions"><a class="btn btn-cdti" href="${href("cfp", rel)}">ดูทั้งหมด ${icon("arrow", 20, 2.2)}</a></div>
      </div>
    </div>
  </div>
</section>

<section class="section dark" id="authors">
  <div class="container">
    ${sectionTitle("สำหรับผู้เขียน", "ทุกอย่างที่ต้องรู้ ตั้งแต่ส่งบทความจนถึงวันนำเสนอ")}
    <div class="grid-3">${join(paths, ([k, im, ic, h, p]) => `
      <a class="photo-card reveal" href="${href(k, rel)}">
        ${img(im, rel)}
        <div class="band"><span class="badge">${icon(ic, 44, 1.5)}</span><h3>${h}</h3><p>${p}</p></div>
      </a>`)}
    </div>
    <div class="stats">${join(D.stats, (s) => `<div class="stat reveal"><b>${s.value}</b><span>${s.th}</span></div>`)}</div>
  </div>
</section>

<section class="section" id="topics">
  <div class="container">
    ${sectionTitle("หัวข้อที่เปิดรับ", `บทความด้านวิศวกรรมคอมพิวเตอร์ใน ${D.topics.length} กลุ่มหัวข้อ`, "cfp", rel)}
    ${topicCards()}
  </div>
</section>

<section class="section white" id="keynotes">
  <div class="container">
    ${sectionTitle("วิทยากรรับเชิญ", "", "program", rel)}
    <div class="media-split">
      ${img("panel", rel, { cls: "reveal" })}
      ${speakerCards()}
    </div>
  </div>
</section>

<section class="section" id="program">
  <div class="container">
    ${sectionTitle("กำหนดการวันงาน", "เวลาจะยืนยันหลังประชุมคณะกรรมการวิชาการในสัปดาห์ที่ 7", "program", rel)}
    <div class="reveal">${programTabs("home")}</div>
  </div>
</section>

<section class="section white" id="committee">
  <div class="container">
    ${sectionTitle("ทีมผู้จัดงาน", "นักศึกษาทุกคนเป็นทั้งผู้เขียน ผู้พิจารณาบทความ และผู้จัดงาน", "committee", rel)}
    <div class="grid-3">${join(D.teams, teamCard)}</div>
  </div>
</section>

<section class="section" id="venue">
  <div class="container">
    ${sectionTitle("สถานที่และการติดต่อ", "", "venue", rel)}
    <div class="grid-2">
      <div class="card reveal">${contactList()}</div>
      <div class="venue-img reveal">${img("hero", rel)}<span class="cap">ห้องจัดงานจะประกาศเมื่อยืนยันแล้ว (ภาพประกอบ)</span></div>
    </div>
  </div>
</section>`
  });
}

/* ---------- sub-pages ---------- */
function subpage(key, intro, sections, opts = {}) {
  const rel = "..";
  const toc = sections.filter((s) => s.id && s.title);
  const body = `
${pageHero(key, rel, intro)}
<div class="page-body"><div class="container">
  <div class="page-layout${opts.wide ? " wide" : ""}">
    ${opts.wide ? "" : `<aside class="page-toc" aria-label="ในหน้านี้">${toc.length > 1 ? `<strong>ในหน้านี้</strong>${join(toc, (s) => `<a href="#${s.id}">${s.title}</a>`)}` : `<strong>${PAGES[key].th}</strong><a href="${href("home", rel)}">กลับหน้าแรก</a>`}</aside>`}
    <div class="page-main">${join(sections, (s) => `
      <section class="block${s.bare ? " bare" : ""}"${s.id ? ` id="${s.id}"` : ""}>${s.title ? `<h2>${s.title}</h2>` : ""}${s.lead ? `<p class="lead-text">${s.lead}</p>` : ""}${s.html}</section>`)}
    </div>
  </div>
</div></div>`;
  return layout({ key, rel, body });
}

const pages = {
  about: () => {
    const C = D.conference;
    return subpage("about", "สรุปสิ่งที่ทีมตกลงกันแล้วและสิ่งที่ต้องทำต่อ สำหรับงานประชุมวิชาการของรายวิชา 300-1412", [
      { id: "objective", title: "เป้าหมาย", html: `<p>ให้นักศึกษาเห็นภาพรวมของการจัดงานประชุมวิชาการ และได้ลองทำหน้าที่ผู้จัดงานจริง ตั้งแต่เปิดรับบทความจนถึงวันนำเสนอ</p>
        <ul class="steps" style="margin-top:16px"><li>เขียนบทความของตัวเอง</li><li>พิจารณาบทความของเพื่อน</li><li>ร่วมตัดสินผล</li><li>จัดงาน</li><li>นำเสนองาน</li></ul>` },
      { id: "identity", title: "อัตลักษณ์ของงาน", lead: "ช่องสีจางคือส่วนที่ทีมยังต้องตัดสินใจ", html: kv([
        ["ชื่องาน", `${t(C.nameTh)}<br>${t(C.nameEn)} (ชื่อภาษาอังกฤษ)`], ["ชื่อย่อ", t(C.acronym)], ["ธีม", t(C.themeTh)],
        ["ขอบเขต", `${D.topics.length} กลุ่มหัวข้อ · <a href="${href("cfp", "..")}">ดูรายละเอียด</a>`], ["กลุ่มเป้าหมาย", t(C.audience)],
        ["วันและสถานที่", `${t(C.date)} · ${t(C.venue)}`], ["อัตลักษณ์ภาพ", "สีน้ำเงินเข้ม น้ำเงินเทา และเหลือง ตามเว็บสถาบัน CDTI"]]) },
      { id: "workflow", title: "ขั้นตอนของงาน", html: `<ol class="steps">${join(D.workflow, (w) => `<li>${esc(w)}</li>`)}</ol>` },
      { id: "roadmap", title: "แผนงาน 9 สัปดาห์", lead: "จากวางแผนถึงวันจัดงาน", html: `<div class="table-wrap"><table>
        <thead><tr><th>สัปดาห์</th><th>งานหลัก</th><th>สถานะ</th></tr></thead>
        <tbody>${join(D.roadmap, (r) => `<tr${r.done ? ' class="is-done"' : ""}><td class="num">${r.week}</td><td>${esc(r.th)}</td><td>${r.done ? '<span class="check">✓ เสร็จแล้ว</span>' : '<span class="ph">—</span>'}</td></tr>`)}</tbody>
      </table></div>` },
      { id: "deliverables", title: "สิ่งที่ต้องส่งในสัปดาห์ที่ 1", html: `<div class="grid-3">${join([["file", "กฎบัตรงานประชุม", "เอกสารหน้านี้"], ["users", "ผังองค์กร", `<a href="${href("committee", "..")}">หน้าคณะผู้จัดงาน</a>`], ["calendar", "ไทม์ไลน์เบื้องต้น", "ตารางด้านบน"]], ([ic, h, p]) =>
        `<div class="card"><div class="icon-tile">${icon(ic, 24)}</div><h3 style="font-size:18px;margin-top:14px">${h}</h3><p style="color:var(--muted);font-size:16px">${p}</p></div>`)}</div>` }
    ]);
  },

  committee: () => {
    const chair = D.teams[0], rest = D.teams.slice(1);
    return subpage("committee", "ทุกทีมต้องมีหัวหน้า สมาชิก และงานที่ต้องส่งชัดเจน ใส่ชื่อแทน “---” เมื่อแบ่งทีมเสร็จ", [
      { id: "chart", title: "ผังองค์กร", html: `<div class="org">${teamCard(chair)}<div class="org-line" aria-hidden="true"></div><div class="org-row">${join(rest, teamCard)}</div></div>` },
      { id: "members", title: "สมาชิกแต่ละทีม", html: `<div class="accordion">${join(D.teams, (tm, i) => `
        <details${i === 0 ? " open" : ""}><summary><span>${esc(tm.th)}<small>${esc(tm.duty)}</small></span>${icon("chevron", 20)}</summary>
        <div class="acc-body"><ul class="member-list"><li><span>หัวหน้าทีม</span><span>${t(tm.lead)}</span></li>${join(tm.members, (m) => `<li><span>สมาชิก</span><span>${t(m)}</span></li>`)}</ul></div></details>`)}</div>` },
      { id: "advisors", title: "อาจารย์ประจำวิชา", html: `<div class="grid-2">${join(D.course.instructors, (n) => `<div class="card speaker"><div class="avatar sm">${icon("user", 26)}</div><div><h3 style="font-size:18px">${esc(n)}</h3><p>${D.course.facultyTh}</p></div></div>`)}</div>` }
    ], { wide: true });
  },

  archive: () => subpage("archive", "", [
    { html: `<div class="empty"><div class="icon-tile">${icon("archive", 30)}</div><h2 style="border:0;margin:0;padding:0">ยังไม่มีงานที่ผ่านมา</h2><p>งานนี้เป็นงานประชุมวิชาการครั้งแรกของรายวิชา งานปีถัดไปจะแสดงที่หน้านี้</p></div>` }
  ]),

  cfp: () => {
    const C = D.conference;
    return subpage("cfp", "เชิญส่งบทความวิจัยด้านวิศวกรรมคอมพิวเตอร์ ประกาศฉบับนี้เป็นร่างแรกและจะอัปเดตในสัปดาห์ที่ 3", [
      { id: "theme", title: "ธีมของงาน", html: `<p style="font-size:20px;font-weight:600;color:var(--navy)">${t(C.themeTh)}</p>` },
      { id: "scope", title: "ขอบเขตหัวข้อ", lead: "ธีมบอกทิศทางกว้าง ๆ ส่วนขอบเขตบอกว่าบทความแบบไหนเข้าข่าย", html: topicCards() },
      { id: "fit", title: "บทความแบบไหนเข้าข่าย", html: note(`ต้องมีส่วนที่เป็นงานด้านเทคนิค เช่น ออกแบบ พัฒนา หรือทดลองระบบ ส่วนงานวิเคราะห์ธุรกิจที่ไม่มีการพัฒนาทางเทคนิค <span class="ph">[คณะกรรมการวิชาการกำลังพิจารณา]</span>`) },
      { id: "dates", title: "กำหนดการสำคัญ", html: dateRows("..") },
      { id: "types", title: "รูปแบบการนำเสนอ", html: `<div class="grid-2">
        <div class="card"><span class="tag oral">บรรยาย</span><h3 style="margin-top:12px">นำเสนอแบบบรรยาย 4 บทความ</h3><p style="color:var(--muted)">เวลานำเสนอ <span class="ph">รอประกาศ</span></p></div>
        <div class="card"><span class="tag poster">โปสเตอร์</span><h3 style="margin-top:12px">นำเสนอแบบโปสเตอร์ 10 บทความ</h3><p style="color:var(--muted)">ขนาดโปสเตอร์ <span class="ph">รอประกาศ</span></p></div></div>` },
      { bare: true, html: `<a class="btn btn-cdti" href="${href("submission", "..")}">วิธีส่งบทความ ${icon("arrow", 20, 2.2)}</a>` }
    ]);
  },

  submission: () => {
    const S = D.submission;
    return subpage("submission", "รูปแบบบทความ เทมเพลต และช่องทางส่งบทความ", [
      { id: "system", title: "ระบบส่งบทความ", html: `${note(esc(S.systemNote))}<p style="margin-top:16px"><a class="btn btn-cdti" aria-disabled="true" tabindex="-1">ไปที่ระบบส่งบทความ</a></p>` },
      { id: "format", title: "รูปแบบบทความ", html: kv([["ความยาว", t(S.length)], ["ภาษา", t(S.language)], ["การพิจารณา", t(S.review)], ["ไฟล์ที่ส่ง", "PDF"]]) },
      { id: "templates", title: "เทมเพลต", html: `<div class="grid-2">${join(S.templates, (tp) => `<div class="card speaker"><div class="icon-tile">${icon("file", 24)}</div><div style="flex:1"><h3 style="font-size:18px">${esc(tp.label)}</h3><p>${tp.file ? `<a href="${esc(tp.file)}">ดาวน์โหลด</a>` : '<span class="ph">เร็ว ๆ นี้</span>'}</p></div></div>`)}</div>` },
      { id: "steps", title: "ขั้นตอน", html: `<ol class="steps"><li>เขียนบทความตามเทมเพลต</li><li>ส่งผ่านระบบ</li><li>รอผลการพิจารณา</li><li>แก้ไขตามความเห็น</li><li>ส่งฉบับสมบูรณ์</li></ol>` }
    ]);
  },

  program: () => subpage("program", "กำหนดการวันงาน เวลาจริงจะยืนยันหลังประชุมคณะกรรมการวิชาการในสัปดาห์ที่ 7", [
    { id: "schedule", title: "ตารางเวลา", html: programTabs("prog") },
    { id: "keynotes", title: "วิทยากรรับเชิญ", html: speakerCards() },
    { id: "sessions", title: "ช่วงการนำเสนอ", html: `<div class="table-wrap"><table><thead><tr><th>ช่วง</th><th>ประเภท</th><th>บทความ</th><th>ประธานช่วง</th></tr></thead><tbody>
      <tr><td>บรรยาย ช่วงที่ 1</td><td><span class="tag oral">บรรยาย</span></td><td>2</td><td><span class="ph">---</span></td></tr>
      <tr><td>บรรยาย ช่วงที่ 2</td><td><span class="tag oral">บรรยาย</span></td><td>2</td><td><span class="ph">---</span></td></tr>
      <tr><td>โปสเตอร์</td><td><span class="tag poster">โปสเตอร์</span></td><td>10</td><td><span class="ph">---</span></td></tr></tbody></table></div>` }
  ]),

  registration: () => {
    const R = D.registration;
    return subpage("registration", "ข้อมูลการลงทะเบียนเข้าร่วมงาน", [
      { id: "types", title: "ประเภทผู้เข้าร่วม", html: `<div class="table-wrap"><table><thead><tr><th>ประเภท</th><th>รายละเอียด</th><th>ค่าลงทะเบียน</th></tr></thead><tbody>${join(R.types, (r) => `<tr><td><strong>${esc(r.th)}</strong></td><td>${t(r.detail)}</td><td>${t(R.fee)}</td></tr>`)}</tbody></table></div>` },
      { id: "how", title: "วิธีลงทะเบียน", html: note(t(R.note)) }
    ]);
  },

  venue: () => subpage("venue", "", [
    { id: "place", title: "สถานที่", html: `<div class="grid-2"><div>${contactList()}</div>
      <div class="venue-img">${img("hero", "..")}<span class="cap">ภาพประกอบ — รอยืนยันห้องจัดงาน</span></div></div>` },
    { id: "travel", title: "การเดินทาง", html: note('<span class="ph">[ข้อมูลการเดินทางและที่จอดรถ — ทีมสถานที่และการจัดงาน]</span>') }
  ]),

  contact: () => subpage("contact", "", [
    { id: "channels", title: "ช่องทางติดต่อ", html: `<ul class="info-list">
      <li><span class="icon-tile">${icon("mail", 22)}</span><div><div class="k">อีเมล</div><div class="v">${t(D.contact.email)}</div></div></li>
      <li><span class="icon-tile">${icon("phone", 22)}</span><div><div class="k">โทรศัพท์</div><div class="v">${t(D.contact.phone)}</div></div></li>
      <li><span class="icon-tile">${icon("building", 22)}</span><div><div class="k">สำนักงาน</div><div class="v">${t(D.contact.office)}</div></div></li></ul>` },
    { id: "teams", title: "ติดต่อตามเรื่อง", html: `<div class="table-wrap"><table><thead><tr><th>เรื่อง</th><th>ทีม</th><th>ผู้ติดต่อ</th></tr></thead><tbody>
      <tr><td>การส่งบทความ / การพิจารณา</td><td>คณะกรรมการวิชาการ</td><td>${t(D.teams[1].lead)}</td></tr>
      <tr><td>เว็บไซต์ / ลงทะเบียน</td><td>ทีมเว็บไซต์และลงทะเบียน</td><td>${t(D.teams[3].lead)}</td></tr>
      <tr><td>สถานที่ / อุปกรณ์</td><td>ทีมสถานที่และการจัดงาน</td><td>${t(D.teams[5].lead)}</td></tr>
      <tr><td>เรื่องอื่น ๆ</td><td>ประธานจัดงาน</td><td>${t(D.teams[0].lead)}</td></tr></tbody></table></div>` },
    { id: "credits", title: "ที่มาของภาพประกอบ", html: `<ul class="member-list">${join(Object.values(IMG), (im) => `<li><span>${esc(im.credit)}</span><a href="${esc(im.source)}" target="_blank" rel="noopener">ที่มา ↗</a></li>`)}</ul>` }
  ])
};

/* ---------- write ---------- */
function copyDir(from, to) {
  fs.mkdirSync(to, { recursive: true });
  for (const f of fs.readdirSync(from)) fs.copyFileSync(path.join(from, f), path.join(to, f));
}
function build() {
  fs.rmSync(DIST, { recursive: true, force: true });
  copyDir(path.join(SRC, "css"), path.join(DIST, "css"));
  copyDir(path.join(SRC, "js"), path.join(DIST, "js"));
  copyDir(path.join(SRC, "img"), path.join(DIST, "img"));
  fs.writeFileSync(path.join(DIST, "index.html"), home());
  for (const [key, fn] of Object.entries(pages)) {
    const dir = path.join(DIST, PAGES[key].slug);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, "index.html"), fn());
  }
  console.log(`Built ${1 + Object.keys(pages).length} pages → dist`);
}
build();
