import { createFileRoute } from '@tanstack/react-router'
import NotFound from '~/components/NotFound'
import { seo } from '~/lib/seo'
export const Route = createFileRoute('/404')({
  head: () => seo({ title: 'Page not found', description: 'Page not found – KVM Agencies, Chengalpattu.', path: '/404', lang: 'en', noindex: true }),
  component: NotFound,
})
