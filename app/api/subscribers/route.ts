import { NextRequest, NextResponse } from 'next/server'
import { listActivePrintedSubscribers } from '@/lib/subscribers'

export async function GET(request: NextRequest) {
  const secret = process.env.MAILING_RUN_SECRET
  if (!secret) {
    return NextResponse.json({ error: 'Not configured' }, { status: 503 })
  }

  const auth = request.headers.get('authorization')
  if (auth !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const subscribers = await listActivePrintedSubscribers()
    return NextResponse.json({ subscribers })
  } catch (err) {
    console.error('[subscribers] list error:', err)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  }
}
