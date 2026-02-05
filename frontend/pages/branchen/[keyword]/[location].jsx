import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const MapView = dynamic(() => import('../../../src/components/MapView'), {
  ssr: false,
  loading: () => <div style={{ height: '400px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Karte wird geladen...</div>
})

export default function BranchenSearch() {
  const router = useRouter()
  const { keyword, location, lat, lon, radius: urlRadius } = router.query

  const [results, setResults] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [radius, setRadius] = useState(urlRadius ? Number(urlRadius) : 50) // Default 50km or from URL
  const [searchCenter, setSearchCenter] = useState(null) // [lat, lon]

  // API URL - use environment variable
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gelbeseitanreplica-production.up.railway.app'

  // Set search center from URL params or geocode location
  useEffect(() => {
    // If lat/lon are provided in URL (from geolocation), use them directly
    if (lat && lon) {
      const latValue = Array.isArray(lat) ? lat[0] : lat;
      const lonValue = Array.isArray(lon) ? lon[0] : lon;
      setSearchCenter([parseFloat(String(latValue)), parseFloat(String(lonValue))])
      return
    }

    // Otherwise, geocode the location name
    // Skip geocoding if location is "standort" (it's a placeholder for geolocation)
    if (!location) return
    
    const locationTerm = Array.isArray(location) ? location[0] : location
    const searchLocation = locationTerm.replace(/_/g, ' ')
    
    // Don't geocode "standort" - it's not a real location
    if (searchLocation.toLowerCase() === 'standort') {
      return
    }

    const geocodeLocation = async () => {
      try {
        // Use geocoding API or Nominatim
        const response = await fetch(`${API_URL}/api/v1/geocode?location=${encodeURIComponent(searchLocation)}`)
        if (response.ok) {
          const data = await response.json()
          if (data.latitude && data.longitude) {
            setSearchCenter([data.latitude, data.longitude])
          }
        }
      } catch (error) {
        console.error('Geocoding error:', error)
      }
    }

    geocodeLocation()
  }, [location, lat, lon])

  useEffect(() => {
    if (!keyword || !location) return

    const fetchResults = async () => {
      setLoading(true)
      try {
        const keywordTerm = Array.isArray(keyword) ? keyword[0] : keyword
        const locationTerm = Array.isArray(location) ? location[0] : location

        const searchKeyword = keywordTerm.replace(/_/g, ' ')
        const searchLocation = locationTerm.replace(/_/g, ' ')

        // Build API URL
        // If location is "standort" and we have coordinates, don't pass location parameter
        // Otherwise, pass the location parameter
        let apiUrl = `${API_URL}/api/v2/search?keyword=${encodeURIComponent(searchKeyword)}&page=${page}&page_size=50&radius=${radius}`
        
        // Only add location if it's not "standort" or if we don't have coordinates
        if (searchLocation && searchLocation.toLowerCase() !== 'standort') {
          apiUrl += `&location=${encodeURIComponent(searchLocation)}`
        }
        
        // Add coordinates if available (for geo-search)
        if (searchCenter) {
          apiUrl += `&lat=${searchCenter[0]}&lon=${searchCenter[1]}`
        }
        
        console.log('🔍 Fetching from:', apiUrl)

        const response = await fetch(apiUrl)

        console.log('API Response status:', response.status)

        if (response.ok) {
          const data = await response.json()
          console.log('API Response data:', data)
          console.log('Results:', data.results)
          console.log('Total:', data.total)
          setResults(data.results || [])
          setTotal(data.total || 0)
        } else {
          console.error('API Error:', response.status, response.statusText)
        }
      } catch (error) {
        console.error('Search error:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchResults()
  }, [keyword, location, page, radius, searchCenter])

  const keywordDisplay = typeof keyword === 'string' ? keyword.replace(/_/g, ' ').toUpperCase() : ''
  const locationDisplay = typeof location === 'string' ? location.replace(/_/g, ' ') : ''

  return (
    <>
      <Head>
        <link as="style" rel="preload" href="/assets/branchen/css/global_above.css" />
        <link rel="stylesheet" href="/assets/branchen/css/global_above.css" />
        <link rel="preload" as="style" href="/assets/branchen/css/trefferliste_above.css" />
        <link rel="stylesheet" href="/assets/branchen/css/trefferliste_above.css" />
        <link rel="stylesheet" href="/assets/branchen/css/schaufenster_global.css" />
        <title>{`${keywordDisplay} in ${locationDisplay} | Gelbe Seiten`}</title>
        <meta property="og:title" content={`${keywordDisplay} in ${locationDisplay} | Gelbe Seiten`} />
        <meta name="description" content={`${keywordDisplay} ${locationDisplay} ✉ Adresse ☎ Telefonnummer ⌚ Öffnungszeiten. Mit Routenplaner!`} />
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preload" href="/assets/branchen/fonts/TheSansB4-3_Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/branchen/fonts/TheSansB4-5_Plain.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/assets/branchen/fonts/TheSansB4-7_Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link id="global_below_css" rel="preload" href="/assets/branchen/css/global_below.css" as="style" />
        <link id="trefferliste_below_css" rel="preload" href="/assets/branchen/css/trefferliste_below.css" as="style" />
        <link rel="stylesheet" href="/assets/gsbiz/css/custom-icons.css" />
        <link rel="stylesheet" href="/assets/css/map-fullscreen.css" />
        <meta name="theme-color" content="#ffdc00" />
      </Head>

      {/* Search functionality now in React components */}

      {/* Slider functionality */}
      <Script id="slider-script" strategy="afterInteractive" dangerouslySetInnerHTML={{
        __html: `
        document.addEventListener('DOMContentLoaded', function() {
          const slider = document.getElementById('suchradius_slider');
          const valueDisplay = document.querySelector('.gs_suchradius_info_range_value');
          
          if (slider && valueDisplay) {
            slider.addEventListener('input', function() {
              const km = this.value / 1000;
              valueDisplay.textContent = km;
            });
          }
        });
      `}} />

      <div>
        <input type="checkbox" name="mod-Header__menu-container__showMobileMenu" id="mod-Header__menu-container" />
        <div className="mod mod-Suchanimation">
          <div id="suchanimation" className="mod-Suchanimation__balken"></div>
        </div>

        <div id="transform_wrapper">
          <div className="mod mod-UntenNachObenButton">
            <div className="mod-UntenNachObenButton__icon-line" />
            <div className="mod-UntenNachObenButton__icon-array" />
          </div>

          {/* Header - Using template structure */}
          <div className="header-sticky">
            <div className="mod mod-Header gc-header" data-module="gc-header">
              <div className="gc-header__bar">
                <div className="gc-header__line">
                  <a href="/" target="_top" className="gc-header__logo">
                    <img className="gs_svg_image no-auto" src="/assets/branchen/images/gelbe-seiten-logo.svg" width={0} height={0} alt="Gelbe Seiten Unternehmen finden" />
                  </a>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <div className="gc-header__a11ymobile" tabIndex={-1} aria-label="barrierefrei">
                      <a href="/gsservice/barrierefrei" className="gc-header__link">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#1E1E1E" strokeWidth="1.5" />
                          <path d="M12 7.2C11.5722 7.2 11.206 7.04333 10.9014 6.73C10.5968 6.41667 10.4444 6.04 10.4444 5.6C10.4444 5.16 10.5968 4.78333 10.9014 4.47C11.206 4.15667 11.5722 4 12 4C12.4278 4 12.794 4.15667 13.0986 4.47C13.4032 4.78333 13.5556 5.16 13.5556 5.6C13.5556 6.04 13.4032 6.41667 13.0986 6.73C12.794 7.04333 12.4278 7.2 12 7.2ZM9.66667 20V9.6C8.88889 9.53333 8.09815 9.43333 7.29444 9.3C6.49074 9.16667 5.72593 9 5 8.8L5.38889 7.2C6.4 7.48 7.47593 7.68333 8.61667 7.81C9.75741 7.93667 10.8852 8 12 8C13.1148 8 14.2426 7.93667 15.3833 7.81C16.5241 7.68333 17.6 7.48 18.6111 7.2L19 8.8C18.2741 9 17.5093 9.16667 16.7056 9.3C15.9019 9.43333 15.1111 9.53333 14.3333 9.6V20H12.7778V15.2H11.2222V20H9.66667Z" fill="#1E1E1E" />
                        </svg>
                      </a>
                    </div>
                    <button className="gc-header__toggle" id="toggle-button" aria-label="Menü öffnen">
                      <svg className="gc-header__icon" width={20} height={20} viewBox="0 0 20 20">
                        <line fill="none" stroke="black" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" x1={1} y1={4} x2={19} y2={4} />
                        <line fill="none" stroke="black" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" x1={1} y1={10} x2={19} y2={10} />
                        <line fill="none" stroke="black" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" x1={1} y1={16} x2={19} y2={16} />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Header navigation - keeping original structure */}
                <div className="gc-header__slider">
                  <nav className="gc-header__nav">
                    {/* Navigation items from template... */}
                  </nav>
                </div>
              </div>
            </div>

            {/* Search form section */}
            <div className="container"></div>
          </div>

          {/* Search Form Container */}
          <div className="container-wrapper">
            <div className="container">
              <form action="/suche" method="post" name="startpageForm" className="mod mod-GsSearchblock gs-searchblock">
                <div className="mod mod-Grouped grouped" data-module="grouped">
                  <div className="mod-Input input input--float-label" data-name="WAS">
                    <input className="input__input input__searchblock" id="what_search" name="WAS" placeholder="Was" type="search" defaultValue={keywordDisplay} aria-label="Was" autoFocus />
                    <ul className="WAS-Vorschalgsliste"></ul>
                    <div className="input__notice" />
                  </div>
                  <div className="mod-Grouped__flex-wrapper">
                    <div className="mod-Input input input--float-label" data-name="WO">
                      <input autoComplete="address-level2" className="input__input input__searchblock" id="where_search" name="WO" placeholder="Wo" type="search" defaultValue={locationDisplay} aria-label="Wo" />
                      <ul className="WO-Vorschalgsliste">
                        <li className="geolocation-trigger" tabIndex={1}>
                          <span>Meinen Standort verwenden</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <button className="gc-btn gc-btn--black gc-btn--l search_go with-margin" type="submit" aria-label="Suche">
                    <span className="gc-btn__text">Finden</span>
                  </button>
                </div>
                <div className="row">
                  <div className="col-12 col-xl-8 flex-column">
                    <div id="gs_suchradius" className="mod mod-RangeSlider active" data-role="suchradius" data-slider-start={0}>
                      <label className="gs_suchradius__text" htmlFor="suchradius_slider">Umkreis: <span className="gs_suchradius_info_range"><span className="gs_suchradius_info_range_value">{radius}</span> km</span></label>
                      <input 
                        className="gs_suchradius_slider" 
                        id="suchradius_slider" 
                        max={50} 
                        min={0} 
                        name="distance" 
                        step={1} 
                        value={radius}
                        onChange={(e) => setRadius(Number(e.target.value))}
                        type="range" 
                      />
                    </div>
                  </div>
                </div>
                <input type="hidden" name="pid" defaultValue="" />
              </form>
            </div>
          </div>

          {/* Map Section */}
          <div className="mod">
            <div style={{ width: '100%', height: '260px', backgroundColor: '#f0f0f0', position: 'relative' }}>
              <MapView 
                businesses={results} 
                height="260px" 
                center={searchCenter || undefined}
                radiusKm={radius}
              />
            </div>
          </div>

          {/* Results Info and Filters */}
          <div className="container-wrapper">
            <div className="container">
              <div className="mod mod-TrefferlisteInfo">
                <h1 className="mod-TrefferlisteInfo__headline">
                  <span id="wasBegriff">{keywordDisplay}</span>
                  {' in '}
                  <span id="woBegriff">{locationDisplay}</span>
                  {' '}
                  (<span id="mod-TrefferlisteInfo">{total}</span> Treffer)
                </h1>
              </div>

              <div className="mod mod-FilterGruppe">
                <form id="filterGruppe" autoComplete="off">
                  <input className="mod mod-Pille" id="pille_relevanz" name="sortierung" type="radio" defaultValue="relevanz" data-pillentyp="SORTIERUNG" defaultChecked />
                  <label className="mod mod-Pille" htmlFor="pille_relevanz">Beste Treffer</label>

                  <input className="mod mod-Pille" id="pille_bewertung" name="sortierung" type="radio" defaultValue="bewertung" data-pillentyp="SORTIERUNG" />
                  <label className="mod mod-Pille" htmlFor="pille_bewertung">Bewertung</label>

                  <input className="mod mod-Pille" id="pille_entfernung" name="sortierung" type="radio" defaultValue="entfernung" data-pillentyp="SORTIERUNG" />
                  <label className="mod mod-Pille" htmlFor="pille_entfernung">Entfernung</label>

                  <input className="mod mod-Pille" id="pille_geoeffnet" name="eigenschaft" type="checkbox" defaultValue="geoeffnet" data-pillentyp="EIGENSCHAFT" />
                  <label className="mod mod-Pille mod-Pille-checkbox" htmlFor="pille_geoeffnet">Geöffnet</label>
                </form>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div id="gs_body">
            <div className="container-wrapper">
              <div className="container">
                <div className="flexbox-layout-container">
                  <div className="float-layout-container--left">
                    <style type="text/css" dangerouslySetInnerHTML={{ __html: ".mod-Treffer__logo { max-width: min(252px, 100%) !important; }" }} />

                    <div id="teilnehmer_block" className="mod mod-Trefferbereich">
                      <div id="gs_treffer">
                        {loading ? (
                          <div style={{ padding: '40px', textAlign: 'center' }}>
                            <p>Lade Ergebnisse...</p>
                          </div>
                        ) : results.length === 0 ? (
                          <div style={{ padding: '40px', textAlign: 'center' }}>
                            <p>Keine Ergebnisse gefunden.</p>
                          </div>
                        ) : (
                          results.map((business, index) => (
                            <article
                              key={business.id}
                              className="mod mod-Treffer"
                              id={`treffer_${business.id}`}
                              tabIndex={0}
                              data-teilnehmerid={business.id}
                              style={{ cursor: 'pointer' }}
                            >
                              <a href={`/gsbiz/${business.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <h2 className="mod-Treffer__name" data-wipe-name="Titel">{business.name}</h2>
                                <p className="d-inline-block mod-Treffer--besteBranche">
                                  {business.branches && business.branches.length > 0 ? `Branche: ${business.branches[0]}` : ''}
                                </p>
                              </a>

                              <div className="mod-Treffer__line" />

                              <address className="mod-AdresseKompakt">
                                <div>
                                  <div className="mod-AdresseKompakt__container">
                                    <div className="mod-AdresseKompakt__adress no-icon-pseudo" style={{ marginRight: '12px' }}>
                                      <img src="/assets/gsbiz/images/ic-adresse.svg" width={24} height={24} alt="Adresse" style={{ verticalAlign: 'middle' }} />
                                    </div>
                                    <div className="mod-AdresseKompakt__adress-text" style={{ marginLeft: 0 }}>
                                      {business.address}
                                      {business.distance_km && (
                                        <span className="mod-AdresseKompakt__entfernung" title="Entfernung ab Suchmittelpunkt" style={{ marginLeft: '8px', color: '#666', fontSize: '14px' }}>
                                          @ {business.distance_km} km
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </address>

                              {business.phone && (
                                <div className="mod-TelefonnummerKompakt no-icon-pseudo" style={{ display: 'flex', alignItems: 'center' }}>
                                  <img src="/assets/gsbiz/images/ic-telefon.svg" width={24} height={24} alt="Telefon" style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                                  <a className="mod-TelefonnummerKompakt__phoneNumber"
                                    href={`tel:${business.phone}`}
                                    data-wipe-name="Kontaktdaten">
                                    {business.phone}
                                  </a>
                                </div>
                              )}

                              {business.website && (
                                <div className="mod-WebseiteKompakt no-icon-pseudo" style={{ display: 'flex', alignItems: 'center' }}>
                                  <div className="webseiteLink" style={{ display: 'flex', alignItems: 'center' }}>
                                    <img src="/assets/gsbiz/images/ic-webseite.svg" width={24} height={24} alt="Webseite" style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                                    <span className="mod-WebseiteKompakt__text">Webseite</span>
                                  </div>
                                </div>
                              )}
                            </article>
                          ))
                        )}
                      </div>

                      {/* Load More */}
                      {!loading && total > results.length && (
                        <form className="mod mod-LoadMore" id="mod-LoadMore">
                          <div id="mod-LoadMore--block">
                            <p className="mod-LoadMore--text">
                              <span id="loadMoreStartIndex">1</span>
                              {' - '}
                              <span id="loadMoreGezeigteAnzahl">{results.length}</span>
                              {' von '}
                              <span id="loadMoreGesamtzahl">{total}</span>
                              {' Einträgen'}
                            </p>
                            <button
                              type="button"
                              onClick={() => setPage(p => p + 1)}
                              className="mod-LoadMore--button"
                              title="Mehr Anzeigen"
                            >
                              Mehr Anzeigen (+10)
                            </button>
                          </div>
                        </form>
                      )}
                    </div>
                  </div>

                  {/* Right Sidebar */}
                  <div className="d-none d-xl-block float-layout-container--right">
                    <div className="mod mod-KundenumfrageAufTrefferliste">
                      <a id="KundenumfrageAufTrefferlisteLink" target="_blank" href="https://www.surveymonkey.de/r/PDWH68H">
                        <div className="mod-KundenumfrageAufTrefferliste__icon" />
                        <div className="mod-KundenumfrageAufTrefferliste__Text">
                          <div className="mod-KundenumfrageAufTrefferliste__Text__title">Ihre Meinung zählt!</div>
                          <div className="mod-KundenumfrageAufTrefferliste__Text__content">Was gefällt Ihnen gut?<br />Was sollten wir verbessern?</div>
                          <button className="mod-KundenumfrageAufTrefferliste__Text__button gc-btn">Jetzt Feedback geben!</button>
                        </div>
                      </a>
                    </div>

                    <a className="mod-verlagTeaser__standardTeaser" href="/starteintrag" target="_blank" rel="noopener">
                      <h3 className="gc-text--h3">Ihr Lieblingsunternehmen...</h3>
                      <p>... fehlt in unserer Liste?</p>
                      <span className="gc-btn gc-btn--bordered gc-btn--block">Jetzt Unternehmen eintragen</span>
                    </a>

                    <a href="http://www.bfb.de" className="mod-verlagTeaser gs_teaser_verlag gs_sidebar_modul" target="_blank" rel="noopener">
                      <span className="gs_teaser_title">Ihr Gelbe Seiten Verlag</span>
                      <img loading="lazy" alt="Gelbe Seiten Verlag" className="gs_teaser_verlag_bild" width={0} height={0} src="/assets/branchen/images/4_1.gif" />
                    </a>
                  </div>
                </div>

                {/* Breadcrumbs */}
                <div className="float-layout-container--bottom">
                  <div className="mod mod-Breadcrumb mod-Breadcrumb--regio mod-Breadcrumb--trefferliste d-block">
                    <ul className="mod-Breadcrumb__list">
                      <li className="mod-Breadcrumb__list-item">
                        <a href="/branchenbuch">
                          <span className="mod-Breadcrumb-attribut--trefferliste">Deutschland</span>
                        </a>
                      </li>
                      <li className="mod-Breadcrumb__list-item">
                        <a href={`/branchenbuch/staedte/${locationDisplay.toLowerCase()}`}>
                          <span className="mod-Breadcrumb-attribut--trefferliste">{locationDisplay}</span>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer>
            <div className="container-wrapper bg--yellow">
              <div className="container">
                <nav className="mod mod-Footer row">
                  <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                    <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-1" />
                    <label htmlFor="gs-footer-menu-1">Dialog &amp; Hilfe</label>
                    <a href="/gsservice/verlage" className="mod-Footer__link-item" target="_self">Ansprechpartner</a>
                    <a href="/gsservice/faq" className="mod-Footer__link-item" target="_self">Häufige Fragen</a>
                    <a href="/branchenbuch" className="mod-Footer__link-item" target="_self">Übersicht aller Städte</a>
                  </div>
                  <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                    <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-2" />
                    <label htmlFor="gs-footer-menu-2">Über Gelbe Seiten</label>
                    <a href="/gsservice/newsroom" className="mod-Footer__link-item" target="_self">Newsroom</a>
                    <a href="/gsservice/mobil" className="mod-Footer__link-item" target="_self">Gelbe Seiten als App</a>
                  </div>
                </nav>
              </div>
            </div>

            <div className="container-wrapper mod-Footer__middlePart">
              <div className="container">
                <div className="row container-wrapper mod-Footer__middlePart__wrapper">
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="mod-Footer__middlePart__downloadIcon-text">Gelbe Seiten als App</div>
                    <div className="mod-Footer__middlePart__downloadIcon-wrapper">
                      <a className="mod-Footer__middlePart__downloadIcon-link" href="https://play.google.com/store/apps/details?id=de.gelbeseiten.android">
                        <img className="mod-Footer__middlePart__downloadIcon" src="/assets/branchen/images/google-play-badge.png" alt="Google play badge" width={129} height={40} />
                      </a>
                      <a className="mod-Footer__middlePart__downloadIcon-link" href="https://itunes.apple.com/de/app/gelbe-seiten-branchenbuch/id312387605?mt=8">
                        <img className="mod-Footer__middlePart__downloadIcon" src="/assets/branchen/images/app-store-badge.png" alt="App store badge" width={129} height={40} />
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="mod mod-Guetesiegel-footer">
                      <div className="mod-Guetesiegel__wrap-footer">
                        <div className="mod-Guetesiegel__title-footer">Mehrfach ausgezeichnet</div>
                        <div className="mod-Guetesiegel__wrap__container-footer">
                          <div className="mod-Guetesiegel__award-footer">
                            <img src="/assets/branchen/images/germanCustomerAward_2023.png" alt="Deutscher Kunden Award" width={56} height={83} />
                          </div>
                          <div className="mod-Guetesiegel__award-footer">
                            <img src="/assets/branchen/images/besteOnlinePortale_2023.png" alt="Best Online Portale" width={56} height={83} />
                          </div>
                          <div className="mod-Guetesiegel__ntv-footer">
                            <img src="/assets/branchen/images/ntv_2023.png" alt="ntv" width={80} height={80} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="container-wrapper">
              <div className="container">
                <div className="mod-Footer__line" />
              </div>
            </div>

            <div className="container-wrapper mod-Footer__bottomPart">
              <div className="container">
                <div className="row container-wrapper mod-Footer__bottomPart-wrapper">
                  <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                    <a href="/gsservice/impressum" className="mod-Footer__link-item--bottom" target="_self">Impressum</a>
                    <a href="/gsservice/datenschutz" className="mod-Footer__link-item--bottom" target="_self">Datenschutzerklärung</a>
                    <a href="/#cmpscreencustom" className="mod-Footer__link-item--bottom" target="_self">Datenschutz-Einstellungen</a>
                    <a href="/gsservice/nutzungsbedingungen" className="mod-Footer__link-item--bottom" target="_self">AGB</a>
                  </div>
                  <div className="mod-Footer__infos col-12 col-md-6 col-lg-6 col-xl-6">
                    <a href="/" className="mod-Footer__logo" target="_top">
                      <img src="/assets/images/gelbe-seiten-logo.svg" alt="Gelbe Seiten" width={29} height={4} loading="lazy" />
                    </a>
                    <a href="/gsservice/verlage" target="_blank" rel="noopener" className="mod-Footer__verlagslink">
                      Ein Service Ihrer <div className="nobr">Gelbe Seiten Verlage</div>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </>
  )
}
