import type { Metadata } from 'next'
import styles from '@/app/shared.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — about',
}

export default function AboutPage() {
  return (
    <>
      <h1 className={styles.pageHeader}>ABOUT</h1>
      <div className={`${styles.card} ${styles.centeredCard}`}>
        This project is an attempt to provide succinct information about goings-on in portlnad, oregon. We aim to provide an alternative to social media's grip on your nervous system with minimal interface and maximum content.  
      </div>
    </>
  )
}
