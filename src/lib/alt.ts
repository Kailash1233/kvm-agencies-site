import { POSTS } from '~/data/blog'

/** Path of the other-language version of the current page */
export function altPath(pathname: string): string {
  const p = pathname.replace(/\/+$/, '') || '/'
  if (p === '/ta' ) return '/'
  if (p.startsWith('/ta/')) return p.slice(3)
  const m = p.match(/^\/blog\/([^/]+)$/)
  if (m) {
    const post = POSTS.find((x) => x.lang === 'en' && x.slug === m[1])
    return post?.translation ? `/ta/blog/${post.translation}` : '/ta/blog'
  }
  if (p === '/') return '/ta'
  if (/^\/(products|areas|blog|about|contact)(\/|$)/.test(p)) return `/ta${p}`
  return '/ta'
}

export const isTamil = (pathname: string) => pathname === '/ta' || pathname.startsWith('/ta/')
