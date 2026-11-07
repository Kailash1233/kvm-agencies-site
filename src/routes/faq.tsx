import { createFileRoute } from '@tanstack/react-router'
import { FaqPage, faqHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/faq')({ head: faqHead, component: FaqPage })
