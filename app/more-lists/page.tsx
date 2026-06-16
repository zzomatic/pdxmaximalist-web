import type { Metadata } from 'next'
import styles from '@/app/shared.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — more lists',
}

export default function ListsPage() {
  return (
    <>
      <h1 className={styles.pageHeader}>MORE LISTS</h1>
      <ul>
          <li><a href='/places'>Places</a> to see live music in Portland, OR</li>
          <li><a href="https://flyerescape.dad" target="_blank" rel="noopener noreferrer">flyerescape.dad</a> List of PDX show flyers</li>
          <li><a href="http://www.foopee.com/punk/the-list/" target="_blank" rel="noopener noreferrer">The List</a> our SF inspiration</li>
          <li><a href="https://portland.craigslist.org/" target="_blank" rel="noopener noreferrer">Craigslist</a> classic</li>
          <li><a href="https://www.nps.gov/subjects/nationalregister/database-research.htm" target="_blank" rel="noopener noreferrer">The National Registry of Historic Places</a></li>
          <li><a href="https://thefouragreements.com/" target="_blank" rel="noopener noreferrer">The Four Aggreements</a></li>
          <li><a href="https://substackcdn.com/image/fetch/$s_!M2TL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e77780c-5396-4d6c-beea-e513237b36c2_550x781.jpeg" target="_blank" rel="noopener noreferrer">Joan Didion's Packing List</a></li>
          <li><a href="https://www.archives.gov/founding-docs/bill-of-rights-transcript" target="_blank" rel="noopener noreferrer">The Bill of Rights</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Seven_deadly_sins" target="_blank" rel="noopener noreferrer">The Seven Deadly Sins</a></li>
          <li><a href="https://broadstreetonline.org/wp-content/uploads/2014/02/houdini-pic-houdin_3052580c.jpg">Houdini's Prop List</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Listicle" target="_blank" rel="noopener noreferrer">Listicles</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Ten_Commandments" target="_blank" rel="noopener noreferrer">Ten Commandments</a></li>
          <li><a href="https://en.wikipedia.org/wiki/List_of_lists_of_lists" target="_blank" rel="noopener noreferrer">List of lists of lists</a></li>
        </ul>
    </>
  )
}
