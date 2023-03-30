import Link from 'next/link'
import styles from '../styles/header.module.css'

const Navbar = () => {
	return (
		<div className={styles.navbar}>
			{/* <Link href='/listfy'>Listfy</Link> */}
			<Link href='/'>Top</Link>
			{/* <Link href='/iceberg'>Iceberg</Link> */}
			<Link href='/circle'>Inner circle</Link>
			{/* <Link href='/other'>Templates</Link> */}
		</div>
	)
}

export default Navbar