export type Event = {
  id: number
  artist: string
  venue_name: string
  venue_address: string | null
  date: string
  time: string
  price: string | null
  ticket_url: string | null
  source_url: string | null
  event_type: string | null
}
