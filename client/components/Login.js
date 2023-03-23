import { useState } from 'react'
import axios from 'axios'

import styles from '../styles/login.module.css'

const Login = () => {
	const url = 'http://192.168.1.103:8000/'

	const handleClick = () => {
		axios.get(url)
			.then(function (res){
				console.log(res)
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