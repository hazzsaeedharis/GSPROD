import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useState, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'

// Dynamically import map to avoid SSR issues
const MapView = dynamic(() => import('../../src/components/MapView'), {
    ssr: false,
    loading: () => <div style={{ height: '300px', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Karte wird geladen...</div>
})

export default function BusinessDetailPage() {
    const router = useRouter()
    const { id } = router.query

    const [business, setBusiness] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    // API URL - use environment variable
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://gelbeseitanreplica-production.up.railway.app'

    useEffect(() => {
        if (!id) return

        const fetchBusinessDetails = async () => {
            try {
                setLoading(true)
                const response = await fetch(`${API_URL}/api/v2/business/${id}`)

                if (!response.ok) {
                    throw new Error('Business not found')
                }

                const data = await response.json()
                setBusiness(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchBusinessDetails()
    }, [id])

    // Check if currently open - memoized
    const isCurrentlyOpen = useCallback(() => {
        if (!business?.opening_hours) return null

        const now = new Date()
        const currentDay = now.toLocaleDateString('de-DE', { weekday: 'long' })
        const currentTime = now.getHours() * 100 + now.getMinutes()

        const todayHours = business.opening_hours[currentDay]
        if (!todayHours || todayHours.toLowerCase() === 'geschlossen') return false

        const match = todayHours.match(/(\d{2}):(\d{2})-(\d{2}):(\d{2})/)
        if (match) {
            const openTime = parseInt(match[1]) * 100 + parseInt(match[2])
            const closeTime = parseInt(match[3]) * 100 + parseInt(match[4])
            return currentTime >= openTime && currentTime < closeTime
        }

        return null
    }, [business?.opening_hours])

    const getClosingTime = useCallback(() => {
        if (!business?.opening_hours) return null

        const currentDay = new Date().toLocaleDateString('de-DE', { weekday: 'long' })
        const todayHours = business.opening_hours[currentDay]

        if (!todayHours) return null

        const match = todayHours.match(/\d{2}:\d{2}-(\d{2}:\d{2})/)
        return match ? match[1] : null
    }, [business?.opening_hours])

    if (loading) {
        return (
            <div style={{ padding: '60px', textAlign: 'center', background: '#ffdc00', minHeight: '100vh' }}>
                <p style={{ fontSize: '18px' }}>Lade Unternehmensdaten...</p>
            </div>
        )
    }

    if (error || !business) {
        return (
            <div style={{ padding: '60px', textAlign: 'center', background: '#ffdc00', minHeight: '100vh' }}>
                <p style={{ color: '#d32f2f', fontSize: '18px', marginBottom: '20px' }}>
                    {error || 'Unternehmen nicht gefunden'}
                </p>
                <a href="/" style={{ color: '#000', textDecoration: 'underline' }}>
                    Zurück zur Startseite
                </a>
            </div>
        )
    }

    const isOpen = isCurrentlyOpen()
    const closingTime = getClosingTime()
    const currentDay = new Date().toLocaleDateString('de-DE', { weekday: 'long' })

    return (
        <>
            <Head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{business.name} in {business.address.postcode} {business.address.city}</title>
                <meta name="description" content={`${business.name} auf gelbeseiten.de 📩 Adresse ☎ Telefonnummer 🕐 Öffnungszeiten ➤ Alles auf einen Klick.`} />
                <meta property="og:description" content={`${business.name} auf gelbeseiten.de 📩 Adresse ☎ Telefonnummer 🕐 Öffnungszeiten ➤ Alles auf einen Klick.`} />
                <meta name="robots" content="index,follow,noarchive,noodp" />
                <meta property="og:site_name" content="Gelbe Seiten" />
                <meta name="format-detection" content="telephone=no" />
                <meta name="theme-color" content="#ffdc00" />

                {/* Icons */}
                <link rel="icon" href="/assets/gsbiz/images/favicon@32w.png" sizes="32x32" />
                <link rel="icon" href="/assets/gsbiz/images/favicon@96x.png" sizes="96x96" />
                <link rel="icon" href="/assets/gsbiz/images/favicon@192x.png" sizes="192x192" />

                {/* Fonts */}
                <link rel="preload" href="/assets/gsbiz/fonts/TheSansB4-3_Light.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/assets/gsbiz/fonts/TheSansB4-5_Plain.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
                <link rel="preload" href="/assets/gsbiz/fonts/TheSansB4-7_Bold.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />

                {/* CSS - Load in correct order */}
                <link rel="stylesheet" href="/assets/gsbiz/css/global_above.css" />
                <link rel="stylesheet" href="/assets/gsbiz/css/detailseite_above.css" />
                <link rel="stylesheet" href="/assets/gsbiz/css/global_below.css" />
                <link rel="stylesheet" href="/assets/gsbiz/css/detailseite_below.css" />
                <link rel="stylesheet" href="/assets/gsbiz/css/custom-icons.css" />
                <link rel="stylesheet" href="/assets/css/map-fullscreen.css" />

                <style dangerouslySetInnerHTML={{ __html: ".mod-MarketplaceMobile__container { white-space: normal!important; }" }} />
            </Head>

            {/* JavaScript migrated to React components */}

            <div>
                <input type="checkbox" name="mod-Header__menu-container__showMobileMenu" id="mod-Header__menu-container" />
                <div className="mod mod-Suchanimation">
                    <div id="suchanimation" className="mod-Suchanimation__balken"></div>
                </div>
                <div id="transform_wrapper">
                    <div className="mod mod-UntenNachObenButton" data-wipe='{"listener": "click", "name": "click: nach oben button"}'>
                        <div className="mod-UntenNachObenButton__icon-line" />
                        <div className="mod-UntenNachObenButton__icon-array" />
                    </div>
                    <div className="header-sticky">
                        <header>
                            <div className="mod mod-Header gc-header" data-module="gc-header">
                                <div className="gc-header__bar">
                                    <div className="gc-header__line">
                                        <a href="/" target="_top" className="gc-header__logo">
                                            <img className="gs_svg_image no-auto" src="/assets/gsbiz/images/gelbe-seiten-logo.svg" width={0} height={0} alt="Gelbe Seiten Unternehmen finden" />
                                        </a>
                                        <div style={{ display: 'flex', gap: '10px' }}>
                                            <div className="gc-header__a11ymobile" tabIndex={-1} aria-label="barrierefrei">
                                                <a href="/gsservice/barrierefrei" className="gc-header__link">
                                                    <img src="/assets/gsbiz/images/ic-board.svg" alt="barrierefrei" width={24} height={24} />
                                                </a>
                                            </div>
                                            <button className="gc-header__toggle" id="toggle-button" aria-label="Menü öffnen">
                                                <img className="gc-header__icon" src="/assets/gsbiz/images/ic-menu-card.svg" alt="Menü" width={20} height={20} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="gc-header__slider">
                                        <nav className="gc-header__nav">
                                            <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                                                <button type="button" className="gc-header__link" tabIndex={-1}>Suchen</button>
                                                <span className="gc-header__separation-line" />
                                                <div className="gc-header__subfolder">
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/" id="Was&WoSuche" className="gc-header__link">Was &amp; Wo Suche</a>
                                                    </div>
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/branchenbuch" id="Branchenkatalog" className="gc-header__link">Branchenkatalog</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                                                <button type="button" className="gc-header__link" tabIndex={-1}>Service</button>
                                                <span className="gc-header__separation-line" />
                                                <div className="gc-header__subfolder gc-header__submenu" tabIndex={-1}>
                                                    <ul className="sub-menu">
                                                        <li className="sub-menu">
                                                            <label>FÜR SIE</label>
                                                            <ul>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="https://vermittlungsservice.gelbeseiten.de/" className="gc-header__link">Vermittlungsservice</a>
                                                                </div>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="/projektplaner/energieberatung" className="gc-header__link">Energieberatung</a>
                                                                    <span className="gc-header__submenu__newItem">NEU</span>
                                                                </div>
                                                            </ul>
                                                        </li>
                                                        <li className="sub-menu">
                                                            <label>FÜR FIRMENINHABER</label>
                                                            <ul>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="/starteintrag" className="gc-header__link">Neuer Firmeneintrag</a>
                                                                </div>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="/starteintrag/findentry?step=1" className="gc-header__link">Firmeneintrag ändern</a>
                                                                </div>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="/gsservice/werbung" className="gc-header__link">Premium Eintrag sichern</a>
                                                                </div>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="/gsservice/verlage" className="gc-header__link">Ansprechpartner finden</a>
                                                                </div>
                                                                <div className="gc-header__item gc-header__item--childs">
                                                                    <a href="/gsservice/echtzeit" className="gc-header__link">Gelbe Seiten in Zahlen</a>
                                                                </div>
                                                            </ul>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                                                <button type="button" className="gc-header__link" tabIndex={-1}>Ratgeber</button>
                                                <span className="gc-header__separation-line" />
                                                <div className="gc-header__subfolder">
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/ratgeber" id="RatgeberÜbersicht" className="gc-header__link">Ratgeber Übersicht</a>
                                                    </div>
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/ratgeber/gl" id="GesünderLeben" className="gc-header__link">Gesünder Leben</a>
                                                    </div>
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/ratgeber/hg" id="Haus&Garten" className="gc-header__link">Haus &amp; Garten</a>
                                                    </div>
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/ratgeber/rf" id="Recht&Finanzen" className="gc-header__link">Recht &amp; Finanzen</a>
                                                    </div>
                                                    <div className="gc-header__item" tabIndex={-1}>
                                                        <a href="/gsservice/machergeschichten" id="Machergeschichten" className="gc-header__link">Machergeschichten</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="gc-header__item gc-header__item--childs" tabIndex={-1}>
                                                <span className="gc-header__separation-line" />
                                                <div className="gc-header__item gc-header__button-container">
                                                    <a href="/starteintrag" className="gc-btn gc-btn--black header-btn">Firma eintragen</a>
                                                </div>
                                            </div>
                                            <div className="gc-header__item gc-header__button-container gc-header__a11y" tabIndex={-1} aria-label="barrierefrei">
                                                <a href="/gsservice/barrierefrei" className="gc-header__link" id="a11ylink">
                                                    <img src="/assets/gsbiz/images/ic-board.svg" alt="barrierefrei" width={24} height={24} />
                                                </a>
                                            </div>
                                        </nav>
                                    </div>
                                </div>
                            </div>
                        </header>
                    </div>

                    <div className="container-wrapper">
                        <div className="container" style={{ zIndex: 1 }}>
                            <form action="/suche" method="post" name="startpageForm" className="mod mod-GsSearchblock gs-searchblock">
                                <div className="mod mod-Grouped grouped" data-module="grouped">
                                    <div className="mod-Input input input--float-label" data-name="WAS">
                                        <input
                                            className="input__input input__searchblock"
                                            id="what_search"
                                            name="WAS"
                                            placeholder="Was"
                                            spellCheck="false"
                                            type="search"
                                            defaultValue={business.branches?.[0] || ''}
                                            aria-label="Was"
                                            autoFocus="autofocus"
                                        />
                                        <ul className="WAS-Vorschalgsliste"></ul>
                                        <div className="input__notice" />
                                    </div>
                                    <div className="mod-Grouped__flex-wrapper">
                                        <div className="mod-Input input input--float-label" data-name="WO">
                                            <input
                                                autoComplete="address-level2"
                                                className="input__input input__searchblock"
                                                id="where_search"
                                                name="WO"
                                                placeholder="Wo"
                                                spellCheck="false"
                                                type="search"
                                                defaultValue={business.address.city || ''}
                                                aria-label="Wo"
                                            />
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
                                <input type="hidden" name="pid" defaultValue="" />
                            </form>
                        </div>
                    </div>

                    <main>
                        {business.location && (
                            <div className="mod-KarteImage" data-thisyear={2026} style={{ height: '300px', minHeight: '300px', overflow: 'hidden' }}>
                                <MapView
                                    businesses={[{
                                        id: business.id,
                                        name: business.name,
                                        address: business.address.full_address || `${business.address.street}, ${business.address.postcode} ${business.address.city}`,
                                        city: business.address.city,
                                        postcode: business.address.postcode,
                                        phone: business.contact.phone,
                                        website: business.contact.website,
                                        branches: business.branches,
                                        lat: business.location.latitude,
                                        lon: business.location.longitude
                                    }]}
                                    center={[business.location.latitude, business.location.longitude]}
                                    zoom={15}
                                    height="300px"
                                />
                            </div>
                        )}
                        {!business.location && (
                            <div
                                className="mod-KarteImage"
                                style={{
                                    backgroundImage: 'url(/assets/gsbiz/images/karte_platzhalter.svg)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    minHeight: '210px',
                                    backgroundColor: '#e0e0e0'
                                }}
                                data-thisyear={2026}
                            >
                            </div>
                        )}
                        <div id="content">
                            <div className="container-wrapper">
                                <div className="container--flexbox">
                                    <div className="container-leftWerbesplatDetailseite" />
                                    <div className="container container--relative">
                                        <section>
                                            <div className="mod mod-TeilnehmerKopf">
                                                <div className="mod-TeilnehmerKopf__teilnehmerdaten-wrapper">
                                                    <div className="mod-TeilnehmerKopf__teilnehmerdaten">
                                                        <div className="mod-TeilnehmerKopf__Name-wrapper">
                                                            <h1 className="mod-TeilnehmerKopf__name">{business.name}</h1>
                                                            <div></div>
                                                            {business.branches && business.branches.length > 0 && (
                                                                <div className="mod-TeilnehmerKopf__branchen">
                                                                    <span data-selenium="teilnehmerkopf__branche">{business.branches[0]}</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="mod-TeilnehmerKopf__zusaetzliche-daten">
                                                        <address className="mod-TeilnehmerKopf__adresse">
                                                            <div className="mod-TeilnehmerKopf__adresse-icon-container">

                                                            </div>
                                                            <div>
                                                                {business.address.street && (
                                                                    <span className="mod-TeilnehmerKopf__adresse-daten">{business.address.street}, </span>
                                                                )}
                                                                {business.address.postcode && (
                                                                    <span className="mod-TeilnehmerKopf__adresse-daten">{business.address.postcode} </span>
                                                                )}
                                                                {business.address.city && (
                                                                    <span className="mod-TeilnehmerKopf__adresse-daten--noborder">
                                                                        {business.address.city}{business.address.district ? `-${business.address.district}` : ''}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </address>
                                                        {isOpen !== null && (
                                                            <div className="mod-TeilnehmerKopf__oeffnungszeiten">
                                                                <div className="mod-TeilnehmerKopf__oeffnungszeiten-icon-container">
                                                                    <img src={isOpen ? "/assets/gsbiz/images/ic-clock-green.svg" : "/assets/gsbiz/images/ic-clock.svg"} alt="Öffnungszeiten" width={20} height={20} />
                                                                </div>
                                                                <div>
                                                                    <span className={isOpen ? "offen" : "geschlossen"}>
                                                                        {isOpen ? 'Geöffnet' : 'Geschlossen'}
                                                                    </span>
                                                                    {isOpen && closingTime && (
                                                                        <>
                                                                            <span className="mod-TeilnehmerKopf__oeffnungszeiten__dash"></span>
                                                                            <span>Schließt um {closingTime}</span>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="aktionsleiste">
                                                    <div className="angebotLayer d-none" id="anfrage-haverz">
                                                        <dialog id="vz_anfrage_container" className="angebotLayer__container" />
                                                    </div>

                                                    {business.contact.phone && (
                                                        <div className="aktionsleiste-button" tabIndex={0} id="anrufen_mobile">
                                                            <div className="freecall-button" id="anrufen">
                                                                <a href={`tel:${business.contact.phone}`} className="button">
                                                                    <img src="/assets/gsbiz/images/ic-phone-filled.svg" alt="Telefon" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                                                                    <span data-hochgestellt-position="end" data-hochgestellt-content={1}>Gratis anrufen</span>
                                                                </a>
                                                            </div>
                                                        </div>
                                                    )}

                                                    {business.contact.email && (
                                                        <div className="aktionsleiste-button" tabIndex={0} data-isneededpromise="false">
                                                            <a href={`mailto:${business.contact.email}?subject=Anfrage über Gelbe Seiten`} className="button">
                                                                <img src="/assets/gsbiz/images/ic-mail-filled.svg" alt="E-Mail" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                                                                <span>E-Mail</span>
                                                            </a>
                                                        </div>
                                                    )}

                                                    {business.contact.website && (
                                                        <div className="aktionsleiste-button" tabIndex={0}>
                                                            <a href={business.contact.website} target="_blank" tabIndex={-1} rel="noopener" title={business.contact.website}>
                                                                <div className="button">
                                                                    <img src="/assets/gsbiz/images/ic-globe-filled.svg" alt="Website" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                                                                    <span>Website</span>
                                                                </div>
                                                            </a>
                                                        </div>
                                                    )}

                                                    {business.location && (
                                                        <div className="aktionsleiste-button" tabIndex={0} id="modAktionsleisteRoute">
                                                            <a
                                                                href={`https://www.google.com/maps/dir/?api=1&destination=${business.location.latitude},${business.location.longitude}`}
                                                                target="_blank"
                                                                rel="noopener"
                                                                className="button"
                                                            >
                                                                <img src="/assets/gsbiz/images/ic-location-filled.svg" alt="Route" style={{ width: '20px', height: '20px', marginRight: '8px' }} />
                                                                <span>Route</span>
                                                            </a>
                                                        </div>
                                                    )}

                                                    <div className="aktionsleiste-button inactive" tabIndex={0}>
                                                        <div className="buchen button termin" data-option={1}>
                                                            <img src="/assets/gsbiz/images/ic-booking-grey.svg" alt="Reservieren" width={20} height={20} style={{ marginRight: '8px' }} />
                                                            <span data-hochgestellt-position="end" data-hochgestellt-content={1}>Reservieren</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="anrufen_content d-none">
                                                <div className="mod mod-C4all">
                                                    <div className="mod-C4all__formular">
                                                        <span>Ihre gewünschte Verbindung:</span>
                                                        <p className="mod-C4all__teilnehmer_info">{business.name}</p>
                                                        <span className="telefonnummer">{business.contact.phone}</span>
                                                        <div className="formInput" id="c4allRufnummer">
                                                            <div className="mod mod-GcInput gc-input gc-input--gray">
                                                                <input className="gc-input__input" name="c4allRufnummer" type="tel" required title="Bitte geben Sie nur Zahlen ein" pattern="[0-9]*" placeholder="Ihre Festnetz-/Mobilnummer" />
                                                                <label className="gc-input__label">Ihre Festnetz-/Mobilnummer *</label>
                                                            </div>
                                                        </div>
                                                        <input type="hidden" defaultValue={business.id} name="c4allTeilnehmerId" />
                                                        <button className="gc-btn gc-btn--block" id="c4all_call_button">Anrufen</button>
                                                        <p className="messages d-none" id="c4all-info" />
                                                        <p className="messages d-none messageError" id="c4all-error" />
                                                    </div>
                                                    <div className="mod-C4all__info">
                                                        <b>Und so funktioniert es:</b><br />
                                                        <p>Geben Sie links Ihre Rufnummer incl. Vorwahl ein und klicken Sie auf "Anrufen". Es wird zunächst eine Verbindung zu Ihrer Rufnummer hergestellt. Dann wird der von Ihnen gewünschte Teilnehmer angerufen.</p>
                                                        <div className="hinweis">
                                                            <p className="hinweis">Hinweis:</p>
                                                            <p>Die Leitung muss natürlich frei sein. Die Dauer des Gratistelefonats ist bei Festnetz zu Festnetz unbegrenzt, für Mobilgespräche auf <span className="nobr">20 Min. limitiert.</span></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="buchungsoptionen_content d-none" id="buchungsoptionen"></div>
                                        </section>

                                        <section id="bildergalerie">
                                            <div id="bildergalerieKlickstrecke" className="mod mod-Lightbox d-none">
                                                <span className="mod-Lightbox__close" />
                                                <div className="mod-Klickstrecke"></div>
                                            </div>
                                        </section>

                                        <section>
                                            <div className="mod mod-Content">
                                                <section id="kontaktdaten">
                                                    <div className="mod mod-Kontaktdaten">
                                                        <div className="row mod-Kontaktdaten__container">
                                                            <div className="mod-Kontaktdaten__container--inner" data-hasvcard="true">
                                                                <div className="mod-Kontaktdaten__list-item">
                                                                    <address>
                                                                        <form method="POST" action="/prg" target="_blank" rel="noopener" className="mod-Kontaktdaten__editContainer">
                                                                            <input name="sort" defaultValue="" type="hidden" />
                                                                            <button type="submit">Änderung vorschlagen</button>
                                                                        </form>
                                                                        <div className="gc-text--h2">{business.name}</div>
                                                                        <div className="mod-Kontaktdaten__address-container">
                                                                            <div className="mod-Kontaktdaten__address-icon no-icon-pseudo" style={{ marginRight: '12px' }}>
                                                                                <img src="/assets/gsbiz/images/ic-adresse.svg" alt="Adresse" width={24} height={24} style={{ verticalAlign: 'middle' }} />
                                                                            </div>
                                                                            <div className="adresse-text">
                                                                                {business.address.street && <span>{business.address.street}, </span>}
                                                                                {business.address.postcode && business.address.city && (
                                                                                    <span>{business.address.postcode} {business.address.city}</span>
                                                                                )}
                                                                                {business.address.district && <span>-{business.address.district}</span>}
                                                                            </div>
                                                                        </div>
                                                                    </address>
                                                                </div>

                                                                {business.contact.phone && (
                                                                    <div className="mod-Kontaktdaten__list-item no-icon-pseudo" style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <img src="/assets/gsbiz/images/ic-telefon.svg" alt="Telefon" width={24} height={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                                                                        <span>
                                                                            <a className="nolink-grey" href={`tel:${business.contact.phone.replace(/\s/g, '')}`}>
                                                                                <span>{business.contact.phone}</span>
                                                                            </a>
                                                                        </span>
                                                                    </div>
                                                                )}

                                                                {business.contact.website && (
                                                                    <div className="mod-Kontaktdaten__list-item no-icon-pseudo" style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <img src="/assets/gsbiz/images/ic-webseite.svg" alt="Website" width={24} height={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                                                                        <a href={business.contact.website} target="_blank" rel="noopener">
                                                                            <span>Webseite</span>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                                {business.location && (
                                                                    <div className="mod-Kontaktdaten__list-item no-icon-pseudo" style={{ display: 'flex', alignItems: 'center' }}>
                                                                        <img src="/assets/gsbiz/images/ic-anfahrt.svg" alt="Website" width={24} height={24} style={{ marginRight: '12px', verticalAlign: 'middle' }} />
                                                                        <a
                                                                            href={`https://www.google.com/maps/dir/?api=1&destination=${business.location.latitude},${business.location.longitude}`}
                                                                            target="_blank"
                                                                            rel="noopener"
                                                                        >
                                                                            <span>Anfahrt mit Bus und Bahn</span>
                                                                        </a>
                                                                    </div>
                                                                )}

                                                                <div className="mod-Kontaktdaten__list-item mod-Kontaktdaten__social-media-iconlist"></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>

                                                {business.opening_hours && Object.keys(business.opening_hours).length > 0 && (
                                                    <section id="oeffnungszeiten">
                                                        <div className="mod mod-Oeffnungszeiten">
                                                            <h2 className="gc-text--h2">Öffnungszeiten</h2>
                                                            <div className="mod-Oeffnungszeiten__container">
                                                                {['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag'].map(day => {
                                                                    const isToday = day === currentDay
                                                                    const time = business.opening_hours[day] || 'Geschlossen'
                                                                    return (
                                                                        <div key={day} className={isToday ? 'green' : ''}>
                                                                            <span className="mod-Oeffnungszeiten__icon">
                                                                                <i className={isToday ? 'icon-clock-green' : 'icon-clock'} />
                                                                            </span>
                                                                            <span className="mod-Oeffnungszeiten__tag">{day}</span>
                                                                            <span>
                                                                                <span className="mod-Oeffnungszeiten__zeit">{time}</span>
                                                                            </span>
                                                                        </div>
                                                                    )
                                                                })}
                                                                <form method="POST" action="/prg" target="_blank" rel="noopener" className="mod-Oeffnungszeiten__editContainer">
                                                                    <input type="hidden" defaultValue="" name="sort" />
                                                                    <button type="submit">Änderung vorschlagen</button>
                                                                </form>
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}

                                                <section id="bewertungen">
                                                    <div className="mod mod-Bewertungen" data-eintragsid={business.id}>
                                                        <h2 className="gc-text--h2">Bewertungen</h2>
                                                        <div className="mod-Bewertungen__container">
                                                            <div className="mod-Bewertungen__nobewertung">
                                                                Noch keine Rezensionen für dieses Unternehmen vorhanden.
                                                                <div className="mod-Bewertungen__rate-button gc-btn" data-hochgestellt-content={1} data-hochgestellt-position="end">
                                                                    Bewertung schreiben
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>

                                                <section id="faq">
                                                    <div id="faq_block" className="mod mod-Faq">
                                                        <h2 className="gc-text--h2">Häufige Fragen</h2>
                                                        <div id="mod-faq-block">
                                                            <div className="mod mod-GcAkkordeon" data-module="mod-GcAkkordeon">
                                                                <div className="mod-GcAkkordeon__section">
                                                                    <button type="button" className="mod-GcAkkordeon__header">
                                                                        <h3 className="gc-text--h3">Wie kann ich Kontakt mit {business.name} aufnehmen?</h3>
                                                                    </button>
                                                                    <div className="mod-GcAkkordeon__content">
                                                                        Es ist sehr einfach Kontakt mit {business.name} aufzunehmen.
                                                                        Einfach die passenden Kontaktmöglichkeiten wie Adresse oder Mail in unserem Kontaktdaten-Bereich auswählen.
                                                                        Hier finden Sie alle <a href={`/gsbiz/${id}#kontaktdaten`}>Kontaktdaten</a>.
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </section>

                                                <div className="mod mod-Breadcrumb mod-Breadcrumb--classic mod-Breadcrumb--detailseite :: d-block">
                                                    <ul className="mod-Breadcrumb__list">
                                                        <li className="mod-Breadcrumb__list-item">
                                                            <a href="/">
                                                                <span className="mod-Breadcrumb-attribut--detailseite">Gelbe Seiten</span>
                                                            </a>
                                                        </li>
                                                        {business.branches && business.branches[0] && (
                                                            <li className="mod-Breadcrumb__list-item">
                                                                <a href={`/branchenbuch/branche/${business.branches[0].toLowerCase().replace(/\s+/g, '-')}`}>
                                                                    <span className="mod-Breadcrumb-attribut--detailseite">{business.branches[0]}</span>
                                                                </a>
                                                            </li>
                                                        )}
                                                        {business.address.city && (
                                                            <li className="mod-Breadcrumb__list-item">
                                                                <a href={`/branchen/${business.branches?.[0]?.toLowerCase().replace(/\s+/g, '_') || 'alle'}/${business.address.city.toLowerCase()}`}>
                                                                    <span className="mod-Breadcrumb-attribut--detailseite">
                                                                        {business.branches?.[0] || 'Alle'} in {business.address.city}
                                                                    </span>
                                                                </a>
                                                            </li>
                                                        )}
                                                        <li className="mod-Breadcrumb__list-item">
                                                            <a href={`/gsbiz/${id}`}>
                                                                <span className="mod-Breadcrumb-attribut--detailseite">{business.name}</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </div>

                                                <div className="mod mod-Breadcrumb mod-Breadcrumb--regio mod-Breadcrumb--detailseite :: d-block">
                                                    <ul className="mod-Breadcrumb__list">
                                                        <li className="mod-Breadcrumb__list-item">
                                                            <a href="/branchenbuch">
                                                                <span className="mod-Breadcrumb-attribut--detailseite">Deutschland</span>
                                                            </a>
                                                        </li>
                                                        {business.address.city && (
                                                            <li className="mod-Breadcrumb__list-item">
                                                                <a href={`/branchenbuch/staedte/${business.address.city.toLowerCase()}`}>
                                                                    <span className="mod-Breadcrumb-attribut--detailseite">{business.address.city}</span>
                                                                </a>
                                                            </li>
                                                        )}
                                                        {business.address.district && (
                                                            <li className="mod-Breadcrumb__list-item">
                                                                <a href={`/branchenbuch/staedte/${business.address.city.toLowerCase()}/bezirk/${business.address.district.toLowerCase()}`}>
                                                                    <span className="mod-Breadcrumb-attribut--detailseite">{business.address.city} Bezirk {business.address.district}</span>
                                                                </a>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </div>

                                                {business.categories && business.categories.length > 0 && (
                                                    <section id="branchen_und_stichworte">
                                                        <div className="mod-Branchen__linkBlock">
                                                            <input type="checkbox" name="brauchensumfang" id="brauchensumfangChb" />
                                                            <div className="mod-Branchen__title">
                                                                <label className="mod-Branchen__more" htmlFor="brauchensumfangChb">Branche</label>
                                                            </div>
                                                            <div className="mod mod-Branchen mod-Branchen__content">
                                                                {business.categories.join(', ')}
                                                            </div>
                                                        </div>
                                                    </section>
                                                )}
                                            </div>
                                        </section>

                                        <section id="banner">
                                            <div className="mod mod-Banner">
                                                <div id="rs_vs"></div>
                                            </div>
                                        </section>

                                        <div className="mod mod-Teaser">
                                            <div className="mod-Teaser__list">
                                                <a target="_blank" rel="noopener" className="mod-teaser__middle-box" href="/starteintrag" id="modTeaserMiddleBox">
                                                    <div>
                                                        <div className="gc-text--h3">Der Eintrag ist nicht aktuell?</div>
                                                        <p>Aktualisieren Sie den Eintrag auf Gelbe Seiten, um die Informationen aktuell und vollständig zu halten.</p>
                                                    </div>
                                                    <span className="gc-btn gc-btn--black gc-btn--m gc-btn--block mod-Teaser__button">Eintrag aktualisieren</span>
                                                </a>
                                                <a href="/starteintrag" target="_blank" rel="noopener">
                                                    <div>
                                                        <div className="gc-text--h3">Ihr Eintrag bei Gelbe Seiten</div>
                                                        <p>Nutzen Sie unser kostenloses Einstiegsangebot und erstellen Sie in nur wenigen Schritten einen Eintrag, um mehr Kunden erreichen.</p>
                                                    </div>
                                                    <span className="gc-btn gc-btn--black gc-btn--m gc-btn--block mod-Teaser__button">Unternehmen eintragen</span>
                                                </a>
                                            </div>
                                        </div>

                                        <div className="mod mod-FooterText">
                                            <div className="mod-FooterText__externePartner" data-hochgestellt-position="start" data-hochgestellt-content={1}>Transaktion über externe Partner</div>
                                        </div>
                                    </div>
                                    <div className="container-rightWerbesplatDetailseite"></div>
                                </div>
                            </div>
                        </div>
                    </main>

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
                                        <a href="https://bcrw.apple.com/urn:biz:bc2b4718-65b6-45de-9908-29b6225e4231?body=Hallo" className="mod-Footer__link-item" target="_blank">Gelbe Seiten für Messenger</a>
                                        <a href="/gsservice/alexaskill" className="mod-Footer__link-item" target="_self">Gelbe Seiten als Alexa Skill</a>
                                    </div>
                                    <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                                        <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-3" />
                                        <label htmlFor="gs-footer-menu-3">Unsere Partner</label>
                                        <a href="/gsservice/kooperationspartner" className="mod-Footer__link-item" target="_self">Kooperationspartner</a>
                                        <a href="https://www.dastelefonbuch.de" className="mod-Footer__link-item" target="_blank">Das Telefonbuch</a>
                                        <a href="https://www.dasoertliche.de" className="mod-Footer__link-item" target="_blank">Das Örtliche</a>
                                    </div>
                                    <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                                        <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-4" />
                                        <label htmlFor="gs-footer-menu-4">Zu finden auf</label>
                                        <a href="https://www.instagram.com/gelbe.seiten/" className="mod-Footer__link-item" target="_blank">Instagram</a>
                                        <a href="https://www.facebook.com/gelbeseiten/" className="mod-Footer__link-item" target="_self">Facebook</a>
                                        <a href="https://www.pinterest.de/gelbeseiten_de/" className="mod-Footer__link-item" target="_self">Pinterest</a>
                                        <a href="https://www.tiktok.com/@gelbeseiten" className="mod-Footer__link-item" target="_self">TikTok</a>
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
                                            <a className="mod-Footer__middlePart__downloadIcon-link" href="https://play.google.com/store/apps/details?id=de.gelbeseiten.android&hl=de&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1">
                                                <img className="mod-Footer__middlePart__downloadIcon" src="/assets/gsbiz/images/google-play-badge.png" alt="Google play badge" width={129} height={40} />
                                            </a>
                                            <a className="mod-Footer__middlePart__downloadIcon-link" href="https://itunes.apple.com/de/app/gelbe-seiten-branchenbuch/id312387605?mt=8">
                                                <img className="mod-Footer__middlePart__downloadIcon" src="/assets/gsbiz/images/app-store-badge.png" alt="App store badge" width={129} height={40} />
                                            </a>
                                        </div>
                                    </div>
                                    <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                                        <div className="mod mod-Guetesiegel-footer">
                                            <div className="mod-Guetesiegel__wrap-footer">
                                                <div className="mod-Guetesiegel__title-footer">Mehrfach ausgezeichnet</div>
                                                <div className="mod-Guetesiegel__wrap__container-footer">
                                                    <div className="mod-Guetesiegel__award-footer">
                                                        <img src="/assets/gsbiz/images/germanCustomerAward_2023.png" alt="Deutscher Kunden Award 2022/23" width={56} height={83} />
                                                    </div>
                                                    <div className="mod-Guetesiegel__award-footer">
                                                        <img src="/assets/gsbiz/images/besteOnlinePortale_2023.png" alt="Best Online Portale" width={80} height={83} />
                                                    </div>
                                                    <div className="mod-Guetesiegel__ntv-footer">
                                                        <img src="/assets/gsbiz/images/ntv_2023.png" alt="ntv_2023" width={80} height={80} />
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
                                        <a href="/#cmpscreencustom" className="mod-Footer__link-item--bottom" id="footer_datenschutzeinstellungen" target="_self">Datenschutz-Einstellungen</a>
                                        <a href="/gsservice/nutzungsbedingungen" className="mod-Footer__link-item--bottom" target="_self">AGB</a>
                                        <a href="/gsservice/inhaltmelden" className="mod-Footer__link-item--bottom" target="_self">Inhalte melden</a>
                                    </div>
                                    <div className="mod-Footer__infos col-12 col-md-6 col-lg-6 col-xl-6">
                                        <a href="/" className="mod-Footer__logo" target="_top">
                                            <img src="/assets/gsbiz/images/gelbe-seiten-logo.svg" alt="Gelbe Seiten" width={29} height={4} loading="lazy" />
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

                <div className="mod-Chat-detailseite">
                    <div className="info">
                        Chat starten
                        <div className="info-bubble" />
                    </div>
                    <div className="mod mod-Chat contains-icon-chatlight" id={`mod-Chat__button--${business.id}`} rel="noopener">
                    </div>
                </div>

                <span style={{ display: 'none' }} data-wwa-wipe-pageview-data='{"apiv":"1.4.2","bookno":"1","type":"detailseite","pagename":"detailseite","pubno":"1"}'></span>

                <div className="mod-Bewertungsfilter-mobile">
                    <div className="mod-Bewertungsfilter-mobile__container">
                        <div className="mod-Bewertungsfilter-mobile__title">
                            Filtern nach
                            <span className="mod-Bewertungsfilter-mobile__close" />
                        </div>
                        <div className="mod-Bewertungsfilter-mobile__select-group">
                            <div className="mod-Bewertungsfilter-mobile__select-group__title">Sterne</div>
                            <div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_all" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue defaultChecked />
                                    <label htmlFor="bewertungsfilter_all" className="gc-radio__label">Alle Sterne</label>
                                </div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_5stern" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue={5} />
                                    <label htmlFor="bewertungsfilter_5stern" className="gc-radio__label">5 Sterne</label>
                                </div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_4stern" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue={4} />
                                    <label htmlFor="bewertungsfilter_4stern" className="gc-radio__label">4 Sterne</label>
                                </div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_3stern" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue={3} />
                                    <label htmlFor="bewertungsfilter_3stern" className="gc-radio__label">3 Sterne</label>
                                </div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_2stern" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue={2} />
                                    <label htmlFor="bewertungsfilter_2stern" className="gc-radio__label">2 Sterne</label>
                                </div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_1stern" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue={1} />
                                    <label htmlFor="bewertungsfilter_1stern" className="gc-radio__label">1 Stern</label>
                                </div>
                            </div>
                        </div>
                        <div className="mod-Bewertungsfilter-mobile__select-group last-group">
                            <div className="mod-Bewertungsfilter-mobile__select-group__title">Datum</div>
                            <div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_newest" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue="newest" />
                                    <label htmlFor="bewertungsfilter_newest" className="gc-radio__label">Neuste</label>
                                </div>
                                <div>
                                    <input type="radio" id="bewertungsfilter_oldest" name="bewertungsfilter_mobile" className="gc-radio__input" defaultValue="oldest" />
                                    <label htmlFor="bewertungsfilter_oldest" className="gc-radio__label">Älteste</label>
                                </div>
                            </div>
                        </div>
                        <button className="mod-Bewertungsfilter-mobile__button gc-btn gc-btn--black">Filter übernehmen</button>
                    </div>
                </div>

                <div className="bewertungDetail__container">
                    <div className="bewertungDetail__head">
                        <div className="bewertungDetail__title">Bewertungen</div>
                        <div className="bewertungDetail__close">
                            <img src="/assets/gsbiz/images/ic-x.svg" alt="close_icon" />
                        </div>
                    </div>
                    <div id="bewertungDetail" />
                </div>
            </div>
        </>
    )
}
