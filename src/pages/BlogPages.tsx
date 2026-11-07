import { Link, notFound } from '@tanstack/react-router'
import { postBySlug, postsByLang, readingMinutes, postImage } from '~/data/blog'
import { authorBySlug, authorImage, AUTHORS } from '~/data/authors'
import { t, lp, type Lang } from '~/lib/i18n'
import { abs, seo } from '~/lib/seo'
import { BUSINESS_ID, breadcrumbSchema, faqSchema, personId, personSchema, webPageSchema } from '~/lib/schema'
import { Breadcrumbs, CtaBox, FaqList, ProductCard, Img } from '~/components/ui'

const fmt = (d: string, lang: Lang) =>
  new Date(d + 'T00:00:00Z').toLocaleDateString(lang === 'ta' ? 'ta-IN' : 'en-IN', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })

// ───────────── Blog index ─────────────
export function blogHead(lang: Lang) {
  const en = lang === 'en'
  const path = lp(lang, '/blog')
  const title = en ? 'Construction Material Guides – Cement, Sand, Steel, Bricks | KVM Agencies Blog' : 'கட்டுமான வழிகாட்டிகள் – சிமெண்ட், மணல், கம்பி | KVM Agencies'
  const description = en
    ? 'Practical guides on cement, M Sand, jally, bricks, blocks and TMT steel for home builders in Chengalpattu – written by Naveen M R and Technical Advisor Kailash.'
    : 'வீடு கட்டுபவர்களுக்கான எளிய தமிழ் வழிகாட்டிகள் – சிமெண்ட், மணல், ஜல்லி, கம்பி.'
  return seo({
    title,
    description,
    path,
    lang,
    alternates: { en: '/blog', ta: '/ta/blog' },
    jsonLd: [
      webPageSchema({ path, name: title, description, lang, type: 'CollectionPage' }),
      breadcrumbSchema([
        { name: t(lang).home, path: lp(lang, '/') },
        { name: t(lang).blog, path },
      ]),
    ],
  })
}

export function BlogIndex({ lang }: { lang: Lang }) {
  const s = t(lang)
  const en = lang === 'en'
  const posts = postsByLang(lang)
  return (
    <>
      <Breadcrumbs items={[{ name: s.home, path: lp(lang, '/') }, { name: s.blog, path: lp(lang, '/blog') }]} />
      <div className="wrap">
        <h1>{en ? 'Construction Material Guides for Home Builders' : 'வீடு கட்டுபவர்களுக்கான வழிகாட்டிகள்'}</h1>
        <p>
          {en
            ? 'Simple, practical answers to the questions our customers ask every day — written from 20+ years of supplying building materials in Chengalpattu.'
            : 'எங்கள் வாடிக்கையாளர்கள் தினமும் கேட்கும் கேள்விகளுக்கு எளிய பதில்கள்.'}
        </p>
        <div className="grid">
          {posts.map((p) => {
            const a = authorBySlug(p.author)!
            return (
              <article className="card" key={p.slug}>
                <Link to={lp(lang, `/blog/${p.slug}`) as any} className="thumb wide" tabIndex={-1} aria-hidden="true">
                  <Img src={postImage(p)} alt={p.title} w={1200} h={630} />
                </Link>
                <div className="body">
                  <h2 style={{ fontSize: '1.08rem', margin: 0 }}>
                    <Link to={lp(lang, `/blog/${p.slug}`) as any}>{p.title}</Link>
                  </h2>
                  <p>{p.excerpt}</p>
                  <p className="meta byline" style={{ marginTop: 'auto', paddingTop: 8 }}>
                    <Img src={authorImage(a.slug)} alt={a.name} w={400} h={400} />
                    {en ? a.name : a.nameTa} · {readingMinutes(p.html)} min
                  </p>
                </div>
              </article>
            )
          })}
        </div>
        {!en && (
          <p>
            <Link to="/blog">English articles →</Link>
          </p>
        )}
      </div>
    </>
  )
}

// ───────────── Blog post ─────────────
export function loadPost(slug: string, lang: Lang) {
  const p = postBySlug(slug, lang)
  if (!p) throw notFound()
  return p
}

export function postHead(lang: Lang, slug: string) {
  const p = postBySlug(slug, lang)
  if (!p) return {}
  const path = lp(lang, `/blog/${p.slug}`)
  const author = authorBySlug(p.author)!
  const alternates = lang === 'en' ? { en: path, ta: p.translation ? `/ta/blog/${p.translation}` : undefined } : { en: p.translation ? `/blog/${p.translation}` : undefined, ta: path }
  return seo({
    title: p.title,
    description: p.metaDescription,
    path,
    lang,
    type: 'article',
    published: p.published,
    updated: p.updated,
    alternates: p.translation ? alternates : undefined,
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${abs(path)}#article`,
        mainEntityOfPage: abs(path),
        headline: p.title.slice(0, 110),
        description: p.metaDescription,
        abstract: p.answer,
        inLanguage: lang === 'ta' ? 'ta-IN' : 'en-IN',
        datePublished: p.published,
        dateModified: p.updated,
        author: personSchema(author),
        ...(p.reviewer ? { reviewedBy: { '@id': personId(p.reviewer) } } : {}),
        publisher: { '@id': BUSINESS_ID },
        image: abs(postImage(p)),
        isAccessibleForFree: true,
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['h1', '.answer'] },
      },
      breadcrumbSchema([
        { name: t(lang).home, path: lp(lang, '/') },
        { name: t(lang).blog, path: lp(lang, '/blog') },
        { name: p.title, path },
      ]),
      faqSchema(p.faqs),
    ],
  })
}

