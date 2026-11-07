import { createFileRoute } from '@tanstack/react-router'
import { ProductPage, productHead, loadProduct } from '~/pages/ProductPages'
export const Route = createFileRoute('/products/$slug')({
  loader: ({ params }) => { loadProduct(params.slug) },
  head: ({ params }) => productHead('en', params.slug),
  component: () => <ProductPage lang="en" slug={Route.useParams().slug} />,
})
