module.exports = {
	i18n: {
		locales: ['en'],
		defaultLocale: 'en',
	},
	publicRuntimeConfig: {
		CLIENT_ID: process.env.cLIENT_ID,
		REDIRECT_URI:  process.env.REDIRECT_URI,
		SERVER_URL:  process.env.SERVER_URL,
	},
	images: {
		domains: ['i.scdn.co']
	}
}