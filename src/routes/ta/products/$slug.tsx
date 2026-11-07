import { createFileRoute } from '@tanstack/react-router'
import { ProductPage, productHead, loadProduct } from '~/pages/ProductPages'
export const Route = createFileRoute('/ta/products/$slug')({
  loader: ({ params }) => { loadProduct(params.slug) },
  head: ({ params }) => productHead('ta', params.slug),
  component: () => <ProductPage lang="ta" slug={Route.useParams().slug} />,
})
