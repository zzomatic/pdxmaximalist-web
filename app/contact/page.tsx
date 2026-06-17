import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — contact',
}

const btnClass = 'inline-flex items-center px-3 py-[6px] no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[44px] cursor-pointer hover:bg-black hover:text-white hover:no-underline'

export default function ContactPage() {
  return (
    <>
      <h1 className="text-[24px] font-bold font-mono mb-6">CONTACT</h1>
      <div className="px-8 py-12 flex flex-col items-start gap-4 sm:px-8 sm:py-12 px-4 py-8">
        <p className="text-base">comments, corrections, or tips?</p>
        <a href="mailto:pdxmaximalist@gmail.com" className={btnClass}>
          //email us//
        </a>
        <p className="text-[14px]">pdxmaximalist@gmail.com</p>
      </div>
    </>
  )
}
