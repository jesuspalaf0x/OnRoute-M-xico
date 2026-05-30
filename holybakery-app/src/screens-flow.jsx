// Login + Cotizador + Resultado + Reserva + WhatsApp screens
import React, { useState, useRef, useEffect } from 'react';
import { useJsApiLoader, Autocomplete, GoogleMap, DirectionsRenderer, MarkerF } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import mapData from './map.json';
import pricesData from './data/prices.json';
import MapPickerModal from './components/MapPickerModal';
import InteractiveMap from './components/InteractiveMap';
import { getZoneAndPrice } from './utils/pricing';

const I = window.Icons;
const libraries = ['places'];

/* =============================================================
   WORDPRESS AUTH HELPER
============================================================= */
const wpLogin = async (username, password) => {
  try {
    const response = await fetch("https://onroutemx.com/wp-json/jwt-auth/v1/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();
    if (response.ok) {
      return { success: true, token: data.token, data };
    } else {
      let err = data.message || "Error de autenticación";
      const tmp = document.createElement("DIV");
      tmp.innerHTML = err;
      return { success: false, error: tmp.textContent || tmp.innerText || "" };
    }
  } catch (err) {
    return { success: false, error: "Error de conexión. Verifica tu internet." };
  }
};

/* =============================================================
   LOGIN
============================================================= */
function LoginScreen({ goTo }) {
  const currentEmp = window.MOCK.getCurrentEmployee();
  const [employee, setEmployee] = useState(currentEmp.id);
  const [password, setPassword] = useState("");
  const [showSelect, setShowSelect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectedEmployee = currentEmp;

  const handleLogin = async () => {
    if (!password) {
      setError("Por favor, ingresa la contraseña.");
      return;
    }
    setLoading(true);
    setError(null);
    const res = await wpLogin("Juliana Medina", password);
    setLoading(false);
    if (res.success) {
      sessionStorage.setItem("wp_token", res.token);
      goTo("dashboard");
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="login-frame">
      <aside className="login-aside">
        <div className="badge-row">
          <span className="ba"><I.Cake size={14} /> Holy Bakery Tulum</span>
          <span className="ba"><I.Truck size={14} /> OnRoute México</span>
        </div>

        <div>
          <h1>Cotiza, reserva y entrega <em>en minutos.</em></h1>
          <p>Sistema operativo de entregas para el equipo de Holy Bakery, integrado con la red logística de OnRoute en Tulum y la Riviera Maya.</p>

          <div className="stats">
            <div className="stat"><div className="num">38</div><div className="lbl">Entregas / mes</div></div>
            <div className="stat"><div className="num">5</div><div className="lbl">Zonas activas</div></div>
            <div className="stat"><div className="num">17.50</div><div className="lbl">MXN / USD</div></div>
          </div>
        </div>

        <div className="footnote">v2.0 · holybakery.onroutemx.com</div>
      </aside>

      <div className="login-card card">
        <h2>Inicia turno</h2>
        <p className="small">Acceso compartido del equipo Holy Bakery. Selecciona tu nombre antes de comenzar.</p>

        <div className="stack">
          <div>
            <label className="label">Contraseña Holy Bakery</label>
            <div className="field">
              <I.Lock size={18} className="icon" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <I.Eye size={18} className="right" />
            </div>
          </div>

          {showSelect &&
          <div>
              <label className="label">Empleado en turno</label>
              <div className="field">
                <I.Users size={18} className="icon" />
                <select value={employee} onChange={(e) => setEmployee(Number(e.target.value))}>
                  {window.MOCK.EMPLOYEES.map((e) =>
                <option key={e.id} value={e.id}>{e.name} — {e.role}</option>
                )}
                </select>
                <I.ChevronDown size={16} className="right" />
              </div>
              <div className="warn" style={{ background: "var(--accent-soft)", color: "#0e5a2c" }}>
                <I.Sparkles size={16} />
                <div>
                  <strong>Detectado por horario:</strong> {detectedEmployee?.name} ({detectedEmployee?.shift}). Confirma o cambia.
                </div>
              </div>
            </div>
          }

          {error && (
            <div className="warn" style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: 8, fontSize: 13, border: "1px solid #fecaca" }}>
              <strong>Error:</strong> {error}
            </div>
          )}

          <button className="btn btn-primary btn-lg btn-block" onClick={handleLogin} disabled={loading}>
            {loading ? "Verificando..." : "Iniciar turno"} <I.ArrowRight size={18} />
          </button>

          <div className="help">
            <strong>¿Eres administrador?</strong> Accede al panel maestro en <span className="mono" style={{cursor:"pointer", textDecoration:"underline", color:"var(--accent)"}} onClick={() => goTo("admin-login")}>/admin</span> con tu contraseña independiente.
          </div>
        </div>
      </div>
    </div>);
}

function AdminLoginScreen({ goTo }) {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAdminLogin = async () => {
    if (!password) {
      setError("Por favor, ingresa la contraseña maestra.");
      return;
    }
    setLoading(true);
    setError(null);
    const res = await wpLogin("Jesus Palafox", password);
    setLoading(false);
    if (res.success) {
      sessionStorage.setItem("wp_token_admin", res.token);
      goTo("adm/panel");
    } else {
      setError(res.error);
    }
  };

  return (
    <div className="login-frame" style={{background: "var(--surface-2)"}}>
      <div className="login-card card" style={{margin: "auto"}}>
        <div style={{textAlign: "center", marginBottom: 24}}>
          <div className="badge-row" style={{justifyContent: "center", marginBottom: 16}}>
            <span className="ba"><I.Shield size={14} /> Panel de Administrador</span>
          </div>
          <h2>Acceso OnRoute</h2>
          <p className="small">Solo personal autorizado de administración.</p>
        </div>

        <div className="stack">
          <div>
            <label className="label">Contraseña maestra</label>
            <div className="field">
              <I.Lock size={18} className="icon" />
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" />
            </div>
          </div>

          {error && (
            <div className="warn" style={{ background: "#fef2f2", color: "#991b1b", padding: "10px 14px", borderRadius: 8, fontSize: 13, border: "1px solid #fecaca" }}>
              <strong>Acceso denegado:</strong> {error}
            </div>
          )}

          <button className="btn btn-primary btn-lg btn-block" onClick={handleAdminLogin} disabled={loading}>
            {loading ? "Autenticando..." : "Entrar al Panel"} <I.ArrowRight size={18} />
          </button>
          
          <div className="help" style={{textAlign:"center", marginTop:16}}>
            <button className="btn btn-ghost btn-sm" onClick={() => goTo("login")}><I.ArrowRight size={14} style={{transform: "rotate(180deg)"}}/> Volver al inicio de empleados</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   COTIZADOR
============================================================= */
function CotizadorScreen({ goTo }) {
  const [from, setFrom] = useState("Holy Bakery Tulum");
  const [to, setTo] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // user needs to configure this
    libraries,
  });

  const autocompleteRef = useRef(null);
  const autocompleteInputRef = useRef(null);

  React.useEffect(() => {
    // Forzar que el dropdown tenga el mismo ancho que el input
    const observer = new MutationObserver(() => {
      const pacContainer = document.querySelector('.pac-container');
      const inputEl = autocompleteInputRef.current;
      if (pacContainer && inputEl) {
        const rect = inputEl.getBoundingClientRect();
        pacContainer.style.width = `${rect.width}px`;
        pacContainer.style.left = `${rect.left}px`;
      }
    });
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handlePlaceChanged = () => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      setTo(place.formatted_address || place.name || "");
      setSelectedDestination({
        type: 'places',
        name: place.name || place.formatted_address,
        formatted_address: place.formatted_address || place.name,
        lat: place.geometry?.location?.lat(),
        lng: place.geometry?.location?.lng(),
        place_id: place.place_id,
        url: place.url
      });
    }
  };

  const handleQuote = () => {
    if (!selectedDestination || !selectedDestination.lat || !selectedDestination.lng) {
      alert('Por favor selecciona una ubicación de entrega válida.');
      return;
    }

    let resultState = {
      destinationName: to,
      zoneName: "Fuera de polígonos",
      prices: null,
      lat: selectedDestination.lat,
      lng: selectedDestination.lng,
      place_id: selectedDestination.place_id || null,
      formatted_address: selectedDestination.formatted_address || selectedDestination.address || to,
      maps_link: selectedDestination.maps_link || selectedDestination.url || null,
      is_out_of_zone: true,
    };

    if (selectedDestination.type === 'map') {
      const zoneName = selectedDestination.zone || selectedDestination.zone_name || "Sin zona";
      resultState.destinationName = selectedDestination.name;
      resultState.zoneName = zoneName;
      resultState.is_out_of_zone = selectedDestination.is_out_of_zone || zoneName === "Sin zona";

      if (!resultState.is_out_of_zone) {
        if (selectedDestination.price_local != null || selectedDestination.price_foreign != null) {
          resultState.prices = {
            local_price: selectedDestination.price_local || 0,
            foreign_price: selectedDestination.price_foreign || 0
          };
        } else if (selectedDestination.precios && (selectedDestination.precios.local_price != null || selectedDestination.precios.foreign_price != null)) {
          resultState.prices = {
            local_price: selectedDestination.precios.local_price || 0,
            foreign_price: selectedDestination.precios.foreign_price || 0
          };
        } else {
          const priceObj = pricesData.find(p => p.name.trim().toLowerCase() === zoneName.trim().toLowerCase());
          if (priceObj) resultState.prices = priceObj;
        }
      }
    } else {
      const point = turf.point([selectedDestination.lng, selectedDestination.lat]);
      let matchedZoneName = null;

      for (const feature of mapData.features) {
        if (feature.geometry.type === 'Polygon' || feature.geometry.type === 'MultiPolygon') {
          if (turf.booleanPointInPolygon(point, feature)) {
            matchedZoneName = feature.properties["Nombres de cuadrantes"];
            break;
          }
        }
      }

      if (matchedZoneName) {
        resultState.zoneName = matchedZoneName;
        resultState.is_out_of_zone = false;
        const priceObj = pricesData.find(p => p.name.trim().toLowerCase() === matchedZoneName.trim().toLowerCase());
        if (priceObj) resultState.prices = priceObj;
      }
    }

    goTo("resultado", resultState);
  };

  return (
    <div className="cotizador-page" style={{ background: '#f4f3ef', minHeight: '100vh', paddingTop: '40px' }}>
      <div className="cotizador-grid">
        <div className="cotizador-side">
          <div className="badge-row" style={{ display: "flex", gap: 8 }}>
            <button className="btn" onClick={() => goTo("dashboard")} style={{ background: 'white', border: '1px solid #e5e7eb', borderRadius: '24px', padding: '6px 16px', display: 'flex', alignItems: 'center', gap: '8px', color: '#374151', fontSize: '14px', fontWeight: '500', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' }}><I.ChevronLeft size={16}/> Volver al panel</button>
          </div>
          <div className="badge-row" style={{ display: "flex", gap: 8, marginTop: 24 }}>
            <span style={{ background: '#dcfce7', color: '#166534', padding: '6px 12px', borderRadius: '16px', fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'center', gap: '6px' }}><I.Users size={14} /> Origen fijo - Holy Bakery Tulum</span>
          </div>
          <h1 style={{ textAlign: "left", fontSize: '56px', fontWeight: '700', lineHeight: '1.1', marginTop: '16px', color: '#111827' }}>
            Una entrega,<br/><span style={{ color: "#16a34a", fontStyle: "normal" }}>tres clics.</span>
          </h1>
          <p style={{ textAlign: "left", color: '#6b7280', fontSize: '16px', lineHeight: '1.5', marginTop: '16px', maxWidth: '440px' }}>
            Cotiza al instante usando autocompletado de Google o el pin del mapa. Las tarifas se calculan por zona; las ubicaciones preferenciales aplican automáticamente.
          </p>

          <div className="points" style={{ marginTop: '32px' }}>
            <div className="point card-tight" style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "none" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0fae9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <I.Pin size={20} color="#16a34a" />
                </div>
                <div>
                  <p style={{ fontWeight: '600', margin: 0, color: '#111827', fontSize: '15px', textAlign: 'left' }}>Cobertura</p>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '13px', textAlign: 'left' }}>
                    Tulum · Aldea Zama · Akumal · Puerto Aventuras · Playa del Carmen
                  </p>
                </div>
              </div>
            </div>
            <div className="point card-tight" style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "none" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0fae9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <I.Star size={20} color="#16a34a" />
                </div>
                <div>
                  <p style={{ fontWeight: '600', margin: 0, color: '#111827', fontSize: '15px', textAlign: 'left' }}>Tarifas especiales</p>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '13px', textAlign: 'left' }}>
                    3 ubicaciones preferenciales activas: Casa Banana, Be Tulum, Mi Amor.
                  </p>
                </div>
              </div>
            </div>
            <div className="point card-tight" style={{ background: "white", borderRadius: "16px", padding: "16px", marginBottom: "12px", boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "none" }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#e0fae9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <I.RefreshCcw size={20} color="#16a34a" />
                </div>
                <div>
                  <p style={{ fontWeight: '600', margin: 0, color: '#111827', fontSize: '15px', textAlign: 'left' }}>Tipo de cambio</p>
                  <p style={{ color: '#6b7280', margin: 0, fontSize: '13px', textAlign: 'left' }}>
                    $17.50 MXN/USD · actualizado por OnRoute hoy 9:14 a.m.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="quote-card" style={{ background: 'white', padding: '32px', borderRadius: '24px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', border: 'none' }}>
          <div className="stack">
            <div>
              <label className="label" style={{ fontSize: '12px', letterSpacing: '1px', color: '#9ca3af', fontWeight: '600' }}>DESDE</label>
              <div className="field" style={{ borderRadius: '12px', border: '1px solid #e5e7eb', padding: '12px 16px' }}>
                <I.Send size={18} color="#16a34a" className="icon" />
                <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Hotel, Airbnb, Aeropuerto…" style={{ fontWeight: '500' }} />
              </div>
            </div>
            <div>
              <label className="label" style={{ fontSize: '12px', letterSpacing: '1px', color: '#9ca3af', fontWeight: '600' }}>HACIA</label>
              <div className="field hacia-field-container" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0 14px', width: '100%', overflow: 'hidden', borderRadius: '12px', border: '1px solid #e5e7eb', height: '48px', boxSizing: 'border-box' }}>
                <div className="hacia-icon-left" style={{ flexShrink: 0, color: '#16a34a', display: 'flex', alignItems: 'center' }}>
                  <I.Pin size={18} color="#16a34a" />
                </div>
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                    onPlaceChanged={handlePlaceChanged}
                    options={{ componentRestrictions: { country: "mx" } }}
                    style={{ flex: 1, minWidth: 0, display: 'flex' }}
                  >
                    <input
                      ref={autocompleteInputRef}
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Hotel en Tulum, Playa del Carmen…"
                      className="hacia-input"
                      style={{ 
                        flex: 1,
                        minWidth: 0,
                        width: '100%',
                        border: 'none',
                        outline: 'none',
                        background: 'transparent',
                        fontSize: '14px',
                        color: '#0c1a12',
                        fontWeight: '500'
                      }}
                    />
                  </Autocomplete>
                ) : (
                  <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Cargando mapa..." style={{ flex: 1, minWidth: 0, width: '100%', border: 'none', outline: 'none', background: 'transparent', fontWeight: '500' }} />
                )}
                <button type="button" className="btn btn-soft btn-sm hacia-mapa-btn" title="Soltar pin en mapa" style={{ flexShrink: 0, marginLeft: 'auto', background: '#f3f4f6', color: '#374151', border: 'none', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', fontWeight: '500' }} onClick={() => setIsMapModalOpen(true)}>
                  <I.Map size={14} /> Mapa
                </button>
              </div>
            </div>

            <button className="btn btn-primary btn-lg btn-block" onClick={handleQuote} style={{ background: '#0d2618', borderRadius: '12px', padding: '16px', fontWeight: '600', fontSize: '16px', marginTop: '8px' }}>
              Cotizar ahora <I.ArrowRight size={18} />
            </button>
            
            <div style={{ background: '#f3f4f6', borderRadius: '16px', overflow: 'hidden', marginTop: '16px', height: '180px', position: 'relative' }}>
              <div className="map-canvas" style={{ width: '100%', height: '100%', borderRadius: 0, border: 'none', padding: 0 }}>
                <svg viewBox="0 0 460 460" preserveAspectRatio="xMidYMid slice" style={{ width: '100%', height: '100%', display: 'block' }}>
                  <path d="M 40 120 Q 130 60 230 80 Q 330 100 380 180 Q 360 260 280 280 Q 180 290 100 240 Q 30 200 40 120 Z" fill="rgba(22,163,74,0.10)" stroke="rgba(22,163,74,0.4)" strokeDasharray="4 4" />
                  <path d="M 200 250 Q 290 230 360 280 Q 380 360 300 380 Q 220 380 200 320 Z" fill="rgba(37,99,235,0.08)" stroke="rgba(37,99,235,0.4)" strokeDasharray="4 4" />
                  <path d="M 130 160 C 200 200, 240 240, 320 320" fill="none" stroke="#0d2618" strokeWidth="2.5" strokeDasharray="6 5" />
                  <g transform="translate(120, 150)">
                    <circle r="22" fill="rgba(22,163,74,0.18)" />
                    <circle r="11" fill="#16a34a" stroke="white" strokeWidth="3" />
                  </g>
                  <g transform="translate(330, 330)">
                    <circle r="22" fill="rgba(13,38,24,0.16)" />
                    <path d="M 0 -16 C -10 -16 -16 -10 -16 0 C -16 8 -8 14 0 22 C 8 14 16 8 16 0 C 16 -10 10 -16 0 -16 Z" fill="#0d2618" />
                    <circle r="5" fill="white" />
                  </g>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isMapModalOpen && (
        <MapPickerModal
          onClose={() => setIsMapModalOpen(false)}
          onConfirm={(placeObj) => {
            setTo(`${placeObj.name}, ${placeObj.address}`);
            setSelectedDestination({
              type: 'map',
              ...placeObj
            });
            setIsMapModalOpen(false);
          }}
        />
      )}
    </div>);

}

