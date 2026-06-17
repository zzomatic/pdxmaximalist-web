'use client'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import FlyerForm from './FlyerForm'
import SubscribeButton from './SubscribeButton'

type Props = { product: Product }

export default function ProductCard({ product }: Props) {
  return (
    <div className="border-4 border-black shadow-[4px_4px_0px_#000] p-6 flex flex-col gap-4 transition-all duration-100 hover:shadow-[2px_2px_0px_#000] hover:translate-x-[2px] hover:translate-y-[2px]">
      {product.comingSoon ? (
        <h2 className="font-mono text-[18px] font-bold uppercase">{product.name}</h2>
      ) : (
        <h2 className="font-mono text-[18px] font-bold uppercase">
          <Link href={`/merch/${product.slug}`} className="text-black no-underline hover:underline">
            {product.name}
          </Link>
        </h2>
      )}

      <p className="font-mono text-[14px]">{product.description}</p>

      {product.price && (
        <p className="font-mono text-[14px] font-bold">{product.price}</p>
      )}

      <div className="mt-auto">
        {product.comingSoon ? (
          <button
            disabled
            aria-disabled="true"
            className="inline-flex items-center justify-center border-4 border-black px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] opacity-50 cursor-not-allowed"
          >
            [ COMING SOON ]
          </button>
        ) : product.id === 'free-flyer' ? (
          <FlyerForm />
        ) : (
          <SubscribeButton productId={product.id} requiresAddress={product.requiresAddress} />
        )}
      </div>
    </div>
  )
}
