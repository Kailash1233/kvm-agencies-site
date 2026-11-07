import { createFileRoute } from '@tanstack/react-router'
import { BlogIndex, blogHead } from '~/pages/BlogPages'
export const Route = createFileRoute('/blog/')({ head: () => blogHead('en'), component: () => <BlogIndex lang="en" /> })
