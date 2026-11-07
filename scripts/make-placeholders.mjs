// Generates branded PLACEHOLDER images (navy + orange) for products, categories, blog posts,
// team members and page heroes. Replace any file in public/images/ with a real photo of the
// SAME name and size (see docs/IMAGES.md) – no code change needed.
// Usage: node scripts/make-placeholders.mjs            (skips files that already exist)
//        node scripts/make-placeholders.mjs --force    (regenerates everything)
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { chromium } from "playwright";

const FORCE = process.argv.includes("--force");
const OUT = "public/images";
const font = (f) =>
  `data:font/woff2;base64,${fs.readFileSync(`public/fonts/${f}`).toString("base64")}`;

const ICONS = {
  cement: `<rect x="22" y="14" width="56" height="74" rx="8" fill="currentColor" opacity=".9"/><rect x="30" y="34" width="40" height="22" rx="3" fill="#0f1f3d"/><path d="M22 22h56M22 80h56" stroke="#0f1f3d" stroke-width="3"/>`,
  sand: `<path d="M8 84 Q30 34 50 30 Q70 34 92 84Z" fill="currentColor" opacity=".9"/><circle cx="40" cy="62" r="2" fill="#0f1f3d"/><circle cx="55" cy="52" r="2" fill="#0f1f3d"/><circle cx="62" cy="68" r="2" fill="#0f1f3d"/><circle cx="46" cy="74" r="2" fill="#0f1f3d"/>`,
  aggregate: `<polygon points="14,70 26,52 42,58 38,78 20,80" fill="currentColor"/><polygon points="44,62 58,44 76,50 72,72 52,76" fill="currentColor" opacity=".8"/><polygon points="34,44 46,28 62,34 56,48 40,52" fill="currentColor" opacity=".65"/><polygon points="64,80 78,66 90,74 84,88 68,88" fill="currentColor" opacity=".75"/>`,
  bricks: `<g fill="currentColor"><rect x="8" y="58" width="40" height="18" rx="2"/><rect x="52" y="58" width="40" height="18" rx="2"/><rect x="28" y="36" width="40" height="18" rx="2" opacity=".85"/><rect x="8" y="80" width="40" height="12" rx="2" opacity=".7"/><rect x="52" y="80" width="40" height="12" rx="2" opacity=".7"/></g>`,
  blocks: `<g fill="currentColor"><rect x="10" y="40" width="80" height="40" rx="3"/></g><rect x="20" y="48" width="24" height="24" rx="2" fill="#0f1f3d"/><rect x="56" y="48" width="24" height="24" rx="2" fill="#0f1f3d"/>`,
  steel: `<g stroke="currentColor" stroke-width="7" stroke-linecap="round"><line x1="12" y1="80" x2="88" y2="30"/><line x1="12" y1="66" x2="78" y2="22"/><line x1="22" y1="88" x2="90" y2="44"/></g><g stroke="#0f1f3d" stroke-width="2"><line x1="30" y1="62" x2="34" y2="68"/><line x1="50" y1="49" x2="54" y2="55"/><line x1="70" y1="36" x2="74" y2="42"/></g>`,
  wire: `<g fill="none" stroke="currentColor" stroke-width="5"><ellipse cx="50" cy="55" rx="34" ry="30"/><ellipse cx="50" cy="55" rx="24" ry="20"/><ellipse cx="50" cy="55" rx="14" ry="11"/></g><path d="M84 55 Q96 70 86 90" stroke="currentColor" stroke-width="4" fill="none"/>`,
  truck: `<rect x="6" y="34" width="54" height="34" rx="3" fill="currentColor"/><path d="M60 44h18l14 14v10H60z" fill="currentColor" opacity=".8"/><circle cx="24" cy="74" r="8" fill="currentColor"/><circle cx="76" cy="74" r="8" fill="currentColor"/><circle cx="24" cy="74" r="3" fill="#0f1f3d"/><circle cx="76" cy="74" r="3" fill="#0f1f3d"/>`,
  building: `<g fill="currentColor"><rect x="14" y="40" width="22" height="50"/><rect x="40" y="16" width="26" height="74" opacity=".9"/><rect x="70" y="50" width="18" height="40" opacity=".8"/></g><g fill="#0f1f3d"><rect x="46" y="24" width="5" height="6"/><rect x="55" y="24" width="5" height="6"/><rect x="46" y="36" width="5" height="6"/><rect x="55" y="36" width="5" height="6"/><rect x="46" y="48" width="5" height="6"/><rect x="55" y="48" width="5" height="6"/><rect x="20" y="48" width="4" height="5"/><rect x="27" y="48" width="4" height="5"/><rect x="20" y="60" width="4" height="5"/><rect x="27" y="60" width="4" height="5"/></g>`,
  calc: `<rect x="22" y="10" width="56" height="80" rx="8" fill="currentColor"/><rect x="30" y="18" width="40" height="18" rx="3" fill="#0f1f3d"/><g fill="#0f1f3d"><rect x="30" y="44" width="10" height="10" rx="2"/><rect x="45" y="44" width="10" height="10" rx="2"/><rect x="60" y="44" width="10" height="10" rx="2"/><rect x="30" y="60" width="10" height="10" rx="2"/><rect x="45" y="60" width="10" height="10" rx="2"/><rect x="60" y="60" width="10" height="24" rx="2"/><rect x="30" y="74" width="25" height="10" rx="2"/></g>`,
};

