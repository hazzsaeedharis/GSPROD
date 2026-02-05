'use client'

import { useState, FormEvent } from 'react'
import { useRouter } from 'next/router'

interface SearchFormProps {
  className?: string
}

export default function SearchForm({ className = '' }: SearchFormProps) {
  const router = useRouter()
  const [whatSearch, setWhatSearch] = useState('')
  const [whereSearch, setWhereSearch] = useState('')
  const [showLocationDropdown, setShowLocationDropdown] = useState(false)
  const [isRequestingLocation, setIsRequestingLocation] = useState(false)
  const [userCoordinates, setUserCoordinates] = useState<{ lat: number; lon: number } | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const handleGeolocation = async () => {
    if (!navigator.geolocation) {
      setErrorMessage('Geolocation ist in Ihrem Browser nicht verfügbar.')
      return
    }

    setIsRequestingLocation(true)
    setShowLocationDropdown(false)

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        })
      })

      const { latitude, longitude } = position.coords
      
      // Reverse geocode using OSM Nominatim
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json&addressdetails=1&zoom=14`,
          {
            headers: {
              'User-Agent': 'GelbeSeitenApp/1.0'
            }
          }
        )
        await response.json()

        // Store coordinates for search
        setUserCoordinates({ lat: latitude, lon: longitude })
        setWhereSearch('Meinen Standort verwenden')
      } catch (error) {
        console.error('Geocoding error:', error)
        setErrorMessage('Fehler beim Abrufen des Standorts')
      }
    } catch (error: any) {
      let errorMsg = 'Standort konnte nicht abgerufen werden.'
      if (error.code === error.PERMISSION_DENIED) {
        errorMsg = 'Standortzugriff wurde verweigert. Bitte erlauben Sie den Zugriff in Ihren Browsereinstellungen.'
      } else if (error.code === error.POSITION_UNAVAILABLE) {
        errorMsg = 'Standortinformationen sind nicht verfügbar.'
      } else if (error.code === error.TIMEOUT) {
        errorMsg = 'Zeitüberschreitung beim Abrufen des Standorts.'
      }
      setErrorMessage(errorMsg)
    } finally {
      setIsRequestingLocation(false)
    }
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()

    const isUsingGeolocation = 
      whereSearch.toLowerCase().includes('meinen standort verwenden') || 
      userCoordinates !== null

    if (!whatSearch && !isUsingGeolocation) {
      setErrorMessage('Bitte geben Sie einen Suchbegriff oder Ort ein')
      return
    }

    // Convert to URL-friendly slugs
    const keywordSlug = whatSearch.toLowerCase().trim().replace(/\s+/g, '_') || 'alle'
    
    let searchUrl = `/branchen/${keywordSlug}/standort`

    if (isUsingGeolocation && userCoordinates) {
      // Pass coordinates as query params for backend to use with 50km radius
      searchUrl += `?lat=${userCoordinates.lat}&lon=${userCoordinates.lon}&radius=50`
    } else if (whereSearch && !isUsingGeolocation) {
      // Normal location-based search
      const locationSlug = whereSearch
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '_')
        .replace(/[()]/g, '') || 'deutschland'
      searchUrl = `/branchen/${keywordSlug}/${locationSlug}`
    }

    // Navigate to search results
    router.push(searchUrl)
  }

  const closeErrorModal = () => {
    setErrorMessage(null)
  }

  return (
    <>
      <form 
        name="startpageForm" 
        onSubmit={handleSubmit}
        className="mod mod-Grouped grouped"
      >
        {/* What search input */}
        <div className="mod-Input input input--float-label" data-name="WAS">
          <input
            type="search"
            id="what_search"
            name="WAS"
            value={whatSearch}
            onChange={(e) => setWhatSearch(e.target.value)}
            placeholder="Was"
            className="input__input input__searchblock"
            spellCheck={false}
            aria-label="Was"
            autoFocus
          />
          <div className="input__notice" />
        </div>

        <div className="mod-Grouped__flex-wrapper">
          {/* Where search input */}
          <div className="mod-Input input input--float-label" data-name="WO" style={{ position: 'relative' }}>
            <input
              type="search"
              id="where_search"
              name="WO"
              value={whereSearch}
              onChange={(e) => setWhereSearch(e.target.value)}
              onFocus={() => {
                if (!whereSearch && navigator.geolocation) {
                  setShowLocationDropdown(true)
                }
              }}
              onBlur={() => {
                setTimeout(() => setShowLocationDropdown(false), 200)
              }}
              placeholder={isRequestingLocation ? 'Standort wird ermittelt...' : 'Wo'}
              disabled={isRequestingLocation}
              className="input__input input__searchblock"
              spellCheck={false}
              aria-label="Wo"
              autoComplete="address-level2"
            />
            
            {/* Location dropdown */}
            {showLocationDropdown && (
              <ul
                className="WO-Vorschalgsliste"
                id="location-dropdown"
                style={{
                  position: 'absolute',
                  top: '100%',
                  left: 0,
                  right: 0,
                  background: '#fff',
                  border: '1px solid #ccc',
                  margin: 0,
                  padding: 0,
                  listStyle: 'none',
                  zIndex: 1000,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  display: 'block'
                }}
              >
                <li
                  className="geolocation-trigger"
                  onClick={handleGeolocation}
                  tabIndex={1}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 15px',
                    cursor: 'pointer',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                  <span>Meinen Standort verwenden</span>
                  <img 
                    src="/assets/gsbiz/images/ic-compass.svg" 
                    alt="Location" 
                    width="16"
                    height="16"
                    style={{ display: 'block' }}
                  />
                </li>
              </ul>
            )}
            <div className="input__notice" />
          </div>

          {/* Submit button */}
          <button 
            type="submit" 
            className="gc-btn gc-btn--black gc-btn--l search_go" 
            aria-label="Suche"
          >
            <span className="gc-btn__text">Finden</span>
          </button>
        </div>
      </form>

      {/* Error Modal */}
      {errorMessage && (
        <div
          id="location-modal-overlay"
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            zIndex: 10000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
          onClick={closeErrorModal}
        >
          <div
            style={{
              background: '#fff',
              borderRadius: '8px',
              maxWidth: '500px',
              width: '90%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                background: '#ffdc00',
                padding: '16px 20px',
                borderRadius: '8px 8px 0 0',
                fontWeight: 'bold',
                fontSize: '16px',
                color: '#000'
              }}
            >
              Fehler
            </div>
            <div
              style={{
                padding: '24px 20px',
                color: '#333',
                fontSize: '15px',
                lineHeight: '1.5'
              }}
            >
              {errorMessage}
            </div>
            <div
              style={{
                padding: '16px 20px',
                borderTop: '1px solid #e0e0e0',
                display: 'flex',
                justifyContent: 'flex-end'
              }}
            >
              <button
                onClick={closeErrorModal}
                style={{
                  padding: '10px 24px',
                  background: '#ffdc00',
                  border: '1px solid #ffdc00',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  color: '#000',
                  fontWeight: 'bold'
                }}
                onMouseOver={(e) => e.currentTarget.style.background = '#ffd700'}
                onMouseOut={(e) => e.currentTarget.style.background = '#ffdc00'}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
