# KVM Agencies – kvmagencies.in

Website for **KVM Agencies**, construction raw material supplier at 52, Kanchipuram High Rd, Natham, Chengalpattu 603002, built for ranking (SEO + AEO + GEO) and fast enquiries (Call / WhatsApp / form on every page).

- **Framework:** TanStack Start (React + TanStack Router) + Vite + TypeScript, fully pre-rendered to static HTML.
- **Hosting:** Vercel (static output in `dist/client`).
- **Pages:** 101 indexable pages (English + Tamil). Details are in "What's inside" below.

## Quick start

```bash
npm install
```

```bash
npm run dev        # http://localhost:3000
```

```bash
npm run build      # pre-renders every page to dist/client + sitemap, robots, llms.txt
```

```bash
npm run preview    # serve the built site on http://localhost:4173
```

```bash
npm test           # SEO + functional test suite (needs a build first); report in test-results/report.md
```

## Deploy on Vercel

1. Push this folder to a GitHub repo and click **Import Project** in Vercel. `vercel.json` already sets the build command (`npm run build`) and the output folder (`dist/client`).
2. In Vercel → Project → **Domains**, add `kvmagencies.in` and `www.kvmagencies.in`, and set `www` to **redirect to** `kvmagencies.in`.
3. **Old site:** add `kvmcmart.in` (and `www.kvmcmart.in`) to the same Vercel project as a **redirect (308) to `kvmagencies.in`**. Common old shop URLs (`/shop`, `/product/*`, `/cart`, etc.) are already redirected in `vercel.json`. This passes the old site's ranking to the new domain.

## Things to fill in (one file: `src/data/site.ts`)

| Field | What it does |
|---|---|
| `geo` | Exact latitude/longitude of your Google Maps pin. Open Maps, right-click the pin and click the numbers to copy them. |
| `googleAnalyticsId` | GA4 (`G-5ENBYJV905`), loaded directly on every page. **Don't** also add a GA4 / Google tag for this ID inside GTM, or visits are counted twice. |
| `GTMId` | Google Tag Manager container (`GTM-TSTQ4F2S`). Use it for extra tags (Ads conversions, Meta pixel, etc.). The site pushes `click_to_call`, `click_to_whatsapp` and `generate_lead` events to the dataLayer. |
| `clarityId` | Microsoft Clarity project (`zabyfg8h4m`), loaded directly. Don't add Clarity again inside GTM. |
| `googleSiteVerification` | Leave empty. Search Console is verified by `public/googlec8fb3c71c908bc1d.html`; never delete that file. |
| `bingSiteVerification` | Leave empty. Bing Webmaster Tools was verified by importing from Search Console. |
| `social.*` | Profile links shown in the footer and in the business schema (`sameAs`). An empty `""` link is hidden automatically (e.g. Facebook until the page is ready). |

After editing, run `npm run build` and redeploy (Vercel redeploys automatically on push).

### Enquiry form → email

The form posts to **FormSubmit.co** (free, no backend) and sends each enquiry to `kvmagencies123@gmail.com`.
**First time only:** submit one test enquiry on the live site. FormSubmit will email you an activation link; click it, and all later enquiries arrive in your inbox. The form also shows a "send on WhatsApp" button after submitting.

## What's inside (SEO / AEO / GEO)

**Pages**

- Home, Products hub and **18 product pages**: cement hub; Ramco, UltraTech, Dalmia (DSP/Concreto), ACC, Maha and Adani; M Sand; P Sand; Jally; Chamber bricks; Wire cut bricks; Hollow blocks; AAC ("ACC") blocks; TMT hub; MCR TMT; ARS TMT; Binding wire.
- **17 area pages**, each with unique local content (route, distance, localities, PIN code, typical projects, local FAQ). Chengalpattu, Paranur, Mahindra World City, Singaperumal Koil, Maraimalai Nagar, Kattankulathur & Potheri, Guduvanchery, Urapakkam, Vandalur, Padappai, Palur, Thirukazhukundram, Thiruporur, Kelambakkam, Madurantakam, Acharapakkam, Kalpakkam.
- **10 English and 3 Tamil blog guides** by Naveen M R (Managing Director) and Kailash (Technical Advisor); founder Murali Kathirvel has an author page too, with author pages.
- Material calculator (interactive), FAQ, Bulk orders, About, Contact, Privacy.
- **Tamil (`/ta/...`)** versions of home, products, areas, about, contact and blog, linked with `hreflang`.

**Technical SEO**

- Static HTML pre-rendering. Content pages ship with no framework JavaScript: Lighthouse mobile scores are 100 for Performance, Accessibility, Best Practices and SEO.
- Unique title, meta description and canonical on every page, plus Open Graph and Twitter cards, `hreflang` (en-IN / ta-IN / x-default), and geo meta tags.
- `sitemap.xml` with hreflang, `robots.txt`, a 404 page, and 301 redirects for old shop URLs.

**Structured data (JSON-LD)**

- `HardwareStore` / `LocalBusiness`: NAP, geo, hours, GSTIN, founder, area served (all towns), offer catalogue.
- `WebSite`, `WebPage`, `BreadcrumbList`, `FAQPage` (on every product, area and blog page), `Service` (product and area pages), `BlogPosting` with `Person` author and reviewer (E-E-A-T), `ProfilePage`, and `Speakable`.

**AEO / GEO (answer engines and AI search)**

- Every key page opens with a "Quick answer" box that states who, what, where and the phone number in one paragraph. AI assistants and featured snippets tend to quote this kind of answer directly.
- Real FAQs with direct answers, comparison tables, and formulas/numbers (weight charts, quantities per sq ft).
- `llms.txt` and `llms-full.txt` give AI crawlers a clean summary of the business and all pages.
- `robots.txt` explicitly allows GPTBot, ClaudeBot, PerplexityBot, Google-Extended, etc.

**Conversion**

- Sticky Call / WhatsApp / Enquiry bar on mobile, and floating Call / WhatsApp buttons on desktop.
- Every product card has its own Call and WhatsApp buttons, with WhatsApp messages pre-filled with the product and area.
- An enquiry form on every page sends to email.

See `docs/GOOGLE-BUSINESS-PROFILE.md` and `docs/RANKING-PLAYBOOK.md` for what to do outside the website. Google Maps ranking depends mostly on your Business Profile and reviews.

## Branding & images

- Navy + orange brand, Plus Jakarta Sans (English) and Noto Sans Tamil (Tamil), both self-hosted for speed.
- Every product, category, blog post, team member and page banner has an image. **They are placeholders for now.** Replace them with real photos using the same file names (`docs/IMAGES.md`).
- Footer credit: "Designed and Developed by Adszoo".

## Editing content

| What                                 | File                                                                                                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| Business details (NAP, hours, links) | `src/data/site.ts`                                                                                                      |
| Products (EN + TA text, specs, FAQs) | `src/data/products.ts`                                                                                                  |
| Areas (EN + TA local content)        | `src/data/areas.ts`                                                                                                     |
| Blog posts                           | `src/data/blog-en.ts`, `src/data/blog-ta.ts`                                                                            |
| Authors                              | `src/data/authors.ts`                                                                                                   |
| Home/general FAQs                    | `src/data/faqs.ts`                                                                                                      |
| Colours / layout / fonts             | `src/styles.css` (navy `--navy`, orange `--orange`; Plus Jakarta Sans + Noto Sans Tamil, self-hosted in `public/fonts`) |
| Images                               | `public/images/` – see `docs/IMAGES.md` (all current images are placeholders to replace with real photos)               |

New products, areas or blog posts added to these files automatically get a page, a sitemap entry, schema markup and links.
