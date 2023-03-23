module.exports = {
	serverRuntimeConfig: {
		CLIENT_ID: process.env.cLIENT_ID,
		CLIENT_SECRET:  process.env.CLIENT_SECRET,
	},
	publicRuntimeConfig: {
		REDIRECT_URI:  process.env.REDIRECT_URI,
		AUTH_URL:  process.env.AUTH_URL,
	}
}