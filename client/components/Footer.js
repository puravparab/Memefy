import Image from 'next/image'
import Spotify from '../public/assets/images/spotify_green.png'
import styles from '../styles/footer.module.css'

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<div></div>
			<Image src={Spotify} width={133} height={40} alt="spotify logo"/>
		</div>
	)
}

export default Footer