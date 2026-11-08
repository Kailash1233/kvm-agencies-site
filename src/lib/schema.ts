import { SITE } from "~/data/site";
import { AREAS } from "~/data/areas";
import { PRODUCTS, type QA } from "~/data/products";
import { AUTHORS, type Author } from "~/data/authors";
import { abs } from "./seo";

export const BUSINESS_ID = `${SITE.url}/#business`;
export const WEBSITE_ID = `${SITE.url}/#website`;

export const personId = (slug: string) => `${SITE.url}/authors/${slug}#person`;

export function personSchema(a: Author) {
  return {
    "@type": "Person",
    "@id": personId(a.slug),
    name: a.name,
    jobTitle: a.role,
    description: a.bio,
    worksFor: { "@id": BUSINESS_ID },
    knowsAbout: a.knowsAbout,
    url: abs(`/authors/${a.slug}`),
    image: abs(`/images/team/${a.slug}.webp`),
  };
}

export function businessSchema() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["HardwareStore", "LocalBusiness"],
        "@id": BUSINESS_ID,
        name: SITE.name,
        alternateName: SITE.alternateNames,
        description:
          "KVM Agencies is a construction raw material supplier in Chengalpattu, Tamil Nadu, since 2002 – cement (Ramco, UltraTech, Dalmia, ACC, Maha, Adani), M Sand, P Sand, jally (blue metal), chamber bricks, wire cut bricks, hollow blocks, AAC blocks, MCR & ARS TMT steel and binding wire, with site delivery across Chengalpattu district.",
        slogan: SITE.tagline,
        url: abs("/"),
        logo: abs(SITE.logo),
        image: [abs(SITE.ogImage), abs(SITE.logo)],
        telephone: SITE.phone,
        email: SITE.email,
        taxID: SITE.gstin,
        foundingDate: String(SITE.foundingYear),
        founder: { "@id": personId("murali-kathirvel") },
        employee: [
          { "@id": personId("naveen-m-r") },
          { "@id": personId("kailash") },
        ],
        priceRange: "₹₹",
        currenciesAccepted: "INR",
        paymentAccepted: "Cash, UPI, Bank Transfer",
        address: {
          "@type": "PostalAddress",
          streetAddress: `${SITE.address.street}, ${SITE.address.locality}`,
          addressLocality: SITE.address.city,
          addressRegion: SITE.address.region,
          postalCode: SITE.address.postalCode,
          addressCountry: SITE.address.country,
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: SITE.geo.lat,
          longitude: SITE.geo.lng,
        },
        hasMap: SITE.mapsShareUrl,
        openingHoursSpecification: [
          {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: SITE.hours.days,
            opens: SITE.hours.opens,
            closes: SITE.hours.closes,
          },
        ],
        contactPoint: [
          {
            "@type": "ContactPoint",
            telephone: SITE.phone,
            contactType: "sales",
            areaServed: "IN-TN",
            availableLanguage: ["English", "Tamil"],
          },
        ],
        areaServed: AREAS.map((a) => ({
          "@type": "City",
          name: a.name.replace(" & ", ", "),
        })),
        knowsLanguage: ["en", "ta"],
        sameAs: SITE.sameAs,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Construction raw materials",
          itemListElement: PRODUCTS.filter((p) => !p.hub).map((p) => ({
            "@type": "Offer",
            // Service (not Product): Google requires price/review data on Product items, and we
            // don't publish prices – "supply of X" is a valid, rich-result-free description
            itemOffered: {
              "@type": "Service",
              name: `${p.name} supply`,
              url: abs(`/products/${p.slug}`),
            },
            areaServed: "Chengalpattu district, Tamil Nadu",
          })),
        },
      },
      {
        "@type": "WebSite",
        "@id": WEBSITE_ID,
        url: abs("/"),
        name: SITE.name,
        alternateName: "KVM Agencies Chengalpattu",
        publisher: { "@id": BUSINESS_ID },
        inLanguage: ["en-IN", "ta-IN"],
      },
      ...AUTHORS.map(personSchema),
    ],
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: abs(it.path),
    })),
  };
}

export function faqSchema(faqs: QA[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function webPageSchema(o: {
  path: string;
  name: string;
  description: string;
  lang: string;
  type?: string;
  about?: object;
}) {
  return {
    "@context": "https://schema.org",
    "@type": o.type ?? "WebPage",
    "@id": `${abs(o.path)}#webpage`,
    url: abs(o.path),
    name: o.name,
    description: o.description,
    inLanguage: o.lang === "ta" ? "ta-IN" : "en-IN",
    isPartOf: { "@id": WEBSITE_ID },
    about: o.about ?? { "@id": BUSINESS_ID },
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", ".answer"],
    },
  };
}

export function serviceSchema(o: {
  name: string;
  description: string;
  path: string;
  areaServed: string[];
  category?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: o.name,
    serviceType: o.category ?? "Construction material supply",
    description: o.description,
    url: abs(o.path),
    ...(o.image ? { image: abs(o.image) } : {}),
    provider: { "@id": BUSINESS_ID },
    areaServed: o.areaServed.map((n) => ({ "@type": "City", name: n })),
    offers: {
      "@type": "Offer",
      availability: "https://schema.org/InStock",
      seller: { "@id": BUSINESS_ID },
      description: "Call or WhatsApp +91 91507 51905 for today's rate",
    },
  };
}
