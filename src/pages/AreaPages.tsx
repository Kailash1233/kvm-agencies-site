import { Link, notFound } from '@tanstack/react-router'
import { AREAS, areaBySlug } from '~/data/areas'
import { SITE } from '~/data/site'
import { t, lp, type Lang } from '~/lib/i18n'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from '~/lib/schema'
import { Breadcrumbs, CallBtn, WaBtn, CtaBox, FaqList, ProductGroups, AreaChips, WhyUs, NapBlock, PageHero } from '~/components/ui'

// ───────────── Areas hub ─────────────
export function areasHead(lang: Lang) {
  const en = lang === 'en'
  const path = lp(lang, '/areas')
  const title = en ? 'Areas We Serve – Construction Materials Delivery near Chengalpattu' : 'சேவை பகுதிகள் – செங்கல்பட்டு சுற்றுவட்டார டெலிவரி'
  const description = en
    ? 'Construction materials delivered to Chengalpattu, Maraimalai Nagar, Guduvanchery, Singaperumal Koil, Padappai, Thiruporur, Kelambakkam, Madurantakam & more.'
    : 'செங்கல்பட்டு, மறைமலை நகர், கூடுவாஞ்சேரி, சிங்கபெருமாள் கோயில், படப்பை, திருப்போரூர், கேளம்பாக்கம், மதுராந்தகம், கல்பாக்கம் – கட்டுமானப் பொருட்கள் டெலிவரி.'
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: '/areas', ta: '/ta/areas' },
    jsonLd: [
      webPageSchema({ path, name: title, description, lang, type: 'CollectionPage' }),
      breadcrumbSchema([
        { name: t(lang).home, path: lp(lang, '/') },
        { name: t(lang).areas, path },
      ]),
    ],
  })
}

export function AreasPage({ lang }: { lang: Lang }) {
  const s = t(lang)
  const en = lang === 'en'
  const sorted = [...AREAS].sort((a, b) => a.km - b.km)
  return (
    <>
      <PageHero image="/images/hero/delivery.jpg" alt="Construction material delivery across Chengalpattu district">
        <Breadcrumbs bare items={[{ name: s.home, path: lp(lang, '/') }, { name: s.areas, path: lp(lang, '/areas') }]} />
        <h1>{en ? 'Construction Materials Delivery – Areas We Serve' : 'கட்டுமானப் பொருட்கள் டெலிவரி – சேவை பகுதிகள்'}</h1>
      </PageHero>
      <div className="wrap">
        <p>
          {en
            ? 'Our yard is at 52, Kanchipuram High Road, Natham, Chengalpattu. We deliver cement, sand, jally, bricks, blocks and steel to all the areas below. Bulk orders get reduced transport charges — the larger the load, the lower the transport cost per bag or unit.'
            : 'எங்கள் கடை: 52, காஞ்சிபுரம் மெயின் ரோடு, நத்தம், செங்கல்பட்டு. கீழே உள்ள அனைத்து பகுதிகளுக்கும் டெலிவரி. மொத்த ஆர்டருக்கு குறைந்த போக்குவரத்து கட்டணம்.'}
        </p>
        <table>
          <thead>
            <tr>
              <th>{en ? 'Area' : 'பகுதி'}</th>
              <th>{en ? 'Approx. distance from our yard' : 'தோராய தூரம்'}</th>
              <th>{en ? 'Localities covered' : 'உள்ளடங்கிய இடங்கள்'}</th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((a) => (
              <tr key={a.slug}>
                <td>
                  <Link to={lp(lang, `/areas/${a.slug}`) as any}>{en ? a.name : a.nameTa}</Link>
                </td>
                <td>{a.km === 0 ? (en ? 'Local' : 'உள்ளூர்') : `~${a.km} km`}</td>
                <td>{a.localities.slice(0, 4).join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p>{en ? 'Your village not listed? Call us — if it is in or around Chengalpattu district, we most likely deliver there.' : 'உங்கள் ஊர் பட்டியலில் இல்லையா? அழைக்கவும் – செங்கல்பட்டு மாவட்டத்தில் இருந்தால் பெரும்பாலும் டெலிவரி செய்வோம்.'}</p>
        <CtaBox lang={lang} msg={en ? 'Hi KVM Agencies, do you deliver to my area? Location: ' : 'வணக்கம் KVM Agencies, என் பகுதிக்கு டெலிவரி உண்டா? இடம்: '} />
      </div>
    </>
  )
}

// ───────────── Area detail ─────────────
export function loadArea(slug: string) {
  const a = areaBySlug(slug)
  if (!a) throw notFound()
  return a
}

export function areaHead(lang: Lang, slug: string) {
  const a = areaBySlug(slug)
  if (!a) return {}
  const en = lang === 'en'
  const path = lp(lang, `/areas/${a.slug}`)
  const title = en
    ? `Construction Materials Supplier in ${a.name} | Cement, M Sand, Steel`
    : `${a.nameTa} – கட்டுமானப் பொருட்கள் | சிமெண்ட், எம் சாண்ட், கம்பி`
  const description = en
    ? `Cement, M Sand, jally, bricks, blocks & TMT steel delivered to ${a.name}${a.pincodes ? ' ' + a.pincodes[0] : ''} by KVM Agencies, Chengalpattu. Call/WhatsApp 91507 51905 for today's rate.`
    : `${a.nameTa} பகுதிக்கு சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், பிளாக், TMT கம்பி டெலிவரி – KVM Agencies, செங்கல்பட்டு. அழைக்க: 91507 51905.`
  const faqs = areaFaqs(a, lang)
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: `/areas/${a.slug}`, ta: `/ta/areas/${a.slug}` },
    jsonLd: [
      webPageSchema({ path, name: title, description, lang }),
      breadcrumbSchema([
        { name: t(lang).home, path: lp(lang, '/') },
        { name: t(lang).areas, path: lp(lang, '/areas') },
        { name: en ? a.name : a.nameTa, path },
      ]),
      serviceSchema({
        name: `Construction material supply in ${a.name}`,
        description: `Cement, M Sand, P Sand, jally, bricks, blocks, TMT steel and binding wire delivered to ${a.name} by KVM Agencies, Chengalpattu.`,
        path,
        areaServed: [a.name, ...a.localities.slice(0, 6)],
      }),
      faqSchema(faqs),
    ],
  })
}

