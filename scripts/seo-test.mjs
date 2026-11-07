// Automated SEO / AEO / GEO + functional test for the built site.
// Usage: npm run build && npm test
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { chromium } from "playwright";

const OUT = "dist/client";
const SITE = "https://kvmagencies.in";
const results = [];
let failures = 0;
const ok = (name, pass, detail = "") => {
  results.push({ name, pass, detail });
  if (!pass) failures++;
};

// ───────── Static HTML audit ─────────
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
const file = (p) => path.join(OUT, p === "/" ? "" : p, "index.html");
const exists = (p) =>
  fs.existsSync(file(p.replace(/\/$/, "") || "/")) ||
  fs.existsSync(path.join(OUT, p));

const titles = new Map();
const descs = new Map();
const issues = [];
const alternates = new Map();
let ldCount = 0;
const ldTypes = new Set();
const indexable = pages.filter((p) => p !== "/404");

for (const p of pages) {
  const html = fs.readFileSync(file(p), "utf8");
  const title = /<title>([^<]*)<\/title>/.exec(html)?.[1];
  const desc = /<meta name="description" content="([^"]*)"/.exec(html)?.[1];
  const canonical = /<link rel="canonical" href="([^"]+)"/.exec(html)?.[1];
  const lang = /<html[^>]*\slang="([^"]+)"/.exec(html)?.[1];
  const h1s = (html.match(/<h1[\s>]/g) || []).length;
  const robots = /<meta name="robots" content="([^"]+)"/.exec(html)?.[1] ?? "";
  if (p === "/404") {
    ok("404 page is noindex", robots.includes("noindex"));
    continue;
  }
  if (!title) issues.push(`${p}: missing <title>`);
  else {
    if (title.length < 20 || title.length > 95)
      issues.push(`${p}: title length ${title.length}`);
    titles.set(title, [...(titles.get(title) ?? []), p]);
  }
  if (!desc) issues.push(`${p}: missing meta description`);
  else {
    const len = desc.replace(/&[a-z#0-9]+;/g, "x").length;
    if (len < 70 || len > 180) issues.push(`${p}: description length ${len}`);
    descs.set(desc, [...(descs.get(desc) ?? []), p]);
  }
  const expected = SITE + p;
  if (canonical !== expected)
    issues.push(`${p}: canonical ${canonical} != ${expected}`);
  const expLang = p === "/ta" || p.startsWith("/ta/") ? "ta-IN" : "en-IN";
  if (lang !== expLang) issues.push(`${p}: html lang ${lang} != ${expLang}`);
  if (h1s !== 1) issues.push(`${p}: ${h1s} <h1> tags`);
  if (robots.includes("noindex")) issues.push(`${p}: unexpectedly noindex`);
  if (!html.includes('href="tel:+919150751905"'))
    issues.push(`${p}: no tel: link`);
  if (!html.includes('href="https://wa.me/919150751905'))
    issues.push(`${p}: no WhatsApp link`);
  if (!html.includes('id="enquiry"')) issues.push(`${p}: no enquiry form`);
  if (!html.includes("og:image")) issues.push(`${p}: no og:image`);
  if (
    !/Designed and Developed by(<!-- -->)?\s*<a href="https:\/\/adszoo\.in"[^>]*>Adszoo<\/a>/.test(
      html
    )
  )
    issues.push(`${p}: Adszoo credit link missing`);
  // Images: alt text, explicit dimensions, file exists
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    const tag = m[0];
    const src = /src="([^"]+)"/.exec(tag)?.[1] ?? "";
    if (!/\salt="/.test(tag)) issues.push(`${p}: <img> without alt (${src})`);
    if (!/\swidth="/.test(tag) || !/\sheight="/.test(tag))
      issues.push(`${p}: <img> without width/height (${src})`);
    if (src.startsWith("/") && !fs.existsSync(path.join(OUT, src)))
      issues.push(`${p}: missing image file ${src}`);
  }
  if (/^\/(ta\/)?products\/.+/.test(p) && !html.includes("/images/products/"))
    issues.push(`${p}: product page has no product image`);
  if (/^\/(ta\/)?blog\/.+/.test(p) && !html.includes("/images/blog/"))
    issues.push(`${p}: blog post has no blog image`);
  if (
    !html.includes("52, Kanchipuram High Rd") &&
    !html.includes("52, காஞ்சிபுரம்")
  )
    issues.push(`${p}: NAP address missing`);
  // JSON-LD
  for (const m of html.matchAll(
    /<script type="application\/ld\+json">([\s\S]*?)<\/script>/g
  )) {
    ldCount++;
    try {
      const j = JSON.parse(m[1]);
      const collect = (o) => {
        if (Array.isArray(o)) return o.forEach(collect);
        if (o && typeof o === "object") {
          if (o["@type"]) [].concat(o["@type"]).forEach((t) => ldTypes.add(t));
          Object.values(o).forEach(collect);
        }
      };
      collect(j);
      if (j["@type"] === "FAQPage" && !(j.mainEntity?.length > 0))
        issues.push(`${p}: empty FAQPage`);
    } catch (e) {
      issues.push(`${p}: invalid JSON-LD (${e.message})`);
    }
  }
  if (!html.includes('"FAQPage"') && /^\/(ta\/)?(products|areas)\/.+/.test(p))
    issues.push(`${p}: product/area page without FAQPage`);
  if (!html.includes("BreadcrumbList") && p !== "/" && p !== "/ta")
    issues.push(`${p}: no BreadcrumbList`);
  // Internal links resolve
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    const href = m[1];
    if (
      href.startsWith("/assets/") ||
      /\.(png|ico|jpg|webp|webmanifest|css|js)$/.test(href)
    )
      continue;
    if (!exists(href)) issues.push(`${p}: broken internal link ${href}`);
  }
  // hreflang
  const alts = [
    ...html.matchAll(
      /<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"\/>/g
    ),
  ].map((m) => [m[1], m[2]]);
  alternates.set(expected, alts);
}

