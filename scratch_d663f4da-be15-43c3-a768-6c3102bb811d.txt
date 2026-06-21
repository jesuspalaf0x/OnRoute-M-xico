// Subpáginas comunes: Header, Footer reutilizables + Páginas (Tours, TourDetail, About, Contact, Blog, BlogPost, FAQ, Checkout)

const Header = ({ lang, setLang, page, setPage }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const links = [
    { id: 'home', label: t.nav.inicio },
    { id: 'tours', label: t.nav.tours },
    { id: 'about', label: t.nav.nosotros },
    { id: 'blog', label: t.nav.blog },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: t.nav.contacto },
  ];
  return (
    <>
      <div style={{ background: '#0a1f12', color: '#fff', padding: '7px 32px', fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="phone" size={11} stroke={2}/> +52 998 000 0000</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="mail" size={11} stroke={2}/> hola@onroutemx.com</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent }}><window.Icon name="check" size={11} stroke={3}/> {lang === 'es' ? 'Cancelación gratis 24h antes' : 'Free cancellation 24h before'}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <window.LangToggle lang={lang} onChange={setLang} dark />
          <span style={{ display: 'flex', gap: 10 }}><window.Icon name="instagram" size={13} stroke={1.8}/><window.Icon name="facebook" size={13} stroke={1.8}/></span>
        </div>
      </div>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '14px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}>
        <a onClick={() => setPage('home')} style={{ cursor: 'pointer' }}><window.OnrouteLogo size={28} /></a>
        <div style={{ display: 'flex', gap: 22, fontSize: 13, fontWeight: 500 }}>
          {links.map(l => (
            <a key={l.id} onClick={() => setPage(l.id)} style={{ color: page === l.id ? accent : 'rgba(10,10,10,0.75)', cursor: 'pointer', fontWeight: page === l.id ? 700 : 500 }}>{l.label}</a>
          ))}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{ padding: '8px 14px', borderRadius: 8, border: '1px solid rgba(10,10,10,0.12)', background: 'transparent', fontSize: 12, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {lang === 'es' ? 'Mi reserva' : 'My booking'}
          </button>
          <button onClick={() => setPage('home')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: accent, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
            {t.hero.cta}
          </button>
        </div>
      </nav>
    </>
  );
};

const Footer = ({ lang, setPage }) => {
  const t = window.COPY[lang];
  return (
    <footer style={{ padding: '36px 40px 20px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 28 }}>
        <div>
          <window.OnrouteLogo size={24} color="#fff"/>
          <p style={{ marginTop: 12, lineHeight: 1.6, maxWidth: 240, fontSize: 11 }}>{lang === 'es' ? 'Traslados privados y tours en la Riviera Maya y Yucatán.' : 'Private transfers and tours in Riviera Maya and Yucatán.'}</p>
        </div>
        {[
          { t: t.nav.servicios, l: t.services.list.map(s => ({ label: s.t, page: 'home' })) },
          { t: t.nav.destinos, l: t.destinos.list.slice(0, 4).map(d => ({ label: d.n, page: 'tours' })) },
          { t: t.nav.tours, l: t.tours.list.slice(0, 4).map(x => ({ label: x.loc, page: 'tours' })) },
          { t: lang === 'es' ? 'Empresa' : 'Company', l: [{ label: t.nav.nosotros, page: 'about' }, { label: t.nav.blog, page: 'blog' }, { label: t.nav.contacto, page: 'contact' }, { label: 'FAQ', page: 'faq' }] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 12, fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}>{col.t}</div>
            {col.l.map((x, j) => <a key={j} onClick={() => setPage && setPage(x.page)} style={{ display: 'block', color: 'inherit', padding: '3px 0', cursor: 'pointer' }}>{x.label}</a>)}
          </div>
        ))}
      </div>
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{t.footer.rights}</div>
        <div style={{ display: 'flex', gap: 16 }}>{t.footer.links.map((l, i) => <a key={i} style={{ color: 'inherit', cursor: 'pointer' }}>{l}</a>)}</div>
      </div>
    </footer>
  );
};

// Breadcrumb hero para subpáginas
const PageHero = ({ kicker, title, sub, crumbs, imgKey }) => {
  const accent = '#1FA84A';
  return (
    <section style={{ padding: '32px 40px 0' }}>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', minHeight: 320 }}>
        <window.ImagePlaceholder paletteKey={imgKey || 'tulum'} label="" aspect="16/5" rounded={16} showLabel={false} style={{ height: '100%', aspectRatio: 'auto', minHeight: 320 }}/>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,31,18,0.45) 0%, rgba(10,31,18,0.75) 100%)' }}/>
        <div style={{ position: 'absolute', inset: 0, padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
          {crumbs && <div style={{ fontSize: 11, marginBottom: 12, opacity: 0.75, display: 'flex', gap: 6 }}>{crumbs.map((c, i) => <React.Fragment key={i}>{i > 0 && <span>/</span>}<span>{c}</span></React.Fragment>)}</div>}
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#7dd87e', textTransform: 'uppercase', marginBottom: 8 }}>{kicker}</div>
          <h1 style={{ fontSize: 48, lineHeight: 1, letterSpacing: -1.4, margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 800, textWrap: 'balance', maxWidth: 760 }}>{title}</h1>
          {sub && <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', maxWidth: 620, marginTop: 14, marginBottom: 0 }}>{sub}</p>}
        </div>
      </div>
    </section>
  );
};

// PÁGINA: Tours (listing con filtros)
const ToursPage = ({ lang, setPage, setTourIdx }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('featured');
  const filters = [
    { id: 'all', label: lang === 'es' ? 'Todos' : 'All' },
    { id: 'cenotes', label: lang === 'es' ? 'Cenotes' : 'Cenotes' },
    { id: 'ruins', label: lang === 'es' ? 'Ruinas' : 'Ruins' },
    { id: 'islands', label: lang === 'es' ? 'Islas' : 'Islands' },
    { id: 'food', label: lang === 'es' ? 'Gastro' : 'Food' },
  ];
  // Duplicar tours para que se vea un catálogo más lleno
  const all = [...t.tours.list, ...t.tours.list.map(x => ({ ...x, t: x.t.replace('Tulum','Mérida').replace('Holbox','Bacalar'), price: '$' + (parseInt(x.price.replace(/[$,]/g,''))+200).toLocaleString('en-US',{minimumFractionDigits:2}) }))];
  return (
    <>
      <PageHero
        kicker={lang === 'es' ? 'Tours & Experiencias' : 'Tours & Experiences'}
        title={lang === 'es' ? 'Tours que se quedan en la memoria' : 'Tours that stay with you'}
        sub={lang === 'es' ? 'Explora cenotes, ruinas mayas, islas y experiencias culinarias con guías locales certificados.' : 'Explore cenotes, Mayan ruins, islands and culinary experiences with certified local guides.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', lang === 'es' ? 'Tours' : 'Tours']}
        imgKey="tulum-tour"
      />
      <section style={{ padding: '32px 40px' }}>
        {/* Barra de filtros */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#fff', borderRadius: 12, border: '1px solid rgba(10,10,10,0.06)', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginRight: 8 }}>{lang === 'es' ? 'Filtrar:' : 'Filter:'}</span>
            {filters.map(f => (
              <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid ' + (filter === f.id ? '#0a0a0a' : 'rgba(10,10,10,0.12)'), background: filter === f.id ? '#0a0a0a' : '#fff', color: filter === f.id ? '#fff' : '#0a0a0a', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f.label}</button>
            ))}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
            <span style={{ color: 'rgba(10,10,10,0.5)' }}>{all.length} {lang === 'es' ? 'tours' : 'tours'}</span>
            <span style={{ color: 'rgba(10,10,10,0.2)' }}>·</span>
            <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(10,10,10,0.12)', fontSize: 12, fontFamily: 'Inter, sans-serif', background: '#fff', fontWeight: 600 }}>
              <option value="featured">{lang === 'es' ? 'Destacados' : 'Featured'}</option>
              <option value="price">{lang === 'es' ? 'Precio: menor a mayor' : 'Price: low to high'}</option>
              <option value="rating">{lang === 'es' ? 'Mejor calificados' : 'Top rated'}</option>
            </select>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
          {all.map((tour, i) => (
            <div key={i} onClick={() => { setTourIdx(i % t.tours.list.length); setPage('tour-detail'); }} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'transform .2s' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'relative' }}>
                <window.ImagePlaceholder paletteKey={tour.img} label="" aspect="4/3" rounded={0} showLabel={false}/>
                <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.95)', padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
                  <window.Icon name="star" size={9} color="#F5B700" stroke={0}/> {tour.rating} <span style={{ opacity: 0.6 }}>({tour.rev})</span>
                </div>
                <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(8px)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600 }}>{tour.dur}</div>
              </div>
              <div style={{ padding: 12, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 9, color: 'rgba(10,10,10,0.5)', letterSpacing: 0.4, marginBottom: 4, textTransform: 'uppercase', fontWeight: 700 }}>{tour.loc}</div>
                <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.2, lineHeight: 1.25, fontFamily: 'Archivo, sans-serif' }}>{tour.t}</h3>
                <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
                  {tour.tags.map((tag, j) => <span key={j} style={{ fontSize: 9, background: '#f0f7f2', padding: '2px 6px', borderRadius: 3, color: '#0F6B2E', fontWeight: 600 }}>{tag}</span>)}
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
    </>
  );
};

