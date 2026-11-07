import { Link } from '@tanstack/react-router'
import { SITE } from '~/data/site'
import { postsByLang } from '~/data/blog'
import { t, lp, type Lang } from '~/lib/i18n'
import { seo } from '~/lib/seo'
import { faqSchema, webPageSchema } from '~/lib/schema'
import { CallBtn, WaBtn, CtaBox, ProductGroups, AreaChips, WhyUs, FaqList, NapBlock, MapEmbed, CategoryGrid, Img, PhoneIcon, WaIcon } from '~/components/ui'
import { tel, waLink } from '~/data/site'
import { AUTHORS, authorImage } from '~/data/authors'
import { postImage } from '~/data/blog'
import { HOME_FAQS, HOME_FAQS_TA } from '~/data/faqs'

export function homeHead(lang: Lang) {
  const en = lang === 'en'
  const title = en
    ? 'Construction Materials Supplier in Chengalpattu | Cement, M Sand, Steel – KVM Agencies'
    : 'செங்கல்பட்டில் கட்டுமானப் பொருட்கள் | சிமெண்ட், எம் சாண்ட், கம்பி – KVM Agencies'
  const description = en
    ? 'Construction materials supplier in Chengalpattu since 2002 – cement, M Sand, P Sand, jally, bricks, blocks & TMT steel with site delivery. Call/WhatsApp 91507 51905.'
    : 'KVM Agencies – 2002 முதல் செங்கல்பட்டில் கட்டுமானப் பொருட்கள். சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், பிளாக், TMT கம்பி. அழைக்க / WhatsApp: 91507 51905.'
  const path = lp(lang, '/')
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: '/', ta: '/ta' },
    jsonLd: [webPageSchema({ path, name: title, description, lang }), faqSchema(en ? HOME_FAQS : HOME_FAQS_TA)],
  })
}

