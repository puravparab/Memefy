import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import { parse } from 'cookie';

import Navbar from '../components/Navbar.js'
import TopItems from '../components/TopItems.js'
import styles from '../styles/home.module.css'

const Home = () => {
	const router = useRouter()

	useEffect(() => {
		const cookies = parse(document.cookie)
		const access_token =  cookies.access_token
		const refresh_token =  cookies.refresh_token
		const top_items = JSON.parse(sessionStorage.getItem('top_items'))

		if (access_token || top_items){
			sessionStorage.removeItem('previous_page')
		}
		else{
			sessionStorage.setItem("previous_page", '/')
			router.push('/login')
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
				<h1>Memefy</h1> 
				<Navbar />
				<TopItems />
			</div>
		</>
	)
}

export default Home