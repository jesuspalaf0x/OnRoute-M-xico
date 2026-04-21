// Variación 3: RICA EN INFO
// Dashboard-style. Densa en datos: comparador de traslados con tarifas visibles,
// filtros, mapa conceptual de rutas, testimonios, FAQ, blog preview, reviews reales.

const V3Dense = ({ lang, setLang, onNavigate }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const accentDark = '#0F6B2E';
  const scrollRef = React.useRef(null);
  const [activeTab, setActiveTab] = React.useState('traslado');
  const [menuOpen, setMenuOpen] = React.useState(false);

  // Tours dinámicos desde WordPress (fallback a estáticos mientras carga)
  const { tours: wpTours, loading: toursLoading } = window.useWPTours ? window.useWPTours() : { tours: [], loading: false };
  const toursList = wpTours.length > 0 ? wpTours : t.tours.list;

  // Blog dinámico desde WordPress
  const { posts: wpPosts, loading: postsLoading } = window.useWPPosts ? window.useWPPosts(3) : { posts: [], loading: false };

  const navigate = onNavigate || (() => {});

  const scrollTo = (id) => {
    const el = scrollRef.current?.querySelector(`[data-sec="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Pestañas del cotizador (Traslado / Tour / Paquete)
  const tabs = [
    { id: 'traslado', label: lang === 'es' ? 'Traslado' : 'Transfer', icon: 'car' },
    { id: 'tour',     label: lang === 'es' ? 'Tour'     : 'Tour',     icon: 'leaf' },
    { id: 'paquete',  label: lang === 'es' ? 'Paquete'  : 'Package',  icon: 'heart' },
  ];

  const navItems = [
    { label: lang === 'es' ? 'Inicio' : 'Home',               action: () => scrollTo('cotizar') },
    { label: lang === 'es' ? 'Tours y Actividades' : 'Tours', action: () => navigate('tours') },
    { label: lang === 'es' ? 'Nosotros' : 'About',            action: () => navigate('about') },
    { label: 'Blog',                                           action: () => navigate('blog') },
    { label: lang === 'es' ? 'Contacto' : 'Contact',          action: () => navigate('contact') },
  ];

  return (
    <div ref={scrollRef} style={{
      width: '100%', minHeight: '100vh', position: 'relative',
      background: '#f4f5f2', color: '#0a0a0a', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Top bar con contacto */}
      <div className="resp-header-top" style={{ background: '#0a1f12', color: '#fff', padding: '7px 32px', fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="phone" size={11} stroke={2}/> +52 998 000 0000</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="mail" size={11} stroke={2}/> hola@onroutemx.com</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent }}><window.Icon name="check" size={11} stroke={3}/> {lang === 'es' ? 'Cancelación gratis 24h antes' : 'Free cancellation 24h before'}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <window.LangToggle lang={lang} onChange={setLang} dark />
          <span style={{ display: 'flex', gap: 10 }}>
            <window.Icon name="instagram" size={13} stroke={1.8}/>
            <window.Icon name="facebook" size={13} stroke={1.8}/>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="resp-nav" style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '14px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}>
        <window.OnrouteLogo size={28} />
        <div className="hide-on-mobile" style={{ display: 'flex', gap: 22, fontSize: 13, fontWeight: 500 }}>
          {navItems.map((item, i) => (
            <a key={i} onClick={item.action} style={{ ...navLink3, cursor: 'pointer' }}>{item.label}</a>
          ))}
        </div>
        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => navigate('contact')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: accent, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
            {t.hero.cta}
          </button>
        </div>
        <button className="show-on-mobile" onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer' }}>
          <window.Icon name="menu" size={24} />
        </button>
      </nav>

      {menuOpen && (
        <div className="mobile-menu-overlay show-on-mobile-flex">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <window.OnrouteLogo size={28} />
            <button onClick={() => setMenuOpen(false)} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer' }}><window.Icon name="menu" size={24} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 22, fontWeight: 700, marginTop: 20 }}>
            {navItems.map((item, i) => (
              <a key={i} onClick={() => { item.action(); setMenuOpen(false); }} style={{ ...navLink3, cursor: 'pointer' }}>{item.label}</a>
            ))}
          </div>
        </div>
      )}

      {/* HERO — split, cotizador tabbed + datos flanqueando */}
      <section data-sec="cotizar" className="section-pad" style={{ padding: '32px 40px 40px' }}>
        <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 28, alignItems: 'stretch' }}>
          {/* Lado izquierdo: imagen con datos overlay */}
          <div className="hero-img" style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', minHeight: 520 }}>
            <window.ImagePlaceholder paletteKey="tulum" label="" aspect="4/3" rounded={16} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(160deg, rgba(10,31,18,0.55) 0%, rgba(10,31,18,0.25) 50%, rgba(10,31,18,0.75) 100%)' }}/>
            <div style={{ position: 'absolute', inset: 0, padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
              <div>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', padding: '5px 12px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, border: '1px solid rgba(255,255,255,0.2)' }}>
                  <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent }}/>
                  {t.hero.kicker}
                </div>
                <h1 className="title-h1" style={{ fontSize: 58, lineHeight: 1, letterSpacing: -1.8, margin: '18px 0 0 0', fontFamily: 'Archivo, sans-serif', fontWeight: 800, textWrap: 'balance' }}>
                  {t.hero.title1} {t.hero.title2} <span style={{ color: '#7dd87e' }}>{t.hero.title3}</span>.
                </h1>
                <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(255,255,255,0.85)', maxWidth: 420, marginTop: 16 }}>
                  {t.hero.sub}
                </p>
              </div>
              {/* Stats row en grid */}
              <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[
                  { n: '12K+', l: lang === 'es' ? 'Traslados' : 'Transfers' },
                  { n: '48', l: lang === 'es' ? 'Destinos' : 'Destinations' },
                  { n: '4.9', l: lang === 'es' ? 'Rating' : 'Rating' },
                  { n: '24/7', l: lang === 'es' ? 'Soporte' : 'Support' },
                ].map((s, i) => (
                  <div key={i} style={{ background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(8px)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(255,255,255,0.15)' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.6 }}>{s.n}</div>
                    <div style={{ fontSize: 10, opacity: 0.8, marginTop: 2 }}>{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lado derecho: cotizador con tabs */}
          <div style={{ background: '#fff', borderRadius: 16, padding: 24, border: '1px solid rgba(10,10,10,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', gap: 4, background: '#f4f5f2', padding: 4, borderRadius: 10, marginBottom: 20 }}>
              {tabs.map(tab => (
                <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
                  flex: 1, padding: '9px 12px', borderRadius: 7, border: 'none',
                  background: activeTab === tab.id ? '#fff' : 'transparent',
                  color: activeTab === tab.id ? '#0a0a0a' : 'rgba(10,10,10,0.6)',
                  fontSize: 12, fontWeight: 700, cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  boxShadow: activeTab === tab.id ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                  transition: 'all .15s', fontFamily: 'Inter, sans-serif',
                }}>
                  <window.Icon name={tab.icon} size={13} stroke={2}/> {tab.label}
                </button>
              ))}
            </div>
            <div style={{ flex: 1 }}>
              <window.Booker t={t.booker} variant="inline" accent={accent} />
            </div>
            <div style={{ marginTop: 16, padding: 12, background: '#f0f7f2', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10, fontSize: 11, color: accentDark }}>
              <window.Icon name="shield" size={14} stroke={2}/>
              <div>
                <strong>{lang === 'es' ? 'Mejor precio garantizado.' : 'Best price guaranteed.'}</strong>{' '}
                {lang === 'es' ? 'Si lo encuentras más barato, te igualamos la tarifa.' : 'Find it cheaper, we match the price.'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RUTAS POPULARES con tarifas — tabla densa */}
      <section className="section-pad" style={{ padding: '20px 40px 40px' }}>
        <div style={{ background: '#fff', borderRadius: 14, padding: 24, border: '1px solid rgba(10,10,10,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: accent, textTransform: 'uppercase' }}>{lang === 'es' ? 'Rutas populares' : 'Popular routes'}</div>
              <h3 style={{ fontSize: 20, fontWeight: 700, margin: '4px 0 0 0', letterSpacing: -0.4, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Tarifas fijas desde aeropuertos' : 'Flat rates from airports'}</h3>
            </div>
            <button style={ghostBtn3}>{lang === 'es' ? 'Ver todas las rutas' : 'See all routes'} <window.Icon name="arrowRight" size={12} stroke={2.2}/></button>
          </div>
          <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
            {[
              { from: 'CUN', to: 'Tulum', dur: '2h 00m', price: '$125', type: lang === 'es' ? 'Privado · 1-4 pax' : 'Private · 1-4 pax' },
              { from: 'CUN', to: 'Playa del Carmen', dur: '1h 10m', price: '$89', type: lang === 'es' ? 'Privado · 1-4 pax' : 'Private · 1-4 pax' },
              { from: 'CUN', to: 'Zona Hotelera', dur: '0h 20m', price: '$55', type: lang === 'es' ? 'Privado · 1-4 pax' : 'Private · 1-4 pax' },
              { from: 'TQO', to: 'Tulum Beach', dur: '0h 30m', price: '$65', type: lang === 'es' ? 'Privado · 1-4 pax' : 'Private · 1-4 pax' },
            ].map((r, i) => (
              <div key={i} style={{ padding: 14, border: '1px solid rgba(10,10,10,0.06)', borderRadius: 10, cursor: 'pointer', transition: 'all .15s' }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.background = '#f0f7f2'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.06)'; e.currentTarget.style.background = '#fff'; }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 700, marginBottom: 4, fontFamily: 'Archivo, sans-serif' }}>
                  <span>{r.from}</span>
                  <window.Icon name="arrowRight" size={11} stroke={2.2} color="rgba(10,10,10,0.4)"/>
                  <span>{r.to}</span>
                </div>
                <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.55)', marginBottom: 10, display: 'flex', gap: 8 }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}><window.Icon name="clock" size={10} stroke={2}/>{r.dur}</span>
                  <span>·</span>
                  <span>{r.type}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 10, borderTop: '1px dashed rgba(10,10,10,0.08)' }}>
                  <span style={{ fontSize: 9, color: 'rgba(10,10,10,0.5)', fontWeight: 600, letterSpacing: 0.5, textTransform: 'uppercase' }}>{t.booker.price}</span>
                  <span style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{r.price} <span style={{ fontSize: 10, fontWeight: 500, color: 'rgba(10,10,10,0.5)' }}>USD</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICIOS — lista compacta con sub-bullets */}
      <section data-sec="servicios" className="section-pad" style={{ padding: '40px 40px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 32 }}>
          <div>
            <div style={kicker3(accent)}>{t.services.kicker}</div>
            <h2 style={sectionTitle3}>{t.services.title}</h2>
            <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', marginTop: 10, maxWidth: 540 }}>{t.services.sub}</p>
          </div>
        </div>
        <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {t.services.list.map((s, i) => {
            const icons = ['plane', 'car', 'leaf', 'users'];
            const features = [
              [lang === 'es' ? 'Vuelo monitoreado' : 'Flight tracking', lang === 'es' ? 'Sillas para bebé' : 'Baby seats', lang === 'es' ? 'Parada en OXXO' : 'OXXO stop'],
              [lang === 'es' ? 'Por horas o día completo' : 'Hourly or full-day', lang === 'es' ? 'Conductor bilingüe' : 'Bilingual driver', lang === 'es' ? 'Itinerario flexible' : 'Flexible route'],
              [lang === 'es' ? 'Guía certificado INAH' : 'INAH-certified guide', lang === 'es' ? 'Comida incluida' : 'Meal included', lang === 'es' ? 'Equipo snorkel' : 'Snorkel gear'],
              [lang === 'es' ? 'Van o Sprinter' : 'Van or Sprinter', lang === 'es' ? 'Hasta 16 pax' : 'Up to 16 pax', lang === 'es' ? 'Decoración eventos' : 'Event décor'],
            ];
            return (
              <div key={i} style={{ background: '#fff', borderRadius: 12, padding: 18, border: '1px solid rgba(10,10,10,0.06)', position: 'relative' }}>
                {s.tag && <div style={{ position: 'absolute', top: -8, right: 12, fontSize: 9, fontWeight: 800, letterSpacing: 0.8, textTransform: 'uppercase', color: '#fff', background: accent, padding: '3px 8px', borderRadius: 999 }}>{s.tag}</div>}
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(31,168,74,0.1)', color: accentDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <window.Icon name={icons[i]} size={18} stroke={2}/>
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 700, margin: 0, letterSpacing: -0.3, fontFamily: 'Archivo, sans-serif' }}>{s.t}</h3>
                </div>
                <p style={{ fontSize: 12, lineHeight: 1.5, color: 'rgba(10,10,10,0.6)', margin: '0 0 12px 0', textWrap: 'pretty' }}>{s.d}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid rgba(10,10,10,0.06)', paddingTop: 10 }}>
                  {features[i].map((f, j) => (
                    <li key={j} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: 'rgba(10,10,10,0.7)', padding: '3px 0' }}>
                      <window.Icon name="check" size={11} color={accent} stroke={3}/> {f}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </section>

      {/* DESTINOS */}
      <section data-sec="destinos" className="section-pad" style={{ padding: '40px 40px' }}>
        <div style={kicker3(accent)}>{t.destinos.kicker}</div>
        <h2 style={sectionTitle3}>{t.destinos.title}</h2>
        <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 24 }}>
          {t.destinos.list.map((d, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', cursor: 'pointer' }}>
              <window.ImagePlaceholder paletteKey={d.img} label="" aspect="4/2.5" rounded={0} showLabel={false}/>
              <div style={{ padding: '10px 12px' }}>
                <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{d.n}</div>
                <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.55)', marginTop: 2, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <window.Icon name="clock" size={9} stroke={2}/> {d.m}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOURS grid denso */}
      <section data-sec="tours" className="section-pad" style={{ padding: '40px 40px' }}>
        <div className="hide-on-mobile" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
          <div>
            <div style={kicker3(accent)}>{t.tours.kicker}</div>
            <h2 style={sectionTitle3}>{t.tours.title}</h2>
          </div>
          <div style={{ display: 'flex', gap: 6 }}>
            {[lang === 'es' ? 'Todos' : 'All', lang === 'es' ? 'Cenotes' : 'Cenotes', lang === 'es' ? 'Ruinas' : 'Ruins', lang === 'es' ? 'Islas' : 'Islands', lang === 'es' ? 'Gastro' : 'Food'].map((f, i) => (
              <button key={i} style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid rgba(10,10,10,0.12)', background: i === 0 ? '#0a0a0a' : '#fff', color: i === 0 ? '#fff' : '#0a0a0a', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f}</button>
            ))}
          </div>
        </div>
        {toursLoading && (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'rgba(10,10,10,0.4)', fontSize: 13, fontWeight: 600 }}>
            <div style={{ width: 28, height: 28, border: `3px solid ${accent}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 12px' }} />
            {lang === 'es' ? 'Cargando experiencias...' : 'Loading experiences...'}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}
        <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }}>
          {!toursLoading && toursList.map((tour, i) => (
            <div key={tour.id || i} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <div style={{ position: 'relative' }}>
                <window.ImagePlaceholder paletteKey={tour.img} isURL={!!tour.isURL} label="" aspect="4/3" rounded={0} showLabel={false}/>
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.95)', padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <window.Icon name="star" size={9} color="#F5B700" stroke={0}/> {tour.rating} <span style={{ opacity: 0.6 }}>({tour.rev})</span>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(8px)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600 }}>
                  {tour.dur}
                </div>
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 9, color: 'rgba(10,10,10,0.5)', letterSpacing: 0.4, marginBottom: 4, textTransform: 'uppercase', fontWeight: 700 }}>{tour.loc}</div>
                <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.2, lineHeight: 1.25, fontFamily: 'Archivo, sans-serif' }}>{tour.t}</h3>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
                  {(Array.isArray(tour.tags) ? tour.tags : []).map((tag, j) => <span key={j} style={{ fontSize: 9, background: '#f0f7f2', padding: '2px 6px', borderRadius: 3, color: accentDark, fontWeight: 600 }}>{tag}</span>)}
                </div>
                <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 8, borderTop: '1px solid rgba(10,10,10,0.06)' }}>
                  <div>
                    <div style={{ fontSize: 9, color: 'rgba(10,10,10,0.5)' }}>{t.booker.price}</div>
                    <div style={{ fontSize: 15, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{tour.price}</div>
                  </div>
                  <button style={{ padding: '5px 10px', borderRadius: 6, border: 'none', background: accent, color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{lang === 'es' ? 'Reservar' : 'Book'}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY + TESTIMONIOS en doble columna */}
      <section data-sec="why" className="section-pad" style={{ padding: '40px 40px' }}>
        <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 20 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 28, border: '1px solid rgba(10,10,10,0.06)' }}>
            <div style={kicker3(accent)}>{t.why.kicker}</div>
            <h2 style={{ ...sectionTitle3, fontSize: 30 }}>{t.why.title}</h2>
            <div className="resp-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 24 }}>
              {t.why.list.map((w, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 32, height: 32, flexShrink: 0, borderRadius: 8, background: 'rgba(31,168,74,0.1)', color: accentDark, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <window.Icon name={['plane','users','shield','phone'][i]} size={16} stroke={2}/>
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 4px 0', letterSpacing: -0.2, fontFamily: 'Archivo, sans-serif' }}>{w.t}</h4>
                    <p style={{ fontSize: 11, color: 'rgba(10,10,10,0.6)', margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>{w.d}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: '#0a1f12', color: '#fff', borderRadius: 14, padding: 28 }}>
            <div style={{ ...kicker3(accent), color: '#7dd87e' }}>{lang === 'es' ? 'Reseñas verificadas' : 'Verified reviews'}</div>
            <h2 style={{ ...sectionTitle3, color: '#fff', fontSize: 26 }}>{lang === 'es' ? '4.9 de 2,340 viajeros' : '4.9 from 2,340 travelers'}</h2>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
              {[
                { n: 'Sarah K.', c: '🇺🇸', text: lang === 'es' ? 'Nuestro conductor Luis nos esperó incluso cuando el vuelo llegó 2 horas tarde. Zero drama, auto impecable.' : 'Our driver Luis waited even when our flight was 2h late. Zero drama, spotless car.', r: 5, trip: 'CUN → Tulum' },
                { n: 'Thomas B.', c: '🇩🇪', text: lang === 'es' ? 'Mejor que Uber. Precio claro desde antes, whatsapp constante con el conductor. Recomendado.' : 'Better than Uber. Clear price upfront, constant WhatsApp with driver. Recommended.', r: 5, trip: 'CUN → PDC' },
              ].map((r, i) => (
                <div key={i} style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 14, border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                    <div style={{ fontSize: 12, fontWeight: 700 }}>{r.c} {r.n}</div>
                    <div style={{ display: 'flex', gap: 1 }}>{Array.from({ length: r.r }).map((_, j) => <window.Icon key={j} name="star" size={10} color="#F5B700" stroke={0}/>)}</div>
                  </div>
                  <p style={{ fontSize: 12, lineHeight: 1.5, margin: '0 0 8px 0', color: 'rgba(255,255,255,0.85)', textWrap: 'pretty' }}>"{r.text}"</p>
                  <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)', fontFamily: 'ui-monospace, monospace' }}>{r.trip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BLOG + FAQ */}
      <section data-sec="blog" className="section-pad" style={{ padding: '40px 40px' }}>
        <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 20 }}>
          <div>
            <div style={kicker3(accent)}>{lang === 'es' ? 'Del blog' : 'From the blog'}</div>
            <h2 style={sectionTitle3}>{lang === 'es' ? 'Guías para viajar mejor' : 'Guides to travel better'}</h2>
            <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 20 }}>
              {postsLoading && (
                <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '24px 0', color: 'rgba(10,10,10,0.4)', fontSize: 12 }}>
                  <div style={{ width: 20, height: 20, border: `2px solid ${accent}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 8px' }} />
                  {lang === 'es' ? 'Cargando artículos...' : 'Loading articles...'}
                </div>
              )}
              {!postsLoading && wpPosts.map((p, i) => (
                <a key={p.id || i} href={p.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ background: '#fff', borderRadius: 10, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', cursor: 'pointer', height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {p.isURL && p.img ? (
                      <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
                        <img src={p.img} alt={p.t} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }} />
                      </div>
                    ) : (
                      <window.ImagePlaceholder paletteKey="tulum" label="" aspect="4/3" rounded={0} showLabel={false}/>
                    )}
                    <div style={{ padding: 12, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ fontSize: 9, color: accent, fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>{p.cat} · {p.readMin}</div>
                      <h4 style={{ fontSize: 12, fontWeight: 700, margin: '0 0 6px', letterSpacing: -0.2, lineHeight: 1.3, fontFamily: 'Archivo, sans-serif' }}>{p.t}</h4>
                      <p style={{ fontSize: 10, color: 'rgba(10,10,10,0.55)', margin: 0, lineHeight: 1.4, flex: 1 }}>{p.excerpt.length > 80 ? p.excerpt.slice(0, 80) + '…' : p.excerpt}</p>
                      <div style={{ fontSize: 9, color: 'rgba(10,10,10,0.35)', marginTop: 8 }}>{p.date}</div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <div style={kicker3(accent)}>FAQ</div>
            <h2 style={sectionTitle3}>{lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked'}</h2>
            <div style={{ marginTop: 20, display: 'flex', flexDirection: 'column', gap: 8 }}>
              {[
                { q: lang === 'es' ? '¿Qué pasa si mi vuelo se retrasa?' : 'What if my flight is delayed?', a: lang === 'es' ? 'Monitoreamos tu vuelo en tiempo real. Sin cargos extra.' : 'We track your flight in real time. No extra charges.' },
                { q: lang === 'es' ? '¿Puedo cancelar mi reserva?' : 'Can I cancel my booking?', a: lang === 'es' ? 'Sí, gratis hasta 24h antes del servicio.' : 'Yes, free up to 24h before service.' },
                { q: lang === 'es' ? '¿Aceptan tarjeta de crédito?' : 'Do you accept credit cards?', a: lang === 'es' ? 'Sí, Visa, Mastercard, Amex y PayPal.' : 'Yes, Visa, Mastercard, Amex and PayPal.' },
                { q: lang === 'es' ? '¿El conductor habla inglés?' : 'Does the driver speak English?', a: lang === 'es' ? 'Todos nuestros conductores son bilingües ES/EN.' : 'All our drivers are bilingual ES/EN.' },
              ].map((f, i) => <FAQItem key={i} q={f.q} a={f.a} accent={accent}/>)}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Contacto */}
      <section data-sec="contacto" className="section-pad" style={{ padding: '60px 40px', background: '#0a0a0a', color: '#fff' }}>
        <div className="contact-footer-split" style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: 60, alignItems: 'center' }}>
          <div>
            <h2 style={{ fontSize: 52, fontWeight: 800, margin: 0, letterSpacing: -1.6, fontFamily: 'Archivo, sans-serif', lineHeight: 1, textWrap: 'balance' }}>
              {lang === 'es' ? <>¿Listo para <span style={{ color: accent }}>rodar</span>?</> : <>Ready to <span style={{ color: accent }}>roll</span>?</>}
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', marginTop: 16, maxWidth: 500 }}>
              {lang === 'es' ? 'Cotiza en 30 segundos, escríbenos por WhatsApp o llámanos. Como prefieras.' : 'Quote in 30 sec, WhatsApp us or call. Whichever works.'}
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'whatsapp', t: 'WhatsApp', s: '+52 998 000 0000', bg: '#25D366' },
              { icon: 'phone', t: lang === 'es' ? 'Teléfono' : 'Phone', s: '+52 998 000 0000', bg: 'rgba(255,255,255,0.08)' },
              { icon: 'mail', t: 'Email', s: 'hola@onroutemx.com', bg: 'rgba(255,255,255,0.08)' },
            ].map((c, i) => (
              <a key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: '14px 18px', borderRadius: 10, background: c.bg, border: c.bg.includes('rgba') ? '1px solid rgba(255,255,255,0.1)' : 'none', cursor: 'pointer' }}>
                <div style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.Icon name={c.icon} size={16} stroke={2}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600 }}>{c.t}</div>
                  <div style={{ fontSize: 14, fontWeight: 700, fontFamily: 'Archivo, sans-serif' }}>{c.s}</div>
                </div>
                <window.Icon name="arrowRight" size={14} stroke={2.2}/>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer denso */}
      <footer className="section-pad" style={{ padding: '36px 40px 20px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 11, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 28 }}>
          <div>
            <window.OnrouteLogo size={24} color="#fff"/>
            <p style={{ marginTop: 12, lineHeight: 1.6, maxWidth: 240, fontSize: 11 }}>{lang === 'es' ? 'Traslados privados y tours en la Riviera Maya y Yucatán.' : 'Private transfers and tours in the Riviera Maya and Yucatán.'}</p>
          </div>
          {[
            { t: t.nav.servicios, l: t.services.list.map(s => s.t) },
            { t: t.nav.destinos, l: t.destinos.list.slice(0, 4).map(d => d.n) },
            { t: t.nav.tours, l: t.tours.list.slice(0, 4).map(x => x.loc) },
            { t: lang === 'es' ? 'Empresa' : 'Company', l: [t.nav.nosotros, t.nav.blog, t.nav.contacto, 'FAQ'] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ color: '#fff', fontWeight: 700, marginBottom: 12, fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}>{col.t}</div>
              {col.l.map((x, j) => <a key={j} style={{ display: 'block', color: 'inherit', padding: '3px 0', cursor: 'pointer' }}>{x}</a>)}
            </div>
          ))}
        </div>
        <div className="resp-stack-col" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>{t.footer.rights}</div>
          <div style={{ display: 'flex', gap: 16 }}>{t.footer.links.map((l, i) => <a key={i} style={{ color: 'inherit', cursor: 'pointer' }}>{l}</a>)}</div>
        </div>
      </footer>

      <window.WhatsappFAB label={lang === 'es' ? 'Cotiza ahora' : 'Quote now'} />
    </div>
  );
};

const FAQItem = ({ q, a, accent }) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ background: '#fff', borderRadius: 8, border: '1px solid rgba(10,10,10,0.06)', overflow: 'hidden' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', padding: '12px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
        <span style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a', letterSpacing: -0.1 }}>{q}</span>
        <span style={{ color: accent, transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><window.Icon name="chevronDown" size={14} stroke={2.2}/></span>
      </button>
      {open && <div style={{ padding: '0 14px 12px 14px', fontSize: 11, color: 'rgba(10,10,10,0.65)', lineHeight: 1.55 }}>{a}</div>}
    </div>
  );
};

const navLink3 = { color: 'rgba(10,10,10,0.75)', cursor: 'pointer' };
const kicker3 = (accent) => ({ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: accent, textTransform: 'uppercase', marginBottom: 8, fontFamily: 'Inter, sans-serif' });
const sectionTitle3 = { fontSize: 32, fontWeight: 800, margin: 0, letterSpacing: -1, lineHeight: 1.05, fontFamily: 'Archivo, sans-serif', textWrap: 'balance', maxWidth: 680 };
const ghostBtn3 = { padding: '8px 14px', borderRadius: 999, border: '1px solid rgba(10,10,10,0.15)', background: '#fff', color: '#0a0a0a', fontSize: 11, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' };

window.V3Dense = V3Dense;
