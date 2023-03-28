import { useEffect } from 'react'
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import axios from 'axios'
import { serialize } from 'cookie';

const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

const Callback = () => {
	const router = useRouter();

	useEffect(()=>{
		if(router.isReady){
			const client_id = serverRuntimeConfig.CLIENT_ID
			const client_secret = serverRuntimeConfig.CLIENT_SECRET
			
			const code = router.query.code
			const error = router.query.error
			const state = router.query.state

			console.log(router.query)

			// If code exists
			if (code){
				axios.post('https://accounts.spotify.com/api/token', {
					'grant_type': 'authorization_code',
					'code': code,
					'redirect_uri': publicRuntimeConfig.REDIRECT_URI,
				},{
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
						'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
					}
				})
				.then((response) => {
					const access_token = response.data.access_token
					const refresh_token = response.data.refresh_token
					const expires_in = response.data.expires_in
					console.log(response)
					router.push('/token?access_token=' + access_token + '&refresh_token=' + refresh_token + '&expires_in=' + expires_in)
				})
				.catch((err) => {
					// return res.status(500).send("Error occurred while requesting access token")
					// return res.status(500).send(err)
					console.log(err)
				})
			}else{
				return
			}
		}
	},[router.isReady])
}

export default Callback