const CAT_ICON = {
  cement: "cement",
  sand: "sand",
  aggregate: "aggregate",
  bricks: "bricks",
  blocks: "blocks",
  steel: "steel",
  wire: "wire",
};

function card({
  w,
  h,
  title,
  sub,
  icon,
  kicker = "KVM Agencies · Chengalpattu",
  layout = "card",
}) {
  const ic = ICONS[icon] ?? ICONS.building;
  const big = layout === "hero";
  return `<!doctype html><html><head><style>
@font-face{font-family:J;src:url(${font("jakarta-latin.woff2")}) format('woff2');font-weight:200 800}
@font-face{font-family:T;src:url(${font("noto-tamil.woff2")}) format('woff2');font-weight:100 900}
*{margin:0;box-sizing:border-box}
body{width:${w}px;height:${h}px;font-family:J,T,sans-serif;color:#fff;overflow:hidden;
background:radial-gradient(circle at 85% 20%,#24406f 0,transparent 55%),linear-gradient(135deg,#0f1f3d 0%,#16294d 55%,#0b1730 100%);position:relative}
.grid{position:absolute;inset:0;background-image:linear-gradient(rgba(255,255,255,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.05) 1px,transparent 1px);background-size:${Math.round(w / 20)}px ${Math.round(w / 20)}px}
.stripe{position:absolute;left:0;right:0;bottom:0;height:${Math.max(8, Math.round(h / 45))}px;background:repeating-linear-gradient(-45deg,#f26b1d 0 18px,#0f1f3d 18px 36px)}
.icon{position:absolute;right:${big ? 6 : 7}%;top:50%;transform:translateY(-55%);width:${big ? 38 : 44}%;color:#f26b1d;opacity:${big ? 0.35 : 0.95}}
.txt{position:absolute;left:${Math.round(w * 0.07)}px;top:50%;transform:translateY(-50%);width:${big ? 60 : 52}%}
.k{font-size:${Math.round(w / 48)}px;letter-spacing:.14em;text-transform:uppercase;color:#ffb27f;font-weight:700}
h1{font-size:${Math.round(w / (big ? 22 : title.length > 26 ? 18 : 14))}px;line-height:1.12;letter-spacing:-.02em;font-weight:800;margin:.35em 0 .3em}
.bar{width:${Math.round(w / 12)}px;height:${Math.max(4, Math.round(w / 200))}px;background:#f26b1d;border-radius:4px;margin:.6em 0}
p{font-size:${Math.round(w / 42)}px;color:#c9d4ea;font-weight:500;line-height:1.4}
</style></head><body><div class="grid"></div>
${big ? heroArt() : `<svg class="icon" viewBox="0 0 100 100">${ic}</svg>`}
${big ? "" : `<div class="txt"><div class="k">${kicker}</div><h1>${title}</h1><div class="bar"></div>${sub ? `<p>${sub}</p>` : ""}</div>`}
<div class="stripe"></div></body></html>`;
}

