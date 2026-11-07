import { Link } from "@tanstack/react-router";
import { SITE } from "~/data/site";
import { AUTHORS, authorImage } from "~/data/authors";
import { PRODUCTS } from "~/data/products";

import { HOME_FAQS } from "~/data/faqs";
import { t, lp, type Lang } from "~/lib/i18n";
import { seo } from "~/lib/seo";
import {
  BUSINESS_ID,
  breadcrumbSchema,
  faqSchema,
  webPageSchema,
} from "~/lib/schema";
import {
  Breadcrumbs,
  CallBtn,
  WaBtn,
  CtaBox,
  FaqList,
  NapBlock,
  MapEmbed,
  AreaChips,
  WhyUs,
  Img,
  PageHero,
} from "~/components/ui";

const crumbs = (lang: Lang, name: string, path: string) => [
  { name: t(lang).home, path: lp(lang, "/") },
  { name, path },
];

// ───────────── About ─────────────
export function aboutHead(lang: Lang) {
  const en = lang === "en";
  const path = lp(lang, "/about");
  const title = en
    ? "About KVM Agencies – Building Material Supplier in Chengalpattu Since 2002"
    : "KVM Agencies பற்றி – 2002 முதல் செங்கல்பட்டில்";
  const description = en
    ? "KVM Agencies was founded in 2002 by Murali Kathirvel in Chengalpattu and is run by Managing Director Naveen M R. Our story, our team and why builders trust us."
    : "KVM Agencies 2002-ல் முரளி கதிர்வேல் அவர்களால் செங்கல்பட்டில் தொடங்கப்பட்டது. நிர்வாக இயக்குநர் நவீன் எம் ஆர். எங்கள் கதை மற்றும் குழு.";
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: "/about", ta: "/ta/about" },
    jsonLd: [
      webPageSchema({
        path,
        name: title,
        description,
        lang,
        type: "AboutPage",
      }),
      breadcrumbSchema(crumbs(lang, t(lang).about, path)),
    ],
  });
}

