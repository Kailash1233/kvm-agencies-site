import type { QA } from './products'
import { POSTS_EN } from './blog-en'
import { POSTS_TA } from './blog-ta'

export interface Post {
  slug: string
  lang: 'en' | 'ta'
  title: string
  metaDescription: string
  excerpt: string
  author: string // author slug
  reviewer?: string // author slug
  published: string // ISO date
  updated: string // ISO date
  /** Short direct answer shown at the top – written for featured snippets / AI answers */
  answer: string
  html: string
  faqs: QA[]
  products: string[] // related product slugs
  /** slug of the translated version, if any */
  translation?: string
}

export const POSTS: Post[] = [...POSTS_EN, ...POSTS_TA]

export const postsByLang = (lang: 'en' | 'ta') =>
  POSTS.filter((p) => p.lang === lang).sort((a, b) => b.published.localeCompare(a.published))

export const postBySlug = (slug: string, lang: 'en' | 'ta') => POSTS.find((p) => p.slug === slug && p.lang === lang)

export const readingMinutes = (html: string) => Math.max(3, Math.round(html.replace(/<[^>]+>/g, ' ').split(/\s+/).length / 200))

/** Tamil translations share the English post's image (same slug) */
export const postImage = (p: Post) => `/images/blog/${p.lang === 'ta' && p.translation ? p.translation : p.slug}.jpg`
