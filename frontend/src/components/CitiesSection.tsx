import React, { useState, useEffect } from 'react'

export default function CitiesSection() {
  const [visibleCount, setVisibleCount] = useState(3) // Default to 3 columns
  const [isExpanded, setIsExpanded] = useState(false)
  
  const cities = [
    { name: "Augsburg", state: "Bayern", population: "289.584", href: "/branchenbuch/staedte/bayern/kreisfrei/augsburg", image: "augsburg.456537fa54.jpg" },
    { name: "Berlin", state: "Berlin", population: "3.520.031", href: "/branchenbuch/staedte/berlin/berlin/berlin", image: "berlin.456537fa54.jpg" },
    { name: "Bremen", state: "Bremen", population: "565.719", href: "/branchenbuch/staedte/bremen/kreisfrei/bremen", image: "bremen.456537fa54.jpg" },
    { name: "Chemnitz", state: "Sachsen", population: "246.353", href: "/branchenbuch/staedte/sachsen/kreisfrei/chemnitz_sachsen", image: "chemnitz.456537fa54.jpg" },
    { name: "Dortmund", state: "Nordrhein-Westfalen", population: "585.813", href: "/branchenbuch/staedte/nordrhein-westfalen/kreisfrei/dortmund", image: "dortmund.456537fa54.jpg" },
    { name: "Dresden", state: "Sachsen", population: "547.172", href: "/branchenbuch/staedte/sachsen/kreisfrei/dresden", image: "dresden.456537fa54.jpg" },
    { name: "Duisburg", state: "Nordrhein-Westfalen", population: "499.845", href: "/branchenbuch/staedte/nordrhein-westfalen/kreisfrei/duisburg", image: "duisburg.456537fa54.jpg" },
    { name: "Düsseldorf", state: "Nordrhein-Westfalen", population: "613.230", href: "/branchenbuch/staedte/nordrhein-westfalen/kreisfrei/düsseldorf", image: "duesseldorf.456537fa54.jpg" },
    { name: "Essen", state: "Nordrhein-Westfalen", population: "583.084", href: "/branchenbuch/staedte/nordrhein-westfalen/kreisfrei/essen", image: "essen.456537fa54.jpg" },
    { name: "Frankfurt am Main", state: "Hessen", population: "736.414", href: "/branchenbuch/staedte/hessen/kreisfrei/frankfurt_am_main", image: "frankfurt.456537fa54.jpg" },
    { name: "Hamburg", state: "Hamburg", population: "1.810.438", href: "/branchenbuch/staedte/hamburg/hamburg/hamburg", image: "hamburg.456537fa54.jpg" },
    { name: "Hannover", state: "Niedersachsen", population: "532.864", href: "/branchenbuch/staedte/niedersachsen/region-hannover/hannover", image: "hannover.456537fa54.jpg" },
    { name: "Kiel", state: "Schleswig-Holstein", population: "247.441", href: "/branchenbuch/staedte/schleswig-holstein/kreisfrei/kiel", image: "kiel.456537fa54.jpg" },
    { name: "Köln", state: "Nordrhein-Westfalen", population: "1.060.582", href: "/branchenbuch/staedte/nordrhein-westfalen/kreisfrei/köln", image: "koeln.456537fa54.jpg" },
    { name: "Leipzig", state: "Sachsen", population: "571.088", href: "/branchenbuch/staedte/sachsen/kreisfrei/leipzig", image: "leipzig.456537fa54.jpg" },
    { name: "Mannheim", state: "Baden-Württemberg", population: "304.781", href: "/branchenbuch/staedte/baden-württemberg/kreisfrei/mannheim", image: "mannheim.456537fa54.jpg" },
    { name: "München", state: "Bayern", population: "1.464.301", href: "/branchenbuch/staedte/bayern/kreisfrei/münchen", image: "muenchen.456537fa54.jpg" },
    { name: "Nürnberg", state: "Bayern", population: "511.628", href: "/branchenbuch/staedte/bayern/kreisfrei/nürnberg", image: "nuernberg.456537fa54.jpg" },
    { name: "Stuttgart", state: "Baden-Württemberg", population: "628.032", href: "/branchenbuch/staedte/baden-württemberg/kreisfrei/stuttgart", image: "stuttgart.456537fa54.jpg" },
    { name: "Wuppertal", state: "Nordrhein-Westfalen", population: "352.390", href: "/branchenbuch/staedte/nordrhein-westfalen/kreisfrei/wuppertal", image: "wuppertal.456537fa54.jpg" },
  ]

  // Determine column count based on screen size
  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth
      const isTablet = width > 767
      const columnCount = width >= 996 ? 3 : 2
      const initialItems = isTablet ? columnCount : 1
      setVisibleCount(initialItems)
    }
    
    updateColumnCount()
    window.addEventListener('resize', updateColumnCount)
    return () => window.removeEventListener('resize', updateColumnCount)
  }, [])

  const handleToggle = () => {
    if (isExpanded) {
      // Minimize - reset to initial count
      const width = window.innerWidth
      const isTablet = width > 767
      const columnCount = width >= 996 ? 3 : 2
      setVisibleCount(isTablet ? columnCount : 1)
      setIsExpanded(false)
    } else {
      // Expand - show more items incrementally
      const width = window.innerWidth
      const isTablet = width > 767
      const columnCount = width >= 996 ? 3 : 2
      const itemsToShow = isTablet ? columnCount : 1
      const newCount = visibleCount + itemsToShow
      
      if (newCount >= cities.length) {
        setVisibleCount(cities.length)
        setIsExpanded(true)
      } else {
        setVisibleCount(newCount)
      }
    }
  }

  return (
    <section>
      <div className="mod mod-Staedteteaser">
        <h2 className="gc-text--startseite-h2">Deutschland entdecken mit Gelbe Seiten</h2>
        <div className="startseite__wrapper">
          <h3 className="mod-TeaserBoxen__subTitle gc-text--startseite-h3">Ihr Reiseführer für Deutschland</h3>
          <div className="startseite__wrapper__container container--flexbox">
            {cities.slice(0, visibleCount).map((city, index) => (
              <div key={index} className="mod mod-Boxteaser" style={{ display: 'block' }}>
                <a href={city.href} title={city.name}>
                  <div className="mod-Boxteaser__image">
                    <img 
                      loading="lazy" 
                      decoding="async" 
                      alt={city.name} 
                      width={0} 
                      height={0} 
                      src={`/assets/images/staedteteaser/large/${city.image}`} 
                    />
                  </div>
                  <div className="mod-Boxteaser__content">
                    <div className="mod-Boxteaser__content__caption">{city.state}</div>
                    <div className="mod-Boxteaser__content__title">{city.name} &gt;</div>
                    <div className="mod-Boxteaser__content__footer">{city.population} Einwohner</div>
                  </div>
                </a>
              </div>
            ))}
            
            {/* All Cities Link - Only shown when fully expanded */}
            {isExpanded && (
              <div className="mod mod-Boxteaser" style={{ display: 'block' }}>
                <a href="/branchenbuch" title="Alle Städte im Stadtportal erkunden">
                  <div className="mod-Boxteaser__image">
                    <img 
                      loading="lazy" 
                      decoding="async" 
                      alt="Alle Städte im Stadtportal erkunden" 
                      width={0} 
                      height={0} 
                      src="/assets/images/staedteteaser/large/deutschland.456537fa54.jpg" 
                    />
                  </div>
                  <div className="mod-Boxteaser__content">
                    <div className="mod-Boxteaser__content__caption">Deutschland</div>
                    <div className="mod-Boxteaser__content__title">Alle Städte im Stadtportal erkunden &gt;</div>
                    <div className="mod-Boxteaser__content__footer">82.792.351 Einwohner</div>
                  </div>
                </a>
              </div>
            )}
          </div>
          <div 
            className="startseite__mehranzeigen" 
            onClick={handleToggle}
            style={{ cursor: 'pointer' }}
          >
            {isExpanded ? 'Minimieren' : 'Mehr anzeigen'}
            <span className={isExpanded ? 'startseite__mehranzeigen__array--up' : 'startseite__mehranzeigen__array--down'}></span>
          </div>
        </div>
      </div>
    </section>
  )
}