// hreflang reciprocity
for (const [url, alts] of alternates) {
  for (const [lang, href] of alts) {
    if (lang === "x-default") continue;
    const back = alternates.get(href);
    if (!back) issues.push(`hreflang ${url} → ${href} (target page missing)`);
    else if (!back.some(([, h]) => h === url))
      issues.push(`hreflang ${url} → ${href} is not reciprocal`);
  }
}

for (const [t, ps] of titles)
  if (ps.length > 1) issues.push(`duplicate title "${t}" on ${ps.join(", ")}`);
for (const [d, ps] of descs)
  if (ps.length > 1) issues.push(`duplicate description on ${ps.join(", ")}`);

ok(
  `Static audit of ${indexable.length} indexable pages (title, description, canonical, lang, single H1, NAP, tel/WhatsApp, enquiry form, JSON-LD, internal links, hreflang)`,
  issues.length === 0,
  issues.slice(0, 40).join("\n")
);
ok(
  `JSON-LD blocks parse (${ldCount} blocks; types: ${[...ldTypes].sort().join(", ")})`,
  ldCount > indexable.length * 3
);
ok(
  "Schema founder is Murali Kathirvel",
  fs
    .readFileSync(file("/"), "utf8")
    .includes(
      '"founder":{"@id":"https://kvmagencies.in/authors/murali-kathirvel#person"}'
    )
);
ok(
  "Image sitemap entries present",
  fs
    .readFileSync(path.join(OUT, "sitemap.xml"), "utf8")
    .includes("<image:loc>https://kvmagencies.in/images/products/")
);
for (const t of [
  "HardwareStore",
  "LocalBusiness",
  "FAQPage",
  "BreadcrumbList",
  "BlogPosting",
  "Person",
  "Service",
  "WebSite",
  "OpeningHoursSpecification",
  "GeoCoordinates",
])
  ok(`Schema type present: ${t}`, ldTypes.has(t));

// sitemap / robots / llms
const sitemap = fs.readFileSync(path.join(OUT, "sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok(
  `sitemap.xml lists every indexable page (${locs.length}/${indexable.length})`,
  locs.length === indexable.length &&
    indexable.every((p) => locs.includes(SITE + p))
);
ok("sitemap.xml has hreflang alternates", sitemap.includes('hreflang="ta-IN"'));
const robots = fs.readFileSync(path.join(OUT, "robots.txt"), "utf8");
ok(
  "robots.txt allows crawling + references sitemap",
  robots.includes("Allow: /") &&
    robots.includes("Sitemap: https://kvmagencies.in/sitemap.xml")
);
ok(
  "robots.txt allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)",
  ["GPTBot", "ClaudeBot", "PerplexityBot", "Google-Extended"].every((b) =>
    robots.includes(b)
  )
);
const llms = fs.readFileSync(path.join(OUT, "llms.txt"), "utf8");
ok(
  "llms.txt present with NAP facts",
  llms.includes("+91 91507 51905") && llms.includes("603002")
);
ok(
  "llms-full.txt present",
  fs.statSync(path.join(OUT, "llms-full.txt")).size > 50000
);
ok("404.html present for Vercel", fs.existsSync(path.join(OUT, "404.html")));

// ───────── Browser tests ─────────
const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".ico": "image/x-icon",
  ".webp": "image/webp",
  ".txt": "text/plain",
  ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};
