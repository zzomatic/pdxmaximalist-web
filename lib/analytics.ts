import posthog from 'posthog-js'

export type AnalyticsEvent =
  | 'merch_page_view'
  | 'merch_product_view'
  | 'flyer_email_submit'
  | 'merch_subscribe_click'
  | 'merch_get_it_click'
  | 'checkout_started'
  | 'show_ticket_click'
  | 'show_info_click'
  | 'date_tab_switched'

export function track(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  if (typeof window === 'undefined') return
  if (!process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN) return
  posthog.capture(event, props)
}
