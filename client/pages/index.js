import { useState } from 'react'
import Head from 'next/head'

import axios from 'axios';

const Home = () => {
	const [requestSuccess, setRequestSuccess] = useState(false)

	const btnHandle = () => {
		axios.get('http://192.168.1.103:8000/')
			.then(function (res){
				console.log(res)
				setRequestSuccess(true)
			})
			.catch(function (error) {
				console.log(error)
				setRequestSuccess(false)
			})
	}

	return (
		<>
			<Head>
				<title>Memefy</title>
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

			<button onClick={btnHandle}>Yes</button>

			{requestSuccess? "Success": ""}
		</>
	)
}

export default Home