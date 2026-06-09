import type { Metadata } from 'next'
import shared from '@/app/shared.module.css'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — contact',
}

export default function ContactPage() {
  return (
    <>
      <h1 className={shared.pageHeader}>CONTACT</h1>
      <div className={`${shared.card} ${styles.contactCard}`}>
        <p className={styles.tagline}>comments, corrections, or tips?</p>
        <a
          href="mailto:pdxmaximalist@gmail.com"
          className={shared.button}
        >
          //email us//
        </a>
        <p className={styles.email}>pdxmaximalist@gmail.com</p>
      </div>
    </>
  )
}
