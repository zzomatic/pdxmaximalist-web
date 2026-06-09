
export function formatTime(time: string | null | undefined): string {
  if (!time || !time.includes(':')) return 'TBA'
  const [hourStr, minuteStr] = time.split(':')
  const hour = parseInt(hourStr, 10)
  const minute = parseInt(minuteStr, 10)
  if (isNaN(hour) || isNaN(minute)) return 'TBA'
  const period = hour >= 12 ? 'PM' : 'AM'
  const displayHour = hour % 12 || 12
  const displayMinute = minute === 0 ? '00' : minuteStr.padStart(2, '0')
  return `${displayHour}:${displayMinute} ${period}`
}
