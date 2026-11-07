import { createFileRoute } from '@tanstack/react-router'
import { AreasPage, areasHead } from '~/pages/AreaPages'
export const Route = createFileRoute('/ta/areas/')({ head: () => areasHead('ta'), component: () => <AreasPage lang="ta" /> })
