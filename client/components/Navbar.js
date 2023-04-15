import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from '../styles/header.module.css'

const Navbar = () => {
	const router = useRouter()

	const isActiveLink = (page) => {
		return router.pathname === page? styles.active: ""
	}

	return (
		<div className={styles.navbar}>
			<Link href='/' className={isActiveLink('/')}>Top</Link>
			<Link href='/list' className={isActiveLink('/list')}>List</Link>
			{/* <Link href='/circle' className={isActiveLink('/circle')}>Inner circle</Link> */}
			{/* <Link href='/iceberg'>Iceberg</Link> */}
			{/* <Link href='/other'>Templates</Link> */}
		</div>
	)
}

export default Navbar