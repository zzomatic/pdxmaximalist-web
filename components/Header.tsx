'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'show list', href: '/' },
  { label: 'more lists', href: '/more-lists' },
  // { label: 'places & spaces', href: '/places' },
  // { label: 'merch', href: '/merch' },
  { label: 'about', href: '/about' },
  // { label: 'contact', href: '/contact' },
]

const tabBase = 'inline-flex items-center min-h-[44px] py-1 px-2 text-[14px] sm:inline-block sm:min-h-0 sm:py-[5px] sm:px-[10px] sm:text-[15px] no-underline font-mono bg-white text-black transition-all duration-100 hover:bg-black hover:text-white hover:no-underline'
const tabActive = 'bg-black text-white'

export default function Header() {
  const pathname = usePathname()

  return (
    <header id="site-header" className="sticky top-0 z-10 bg-white border-b-4 border-black px-4 pt-4 pb-[14px] sm:px-6 sm:pt-5 sm:pb-4">
      <div className="max-w-[700px] mx-auto flex flex-col gap-[14px]">
        <div className="inline-block px-[14px] py-[6px]">
          <h1 className="font-mono text-[22px] sm:text-[28px] font-bold leading-[1.2]">PDXmaximaLIST.info/</h1>
        </div>
        <nav className="flex flex-wrap gap-0 border-b border-black" aria-label="Main navigation">
          {navLinks.map(({ label, href }) => {
            const isActive = pathname === href
            return (
              <Link
                key={href}
                href={href}
                className={`${tabBase} ${isActive ? tabActive : ''}`}
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