function areaFaqs(a: NonNullable<ReturnType<typeof areaBySlug>>, lang: Lang) {
  if (lang === 'ta') {
    return [
      {
        q: `${a.nameTa} பகுதிக்கு கட்டுமானப் பொருட்கள் டெலிவரி செய்வீர்களா?`,
        a: `ஆம். KVM Agencies, நத்தம், செங்கல்பட்டு கடையிலிருந்து ${a.nameTa} பகுதிக்கு${a.km ? ` (சுமார் ${a.km} கி.மீ)` : ''} சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், பிளாக், TMT கம்பி டெலிவரி செய்கிறோம். அழைக்க: 91507 51905.`,
      },
      {
        q: `${a.nameTa} பகுதிக்கு டெலிவரி கட்டணம் எவ்வளவு?`,
        a: 'தூரம், பொருள், அளவைப் பொறுத்து மாறும். மொத்த ஆர்டருக்கு போக்குவரத்து கட்டணம் குறைவு. உங்கள் Google Maps லொகேஷனை WhatsApp செய்தால் சரியான கட்டணம் சொல்கிறோம்.',
      },
    ]
  }
  return [
    a.faq,
    {
      q: `What is the delivery charge to ${a.name}?`,
      a: `Delivery charge depends on the material, quantity and exact site location${a.km ? ` (${a.name} is about ${a.km} km from our yard)` : ''}. Bulk orders get reduced transport charges. Send your Google Maps location on WhatsApp to +91 91507 51905 for an exact quote.`,
    },
    {
      q: `Which materials can I order for my site in ${a.name}?`,
      a: `Cement (Ramco, UltraTech, Dalmia, ACC, Maha, Adani), M Sand, P Sand, jally (6/12/20/40 mm), chamber bricks, wire cut bricks, hollow blocks, AAC blocks, MCR and ARS TMT steel and binding wire — all from one supplier with one bill.`,
    },
    {
      q: `How do I get today's construction material rate in ${a.name}?`,
      a: `Call or WhatsApp KVM Agencies on +91 91507 51905 with the material, quantity and your location in ${a.name}. We reply with today's price including delivery.`,
    },
  ]
}

