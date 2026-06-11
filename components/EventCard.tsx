import type { Event } from '@/lib/types'
import { formatTime } from '@/lib/utils'
import styles from './EventCard.module.css'

type Props = { event: Event }

export default function EventCard({ event }: Props) {
  const hasActions = event.source_url || event.ticket_url

  return (
    <article className={styles.card}>
      <div className={styles.meta}>
        {event.venue_name} · {formatTime(event.time)}
      </div>
      <div className={styles.artist}>{event.artist}</div>
      {event.venue_address && (
        <div className={styles.address}>{event.venue_address}</div>
      )}
      {event.price && (
        <div className={styles.price}>{event.price}</div>
      )}
      {hasActions && (
        <div className={styles.actions}>
          {event.source_url && (
            <a
              href={event.source_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              <span aria-hidden="true">//</span>more info<span aria-hidden="true">//</span>
            </a>
          )}
          {event.ticket_url && (
            <a
              href={event.ticket_url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.button}
            >
              //get tickets//
            </a>
          )}
        </div>
      )}
    </article>
  )
}
