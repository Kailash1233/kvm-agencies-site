import { createFileRoute } from '@tanstack/react-router'
import { ProductsPage, productsHead } from '~/pages/ProductPages'
export const Route = createFileRoute('/ta/products/')({ head: () => productsHead('ta'), component: () => <ProductsPage lang="ta" /> })
