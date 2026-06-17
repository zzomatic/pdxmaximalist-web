'use client'
import { useState, useEffect } from 'react'
import type { Event } from '@/lib/types'
import VenueGroup from './VenueGroup'

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

const tabBase = 'border-0 shadow-none bg-transparent p-0 m-0 font-mono text-[13px] leading-none text-black cursor-pointer opacity-90 hover:underline focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2'
const tabActiveClass = 'font-bold opacity-100 underline'

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
      <div className="sticky top-[var(--_hdr,120px)] z-[9] bg-white -mx-4 px-4 sm:-mx-6 sm:px-6">
        <h1 className="text-[24px] font-bold font-mono leading-none pt-1 pb-[2px]">UPCOMING SHOWS</h1>
        <div className="flex flex-wrap gap-0 py-[2px]" role="tablist">
          {dates.map(date => (
            <button
              key={date}
              role="tab"
              aria-selected={date === activeDate}
              aria-label={tabAriaLabels[date]}
              className={`${tabBase} ${date === activeDate ? tabActiveClass : ''}`}
              onClick={() => setActiveDate(date)}
            >
              <span aria-hidden="true">/</span>{tabLabels[date]}<span aria-hidden="true">/</span>
            </button>
          ))}
        </div>
        <div className="font-bold text-[14px] font-mono leading-none py-[2px] border-b-[3px] [border-bottom-style:double] border-black mb-2">
          {dateHeaders[activeDate]}
        </div>
      </div>
      <div className="flex flex-col gap-4 pb-8">
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
