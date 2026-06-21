'use client'
import { useState } from 'react'
import { track } from '@/lib/analytics'

const btnClass =
  'inline-flex items-center justify-center appearance-none border-4 border-black shadow-[2px_2px_0px_#000] px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] transition-all duration-100 hover:bg-black hover:text-white hover:shadow-none'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function FlyerForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const loading = status === 'loading'

  return (
    <div className="flex flex-col gap-3">
      <a
        href="/PDXmaximaLIST.pdf"
        download
        className={btnClass}
        aria-label="Download the weekly flyer PDF"
        onClick={() => track('merch_get_it_click')}
      >
        DOWNLOAD FLYER
      </a>

      {status === 'success' ? (
        <p className="font-bold font-mono text-[14px]" role="status" aria-live="polite">
          thanks! you&apos;re on the list for weekly flyers.
        </p>
      ) : (
        <form
          className="flex flex-col gap-3 relative"
          onSubmit={async (e) => {
            e.preventDefault()
            const honeypot = (new FormData(e.currentTarget)).get('website') as string

            if (!email) return

            setStatus('loading')
            setErrorMsg('')

            try {
              const res = await fetch('/api/capture-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, website: honeypot }),
              })

              const data = await res.json()
              if (!res.ok) throw new Error(data.error ?? 'Something went wrong')

              track('flyer_email_submit', { submitted: true })
              setStatus('success')
            } catch (err) {
              setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
              setStatus('error')
            }
          }}
        >
          {/* Honeypot — hidden from users, filled by bots */}
          <div className="absolute -left-[9999px] top-0" aria-hidden="true">
            <label htmlFor="hp-website">Leave this blank</label>
            <input
              type="text"
              id="hp-website"
              name="website"
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          <label htmlFor="flyer-email" className="font-mono text-[14px] font-bold uppercase">
            get it every week (optional)
          </label>
          <input
            id="flyer-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            disabled={loading}
            className="border-4 border-black px-3 py-2 font-mono text-[14px] bg-white text-black w-full focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={loading || !email}
            aria-busy={loading}
            className={`${btnClass} ${loading || !email ? 'opacity-50 font-mono text-[14px] cursor-not-allowed' : 'cursor-pointer'}`}
          >
            {loading ? '...' : 'SUBSCRIBE'}
          </button>
          {status === 'error' && (
            <p className="font-mono text-[13px] text-black" role="alert" aria-live="assertive">
              {errorMsg}
            </p>
          )}
        </form>
      )}
    </div>
  )
}
// 'use client'
// import { useState } from 'react'
// import { track } from '@/lib/analytics'

// const btnClass =
//   'inline-flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_#000] px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] transition-all duration-100 hover:bg-black hover:text-white hover:shadow-none'

// type Status = 'idle' | 'loading' | 'success' | 'error'

// export default function FlyerForm() {
//   const [email, setEmail] = useState('')
//   const [status, setStatus] = useState<Status>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   if (status === 'success') {
//     return (
//       <div className="flex flex-col gap-3" role="status" aria-live="polite">
//         <p className="font-bold font-mono text-[14px]">thanks! your download is ready.</p>
//         <a
//           href="/PDXmaximaLIST.pdf"
//           download
//           className={btnClass}
//           aria-label="Download the weekly flyer PDF"
//         >
//           [ DOWNLOAD FLYER ]
//         </a>
//       </div>
//     )
//   }

//   const loading = status === 'loading'

//   return (
//     <form
//       className="flex flex-col gap-3 relative"
//       onSubmit={async (e) => {
//         e.preventDefault()
//         const honeypot = (new FormData(e.currentTarget)).get('website') as string

//         track('merch_get_it_click')
//         setStatus('loading')
//         setErrorMsg('')

//         try {
//           const res = await fetch('/api/capture-email', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, website: honeypot }),
//           })

//           const data = await res.json()
//           if (!res.ok) throw new Error(data.error ?? 'Something went wrong')

//           track('flyer_email_submit', { submitted: true })
//           setStatus('success')
//         } catch (err) {
//           setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
//           setStatus('error')
//         }
//       }}
//     >
//       {/* Honeypot — hidden from users, filled by bots */}
//       <div className="absolute -left-[9999px] top-0" aria-hidden="true">
//         <label htmlFor="hp-website">Leave this blank</label>
//         <input
//           type="text"
//           id="hp-website"
//           name="website"
//           tabIndex={-1}
//           autoComplete="off"
//         />
//       </div>