/* =============================================================
   RESULTADO COTIZACIÓN
============================================================= */

const HOLY_BAKERY_ORIGIN = {
  lat: 20.199855674419318,
  lng: -87.46304053252388,
  name: 'Holy Bakery Tulum'
};

function ResultadoMapa({ origin, destination }) {
  const [directions, setDirections] = useState(null);
  const [routeInfo, setRouteInfo] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "",
    libraries
  });

  useEffect(() => {
    if (!isLoaded || !origin || !destination) return;
    if (!origin.lat || !destination.lat) return;

    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route({
      origin: { lat: origin.lat, lng: origin.lng },
      destination: { lat: destination.lat, lng: destination.lng },
      travelMode: window.google.maps.TravelMode.DRIVING,
      region: 'MX'
    }, (result, status) => {
      if (status === 'OK') {
        setDirections(result);
        const leg = result.routes[0].legs[0];
        setRouteInfo({
          distance: leg.distance.text,
          duration: leg.duration.text
        });
      }
    });
  }, [isLoaded, origin, destination]);

  if (!isLoaded) return <div className="mapa-loading">Cargando mapa...</div>;

  return (
    <div className="resultado-mapa-container">
      {routeInfo && (
        <div className="ruta-info-badge">
          <span className="ruta-distancia">{routeInfo.distance}</span>
          <span className="ruta-separador">·</span>
          <span className="ruta-duracion">{routeInfo.duration}</span>
        </div>
      )}

      <GoogleMap
        mapContainerStyle={{ width: '100%', height: '100%' }}
        zoom={13}
        center={origin}
        mapTypeId="roadmap"
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
          gestureHandling: 'none',
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
            { featureType: 'transit', stylers: [{ visibility: 'off' }] }
          ]
        }}
      >
        <MarkerF 
          position={origin} 
          label={{ text: 'A', color: '#fff', fontSize: '11px', fontWeight: '700' }} 
          icon={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#16a34a', fillOpacity: 1, strokeColor: '#ffffff', strokeWeight: 2 }} 
        />
        {destination && destination.lat && (
          <MarkerF 
            position={destination} 
            label={{ text: 'B', color: '#fff', fontSize: '11px', fontWeight: '700' }} 
            icon={{ path: window.google.maps.SymbolPath.CIRCLE, scale: 8, fillColor: '#0d2618', fillOpacity: 1, strokeColor: '#ffffff', strokeWeight: 2 }} 
          />
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              suppressMarkers: true,
              polylineOptions: {
                strokeColor: '#16a34a',
                strokeWeight: 4,
                strokeOpacity: 0.8
              }
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}

function ResultadoScreen({ goTo, quoteData }) {
  const { destinationName, zoneName, prices, lat, lng, place_id, formatted_address, maps_link, is_out_of_zone } = quoteData || {
    destinationName: "No seleccionado",
    zoneName: "Fuera de polígonos",
    prices: null,
    lat: 0,
    lng: 0,
    place_id: null,
    formatted_address: null,
    maps_link: null,
    is_out_of_zone: true
  };

  const isOutOfZone = is_out_of_zone || zoneName === "Sin zona" || zoneName === "Fuera de polígonos";

  const localPrice = prices ? prices.local_price : 0;
  const foreignPrice = prices ? prices.foreign_price : 0;
  const usdPrice = foreignPrice ? (foreignPrice / 17.50).toFixed(2) : 0;

  const handleSaveDraft = () => {
    try {
      const drafts = JSON.parse(localStorage.getItem('holy_drafts') || '[]');
      const newId = `BRR-${String(drafts.length + 1).padStart(3, '0')}`;
      const draftData = {
        id: newId,
        status: "borrador",
        destinationName: destinationName.split(',')[0],
        zoneName,
        cost: foreignPrice,
        employee_name: window.MOCK.getCurrentEmployee().name,
        created_at: new Date().toISOString(),
        quoteData: {
          destinationName,
          zoneName,
          prices,
          lat,
          lng,
          place_id,
          formatted_address,
          maps_link,
          is_out_of_zone
        }
      };
      
      drafts.unshift(draftData);
      localStorage.setItem('holy_drafts', JSON.stringify(drafts));
      goTo("dashboard");
    } catch(e) {
      console.error("Error saving draft:", e);
      goTo("dashboard");
    }
  };

  return (
    <div className="cotizador-page">
      <div className="result-grid">
        <div className="card card-pad">
          <div className="resultado-header">
            <span className="zone-chip resultado-zona-pill">{zoneName}</span>
            <h1 className="resultado-titulo">{destinationName.split(',')[0]}</h1>
            <p className="resultado-direccion">{formatted_address || destinationName}</p>
            <button className="resultado-editar-link" onClick={() => goTo("cotizador")}>
              ← Cambiar ubicación
            </button>
          </div>

          <div className="row row-2" style={{ marginBottom: 16 }}>
            <div className="card-tight" style={{ background: "var(--surface-2)", borderRadius: 12 }}>
              <div className="muted" style={{ fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>Origen</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}><I.Cake size={14} /> Holy Bakery Tulum</div>
              <div className="mono muted" style={{ fontSize: 11.5, marginTop: 4 }}>20.1998, -87.4630</div>
            </div>
            <div className="card-tight" style={{ background: "var(--surface-2)", borderRadius: 12 }}>
              <div className="muted" style={{ fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>Destino</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}><I.Pin size={14} /> {destinationName.split(',')[0]}</div>
              <div className="mono muted" style={{ fontSize: 11.5, marginTop: 4 }}>{lat ? lat.toFixed(4) : "0.0000"}, {lng ? lng.toFixed(4) : "0.0000"}</div>
            </div>
          </div>

          <div>
            {!isOutOfZone && prices ? (
              <>
                <div className="price-row">
                  <span className="lbl">Tarifa local / preferencial</span>
                  <span className="val">${localPrice.toFixed(2)} MXN</span>
                </div>
                <div className="price-row featured">
                  <span className="lbl"><strong style={{ color: "var(--ink)" }}>Tarifa extranjero</strong> · seleccionada por defecto</span>
                  <span className="val">${foreignPrice.toFixed(2)} MXN</span>
                </div>
                <div className="price-row">
                  <span className="lbl">Equivalente USD</span>
                  <span className="val muted" style={{ fontSize: 14, fontWeight: 600 }}>~${usdPrice} USD</span>
                </div>
              </>
            ) : (
              <div className="price-row featured" style={{ background: "var(--accent-soft)" }}>
                <span className="lbl"><strong style={{ color: "var(--accent)" }}>Fuera de polígonos</strong></span>
                <span className="val" style={{ color: "var(--accent)" }}>Consultar tarifa</span>
              </div>
            )}
          </div>

          <div className="flex" style={{ gap: 12, marginTop: 18 }}>
            <button className="btn btn-soft" style={{ flex: 1 }} onClick={handleSaveDraft}>
              <I.Bookmark size={16} /> Guardar cotización
            </button>
            {isOutOfZone ? (
              <button
                className="btn btn-primary"
                style={{ flex: 2, background: "var(--accent)", color: "white" }}
                onClick={() => {
                  const placeName = destinationName.split(',')[0];
                  const message = `Hola administrador, necesito consultar la tarifa para entregar en: ${placeName}`;
                  const waUrl = `https://wa.me/529841068542?text=${encodeURIComponent(message)}`;
                  window.open(waUrl, "_blank");
                }}
              >
                Consultar tarifa con administrador <I.ExternalLink size={16} style={{ marginLeft: 6 }} />
              </button>
            ) : (
              <button className="btn btn-primary" style={{ flex: 2 }} onClick={() => goTo("reserva")}>
                Reservar entrega <I.ArrowRight size={16} />
              </button>
            )}
          </div>

          <div className="divider"></div>

          <div className="flex" style={{ gap: 14, alignItems: "flex-start" }}>
            <I.Info size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
            <div style={{ fontSize: 12.5, color: "var(--muted)" }}>
              ¿La ubicación cae fuera de polígonos? El sistema mostrará&nbsp;
              <span className="kbd">Consultar tarifa con admin</span> que abre WhatsApp prellenado a +52 984 106 8542.
            </div>
          </div>
        </div>

        <div className="map-card" style={{ padding: 0 }}>
          <ResultadoMapa 
            origin={HOLY_BAKERY_ORIGIN} 
            destination={{ lat, lng }} 
          />
        </div>
      </div>
    </div>);

}

/* =============================================================
   RESERVATION FORM
============================================================= */
function ReservaScreen({ goTo, quoteData }) {
  const { destinationName, zoneName, prices, lat, lng, place_id, formatted_address, maps_link } = quoteData || {
    destinationName: "Satori Tulum, Carretera Tulum-Boca Paila Km 7",
    zoneName: "Zona 2 · Hotelera Tulum",
    prices: { local_price: 200, foreign_price: 280 },
    lat: 0,
    lng: 0,
    place_id: null,
    formatted_address: null,
    maps_link: null
  };

  const localPrice = prices ? prices.local_price : 0;
  const foreignPrice = prices ? prices.foreign_price : 0;

  const currentEmp = window.MOCK.getCurrentEmployee();
  const [employee, setEmployee] = useState(currentEmp.id);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState("18:15");
  const [costType, setCostType] = useState("foreign");
  const [costCustom, setCostCustom] = useState("");
  const [client, setClient] = useState("");
  const [phone, setPhone] = useState("");
  const [phone2, setPhone2] = useState("");
  const [comments, setComments] = useState("");
  const [files, setFiles] = useState([]);

  const formatTo12h = (time24) => {
    if (!time24) return '';
    const [hours, minutes] = time24.split(':');
    const h = parseInt(hours);
    const ampm = h >= 12 ? 'p.m.' : 'a.m.';
    const h12 = h % 12 || 12;
    return `${h12}:${minutes} ${ampm}`;
  };

  const handleFileChange = (e) => {
    const selected = Array.from(e.target.files);
    if (files.length + selected.length > 3) {
      alert("Máximo 3 archivos permitidos.");
      return;
    }
    const validFiles = selected.filter(f => {
      if (f.size > 5 * 1024 * 1024) {
        alert(`El archivo ${f.name} supera los 5MB.`);
        return false;
      }
      if (!['image/jpeg', 'image/png', 'application/pdf'].includes(f.type)) {
        alert(`El archivo ${f.name} no tiene un formato válido (JPG, PNG, PDF).`);
        return false;
      }
      return true;
    });
    setFiles([...files, ...validFiles]);
  };

  const removeFile = (index) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const analyzePhone = (val) => {
    if (!val || !val.trim()) return { empty: true, missingCode: false, valid: false };
    const cleaned = val.replace(/[\s\-()]/g, "");
    const hasCode = cleaned.startsWith("+") || cleaned.startsWith("00");
    const digits = cleaned.replace(/\D/g, "");
    const validLen = digits.length >= 10 && digits.length <= 15;
    return {
      empty: false,
      missingCode: !hasCode && digits.length > 0,
      valid: hasCode && validLen,
    };
  };

  const p1 = analyzePhone(phone);
  const p2 = analyzePhone(phone2);

  const normalizeToE164 = (val) => {
    if (!val) return "";
    let cleaned = val.trim().replace(/[\s\-()]/g, "");
    if (cleaned.startsWith("00")) {
      cleaned = "+" + cleaned.substring(2);
    }
    let digits = cleaned.replace(/\D/g, "");
    if (cleaned.startsWith("+")) {
      return "+" + digits;
    }
    return digits;
  };

  const cost = costType === "foreign" ? foreignPrice : costType === "local" ? localPrice : Number(costCustom) || 0;

  return (
    <div className="cotizador-page">
      <div className="reserva-grid">
        <div className="stack">
          <button className="volver-link" onClick={() => goTo("resultado", quoteData)}>
            ← Volver al resultado
          </button>

          <div className="section-card">
            <div className="flex-between" style={{ marginBottom: 18 }}>
              <div>
                <h3>Detalles de la entrega</h3>
                <p className="desc">Confirma quién, cuándo y a dónde.</p>
              </div>
              <span className="zone-chip">Borrador · sin ID asignado</span>
            </div>

            <div className="stack">
              <div className="row row-2">
                <div>
                  <label className="label">Empleado que reserva</label>
                  <div className="field">
                    <I.Users size={18} className="icon" />
                    <select value={employee} onChange={(e) => setEmployee(Number(e.target.value))}>
                      {window.MOCK.EMPLOYEES.map((e) => <option key={e.id} value={e.id}>{e.name}</option>)}
                    </select>
                    <I.ChevronDown size={16} className="right" />
                  </div>
                </div>
                <div>
                  <label className="label">Zona origen</label>
                  <div className="field" style={{ background: "var(--surface-2)" }}>
                    <I.Cake size={18} className="icon" />
                    <input value="Holy Bakery Tulum" readOnly />
                    <span className="tag">Fijo</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="label">Zona destino</label>
                <div className="field">
                  <I.Pin size={18} className="icon" />
                  <input defaultValue={destinationName} />
                  <span className="zone-chip">{zoneName}</span>
                </div>
              </div>

              <div className="row row-2">
                <div>
                  <label className="label">Fecha de entrega</label>
                  <div className="field custom-picker-wrapper">
                    <I.Calendar size={18} className="icon" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} min={new Date().toISOString().split('T')[0]} className="custom-picker" />
                    <I.ChevronDown size={16} className="right-icon" />
                  </div>
                </div>
                <div>
                  <label className="label">Hora</label>
                  <div className="field custom-picker-wrapper">
                    <I.Clock size={18} className="icon" />
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="custom-picker" />
                    <span className="muted" style={{ fontSize: 12, minWidth: '60px', textAlign: 'right' }}>{formatTo12h(time)}</span>
                    <I.ChevronDown size={16} className="right-icon" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="section-card">
            <div className="flex-between" style={{ marginBottom: 14 }}>
              <div>
                <h3>Costo de entrega</h3>
                <p className="desc">El extranjero queda preseleccionado por política. El admin debe aprobar cambios.</p>
              </div>
              <div className="mono" style={{ fontSize: 22, fontWeight: 800 }}>${cost.toFixed(2)} <span className="muted" style={{ fontSize: 13 }}>MXN</span></div>
            </div>
            <div className="tabs" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
              <button className={costType === "foreign" ? "active" : ""} onClick={() => setCostType("foreign")}>Extranjero · ${foreignPrice}</button>
              <button className={costType === "local" ? "active" : ""} onClick={() => setCostType("local")}>Local · ${localPrice}</button>
              <button className={costType === "custom" ? "active" : ""} onClick={() => setCostType("custom")}>Manual</button>
            </div>
            {costType === "custom" &&
            <div style={{ marginTop: 12 }}>
                <div className="field">
                  <I.DollarSign size={18} className="icon" />
                  <input type="number" placeholder="Monto en MXN" value={costCustom} onChange={(e) => setCostCustom(e.target.value)} />
                </div>
              </div>
            }
          </div>

          <div className="section-card">
            <h3>Datos del cliente</h3>
            <p className="desc">Solo el teléfono principal es obligatorio.</p>

            <div className="stack">
              <div>
                <label className="label">Nombre del cliente</label>
                <div className="field">
                  <I.Users size={18} className="icon" />
                  <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Ej. Miranda Reyes" className="campo-input" />
                </div>
              </div>
              <div className="row row-2">
                <div>
                  <label className="label">Teléfono principal</label>
                  <div className="field">
                    <I.Phone size={18} className="icon" />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => setPhone(normalizeToE164(phone))} placeholder="Ej. +1 881 123 4567" className="campo-input" />
                    {p1.valid && <I.Check size={16} style={{ color: "var(--accent)" }} />}
                  </div>
                  {p1.missingCode && (
                    <div className="warn" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <I.AlertTriangle size={14} style={{ marginTop: 2 }} />
                        <div>⚠️ ¿Incluiste el código de país? Ej: <span className="mono">+1</span> para EE.UU., <span className="mono">+52</span> para México</div>
                      </div>
                      <div className="flex" style={{ gap: 8, paddingLeft: 22 }}>
                        <button className="btn btn-soft btn-sm" onClick={() => setPhone("+52 " + phone)}>+52 (MX)</button>
                        <button className="btn btn-soft btn-sm" onClick={() => setPhone("+1 " + phone)}>+1 (US)</button>
                      </div>
                    </div>
                  )}
                  {!p1.empty && !p1.missingCode && !p1.valid && (
                    <div className="warn"><I.AlertTriangle size={14} style={{ marginTop: 2 }} /><div>El teléfono debe tener entre 10 y 15 dígitos.</div></div>
                  )}
                </div>
                <div>
                  <label className="label">Teléfono secundario</label>
                  <div className="field">
                    <I.Phone size={18} className="icon" />
                    <input value={phone2} onChange={(e) => setPhone2(e.target.value)} onBlur={() => setPhone2(normalizeToE164(phone2))} placeholder="Opcional" className="campo-input" />
                    {p2.valid && <I.Check size={16} style={{ color: "var(--accent)" }} />}
                  </div>
                  {p2.missingCode && (
                    <div className="warn" style={{ flexDirection: "column", alignItems: "flex-start", gap: 8 }}>
                      <div style={{ display: "flex", gap: 8 }}>
                        <I.AlertTriangle size={14} style={{ marginTop: 2 }} />
                        <div>⚠️ ¿Incluiste el código de país? Ej: <span className="mono">+1</span> para EE.UU., <span className="mono">+52</span> para México</div>
                      </div>
                      <div className="flex" style={{ gap: 8, paddingLeft: 22 }}>
                        <button className="btn btn-soft btn-sm" onClick={() => setPhone2("+52 " + phone2)}>+52 (MX)</button>
                        <button className="btn btn-soft btn-sm" onClick={() => setPhone2("+1 " + phone2)}>+1 (US)</button>
                      </div>
                    </div>
                  )}
                  {!p2.empty && !p2.missingCode && !p2.valid && (
                    <div className="warn"><I.AlertTriangle size={14} style={{ marginTop: 2 }} /><div>El teléfono debe tener entre 10 y 15 dígitos.</div></div>
                  )}
                </div>
              </div>
              <div>
                <label className="label">Comentarios e instrucciones</label>
                <textarea 
                  className="campo-textarea"
                  value={comments} 
                  onChange={(e) => setComments(e.target.value)} 
                  rows={4} 
                  placeholder="Ej. Cobrar $250.00 pesos pendientes de abonar, el cliente pagará el delivery." 
                />
                <div className="adjuntos-area" style={{ marginTop: 16 }}>
                  <div className="adjuntos-info">
                    <I.Paperclip size={18} className="adjuntos-icono" />
                    <div>
                      <p className="adjuntos-texto-titulo">Adjuntar imágenes o PDFs</p>
                      <p className="adjuntos-texto-sub">Hasta 3 archivos · 5 MB c/u · JPG, PNG, PDF</p>
                    </div>
                  </div>
                  {files.length < 3 && (
                    <label className="btn btn-soft btn-sm" style={{cursor: "pointer", margin: 0}}>
                      <I.Plus size={12} /> Subir
                      <input type="file" multiple accept="image/jpeg,image/png,application/pdf" style={{display: "none"}} onChange={handleFileChange} />
                    </label>
                  )}
                </div>
                {files.length > 0 && (
                  <div className="files" style={{display: "flex", gap: "8px", flexWrap: "wrap", marginTop: "-6px"}}>
                    {files.map((f, i) => (
                      <span key={i} className="adjunto-chip">
                        <I.Image size={12} /> {f.name}
                        <button type="button" className="lnk" onClick={() => removeFile(i)} style={{ marginLeft: 4 }}>✕</button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex" style={{ gap: 12 }}>
            <button className="btn btn-soft" style={{ flex: 1 }} onClick={async () => {
              const token = sessionStorage.getItem("wp_token");
              const draftData = {
                status: "borrador",
                destinationName,
                destination_name: destinationName,
                zoneName,
                place_id,
                latitude: lat,
                longitude: lng,
                formatted_address,
                maps_link,
                cost,
                date,
                delivery_date: date,
                time,
                delivery_time: time,
                client,
                client_name: client,
                phone: normalizeToE164(phone),
                client_phone: normalizeToE164(phone),
                phone2: normalizeToE164(phone2),
                client_phone2: normalizeToE164(phone2),
                // comments merged below
                employee_id: employee,
                employee: window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez",
                employee_name: window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez",
                comments: comments ? `${comments} | EMP_NAME: ${window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez"}` : `| EMP_NAME: ${window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez"}`,
                zone_id: window.MOCK.ZONES.find(z => z.name === zoneName)?.id || 1
              };

              try {
                const res = await fetch("https://onroutemx.com/wp-json/hb/v1/deliveries", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                  },
                  body: JSON.stringify(draftData)
                });
                if (res.ok) {
                  let data = {};
                  try { data = await res.json(); } catch(e) {}
                  const newId = data.id || data.post_id || "43";
                  
                  if (files.length > 0) {
                    const formData = new FormData();
                    files.forEach(f => formData.append('files[]', f));
                    try {
                      await fetch(`https://onroutemx.com/wp-json/hb/v1/deliveries/${newId}/upload`, {
                        method: 'POST',
                        headers: { "Authorization": token ? `Bearer ${token}` : "" },
                        body: formData
                      });
                    } catch(err) { console.error("Upload error", err); }
                  }
                  goTo("dashboard");
                } else {
                  console.warn("API Error, navigating anyway for prototype demo");
                  goTo("dashboard");
                }
              } catch(e) {
                console.error("Network error saving draft:", e);
                goTo("dashboard");
              }
            }}>
              <I.Save size={16} /> Guardar para después
            </button>
            <button className="btn btn-primary" style={{ flex: 2 }} onClick={async () => {
              const token = sessionStorage.getItem("wp_token");
              const draftData = {
                status: "pendiente_envio",
                destinationName,
                destination_name: destinationName,
                zoneName,
                place_id,
                latitude: lat,
                longitude: lng,
                formatted_address,
                maps_link,
                cost,
                date,
                delivery_date: date,
                time,
                delivery_time: time,
                client,
                client_name: client,
                phone: normalizeToE164(phone),
                client_phone: normalizeToE164(phone),
                phone2: normalizeToE164(phone2),
                client_phone2: normalizeToE164(phone2),
                // comments merged below
                employee_id: employee,
                employee: window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez",
                employee_name: window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez",
                comments: comments ? `${comments} | EMP_NAME: ${window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez"}` : `| EMP_NAME: ${window.MOCK.EMPLOYEES.find(e => e.id === employee)?.name || "Diana Domínguez"}`,
                zone_id: window.MOCK.ZONES.find(z => z.name === zoneName)?.id || 1
              };

              try {
                const res = await fetch("https://onroutemx.com/wp-json/hb/v1/deliveries", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    "Authorization": token ? `Bearer ${token}` : ""
                  },
                  body: JSON.stringify(draftData)
                });
                let newId = "43"; // fallback numeric id
                if (res.ok) {
                  const data = await res.json();
                  newId = data.id || data.post_id || newId;
                  
                  if (files.length > 0) {
                    const formData = new FormData();
                    files.forEach(f => formData.append('files[]', f));
                    try {
                      await fetch(`https://onroutemx.com/wp-json/hb/v1/deliveries/${newId}/upload`, {
                        method: 'POST',
                        headers: { "Authorization": token ? `Bearer ${token}` : "" },
                        body: formData
                      });
                    } catch(err) { console.error("Upload error", err); }
                  }
                } else {
                  console.warn("API Error, navigating anyway for prototype demo");
                }
                goTo("whatsapp", { ...draftData, id: `DLV-0${newId}` });
              } catch(e) {
                console.error("Network error saving draft:", e);
                goTo("whatsapp", { ...draftData, id: "DLV-043" });
              }
            }}>
              Crear reservación ahora <I.ArrowRight size={16} />
            </button>
          </div>
        </div>

        <aside className="stack" style={{ alignContent: 'start', marginTop: 38 }}>
          <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
              <h3>Resumen de la reserva</h3>
              <p className="desc" style={{ marginTop: 2 }}>Lo que verá el admin por WhatsApp.</p>
            </div>
            <div className="stack" style={{ gap: 0, padding: "10px 22px 22px" }}>
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Origen</span>
                <span style={{ fontWeight: 700 }}>Holy Bakery Tulum</span>
              </div>
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Destino</span>
                <span style={{ fontWeight: 700 }}>{destinationName.split(',')[0]}</span>
              </div>
              {lat && lng && (
                <div className="price-row" style={{ padding: "10px 0" }}>
                  <span className="lbl">Coordenadas</span>
                  <span className="mono muted" style={{ fontSize: 13, fontWeight: 600 }}>{lat.toFixed(4)}, {lng.toFixed(4)}</span>
                </div>
              )}
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Cuándo</span>
                <span style={{ fontWeight: 700 }}>
                  {date ? new Date(date + 'T12:00:00').toLocaleDateString('es-ES', { weekday: 'short', day: 'numeric', month: 'short' }) : 'Sin fecha'} · {time ? formatTo12h(time) : 'Sin hora'}
                </span>
              </div>
              <div className="price-row" style={{ padding: "16px 0 10px", marginTop: 10, borderTop: "1px dashed var(--line)" }}>
                <span className="lbl" style={{ fontSize: 13 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, color: "var(--accent)" }}>${cost.toFixed(2)} MXN</span>
              </div>
              {cost > 0 && (
                <div className="price-row" style={{ padding: "10px 0" }}>
                  <span className="lbl">Equivalente</span>
                  <span style={{ fontWeight: 700, opacity: 0.6 }}>~${(cost / 17.5).toFixed(2)} USD</span>
                </div>
              )}
              {client && (
                <div className="price-row" style={{ padding: "10px 0" }}>
                  <span className="lbl">Cliente</span>
                  <span style={{ fontWeight: 700 }}>{client}</span>
                </div>
              )}
              {phone && (
                <div className="price-row" style={{ padding: "10px 0" }}>
                  <span className="lbl">Teléfono</span>
                  <span style={{ fontWeight: 700 }}>{phone}</span>
                </div>
              )}
              {phone2 && (
                <div className="price-row" style={{ padding: "10px 0" }}>
                  <span className="lbl">Tel. secundario</span>
                  <span style={{ fontWeight: 700 }}>{phone2}</span>
                </div>
              )}
              {comments && (
                <div className="price-row" style={{ padding: "10px 0" }}>
                  <span className="lbl">Comentarios</span>
                  <span style={{ fontWeight: 700, maxWidth: 180, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{comments}</span>
                </div>
              )}
            </div>
          </div>
          
          <div className="section-card" style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)", textAlign: "left" }}>
            <div className="flex" style={{ gap: 10, alignItems: "flex-start", justifyContent: "flex-start" }}>
              <I.Shield size={18} style={{ color: "var(--accent)", flexShrink: 0, marginTop: 2 }} />
              <div>
                <strong style={{ color: "var(--accent)" }}>Bloqueo automático</strong>
                <div style={{ fontSize: 12.5, color: "#0e5a2c", marginTop: 4 }}>
                  Una vez creada, el costo no podrá editarse. Solicita cambio al admin desde el historial.
                </div>
              </div>
            </div>
          </div>

          <div className="banner-prellenado" style={{ marginTop: 0 }}>
            <I.Info size={16} className="banner-prellenado-icon" />
            <div className="banner-prellenado-texto">Datos prellenados desde la cotización <strong>{destinationName.split(',')[0]}</strong> · {zoneName} · ${cost.toFixed(2)} MXN extranjero.</div>
          </div>
        </aside>
      </div>
    </div>);

}

/* =============================================================
   WHATSAPP CONFIRM
============================================================= */
function WhatsAppScreen({ goTo, quoteData }) {
  const { destinationName, lat, lng, phone, phone2, date, time, client, comments, cost, id, maps_link } = quoteData || {};
  const shortDest = destinationName ? destinationName.split(',')[0] : "No seleccionado";
  const mapsLink = maps_link || (lat && lng ? `https://www.google.com/maps?q=${lat},${lng}` : "Enlace no disponible");

  let dateStr = "Fecha no seleccionada";
  let timeStr = time ? time : "hora no seleccionada";
  if (date) {
    const d = new Date(date + "T" + (time || "00:00"));
    const formatOptions = { weekday: 'long', day: 'numeric', month: 'long' };
    dateStr = d.toLocaleDateString('es-ES', formatOptions).replace(/^\w/, c => c.toUpperCase());
    if (time) {
      timeStr = d.toLocaleTimeString('es-ES', { hour: 'numeric', minute: '2-digit', hour12: true });
    }
  }

  const costDisplay = cost !== undefined ? cost.toFixed(2) : "0.00";
  const clientDisplay = client || "No proporcionado";
  const phoneDisplay = phone || "No proporcionado";
  const phone2Display = phone2 || "No proporcionado";
  const commentsDisplay = comments || "Ninguno";

  const msg = `*Reserva de servicio*
${dateStr} a las ${timeStr}
Entrega en: ${shortDest}
${mapsLink}
Costo: $${costDisplay} pesos.
Nombre del cliente: ${clientDisplay}
Número de teléfono: ${phoneDisplay}
Número secundario: ${phone2Display}
Comentarios: ${commentsDisplay}`;

  const encodedMsg = encodeURIComponent(msg);
  const waLink = `https://wa.me/529841068542?text=${encodedMsg}`;

  const handleConfirm = async () => {
    if (id) {
      const token = sessionStorage.getItem("wp_token");
      const numericId = id.replace(/DLV-0*/, "");
      try {
        await fetch(`https://onroutemx.com/wp-json/hb/v1/deliveries/${numericId}`, {
          method: "PUT", // assuming POST or PUT to update
          headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : ""
          },
          body: JSON.stringify({ status: "confirmada" })
        });
      } catch(e) {
        console.error("Network error confirming reservation:", e);
      }
    }
    goTo("dashboard");
  };

  return (
    <div className="cotizador-page">
      <div className="result-grid" style={{ gridTemplateColumns: "1.05fr 1fr" }}>
        <div className="card card-pad">
          <div className="flex" style={{ gap: 14, alignItems: "center" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--accent-soft)", display: "grid", placeItems: "center", color: "var(--accent)" }}>
              <I.Check size={24} />
            </div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, color: "var(--ink)" }}>Reserva creada</h2>
              <div className="muted" style={{ fontSize: 13 }}>ID asignado: <span className="mono" style={{ color: "var(--ink)", fontWeight: 700 }}>{id || "DLV-043"}</span></div>
            </div>
          </div>

          <div className="divider"></div>

          <h3 style={{ margin: "0 0 6px" }}>Confirma el envío</h3>
          <p className="muted" style={{ margin: "0 0 18px", fontSize: 13 }}>WhatsApp se abre en una pestaña con el mensaje listo. Revísalo, envíalo y vuelve a marcarlo como enviado.</p>

          <div className="stack">
            <a className="btn btn-accent btn-lg" href={waLink} target="_blank" rel="noreferrer">
              <I.WhatsApp size={18} /> Abrir WhatsApp · +52 984 106 8542
            </a>

            <div className="row row-2">
              <button className="btn btn-soft" onClick={handleConfirm}><I.Check size={16} /> Confirmar enviado</button>
              <button className="btn btn-ghost" onClick={() => navigator.clipboard.writeText(msg)}><I.Copy size={16} /> Copiar mensaje</button>
            </div>

            <div className="hint-bar" style={{ margin: 0 }}>
              <I.Info size={16} />
              <div>El estado de la reserva pasará a <span className="status status-confirmada">Confirmada</span> al confirmar envío.</div>
            </div>
          </div>
        </div>

        <div className="wa-frame">
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "#25D366", display: "grid", placeItems: "center", color: "white" }}>
              <I.WhatsApp size={18} />
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 13 }}>Admin OnRoute</div>
              <div style={{ fontSize: 11, color: "#3b4a52" }}>+52 984 106 8542 · en línea</div>
            </div>
          </div>
          <div className="wa-bubble" style={{ whiteSpace: "pre-wrap" }}>{msg}<span className="time">6:14 p.m. ✓✓</span></div>
        </div>
      </div>
    </div>);

}

