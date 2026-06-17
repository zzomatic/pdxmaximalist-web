import { initDb, getDb } from './db'

export interface Subscriber {
  id: number
  email: string
  stripe_customer_id: string | null
  stripe_subscription_id: string | null
  product_id: string
  status: string
  shipping_name: string | null
  shipping_line1: string | null
  shipping_line2: string | null
  shipping_city: string | null
  shipping_state: string | null
  shipping_postal_code: string | null
  shipping_country: string | null
  created_at: string
  updated_at: string
}

export interface ShippingAddress {
  name: string | null
  line1: string | null
  line2: string | null
  city: string | null
  state: string | null
  postal_code: string | null
  country: string | null
}

export async function upsertSubscriber(params: {
  email: string
  stripeCustomerId: string
  stripeSubscriptionId: string
  productId: string
  shipping?: ShippingAddress
}): Promise<void> {
  await initDb()
  const db = getDb()

  await db.execute({
    sql: `
      INSERT INTO subscribers
        (email, stripe_customer_id, stripe_subscription_id, product_id, status,
         shipping_name, shipping_line1, shipping_line2, shipping_city,
         shipping_state, shipping_postal_code, shipping_country, updated_at)
      VALUES (?, ?, ?, ?, 'active', ?, ?, ?, ?, ?, ?, ?, datetime('now'))
      ON CONFLICT (email, product_id) DO UPDATE SET
        stripe_customer_id = excluded.stripe_customer_id,
        stripe_subscription_id = excluded.stripe_subscription_id,
        status = 'active',
        shipping_name = excluded.shipping_name,
        shipping_line1 = excluded.shipping_line1,
        shipping_line2 = excluded.shipping_line2,
        shipping_city = excluded.shipping_city,
        shipping_state = excluded.shipping_state,
        shipping_postal_code = excluded.shipping_postal_code,
        shipping_country = excluded.shipping_country,
        updated_at = datetime('now')
    `,
    args: [
      params.email,
      params.stripeCustomerId,
      params.stripeSubscriptionId,
      params.productId,
      params.shipping?.name ?? null,
      params.shipping?.line1 ?? null,
      params.shipping?.line2 ?? null,
      params.shipping?.city ?? null,
      params.shipping?.state ?? null,
      params.shipping?.postal_code ?? null,
      params.shipping?.country ?? null,
    ],
  })
}

export async function updateSubscriberStatus(
  stripeSubscriptionId: string,
  status: string
): Promise<void> {
  await initDb()
  const db = getDb()

  await db.execute({
    sql: `
      UPDATE subscribers
      SET status = ?, updated_at = datetime('now')
      WHERE stripe_subscription_id = ?
    `,
    args: [status, stripeSubscriptionId],
  })
}

export async function listActivePrintedSubscribers(): Promise<Subscriber[]> {
  await initDb()
  const db = getDb()

  const result = await db.execute({
    sql: `
      SELECT * FROM subscribers
      WHERE product_id = 'printed-subscription'
        AND status = 'active'
      ORDER BY created_at ASC
    `,
    args: [],
  })

  return result.rows as unknown as Subscriber[]
}
