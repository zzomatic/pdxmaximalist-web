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
        This project started as a paper trifold events calendar and a desire to provide succinct accessible information about music & arts events in Portlnad, Oregon. We added a website to make the list truely accessible. As alternative to social media's grip on your nervous system, we provide minimal interface and maximum content.
      </p>
<br></br>
      <h2 className="text-[18px] font-bold font-mono">A11y</h2>
      <p>Accessible Show Listings are priority! We try hard to keep this page accessible, though we recently added a page of images of flyers in the wild that do not have alt-text...and that is part of the problem we're solving. The alt-text is the show listing. </p>

<br></br>
      <h2 className="text-[18px] font-bold font-mono">DISCLAIMER</h2>
      <p>Show info is sourced from events calendars and show flyers. We try hard not to, but sometimes we get it wrong. Links provided where we have them, so you can check the venue before heading to the show.</p>
<br></br>
      <h2 className="text-[18px] font-bold font-mono">CONTACT PDXmaximaLIST</h2>
      <p>If you have comments, corrections, collaborations, or to contribute show flyers/info <a href="mailto:pdxmaximalist@gmail.com" className="text-decoration: underline font-bold">
        send an email
      </a></p>
<br></br>
      <h2 className="text-[18px] font-bold font-mono">DONATIONS</h2>
      <p>
        You can donate to keep this project going: <a href="https://buymeacoffee.com/xomatic.studio" target="_blank" rel="noopener noreferrer">buy me a coffee</a>
      </p>
<br></br>
      <h2 className="text-[18px] font-bold font-mono">FRIENDS & INSPIRATIONS</h2>
      <ul>
          {/* <li><a href='/places'>Places</a> to see live music in Portland, OR</li> */}
          <li><a href="https://flyerescape.dad" className="font-bold underline" target="_blank" rel="noopener noreferrer">flyerescape.dad</a> curated list of PDX show flyers and beyond...</li>
          <li><a href="http://www.foopee.com/punk/the-list/" className="font-bold underline" target="_blank" rel="noopener noreferrer">The List</a> classic SF show list</li>
          <li><a href="http://seee.ee/" className="font-bold underline" target="_blank" rel="noopener noreferrer">seee.ee</a> PDX version</li>
          <li><a href="http://www.wordvirusbooks.com/" className="font-bold underline" target="_blank" rel="noopener noreferrer">Word Virus Books</a></li>
      </ul>
    </>
  )
}
