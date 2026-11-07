import { Link, notFound } from '@tanstack/react-router'
import { PRODUCTS, PRODUCT_GROUPS, CATEGORY_LABELS, productBySlug, productImage } from '~/data/products'
import { AREAS } from '~/data/areas'
import { POSTS } from '~/data/blog'
import { t, lp, type Lang } from '~/lib/i18n'
import { seo } from '~/lib/seo'
import { breadcrumbSchema, faqSchema, serviceSchema, webPageSchema } from '~/lib/schema'
import { Breadcrumbs, CallBtn, WaBtn, CtaBox, FaqList, ProductCard, ProductGroups, AreaChips, Img, PageHero } from '~/components/ui'

// ───────────── Products hub ─────────────
export function productsHead(lang: Lang) {
  const en = lang === 'en'
  const path = lp(lang, '/products')
  const title = en
    ? 'Construction Materials Price List Chengalpattu | Cement, Sand, Jally, Steel'
    : 'கட்டுமானப் பொருட்கள் – சிமெண்ட், மணல், ஜல்லி, கம்பி | செங்கல்பட்டு'
  const description = en
    ? 'Cement (6 brands), M Sand, P Sand, jally, bricks, hollow & AAC blocks, MCR & ARS TMT steel and binding wire in Chengalpattu. Call 91507 51905 for today\'s rates.'
    : 'செங்கல்பட்டில் அனைத்து கட்டுமானப் பொருட்களும் – சிமெண்ட், எம் சாண்ட், பி சாண்ட், ஜல்லி, செங்கல், பிளாக், TMT கம்பி. இன்றைய விலைக்கு 91507 51905.'
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: '/products', ta: '/ta/products' },
    jsonLd: [
      webPageSchema({ path, name: title, description, lang, type: 'CollectionPage' }),
      breadcrumbSchema([
        { name: t(lang).home, path: lp(lang, '/') },
        { name: t(lang).products, path },
      ]),
      {
        '@context': 'https://schema.org',
        '@type': 'ItemList',
        itemListElement: PRODUCTS.map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: en ? p.name : p.nameTa,
          url: `https://kvmagencies.in${lp(lang, `/products/${p.slug}`)}`,
        })),
      },
    ],
  })
}

export function ProductsPage({ lang }: { lang: Lang }) {
  const s = t(lang)
  const en = lang === 'en'
  return (
    <>
      <PageHero image="/images/hero/yard.jpg" alt="Construction materials stock at KVM Agencies yard, Chengalpattu">
        <Breadcrumbs bare items={[{ name: s.home, path: lp(lang, '/') }, { name: s.products, path: lp(lang, '/products') }]} />
        <h1>{en ? 'Construction Materials in Chengalpattu – Today\'s Rate on Call' : 'செங்கல்பட்டில் கட்டுமானப் பொருட்கள் – இன்றைய விலைக்கு அழைக்கவும்'}</h1>
        <p>
          {en
            ? 'Every material you need to build — from foundation to plastering — supplied from one yard in Chengalpattu. Rates for cement, sand, jally and steel change almost daily, so call or WhatsApp us for today\'s price with delivery to your site.'
            : 'அடித்தளம் முதல் பூச்சு வரை தேவையான அனைத்து பொருட்களும் செங்கல்பட்டில் ஒரே இடத்தில். விலை தினமும் மாறும் – டெலிவரியுடன் இன்றைய விலைக்கு அழைக்கவும்.'}
        </p>
        <div className="cta-row">
          <CallBtn lang={lang} big />
          <WaBtn lang={lang} big msg={en ? "Hi KVM Agencies, please share today's price list." : 'வணக்கம் KVM Agencies, இன்றைய விலைப்பட்டியல் தேவை.'} />
        </div>
      </PageHero>
      <div className="wrap">
        <ProductGroups lang={lang} />
        <h2>{en ? 'How our pricing works' : 'விலை எப்படி?'}</h2>
        <table>
          <thead>
            <tr>
              <th>{en ? 'Material' : 'பொருள்'}</th>
              <th>{en ? 'Sold by' : 'அளவு'}</th>
              <th>{en ? 'Price' : 'விலை'}</th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.filter((p) => !['ultratech-cement', 'dalmia-cement', 'acc-cement', 'maha-cement', 'adani-cement', 'ramco-cement', 'mcr-tmt-steel', 'ars-tmt-steel'].includes(p.slug)).map((p) => (
              <tr key={p.slug}>
                <td>
                  <Link to={lp(lang, `/products/${p.slug}`) as any}>{en ? p.name : p.nameTa}</Link>
                </td>
                <td>{en ? p.unit : p.unitTa}</td>
                <td>{s.callForRate}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <CtaBox lang={lang} msg={en ? "Hi KVM Agencies, please share today's price list." : 'வணக்கம் KVM Agencies, இன்றைய விலைப்பட்டியல் தேவை.'} />
      </div>
    </>
  )
}

// ───────────── Product detail ─────────────
export function loadProduct(slug: string) {
  const p = productBySlug(slug)
  if (!p) throw notFound()
  return p
}

export function productHead(lang: Lang, slug: string) {
  const p = productBySlug(slug)
  if (!p) return {}
  const en = lang === 'en'
  const path = lp(lang, `/products/${p.slug}`)
  const title = en ? p.title : `${p.h1Ta} | KVM Agencies`
  const description = en ? p.metaDescription : `${p.metaDescriptionTa} GST பில், சைட் டெலிவரி – KVM Agencies, நத்தம், செங்கல்பட்டு.`
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: `/products/${p.slug}`, ta: `/ta/products/${p.slug}` },
    jsonLd: [
      webPageSchema({ path, name: title, description, lang }),
      breadcrumbSchema([
        { name: t(lang).home, path: lp(lang, '/') },
        { name: t(lang).products, path: lp(lang, '/products') },
        { name: en ? p.name : p.nameTa, path },
      ]),
      serviceSchema({
        name: `${p.name} supply in Chengalpattu`,
        description: p.metaDescription,
        path,
        areaServed: AREAS.map((a) => a.name),
        category: CATEGORY_LABELS[p.category].en,
        image: productImage(p.slug),
      }),
      faqSchema(en ? p.faqs : p.faqsTa),
    ],
  })
}

