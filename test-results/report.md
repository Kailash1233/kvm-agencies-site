# KVM Agencies – automated test report

Generated: 2026-10-30T12:10:48.269Z

Pages built: 103 (102 indexable)

✅ PASS 404 page is noindex
✅ PASS Static audit of 102 indexable pages (title, description, canonical, lang, single H1, NAP, tel/WhatsApp, enquiry form, JSON-LD, internal links, hreflang)
✅ PASS JSON-LD blocks parse (462 blocks; types: AboutPage, Answer, BlogPosting, BreadcrumbList, City, CollectionPage, ContactPage, ContactPoint, FAQPage, GeoCoordinates, HardwareStore, ItemList, ListItem, LocalBusiness, Offer, OfferCatalog, OpeningHoursSpecification, Person, PostalAddress, Product, ProfilePage, Question, Service, SpeakableSpecification, WebApplication, WebPage, WebSite)
✅ PASS Schema founder is Murali Kathirvel
✅ PASS Image sitemap entries present
✅ PASS Schema type present: HardwareStore
✅ PASS Schema type present: LocalBusiness
✅ PASS Schema type present: FAQPage
✅ PASS Schema type present: BreadcrumbList
✅ PASS Schema type present: BlogPosting
✅ PASS Schema type present: Person
✅ PASS Schema type present: Service
✅ PASS Schema type present: WebSite
✅ PASS Schema type present: OpeningHoursSpecification
✅ PASS Schema type present: GeoCoordinates
✅ PASS sitemap.xml lists every indexable page (102/102)
✅ PASS sitemap.xml has hreflang alternates
✅ PASS robots.txt allows crawling + references sitemap
✅ PASS robots.txt allows AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended)
✅ PASS llms.txt present with NAP facts
✅ PASS llms-full.txt present
✅ PASS 404.html present for Vercel
✅ PASS Pages load & hydrate with no JavaScript errors (19 page types)
✅ PASS Category navigation (Home → Cement) works
✅ PASS Desktop floating Call + WhatsApp buttons visible
✅ PASS Mobile sticky Call / WhatsApp / Enquiry bar pinned to bottom
✅ PASS Mobile Call button dials +919150751905
✅ PASS Mobile WhatsApp button opens wa.me/919150751905 with prefilled text
✅ PASS No horizontal scroll on mobile (390px)
✅ PASS Mobile menu opens
✅ PASS Tamil home renders Tamil H1
✅ PASS Mobile pages: no JS errors
✅ PASS Enquiry form sends to kvmagencies123@gmail.com via FormSubmit
✅ PASS Enquiry form shows success + "Also send on WhatsApp" button
✅ PASS Calculator: 1000 sq ft house → 400 – 450 cement bags
✅ PASS Calculator: 1000 sq ft × 5" M20 slab → ~100 bags incl. wastage
✅ PASS Calculator updates live (2000 sq ft → 800 – 900 bags)
✅ PASS Unknown URL returns 404 page with contact options

Result: ALL PASSED

## Lighthouse (mobile, simulated slow 4G), after redesign, 30 Oct 2026

| Page                                    | Performance | Accessibility | Best Practices | SEO | LCP   | TBT   | CLS |
| --------------------------------------- | ----------- | ------------- | -------------- | --- | ----- | ----- | --- |
| /                                       | 96          | 100           | 100            | 100 | 2.6 s | 0 ms  | 0   |
| /ta                                     | 95          | 100           | 100            | 100 | 2.8 s | 0 ms  | 0   |
| /areas/guduvanchery                     | 95          | 100           | 100            | 100 | 2.8 s | 0 ms  | 0   |
| /products/ramco-cement                  | 99          | 100*          | 100            | 100 | 2.0 s | 10 ms | 0   |
| /blog/opc-vs-ppc-cement-which-is-better | 99          | 100*          | 100            | 100 | 2.1 s | 30 ms | 0   |

\* Accessibility re-checked after the contrast and tap-target fixes, which apply site-wide.
