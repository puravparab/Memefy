import { useState, useEffect } from 'react'
import { useRef } from "react";
import { useRouter } from 'next/router'
import Image from 'next/image'
import getConfig from 'next/config';
import axios from 'axios'
import { parse } from 'cookie';

import { ArtistCard, TrackCard } from './ItemCard.js'
import styles from '../styles/topitems.module.css'

const { publicRuntimeConfig } = getConfig();

const TopItems = () => {
	const router = useRouter()
	// check if component should render
	const [render, setRender] = useState(false)

	// What items should be displayed
	const [category, setCategory] = useState('tracks')
	const [range, setRange] = useState('six')

	// Set display type
	const [displayList, setDisplayList] = useState(false)

	// Store Items to be displayed
	const [tracks1, setTracks1] = useState('')
	const [tracks1List, setTracks1List] = useState('')
	const [tracks2, setTracks2] = useState('')
	const [tracks2List, setTracks2List] = useState('')
	const [tracks3, setTracks3] = useState('')
	const [tracks3List, setTracks3List] = useState('')

	const [artists1, setArtists1] = useState('')
	const [artists1List, setArtists1List] = useState('')
	const [artists2, setArtists2] = useState('')
	const [artists2List, setArtists2List] = useState('')
	const [artists3, setArtists3] = useState('')
	const [artists3List, setArtists3List] = useState('')

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
				router.push('/login')
			}
		}
	}

	// Audio preview
	const [audio, setAudio] = useState(
		typeof Audio !== 'undefined' ? new Audio() : null
	);

	const playAudio = (preview_url) => {
		audio.pause();
		if (preview_url){
			audio.src = preview_url;
			audio.play();
		}
	}
	const stopAudio = () => {
		audio.pause();
	};

	// Parse through data and create components for all permutations of lists
	const renderList = (data) => {
		const noData = () => {return  (<div className={styles.noItemText}>Listen to more songs!</div>)}
		let renderData

		// TOP ARTISTS
		// Last Month
		if (data.artists.short_term.length == 0) {renderData = noData}
		else{
			renderData = data.artists.short_term.map((artist, id) => {
				return (
					<div className={styles.topItemCard} key={id}>
						<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
					</div>
				)
			})
		}
		setArtists1(renderData)
		if (data.artists.short_term.length == 0) {renderData = noData}
		else{
			renderData = data.artists.short_term.map((artist, id) => {
				return (
					<ArtistCard id={id} artist={artist}/>
				)
			})
		}
		setArtists1List(renderData)

		// Last six months
		if (data.artists.medium_term.length == 0) {renderData = noData}
		else{
			renderData = data.artists.medium_term.map((artist, id) => {
				return (
					<div className={styles.topItemCard} key={id}>
						<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
					</div>
				)
			})
		}
		setArtists2(renderData)
		if (data.artists.medium_term.length == 0) {renderData = noData}
		else{
			renderData = data.artists.medium_term.map((artist, id) => {
				return (
					<ArtistCard id={id} artist={artist}/>
				)
			})
		}
		setArtists2List(renderData)

		// All Time
		if (data.artists.long_term.length == 0) {renderData = noData}
		else{
			renderData = data.artists.long_term.map((artist, id) => {
				return (
					<div className={styles.topItemCard} key={id}>
						<Image src={artist.image} width={100} height={100} alt={artist.name + " image"}/>
					</div>
				)
			})
		}
		setArtists3(renderData)
		if (data.artists.long_term.length == 0) {renderData = noData}
		else{
			renderData = data.artists.long_term.map((artist, id) => {
				return (
					<ArtistCard id={id} artist={artist}/>
				)
			})
		}
		setArtists3List(renderData)

		// TOP TRACKS
		// Last Month
		if (data.tracks.short_term.length == 0) {renderData = noData}
		else{
			renderData = data.tracks.short_term.map((track, id) => {
				return (
					<div className={styles.topItemCard} key={id} 
						onMouseEnter={() => playAudio(track.preview_url)} onMouseLeave={() => stopAudio()}>
						<Image src={track.image} width={100} height={100} alt={track.artists.name + " image"}/>
					</div>
				)
			})
		}
		setTracks1(renderData)
		if (data.tracks.short_term.length == 0) {renderData = noData}
		else{
			renderData = data.tracks.short_term.map((track, id) => {
				return (
					<TrackCard id={id} track={track} playAudio={playAudio} stopAudio={stopAudio}/>
				)
			})
		}
		setTracks1List(renderData)

		// Last six months
		if (data.tracks.medium_term.length == 0) {renderData = noData}
		else{
			renderData = data.tracks.medium_term.map((track, id) => {
				return (
					<div className={styles.topItemCard} key={id} 
						onMouseEnter={() => playAudio(track.preview_url)} onMouseLeave={() => stopAudio()}>
						<Image src={track.image} width={100} height={100} alt={track.artists.name + " image"}/>
					</div>
				)
			})
		}
		setTracks2(renderData)
		if (data.tracks.medium_term.length == 0) {renderData = noData}
		else{
			renderData = data.tracks.medium_term.map((track, id) => {
				return (
					<TrackCard id={id} track={track} playAudio={playAudio} stopAudio={stopAudio}/>
				)
			})
		}
		setTracks2List(renderData)

		// All Time
		if (data.tracks.long_term.length == 0) {renderData = noData}
		else{
			renderData = data.tracks.long_term.map((track, id) => {
				return (
					<div className={styles.topItemCard} key={id} 
						onMouseEnter={() => playAudio(track.preview_url)} onMouseLeave={() => stopAudio()}>
						<Image src={track.image} width={100} height={100} alt={track.artists.name + " image"}/>
					</div>
				)
			})
		}
		setTracks3(renderData)
		if (data.tracks.long_term.length == 0) {renderData = noData}
		else{
			renderData = data.tracks.long_term.map((track, id) => {
				return (
					<TrackCard id={id} track={track} playAudio={playAudio} stopAudio={stopAudio}/>
				)
			})
		}
		setTracks3List(renderData)
	}

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
	// Change display
	const handleDisplayChange = (d) => {
		if (displayList & d == 'collage'){setDisplayList(false)}
		else if (!displayList & d == 'list'){setDisplayList(true)}
	}

	return (
		<div className={styles.topItemsContainer}>
			{render?
				<>
					<div className={styles.topItemsOptions}>
						<div className={styles.itemsTypeRow}>
							<div className={category == 'tracks'? styles.itrActive : styles.itr} onClick={()=>{categoryChange('tracks')}}><span>Tracks</span></div>
							<div className={category == 'artists'? styles.itrActive : styles.itr} onClick={()=>{categoryChange('artists')}}><span>Artists</span></div>
						</div>
						<div className={styles.itemsRangeRow}>
							<div className={range == 'one'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('one')}}><span>Last Month</span></div>
							<div className={range == 'six'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('six')}}><span>Last 6 Months</span></div>
							<div className={range == 'all'? styles.itrrActive : styles.itrr} onClick={()=>{rangeChange('all')}}><span>All Time</span></div>
						</div>
						<div className={styles.displayTypeRow}>
							<div className={displayList? styles.displayType : styles.displayTypeActive} 
								onClick={()=>{handleDisplayChange('collage')}}>
								<span>Collage</span>
							</div>
							<div className={displayList? styles.displayTypeActive : styles.displayType} 
								onClick={()=>{handleDisplayChange('list')}}>
								<span>List</span>
							</div>
						</div>
					</div>

					{displayList?
						<div className={styles.topItemsList}>
							{category == 'artists'?
								<>
									{range == 'one' && artists1List}
									{range == 'six' && artists2List}
									{range == 'all' && artists3List}
								</>
								:
								<>
									{range == 'one' && tracks1List}
									{range == 'six' && tracks2List}
									{range == 'all' && tracks3List}
								</>
							}
						</div>
						:
						<div className={styles.topItemsCollage}>
							{category == 'artists'?
								<>
									{range == 'one' && artists1}
									{range == 'six' && artists2}
									{range == 'all' && artists3}
								</>
								:
								<>
									{range == 'one' && tracks1}
									{range == 'six' && tracks2}
									{range == 'all' && tracks3}
								</>
							}
						</div>
					}
				</>
				: ""
			}
		</div>
	)
}

export default TopItems