module.exports = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	serverRuntimeConfig: {
		CLIENT_ID: process.env.cLIENT_ID,
		CLIENT_SECRET:  process.env.CLIENT_SECRET,
	},
	publicRuntimeConfig: {
		REDIRECT_URI:  process.env.REDIRECT_URI,
		SERVER_URL:  process.env.SERVER_URL,
	},
	images: {
		domains: ['i.scdn.co']
	}
}