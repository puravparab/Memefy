import Image from 'next/image'

import styles from '../styles/footer.module.css'

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<div></div>
			<Image src="/assets/images/spotify_green.png" width={133} height={40} alt="spotify logo"/>
		</div>
	)
}

export default Footer