import { Link } from '@tanstack/react-router'
import { useState, type ReactNode } from 'react'
import { SITE, tel, waLink } from '~/data/site'
import { PRODUCTS, PRODUCT_GROUPS, CATEGORY_LABELS, productBySlug, productImage, categoryImage, type Category, type QA } from '~/data/products'
import { AREAS } from '~/data/areas'
import { t, lp, type Lang } from '~/lib/i18n'

export const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1z" />
  </svg>
)
export const WaIcon = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.5l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1.1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.2-.3-.2-.5-.3z" />
  </svg>
)

export function CallBtn({ lang, big, label }: { lang: Lang; big?: boolean; label?: string }) {
  return (
    <a href={tel} className={`btn btn-call${big ? ' btn-lg' : ''}`} data-track="call">
      <PhoneIcon /> {label ?? `${t(lang).call}: ${SITE.phoneDisplay}`}
    </a>
  )
}

export function WaBtn({ lang, msg, big, label }: { lang: Lang; msg: string; big?: boolean; label?: string }) {
  return (
    <a href={waLink(msg)} className={`btn btn-wa${big ? ' btn-lg' : ''}`} target="_blank" rel="noopener" data-track="whatsapp">
      <WaIcon /> {label ?? t(lang).whatsapp}
    </a>
  )
}

export function CtaBox({ lang, title, msg, children }: { lang: Lang; title?: string; msg: string; children?: ReactNode }) {
  const s = t(lang)
  return (
    <div className="cta-box">
      <h2>{title ?? s.getRate}</h2>
      {children ?? (
        <p>
          {lang === 'ta'
            ? 'விலை தினமும் மாறும். ஒரே அழைப்பில் இன்றைய விலையும் டெலிவரி கட்டணமும் தெரிந்துகொள்ளுங்கள்.'
            : 'Prices change daily. One call gets you today\'s rate and the delivery charge to your site.'}
        </p>
      )}
      <p>
        <a className="phone" href={tel} data-track="call">
          📞 {SITE.phoneDisplay}
        </a>
      </p>
      <div className="cta-row">
        <CallBtn lang={lang} big label={s.call} />
        <WaBtn lang={lang} msg={msg} big label={`${s.whatsapp} ${lang === 'ta' ? 'செய்ய' : 'Us'}`} />
        <a className="btn btn-outline btn-lg" href="#enquiry">
          {s.enquiry}
        </a>
      </div>
    </div>
  )
}

export function Breadcrumbs({ items, bare }: { items: { name: string; path: string }[]; bare?: boolean }) {
  return (
    <nav className={bare ? 'breadcrumbs' : 'breadcrumbs wrap'} aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.path}>{i === items.length - 1 ? <span aria-current="page">{it.name}</span> : <Link to={it.path as any}>{it.name}</Link>}</li>
        ))}
      </ol>
    </nav>
  )
}

export function FaqList({ faqs, lang }: { faqs: QA[]; lang: Lang }) {
  return (
    <section>
      <h2>{t(lang).faqs}</h2>
      {faqs.map((f) => (
        <details className="faq" key={f.q}>
          <summary>{f.q}</summary>
          <div>
            <p>{f.a}</p>
          </div>
        </details>
      ))}
    </section>
  )
}

export function Img({ src, alt, w, h, eager, className }: { src: string; alt: string; w: number; h: number; eager?: boolean; className?: string }) {
  return (
    <img
      src={src}
      alt={alt}
      width={w}
      height={h}
      className={className}
      loading={eager ? 'eager' : 'lazy'}
      decoding={eager ? 'sync' : 'async'}
      {...(eager ? { fetchPriority: 'high' as const } : {})}
    />
  )
}

