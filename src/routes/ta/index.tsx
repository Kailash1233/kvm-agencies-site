import { createFileRoute } from '@tanstack/react-router'
import { HomePage, homeHead } from '~/pages/HomePage'
export const Route = createFileRoute('/ta/')({ head: () => homeHead('ta'), component: () => <HomePage lang="ta" /> })
