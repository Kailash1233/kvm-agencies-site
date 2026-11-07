import { createFileRoute } from '@tanstack/react-router'
import { AuthorPage, authorHead, loadAuthor } from '~/pages/BlogPages'
export const Route = createFileRoute('/authors/$slug')({
  loader: ({ params }) => { loadAuthor(params.slug) },
  head: ({ params }) => authorHead(params.slug),
  component: () => <AuthorPage slug={Route.useParams().slug} />,
})
