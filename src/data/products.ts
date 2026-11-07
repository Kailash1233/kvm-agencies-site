// Product catalogue. Every product gets its own English + Tamil landing page.
// HTML is allowed inside `intro` / `introTa` paragraphs (internal links help SEO).

export type Category =
  "cement" | "sand" | "aggregate" | "bricks" | "blocks" | "steel" | "wire";

export interface QA {
  q: string;
  a: string;
}

export interface Product {
  slug: string;
  category: Category;
  name: string;
  nameTa: string;
  /** Search phrases people actually type (used in copy + llms.txt) */
  aliases: string[];
  title: string;
  metaDescription: string;
  metaDescriptionTa: string;
  h1: string;
  h1Ta: string;
  short: string;
  shortTa: string;
  unit: string;
  unitTa: string;
  intro: string[];
  introTa: string[];
  specs: [string, string][];
  uses: string[];
  usesTa: string[];
  tips: string[];
  faqs: QA[];
  faqsTa: QA[];
  related: string[];
  hub?: boolean;
}

export const CATEGORY_LABELS: Record<Category, { en: string; ta: string }> = {
  cement: { en: "Cement", ta: "சிமெண்ட்" },
  sand: { en: "Sand (M Sand & P Sand)", ta: "மணல் (எம் சாண்ட் & பி சாண்ட்)" },
  aggregate: { en: "Jally / Blue Metal", ta: "ஜல்லி" },
  bricks: { en: "Bricks", ta: "செங்கல்" },
  blocks: { en: "Blocks", ta: "பிளாக் கற்கள்" },
  steel: { en: "TMT Steel", ta: "TMT கம்பி" },
  wire: { en: "Binding Wire", ta: "கட்டு கம்பி" },
};

const cementBrandFaqs = (brand: string): QA[] => [
  {
    q: `What is the ${brand} cement price per bag in Chengalpattu today?`,
    a: `${brand} cement prices change almost every week based on the company's dealer rate, grade (OPC 53 / PPC) and the quantity you take. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's exact per-bag rate in Chengalpattu. Bulk orders (50 bags and above) get a better rate and reduced transport charges.`,
  },
  {
    q: `Do you deliver ${brand} cement to my site?`,
    a: `Yes. KVM Agencies delivers ${brand} cement from our Natham, Chengalpattu yard to sites in Chengalpattu, Maraimalai Nagar, Singaperumal Koil, Guduvanchery, Padappai, Thiruporur, Madurantakam, Kalpakkam and nearby areas. Delivery time is confirmed on call depending on quantity and distance.`,
  },
  {
    q: `Is ${brand} cement fresh stock?`,
    a: `We rotate stock continuously and supply fresh bags. Every bag has the week and year of manufacture printed on it — check it at delivery. For structural work we recommend using cement within about 90 days of manufacture.`,
  },
  {
    q: `Which ${brand} cement grade should I use for a house?`,
    a: `For most house construction work (masonry, plastering, flooring and general RCC), PPC is the common choice because it gains strength steadily and gives better durability. OPC 53 is preferred where faster strength is needed, such as RCC columns, slabs and precast work. Our technical advisor will suggest the right grade for each stage when you call.`,
  },
];

const cementBrandFaqsTa = (brand: string): QA[] => [
  {
    q: `செங்கல்பட்டில் இன்று ${brand} சிமெண்ட் ஒரு மூட்டை விலை என்ன?`,
    a: `${brand} சிமெண்ட் விலை கம்பெனி டீலர் ரேட், கிரேடு (OPC 53 / PPC) மற்றும் நீங்கள் எடுக்கும் அளவைப் பொறுத்து மாறும். இன்றைய சரியான விலைக்கு +91 91507 51905 என்ற எண்ணில் அழைக்கவும் அல்லது WhatsApp செய்யவும். மொத்தமாக (50 மூட்டைக்கு மேல்) வாங்கினால் விலையும் போக்குவரத்து கட்டணமும் குறையும்.`,
  },
  {
    q: `${brand} சிமெண்ட் சைட்டுக்கு டெலிவரி செய்வீர்களா?`,
    a: `ஆம். செங்கல்பட்டு, மறைமலை நகர், சிங்கபெருமாள் கோயில், கூடுவாஞ்சேரி, படப்பை, திருப்போரூர், மதுராந்தகம், கல்பாக்கம் மற்றும் சுற்றுவட்டாரப் பகுதிகளுக்கு டெலிவரி செய்கிறோம்.`,
  },
  {
    q: `வீடு கட்ட எந்த ${brand} சிமெண்ட் கிரேடு நல்லது?`,
    a: `பெரும்பாலான வீட்டு வேலைகளுக்கு (கட்டு வேலை, பூச்சு, தரை) PPC சிமெண்ட் சிறந்தது. விரைவான வலிமை தேவைப்படும் தூண், ஸ்லாப் போன்ற RCC வேலைகளுக்கு OPC 53 பயன்படுத்தலாம்.`,
  },
];

const cementSpecs = (extra: [string, string][] = []): [string, string][] => [
  ["Grades available", "OPC 53 & PPC (ask for current stock)"],
  ["Pack size", "50 kg bag"],
  ["OPC standard", "IS 269:2015"],
  ["PPC standard", "IS 1489 (Part 1):2015"],
  ...extra,
  ["Minimum order", "Any quantity — bulk orders get better rates"],
  ["Price", "Call / WhatsApp for today's rate"],
];

const cementUses = [
  "RCC foundation, columns, beams and roof slabs",
  "Brick and block masonry work",
  "Wall plastering and ceiling plastering",
  "Flooring, screed and tile bedding",
  "Compound walls, sumps and septic tanks",
];
const cementUsesTa = [
  "அடித்தளம், தூண், பீம், ஸ்லாப் RCC வேலைகள்",
  "செங்கல் மற்றும் பிளாக் கட்டு வேலை",
  "சுவர் மற்றும் சீலிங் பூச்சு வேலை",
  "தரை மற்றும் டைல்ஸ் பதிக்கும் வேலை",
  "காம்பவுண்ட் சுவர், சம்ப், செப்டிக் டேங்க்",
];
const cementTips = [
  "Check the manufacturing week/year printed on every bag before unloading.",
  "Store bags on a raised wooden platform, away from walls, covered with a tarpaulin.",
  "Stack a maximum of 10 bags high and use the oldest stock first.",
  "Do not accept bags that have hard lumps — that means moisture has entered.",
  "Ask for a GST bill — KVM Agencies provides proper GST invoices (GSTIN 33BAZPM1036Q1Z1).",
];

