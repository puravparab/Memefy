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
	// What items should be displayed
	const [category, setCategory] = useState('tracks')
	const [range, setRange] = useState('six')
	// Store Items to be displayed
	const [tracks1, setTracks1] = useState('')
	const [tracks2, setTracks2] = useState('')
	const [tracks3, setTracks3] = useState('')
	const [artists1, setArtists1] = useState('')
	const [artists2, setArtists2] = useState('')
	const [artists3, setArtists3] = useState('')

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
		// Top tracks 
		// Last Month
		let render = data.artists.short_term.map((artist, id) => {
			return (
				<div className={styles.topItemCard} key={id}>
					<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
				</div>
			)
		})
		setTracks1(render)

		// Last six months
		render = data.artists.medium_term.map((artist, id) => {
			return (
				<div className={styles.topItemCard} key={id}>
					<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
				</div>
			)
		})
		setTracks2(render)

		// All Time
		render = data.artists.long_term.map((artist, id) => {
			return (
				<div className={styles.topItemCard} key={id}>
					<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
				</div>
			)
		})
		setTracks3(render)

		// Top Artists
	}

	// Change categories
	const categoryChange = (category) => {
		if (category == 'tracks'){setCategory(category)}
		else {setCategory('artists')}
	}
	// Change range
	const rangeChange = (r) => {
		if (r == 'one'){setRange(r)}
		else if (r == 'six'){setRange(r)}
		else {setRange(r)}
	}

	return (
		<div className={styles.topItemsContainer}>
			{render?
				<>
					<div className={styles.topItemsOptions}>
						<div className={styles.itemsTypeRow}>
							<div className={styles.itr} onClick={()=>{categoryChange('tracks')}}><span>Tracks</span></div>
							<div className={styles.itr} onClick={()=>{categoryChange('artists')}}><span>Artists</span></div>
						</div>
						<div className={styles.itemsRangeRow}>
							<div className={styles.itrr}  onClick={()=>{rangeChange('one')}}><span>Last Month</span></div>
							<div className={styles.itrr}  onClick={()=>{rangeChange('six')}}><span>Last 6 Months</span></div>
							<div className={styles.itrr}  onClick={()=>{rangeChange('all')}}><span>All Time</span></div>
						</div>
					</div>

					<div className={styles.topItemsList}>
						{category == 'tracks'?
							<>
								{range == 'one' && tracks1}
								{range == 'six' && tracks2}
								{range == 'all' && tracks3}
							</>
							:
							<>
								{range == 'one' && artists1}
								{range == 'six' && artists2}
								{range == 'all' && artists3}
							</>
						}
					</div>
					
				</>
				: ""
			}
		</div>
	)
}

export default TopItems