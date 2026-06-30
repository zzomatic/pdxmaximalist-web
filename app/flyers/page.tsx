import type { Metadata } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — pictures',
}

export default function FlyersPage() {
  const flyersDir = join(process.cwd(), 'public', 'flyers')
  const files = readdirSync(flyersDir)
    .filter(f => /\.(jpg|jpeg|png)$/i.test(f))
    .sort()

  return (
    <>
      <h1 className="text-[24px] font-bold font-mono mb-6">FLYERS</h1>
      <p className="mb-4 font-mono text-[14px]">{files.length} flyers</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {files.map(filename => (
          <div key={filename} className="overflow-hidden">
            <img
              src={`/flyers/${encodeURIComponent(filename)}`}
              alt={filename.replace(/\.[^.]+$/, '')}
              loading="lazy"
              className="w-full h-[180px] object-cover block"
            />
          </div>
        ))}
      </div>
    </>
  )
}
