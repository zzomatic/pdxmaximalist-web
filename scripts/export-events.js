const { execSync } = require('child_process')
const path = require('path')

// ⚠️ UPDATE THIS to your local SQLite DB path before running
const DB_PATH = '/Users/zz/Code/pktflyer/pktflyer-cal/venues.db'
const OUT_PATH = path.join(__dirname, '../lib/events.json')

execSync(
  `sqlite3 "${DB_PATH}" \
  ".mode json" \
  ".output ${OUT_PATH}" \
  "SELECT e.id, e.artist, e.venue_name, v.address AS venue_address, e.date, e.time, e.price, e.ticket_url, e.source_url \
   FROM events e \
   LEFT JOIN venues v ON e.venue_name = v.name \
   WHERE e.date >= date('now') AND e.date <= date('now', '+14 days') \
   ORDER BY e.date ASC, \
            CASE WHEN e.venue_name LIKE 'The %' THEN SUBSTR(e.venue_name, 5) ELSE e.venue_name END ASC, \
            e.time ASC;"`,
  { stdio: 'inherit' }
)

console.log('✓ events.json updated')
