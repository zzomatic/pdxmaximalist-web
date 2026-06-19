import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — about',
}

const btnClass = 'inline-flex items-center px-3 py-[6px] no-underline font-mono text-[14px] bg-white text-black transition-all duration-100 min-h-[44px] cursor-pointer hover:bg-black hover:text-white hover:no-underline'

export default function AboutPage() {
  return (
    <>
      <h1 className="text-[24px] font-bold font-mono mb-6">ABOUT</h1>
      <p>
        This project started as a paper trifold events calendar and a desire to provide succinct accessible information about goings-on in Portlnad, Oregon, and an alternative to social media's grip on your nervous system, with minimal interface and maximum content.
      </p>

      <h2 className="text-[18px] font-bold font-mono">CONTACT PDXmaximaLIST</h2>
      <p>If you have comments, corrections, collaborations, or to contribute show flyers &amp; info...</p>
      <a href="mailto:pdxmaximalist@gmail.com" className={btnClass}>
        //email us//
      </a>

      <h2 className="text-[18px] font-bold font-mono">DONATIONS</h2>
      <p>
        Donate money to keep this project going: <a href="https://buymeacoffee.com/xomatic.studio" target="_blank" rel="noopener noreferrer">buy me a coffee</a>
      </p>

      <h2 className="text-[18px] font-bold font-mono">FRIENDS & INSPIRATIONS</h2>
      <ul>
          <li><a href='/places'>Places</a> to see live music in Portland, OR</li>
          <li><a href="https://flyerescape.dad" target="_blank" rel="noopener noreferrer">flyerescape.dad</a> list of PDX show flyers</li>
          <li><a href="http://www.foopee.com/punk/the-list/" target="_blank" rel="noopener noreferrer">The List</a>: our SF inspiration</li>
          <li>classic <a href="https://portland.craigslist.org/" target="_blank" rel="noopener noreferrer">Craigslist</a></li>
          <li><a href="https://en.wikipedia.org/wiki/List_of_lists_of_lists" target="_blank" rel="noopener noreferrer">List of lists of lists</a></li>
        </ul>
    </>
  )
}
