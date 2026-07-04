import type { Metadata } from 'next'
import { readdirSync } from 'fs'
import { join } from 'path'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — pictures of flyers',
}

export default function FlyersPage() {
  const stackedDir = join(process.cwd(), 'public', 'stacked_flyers')
  let files: string[] = []
  try {
    files = readdirSync(stackedDir).filter(f => /\.jpg$/i.test(f)).sort()
  } catch {
    // directory absent in production
  }

  return (
    <>
        <h1 className="text-[24px] font-bold font-mono mb-6">SOURCE DATA</h1>
        <div className="grid grid-cols-2 sm:grid-cols-4 -mx-4 sm:-mx-6">
        {files.map(filename => (
            <img
            key={filename}
            src={`/stacked_flyers/${filename}`}
            alt={filename.replace(/\.[^.]+$/, '')}
            loading="lazy"
            className="w-full h-auto block"
            />
        ))}
        </div>
    </>
  )
}
