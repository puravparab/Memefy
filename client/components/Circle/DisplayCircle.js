import { useState, useEffect } from 'react'
import Image from 'next/image'

import styles from '../../styles/circle.module.css'

const DisplayCircle = (props) => {
	const itemLimit = [6, 12, 16]
	const [numArtists, setNumArtists] = useState(props.artist_list.length)
	const [rings, setRings] = useState(1) 

	const [ring1, setRing1] = useState('')
	const [ring2, setRing2] = useState('')
	const [ring3, setRing3] = useState('')

	useEffect(()=>{
		populateRings()
	},[numArtists])

	const populateRings = () => {
		setRing1(props.artist_list.map((img_src, id) =>{
			let classes = [
				styles.ir1, styles.ir2, styles.ir3, styles.ir4, styles.ir5, styles.ir6
			]
			if (id < 6){
				return (
					<div className={classes[id]}>
						<Image src={img_src} width={90} height={90} alt={"artist " + id} />
					</div>
				)
			}
		}))
		if (numArtists > 6){
			setRing2(props.artist_list.map((img_src, id) =>{
				if (id >= 6 && id < 17){
					return (
						<div className={styles.artist_in_ring}>
							<Image src={img_src} width={100} height={100} alt={"artist " + id}/>
						</div>
					)
				}
			}))
			if (numArtists > 18){
				setRing3(props.artist_list.map((img_src, id) =>{
					if (id >= 18 && id < 34){
						return (
							<div className={styles.artist_in_ring}>
								<Image src={img_src} width={100} height={100} alt={"artist " + id}/>
							</div>
						)
					}
				}))
			}
		}
	}

	return (
		<div className={styles.displayCircle}>
			{rings == 0 && 
				<div className={styles.ringCenter}>
					<Image src={props.artist_list[0]} width={100} height={100}/>
				</div>
			}
			{rings == 1 && 
				<div className={styles.innerRing}>
					{ring1}
					{/* <div className={styles.ringCenter}> */}
					{/* 	<Image src={props.artist_list[0]} width={100} height={100}/> */}
					{/* </div> */}
				</div>
			}
			{rings == 2 && 
				<div className={styles.middleRing}>
					{ring2}
					<div className={styles.innerRing}>
						{ring1}
						<div className={styles.ringCenter}>
							<Image src={props.artist_list[0]} width={100} height={100}/>
						</div>
					</div>
				</div>
			}
			{rings == 3 && 
				<div className={styles.outerRing}>
					{ring3}
					<div className={styles.middleRing}>
						{ring2}
						<div className={styles.innerRing}>
							{ring1}
							<div className={styles.ringCenter}>
								<Image src={props.artist_list[0]} width={100} height={100}/>
							</div>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default DisplayCircle