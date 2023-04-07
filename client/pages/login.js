import Head from 'next/head'
import LoginBtn from '../components/LoginBtn.js'
import styles from '../styles/login.module.css'

const LoginPage = () => {
	return (
		<>
			<Head>
				<title>Loging | Memefy</title>
				<meta 
					name="description" 
					content="Create your spotify inner circle. Find out you top tracks and artists on spotify."
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content=">Memefy" />
				<meta property="og:url" content="https://memefy.app/login" />
				<meta 
					property="og:description" 
					content="Create your spotify inner circle. Find out you top tracks and artists on spotify."
				/>
			</Head>

			<div className={styles.loginPageContainer}>
				<div className={styles.loginInterface}>
					<h1>Memefy</h1>
					<LoginBtn />
				</div>
			</div>
		</>
	)
}

export default LoginPage