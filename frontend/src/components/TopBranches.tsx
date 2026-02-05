import React, { useState } from 'react'

export default function TopBranches() {
  const [showAll, setShowAll] = useState(false)
  
  const categories = [
    {
      title: "Gesundheitswesen",
      visible: true,
      items: [
        { name: "Ärzte", href: "/branchenbuch/branche/arzt" },
        { name: "Zahnärzte", href: "/branchenbuch/branche/zahnarzt" },
        { name: "Physiotherapie", href: "/branchenbuch/branche/physiotherapie" },
        { name: "Logopädie", href: "/branchenbuch/branche/logopädie" },
      ]
    },
    {
      title: "Beratungsdienstleistungen",
      visible: true,
      items: [
        { name: "Rechtsanwälte", href: "/branchenbuch/branche/rechtsanwalt", visible: true },
        { name: "Steuerberatung", href: "/branchenbuch/branche/steuerberater", visible: true },
        { name: "Bestattungen", href: "/branchenbuch/branche/bestatter", visible: false },
      ]
    },
    {
      title: "Handwerksbetriebe",
      visible: false,
      items: [
        { name: "Elektroinstallationen", href: "/branchenbuch/branche/elektroinstallation" },
        { name: "Sanitärinstallationen", href: "/branchenbuch/branche/sanitärinstallation" },
        { name: "Heizungs- und Lüftungsbau", href: "/branchenbuch/branche/heizung_&_sanitär" },
        { name: "Malerbetriebe", href: "/branchenbuch/branche/maler" },
        { name: "Dachdeckereien", href: "/branchenbuch/branche/dachdecker" },
        { name: "Rohrreinigung", href: "/branchenbuch/branche/rohrreinigung" },
        { name: "Tischlereien", href: "/branchenbuch/branche/schreiner" },
        { name: "Fenster", href: "/branchenbuch/branche/fenster" },
        { name: "Kanalreinigung", href: "/branchenbuch/branche/kanalreinigung" },
      ]
    },
    {
      title: "Immobilien und Bauwesen",
      visible: false,
      items: [
        { name: "Bauunternehmen", href: "/branchenbuch/branche/bauunternehmen" },
        { name: "Immobilien", href: "/branchenbuch/branche/immobilien" },
      ]
    },
    {
      title: "Garten- und Landschaftsbau",
      visible: false,
      items: [
        { name: "Garten- und Landschaftsbau", href: "/branchenbuch/branche/gartenbau_&_landschaftsbau" },
      ]
    },
    {
      title: "Gebäudemanagement",
      visible: false,
      items: [
        { name: "Gebäudereinigung", href: "/branchenbuch/branche/gebäudereinigung" },
      ]
    },
    {
      title: "Spezialdienstleistungen",
      visible: false,
      items: [
        { name: "Schädlingsbekämpfung", href: "/branchenbuch/branche/kammerjäger" },
      ]
    }
  ]

  return (
    <section className="mod mod-TopbranchenVerlinkungen">
      <h2 className="gc-text gc-text--startseite-h2">Top-Branchen finden</h2>
      <div className={`startseite__wrapper ${showAll ? 'expanded' : ''}`}>
        {categories.map((category, catIndex) => {
          // Show category if it's marked visible, or if showAll is true
          if (!showAll && !category.visible) return null
          
          return (
            <div key={catIndex}>
              <h3 className={`mod-TeaserBoxen__subTitle ${catIndex > 0 ? 'mod-TeaserBoxen__subTitle2' : ''} gc-text--startseite-h3 ${!showAll && !category.visible ? 'd-none' : ''}`}>
                {category.title}
              </h3>
              <div className={`startseite__wrapper__container ${!showAll && !category.visible ? 'd-none' : ''}`}>
                {category.items.map((item, itemIndex) => {
                  // For items with visibility flag, check if we should show them
                  const itemVisible = 'visible' in item ? item.visible : true
                  if (!showAll && !itemVisible) return null
                  
                  return (
                    <a 
                      key={itemIndex} 
                      className={`mod-TopbranchenVerlinkungen__item ${!showAll && !itemVisible ? 'd-none' : ''}`} 
                      href={item.href}
                    >
                      {item.name}
                      <span className="mod-TopbranchenVerlinkungen__array">&gt;</span>
                    </a>
                  )
                })}
              </div>
            </div>
          )
        })}
        <div className={`mod-TopbranchenVerlinkungen__shadow ${showAll ? 'd-none' : ''}`}></div>
        <div 
          className="startseite__mehranzeigen"
          onClick={() => setShowAll(!showAll)}
          style={{ cursor: 'pointer' }}
        >
          {showAll ? 'Minimieren' : 'Mehr anzeigen'}
          <span className={showAll ? 'startseite__mehranzeigen__array--up' : 'startseite__mehranzeigen__array--down'}></span>
        </div>
      </div>
    </section>
  )
}
