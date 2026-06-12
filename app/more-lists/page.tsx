import type { Metadata } from 'next'
import styles from '@/app/shared.module.css'

export const metadata: Metadata = {
  title: 'PDXmaximaLIST.info — more lists',
}

export default function FriendsPage() {
  return (
    <>
      <h1 className={styles.pageHeader}>MORE LISTS</h1>
      <div className={`${styles.card}`}>
        <ul>
          <li><a href="http://www.foopee.com/punk/the-list/">The List</a> SF inspiration</li>
          <li><a href="flyerescape.dad">flyerescape.dad</a> list of PDX show flyers</li>
          <li><a href="https://portland.craigslist.org/">Craigslist</a></li>
          <li><a href="https://www.nps.gov/subjects/nationalregister/database-research.htm">The National Registry of Historic Places</a></li>
          <li><a href="https://thefouragreements.com/">The Four Aggreements</a></li>
          <li><a href="https://substackcdn.com/image/fetch/$s_!M2TL!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F7e77780c-5396-4d6c-beea-e513237b36c2_550x781.jpeg">Joan Didion's Packing List</a></li>
          <li><a href="https://www.archives.gov/founding-docs/bill-of-rights-transcript">The Bill of Rights</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Seven_deadly_sins">The Seven Deadly Sins</a></li>
          <li><a href="https://broadstreetonline.org/wp-content/uploads/2014/02/houdini-pic-houdin_3052580c.jpg">Houdini's Prop List</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Listicle">Listicles</a></li>
          <li><a href="https://en.wikipedia.org/wiki/Ten_Commandments">Ten Commandments</a></li>
          <li><a href="https://en.wikipedia.org/wiki/List_of_lists_of_lists">List of lists of lists</a></li>
        
        </ul>
      </div>
    </>
  )
}
