import React from 'react'

export default function TeaserBoxes() {
  return (
    <div className="mod-TeaserBoxen">
      <h2 className="mod-TeaserBoxen__title gc-text--startseite-h2">Unsere Top-Angebote</h2>
      <div className="startseite__wrapper">
        <h3 className="mod-TeaserBoxen__subTitle gc-text--startseite-h3">Vorteile für Sie</h3>
        <div className="startseite__wrapper__container">
          <div className="mod-TeaserBoxen__item">
            <a 
              className="mod-TeaserBoxen__item__block" 
              href="https://vermittlungsservice.gelbeseiten.de/"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a 
              className="mod-TeaserBoxen__item__block" 
              href="/gsservice/alexaskill"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a 
              className="mod-TeaserBoxen__item__block" 
              href="/gsservice/mobil"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a 
              className="mod-TeaserBoxen__item__block" 
              href="/starteintrag"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a 
              className="mod-TeaserBoxen__item__block" 
              href="/gsservice/terminwunsch"
              target="_blank"
              rel="noopener noreferrer"
            >
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
            <a 
              className="mod-TeaserBoxen__item__block" 
              href="/gsservice/werbung"
              target="_blank"
              rel="noopener noreferrer"
            >
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
  )
}
