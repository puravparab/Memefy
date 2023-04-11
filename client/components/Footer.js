import Image from 'next/image'

import styles from '../styles/footer.module.css'
import Spotify from '../public/assets/images/spotify_green.png'

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<div></div>
			<Image src={Spotify} width={133} height={40} />
		</div>
	)
}

export default Footer