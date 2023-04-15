import Image from 'next/image'
import Link from 'next/link'
import Spotify from '../public/assets/images/spotify_green.png'
import styles from '../styles/footer.module.css'

const Footer = () => {
	return (
		<div className={styles.footerContainer}>
			<Image src={Spotify} width={120} height={35} alt="spotify logo"/>
			<div className={styles.footerLinks}>
				<Link href='/about'>
					About
				</Link>
				<p>	&#169; Memefy 2023</p>
			</div>
		</div>
	)
}

export default Footer