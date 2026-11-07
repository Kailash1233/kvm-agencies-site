import { createFileRoute } from '@tanstack/react-router'
import { AreaPage, areaHead, loadArea } from '~/pages/AreaPages'
export const Route = createFileRoute('/areas/$slug')({
  loader: ({ params }) => { loadArea(params.slug) },
  head: ({ params }) => areaHead('en', params.slug),
  component: () => <AreaPage lang="en" slug={Route.useParams().slug} />,
})