export function ProductCard({ slug, lang, area }: { slug: string; lang: Lang; area?: string }) {
  const p = productBySlug(slug)!
  const name = lang === 'ta' ? p.nameTa : p.name
  const where = area ?? (lang === 'ta' ? 'செங்கல்பட்டு' : 'Chengalpattu')
  const href = lp(lang, `/products/${p.slug}`)
  const msg =
    lang === 'ta'
      ? `வணக்கம் KVM Agencies, எனக்கு ${p.nameTa} தேவை. இடம்: ${where}. இன்றைய விலை சொல்லவும்.`
      : `Hi KVM Agencies, I need ${p.name} at ${where}. Please share today's rate.`
  return (
    <div className="card">
      <Link to={href as any} className="thumb" tabIndex={-1} aria-hidden="true">
        <Img src={productImage(p.slug)} alt={`${p.name} supplier in ${where} – KVM Agencies`} w={800} h={600} />
      </Link>
      <div className="body">
        <h3>
          <Link to={href as any}>{name}</Link>
        </h3>
        <p>{lang === 'ta' ? p.shortTa : p.short}</p>
        <span className="rate">{lang === 'ta' ? 'இன்றைய விலைக்கு அழைக்கவும்' : "Call for today's rate"}</span>
        <div className="card-cta">
          <a href={tel} className="btn btn-call" data-track="call">
            <PhoneIcon /> {t(lang).call}
          </a>
          <a href={waLink(msg)} className="btn btn-wa" target="_blank" rel="noopener" data-track="whatsapp">
            <WaIcon /> {t(lang).whatsapp}
          </a>
        </div>
      </div>
    </div>
  )
}

export function ProductGroups({ lang, area }: { lang: Lang; area?: string }) {
  return (
    <>
      {PRODUCT_GROUPS.map((g) => (
        <div key={g.category} id={g.category}>
          <h3 style={{ marginTop: '1.6em' }}>{lang === 'ta' ? CATEGORY_LABELS[g.category].ta : CATEGORY_LABELS[g.category].en}</h3>
          <div className="grid">
            {g.slugs.map((s) => (
              <ProductCard key={s} slug={s} lang={lang} area={area} />
            ))}
          </div>
        </div>
      ))}
    </>
  )
}

const CAT_LINK: Record<Category, string> = {
  cement: '/products/cement',
  sand: '/products/m-sand',
  aggregate: '/products/jally-blue-metal',
  bricks: '/products/chamber-bricks',
  blocks: '/products/hollow-blocks',
  steel: '/products/tmt-steel',
  wire: '/products/binding-wire',
}

export function CategoryGrid({ lang }: { lang: Lang }) {
  return (
    <div className="grid-cats">
      {(Object.keys(CATEGORY_LABELS) as Category[]).map((c) => (
        <Link key={c} to={lp(lang, CAT_LINK[c]) as any} className="cat">
          <Img src={categoryImage(c)} alt={`${CATEGORY_LABELS[c].en} supplier in Chengalpattu`} w={600} h={450} />
          <span>{lang === 'ta' ? CATEGORY_LABELS[c].ta : CATEGORY_LABELS[c].en}</span>
        </Link>
      ))}
    </div>
  )
}

export function PageHero({ image, alt, children }: { image: string; alt: string; children: ReactNode }) {
  return (
    <div className="page-hero">
      <Img src={image} alt={alt} w={1600} h={800} eager />
      <div className="wrap">{children}</div>
    </div>
  )
}

export function AreaChips({ lang, slugs }: { lang: Lang; slugs?: string[] }) {
  const list = slugs ? AREAS.filter((a) => slugs.includes(a.slug)) : AREAS
  return (
    <ul className="chips">
      {list.map((a) => (
        <li key={a.slug}>
          <Link to={lp(lang, `/areas/${a.slug}`) as any}>{lang === 'ta' ? a.nameTa : a.name}</Link>
        </li>
      ))}
    </ul>
  )
}

