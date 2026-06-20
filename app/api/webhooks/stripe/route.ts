import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import { getStripe } from '@/lib/stripe'
import { upsertSubscriber, updateSubscriberStatus } from '@/lib/subscribers'
import { getPostHogClient } from '@/lib/posthog-server'

export async function POST(request: NextRequest) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

  if (!sig || !webhookSecret) {
    return NextResponse.json({ error: 'Missing stripe-signature or webhook secret' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = getStripe().webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('Stripe webhook signature error:', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const session = event.data.object as Stripe.Checkout.Session
      console.log('[stripe] checkout.session.completed', session.id)

      const email = session.customer_details?.email
      const customerId = typeof session.customer === 'string' ? session.customer : session.customer?.id
      const subscriptionId = typeof session.subscription === 'string' ? session.subscription : session.subscription?.id
      const productId = session.metadata?.productId

      if (!email || !customerId || !subscriptionId || !productId) {
        console.error('[stripe] checkout.session.completed missing required fields', { email, customerId, subscriptionId, productId })
        break
      }

      const shipping = session.collected_information?.shipping_details
      const addr = shipping?.address

      try {
        await upsertSubscriber({
          email,
          stripeCustomerId: customerId,
          stripeSubscriptionId: subscriptionId,
          productId,
          shipping: addr
            ? {
                name: shipping.name ?? null,
                line1: addr.line1 ?? null,
                line2: addr.line2 ?? null,
                city: addr.city ?? null,
                state: addr.state ?? null,
                postal_code: addr.postal_code ?? null,
                country: addr.country ?? null,
              }
            : undefined,
        })
        console.log('[stripe] subscriber persisted', email, productId)

      } catch (err) {
        // Log but don't 500 — Stripe will retry if we return non-200
        console.error('[stripe] failed to persist subscriber:', err)
      }
      break
    }
    case 'customer.subscription.created': {
      const sub = event.data.object as Stripe.Subscription
      console.log('[stripe] customer.subscription.created', sub.id, 'status:', sub.status)
      break
    }
    case 'customer.subscription.updated': {
      const sub = event.data.object as Stripe.Subscription
      console.log('[stripe] customer.subscription.updated', sub.id, 'status:', sub.status)
      try {
        await updateSubscriberStatus(sub.id, sub.status)
      } catch (err) {
        console.error('[stripe] failed to update subscriber status:', err)
      }
      break
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription
      console.log('[stripe] customer.subscription.deleted', sub.id)
      try {
        await updateSubscriberStatus(sub.id, 'canceled')
        const email = sub.metadata?.email ?? sub.id
       
      } catch (err) {
        console.error('[stripe] failed to cancel subscriber:', err)
      }
      break
    }
    default:
      console.log('[stripe] unhandled event:', event.type)
  }

  return NextResponse.json({ received: true })
}
