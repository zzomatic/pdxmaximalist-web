import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — about',
}

const btnClass = 'inline-flex items-center px-3 py-[6px] no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[44px] cursor-pointer hover:bg-black hover:text-white hover:no-underline'

export default function AboutPage() {
  return (
    <>
      <h1 className="text-[24px] font-bold font-mono mb-6">SUPPORT</h1>
      <p>
        You can support this project and keep it going...<a href="https://buymeacoffee.com/xomatic.studio" target="_blank" rel="noopener noreferrer" className="text-decoration: underline font-bold">HERE</a>
      </p>
    </>
  )
}