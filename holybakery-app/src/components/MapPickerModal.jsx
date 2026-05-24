import React, { useState } from 'react';
import './MapPickerModal.css';
import { GoogleMap, useJsApiLoader, MarkerF, Autocomplete } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import mapData from '../map.json';

const I = window.Icons || {};
const libraries = ['places'];

const FALLBACK_SUGGESTIONS = [
  // ── ESPECIALES (tarifa preferencial del admin) ──────────────────
  {
    name: "Casa Banana Restaurante",
    address: "Carr. Tulum-Boca Paila Km. 7.5, Tulum Beach, Zona Hotelera, 77780 Tulum, Q.R., Mexico",
    lat: 20.150517209155122,
    lng: -87.45899191909139,
    zone: "Especial",
    price_local: 400,
    price_foreign: 500,
    type: "preferential"
  },

  // ── FRECUENTES ──────────────────────────────────────────────────
  {
    name: "Ambre & Epices Jungle Hôtel & Spa",
    address: "C. 3 Pte. Supermanzana 15 entre Calle 12 Sur, La Veleta, 77760 Tulum, Q.R., Mexico",
    lat: 20.19156988970712,
    lng: -87.47264740374735,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  },
  {
    name: "Casa Arka - Tulum",
    address: "5GJP+CJ, 77765 Tulum, Q.R., Mexico",
    lat: 20.18100616346909,
    lng: -87.46337273827376,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  },
  {
    name: "Esencia Villas - Tulum",
    address: "6G39+2J, La Veleta, 77762 Tulum, Q.R., Mexico",
    lat: 20.202416352319727,
    lng: -87.48194856663225,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  },
  {
    name: "Amari Tulum",
    address: "XUL KAA - Uptown, 10 Avenida Nte. & Calle Palma, Supermanzana 11, 77762 Tulum, Q.R., Mexico",
    lat: 20.2177592220285,
    lng: -87.48762480959275,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  },
  {
    name: "Hotel Panamera",
    address: "Carr. Tulum-Boca Paila Km 8.5, Tulum Beach, 77760 Tulum, Q.R., Mexico",
    lat: 20.141216454848305,
    lng: -87.46110970340646,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  },
  {
    name: "Soona Luxury Villas",
    address: "Calle 31, C. 19 Colonia Tumben Kaa, 77760 Tulum, Q.R., Mexico",
    lat: 20.214372632378034,
    lng: -87.47289802856616,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  },
  {
    name: "Villa La Semilla",
    address: "Lote 8 Fraccion VI, Bahia Soliman, 77780 Tulum, Q.R., Mexico",
    lat: 20.285120524531926,
    lng: -87.37783114856978,
    zone: "Frecuente",
    price_local: null,
    price_foreign: null,
    type: "frequent"
  }
];

const ORIGIN_COORDS = { lat: 20.2114, lng: -87.4654 };

