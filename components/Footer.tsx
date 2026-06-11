import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        PDXmaximaLIST.info · portland, or · enjoy this? <a href="https://buymeacoffee.com/xomatic.studio" target="_blank" rel="noopener noreferrer">donate or buy me a coffee</a>
      </div>
    </footer>
  )
}
