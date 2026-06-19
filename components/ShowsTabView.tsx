'use client'

import { useEffect, useState } from 'react'
import type { Event } from '@/lib/types'
import VenueGroup from './VenueGroup'

type VenueGroupData = {
  venue_name: string
  venue_address: string | null
  shows: Event[]
}

type Props = {
  grouped: Record<string, Event[]>
  dates: string[]
  tabLabels: Record<string, string>
  tabAriaLabels: Record<string, string>
  dateHeaders: Record<string, string>
}
const tabBase = [
  'border-0 shadow-none',
  'px-[0px] py-[4px] m-0',
  'font-[Helvetica,Arial,sans-serif] text-[14px] leading-none',
  'cursor-pointer',
  'transition-all duration-100',
  'hover:bg-black hover:text-white',
  'focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2',
].join(' ')
// const tabBase = [
//   'border-0 shadow-none',
//   'px-[0px] py-[4px] m-0',
//   'font-mono text-[14px] leading-none',
//   'cursor-pointer',
//   'transition-all duration-100',
//   'hover:bg-black hover:text-white',
//   'focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2',
// ].join(' ')

const tabActive = 'font-bold bg-black text-white'
const tabInactive = 'font-normal bg-white text-black'

function groupByVenue(events: Event[]): VenueGroupData[] {
  const map = new Map<string, VenueGroupData>()

  for (const event of events) {
    const venueName = event.venue_name ?? ''

    if (!map.has(venueName)) {
      map.set(venueName, {
        venue_name: venueName,
        venue_address: event.venue_address,
        shows: [],
      })
    }

    map.get(venueName)!.shows.push(event)
  }

  return Array.from(map.values())
}

export default function ShowsTabView({
  grouped,
  dates,
  tabLabels,
  tabAriaLabels,
  dateHeaders,
}: Props) {
  const [activeDate, setActiveDate] = useState(dates[0] ?? '')

  useEffect(() => {
    if (!dates.length) {
      setActiveDate('')
      return
    }

    if (!dates.includes(activeDate)) {
      setActiveDate(dates[0])
    }
  }, [dates, activeDate])

  useEffect(() => {
    const updateHeaderHeight = () => {
      const headerHeight = document.getElementById('site-header')?.offsetHeight ?? 0
      document.documentElement.style.setProperty('--_hdr', `${headerHeight}px`)
    }

    updateHeaderHeight()

    window.addEventListener('resize', updateHeaderHeight)

    return () => {
      window.removeEventListener('resize', updateHeaderHeight)
    }
  }, [])

  const activeEvents = grouped[activeDate] ?? []
  const venues = groupByVenue(activeEvents)

  return (
    <>
      <div className="sticky top-[var(--_hdr,120px)] z-[9] bg-white -mx-4 px-4 sm:-mx-6 sm:px-6">
        <h1 className="text-[24px] font-bold font-mono leading-none pt-1 pb-[2px]">
          UPCOMING SHOWS
        </h1>

        <div className="flex flex-wrap gap-0 py-[2px]" role="tablist">
          {dates.map((date) => {
            const isActive = date === activeDate

            return (
              <button
                key={date}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={tabAriaLabels[date] ?? tabLabels[date] ?? date}
                className={`${tabBase} ${isActive ? tabActive : tabInactive}`}
                onClick={() => setActiveDate(date)}
              >
                <span aria-hidden="true">/</span>
                {tabLabels[date] ?? date}
                <span aria-hidden="true">/</span>
              </button>
            )
          })}
        </div>

        <div className="font-bold text-[14px] font-mono leading-none py-[2px] border-b-[3px] [border-bottom-style:double] border-black mb-2">
          {dateHeaders[activeDate] ?? ''}
        </div>
      </div>

      <div className="flex flex-col gap-4 pb-8">
        {venues.map((venueGroup) => (
          <VenueGroup
            key={venueGroup.venue_name}
            venue_name={venueGroup.venue_name}
            venue_address={venueGroup.venue_address}
            shows={venueGroup.shows}
          />
        ))}
      </div>
    </>
  )
}