export default function MapPickerModal({ onClose, onConfirm }) {
  const [query, setQuery] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [suggestions, setSuggestions] = useState(FALLBACK_SUGGESTIONS);
  const [pin, setPin] = useState({ 
    lat: ORIGIN_COORDS.lat, 
    lng: ORIGIN_COORDS.lng, 
    place: FALLBACK_SUGGESTIONS[0] 
  });
  const [mapInstance, setMapInstance] = useState(null);

  React.useEffect(() => {
    if (mapInstance && pin.lat && pin.lng) {
      mapInstance.panTo({ lat: pin.lat, lng: pin.lng });
    }
  }, [pin.lat, pin.lng, mapInstance]);

  React.useEffect(() => {
    fetch('https://onroutemx.com/wp-json/holybakery/v1/map-suggestions')
      .then(res => {
        if (!res.ok) throw new Error("Endpoint no disponible");
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setSuggestions(data);
          setPin({ lat: Number(data[0].lat), lng: Number(data[0].lng), place: data[0] });
        }
      })
      .catch(err => {
        console.warn('Endpoint map-suggestions failed, using fallback mock', err);
      });
  }, []);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '',
    libraries
  });

  const [dynamicSuggestions, setDynamicSuggestions] = useState([]);

  React.useEffect(() => {
    if (!mapInstance || !window.google) return;
    const service = new window.google.maps.places.PlacesService(mapInstance);
    service.nearbySearch({
      location: ORIGIN_COORDS,
      radius: 15000,
      type: ['lodging', 'restaurant', 'establishment'],
      keyword: 'hotel restaurant tulum'
    }, (results, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
        const fetchSuggestions = results.slice(0, 8).map(place => ({
          name: place.name,
          address: place.vicinity,
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
          place_id: place.place_id,
          zone_name: "Detectando...",
          is_out_of_zone: false,
          type: 'nearby'
        }));
        
        const enhanced = fetchSuggestions.map(s => {
          const pt = turf.point([s.lng, s.lat]);
          let detectedZone = "Sin zona";
          let isOutOfZone = true;
          turf.featureEach(mapData, (feature) => {
            if (feature.geometry && feature.geometry.type.includes('Polygon')) {
              if (turf.booleanPointInPolygon(pt, feature)) {
                detectedZone = feature.properties["Nombres de cuadrantes"] || "Zona Detectada";
                isOutOfZone = false;
              }
            }
          });
          s.zone_name = detectedZone;
          s.is_out_of_zone = isOutOfZone;
          return s;
        });

        setDynamicSuggestions(enhanced);
      }
    });
  }, [mapInstance]);

  const allSuggestions = React.useMemo(() => {
    if (dynamicSuggestions.length > 0) {
      const preferenciales = suggestions.filter(s => s.type === 'preferential' || (s.flags && s.flags.includes('preferido')));
      return [...preferenciales, ...dynamicSuggestions];
    }
    return suggestions;
  }, [suggestions, dynamicSuggestions]);

  const filtered = allSuggestions.filter((p) =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) ||
    (p.address && p.address.toLowerCase().includes(query.toLowerCase()))
  );

  const onLoad = React.useCallback(function callback(map) {
    map.data.addGeoJson(mapData);
    map.data.setStyle({
      fillColor: "rgba(22,163,74,0.16)",
      strokeColor: "#16a34a",
      strokeWeight: 2,
      strokeOpacity: 0.8
    });
    setMapInstance(map);
  }, []);

  const onUnmount = React.useCallback(function callback() {
    setMapInstance(null);
  }, []);

  const updatePinFromCoords = async (lat, lng) => {
    const pt = turf.point([lng, lat]);
    let detectedZone = "Sin zona";
    let isOutOfZone = true;
    let local_price = null;
    let foreign_price = null;

    turf.featureEach(mapData, (feature) => {
      if (feature.geometry && feature.geometry.type.includes('Polygon')) {
        if (turf.booleanPointInPolygon(pt, feature)) {
          detectedZone = feature.properties["Nombres de cuadrantes"] || "Zona Detectada";
          isOutOfZone = false;
          
          local_price = feature.properties.price_local !== undefined ? feature.properties.price_local :
                        feature.properties["Precio Local"] !== undefined ? feature.properties["Precio Local"] :
                        feature.properties.local_price !== undefined ? feature.properties.local_price : null;
                        
          foreign_price = feature.properties.price_foreign !== undefined ? feature.properties.price_foreign :
                          feature.properties["Precio Foraneo"] !== undefined ? feature.properties["Precio Foraneo"] :
                          feature.properties["Precio Extranjero"] !== undefined ? feature.properties["Precio Extranjero"] :
                          feature.properties.foreign_price !== undefined ? feature.properties.foreign_price : null;
        }
      }
    });

    setPin({
      lat, lng,
      place: {
        name: "Punto seleccionado en mapa",
        address: "Cargando dirección...",
        zone_name: detectedZone,
        is_out_of_zone: isOutOfZone,
        lat, lng,
        custom: true,
        precios: { local_price, foreign_price }
      }
    });

    if (window.google && window.google.maps) {
      const geocoder = new window.google.maps.Geocoder();
      const geocodePromise = new Promise((resolve) => {
        geocoder.geocode({ location: { lat, lng } }, (results, status) => {
          if (status === "OK" && results[0]) {
            resolve(results[0].formatted_address);
          } else {
            resolve(null);
          }
        });
      });

      const timeoutPromise = new Promise((resolve) => {
        setTimeout(() => resolve(null), 1500);
      });

      const address = await Promise.race([geocodePromise, timeoutPromise]);

      setPin(prev => {
        if (prev.lat !== lat || prev.lng !== lng) return prev;
        return {
          ...prev,
          place: {
            ...prev.place,
            address: address || "Coordenadas capturadas manualmente"
          }
        };
      });
    } else {
      setPin(prev => {
        if (prev.lat !== lat || prev.lng !== lng) return prev;
        return {
          ...prev,
          place: {
            ...prev.place,
            address: "Coordenadas capturadas manualmente"
          }
        };
      });
    }
  };

  const handleMapClick = (e) => {
    if (!e.latLng) return;
    updatePinFromCoords(e.latLng.lat(), e.latLng.lng());
  };

  const handlePlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry && place.geometry.location) {
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        updatePinFromCoords(lat, lng);
        setQuery(place.name || place.formatted_address || "");
      }
    }
  };

  const handlePinDragEnd = (e) => {
    if (!e.latLng) return;
    updatePinFromCoords(e.latLng.lat(), e.latLng.lng());
  };

  const pickSuggestion = (p) => {
    setPin({ lat: p.lat, lng: p.lng, place: p });
    if (mapInstance) {
      mapInstance.panTo({ lat: p.lat, lng: p.lng });
    }
  };

  const currentLat = pin.lat.toFixed(4);
  const currentLng = pin.lng.toFixed(4);
  const pinZone = pin.place.zone || pin.place.zone_name;
  const zoneClass =
    pinZone === "Especial" ? "status-pagada" :
    pinZone === "Frecuente" ? "status-frecuente" :
    pinZone === "Sin zona" || pinZone === "Detectando..." ? "status-pendiente" :
    "status-confirmada";

  return (
    <div className="mp-backdrop" onClick={onClose}>
      <div className="mp-modal" onClick={(e) => e.stopPropagation()}>
        <div className="mp-header">
          <div>
            <h3 className="mp-title">Seleccionar en mapa</h3>
            <p className="mp-sub">Busca un lugar o haz clic para soltar el pin. El sistema detectará la zona automáticamente.</p>
          </div>
          <button className="mp-close" onClick={onClose} aria-label="Cerrar">
            {I.X && <I.X size={18}/>}
          </button>
        </div>

        <div className="mp-body">
          <aside className="mp-side">
            <div className="field">
              {I.Search && <I.Search size={16} className="icon"/>}
              {isLoaded ? (
                <Autocomplete
                  onLoad={setAutocomplete}
                  onPlaceChanged={handlePlaceChanged}
                  bounds={{ north: 21.5, south: 19.8, east: -86.7, west: -87.9 }}
                >
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Hotel, restaurante, dirección…"
                    autoFocus
                  />
                </Autocomplete>
              ) : (
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Hotel, restaurante, dirección…"
                  autoFocus
                />
              )}
            </div>

            <div className="mp-section-label">
              {query ? `${filtered.length} resultado${filtered.length === 1 ? "" : "s"}` : "Sugerencias"}
            </div>

            <div className="mp-list">
              {filtered.length === 0 && (
                <div className="empty">Sin coincidencias en zona operativa.</div>
              )}
              {filtered.map((p) => {
                const isActive = pin.place && pin.place.name === p.name;
                const currentZone = p.zone || p.zone_name;
                const pillCls = currentZone === "Especial" ? "status-pagada"
                              : currentZone === "Frecuente" ? "status-frecuente"
                              : currentZone === "Sin zona" || currentZone === "Detectando..." ? "status-pendiente"
                              : "status-confirmada";
                
                const isPref = p.type === 'preferential' || (p.flags && p.flags.includes('preferido'));
                const isWarn = currentZone === "Sin zona" || (p.flags && p.flags.includes('advertencia'));

                return (
                  <button key={p.name} className={"mp-item " + (isActive ? "active" : "")} onClick={() => pickSuggestion(p)}>
                    <div className="mp-item-icon">
                      {isPref ? (I.Star && <I.Star size={14}/>) : isWarn ? (I.AlertTriangle && <I.AlertTriangle size={14}/>) : ((I.MapPin ? <I.MapPin size={14}/> : (I.Pin && <I.Pin size={14}/>)))}
                    </div>
                    <div className="mp-item-body">
                      <strong>{p.name}</strong>
                      <span>{p.address}</span>
                    </div>
                    <span className={"status " + pillCls}>{p.zone || p.zone_name}</span>
                  </button>
                );
              })}
            </div>

            <div className="mp-tip">
              {I.Info && <I.Info size={14}/>}
              <span>Restricción geográfica: Quintana Roo, Riviera Maya y Yucatán.</span>
            </div>
          </aside>

          <div className="mp-map">
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={ORIGIN_COORDS}
                zoom={13}
                mapTypeId="hybrid"
                options={{
                  disableDefaultUI: false,
                  zoomControl: true,
                  streetViewControl: false,
                  mapTypeControl: false,
                  mapTypeId: "hybrid",
                }}
                onLoad={onLoad}
                onUnmount={onUnmount}
                onClick={handleMapClick}
              >
                {/* Fixed Origin Marker */}
                <MarkerF
                  position={ORIGIN_COORDS}
                  title="Holy Bakery (Origen)"
                  icon={{
                    url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%2316a34a' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3' fill='white'%3E%3C/circle%3E%3C/svg%3E"
                  }}
                />
                
                {/* Dynamic Pin */}
                <MarkerF
                  draggable={true}
                  onDragEnd={handlePinDragEnd}
                  position={{ lat: pin.lat, lng: pin.lng }}
                  title={pin.place.name}
                  animation={window.google.maps.Animation.DROP}
                  zIndex={100}
                  icon={{
                    url: 'data:image/svg+xml;charset=UTF-8,%3Csvg xmlns="http://www.w3.org/2000/svg" width="36" height="44" viewBox="0 0 36 44"%3E%3Ccircle cx="18" cy="40" r="8" fill="rgba(22,163,74,0.4)"/%3E%3Crect x="2" y="2" width="32" height="32" rx="16" ry="16" fill="%230d2618" stroke="white" stroke-width="2"/%3E%3Cpath d="M18 10 C13.6 10 10 13.6 10 18 C10 23.4 18 32 18 32 C18 32 26 23.4 26 18 C26 13.6 22.4 10 18 10Z" fill="white"/%3E%3Ccircle cx="18" cy="18" r="3" fill="%230d2618"/%3E%3C/svg%3E',
                    scaledSize: new window.google.maps.Size(36, 44),
                    anchor: new window.google.maps.Point(18, 44)
                  }}
                />
              </GoogleMap>
            ) : (
              <div className="mp-map-loading">Cargando mapa...</div>
            )}
            
            <div className="mp-hint">{I.Sparkles && <I.Sparkles size={12}/>} Haz clic en el mapa para soltar el pin</div>
          </div>
        </div>

        <div className="mp-foot">
          <div className="mp-foot-pin">
            <div className="mp-foot-pin-dot">{I.Pin && <I.Pin size={14}/>}</div>
            <div className="mp-foot-pin-text">
              <strong>{pin.place.name}</strong>
              <span className="muted">{pin.place.address}</span>
            </div>
          </div>
          <div className="mp-foot-meta">
            <span className={"status " + zoneClass}>{pin.place.zone || pin.place.zone_name}</span>
            <span className="mp-coords">{currentLat}, {currentLng}</span>
          </div>
          <div className="mp-foot-actions">
            <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={() => {
              const mapsLink = pin.place.place_id 
                ? `https://www.google.com/maps/place/?q=place_id:${pin.place.place_id}`
                : `https://www.google.com/maps?q=${pin.lat},${pin.lng}`;
              onConfirm({ ...pin.place, lat: pin.lat, lng: pin.lng, maps_link: mapsLink });
            }}>
              {I.Check && <I.Check size={16}/>} Usar esta ubicación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
