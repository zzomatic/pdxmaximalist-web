import type { Event } from '@/lib/types'
import EventCard from './EventCard'
import styles from './DateGroup.module.css'

type Props = {
  header: string
  events: Event[]
}

export default function DateGroup({ header, events }: Props) {
  return (
    <div className={styles.group}>
      <div className={styles.header} aria-label={`Events on ${header}`}>
        {header}
      </div>
      <div className={styles.cards}>
        {events.map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  )
}
