import { createFileRoute } from '@tanstack/react-router'
import { ContactPage, contactHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/ta/contact')({ head: () => contactHead('ta'), component: () => <ContactPage lang="ta" /> })
