import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { products } from '@/lib/products'
import FlyerForm from '@/components/FlyerForm'
import SubscribeButton from '@/components/SubscribeButton'
import PageViewTracker from '@/components/PageViewTracker'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return products
    .filter(p => !p.comingSoon)
    .map(p => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = products.find(p => p.slug === slug)
  if (!product) return {}
  return { title: `PDXmaximaLIST.info — ${product.name.toLowerCase()}` }
}

export default async function MerchDetailPage({ params }: Props) {
  const { slug } = await params
  const product = products.find(p => p.slug === slug && !p.comingSoon)
  if (!product) notFound()

  return (
    <>
      <PageViewTracker event="merch_product_view" props={{ product: product.id }} />
      <nav className="mb-6">
        <Link href="/merch" className="font-mono text-[14px] text-black underline hover:no-underline">
          ← merch
        </Link>
      </nav>

      <div className="border-4 border-black shadow-[4px_4px_0px_#000] p-8 flex flex-col gap-6">
        <h1 className="font-mono text-[24px] font-bold uppercase">{product.name}</h1>

        <p className="font-mono text-[16px]">{product.description}</p>

        {product.price && (
          <p className="font-mono text-[18px] font-bold">{product.price}</p>
        )}

        {product.recurring && (
          <p className="font-mono text-[14px]">
            Billed monthly. Cancel anytime.
            {product.requiresAddress && ' Mailing address collected at checkout.'}
          </p>
        )}

        <div>
          {product.id === 'free-flyer' ? (
            <FlyerForm />
          ) : (
            <SubscribeButton productId={product.id} requiresAddress={product.requiresAddress} />
          )}
        </div>
      </div>
    </>
  )
}
