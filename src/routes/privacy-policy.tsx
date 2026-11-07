import { createFileRoute } from '@tanstack/react-router'
import { PrivacyPage, privacyHead } from '~/pages/StaticPages'
export const Route = createFileRoute('/privacy-policy')({ head: privacyHead, component: PrivacyPage })
