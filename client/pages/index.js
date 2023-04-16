import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { parse } from 'cookie';
import Header from '../components/Header.js'
import TopItems from '../components/TopItems.js'
import Footer from '../components/Footer.js'
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
				<title>Memefy</title>
				<meta 
					name="description" 
					content="Create and share your spotify List. Find out your top tracks and artists on spotify."
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content=">Memefy" />
				<meta property="og:url" content="https://memefy.app" />
				<meta 
					property="og:description" 
					content="Create and share your spotify List. Find out your top tracks and artists on spotify."
				/>
				<meta name="twitter:site" content="https://memefy.app" />
				<meta name="twitter:description" content="Create and share your spotify List. Find out your top tracks and artists on spotify." />
			</Head>

			<div className={styles.homeContainer}>
				<Header />
				<TopItems />
				<Footer />
			</div>
		</>
	)
}

export default Home