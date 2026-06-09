import type { Metadata } from 'next'
import '@/styles/globals.css'
import styles from './layout.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info',
  description: 'portland shows & events',
  openGraph: {
    title: 'PDXmaximaLIST.info',
    description: 'portland shows & events',
    type: 'website',
    url: 'https://pdxmaximalist.info',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main className={styles.main}>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
