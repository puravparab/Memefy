import getConfig from 'next/config';
const { publicRuntimeConfig, serverRuntimeConfig } = getConfig();

import { serialize } from 'cookie';
import axios from 'axios'

export default function handler(req, res) {
	const code = req.query.code;
	const error = req.query.error;

	const client_id = serverRuntimeConfig.CLIENT_ID
	const client_secret = serverRuntimeConfig.CLIENT_SECRET

	// res.json({state: state, error: error, code: code})
	if (code != null) {
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

			// Set cookies
			const options = {
				maxAge: expires_in, // Set the cookies to expire in the number of seconds specified by expires_in
				path: '/', // Set the path for the cookies
			};

			const cookieStrings = [
				serialize('access_token', access_token, options),
				serialize('refresh_token', refresh_token, options)
			];
			res.setHeader('Set-Cookie', cookieStrings);
			return res.redirect(307, '/')
		})
		.catch((err) => {
			return res.redirect(307, '/')
		})
	} 
	else {
		return res.redirect(307, '/')
	}
}