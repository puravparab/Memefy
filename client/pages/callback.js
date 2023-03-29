import { useEffect } from 'react'
import { useRouter } from 'next/router';
import getConfig from 'next/config';

import axios from 'axios'
import { serialize } from 'cookie';

const { publicRuntimeConfig} = getConfig();

const Callback = () => {
	const router = useRouter();

	useEffect(()=>{
		if(router.isReady){
			const client_id = publicRuntimeConfig.CLIENT_ID
			const code = router.query.code
			const error = router.query.error
			const state = router.query.state

			// If code exists
			if (code){
				const url = publicRuntimeConfig.SERVER_URL + "api/spotify/get-tokens"
				axios.post(url,{
					'code': code,
					'error': error,
					'state': state
				})
					.then((response) => {
						if (response.status === 200){
							const access_token = response.data.access_token
							const refresh_token = response.data.refresh_token
							const expires_in = parseInt(response.data.expires_in) - 60
							const options = {
								maxAge: expires_in, // Set the cookies to expire in the number of seconds specified by expires_in
								path: '/', // Set the path for the cookies
							}
							const access_token_cookie = serialize('access_token', access_token, options)
							const refresh_token_cookie = serialize('refresh_token', refresh_token, options)
							// Set the cookies
							document.cookie = access_token_cookie
							document.cookie = refresh_token_cookie
							router.push('/')
						}
						// ADD Error
					})
					.catch((err) => {
						console.log(err)
					})
			}else{
				return
			}
		}
	},[router.isReady])
}

export default Callback