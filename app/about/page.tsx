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
        This project started as a paper trifold events calendar and a desire to provide succinct accessible information about goings-on in Portlnad, Oregon, and an alternative to social media's grip on your nervous system, with minimal interface and maximum content.
      </p>

      <h2 >CONTACT PDXmaximaLIST</h2>
       <p className={styles.tagline}>comments, corrections, collaborations, or to contribute show flyers & info...</p>
        <a
          href="mailto:pdxmaximalist@gmail.com"
          className={shared.button}
        >
          //email us//
        </a>

      <h2>DONATIONS</h2>
        <p>
          If you'd like to donate money to keep this project going, you can <a href="https://buymeacoffee.com/xomatic.studio" target="_blank" rel="noopener noreferrer">donate or buy me a coffee</a>
        </p>
    </>
  )
}
