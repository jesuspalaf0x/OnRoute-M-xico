// Login + Cotizador + Resultado + Reserva + WhatsApp screens
import React, { useState, useRef } from 'react';
import { useJsApiLoader, Autocomplete } from '@react-google-maps/api';
import * as turf from '@turf/turf';
import mapData from './map.json';
import pricesData from './data/prices.json';
import MapPickerModal from './components/MapPickerModal';

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
  const [employee, setEmployee] = useState(2); // Diana (afternoon) selected by shift
  const [password, setPassword] = useState("");
  const [showSelect, setShowSelect] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const detectedEmployee = window.MOCK.EMPLOYEES.find((e) => e.id === employee);

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
  const [date, setDate] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "", // user needs to configure this
    libraries,
  });

  const autocompleteRef = useRef(null);
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
    <div className="cotizador-page">
      <div className="cotizador-grid">
        <div className="cotizador-side">
          <div className="badge-row" style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-ghost btn-sm" onClick={() => goTo("dashboard")} style={{padding:0, color: "var(--ink-light)"}}><I.ArrowLeft size={16}/> Volver al panel</button>
          </div>
          <div className="badge-row" style={{ display: "flex", gap: 8, marginTop: 16 }}>
            <span className="zone-chip"><I.Cake size={12} /> Origen fijo · Holy Bakery Tulum</span>
          </div>
          <h1><span style={{ color: "var(--ink)" }}>Una entrega,</span> <em>tres clics.</em></h1>
          <p>Cotiza al instante usando autocompletado de Google o el pin del mapa. Las tarifas se calculan por zona; las ubicaciones preferenciales aplican automáticamente.</p>

          <div className="points">
            <div className="point card-tight" style={{ background: "var(--surface)" }}>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <I.Pin size={18} />
                  <strong>Cobertura</strong>
                </div>
                <div className="muted">Tulum · Aldea Zama · Akumal · Puerto Aventuras · Playa del Carmen</div>
              </div>
            </div>
            <div className="point card-tight" style={{ background: "var(--surface)" }}>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <I.Star size={18} />
                  <strong>Tarifas especiales</strong>
                </div>
                <div className="muted">3 ubicaciones preferenciales activas: Casa Banana, Be Tulum, Mi Amor.</div>
              </div>
            </div>
            <div className="point card-tight" style={{ background: "var(--surface)" }}>
              <div style={{ width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <I.RefreshCcw size={18} />
                  <strong>Tipo de cambio</strong>
                </div>
                <div className="muted">$17.50 MXN/USD · actualizado por OnRoute hoy 9:14 a.m.</div>
              </div>
            </div>
          </div>
        </div>

        <div className="quote-card">
          {/* Tabs removed */}

          <div className="stack">
            <div>
              <label className="label">Desde</label>
              <div className="field">
                <I.Send size={18} className="icon" />
                <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Hotel, Airbnb, Aeropuerto…" />
              </div>
            </div>
            <div>
              <label className="label">Hacia</label>
              <div className="field" style={{ position: "relative" }}>
                <I.Pin size={18} className="icon" />
                {isLoaded ? (
                  <Autocomplete
                    onLoad={(autocomplete) => (autocompleteRef.current = autocomplete)}
                    onPlaceChanged={handlePlaceChanged}
                    options={{ componentRestrictions: { country: "mx" } }}
                    style={{ flex: 1, border: "none", background: "transparent", outline: "none" }}
                  >
                    <input
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Hotel en Tulum, Playa del Carmen…"
                      style={{ width: "100%" }}
                    />
                  </Autocomplete>
                ) : (
                  <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Cargando mapa..." />
                )}
                <button type="button" className="btn btn-soft btn-sm" title="Soltar pin en mapa" style={{ position: "absolute", right: 12 }} onClick={() => setIsMapModalOpen(true)}>
                  <I.Map size={14} /> Mapa
                </button>
              </div>
            </div>
            <div>
              <label className="label">Fecha</label>
              <div className="field">
                <I.Calendar size={18} className="icon" />
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} placeholder="dd/mm/aaaa" />
              </div>
            </div>

            <button className="btn btn-primary btn-lg btn-block" onClick={handleQuote}>
              Cotizar ahora <I.ArrowRight size={18} />
            </button>
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

  const handleSaveDraft = async () => {
    const token = sessionStorage.getItem("wp_token");
    const draftData = {
      status: "borrador",
      destinationName,
      zoneName,
      place_id,
      latitude: lat,
      longitude: lng,
      formatted_address,
      maps_link,
      cost: foreignPrice // or localPrice depending on logic
    };

    try {
      // Connect to the real database via WP REST API custom endpoint
      const res = await fetch("https://onroutemx.com/wp-json/holybakery/v1/deliveries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify(draftData)
      });
      if (res.ok) {
        goTo("dashboard");
      } else {
        console.warn("API Error, navigating anyway for prototype demo");
        goTo("dashboard");
      }
    } catch(e) {
      console.error("Network error saving draft:", e);
      goTo("dashboard");
    }
  };

  return (
    <div className="cotizador-page">
      <div className="result-grid">
        <div className="card card-pad">
          <div className="flex-between" style={{ marginBottom: 18 }}>
            <div>
              <span className="zone-chip">{zoneName}</span>
              <h2 style={{ margin: "10px 0 4px", fontSize: 24, letterSpacing: "-0.02em" }}>{destinationName.split(',')[0]}</h2>
              <div className="muted" style={{ fontSize: 13 }}>{destinationName}</div>
            </div>
            <button className="btn btn-ghost btn-sm" onClick={() => goTo("cotizador")}><I.ChevronLeft size={14} /> Editar</button>
          </div>

          <div className="row row-2" style={{ marginBottom: 16 }}>
            <div className="card-tight" style={{ background: "var(--surface-2)", borderRadius: 12 }}>
              <div className="muted" style={{ fontSize: 11.5, letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: 700 }}>Origen</div>
              <div style={{ fontWeight: 700, marginTop: 4 }}><I.Cake size={14} /> Holy Bakery Tulum</div>
              <div className="mono muted" style={{ fontSize: 11.5, marginTop: 4 }}>20.2118, -87.4654</div>
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

        <div className="map-card">
          <div className="map-canvas">
            <svg viewBox="0 0 460 460" preserveAspectRatio="xMidYMid slice">
              {/* abstract zone polygons */}
              <path d="M 40 120 Q 130 60 230 80 Q 330 100 380 180 Q 360 260 280 280 Q 180 290 100 240 Q 30 200 40 120 Z"
              fill="rgba(22,163,74,0.10)" stroke="rgba(22,163,74,0.4)" strokeDasharray="4 4" />
              <path d="M 200 250 Q 290 230 360 280 Q 380 360 300 380 Q 220 380 200 320 Z"
              fill="rgba(124,58,237,0.08)" stroke="rgba(124,58,237,0.4)" strokeDasharray="4 4" />

              {/* route line */}
              <path d="M 130 160 C 200 200, 240 240, 320 320" fill="none"
              stroke="#0d2618" strokeWidth="2.5" strokeDasharray="6 5" />

              {/* origin pin */}
              <g transform="translate(120, 150)">
                <circle r="22" fill="rgba(22,163,74,0.18)" />
                <circle r="11" fill="#16a34a" stroke="white" strokeWidth="3" />
              </g>
              <text x="100" y="135" fontSize="11" fontWeight="700" fill="#0c1a12" fontFamily="Manrope">Holy Bakery</text>

              {/* destination pin */}
              <g transform="translate(330, 330)">
                <circle r="22" fill="rgba(13,38,24,0.16)" />
                <path d="M 0 -16 C -10 -16 -16 -10 -16 0 C -16 8 -8 14 0 22 C 8 14 16 8 16 0 C 16 -10 10 -16 0 -16 Z"
                fill="#0d2618" />
                <circle r="5" fill="white" />
              </g>
              <text x="345" y="328" fontSize="11" fontWeight="700" fill="#0c1a12" fontFamily="Manrope">Satori Tulum</text>
            </svg>
          </div>
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

  const [employee, setEmployee] = useState(2);
  const [date, setDate] = useState("2026-05-09");
  const [time, setTime] = useState("18:15");
  const [costType, setCostType] = useState("foreign");
  const [costCustom, setCostCustom] = useState("");
  const [client, setClient] = useState("Miranda Reyes");
  const [phone, setPhone] = useState("+1 881 123 4567");
  const [phone2, setPhone2] = useState("");
  const [comments, setComments] = useState("Cobrar $250.00 pesos pendientes de abonar, el cliente pagará el delivery.");
  const [files, setFiles] = useState([]);

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
          <div className="hint-bar">
            <I.Info size={16} />
            <div>Datos prellenados desde la cotización <span className="kbd">{destinationName.split(',')[0]}</span> · {zoneName} · ${foreignPrice.toFixed(2)} MXN extranjero.</div>
          </div>

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
                  <div className="field">
                    <I.Calendar size={18} className="icon" />
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                  </div>
                </div>
                <div>
                  <label className="label">Hora</label>
                  <div className="field">
                    <I.Clock size={18} className="icon" />
                    <input type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                    <span className="muted" style={{ fontSize: 12 }}>6:15 p.m.</span>
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
                  <input value={client} onChange={(e) => setClient(e.target.value)} placeholder="Opcional" />
                </div>
              </div>
              <div className="row row-2">
                <div>
                  <label className="label">Teléfono principal</label>
                  <div className="field">
                    <I.Phone size={18} className="icon" />
                    <input value={phone} onChange={(e) => setPhone(e.target.value)} onBlur={() => setPhone(normalizeToE164(phone))} />
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
                    <input value={phone2} onChange={(e) => setPhone2(e.target.value)} onBlur={() => setPhone2(normalizeToE164(phone2))} placeholder="Opcional" />
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
                <div className="field field-textarea">
                  <textarea value={comments} onChange={(e) => setComments(e.target.value)} rows={3} />
                </div>
                <div className="upload-zone">
                  <I.Paperclip size={18} />
                  <div>
                    <strong>Adjuntar imágenes o PDFs</strong>
                    <div className="muted" style={{ fontSize: 12 }}>Hasta 3 archivos · 5 MB c/u · JPG, PNG, PDF</div>
                  </div>
                  <div className="files" style={{display: "flex", flexDirection: "column", gap: "8px", width: "100%"}}>
                    {files.map((f, i) => (
                      <span key={i} className="chip" style={{display: "flex", justifyContent: "space-between", alignItems: "center", width: "fit-content", gap: 8}}>
                        <span><I.Image size={12} /> {f.name}</span>
                        <button type="button" className="btn btn-ghost btn-sm" onClick={() => removeFile(i)} style={{padding: 2, height: 'auto', minHeight: 0}}>
                          ✕
                        </button>
                      </span>
                    ))}
                    {files.length < 3 && (
                      <label className="btn btn-soft btn-sm" style={{cursor: "pointer", width: "fit-content", margin: 0}}>
                        <I.Plus size={12} /> Subir
                        <input type="file" multiple accept="image/jpeg,image/png,application/pdf" style={{display: "none"}} onChange={handleFileChange} />
                      </label>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex" style={{ gap: 12 }}>
            <button className="btn btn-soft" style={{ flex: 1 }} onClick={async () => {
              const token = sessionStorage.getItem("wp_token");
              const draftData = {
                status: "borrador",
                destinationName,
                zoneName,
                place_id,
                latitude: lat,
                longitude: lng,
                formatted_address,
                maps_link,
                cost,
                date,
                time,
                client,
                phone: normalizeToE164(phone),
                phone2: normalizeToE164(phone2),
                comments
              };

              try {
                const res = await fetch("https://onroutemx.com/wp-json/holybakery/v1/deliveries", {
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
                      await fetch(`https://onroutemx.com/wp-json/holybakery/v1/deliveries/${newId}/upload`, {
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
                zoneName,
                place_id,
                latitude: lat,
                longitude: lng,
                formatted_address,
                maps_link,
                cost,
                date,
                time,
                client,
                phone: normalizeToE164(phone),
                phone2: normalizeToE164(phone2),
                comments
              };

              try {
                const res = await fetch("https://onroutemx.com/wp-json/holybakery/v1/deliveries", {
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
                      await fetch(`https://onroutemx.com/wp-json/holybakery/v1/deliveries/${newId}/upload`, {
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

        <aside className="stack">
          <div className="section-card" style={{ padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)" }}>
              <h3>Resumen de la reserva</h3>
              <p className="desc" style={{ margin: 0 }}>Lo que verá el admin por WhatsApp.</p>
            </div>
            <div style={{ padding: 22 }} className="stack">
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Origen</span>
                <span style={{ fontWeight: 700 }}>Holy Bakery Tulum</span>
              </div>
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Destino</span>
                <span style={{ fontWeight: 700 }}>{destinationName.split(',')[0]}</span>
              </div>
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Cuándo</span>
                <span style={{ fontWeight: 700 }}>Sáb 9 may · 6:15 p.m.</span>
              </div>
              <div className="price-row featured" style={{ padding: "10px 0" }}>
                <span className="lbl">Total</span>
                <span className="val">${cost.toFixed(2)} MXN</span>
              </div>
              <div className="price-row" style={{ padding: "10px 0" }}>
                <span className="lbl">Equivalente</span>
                <span className="val muted" style={{ fontSize: 14, fontWeight: 600 }}>~${(cost/17.50).toFixed(2)} USD</span>
              </div>
            </div>
          </div>
          <div className="section-card" style={{ background: "var(--accent-soft)", border: "1px solid var(--accent-soft-2)" }}>
            <div className="flex" style={{ gap: 10 }}>
              <I.Shield size={18} style={{ color: "var(--accent)" }} />
              <div>
                <strong style={{ color: "var(--accent)" }}>Bloqueo automático</strong>
                <div style={{ fontSize: 12.5, color: "#0e5a2c", marginTop: 4 }}>
                  Una vez creada, el costo no podrá editarse. Solicita cambio al admin desde el historial.
                </div>
              </div>
            </div>
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
      try {
        await fetch(`https://onroutemx.com/wp-json/holybakery/v1/deliveries/${id}`, {
          method: "POST", // assuming POST or PUT to update
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
              <h2 style={{ margin: 0, fontSize: 22 }}>Reserva creada</h2>
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

window.AppScreens = { LoginScreen, AdminLoginScreen, CotizadorScreen, ResultadoScreen, ReservaScreen, WhatsAppScreen };