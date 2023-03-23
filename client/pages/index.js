import { useState } from 'react'
import Head from 'next/head'

import Navbar from '../components/Navbar.js'
import Login from '../components/Login.js'
import styles from '../styles/home.module.css'

const Home = () => {
	const [showHome, setShowHome] = useState(false)

	return (
		<>
			<Head>
				<title>MemeFy</title>
				<meta 
					name="description" 
					content="Create personalized memes based on you listening history"
				/>
				<link rel="canonical" href="/" />
				<meta property="og:title" content=">Memefy" />
				<meta property="og:url" content="" />
				<meta 
					property="og:description" 
					content="Create personalized memes based on you listening history"
				/>
			</Head>

			<div className={styles.homeContainer}>
				{showHome?
					<>
						<h1>Memefy</h1> 
						<Navbar />
					</>:
					<div className={styles.homeNoAuth}>
						<h1>Memefy</h1>
						<Login />
					</div>
				}
			</div>
		</>
	)
}

export default Home