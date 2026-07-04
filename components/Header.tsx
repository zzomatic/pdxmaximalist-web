'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'SHOWS', href: '/' },
  { label: 'FREE WEEKLY FLYER', href: '/merch/free-flyer' },
  { label: 'SOURCE DATA', href: '/flyers' },
  { label: 'SUPPORT', href: '/support' },
  // { label: 'places & spaces', href: '/places' },
  // { label: 'MERCH', href: '/merch' },
  { label: 'ABOUT', href: '/about' },
  // { label: 'contact', href: '/contact' },
]

const tabBase = [
  'inline-flex items-center min-h-[44px]',
  'py-1 px-[2px] text-[14px]',
  'sm:inline-block sm:min-h-0 sm:py-[5px] sm:px-[5px] sm:text-[18px]',
  'no-underline font-mono',
  'transition-all duration-100',
  'hover:bg-black hover:text-white hover:no-underline',
].join(' ')

const tabActive = 'bg-black text-white font-bold'
const tabInactive = 'bg-white text-black'

export default function Header() {
  const pathname = usePathname()

  return (
    <header
      id="site-header"
      className="sticky top-0 z-10 bg-white border-b-4 border-black px-4 pt-4 pb-[14px] sm:px-6 sm:pt-5 sm:pb-4"
    >
      <div className="max-w-[700px] mx-auto flex flex-col gap-[14px]">
        <div className="inline-block px-[14px] py-[6px]">
          <h1 className="font-mono text-[22px] sm:text-[28px] font-bold leading-[1.2]">
            PDXmaximaLIST.info/
          </h1>
        </div>

        <nav
          className="flex flex-wrap gap-0 border-b border-black"
          aria-label="Main navigation"
        >
          {navLinks.map(({ label, href }) => {
            const isActive =
              href === '/'
                ? pathname === '/'
                : pathname === href || pathname.startsWith(`${href}/`)

            return (
              <Link
                key={href}
                href={href}
                className={`${tabBase} ${isActive ? tabActive : tabInactive}`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span aria-hidden="true">/</span>
                {label}
                <span aria-hidden="true">/</span>
              </Link>
            )
          })}
        </nav>
      </div>
    </header>
  )
}
