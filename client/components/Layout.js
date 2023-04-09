import styles from '../styles/layout.module.css'

const Layout = ({ children }) => {
	return (
		<>
			<div className={styles.container}>
				<div className={styles.pageLayout}>
					{ children }
				</div>
			</div>
		</>
	)
}

export default Layout