import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — subscribed!',
}

export default function SuccessPage() {
  return (
    <div className="border-4 border-black shadow-[4px_4px_0px_#000] p-8 flex flex-col items-center gap-6 text-center">
      <h1 className="font-mono text-[24px] font-bold uppercase">subscribed!</h1>
      <p className="font-mono text-[16px]">
        thanks for subscribing. your order is confirmed and you&apos;ll hear from us soon.
      </p>
      <div className="flex flex-wrap gap-4 justify-center">
        <Link
          href="/merch"
          className="inline-flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_#000] px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] no-underline transition-all duration-100 hover:bg-black hover:text-white hover:shadow-none"
        >
          [ BACK TO MERCH ]
        </Link>
        <Link
          href="/"
          className="inline-flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_#000] px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] no-underline transition-all duration-100 hover:bg-black hover:text-white hover:shadow-none"
        >
          [ BACK TO SHOWS ]
        </Link>
      </div>
    </div>
  )
}
