import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { parse } from 'cookie';

import Navbar from '../components/Navbar.js'
import Login from '../components/Login.js'
import styles from '../styles/home.module.css'

const Home = () => {
	const [showHome, setShowHome] = useState(false)
	const router = useRouter()

	useEffect(() => {
		const previous_page = sessionStorage.getItem('previous_page')
		const cookies = parse(document.cookie);
		const access_token =  cookies.access_token
		const refresh_token =  cookies.refresh_token
		if (access_token){
			if (previous_page != '/' && previous_page){
				router.push(previous_page)
			}
			if (previous_page == '/' && previous_page){
				setShowHome(true)
			}
		}
		
	}, [])

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