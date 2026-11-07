import { createFileRoute } from '@tanstack/react-router'
import { AboutPage, aboutHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/about')({ head: () => aboutHead('en'), component: () => <AboutPage lang="en" /> })
