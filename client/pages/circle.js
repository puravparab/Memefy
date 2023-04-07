import { useState, useEffect } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'

import { parse } from 'cookie';
import Header from '../components/Header.js'
import Circle from '../components/Circle/Circle.js'
import styles from '../styles/circle.module.css'

const CirclePage = () => {
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
			sessionStorage.setItem("previous_page", '/circle')
			router.push('/login')
		}
	}, [])

	return (
		<>
			<Head>
				<title>your inner circle | Memefy</title>
				<meta name="viewport" content="width=device-width, initial-scale=1.0" id="viewportMeta" />
				<meta 
					name="description" 
					content="Create your spotify inner circle."
				/>
				{/* <link rel="canonical" href="/" /> */}
				<meta property="og:title" content=">Your inner circle | Memefy" />
				<meta property="og:url" content="https://memefy.app/circle" />
				<meta 
					property="og:description" 
					content="Create your spotify inner circle."
				/>
				<meta name="twitter:site" content="https://memefy.app/circle" />
				<meta name="twitter:description" content="Create your spotify inner circle." />
			</Head>

			<div className={styles.circlePageContainer}>
				<Header />
				<Circle />
			</div>
		</>
	)
}

export default CirclePage