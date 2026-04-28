
// ============================================================
// SmartQuoter — Cotizador inteligente con polígonos de zona
// ============================================================

// Inyectar CSS para corregir el dropdown de Google Places
(function() {
  if (document.getElementById('pac-fix-css')) return;
  const style = document.createElement('style');
  style.id = 'pac-fix-css';
  style.textContent = `
    .pac-container {
      z-index: 9999 !important;
      background: #fff !important;
      border: 1px solid rgba(10,10,10,0.12) !important;
      border-radius: 10px !important;
      box-shadow: 0 8px 24px rgba(0,0,0,0.12) !important;
      font-family: 'Inter', sans-serif !important;
      margin-top: 4px !important;
      overflow: hidden !important;
    }
    .pac-container::after { display: none !important; }
    .pac-item {
      padding: 10px 14px !important;
      font-size: 13px !important;
      line-height: 1.4 !important;
      cursor: pointer !important;
      border-top: 1px solid rgba(10,10,10,0.06) !important;
      color: #0a0a0a !important;
      background: #fff !important;
    }
    .pac-item:first-child { border-top: none !important; }
    .pac-item:hover, .pac-item-selected { background: #f4f5f2 !important; }
    .pac-item-query { font-weight: 600 !important; color: #0a0a0a !important; }
    .pac-icon { display: none !important; }
    .pac-matched { color: #1FA84A !important; font-weight: 700 !important; }
  `;
  document.head.appendChild(style);
})();
// ── Formateo de nombres ────────────────────────────────────────
function formatLocationName(name) {
  if (!name) return '';
  const parts = name.split(',');
  if (parts.length > 2) {
    return parts.slice(0, 2).join(',').trim();
  }
  return name.trim();
}


