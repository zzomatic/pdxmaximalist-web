import { NextRequest, NextResponse } from 'next/server'
import { captureEmail } from '@/lib/email-capture'

function isValidEmail(email: unknown): email is string {
  return (
    typeof email === 'string' &&
    email.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())
  )
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, website } = body

  // Honeypot — silently succeed so bots get no signal
  if (website) {
    return NextResponse.json({ ok: true })
  }

  if (!isValidEmail(email)) {
    return NextResponse.json({ error: 'Please enter a valid email address.' }, { status: 400 })
  }

  try {
    await captureEmail(email.trim().toLowerCase())
    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[capture-email]', err)
    return NextResponse.json(
      { error: 'Failed to subscribe. Please try again.' },
      { status: 500 }
    )
  }
}