export function AboutPage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const s = t(lang);
  return (
    <>
      <PageHero
        image="/images/hero/yard.jpg"
        alt="KVM Agencies yard at Natham, Chengalpattu"
      >
        <Breadcrumbs bare items={crumbs(lang, s.about, lp(lang, "/about"))} />
        <h1>{en ? "About KVM Agencies" : "KVM Agencies பற்றி"}</h1>
        <p>
          {en
            ? "Construction raw material supplier in Chengalpattu since 2002."
            : "2002 முதல் செங்கல்பட்டில் கட்டுமானப் பொருட்கள் விநியோகஸ்தர்."}
        </p>
      </PageHero>
      <div className="wrap narrow">
        {en ? (
          <>
            <p>
              <strong>KVM Agencies</strong> is a construction raw material
              supplier based at 52, Kanchipuram High Road, Natham, Chengalpattu.
              The business was started in <strong>2002</strong> by{" "}
              <Link to={"/authors/murali-kathirvel" as any}>
                Murali Kathirvel
              </Link>{" "}
              with one simple idea: give builders, masons and home owners in
              Chengalpattu honest rates, genuine materials and dependable
              delivery.
            </p>
            <p>
              Over two decades we have grown into a one-stop supplier for every
              structural material in a building — cement from six leading
              brands, M Sand, P Sand, jally, chamber and wire cut bricks, hollow
              and AAC blocks, MCR and ARS TMT steel and binding wire.
            </p>
            <p>
              Today the business is run by his son,{" "}
              <Link to={"/authors/naveen-m-r" as any}>Naveen M R</Link>,
              Managing Director, who looks after purchasing, pricing, stock and
              deliveries, with Technical Advisor{" "}
              <Link to={"/authors/kailash" as any}>Kailash</Link> helping
              customers choose the right materials and quantities.
            </p>
            <h2>From kvmcmart.in to KVM Agencies</h2>
            <p>
              Many customers know us through our online store{" "}
              <strong>kvmcmart.in (KVM C-Mart)</strong>, where we took orders
              for construction materials online. Today, the same team serves you
              as <strong>KVM Agencies</strong> at kvmagencies.in. The fastest
              way to order is still a phone call or a WhatsApp message.
            </p>
            <h2>Our team</h2>
          </>
        ) : (
          <>
            <p>
              <strong>KVM Agencies</strong> – 52, காஞ்சிபுரம் மெயின் ரோடு,
              நத்தம், செங்கல்பட்டு. 2002-ல் முரளி கதிர்வேல் அவர்களால்
              தொடங்கப்பட்டது. இன்று அவரது மகன் நவீன் எம் ஆர் நிர்வாக இயக்குநராக
              நிர்வகிக்கிறார். நியாயமான விலை, உண்மையான பொருட்கள், நம்பகமான
              டெலிவரி – இதுவே எங்கள் கொள்கை.
            </p>
            <p>
              இன்று ஆறு முன்னணி பிராண்டுகளின் சிமெண்ட், எம் சாண்ட், பி சாண்ட்,
              ஜல்லி, சேம்பர் / வயர் கட் செங்கல், ஹாலோ / AAC பிளாக், MCR / ARS
              TMT கம்பி, கட்டு கம்பி – அனைத்தும் ஒரே இடத்தில்.
            </p>
            <h2>kvmcmart.in இப்போது KVM Agencies</h2>
            <p>
              kvmcmart.in (KVM C-Mart) மூலம் எங்களை அறிந்தவர்களுக்கு – அதே குழு
              இன்று KVM Agencies ஆக சேவை செய்கிறது.
            </p>
            <h2>எங்கள் குழு</h2>
          </>
        )}
        <div className="team">
          {AUTHORS.map((a) => (
            <div className="member" key={a.slug}>
              <Img
                src={authorImage(a.slug)}
                alt={`${a.name}, ${a.role}`}
                w={400}
                h={400}
              />
              <b>
                <Link to={`/authors/${a.slug}` as any}>
                  {en ? a.name : a.nameTa}
                </Link>
              </b>
              <span>
                {(en ? a.role : a.roleTa).replace(", KVM Agencies", "")}
              </span>
              <p>{en ? a.bio : a.bioTa}</p>
            </div>
          ))}
        </div>
        <WhyUs lang={lang} />
        <h2>{en ? "Business details" : "நிறுவன விவரங்கள்"}</h2>
        <table className="spec">
          <tbody>
            <tr>
              <th>{en ? "Business name" : "பெயர்"}</th>
              <td>KVM Agencies</td>
            </tr>
            <tr>
              <th>{en ? "Established" : "தொடக்கம்"}</th>
              <td>2002</td>
            </tr>
            <tr>
              <th>{en ? "Founder" : "நிறுவனர்"}</th>
              <td>Murali Kathirvel</td>
            </tr>
            <tr>
              <th>{en ? "Managing Director" : "நிர்வாக இயக்குநர்"}</th>
              <td>Naveen M R</td>
            </tr>
            <tr>
              <th>GSTIN</th>
              <td>{SITE.gstin}</td>
            </tr>
            <tr>
              <th>{en ? "Address" : "முகவரி"}</th>
              <td>
                {en
                  ? "52, Kanchipuram High Rd, Natham, Chengalpattu, Tamil Nadu 603002"
                  : SITE.addressTa}
              </td>
            </tr>
            <tr>
              <th>{en ? "Phone / WhatsApp" : "போன் / WhatsApp"}</th>
              <td>
                <a href={`tel:${SITE.phone}`}>{SITE.phoneDisplay}</a>
              </td>
            </tr>
            <tr>
              <th>Email</th>
              <td>
                <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              </td>
            </tr>
          </tbody>
        </table>
        <CtaBox
          lang={lang}
          msg={
            en
              ? "Hi KVM Agencies, I need construction materials."
              : "வணக்கம் KVM Agencies, கட்டுமானப் பொருட்கள் தேவை."
          }
        />
      </div>
    </>
  );
}

// ───────────── Contact ─────────────
export function contactHead(lang: Lang) {
  const en = lang === "en";
  const path = lp(lang, "/contact");
  const title = en
    ? "Contact KVM Agencies Chengalpattu – Call / WhatsApp 91507 51905"
    : "தொடர்புக்கு – KVM Agencies செங்கல்பட்டு – 91507 51905";
  const description = en
    ? "Contact KVM Agencies, 52, Kanchipuram High Rd, Natham, Chengalpattu 603002. Call/WhatsApp +91 91507 51905, email kvmagencies123@gmail.com. Mon–Sat 9 AM–7 PM."
    : "KVM Agencies, 52, காஞ்சிபுரம் மெயின் ரோடு, நத்தம், செங்கல்பட்டு 603002. அழைக்க / WhatsApp: 91507 51905.";
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: "/contact", ta: "/ta/contact" },
    jsonLd: [
      webPageSchema({
        path,
        name: title,
        description,
        lang,
        type: "ContactPage",
        about: { "@id": BUSINESS_ID },
      }),
      breadcrumbSchema(crumbs(lang, t(lang).contact, path)),
    ],
  });
}

