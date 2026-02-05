import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'

interface SearchBoxProps {
  onSearch?: (keyword: string, location: string) => void
  className?: string
}

export default function SearchBox({ onSearch, className = '' }: SearchBoxProps) {
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [location, setLocation] = useState('')
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([])
  const [showLocationSuggestions, setShowLocationSuggestions] = useState(false)
  const locationInputRef = useRef<HTMLInputElement>(null)

  // Debounce location input for suggestions
  useEffect(() => {
    if (location.length < 2) {
      setLocationSuggestions([])
      return
    }

    const timer = setTimeout(async () => {
      try {
        const response = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(location)},Germany&format=json&limit=5&addressdetails=1`
        )
        const data = await response.json()
        
        const suggestions = data
          .map((item: any) => {
            const city = item.address?.city || item.address?.town || item.address?.village
            const postcode = item.address?.postcode
            if (city) {
              return postcode ? `${city} (${postcode})` : city
            }
            return null
          })
          .filter((s: string | null) => s !== null)
        
        setLocationSuggestions(suggestions)
      } catch (error) {
        console.error('Error fetching location suggestions:', error)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [location])

  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation ist in Ihrem Browser nicht verfügbar')
      return
    }

    setIsGettingLocation(true)

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords
          
          // Reverse geocode to get city name
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          )
          const data = await response.json()
          
          const city = data.address?.city || data.address?.town || data.address?.village || ''
          setLocation(city)
          setIsGettingLocation(false)
        } catch (error) {
          console.error('Error reverse geocoding:', error)
          setIsGettingLocation(false)
          alert('Fehler beim Abrufen des Standorts')
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        setIsGettingLocation(false)
        alert('Standort konnte nicht abgerufen werden')
      }
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!keyword && !location) {
      return
    }

    if (onSearch) {
      onSearch(keyword, location)
    } else {
      // Navigate to search results page
      const keywordSlug = keyword.toLowerCase().replace(/\s+/g, '_') || 'alle'
      const locationSlug = location.toLowerCase().replace(/\s+/g, '_').replace(/[()]/g, '') || 'deutschland'
      
      router.push(`/branchen/${keywordSlug}/${locationSlug}`)
    }
  }

  const handleLocationSelect = (suggestion: string) => {
    setLocation(suggestion)
    setShowLocationSuggestions(false)
    setLocationSuggestions([])
  }

  return (
    <div className={`searchbox location-form ${className}`} data-module="searchbox">
      <form onSubmit={handleSearch} className="searchbox__form" method="POST">
        <div className="grouped grouped--line">
          <div className="input input--float-label" data-module="float_label">
            <label htmlFor="keyword" className="input__label">
              Was suchen Sie?
            </label>
            <input
              autoComplete="off"
              id="keyword"
              type="text"
              name="WAS"
              className="input__input searchbox__input gc-input__input"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="z.B. Arzt, Restaurant, Friseur"
            />
          </div>

          <div className="input input--float-label" data-module="float_label" style={{ position: 'relative' }}>
            <label htmlFor="location" className="input__label">
              Wo?
            </label>
            <input
              ref={locationInputRef}
              autoComplete="off"
              id="location"
              type="text"
              name="WO"
              className="input__input searchbox__input gc-input__input"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value)
                setShowLocationSuggestions(true)
              }}
              onFocus={() => setShowLocationSuggestions(true)}
              onBlur={() => {
                // Delay to allow click on suggestion
                setTimeout(() => setShowLocationSuggestions(false), 200)
              }}
              placeholder="z.B. Berlin, 10115"
            />
            
            {/* Location suggestions dropdown */}
            {showLocationSuggestions && locationSuggestions.length > 0 && (
              <div className="select__flyout" style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                marginTop: '4px',
                zIndex: 1000,
                maxHeight: '200px',
                overflowY: 'auto',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
              }}>
                <ul className="select__options" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                  {locationSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      style={{
                        padding: '12px 16px',
                        cursor: 'pointer',
                        borderBottom: index < locationSuggestions.length - 1 ? '1px solid #f0f0f0' : 'none'
                      }}
                      onMouseDown={(e) => {
                        e.preventDefault()
                        handleLocationSelect(suggestion)
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f5f5f5'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'white'
                      }}
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="location-form__flyout">
              <button
                className="gc-df gc-fcenterv gc-pvs gc-phm location-form__locate"
                type="button"
                onClick={handleGetCurrentLocation}
                disabled={isGettingLocation}
                style={{
                  opacity: isGettingLocation ? 0.6 : 1,
                  cursor: isGettingLocation ? 'wait' : 'pointer'
                }}
              >
                <svg
                  focusable="false"
                  className="svgicon svgicon--block"
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 16 16"
                >
                  <g fill="none" fillRule="evenodd" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx={8} cy={8} r="7.467" />
                    <path d="M8 2.667V.533M13.333 8h2.134M8 13.333v2.134M2.667 8H.533" />
                    <circle cx={8} cy={8} r="2.133" />
                  </g>
                </svg>
                <div className="gc-mlxs">
                  {isGettingLocation ? 'Lade...' : 'Meinen Ort verwenden'}
                </div>
              </button>
            </div>
          </div>

          <button type="submit" className="gs-btn gs-btn--black gs-btn--l searchbox__button">
            <span className="gs-btn__text">
              <svg
                focusable="false"
                className="svgicon"
                xmlns="http://www.w3.org/2000/svg"
                width={19}
                height={19}
                viewBox="0 0 19 19"
              >
                <path
                  fill="currentColor"
                  d="M19 17.556c0-.388-.16-.766-.422-1.028l-3.917-3.92a8.029 8.029 0 0 0 1.417-4.56C16.077 3.6 12.48 0 8.037 0S0 3.6 0 8.047a8.04 8.04 0 0 0 12.594 6.629l3.917 3.908c.264.275.64.436 1.03.436.798 0 1.46-.665 1.46-1.464zm-5.846-9.51a5.124 5.124 0 0 1-5.116 5.12c-2.82 0-5.116-2.297-5.116-5.12s2.295-5.12 5.116-5.12a5.125 5.125 0 0 1 5.116 5.12z"
                />
              </svg>
            </span>
          </button>
        </div>
      </form>
    </div>
  )
}
