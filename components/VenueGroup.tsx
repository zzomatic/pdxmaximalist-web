import type { Event } from '@/lib/types'
import { formatTime } from '@/lib/utils'
import styles from './VenueGroup.module.css'

type Props = {
  venue_name: string
  venue_address: string | null
  shows: Event[]
}

export default function VenueGroup({ venue_name, venue_address, shows }: Props) {
  return (
    <div className={styles.group}>
      <div className={styles.venueName}>{venue_name}</div>
      {venue_address && (
        <div className={styles.venueAddress}>{venue_address}</div>
      )}
      <div className={styles.shows}>
        {shows.map(show => (
          <div key={show.id} className={styles.show}>
            <div className={styles.showLine}>
              <span className={styles.time}>{formatTime(show.time)}</span>
              <span className={styles.artist}>{show.artist}</span>
            </div>
            {(show.source_url || show.ticket_url) && (
              <div className={styles.actions}>
                {show.source_url && (
                  <a
                    href={show.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
                  >
                    <span aria-hidden="true">//</span>more info<span aria-hidden="true">//</span>
                  </a>
                )}
                {/* {show.ticket_url && (
                  <a
                    href={show.ticket_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.button}
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