export function ContactPage({ lang }: { lang: Lang }) {
  const en = lang === "en";
  const s = t(lang);
  return (
    <>
      <PageHero
        image="/images/hero/yard.jpg"
        alt="KVM Agencies, 52 Kanchipuram High Road, Natham, Chengalpattu"
      >
        <Breadcrumbs
          bare
          items={crumbs(lang, s.contact, lp(lang, "/contact"))}
        />
        <h1>
          {en
            ? "Contact KVM Agencies, Chengalpattu"
            : "KVM Agencies – தொடர்புக்கு"}
        </h1>
        <p>
          {en
            ? "52, Kanchipuram High Rd, Natham, Chengalpattu 603002 · +91 91507 51905"
            : SITE.addressTa}
        </p>
      </PageHero>
      <div className="wrap">
        <p>
          {en
            ? "The fastest way to get today's rate is a phone call or WhatsApp message. You can also visit our yard or send the enquiry form below."
            : "இன்றைய விலைக்கு விரைவான வழி – அழைப்பு அல்லது WhatsApp. கடைக்கு நேரில் வரலாம் அல்லது கீழே உள்ள படிவத்தை அனுப்பலாம்."}
        </p>
        <div className="cta-row">
          <CallBtn lang={lang} big />
          <WaBtn
            lang={lang}
            big
            msg={
              en
                ? "Hi KVM Agencies, I need today's rate."
                : "வணக்கம் KVM Agencies, இன்றைய விலை தேவை."
            }
          />
          <a className="btn btn-outline btn-lg" href={`mailto:${SITE.email}`}>
            ✉ {SITE.email}
          </a>
        </div>
        <div className="two-col" style={{ marginTop: 18 }}>
          <MapEmbed title={`${SITE.name} on Google Maps`} />
          <NapBlock lang={lang} />
        </div>
        <h2>
          {en
            ? "What to send for a quick quote"
            : "விரைவான கொட்டேஷனுக்கு அனுப்ப வேண்டியவை"}
        </h2>
        <ol>
          <li>
            {en
              ? "Material and brand (e.g. Ramco PPC, 20 mm jally, 12 mm ARS steel)"
              : "பொருள் மற்றும் பிராண்ட்"}
          </li>
          <li>
            {en
              ? "Quantity (bags / units / tonnes / number of bricks)"
              : "அளவு (மூட்டை / யூனிட் / டன் / எண்ணிக்கை)"}
          </li>
          <li>
            {en
              ? "Site location (Google Maps pin on WhatsApp is best)"
              : "சைட் இடம் (Google Maps லொகேஷன்)"}
          </li>
          <li>{en ? "When you need it delivered" : "எப்போது டெலிவரி தேவை"}</li>
        </ol>
        <h2>{s.areas}</h2>
        <AreaChips lang={lang} />
      </div>
    </>
  );
}

// ───────────── FAQ ─────────────
const ALL_FAQS = [
  ...HOME_FAQS,
  ...PRODUCTS.flatMap((p) => p.faqs.slice(0, 2)),
].filter((f, i, arr) => arr.findIndex((x) => x.q === f.q) === i);

export function faqHead() {
  const title =
    "Construction Materials FAQ – Cement, Sand, Steel Prices & Delivery in Chengalpattu";
  const description =
    "Answers to common questions about cement, M Sand, P Sand, jally, bricks, blocks and TMT steel prices, quantities and delivery in Chengalpattu – KVM Agencies.";
  return seo({
    title,
    description,
    path: "/faq",
    lang: "en",
    jsonLd: [
      webPageSchema({ path: "/faq", name: title, description, lang: "en" }),
      breadcrumbSchema(crumbs("en", "FAQ", "/faq")),
      faqSchema(ALL_FAQS),
    ],
  });
}

export function FaqPage() {
  return (
    <>
      <Breadcrumbs items={crumbs("en", "FAQ", "/faq")} />
      <div className="wrap narrow">
        <h1>Construction Materials – Frequently Asked Questions</h1>
        <p>
          Quick answers from KVM Agencies, Chengalpattu. Can't find your
          question? Call or WhatsApp +91 91507 51905.
        </p>
        <FaqList lang="en" faqs={ALL_FAQS} />
        <CtaBox
          lang="en"
          msg="Hi KVM Agencies, I have a question about construction materials."
        />
      </div>
    </>
  );
}

