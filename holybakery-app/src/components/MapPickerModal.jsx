import React, { useState } from 'react';
import './MapPickerModal.css';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import mapData from '../map.json';

const I = window.Icons || {};

const RAW_SUGGESTIONS = [
  { name: "Satori Tulum", addr: "Carretera Tulum-Boca Paila Km 7", zone: "Zona 2", x: 70, y: 60 },
  { name: "Casa Banana Restaurante", addr: "Carretera Tulum-Boca Paila Km 8", zone: "Especial", x: 76, y: 68, pref: true },
  { name: "Hotel Be Tulum", addr: "Carretera Boca Paila Km 10", zone: "Especial", x: 82, y: 78, pref: true },
  { name: "Mi Amor Boutique Hotel", addr: "Carretera Tulum-Boca Paila Km 7.5", zone: "Especial", x: 74, y: 64, pref: true },
  { name: "Aldea Zama Lote 14", addr: "Aldea Zama, Tulum", zone: "Zona 3", x: 44, y: 52 },
  { name: "Centro Tulum, Av. Tulum 200", addr: "Centro, Tulum", zone: "Zona 1", x: 32, y: 38 },
  { name: "Hotel Nômade Tulum", addr: "Carretera Tulum-Boca Paila Km 9.5", zone: "Zona 2", x: 80, y: 74 },
  { name: "Akumal Beach Resort", addr: "Akumal, Q. Roo", zone: "Zona 4", x: 60, y: 18 },
  { name: "Playa del Carmen Centro", addr: "Playa del Carmen, Q. Roo", zone: "Zona 5", x: 30, y: 8 },
  { name: "Cenote Calavera", addr: "Carretera Tulum-Cobá Km 2", zone: "Sin zona", x: 22, y: 56, warn: true },
  { name: "Cobá Casitas, casa 4", addr: "Cobá, Q. Roo", zone: "Zona 6", x: 12, y: 26, warn: true },
];

const FALLBACK_SUGGESTIONS = RAW_SUGGESTIONS.map(s => ({
  name: s.name,
  address: s.addr,
  lat: 20.30 - (s.y / 100) * 0.45,
  lng: -87.55 + (s.x / 100) * 0.30,
  zone_name: s.zone,
  precios: { local_price: 0, foreign_price: 0 },
  is_out_of_zone: s.zone === "Sin zona",
  flags: s.pref ? ['preferido'] : s.warn ? ['advertencia'] : []
}));

const ORIGIN_COORDS = { lat: 20.2114, lng: -87.4654 };

export default function MapPickerModal({ onClose, onConfirm }) {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState(FALLBACK_SUGGESTIONS);
  const [pin, setPin] = useState({ 
    lat: FALLBACK_SUGGESTIONS[0].lat, 
    lng: FALLBACK_SUGGESTIONS[0].lng, 
    place: FALLBACK_SUGGESTIONS[0] 
  });
  const [mapInstance, setMapInstance] = useState(null);

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
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || ''
  });

  const filtered = suggestions.filter((p) =>
    !query || p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.address.toLowerCase().includes(query.toLowerCase())
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
    turf.featureEach(mapData, (feature) => {
      if (feature.geometry && feature.geometry.type.includes('Polygon')) {
        if (turf.booleanPointInPolygon(pt, feature)) {
          detectedZone = feature.properties["Nombres de cuadrantes"] || "Zona Detectada";
          isOutOfZone = false;
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
        custom: true
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
  const zoneClass =
    pin.place.zone_name === "Especial" ? "status-pagada" :
    pin.place.zone_name === "Sin zona" ? "status-pendiente" :
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
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Hotel, restaurante, dirección…"
                autoFocus
              />
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
                const pillCls = p.zone_name === "Especial" ? "status-pagada"
                              : p.zone_name === "Sin zona" ? "status-pendiente"
                              : "status-confirmada";
                
                const isPref = p.flags && p.flags.includes('preferido');
                const isWarn = p.flags && p.flags.includes('advertencia');

                return (
                  <button key={p.name} className={"mp-item " + (isActive ? "active" : "")} onClick={() => pickSuggestion(p)}>
                    <div className="mp-item-icon">
                      {isPref ? (I.Star && <I.Star size={14}/>) : isWarn ? (I.AlertTriangle && <I.AlertTriangle size={14}/>) : (I.Pin && <I.Pin size={14}/>)}
                    </div>
                    <div className="mp-item-body">
                      <strong>{p.name}</strong>
                      <span>{p.address}</span>
                    </div>
                    <span className={"status " + pillCls}>{p.zone_name}</span>
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
                  icon={{
                    url: "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='%230c1a12' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z'%3E%3C/path%3E%3Ccircle cx='12' cy='10' r='3' fill='white'%3E%3C/circle%3E%3C/svg%3E"
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
          <div className="mp-foot-info">
            <div className="mp-foot-pin">
              <div className="mp-foot-pin-dot">{I.Pin && <I.Pin size={14}/>}</div>
              <div>
                <strong>{pin.place.name}</strong>
                <span className="muted">{pin.place.address}</span>
              </div>
            </div>
            <div className="mp-foot-meta">
              <span className={"status " + zoneClass}>{pin.place.zone_name}</span>
              <span className="mono mp-coords">{currentLat}, {currentLng}</span>
            </div>
          </div>
          <div className="mp-foot-actions">
            <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
            <button className="btn btn-primary" onClick={() => onConfirm(pin.place)}>
              {I.Check && <I.Check size={16}/>} Usar esta ubicación
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
