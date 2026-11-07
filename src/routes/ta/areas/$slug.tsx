import { createFileRoute } from '@tanstack/react-router'
import { AreaPage, areaHead, loadArea } from '~/pages/AreaPages'
export const Route = createFileRoute('/ta/areas/$slug')({
  loader: ({ params }) => { loadArea(params.slug) },
  head: ({ params }) => areaHead('ta', params.slug),
  component: () => <AreaPage lang="ta" slug={Route.useParams().slug} />,
})
