import { createFileRoute } from '@tanstack/react-router'
import { AboutPage, aboutHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/ta/about')({ head: () => aboutHead('ta'), component: () => <AboutPage lang="ta" /> })
