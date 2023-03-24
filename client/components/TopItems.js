import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import getConfig from 'next/config';
import axios from 'axios'
import { parse } from 'cookie';

import styles from '../styles/topitems.module.css'

const { publicRuntimeConfig } = getConfig();

const TopItems = () => {
	const router = useRouter()
	// check if component should render
	const [render, setRender] = useState(false) 
	// Store Items to be displayed
	const [topItems, setTopItems] = useState('')

	useEffect(()=>{
		get_top_items()
	},[])

	// Send a request to the server to get top items 
	const get_top_items = () => {
		const cookies = parse(document.cookie);
		const access_token =  cookies.access_token

		let top_items = JSON.parse(sessionStorage.getItem('top_items'))

		// If top items are already stored
		if (top_items){
			renderList(top_items)
			setRender(true)
		}
		else{
			// If authenticated and access token available
			if (access_token){
				const url = publicRuntimeConfig.SERVER_URL + "api/spotify/top-items/" + access_token
				axios.get(url)
				.then(function (res){
					sessionStorage.setItem("top_items", JSON.stringify(res.data))
					let top_items = JSON.parse(sessionStorage.getItem('top_items'))
					// If top items are already stored
					if (top_items){
						renderList(top_items)
						setRender(true)
					}
				})
				.catch(function (error){
					console.log(error)
				})
			} else{
				router.push('/')
			}
		}
	}

	// Parse through data and create components for all permutations of lists
	const renderList = (data) => {
		const render = data.artists.medium_term.map((artist, id) => {
			return (
				<div className={styles.topItemCard} key={id}>
					<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
				</div>
			)
		})
		setTopItems(render)
	}

	return (
		<div className={styles.topItemsContainer}>
			{render?
				<>
					<div className={styles.topItemsOptions}>
						<div className={styles.itemsTypeRow}>
							<div className={styles.itr}><span>Tracks</span></div>
							<div className={styles.itr}><span>Artists</span></div>
						</div>
						<div className={styles.itemsRangeRow}>
							<div className={styles.itrr}><span>Last Month</span></div>
							<div className={styles.itrr}><span>Last 6 Months</span></div>
							<div className={styles.itrr}><span>All Time</span></div>
						</div>
					</div>

					<div className={styles.topItemsList}>
						{topItems}
					</div>
					
				</>
				: ""
			}
		</div>
	)
}

export default TopItems