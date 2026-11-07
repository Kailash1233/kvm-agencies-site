export interface Author {
  slug: string;
  name: string;
  nameTa: string;
  role: string;
  roleTa: string;
  bio: string;
  bioTa: string;
  knowsAbout: string[];
}

export const AUTHORS: Author[] = [
  {
    slug: "murali-kathirvel",
    name: "Murali Kathirvel",
    nameTa: "முரளி கதிர்வேல்",
    role: "Founder, KVM Agencies",
    roleTa: "நிறுவனர், KVM Agencies",
    bio: "Murali Kathirvel founded KVM Agencies in Chengalpattu in 2002. He built the business on honest rates, genuine materials and dependable delivery, and over more than two decades made KVM Agencies a trusted name for cement, sand, aggregates, bricks, blocks and steel among home owners, masons, contractors and builders in Chengalpattu district.",
    bioTa:
      "முரளி கதிர்வேல் 2002-ல் செங்கல்பட்டில் KVM Agencies-ஐ தொடங்கினார். நியாயமான விலை, உண்மையான பொருட்கள், நம்பகமான டெலிவரி – இவற்றின் மூலம் இருபது ஆண்டுகளுக்கும் மேலாக செங்கல்பட்டு மாவட்டத்தில் நம்பகமான பெயராக KVM Agencies-ஐ உருவாக்கினார்.",
    knowsAbout: [
      "Construction materials supply",
      "Cement distribution",
      "Building materials in Chengalpattu",
    ],
  },
  {
    slug: "naveen-m-r",
    name: "Naveen M R",
    nameTa: "நவீன் எம் ஆர்",
    role: "Managing Director, KVM Agencies",
    roleTa: "நிர்வாக இயக்குநர், KVM Agencies",
    bio: "Naveen M R is the Managing Director of KVM Agencies and the son of founder Murali Kathirvel. He manages the business day to day — purchasing, pricing, stock and site deliveries — and works directly with home owners, contractors and builders across Chengalpattu district. He writes about material prices, buying and how to plan material for every stage of a building.",
    bioTa:
      "நவீன் எம் ஆர் KVM Agencies-ன் நிர்வாக இயக்குநர், நிறுவனர் முரளி கதிர்வேல் அவர்களின் மகன். கொள்முதல், விலை நிர்ணயம், ஸ்டாக், சைட் டெலிவரி என தினசரி நிர்வாகத்தை கவனித்து வருகிறார்.",
    knowsAbout: [
      "Cement",
      "Construction materials supply",
      "Building material prices in Chengalpattu",
      "M Sand",
      "TMT steel",
      "Bricks and blocks",
    ],
  },
  {
    slug: "kailash",
    name: "Kailash",
    nameTa: "கைலாஷ்",
    role: "Technical Advisor – Construction Materials, KVM Agencies",
    roleTa: "தொழில்நுட்ப ஆலோசகர் – கட்டுமானப் பொருட்கள், KVM Agencies",
    bio: "Kailash is the Technical Advisor at KVM Agencies. He helps customers choose the right cement grade, sand, aggregate size, walling material and TMT steel for their work, explains Indian Standard (BIS) specifications in simple terms and helps estimate material quantities for houses and buildings.",
    bioTa:
      "கைலாஷ் KVM Agencies-ன் தொழில்நுட்ப ஆலோசகர். சரியான சிமெண்ட் கிரேடு, மணல், ஜல்லி அளவு, செங்கல் / பிளாக், TMT கம்பி தேர்வு செய்யவும், தேவையான அளவைக் கணக்கிடவும் வாடிக்கையாளர்களுக்கு உதவுகிறார்.",
    knowsAbout: [
      "Concrete mix design basics",
      "IS 456",
      "IS 1786 TMT bars",
      "IS 383 aggregates",
      "OPC vs PPC cement",
      "AAC blocks",
      "Material estimation",
    ],
  },
];

export const authorImage = (slug: string) => `/images/team/${slug}.webp`;

export const authorBySlug = (slug: string) =>
  AUTHORS.find((a) => a.slug === slug);
