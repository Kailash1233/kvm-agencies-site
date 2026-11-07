import { createFileRoute } from '@tanstack/react-router'
import { PostPage, postHead, loadPost } from '~/pages/BlogPages'
export const Route = createFileRoute('/blog/$slug')({
  loader: ({ params }) => { loadPost(params.slug, 'en') },
  head: ({ params }) => postHead('en', params.slug),
  component: () => <PostPage lang="en" slug={Route.useParams().slug} />,
})
