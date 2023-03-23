import Link from 'next/link'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<Link href='/'>Top Tracks/Artists</Link>
			<Link href='/Expanding'>Expanding Brain</Link>
			<Link href='/'>Iceberg</Link>
		</div>
	)
}

export default Navbar