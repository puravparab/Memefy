import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config';
import axios from 'axios'
import { parse } from 'cookie';

import styles from '../styles/TopItems.module.css'

const { publicRuntimeConfig } = getConfig();

const TopItems = () => {
	const router = useRouter()
	const [topItems, setTopItems] = useState('')

	useEffect(()=>{
		get_top_items()
	},[])

	const get_top_items = () => {
		const cookies = parse(document.cookie);
		const access_token =  cookies.access_token

		// If authenticated and access token available
		if (access_token){
			const url = publicRuntimeConfig.SERVER_URL + "api/spotify/top-items/" + access_token
			axios.get(url)
			.then(function (res){
				console.log(res)
			})
			.catch(function (error){
				console.log(error)
			})
		} else{
			router.push('/')
		}
	}

	return (
		<div className={styles.topItemsContainer}>
		</div>
	)
}

export default TopItems