import React from 'react'

export default function Header() {
  return (
    <header className="header-sticky">
      <div className="mod mod-Header gc-header" data-module="gc-header">
        <div className="gc-header__bar">
          <div className="gc-header__line">
            <a href="/" target="_top" className="gc-header__logo">
              <img 
                className="gs_svg_image no-auto" 
                src="/assets/images/gelbe-seiten-logo.svg" 
                width={0} 
                height={0} 
                alt="Gelbe Seiten Unternehmen finden" 
              />
            </a>
            <div style={{ display: 'flex', gap: '10px' }}>
              {/* Accessibility Icon */}
              <div className="gc-header__a11ymobile" tabIndex={-1} aria-label="barrierefrei">
                <a href="/gsservice/barrierefrei" className="gc-header__link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#1E1E1E" strokeWidth="1.5"/>
                    <path d="M12 7.2C11.5722 7.2 11.206 7.04333 10.9014 6.73C10.5968 6.41667 10.4444 6.04 10.4444 5.6C10.4444 5.16 10.5968 4.78333 10.9014 4.47C11.206 4.15667 11.5722 4 12 4C12.4278 4 12.794 4.15667 13.0986 4.47C13.4032 4.78333 13.5556 5.16 13.5556 5.6C13.5556 6.04 13.4032 6.41667 13.0986 6.73C12.794 7.04333 12.4278 7.2 12 7.2ZM9.66667 20V9.6C8.88889 9.53333 8.09815 9.43333 7.29444 9.3C6.49074 9.16667 5.72593 9 5 8.8L5.38889 7.2C6.4 7.48 7.47593 7.68333 8.61667 7.81C9.75741 7.93667 10.8852 8 12 8C13.1148 8 14.2426 7.93667 15.3833 7.81C16.5241 7.68333 17.6 7.48 18.6111 7.2L19 8.8C18.2741 9 17.5093 9.16667 16.7056 9.3C15.9019 9.43333 15.1111 9.53333 14.3333 9.6V20H12.7778V15.2H11.2222V20H9.66667Z" fill="#1E1E1E"/>
                  </svg>
                </a>
              </div>
              
              {/* Menu Toggle */}
              <button className="gc-header__toggle" id="toggle-button" aria-label="Menü öffnen">
                <svg className="gc-header__icon" width="20" height="20" viewBox="0 0 20 20">
                  <line fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="1" y1="4" x2="19" y2="4" />
                  <line fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="1" y1="10" x2="19" y2="10" />
                  <line fill="none" stroke="black" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" x1="1" y1="16" x2="19" y2="16" />
                </svg>
              </button>
            </div>
          </div>
          
          {/* Navigation Slider */}
          <div className="gc-header__slider">
            <nav className="gc-header__nav">
              
              {/* Suchen Menu */}
              <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                <button type="button" className="gc-header__link" tabIndex={-1}>Suchen</button>
                <span className="gc-header__separation-line"></span>
                <div className="gc-header__subfolder">
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/" id="WasWoSuche" className="gc-header__link">Was &amp; Wo Suche</a>
                  </div>
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/branchenbuch" id="Branchenkatalog" className="gc-header__link">Branchenkatalog</a>
                  </div>
                </div>
              </div>
              
              {/* Service Menu */}
              <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                <button type="button" className="gc-header__link" tabIndex={-1}>Service</button>
                <span className="gc-header__separation-line"></span>
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
                          <a href="/starteintrag/findentry" className="gc-header__link">Firmeneintrag ändern</a>
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
              
              {/* Ratgeber Menu */}
              <div className="gc-header__item gc-header__item--childs" tabIndex={0}>
                <button type="button" className="gc-header__link" tabIndex={-1}>Ratgeber</button>
                <span className="gc-header__separation-line"></span>
                <div className="gc-header__subfolder">
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/ratgeber" id="RatgeberÜbersicht" className="gc-header__link">Ratgeber Übersicht</a>
                  </div>
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/ratgeber/gl" id="GesünderLeben" className="gc-header__link">Gesünder Leben</a>
                  </div>
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/ratgeber/hg" id="HausGarten" className="gc-header__link">Haus &amp; Garten</a>
                  </div>
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/ratgeber/rf" id="RechtFinanzen" className="gc-header__link">Recht &amp; Finanzen</a>
                  </div>
                  <div className="gc-header__item" tabIndex={-1}>
                    <a href="/gsservice/machergeschichten" id="Machergeschichten" className="gc-header__link">Machergeschichten</a>
                  </div>
                </div>
              </div>
              
              {/* Firma eintragen Button */}
              <div className="gc-header__item gc-header__item--childs" tabIndex={-1}>
                <span className="gc-header__separation-line"></span>
                <div className="gc-header__item gc-header__button-container">
                  <a href="/starteintrag" className="gc-btn gc-btn--black header-btn">Firma eintragen</a>
                </div>
              </div>
              
              {/* Accessibility Icon (Desktop) */}
              <div className="gc-header__item gc-header__button-container gc-header__a11y" tabIndex={-1} aria-label="barrierefrei">
                <a href="/gsservice/barrierefrei" className="gc-header__link" id="a11ylink">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="0.75" y="0.75" width="22.5" height="22.5" rx="11.25" stroke="#1E1E1E" strokeWidth="1.5"/>
                    <path d="M12 7.2C11.5722 7.2 11.206 7.04333 10.9014 6.73C10.5968 6.41667 10.4444 6.04 10.4444 5.6C10.4444 5.16 10.5968 4.78333 10.9014 4.47C11.206 4.15667 11.5722 4 12 4C12.4278 4 12.794 4.15667 13.0986 4.47C13.4032 4.78333 13.5556 5.16 13.5556 5.6C13.5556 6.04 13.4032 6.41667 13.0986 6.73C12.794 7.04333 12.4278 7.2 12 7.2ZM9.66667 20V9.6C8.88889 9.53333 8.09815 9.43333 7.29444 9.3C6.49074 9.16667 5.72593 9 5 8.8L5.38889 7.2C6.4 7.48 7.47593 7.68333 8.61667 7.81C9.75741 7.93667 10.8852 8 12 8C13.1148 8 14.2426 7.93667 15.3833 7.81C16.5241 7.68333 17.6 7.48 18.6111 7.2L19 8.8C18.2741 9 17.5093 9.16667 16.7056 9.3C15.9019 9.43333 15.1111 9.53333 14.3333 9.6V20H12.7778V15.2H11.2222V20H9.66667Z" fill="#1E1E1E"/>
                  </svg>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
