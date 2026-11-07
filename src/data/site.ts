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
  social: {
    instagram: "https://www.instagram.com/kvmcmart/",
    youtube: "https://www.youtube.com/@kvmcmart",
    // TODO: replace the dummy links below with real profile URLs, then add them to `sameAs`
    facebook: "#",
    justdial: "#",
    indiamart:
      "https://www.indiamart.com/company/160472674/?srsltid=AYCX9vKO_hTMQRLWUFNxJoojYGK2S6YXuTg-KLgX5qxNAw7NNsqsA6LW",
  },
  // Only real, live profiles go here (used in schema.org sameAs)
  sameAs: [
    "https://www.instagram.com/kvmcmart/",
    "https://www.youtube.com/@kvmcmart",
    "https://www.indiamart.com/company/160472674/?srsltid=AYCX9vKO_hTMQRLWUFNxJoojYGK2S6YXuTg-KLgX5qxNAw7NNsqsA6LW",
  ],
  // Fill these after setting up Google tools (leave empty to disable)
  googleAnalyticsId: "", // e.g. 'G-XXXXXXXXXX'
  googleSiteVerification: "", // content value of the meta tag from Search Console (or verify via DNS)
  bingSiteVerification: "",
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