export function ProductPage({ lang, slug }: { lang: Lang; slug: string }) {
  const p = productBySlug(slug)!
  const s = t(lang)
  const en = lang === 'en'
  const name = en ? p.name : p.nameTa
  const waMsg = en ? `Hi KVM Agencies, I need ${p.name}. Please share today's rate and delivery charge to my site.` : `வணக்கம் KVM Agencies, எனக்கு ${p.nameTa} தேவை. இன்றைய விலை மற்றும் டெலிவரி கட்டணம் சொல்லவும்.`
  const guides = POSTS.filter((x) => x.lang === lang && x.products.includes(p.slug)).slice(0, 4)
  const group = PRODUCT_GROUPS.find((g) => g.category === p.category)!
  const siblings = group.slugs.filter((x) => x !== p.slug)
  return (
    <>
      <Breadcrumbs
        items={[
          { name: s.home, path: lp(lang, '/') },
          { name: s.products, path: lp(lang, '/products') },
          { name, path: lp(lang, `/products/${p.slug}`) },
        ]}
      />
      <div className="wrap">
        <div className="two-col">
          <article>
            <h1>{en ? p.h1 : p.h1Ta}</h1>
            <p className="answer">
              <strong>{s.quickAnswer}</strong>
              {en
                ? `KVM Agencies supplies ${p.name} in Chengalpattu and nearby areas (${p.unit}). ${p.short} Price changes daily — call or WhatsApp +91 91507 51905 for today's rate with site delivery.`
                : `KVM Agencies செங்கல்பட்டு மற்றும் சுற்றுப்பகுதிகளில் ${p.nameTa} விநியோகம் செய்கிறது (${p.unitTa}). ${p.shortTa} இன்றைய விலைக்கு 91507 51905 அழைக்கவும் / WhatsApp செய்யவும்.`}
            </p>
            <div className="cta-row">
              <CallBtn lang={lang} big />
              <WaBtn lang={lang} big msg={waMsg} label={`${s.whatsapp} – ${s.getRate}`} />
            </div>
            <figure className="product-img">
              <Img src={productImage(p.slug)} alt={`${p.name} – ${p.short}`} w={800} h={600} eager />
            </figure>
            <div className="prose">
              {(en ? p.intro : p.introTa).map((html, i) => (
                <p key={i} dangerouslySetInnerHTML={{ __html: html }} />
              ))}
            </div>

            <h2>{s.specs}</h2>
            <table className="spec">
              <tbody>
                {p.specs.map(([k, v]) => (
                  <tr key={k}>
                    <th scope="row">{k}</th>
                    <td>{v}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h2>{s.uses}</h2>
            <ul>
              {(en ? p.uses : p.usesTa).map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>

            {en && (
              <>
                <h2>{s.tips}</h2>
                <ul>
                  {p.tips.map((u) => (
                    <li key={u}>{u}</li>
                  ))}
                </ul>
              </>
            )}

            <CtaBox lang={lang} msg={waMsg} title={en ? `Get today's ${p.name} rate` : `இன்றைய ${p.nameTa} விலை`} />

            <FaqList lang={lang} faqs={en ? p.faqs : p.faqsTa} />

            <h2>
              {s.deliveryTo} – {name}
            </h2>
            <p>
              {en
                ? `We deliver ${p.name} from our Natham, Chengalpattu yard to these areas. Bulk orders get reduced transport charges.`
                : `${p.nameTa} எங்கள் நத்தம், செங்கல்பட்டு கடையிலிருந்து இந்த பகுதிகளுக்கு டெலிவரி செய்யப்படும்.`}
            </p>
            <AreaChips lang={lang} />

            {guides.length > 0 && (
              <>
                <h2>{en ? 'Helpful guides' : 'பயனுள்ள கட்டுரைகள்'}</h2>
                <ul>
                  {guides.map((g) => (
                    <li key={g.slug}>
                      <Link to={lp(lang, `/blog/${g.slug}`) as any}>{g.title}</Link>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </article>
          <aside className="side">
            <div className="box">
              <h3 style={{ marginTop: 0 }}>{name}</h3>
              <p>
                <strong>{en ? 'Unit' : 'அளவு'}:</strong> {en ? p.unit : p.unitTa}
                <br />
                <strong>{en ? 'Price' : 'விலை'}:</strong> {s.callForRate}
              </p>
              <div className="cta-row" style={{ flexDirection: 'column' }}>
                <CallBtn lang={lang} />
                <WaBtn lang={lang} msg={waMsg} />
              </div>
            </div>
            {siblings.length > 0 && (
              <div className="box">
                <h3 style={{ marginTop: 0 }}>{en ? CATEGORY_LABELS[p.category].en : CATEGORY_LABELS[p.category].ta}</h3>
                <ul>
                  {siblings.map((x) => {
                    const sp = productBySlug(x)!
                    return (
                      <li key={x}>
                        <Link to={lp(lang, `/products/${x}`) as any}>{en ? sp.name : sp.nameTa}</Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </aside>
        </div>

        <h2>{s.related}</h2>
        <div className="grid">
          {p.related.map((r) => (
            <ProductCard key={r} slug={r} lang={lang} />
          ))}
        </div>
      </div>
    </>
  )
}
