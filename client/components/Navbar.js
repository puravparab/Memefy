import Link from 'next/link'
import styles from '../styles/navbar.module.css'

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			<Link href='/'>Top</Link>
			<Link href='/iceberg'>Iceberg</Link>
			<Link href='/list'>List</Link>
			<Link href='/innercircle'>Inner circle</Link>
			<Link href='/other'>Templates</Link>
		</div>
	)
}

export default Navbar