export function PostPage({ lang, slug }: { lang: Lang; slug: string }) {
  const p = postBySlug(slug, lang)!
  const s = t(lang)
  const en = lang === 'en'
  const author = authorBySlug(p.author)!
  const reviewer = p.reviewer ? authorBySlug(p.reviewer) : undefined
  const more = postsByLang(lang).filter((x) => x.slug !== p.slug).slice(0, 4)
  return (
    <>
      <Breadcrumbs
        items={[
          { name: s.home, path: lp(lang, '/') },
          { name: s.blog, path: lp(lang, '/blog') },
          { name: p.title, path: lp(lang, `/blog/${p.slug}`) },
        ]}
      />
      <div className="wrap narrow">
        <article>
          <h1>{p.title}</h1>
          <div className="meta byline">
            <Img src={authorImage(author.slug)} alt={author.name} w={400} h={400} />
            <p className="meta" style={{ margin: 0 }}>
            {s.by} <Link to={`/authors/${author.slug}` as any}>{en ? author.name : author.nameTa}</Link> ({en ? author.role : author.roleTa})
            {reviewer && (
              <>
                {' '}
                · {s.reviewedBy} <Link to={`/authors/${reviewer.slug}` as any}>{en ? reviewer.name : reviewer.nameTa}</Link>
              </>
            )}
            <br />
            {s.updated}: <time dateTime={p.updated}>{fmt(p.updated, lang)}</time> · {readingMinutes(p.html)} min
            </p>
          </div>
          <figure className="post-img">
            <Img src={postImage(p)} alt={p.title} w={1200} h={630} eager />
          </figure>
          <div className="answer">
            <strong>{s.quickAnswer}</strong>
            {p.answer}
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: p.html }} />
          <FaqList lang={lang} faqs={p.faqs} />
          <CtaBox lang={lang} msg={en ? `Hi KVM Agencies, I read "${p.title}" and need a quote.` : `வணக்கம் KVM Agencies, "${p.title}" படித்தேன். விலை தேவை.`} />
          <div className="box author-box">
            <Img src={authorImage(author.slug)} alt={author.name} w={400} h={400} className="avatar" />
            <div>
              <strong>
                <Link to={`/authors/${author.slug}` as any}>{en ? author.name : author.nameTa}</Link>
              </strong>{' '}
              – {en ? author.role : author.roleTa}
              <p style={{ margin: '4px 0 0' }}>{en ? author.bio : author.bioTa}</p>
            </div>
          </div>
        </article>
        <h2>{s.related}</h2>
        <div className="grid">
          {p.products.slice(0, 4).map((x) => (
            <ProductCard key={x} slug={x} lang={lang} />
          ))}
        </div>
        {more.length > 0 && (
          <>
            <h2>{en ? 'More guides' : 'மேலும் கட்டுரைகள்'}</h2>
            <ul>
              {more.map((m) => (
                <li key={m.slug}>
                  <Link to={lp(lang, `/blog/${m.slug}`) as any}>{m.title}</Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

// ───────────── Author ─────────────
export function authorHead(slug: string) {
  const a = authorBySlug(slug)
  if (!a) return {}
  const path = `/authors/${a.slug}`
  return seo({
    title: `${a.name} – ${a.role}`,
    description: a.bio.slice(0, 155),
    path,
    lang: 'en',
    jsonLd: [
      { '@context': 'https://schema.org', '@type': 'ProfilePage', mainEntity: personSchema(a), url: abs(path) },
      breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'About', path: '/about' },
        { name: a.name, path },
      ]),
    ],
  })
}

export function loadAuthor(slug: string) {
  const a = authorBySlug(slug)
  if (!a) throw notFound()
  return a
}

export function AuthorPage({ slug }: { slug: string }) {
  const a = authorBySlug(slug)!
  const posts = postsByLang('en').filter((p) => p.author === a.slug || p.reviewer === a.slug)
  return (
    <>
      <Breadcrumbs
        items={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
          { name: a.name, path: `/authors/${a.slug}` },
        ]}
      />
      <div className="wrap narrow">
        <div className="author-box">
          <Img src={authorImage(a.slug)} alt={`${a.name}, ${a.role}`} w={400} h={400} className="avatar avatar-lg" eager />
          <div>
            <h1 style={{ margin: 0 }}>{a.name}</h1>
            <p className="meta">{a.role}</p>
          </div>
        </div>
        <p>{a.bio}</p>
        <p lang="ta">{a.bioTa}</p>
        <h2>Areas of expertise</h2>
        <ul className="chips">
          {a.knowsAbout.map((k) => (
            <li key={k}>
              <span style={{ display: 'inline-block', border: '1px solid var(--green-line)', borderRadius: 20, padding: '4px 12px' }}>{k}</span>
            </li>
          ))}
        </ul>
        <h2>Articles by {a.name}</h2>
        <ul>
          {posts.map((p) => (
            <li key={p.slug}>
              <Link to={`/blog/${p.slug}` as any}>{p.title}</Link> {p.author === a.slug ? '' : '(reviewed)'}
            </li>
          ))}
        </ul>
        <p>
          Other team member:{' '}
          {AUTHORS.filter((x) => x.slug !== a.slug).map((x) => (
            <Link key={x.slug} to={`/authors/${x.slug}` as any}>
              {x.name} ({x.role})
            </Link>
          ))}
        </p>
      </div>
    </>
  )
}
