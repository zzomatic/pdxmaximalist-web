import Stripe from 'stripe'

let _stripe: Stripe | null = null

export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured')
  if (!_stripe) {
    _stripe = new Stripe(key, { apiVersion: '2026-05-27.dahlia' })
  }
  return _stripe
}

// Map product IDs → Stripe Price IDs (set each in env)
export const PRICE_IDS: Record<string, string | undefined> = {
  'digital-subscription': process.env.STRIPE_PRICE_DIGITAL_SUBSCRIPTION,
  'printed-subscription': process.env.STRIPE_PRICE_PRINTED_SUBSCRIPTION,
}
