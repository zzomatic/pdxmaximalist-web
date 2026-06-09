import type { Metadata } from 'next'
import styles from '@/app/shared.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — places & spaces',
}

export default function PlacesPage() {
  return (
    <>
      <h1 className={styles.pageHeader}>PLACES & SPACES</h1>
      <div className={`${styles.card} ${styles.centeredCard}`}>
        COMING SOON

      </div>
    </>
  )
}
