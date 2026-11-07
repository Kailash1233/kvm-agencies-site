import { createFileRoute } from '@tanstack/react-router'
import { BulkPage, bulkHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/bulk-orders')({ head: bulkHead, component: BulkPage })
