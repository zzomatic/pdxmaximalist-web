'use client'

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { track } from '@/lib/analytics'

export default function QrScanTracker() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const src = searchParams.get('src')
    if (src) {
      track('qr_scan', { source: src })
    }
  }, [searchParams])

  return null
}