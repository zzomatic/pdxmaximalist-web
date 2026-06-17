'use client'
import { useState } from 'react'
import { track } from '@/lib/analytics'

type Props = { productId: string; requiresAddress: boolean }

export default function SubscribeButton({ productId, requiresAddress }: Props) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleClick = async () => {
    track('merch_subscribe_click', {
      product: requiresAddress ? 'printed_subscription' : 'digital_subscription',
    })
    setLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productId }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error ?? 'Checkout failed')

      track('checkout_started', { product: productId })
      window.location.href = data.url
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <button
        type="button"
        disabled={loading}
        aria-busy={loading}
        className={`inline-flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_#000] px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] transition-all duration-100 hover:bg-black hover:text-white hover:shadow-none ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
        onClick={handleClick}
      >
        {loading ? '...' : '[ SUBSCRIBE ]'}
      </button>
      {error && (
        <p className="font-mono text-[13px] text-black" role="alert">{error}</p>
      )}
    </div>
  )
}
