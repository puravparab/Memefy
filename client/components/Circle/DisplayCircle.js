import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import * as htmlToImage from 'html-to-image';
import { toPng, toJpeg } from 'html-to-image';

// import Spotify from '../../public/assets/images/spotify_green.png';
import styles from '../../styles/circle.module.css';

const DisplayCircle = ( props ) => {
	const itemLimit = [6, 12, 12]
	const [numArtists, setNumArtists] = useState(props.artist_list.length)
	const [rings, setRings] = useState(3) 
	const ringClassList = [styles.displaySmallCircle, styles.displayMediumCircle, styles.displayLargeCircle]
	const [ring1, setRing1] = useState('')
	const [ring2, setRing2] = useState('')
	const [ring3, setRing3] = useState('')

	const ref = useRef(null);
	// Holds url for generated image
	const [imageDataUrl, setImageDataUrl] = useState('')
	// Is a new image generated
	const [imageGenerated, setImageGenerated] = useState(false) 

	useEffect(()=>{
		populateRings()
	},[numArtists])

	// Re-render when users changes no of rings
	useEffect(()=>{
		setRings(props.rings)
		setImageDataUrl('')
		setImageGenerated(false)
	},[props.rings])

	// Populate the artists in the circle
	const populateRings = () => {
		setRing1(props.artist_list.map((img_src, id) =>{
			let classes = [
				styles.ir1, styles.ir2, styles.ir3, styles.ir4, styles.ir5, styles.ir6
			]
			if (id < 6){
				return (
					<div className={classes[id]} key={id}>
						{/* <Image src={img_src} width={110} height={110} alt={"artist " + id} /> */}
						<img src={img_src} alt={"artist " + id} />
					</div>
				)
			}
		}))
		if (numArtists > 6 && rings >=2){
			setRing2(props.artist_list.map((img_src, id) =>{
				let classes = [
					styles.mr1, styles.mr2, styles.mr3, styles.mr4, styles.mr5, styles.mr6,
					styles.mr7, styles.mr8, styles.mr9, styles.mr10, styles.mr11, styles.mr12
				]
				if (id >= 6 && id < 18){
					return (
						<div className={classes[id - 6]} key={id}>
							{/* <Image src={img_src} width={90} height={90} alt={"artist " + id} /> */}
							<img src={img_src} alt={"artist " + id} />
						</div>
					)
				}
			}))

			if (numArtists > 18 && rings >= 3){
				setRing3(props.artist_list.map((img_src, id) =>{
					let classes = [
						styles.or1, styles.or2, styles.or3, styles.or4, styles.or5, styles.or6,
						styles.or7, styles.or8, styles.or9, styles.or10, styles.or11, styles.or12
					]
					if (id >= 18 && id < 30){
						return (
							<div className={classes[id - 18]} key={id}>
								{/* <Image src={img_src} width={80} height={80} alt={"artist " + id} /> */}
								<img src={img_src} alt={"artist " + id} />
							</div>
						)
					}
				}))
			}
		}
		setImageDataUrl('')
		setImageGenerated(false)
	}

	// Convert to JPEG
	const handleImageGeneration = () => {
		if (ref.current === null) {
			return
		}
		// Convert div to JPEG using htmlToImage
		let vp = document.getElementById("viewportMeta").getAttribute("content")
		document.getElementById("viewportMeta").setAttribute("content", "width=1920")
		htmlToImage.toJpeg(ref.current)
			.then(function (dataUrl) {
				setImageDataUrl(dataUrl)
				document.getElementById("viewportMeta").setAttribute("content", vp);
				// Clean up any canvas elements added to the DOM
				const canvasElements = document.getElementsByTagName('canvas')
				Array.from(canvasElements).forEach(canvasElement => {
					canvasElement.remove()
				})
				setImageGenerated(true)
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error)
				setImageGenerated(false)
			});
	}

	// Download generated images
	const handleDownload = () => {
		const link = document.createElement('a');
		link.download = 'memefy-circle.png';
		link.href = imageDataUrl
		link.click();
	}

	// Convert to JPEG and download
	const handleDownloadComplete = () => {
		if (ref.current === null) {
			return
		}
		// Convert div to JPEG using htmlToImage
		let vp = document.getElementById("viewportMeta").getAttribute("content")
		document.getElementById("viewportMeta").setAttribute("content", "width=1920")
		htmlToImage.toJpeg(ref.current)
			.then(function (dataUrl) {
				setImageDataUrl(dataUrl)
				document.getElementById("viewportMeta").setAttribute("content", vp);
				// Clean up any canvas elements added to the DOM
				const canvasElements = document.getElementsByTagName('canvas')
				Array.from(canvasElements).forEach(canvasElement => {
					canvasElement.remove()
				})
				setImageGenerated(true)
				const link = document.createElement('a');
				link.download = 'memefy-circle.png';
				link.href = dataUrl
				link.click();
			})
			.catch(function (error) {
				console.error('oops, something went wrong!', error)
				setImageGenerated(false)
			});
	}

	return (
		<>
			<div className={styles.displayCircleContainer} ref={ref}>
				<div className={styles.displayCircleHeader}>
					<h3>NP&apos;s Inner Circle</h3>
					<h4>{props.range}</h4>
				</div>

				<div className={ringClassList[rings - 1]}>
					{rings === 1 && 
						<div className={styles.innerRing}>
							{ring1}
							<div className={styles.ringCenter}>
								{/* <Image src={props.artist_list[0]} width={120} height={120} alt="user's image"/> */}
								<img src={props.artist_list[0]} alt="user's image" />
							</div>
						</div>
					}
					{rings === 2 && 
						<>
							<div className={styles.middleRing}>
								{ring2}
							</div>
							<div className={styles.innerRing}>
								{ring1}
								<div className={styles.ringCenter}>
									{/* <Image src={props.artist_list[0]} width={120} height={120} alt="user's image"/> */}
									<img src={props.artist_list[0]} alt="user's image" />
								</div>
							</div>
						</>
					}
					{rings === 3 && 
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
									{/* <Image src={props.artist_list[0]} width={120} height={120} alt="user's image"/> */}
									<img src={props.artist_list[0]} alt="user's image" />
								</div>
							</div>
						</>
					}
				</div>

				<div className={styles.displayCircleFooter}>
					<Image src="/assets/images/spotify_green.png" width={133} height={40} alt="spotify logo" />
					<h4>memefy.app/circle</h4>
				</div>
			</div>

			{imageDataUrl && <img src={imageDataUrl} className={styles.displayCircleImage} alt="user's inner circle"/>}

			<div className={styles.circleBtnContainer}>
				{!imageGenerated && <button onClick={handleImageGeneration} className={styles.generateBtn}>Generate</button>}
				{imageGenerated && <button onClick={handleDownload} className={styles.downloadSmallBtn}>Download</button>}
				<button onClick={handleDownloadComplete} className={styles.downloadLargeBtn}>Download</button>
			</div>
		</>
	)
}

export default DisplayCircle