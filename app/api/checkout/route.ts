import { NextRequest, NextResponse } from 'next/server'
import { getStripe, PRICE_IDS } from '@/lib/stripe'

export async function POST(request: NextRequest) {
  const { productId } = await request.json()

  const priceId = PRICE_IDS[productId as string]
  if (!priceId) {
    return NextResponse.json({ error: 'Unknown product or price not configured' }, { status: 400 })
  }

  const origin = request.nextUrl.origin
  const isPhysical = productId === 'printed-subscription'

  try {
    const stripe = getStripe()
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      metadata: { productId },
      ...(isPhysical
        ? { shipping_address_collection: { allowed_countries: ['US'] } }
        : {}),
      success_url: `${origin}/merch/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/merch/${productId}`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error('Stripe checkout error:', err)
    const message = err instanceof Error ? err.message : 'Checkout failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
