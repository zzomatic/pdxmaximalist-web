import Link from 'next/link'

const btnClass = 'inline-flex items-center px-3 py-[6px] no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[44px] hover:bg-black hover:text-white hover:no-underline'

export default function NotFound() {
  return (
    <div className="px-8 py-12 text-center flex flex-col items-center gap-5">
      <h1 className="text-[24px] font-bold font-mono">404</h1>
      <div className="text-base">page not found</div>
      <Link href="/" className={btnClass}>
        BACK TO SHOWS
      </Link>
    </div>
  )
}
