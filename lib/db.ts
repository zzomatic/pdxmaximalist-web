import { createClient, type Client } from '@libsql/client'

let _client: Client | null = null

export function getDb(): Client {
  const url = process.env.TURSO_DATABASE_URL
  const authToken = process.env.TURSO_AUTH_TOKEN

  if (!url) throw new Error('TURSO_DATABASE_URL is not configured')

  if (!_client) {
    _client = createClient({ url, authToken })
  }
  return _client
}

export async function initDb(): Promise<void> {
  const db = getDb()
  await db.execute(`
    CREATE TABLE IF NOT EXISTS subscribers (
      id            INTEGER PRIMARY KEY AUTOINCREMENT,
      email         TEXT    NOT NULL,
      stripe_customer_id TEXT,
      stripe_subscription_id TEXT,
      product_id    TEXT    NOT NULL,
      status        TEXT    NOT NULL DEFAULT 'active',
      shipping_name TEXT,
      shipping_line1 TEXT,
      shipping_line2 TEXT,
      shipping_city TEXT,
      shipping_state TEXT,
      shipping_postal_code TEXT,
      shipping_country TEXT,
      created_at    TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at    TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `)
  await db.execute(`
    CREATE UNIQUE INDEX IF NOT EXISTS subscribers_email_product
    ON subscribers (email, product_id)
  `)
}
