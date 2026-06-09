import Link from 'next/link'
import styles from './not-found.module.css'

export default function NotFound() {
  return (
    <div className={styles.card}>
      <h1 className={styles.header}>404</h1>
      <div className={styles.body}>page not found</div>
      <Link href="/" className={styles.button}>
        BACK TO SHOWS
      </Link>
    </div>
  )
}
