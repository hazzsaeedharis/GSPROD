import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de" prefix="og: http://ogp.me/ns#">
      <Head>
        {/* Favicons */}
        <link rel="icon" href="/assets/images/fav/favicon@32w.png" sizes="32x32" />
        <link rel="icon" href="/assets/images/fav/favicon@57x.png" sizes="57x57" />
        <link rel="icon" href="/assets/images/fav/favicon@76x.png" sizes="76x76" />
        <link rel="icon" href="/assets/images/fav/favicon@96x.png" sizes="96x96" />
        <link rel="icon" href="/assets/images/fav/favicon@128x.png" sizes="128x128" />
        <link rel="icon" href="/assets/images/fav/favicon@192x.png" sizes="192x192" />
        <link rel="icon" href="/assets/images/fav/favicon@228x.png" sizes="228x228" />
        <link rel="shortcut icon" sizes="196x196" href="/assets/images/fav/favicon@196w.png" />
        <link rel="apple-touch-icon" href="/assets/images/fav/favicon@180w.png" sizes="180x180" />
        
        {/* Theme */}
        <meta name="theme-color" content="#ffdc00" />
        <link rel="manifest" href="/assets/libraries/manifest.json" />
        
        {/* Fonts Preload */}
        <link rel="preload" href="/assets/fonts/TheSansB4-3_Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/TheSansB4-5_Plain.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/fonts/TheSansB4-7_Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Format Detection */}
        <meta name="format-detection" content="telephone=no" />
      </Head>
      <body className="gs_loading" id="startseite">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
