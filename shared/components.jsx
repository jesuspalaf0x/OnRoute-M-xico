// Componentes compartidos: ImagePlaceholder, Logo, WhatsappFAB, Booker, Icons

const OnrouteLogo = ({ size = 28, color = '#0a0a0a', accent = '#1FA84A', showText = true }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <svg width={size} height={size * 1.08} viewBox="0 0 100 108" fill="none">
      {/* Pin shape inspired by logo */}
      <path d="M50 4 C25 4 8 22 8 46 C8 68 30 90 50 104 C70 90 92 68 92 46 C92 22 75 4 50 4 Z" fill={accent}/>
      <circle cx="50" cy="44" r="22" fill="#fff"/>
      <circle cx="50" cy="44" r="6" fill={accent}/>
      <path d="M50 50 L50 76" stroke={accent} strokeWidth="5" strokeLinecap="round"/>
    </svg>
    {showText && (
      <div style={{ lineHeight: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <span style={{ fontSize: size * 0.32, letterSpacing: 0.4, color: color, opacity: 0.7, fontWeight: 500, fontFamily: 'Inter, sans-serif' }}>Travel & Experiences</span>
        <span style={{ fontSize: size * 0.78, fontWeight: 800, color: color, letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif' }}>Onroute</span>
      </div>
    )}
  </div>
);

// Placeholder de imagen con gradientes tonales (evoca el ambiente sin ser slop SVG)
const ImagePlaceholder = ({ paletteKey, label, aspect = '4/3', rounded = 8, style = {}, showLabel = true }) => {
  const [a, b, c] = window.paletteFor(paletteKey);
  const id = `g-${paletteKey}-${Math.random().toString(36).slice(2, 7)}`;
  return (
    <div style={{ position: 'relative', aspectRatio: aspect, width: '100%', borderRadius: rounded, overflow: 'hidden', ...style }}>
      <svg width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 400 300" style={{ display: 'block' }}>
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor={a} />
            <stop offset="60%" stopColor={b} />
            <stop offset="100%" stopColor={c} />
          </linearGradient>
          <pattern id={id + 'p'} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(15)">
            <rect width="8" height="8" fill="transparent"/>
            <rect width="1" height="8" fill="rgba(255,255,255,0.08)"/>
          </pattern>
        </defs>
        <rect width="400" height="300" fill={`url(#${id})`}/>
        <rect width="400" height="300" fill={`url(#${id}p)`}/>
        {/* Soft horizon band evoking sea + sky */}
        <rect y="160" width="400" height="2" fill="rgba(255,255,255,0.25)"/>
        <circle cx="320" cy="80" r="28" fill="rgba(255,255,255,0.18)"/>
      </svg>
      {showLabel && label && (
        <div style={{ position: 'absolute', bottom: 10, left: 12, fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'rgba(255,255,255,0.85)', textShadow: '0 1px 2px rgba(0,0,0,0.3)', letterSpacing: 0.4 }}>
          [ {label} ]
        </div>
      )}
    </div>
  );
};

// Iconos minimalistas en línea (stroke-based, 1.6)
const Icon = ({ name, size = 20, color = 'currentColor', stroke = 1.6 }) => {
  const paths = {
    arrowRight: 'M5 12h14M13 6l6 6-6 6',
    arrowUp: 'M12 5v14M6 11l6-6 6 6',
    plane: 'M2 16L22 7l-3 11-7-3-3 5-2-5-5-1 1-2z',
    car: 'M5 17h14M6 17v-5l2-5h8l2 5v5M8 12h8M7 17a2 2 0 104 0M13 17a2 2 0 104 0',
    calendar: 'M3 8h18M7 3v4M17 3v4M4 8v12h16V8H4',
    users: 'M9 11a4 4 0 100-8 4 4 0 000 8zM2 21v-2a6 6 0 0112 0v2M16 11a4 4 0 100-8M22 21v-2a6 6 0 00-4-5.6',
    pin: 'M12 22s-8-8-8-14a8 8 0 1116 0c0 6-8 14-8 14zM12 10a2 2 0 100-4 2 2 0 000 4z',
    clock: 'M12 6v6l4 2M22 12a10 10 0 11-20 0 10 10 0 0120 0z',
    star: 'M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1L12 2z',
    check: 'M5 12l5 5 9-11',
    whatsapp: 'M12 3a9 9 0 00-7.8 13.5L3 21l4.6-1.2A9 9 0 1012 3zm0 16.4a7.4 7.4 0 01-3.8-1.1l-.3-.2-2.7.7.7-2.6-.2-.3a7.4 7.4 0 1110.9 2.6 7.4 7.4 0 01-4.6.9zM16 14c-.2-.1-1.2-.6-1.4-.7-.2-.1-.3-.1-.5.1l-.6.8c-.1.1-.2.2-.4.1-.5-.2-1-.5-1.5-.9-.4-.4-.8-.9-1.1-1.4 0-.2 0-.3.1-.4l.3-.3.2-.3v-.3c-.1-.1-.5-1.1-.7-1.5-.1-.4-.3-.4-.5-.4h-.4a.9.9 0 00-.6.2c-.3.3-.8.7-.8 1.7 0 1 .7 2 .8 2.1.1.2 1.5 2.3 3.6 3.1.5.2.9.3 1.2.4.5.2.9.2 1.3.1.4-.1 1.2-.5 1.3-1 .2-.4.2-.8.1-1l-.3-.2z',
    chevron: 'M9 6l6 6-6 6',
    chevronDown: 'M6 9l6 6 6-6',
    search: 'M11 19a8 8 0 100-16 8 8 0 000 16zM21 21l-4.3-4.3',
    globe: 'M12 22a10 10 0 100-20 10 10 0 000 20zM2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20',
    shield: 'M12 2l9 4v6c0 5-4 9-9 10-5-1-9-5-9-10V6l9-4z',
    leaf: 'M21 3c-7 0-15 3-15 13 0 2 1 5 1 5s3-9 13-13c0 0-5 3-8 8',
    heart: 'M12 21s-7-4.5-9.5-9A5.5 5.5 0 0112 6a5.5 5.5 0 019.5 6C19 16.5 12 21 12 21z',
    menu: 'M3 6h18M3 12h18M3 18h18',
    phone: 'M22 16.9v3a2 2 0 01-2.2 2 20 20 0 01-8.6-3.1 20 20 0 01-6-6A20 20 0 012 4.2 2 2 0 014 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.5 2.1L7.9 9.6a16 16 0 006 6l1.2-1.2a2 2 0 012.1-.5c.8.3 1.7.5 2.6.6a2 2 0 011.7 2z',
    mail: 'M4 4h16c1 0 2 1 2 2v12c0 1-1 2-2 2H4c-1 0-2-1-2-2V6c0-1 1-2 2-2zM22 6l-10 7L2 6',
    instagram: 'M16 3H8a5 5 0 00-5 5v8a5 5 0 005 5h8a5 5 0 005-5V8a5 5 0 00-5-5zM12 8a4 4 0 110 8 4 4 0 010-8zM17.5 6.5h.01',
    facebook: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3V2z',
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      <path d={paths[name]} />
    </svg>
  );
};

// WhatsApp flotante
const WhatsappFAB = ({ bottom = 24, right = 24, label }) => {
  const [hover, setHover] = React.useState(false);
  return (
    <div style={{ position: 'absolute', bottom, right, zIndex: 50, display: 'flex', alignItems: 'center', gap: 12 }}>
      {label && (
        <div style={{
          background: '#fff', padding: '8px 14px', borderRadius: 999, fontSize: 12, fontWeight: 600, color: '#0a0a0a',
          boxShadow: '0 4px 20px rgba(0,0,0,0.12)', opacity: hover ? 1 : 0.95, transition: 'all .2s',
          whiteSpace: 'nowrap',
        }}>{label}</div>
      )}
      <button
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        onClick={(e) => { e.preventDefault(); alert('Abriendo WhatsApp: +52 998 000 0000'); }}
        style={{
          width: 56, height: 56, borderRadius: '50%', border: 'none', cursor: 'pointer',
          background: '#25D366', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: hover ? '0 8px 28px rgba(37,211,102,0.5)' : '0 4px 18px rgba(37,211,102,0.35)',
          transform: hover ? 'scale(1.08)' : 'scale(1)',
          transition: 'all .2s cubic-bezier(.2,.7,.3,1)',
        }}
      >
        <Icon name="whatsapp" size={28} />
      </button>
    </div>
  );
};

// Selector de idioma compacto
const LangToggle = ({ lang, onChange, dark = false }) => {
  const base = dark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.55)';
  const active = dark ? '#fff' : '#0a0a0a';
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 2, fontSize: 12, fontWeight: 600, letterSpacing: 0.4, fontFamily: 'Inter, sans-serif' }}>
      <button onClick={() => onChange('es')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'es' ? active : base, fontWeight: lang === 'es' ? 700 : 500 }}>ES</button>
      <span style={{ color: base }}>/</span>
      <button onClick={() => onChange('en')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px 6px', color: lang === 'en' ? active : base, fontWeight: lang === 'en' ? 700 : 500 }}>EN</button>
    </div>
  );
};

