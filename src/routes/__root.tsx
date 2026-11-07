/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles.css?url'
import { SITE } from '~/data/site'
import { businessSchema } from '~/lib/schema'
import { altPath, isTamil } from '~/lib/alt'
import { Header, Footer, ActionBar, EnquiryForm } from '~/components/ui'
import NotFound from '~/components/NotFound'

const trackScript = `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-track]');if(!a)return;var k=a.getAttribute('data-track');if(window.gtag){gtag('event',k==='call'?'click_to_call':'click_to_whatsapp',{link_url:a.href,page_path:location.pathname});gtag('event','generate_lead',{method:k});}});`

export const Route = createRootRoute({
  head: () => {
    const meta: any[] = [
      { charSet: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'theme-color', content: '#0f1f3d' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'author', content: 'KVM Agencies' },
    ]
    if (SITE.googleSiteVerification) meta.push({ name: 'google-site-verification', content: SITE.googleSiteVerification })
    if (SITE.bingSiteVerification) meta.push({ name: 'msvalidate.01', content: SITE.bingSiteVerification })
    const scripts: any[] = [
      { type: 'application/ld+json', children: JSON.stringify(businessSchema()) },
      { children: trackScript },
    ]
    if (SITE.googleAnalyticsId) {
      scripts.push({ src: `https://www.googletagmanager.com/gtag/js?id=${SITE.googleAnalyticsId}`, async: true })
      scripts.push({
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.googleAnalyticsId}');`,
      })
    }
    return {
      meta,
      links: [
        { rel: 'preload', href: '/fonts/jakarta-latin.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
        { rel: 'stylesheet', href: appCss },
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/icon-192.png', sizes: '192x192' },
        { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'preconnect', href: 'https://maps.google.com' },
      ],
      scripts,
    }
  },
  shellComponent: Shell,
  component: Layout,
  notFoundComponent: NotFound,
})

function Shell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  return (
    <html lang={isTamil(pathname) ? 'ta-IN' : 'en-IN'}>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function Layout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const lang = isTamil(pathname) ? 'ta' : 'en'
  return (
    <>
      <Header lang={lang} altPath={altPath(pathname)} />
      <main>
        <Outlet />
        <div className="wrap narrow">
          <EnquiryForm lang={lang} key={pathname} />
        </div>
      </main>
      <Footer lang={lang} />
      <ActionBar lang={lang} />
    </>
  )
}
