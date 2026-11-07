import { SITE } from '~/data/site'
import type { Lang } from './i18n'

interface SeoInput {
  title: string
  description: string
  path: string
  lang: Lang
  /** Paths of language versions (include self). */
  alternates?: { en?: string; ta?: string }
  image?: string
  type?: 'website' | 'article'
  jsonLd?: object[]
  noindex?: boolean
  published?: string
  updated?: string
}

export const abs = (path: string) => (path.startsWith('http') ? path : `${SITE.url}${path}`)

export function seo(i: SeoInput) {
  const brand = 'KVM Agencies'
  const title = i.title.includes('KVM') || i.title.length + brand.length + 3 > 70 ? i.title : `${i.title} | ${brand}`
  const url = abs(i.path)
  const image = abs(i.image ?? SITE.ogImage)
  const meta: any[] = [
    { title },
    { name: 'description', content: i.description },
    { name: 'robots', content: i.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1' },
    { property: 'og:type', content: i.type ?? 'website' },
    { property: 'og:site_name', content: SITE.name },
    { property: 'og:title', content: title },
    { property: 'og:description', content: i.description },
    { property: 'og:url', content: url },
    { property: 'og:image', content: image },
    { property: 'og:image:width', content: '1200' },
    { property: 'og:image:height', content: '630' },
    { property: 'og:locale', content: i.lang === 'ta' ? 'ta_IN' : 'en_IN' },
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: title },
    { name: 'twitter:description', content: i.description },
    { name: 'twitter:image', content: image },
    { name: 'geo.region', content: 'IN-TN' },
    { name: 'geo.placename', content: 'Chengalpattu' },
    { name: 'geo.position', content: `${SITE.geo.lat};${SITE.geo.lng}` },
    { name: 'ICBM', content: `${SITE.geo.lat}, ${SITE.geo.lng}` },
  ]
  if (i.published) meta.push({ property: 'article:published_time', content: i.published })
  if (i.updated) meta.push({ property: 'article:modified_time', content: i.updated })

  const links: any[] = [{ rel: 'canonical', href: url }]
  if (i.alternates) {
    if (i.alternates.en) links.push({ rel: 'alternate', hrefLang: 'en-IN', href: abs(i.alternates.en) })
    if (i.alternates.ta) links.push({ rel: 'alternate', hrefLang: 'ta-IN', href: abs(i.alternates.ta) })
    const def = i.alternates.en ?? i.alternates.ta
    if (def) links.push({ rel: 'alternate', hrefLang: 'x-default', href: abs(def) })
  }

  const scripts = (i.jsonLd ?? []).map((obj) => ({
    type: 'application/ld+json',
    children: JSON.stringify(obj),
  }))

  return { meta, links, scripts }
}