// Cotizador funcional (validación real, estados de loading)
const Booker = ({ t, variant = 'card', accent = '#1FA84A' }) => {
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [date, setDate] = React.useState('');
  const [pax, setPax] = React.useState(2);
  const [round, setRound] = React.useState(false);
  const [state, setState] = React.useState('idle'); // idle | loading | quoted
  const [price, setPrice] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const isValid = from.trim() && to.trim() && date;

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!from.trim()) errs.from = true;
    if (!to.trim()) errs.to = true;
    if (!date) errs.date = true;
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setState('loading');
    setTimeout(() => {
      // Simula precio en base a pasajeros y si es round trip
      const base = 89 + pax * 8;
      setPrice((round ? base * 1.8 : base).toFixed(0));
      setState('quoted');
    }, 900);
  };

  const reset = () => { setState('idle'); setPrice(null); };

  const isInline = variant === 'inline';
  const isDark = variant === 'dark';

  const fieldBg = isDark ? 'rgba(255,255,255,0.08)' : '#fff';
  const fieldBorder = isDark ? 'rgba(255,255,255,0.15)' : 'rgba(10,10,10,0.08)';
  const fieldText = isDark ? '#fff' : '#0a0a0a';
  const labelColor = isDark ? 'rgba(255,255,255,0.7)' : 'rgba(10,10,10,0.55)';

  const Field = ({ label, icon, children, err }) => (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: err ? '#dc2626' : labelColor, textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>{label}</div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: fieldBg, border: `1px solid ${err ? '#dc2626' : fieldBorder}`, borderRadius: 10, padding: '10px 12px', transition: 'all .15s' }}>
        <div style={{ color: err ? '#dc2626' : accent, display: 'flex' }}><Icon name={icon} size={16} stroke={1.8} /></div>
        {children}
      </div>
    </div>
  );

  if (state === 'quoted') {
    return (
      <div style={{
        background: isDark ? 'rgba(255,255,255,0.06)' : '#fff',
        border: `1px solid ${fieldBorder}`,
        borderRadius: 16, padding: 24,
        boxShadow: isInline ? 'none' : '0 12px 40px rgba(0,0,0,0.12)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 18 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.5, color: labelColor, textTransform: 'uppercase', marginBottom: 4 }}>{t.price}</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
              <span style={{ fontSize: 44, fontWeight: 800, color: fieldText, letterSpacing: -1.5, fontFamily: 'Archivo, sans-serif', lineHeight: 1 }}>${price}</span>
              <span style={{ fontSize: 14, color: labelColor, fontWeight: 600 }}>USD</span>
            </div>
          </div>
          <button onClick={reset} style={{ background: 'none', border: 'none', cursor: 'pointer', color: labelColor, fontSize: 12, fontWeight: 600, textDecoration: 'underline' }}>Editar</button>
        </div>
        <div style={{ fontSize: 13, color: labelColor, marginBottom: 16, lineHeight: 1.5 }}>
          <div>{from} → {to}</div>
          <div>{date} · {pax} pax {round && '· ida y vuelta'}</div>
        </div>
        <button style={{
          width: '100%', padding: '14px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
          background: accent, color: '#fff', fontSize: 14, fontWeight: 700, letterSpacing: 0.3,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          fontFamily: 'Inter, sans-serif',
        }}>
          Reservar ahora <Icon name="arrowRight" size={16} stroke={2.2} />
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{
      background: isInline ? 'transparent' : (isDark ? 'rgba(255,255,255,0.06)' : '#fff'),
      border: isInline ? 'none' : `1px solid ${fieldBorder}`,
      borderRadius: 16, padding: isInline ? 0 : 20,
      boxShadow: isInline ? 'none' : (isDark ? '0 12px 40px rgba(0,0,0,0.3)' : '0 12px 40px rgba(0,0,0,0.08)'),
      backdropFilter: isDark ? 'blur(12px)' : 'none',
    }}>
      {!isInline && (
        <div style={{ fontSize: 14, fontWeight: 700, color: fieldText, marginBottom: 14, letterSpacing: -0.2, fontFamily: 'Inter, sans-serif' }}>
          {t.title}
        </div>
      )}
      <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 10 }}>
        <Field label={t.from} icon="plane" err={errors.from}>
          <input value={from} onChange={(e) => { setFrom(e.target.value); setErrors({ ...errors, from: false }); }}
            placeholder={t.fromPH}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: fieldText, fontWeight: 500, fontFamily: 'Inter, sans-serif', minWidth: 0 }}/>
        </Field>
        <Field label={t.to} icon="pin" err={errors.to}>
          <input value={to} onChange={(e) => { setTo(e.target.value); setErrors({ ...errors, to: false }); }}
            placeholder={t.toPH}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: fieldText, fontWeight: 500, fontFamily: 'Inter, sans-serif', minWidth: 0 }}/>
        </Field>
      </div>
      <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 10, marginBottom: 12 }}>
        <Field label={t.date} icon="calendar" err={errors.date}>
          <input type="date" value={date} onChange={(e) => { setDate(e.target.value); setErrors({ ...errors, date: false }); }}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: fieldText, fontWeight: 500, fontFamily: 'Inter, sans-serif', minWidth: 0 }}/>
        </Field>
        <Field label={t.pax} icon="users">
          <select value={pax} onChange={(e) => setPax(+e.target.value)}
            style={{ flex: 1, border: 'none', background: 'transparent', outline: 'none', fontSize: 13, color: fieldText, fontWeight: 500, fontFamily: 'Inter, sans-serif', minWidth: 0, appearance: 'none' }}>
            {[1,2,3,4,5,6,8,10,12,16].map(n => <option key={n} value={n} style={{ color: '#0a0a0a' }}>{n}</option>)}
          </select>
        </Field>
      </div>
      <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12, color: labelColor, fontWeight: 600, marginBottom: 14, cursor: 'pointer', userSelect: 'none' }}>
        <input type="checkbox" checked={round} onChange={(e) => setRound(e.target.checked)} style={{ accentColor: accent, width: 14, height: 14 }}/>
        {t.round}
      </label>
      <button type="submit" disabled={state === 'loading'} style={{
        width: '100%', padding: '14px 18px', borderRadius: 10, border: 'none', cursor: state === 'loading' ? 'wait' : 'pointer',
        background: isValid ? accent : (isDark ? 'rgba(255,255,255,0.2)' : 'rgba(10,10,10,0.88)'),
        color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 0.5,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        transition: 'all .15s', fontFamily: 'Inter, sans-serif',
        opacity: state === 'loading' ? 0.7 : 1,
      }}>
        {state === 'loading' ? (
          <>
            <span style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.4)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }}/>
            Calculando...
          </>
        ) : (
          <>{t.submit} <Icon name="arrowRight" size={16} stroke={2.2} /></>
        )}
      </button>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </form>
  );
};

Object.assign(window, { OnrouteLogo, ImagePlaceholder, Icon, WhatsappFAB, LangToggle, Booker });
