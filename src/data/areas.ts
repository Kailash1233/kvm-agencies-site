// Service areas. Each one gets an English + Tamil local landing page.
// Distances are approximate road distances from our yard at Natham, Chengalpattu.

export interface Area {
  slug: string
  name: string
  nameTa: string
  pincodes?: string[]
  km: number
  route: string
  routeTa: string
  localities: string[]
  /** Unique local paragraphs (HTML allowed) */
  intro: string[]
  introTa: string[]
  /** What people mostly build there – drives which products we highlight */
  focus: string[]
  /** Unique FAQ for this place */
  faq: { q: string; a: string }
  geo: { lat: number; lng: number }
  nearby: string[]
}

export const AREAS: Area[] = [
  {
    slug: 'chengalpattu',
    name: 'Chengalpattu',
    nameTa: 'செங்கல்பட்டு',
    pincodes: ['603001', '603002', '603003'],
    km: 0,
    route: 'Our yard is on Kanchipuram High Road at Natham, Chengalpattu — minutes from the GST Road, the new bus stand and the railway junction.',
    routeTa: 'எங்கள் கடை நத்தம், காஞ்சிபுரம் மெயின் ரோட்டில் உள்ளது – GST ரோடு, பேருந்து நிலையம், ரயில் நிலையம் அருகில்.',
    localities: ['Natham', 'Melamaiyur', 'Pulipakkam', 'Thimmavaram', 'Athur', 'Anjur', 'Vallam', 'Kolavai Lake area', 'Medical College area', 'GST Road'],
    intro: [
      'KVM Agencies has been the neighbourhood construction raw material supplier in Chengalpattu since 2002. Our yard at <strong>52, Kanchipuram High Road, Natham</strong> stocks cement, M Sand, P Sand, jally, bricks, blocks, TMT steel and binding wire — so home owners, masons and contractors in Chengalpattu town can get every material for their building from one place.',
      'Chengalpattu is growing fast as a district headquarters, with new houses and plots coming up around Melamaiyur, Pulipakkam, Thimmavaram and Athur, and along the GST Road. Because we are inside the town, local deliveries are quick and transport charges are the lowest.',
      'Walk in, call or WhatsApp — we will give you today\'s rate and send the material to your site.',
    ],
    introTa: [
      'KVM Agencies 2002 முதல் செங்கல்பட்டில் கட்டுமானப் பொருட்கள் விநியோகம் செய்து வருகிறது. நத்தம், காஞ்சிபுரம் மெயின் ரோட்டில் உள்ள எங்கள் கடையில் சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், பிளாக், TMT கம்பி, கட்டு கம்பி அனைத்தும் கிடைக்கும்.',
      'செங்கல்பட்டு நகருக்குள் இருப்பதால் விரைவான டெலிவரி மற்றும் குறைந்த போக்குவரத்து கட்டணம்.',
    ],
    focus: ['Independent houses', 'Plot development and compound walls', 'Shops and commercial buildings', 'Repair and renovation'],
    faq: {
      q: 'Where can I buy cement, sand and steel in one place in Chengalpattu?',
      a: 'KVM Agencies, 52, Kanchipuram High Road, Natham, Chengalpattu – 603002 supplies cement (Ramco, UltraTech, Dalmia, ACC, Maha, Adani), M Sand, P Sand, jally, chamber and wire cut bricks, hollow and AAC blocks, MCR and ARS TMT steel and binding wire. Open Monday to Saturday, 9 AM to 7 PM. Call/WhatsApp +91 91507 51905.',
    },
    geo: { lat: 12.6929, lng: 79.9687 },
    nearby: ['paranur', 'palur', 'mahindra-world-city', 'thirukazhukundram', 'singaperumal-koil'],
  },
  {
    slug: 'paranur',
    name: 'Paranur',
    nameTa: 'பரனூர்',
    km: 6,
    route: 'Paranur is just north of Chengalpattu on the GST Road, near the Paranur toll plaza and railway station — one of our shortest delivery runs.',
    routeTa: 'பரனூர் செங்கல்பட்டுக்கு வடக்கே GST ரோட்டில், டோல் பிளாசா மற்றும் ரயில் நிலையம் அருகில் உள்ளது.',
    localities: ['Paranur village', 'Paranur railway station area', 'Anjur', 'Mahindra World City approach road'],
    intro: [
      'Building in Paranur? KVM Agencies delivers cement, M Sand, jally, bricks, blocks and TMT steel to Paranur from our Chengalpattu yard, which is only a few kilometres away.',
      'Paranur sits between Chengalpattu town and Mahindra World City, and many new houses, rental units and plots are coming up here for people working in the industrial area. For such projects we supply complete material sets — foundation to plastering — with quick delivery.',
    ],
    introTa: [
      'பரனூரில் கட்டுமானமா? எங்கள் செங்கல்பட்டு கடையிலிருந்து சில கிலோமீட்டர் தூரத்தில் உள்ள பரனூருக்கு சிமெண்ட், எம் சாண்ட், ஜல்லி, செங்கல், பிளாக், கம்பி டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Rental houses for industrial workers', 'Independent houses', 'Compound walls'],
    faq: {
      q: 'How quickly can you deliver to Paranur?',
      a: 'Paranur is about 6 km from our Natham, Chengalpattu yard, so it is one of our fastest delivery areas. The exact delivery time depends on the material and quantity — call +91 91507 51905 to confirm.',
    },
    geo: { lat: 12.7330, lng: 79.9870 },
    nearby: ['chengalpattu', 'mahindra-world-city', 'singaperumal-koil'],
  },
  {
    slug: 'mahindra-world-city',
    name: 'Mahindra World City',
    nameTa: 'மஹிந்திரா வேர்ல்ட் சிட்டி',
    km: 8,
    route: 'Mahindra World City is reached via the GST Road through Paranur / Thenmelpakkam, about 8 km from our yard.',
    routeTa: 'மஹிந்திரா வேர்ல்ட் சிட்டி – GST ரோடு வழியாக பரனூர் / தென்மேல்பாக்கம் வழியாக சுமார் 8 கி.மீ.',
    localities: ['Mahindra World City SEZ', 'Thenmelpakkam', 'Kunnavakkam', 'Residential layouts around MWC'],
    intro: [
      'KVM Agencies supplies construction materials to Mahindra World City and the villages and layouts around it. Industrial units, warehouses, residential layouts and independent houses near MWC need steady supply of cement, M Sand, jally, AAC and hollow blocks and TMT steel — we deliver lorry loads on schedule.',
      'For contractors working inside the industrial zone, we provide GST invoices (GSTIN 33BAZPM1036Q1Z1) and can plan staggered deliveries to match your pour schedule.',
    ],
    introTa: [
      'மஹிந்திரா வேர்ல்ட் சிட்டி மற்றும் சுற்றுப்புற லேஅவுட்களுக்கு சிமெண்ட், எம் சாண்ட், ஜல்லி, AAC / ஹாலோ பிளாக், TMT கம்பி விநியோகம் செய்கிறோம். கான்ட்ராக்டர்களுக்கு GST பில் மற்றும் திட்டமிட்ட டெலிவரி.',
    ],
    focus: ['Industrial sheds and warehouses', 'Residential layouts', 'Apartments (AAC blocks)', 'Compound walls'],
    faq: {
      q: 'Do you supply bulk cement and steel to contractors in Mahindra World City?',
      a: 'Yes. We supply bulk cement, TMT steel, M Sand, jally and blocks to contractors in and around Mahindra World City with GST invoices and scheduled deliveries. Bulk orders get better rates and reduced transport charges. Call +91 91507 51905.',
    },
    geo: { lat: 12.7400, lng: 79.9950 },
    nearby: ['paranur', 'singaperumal-koil', 'chengalpattu'],
  },
  {
    slug: 'singaperumal-koil',
    name: 'Singaperumal Koil',
    nameTa: 'சிங்கபெருமாள் கோயில்',
    pincodes: ['603204'],
    km: 11,
    route: 'Singaperumal Koil is on the GST Road north of Chengalpattu, at the junction of the road to Sriperumbudur.',
    routeTa: 'சிங்கபெருமாள் கோயில் – செங்கல்பட்டுக்கு வடக்கே GST ரோட்டில், ஸ்ரீபெரும்புதூர் சாலை சந்திப்பில்.',
    localities: ['Singaperumal Koil town', 'Thirukachur', 'Sriperumbudur Road', 'Kolathur', 'Industrial estates near SP Koil'],
    intro: [
      'Singaperumal Koil — known for the ancient Padalathri Narasimhar temple — is now a busy industrial and residential hub on the GST Road. KVM Agencies delivers cement, M Sand, jally, hollow blocks, AAC blocks and TMT steel to houses, factories and godowns in and around Singaperumal Koil.',
      'Along the Sriperumbudur road and the industrial estates, hollow blocks and AAC blocks are popular for quick compound walls and sheds, while independent houses in Thirukachur and nearby villages use chamber bricks and wire cut bricks. We stock all of them.',
    ],
    introTa: [
      'பாடலாத்ரி நரசிம்மர் கோயிலுக்கு பெயர் பெற்ற சிங்கபெருமாள் கோயில் இன்று தொழிற்சாலை மற்றும் குடியிருப்பு மையம். வீடுகள், தொழிற்சாலைகள், கோடவுன்களுக்கு சிமெண்ட், எம் சாண்ட், ஜல்லி, ஹாலோ / AAC பிளாக், கம்பி டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Factories and godowns', 'Compound walls (hollow blocks)', 'Independent houses', 'Rental houses'],
    faq: {
      q: 'Can you deliver hollow blocks and cement to Singaperumal Koil for a compound wall?',
      a: 'Yes. We regularly supply 6-inch hollow blocks, cement, M Sand and jally for compound walls in Singaperumal Koil and Thirukachur. Send your wall length and height on WhatsApp (+91 91507 51905) and we will estimate the quantity for you.',
    },
    geo: { lat: 12.7600, lng: 80.0000 },
    nearby: ['mahindra-world-city', 'maraimalai-nagar', 'padappai', 'paranur'],
  },
  {
    slug: 'maraimalai-nagar',
    name: 'Maraimalai Nagar',
    nameTa: 'மறைமலை நகர்',
    pincodes: ['603209'],
    km: 14,
    route: 'Maraimalai Nagar is on the GST Road between Singaperumal Koil and Kattankulathur, about 14 km north of our yard.',
    routeTa: 'மறைமலை நகர் – GST ரோட்டில் சிங்கபெருமாள் கோயிலுக்கும் காட்டாங்குளத்தூருக்கும் இடையில், சுமார் 14 கி.மீ.',
    localities: ['Maraimalai Nagar town', 'Gokulapuram', 'Chettipunyam', 'Industrial area', 'Kattankulathur side'],
    intro: [
      'Maraimalai Nagar is a planned township and industrial hub with automobile and engineering plants, which has created strong demand for houses, rental portions and commercial buildings. KVM Agencies supplies construction raw materials to Maraimalai Nagar, Gokulapuram, Chettipunyam and the surrounding villages.',
      'Whether you are adding a floor to your house (AAC blocks keep the load low), building rental units or a commercial complex, we supply cement, M Sand, P Sand, jally, bricks, blocks and MCR / ARS TMT steel with GST billing.',
    ],
    introTa: [
      'மறைமலை நகர் – தொழிற்சாலைகள் நிறைந்த திட்டமிட்ட நகரம். வீடுகள், வாடகை வீடுகள், வணிகக் கட்டிடங்களுக்கு சிமெண்ட், மணல், ஜல்லி, செங்கல், பிளாக், கம்பி விநியோகம் செய்கிறோம்.',
    ],
    focus: ['Rental portions', 'Additional floors (AAC blocks)', 'Commercial buildings', 'Independent houses'],
    faq: {
      q: 'Which construction material supplier delivers to Maraimalai Nagar?',
      a: 'KVM Agencies, Chengalpattu (est. 2002) delivers cement, M Sand, P Sand, jally, bricks, hollow and AAC blocks, TMT steel and binding wire to Maraimalai Nagar and nearby areas. Call/WhatsApp +91 91507 51905 for today\'s rate including transport.',
    },
    geo: { lat: 12.7900, lng: 80.0240 },
    nearby: ['singaperumal-koil', 'kattankulathur-potheri', 'guduvanchery'],
  },
  {
    slug: 'kattankulathur-potheri',
    name: 'Kattankulathur & Potheri',
    nameTa: 'காட்டாங்குளத்தூர் & பொத்தேரி',
    pincodes: ['603203'],
    km: 18,
    route: 'Kattankulathur and Potheri are on the GST Road, around the SRM university campus, about 17–20 km from our yard.',
    routeTa: 'காட்டாங்குளத்தூர் மற்றும் பொத்தேரி – GST ரோட்டில் SRM பல்கலைக்கழகம் அருகில், சுமார் 17–20 கி.மீ.',
    localities: ['Kattankulathur', 'Potheri', 'SRM Nagar', 'Estancia side', 'Guduvanchery border'],
    intro: [
      'The area around the SRM campus at Kattankulathur and Potheri has a large number of student hostels, rental rooms, PG buildings and apartments. KVM Agencies supplies cement, M Sand, AAC blocks, wire cut bricks and TMT steel for such multi-room buildings, along with P Sand for plastering.',
      'For hostels and rental buildings built floor by floor, we can deliver material in stages as your work progresses, so you do not need to stock a large quantity at site.',
    ],
    introTa: [
      'SRM பல்கலைக்கழகம் அருகிலுள்ள காட்டாங்குளத்தூர், பொத்தேரி பகுதிகளில் ஹாஸ்டல், வாடகை அறைகள், அபார்ட்மெண்ட்கள் அதிகம். இவற்றுக்கு சிமெண்ட், எம் சாண்ட், AAC பிளாக், கம்பி கட்டத்தக்க அளவில் டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Hostels and PG buildings', 'Rental rooms', 'Apartments', 'Shops'],
    faq: {
      q: 'Can you deliver materials in stages for a hostel building near SRM Potheri?',
      a: 'Yes. For hostels and rental buildings in Kattankulathur and Potheri, we can deliver cement, blocks, sand, jally and steel stage by stage as your construction progresses. Call +91 91507 51905 to plan the schedule.',
    },
    geo: { lat: 12.8230, lng: 80.0440 },
    nearby: ['maraimalai-nagar', 'guduvanchery', 'urapakkam'],
  },
  {
    slug: 'guduvanchery',
    name: 'Guduvanchery',
    nameTa: 'கூடுவாஞ்சேரி',
    pincodes: ['603202'],
    km: 22,
    route: 'Guduvanchery is on the GST Road north of Potheri, about 22 km from our yard; we also cover Nandivaram and the Vandalur–Guduvanchery stretch.',
    routeTa: 'கூடுவாஞ்சேரி – GST ரோட்டில், சுமார் 22 கி.மீ. நந்திவரம் மற்றும் சுற்றுப்பகுதிகளுக்கும் டெலிவரி.',
    localities: ['Guduvanchery', 'Nandivaram', 'Vallanchery', 'Mahalakshmi Nagar', 'Kalivanthapattu', 'Kayarambedu'],
    intro: [
      'Guduvanchery and Nandivaram are among the fastest-growing residential areas on the southern edge of Chennai, with many new villas, independent houses and apartments. KVM Agencies delivers cement, M Sand, P Sand, jally, bricks, AAC blocks and TMT steel to Guduvanchery, Nandivaram, Vallanchery, Kalivanthapattu and Kayarambedu.',
      'Many builders in Guduvanchery use AAC blocks for apartments and wire cut bricks for villas. Order the full material set from us — one supplier, one bill, and a single contact for all deliveries.',
      'For larger orders, our bulk pricing and reduced transport charges make Chengalpattu rates competitive even at this distance.',
    ],
    introTa: [
      'கூடுவாஞ்சேரி, நந்திவரம் – சென்னையின் தெற்கே வேகமாக வளரும் குடியிருப்புப் பகுதிகள். வில்லாக்கள், வீடுகள், அபார்ட்மெண்ட்களுக்கு சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், AAC பிளாக், கம்பி டெலிவரி செய்கிறோம்.',
      'மொத்த ஆர்டர்களுக்கு குறைந்த போக்குவரத்து கட்டணம்.',
    ],
    focus: ['Villas and independent houses', 'Apartments (AAC blocks)', 'Gated community projects', 'Commercial shops on GST Road'],
    faq: {
      q: 'Is it worth buying construction materials from Chengalpattu for a site in Guduvanchery?',
      a: 'Yes, especially for bulk orders. KVM Agencies offers reduced transport charges on bulk quantities, so full-load orders of cement, M Sand, jally and steel to Guduvanchery and Nandivaram are competitively priced. Call +91 91507 51905 with your quantity for a delivered quote.',
    },
    geo: { lat: 12.8450, lng: 80.0600 },
    nearby: ['kattankulathur-potheri', 'urapakkam', 'vandalur', 'maraimalai-nagar'],
  },
  {
    slug: 'urapakkam',
    name: 'Urapakkam',
    nameTa: 'ஊரப்பாக்கம்',
    km: 25,
    route: 'Urapakkam lies on the GST Road between Guduvanchery and Vandalur, close to the Kilambakkam bus terminus.',
    routeTa: 'ஊரப்பாக்கம் – GST ரோட்டில் கூடுவாஞ்சேரிக்கும் வண்டலூருக்கும் இடையில், கிளாம்பாக்கம் பேருந்து நிலையம் அருகில்.',
    localities: ['Urapakkam', 'Karanaipuducheri', 'Kilambakkam', 'Aathanur'],
    intro: [
      'With the Kilambakkam bus terminus nearby, Urapakkam and Karanaipuducheri have seen a boom in new houses and plots. KVM Agencies supplies construction materials to Urapakkam, Karanaipuducheri, Kilambakkam and Aathanur.',
      'From the first load of jally and M Sand for the foundation to P Sand for the last coat of plaster, we supply everything — with today\'s rate on a single phone call.',
    ],
    introTa: [
      'கிளாம்பாக்கம் பேருந்து நிலையத்தால் ஊரப்பாக்கம், காரணைப்புதுச்சேரி பகுதிகளில் புதிய வீடுகள் அதிகரித்துள்ளன. அடித்தளம் முதல் பூச்சு வரை அனைத்து பொருட்களும் விநியோகம் செய்கிறோம்.',
    ],
    focus: ['New independent houses', 'Plot development', 'Shops near Kilambakkam terminus'],
    faq: {
      q: 'Do you deliver M Sand and jally to Urapakkam?',
      a: 'Yes. We deliver M Sand, P Sand and jally by unit or full load to Urapakkam, Karanaipuducheri and Kilambakkam, along with cement, bricks, blocks and steel. Call +91 91507 51905 for today\'s delivered rate.',
    },
    geo: { lat: 12.8640, lng: 80.0700 },
    nearby: ['guduvanchery', 'vandalur', 'kattankulathur-potheri'],
  },
  {
    slug: 'vandalur',
    name: 'Vandalur',
    nameTa: 'வண்டலூர்',
    pincodes: ['600048'],
    km: 30,
    route: 'Vandalur is at the junction of the GST Road, the Vandalur–Kelambakkam road and the Vandalur–Walajabad road, about 30 km from our yard.',
    routeTa: 'வண்டலூர் – GST ரோடு, வண்டலூர்–கேளம்பாக்கம் சாலை, வண்டலூர்–வாலாஜாபாத் சாலை சந்திப்பில், சுமார் 30 கி.மீ.',
    localities: ['Vandalur', 'Mannivakkam', 'Kilambakkam', 'Kolapakkam', 'Vandalur–Kelambakkam Road'],
    intro: [
      'Vandalur — home to the Arignar Anna Zoological Park — is a key junction connecting the GST Road with the OMR (via Kelambakkam) and Oragadam (via Padappai). Residential growth along these roads has made Vandalur, Mannivakkam and Kolapakkam busy construction areas.',
      'KVM Agencies supplies bulk cement, M Sand, jally, AAC blocks and TMT steel to Vandalur and nearby localities. For full loads we offer reduced transport charges.',
    ],
    introTa: [
      'அறிஞர் அண்ணா உயிரியல் பூங்கா அமைந்துள்ள வண்டலூர் – GST ரோடு, OMR, ஒரகடம் இணைக்கும் முக்கிய சந்திப்பு. வண்டலூர், மண்ணிவாக்கம், கொளப்பாக்கம் பகுதிகளுக்கு மொத்தமாக பொருட்கள் விநியோகம்.',
    ],
    focus: ['Apartments and villas', 'Independent houses', 'Commercial buildings'],
    faq: {
      q: 'Do you supply construction materials to Vandalur and Mannivakkam?',
      a: 'Yes. We supply cement, sand, jally, bricks, blocks and TMT steel to Vandalur, Mannivakkam, Kolapakkam and Kilambakkam. Full-load orders get reduced transport charges. Call +91 91507 51905.',
    },
    geo: { lat: 12.8910, lng: 80.0810 },
    nearby: ['urapakkam', 'guduvanchery', 'padappai', 'kelambakkam'],
  },
  {
    slug: 'padappai',
    name: 'Padappai',
    nameTa: 'படப்பை',
    pincodes: ['601301'],
    km: 28,
    route: 'Padappai is on the Vandalur–Walajabad road near the Oragadam industrial corridor; we reach it via Singaperumal Koil.',
    routeTa: 'படப்பை – வண்டலூர்–வாலாஜாபாத் சாலையில், ஒரகடம் தொழிற்பகுதி அருகில்; சிங்கபெருமாள் கோயில் வழியாக டெலிவரி.',
    localities: ['Padappai', 'Oragadam', 'Manimangalam', 'Salamangalam', 'Karasangal'],
    intro: [
      'Padappai has grown alongside the Oragadam industrial corridor, with rental houses, workers\' accommodation, warehouses and new residential layouts. KVM Agencies supplies construction materials to Padappai, Oragadam, Manimangalam, Salamangalam and Karasangal.',
      'Hollow blocks and AAC blocks are in high demand here for quick walling, along with cement, M Sand, jally and TMT steel for the RCC frame. We deliver full loads with GST invoices for contractors.',
    ],
    introTa: [
      'ஒரகடம் தொழிற்பகுதியுடன் வளர்ந்து வரும் படப்பை – வாடகை வீடுகள், தொழிலாளர் குடியிருப்புகள், கோடவுன்கள். ஹாலோ பிளாக், AAC பிளாக், சிமெண்ட், மணல், ஜல்லி, கம்பி டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Workers\' accommodation and rental houses', 'Warehouses', 'Residential layouts', 'Compound walls'],
    faq: {
      q: 'Do you deliver construction materials to Padappai and Oragadam?',
      a: 'Yes. We deliver cement, M Sand, jally, hollow blocks, AAC blocks, bricks and TMT steel to Padappai, Oragadam and nearby villages. Call/WhatsApp +91 91507 51905 for a delivered quote.',
    },
    geo: { lat: 12.8820, lng: 80.0230 },
    nearby: ['singaperumal-koil', 'vandalur', 'maraimalai-nagar'],
  },
  {
    slug: 'palur',
    name: 'Palur',
    nameTa: 'பாலூர்',
    km: 10,
    route: 'Palur is west of Chengalpattu on the same Kanchipuram High Road as our yard — a direct, short delivery route.',
    routeTa: 'பாலூர் – எங்கள் கடை உள்ள அதே காஞ்சிபுரம் மெயின் ரோட்டில், செங்கல்பட்டுக்கு மேற்கே.',
    localities: ['Palur', 'Villages on Chengalpattu–Kanchipuram Road', 'Reddipalayam', 'Vallam'],
    intro: [
      'Palur and the villages along the Chengalpattu–Kanchipuram road are directly on our delivery route — our yard is on the same Kanchipuram High Road at Natham. That means quick delivery and low transport cost for houses, farm buildings and compound walls in Palur.',
      'We supply cement, M Sand, jally, chamber bricks, hollow blocks and TMT steel — call for today\'s rate.',
    ],
    introTa: [
      'பாலூர் மற்றும் செங்கல்பட்டு–காஞ்சிபுரம் சாலையில் உள்ள கிராமங்கள் எங்கள் கடை உள்ள அதே சாலையில் உள்ளன. விரைவான டெலிவரி, குறைந்த போக்குவரத்து கட்டணம்.',
    ],
    focus: ['Independent houses', 'Farm houses and sheds', 'Compound walls'],
    faq: {
      q: 'Do you deliver to villages on the Chengalpattu–Kanchipuram road?',
      a: 'Yes. Our yard is on Kanchipuram High Road at Natham, Chengalpattu, so Palur and villages along this road are on our direct route. Call +91 91507 51905.',
    },
    geo: { lat: 12.7150, lng: 79.9200 },
    nearby: ['chengalpattu', 'paranur', 'singaperumal-koil'],
  },
  {
    slug: 'thirukazhukundram',
    name: 'Thirukazhukundram',
    nameTa: 'திருக்கழுக்குன்றம்',
    pincodes: ['603109'],
    km: 15,
    route: 'Thirukazhukundram is south-east of Chengalpattu on the road towards Kalpakkam and Mamallapuram, about 15 km away.',
    routeTa: 'திருக்கழுக்குன்றம் – செங்கல்பட்டுக்கு தென்கிழக்கே, கல்பாக்கம் / மாமல்லபுரம் சாலையில், சுமார் 15 கி.மீ.',
    localities: ['Thirukazhukundram town', 'Rudrankoil', 'Ammanambakkam', 'Villages towards Kalpakkam'],
    intro: [
      'Thirukazhukundram, famous for the Vedagiriswarar hill temple, is a temple town with steady house construction in the town and surrounding villages. KVM Agencies delivers cement, M Sand, P Sand, jally, chamber bricks, blocks and TMT steel to Thirukazhukundram.',
      'Since it is close to Chengalpattu, transport charges are reasonable even for small orders — and lower still for full loads.',
    ],
    introTa: [
      'வேதகிரீஸ்வரர் மலைக்கோயிலுக்கு பெயர் பெற்ற திருக்கழுக்குன்றம் மற்றும் சுற்றுக் கிராமங்களுக்கு சிமெண்ட், மணல், ஜல்லி, செங்கல், பிளாக், கம்பி டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Independent houses', 'Shops and lodges', 'Repair and renovation'],
    faq: {
      q: 'Who supplies cement and bricks in Thirukazhukundram?',
      a: 'KVM Agencies, Chengalpattu (about 15 km away) supplies cement, bricks, blocks, sand, jally and TMT steel to Thirukazhukundram and nearby villages. Call/WhatsApp +91 91507 51905 for today\'s rate.',
    },
    geo: { lat: 12.6080, lng: 80.0590 },
    nearby: ['chengalpattu', 'kalpakkam', 'thiruporur'],
  },
  {
    slug: 'thiruporur',
    name: 'Thiruporur',
    nameTa: 'திருப்போரூர்',
    pincodes: ['603110'],
    km: 27,
    route: 'Thiruporur is on the OMR, reached from Chengalpattu by the Chengalpattu–Thiruporur road, about 27 km away.',
    routeTa: 'திருப்போரூர் – OMR-ல், செங்கல்பட்டு–திருப்போரூர் சாலை வழியாக சுமார் 27 கி.மீ.',
    localities: ['Thiruporur', 'Alathur', 'Mambakkam side', 'OMR (Thiruporur stretch)', 'Chengalpattu–Thiruporur Road villages'],
    intro: [
      'Thiruporur, home to the famous Kandaswamy (Murugan) temple, has become a hotspot for villa plots, farm houses and weekend homes along the OMR and the Chengalpattu–Thiruporur road. KVM Agencies supplies all construction raw materials to Thiruporur and surrounding villages.',
      'For villa and farm-house projects, we supply wire cut bricks, AAC blocks, cement, M Sand, P Sand, jally and TMT steel with bulk-order transport savings.',
    ],
    introTa: [
      'கந்தசாமி முருகன் கோயில் அமைந்த திருப்போரூர் – OMR மற்றும் செங்கல்பட்டு–திருப்போரூர் சாலையில் வில்லா, பண்ணை வீடுகள் அதிகம். அனைத்து கட்டுமானப் பொருட்களும் டெலிவரி.',
    ],
    focus: ['Villas and farm houses', 'Weekend homes', 'Compound walls for plots'],
    faq: {
      q: 'Do you deliver construction materials from Chengalpattu to Thiruporur?',
      a: 'Yes, via the Chengalpattu–Thiruporur road. We deliver cement, sand, jally, bricks, blocks and TMT steel to Thiruporur and villages along the route. Bulk loads get reduced transport charges. Call +91 91507 51905.',
    },
    geo: { lat: 12.7250, lng: 80.1900 },
    nearby: ['kelambakkam', 'thirukazhukundram', 'chengalpattu'],
  },
  {
    slug: 'kelambakkam',
    name: 'Kelambakkam',
    nameTa: 'கேளம்பாக்கம்',
    pincodes: ['603103'],
    km: 35,
    route: 'Kelambakkam is on the OMR at the end of the Vandalur–Kelambakkam road; we reach it via Thiruporur or Vandalur depending on traffic.',
    routeTa: 'கேளம்பாக்கம் – OMR-ல், வண்டலூர்–கேளம்பாக்கம் சாலை முடிவில்; திருப்போரூர் அல்லது வண்டலூர் வழியாக டெலிவரி.',
    localities: ['Kelambakkam', 'Thaiyur', 'Pudupakkam', 'Padur', 'Vandalur–Kelambakkam Road'],
    intro: [
      'Kelambakkam and the surrounding OMR localities — Thaiyur, Pudupakkam and Padur — are full of apartment projects, villas and independent houses for IT professionals. KVM Agencies supplies AAC blocks, cement, M Sand, P Sand, jally and TMT steel for these projects.',
      'For apartment builders, we offer bulk pricing and planned deliveries with GST invoices. For individual house owners, we can deliver smaller loads as needed.',
    ],
    introTa: [
      'கேளம்பாக்கம், தையூர், புதுப்பாக்கம், படூர் – OMR பகுதியில் அபார்ட்மெண்ட்கள், வில்லாக்கள் அதிகம். AAC பிளாக், சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, கம்பி விநியோகம் செய்கிறோம்.',
    ],
    focus: ['Apartments (AAC blocks)', 'Villas', 'Independent houses'],
    faq: {
      q: 'Do you supply AAC blocks and cement to Kelambakkam?',
      a: 'Yes. We supply AAC blocks, cement, M Sand, P Sand, jally and TMT steel to Kelambakkam, Thaiyur, Pudupakkam and Padur. Builders get bulk pricing and scheduled deliveries. Call +91 91507 51905.',
    },
    geo: { lat: 12.7900, lng: 80.2200 },
    nearby: ['thiruporur', 'vandalur', 'guduvanchery'],
  },
  {
    slug: 'madurantakam',
    name: 'Madurantakam',
    nameTa: 'மதுராந்தகம்',
    pincodes: ['603306'],
    km: 28,
    route: 'Madurantakam is south of Chengalpattu on the GST Road, about 28 km from our yard.',
    routeTa: 'மதுராந்தகம் – செங்கல்பட்டுக்கு தெற்கே GST ரோட்டில், சுமார் 28 கி.மீ.',
    localities: ['Madurantakam town', 'Madurantakam lake area', 'Karunguzhi', 'Padalam', 'Villages on GST Road'],
    intro: [
      'Madurantakam — known for its large lake and the Eri Katha Ramar temple — is a taluk headquarters with steady demand for houses, shops and agricultural buildings. KVM Agencies delivers cement, M Sand, jally, chamber bricks, hollow blocks and TMT steel to Madurantakam, Karunguzhi, Padalam and nearby villages along the GST Road.',
      'Since we are directly connected by the GST Road, full-load deliveries are straightforward and bulk orders get reduced transport charges.',
    ],
    introTa: [
      'பெரிய ஏரி மற்றும் ஏரிகாத்த ராமர் கோயிலுக்கு பெயர் பெற்ற மதுராந்தகம், கருங்குழி, படாளம் பகுதிகளுக்கு GST ரோடு வழியாக சிமெண்ட், மணல், ஜல்லி, செங்கல், பிளாக், கம்பி டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Independent houses', 'Shops and commercial buildings', 'Agricultural godowns'],
    faq: {
      q: 'Can I get cement and steel delivered from Chengalpattu to Madurantakam?',
      a: 'Yes. We deliver cement, TMT steel, sand, jally, bricks and blocks along the GST Road to Madurantakam, Karunguzhi and Padalam. Full loads get reduced transport charges. Call +91 91507 51905.',
    },
    geo: { lat: 12.5100, lng: 79.8900 },
    nearby: ['acharapakkam', 'chengalpattu', 'thirukazhukundram'],
  },
  {
    slug: 'acharapakkam',
    name: 'Acharapakkam',
    nameTa: 'அச்சரப்பாக்கம்',
    pincodes: ['603301'],
    km: 40,
    route: 'Acharapakkam is further south on the GST Road, past Madurantakam, near Melmaruvathur.',
    routeTa: 'அச்சரப்பாக்கம் – மதுராந்தகத்தை தாண்டி GST ரோட்டில், மேல்மருவத்தூர் அருகில்.',
    localities: ['Acharapakkam town', 'Melmaruvathur side', 'Villages on GST Road south'],
    intro: [
      'KVM Agencies delivers construction raw materials to Acharapakkam and nearby villages towards Melmaruvathur. For this distance, we recommend full-load orders — transport is shared over a larger quantity and works out cheaper per bag or per unit.',
      'We supply cement, M Sand, jally, chamber bricks, hollow blocks, TMT steel and binding wire. Call to plan a combined load for your site.',
    ],
    introTa: [
      'அச்சரப்பாக்கம் மற்றும் மேல்மருவத்தூர் பகுதிகளுக்கு கட்டுமானப் பொருட்கள் டெலிவரி செய்கிறோம். இந்த தூரத்திற்கு முழு லோடு ஆர்டர் செய்தால் போக்குவரத்து கட்டணம் குறைவு.',
    ],
    focus: ['Independent houses', 'Lodges and shops', 'Agricultural buildings'],
    faq: {
      q: 'Is delivery to Acharapakkam available?',
      a: 'Yes. We deliver to Acharapakkam and nearby villages. For the best rate, order a full or combined load (for example cement + steel, or M Sand + jally). Call +91 91507 51905 for a delivered quote.',
    },
    geo: { lat: 12.4050, lng: 79.8200 },
    nearby: ['madurantakam', 'chengalpattu'],
  },
  {
    slug: 'kalpakkam',
    name: 'Kalpakkam',
    nameTa: 'கல்பாக்கம்',
    pincodes: ['603102'],
    km: 33,
    route: 'Kalpakkam is on the East Coast Road side, reached from Chengalpattu via Thirukazhukundram, about 33 km away.',
    routeTa: 'கல்பாக்கம் – கிழக்கு கடற்கரை சாலை பகுதி, திருக்கழுக்குன்றம் வழியாக சுமார் 33 கி.மீ.',
    localities: ['Kalpakkam', 'Pudupattinam', 'Sadras', 'Vayalur', 'Villages on the ECR side'],
    intro: [
      'Kalpakkam — home to the Madras Atomic Power Station and IGCAR township — along with Pudupattinam, Sadras and nearby coastal villages, has steady demand for houses, rental homes and shops. KVM Agencies delivers cement, M Sand, jally, bricks, blocks and TMT steel to Kalpakkam via Thirukazhukundram.',
      'Near the coast, use good-quality cement, keep adequate concrete cover over steel and cure well — our technical advisor can guide you on the right materials for coastal conditions.',
    ],
    introTa: [
      'கல்பாக்கம் அணுமின் நிலையம் அமைந்த கல்பாக்கம், புதுப்பட்டினம், சதுரங்கப்பட்டினம் பகுதிகளுக்கு திருக்கழுக்குன்றம் வழியாக சிமெண்ட், மணல், ஜல்லி, செங்கல், பிளாக், கம்பி டெலிவரி செய்கிறோம்.',
    ],
    focus: ['Independent houses', 'Rental homes', 'Coastal construction'],
    faq: {
      q: 'Which cement is good for construction near the sea in Kalpakkam?',
      a: 'For coastal areas, PPC or slag-based (PSC) cements are generally preferred because they offer better resistance to chlorides, along with dense concrete, adequate cover to steel and proper curing. Follow your engineer\'s specification. Call KVM Agencies on +91 91507 51905 and our technical advisor will suggest suitable options.',
    },
    geo: { lat: 12.5280, lng: 80.1590 },
    nearby: ['thirukazhukundram', 'thiruporur', 'chengalpattu'],
  },
]

export const areaBySlug = (slug: string) => AREAS.find((a) => a.slug === slug)