export function AreaPage({ lang, slug }: { lang: Lang; slug: string }) {
  const a = areaBySlug(slug)!
  const s = t(lang)
  const en = lang === 'en'
  const name = en ? a.name : a.nameTa
  const waMsg = en ? `Hi KVM Agencies, I need construction materials delivered to ${a.name}. Please share today's rate.` : `வணக்கம் KVM Agencies, ${a.nameTa} பகுதிக்கு கட்டுமானப் பொருட்கள் தேவை. இன்றைய விலை சொல்லவும்.`
  return (
    <>
      <PageHero image="/images/hero/delivery.jpg" alt={`Construction material delivery to ${a.name} by KVM Agencies`}>
        <Breadcrumbs bare
          items={[
            { name: s.home, path: lp(lang, '/') },
            { name: s.areas, path: lp(lang, '/areas') },
            { name, path: lp(lang, `/areas/${a.slug}`) },
          ]}
        />
        <h1>{en ? `Construction Materials Supplier in ${a.name}` : `${a.nameTa} – கட்டுமானப் பொருட்கள் விநியோகம்`}</h1>
        <p>{en ? a.route : a.routeTa}</p>
      </PageHero>
      <div className="wrap">
        <p className="answer">
          <strong>{s.quickAnswer}</strong>
          {en
            ? `KVM Agencies (Chengalpattu, since 2002) delivers cement, M Sand, P Sand, jally, bricks, hollow & AAC blocks, TMT steel and binding wire to ${a.name}${a.km ? `, about ${a.km} km from our yard` : ''}. Call or WhatsApp +91 91507 51905 for today's rate with delivery.`
            : `KVM Agencies (செங்கல்பட்டு, 2002 முதல்) ${a.nameTa} பகுதிக்கு சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், பிளாக், TMT கம்பி டெலிவரி செய்கிறது. இன்றைய விலைக்கு 91507 51905.`}
        </p>
        <div className="cta-row">
          <CallBtn lang={lang} big />
          <WaBtn lang={lang} big msg={waMsg} label={`${s.whatsapp} – ${s.getRate}`} />
        </div>

        <div className="prose">
          {(en ? a.intro : a.introTa).map((html, i) => (
            <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
          ))}
        </div>

        <h2>{en ? `Delivery to ${a.name}` : `${a.nameTa} டெலிவரி`}</h2>
        <ul>
          {a.km > 0 && <li>{en ? `Approx. distance: ${a.km} km from our yard at Natham, Chengalpattu` : `தோராய தூரம்: ${a.km} கி.மீ`}</li>}
          {a.pincodes && <li>{en ? 'PIN code' : 'அஞ்சல் குறியீடு'}: {a.pincodes.join(', ')}</li>}
          <li>{en ? 'Delivery time: confirmed on call, based on material and quantity' : 'டெலிவரி நேரம்: பொருள் மற்றும் அளவைப் பொறுத்து அழைப்பில் உறுதி செய்யப்படும்'}</li>
          <li>{en ? 'Bulk orders: reduced transport charges' : 'மொத்த ஆர்டர்: குறைந்த போக்குவரத்து கட்டணம்'}</li>
          <li>{en ? 'Tip: send your Google Maps location pin on WhatsApp for accurate delivery' : 'குறிப்பு: சரியான டெலிவரிக்கு Google Maps லொகேஷனை WhatsApp செய்யவும்'}</li>
        </ul>
        <h3>{en ? `Localities we cover in and around ${a.name}` : 'உள்ளடங்கிய இடங்கள்'}</h3>
        <p>{a.localities.join(' · ')}</p>

        {en && (
          <>
            <h3>{`Common projects we supply in ${a.name}`}</h3>
            <ul>
              {a.focus.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </>
        )}

        <h2>{en ? `Materials available for delivery in ${a.name}` : `${a.nameTa} பகுதிக்கு கிடைக்கும் பொருட்கள்`}</h2>
        <ProductGroups lang={lang} area={name} />

        <CtaBox lang={lang} msg={waMsg} title={en ? `Building in ${a.name}? Get today's rate` : `${a.nameTa}-ல் கட்டுமானமா? இன்றைய விலை`} />

        <WhyUs lang={lang} />

        <FaqList lang={lang} faqs={areaFaqs(a, lang)} />

        <h2>{s.nearby}</h2>
        <AreaChips lang={lang} slugs={a.nearby} />
        <p>
          <Link to={lp(lang, '/areas') as any}>{en ? 'See all areas we serve →' : 'அனைத்து பகுதிகள் →'}</Link>
        </p>

        <h2>{en ? 'Our yard' : 'எங்கள் கடை'}</h2>
        <NapBlock lang={lang} />
        <p>
          <a
            href={`https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(a.name + ', Tamil Nadu')}&destination=${encodeURIComponent(SITE.mapsEmbedQuery)}`}
            target="_blank"
            rel="noopener"
          >
            🧭 {en ? `Directions from ${a.name} to KVM Agencies` : `${a.nameTa}-லிருந்து வழி`}
          </a>
        </p>
      </div>
    </>
  )
}
