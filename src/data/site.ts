// Single source of truth for business details (NAP).
// Keep these EXACTLY identical to the Google Business Profile.
export const SITE = {
  url: "https://kvmagencies.in",
  name: "KVM Agencies",
  alternateNames: [
    "KVM C-Mart",
    "KVM CMart",
    "kvmcmart",
    "KVM Agencies Chengalpattu",
  ],
  legalName: "KVM Agencies",
  tagline: "Construction Raw Material Supplier in Chengalpattu",
  taglineTa: "செங்கல்பட்டில் கட்டுமானப் பொருட்கள் விநியோகஸ்தர்",
  phone: "+919150751905",
  phoneDisplay: "+91 91507 51905",
  whatsapp: "919150751905",
  email: "kvmagencies123@gmail.com",
  gstin: "33BAZPM1036Q1Z1",
  foundingYear: 2002,
  address: {
    street: "52, Kanchipuram High Rd",
    locality: "Natham",
    city: "Chengalpattu",
    region: "Tamil Nadu",
    postalCode: "603002",
    country: "IN",
  },
  addressTa:
    "52, காஞ்சிபுரம் மெயின் ரோடு, நத்தம், செங்கல்பட்டு, தமிழ்நாடு 603002",
  // TODO: replace with the exact pin from your Google Business Profile (Maps → right-click the pin → copy coordinates)
  geo: { lat: 12.6929, lng: 79.9687 },
  mapsShareUrl: "https://share.google/GDmUqBKt6xf6NIB1z",
  mapsEmbedQuery:
    "KVM Agencies, 52, Kanchipuram High Rd, Natham, Chengalpattu, Tamil Nadu 603002",
  hours: {
    text: "Mon – Sat: 9:00 AM – 7:00 PM. Sunday: shop closed, but phone & WhatsApp enquiries are answered.",
    textTa:
      "திங்கள் – சனி: காலை 9 – மாலை 7. ஞாயிறு: கடை விடுமுறை, ஆனால் போன் / WhatsApp மூலம் தொடர்பு கொள்ளலாம்.",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "19:00",
  },
  // Leave a link empty ("") to hide it from the footer
  social: {
    instagram: "https://www.instagram.com/kvmcmart/",
    youtube: "https://www.youtube.com/@kvmcmart",
    linkedin: "https://in.linkedin.com/company/kvm-cmart",
    justdial:
      "https://www.justdial.com/Chengalpattu/KVM-Agencies-Periya-Natham-Kanchipuram-High-Road/9999PXX44-XX44-170310161013-J7N1_BZDET",
    indiamart: "https://www.indiamart.com/company/160472674",
    facebook: "", // TODO: add when the Facebook page is ready
  },
  // Live profiles of this business (schema.org sameAs) – built from `social`
  get sameAs(): string[] {
    return Object.values(this.social).filter(Boolean);
  },
  // Tracking (leave empty to disable)
  googleAnalyticsId: "G-5ENBYJV905", // GA4 – loaded directly; do NOT also add a GA4 tag inside GTM (double counting)
  GTMId: "GTM-TSTQ4F2S", // Google Tag Manager container
  clarityId: "zabyfg8h4m", // Microsoft Clarity – loaded directly; do NOT also add Clarity inside GTM
  googleSiteVerification: "", // verified via public/googlec8fb3c71c908bc1d.html
  bingSiteVerification: "", // verified by importing from Google Search Console
  // Enquiry form → email (FormSubmit.co, no backend needed). First submission sends an activation mail to this inbox.
  formEndpoint: "https://formsubmit.co/ajax/kvmagencies123@gmail.com",
  ogImage: "/og-image.jpg",
  logo: "/logo.png",
};

export const tel = `tel:${SITE.phone}`;

export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const yearsInBusiness = new Date().getFullYear() - SITE.foundingYear;