// ───────────── Bulk orders ─────────────
export function bulkHead() {
  const title =
    "Bulk Construction Materials Supplier for Builders & Contractors – Chengalpattu";
  const description =
    "Bulk cement, M Sand, jally, blocks and TMT steel for builders and contractors in Chengalpattu district. Scheduled delivery, GST invoices, better rates.";
  return seo({
    title,
    description,
    path: "/bulk-orders",
    lang: "en",
    jsonLd: [
      webPageSchema({
        path: "/bulk-orders",
        name: title,
        description,
        lang: "en",
      }),
      breadcrumbSchema(crumbs("en", "Bulk Orders", "/bulk-orders")),
    ],
  });
}

export function BulkPage() {
  return (
    <>
      <Breadcrumbs items={crumbs("en", "Bulk Orders", "/bulk-orders")} />
      <div className="wrap narrow">
        <h1>
          Bulk Construction Materials for Builders, Contractors & Industries
        </h1>
        <p className="answer">
          <strong>Quick answer</strong>
          KVM Agencies supplies bulk cement, M Sand, P Sand, jally, bricks,
          hollow and AAC blocks, MCR and ARS TMT steel and binding wire to
          builders, contractors, apartment projects and industrial sites across
          Chengalpattu district — with better rates, reduced transport charges,
          GST invoices and deliveries scheduled to match your work.
        </p>
        <div className="cta-row">
          <CallBtn lang="en" big />
          <WaBtn
            lang="en"
            big
            msg="Hi KVM Agencies, I need a bulk quote for my project. Location: , Materials: , Quantity: "
          />
        </div>
        <h2>Who we supply</h2>
        <ul>
          <li>
            Apartment and villa builders (Guduvanchery, Kelambakkam, Mahindra
            World City, Maraimalai Nagar)
          </li>
          <li>Civil contractors and engineers</li>
          <li>
            Industrial sheds, warehouses and factories (Singaperumal Koil,
            Padappai, Oragadam)
          </li>
          <li>
            Institutions, hostels and commercial buildings (Kattankulathur,
            Potheri)
          </li>
          <li>Plot developers – compound walls and roads</li>
        </ul>
        <h2>What you get</h2>
        <ul>
          <li>Better per-unit rates on full loads</li>
          <li>Reduced transport charges on bulk quantities</li>
          <li>Scheduled, staggered deliveries matched to your pour dates</li>
          <li>GST invoices (GSTIN {SITE.gstin})</li>
          <li>
            One supplier and one contact for cement, aggregates, walling and
            steel
          </li>
          <li>Technical advice from our Technical Advisor</li>
        </ul>
        <h2>Send your requirement</h2>
        <p>
          WhatsApp your BOQ or material list with site location to{" "}
          <a href={`https://wa.me/${SITE.whatsapp}`}>+91 91507 51905</a> or
          email <a href={`mailto:${SITE.email}`}>{SITE.email}</a>. We will reply
          with a delivered quote.
        </p>
        <AreaChips lang="en" />
      </div>
    </>
  );
}

// ───────────── Privacy ─────────────
export function privacyHead() {
  return seo({
    title: "Privacy Policy",
    description:
      "Privacy policy of KVM Agencies, Chengalpattu – how we use the details you share through calls, WhatsApp and the enquiry form.",
    path: "/privacy-policy",
    lang: "en",
    jsonLd: [
      breadcrumbSchema(crumbs("en", "Privacy Policy", "/privacy-policy")),
    ],
  });
}

export function PrivacyPage() {
  return (
    <>
      <Breadcrumbs items={crumbs("en", "Privacy Policy", "/privacy-policy")} />
      <div className="wrap narrow">
        <h1>Privacy Policy</h1>
        <p>Last updated: 29 October 2026</p>
        <p>
          KVM Agencies ("we") respects your privacy. When you call us, message
          us on WhatsApp, email us or submit the enquiry form on kvmagencies.in,
          we collect only the details you share — such as your name, phone
          number, site location and material requirement.
        </p>
        <h2>How we use your details</h2>
        <ul>
          <li>
            To respond to your enquiry, share prices and arrange delivery.
          </li>
          <li>
            To issue invoices and maintain business records as required by law.
          </li>
        </ul>
        <p>We do not sell or rent your personal information.</p>
        <h2>Enquiry form</h2>
        <p>
          The enquiry form is delivered to our email inbox using the FormSubmit
          service. Please do not include sensitive personal information in the
          message.
        </p>
        <h2>Analytics</h2>
        <p>
          We may use Google Analytics to understand how visitors use this
          website. It uses cookies and collects anonymous usage data.
        </p>
        <h2>Contact</h2>
        <p>
          For any privacy question, email{" "}
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a> or call{" "}
          {SITE.phoneDisplay}.
        </p>
      </div>
    </>
  );
}
