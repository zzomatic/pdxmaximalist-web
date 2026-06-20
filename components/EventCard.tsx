import type { Event } from '@/lib/types'
import { formatTime } from '@/lib/utils'

type Props = { event: Event }

export default function EventCard({ event }: Props) {
  const hasActions = event.source_url || event.ticket_url
  return (
    <article>
      <div className="text-[18px] font-bold mb-1">{event.venue_name} · {formatTime(event.time)}</div>
      <div className="text-[16px] mb-[2px]">{event.artist}</div>
      {event.venue_address && <div className="text-[13px] mb-0">{event.venue_address}</div>}
      {event.price && <div className="text-[14px] mt-[6px]">{event.price}</div>}
      {hasActions && (
        <div className="flex flex-wrap gap-2 mt-0">
          {event.source_url && (
            <a href={event.source_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[30px] hover:bg-black hover:text-white hover:no-underline">
              <span aria-hidden="true">//</span>more info<span aria-hidden="true">//</span>
            </a>
          )}
          {event.ticket_url && (
            <a href={event.ticket_url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[30px] hover:bg-black hover:text-white hover:no-underline">
              <span aria-hidden="true">//</span>get tickets<span aria-hidden="true">//</span>
            </a>
          )}
        </div>
      )}
    </article>
  )
}
