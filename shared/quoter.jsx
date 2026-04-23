
// ============================================================
// SmartQuoter — Cotizador inteligente con polígonos de zona
// Depende de: config.js, shared/price-matrix.js, map.geojson
// ============================================================

// ── Ray-casting: punto dentro de polígono ──────────────────
function pointInPolygon(lat, lng, polygon) {
  let inside = false;
  const coords = polygon[0]; // outer ring
  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const xi = coords[i][0], yi = coords[i][1];
    const xj = coords[j][0], yj = coords[j][1];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

// ── Detectar zona a partir de coordenadas ─────────────────
function detectZone(lat, lng, geojson) {
  for (const feature of geojson.features) {
    const geo = feature.geometry;
    const name = feature.properties.Tulum;
    if (geo.type === 'Polygon') {
      // Note: GeoJSON is [lng, lat] — swap for our function
      if (pointInPolygon(lng, lat, geo.coordinates)) return name;
    } else if (geo.type === 'MultiPolygon') {
      for (const poly of geo.coordinates) {
        if (pointInPolygon(lng, lat, poly)) return name;
      }
    }
  }
  return null;
}

// ── Precio MXN → USD ──────────────────────────────────────
function toUSD(mxn) {
  const rate = window.TIPO_CAMBIO_MXN_USD || 17.5;
  return Math.ceil(mxn / rate);
}

// ── Componente principal ──────────────────────────────────
const SmartQuoter = ({ lang }) => {
  const accent = '#1FA84A';
  const dark   = '#0a1f12';

  const [tab,        setTab]        = React.useState('traslado');
  const [fromVal,    setFromVal]    = React.useState('');
  const [toVal,      setToVal]      = React.useState('');
  const [fromZone,   setFromZone]   = React.useState(null);
  const [toZone,     setToZone]     = React.useState(null);
  const [fromCoords, setFromCoords] = React.useState(null);
  const [toCoords,   setToCoords]   = React.useState(null);
  const [date,       setDate]       = React.useState('');
  const [pax,        setPax]        = React.useState(2);
  const [roundTrip,  setRoundTrip]  = React.useState(false);
  const [result,     setResult]     = React.useState(null); // { price, currency, fromZone, toZone }
  const [loading,    setLoading]    = React.useState(false);
  const [geojson,    setGeojson]    = React.useState(null);
  const [mapsReady,  setMapsReady]  = React.useState(false);

  const fromRef = React.useRef(null);
  const toRef   = React.useRef(null);
  const fromAc  = React.useRef(null);
  const toAc    = React.useRef(null);

  const WA_NUMBER = '529841068542';

  // Carga el GeoJSON una sola vez
  React.useEffect(() => {
    fetch('uploads/Mapa de precios/map.geojson')
      .then(r => r.json())
      .then(setGeojson)
      .catch(console.error);
  }, []);

  // Espera a que Google Maps esté disponible
  React.useEffect(() => {
    if (window.google && window.google.maps && window.google.maps.places) {
      setMapsReady(true);
      return;
    }
    const interval = setInterval(() => {
      if (window.google && window.google.maps && window.google.maps.places) {
        setMapsReady(true);
        clearInterval(interval);
      }
    }, 300);
    return () => clearInterval(interval);
  }, []);

  // Inicializa Autocomplete cuando todo esté listo
  React.useEffect(() => {
    if (!mapsReady) return;

    const opts = {
      componentRestrictions: { country: 'mx' },
      fields: ['geometry', 'name', 'formatted_address'],
    };

    if (fromRef.current && !fromAc.current) {
      fromAc.current = new window.google.maps.places.Autocomplete(fromRef.current, opts);
      fromAc.current.addListener('place_changed', () => {
        const place = fromAc.current.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setFromCoords({ lat, lng });
        setFromVal(place.name || place.formatted_address);
        if (geojson) setFromZone(detectZone(lat, lng, geojson));
        setResult(null);
      });
    }

    if (toRef.current && !toAc.current) {
      toAc.current = new window.google.maps.places.Autocomplete(toRef.current, opts);
      toAc.current.addListener('place_changed', () => {
        const place = toAc.current.getPlace();
        if (!place.geometry) return;
        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        setToCoords({ lat, lng });
        setToVal(place.name || place.formatted_address);
        if (geojson) setToZone(detectZone(lat, lng, geojson));
        setResult(null);
      });
    }
  }, [mapsReady, geojson]);

  // ── Cotizar ──────────────────────────────────────────────
  const handleQuote = () => {
    if (pax > 4) {
      // Más de 4 → WhatsApp
      const msg = encodeURIComponent(
        `Hola OnRoute! Necesito cotizar un traslado para ${pax} personas${fromVal ? ' desde ' + fromVal : ''}${toVal ? ' hasta ' + toVal : ''}${date ? ' el ' + date : ''}. `
      );
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
      return;
    }

    if (!fromCoords || !toCoords) {
      setResult({ error: lang === 'es' ? 'Por favor selecciona ambos puntos del autocompletado.' : 'Please select both locations from the suggestions.' });
      return;
    }

    setLoading(true);
    setResult(null);

    setTimeout(() => {
      const matrix  = window.PRICE_MATRIX || {};
      const fz      = fromZone;
      const tz      = toZone;

      // Si zona no encontrada → WhatsApp
      if (!fz || !tz) {
        const msg = encodeURIComponent(
          `Hola OnRoute! Necesito cotizar un traslado desde ${fromVal} hasta ${toVal}${date ? ' el ' + date : ''}. Pasajeros: ${pax}.`
        );
        window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
        setLoading(false);
        return;
      }

      // Buscar precio en la matriz (comprobamos A→B y B→A)
      let price = matrix[fz] && matrix[fz][tz] != null ? matrix[fz][tz] : null;
      if (price === null) price = matrix[tz] && matrix[tz][fz] != null ? matrix[tz][fz] : null;

      if (price === null) {
        // Precio no definido → WhatsApp
        const msg = encodeURIComponent(
          `Hola OnRoute! Quiero cotizar un traslado de ${fromVal} a ${toVal}${date ? ' el ' + date : ''}. Pasajeros: ${pax}.`
        );
        window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
        setLoading(false);
        return;
      }

      const total = roundTrip ? price * 2 : price;
      setResult({
        priceMXN:  total,
        priceUSD:  toUSD(total),
        fromZone:  fz,
        toZone:    tz,
        roundTrip,
        pax,
      });
      setLoading(false);
    }, 400);
  };

  // ── WhatsApp para reservar ────────────────────────────────
  const handleBook = () => {
    if (!result) return;
    const currency = lang === 'es' ? `$${result.priceMXN.toLocaleString()} MXN` : `$${result.priceUSD} USD`;
    const trip     = result.roundTrip
      ? (lang === 'es' ? 'ida y vuelta' : 'round trip')
      : (lang === 'es' ? 'solo ida' : 'one way');
    const msg = encodeURIComponent(
      `Hola OnRoute! Quiero reservar un traslado:\n` +
      `📍 Desde: ${fromVal}\n` +
      `📍 Hasta: ${toVal}\n` +
      `📅 Fecha: ${date || '(por definir)'}\n` +
      `👥 Pasajeros: ${pax}\n` +
      `🔁 Viaje: ${trip}\n` +
      `💰 Cotización: ${currency}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
  };

  // ── Etiquetas i18n ────────────────────────────────────────
  const L = {
    es: {
      tabs:        ['Traslado', 'Tour', 'Paquete'],
      from:        'DESDE',
      fromPh:      'Hotel, Airbnb, Aeropuerto…',
      to:          'HACIA',
      toPh:        'Hotel en Tulum, Playa del Carmen…',
      date:        'FECHA',
      pax:         'PASAJEROS',
      round:       'Ida y vuelta',
      cta:         'Cotizar ahora',
      badge:       ['Mejor precio garantizado.', 'Si lo encuentras más barato, te igualamos la tarifa.'],
      from_zone:   'Zona origen',
      to_zone:     'Zona destino',
      price:       'Precio estimado',
      book:        '¡Reservar por WhatsApp!',
      per_vehicle: 'por vehículo (1-4 pasajeros)',
      group:       '¿Más de 4 pasajeros? Cotiza por WhatsApp',
      loading:     'Calculando…',
      no_places:   'Selecciona las ubicaciones usando las sugerencias del buscador',
      mapsLoading: 'Cargando buscador…',
    },
    en: {
      tabs:        ['Transfer', 'Tour', 'Package'],
      from:        'FROM',
      fromPh:      'Hotel, Airbnb, Airport…',
      to:          'TO',
      toPh:        'Hotel in Tulum, Playa del Carmen…',
      date:        'DATE',
      pax:         'PASSENGERS',
      round:       'Round trip',
      cta:         'Get a quote',
      badge:       ['Best price guaranteed.', 'Find it cheaper? We\'ll match it.'],
      from_zone:   'Origin zone',
      to_zone:     'Destination zone',
      price:       'Estimated price',
      book:        'Book via WhatsApp!',
      per_vehicle: 'per vehicle (1–4 passengers)',
      group:       'More than 4 passengers? Quote via WhatsApp',
      loading:     'Calculating…',
      no_places:   'Please select locations from the autocomplete suggestions',
      mapsLoading: 'Loading search…',
    },
  };
  const t = L[lang] || L.es;

  const tabIcons = ['🚐', '🌴', '💚'];

  const inputStyle = {
    width: '100%', padding: '11px 14px 11px 40px',
    borderRadius: 10, border: '1.5px solid rgba(10,10,10,0.1)',
    fontSize: 14, fontFamily: 'Inter, sans-serif',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .15s',
  };

  const labelStyle = {
    display: 'block', fontSize: 10, fontWeight: 700,
    letterSpacing: 1.2, color: 'rgba(10,10,10,0.45)',
    textTransform: 'uppercase', marginBottom: 6,
  };

  return (
    <div style={{
      background: '#fff', borderRadius: 20,
      boxShadow: '0 4px 40px rgba(0,0,0,0.10)',
      padding: 24, width: '100%', maxWidth: 480,
      fontFamily: 'Inter, sans-serif',
    }}>
      {/* Tabs */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3,1fr)',
        background: 'rgba(10,10,10,0.05)', borderRadius: 12,
        padding: 4, marginBottom: 20, gap: 4,
      }}>
        {t.tabs.map((label, i) => (
          <button key={i}
            onClick={() => setTab(i === 0 ? 'traslado' : i === 1 ? 'tour' : 'paquete')}
            style={{
              border: 'none', borderRadius: 9, padding: '9px 4px',
              fontWeight: 700, fontSize: 13,
              background: (i === 0 && tab === 'traslado') || (i === 1 && tab === 'tour') || (i === 2 && tab === 'paquete') ? '#fff' : 'transparent',
              color: '#0a0a0a', cursor: 'pointer',
              boxShadow: ((i === 0 && tab === 'traslado') || (i === 1 && tab === 'tour') || (i === 2 && tab === 'paquete')) ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
              transition: 'all .15s',
            }}
          >
            {tabIcons[i]} {label}
          </button>
        ))}
      </div>

      {/* Si no es traslado, lleva a WA */}
      {tab !== 'traslado' && (
        <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
          <p style={{ color: 'rgba(10,10,10,0.6)', fontSize: 13, marginBottom: 14 }}>
            {lang === 'es'
              ? 'Cotiza tours y paquetes directamente por WhatsApp.'
              : 'Get a quote for tours and packages directly on WhatsApp.'}
          </p>
          <a href={`https://wa.me/${WA_NUMBER}`} target="_blank" rel="noreferrer"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: '#25D366', color: '#fff', border: 'none',
              borderRadius: 10, padding: '12px 24px', fontWeight: 700,
              fontSize: 14, cursor: 'pointer', textDecoration: 'none',
            }}>
            💬 WhatsApp
          </a>
        </div>
      )}

      {tab === 'traslado' && (
        <>
          {/* DESDE */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{t.from}</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: accent, fontSize: 16 }}>✈</span>
              <input
                ref={fromRef}
                type="text"
                placeholder={mapsReady ? t.fromPh : t.mapsLoading}
                disabled={!mapsReady}
                style={inputStyle}
                onChange={e => { setFromVal(e.target.value); setFromZone(null); setResult(null); }}
              />
            </div>
            {fromZone && (
              <div style={{ fontSize: 11, color: accent, marginTop: 4, fontWeight: 600 }}>
                📍 {fromZone}
              </div>
            )}
          </div>

          {/* HACIA */}
          <div style={{ marginBottom: 14 }}>
            <label style={labelStyle}>{t.to}</label>
            <div style={{ position: 'relative' }}>
              <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: accent, fontSize: 16 }}>📍</span>
              <input
                ref={toRef}
                type="text"
                placeholder={mapsReady ? t.toPh : t.mapsLoading}
                disabled={!mapsReady}
                style={inputStyle}
                onChange={e => { setToVal(e.target.value); setToZone(null); setResult(null); }}
              />
            </div>
            {toZone && (
              <div style={{ fontSize: 11, color: accent, marginTop: 4, fontWeight: 600 }}>
                📍 {toZone}
              </div>
            )}
          </div>

          {/* FECHA + PASAJEROS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
            <div>
              <label style={labelStyle}>{t.date}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: accent }}>📅</span>
                <input
                  type="date"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                  style={{ ...inputStyle, paddingRight: 8 }}
                />
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t.pax}</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: accent }}>👥</span>
                <input
                  type="number"
                  min={1} max={20}
                  value={pax}
                  onChange={e => { setPax(parseInt(e.target.value) || 1); setResult(null); }}
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Ida y vuelta */}
          <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, marginBottom: 16, userSelect: 'none' }}>
            <input
              type="checkbox"
              checked={roundTrip}
              onChange={e => { setRoundTrip(e.target.checked); setResult(null); }}
              style={{ width: 16, height: 16, accentColor: accent }}
            />
            {t.round}
          </label>

          {/* Resultado de cotización */}
          {result && !result.error && (
            <div style={{
              background: 'linear-gradient(135deg, #0a1f12 0%, #1a4028 100%)',
              borderRadius: 14, padding: 20, marginBottom: 16, color: '#fff',
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 4 }}>{t.from_zone}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{result.fromZone}</div>
                </div>
                <div style={{ fontSize: 20 }}>→</div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, opacity: 0.65, marginBottom: 4 }}>{t.to_zone}</div>
                  <div style={{ fontWeight: 700, fontSize: 13 }}>{result.toZone}</div>
                </div>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.65 }}>{t.price} {result.roundTrip ? '🔁' : '→'}</div>
                  <div style={{ fontSize: 28, fontWeight: 800, fontFamily: 'Archivo, sans-serif', lineHeight: 1.1, marginTop: 2 }}>
                    {lang === 'es'
                      ? `$${result.priceMXN.toLocaleString('es-MX')} MXN`
                      : `$${result.priceUSD} USD`}
                  </div>
                  <div style={{ fontSize: 11, opacity: 0.6, marginTop: 2 }}>
                    {lang === 'es'
                      ? `≈ $${result.priceUSD} USD · `
                      : `≈ $${result.priceMXN.toLocaleString('es-MX')} MXN · `}
                    {t.per_vehicle}
                  </div>
                </div>
              </div>
              <button onClick={handleBook}
                style={{
                  marginTop: 14, width: '100%', background: '#25D366',
                  color: '#fff', border: 'none', borderRadius: 10,
                  padding: '13px 0', fontWeight: 700, fontSize: 15,
                  cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                }}>
                💬 {t.book}
              </button>
            </div>
          )}

          {result && result.error && (
            <div style={{ background: '#fff3cd', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#856404', marginBottom: 14 }}>
              ⚠️ {result.error}
            </div>
          )}

          {/* Nota 5+ pax */}
          {pax > 4 && (
            <div style={{ background: 'rgba(31,168,74,0.08)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: accent, marginBottom: 14, fontWeight: 600 }}>
              👥 {t.group}
            </div>
          )}

          {/* CTA Cotizar */}
          <button onClick={handleQuote} disabled={loading}
            style={{
              width: '100%', background: loading ? 'rgba(10,10,10,0.4)' : dark,
              color: '#fff', border: 'none', borderRadius: 12,
              padding: '15px 0', fontWeight: 700, fontSize: 16,
              cursor: loading ? 'not-allowed' : 'pointer',
              fontFamily: 'Archivo, sans-serif', letterSpacing: 0.3,
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
              transition: 'background .2s',
            }}>
            {loading ? `⏳ ${t.loading}` : `${t.cta} →`}
          </button>

          {/* Badge precio garantizado */}
          <div style={{
            marginTop: 14, padding: '10px 14px',
            background: 'rgba(31,168,74,0.07)', borderRadius: 10,
            display: 'flex', alignItems: 'center', gap: 8, fontSize: 12,
          }}>
            <span style={{ color: accent, fontSize: 16 }}>🛡</span>
            <span>
              <strong style={{ color: accent }}>{t.badge[0]}</strong>{' '}
              <span style={{ color: 'rgba(10,10,10,0.6)' }}>{t.badge[1]}</span>
            </span>
          </div>
        </>
      )}
    </div>
  );
};

Object.assign(window, { SmartQuoter });