const server = http.createServer((req, res) => {
  let u = decodeURIComponent(req.url.split("?")[0]);
  let f = path.join(OUT, u);
  if (fs.existsSync(f) && fs.statSync(f).isDirectory())
    f = path.join(f, "index.html");
  if (!fs.existsSync(f)) {
    res.writeHead(404, { "content-type": "text/html" });
    return res.end(fs.readFileSync(path.join(OUT, "404.html")));
  }
  res.writeHead(200, {
    "content-type": MIME[path.extname(f)] ?? "application/octet-stream",
  });
  fs.createReadStream(f).pipe(res);
});
await new Promise((r) => server.listen(4321, r));
const BASE = "http://localhost:4321";

const browser = await chromium.launch();
const shotsDir = "test-results";
fs.mkdirSync(shotsDir, { recursive: true });

async function pageWith(viewport) {
  const ctx = await browser.newContext({ viewport, locale: "en-IN" });
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  page.on(
    "console",
    (m) =>
      m.type() === "error" &&
      !/maps\.google|google\.com|gstatic|Failed to load resource/.test(
        m.text()
      ) &&
      errors.push(m.text())
  );
  await page.route(/maps\.google\.com|google\.com\/maps/, (r) =>
    r.fulfill({ status: 200, body: "<html></html>" })
  );
  return { ctx, page, errors };
}

// 1. Every page hydrates without JS errors (sample of all page types)
{
  const { ctx, page, errors } = await pageWith({ width: 1280, height: 900 });
  const sample = [
    "/",
    "/ta",
    "/products",
    "/products/ramco-cement",
    "/products/m-sand",
    "/ta/products/tmt-steel",
    "/areas",
    "/areas/guduvanchery",
    "/ta/areas/padappai",
    "/blog",
    "/blog/opc-vs-ppc-cement-which-is-better",
    "/ta/blog/m-sand-vs-p-sand-vs-river-sand",
    "/authors/kailash",
    "/about",
    "/contact",
    "/faq",
    "/bulk-orders",
    "/material-calculator",
    "/privacy-policy",
  ];
  for (const p of sample) {
    await page.goto(BASE + p, { waitUntil: "networkidle" });
  }
  ok(
    `Pages load & hydrate with no JavaScript errors (${sample.length} page types)`,
    errors.length === 0,
    errors.join("\n")
  );
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.screenshot({
    path: `${shotsDir}/desktop-home.png`,
    fullPage: false,
  });
  await page.goto(BASE + "/products/ramco-cement", {
    waitUntil: "networkidle",
  });
  await page.screenshot({
    path: `${shotsDir}/desktop-product.png`,
    fullPage: false,
  });
  // Client-side navigation works
  await page.goto(BASE + "/", { waitUntil: "networkidle" });
  await page.click("header .catnav >> text=Cement");
  await page.waitForURL("**/products/cement");
  ok(
    "Category navigation (Home → Cement) works",
    (await page.locator("h1").innerText()).includes("Cement Dealer")
  );
  // Desktop floating buttons
  ok(
    "Desktop floating Call + WhatsApp buttons visible",
    (await page.locator(".action-bar .ab-call").isVisible()) &&
      (await page.locator(".action-bar .ab-wa").isVisible())
  );
  await ctx.close();
}

