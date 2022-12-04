import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      Show <Link href='/planets'>List of planets</Link>
    </div>
  )
}
