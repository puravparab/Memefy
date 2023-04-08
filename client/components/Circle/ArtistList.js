import { useState, useEffect } from 'react'
import styles from '../../styles/circle.module.css'

const ArtistList = ( props ) => {
	const itemLimit = [6, 18, 30]
	let tier1 = []
	let tier2 = []
	let tier3 = []

	const [artistTier1,setArtistTier1] = useState('')
	const [artistTier2,setArtistTier2] = useState('')
	const [artistTier3,setArtistTier3] = useState('')

	useEffect(()=>{
		renderList()
	},[])

	const createTiers = (artists) => {
		artists.map((artist, id) => {
			if (id < itemLimit[0]){
				tier1.push(artist.name)
			}
			else if (id < itemLimit[1]){
				tier2.push(artist.name)
			}
			else if (id < itemLimit[2]){
				tier3.push(artist.name)
			}
		})
	}

	const renderList = () => {
		let renderData
		createTiers(props.artists)

		// Tier 1
		renderData = tier1.map((artist, id) => {
			return (
				<div className={styles.listCell}  key={id}><h4>{id + 1}.</h4><h4>{artist}</h4></div>
			)
		})
		setArtistTier1(renderData)

		// Tier 2
		renderData = tier2.map((artist, id) => {
			return (
				<div className={styles.listCell}  key={id}><h4>{id + 7}.</h4><h4>{artist}</h4></div>
			)
		})
		setArtistTier2(renderData)

		// Tier 3
		renderData = tier3.map((artist, id) => {
			return (
				<div className={styles.listCell} key={id}><h4>{id + 19}.</h4><h4>{artist}</h4></div>
			)
		})
		setArtistTier3(renderData)
	}

	return (
		<>
			<div className={styles.tierColumn}>
				<h3>Tier 1</h3>
				{artistTier1}
			</div>
			{props.ring >= 2 &&
				<>
					<div className={styles.tierColumn}>
						<h3>Tier 2</h3>
						{artistTier2}
					</div>
					{props.ring == 3 && 
						<div className={styles.tierColumn}>
							<h3>Tier 3</h3>
							{artistTier3}
						</div>
					}
				</>
			}
		</>
	)
}

export default ArtistList