//       <label htmlFor="flyer-email" className="font-mono text-[14px] font-bold uppercase">
//         your email
//       </label>
//       <input
//         id="flyer-email"
//         type="email"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="you@example.com"
//         disabled={loading}
//         className="border-4 border-black px-3 py-2 font-mono text-[14px] bg-white text-black w-full focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:opacity-50"
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         aria-busy={loading}
//         className={`${btnClass} ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
//       >
//         {loading ? '...' : '[ GET IT ]'}
//       </button>
//       {status === 'error' && (
//         <p className="font-mono text-[13px] text-black" role="alert" aria-live="assertive">
//           {errorMsg}
//         </p>
//       )}
//     </form>
//   )
// }

// 'use client'
// import { useState } from 'react'
// import { track } from '@/lib/analytics'

// const btnClass =
//   'inline-flex items-center justify-center border-4 border-black shadow-[2px_2px_0px_#000] px-3 py-[6px] font-mono text-[14px] font-bold bg-white text-black min-h-[44px] transition-all duration-100 hover:bg-black hover:text-white hover:shadow-none'

// type Status = 'idle' | 'loading' | 'success' | 'error'

// export default function FlyerForm() {
//   const [email, setEmail] = useState('')
//   const [status, setStatus] = useState<Status>('idle')
//   const [errorMsg, setErrorMsg] = useState('')

//   if (status === 'success') {
//     return (
//       <div className="flex flex-col gap-3" role="status" aria-live="polite">
//         <p className="font-bold font-mono text-[14px]">thanks! your download is ready.</p>
//         {/* TODO: replace with real flyer PDF — place at public/flyer.pdf and update href to '/flyer.pdf' */}
//         <a
//           href="#"
//           className={btnClass}
//           onClick={(e) => e.preventDefault()}
//           aria-label="Download the weekly flyer PDF"
//         >
//           [ DOWNLOAD FLYER ]
//         </a>
//       </div>
//     )
//   }

//   const loading = status === 'loading'

//   return (
//     <form
//       className="flex flex-col gap-3 relative"
//       onSubmit={async (e) => {
//         e.preventDefault()
//         const honeypot = (new FormData(e.currentTarget)).get('website') as string

//         track('merch_get_it_click')
//         setStatus('loading')
//         setErrorMsg('')

//         try {
//           const res = await fetch('/api/capture-email', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ email, website: honeypot }),
//           })

//           const data = await res.json()
//           if (!res.ok) throw new Error(data.error ?? 'Something went wrong')

//           track('flyer_email_submit', { submitted: true })
//           setStatus('success')
//         } catch (err) {
//           setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
//           setStatus('error')
//         }
//       }}
//     >
//       {/* Honeypot — hidden from users, filled by bots */}
//       <div className="absolute -left-[9999px] top-0" aria-hidden="true">
//         <label htmlFor="hp-website">Leave this blank</label>
//         <input
//           type="text"
//           id="hp-website"
//           name="website"
//           tabIndex={-1}
//           autoComplete="off"
//         />
//       </div>

//       <label htmlFor="flyer-email" className="font-mono text-[14px] font-bold uppercase">
//         your email
//       </label>
//       <input
//         id="flyer-email"
//         type="email"
//         required
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="you@example.com"
//         disabled={loading}
//         className="border-4 border-black px-3 py-2 font-mono text-[14px] bg-white text-black w-full focus-visible:outline-2 focus-visible:outline-black focus-visible:outline-offset-2 disabled:opacity-50"
//       />
//       <button
//         type="submit"
//         disabled={loading}
//         aria-busy={loading}
//         className={`${btnClass} ${loading ? 'opacity-50 cursor-wait' : 'cursor-pointer'}`}
//       >
//         {loading ? '...' : '[ GET IT ]'}
//       </button>
//       {status === 'error' && (
//         <p className="font-mono text-[13px] text-black" role="alert" aria-live="assertive">
//           {errorMsg}
//         </p>
//       )}
//     </form>
//   )
// }
