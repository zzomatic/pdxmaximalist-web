'use client'
import { useState, useEffect } from 'react'
import type { Event } from '@/lib/types'
import VenueGroup from './VenueGroup'
import styles from './ShowsTabView.module.css'

type VenueGroupData = {
  venue_name: string
  venue_address: string | null
  shows: Event[]
}

function groupByVenue(events: Event[]): VenueGroupData[] {
  const map = new Map<string, VenueGroupData>()
  for (const event of events) {
    const key = event.venue_name ?? ''
    if (!map.has(key)) {
      map.set(key, { venue_name: event.venue_name ?? '', venue_address: event.venue_address, shows: [] })
    }
    map.get(key)!.shows.push(event)
  }
  return Array.from(map.values())
}

type Props = {
  grouped: Record<string, Event[]>
  dates: string[]
  tabLabels: Record<string, string>
  tabAriaLabels: Record<string, string>
  dateHeaders: Record<string, string>
}

export default function ShowsTabView({ grouped, dates, tabLabels, tabAriaLabels, dateHeaders }: Props) {
  const [activeDate, setActiveDate] = useState(dates[0] ?? '')
  useEffect(() => {
    const update = () => {
      const hdr = document.getElementById('site-header')?.offsetHeight ?? 0
      document.documentElement.style.setProperty('--_hdr', `${hdr}px`)
    }
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const venues = groupByVenue(grouped[activeDate] ?? [])

  return (
    <>
      <div className={styles.stickyHeader}>
        <h1 className={styles.title}>UPCOMING SHOWS</h1>
        <div className={styles.tabBar} role="tablist">
          {dates.map(date => (
            <button
              key={date}
              role="tab"
              aria-selected={date === activeDate}
              aria-label={tabAriaLabels[date]}
              className={`${styles.tab} ${date === activeDate ? styles.tabActive : ''}`}
              onClick={() => setActiveDate(date)}
            >
              <span aria-hidden="true">/</span>{tabLabels[date]}<span aria-hidden="true">/</span>
            </button>
          ))}
        </div>
        <div className={styles.dateHeader}>{dateHeaders[activeDate]}</div>
      </div>
      <div className={styles.events}>
        {venues.map(vg => (
          <VenueGroup
            key={vg.venue_name}
            venue_name={vg.venue_name}
            venue_address={vg.venue_address}
            shows={vg.shows}
          />
        ))}
      </div>
    </>
  )
}
