import { useState, useEffect } from 'react'
import Image from 'next/image'

import Spotify from '../../public/assets/images/spotify_green.png'
import styles from '../../styles/square.module.css'

export const ArtistCard = (props) => {
	const [top, setTop] = useState('')
	const [bottom, setBottom] = useState('')

	useEffect(()=>{
		render()
	},[])

	// Create a list of top 5 artists
	const createList = () => {
		let artistList = []
		const data = props.data
		data.map((artist, id) => {
			if (id < 5){
				artistList.push(artist)
			}
		})
		return artistList
	}

	const render = () => {
		let artistList = createList()

		setTop(() => {
			return (
				<div className={styles.squareTop}>
					{/* ITEM 1 */}
					<img src={artistList[0].image} className={styles.squareLeft} alt={artistList[0].name + " image"}/>

					{artistList.length > 1 &&
						<div className={styles.squareRight}>
							{/* ITEM 2 */}
							<img src={artistList[1].image} className={styles.squareRTop} alt={artistList[1].name + " image"}/>

							{artistList.length > 2 &&
								<div className={styles.squareRBottom}>
									{/* ITEM 3 */}
									<img src={artistList[2].image}  className={styles.squareRBRight} alt={artistList[2].name + " image"}/>

									{artistList.length > 3 &&
										<div className={styles.squareRBLeft}>
											{/* ITEM 4 */}
											<img src={artistList[3].image} className={styles.squareRBLBottom} alt={artistList[3].name + " image"}/>

											{artistList.length == 5 && 
												// ITEM 5
												<img src={artistList[4].image} className={styles.squareRBLTop} alt={artistList[4].name + " image"}/>
											}
										</div>
									}
								</div>
							}
						</div>
					}
				</div>
			)
		})

		setBottom(()=>{
			return (
				<div className={styles.squareBottom}>
					<div className={styles.contentHeader}>
						<h3>{props.user_profile.display_name}&apos;s Top Artists</h3>
						<h4>{props.range}</h4>
					</div>

					<div className={styles.content}>
						{artistList[0] && <div className={styles.artistItem}><h3>1.</h3><h4>{artistList[0].name}</h4></div>}
						{artistList[1] && <div className={styles.artistItem}><h3>2.</h3><h4>{artistList[1].name}</h4></div>}
						{artistList[2] && <div className={styles.artistItem}><h3>3.</h3><h4>{artistList[2].name}</h4></div>}
						{artistList[3] && <div className={styles.artistItem}><h3>4.</h3><h4>{artistList[3].name}</h4></div>}
						{artistList[4] && <div className={styles.artistItem}><h3>5.</h3><h4>{artistList[4].name}</h4></div>}
					</div>

					<div className={styles.footer}>
						<h4>memefy.app/list</h4>
						<Image src={Spotify} width={120} height={35} alt="spotify logo" />
					</div>
				</div>
			)
		})
	}

	return (
		<div className={styles.squareCard}>
			{top}
			{bottom}
		</div>
	)
}

export const TrackCard = (props) => {
	const [top, setTop] = useState('')
	const [bottom, setBottom] = useState('')

	useEffect(()=>{
		render()
	},[])

	// Create a list of top 5 tracks
	const createList = () => {
		let trackList = []
		const data = props.data
		data.map((track, id) => {
			if (id < 5){
				trackList.push(track)
			}
		})
		return trackList
	}

	// Iterate through the artists of a song
	const iterateArtists = (track) => {
		let artistStr = ''
		track.artists.map((artist, id)=>{
			if (id == 0){
				artistStr += artist.name
			} else{
				artistStr += ", " + artist.name
			}
		})
		return artistStr
	}
	const render = () => {
		let trackList = createList()

		setTop(() => {
			return (
				<div className={styles.squareTop}>
					{/* ITEM 1 */}
					<img src={trackList[0].image} className={styles.squareLeft} alt={trackList[0].name + " image"}/>

					{trackList.length > 1 &&
						<div className={styles.squareRight}>
							{/* ITEM 2 */}
							<img src={trackList[1].image} className={styles.squareRTop} alt={trackList[1].name + " image"}/>

							{trackList.length > 2 &&
								<div className={styles.squareRBottom}>
									{/* ITEM 3 */}
									<img src={trackList[2].image}  className={styles.squareRBRight} alt={trackList[2].name + " image"}/>

									{trackList.length > 3 &&
										<div className={styles.squareRBLeft}>
											{/* ITEM 4 */}
											<img src={trackList[3].image} className={styles.squareRBLBottom} alt={trackList[3].name + " image"}/>

											{trackList.length == 5 && 
												// ITEM 5
												<img src={trackList[4].image} className={styles.squareRBLTop} alt={trackList[4].name + " image"}/>
											}
										</div>
									}
			
								</div>
							}
						</div>
					}
				</div>
			)
		})

		setBottom(()=>{
			return (
				<div className={styles.squareBottom}>
					<div className={styles.contentHeader}>
						<h3>{props.user_profile.display_name}&apos;s Top Tracks</h3>
						<h4>{props.range}</h4>
					</div>

					<div className={styles.content}>
						{trackList[0] && 
							<div className={styles.trackItem}>
								<h3>1.</h3>
								<div className={styles.trackItemContent}>
									<h4>{trackList[0].name}</h4>
									<h5>{iterateArtists(trackList[0])}</h5>
								</div>
							</div>
						}
						{trackList[1] && 
							<div className={styles.trackItem}>
								<h3>2.</h3>
								<div className={styles.trackItemContent}>
									<h4>{trackList[1].name}</h4>
									<h5>{iterateArtists(trackList[1])}</h5>
								</div>
							</div>
						}
						{trackList[2] && 
							<div className={styles.trackItem}>
								<h3>3.</h3>
								<div className={styles.trackItemContent}>
									<h4>{trackList[2].name}</h4>
									<h5>{iterateArtists(trackList[2])}</h5>
								</div>
							</div>
						}
						{trackList[3] && 
							<div className={styles.trackItem}>
								<h3>4.</h3>
								<div className={styles.trackItemContent}>
									<h4>{trackList[3].name}</h4>
									<h5>{iterateArtists(trackList[3])}</h5>
								</div>
							</div>
						}
						{trackList[4] && 
							<div className={styles.trackItem}>
								<h3>5.</h3>
								<div className={styles.trackItemContent}>
									<h4>{trackList[4].name}</h4>
									<h5>{iterateArtists(trackList[4])}</h5>
								</div>
							</div>
						}
					</div>

					<div className={styles.footer}>
						<h4>memefy.app/list</h4>
						<Image src={Spotify} width={120} height={35} alt="spotify logo" />
					</div>
				</div>
			)
		})
	}

	return (
		<div className={styles.squareCard}>
			{top}
			{bottom}
		</div>
	)
}