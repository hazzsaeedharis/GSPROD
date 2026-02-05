import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icons in Next.js
if (typeof window !== "undefined") {
  delete (L.Icon.Default.prototype as any)._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "/assets/images/marker-icon-2x.png",
    iconUrl: "/assets/images/marker-icon.png",
    shadowUrl: "/assets/images/marker-shadow.png",
  });
}

interface Business {
  id: string;
  name: string;
  address: string;
  city: string;
  postcode: string;
  lat: number | null;
  lon: number | null;
  phone?: string | null;
  website?: string | null;
}

interface MapViewProps {
  businesses: Business[];
  center?: [number, number];
  zoom?: number;
  onMarkerClick?: (business: Business) => void;
  height?: string;
  radiusKm?: number; // Search radius in kilometers
}

function MapViewComponent({
  businesses,
  center,
  zoom = 12,
  onMarkerClick,
  height = "500px",
  radiusKm, // Search radius in kilometers
}: MapViewProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Component to render the radius circle
  const RadiusCircle = () => {
    const map = useMap();
    
    useEffect(() => {
      // Only draw if we have a radius and valid center (using map center if no default center)
      if (radiusKm && radiusKm > 0 && center) {
        // Clear existing circles (optional, Leaflet/React handles updates mostly, but good practice if needed)
        
        // Draw circle
        const circle = L.circle(center, {
          radius: radiusKm * 1000, // Convert km to meters
          color: '#ffdc00',
          fillColor: '#ffdc00',
          fillOpacity: 0.1,
          weight: 2
        }).addTo(map);

        // Adjust bounds to fit the circle
        if (radiusKm && radiusKm > 0 && center) {
           map.fitBounds(circle.getBounds());
        }

        return () => {
          map.removeLayer(circle);
        };
      }
    }, [radiusKm, map, center]);

    return null;
  };

  // Component to fit bounds when businesses change
  const FitBounds = () => {
    const map = useMap();

    useEffect(() => {
      const validBusinesses = businesses.filter((b) => b.lat && b.lon);

      if (validBusinesses.length > 0) {
        const bounds = validBusinesses.map(
          (b) => [b.lat!, b.lon!] as [number, number],
        );
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 15 });
      }
    }, [businesses, map]);

    return null;
  };

  // Toggle fullscreen
  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Close fullscreen on ESC key and prevent body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };

    // Prevent body scroll when fullscreen
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  // Default center (Germany)
  const defaultCenter: [number, number] = center || [51.1657, 10.4515];

  // Filter businesses with valid coordinates
  const validBusinesses = businesses.filter(
    (b) => b.lat !== null && b.lon !== null,
  );

  return (
    <>
      <div style={{ height, width: "100%", position: "relative", overflow: "hidden" }}>
        {/* Fullscreen Toggle Button */}
        <button
          onClick={toggleFullscreen}
          className="map-enlarge-btn"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            zIndex: 500,
            background: "#000",
            border: "none",
            borderRadius: "4px",
            padding: "10px 16px",
            cursor: "pointer",
            boxShadow: "0 3px 10px rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "15px",
            fontWeight: "700",
            color: "#fff",
            transition: "all 0.2s",
          }}
          title="Karte vergrößern"
          onMouseOver={(e) => {
            e.currentTarget.style.background = "#ffdc00";
            e.currentTarget.style.color = "#000";
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.5)";
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = "#000";
            e.currentTarget.style.color = "#fff";
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 3px 10px rgba(0,0,0,0.4)";
          }}
        >
          <img
            src="/assets/gsbiz/images/ic-enlarge-map.svg"
            alt="Karte vergrößern"
            style={{ width: "20px", height: "20px", filter: "invert(1)" }}
          />
          <span>Karte vergrößern</span>
        </button>

        <MapContainer
          center={defaultCenter}
          zoom={zoom}
          style={{ height: "100%", width: "100%" }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitBounds />

          {/* Draw radius circle if center and radius are provided */}
          {center && radiusKm && radiusKm > 0 && (
            <Circle
              center={center}
              radius={radiusKm * 1000} // Convert km to meters
              pathOptions={{
                color: '#ffdc00',
                fillColor: '#ffdc00',
                fillOpacity: 0.1,
                weight: 2,
              }}
            />
          )}

          {validBusinesses.map((business) => (
            <Marker
              key={business.id}
              position={[business.lat!, business.lon!]}
              eventHandlers={{
                click: () => {
                  if (onMarkerClick) {
                    onMarkerClick(business);
                  }
                },
              }}
            >
              <Popup>
                <div style={{ minWidth: "200px" }}>
                  <h3
                    style={{
                      margin: "0 0 8px 0",
                      fontSize: "16px",
                      fontWeight: "bold",
                    }}
                  >
                    {business.name}
                  </h3>
                  <p style={{ margin: "4px 0", fontSize: "14px" }}>
                    {business.address}
                  </p>
                  {business.phone && (
                    <p style={{ margin: "4px 0", fontSize: "14px" }}>
                      📞 {business.phone}
                    </p>
                  )}
                  <a
                    href={`/gsbiz/${business.id}`}
                    style={{
                      display: "inline-block",
                      marginTop: "8px",
                      padding: "6px 12px",
                      backgroundColor: "#ffdc00",
                      color: "#000",
                      textDecoration: "none",
                      borderRadius: "4px",
                      fontSize: "14px",
                      fontWeight: "bold",
                    }}
                  >
                    Details anzeigen
                  </a>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Fullscreen Map Modal - Rendered via Portal */}
      {isFullscreen && typeof window !== 'undefined' && ReactDOM.createPortal(
        <div
          className="map-fullscreen-overlay"
          style={{
            position: "fixed !important" as any,
            top: "0 !important" as any,
            left: "0 !important" as any,
            right: "0 !important" as any,
            bottom: "0 !important" as any,
            width: "100vw !important" as any,
            height: "100vh !important" as any,
            zIndex: "999999 !important" as any,
            background: "#fff",
            margin: "0 !important" as any,
            padding: "0 !important" as any,
            maxWidth: "none !important" as any,
            maxHeight: "none !important" as any,
            transform: "none !important" as any,
          }}
          onClick={(e) => {
            // Close when clicking outside the map (on the overlay)
            if (e.target === e.currentTarget) {
              setIsFullscreen(false);
            }
          }}
        >
          {/* Close Button */}
          <button
            onClick={toggleFullscreen}
            className="map-fullscreen-close-btn"
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 1000000,
              background: "#000",
              border: "none",
              borderRadius: "50%",
              width: "56px",
              height: "56px",
              cursor: "pointer",
              boxShadow: "0 4px 16px rgba(0,0,0,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              fontSize: "32px",
              color: "#fff",
              fontWeight: "300",
            }}
            title="Karte schließen (ESC)"
            onMouseOver={(e) => {
              e.currentTarget.style.background = "#ffdc00";
              e.currentTarget.style.color = "#000";
              e.currentTarget.style.transform = "scale(1.1) rotate(90deg)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = "#000";
              e.currentTarget.style.color = "#fff";
              e.currentTarget.style.transform = "scale(1) rotate(0deg)";
            }}
          >
            ×
          </button>

          <MapContainer
            center={defaultCenter}
            zoom={zoom + 1}
            style={{ height: "100vh", width: "100vw" }}
            scrollWheelZoom={true}
          >
            <TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            <FitBounds />

            {/* Draw radius circle if center and radius are provided */}
            {center && radiusKm && radiusKm > 0 && (
              <Circle
                center={center}
                radius={radiusKm * 1000} // Convert km to meters
                pathOptions={{
                  color: '#ffdc00',
                  fillColor: '#ffdc00',
                  fillOpacity: 0.1,
                  weight: 2,
                }}
              />
            )}

            {validBusinesses.map((business) => (
              <Marker
                key={business.id}
                position={[business.lat!, business.lon!]}
                eventHandlers={{
                  click: () => {
                    if (onMarkerClick) {
                      onMarkerClick(business);
                    }
                  },
                }}
              >
                <Popup>
                  <div style={{ minWidth: "200px" }}>
                    <h3
                      style={{
                        margin: "0 0 8px 0",
                        fontSize: "16px",
                        fontWeight: "bold",
                      }}
                    >
                      {business.name}
                    </h3>
                    <p style={{ margin: "4px 0", fontSize: "14px" }}>
                      {business.address}
                    </p>
                    {business.phone && (
                      <p style={{ margin: "4px 0", fontSize: "14px" }}>
                        📞 {business.phone}
                      </p>
                    )}
                    <a
                      href={`/gsbiz/${business.id}`}
                      style={{
                        display: "inline-block",
                        marginTop: "8px",
                        padding: "6px 12px",
                        backgroundColor: "#ffdc00",
                        color: "#000",
                        textDecoration: "none",
                        borderRadius: "4px",
                        fontSize: "14px",
                        fontWeight: "bold",
                      }}
                    >
                      Details anzeigen
                    </a>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>,
        document.body
      )}
    </>
  );
}

export default MapViewComponent;
