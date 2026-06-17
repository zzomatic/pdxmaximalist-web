// Provider: Resend contacts API (audience-scoped via audienceId).
// To swap providers, only change this file — the route handler calls captureEmail() only.
// NOTE: Resend v6 deprecated audienceId in favour of segments; the legacy form still works.
// If migrating, replace LegacyCreateContactOptions with CreateContactOptions + segments array.
import { Resend } from 'resend'

export async function captureEmail(email: string): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  const audienceId = process.env.RESEND_AUDIENCE_ID

  if (!apiKey || !audienceId) {
    console.log('[email-capture] Resend not configured — skipping capture for:', email)
    return
  }

  const resend = new Resend(apiKey)
  const { error } = await resend.contacts.create({
    audienceId,
    email,
    unsubscribed: false,
  })

  if (error) throw new Error(error.message)
}
