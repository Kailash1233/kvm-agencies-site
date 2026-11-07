import { createFileRoute } from '@tanstack/react-router'
import { HomePage, homeHead } from '~/pages/HomePage'
export const Route = createFileRoute('/')({ head: () => homeHead('en'), component: () => <HomePage lang="en" /> })
