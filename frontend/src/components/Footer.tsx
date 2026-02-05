import React from 'react'

export default function Footer() {
  return (
    <footer>
      {/* Main Footer Navigation */}
      <div className="container-wrapper bg--yellow">
        <div className="container">
          <nav className="mod mod-Footer row">
            
            {/* Dialog & Hilfe */}
            <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
              <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-1" />
              <label htmlFor="gs-footer-menu-1">Dialog &amp; Hilfe</label>
              <a href="/gsservice/verlage" className="mod-Footer__link-item">Ansprechpartner</a>
              <a href="/gsservice/faq" className="mod-Footer__link-item">Häufige Fragen</a>
              <a href="/branchenbuch" className="mod-Footer__link-item">Übersicht aller Städte</a>
            </div>
            
            {/* Über Gelbe Seiten */}
            <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
              <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-2" />
              <label htmlFor="gs-footer-menu-2">Über Gelbe Seiten</label>
              <a href="/gsservice/newsroom" className="mod-Footer__link-item">Newsroom</a>
              <a href="/gsservice/mobil" className="mod-Footer__link-item">Gelbe Seiten als App</a>
              <a href="https://bcrw.apple.com/urn:biz:bc2b4718-65b6-45de-9908-29b6225e4231?body=Hallo" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">Gelbe Seiten für Messenger</a>
              <a href="/gsservice/alexaskill" className="mod-Footer__link-item">Gelbe Seiten als Alexa Skill</a>
            </div>
            
            {/* Unsere Partner */}
            <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
              <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-3" />
              <label htmlFor="gs-footer-menu-3">Unsere Partner</label>
              <a href="/gsservice/kooperationspartner" className="mod-Footer__link-item">Kooperationspartner</a>
              <a href="https://www.dastelefonbuch.de/" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">Das Telefonbuch</a>
              <a href="https://www.dasoertliche.de/" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">Das Örtliche</a>
            </div>
            
            {/* Zu finden auf */}
            <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
              <input type="checkbox" className="mod-Footer__menu-checkbox" id="gs-footer-menu-4" />
              <label htmlFor="gs-footer-menu-4">Zu finden auf</label>
              <a href="https://www.instagram.com/gelbe.seiten/" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/gelbeseiten/" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.pinterest.de/gelbeseiten_de/" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">Pinterest</a>
              <a href="https://www.tiktok.com/@gelbeseiten" className="mod-Footer__link-item" target="_blank" rel="noopener noreferrer">TikTok</a>
            </div>
          </nav>
        </div>
      </div>
      
      {/* Middle Part - App Downloads & Awards */}
      <div className="container-wrapper mod-Footer__middlePart">
        <div className="container">
          <div className="row container-wrapper mod-Footer__middlePart__wrapper">
            
            {/* App Download Badges */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <div className="mod-Footer__middlePart__downloadIcon-text">Gelbe Seiten als App</div>
              <div className="mod-Footer__middlePart__downloadIcon-wrapper">
                <a 
                  className="mod-Footer__middlePart__downloadIcon-link"
                  href="https://play.google.com/store/apps/details?id=de.gelbeseiten.android&hl=de&pcampaignid=MKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                    className="mod-Footer__middlePart__downloadIcon" 
                    src="/assets/images/google-play-badge.png" 
                    alt="Google play badge" 
                    width={129} 
                    height={40} 
                  />
                </a>
                <a 
                  className="mod-Footer__middlePart__downloadIcon-link" 
                  href="https://itunes.apple.com/de/app/gelbe-seiten-branchenbuch/id312387605?mt=8"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img 
                    className="mod-Footer__middlePart__downloadIcon" 
                    src="/assets/images/app-store-badge.png" 
                    alt="App store badge" 
                    width={129} 
                    height={40} 
                  />
                </a>
              </div>
            </div>
            
            {/* Award Badges */}
            <div className="col-12 col-md-6 col-lg-6 col-xl-6">
              <div className="mod mod-Guetesiegel-footer">
                <div className="mod-Guetesiegel__wrap-footer">
                  <div className="mod-Guetesiegel__title-footer">
                    Mehrfach ausgezeichnet
                  </div>
                  <div className="mod-Guetesiegel__wrap__container-footer">
                    <div className="mod-Guetesiegel__award-footer">
                      <img 
                        src="/assets/images/awards/germanCustomerAward_2023.png" 
                        alt="Deutscher Kunden Award 2022/23"
                        width={56} 
                        height={83} 
                      />
                    </div>
                    <div className="mod-Guetesiegel__award-footer">
                      <img 
                        src="/assets/images/besteOnlinePortale/besteOnlinePortale_2023.png" 
                        alt="Best Online Portale"
                        width={56} 
                        height={83} 
                      />
                    </div>
                    <div className="mod-Guetesiegel__ntv-footer">
                      <img 
                        src="/assets/images/ntv-preis/ntv_2023.png" 
                        alt="ntv_2023"
                        width={80} 
                        height={80} 
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Separator Line */}
      <div className="container-wrapper">
        <div className="container">
          <div className="mod-Footer__line"></div>
        </div>
      </div>
      
      {/* Bottom Part - Legal Links & Logo */}
      <div className="container-wrapper mod-Footer__bottomPart">
        <div className="container">
          <div className="row container-wrapper mod-Footer__bottomPart-wrapper">
            
            {/* Legal Links */}
            <div className="mod-Footer__menu col-12 col-md-6 col-lg-6 col-xl-6">
              <a href="/gsservice/impressum" className="mod-Footer__link-item--bottom">Impressum</a>
              <a href="/gsservice/datenschutz" className="mod-Footer__link-item--bottom">Datenschutzerklärung</a>
              <a href="/#cmpscreencustom" className="mod-Footer__link-item--bottom" id="footer_datenschutzeinstellungen">Datenschutz-Einstellungen</a>
              <a href="/gsservice/nutzungsbedingungen" className="mod-Footer__link-item--bottom">AGB</a>
            </div>
            
            {/* Logo & Verlage Link */}
            <div className="mod-Footer__infos col-12 col-md-6 col-lg-6 col-xl-6">
              <a href="/" className="mod-Footer__logo" target="_top">
                <img src="/assets/images/gelbe-seiten-logo.svg" alt="Gelbe Seiten" width={29} height={4} loading="lazy" />
              </a>
              <a 
                href="/gsservice/verlage"
                target="_blank"
                rel="noopener noreferrer"
                className="mod-Footer__verlagslink"
              >
                Ein Service Ihrer <div className="nobr">Gelbe Seiten Verlage</div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
