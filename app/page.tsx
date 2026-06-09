import type { Metadata } from 'next'
import { getUpcomingEvents } from '@/lib/events'
import type { Event } from '@/lib/types'
import ShowsTabView from '@/components/ShowsTabView'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — shows',
}

function formatTabLabel(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const dow = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 2)
  const mon = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
  const d = String(day).padStart(2, '0')
  return `${dow} ${mon} ${d}`
}

function formatDateHeader(dateStr: string): string {
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  const dow = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
  const mon = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
  const d = String(day).padStart(2, '0')
  return `${dow} ${mon} ${d}`
}

export default function ShowsPage() {
  const end = new Date()
  end.setDate(end.getDate() + 6)
  const weekEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`

  const sorted = [...getUpcomingEvents()]
    .filter(e => e.date <= weekEnd)
    .sort((a, b) => {
      const venueA = (a.venue_name ?? '').replace(/^The /i, '')
      const venueB = (b.venue_name ?? '').replace(/^The /i, '')
      const venueCmp = venueA.localeCompare(venueB)
      if (venueCmp !== 0) return venueCmp
      return (a.time ?? '').localeCompare(b.time ?? '')
    })

  const grouped = sorted.reduce<Record<string, Event[]>>((acc, event) => {
    if (!acc[event.date]) acc[event.date] = []
    acc[event.date].push(event)
    return acc
  }, {})

  const dates = Object.keys(grouped).sort()

  if (dates.length === 0) {
    return (
      <>
        <h1 className={styles.pageHeader}>UPCOMING SHOWS</h1>
        <div className={styles.emptyCard}>
          <div className={styles.emptyShrug}>{'¯\\_(ツ)_/¯'}</div>
          <div className={styles.emptyTitle}>NO SHOWS IN THE NEXT WEEK</div>
          <div className={styles.emptySubtitle}>check back soon</div>
        </div>
      </>
    )
  }

  const tabLabels = Object.fromEntries(dates.map(d => [d, formatTabLabel(d)]))
  const dateHeaders = Object.fromEntries(dates.map(d => [d, formatDateHeader(d)]))

  return <ShowsTabView grouped={grouped} dates={dates} tabLabels={tabLabels} dateHeaders={dateHeaders} />
}
