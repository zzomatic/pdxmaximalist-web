'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import styles from './Header.module.css'

const navLinks = [
  { label: 'show list', href: '/' },
  { label: 'more lists', href: '/more-lists' },
  // { label: 'places & spaces', href: '/places' },
  { label: 'merch', href: '/merch' },
  { label: 'about', href: '/about' },
  // { label: 'contact', href: '/contact' },
]

export default function Header() {
  const pathname = usePathname()

  return (
    <header id="site-header" className={styles.header}>
      <div className={styles.inner}>
        <div className={styles.titleBox}>
          <h1 className={styles.title}>PDXmaximaLIST.info/</h1>
        </div>
        <nav className={styles.nav} aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`${styles.tab} ${isActive ? styles.tabActive : ''}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span aria-hidden="true">//</span>{label}<span aria-hidden="true">//</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