export function HomePage({ lang }: { lang: Lang }) {
  const s = t(lang)
  const en = lang === 'en'
  const posts = postsByLang(lang).slice(0, 6)
  return (
    <>
      <section className="hero">
        <Img src="/images/hero/home.jpg" alt={en ? 'Construction materials yard of KVM Agencies, Chengalpattu' : 'KVM Agencies கட்டுமானப் பொருட்கள் கடை, செங்கல்பட்டு'} w={1600} h={800} eager className="hero-bg" />
        <div className="wrap">
          <div>
            <h1>
              {en ? (
                <>
                  Construction Raw Material Supplier in <em>Chengalpattu</em>
                </>
              ) : (
                <>
                  <em>செங்கல்பட்டில்</em> கட்டுமானப் பொருட்கள் விநியோகஸ்தர்
                </>
              )}
            </h1>
            <p className="lead">
              {en ? (
                <>
                  <strong>KVM Agencies</strong> has supplied cement, M Sand, P Sand, jally, bricks, blocks, TMT steel and binding wire to home owners,
                  masons, contractors and builders in Chengalpattu and nearby towns <strong>since 2002</strong>. One call gets you today's rate and
                  delivery to your site.
                </>
              ) : (
                <>
                  <strong>KVM Agencies</strong> – 2002 முதல் செங்கல்பட்டு மற்றும் சுற்றுப்பகுதிகளில் சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி,
                  செங்கல், பிளாக், TMT கம்பி, கட்டு கம்பி விநியோகம். ஒரே அழைப்பில் இன்றைய விலை மற்றும் சைட் டெலிவரி.
                </>
              )}
            </p>
            <div className="cta-row">
              <CallBtn lang={lang} big />
              <WaBtn lang={lang} big msg={en ? "Hi KVM Agencies, I need today's rate for construction materials." : 'வணக்கம் KVM Agencies, கட்டுமானப் பொருட்கள் இன்றைய விலை தேவை.'} label={`${s.whatsapp} – ${s.getRate}`} />
            </div>
            <ul className="trust">
              {(en
                ? ['Since 2002', 'All leading cement brands', 'Site delivery', 'Bulk-order transport savings', 'GST bill']
                : ['2002 முதல்', 'அனைத்து சிமெண்ட் பிராண்டுகள்', 'சைட் டெலிவரி', 'மொத்த ஆர்டருக்கு சலுகை', 'GST பில்']
              ).map((x) => (
                <li key={x}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true">
                    <path d="M5 12l5 5L20 7" />
                  </svg>
                  {x}
                </li>
              ))}
            </ul>
          </div>
          <div className="hero-card">
            <h2>{en ? "Get Today's Rate" : 'இன்றைய விலை'}</h2>
            <p className="muted" style={{ margin: 0, fontSize: '.92rem' }}>
              {en ? 'Cement · Sand · Jally · Bricks · Blocks · Steel' : 'சிமெண்ட் · மணல் · ஜல்லி · செங்கல் · பிளாக் · கம்பி'}
            </p>
            <ul>
              <li>{en ? 'Brand-wise price in minutes' : 'நிமிடங்களில் பிராண்ட் வாரியான விலை'}</li>
              <li>{en ? 'Delivery charge to your site' : 'உங்கள் சைட்டுக்கு டெலிவரி கட்டணம்'}</li>
              <li>{en ? 'Lower transport on bulk orders' : 'மொத்த ஆர்டருக்கு குறைந்த போக்குவரத்து'}</li>
            </ul>
            <a href={tel} className="btn btn-call btn-lg" data-track="call">
              <PhoneIcon /> {SITE.phoneDisplay}
            </a>
            <a href={waLink(en ? "Hi KVM Agencies, please share today's rates." : 'வணக்கம் KVM Agencies, இன்றைய விலைகள் தேவை.')} className="btn btn-wa btn-lg" target="_blank" rel="noopener" data-track="whatsapp">
              <WaIcon /> WhatsApp
            </a>
          </div>
        </div>
      </section>

      <div className="wrap">
        <div className="section-head">
          <h2>{en ? 'Shop by Category' : 'வகைகள்'}</h2>
          <Link to={lp(lang, '/products') as any}>{en ? 'View all products →' : 'அனைத்து பொருட்கள் →'}</Link>
        </div>
        <CategoryGrid lang={lang} />

        <div className="stats">
          <div className="stat">
            <b>2002</b>
            <span>{en ? 'Serving since' : 'முதல் சேவை'}</span>
          </div>
          <div className="stat">
            <b>6</b>
            <span>{en ? 'Cement brands' : 'சிமெண்ட் பிராண்டுகள்'}</span>
          </div>
          <div className="stat">
            <b>17+</b>
            <span>{en ? 'Towns we deliver to' : 'டெலிவரி பகுதிகள்'}</span>
          </div>
          <div className="stat">
            <b>1</b>
            <span>{en ? 'Call for every material' : 'அழைப்பில் அனைத்தும்'}</span>
          </div>
        </div>

        <section>
          <h2>{en ? 'Construction materials we supply in Chengalpattu' : 'நாங்கள் விநியோகிக்கும் கட்டுமானப் பொருட்கள்'}</h2>
          <p>
            {en
              ? "Prices change daily, so we don't print rates here. Tap Call or WhatsApp on any item to get today's price with delivery."
              : 'விலை தினமும் மாறும். எந்த பொருளுக்கும் அழைக்கவும் அல்லது WhatsApp செய்யவும் – இன்றைய விலை டெலிவரியுடன்.'}
          </p>
          <ProductGroups lang={lang} />
        </section>

        <CtaBox lang={lang} msg={en ? "Hi KVM Agencies, please share today's rates." : 'வணக்கம் KVM Agencies, இன்றைய விலைகள் தேவை.'} />

        <section>
          <h2>{en ? 'Areas we deliver to' : 'டெலிவரி பகுதிகள்'}</h2>
          <p>
            {en
              ? 'From our yard at Natham, Chengalpattu we deliver to sites across Chengalpattu district — north along the GST Road to Vandalur, east to Thiruporur and Kelambakkam on the OMR, south to Madurantakam and Acharapakkam, and towards Kalpakkam. Bulk orders get reduced transport charges.'
              : 'நத்தம், செங்கல்பட்டு கடையிலிருந்து GST ரோடு வழியாக வண்டலூர் வரை, OMR-ல் திருப்போரூர், கேளம்பாக்கம், தெற்கே மதுராந்தகம், அச்சரப்பாக்கம், கல்பாக்கம் வரை டெலிவரி. மொத்த ஆர்டருக்கு குறைந்த போக்குவரத்து கட்டணம்.'}
          </p>
          <AreaChips lang={lang} />
        </section>

        <WhyUs lang={lang} />

        <section>
          <h2>{en ? 'About KVM Agencies' : 'KVM Agencies பற்றி'}</h2>
          <p>
            {en ? (
              <>
                KVM Agencies was founded in 2002 by <Link to={"/authors/murali-kathirvel" as any}>Murali Kathirvel</Link> in Chengalpattu and is managed today by his son, Managing Director <Link to={"/authors/naveen-m-r" as any}>Naveen M R</Link>. Over more than two decades we have
                supplied materials for houses, shops, compound walls, factories and apartments across Chengalpattu district. Many of you
                knew us through our online store <strong>kvmcmart.in (KVM C-Mart)</strong> — today the same team serves you as KVM Agencies, with
                our Technical Advisor <Link to={"/authors/kailash" as any}>Kailash</Link> helping customers choose the right materials and quantities.
              </>
            ) : (
              <>
                KVM Agencies 2002-ல் முரளி கதிர்வேல் அவர்களால் செங்கல்பட்டில் தொடங்கப்பட்டது. இன்று அவரது மகன் நவீன் எம் ஆர் (நிர்வாக இயக்குநர்) நிர்வகிக்கிறார். வீடுகள், கடைகள், காம்பவுண்ட் சுவர்கள்,
                தொழிற்சாலைகளுக்கு பொருட்கள் வழங்கியுள்ளோம். kvmcmart.in (KVM C-Mart) மூலம் எங்களை அறிந்தவர்களுக்கு – அதே குழு இன்று KVM Agencies ஆக
                சேவை செய்கிறது. தொழில்நுட்ப ஆலோசகர் கைலாஷ் சரியான பொருள் தேர்வுக்கு உதவுகிறார்.
              </>
            )}
          </p>
          <p>
            <Link to={lp(lang, '/about') as any}>{s.readMore} →</Link>
          </p>
        </section>

        <section>
          <div className="section-head">
            <h2>{en ? 'Free guides for home builders' : 'வீடு கட்டுபவர்களுக்கான வழிகாட்டிகள்'}</h2>
            <Link to={lp(lang, '/blog') as any}>{en ? 'All guides →' : 'அனைத்தும் →'}</Link>
          </div>
          <div className="grid">
            {posts.map((p) => (
              <article className="card" key={p.slug}>
                <Link to={lp(lang, `/blog/${p.slug}`) as any} className="thumb wide" tabIndex={-1} aria-hidden="true">
                  <Img src={postImage(p)} alt={p.title} w={1200} h={630} />
                </Link>
                <div className="body">
                  <h3>
                    <Link to={lp(lang, `/blog/${p.slug}`) as any}>{p.title}</Link>
                  </h3>
                  <p>{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="cta-row">
            <Link to="/material-calculator" className="btn btn-outline">
              🧮 {s.calculator} – {en ? 'estimate cement, sand, jally & steel' : 'பொருட்களை கணக்கிடுங்கள்'}
            </Link>
          </div>
        </section>

        <section>
          <h2>{en ? 'Our team' : 'எங்கள் குழு'}</h2>
          <div className="team">
            {AUTHORS.map((a) => (
              <div className="member" key={a.slug}>
                <Img src={authorImage(a.slug)} alt={`${a.name}, ${a.role}`} w={400} h={400} />
                <b>
                  <Link to={`/authors/${a.slug}` as any}>{en ? a.name : a.nameTa}</Link>
                </b>
                <span>{en ? a.role.replace(', KVM Agencies', '') : a.roleTa.replace(', KVM Agencies', '')}</span>
              </div>
            ))}
          </div>
        </section>

        <FaqList lang={lang} faqs={en ? HOME_FAQS : HOME_FAQS_TA} />

        <section>
          <h2>{en ? 'Visit our yard in Chengalpattu' : 'எங்கள் கடைக்கு வாருங்கள்'}</h2>
          <div className="two-col">
            <MapEmbed title={`${SITE.name} location map`} />
            <NapBlock lang={lang} />
          </div>
        </section>
      </div>
    </>
  )
}
