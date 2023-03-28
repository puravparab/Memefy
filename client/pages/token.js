import { useEffect } from 'react'
import { useRouter } from 'next/router';
import { serialize } from 'cookie';

const Token = () => {
	const router = useRouter();

	useEffect(()=>{
		if(!router.isReady){
			return
		} else{
			const access_token = router.query.access_token
			const refresh_token = router.query.refresh_token
			const expires_in = parseInt(router.query.expires_in)
			const options = {
				maxAge: expires_in, // Set the cookies to expire in the number of seconds specified by expires_in
				path: '/', // Set the path for the cookies
			};

			const access_token_cookie = serialize('access_token', access_token, options)
			const refresh_token_cookie = serialize('refresh_token', refresh_token, options)
			try {
				// Set the cookies
				document.cookie = access_token_cookie
				document.cookie = refresh_token_cookie
			} catch (error) {
				console.error('An error occurred while setting cookies:', error);
			}
		}
		router.push('/')
	},[router.isReady])
}

export default Token