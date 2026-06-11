import type { Metadata } from 'next'
import styles from '@/app/shared.module.css'
import shared from '@/app/shared.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — about',
}

export default function AboutPage() {
  return (
    <>
      <h1>ABOUT</h1>
      <p>
        This project is an attempt to provide accessible succinct information about goings-on in Portlnad, Oregon. We aim to provide an alternative to social media's grip on your nervous system, with minimal interface and maximum content.
      
      </p>
      <h2 >CONTACT PDXmaximaLIST</h2>
       <p className={styles.tagline}>comments, corrections, or to contribute show flyers or info...</p>
        <a
          href="mailto:pdxmaximalist@gmail.com"
          className={shared.button}
        >
          //email us//
        </a>
        <p className={styles.email}>pdxmaximalist@gmail.com</p>

    </>
  )
}
