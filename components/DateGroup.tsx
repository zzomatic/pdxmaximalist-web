import type { Event } from '@/lib/types'
import EventCard from './EventCard'

type Props = {
  header: string
  events: Event[]
}

export default function DateGroup({ header, events }: Props) {
  return (
    <div>
      <div className="p-0 text-center font-mono font-bold text-[15px] tracking-[0.1em] mb-4" aria-label={`Events on ${header}`}>
        {header}
      </div>
      <div className="flex flex-col gap-0.5">
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
