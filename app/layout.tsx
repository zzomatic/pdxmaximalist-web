import type { Metadata } from 'next'
import '@/styles/globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PostHogProvider from '@/components/PostHogProvider'
import { Analytics } from '@vercel/analytics/next';

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
        <PostHogProvider>
          <Header />
          <main className="max-w-[700px] mx-auto px-4 py-6 sm:px-6 sm:py-8">
            {children}
            <Analytics />
          </main>
          <Footer />
        </PostHogProvider>
      </body>
    </html>
  )
}
