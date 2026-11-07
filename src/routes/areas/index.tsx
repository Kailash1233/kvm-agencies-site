import { createFileRoute } from '@tanstack/react-router'
import { AreasPage, areasHead } from '~/pages/AreaPages'
export const Route = createFileRoute('/areas/')({ head: () => areasHead('en'), component: () => <AreasPage lang="en" /> })
