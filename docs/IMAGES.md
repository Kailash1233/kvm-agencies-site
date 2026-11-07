# Images: replace the placeholders with your real photos

Every image on the site is currently a **branded placeholder** (navy/orange card). To use a real photo, just **overwrite the file with the same name** in `public/images/` and redeploy. No code changes are needed: alt text, sizes, the image sitemap and schema markup are already wired up.

**Rules for best SEO and speed**
- Keep the **same file name and format (.jpg)** and roughly the **same size/shape** listed below. The site crops to these shapes.
- Compress before uploading: aim for **under 150 KB** per photo (use squoosh.app or TinyJPG).
- Use **real photos of your own yard, stock, lorries and team**. Google rewards original photos far more than stock images. Use the same photos on your Google Business Profile.
- If you delete a placeholder by mistake, run `node scripts/make-placeholders.mjs` to regenerate missing files.

## Products: 800 × 600 (4:3) → `public/images/products/`
| File | What to photograph |
|---|---|
| cement.jpg | Stack of cement bags of different brands at your yard |
| ramco-cement.jpg | Ramco bags (brand name visible) |
| ultratech-cement.jpg | UltraTech bags |
| dalmia-cement.jpg | Dalmia DSP / Concreto bags |
| acc-cement.jpg | ACC bags |
| maha-cement.jpg | Maha bags |
| adani-cement.jpg | Adani bags |
| m-sand.jpg | M Sand heap / tipper unloading M Sand |
| p-sand.jpg | P Sand heap (close-up showing fine texture) |
| jally-blue-metal.jpg | 20 mm / 40 mm jally heaps |
| chamber-bricks.jpg | Stack of chamber bricks |
| wire-cut-bricks.jpg | Stack of wire cut bricks |
| hollow-blocks.jpg | Hollow blocks stacked |
| aac-blocks.jpg | AAC blocks pallet |
| tmt-steel.jpg | TMT bar bundles |
| mcr-tmt-steel.jpg | MCR bars (embossing visible) |
| ars-tmt-steel.jpg | ARS bars (embossing visible) |
| binding-wire.jpg | Binding wire coils |

## Categories: 600 × 450 (4:3) → `public/images/categories/`
cement.jpg · sand.jpg · aggregate.jpg (jally) · bricks.jpg · blocks.jpg · steel.jpg · wire.jpg

## Page banners: 1600 × 800 (2:1) → `public/images/hero/`
| File | Used on | Photo idea |
|---|---|---|
| home.jpg | Home page top | Wide shot of your yard with stock and signboard |
| delivery.jpg | Areas pages | Your lorry/tipper delivering at a site |
| yard.jpg | Products, About, Contact | Shop front / yard entrance with the KVM board |

Keep the **left side of banners fairly plain**: the page headline sits on top of it, with a dark overlay.

## Team: 400 × 400 (square) → `public/images/team/`
| File | Person |
|---|---|
| murali-kathirvel.jpg | Murali Kathirvel – Founder |
| naveen-m-r.jpg | Naveen M R – Managing Director |
| kailash.jpg | Kailash – Technical Advisor |

Use clear head-and-shoulders photos with a plain background. These appear on the About page, author pages and every blog post (E-E-A-T trust signal).

## Blog: 1200 × 630 → `public/images/blog/`
One per article (the Tamil versions reuse the English image):
cement-price-in-chengalpattu-today.jpg · opc-vs-ppc-cement-which-is-better.jpg · m-sand-vs-p-sand-vs-river-sand.jpg · construction-material-calculator-per-sq-ft.jpg · chamber-bricks-vs-wire-cut-bricks-vs-hollow-blocks-vs-aac-blocks.jpg · how-to-choose-tmt-steel-bars-weight-chart.jpg · jally-sizes-and-uses-20mm-40mm-12mm-6mm.jpg · best-cement-brand-for-house-construction-tamil-nadu.jpg · house-construction-materials-checklist-chengalpattu.jpg · how-to-store-cement-and-steel-at-site-monsoon.jpg
