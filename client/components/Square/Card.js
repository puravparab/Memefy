import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../../styles/square.module.css'

export const ArtistCard = (props) => {
	const [top, setTop] = useState('')
	const [bottom, setBottom] = useState('')

	useEffect(()=>{
		render()
	},[])

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
					<img src={artistList[0].image} className={styles.squareLeft} alt={artistList[0] + " image"}/>

					{artistList.length > 1 &&
						<div className={styles.squareRight}>
							<img src={artistList[1].image} className={styles.squareRTop} alt={artistList[1] + " image"}/>

							{artistList.length > 2 &&
								<div className={styles.squareRBottom}>
									{artistList.length > 3 &&
										<div className={styles.squareRBLeft}>
											{artistList.length == 5 && <img src={artistList[4].image} className={styles.squareRBLTop} alt={artistList[1] + " image"}/>}
											<img src={artistList[3].image} className={styles.squareRBLBottom} alt={artistList[1] + " image"}/>
										</div>
									}
									<img src={artistList[2].image}  className={styles.squareRBRight} alt={artistList[1] + " image"}/>
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
						<Image src="/assets/images/spotify_green.png" width={120} height={35} alt="spotify logo" />
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
	return (
		<div className={styles.squareCard}>
		</div>
	)
}