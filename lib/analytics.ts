import posthog from 'posthog-js'

export type AnalyticsEvent =
  | 'merch_page_view'
  | 'merch_product_view'
  | 'flyer_email_submit'
  | 'merch_subscribe_click'
  | 'merch_get_it_click'
  | 'checkout_started'

export function track(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_POSTHOG_KEY) return
  posthog.capture(event, props)
}
