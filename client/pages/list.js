import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'

import { parse } from 'cookie';
import Header from '../components/Header.js'
import Square from '../components/Square/Square.js'
import Footer from '../components/Footer.js'
import styles from '../styles/square.module.css'

const SquarePage = () => {
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
			sessionStorage.setItem("previous_page", '/list')
			router.push('/login')
		}
	}, [])

	return (
		<>
			<Head>
				<title>Memefy List | Download your Spotify List</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" id="viewportMeta" />
				<meta 
					name="description" 
					content="Create and share a personalized list of your favorite songs and artists with Memefy."
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content="Memefy List | Download your Spotify List" />
				<meta property="og:url" content="https://memefy.app/list" />
				<meta 
					property="og:description" 
					content="Create and share a personalized list of your favorite songs and artists with Memefy."
				/>
				<meta name="twitter:site" content="https://memefy.app/list" />
				<meta name="twitter:description" content="Create and share a personalized list of your favorite songs and artists with Memefy." />
			</Head>

			<div className={styles.squarePageContainer}>
				<Header />
				<Square />
				<Footer />
			</div>
		</>
	)
}

export default SquarePage