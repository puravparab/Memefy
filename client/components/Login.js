import { useState } from 'react'
import { useRouter } from 'next/router'
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

import axios from 'axios'

import styles from '../styles/login.module.css'

const Login = () => {
	const router = useRouter()

	const handleClick = () => {
		const url = publicRuntimeConfig.SERVER_URL + "api/spotify"
		axios.get(url)
			.then(function (res){
				sessionStorage.setItem("previous_page", router.pathname)
				if (res["status"] === 200){
					router.push(res["data"])
				}else{
					// Add error
				}
			})
			.catch(function (error){
				// Log error
				console.log(error)
			})
	}

	return (
		<div className={styles.loginBtn} onClick={handleClick}>
			<span>Login with Spotify</span>
		</div>
	)
}

export default Login