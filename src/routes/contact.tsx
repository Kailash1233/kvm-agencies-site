import { createFileRoute } from '@tanstack/react-router'
import { ContactPage, contactHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/contact')({ head: () => contactHead('en'), component: () => <ContactPage lang="en" /> })
