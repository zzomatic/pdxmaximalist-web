import type { Metadata } from 'next'
import { products } from '@/lib/products'
import ProductCard from '@/components/ProductCard'
import PageViewTracker from '@/components/PageViewTracker'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — merch',
}

export default function MerchPage() {
  return (
    <>
      <PageViewTracker event="merch_page_view" />
      <h1 className="text-[24px] font-bold font-mono mb-6">MERCH</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}
