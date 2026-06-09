import type { Metadata } from 'next'
import styles from '@/app/shared.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — merch',
}

export default function MerchPage() {
  return (
    <>
      <h1 className={styles.pageHeader}>MERCH</h1>
      <div className={`${styles.card} ${styles.centeredCard}`}>
        COMING SOON
      </div>
    </>
  )
}