// 2. Mobile: sticky action bar + menu
{
  const { ctx, page, errors } = await pageWith({ width: 390, height: 844 });
  await page.goto(BASE + "/areas/maraimalai-nagar", {
    waitUntil: "networkidle",
  });
  const bar = page.locator(".action-bar");
  const box = await bar.boundingBox();
  ok(
    "Mobile sticky Call / WhatsApp / Enquiry bar pinned to bottom",
    !!box &&
      Math.abs(box.y + box.height - 844) < 2 &&
      (await page.locator(".ab-enq").isVisible())
  );
  const callHref = await page.locator(".ab-call").getAttribute("href");
  const waHref = await page.locator(".ab-wa").getAttribute("href");
  ok(
    "Mobile Call button dials +919150751905",
    callHref === "tel:+919150751905"
  );
  ok(
    "Mobile WhatsApp button opens wa.me/919150751905 with prefilled text",
    waHref?.startsWith("https://wa.me/919150751905?text=")
  );
  const scrollW = await page.evaluate(
    () => document.documentElement.scrollWidth
  );
  ok(
    "No horizontal scroll on mobile (390px)",
    scrollW <= 390,
    `scrollWidth=${scrollW}`
  );
  await page.screenshot({ path: `${shotsDir}/mobile-area.png` });
  await page.click("details.menu summary");
  ok(
    "Mobile menu opens",
    await page
      .locator("details.menu[open] nav a", { hasText: "Products" })
      .first()
      .isVisible()
  );
  await page.goto(BASE + "/ta", { waitUntil: "networkidle" });
  await page.screenshot({ path: `${shotsDir}/mobile-tamil-home.png` });
  ok(
    "Tamil home renders Tamil H1",
    /[஀-௿]/.test(await page.locator("h1").innerText())
  );
  ok("Mobile pages: no JS errors", errors.length === 0, errors.join("\n"));
  await ctx.close();
}

// 3. Enquiry form posts to email endpoint
{
  const { ctx, page } = await pageWith({ width: 1280, height: 900 });
  let posted = null;
  await page.route("https://formsubmit.co/**", async (r) => {
    posted = {
      url: r.request().url(),
      body: JSON.parse(r.request().postData() || "{}"),
    };
    await r.fulfill({
      status: 200,
      contentType: "application/json",
      body: '{"success":"true"}',
    });
  });
  await page.goto(BASE + "/contact", { waitUntil: "networkidle" });
  await page.fill("#enquiry input[name=name]", "Test Customer");
  await page.fill("#enquiry input[name=phone]", "9876543210");
  await page.fill("#enquiry input[name=location]", "Guduvanchery");
  await page.selectOption("#enquiry select[name=material]", "Cement");
  await page.fill("#enquiry input[name=quantity]", "100 bags");
  await page.click("#enquiry button[type=submit]");
  await page.waitForSelector(".form-status");
  const status = await page.locator(".form-status").innerText();
  ok(
    "Enquiry form sends to kvmagencies123@gmail.com via FormSubmit",
    posted?.url.includes("kvmagencies123@gmail.com") &&
      posted.body.name === "Test Customer" &&
      posted.body.material === "Cement"
  );
  ok(
    'Enquiry form shows success + "Also send on WhatsApp" button',
    status.includes("Thank you") &&
      (await page.locator("#enquiry a.btn-wa").isVisible())
  );
  await ctx.close();
}

// 4. Calculator computes correctly
{
  const { ctx, page } = await pageWith({ width: 1280, height: 900 });
  await page.goto(BASE + "/material-calculator", { waitUntil: "networkidle" });
  const txt = await page.locator("main").innerText();
  ok(
    "Calculator: 1000 sq ft house → 400 – 450 cement bags",
    txt.includes("400 – 450 bags")
  );
  ok(
    'Calculator: 1000 sq ft × 5" M20 slab → ~100 bags incl. wastage',
    /Cement \(incl\. 5% wastage\)\s+100 bags/.test(txt)
  );
  await page.fill("input[type=number] >> nth=0", "2000");
  ok(
    "Calculator updates live (2000 sq ft → 800 – 900 bags)",
    (await page.locator("main").innerText()).includes("800 – 900 bags")
  );
  await ctx.close();
}

// 5. 404
{
  const { ctx, page } = await pageWith({ width: 1280, height: 900 });
  const res = await page.goto(BASE + "/old-shop-page-xyz");
  ok(
    "Unknown URL returns 404 page with contact options",
    res.status() === 404 && (await page.content()).includes("tel:+919150751905")
  );
  await ctx.close();
}

await browser.close();
server.close();

// ───────── Report ─────────
const lines = results.map(
  (r) =>
    `${r.pass ? "✅ PASS" : "❌ FAIL"}  ${r.name}${
      !r.pass && r.detail
        ? "\n" +
          r.detail
            .split("\n")
            .map((l) => "      " + l)
            .join("\n")
        : ""
    }`
);
const report = `# KVM Agencies – automated test report\n\nGenerated: ${new Date().toISOString()}\n\nPages built: ${pages.length} (${indexable.length} indexable)\n\n${lines.join("\n")}\n\nResult: ${failures === 0 ? "ALL PASSED" : failures + " FAILED"}\n`;
fs.writeFileSync(path.join(shotsDir, "report.md"), report);
console.log(report);
process.exit(failures ? 1 : 0);
