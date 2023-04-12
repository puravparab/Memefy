import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config';
import axios from 'axios'
import { parse } from 'cookie';

import { ArtistCard, TrackCard} from './Card.js'
import styles from '../../styles/square.module.css'

const { publicRuntimeConfig } = getConfig();

const Square = () => {
	const router = useRouter()
	const [render, setRender] = useState(false)

	// What items should be displayed
	const [category, setCategory] = useState('artists')
	const [range, setRange] = useState('six')

	// Change categories
	const categoryChange = (c) => {
		if (category === c){}
		else{setCategory(c)}
	}
	// Change range
	const rangeChange = (r) => {
		if (r == 'one'){setRange(r)}
		else if (r == 'six'){setRange(r)}
		else {setRange(r)}
	}

	// Store rendered components to be displayed
	const [TrackCard1, setTrackCard1] = useState('')
	const [TrackCard2, setTrackCard2] = useState('')
	const [TrackCard3, setTrackCard3] = useState('')
	const [ArtistCard1, setArtistCard1] = useState('')
	const [ArtistCard2, setArtistCard2] = useState('')
	const [ArtistCard3, setArtistCard3] = useState('')

	useEffect(()=>{
		get_top_items()
	},[])

	// Send a request to the server to get top items 
	const get_top_items = () => {
		const cookies = parse(document.cookie);
		const access_token =  cookies.access_token
		let top_items = JSON.parse(sessionStorage.getItem('top_items'))
		let user_profile = JSON.parse(sessionStorage.getItem('user_profile'))

		// If top items are already stored
		if (top_items && user_profile){
			renderCard(top_items, user_profile)
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
									renderCard(top_items, user_profile)
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

	// Render Card
	const renderCard = (data, user_profile) => {
		let renderData
		const noData = () => {return  (<div className={styles.noItemText}>Listen to more songs!</div>)}

		// TOP ARTISTS
		// LAST MONTH
		if (data.artists.short_term.length == 0) {renderData = noData}
		else{
			renderData = () => {return (<ArtistCard data={data.artists.short_term} user_profile={user_profile} range={"Last Month"} />)}
		}
		setArtistCard1(renderData)

		// LAST SIX MONTHS
		if (data.artists.medium_term.length == 0) {renderData = noData}
		else{
			renderData = () => {return (<ArtistCard data={data.artists.medium_term} user_profile={user_profile} range={"Last 6 Months"}/>)}
		}
		setArtistCard2(renderData)

		// ALL TIME
		if (data.artists.long_term.length == 0) {renderData = noData}
		else{
			renderData = () => {return (<ArtistCard data={data.artists.long_term} user_profile={user_profile} range={"All Time"}/>)}
		}
		setArtistCard3(renderData)

		// TOP TRACKS
		// LAST MONTH
		if (data.tracks.short_term.length == 0) {renderData = noData}
		else{
			renderData = () => {return (<TrackCard data={data.tracks.short_term} range={"Last Month"}/>)}
		}
		setTrackCard1(renderData)

		// LAST SIX MONTHS
		if (data.tracks.medium_term.length == 0) {renderData = noData}
		else{
			renderData = () => {return (<TrackCard data={data.tracks.medium_term} range={"Last 6 Months"}/>)}
		}
		setTrackCard2(renderData)

		// ALL TIME
		if (data.tracks.long_term.length == 0) {renderData = noData}
		else{
			renderData = () => {return (<TrackCard data={data.tracks.long_term} range={"All Time"} />)}
		}
		setTrackCard3(renderData)
	}

	return (
		<div className={styles.squareContainer}>
			{render? 
				<>
					<div className={styles.squareOptions}>
						<div className={styles.squareTypeRow}>
							<div className={category == 'tracks'? styles.itrActive : styles.itr} onClick={()=>{categoryChange('tracks')}}><span>Tracks</span></div>
							<div className={category == 'artists'? styles.itrActive : styles.itr} onClick={()=>{categoryChange('artists')}}><span>Artists</span></div>
						</div>
						<div className={styles.squareRangeRow}>
							<div className={range == 'one'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('one')}}><span>Last Month</span></div>
							<div className={range == 'six'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('six')}}><span>Last 6 Months</span></div>
							<div className={range == 'all'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('all')}}><span>All Time</span></div>
						</div>
					</div>

					<div className={styles.squareInterface}>
						{category == 'artists'?
							<>
								{range == 'one' && ArtistCard1}
								{range == 'six' && ArtistCard2}
								{range == 'all' && ArtistCard3}
							</>
							:
							<>
								{range == 'one' && TrackCard1}
								{range == 'six' && TrackCard2}
								{range == 'all' && TrackCard3}
							</>
						}
					</div>
				</>
				: ""
			}
		</div>
	)
}

export default Square