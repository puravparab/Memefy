// import { useState, useEffect } from 'react'
// import { useRouter } from 'next/router'
// import getConfig from 'next/config';
// 
// import axios from 'axios'
// import { parse } from 'cookie';
// import Navbar from '../components/Navbar.js'
// import Login from '../components/Login.js'
// import styles from '../styles/listfy.module.css'
// import styles2 from '../styles/topitems.module.css'
// 
// import BgImg from '../public/assets/images/green_bg.png'
// 
// const { publicRuntimeConfig } = getConfig();
// 
// const Listfy = () => {
// 	const router = useRouter()
// 
// 	const [showListfy, setShowListfy] = useState(false)
// 	const [category, setCategory] = useState('Tracks')
// 	const [range, setRange] = useState('six')
// 
// 	// Store Items to be displayed
// 	const [tracks1List, setTracks1List] = useState('')
// 	const [tracks2List, setTracks2List] = useState('')
// 	const [tracks3List, setTracks3List] = useState('')
// 
// 	const [artists1List, setArtists1List] = useState('')
// 	const [artists2List, setArtists2List] = useState('')
// 	const [artists3List, setArtists3List] = useState('')
// 
// 	useEffect(()=>{
// 		const cookies = parse(document.cookie);
// 		const access_token =  cookies.access_token
// 		const refresh_token =  cookies.refresh_token
// 
// 		let top_items = JSON.parse(sessionStorage.getItem('top_items'))
// 		if (top_items){
// 			setShowListfy(true)
// 		}
// 		if (access_token){
// 			const url = publicRuntimeConfig.SERVER_URL + "api/spotify/top-items/" + access_token
// 				axios.get(url)
// 				.then(function (res){
// 					sessionStorage.setItem("top_items", JSON.stringify(res.data))
// 					let top_items = JSON.parse(sessionStorage.getItem('top_items'))
// 					// If top items are already stored
// 					if (top_items){
// 						setShowListfy(true)
// 					}
// 				})
// 				.catch(function (error){
// 					console.log(error)
// 				})
// 		} else{
// 			setShowListfy(false)
// 		}
// 	})
// 
// 	const renderList = (data) => {
// 		const noData = () => {return  (<div className={styles.noItemText}>Listen to more songs!</div>)}
// 		let renderData
// 
// 		// TOP TRACKS
// 		// Last Month
// 		if (data.tracks.short_term.length == 0) {renderData = noData}
// 		else{
// 			renderData = data.tracks.short_term.map((track, id) => {
// 				// Iterate through artists of this track
// 				let artists = track.artists.map((artist, j) => {
// 					if (j == 0){return (<>{artist.name}</>)}
// 					else{return(<>, {artist.name} </>)}
// 				})
// 				return (
// 					<div className={styles.trackElement} key={id}>
// 						<div className={styles.trackImg}>
// 							<Image src={track.image} width={100} height={100} alt={track.name + " image"}
// 								onMouseEnter={() => playAudio(track.preview_url)} onMouseLeave={() => stopAudio()}
// 							/>
// 						</div>
// 						<div className={styles.trackCardContent}>
// 							<div className={styles.trackRank}>{id + 1}.</div>
// 							<div className={styles.trackDetails}>
// 								<h4>{track.name}</h4>
// 								<h5>{artists}</h5>
// 							</div>
// 						</div>
// 					</div>
// 				)
// 			})
// 		}
// 		setTracks1List(renderData)
// 	}
// 
// 	// Change categories
// 	const categoryChange = (c) => {
// 		if (category === c){}
// 		else{setCategory(c)}
// 	}
// 	// Change range
// 	const rangeChange = (r) => {
// 		if (r == 'one'){setRange(r)}
// 		else if (r == 'six'){setRange(r)}
// 		else {setRange(r)}
// 	}
// 
// 	return (
// 		<div className={styles.listfyPageContainer}>
// 			{showListfy?
// 				<>
// 					<h1>Memefy</h1> 
// 					<Navbar />
// 					<div className={styles.listfyContainer}>
// 						<div className={styles2.topItemsOptions}>
// 							<div className={styles2.itemsTypeRow}>
// 								<div className={category == 'Tracks'? styles2.itrActive : styles2.itr} onClick={()=>{categoryChange('Tracks')}}><span>Tracks</span></div>
// 								<div className={category == 'Artists'? styles2.itrActive : styles2.itr} onClick={()=>{categoryChange('Artists')}}><span>Artists</span></div>
// 							</div>
// 							<div className={styles2.itemsRangeRow}>
// 								<div className={range == 'one'? styles2.itrrActive : styles2.itrr} onClick={()=>{rangeChange('one')}}><span>Last Month</span></div>
// 								<div className={range == 'six'? styles2.itrrActive : styles2.itrr} onClick={()=>{rangeChange('six')}}><span>Last 6 Months</span></div>
// 								<div className={range == 'all'? styles2.itrrActive : styles2.itrr} onClick={()=>{rangeChange('all')}}><span>All Time</span></div>
// 							</div>
// 						</div>
// 
// 
// 						<div className={styles.listfyInterface}>
// 							<div className={styles.downloadListContainer_green} style={{backgroundImage: {BgImg}}}>
// 								<div className={styles.downloadListHeader}>
// 									<div className={styles.userText_green}>Purav Prakash Parab's Top {category}</div>
// 									<div className={styles.websiteText_green}>memefy.app/share</div>
// 								</div>
// 
// 								<div className={styles.downloadListBody}>
// 									{category == 'Artists'?
// 										<>
// 											{range == 'one' && artists1List}
// 											{range == 'six' && artists2List}
// 											{range == 'all' && artists3List}
// 										</>
// 										:
// 										<>
// 											{range == 'one' && tracks1List}
// 											{range == 'six' && tracks2List}
// 											{range == 'all' && tracks3List}
// 										</>
// 									}
// 								</div>
// 							</div>
// 
// 							<button><span>Download</span></button>
// 						</div>
// 
// 					</div>
// 				</>:
// 				<div className={styles.listfyNoAuth}>
// 					<h1>Memefy</h1>
// 					<Login />
// 				</div>
// 			}
// 		</div>
// 	)
// }
// 
// export default Listfy