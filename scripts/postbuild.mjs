// Runs after `vite build`: writes sitemap.xml (with hreflang), robots.txt, llms.txt, llms-full.txt and 404.html
import fs from "node:fs";
import path from "node:path";

const OUT = "dist/client";
const SITE = "https://kvmagencies.in";
const today = new Date().toISOString().slice(0, 10);

// 0) Static mode: content pages need no React at runtime. Strip the hydration bundle (faster LCP, zero TBT),
//    inline the small stylesheet and add a tiny vanilla script for the enquiry form.
//    Pages listed in KEEP_JS stay fully interactive (React).
const KEEP_JS = ["material-calculator"];
const formJs = fs
  .readFileSync("scripts/static-form.js", "utf8")
  .replace(
    "__FORM_ENDPOINT__",
    "https://formsubmit.co/ajax/kvmagencies123@gmail.com"
  )
  .replace("__WA__", "919150751905")
  .replace(/^\/\/.*\n/, "");
function staticize(file, keepJs) {
  let html = fs.readFileSync(file, "utf8");
  if (html.includes('data-static="1"')) return;
  html = html.replace(
    /<link rel="stylesheet" href="(\/assets\/[^"]+\.css)"[^>]*\/>/g,
    (_, href) =>
      `<style>${fs.readFileSync(path.join(OUT, href), "utf8")}</style>`
  );
  if (!keepJs) {
    html = html
      .replace(/<link rel="modulepreload"[^>]*\/>/g, "")
      .replace(/<script type="module"[^>]*><\/script>/g, "")
      .replace(/<script data-tsr-stream-part="">[\s\S]*?<\/script>/g, "")
      .replace(
        /<script>document\.currentScript\.remove\(\);[\s\S]*?<\/script>/g,
        ""
      )
      .replace(
        /<script>\(function\(a,f\)\{let l;try\{l=JSON\.parse\(sessionStorage[\s\S]*?<\/script>/g,
        ""
      )
      .replace("</body>", `<script>${formJs}</script></body>`);
  }
  html = html.replace("<html ", '<html data-static="1" ');
  fs.writeFileSync(file, html);
}
(function walkStatic(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== "assets") walkStatic(p);
    } else if (f === "index.html") {
      const rel = path.relative(OUT, path.dirname(p)).split(path.sep).join("/");
      staticize(p, KEEP_JS.includes(rel));
    }
  }
})(OUT);

// 1) Collect prerendered pages
const pages = [];
(function walk(dir) {
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) {
      if (f !== "assets") walk(p);
    } else if (f === "index.html") {
      const rel =
        "/" + path.relative(OUT, path.dirname(p)).split(path.sep).join("/");
      pages.push(rel === "/" ? "/" : rel.replace(/\/$/, ""));
    }
  }
})(OUT);

const read = (p) =>
  fs.readFileSync(path.join(OUT, p === "/" ? "" : p, "index.html"), "utf8");
