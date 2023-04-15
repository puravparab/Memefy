import Header from '../components/Header.js'
import Footer from '../components/Footer.js'

import styles from '../styles/home.module.css'

const About = () => {
	return (
		<div className={styles.homeContainer}>
			<Header />

			<div className={styles.aboutContainer}>
				<h2>About</h2>
				<div className={styles.aboutSection}>
					<p>Memefy is an application that lets you view your top tracks and top artists based on your spotify listening history. Memefy also lets you download lists that can be shared.</p>
				</div>

				<h2>FAQ</h2>
				<div className={styles.aboutSection}>
					<h3>How does Memefy get your listening data?</h3>
					<p>Memefy uses the Spotify API to get your toip tracks and artists.</p>
				</div>
				<div className={styles.aboutSection}>
					<h3>How do I download my lists?</h3>
					<p>
						On mobile you need to click on your preferred combination (eg: Tracks, 6 Months) and click on generate. 
						After the image is generated you can click on the download button or manually save the image. 
					</p>
					<p>
						If you are using a desktop you can click on the download button to save the image. 
						If this does not work you can always capture a screenshot and crop the image.
					</p>
				</div>
				<div className={styles.aboutSection}>
					<h3>Memefy List or Top Tracks/Artists don't appear!</h3>
					<p>
						If your Memefy List or top tracks/artists does not appear this could either be an issue with our servers or Spotify's API service. 
						Either way your best option is to clear cookies and other site data and refresh the website until your preferred content appears.
					</p>
				</div>
				<div className={styles.aboutSection}>
					<h3>How do I log out of my current spotify account</h3>
					<p>You can visit this site (
						<a href="https://www.spotify.com/account">https://www.spotify.com/account</a>
						) and log out of your spotify account.
					</p>
				</div>
				<div className={styles.aboutSection}>
					<h3>How do I contact the team?</h3>
					<p>
						For media/business inquires, feedback or feature requests you can contact our team at <a href="mailto:memefyteam@gmail.com">memefyteam@gmail.com</a>
					</p>
				</div>

				<h2>Privacy Policy</h2>
				<div className={styles.aboutSection}>
					<p>Memefy uses Spotify's API to obtain the user's profile, top tracks and artists.</p>
					<p>None of the data provided to us by Spotify is stored or shared with third parties.</p>
					<p>If you want to revoke Memefy's permissions, you can visit (
						<a href="https://www.spotify.com/account/apps">https://www.spotify.com/account/apps</a> 
						) and manually remove Memefy from your allowed apps on Spotify.
					</p>
				</div>
			</div>

			<Footer />
		</div>
	)
}

export default About