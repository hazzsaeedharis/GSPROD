import Head from 'next/head'
import Script from 'next/script'
import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="UTF-8" />
      </Head>
      
      {/* Global CSS */}
      <link rel="stylesheet" href="/assets/css/global_above.456537fa54.css" />
      <link rel="stylesheet" href="/assets/css/global_below.456537fa54.css" />
      
      <Component {...pageProps} />
      
      {/* Global Scripts - Disabled due to consent management conflicts */}
      {/* The page-specific scripts handle the interactive functionality */}
    </>
  )
}
