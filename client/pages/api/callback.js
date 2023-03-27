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
				'Authorization': 'Basic ' + (Buffer.from(client_id + ':' + client_secret).toString('base64'))
			}
		})
		.then((response) => {
			const access_token = response.data.access_token
			const refresh_token = response.data.refresh_token
			const expires_in = response.data.expires_in

			return res.redirect(307, '/token?access_token=' + access_token + '&refresh_token=' + refresh_token + '&expires_in=' + expires_in)
		})
		.catch((err) => {
			// return res.status(500).send("Error occurred while requesting access token")
			return res.status(500).send(err)
		})
	} 
	else {
		return res.status(400).send("Invalid request. 'code' parameter is required.")
	}
}