// PÁGINA: Tour detail
const TourDetailPage = ({ lang, setPage, tourIdx = 0 }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const tour = t.tours.list[tourIdx] || t.tours.list[0];
  const [pax, setPax] = React.useState(2);
  const [date, setDate] = React.useState('');
  const [tab, setTab] = React.useState('itinerary');
  const itinerary = [
    { time: '09:00', t: lang === 'es' ? 'Pick-up en tu hotel' : 'Pick-up at your hotel', d: lang === 'es' ? 'Recogida puntual en la recepción de tu hotel o Airbnb.' : 'On-time pick-up at your hotel or Airbnb reception.' },
    { time: '10:30', t: lang === 'es' ? 'Llegada a la zona arqueológica' : 'Arrival at the archaeological site', d: lang === 'es' ? 'Guía certificado te acompaña durante el recorrido.' : 'Certified guide joins you for the tour.' },
    { time: '13:00', t: lang === 'es' ? 'Comida tradicional' : 'Traditional lunch', d: lang === 'es' ? 'Buffet de comida yucateca en restaurante local.' : 'Yucatecan buffet at a local restaurant.' },
    { time: '15:00', t: lang === 'es' ? 'Baño en cenote' : 'Swim at cenote', d: lang === 'es' ? 'Nada en aguas cristalinas con equipo incluido.' : 'Swim in crystal waters, gear included.' },
    { time: '18:00', t: lang === 'es' ? 'Regreso' : 'Return', d: lang === 'es' ? 'Te dejamos de vuelta en tu hotel.' : 'Drop-off back at your hotel.' },
  ];

  return (
    <>
      <section style={{ padding: '24px 40px 0' }}>
        <a onClick={() => setPage('tours')} style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
          {lang === 'es' ? 'Volver a tours' : 'Back to tours'}
        </a>
      </section>

      <section style={{ padding: '16px 40px' }}>
        {/* Image gallery */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', gap: 8, marginBottom: 24, height: 380 }}>
          <window.ImagePlaceholder paletteKey={tour.img} label="" aspect="auto" rounded={12} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 8 }}>
            <window.ImagePlaceholder paletteKey="cenotes-tour" label="" aspect="auto" rounded={12} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
            <window.ImagePlaceholder paletteKey="tulum" label="" aspect="auto" rounded={12} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
          </div>
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 8 }}>
            <window.ImagePlaceholder paletteKey="chichen" label="" aspect="auto" rounded={12} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
            <window.ImagePlaceholder paletteKey="holbox" label="" aspect="auto" rounded={12} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40 }}>
          {/* Left: content */}
          <div>
            <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{tour.loc}</div>
            <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, letterSpacing: -1.2, fontFamily: 'Archivo, sans-serif', lineHeight: 1.05, textWrap: 'balance' }}>{tour.t}</h1>
            <div style={{ display: 'flex', gap: 20, marginTop: 14, fontSize: 12, color: 'rgba(10,10,10,0.7)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="star" size={12} color="#F5B700" stroke={0}/> <strong>{tour.rating}</strong> ({tour.rev} {lang === 'es' ? 'reseñas' : 'reviews'})</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="clock" size={12} stroke={2}/> {tour.dur}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="users" size={12} stroke={2}/> {lang === 'es' ? 'Hasta 12 personas' : 'Up to 12 people'}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="globe" size={12} stroke={2}/> ES / EN</span>
            </div>

            {/* Tags */}
            <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
              {tour.tags.map((tag, j) => <span key={j} style={{ fontSize: 11, background: '#f0f7f2', padding: '5px 10px', borderRadius: 6, color: '#0F6B2E', fontWeight: 600 }}>{tag}</span>)}
            </div>

            {/* Tabs */}
            <div style={{ marginTop: 32, borderBottom: '1px solid rgba(10,10,10,0.1)', display: 'flex', gap: 24 }}>
              {[
                { id: 'itinerary', label: lang === 'es' ? 'Itinerario' : 'Itinerary' },
                { id: 'includes', label: lang === 'es' ? 'Incluye' : 'Includes' },
                { id: 'reviews', label: lang === 'es' ? 'Reseñas' : 'Reviews' },
              ].map(x => (
                <button key={x.id} onClick={() => setTab(x.id)} style={{ padding: '10px 0', border: 'none', background: 'transparent', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: tab === x.id ? '#0a0a0a' : 'rgba(10,10,10,0.5)', borderBottom: '2px solid ' + (tab === x.id ? accent : 'transparent'), marginBottom: -1, fontFamily: 'Inter, sans-serif' }}>{x.label}</button>
              ))}
            </div>

            <div style={{ paddingTop: 24 }}>
              {tab === 'itinerary' && (
                <div>
                  {itinerary.map((it, i) => (
                    <div key={i} style={{ display: 'grid', gridTemplateColumns: '60px 16px 1fr', gap: 16, paddingBottom: 20, position: 'relative' }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', fontFamily: 'ui-monospace, monospace' }}>{it.time}</div>
                      <div style={{ position: 'relative' }}>
                        <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent, border: '3px solid #fff', boxShadow: '0 0 0 1.5px ' + accent, marginTop: 2 }}/>
                        {i < itinerary.length - 1 && <div style={{ position: 'absolute', left: 6, top: 16, bottom: -20, width: 1, background: 'rgba(10,10,10,0.12)' }}/>}
                      </div>
                      <div>
                        <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2, fontFamily: 'Archivo, sans-serif' }}>{it.t}</div>
                        <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 3, lineHeight: 1.5 }}>{it.d}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {tab === 'includes' && (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 10px 0', fontFamily: 'Archivo, sans-serif', color: '#0F6B2E' }}>✓ {lang === 'es' ? 'Incluido' : 'Included'}</h4>
                    {[lang==='es'?'Transporte privado aire acondicionado':'Private A/C transport', lang==='es'?'Guía certificado bilingüe':'Certified bilingual guide', lang==='es'?'Entradas a la zona arqueológica':'Site entry fees', lang==='es'?'Comida buffet':'Buffet lunch', lang==='es'?'Equipo de snorkel':'Snorkel gear', lang==='es'?'Seguro de viaje':'Travel insurance'].map((x, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12, color: 'rgba(10,10,10,0.75)' }}>
                        <window.Icon name="check" size={14} color={accent} stroke={3}/> {x}
                      </div>
                    ))}
                  </div>
                  <div>
                    <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 10px 0', fontFamily: 'Archivo, sans-serif', color: 'rgba(10,10,10,0.5)' }}>× {lang === 'es' ? 'No incluido' : 'Not included'}</h4>
                    {[lang==='es'?'Propinas (opcionales)':'Tips (optional)', lang==='es'?'Bebidas alcohólicas':'Alcoholic drinks', lang==='es'?'Gastos personales':'Personal expenses'].map((x, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 12, color: 'rgba(10,10,10,0.6)' }}>
                        <span style={{ color: 'rgba(10,10,10,0.3)', fontWeight: 700 }}>×</span> {x}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {tab === 'reviews' && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    { n: 'Sarah K.', c: '🇺🇸', d: 'Oct 2025', r: 5, text: lang === 'es' ? 'Experiencia increíble. El guía sabía muchísimo de historia maya y el cenote fue un sueño.' : 'Incredible experience. The guide knew so much about Mayan history and the cenote was a dream.' },
                    { n: 'Thomas B.', c: '🇩🇪', d: 'Sep 2025', r: 5, text: lang === 'es' ? 'Puntualidad impecable. El precio justo por todo lo que incluye.' : 'Flawless punctuality. Fair price for everything it includes.' },
                    { n: 'Camille L.', c: '🇫🇷', d: 'Aug 2025', r: 4, text: lang === 'es' ? 'Muy buen tour, solo habría preferido menos tiempo en el restaurante y más en las ruinas.' : 'Very good tour, would have preferred less time at the restaurant, more at the ruins.' },
                  ].map((r, i) => (
                    <div key={i} style={{ background: '#fff', padding: 16, borderRadius: 10, border: '1px solid rgba(10,10,10,0.06)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                        <div style={{ fontSize: 13, fontWeight: 700 }}>{r.c} {r.n} <span style={{ fontWeight: 400, color: 'rgba(10,10,10,0.5)', fontSize: 11, marginLeft: 8 }}>{r.d}</span></div>
                        <div style={{ display: 'flex', gap: 1 }}>{Array.from({ length: r.r }).map((_, j) => <window.Icon key={j} name="star" size={12} color="#F5B700" stroke={0}/>)}{Array.from({ length: 5 - r.r }).map((_, j) => <window.Icon key={j} name="star" size={12} color="rgba(10,10,10,0.15)" stroke={0}/>)}</div>
                      </div>
                      <p style={{ fontSize: 12, color: 'rgba(10,10,10,0.75)', margin: 0, lineHeight: 1.55 }}>{r.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: sticky booker */}
          <div style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: 80, background: '#fff', borderRadius: 14, padding: 22, border: '1px solid rgba(10,10,10,0.06)', boxShadow: '0 8px 32px rgba(0,0,0,0.06)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 4 }}>
                <span style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', fontWeight: 600 }}>{t.booker.price}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 16 }}>
                <span style={{ fontSize: 32, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -1 }}>{tour.price}</span>
                <span style={{ fontSize: 12, color: 'rgba(10,10,10,0.5)', fontWeight: 600 }}>MXN / {lang === 'es' ? 'persona' : 'pp'}</span>
              </div>

              <div style={{ marginBottom: 10 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'rgba(10,10,10,0.55)', textTransform: 'uppercase', marginBottom: 6 }}>{t.booker.date}</div>
                <input type="date" value={date} onChange={e => setDate(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(10,10,10,0.1)', fontSize: 13, fontFamily: 'Inter, sans-serif' }}/>
              </div>
              <div style={{ marginBottom: 14 }}>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'rgba(10,10,10,0.55)', textTransform: 'uppercase', marginBottom: 6 }}>{t.booker.pax}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 12px', border: '1px solid rgba(10,10,10,0.1)', borderRadius: 8 }}>
                  <button onClick={() => setPax(Math.max(1, pax-1))} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(10,10,10,0.15)', background: '#fff', cursor: 'pointer', fontSize: 14 }}>−</button>
                  <span style={{ flex: 1, textAlign: 'center', fontSize: 14, fontWeight: 700, fontFamily: 'Archivo, sans-serif' }}>{pax}</span>
                  <button onClick={() => setPax(Math.min(12, pax+1))} style={{ width: 24, height: 24, borderRadius: 6, border: '1px solid rgba(10,10,10,0.15)', background: '#fff', cursor: 'pointer', fontSize: 14 }}>+</button>
                </div>
              </div>

              <div style={{ padding: '12px 0', borderTop: '1px dashed rgba(10,10,10,0.1)', borderBottom: '1px dashed rgba(10,10,10,0.1)', marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.7)', marginBottom: 4 }}>
                  <span>{tour.price} × {pax} {lang === 'es' ? 'pax' : 'pax'}</span>
                  <span style={{ fontWeight: 600 }}>${(parseFloat(tour.price.replace(/[$,]/g,'')) * pax).toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, marginTop: 6, fontFamily: 'Archivo, sans-serif' }}>
                  <span>{lang === 'es' ? 'Total' : 'Total'}</span>
                  <span>${(parseFloat(tour.price.replace(/[$,]/g,'')) * pax).toLocaleString('en-US', { minimumFractionDigits: 2 })} MXN</span>
                </div>
              </div>

              <button onClick={() => setPage('checkout')} style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                {lang === 'es' ? 'Reservar ahora' : 'Book now'} <window.Icon name="arrowRight" size={14} stroke={2.2}/>
              </button>
              <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(10,10,10,0.5)', marginTop: 10 }}>{lang === 'es' ? 'No se cobra hasta confirmar disponibilidad' : 'No charge until availability confirmed'}</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Object.assign(window, { Header, Footer, PageHero, ToursPage, TourDetailPage });
