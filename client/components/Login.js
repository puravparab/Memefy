import { useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import styles from '../styles/login.module.css'

const Login = () => {
	const router = useRouter()
	const url = 'http://192.168.1.103:8000/api/spotify'

	const handleClick = () => {
		axios.get(url)
			.then(function (res){
				console.log(res)
				router.push(res["data"])
			})
			.catch(function (error){
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