// ── Ray-casting: punto dentro de polígono ──────────────────
function pointInPolygon(lat, lng, polygon) {
  let inside = false;
  const coords = polygon[0];
  for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
    const xi = coords[i][0], yi = coords[i][1];
    const xj = coords[j][0], yj = coords[j][1];
    if ((yi > lat) !== (yj > lat) && lng < ((xj - xi) * (lat - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function detectZone(lat, lng, geojson) {
  for (const feature of geojson.features) {
    const geo = feature.geometry;
    const name = feature.properties.Tulum;
    if (geo.type === 'Polygon') {
      if (pointInPolygon(lat, lng, geo.coordinates)) return name;
    } else if (geo.type === 'MultiPolygon') {
      for (const poly of geo.coordinates) {
        if (pointInPolygon(lat, lng, poly)) return name;
      }
    }
  }
  return null;
}

function toUSD(mxn) {
  const rate = window.TIPO_CAMBIO_MXN_USD || 17.5;
  return Math.ceil(mxn / rate);
}

// ── Componente SmartQuoter ────────────────────────────────
const SmartQuoter = ({ lang }) => {
  const accent   = '#1FA84A';
  const accentDk = '#0F6B2E';
  const dark     = '#0a1f12';
  const WA       = '529841068542';

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
  const [result,     setResult]     = React.useState(null);
  const [loading,    setLoading]    = React.useState(false);
  const [geojson,    setGeojson]    = React.useState(null);
  const [mapsReady,  setMapsReady]  = React.useState(false);

  const fromRef = React.useRef(null);
  const toRef   = React.useRef(null);
  const fromAc  = React.useRef(null);
  const toAc    = React.useRef(null);

  // Carga el GeoJSON
  React.useEffect(() => {
    fetch('uploads/Mapa de precios/map.geojson')
      .then(r => r.json())
      .then(setGeojson)
      .catch(console.error);
  }, []);

  // Espera a que Google Maps Places esté disponible mediante evento
  React.useEffect(() => {
    const isReady = () => !!(
      window.GOOGLE_MAPS_READY &&
      window.google?.maps?.places &&
      (window.google.maps.places.Autocomplete || window.google.maps.places.AutocompleteService)
    );
    if (isReady()) { setMapsReady(true); return; }
    const onReady = () => { console.log('[OnRoute] Google Maps listo via evento'); setMapsReady(true); };
    window.addEventListener('google-maps-ready', onReady);
    const t = setInterval(() => { if (isReady()) { console.log('[OnRoute] Google Maps listo via polling'); setMapsReady(true); clearInterval(t); } }, 500);
    return () => { window.removeEventListener('google-maps-ready', onReady); clearInterval(t); };
  }, []);

  // Inicializa Autocomplete cuando todo esté listo
  React.useEffect(() => {
    if (!mapsReady || !geojson) return;
    const opts = { componentRestrictions: { country: 'mx' }, fields: ['geometry', 'name', 'formatted_address'] };

    if (fromRef.current && !fromAc.current) {
      fromAc.current = new window.google.maps.places.Autocomplete(fromRef.current, opts);
      fromAc.current.addListener('place_changed', () => {
        const p = fromAc.current.getPlace();
        if (!p.geometry) return;
        const lat = p.geometry.location.lat(), lng = p.geometry.location.lng();
        setFromCoords({ lat, lng });
        setFromVal(p.name || p.formatted_address);
        setFromZone(detectZone(lat, lng, geojson));
        setResult(null);
      });
    }

    if (toRef.current && !toAc.current) {
      toAc.current = new window.google.maps.places.Autocomplete(toRef.current, opts);
      toAc.current.addListener('place_changed', () => {
        const p = toAc.current.getPlace();
        if (!p.geometry) return;
        const lat = p.geometry.location.lat(), lng = p.geometry.location.lng();
        setToCoords({ lat, lng });
        setToVal(p.name || p.formatted_address);
        setToZone(detectZone(lat, lng, geojson));
        setResult(null);
      });
    }
  }, [mapsReady, geojson]);

  const openWA = (msg) => window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, '_blank');

  const handleQuote = () => {
    if (pax > 4) {
      openWA(`Hola OnRoute! Necesito cotizar un traslado para ${pax} personas${fromVal ? ' desde ' + fromVal : ''}${toVal ? ' hasta ' + toVal : ''}${date ? ' el ' + date : ''}.`);
      return;
    }
    if (!fromCoords || !toCoords) {
      setResult({ error: lang === 'es' ? 'Selecciona ambos puntos usando las sugerencias del buscador.' : 'Please select both locations from the suggestions.' });
      return;
    }
    setLoading(true); setResult(null);
    setTimeout(() => {
      const fz = fromZone, tz = toZone;
      if (!fz || !tz) {
        openWA(`Hola OnRoute! Necesito cotizar un traslado desde ${fromVal} hasta ${toVal}${date ? ' el ' + date : ''}. Pasajeros: ${pax}.`);
        setLoading(false); return;
      }
      const mx = window.PRICE_MATRIX || {};
      let price = mx[fz]?.[tz] ?? mx[tz]?.[fz] ?? null;
      if (price === null) {
        openWA(`Hola OnRoute! Quiero cotizar un traslado de ${fromVal} a ${toVal}${date ? ' el ' + date : ''}. Pasajeros: ${pax}.`);
        setLoading(false); return;
      }
      const total = roundTrip ? price * 2 : price;
      setResult({ priceMXN: total, priceUSD: toUSD(total), fromZone: fz, toZone: tz, roundTrip, pax });
      setLoading(false);
    }, 400);
  };

  const handleBook = () => {
    if (!result) return;
    const cur = lang === 'es' ? `$${result.priceMXN.toLocaleString('es-MX')} MXN` : `$${result.priceUSD} USD`;
    const trip = result.roundTrip ? (lang === 'es' ? 'ida y vuelta' : 'round trip') : (lang === 'es' ? 'solo ida' : 'one way');
    openWA(`Hola OnRoute! Quiero reservar un traslado:\nDesde: ${fromVal}\nHasta: ${toVal}\nFecha: ${date || '(por definir)'}\nPasajeros: ${pax}\nViaje: ${trip}\nCotización: ${cur}`);
  };

  const L = {
    es: {
      tabs: ['Traslado', 'Tour', 'Paquete'],
      from: 'DESDE', fromPh: 'Hotel, Airbnb, Aeropuerto…',
      to: 'HACIA', toPh: 'Hotel en Tulum, Playa del Carmen…',
      date: 'FECHA', pax: 'PASAJEROS', round: 'Ida y vuelta',
      cta: 'Cotizar ahora', loading: 'Calculando…',
      badge: ['Mejor precio garantizado.', 'Si lo encuentras más barato, te igualamos la tarifa.'],
      fromZoneLabel: 'Zona origen:', toZoneLabel: 'Zona destino:',
      priceLabel: 'Precio estimado', bookBtn: 'Reservar por WhatsApp',
      perVehicle: 'por vehículo · 1–4 pasajeros',
      groupNote: 'Grupo de más de 4 personas — cotiza por WhatsApp',
      waBtn: 'Cotizar por WhatsApp',
      waSub: 'Cotiza tours y paquetes directamente por WhatsApp.',
      mapsLoading: 'Cargando buscador…',
    },
    en: {
      tabs: ['Transfer', 'Tour', 'Package'],
      from: 'FROM', fromPh: 'Hotel, Airbnb, Airport…',
      to: 'TO', toPh: 'Hotel in Tulum, Playa del Carmen…',
      date: 'DATE', pax: 'PASSENGERS', round: 'Round trip',
      cta: 'Get a quote', loading: 'Calculating…',
      badge: ['Best price guaranteed.', "Find it cheaper? We'll match it."],
      fromZoneLabel: 'Origin zone:', toZoneLabel: 'Destination zone:',
      priceLabel: 'Estimated price', bookBtn: 'Book via WhatsApp',
      perVehicle: 'per vehicle · 1–4 passengers',
      groupNote: 'Group of more than 4 — get a quote via WhatsApp',
      waBtn: 'Quote via WhatsApp',
      waSub: 'Get a quote for tours and packages directly on WhatsApp.',
      mapsLoading: 'Loading search…',
    },
  };
  const t = L[lang] || L.es;

  const inputStyle = {
    width: '100%', padding: '11px 14px 11px 40px',
    borderRadius: 10, border: '1.5px solid rgba(10,10,10,0.1)',
    fontSize: 14, fontFamily: 'Inter, sans-serif',
    background: '#fff', outline: 'none', boxSizing: 'border-box',
    transition: 'border-color .15s', color: '#0a0a0a',
  };
  const labelStyle = {
    display: 'block', fontSize: 10, fontWeight: 700,
    letterSpacing: 1.2, color: 'rgba(10,10,10,0.45)',
    textTransform: 'uppercase', marginBottom: 6,
  };
  const iconWrap = (color) => ({
    position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
    color: color || accent, display: 'flex', alignItems: 'center',
  });

  const tabLabels = t.tabs;

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
        {['traslado', 'tour', 'paquete'].map((id, i) => (
          <button key={id} onClick={() => setTab(id)} style={{
            border: 'none', borderRadius: 9, padding: '9px 4px',
            fontWeight: 700, fontSize: 13,
            background: tab === id ? '#fff' : 'transparent',
            color: '#0a0a0a', cursor: 'pointer',
            boxShadow: tab === id ? '0 1px 4px rgba(0,0,0,0.12)' : 'none',
            transition: 'all .15s', fontFamily: 'Inter, sans-serif',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
          }}>
            <window.Icon name={i === 0 ? 'car' : i === 1 ? 'globe' : 'heart'} size={13} stroke={2} />
            {tabLabels[i]}
          </button>
        ))}
      </div>

      {/* Tour / Paquete → WhatsApp directo */}
      {tab !== 'traslado' && (
        <div style={{ textAlign: 'center', padding: '20px 0 8px' }}>
          <p style={{ color: 'rgba(10,10,10,0.6)', fontSize: 13, marginBottom: 16, lineHeight: 1.55 }}>
            {t.waSub}
          </p>
          <a href={`https://wa.me/${WA}`} target="_blank" rel="noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            background: '#25D366', color: '#fff', border: 'none',
            borderRadius: 10, padding: '12px 24px', fontWeight: 700,
            fontSize: 14, cursor: 'pointer', textDecoration: 'none',
          }}>
            <window.Icon name="whatsapp" size={16} stroke={2} />
            {t.waBtn}
          </a>
        </div>
      )}

      {tab === 'traslado' && (<>
        {/* DESDE */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>{t.from}</label>
          <div style={{ position: 'relative' }}>
            <span style={iconWrap()}><window.Icon name="plane" size={14} stroke={2} /></span>
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
            <div style={{ fontSize: 11, color: accentDk, marginTop: 5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
              <window.Icon name="pin" size={11} stroke={2.2} />
              {t.fromZoneLabel} {formatLocationName(fromVal)}
            </div>
          )}
        </div>

        {/* HACIA */}
        <div style={{ marginBottom: 14 }}>
          <label style={labelStyle}>{t.to}</label>
          <div style={{ position: 'relative' }}>
            <span style={iconWrap()}><window.Icon name="pin" size={14} stroke={2} /></span>
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
            <div style={{ fontSize: 11, color: accentDk, marginTop: 5, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 5 }}>
              <window.Icon name="pin" size={11} stroke={2.2} />
              {t.toZoneLabel} {formatLocationName(toVal)}
            </div>
          )}
        </div>

        {/* FECHA + PASAJEROS */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div>
            <label style={labelStyle}>{t.date}</label>
            <div style={{ position: 'relative' }}>
              <span style={iconWrap()}><window.Icon name="calendar" size={14} stroke={2} /></span>
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                style={{ ...inputStyle, paddingRight: 8 }} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t.pax}</label>
            <div style={{ position: 'relative' }}>
              <span style={iconWrap()}><window.Icon name="users" size={14} stroke={2} /></span>
              <input type="number" min={1} max={20} value={pax}
                onChange={e => { setPax(parseInt(e.target.value) || 1); setResult(null); }}
                style={inputStyle} />
            </div>
          </div>
        </div>

        {/* Ida y vuelta */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', fontSize: 13, marginBottom: 16, userSelect: 'none' }}>
          <input type="checkbox" checked={roundTrip}
            onChange={e => { setRoundTrip(e.target.checked); setResult(null); }}
            style={{ width: 16, height: 16, accentColor: accent }} />
          {t.round}
        </label>

        {/* Alerta error */}
        {result?.error && (
          <div style={{ background: '#fff3cd', borderRadius: 10, padding: '10px 14px', fontSize: 13, color: '#856404', marginBottom: 14, display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.Icon name="shield" size={14} stroke={2} /> {result.error}
          </div>
        )}

        {/* Resultado */}
        {result && !result.error && (
          <div style={{
            background: `linear-gradient(135deg, ${dark} 0%, #1a4028 100%)`,
            borderRadius: 14, padding: 20, marginBottom: 16, color: '#fff',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12, gap: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.fromZoneLabel}</div>
                <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{formatLocationName(fromVal)}</div>
              </div>
              <window.Icon name="arrowRight" size={16} stroke={2} />
              <div style={{ flex: 1, textAlign: 'right' }}>
                <div style={{ fontSize: 10, opacity: 0.6, marginBottom: 3, textTransform: 'uppercase', letterSpacing: 0.8 }}>{t.toZoneLabel}</div>
                <div style={{ fontWeight: 700, fontSize: 12, lineHeight: 1.3 }}>{formatLocationName(toVal)}</div>
              </div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 14 }}>
              <div style={{ fontSize: 10, opacity: 0.6, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 4 }}>
                {t.priceLabel} {result.roundTrip ? '· Ida y vuelta' : '· Solo ida'}
              </div>
              <div style={{ fontSize: 30, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -1, lineHeight: 1 }}>
                {lang === 'es'
                  ? `$${result.priceMXN.toLocaleString('es-MX')} MXN`
                  : `$${result.priceUSD} USD`}
              </div>
              <div style={{ fontSize: 11, opacity: 0.55, marginTop: 4 }}>
                {lang === 'es'
                  ? `≈ $${result.priceUSD} USD`
                  : `≈ $${result.priceMXN.toLocaleString('es-MX')} MXN`}
                {' · '}{t.perVehicle}
              </div>
            </div>
            <button onClick={handleBook} style={{
              marginTop: 14, width: '100%', background: '#25D366',
              color: '#fff', border: 'none', borderRadius: 10,
              padding: '13px 0', fontWeight: 700, fontSize: 14,
              cursor: 'pointer', fontFamily: 'Inter, sans-serif',
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
            }}>
              <window.Icon name="whatsapp" size={16} stroke={2} />
              {t.bookBtn}
            </button>
          </div>
        )}

        {/* Nota 5+ pax */}
        {pax > 4 && (
          <div style={{ background: 'rgba(31,168,74,0.08)', borderRadius: 10, padding: '10px 14px', fontSize: 12, color: accentDk, marginBottom: 14, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 8 }}>
            <window.Icon name="users" size={13} stroke={2} /> {t.groupNote}
          </div>
        )}

        {/* CTA */}
        <button onClick={handleQuote} disabled={loading} style={{
          width: '100%', background: loading ? 'rgba(10,10,10,0.35)' : dark,
          color: '#fff', border: 'none', borderRadius: 12,
          padding: '15px 0', fontWeight: 700, fontSize: 16,
          cursor: loading ? 'not-allowed' : 'pointer',
          fontFamily: 'Archivo, sans-serif', letterSpacing: 0.3,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          transition: 'background .2s',
        }}>
          {loading ? t.loading : <>{t.cta} <window.Icon name="arrowRight" size={16} stroke={2.2} /></>}
        </button>

        {/* Badge */}
        <div style={{
          marginTop: 14, padding: '10px 14px',
          background: 'rgba(31,168,74,0.07)', borderRadius: 10,
          display: 'flex', alignItems: 'center', gap: 10, fontSize: 12,
        }}>
          <window.Icon name="shield" size={16} stroke={2} style={{ color: accent, flexShrink: 0 }} />
          <span>
            <strong style={{ color: accent }}>{t.badge[0]}</strong>{' '}
            <span style={{ color: 'rgba(10,10,10,0.6)' }}>{t.badge[1]}</span>
          </span>
        </div>
      </>)}
    </div>
  );
};

Object.assign(window, { SmartQuoter });
