import { createFileRoute } from '@tanstack/react-router'
import { BlogIndex, blogHead } from '~/pages/BlogPages'
export const Route = createFileRoute('/ta/blog/')({ head: () => blogHead('ta'), component: () => <BlogIndex lang="ta" /> })
