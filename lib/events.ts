import eventsData from './events.json'
import type { Event } from './types'

function parseArtist(raw: string): string {
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed.join(', ')
  } catch {}
  return raw
}

function localToday(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function getUpcomingEvents(): Event[] {
  const today = localToday()
  return (eventsData as Event[])
    .filter(e => e.date >= today)
    .map(e => ({ ...e, artist: parseArtist(e.artist) }))
}
