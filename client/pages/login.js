import Head from 'next/head'
import LoginBtn from '../components/LoginBtn.js'
import Footer from '../components/Footer.js'
import styles from '../styles/login.module.css'

const LoginPage = () => {
	return (
		<>
			<Head>
				<title>Memefy Login | Discover and Download Your favorite Spotify songs and artists</title>
				<meta 
					name="description" 
					content="Create and share a personalized list of your favorite songs and artists with Memefy. Discover your favorite artists and songs on Spotify with Memefy! Explore your most listened to tracks and artists, and enjoy previews of each song."
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Memefy Login | Discover and Download Your favorite Spotify songs and artists" />
				<meta property="og:url" content="https://memefy.app/login" />
				<meta 
					property="og:description" 
					content="Create and share a personalized list of your favorite songs and artists with Memefy. Discover your favorite artists and songs on Spotify with Memefy! Explore your most listened to tracks and artists, and enjoy previews of each song."
				/>
			</Head>

			<div className={styles.loginPageContainer}>
				<div className={styles.loginInterface}>
					<h1>Memefy</h1>
					<LoginBtn />
					<Footer />
				</div>
			</div>
		</>
	)
}

export default LoginPage