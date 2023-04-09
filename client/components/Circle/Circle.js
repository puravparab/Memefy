import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import getConfig from 'next/config';
import axios from 'axios'
import { parse } from 'cookie';

import ArtistList from './ArtistList.js'
import DisplayCircle from './DisplayCircle.js'
import styles from '../../styles/circle.module.css'

const { publicRuntimeConfig } = getConfig();

const Circle = () => {
	const router = useRouter()
	// check if component should render
	const [render, setRender] = useState(true)

	// What items should be displayed
	const [range, setRange] = useState('six')
	// Change range
	const rangeChange = (r) => {
		if (r == 'one'){setRange(r)}
		else if (r == 'six'){setRange(r)}
		else {setRange(r)}
	}

	// Slider
	const [sliderValue, setSliderValue] = useState(3)
	const handleSlider = (e) => {
		setSliderValue(parseInt(e.target.value))
	}

	// Store rendered components to be displayed
	const [displayCircle1, setDisplayCircle1] = useState('')
	const [displayCircle2, setDisplayCircle2] = useState('')
	const [displayCircle3, setDisplayCircle3] = useState('')
	const [artistListS, setArtistListS] = useState('')
	const [artistListM, setArtistListM] = useState('')
	const [artistListL, setArtistListL] = useState('')

	useEffect(()=>{
		get_top_items()
	},[])

	useEffect(()=>{
		get_top_items()
	},[sliderValue])

	// Send a request to the server to get top items 
	const get_top_items = () => {
		const cookies = parse(document.cookie);
		const access_token =  cookies.access_token
		let top_items = JSON.parse(sessionStorage.getItem('top_items'))
		let user_profile = JSON.parse(sessionStorage.getItem('user_profile'))

		// If top items are already stored
		if (top_items && user_profile){
			renderCircle(top_items, user_profile)
			renderArtistList(top_items, sliderValue)
			setRender(true)
		}
		else{
			// If authenticated and access token available
			if (access_token){
				// Populate top items
				let url = publicRuntimeConfig.SERVER_URL + "api/spotify/top-items/" + access_token
				axios.get(url)
				.then(function (res){
					sessionStorage.setItem("top_items", JSON.stringify(res.data))
					let top_items = JSON.parse(sessionStorage.getItem('top_items'))
					if (top_items){
						// Get user profile
						url = publicRuntimeConfig.SERVER_URL + "api/spotify/user-profile/" + access_token
						axios.get(url)
							.then(function (res){
								sessionStorage.setItem("user_profile", JSON.stringify(res.data))
								let user_profile = JSON.parse(sessionStorage.getItem('user_profile'))
								// If user profile are already stored
								if (user_profile){
									renderCircle(top_items, user_profile)
									renderArtistList(top_items, sliderValue)
									setRender(true)
								}
								else{
									// TODO
								}
							})
							.catch(function (error){
								console.log(error)
								setRender(false)
							})
					}
					else{
						// TODO
					}
				})
				.catch(function (error){
					console.log(error)
					setRender(false)
				})
			} else{
				router.push('/login')
			}
		}
	}

	// Render circle
	const renderCircle = (data, user_profile) => {
		let renderData
		const noData = () => {return  (<div className={styles.noItemText}>Listen to more songs!</div>)}

		// LAST MONTH
		if (data.artists.short_term.length == 0) {renderData = noData}
		else{
			let artist_list = []
			data.artists.short_term.map((artist, id) => {
				artist_list.push(artist.image)
			})
			renderData = () => {return <DisplayCircle artist_list={artist_list} user_profile={user_profile} rings={sliderValue} range={"Last Month"}/>}
		}
		setDisplayCircle1(renderData)

		// LAST 6 MONTHS
		if (data.artists.medium_term.length == 0) {renderData = noData}
		else{
			let artist_list = []
			data.artists.medium_term.map((artist, id) => {
				artist_list.push(artist.image)
			})
			renderData = () => {return (<DisplayCircle artist_list={artist_list} user_profile={user_profile} rings={sliderValue} range={"Last 6 Months"}/>)}
		}
		setDisplayCircle2(renderData)

		// ALL TIME
		if (data.artists.long_term.length == 0) {renderData = noData}
		else{
			let artist_list = []
			data.artists.long_term.map((artist, id) => {
				artist_list.push(artist.image)
			})
			renderData = () => {return <DisplayCircle artist_list={artist_list} user_profile={user_profile} rings={sliderValue} range={"All Time"}/>}
		}
		setDisplayCircle3(renderData)
	}

	// Render artist List
	const renderArtistList = (data, num_rings) => {
		const noData = () => {return  (<div className={styles.noItemText}></div>)}
		if (data.artists.short_term.length == 0) {setArtistListS(noData)}
		else{setArtistListS(() => {return (<ArtistList artists={data.artists.short_term} ring={num_rings}/>)})}

		if (data.artists.medium_term.length == 0) {setArtistListM(noData)}
		else{setArtistListM(() => {return (<ArtistList artists={data.artists.medium_term} ring={num_rings}/>)})}

		if (data.artists.long_term.length == 0) {setArtistListL(noData)}
		else{setArtistListL(() => {return (<ArtistList artists={data.artists.long_term} ring={num_rings}/>)})}
	}

	return (
		<div className={styles.circleContainer}>
			{render ? 
				<>
					<div className={styles.circleOptions}>
						<div className={styles.circleRangeRow}>
							<div className={range == 'one'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('one')}}><span>Last Month</span></div>
							<div className={range == 'six'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('six')}}><span>Last 6 Months</span></div>
							<div className={range == 'all'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('all')}}><span>All Time</span></div>
						</div>

						<div className={styles.circleRingSlider}>
							<input type="range" min="1" max="3" step="1" value={sliderValue} onChange={handleSlider}/>
							<span>
								{sliderValue === 1 && "Small"}
								{sliderValue === 2 && "Medium"}
								{sliderValue === 3 && "Large"}
							</span>
						</div>
					</div>
					
					{range == 'one' && displayCircle1}
					{range == 'six' && displayCircle2}
					{range == 'all' && displayCircle3}

					<div className={styles.circleArtistList}>
						{range == 'one' && artistListS}
						{range == 'six' && artistListM}
						{range == 'all' && artistListL}
					</div>
				</>
				: 
				""
			}
		</div>
	)
}

export default Circle