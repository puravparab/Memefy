import Image from 'next/image'
import styles from '../styles/topitems.module.css'

export const ArtistCard = ( props ) => {
	return (
		<div className={styles.artistCard} key={props.id}>
			<div className={styles.artistImg}>
				<Image src={props.artist.image} width={150} height={150} alt={props.artist.name + " image"}/>
			</div>
			<div className={styles.artistContent}>
				<h4>{props.id + 1}.</h4>
				<h4>{props.artist.name}</h4>
			</div>
		</div>
	)
}

export const TrackCard = ( props ) => {
	// Iterate through artists of this track
	let artists = props.track.artists.map((artist, j) => {
		if (j == 0){return (<>{artist.name}</>)}
		else{return(<>, {artist.name} </>)}
	})
	return (
	<div className={styles.trackCard} key={props.id}>
		<div className={styles.trackImg}>
			<Image src={props.track.image} width={100} height={100} alt={props.track.name + " image"}
				onMouseEnter={() => props.playAudio(props.track.preview_url)} onMouseLeave={() => props.stopAudio()}
			/>
		</div>
		<div className={styles.trackCardContent}>
			<div className={styles.trackRank}>{props.id + 1}.</div>
			<div className={styles.trackDetails}>
				<h4>{props.track.name}</h4>
				<h5>{artists}</h5>
			</div>
		</div>
	</div>
)
}