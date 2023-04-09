import Head from 'next/head' 
import Script from 'next/script';
import Layout from '../components/Layout.js'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.ico" />
				<meta name="author" content="" />
				<meta name="twitter:card" content="summary" />
				<meta name="twitter:image" content="" />
				<meta name="twitter:creator" content="" />
				<meta property="og:type" content="website" />
				<meta property="og:image" content="" />
			</Head>

			{/* Google Analytics */}
			<Script 
				strategy="afterInteractive"
				src="https://www.googletagmanager.com/gtag/js?id=G-0SWM0ZNT6R" 
			/>
			<Script id="google-analytics" strategy="afterInteractive">
				{`
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag("js", new Date());
					gtag("config", 'G-0SWM0ZNT6R');
				`}
			</Script>

			<Layout>
				<Component {...pageProps} />
			</Layout>
		</>
	)
}

export default MyApp