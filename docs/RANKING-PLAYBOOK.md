# Ranking playbook: what to do after launch

The website is technically complete. The steps below cover the off-site work that gets you to #1 on Google Maps and organic search for "construction materials Chengalpattu", "cement dealer near me", "M Sand Guduvanchery" and similar searches.

## Week 1: launch
1. **Deploy** on Vercel, connect `kvmagencies.in`, and redirect `kvmcmart.in` → `kvmagencies.in` (see README).
2. **Google Search Console**
   - Add a *Domain property* for `kvmagencies.in` (verify via DNS TXT).
   - Sitemaps → submit `https://kvmagencies.in/sitemap.xml`.
   - URL Inspection → "Request indexing" for: `/`, `/products/cement`, `/products/m-sand`, `/products/tmt-steel`, `/areas/chengalpattu`, `/areas/guduvanchery`, `/areas/maraimalai-nagar`, `/ta`.
   - Also add the old `kvmcmart.in` property and use **Change of Address** → `kvmagencies.in`.
3. **Google Analytics 4**: create a property, put the ID in `src/data/site.ts` → `googleAnalyticsId`, then redeploy. Mark `generate_lead`, `click_to_call` and `click_to_whatsapp` as **key events**.
4. **Bing Webmaster Tools**: import from Search Console (one click). Bing also powers ChatGPT search and Copilot answers, which matters for GEO.
5. **Google Business Profile**: update everything in `docs/GOOGLE-BUSINESS-PROFILE.md` and set the website link to `kvmagencies.in`.
6. **FormSubmit**: send one test enquiry from the live site, then click the activation email.

## Week 2–4: citations (NAP consistency)
Create or update listings with **exactly** the same name, address and phone, linking to `https://kvmagencies.in`:
- Justdial, Sulekha, IndiaMART, TradeIndia, ExportersIndia
- Facebook Page (category: Building Materials Store), Instagram bio (`@kvmcmart`), YouTube channel "About" (`@kvmcmart`)
- Bing Places, Apple Business Connect (Apple Maps), MapmyIndia
- Local directories: Chengalpattu / Tamil Nadu business directories, the builders' association, and cement brand dealer locators (ask Ramco/UltraTech/Dalmia sales reps to list you as an authorised dealer on their websites; those links are very strong)
After creating each one, put the real link in `src/data/site.ts` → `social` and `sameAs`.

## Ongoing (monthly)
| Task | Why |
|---|---|
| 10+ new Google reviews mentioning product & town | #1 Maps ranking factor you control |
| 4 Google Posts with photos | Activity signal + clicks |
| 12+ new photos on GBP | Engagement, "photos" ranking signal |
| 1–2 new blog posts (ask Claude to write them) | Long-tail searches & AI answers |
| Check Search Console → Performance → find queries at position 5–20 and strengthen those pages | Fast ranking wins |
| Post short YouTube/Instagram reels (yard, deliveries, tips) and link to the website | Brand searches + GEO signals |

## Blog ideas for next months
- Cement price trend this season in Chengalpattu (no exact prices, explain the factors)
- How to check TMT bars at delivery (video + article)
- Compound wall cost per running foot – hollow blocks vs bricks
- AAC block wall cracks – causes & prevention
- Best time to buy construction materials (season-wise)
- Sump construction materials list
- Tamil versions of the remaining English guides

## How to check rankings
- Google Maps: search "cement dealer", "construction materials", "M sand" **while standing in each town**, or use a free "local rank grid" tool.
- Search Console → Performance → filter by query and page.
- Ask ChatGPT / Perplexity / Gemini "best construction material supplier in Chengalpattu" every month. With the schema, `llms.txt`, FAQs and reviews in place, KVM Agencies should start appearing in those answers.

## Do NOT
- Stuff town names into the GBP business name.
- Buy reviews or post fake reviews.
- Create separate GBP listings for each town without a real staffed address there (it gets suspended).
- Change the phone number or address format in one place and not the others.
