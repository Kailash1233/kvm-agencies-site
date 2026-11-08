/// <reference types="vite/client" />
import { createRootRoute, HeadContent, Outlet, Scripts, useRouterState } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import appCss from '~/styles.css?url'
import { SITE } from '~/data/site'
import { businessSchema } from '~/lib/schema'
import { altPath, isTamil } from '~/lib/alt'
import { Header, Footer, ActionBar, EnquiryForm } from '~/components/ui'
import NotFound from '~/components/NotFound'

// Call / WhatsApp clicks → GA4 (gtag) and Google Tag Manager (dataLayer events: click_to_call, click_to_whatsapp)
const trackScript = `document.addEventListener('click',function(e){var a=e.target.closest&&e.target.closest('a[data-track]');if(!a)return;var k=a.getAttribute('data-track');var ev=k==='call'?'click_to_call':'click_to_whatsapp';window.dataLayer=window.dataLayer||[];dataLayer.push({event:ev,link_url:a.href,page_path:location.pathname});if(window.gtag){gtag('event',ev,{link_url:a.href,page_path:location.pathname});gtag('event','generate_lead',{method:k});}});`

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
    // Google Tag Manager container (keep GA4 and Clarity out of GTM – they are loaded below)
    if (SITE.GTMId) {
      scripts.push({
        children: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${SITE.GTMId}');`,
      })
    }
    // Google Analytics 4
    if (SITE.googleAnalyticsId) {
      scripts.push({ src: `https://www.googletagmanager.com/gtag/js?id=${SITE.googleAnalyticsId}`, async: true })
      scripts.push({
        children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${SITE.googleAnalyticsId}');`,
      })
    }
    // Microsoft Clarity (heatmaps & session recordings)
    if (SITE.clarityId) {
      scripts.push({
        children: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${SITE.clarityId}");`,
      })
    }
    return {
      meta,
      links: [
        { rel: 'preload', href: '/fonts/jakarta-latin.woff2', as: 'font', type: 'font/woff2', crossOrigin: 'anonymous' },
        { rel: 'stylesheet', href: appCss },
        // Favicons – Google Search needs a square icon in a multiple of 48px, linked from the home page
        { rel: 'icon', href: '/favicon.ico', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/favicon-48x48.png', sizes: '48x48' },
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
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
        {SITE.GTMId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${SITE.GTMId}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
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
