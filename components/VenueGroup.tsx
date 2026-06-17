import type { Event } from '@/lib/types'
import { formatTime } from '@/lib/utils'

type Props = {
  venue_name: string
  venue_address: string | null
  shows: Event[]
}

export default function VenueGroup({ venue_name, venue_address, shows }: Props) {
  return (
    <div className="border-b border-black">
      <div className="font-bold text-[15px]">{venue_name}</div>
      {venue_address && (
        <div className="text-[12px] opacity-[0.85]">{venue_address}</div>
      )}
      <div className="flex flex-col gap-0.5 mt-[2px]">
        {shows.map(show => (
          <div key={show.id} className="flex flex-col gap-0.5">
            <div className="flex items-baseline gap-[10px]">
              <span className="font-bold text-[13px] shrink-0 min-w-[68px]">{formatTime(show.time)}</span>
              <span className="text-[14px]">{show.artist}</span>
            </div>
            {(show.source_url || show.ticket_url) && (
              <div className="flex flex-wrap gap-0.5 pl-[70px]">
                {show.source_url && (
                  <a
                    href={show.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 no-underline font-mono text-[12px] bg-white text-black transition-all duration-100 min-h-[28px] hover:bg-black hover:text-white hover:no-underline"
                  >
                    <span aria-hidden="true">//</span>more info<span aria-hidden="true">//</span>
                  </a>
                )}
                {/* {show.ticket_url && (
                  <a
                    href={show.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-2 no-underline font-mono text-[12px] bg-white text-black transition-all duration-100 min-h-[28px] hover:bg-black hover:text-white hover:no-underline"
                  >
                    //get tickets//
                  </a>
                )} */}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
