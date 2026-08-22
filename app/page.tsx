//import type { Metadata } from 'next'
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/merch/free-flyer");
}



// import { getUpcomingEvents } from '@/lib/events'
// import type { Event } from '@/lib/types'
// import ShowsTabView from '@/components/ShowsTabView'
// import { Suspense } from 'react'
// import QrScanTracker from '@/components/QrScanTracker'

// export const metadata: Metadata = {
//   title: 'PDXmaximaLIST.info — shows',
// }

// function formatTabLabel(dateStr: string): string {
//   const [year, month, day] = dateStr.split('-').map(Number)
//   const date = new Date(year, month - 1, day)
//   const dow = date.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase().slice(0, 2)
//   const mon = date.toLocaleDateString('en-US', { month: 'short' }).toUpperCase()
//   const d = String(day).padStart(2, '0')
//   return `${dow} ${mon} ${d}`
// }

// function formatTabAriaLabel(dateStr: string): string {
//   const [year, month, day] = dateStr.split('-').map(Number)
//   const date = new Date(year, month - 1, day)
//   const dow = date.toLocaleDateString('en-US', { weekday: 'long' })
//   const mon = date.toLocaleDateString('en-US', { month: 'long' })
//   return `${dow}, ${mon} ${day}`
// }

// function formatDateHeader(dateStr: string): string {
//   const [year, month, day] = dateStr.split('-').map(Number)
//   const date = new Date(year, month - 1, day)
//   const dow = date.toLocaleDateString('en-US', { weekday: 'long' }).toUpperCase()
//   const mon = date.toLocaleDateString('en-US', { month: 'long' }).toUpperCase()
//   const d = String(day).padStart(2, '0')
//   return `${dow} ${mon} ${d}`
// }

// export default function ShowsPage() {
//   const end = new Date()
//   end.setDate(end.getDate() + 6)
//   const weekEnd = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`

//   const sorted = [...getUpcomingEvents()]
//     .filter(e => e.date <= weekEnd)
//     .sort((a, b) => {
//       const venueA = (a.venue_name ?? '').replace(/^The /i, '')
//       const venueB = (b.venue_name ?? '').replace(/^The /i, '')
//       const venueCmp = venueA.localeCompare(venueB)
//       if (venueCmp !== 0) return venueCmp
//       return (a.time ?? '').localeCompare(b.time ?? '')
//     })

//   const grouped = sorted.reduce<Record<string, Event[]>>((acc, event) => {
//     if (!acc[event.date]) acc[event.date] = []
//     acc[event.date].push(event)
//     return acc
//   }, {})

//   const dates = Object.keys(grouped).sort()

//   if (dates.length === 0) {
//     return (
//       <>
//         <Suspense fallback={null}>
//           <QrScanTracker />
//         </Suspense>
//         <h1 className="text-[24px] font-bold uppercase mb-6 font-mono">UPCOMING SHOWS</h1>
//         <div className="px-6 py-12 text-center flex flex-col items-center gap-4" aria-live="polite">
//           <div className="text-[28px]" aria-hidden="true">{'¯\\_(ツ)_/¯'}</div>
//           <div className="text-[18px] font-bold uppercase">NO SHOWS IN THE NEXT WEEK</div>
//           <div className="text-base">check back soon</div>
//         </div>
//       </>
//     )
//   }

//   const tabLabels = Object.fromEntries(dates.map(d => [d, formatTabLabel(d)]))
//   const tabAriaLabels = Object.fromEntries(dates.map(d => [d, formatTabAriaLabel(d)]))
//   const dateHeaders = Object.fromEntries(dates.map(d => [d, formatDateHeader(d)]))

//   return (
//     <>
//       <Suspense fallback={null}>
//         <QrScanTracker />
//       </Suspense>
//       <ShowsTabView grouped={grouped} dates={dates} tabLabels={tabLabels} tabAriaLabels={tabAriaLabels} dateHeaders={dateHeaders} />
//     </>
//   )
// }
