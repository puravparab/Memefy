import Navbar from './Navbar.js'
import styles from '../styles/header.module.css'

const Header = () => {
	return (
		<div className={styles.header}>
			<h1>Memefy</h1>
			<Navbar />
		</div>
	)
}

export default Header