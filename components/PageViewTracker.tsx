'use client'
import { useEffect, useRef } from 'react'
import { track, type AnalyticsEvent } from '@/lib/analytics'

type Props = {
  event: AnalyticsEvent
  props?: Record<string, unknown>
}

export default function PageViewTracker({ event, props }: Props) {
  const fired = useRef(false)
  useEffect(() => {
    if (fired.current) return
    fired.current = true
    track(event, props)
  })
  return null
}