export function WhyUs({ lang }: { lang: Lang }) {
  const items =
    lang === 'ta'
      ? [
          ['★', '2002 முதல்', '20+ ஆண்டுகள் அனுபவம் – செங்கல்பட்டில் நம்பகமான பெயர்.'],
          ['▦', 'அனைத்தும் ஒரே இடத்தில்', 'சிமெண்ட், மணல், ஜல்லி, செங்கல், பிளாக், கம்பி – ஒரே அழைப்பு, ஒரே பில்.'],
          ['➜', 'சைட் டெலிவரி', 'செங்கல்பட்டு மாவட்டம் முழுவதும். மொத்த ஆர்டருக்கு குறைந்த போக்குவரத்து கட்டணம்.'],
          ['₹', 'GST பில்', 'சரியான GST இன்வாய்ஸ் (GSTIN 33BAZPM1036Q1Z1).'],
          ['✎', 'தொழில்நுட்ப ஆலோசனை', 'சரியான கிரேடு, அளவு தேர்வு செய்ய இலவச ஆலோசனை.'],
          ['☎', 'ஞாயிறும் தொடர்பு', 'ஞாயிறு கடை விடுமுறை – ஆனால் போன் / WhatsApp பதில் உண்டு.'],
        ]
      : [
          ['★', 'Since 2002', '20+ years supplying building materials in Chengalpattu – a name builders and masons trust.'],
          ['▦', 'Everything in one place', 'Cement, sand, jally, bricks, blocks, steel and binding wire – one call, one bill.'],
          ['➜', 'Site delivery', 'Delivery across Chengalpattu district. Bulk orders get reduced transport charges.'],
          ['₹', 'Proper GST bill', 'GST invoice for every order (GSTIN 33BAZPM1036Q1Z1) – useful for home loans.'],
          ['✎', 'Free technical advice', 'Our Technical Advisor helps you pick the right grade, size and quantity.'],
          ['☎', 'Reachable on Sunday', 'Shop closed on Sunday, but phone & WhatsApp enquiries are answered.'],
        ]
  return (
    <section>
      <h2>{t(lang).whyUs}</h2>
      <div className="grid">
        {items.map(([i, h, p]) => (
          <div className="feature" key={h}>
            <h3>
              <i aria-hidden="true">{i}</i> {h}
            </h3>
            <p>{p}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export function MapEmbed({ title }: { title: string }) {
  return (
    <iframe
      className="map"
      title={title}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.mapsEmbedQuery)}&z=15&output=embed`}
    />
  )
}

export function NapBlock({ lang }: { lang: Lang }) {
  const s = t(lang)
  return (
    <div className="box">
      <h3 style={{ marginTop: 0 }}>{SITE.name}</h3>
      <p>
        <strong>{s.address}:</strong>{' '}
        {lang === 'ta'
          ? SITE.addressTa
          : `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`}
      </p>
      <p>
        <strong>{s.call}:</strong>{' '}
        <a href={tel} data-track="call">
          {SITE.phoneDisplay}
        </a>{' '}
        · <strong>Email:</strong> <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
      </p>
      <p>
        <strong>{s.hours}:</strong> {lang === 'ta' ? SITE.hours.textTa : SITE.hours.text}
      </p>
      <p>
        <a href={SITE.mapsShareUrl} target="_blank" rel="noopener">
          📍 {s.directions} (Google Maps)
        </a>
      </p>
    </div>
  )
}

const MATERIAL_OPTIONS = [
  'Cement',
  'M Sand',
  'P Sand',
  'Jally / Blue Metal',
  'Chamber Bricks',
  'Wire Cut Bricks',
  'Hollow Blocks',
  'AAC Blocks',
  'TMT Steel (MCR / ARS)',
  'Binding Wire',
  'Multiple materials',
]

export function EnquiryForm({ lang, defaultMaterial, defaultArea }: { lang: Lang; defaultMaterial?: string; defaultArea?: string }) {
  const s = t(lang)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [waMsg, setWaMsg] = useState('')

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const fd = new FormData(form)
    if (fd.get('_honey')) return
    const data = Object.fromEntries(fd.entries()) as Record<string, string>
    const msg = `Hi KVM Agencies, I am ${data.name} (${data.phone}). I need ${data.material}${data.quantity ? ` – ${data.quantity}` : ''} at ${data.location}. ${data.message ?? ''}`.trim()
    setWaMsg(msg)
    setStatus('sending')
    try {
      // Form-encoded body + only CORS-safelisted headers = no preflight request (FormSubmit rejects preflights)
      const body = new URLSearchParams({
        ...data,
        page: typeof window !== 'undefined' ? window.location.href : '',
        _subject: `New enquiry: ${data.material} – ${data.location} (${data.name})`,
        _template: 'table',
        _captcha: 'false',
      })
      try {
        const res = await fetch(SITE.formEndpoint, { method: 'POST', headers: { Accept: 'application/json' }, body })
        if (!res.ok) throw new Error(String(res.status))
      } catch (err) {
        // Response not readable (CORS) – send again without reading the reply; FormSubmit still delivers the email
        if (err instanceof TypeError) await fetch(SITE.formEndpoint, { method: 'POST', mode: 'no-cors', body })
        else throw err
      }
      setStatus('sent')
      ;((window as any).dataLayer = (window as any).dataLayer || []).push({ event: 'generate_lead', method: 'form', material: data.material, location: data.location })
      ;(window as any).gtag?.('event', 'generate_lead', { method: 'form', material: data.material, location: data.location })
      form.reset()
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="enquiry" className="box">
      <h2 style={{ marginTop: 0 }}>{s.enquiryTitle}</h2>
      <p>{s.enquiryNote}</p>
      <form className="enquiry" onSubmit={onSubmit}>
        <input className="hp" type="text" name="_honey" tabIndex={-1} autoComplete="off" aria-hidden="true" />
        <label>
          {s.name} *
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          {s.phone} *
          <input name="phone" type="tel" required pattern="[0-9+ ]{10,15}" autoComplete="tel" inputMode="tel" />
        </label>
        <label>
          {s.location} *
          <input name="location" required list="area-list" defaultValue={defaultArea} />
          <datalist id="area-list">
            {AREAS.map((a) => (
              <option key={a.slug} value={a.name} />
            ))}
          </datalist>
        </label>
        <label>
          {s.material} *
          <select name="material" required defaultValue={defaultMaterial ?? ''}>
            <option value="" disabled>
              —
            </option>
            {MATERIAL_OPTIONS.map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </label>
        <label>
          {s.quantity}
          <input name="quantity" placeholder={lang === 'ta' ? 'உ.தா: 100 மூட்டை / 2 யூனிட்' : 'e.g. 100 bags / 2 units / 1 tonne'} />
        </label>
        <label className="full">
          {s.message}
          <textarea name="message" rows={3} />
        </label>
        <button className="btn btn-call btn-lg" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? s.sending : s.submit}
        </button>
        {status === 'sent' && <p className="form-status">✅ {s.sent}</p>}
        {status === 'error' && <p className="form-status">⚠️ {s.sendFail}</p>}
        {(status === 'sent' || status === 'error') && waMsg && (
          <a className="btn btn-wa" href={waLink(waMsg)} target="_blank" rel="noopener" data-track="whatsapp">
            <WaIcon /> {s.alsoWa}
          </a>
        )}
      </form>
    </section>
  )
}

const Ico = {
  clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 6h11v9H3zM14 9h4l3 3v3h-7" /><circle cx="7" cy="17" r="2" /><circle cx="17" cy="17" r="2" /></svg>,
  headset: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M4 14v-2a8 8 0 0 1 16 0v2" /><rect x="3" y="14" width="4" height="6" rx="1" /><rect x="17" y="14" width="4" height="6" rx="1" /></svg>,
  pin: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M12 21s7-6 7-11a7 7 0 1 0-14 0c0 5 7 11 7 11z" /><circle cx="12" cy="10" r="2.5" /></svg>,
  calc: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 12h2M12 12h2M8 16h2M12 16h2M16 12v4" /></svg>,
  box: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d="M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10" /></svg>,
}
export { Ico }

export function Header({ lang, altPath }: { lang: Lang; altPath: string }) {
  const s = t(lang)
  const ta = lang === 'ta'
  const cats: [string, string][] = [
    [lp(lang, '/products/cement'), ta ? 'சிமெண்ட்' : 'Cement'],
    [lp(lang, '/products/m-sand'), ta ? 'எம் சாண்ட்' : 'M Sand'],
    [lp(lang, '/products/p-sand'), ta ? 'பி சாண்ட்' : 'P Sand'],
    [lp(lang, '/products/jally-blue-metal'), ta ? 'ஜல்லி' : 'Jally'],
    [lp(lang, '/products/chamber-bricks'), ta ? 'செங்கல்' : 'Bricks'],
    [lp(lang, '/products/aac-blocks'), ta ? 'AAC பிளாக்' : 'AAC Blocks'],
    [lp(lang, '/products/hollow-blocks'), ta ? 'ஹாலோ பிளாக்' : 'Hollow Blocks'],
    [lp(lang, '/products/tmt-steel'), ta ? 'TMT கம்பி' : 'TMT Steel'],
    [lp(lang, '/products/binding-wire'), ta ? 'கட்டு கம்பி' : 'Binding Wire'],
    [lp(lang, '/areas'), s.areas],
    [lp(lang, '/blog'), s.blog],
    [lp(lang, '/about'), s.about],
    [lp(lang, '/contact'), s.contact],
  ]
  const mobileLinks: [string, string][] = [
    [lp(lang, '/'), s.home],
    [lp(lang, '/products'), s.products],
    [lp(lang, '/areas'), s.areas],
    ['/material-calculator', s.calculator],
    ['/bulk-orders', s.bulk],
    [lp(lang, '/blog'), s.blog],
    [lp(lang, '/about'), s.about],
    [lp(lang, '/contact'), s.contact],
  ]
  return (
    <>
      <div className="topbar">
        <div className="wrap">
          <div className="left">
            <div className="ti hide-sm">
              {Ico.clock}
              <span>
                <b>{ta ? 'திங்கள்–சனி 9AM–7PM' : 'Mon–Sat 9 AM – 7 PM'}</b>
                <small>{ta ? 'ஞாயிறு: போன் / WhatsApp' : 'Sunday: call / WhatsApp'}</small>
              </span>
            </div>
            <div className="ti hide-md">
              {Ico.truck}
              <span>
                <b>{ta ? 'சைட் டெலிவரி' : 'Site Delivery'}</b>
                <small>{ta ? 'செங்கல்பட்டு மாவட்டம் முழுவதும்' : 'Across Chengalpattu district'}</small>
              </span>
            </div>
            <div className="ti">
              {Ico.headset}
              <span>
                <b>
                  <a href={tel} data-track="call">
                    {SITE.phoneDisplay}
                  </a>
                </b>
                <small>
                  <a href={waLink(ta ? 'வணக்கம் KVM Agencies, இன்றைய விலை தேவை.' : "Hi KVM Agencies, I need today's rate.")} target="_blank" rel="noopener" data-track="whatsapp">
                    {ta ? 'அழைக்க / WhatsApp' : 'Call / WhatsApp'}
                  </a>
                </small>
              </span>
            </div>
          </div>
          <div className="right">
            <div className="ti hide-md">
              {Ico.pin}
              <span>
                <small>{ta ? 'எங்கள் கடை' : 'Visit our yard'}</small>
                <b>{ta ? 'நத்தம், செங்கல்பட்டு' : 'Natham, Chengalpattu'}</b>
              </span>
            </div>
            <a className="lang" href={altPath} hrefLang={ta ? 'en' : 'ta'}>
              {s.langSwitch}
            </a>
          </div>
        </div>
      </div>
      <header className="header">
        <div className="wrap bar">
          <Link to={lp(lang, '/') as any} className="brand">
            <img src="/logo.png" width="48" height="48" alt="KVM Agencies logo" />
            <span>
              <strong>
                 <span>KVM Agencies</span>
              </strong>
              <small>{ta ? 'கட்டுமானப் பொருட்கள் · செங்கல்பட்டு' : 'Construction Materials · Chengalpattu'}</small>
            </span>
          </Link>
          <div className="header-actions">
            <Link to="/material-calculator" className="hbox calc">
              {Ico.calc}
              <span>
                <b>{s.calculator}</b>
                <small>{ta ? 'அளவு கணக்கிட' : 'Estimate your build'}</small>
              </span>
            </Link>
            <Link to="/bulk-orders" className="hbox">
              {Ico.box}
              <span>
                <b>{s.bulk}</b>
                <small>{ta ? 'கொட்டேஷன் பெற' : 'Get a quote'}</small>
              </span>
            </Link>
            <a href={tel} className="btn btn-call" data-track="call">
              <PhoneIcon /> {s.getRate}
            </a>
            <details className="menu">
              <summary>☰ {ta ? 'மெனு' : 'Menu'}</summary>
              <nav aria-label="Mobile">
                {mobileLinks.map(([to, label]) => (
                  <Link key={to} to={to as any}>
                    {label}
                  </Link>
                ))}
                <a href={altPath} hrefLang={ta ? 'en' : 'ta'}>
                  {s.langSwitch}
                </a>
              </nav>
            </details>
          </div>
        </div>
        <nav className="catnav" aria-label="Main">
          <div className="wrap">
            {cats.map(([to, label]) => (
              <Link key={to} to={to as any}>
                {label}
              </Link>
            ))}
          </div>
        </nav>
      </header>
    </>
  )
}

const SOCIAL_LABELS: [keyof typeof SITE.social, string][] = [
  ['instagram', 'Instagram'],
  ['youtube', 'YouTube'],
  ['facebook', 'Facebook'],
  ['linkedin', 'LinkedIn'],
  ['justdial', 'Justdial'],
  ['indiamart', 'IndiaMART'],
]

export function Footer({ lang }: { lang: Lang }) {
  const s = t(lang)
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <div className="brand" style={{ marginBottom: 12 }}>
              <img src="/logo.png" width="44" height="44" alt="" />
              <span>
                <strong>
                  KVM <span>Agencies</span>
                </strong>
              </span>
            </div>
            <p>{lang === 'ta' ? 'செங்கல்பட்டில் 2002 முதல் கட்டுமானப் பொருட்கள் விநியோகஸ்தர்.' : 'Construction raw material supplier in Chengalpattu since 2002.'}</p>
            <address style={{ fontStyle: 'normal', lineHeight: 1.8 }}>
              {lang === 'ta' ? SITE.addressTa : `${SITE.address.street}, ${SITE.address.locality}, ${SITE.address.city}, ${SITE.address.region} ${SITE.address.postalCode}`}
              <br />
              📞{' '}
              <a href={tel} data-track="call">
                {SITE.phoneDisplay}
              </a>
              <br />
              ✉️ <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
              <br />
              🕘 {lang === 'ta' ? 'திங்கள்–சனி 9AM–7PM' : 'Mon–Sat 9 AM – 7 PM'}
            </address>
            <p style={{ marginTop: 10 }}>
              <a href={SITE.mapsShareUrl} target="_blank" rel="noopener">
                📍 Google Maps
              </a>
            </p>
          </div>
          <div>
            <h3>{s.products}</h3>
            <ul>
              {PRODUCTS.filter((p) => !['acc-cement', 'maha-cement', 'adani-cement', 'ars-tmt-steel', 'mcr-tmt-steel'].includes(p.slug)).map((p) => (
                <li key={p.slug}>
                  <Link to={lp(lang, `/products/${p.slug}`) as any}>{lang === 'ta' ? p.nameTa : p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{s.areas}</h3>
            <ul>
              {AREAS.map((a) => (
                <li key={a.slug}>
                  <Link to={lp(lang, `/areas/${a.slug}`) as any}>{lang === 'ta' ? a.nameTa : a.name}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3>{lang === 'ta' ? 'பயனுள்ள இணைப்புகள்' : 'Useful links'}</h3>
            <ul>
              <li>
                <Link to="/material-calculator">{s.calculator}</Link>
              </li>
              <li>
                <Link to="/bulk-orders">{s.bulk}</Link>
              </li>
              <li>
                <Link to="/faq">{s.faq}</Link>
              </li>
              <li>
                <Link to={lp(lang, '/blog') as any}>{s.blog}</Link>
              </li>
              <li>
                <Link to={lp(lang, '/about') as any}>{s.about}</Link>
              </li>
              <li>
                <Link to={lp(lang, '/contact') as any}>{s.contact}</Link>
              </li>
              <li>
                <Link to="/privacy-policy">Privacy Policy</Link>
              </li>
            </ul>
            <h3 style={{ marginTop: 18 }}>Follow us</h3>
            <ul>
              {SOCIAL_LABELS.filter(([k]) => SITE.social[k]).map(([k, label]) => (
                <li key={k}>
                  <a href={SITE.social[k]} target="_blank" rel="noopener me">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="legal">
          <span>
            © {SITE.foundingYear}–{year} {SITE.name}, Chengalpattu. GSTIN: {SITE.gstin}. Formerly online as kvmcmart.in. Prices are indicative only — call for today's rate.
          </span>
          <span className="credit">
  Designed and Developed by{' '}
  <a
    href="https://adszoo.in"
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: '#F97316',
      fontWeight: 700,
      textDecoration: 'none',
      transition: 'color 0.2s ease',
    }}
  >
    Adszoo
  </a>
</span>
        </div>
      </div>
    </footer>
  )
}

export function ActionBar({ lang }: { lang: Lang }) {
  const s = t(lang)
  return (
    <div className="action-bar" role="region" aria-label="Quick contact">
      <a className="ab-call" href={tel} data-track="call">
        <PhoneIcon /> {s.call}
      </a>
      <a
        className="ab-wa"
        href={waLink(lang === 'ta' ? 'வணக்கம் KVM Agencies, கட்டுமானப் பொருட்கள் இன்றைய விலை தேவை.' : "Hi KVM Agencies, I need today's rate for construction materials.")}
        target="_blank"
        rel="noopener"
        data-track="whatsapp"
      >
        <WaIcon /> {s.whatsapp}
      </a>
      <a className="ab-enq" href="#enquiry">
        ✉ {s.enquiry}
      </a>
    </div>
  )
}
