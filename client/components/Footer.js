import { useState, useEffect } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import Link from 'next/link'
import { parse } from 'cookie';

import Spotify from '../public/assets/images/spotify_green.png'
import styles from '../styles/footer.module.css'

const Footer = () => {
	const router = useRouter();
	const [loggedIn, setLoggedIn] = useState(false)

	useEffect(()=>{
		const cookies = parse(document.cookie);
		const access_token =  cookies.access_token
		if (access_token){
			setLoggedIn(true)
		}
	},[])

	const handleLogoutCLick = () => {
		window.open("https://www.spotify.com/logout/", "_blank")
		document.cookie = 'access_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		document.cookie = 'refresh_token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
		sessionStorage.removeItem('top_items');
		sessionStorage.removeItem('user_profile');
		router.push('/login')
	}

	return (
		<div className={styles.footerContainer}>
			<Image src={Spotify} width={120} height={35} alt="spotify logo"/>
			<div className={styles.footerLinks}>
				<Link href='/about'>
					About
				</Link>
				{loggedIn && <a onClick={handleLogoutCLick}>Logout</a>}
				<p>	&#169; Memefy 2023</p>
			</div>
		</div>
	)
}

export default Footer