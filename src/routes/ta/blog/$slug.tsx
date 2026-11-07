import { createFileRoute } from '@tanstack/react-router'
import { PostPage, postHead, loadPost } from '~/pages/BlogPages'
export const Route = createFileRoute('/ta/blog/$slug')({
  loader: ({ params }) => { loadPost(params.slug, 'ta') },
  head: ({ params }) => postHead('ta', params.slug),
  component: () => <PostPage lang="ta" slug={Route.useParams().slug} />,
})
