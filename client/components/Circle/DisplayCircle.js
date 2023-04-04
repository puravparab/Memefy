import { useState, useEffect } from 'react'
import Image from 'next/image'

import styles from '../../styles/circle.module.css'

const DisplayCircle = (props) => {
	const itemLimit = [6, 12, 12]
	const [numArtists, setNumArtists] = useState(props.artist_list.length)
	const [rings, setRings] = useState(3) 

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
						<Image src={img_src} width={110} height={110} alt={"artist " + id} />
					</div>
				)
			}
		}))
		if (numArtists > 6){
			setRing2(props.artist_list.map((img_src, id) =>{
				let classes = [
					styles.mr1, styles.mr2, styles.mr3, styles.mr4, styles.mr5, styles.mr6,
					styles.mr7, styles.mr8, styles.mr9, styles.mr10, styles.mr11, styles.mr12
				]
				if (id >= 6 && id < 18){
					return (
						<div className={classes[id - 6]}>
							<Image src={img_src} width={90} height={90} alt={"artist " + id}/>
						</div>
					)
				}
			}))

			if (numArtists > 18){
				setRing3(props.artist_list.map((img_src, id) =>{
					let classes = [
						styles.or1, styles.or2, styles.or3, styles.or4, styles.or5, styles.or6,
						styles.or7, styles.or8, styles.or9, styles.or10, styles.or11, styles.or12
					]
					if (id >= 18 && id < 30){
						return (
							<div className={classes[id - 18]}>
								<Image src={img_src} width={80} height={80} alt={"artist " + id}/>
							</div>
						)
					}
				}))
			}
		}
	}

	return (
		<div className={styles.displayCircle}>
			{/* {rings == 0 &&  */}
			{/* 	<div className={styles.ringCenter}> */}
			{/* 		<Image src={props.artist_list[0]} width={120} height={130}/> */}
			{/* 	</div> */}
			{/* } */}
			{rings == 1 && 
				<div className={styles.innerRing}>
					{ring1}
					<div className={styles.ringCenter}>
						<Image src={props.artist_list[0]} width={120} height={120}/>
					</div>
				</div>
			}
			{rings == 2 && 
				<>
					<div className={styles.middleRing}>
						{ring2}
					</div>
					<div className={styles.innerRing}>
						{ring1}
						<div className={styles.ringCenter}>
							<Image src={props.artist_list[0]} width={120} height={120}/>
						</div>
					</div>
				</>
			}
			{rings == 3 && 
				<>
					<div className={styles.outerRing}>
						{ring3}
					</div>
					<div className={styles.middleRing}>
						{ring2}
					</div>
					<div className={styles.innerRing}>
						{ring1}
						<div className={styles.ringCenter}>
							<Image src={props.artist_list[0]} width={120} height={120}/>
						</div>
					</div>
				</>
			}
		</div>
	)
}

export default DisplayCircle