function heroArt() {
  // Scattered material icons on the right half (left half stays clean for the page headline)
  const spots = [
    ["building", 62, 8, 30, 0.55],
    ["truck", 52, 52, 22, 0.5],
    ["cement", 80, 50, 15, 0.6],
    ["steel", 86, 12, 12, 0.45],
    ["bricks", 72, 72, 14, 0.5],
    ["sand", 40, 66, 13, 0.3],
    ["blocks", 90, 70, 9, 0.4],
    ["aggregate", 47, 20, 11, 0.28],
  ];
  return spots
    .map(
      ([k, x, y, s, o]) =>
        `<svg viewBox="0 0 100 100" style="position:absolute;left:${x}%;top:${y}%;width:${s}%;color:#f26b1d;opacity:${o}">${ICONS[k]}</svg>`
    )
    .join("");
}

function avatar({ initials, name, role }) {
  return `<!doctype html><html><head><style>
@font-face{font-family:J;src:url(${font("jakarta-latin.woff2")}) format('woff2');font-weight:200 800}
*{margin:0}body{width:400px;height:400px;display:flex;align-items:center;justify-content:center;flex-direction:column;
background:linear-gradient(160deg,#16294d,#0b1730);font-family:J,sans-serif;color:#fff}
.c{width:210px;height:210px;border-radius:50%;border:8px solid #f26b1d;display:flex;align-items:center;justify-content:center;font-size:88px;font-weight:800;letter-spacing:-.03em;background:#0f1f3d}
.n{margin-top:22px;font-size:26px;font-weight:700}.r{font-size:16px;color:#ffb27f;margin-top:6px;font-weight:600}
</style></head><body><div class="c">${initials}</div><div class="n">${name}</div><div class="r">${role}</div></body></html>`;
}

// ---- Image list (keep in sync with docs/IMAGES.md) ----
const jobs = [];
const manifest = JSON.parse(
  fs.readFileSync("scripts/image-manifest.json", "utf8")
);
for (const p of manifest.products)
  jobs.push({
    file: `products/${p.slug}.webp`,
    w: 800,
    h: 600,
    html: card({
      w: 800,
      h: 600,
      title: p.name,
      sub: p.sub,
      icon: CAT_ICON[p.category],
    }),
  });
for (const c of manifest.categories)
  jobs.push({
    file: `categories/${c.slug}.jpg`,
    w: 600,
    h: 450,
    html: card({
      w: 600,
      h: 450,
      title: c.name,
      sub: "",
      icon: CAT_ICON[c.slug],
    }),
  });
for (const b of manifest.blog)
  jobs.push({
    file: `blog/${b.slug}.jpg`,
    w: 1200,
    h: 630,
    html: card({
      w: 1200,
      h: 630,
      title: b.title,
      sub: "KVM Agencies Guide",
      icon: b.icon,
      kicker: "Construction Guide",
    }),
  });
for (const t of manifest.team)
  jobs.push({ file: `team/${t.slug}.jpg`, w: 400, h: 400, html: avatar(t) });
for (const hh of manifest.heroes)
  jobs.push({
    file: `hero/${hh.slug}.jpg`,
    w: 1600,
    h: 800,
    html: card({
      w: 1600,
      h: 800,
      title: hh.title,
      sub: hh.sub,
      icon: hh.icon,
      layout: "hero",
    }),
  });

const browser = await chromium.launch();
const page = await browser.newPage({ deviceScaleFactor: 1 });
let made = 0;
for (const j of jobs) {
  const dest = path.join(OUT, j.file);
  if (!FORCE && fs.existsSync(dest)) continue;
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  await page.setViewportSize({ width: j.w, height: j.h });
  await page.setContent(j.html);
  await page.evaluate(() => document.fonts.ready);
  const tmp = dest.replace(/\.jpg$/, ".png");
  await page.screenshot({ path: tmp });
  execFileSync("convert", [
    tmp,
    "-strip",
    "-quality",
    "78",
    "-sampling-factor",
    "4:2:0",
    "-interlace",
    "JPEG",
    dest,
  ]);
  fs.unlinkSync(tmp);
  made++;
}
await browser.close();
console.log(
  `[placeholders] ${made} images generated (${jobs.length} total in manifest)`
);
