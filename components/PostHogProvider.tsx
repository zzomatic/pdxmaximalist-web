'use client'
import { useEffect } from 'react'
import posthog from 'posthog-js'

let initialized = false

export default function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY
    if (!key || initialized) return
    initialized = true
    posthog.init(key, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST ?? 'https://us.i.posthog.com',
      capture_pageview: false,
      capture_pageleave: false,
    })
  }, [])

  return <>{children}</>
}