const metaOf = (html) => {
  const robots = /<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? "";
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? "";
  const desc =
    /<meta name="description" content="([^"]*)"/.exec(html)?.[1] ?? "";
  const alts = [
    ...html.matchAll(
      /<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"\/>/g
    ),
  ].map((m) => ({ lang: m[1], href: m[2] }));
  const updated = /"dateModified":"([^"]+)"/.exec(html)?.[1];
  // Page-specific images inside <main> (skip repeated product-card thumbnails beyond the first 12)
  const main = /<main>([\s\S]*?)<section id="enquiry"/.exec(html)?.[1] ?? "";
  const images = [
    ...new Set(
      [...main.matchAll(/<img[^>]+src="(\/images\/[^"]+)"/g)].map((m) => m[1])
    ),
  ].slice(0, 12);
  return { robots, title, desc, alts, updated, images };
};
const decode = (s) =>
  s
    .replace(/&amp;/g, "&")
    .replace(/&#x27;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");

const priority = (p) => {
  if (p === "/" || p === "/ta") return "1.0";
  if (/^\/(ta\/)?(products|areas)(\/|$)/.test(p))
    return p.split("/").length > 3 || /^\/(products|areas)\//.test(p)
      ? "0.9"
      : "0.9";
  if (/^\/(ta\/)?(contact|bulk-orders|material-calculator)/.test(p))
    return "0.8";
  if (/^\/(ta\/)?blog/.test(p)) return "0.7";
  return "0.5";
};

const entries = [];
for (const p of pages.sort()) {
  const m = metaOf(read(p));
  if (m.robots.includes("noindex")) continue;
  entries.push({ p, ...m });
}

// 2) sitemap.xml
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${entries
  .map(
    (e) => `  <url>
    <loc>${SITE}${e.p}</loc>
    <lastmod>${e.updated ?? today}</lastmod>
    <priority>${priority(e.p)}</priority>
${e.alts.map((a) => `    <xhtml:link rel="alternate" hreflang="${a.lang}" href="${a.href}"/>`).join("\n")}
${e.images.map((src) => `    <image:image><image:loc>${SITE}${src}</image:loc></image:image>`).join("\n")}
  </url>`
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(OUT, "sitemap.xml"), xml);

// 3) robots.txt – allow search engines AND AI assistants (for GEO / AI answers)
fs.writeFileSync(
  path.join(OUT, "robots.txt"),
  `# KVM Agencies – construction materials, Chengalpattu
User-agent: *
Allow: /
Disallow: /404

# AI search & answer engines are welcome (GEO)
User-agent: GPTBot
Allow: /
User-agent: OAI-SearchBot
Allow: /
User-agent: ChatGPT-User
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Claude-SearchBot
Allow: /
User-agent: Claude-User
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: Perplexity-User
Allow: /
User-agent: Google-Extended
Allow: /
User-agent: Applebot-Extended
Allow: /
User-agent: Bingbot
Allow: /

Sitemap: ${SITE}/sitemap.xml
`
);

// 4) llms.txt + llms-full.txt (plain-text summaries for AI assistants)
const enPages = entries.filter((e) => !e.p.startsWith("/ta"));
const group = (re) => enPages.filter((e) => re.test(e.p));
const line = (e) => `- [${decode(e.title)}](${SITE}${e.p}): ${decode(e.desc)}`;
const facts = `## Key facts
- Business: KVM Agencies (formerly online as kvmcmart.in / KVM C-Mart)
- What: Construction raw material supplier (cement, M Sand, P Sand, jally/blue metal, chamber bricks, wire cut bricks, hollow blocks, AAC blocks, MCR & ARS TMT steel, binding wire)
- Cement brands: Ramco, UltraTech, Dalmia (DSP / Concreto), ACC, Maha, Adani – OPC 53 & PPC
- Address: 52, Kanchipuram High Rd, Natham, Chengalpattu, Tamil Nadu 603002, India
- Phone / WhatsApp: +91 91507 51905
- Email: kvmagencies123@gmail.com
- Hours: Monday–Saturday 9:00 AM – 7:00 PM; Sunday shop closed but phone/WhatsApp enquiries answered
- Established: 2002 · Founder: Murali Kathirvel · Managing Director: Naveen M R · Technical Advisor: Kailash
- GSTIN: 33BAZPM1036Q1Z1
- Delivery areas: Chengalpattu, Paranur, Mahindra World City, Singaperumal Koil, Maraimalai Nagar, Kattankulathur, Potheri, Guduvanchery, Urapakkam, Vandalur, Padappai, Oragadam, Palur, Thirukazhukundram, Thiruporur, Kelambakkam, Madurantakam, Acharapakkam, Kalpakkam and nearby villages
- Pricing: rates change daily – customers call/WhatsApp for today's price; bulk orders get better rates and reduced transport charges
- Languages: English, Tamil
`;
fs.writeFileSync(
  path.join(OUT, "llms.txt"),
  `# KVM Agencies – Construction Raw Material Supplier in Chengalpattu

> KVM Agencies has supplied cement, M Sand, P Sand, jally, bricks, blocks, TMT steel and binding wire to home owners, masons, contractors and builders in Chengalpattu district, Tamil Nadu since 2002. Call/WhatsApp +91 91507 51905 for today's rate and site delivery.

${facts}
## Products
${group(/^\/products/)
  .map(line)
  .join("\n")}

## Service areas
${group(/^\/areas/)
  .map(line)
  .join("\n")}

## Guides
${group(/^\/(blog|material-calculator|faq)/)
  .map(line)
  .join("\n")}

## Company
${group(/^\/(about|contact|bulk-orders|authors)/)
  .map(line)
  .join("\n")}

## Tamil (தமிழ்)
- [முகப்பு](${SITE}/ta): செங்கல்பட்டில் கட்டுமானப் பொருட்கள் – KVM Agencies
- [பொருட்கள்](${SITE}/ta/products)
- [சேவை பகுதிகள்](${SITE}/ta/areas)

## Optional
- [Full text for LLMs](${SITE}/llms-full.txt)
- [Sitemap](${SITE}/sitemap.xml)
`
);

// llms-full.txt: main readable text of every English page
const textOf = (html) => {
  const main = /<main>([\s\S]*?)<section id="enquiry"/.exec(html)?.[1] ?? "";
  return decode(
    main
      .replace(/<script[\s\S]*?<\/script>/g, "")
      .replace(/<iframe[\s\S]*?<\/iframe>/g, "")
      .replace(/<(h[1-3])[^>]*>/g, "\n\n## ")
      .replace(/<\/(p|li|tr|h[1-3]|summary|div)>/g, "\n")
      .replace(/<(td|th)[^>]*>/g, " | ")
      .replace(/<li[^>]*>/g, "- ")
      .replace(/<[^>]+>/g, "")
      .replace(/[ \t]+/g, " ")
      .replace(
        /^ *(Call Now( WhatsApp.*|: \+91 91507 51905 WhatsApp.*)?|WhatsApp.*|Enquiry) *$/gm,
        ""
      )
      .replace(/\n\s*\n\s*\n+/g, "\n\n")
      .trim()
  );
};
fs.writeFileSync(
  path.join(OUT, "llms-full.txt"),
  `# KVM Agencies – full site text (English)\n\n${facts}\n` +
    enPages
      .filter((e) => !/privacy|404/.test(e.p))
      .map(
        (e) =>
          `\n\n---\n# ${decode(e.title)}\nURL: ${SITE}${e.p}\n\n${textOf(read(e.p))}`
      )
      .join("")
);

// 5) 404.html for Vercel
if (fs.existsSync(path.join(OUT, "404", "index.html")))
  fs.copyFileSync(
    path.join(OUT, "404", "index.html"),
    path.join(OUT, "404.html")
  );

console.log(
  `[postbuild] ${entries.length} URLs in sitemap, ${pages.length} pages total. robots.txt, llms.txt, llms-full.txt, 404.html written.`
);
