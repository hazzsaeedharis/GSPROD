import Head from 'next/head'
import SearchForm from '@/components/SearchForm'

export default function Home() {
  return (
    <>
      <Head>
        <title>Gelbe Seiten | Das richtige Unternehmen finden</title>
        <meta property="og:title" content="Gelbe Seiten Branchenbuch - Auskunft für Telefonnummern und Adressen in Deutschland" />
        <meta name="description" content="Gelbe Seiten - Das Branchenbuch für Deutschland gibt Auskunft zu Telefonnummern, Adressen, Faxnummern und Firmen-Infos in den Einträgen der Unternehmen nach Branchen" />
        <meta property="og:description" content="Gelbe Seiten - Zu allen Unternehmen und Branchen gibt das Branchenbuch für Deutschland Auskunft über Telefonnummern, Adressen und Informationen zu den Unternehmen, zu Produkten und  Dienstleistungen" />
        <meta name="keywords" content="Gelbe Seiten, Branchenbuch, Telefon, Adressen, Unternehmen Deutschland, Firmen Deutschland, Auskunft, Gelbe Seiten Routenplaner" />
        <link rel="canonical" href="/" />
        <meta property="og:url" content="https://www.gelbeseiten.de" />
        <meta property="og:image" content="https://www.gelbeseiten.de/webgs/images/gelbeseiten_150x150.png" />
        <meta property="twitter:image" content="https://www.gelbeseiten.de/webgs/images/gelbeseiten_150x150.png" />
        <meta name="robots" content="index,follow,noarchive,noodp" />
        <meta property="og:site_name" content="Gelbe Seiten" />
        
        {/* Page CSS */}
        <link rel="stylesheet" href="/assets/css/startseite_above.456537fa54.css" />
        <link rel="stylesheet" href="/assets/css/startseite_below.456537fa54.css" />
      </Head>

      {/* Search functionality now integrated in React components */}

      <style dangerouslySetInnerHTML={{__html: "body { background: #ffdc00; }" }} />
        <input type="checkbox" name="mod-Header__menu-container__showMobileMenu" id="mod-Header__menu-container" />
        <div id="transform_wrapper">
          <div className="mod mod-UntenNachObenButton" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;click: nach oben button&quot;}">
            <div className="mod-UntenNachObenButton__icon-line" />
            <div className="mod-UntenNachObenButton__icon-array" />
          </div>
          <header className="header-sticky">
            <div className="mod mod-Header gc-header" data-module="gc-header">
              <div className="gc-header__bar">
                <div className="gc-header__line">
                  <a href="index" target="_top" className="gc-header__logo" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite TopNavigation: Klick auf GS-Logo&quot;, &quot;synchron&quot;: true}">
                    <img className="gs_svg_image no-auto" src="/assets/images/gelbe-seiten-logo.svg" width={0} height={0} alt="Gelbe Seiten Unternehmen finden" />
                  </a>
                  <div style={{display: 'flex', gap: '10px'}}>
                    <div className="gc-header__a11ymobile" tabIndex={-1} aria-label="barrierefrei">
                      <a href="gsservice/barrierefrei" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Klick auf das Barrierefreiheitsicon (Einstieg)&quot;}">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#1E1E1E" strokeWidth="1.5" />
                          <path d="M12 7.2C11.5722 7.2 11.206 7.04333 10.9014 6.73C10.5968 6.41667 10.4444 6.04 10.4444 5.6C10.4444 5.16 10.5968 4.78333 10.9014 4.47C11.206 4.15667 11.5722 4 12 4C12.4278 4 12.794 4.15667 13.0986 4.47C13.4032 4.78333 13.5556 5.16 13.5556 5.6C13.5556 6.04 13.4032 6.41667 13.0986 6.73C12.794 7.04333 12.4278 7.2 12 7.2ZM9.66667 20V9.6C8.88889 9.53333 8.09815 9.43333 7.29444 9.3C6.49074 9.16667 5.72593 9 5 8.8L5.38889 7.2C6.4 7.48 7.47593 7.68333 8.61667 7.81C9.75741 7.93667 10.8852 8 12 8C13.1148 8 14.2426 7.93667 15.3833 7.81C16.5241 7.68333 17.6 7.48 18.6111 7.2L19 8.8C18.2741 9 17.5093 9.16667 16.7056 9.3C15.9019 9.43333 15.1111 9.53333 14.3333 9.6V20H12.7778V15.2H11.2222V20H9.66667Z" fill="#1E1E1E" />
                        </svg>
                      </a>
                    </div>
                    <button className="gc-header__toggle" id="toggle-button" aria-label="Menü öffnen">
                      <svg className="gc-header__icon" width={20} height={20} viewBox="0 0 20 20">
                        <line fill="none" stroke="black" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" x1={1} y1={4} x2={19} y2={4} />
                        <line fill="none" stroke="black" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" x1={1} y1={10} x2={19} y2={10} transform />
                        <line fill="none" stroke="black" strokeWidth={1} strokeLinecap="round" strokeLinejoin="round" x1={1} y1={16} x2={19} y2={16} transform />
                      </svg>
                    </button>
                  </div>
                </div>
                <div className="gc-header__slider">
                  <nav className="gc-header__nav">
                    <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                      <button type="button" className="gc-header__link" tabIndex={-1} data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite TopNavigation: Klick auf Suchen&quot;, &quot;synchron&quot;: true}">Suchen</button>
                      <span className="gc-header__separation-line" />
                      <div className="gc-header__subfolder">
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href id="Was&WoSuche" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Was & Wo Suche&quot;, &quot;synchron&quot;: true}">Was &amp; Wo Suche</a>
                        </div>
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href="branchenbuch" id="Branchenkatalog" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Branchenkatalog&quot;, &quot;synchron&quot;: true}">Branchenkatalog</a>
                        </div>
                      </div>
                    </div>
                    <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                      <button type="button" className="gc-header__link" tabIndex={-1} data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite TopNavigation: Klick auf Service&quot;, &quot;synchron&quot;: true}">Service</button>
                      <span className="gc-header__separation-line" />
                      <div className="gc-header__subfolder gc-header__submenu" tabIndex={-1}>
                        <ul className="sub-menu">
                          <li className="sub-menu">
                            <label>FÜR SIE</label>
                            <ul>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="https://vermittlungsservice.gelbeseiten.de/" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Vermittlungsservice&quot;, &quot;synchron&quot;: true}">Vermittlungsservice</a>
                              </div>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="projektplaner/energieberatung" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Energieberatung&quot;, &quot;synchron&quot;: true}">Energieberatung</a>
                                <span className="gc-header__submenu__newItem">NEU</span>
                              </div>
                            </ul>
                          </li>
                          <li className="sub-menu">
                            <label>FÜR FIRMENINHABER</label>
                            <ul>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="starteintrag" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Neuer Firmeneintrag&quot;, &quot;synchron&quot;: true}">Neuer Firmeneintrag</a>
                              </div>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="starteintrag/findentry.0c172c85ee" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Firmeneintrag ändern&quot;, &quot;synchron&quot;: true}">Firmeneintrag ändern</a>
                              </div>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="gsservice/werbung" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Premium Eintrag sichern&quot;, &quot;synchron&quot;: true}">Premium Eintrag sichern</a>
                              </div>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="gsservice/verlage" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Ansprechpartner finden&quot;, &quot;synchron&quot;: true}">Ansprechpartner finden</a>
                              </div>
                              <div className="gc-header__item gc-header__item--childs">
                                <a href="gsservice/echtzeit" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Gelbe Seiten in Zahlen&quot;, &quot;synchron&quot;: true}">Gelbe Seiten in Zahlen</a>
                              </div>
                            </ul>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                      <button type="button" className="gc-header__link" tabIndex={-1} data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite TopNavigation: Klick auf Ratgeber&quot;, &quot;synchron&quot;: true}">Ratgeber</button>
                      <span className="gc-header__separation-line" />
                      <div className="gc-header__subfolder">
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href="ratgeber" id="RatgeberÜbersicht" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Ratgeber Übersicht&quot;, &quot;synchron&quot;: true}">Ratgeber Übersicht</a>
                        </div>
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href="ratgeber/gl" id="GesünderLeben" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Gesünder Leben&quot;, &quot;synchron&quot;: true}">Gesünder Leben</a>
                        </div>
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href="ratgeber/hg" id="Haus&Garten" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Haus & Garten&quot;, &quot;synchron&quot;: true}">Haus &amp; Garten</a>
                        </div>
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href="ratgeber/rf" id="Recht&Finanzen" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Recht & Finanzen&quot;, &quot;synchron&quot;: true}">Recht &amp; Finanzen</a>
                        </div>
                        <div className="gc-header__item" tabIndex={-1}>
                          <a href="gsservice/machergeschichten" id="Machergeschichten" className="gc-header__link" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;startseiteTopNavigation: Klick auf Machergeschichten&quot;, &quot;synchron&quot;: true}">Machergeschichten</a>
                        </div>
                      </div>
                    </div>
                    <div className="gc-header__item gc-header__item--childs" tabIndex={-1}>
                      <span className="gc-header__separation-line" />
                      <div className="gc-header__item gc-header__button-container">
                        <a href="starteintrag" className="gc-btn gc-btn--black header-btn" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite TopNavigation: Klick auf Firma eintragen&quot;, &quot;synchron&quot;: true}">Firma eintragen</a>
                      </div>
                    </div>
                    <div className="gc-header__item gc-header__button-container gc-header__a11y" tabIndex={-1} aria-label="barrierefrei">
                      <a href="gsservice/barrierefrei" className="gc-header__link" id="a11ylink" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Klick auf das Barrierefreiheitsicon (Einstieg)&quot;}">
                        <svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#1E1E1E" strokeWidth="1.5" />
                          <path d="M12 7.2C11.5722 7.2 11.206 7.04333 10.9014 6.73C10.5968 6.41667 10.4444 6.04 10.4444 5.6C10.4444 5.16 10.5968 4.78333 10.9014 4.47C11.206 4.15667 11.5722 4 12 4C12.4278 4 12.794 4.15667 13.0986 4.47C13.4032 4.78333 13.5556 5.16 13.5556 5.6C13.5556 6.04 13.4032 6.41667 13.0986 6.73C12.794 7.04333 12.4278 7.2 12 7.2ZM9.66667 20V9.6C8.88889 9.53333 8.09815 9.43333 7.29444 9.3C6.49074 9.16667 5.72593 9 5 8.8L5.38889 7.2C6.4 7.48 7.47593 7.68333 8.61667 7.81C9.75741 7.93667 10.8852 8 12 8C13.1148 8 14.2426 7.93667 15.3833 7.81C16.5241 7.68333 17.6 7.48 18.6111 7.2L19 8.8C18.2741 9 17.5093 9.16667 16.7056 9.3C15.9019 9.43333 15.1111 9.53333 14.3333 9.6V20H12.7778V15.2H11.2222V20H9.66667Z" fill="#1E1E1E" />
                        </svg>
                      </a>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </header>
          <section className="frontpagecover-section">
            <div className="mod mod-Frontpagecover container-wrapper">
              <div className="container--flexbox container" style={{display: 'block'}}>
                <div className="frontpage__cover-search">
                  <div className="gc-float-searchbox">
                    <div className="mod mod-GsSearchblock gs-searchblock">
                      <h1 className="gc-text gc-text--startseite-h1">Dienstleister schneller finden</h1>
                      <SearchForm />
                    </div>
                  </div>
                </div>
                <div className="mod mod-Guetesiegel" id="guetesiegelContainer">
                  <div className="mod-Guetesiegel__wrap">
                    <div className="mod-Guetesiegel__wrap__container">
                      <div className="mod-Guetesiegel__title">
                        Mehrfach
                        <span className="mod-Guetesiegel__title-bold">
                          ausgezeichnet
                        </span>
                      </div>
                      <div className="mod-Guetesiegel__award">
                        <img src="/assets/images/awards/germanCustomerAward_2023.png" alt="Deutscher Kunden Award 2022/23" width={38} height={56} data-wipe="{&quot;listener&quot;: &quot;mouseover&quot;, &quot;name&quot;: &quot;Mouseover: Deutscher Kunden Award 2022/23&quot;}" />
                      </div>
                      <div className="mod-Guetesiegel__award">
                        <img src="/assets/images/besteOnlinePortale/besteOnlinePortale_2023.png" alt="Best Online Portale" width={38} height={56} data-wipe="{&quot;listener&quot;: &quot;mouseover&quot;, &quot;name&quot;: &quot;Mouseover: Best Online-Portale&quot;}" />
                      </div>
                      <div className="mod-Guetesiegel__ntv">
                        <img src="/assets/images/ntv-preis/ntv_2023.png" alt="ntv_2023" width={56} height={56} data-wipe="{&quot;listener&quot;: &quot;mouseover&quot;, &quot;name&quot;: &quot;Mouseover: ntv&quot;}" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="mod mod-Suchanimation">
            <div id="suchanimation" className="mod-Suchanimation__balken">
            </div>
          </div>
          <main className="container-wrapper" style={{display: 'block'}}>
            <div className="container--flexbox">
              <div className="container container--relative">
                <div className="mod-TeaserBoxen">
                  <h2 className="mod-TeaserBoxen__title gc-text--startseite-h2">Unsere Top-Angebote</h2>
                  <div className="startseite__wrapper">
                    <h3 className="mod-TeaserBoxen__subTitle gc-text--startseite-h3">Vorteile für Sie</h3>
                    <div className="startseite__wrapper__container">
                      <div className="mod-TeaserBoxen__item">
                        <a className="mod-TeaserBoxen__item__block" href="https://vermittlungsservice.gelbeseiten.de/" target="_blank" rel="noopener" data-wipe="{&quot;listener&quot;:&quot;click&quot;,&quot;name&quot;:&quot;Startseite-Teaser: Angebot&quot;}">
                          <div className="mod-TeaserBoxen__item__img">
                            <img src="/assets/icons/ic_angebote.svg" alt="angebote_icon" />
                          </div>
                          <div>
                            <div className="mod-TeaserBoxen__item__headline">
                              Angebote direkt einholen&nbsp;&nbsp;&gt;
                            </div>
                            <div className="mod-TeaserBoxen__item__text">
                              Wir helfen Ihnen passende Dienstleister zu finden und schnell Angebote zu erhalten.
                            </div>
                          </div>
                        </a>
                        <a className="mod-TeaserBoxen__item__block" href="gsservice/alexaskill" target="_blank" rel="noopener" data-wipe="{&quot;listener&quot;:&quot;click&quot;,&quot;name&quot;:&quot;Startseite-Teaser: Alexa&quot;}">
                          <div className="mod-TeaserBoxen__item__img">
                            <img src="/assets/icons/ic_sprachsteuerung.svg" alt="sprachsteuerung_icon" />
                          </div>
                          <div>
                            <div className="mod-TeaserBoxen__item__headline">
                              Sprachsteuerung mit Alexa&nbsp;&nbsp;&gt;
                            </div>
                            <div className="mod-TeaserBoxen__item__text">
                              Suchen wird jetzt noch einfacher. Aktivieren Sie jetzt das neue Alexa Skill von Gelbe Seiten.
                            </div>
                          </div>
                        </a>
                        <a className="mod-TeaserBoxen__item__block" href="gsservice/mobil" target="_blank" rel="noopener" data-wipe="{&quot;listener&quot;:&quot;click&quot;,&quot;name&quot;:&quot;Startseite-Teaser: Apple Messages&quot;}">
                          <div className="mod-TeaserBoxen__item__img">
                            <img src="/assets/icons/ic_applemessages.svg" alt="applemessages_icon" />
                          </div>
                          <div>
                            <div className="mod-TeaserBoxen__item__headline">
                              Finden mit Apple Messages&nbsp;&nbsp;&gt;
                            </div>
                            <div className="mod-TeaserBoxen__item__text">
                              Mit der eigenen Nachrichten-App Unternehmen bei Gelbe Seiten finden.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3">Vorteile für Firmen</h3>
                    <div className="startseite__wrapper__container">
                      <div className="mod-TeaserBoxen__item">
                        <a className="mod-TeaserBoxen__item__block" href="starteintrag" target="_blank" rel="noopener" data-wipe="{&quot;listener&quot;:&quot;click&quot;,&quot;name&quot;:&quot;Startseite-Teaser: Firmeneintrag erstellen&quot;}">
                          <div className="mod-TeaserBoxen__item__img">
                            <img src="/assets/icons/ic_firmeneintrag.svg" alt="firmeneintrag_icon" />
                          </div>
                          <div>
                            <div className="mod-TeaserBoxen__item__headline">
                              Firmeneintrag erstellen&nbsp;&nbsp;&gt;
                            </div>
                            <div className="mod-TeaserBoxen__item__text">
                              Steigern Sie Ihre Sichtbarkeit und registrieren Sie jetzt kostenlos Ihr Unternehmen.
                            </div>
                          </div>
                        </a>
                        <a className="mod-TeaserBoxen__item__block" href="gsservice/terminwunsch" target="_blank" rel="noopener" data-wipe="{&quot;listener&quot;:&quot;click&quot;,&quot;name&quot;:&quot;Startseite-Teaser: Termin-Buchungstool&quot;}">
                          <div className="mod-TeaserBoxen__item__img">
                            <img src="/assets/icons/ic_termin.svg" alt="termin_icon" />
                          </div>
                          <div>
                            <div className="mod-TeaserBoxen__item__headline">
                              Termin-Buchungstool&nbsp;&nbsp;&gt;
                            </div>
                            <div className="mod-TeaserBoxen__item__text">
                              Bestätigen Sie Terminanfragen online und nutzen Sie die automatisierte Terminvergabe.
                            </div>
                          </div>
                        </a>
                        <a className="mod-TeaserBoxen__item__block" href="gsservice/werbung" target="_blank" rel="noopener" data-wipe="{&quot;listener&quot;:&quot;click&quot;,&quot;name&quot;:&quot;Startseite-Teaser: Werbung&quot;}">
                          <div className="mod-TeaserBoxen__item__img">
                            <img src="/assets/icons/ic_werbung.svg" alt="werbung_icon" />
                          </div>
                          <div>
                            <div className="mod-TeaserBoxen__item__headline">
                              Werbung&nbsp;&nbsp;&gt;
                            </div>
                            <div className="mod-TeaserBoxen__item__text">
                              Finden Sie passende Online Werbelösungen für Ihr Unternehmen.
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <section>
                  <h2 className="mod-bildTextTeaser__title gc-text--startseite-h2">Gelbe Seiten im Fokus</h2>
                  <div className="startseite__wrapper">
                    <h3 className="mod-bildTextTeaser__subTitle gc-text--startseite-h3">Aktuelles aus erster Hand</h3>
                    <div className="startseite__wrapper__container container--flexbox">
                      <a href="ratgeber/hg/garten-im-mai-diese-gartenarbeiten-liegen-im-wonnemonat-an" data-wipe-realview="Startseite: Konfigurierbarer Teaser - Ratgeber" target="_blank" rel="noopener" className="mod-bildTextTeaser__imageContainer" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite: Konfigurierbarer Teaser - Ratgeber&quot;, &quot;synchron&quot;: true}">
                        <div className="mod-bildTextTeaser__image">
                          <img loading="lazy" decoding="async" alt="" width={0} height={0} src="https://dekpuvkwdajkn.cloudfront.net/eyJidWNrZXQiOiJnYy1jcmVlbXMtbWVkaWEiLCJrZXkiOiI2ODJjMjk5N2YzMTI0OC40NzA5NjM1Ny5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMCwiaGVpZ2h0IjozMDAsImNyb3AiOnsieCI6ImNlbnRlciIsInkiOiJjZW50ZXIifX19fQ==" />
                        </div>
                        <div className="mod-bildTextTeaser__textContainer">
                          <p className="mod-bildTextTeaser__textContainer__header">Ratgeber</p>
                          <div className="mod-bildTextTeaser__textContainer__title">Garten im Mai: Diese Gartenarbeiten liegen im Wonnemonat an</div>
                          <p className="mod-bildTextTeaser__textContainer__text">Häufig sieht der Garten im Mai schon richtig toll aus: Frühlingsblumen locken Bienen und Schmetterlinge an, und alles grünt und wächst. Jetzt sollten Sie auch die Ärmel hochkrempeln und sich an die Gartenarbeit machen, denn im Wonnemonat liegt so einiges an.</p>
                          <div className="mod-bildTextTeaser__more">Mehr erfahren</div>
                        </div>
                      </a>
                      <a href="ratgeber/gl/corona-erkaeltung-oder-grippe-unterschiede-kennen-symptome-richtig-deuten" data-wipe-realview="Startseite: Konfigurierbarer Teaser - Ratgeber" target="_blank" rel="noopener" className="mod-bildTextTeaser__imageContainer" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite: Konfigurierbarer Teaser - Ratgeber&quot;, &quot;synchron&quot;: true}">
                        <div className="mod-bildTextTeaser__image">
                          <img loading="lazy" decoding="async" alt="" width={0} height={0} src="https://dekpuvkwdajkn.cloudfront.net/eyJidWNrZXQiOiJnYy1jcmVlbXMtbWVkaWEiLCJrZXkiOiI2NTY0NDY5ZTM1YzIzMS44Nzg2NzgyMS5qcGciLCJlZGl0cyI6eyJyZXNpemUiOnsid2lkdGgiOjUwMCwiaGVpZ2h0IjozMDAsImNyb3AiOnsieCI6ImNlbnRlciIsInkiOiJjZW50ZXIifX19fQ==" />
                        </div>
                        <div className="mod-bildTextTeaser__textContainer">
                          <p className="mod-bildTextTeaser__textContainer__header">Ratgeber</p>
                          <div className="mod-bildTextTeaser__textContainer__title">Erkältung, Grippe, Corona? Symptome richtig deuten</div>
                          <p className="mod-bildTextTeaser__textContainer__text">„Bin ich nur erkältet, habe ich eine Grippe oder sogar Corona?“ Diese Frage lässt sich ohne ärztliche Untersuchung meist nicht hundertprozentig beantworten. Dennoch gibt es Symptome, in denen sich die Erkrankungen unterscheiden. Unser Ratgeber gibt Ihnen einen Überblick.</p>
                          <div className="mod-bildTextTeaser__more">Jetzt informieren</div>
                        </div>
                      </a>
                      <a href="branchenbuch/branche/heizung_&_sanitär" data-wipe-realview="Startseite: Konfigurierbarer Teaser - Häufig gesucht" target="_blank" rel="noopener" className="mod-bildTextTeaser__imageContainer" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite: Konfigurierbarer Teaser - Häufig gesucht&quot;, &quot;synchron&quot;: true}">
                        <div className="mod-bildTextTeaser__image">
                          <img loading="lazy" decoding="async" alt="" width={0} height={0} src="https://dekpuvkwdajkn.cloudfront.net/eyJidWNrZXQiOiJnYy1jcmVlbXMtbWVkaWEiLCJrZXkiOiI2ODJjNjBiN2NjMjgxMC45ODg3MjMwMS53ZWJwIiwiZWRpdHMiOnsicmVzaXplIjp7IndpZHRoIjo1MDAsImhlaWdodCI6MzAwLCJjcm9wIjp7IngiOiJjZW50ZXIiLCJ5IjoiY2VudGVyIn19fX0=" />
                        </div>
                        <div className="mod-bildTextTeaser__textContainer">
                          <p className="mod-bildTextTeaser__textContainer__header">Häufig gesucht</p>
                          <div className="mod-bildTextTeaser__textContainer__title">Profis für Heizungsbau</div>
                          <p className="mod-bildTextTeaser__textContainer__text">Eine defekte Heizung im Winter ist nicht nur unangenehm, sondern kann auch erhebliche Schäden in Ihrem Zuhause zur Folge haben. Schnelles Handeln ist jetzt entscheidend, um eine Schimmelbildung und Frostschäden an den Rohren zu vermeiden. Ein Profi für Heizungsbau hilft Ihnen dabei.</p>
                          <div className="mod-bildTextTeaser__more">Profi finden</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </section>
                <section className="mod mod-TopbranchenVerlinkungen">
                  <h2 className="gc-text gc-text--startseite-h2">Top-Branchen finden</h2>
                  <div className="startseite__wrapper">
                    <h3 className="mod-TeaserBoxen__subTitle gc-text--startseite-h3">Gesundheitswesen</h3>
                    <div className="startseite__wrapper__container">
                      <a className="mod-TopbranchenVerlinkungen__item" href="branchenbuch/branche/arzt">Ärzte
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item" href="branchenbuch/branche/zahnarzt">Zahnärzte
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item" href="branchenbuch/branche/physiotherapie">Physiotherapie
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item" href="branchenbuch/branche/logopädie">Logopädie
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3">Beratungsdienstleistungen</h3>
                    <div className="startseite__wrapper__container">
                      <a className="mod-TopbranchenVerlinkungen__item" href="branchenbuch/branche/rechtsanwalt">Rechtsanwälte
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item" href="branchenbuch/branche/steuerberater">Steuerberatung
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/bestatter">Bestattungen
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3 d-none">Handwerksbetriebe</h3>
                    <div className="startseite__wrapper__container d-none">
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/elektroinstallation">Elektroinstallationen
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/sanitärinstallation">Sanitärinstallationen
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/heizung_&_sanitär">Heizungs- und Lüftungsbau
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/maler">Malerbetriebe
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/dachdecker">Dachdeckereien
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/rohrreinigung">Rohrreinigung
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/schreiner">Tischlereien
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/fenster">Fenster
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/kanalreinigung">Kanalreinigung
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3 d-none">Immobilien und Bauwesen</h3>
                    <div className="startseite__wrapper__container d-none">
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/bauunternehmen">Bauunternehmen
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/immobilien">Immobilien
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3 d-none">Garten- und Landschaftsbau</h3>
                    <div className="startseite__wrapper__container d-none">
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/gartenbau_&_landschaftsbau">Garten- und
                        Landschaftsbau
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3 d-none">Gebäudemanagement</h3>
                    <div className="startseite__wrapper__container d-none">
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/gebäudereinigung">Gebäudereinigung
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <h3 className="mod-TeaserBoxen__subTitle mod-TeaserBoxen__subTitle2 gc-text--startseite-h3 d-none">Spezialdienstleistungen</h3>
                    <div className="startseite__wrapper__container d-none">
                      <a className="mod-TopbranchenVerlinkungen__item d-none" href="branchenbuch/branche/kammerjäger">Schädlingsbekämpfung
                        <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                      </a>
                    </div>
                    <div className="mod-TopbranchenVerlinkungen__shadow" />
                    <div className="startseite__mehranzeigen">Mehr anzeigen
                      <span className="startseite__mehranzeigen__array--down" />
                    </div>
                    <div className="startseite__minimieren d-none">Minimieren
                      <span className="startseite__mehranzeigen__array--up" />
                    </div>
                  </div>
                </section>
                <section>
                  <div className="mod mod-Staedteteaser">
                    <h2 className="gc-text--startseite-h2">Deutschland entdecken mit Gelbe Seiten</h2>
                    <div className="startseite__wrapper">
                      <h3 className="mod-TeaserBoxen__subTitle gc-text--startseite-h3">Ihr Reiseführer für Deutschland</h3>
                      <div className="startseite__wrapper__container container--flexbox">
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/bayern/kreisfrei/augsburg" title="Augsburg" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Augsburg_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Augsburg" width={0} height={0} src="/assets/images/staedteteaser/large/augsburg.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Bayern</div>
                              <div className="mod-Boxteaser__content__title">Augsburg&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">289.584 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/berlin/berlin/berlin" title="Berlin" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Berlin_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Berlin" width={0} height={0} src="/assets/images/staedteteaser/large/berlin.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Berlin</div>
                              <div className="mod-Boxteaser__content__title">Berlin&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">3.520.031 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/bremen/kreisfrei/bremen" title="Bremen" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Bremen_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Bremen" width={0} height={0} src="/assets/images/staedteteaser/large/bremen.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Bremen</div>
                              <div className="mod-Boxteaser__content__title">Bremen&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">565.719 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/sachsen/kreisfrei/chemnitz_sachsen" title="Chemnitz" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Chemnitz_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Chemnitz" width={0} height={0} src="/assets/images/staedteteaser/large/chemnitz.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Sachsen</div>
                              <div className="mod-Boxteaser__content__title">Chemnitz&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">246.353 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/nordrhein-westfalen/kreisfrei/dortmund" title="Dortmund" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Dortmund_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Dortmund" width={0} height={0} src="/assets/images/staedteteaser/large/dortmund.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Nordrhein-Westfalen</div>
                              <div className="mod-Boxteaser__content__title">Dortmund&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">585.813 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/sachsen/kreisfrei/dresden" title="Dresden" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Dresden_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Dresden" width={0} height={0} src="/assets/images/staedteteaser/large/dresden.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Sachsen</div>
                              <div className="mod-Boxteaser__content__title">Dresden&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">547.172 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/nordrhein-westfalen/kreisfrei/duisburg" title="Duisburg" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Duisburg_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Duisburg" width={0} height={0} src="/assets/images/staedteteaser/large/duisburg.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Nordrhein-Westfalen</div>
                              <div className="mod-Boxteaser__content__title">Duisburg&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">499.845 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/nordrhein-westfalen/kreisfrei/düsseldorf" title="Düsseldorf" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Düsseldorf_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Düsseldorf" width={0} height={0} src="/assets/images/staedteteaser/large/duesseldorf.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Nordrhein-Westfalen</div>
                              <div className="mod-Boxteaser__content__title">Düsseldorf&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">613.230 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/nordrhein-westfalen/kreisfrei/essen" title="Essen" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Essen_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Essen" width={0} height={0} src="/assets/images/staedteteaser/large/essen.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Nordrhein-Westfalen</div>
                              <div className="mod-Boxteaser__content__title">Essen&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">583.084 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/hessen/kreisfrei/frankfurt_am_main" title="Frankfurt am Main" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Frankfurt am Main_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Frankfurt am Main" width={0} height={0} src="/assets/images/staedteteaser/large/frankfurt.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Hessen</div>
                              <div className="mod-Boxteaser__content__title">Frankfurt am Main&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">736.414 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/hamburg/hamburg/hamburg" title="Hamburg" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Hamburg_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Hamburg" width={0} height={0} src="/assets/images/staedteteaser/large/hamburg.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Hamburg</div>
                              <div className="mod-Boxteaser__content__title">Hamburg&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">1.810.438 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/niedersachsen/region-hannover/hannover" title="Hannover" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Hannover_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Hannover" width={0} height={0} src="/assets/images/staedteteaser/large/hannover.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Niedersachsen</div>
                              <div className="mod-Boxteaser__content__title">Hannover&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">532.864 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/schleswig-holstein/kreisfrei/kiel" title="Kiel" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Kiel_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Kiel" width={0} height={0} src="/assets/images/staedteteaser/large/kiel.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Schleswig-Holstein</div>
                              <div className="mod-Boxteaser__content__title">Kiel&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">247.441 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/nordrhein-westfalen/kreisfrei/köln" title="Köln" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Köln_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Köln" width={0} height={0} src="/assets/images/staedteteaser/large/koeln.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Nordrhein-Westfalen</div>
                              <div className="mod-Boxteaser__content__title">Köln&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">1.060.582 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/sachsen/kreisfrei/leipzig" title="Leipzig" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Leipzig_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Leipzig" width={0} height={0} src="/assets/images/staedteteaser/large/leipzig.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Sachsen</div>
                              <div className="mod-Boxteaser__content__title">Leipzig&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">571.088 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/baden-württemberg/kreisfrei/mannheim" title="Mannheim" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Mannheim_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Mannheim" width={0} height={0} src="/assets/images/staedteteaser/large/mannheim.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Baden-Württemberg</div>
                              <div className="mod-Boxteaser__content__title">Mannheim&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">304.781 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/bayern/kreisfrei/münchen" title="München" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_München_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="München" width={0} height={0} src="/assets/images/staedteteaser/large/muenchen.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Bayern</div>
                              <div className="mod-Boxteaser__content__title">München&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">1.464.301 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/bayern/kreisfrei/nürnberg" title="Nürnberg" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Nürnberg_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Nürnberg" width={0} height={0} src="/assets/images/staedteteaser/large/nuernberg.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Bayern</div>
                              <div className="mod-Boxteaser__content__title">Nürnberg&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">511.628 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/baden-württemberg/kreisfrei/stuttgart" title="Stuttgart" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Stuttgart_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Stuttgart" width={0} height={0} src="/assets/images/staedteteaser/large/stuttgart.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Baden-Württemberg</div>
                              <div className="mod-Boxteaser__content__title">Stuttgart&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">628.032 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch/staedte/nordrhein-westfalen/kreisfrei/wuppertal" title="Wuppertal" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Wuppertal_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Wuppertal" width={0} height={0} src="/assets/images/staedteteaser/large/wuppertal.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Nordrhein-Westfalen</div>
                              <div className="mod-Boxteaser__content__title">Wuppertal&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">352.390 Einwohner</div>
                            </div>
                          </a>
                        </div>
                        <div className="mod mod-Boxteaser">
                          <a href="branchenbuch" title="Alle Städte im Stadtportal erkunden" data-wipe="{&quot;listener&quot;: &quot;click&quot;,&quot;name&quot;:&quot;startseite_branchkachel_Alle Städte im Stadtportal erkunden_klick&quot;}">
                            <div className="mod-Boxteaser__image">
                              <img loading="lazy" decoding="async" alt="Alle Städte im Stadtportal erkunden" width={0} height={0} src="/assets/images/staedteteaser/large/deutschland.456537fa54.jpg" />
                            </div>
                            <div className="mod-Boxteaser__content">
                              <div className="mod-Boxteaser__content__caption">Deutschland</div>
                              <div className="mod-Boxteaser__content__title">Alle Städte im Stadtportal erkunden&nbsp;&nbsp;&gt;</div>
                              <div className="mod-Boxteaser__content__footer">82.792.351 Einwohner</div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="startseite__mehranzeigen">Mehr anzeigen
                        <span className="startseite__mehranzeigen__array--down" />
                      </div>
                    </div>
                  </div>
                </section>
              </div>
              <div className="mod mod-RechteWerbespalteStartseite">
                <div className="mod-RechteWerbespalteStartseite__wrapper">
                  <div id="dtm_sky" />
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
                    <label htmlFor="gs-footer-menu-1" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite Footer-Navigation: Klick auf Dialog & Hilfe&quot;, &quot;synchron&quot;: true}">Dialog &amp; Hilfe</label>
                    <a href="gsservice/verlage" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Ansprechpartner&quot;, &quot;synchron&quot;: true}" target="_self">Ansprechpartner</a><a href="gsservice/faq" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Häufige Fragen&quot;, &quot;synchron&quot;: true}" target="_self">Häufige Fragen</a><a href="branchenbuch" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Übersicht aller Städte&quot;, &quot;synchron&quot;: true}" target="_self">Übersicht aller Städte</a>
                  </div>
                  <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                    <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-2" />
                    <label htmlFor="gs-footer-menu-2" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite Footer-Navigation: Klick auf Über Gelbe Seiten&quot;, &quot;synchron&quot;: true}">Über Gelbe Seiten</label>
                    <a href="gsservice/newsroom" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Newsroom&quot;, &quot;synchron&quot;: true}" target="_self">Newsroom</a><a href="gsservice/mobil" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Gelbe Seiten als App&quot;, &quot;synchron&quot;: true}" target="_self">Gelbe Seiten als App</a><a href="https://bcrw.apple.com/urn:biz:bc2b4718-65b6-45de-9908-29b6225e4231?body=Hallo" className="mod-Footer__link-item" target="_blank">Gelbe Seiten für Messenger</a><a href="gsservice/alexaskill" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Gelbe Seiten als Alexa Skill&quot;, &quot;synchron&quot;: true}" target="_self">Gelbe Seiten als Alexa Skill</a>
                  </div>
                  <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                    <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-3" />
                    <label htmlFor="gs-footer-menu-3" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite Footer-Navigation: Klick auf Unsere Partner&quot;, &quot;synchron&quot;: true}">Unsere Partner</label>
                    <a href="gsservice/kooperationspartner" className="mod-Footer__link-item" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Kooperationspartner&quot;, &quot;synchron&quot;: true}" target="_self">Kooperationspartner</a><a href="https://www.dastelefonbuch.de/" className="mod-Footer__link-item" target="_blank">Das Telefonbuch</a><a href="https://www.dasoertliche.de/" className="mod-Footer__link-item" target="_blank">Das Örtliche</a>
                  </div>
                  <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
                    <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-4" />
                    <label htmlFor="gs-footer-menu-4" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite Footer-Navigation: Klick auf Zu finden auf&quot;, &quot;synchron&quot;: true}">Zu finden auf</label>
                    <a href="https://www.instagram.com/gelbe.seiten/" className="mod-Footer__link-item" target="_blank">Instagram</a><a href="https://www.facebook.com/gelbeseiten/" className="mod-Footer__link-item" target="_self">Facebook</a><a href="https://www.pinterest.de/gelbeseiten_de/" className="mod-Footer__link-item" target="_self">Pinterest</a><a href="https://www.tiktok.com/@gelbeseiten" className="mod-Footer__link-item" target="_self">TikTok</a>
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
                      <a className="mod-Footer__middlePart__downloadIcon-link" href="https://play.google.com/store/apps/details?id=de.gelbeseiten.android&hl=de&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Click: Google play badge&quot;}">
                        <img className="mod-Footer__middlePart__downloadIcon" src="/assets/images/google-play-badge.png" alt="Google play badge" width={129} height={40} />
                      </a>
                      <a className="mod-Footer__middlePart__downloadIcon-link" href="https://itunes.apple.com/de/app/gelbe-seiten-branchenbuch/id312387605?mt=8" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Click: App store badge&quot;}">
                        <img className="mod-Footer__middlePart__downloadIcon" src="/assets/images/app-store-badge.png" alt="App store badge" width={129} height={40} />
                      </a>
                    </div>
                  </div>
                  <div className="col-12 col-md-6 col-lg-6 col-xl-6">
                    <div className="mod mod-Guetesiegel-footer">
                      <div className="mod-Guetesiegel__wrap-footer">
                        <div className="mod-Guetesiegel__title-footer">
                          Mehrfach ausgezeichnet
                        </div>
                        <div className="mod-Guetesiegel__wrap__container-footer">
                          <div className="mod-Guetesiegel__award-footer">
                            <img src="/assets/images/awards/germanCustomerAward_2023.png" alt="Deutscher Kunden Award 2022/23" width={56} height={83} data-wipe="{&quot;listener&quot;: &quot;mouseover&quot;, &quot;name&quot;: &quot;Mouseover: Deutscher Kunden Award 2022/23&quot;}" />
                          </div>
                          <div className="mod-Guetesiegel__award-footer">
                            <img src="/assets/images/besteOnlinePortale/besteOnlinePortale_2023.png" alt="Best Online Portale" width={56} height={83} data-wipe="{&quot;listener&quot;: &quot;mouseover&quot;, &quot;name&quot;: &quot;Mouseover: Best Online-Portale&quot;}" />
                          </div>
                          <div className="mod-Guetesiegel__ntv-footer">
                            <img src="/assets/images/ntv-preis/ntv_2023.png" alt="ntv_2023" width={80} height={80} data-wipe="{&quot;listener&quot;: &quot;mouseover&quot;, &quot;name&quot;: &quot;Mouseover: ntv&quot;}" />
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
                    <a href="gsservice/impressum" className="mod-Footer__link-item--bottom" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Impressum&quot;, &quot;synchron&quot;: true}" target="_self">Impressum</a><a href="gsservice/datenschutz" className="mod-Footer__link-item--bottom" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Datenschutzerklärung&quot;, &quot;synchron&quot;: true}" target="_self">Datenschutzerklärung</a><a href="index#cmpscreencustom" className="mod-Footer__link-item--bottom" id="footer_datenschutzeinstellungen" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf Datenschutz-Einstellungen&quot;, &quot;synchron&quot;: true}" target="_self">Datenschutz-Einstellungen</a><a href="gsservice/nutzungsbedingungen" className="mod-Footer__link-item--bottom" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;StartseiteFooter-Navigation: Klick auf AGB&quot;, &quot;synchron&quot;: true}" target="_self">AGB</a>
                  </div>
                  <div className="mod-Footer__infos col-12 col-md-6 col-lg-6 col-xl-6">
                    <a href="index" className="mod-Footer__logo" target="_top" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite: Klick auf Footerlogo&quot;, &quot;synchron&quot;: true}">
                      <img src="/assets/images/gelbe-seiten-logo.svg" alt="Gelbe Seiten" width={29} height={4} loading="lazy" />
                    </a>
                    <a href="gsservice/verlage" target="_blank" rel="noopener" className="mod-Footer__verlagslink" data-wipe="{&quot;listener&quot;: &quot;click&quot;, &quot;name&quot;: &quot;Startseite: Klick auf Gelbeseitenverlage&quot;, &quot;synchron&quot;: true}">Ein Service Ihrer <div className="nobr">Gelbe Seiten Verlage</div></a>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          <span style={{display: 'none'}} data-wwa-wipe-pageview-data="{&quot;apiv&quot;:&quot;1.4.2&quot;,&quot;webv&quot;:&quot;1762982551630&quot;,&quot;type&quot;:&quot;Startseite&quot;,&quot;pageName&quot;:&quot;Startseite&quot;}">
          </span>
          <img className="cmplazyload" alt="" data-cmp-vendor="s7" height={1} width={1} style={{display: 'none'}} data-cmp-src="https://www.facebook.com/tr?id=1623159434614090&ev=PageView" />
          <img className="cmplazyload" alt="" data-cmp-vendor="s7" height={1} width={1} style={{display: 'none'}} data-cmp-src="https://www.facebook.com/tr?id=302897147181033&ev=PageView" />
        </div>
    </>
  )
}