export const PRODUCTS: Product[] = [
  // ───────────────────────── CEMENT HUB ─────────────────────────
  {
    slug: "cement",
    hub: true,
    category: "cement",
    name: "Cement (All Brands)",
    nameTa: "சிமெண்ட் (அனைத்து பிராண்டுகள்)",
    aliases: [
      "cement dealer chengalpattu",
      "cement shop near me",
      "cement wholesale chengalpattu",
      "cement price chengalpattu today",
    ],
    title:
      "Cement Dealer in Chengalpattu | Ramco, UltraTech, Dalmia, ACC, Maha, Adani",
    metaDescription:
      "Cement dealer in Chengalpattu since 2002 – Ramco, UltraTech, Dalmia, ACC, Maha & Adani, OPC 53 & PPC. GST bill & site delivery. Call 91507 51905.",
    metaDescriptionTa:
      "செங்கல்பட்டில் சிமெண்ட் டீலர் – ராம்கோ, அல்ட்ராடெக், டால்மியா, ACC, மஹா, அதானி. இன்றைய விலைக்கு 91507 51905 அழைக்கவும்.",
    h1: "Cement Dealer in Chengalpattu – All Leading Brands",
    h1Ta: "செங்கல்பட்டில் சிமெண்ட் டீலர் – அனைத்து முன்னணி பிராண்டுகள்",
    short:
      "Ramco, UltraTech, Dalmia, ACC, Maha & Adani cement – OPC 53 and PPC grades with site delivery.",
    shortTa:
      "ராம்கோ, அல்ட்ராடெக், டால்மியா, ACC, மஹா, அதானி – OPC 53 மற்றும் PPC.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      'KVM Agencies is a cement dealer in Chengalpattu supplying all the brands that builders, contractors and home owners in Chengalpattu district trust — <a href="/products/ramco-cement">Ramco</a>, <a href="/products/ultratech-cement">UltraTech</a>, <a href="/products/dalmia-cement">Dalmia</a>, <a href="/products/acc-cement">ACC</a>, <a href="/products/maha-cement">Maha</a> and <a href="/products/adani-cement">Adani</a>. Since 2002 we have been supplying cement from our yard at 52, Kanchipuram High Road, Natham, Chengalpattu.',
      "We stock both <strong>OPC 53 grade</strong> (for faster strength in RCC work) and <strong>PPC</strong> (for masonry, plastering and durable general construction). You can buy a few bags for a repair job or full lorry loads for a building project — bulk orders get better rates and reduced transport charges.",
      'Cement prices change frequently, so we do not print a fixed rate on the website. Call or WhatsApp <a href="tel:+919150751905">+91 91507 51905</a> and you will get today\'s brand-wise rate within minutes, along with the delivery charge to your site.',
      'Not sure which cement to use? Read our guide on <a href="/blog/opc-vs-ppc-cement-which-is-better">OPC vs PPC cement</a> or <a href="/blog/best-cement-brand-for-house-construction-tamil-nadu">choosing the best cement brand for house construction</a>.',
    ],
    introTa: [
      "KVM Agencies செங்கல்பட்டில் 2002 முதல் சிமெண்ட் விநியோகம் செய்கிறது. ராம்கோ, அல்ட்ராடெக், டால்மியா, ACC, மஹா, அதானி போன்ற அனைத்து முன்னணி பிராண்டுகளும் OPC 53 மற்றும் PPC கிரேடுகளில் கிடைக்கும்.",
      "சில மூட்டைகளோ அல்லது முழு லாரி லோடோ – எந்த அளவுக்கும் சைட்டுக்கு டெலிவரி செய்கிறோம். மொத்த ஆர்டர்களுக்கு குறைந்த விலை மற்றும் குறைந்த போக்குவரத்து கட்டணம். இன்றைய விலைக்கு 91507 51905 அழைக்கவும்.",
    ],
    specs: cementSpecs([
      ["Brands", "Ramco, UltraTech, Dalmia (DSP / Concreto), ACC, Maha, Adani"],
    ]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: [
      {
        q: "Which is the best cement dealer in Chengalpattu?",
        a: "KVM Agencies, 52, Kanchipuram High Road, Natham, Chengalpattu, has been supplying cement since 2002. We stock Ramco, UltraTech, Dalmia, ACC, Maha and Adani cement in OPC 53 and PPC grades, provide GST bills and deliver to sites across Chengalpattu district. Call +91 91507 51905.",
      },
      {
        q: "What is today's cement price in Chengalpattu?",
        a: "Cement rates in Chengalpattu change with company price revisions, so the correct rate is the one you get on the day of purchase. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's brand-wise price for OPC 53 and PPC.",
      },
      {
        q: "Which cement is best for house construction?",
        a: "All the brands we sell are BIS-certified and reliable. For house construction, PPC is generally preferred for masonry, plastering and general work, while OPC 53 is used where quick strength is needed. The right brand depends on availability, price and your engineer's preference — call us and we will compare rates for you.",
      },
      {
        q: "Do you sell cement in small quantities?",
        a: "Yes. You can buy even a few bags for repair work. For orders above 50 bags, we offer bulk pricing and reduced transport charges.",
      },
    ],
    faqsTa: [
      {
        q: "செங்கல்பட்டில் சிறந்த சிமெண்ட் டீலர் யார்?",
        a: "KVM Agencies, 52, காஞ்சிபுரம் மெயின் ரோடு, நத்தம், செங்கல்பட்டு – 2002 முதல் சிமெண்ட் விநியோகம். அனைத்து பிராண்டுகளும் GST பில்லுடன் கிடைக்கும். அழைக்க: 91507 51905.",
      },
      {
        q: "இன்றைய சிமெண்ட் விலை என்ன?",
        a: "சிமெண்ட் விலை அடிக்கடி மாறும். இன்றைய பிராண்ட் வாரியான விலைக்கு 91507 51905 அழைக்கவும் அல்லது WhatsApp செய்யவும்.",
      },
    ],
    related: [
      "ramco-cement",
      "ultratech-cement",
      "dalmia-cement",
      "acc-cement",
      "maha-cement",
      "adani-cement",
    ],
  },

  // ───────────────────────── CEMENT BRANDS ─────────────────────────
  {
    slug: "ramco-cement",
    category: "cement",
    name: "Ramco Cement",
    nameTa: "ராம்கோ சிமெண்ட்",
    aliases: [
      "ramco cement dealer chengalpattu",
      "ramco supergrade",
      "ramco supercrete",
      "ramco cement price today",
    ],
    title:
      "Ramco Cement Dealer in Chengalpattu | Supergrade, Supercrete, OPC 53",
    metaDescription:
      "Ramco cement dealer in Chengalpattu – Supergrade, Supercrete & OPC 53. Fresh stock, GST bill & site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் ராம்கோ சிமெண்ட் – சூப்பர்கிரேடு, சூப்பர்கிரீட், OPC 53. இன்றைய விலைக்கு 91507 51905.",
    h1: "Ramco Cement Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் ராம்கோ சிமெண்ட் டீலர்",
    short:
      "Ramco Supergrade, Supercrete and OPC 53 – Tamil Nadu's home-grown favourite.",
    shortTa: "ராம்கோ சூப்பர்கிரேடு, சூப்பர்கிரீட், OPC 53.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      "Ramco is one of the most trusted cement brands in Tamil Nadu. The Ramco Cements Limited is headquartered in Chennai and has been part of South Indian construction for decades. At KVM Agencies, Chengalpattu, we supply Ramco cement to home builders, masons, contractors and builders across Chengalpattu district.",
      "Popular Ramco variants include <strong>Ramco Supergrade</strong>, <strong>Ramco Supercrete</strong> and <strong>Ramco OPC 53</strong>. Availability of each variant changes with company supply, so call us and we will tell you what is in stock and which variant suits your work.",
      "Ramco is widely chosen by masons in our area for plastering and masonry because of its smooth workability and good finish. For RCC work, follow your engineer's specification on grade.",
      'Order Ramco cement together with <a href="/products/m-sand">M Sand</a>, <a href="/products/jally-blue-metal">jally</a> and <a href="/products/tmt-steel">TMT steel</a> from one supplier and save on transport.',
    ],
    introTa: [
      "ராம்கோ சிமெண்ட் தமிழ்நாட்டில் மிகவும் நம்பகமான சிமெண்ட் பிராண்டுகளில் ஒன்று. KVM Agencies செங்கல்பட்டில் ராம்கோ சூப்பர்கிரேடு, சூப்பர்கிரீட் மற்றும் OPC 53 சிமெண்ட் விநியோகம் செய்கிறது.",
      "பூச்சு வேலைக்கும் கட்டு வேலைக்கும் மேஸ்திரிகள் அதிகம் விரும்புவது ராம்கோ. இன்றைய விலை மற்றும் ஸ்டாக் விவரங்களுக்கு 91507 51905 அழைக்கவும்.",
    ],
    specs: cementSpecs([
      ["Popular variants", "Ramco Supergrade, Ramco Supercrete, Ramco OPC 53"],
    ]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: cementBrandFaqs("Ramco"),
    faqsTa: cementBrandFaqsTa("ராம்கோ"),
    related: ["ultratech-cement", "dalmia-cement", "m-sand", "p-sand"],
  },
  {
    slug: "ultratech-cement",
    category: "cement",
    name: "UltraTech Cement",
    nameTa: "அல்ட்ராடெக் சிமெண்ட்",
    aliases: [
      "ultratech cement dealer chengalpattu",
      "ultratech opc 53",
      "ultratech ppc price",
      "ultratech cement near me",
    ],
    title:
      "UltraTech Cement Dealer in Chengalpattu | OPC 53 & PPC – Today's Rate",
    metaDescription:
      "UltraTech cement dealer in Chengalpattu – OPC 53 & PPC bags with GST bill and site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் அல்ட்ராடெக் சிமெண்ட் – OPC 53 & PPC. இன்றைய விலைக்கு 91507 51905.",
    h1: "UltraTech Cement Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் அல்ட்ராடெக் சிமெண்ட் டீலர்",
    short:
      "India's largest cement brand – OPC 53 and PPC for every stage of construction.",
    shortTa: "இந்தியாவின் மிகப்பெரிய சிமெண்ட் பிராண்ட் – OPC 53 & PPC.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      "UltraTech Cement, from the Aditya Birla Group, is India's largest cement manufacturer and one of the most specified brands by engineers and builders. KVM Agencies supplies UltraTech cement in Chengalpattu and surrounding areas with proper GST billing.",
      "We supply <strong>UltraTech OPC 53</strong> for high-strength RCC work and <strong>UltraTech PPC</strong> for masonry, plastering and general construction. Premium variants can be arranged on request.",
      'Many apartment builders and industrial contractors around <a href="/areas/mahindra-world-city">Mahindra World City</a>, <a href="/areas/maraimalai-nagar">Maraimalai Nagar</a> and <a href="/areas/singaperumal-koil">Singaperumal Koil</a> specify UltraTech in their drawings — we can supply regular lorry loads for such projects.',
    ],
    introTa: [
      "அல்ட்ராடெக் சிமெண்ட் (ஆதித்யா பிர்லா குழுமம்) இந்தியாவின் மிகப்பெரிய சிமெண்ட் நிறுவனம். KVM Agencies செங்கல்பட்டில் அல்ட்ராடெக் OPC 53 மற்றும் PPC சிமெண்ட் GST பில்லுடன் விநியோகம் செய்கிறது.",
      "அபார்ட்மெண்ட் மற்றும் தொழிற்சாலை கட்டுமானங்களுக்கு லாரி லோடாக தொடர்ந்து விநியோகம் செய்ய முடியும். இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: cementSpecs([
      ["Manufacturer", "UltraTech Cement Ltd (Aditya Birla Group)"],
    ]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: cementBrandFaqs("UltraTech"),
    faqsTa: cementBrandFaqsTa("அல்ட்ராடெக்"),
    related: ["ramco-cement", "acc-cement", "tmt-steel", "jally-blue-metal"],
  },
  {
    slug: "dalmia-cement",
    category: "cement",
    name: "Dalmia Cement (DSP / Concreto)",
    nameTa: "டால்மியா சிமெண்ட் (DSP / கான்கிரீட்டோ)",
    aliases: [
      "dalmia cement dealer chengalpattu",
      "dalmia dsp cement",
      "dalmia concreto",
      "dalmia cement price today",
    ],
    title: "Dalmia Cement Dealer in Chengalpattu | Dalmia DSP & Concreto",
    metaDescription:
      "Dalmia cement dealer in Chengalpattu – Dalmia DSP, Concreto & PPC with GST bill and site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் டால்மியா சிமெண்ட் – DSP, கான்கிரீட்டோ. இன்றைய விலைக்கு 91507 51905.",
    h1: "Dalmia Cement Dealer in Chengalpattu – DSP & Concreto",
    h1Ta: "செங்கல்பட்டில் டால்மியா சிமெண்ட் டீலர் – DSP & கான்கிரீட்டோ",
    short:
      "Dalmia DSP and Dalmia Concreto – popular choices for slabs, columns and foundations.",
    shortTa:
      "டால்மியா DSP மற்றும் கான்கிரீட்டோ – ஸ்லாப், தூண், அடித்தளத்திற்கு.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      "Dalmia Bharat is one of India's oldest cement groups with a strong presence in Tamil Nadu. KVM Agencies supplies Dalmia cement in Chengalpattu including the premium <strong>Dalmia DSP</strong> and <strong>Dalmia Concreto</strong> variants along with regular Dalmia PPC.",
      "Dalmia DSP is commonly used by contractors in our area for concrete work such as foundations, columns and roof slabs, while Concreto and regular PPC are used for general construction. Tell us what work you are doing and we will suggest the suitable Dalmia variant.",
      'Combine your Dalmia cement order with <a href="/products/jally-blue-metal">20 mm jally</a>, <a href="/products/m-sand">M Sand</a> and <a href="/products/tmt-steel">TMT steel</a> for your slab — we deliver everything together.',
    ],
    introTa: [
      "டால்மியா பாரத் இந்தியாவின் பழமையான சிமெண்ட் நிறுவனங்களில் ஒன்று. KVM Agencies செங்கல்பட்டில் டால்மியா DSP, டால்மியா கான்கிரீட்டோ மற்றும் PPC சிமெண்ட் விநியோகம் செய்கிறது.",
      "அடித்தளம், தூண், ஸ்லாப் போன்ற கான்கிரீட் வேலைகளுக்கு டால்மியா DSP அதிகம் பயன்படுத்தப்படுகிறது. இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: cementSpecs([
      [
        "Variants",
        "Dalmia DSP, Dalmia Concreto, Dalmia PPC (ask for current stock)",
      ],
    ]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: [
      {
        q: "What is the difference between Dalmia DSP and Dalmia Concreto?",
        a: "Both are premium cements from Dalmia Bharat. DSP is widely used by contractors for concrete and structural work such as foundations, columns and slabs, while Concreto is used for general construction. Exact composition is printed on the bag; call KVM Agencies on +91 91507 51905 and we will tell you which variant is in stock and best for your work.",
      },
      ...cementBrandFaqs("Dalmia"),
    ],
    faqsTa: cementBrandFaqsTa("டால்மியா"),
    related: [
      "ultratech-cement",
      "ramco-cement",
      "jally-blue-metal",
      "tmt-steel",
    ],
  },
  {
    slug: "acc-cement",
    category: "cement",
    name: "ACC Cement",
    nameTa: "ACC சிமெண்ட்",
    aliases: [
      "acc cement dealer chengalpattu",
      "acc suraksha",
      "acc gold cement",
      "acc cement price today",
    ],
    title: "ACC Cement Dealer in Chengalpattu | ACC PPC & OPC – Today's Price",
    metaDescription:
      "ACC cement dealer in Chengalpattu – ACC PPC, OPC & premium variants with GST bill and site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் ACC சிமெண்ட் – PPC & OPC. இன்றைய விலைக்கு 91507 51905.",
    h1: "ACC Cement Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் ACC சிமெண்ட் டீலர்",
    short:
      "ACC – one of India's oldest cement brands, now part of the Adani group.",
    shortTa: "இந்தியாவின் பழமையான சிமெண்ட் பிராண்ட் – ACC.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      "ACC is one of the oldest and best-known cement brands in India and is now part of the Adani Group's cement business. KVM Agencies supplies ACC cement in Chengalpattu for houses, commercial buildings and repair work.",
      "We supply ACC PPC and OPC along with premium variants such as ACC Suraksha and ACC Gold when available. Call to confirm the current variant in stock.",
      '<strong>Note:</strong> ACC <em>cement</em> is different from AAC <em>blocks</em>. If you are looking for lightweight AAC blocks (often searched as "ACC blocks"), see our <a href="/products/aac-blocks">AAC blocks page</a>.',
    ],
    introTa: [
      "ACC இந்தியாவின் பழமையான சிமெண்ட் பிராண்டுகளில் ஒன்று, தற்போது அதானி குழுமத்தின் ஒரு பகுதி. KVM Agencies செங்கல்பட்டில் ACC PPC மற்றும் OPC சிமெண்ட் விநியோகம் செய்கிறது.",
      "குறிப்பு: ACC சிமெண்ட் வேறு, AAC பிளாக் (இலகுரக கற்கள்) வேறு. இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: cementSpecs([["Group", "Adani Group (ACC Limited)"]]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: cementBrandFaqs("ACC"),
    faqsTa: cementBrandFaqsTa("ACC"),
    related: ["adani-cement", "ultratech-cement", "aac-blocks", "p-sand"],
  },
  {
    slug: "maha-cement",
    category: "cement",
    name: "Maha Cement",
    nameTa: "மஹா சிமெண்ட்",
    aliases: [
      "maha cement dealer chengalpattu",
      "maha cement price",
      "my home maha cement",
      "maha hd cement",
    ],
    title: "Maha Cement Dealer in Chengalpattu | PPC & OPC – Best Rate",
    metaDescription:
      "Maha cement dealer in Chengalpattu – PPC, OPC & composite variants with GST bill and site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் மஹா சிமெண்ட் – PPC & OPC. இன்றைய விலைக்கு 91507 51905.",
    h1: "Maha Cement Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் மஹா சிமெண்ட் டீலர்",
    short:
      "Maha cement from My Home Industries – value-for-money choice for house construction.",
    shortTa: "மை ஹோம் இண்டஸ்ட்ரீஸின் மஹா சிமெண்ட் – நியாயமான விலை.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      "Maha Cement is the flagship brand of My Home Industries, a South Indian cement manufacturer with a grinding unit in Tamil Nadu. It is a popular value-for-money brand for independent houses and general construction in Chengalpattu district.",
      "KVM Agencies supplies Maha cement in PPC, OPC and premium composite variants (as available) with GST billing and site delivery to Chengalpattu, Guduvanchery, Padappai, Madurantakam and nearby towns.",
      'If you are comparing rates, ask us for Maha alongside <a href="/products/ramco-cement">Ramco</a> and <a href="/products/dalmia-cement">Dalmia</a> — we will give you a clear brand-wise quote.',
    ],
    introTa: [
      "மஹா சிமெண்ட் – மை ஹோம் இண்டஸ்ட்ரீஸ் நிறுவனத்தின் முக்கிய பிராண்ட். தனி வீடுகளுக்கும் பொதுக் கட்டுமானத்திற்கும் நியாயமான விலையில் நல்ல தரம்.",
      "KVM Agencies செங்கல்பட்டு மற்றும் சுற்றுப்பகுதிகளுக்கு மஹா சிமெண்ட் டெலிவரி செய்கிறது. இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: cementSpecs([["Manufacturer", "My Home Industries Pvt Ltd"]]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: cementBrandFaqs("Maha"),
    faqsTa: cementBrandFaqsTa("மஹா"),
    related: ["ramco-cement", "dalmia-cement", "chamber-bricks", "m-sand"],
  },
  {
    slug: "adani-cement",
    category: "cement",
    name: "Adani Cement",
    nameTa: "அதானி சிமெண்ட்",
    aliases: [
      "adani cement dealer chengalpattu",
      "adani cement price",
      "ambuja cement chengalpattu",
      "adani group cement",
    ],
    title: "Adani Cement Dealer in Chengalpattu | Today's Rate & Site Delivery",
    metaDescription:
      "Adani cement dealer in Chengalpattu with GST bill and site delivery across Chengalpattu district. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் அதானி சிமெண்ட் – இன்றைய விலைக்கு 91507 51905.",
    h1: "Adani Cement Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் அதானி சிமெண்ட் டீலர்",
    short: "Cement from the Adani group – India's second-largest cement maker.",
    shortTa:
      "அதானி குழும சிமெண்ட் – இந்தியாவின் இரண்டாவது பெரிய சிமெண்ட் உற்பத்தியாளர்.",
    unit: "per 50 kg bag",
    unitTa: "50 கிலோ மூட்டை",
    intro: [
      "The Adani Group is today India's second-largest cement producer, with brands including ACC and Ambuja and a growing presence in South India. KVM Agencies supplies Adani group cement in Chengalpattu with GST billing and site delivery.",
      "Call us to know which Adani cement variant is currently in stock and today's rate. We supply both small quantities for home owners and lorry loads for contractors.",
      'Also see <a href="/products/acc-cement">ACC cement</a>, which is part of the same group.',
    ],
    introTa: [
      "அதானி குழுமம் இன்று இந்தியாவின் இரண்டாவது பெரிய சிமெண்ட் உற்பத்தியாளர். KVM Agencies செங்கல்பட்டில் அதானி சிமெண்ட் GST பில்லுடன் விநியோகம் செய்கிறது.",
      "ஸ்டாக் மற்றும் இன்றைய விலைக்கு 91507 51905 அழைக்கவும்.",
    ],
    specs: cementSpecs([["Group", "Adani Group (Adani Cement)"]]),
    uses: cementUses,
    usesTa: cementUsesTa,
    tips: cementTips,
    faqs: cementBrandFaqs("Adani"),
    faqsTa: cementBrandFaqsTa("அதானி"),
    related: ["acc-cement", "ultratech-cement", "tmt-steel", "hollow-blocks"],
  },

  // ───────────────────────── SAND ─────────────────────────
  {
    slug: "m-sand",
    category: "sand",
    name: "M Sand (Manufactured Sand)",
    nameTa: "எம் சாண்ட் (M Sand)",
    aliases: [
      "m sand chengalpattu",
      "m sand price per unit",
      "concrete m sand",
      "msand near me",
      "manufactured sand supplier",
    ],
    title: "M Sand Supplier in Chengalpattu | Concrete M Sand – Price per Unit",
    metaDescription:
      "M Sand supplier in Chengalpattu – concrete M Sand (0–4.75 mm) delivered by unit or load to your site. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் எம் சாண்ட் – யூனிட் / லோடு அளவில் சைட்டுக்கு டெலிவரி. இன்றைய விலைக்கு 91507 51905.",
    h1: "M Sand Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் எம் சாண்ட் விநியோகம்",
    short:
      "Concrete-grade M Sand for RCC, foundations and block work – delivered by unit or load.",
    shortTa: "RCC, அடித்தளம், கட்டு வேலைக்கான கான்கிரீட் எம் சாண்ட்.",
    unit: "per unit (100 cft) / per load",
    unitTa: "யூனிட் (100 கன அடி) / லோடு",
    intro: [
      "M Sand (Manufactured Sand) is crushed-rock sand made by crushing hard granite and grading it to the size of natural river sand. Since river sand mining is restricted in Tamil Nadu, M Sand has become the standard fine aggregate for concrete and masonry work. KVM Agencies supplies quality M Sand across Chengalpattu district.",
      'Our <strong>concrete M Sand</strong> is graded 0–4.75 mm and is suitable for RCC foundations, columns, beams, slabs, block work and brick work. Indian Standard IS 383:2016 recognises manufactured sand as fine aggregate for concrete. For plastering, use the finer <a href="/products/p-sand">P Sand</a>.',
      "We supply M Sand by <strong>unit</strong> (1 unit = 100 cubic feet) or by full load (tipper / lorry). The rate depends on quantity and distance to your site — bulk loads reduce your transport cost per unit.",
      'Learn how to check M Sand quality at your site in our guide: <a href="/blog/m-sand-vs-p-sand-vs-river-sand">M Sand vs P Sand vs River Sand</a>.',
    ],
    introTa: [
      "எம் சாண்ட் (M Sand) என்பது கடினமான கருங்கல்லை அரைத்து ஆற்று மணல் அளவுக்கு தரம் பிரிக்கப்பட்ட செயற்கை மணல். ஆற்று மணல் கட்டுப்பாட்டினால் இன்று கான்கிரீட் மற்றும் கட்டு வேலைகளுக்கு எம் சாண்ட் தான் முதன்மை.",
      "எங்கள் கான்கிரீட் எம் சாண்ட் 0–4.75 மிமீ அளவுடையது – அடித்தளம், தூண், பீம், ஸ்லாப், கட்டு வேலைக்கு ஏற்றது. யூனிட் (100 கன அடி) அல்லது முழு லோடாக டெலிவரி. இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: [
      ["Type", "Concrete M Sand (crushed granite)"],
      ["Particle size", "0 – 4.75 mm"],
      [
        "Standard",
        "IS 383:2016 (fine aggregate, Zone II recommended for concrete)",
      ],
      ["Sold by", "Unit (100 cft) or full load"],
      ["Delivery", "Tipper / lorry to site"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "RCC concrete for foundations, columns, beams and slabs",
      "Brick and block masonry mortar",
      "PCC (plain cement concrete) bed",
      "Floor screed and pathways",
      "Hollow block and paver block making",
    ],
    usesTa: [
      "அடித்தளம், தூண், பீம், ஸ்லாப் கான்கிரீட்",
      "செங்கல் / பிளாக் கட்டு வேலை",
      "PCC வேலை",
      "தரை மற்றும் நடைபாதை",
      "ஹாலோ பிளாக் தயாரிப்பு",
    ],
    tips: [
      'Do the "hand test": rub a handful of M Sand — it should not leave a heavy dust coating on your palm.',
      "Do a silt test in a glass jar with water; silt layer should be small (under about 8% for good sand).",
      "M Sand particles should be cubical and sharp-edged, not flaky.",
      "Keep M Sand covered at site to avoid wash-off in rain.",
      "Use P Sand, not concrete M Sand, for wall and ceiling plastering.",
    ],
    faqs: [
      {
        q: "What is the M Sand price per unit in Chengalpattu?",
        a: "M Sand price depends on the quantity (unit or full load) and the distance from our Chengalpattu yard to your site. Call or WhatsApp KVM Agencies on +91 91507 51905 with your location and quantity to get today's delivered price.",
      },
      {
        q: "How much is 1 unit of M Sand?",
        a: "1 unit of sand = 100 cubic feet (about 2.83 cubic metres). A typical small tipper carries around 2–3 units, and larger lorries carry more. We will tell you the exact load size when you order.",
      },
      {
        q: "Is M Sand good for house construction?",
        a: "Yes. Good quality, washed M Sand that meets IS 383 is suitable for RCC, masonry and concrete work. It is consistent in size and free from organic impurities found in river sand. For plastering, use P Sand (finer grade).",
      },
      {
        q: "What is the difference between M Sand and P Sand?",
        a: "M Sand (concrete sand) is coarser, around 0–4.75 mm, and is used for concrete and masonry. P Sand (plastering sand) is finer, around 0–2.36 mm, and is used for wall and ceiling plastering to give a smooth finish.",
      },
    ],
    faqsTa: [
      {
        q: "எம் சாண்ட் ஒரு யூனிட் விலை என்ன?",
        a: "அளவு மற்றும் தூரத்தைப் பொறுத்து விலை மாறும். உங்கள் இடம் மற்றும் தேவையான அளவுடன் 91507 51905 அழைக்கவும் அல்லது WhatsApp செய்யவும்.",
      },
      {
        q: "ஒரு யூனிட் மணல் என்றால் எவ்வளவு?",
        a: "1 யூனிட் = 100 கன அடி (சுமார் 2.83 கன மீட்டர்).",
      },
      {
        q: "எம் சாண்ட் வீடு கட்ட நல்லதா?",
        a: "ஆம். IS 383 தரத்திலான நல்ல எம் சாண்ட் கான்கிரீட் மற்றும் கட்டு வேலைக்கு சிறந்தது. பூச்சு வேலைக்கு பி சாண்ட் பயன்படுத்தவும்.",
      },
    ],
    related: ["p-sand", "jally-blue-metal", "cement", "hollow-blocks"],
  },
  {
    slug: "p-sand",
    category: "sand",
    name: "P Sand (Plastering Sand)",
    nameTa: "பி சாண்ட் (பூச்சு மணல்)",
    aliases: [
      "p sand chengalpattu",
      "plastering sand price",
      "p sand per unit",
      "psand near me",
    ],
    title: "P Sand Supplier in Chengalpattu | Plastering Sand – Price per Unit",
    metaDescription:
      "P Sand (plastering sand) in Chengalpattu – fine sand for smooth wall & ceiling plaster, by unit or load. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் பி சாண்ட் (பூச்சு மணல்) – யூனிட் / லோடு டெலிவரி. இன்றைய விலைக்கு 91507 51905.",
    h1: "P Sand (Plastering Sand) Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் பி சாண்ட் (பூச்சு மணல்) விநியோகம்",
    short:
      "Fine plastering sand for smooth, crack-free wall and ceiling finish.",
    shortTa: "மென்மையான சுவர் மற்றும் சீலிங் பூச்சுக்கான மணல்.",
    unit: "per unit (100 cft) / per load",
    unitTa: "யூனிட் (100 கன அடி) / லோடு",
    intro: [
      "P Sand (Plastering Sand) is a finer grade of manufactured sand, specially graded for plastering. Because the particles are smaller and more uniform, P Sand gives a smooth surface and reduces cracks in wall and ceiling plaster. KVM Agencies supplies P Sand across Chengalpattu and nearby towns.",
      'P Sand is typically graded around 0–2.36 mm. It should be used only for plastering and fine finishing — for concrete and masonry use <a href="/products/m-sand">M Sand</a>.',
      'We deliver P Sand by unit (100 cft) or full load. Order it together with <a href="/products/cement">cement</a> for your plastering stage and save on transport.',
    ],
    introTa: [
      "பி சாண்ட் என்பது பூச்சு வேலைக்காக தயாரிக்கப்பட்ட நுண்ணிய மணல் (சுமார் 0–2.36 மிமீ). சுவரில் மென்மையான முடிவும் விரிசல் குறைவும் கிடைக்கும்.",
      "கான்கிரீட் வேலைக்கு எம் சாண்ட், பூச்சு வேலைக்கு பி சாண்ட். யூனிட் அல்லது லோடாக டெலிவரி – 91507 51905.",
    ],
    specs: [
      ["Type", "Plastering M Sand (P Sand)"],
      ["Particle size", "approx. 0 – 2.36 mm"],
      ["Use", "Internal & external wall plastering, ceiling plastering"],
      ["Sold by", "Unit (100 cft) or full load"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Internal wall plastering",
      "External wall plastering",
      "Ceiling plastering",
      "Fine finishing and patch work",
      "Tile joint and fine mortar work",
    ],
    usesTa: [
      "உள் சுவர் பூச்சு",
      "வெளிச் சுவர் பூச்சு",
      "சீலிங் பூச்சு",
      "சிறு பழுது வேலைகள்",
    ],
    tips: [
      "Use P Sand only for plastering — it is too fine for structural concrete.",
      "Cure plastered walls with water for at least 7 days to avoid shrinkage cracks.",
      "Typical plaster mix: 1:4 or 1:5 (cement : P Sand) for walls, 1:3 for ceilings — follow your engineer.",
      "Check that the sand is free from excess dust and clay lumps.",
    ],
    faqs: [
      {
        q: "What is the P Sand price in Chengalpattu?",
        a: "P Sand price depends on quantity and delivery distance. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's delivered rate.",
      },
      {
        q: "Can P Sand be used for concrete?",
        a: "No. P Sand is too fine for structural concrete. Use concrete M Sand (0–4.75 mm) for RCC and masonry, and P Sand for plastering.",
      },
      {
        q: "How much P Sand is needed for plastering 100 sq ft of wall?",
        a: "For 12 mm thick plaster in 1:4 mix, 100 sq ft of wall needs roughly 4–5 cft of P Sand and about 0.8 bag of cement (approximate; wastage extra). Use our material calculator for a quick estimate.",
      },
    ],
    faqsTa: [
      {
        q: "பி சாண்ட் விலை என்ன?",
        a: "அளவு மற்றும் தூரத்தைப் பொறுத்து மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
      {
        q: "பி சாண்ட் கான்கிரீட்டுக்கு பயன்படுத்தலாமா?",
        a: "கூடாது. கான்கிரீட்டுக்கு எம் சாண்ட், பூச்சுக்கு மட்டும் பி சாண்ட்.",
      },
    ],
    related: ["m-sand", "cement", "wire-cut-bricks", "chamber-bricks"],
  },

  // ───────────────────────── JALLY ─────────────────────────
  {
    slug: "jally-blue-metal",
    category: "aggregate",
    name: "Jally / Blue Metal (6, 12, 20, 40 mm)",
    nameTa: "ஜல்லி (6, 12, 20, 40 மிமீ)",
    aliases: [
      "jally chengalpattu",
      "jalli",
      "blue metal supplier",
      "20mm jally price",
      "40mm jally",
      "aggregate supplier chengalpattu",
    ],
    title:
      "Jally (Blue Metal) Supplier in Chengalpattu | 20mm, 40mm, 12mm, 6mm",
    metaDescription:
      "Jally / blue metal in Chengalpattu – 20 mm, 40 mm, 12 mm & 6 mm, delivered by unit or load. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் ஜல்லி – 20 மிமீ, 40 மிமீ, 12 மிமீ, 6 மிமீ. இன்றைய விலைக்கு 91507 51905.",
    h1: "Jally (Blue Metal) Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் ஜல்லி விநியோகம்",
    short:
      "20 mm, 40 mm, 12 mm and 6 mm blue metal for concrete, PCC and base work.",
    shortTa: "கான்கிரீட், PCC, அடிப்படை வேலைகளுக்கு 20, 40, 12, 6 மிமீ ஜல்லி.",
    unit: "per unit (100 cft) / per load",
    unitTa: "யூனிட் (100 கன அடி) / லோடு",
    intro: [
      "Jally (also spelt jalli, called blue metal or coarse aggregate) is crushed granite stone used in concrete. KVM Agencies supplies clean, well-graded jally from crusher units around Chengalpattu district to sites in Chengalpattu and nearby towns.",
      "The most used size is <strong>20 mm jally (¾ inch)</strong> for RCC slabs, beams and columns. <strong>40 mm jally (1½ inch)</strong> is used for PCC bed, foundations and road base. <strong>12 mm</strong> is used for thin sections, precast and paver work, and <strong>6 mm chips</strong> for hollow block making and fine concrete.",
      'Jally is sold by unit (100 cft) or by full load. Tell us the size and quantity and we will give you a delivered price. Read <a href="/blog/jally-sizes-and-uses-20mm-40mm-12mm-6mm">which jally size to use for which work</a>.',
    ],
    introTa: [
      "ஜல்லி (ப்ளூ மெட்டல்) என்பது கான்கிரீட்டில் பயன்படும் உடைத்த கருங்கல். KVM Agencies செங்கல்பட்டு மற்றும் சுற்றுப்பகுதிகளுக்கு சுத்தமான, தரமான ஜல்லி விநியோகம் செய்கிறது.",
      "ஸ்லாப், பீம், தூணுக்கு 20 மிமீ (¾ இஞ்ச்) ஜல்லி; PCC மற்றும் அடித்தளத்திற்கு 40 மிமீ (1½ இஞ்ச்); ஹாலோ பிளாக் மற்றும் சிறு வேலைகளுக்கு 12 மிமீ, 6 மிமீ. யூனிட் / லோடாக டெலிவரி – 91507 51905.",
    ],
    specs: [
      ["Sizes", "6 mm, 12 mm, 20 mm, 40 mm"],
      ["Material", "Crushed granite (blue metal)"],
      ["Standard", "IS 383:2016 (coarse aggregate)"],
      ["Sold by", "Unit (100 cft) or full load"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "20 mm – RCC slabs, beams, columns, footings",
      "40 mm – PCC bed, foundation base, road and yard base",
      "12 mm – thin RCC, precast, paver blocks",
      "6 mm – hollow blocks, fine concrete, topping",
    ],
    usesTa: [
      "20 மிமீ – ஸ்லாப், பீம், தூண்",
      "40 மிமீ – PCC, அடித்தள அடிப்படை",
      "12 மிமீ – மெல்லிய RCC, பேவர் பிளாக்",
      "6 மிமீ – ஹாலோ பிளாக்",
    ],
    tips: [
      "Jally should be cubical, clean and free from dust, clay and flaky pieces.",
      "Wash or wet jally before mixing if it is very dusty.",
      "For M20 concrete the nominal mix is 1 : 1.5 : 3 (cement : sand : 20 mm jally).",
      "Do not mix 40 mm jally into slab concrete — it reduces compaction between rods.",
    ],
    faqs: [
      {
        q: "Which jally size is used for a roof slab?",
        a: "20 mm jally (¾ inch) is the standard size for RCC roof slabs, beams and columns. 40 mm jally is used for PCC bed and foundations.",
      },
      {
        q: "What is the 20 mm jally price per unit in Chengalpattu?",
        a: "Jally price depends on size, quantity and delivery distance. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's delivered rate.",
      },
      {
        q: "How much jally is needed for a 1000 sq ft slab?",
        a: "A 1000 sq ft slab of 5 inch (125 mm) thickness has about 11.8 cubic metres (≈ 416 cft) of wet concrete. In M20 (1:1.5:3) nominal mix, you need roughly 3.5 units of 20 mm jally, about 1.75 units of M Sand and about 95 bags of cement (approximate; add about 5% wastage).",
      },
      {
        q: "Is jally and blue metal the same?",
        a: "Yes. Jally, jalli, blue metal and coarse aggregate all refer to crushed granite stone used in concrete.",
      },
    ],
    faqsTa: [
      {
        q: "ஸ்லாபுக்கு எந்த அளவு ஜல்லி?",
        a: "RCC ஸ்லாப், பீம், தூணுக்கு 20 மிமீ (¾ இஞ்ச்) ஜல்லி. PCC-க்கு 40 மிமீ.",
      },
      {
        q: "ஜல்லி விலை என்ன?",
        a: "அளவு, அளவு (யூனிட்), தூரத்தைப் பொறுத்து மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
    ],
    related: ["m-sand", "cement", "tmt-steel", "hollow-blocks"],
  },

  // ───────────────────────── BRICKS ─────────────────────────
  {
    slug: "chamber-bricks",
    category: "bricks",
    name: "Chamber Bricks",
    nameTa: "சேம்பர் செங்கல்",
    aliases: [
      "chamber bricks chengalpattu",
      "chamber brick price",
      "red bricks chengalpattu",
      "chamber kal",
    ],
    title:
      "Chamber Bricks Supplier in Chengalpattu | Red Bricks – Price per 1000",
    metaDescription:
      "Chamber bricks in Chengalpattu – well-burnt red bricks for walls & compound walls, per 1000 or load. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் சேம்பர் செங்கல் – 1000 / லோடு அளவில் டெலிவரி. இன்றைய விலைக்கு 91507 51905.",
    h1: "Chamber Bricks Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் சேம்பர் செங்கல் விநியோகம்",
    short:
      "Well-burnt red chamber bricks – the traditional choice for strong walls.",
    shortTa: "நன்கு சுடப்பட்ட சிவப்பு சேம்பர் செங்கல்.",
    unit: "per 1000 bricks / per load",
    unitTa: "1000 செங்கல் / லோடு",
    intro: [
      "Chamber bricks are traditional burnt clay bricks fired in chamber kilns. They are the most widely used bricks in Tamil Nadu for load-bearing walls, partition walls and compound walls because of their strength, availability and familiarity to every mason.",
      "KVM Agencies supplies well-burnt chamber bricks with good colour, uniform size and a clear ringing sound when struck — signs of a properly fired brick. We deliver per 1000 bricks or by full load to sites across Chengalpattu district.",
      'Want a neater finish with less plaster? Compare with <a href="/products/wire-cut-bricks">wire cut bricks</a>, <a href="/products/hollow-blocks">hollow blocks</a> and <a href="/products/aac-blocks">AAC blocks</a> in our <a href="/blog/chamber-bricks-vs-wire-cut-bricks-vs-hollow-blocks-vs-aac-blocks">bricks vs blocks guide</a>.',
    ],
    introTa: [
      "சேம்பர் செங்கல் என்பது சேம்பர் சூளையில் சுடப்பட்ட பாரம்பரிய களிமண் செங்கல். தமிழ்நாட்டில் சுவர் மற்றும் காம்பவுண்ட் சுவர் கட்ட அதிகம் பயன்படுத்தப்படுவது.",
      "நன்கு சுடப்பட்ட, ஒரே அளவான, தட்டினால் ஒலி வரும் தரமான செங்கல் – 1000 அல்லது லோடு அளவில் டெலிவரி. 91507 51905.",
    ],
    specs: [
      ["Type", "Burnt clay chamber bricks (red)"],
      ["Typical size", 'approx. 9" × 4" × 3" (varies by kiln)'],
      ["Standard", "IS 1077 (common burnt clay bricks)"],
      ["Sold by", "Per 1000 bricks or full load"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Load-bearing and partition walls",
      "Compound walls",
      "Sumps, septic tanks and manholes",
      "Foundation and basement masonry",
    ],
    usesTa: [
      "சுவர்கள்",
      "காம்பவுண்ட் சுவர்",
      "சம்ப், செப்டிக் டேங்க்",
      "அடித்தள கட்டு வேலை",
    ],
    tips: [
      "A good brick gives a metallic ringing sound when two bricks are struck together.",
      "Soak bricks in water before laying so they do not absorb water from the mortar.",
      "Drop test: a good brick should not break when dropped flat from about 1 metre.",
      "Approx. 900–1,100 bricks per 100 sq ft of 9-inch wall and 450–550 for a 4.5-inch wall (varies with brick size and joints).",
    ],
    faqs: [
      {
        q: "What is the chamber brick price per 1000 in Chengalpattu?",
        a: "Chamber brick price changes with season (especially during monsoon) and kiln availability. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's rate per 1000 bricks delivered to your site.",
      },
      {
        q: "How many bricks are needed for 1 sq ft of wall?",
        a: "For a 9-inch thick wall, roughly 9–11 bricks per sq ft; for a 4.5-inch partition wall, about 4.5–5.5 bricks per sq ft. Exact numbers depend on brick size and mortar joints.",
      },
      {
        q: "Chamber bricks or wire cut bricks – which is better?",
        a: "Chamber bricks are economical and strong, ideal for regular walls that will be plastered. Wire cut bricks are machine-cut with uniform size and sharp edges, giving a neater wall and lower plaster thickness. Both are good; choose based on budget and finish.",
      },
    ],
    faqsTa: [
      {
        q: "சேம்பர் செங்கல் 1000 விலை என்ன?",
        a: "பருவம் மற்றும் சூளை கிடைப்பைப் பொறுத்து மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
      {
        q: "1 சதுர அடி சுவருக்கு எத்தனை செங்கல்?",
        a: "9 இஞ்ச் சுவருக்கு சுமார் 9–11, 4.5 இஞ்ச் சுவருக்கு சுமார் 4.5–5.5 செங்கல்.",
      },
    ],
    related: ["wire-cut-bricks", "hollow-blocks", "aac-blocks", "p-sand"],
  },
  {
    slug: "wire-cut-bricks",
    category: "bricks",
    name: "Wire Cut Bricks",
    nameTa: "வயர் கட் செங்கல்",
    aliases: [
      "wire cut bricks chengalpattu",
      "wirecut brick price",
      "machine bricks",
      "exposed bricks",
    ],
    title:
      "Wire Cut Bricks Supplier in Chengalpattu | Price per 1000 – Delivery",
    metaDescription:
      "Wire cut bricks in Chengalpattu – uniform machine-cut bricks for neat and exposed brick walls. Site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் வயர் கட் செங்கல் – ஒரே அளவு, கூர்மையான முனைகள். இன்றைய விலைக்கு 91507 51905.",
    h1: "Wire Cut Bricks Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் வயர் கட் செங்கல் விநியோகம்",
    short:
      "Machine-cut bricks with uniform size and sharp edges – less mortar, neater walls.",
    shortTa: "இயந்திரத்தில் வெட்டப்பட்ட ஒரே அளவான செங்கல்.",
    unit: "per 1000 bricks / per load",
    unitTa: "1000 செங்கல் / லோடு",
    intro: [
      "Wire cut bricks are made by extruding clay through a machine and cutting it with wires, then firing in a kiln. The result is a brick with uniform size, sharp edges and smooth faces. They need less mortar and give a straighter wall that needs thinner plaster.",
      "Wire cut bricks are popular for premium houses, elevation work and exposed brick walls. KVM Agencies supplies wire cut bricks to Chengalpattu, Maraimalai Nagar, Guduvanchery, Kelambakkam and nearby areas.",
      'Compare all walling options in our <a href="/blog/chamber-bricks-vs-wire-cut-bricks-vs-hollow-blocks-vs-aac-blocks">bricks vs blocks guide</a>.',
    ],
    introTa: [
      "வயர் கட் செங்கல் இயந்திரத்தில் களிமண்ணை அழுத்தி கம்பியால் வெட்டி சுடப்படுகிறது. ஒரே அளவு, கூர்மையான முனைகள், மென்மையான மேற்பரப்பு – குறைந்த சாந்து, நேரான சுவர்.",
      "எலிவேஷன் மற்றும் எக்ஸ்போஸ்டு செங்கல் சுவர்களுக்கு சிறந்தது. டெலிவரிக்கு 91507 51905.",
    ],
    specs: [
      ["Type", "Machine-made wire cut burnt clay bricks"],
      ["Finish", "Uniform size, sharp edges, smooth faces"],
      ["Standard", "IS 1077 (burnt clay bricks)"],
      ["Sold by", "Per 1000 bricks or full load"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Premium house walls",
      "Exposed brick elevation",
      "Compound walls with pointing finish",
      "Partition walls",
    ],
    usesTa: [
      "வீட்டுச் சுவர்கள்",
      "எக்ஸ்போஸ்டு செங்கல் எலிவேஷன்",
      "காம்பவுண்ட் சுவர்",
    ],
    tips: [
      "Handle wire cut bricks carefully — chipped edges show clearly in exposed work.",
      "Order 3–5% extra to cover breakage during unloading and cutting.",
      "Use a thinner, uniform mortar joint (about 10 mm) for the best look.",
    ],
    faqs: [
      {
        q: "What is the wire cut brick price in Chengalpattu?",
        a: "Wire cut brick prices vary with kiln and quantity. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's rate per 1000 bricks delivered.",
      },
      {
        q: "Are wire cut bricks stronger than chamber bricks?",
        a: "Good-quality wire cut bricks are usually denser and more uniform, which gives consistent strength and a neater wall. Well-burnt chamber bricks are also strong and more economical.",
      },
    ],
    faqsTa: [
      {
        q: "வயர் கட் செங்கல் விலை என்ன?",
        a: "இன்றைய விலைக்கு 91507 51905 அழைக்கவும் அல்லது WhatsApp செய்யவும்.",
      },
    ],
    related: ["chamber-bricks", "aac-blocks", "hollow-blocks", "p-sand"],
  },

  // ───────────────────────── BLOCKS ─────────────────────────
  {
    slug: "hollow-blocks",
    category: "blocks",
    name: 'Hollow Blocks (4", 6", 8")',
    nameTa: 'ஹாலோ பிளாக் (4", 6", 8")',
    aliases: [
      "hollow blocks chengalpattu",
      "hollow block price",
      "concrete blocks",
      "solid blocks",
      "6 inch hollow block",
    ],
    title:
      'Hollow Blocks Supplier in Chengalpattu | 4", 6", 8" Concrete Blocks',
    metaDescription:
      'Hollow blocks in Chengalpattu – 4", 6" & 8" concrete blocks for compound walls, godowns & houses. Call/WhatsApp 91507 51905 for today\'s rate.',
    metaDescriptionTa:
      'செங்கல்பட்டில் ஹாலோ பிளாக் – 4", 6", 8". இன்றைய விலைக்கு 91507 51905.',
    h1: "Hollow Blocks Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் ஹாலோ பிளாக் விநியோகம்",
    short: '4", 6" and 8" concrete hollow blocks – fast, economical walling.',
    shortTa: '4", 6", 8" கான்கிரீட் ஹாலோ பிளாக் – வேகமான, சிக்கனமான சுவர்.',
    unit: "per block / per load",
    unitTa: "ஒரு பிளாக் / லோடு",
    intro: [
      "Concrete hollow blocks are made from cement, M Sand and small jally, machine-pressed and cured. One hollow block replaces several bricks, so walls go up faster with less mortar and lower labour cost.",
      'KVM Agencies supplies hollow blocks in <strong>4 inch</strong> (partition walls), <strong>6 inch</strong> (compound walls and external walls) and <strong>8 inch</strong> (load-bearing / heavy walls) sizes. Typical face size is 16" × 8" (400 × 200 mm).',
      'Hollow blocks are widely used for compound walls, godowns, factory sheds and rental houses around <a href="/areas/singaperumal-koil">Singaperumal Koil</a>, <a href="/areas/padappai">Padappai</a> and <a href="/areas/maraimalai-nagar">Maraimalai Nagar</a>.',
    ],
    introTa: [
      "கான்கிரீட் ஹாலோ பிளாக் சிமெண்ட், எம் சாண்ட், சிறு ஜல்லியில் இயந்திரத்தில் தயாரிக்கப்படுகிறது. ஒரு பிளாக் பல செங்கல்களுக்கு சமம் – வேகமான வேலை, குறைந்த சாந்து, குறைந்த கூலி.",
      '4" (பார்டிஷன்), 6" (காம்பவுண்ட், வெளிச் சுவர்), 8" (கனமான சுவர்) அளவுகளில் கிடைக்கும். 91507 51905.',
    ],
    specs: [
      ["Sizes", '4" (100 mm), 6" (150 mm), 8" (200 mm) thickness'],
      ["Face size", 'approx. 16" × 8" (400 × 200 mm)'],
      ["Standard", "IS 2185 (Part 1) – concrete masonry units"],
      ["Sold by", "Per block or full load"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Compound walls",
      "Godowns and factory walls",
      "Partition walls",
      "Rental houses and commercial buildings",
    ],
    usesTa: [
      "காம்பவுண்ட் சுவர்",
      "கோடவுன், தொழிற்சாலை சுவர்",
      "பார்டிஷன் சுவர்",
      "வாடகை வீடுகள்",
    ],
    tips: [
      'Approx. 1.125 blocks (16"×8" face) are needed per sq ft of wall — about 113 blocks per 100 sq ft.',
      "Do not wet hollow blocks excessively before laying (unlike clay bricks).",
      "Make sure blocks are well cured — they should not crumble at the corners.",
    ],
    faqs: [
      {
        q: "What is the hollow block price in Chengalpattu?",
        a: 'Hollow block price depends on size (4", 6", 8") and quantity. Call or WhatsApp KVM Agencies on +91 91507 51905 for today\'s rate including delivery.',
      },
      {
        q: "How many hollow blocks are needed for 100 sq ft?",
        a: 'With the standard 16" × 8" face size, about 113 blocks are needed for 100 sq ft of wall area (add 3–5% for breakage).',
      },
      {
        q: "Which hollow block size is best for a compound wall?",
        a: "6 inch hollow blocks are the most common choice for compound walls. For high walls or walls retaining soil, consult an engineer — 8 inch blocks with columns may be needed.",
      },
    ],
    faqsTa: [
      {
        q: "ஹாலோ பிளாக் விலை என்ன?",
        a: "அளவு மற்றும் எண்ணிக்கையைப் பொறுத்து மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
      {
        q: "100 சதுர அடிக்கு எத்தனை ஹாலோ பிளாக்?",
        a: '16" × 8" அளவில் சுமார் 113 பிளாக்.',
      },
    ],
    related: ["aac-blocks", "chamber-bricks", "cement", "m-sand"],
  },
  {
    slug: "aac-blocks",
    category: "blocks",
    name: "AAC Blocks (ACC Blocks)",
    nameTa: "AAC பிளாக் (இலகுரக கற்கள்)",
    aliases: [
      "aac blocks chengalpattu",
      "acc blocks chengalpattu",
      "aac block price",
      "lightweight blocks",
      "siporex blocks",
    ],
    title:
      "AAC Blocks Supplier in Chengalpattu | ACC / AAC Block Price – Delivery",
    metaDescription:
      'AAC blocks (ACC blocks) in Chengalpattu – lightweight 4"–9" blocks for apartments & houses, site delivery. Call/WhatsApp 91507 51905 for today\'s rate.',
    metaDescriptionTa:
      "செங்கல்பட்டில் AAC பிளாக் (ACC பிளாக்) – இலகுரக கற்கள். இன்றைய விலைக்கு 91507 51905.",
    h1: "AAC Blocks (ACC Blocks) Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் AAC பிளாக் விநியோகம்",
    short:
      "Lightweight AAC blocks – faster walls, less load on structure, cooler rooms.",
    shortTa: "இலகுரக AAC பிளாக் – வேகமான சுவர், குளிர்ச்சியான அறை.",
    unit: "per block / per cubic metre / per load",
    unitTa: "ஒரு பிளாக் / கன மீட்டர் / லோடு",
    intro: [
      'AAC (Autoclaved Aerated Concrete) blocks — commonly called <strong>"ACC blocks"</strong> in Tamil Nadu — are lightweight blocks made from fly ash, cement, lime and an aerating agent, cured in high-pressure steam autoclaves. They are about one-third the weight of clay bricks.',
      'Because they are light and large (typically 600 × 200 mm face), AAC blocks reduce the dead load on the building, speed up wall construction, and give better heat insulation — rooms stay cooler. They are the first choice for apartments and multi-storey buildings around <a href="/areas/guduvanchery">Guduvanchery</a>, <a href="/areas/kelambakkam">Kelambakkam</a> and <a href="/areas/mahindra-world-city">Mahindra World City</a>.',
      'KVM Agencies supplies AAC blocks in 4", 6", 8" and 9" thicknesses (subject to stock). Use block-jointing mortar or a thin cement mortar for the best result.',
    ],
    introTa: [
      'AAC (ஆட்டோகிளேவ்டு ஏரேட்டட் கான்கிரீட்) பிளாக் – தமிழ்நாட்டில் "ACC பிளாக்" என்று அழைக்கப்படுகிறது. செங்கலை விட சுமார் மூன்றில் ஒரு பங்கு எடை மட்டுமே.',
      "கட்டிடத்தின் சுமை குறையும், சுவர் வேகமாக முடியும், அறைகள் குளிர்ச்சியாக இருக்கும். அபார்ட்மெண்ட் மற்றும் மாடி வீடுகளுக்கு சிறந்தது. 91507 51905.",
    ],
    specs: [
      ["Face size", 'approx. 600 × 200 mm (24" × 8")'],
      [
        "Thickness",
        '4" (100 mm), 6" (150 mm), 8" (200 mm), 9" (230 mm) – subject to stock',
      ],
      ["Weight", "About 1/3 of clay bricks (density ~550–650 kg/m³)"],
      ["Standard", "IS 2185 (Part 3) – AAC blocks"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Apartment and multi-storey walls",
      "First and second floor walls of houses",
      "Partition walls",
      "Commercial buildings and offices",
    ],
    usesTa: [
      "அபார்ட்மெண்ட் சுவர்கள்",
      "மேல் மாடி சுவர்கள்",
      "பார்டிஷன் சுவர்",
      "அலுவலக கட்டிடங்கள்",
    ],
    tips: [
      "One 600 × 200 mm AAC block covers about 1.29 sq ft — approx. 78 blocks per 100 sq ft of wall.",
      "Use a polymer-based block jointing mortar for thin joints and less cracking.",
      "Do not use AAC blocks for foundations or below plinth level where they stay wet.",
      "Provide a horizontal RCC band / lintel band as per your engineer's design.",
    ],
    faqs: [
      {
        q: "Are ACC blocks and AAC blocks the same?",
        a: "Yes. The correct name is AAC (Autoclaved Aerated Concrete) blocks, but many people in Tamil Nadu call them ACC blocks. ACC is also a cement brand, which causes the confusion.",
      },
      {
        q: "What is the AAC block price in Chengalpattu?",
        a: "AAC block price depends on thickness and quantity (per block or per cubic metre). Call or WhatsApp KVM Agencies on +91 91507 51905 for today's delivered rate.",
      },
      {
        q: "How many AAC blocks are needed for 100 sq ft?",
        a: "With a 600 × 200 mm face size, about 78 blocks are needed for 100 sq ft of wall (add 3–5% for cutting and breakage).",
      },
      {
        q: "Are AAC blocks good for house construction?",
        a: "Yes, especially for upper floors and framed RCC buildings. They are light, fast to build and insulating. For walls that are always exposed to water or below ground, clay bricks or concrete blocks are better.",
      },
    ],
    faqsTa: [
      {
        q: "ACC பிளாக் மற்றும் AAC பிளாக் ஒன்றா?",
        a: "ஆம். சரியான பெயர் AAC பிளாக். பலர் ACC பிளாக் என்று அழைக்கிறார்கள்.",
      },
      {
        q: "AAC பிளாக் விலை என்ன?",
        a: "தடிமன் மற்றும் அளவைப் பொறுத்து மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
    ],
    related: ["hollow-blocks", "wire-cut-bricks", "acc-cement", "tmt-steel"],
  },

  // ───────────────────────── STEEL ─────────────────────────
  {
    slug: "tmt-steel",
    hub: true,
    category: "steel",
    name: "TMT Steel Bars (All Sizes)",
    nameTa: "TMT கம்பி (அனைத்து அளவுகள்)",
    aliases: [
      "tmt steel chengalpattu",
      "steel dealer chengalpattu",
      "tmt bar price per kg",
      "kambi price today",
      "steel rods near me",
    ],
    title: "TMT Steel Dealer in Chengalpattu | MCR & ARS TMT Bars 8mm–32mm",
    metaDescription:
      "TMT steel dealer in Chengalpattu – MCR & ARS TMT bars, 8 mm to 32 mm, GST bill & site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் TMT கம்பி டீலர் – MCR & ARS, 8 முதல் 32 மிமீ வரை. இன்றைய விலைக்கு 91507 51905.",
    h1: "TMT Steel Dealer in Chengalpattu – MCR & ARS",
    h1Ta: "செங்கல்பட்டில் TMT கம்பி டீலர் – MCR & ARS",
    short: "MCR and ARS TMT bars in all sizes from 8 mm to 32 mm.",
    shortTa: "MCR மற்றும் ARS TMT கம்பி – 8 முதல் 32 மிமீ வரை.",
    unit: "per kg / per tonne",
    unitTa: "கிலோ / டன்",
    intro: [
      'KVM Agencies is a TMT steel dealer in Chengalpattu supplying <a href="/products/mcr-tmt-steel">MCR TMT bars</a> and <a href="/products/ars-tmt-steel">ARS TMT bars</a> in all diameters — 8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm and 32 mm.',
      'TMT (Thermo-Mechanically Treated) bars have a hard outer surface and a soft, ductile core, which gives high strength and good bendability. Indian Standard <strong>IS 1786:2008</strong> covers grades Fe 415, Fe 500, Fe 500D, Fe 550 and Fe 550D. The "D" grades have higher elongation (ductility), which is preferred for earthquake resistance.',
      'Steel is sold by weight (per kg / per tonne). Prices move with the steel market almost daily — call or WhatsApp <a href="tel:+919150751905">91507 51905</a> for today\'s rate. We also supply <a href="/products/binding-wire">binding wire</a> and can cut-to-length on request (ask for availability).',
      'See our <a href="/blog/how-to-choose-tmt-steel-bars-weight-chart">TMT steel guide with weight chart</a> to estimate quantities.',
    ],
    introTa: [
      "KVM Agencies செங்கல்பட்டில் MCR மற்றும் ARS TMT கம்பிகளை 8, 10, 12, 16, 20, 25, 32 மிமீ அளவுகளில் விநியோகம் செய்கிறது.",
      "TMT கம்பியின் வெளிப்புறம் கடினமாகவும் உட்புறம் வளையக்கூடியதாகவும் இருக்கும். IS 1786 தரம். கம்பி விலை தினமும் மாறும் – இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: [
      ["Brands", "MCR TMT, ARS TMT"],
      ["Diameters", "8, 10, 12, 16, 20, 25, 32 mm"],
      ["Standard", "IS 1786:2008 (Fe 500 / Fe 500D / Fe 550D as per brand)"],
      ["Bar length", "12 m standard"],
      ["Sold by", "Per kg / per tonne / per bundle"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Footings and columns",
      "Beams and lintels",
      "Roof slabs and staircases",
      "Sumps, overhead tanks and compound wall columns",
    ],
    usesTa: [
      "அடித்தளம், தூண்",
      "பீம், லிண்டல்",
      "ஸ்லாப், படிக்கட்டு",
      "சம்ப், டேங்க்",
    ],
    tips: [
      "Weight per metre of a TMT bar = d² ÷ 162 kg (d in mm). Example: 12 mm = 0.889 kg/m.",
      "Check the brand embossing, grade and ISI mark on every bar.",
      "Store steel above ground on wooden sleepers and cover it to prevent rusting.",
      "Use about 8–10 kg of binding wire per tonne of steel.",
    ],
    faqs: [
      {
        q: "What is the TMT steel price per kg in Chengalpattu today?",
        a: "TMT steel prices change almost daily with the steel market. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's brand-wise rate for MCR and ARS TMT bars.",
      },
      {
        q: "What is the weight of a 12 mm TMT bar?",
        a: "A 12 mm TMT bar weighs about 0.889 kg per metre, so one 12-metre bar weighs about 10.67 kg. Formula: weight (kg/m) = d² ÷ 162.",
      },
      {
        q: "Which TMT grade is best for a house?",
        a: "Fe 500 or Fe 500D is commonly used for houses. Fe 550D gives higher strength and is used where the structural design specifies it. Always follow your structural engineer's drawing.",
      },
      {
        q: "How much steel is needed for a house?",
        a: "As a thumb rule, residential RCC framed buildings use roughly 3.5–4.5 kg of steel per sq ft of built-up area, depending on design, soil and number of floors. Your structural drawing gives the exact bar bending schedule.",
      },
    ],
    faqsTa: [
      {
        q: "இன்றைய கம்பி விலை என்ன?",
        a: "கம்பி விலை தினமும் மாறும். MCR, ARS இன்றைய விலைக்கு 91507 51905.",
      },
      {
        q: "12 மிமீ கம்பி எடை எவ்வளவு?",
        a: "1 மீட்டருக்கு சுமார் 0.889 கிலோ; 12 மீட்டர் கம்பி சுமார் 10.67 கிலோ.",
      },
    ],
    related: ["mcr-tmt-steel", "ars-tmt-steel", "binding-wire", "cement"],
  },
  {
    slug: "mcr-tmt-steel",
    category: "steel",
    name: "MCR TMT Steel",
    nameTa: "MCR TMT கம்பி",
    aliases: [
      "mcr steel chengalpattu",
      "mcr tmt bars price",
      "mcr kambi",
      "mcr steel dealer",
    ],
    title: "MCR TMT Steel Dealer in Chengalpattu | 8mm–32mm – Today's Rate",
    metaDescription:
      "MCR TMT steel bars dealer in Chengalpattu – all sizes from 8 mm to 32 mm with GST bill and site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் MCR TMT கம்பி – 8 முதல் 32 மிமீ. இன்றைய விலைக்கு 91507 51905.",
    h1: "MCR TMT Steel Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் MCR TMT கம்பி டீலர்",
    short: "MCR TMT bars in all diameters for houses and buildings.",
    shortTa: "அனைத்து அளவுகளிலும் MCR TMT கம்பி.",
    unit: "per kg / per tonne",
    unitTa: "கிலோ / டன்",
    intro: [
      "KVM Agencies supplies MCR TMT steel bars in Chengalpattu for houses, apartments and commercial buildings. MCR is a popular choice among local contractors for its consistent quality and competitive pricing.",
      "We stock MCR TMT bars in <strong>8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm and 32 mm</strong> (subject to stock). The grade and ISI marking are embossed on each bar — check it at delivery.",
      'Order steel along with <a href="/products/binding-wire">binding wire</a>, <a href="/products/cement">cement</a> and <a href="/products/jally-blue-metal">jally</a> for your slab and save on transport. Compare with <a href="/products/ars-tmt-steel">ARS TMT</a>.',
    ],
    introTa: [
      "KVM Agencies செங்கல்பட்டில் MCR TMT கம்பி விநியோகம் செய்கிறது. உள்ளூர் கான்ட்ராக்டர்கள் அதிகம் விரும்பும் பிராண்ட்.",
      "8 முதல் 32 மிமீ வரை அனைத்து அளவுகளும் கிடைக்கும். இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: [
      ["Brand", "MCR TMT"],
      ["Diameters", "8, 10, 12, 16, 20, 25, 32 mm (subject to stock)"],
      ["Standard", "IS 1786 (grade as embossed on bar)"],
      ["Bar length", "12 m standard"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Footings, columns, beams",
      "Roof slabs",
      "Lintels and sunshades",
      "Compound wall columns",
    ],
    usesTa: ["அடித்தளம், தூண், பீம்", "ஸ்லாப்", "லிண்டல், சன்ஷேட்"],
    tips: [
      "Check the MCR embossing and grade marking on the bar.",
      "Ask for the mill test certificate for large orders.",
      "Weight check: 8 mm = 0.395 kg/m, 10 mm = 0.617, 12 mm = 0.889, 16 mm = 1.58 kg/m.",
    ],
    faqs: [
      {
        q: "What is the MCR TMT steel price today?",
        a: "Steel prices change daily. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's MCR TMT rate per kg or per tonne.",
      },
      {
        q: "Which sizes of MCR TMT bars are available?",
        a: "8 mm, 10 mm, 12 mm, 16 mm, 20 mm, 25 mm and 32 mm, subject to current stock. Call to confirm.",
      },
      {
        q: "MCR or ARS – which TMT is better?",
        a: "Both are used widely by contractors in Chengalpattu district. Choose the grade specified in your structural drawing (e.g. Fe 500D / Fe 550D) and compare today's rates — we can quote both.",
      },
    ],
    faqsTa: [
      {
        q: "MCR கம்பி இன்றைய விலை என்ன?",
        a: "தினமும் மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
    ],
    related: ["ars-tmt-steel", "tmt-steel", "binding-wire", "cement"],
  },
  {
    slug: "ars-tmt-steel",
    category: "steel",
    name: "ARS TMT Steel",
    nameTa: "ARS TMT கம்பி",
    aliases: [
      "ars steel chengalpattu",
      "ars tmt 550d",
      "ars kambi price",
      "ars steel dealer",
    ],
    title: "ARS TMT Steel Dealer in Chengalpattu | ARS 550D – Today's Rate",
    metaDescription:
      "ARS TMT steel dealer in Chengalpattu – ARS 550D TMT bars from 8 mm to 32 mm with GST bill and site delivery. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் ARS TMT கம்பி – 550D. இன்றைய விலைக்கு 91507 51905.",
    h1: "ARS TMT Steel Dealer in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் ARS TMT கம்பி டீலர்",
    short: "ARS 550D TMT bars – a leading TMT brand in northern Tamil Nadu.",
    shortTa: "ARS 550D TMT கம்பி – வட தமிழ்நாட்டின் முன்னணி பிராண்ட்.",
    unit: "per kg / per tonne",
    unitTa: "கிலோ / டன்",
    intro: [
      "ARS Steels is a well-known TMT manufacturer based in Tamil Nadu and is one of the leading TMT brands in northern Tamil Nadu. ARS is known for its <strong>550D grade</strong> TMT bars, which combine high strength with good ductility.",
      "KVM Agencies supplies ARS TMT bars in Chengalpattu in all common diameters from 8 mm to 32 mm (subject to stock), with GST billing and site delivery.",
      'Order ARS steel with <a href="/products/binding-wire">binding wire</a> for your slab. Compare with <a href="/products/mcr-tmt-steel">MCR TMT</a> — we will quote both brands.',
    ],
    introTa: [
      "ARS ஸ்டீல்ஸ் தமிழ்நாட்டைச் சேர்ந்த முன்னணி TMT கம்பி உற்பத்தியாளர். 550D கிரேடு கம்பிக்கு பெயர் பெற்றது.",
      "KVM Agencies செங்கல்பட்டில் ARS கம்பி 8 முதல் 32 மிமீ வரை விநியோகம் செய்கிறது. இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: [
      ["Brand", "ARS Steels"],
      ["Grade", "Fe 550D (as embossed; other grades on request)"],
      ["Diameters", "8, 10, 12, 16, 20, 25, 32 mm (subject to stock)"],
      ["Standard", "IS 1786:2008"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Footings, columns, beams",
      "Roof slabs",
      "Multi-storey buildings",
      "Industrial structures",
    ],
    usesTa: ["அடித்தளம், தூண், பீம்", "ஸ்லாப்", "மாடி கட்டிடங்கள்"],
    tips: [
      "Look for the ARS brand embossing and 550D marking on every bar.",
      "Ask for the mill test certificate for large orders.",
      "Store bars off the ground and use them in order of delivery.",
    ],
    faqs: [
      {
        q: "What is the ARS TMT price today in Chengalpattu?",
        a: "Steel prices change daily. Call or WhatsApp KVM Agencies on +91 91507 51905 for today's ARS TMT rate per kg or per tonne.",
      },
      {
        q: "What does 550D mean in ARS 550D?",
        a: '550 is the minimum yield strength in N/mm² and "D" means higher ductility (elongation) as per IS 1786. It gives both strength and better earthquake performance.',
      },
    ],
    faqsTa: [
      {
        q: "ARS கம்பி இன்றைய விலை என்ன?",
        a: "தினமும் மாறும். இன்றைய விலைக்கு 91507 51905.",
      },
    ],
    related: ["mcr-tmt-steel", "tmt-steel", "binding-wire", "cement"],
  },

  // ───────────────────────── BINDING WIRE ─────────────────────────
  {
    slug: "binding-wire",
    category: "wire",
    name: "Binding Wire",
    nameTa: "கட்டு கம்பி (Binding Wire)",
    aliases: [
      "binding wire chengalpattu",
      "binding wire price per kg",
      "kattu kambi",
      "18 gauge binding wire",
    ],
    title:
      "Binding Wire Supplier in Chengalpattu | 18 & 20 Gauge – Price per kg",
    metaDescription:
      "Binding wire in Chengalpattu – soft annealed 18 & 20 gauge wire for tying TMT bars. Buy with steel and save. Call/WhatsApp 91507 51905 for today's rate.",
    metaDescriptionTa:
      "செங்கல்பட்டில் கட்டு கம்பி – 18 & 20 கேஜ். இன்றைய விலைக்கு 91507 51905.",
    h1: "Binding Wire Supplier in Chengalpattu",
    h1Ta: "செங்கல்பட்டில் கட்டு கம்பி விநியோகம்",
    short:
      "Soft annealed binding wire (18 / 20 gauge) for tying reinforcement.",
    shortTa: "கம்பி கட்டுவதற்கான மென்மையான கட்டு கம்பி.",
    unit: "per kg / per coil",
    unitTa: "கிலோ / சுருள்",
    intro: [
      "Binding wire is soft, annealed (heat-treated) mild steel wire used to tie TMT bars together at their crossing points so the reinforcement cage holds its shape while concrete is poured.",
      'KVM Agencies supplies binding wire in <strong>18 gauge</strong> (most common) and <strong>20 gauge</strong>, in coils, along with <a href="/products/tmt-steel">MCR and ARS TMT steel</a>. Good binding wire is soft and flexible — it twists easily without breaking.',
      "Thumb rule: about <strong>8–10 kg of binding wire per tonne</strong> of steel, depending on bar sizes and spacing.",
    ],
    introTa: [
      "கட்டு கம்பி என்பது TMT கம்பிகள் சந்திக்கும் இடங்களில் கட்டுவதற்கான மென்மையான கம்பி. 18 கேஜ் (பொதுவானது) மற்றும் 20 கேஜ் கிடைக்கும்.",
      "ஒரு டன் கம்பிக்கு சுமார் 8–10 கிலோ கட்டு கம்பி தேவை. இன்றைய விலைக்கு 91507 51905.",
    ],
    specs: [
      ["Type", "Soft annealed (black) binding wire"],
      ["Gauge", "18 gauge (~1.2 mm), 20 gauge (~0.9 mm)"],
      ["Packing", "Coils (weight as per stock)"],
      ["Consumption", "About 8–10 kg per tonne of steel"],
      ["Price", "Call / WhatsApp for today's rate"],
    ],
    uses: [
      "Tying TMT bars in slabs, beams and columns",
      "Fixing stirrups",
      "General tying at construction sites",
    ],
    usesTa: ["ஸ்லாப், பீம், தூண் கம்பி கட்டுதல்", "ஸ்டிரப் கட்டுதல்"],
    tips: [
      "Good binding wire should bend and twist easily without snapping.",
      "Keep binding wire dry to prevent rusting.",
      "Buy together with TMT steel to save on transport.",
    ],
    faqs: [
      {
        q: "How much binding wire is needed per tonne of steel?",
        a: "About 8 to 10 kg of binding wire is needed per tonne of TMT steel. Closer bar spacing and smaller bar sizes need slightly more.",
      },
      {
        q: "Which gauge binding wire is used for construction?",
        a: "18 gauge (about 1.2 mm) soft annealed binding wire is the most commonly used for RCC work. 20 gauge is thinner and used for lighter tying.",
      },
      {
        q: "What is the binding wire price per kg in Chengalpattu?",
        a: "Call or WhatsApp KVM Agencies on +91 91507 51905 for today's binding wire rate. It is cheaper to order it together with your TMT steel.",
      },
    ],
    faqsTa: [
      { q: "ஒரு டன் கம்பிக்கு எவ்வளவு கட்டு கம்பி?", a: "சுமார் 8–10 கிலோ." },
    ],
    related: ["tmt-steel", "mcr-tmt-steel", "ars-tmt-steel", "cement"],
  },
];

export const productBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const PRODUCT_GROUPS: { category: Category; slugs: string[] }[] = [
  {
    category: "cement",
    slugs: [
      "cement",
      "ramco-cement",
      "ultratech-cement",
      "dalmia-cement",
      "acc-cement",
      "maha-cement",
      "adani-cement",
    ],
  },
  { category: "sand", slugs: ["m-sand", "p-sand"] },
  { category: "aggregate", slugs: ["jally-blue-metal"] },
  { category: "bricks", slugs: ["chamber-bricks", "wire-cut-bricks"] },
  { category: "blocks", slugs: ["hollow-blocks", "aac-blocks"] },
  { category: "steel", slugs: ["tmt-steel", "mcr-tmt-steel", "ars-tmt-steel"] },
  { category: "wire", slugs: ["binding-wire"] },
];

export const productImage = (slug: string) => `/images/products/${slug}.webp`;
export const categoryImage = (category: Category) =>
  `/images/categories/${category}.webp`;
