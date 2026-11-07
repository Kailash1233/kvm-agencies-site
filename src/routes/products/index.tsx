import { createFileRoute } from '@tanstack/react-router'
import { ProductsPage, productsHead } from '~/pages/ProductPages'
export const Route = createFileRoute('/products/')({ head: () => productsHead('en'), component: () => <ProductsPage lang="en" /> })