function LocatorScreen() {
  const [lang, setLang] = useState("en"); // "en" or "es"
  const t = {
    en: {
      where: "Where should we deliver your order?",
      pinText: "Set the exact point. You don't need to know the address — just use the map.",
      tapMap: "Tap the map to mark",
      detected: "Location detected",
      useCurrent: "Use my current location",
      orTap: "or tap the map to set it",
      namePlace: "Name or event (optional)",
      refPlace: "Reference: e.g., tent, reception... (optional)",
      confirmBtn: "Confirm location",
      confirmNote: "Upon confirmation, your point goes directly to Holy Bakery.",
      sentTitle: "Location sent!",
      sentDesc: "Holy Bakery has received your delivery point. You don't need to do anything else.",
      backupLink: "Your backup link",
      saveNote: "Save it in case you want to resend it yourself.",
      markAnother: "Mark another location",
      noRoute: "No route",
      locError: "Could not get current location."
    },
    es: {
      where: "¿Dónde entregamos tu pedido?",
      pinText: "Fija el punto exacto. No necesitas saber la dirección — con el mapa basta.",
      tapMap: "Toca el mapa para marcar",
      detected: "Ubicación detectada",
      useCurrent: "Usar mi ubicación actual",
      orTap: "o toca el mapa para fijarlo",
      namePlace: "Nombre o evento (opcional)",
      refPlace: "Referencia: ej. carpa, recepción… (opcional)",
      confirmBtn: "Confirmar ubicación",
      confirmNote: "Al confirmar, tu punto llega directo a Holy Bakery.",
      sentTitle: "¡Ubicación enviada!",
      sentDesc: "Holy Bakery ya recibió tu punto de entrega. No necesitas hacer nada más.",
      backupLink: "Tu enlace de respaldo",
      saveNote: "Guárdalo por si quieres reenviarlo tú mismo.",
      markAnother: "Marcar otra ubicación",
      noRoute: "Sin ruta",
      locError: "No se pudo obtener la ubicación actual."
    }
  };

  const text = t[lang];

  const [pin, setPin] = useState(null);
  const [step, setStep] = useState("pick");
  const [name, setName] = useState("");
  const [ref, setRef] = useState("");
  const [located, setLocated] = useState(false);
  const [copied, setCopied] = useState(false);

  const [zoneInfo, setZoneInfo] = useState({ zone: "", price: null });
  const [routeInfo, setRouteInfo] = useState({ km: 0, eta: "" });

  const [addressName, setAddressName] = useState("");

  // Helper for straight line distance
  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (pin) {
      const zInfo = getZoneAndPrice(pin.lat, pin.lng);
      setZoneInfo(zInfo);

      if (window.google && window.google.maps) {
        // Geocoding to get place name
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: pin }, (results, status) => {
          if (status === 'OK' && results[0]) {
            setAddressName(results[0].formatted_address.split(',')[0]);
          } else {
            setAddressName("");
          }
        });

        const service = new window.google.maps.DistanceMatrixService();
        service.getDistanceMatrix(
          {
            origins: [{ lat: 20.199885881257117, lng: -87.46305126147733 }],
            destinations: [pin],
            travelMode: 'DRIVING'
          },
          (response, status) => {
            if (status === 'OK' && response.rows[0].elements[0].status === 'OK') {
              const element = response.rows[0].elements[0];
              setRouteInfo({
                km: +(element.distance.value / 1000).toFixed(1),
                eta: element.duration.text
              });
            } else {
              // Fallback to straight line distance
              const dist = getDistanceFromLatLonInKm(20.199885881257117, -87.46305126147733, pin.lat, pin.lng);
              setRouteInfo({ km: +dist.toFixed(1), eta: text.noRoute });
            }
          }
        );
      } else {
        // No google maps loaded
        const dist = getDistanceFromLatLonInKm(20.199885881257117, -87.46305126147733, pin.lat, pin.lng);
        setRouteInfo({ km: +dist.toFixed(1), eta: text.noRoute });
      }
    }
  }, [pin, lang]);

  const onPinChange = (newPin) => {
    setPin(newPin);
    setLocated(false);
  };

  const useMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPin({ lat: position.coords.latitude, lng: position.coords.longitude });
          setLocated(true);
        },
        () => { alert(text.locError); },
        { enableHighAccuracy: true }
      );
    } else {
      alert(text.locError);
    }
  };

  const genLink = window.MOCK && window.MOCK.SHARE_LINK ? window.MOCK.SHARE_LINK : "https://onroute.mx/loc/HB-12345";

  const handleConfirm = () => {
    const newLoc = {
      id: "UBI-" + Math.floor(Math.random()*1000).toString().padStart(3,"0"),
      client: name || "Sin nombre",
      ref: ref || "—",
      addr: addressName ? `${addressName}|${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)}` : `${pin.lat.toFixed(4)}, ${pin.lng.toFixed(4)}`,
      zone: zoneInfo.zone,
      cost: zoneInfo.price || 0,
      km: routeInfo.km,
      eta: routeInfo.eta,
      time: "Justo ahora",
      status: "nueva",
      x: pin.lng,
      y: pin.lat
    };
    if (window.MOCK && window.MOCK.INCOMING_LOCATIONS) {
      window.MOCK.INCOMING_LOCATIONS.unshift(newLoc);
      localStorage.setItem('holy_incoming', JSON.stringify(window.MOCK.INCOMING_LOCATIONS));
    }
    
    // Enviar a la base de datos (PHP)
    fetch('/api/post_location.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newLoc)
    }).catch(err => console.error("Error saving to DB:", err));

    setStep("confirmed");
  };

  const toggleLang = () => {
    setLang(l => l === "en" ? "es" : "en");
  };

  return (
    <div className="cli-screen fullscreen-mode">
      <div className="cli-head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div className="cli-brand">
          <span className="cli-logo"><I.Cake size={15}/></span>
          <div><strong>Holy Bakery</strong><span>Entregas · OnRoute</span></div>
        </div>
        <button className="lang-toggle" onClick={toggleLang}>
          {lang === "en" ? <><strong>en</strong> / ES</> : <>en / <strong>ES</strong></>}
        </button>
      </div>

      {step === "pick" && (
        <div className="cli-scroll">
          <div className="cli-intro">
            <h2>{text.where}</h2>
            <p>{text.pinText}</p>
          </div>
          <div className="cli-map" style={{ position: 'relative', width: '100%', height: 250, borderRadius: 12, overflow: 'hidden', marginBottom: 16 }}>
            <InteractiveMap pin={pin} onPinChange={onPinChange} />
            {!pin && <div className="cli-map-hint" style={{ pointerEvents: 'none', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', background: 'rgba(255,255,255,0.8)', padding: '6px 12px', borderRadius: 20, zIndex: 10 }}><I.Pin size={13}/> {text.tapMap}</div>}
            {located && <div className="cli-map-badge" style={{ position: 'absolute', top: 10, right: 10, background: '#16a34a', color: 'white', padding: '4px 8px', borderRadius: 12, fontSize: 11, zIndex: 10 }}><I.Crosshair size={12}/> {text.detected}</div>}
          </div>
          <button className="cli-locate" onClick={useMyLocation}><I.Crosshair size={18}/> {text.useCurrent}</button>
          <div className="cli-or"><span>{text.orTap}</span></div>
          {pin && (
            <div className="cli-detected">
              <div className="cli-detected-row"><I.Pin size={16}/><div><strong>{pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</strong><span>{zoneInfo.zone} · {zoneInfo.price ? `$${zoneInfo.price}` : ''}</span></div></div>
            </div>
          )}
          <div className="cli-fields">
            <input className="cli-input" placeholder={text.namePlace} value={name} onChange={e => setName(e.target.value)}/>
            <input className="cli-input" placeholder={text.refPlace} value={ref} onChange={e => setRef(e.target.value)}/>
          </div>
          <button className="cli-confirm" disabled={!pin} onClick={handleConfirm}>{text.confirmBtn} <I.ArrowRight size={18}/></button>
          <p className="cli-foot-note">{text.confirmNote}</p>
        </div>
      )}

      {step === "confirmed" && (
        <div className="cli-scroll cli-success">
          <div className="cli-check"><I.Check size={34}/></div>
          <h2>{text.sentTitle}</h2>
          <p>{text.sentDesc}</p>
          <div className="cli-summary">
            <div className="cli-sum-map" style={{ width: '100%', height: 120, borderRadius: 8, overflow: 'hidden', pointerEvents: 'none' }}>
              <InteractiveMap pin={pin} readOnly={true} />
            </div>
            <div className="cli-sum-rows">
              <div className="cli-sum-row"><I.Pin size={14}/><span>{pin.lat.toFixed(4)}, {pin.lng.toFixed(4)}</span></div>
              <div className="cli-sum-row"><I.Map size={14}/><span>{zoneInfo.zone}</span></div>
              {name && <div className="cli-sum-row"><I.Users size={14}/><span>{name}</span></div>}
            </div>
          </div>
          <div className="cli-link-label">{text.backupLink}</div>
          <div className="cli-linkbox">
            <span className="mono">{genLink}</span>
            <button onClick={() => { navigator.clipboard.writeText(genLink); setCopied(true); setTimeout(() => setCopied(false), 1600); }}>{copied ? <I.Check size={15}/> : <I.Copy size={15}/>}</button>
          </div>
          <p className="cli-foot-note">{text.saveNote}</p>
          <button className="cli-secondary" onClick={() => { setStep("pick"); setPin(null); setLocated(false); setName(""); setRef(""); }}>{text.markAnother}</button>
        </div>
      )}
    </div>
  );
}

window.AppScreens = { LoginScreen, AdminLoginScreen, CotizadorScreen, ResultadoScreen, ReservaScreen, WhatsAppScreen, LocatorScreen };