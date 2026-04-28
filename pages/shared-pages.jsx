// Subpáginas comunes: Header, Footer reutilizables + Páginas (Tours, TourDetail)

const Header = ({ lang, setLang, page, setPage }) => {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const links = [
    { id: 'home',    label: lang === 'es' ? 'Inicio' : 'Home' },
    { id: 'tours',   label: lang === 'es' ? 'Tours y Actividades' : 'Tours' },
    { id: 'about',   label: lang === 'es' ? 'Nosotros' : 'About' },
    { id: 'blog',    label: 'Blog' },
    { id: 'contact', label: lang === 'es' ? 'Contacto' : 'Contact' },
  ];
  return (
    <>
      <div className="resp-header-top" style={{ background: '#0a1f12', color: '#fff', padding: '7px 32px', fontSize: 11, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: 20 }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="phone" size={11} stroke={2}/> +52 (984) 106 8542</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="mail" size={11} stroke={2}/> hola@onroutemx.com</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: accent }}><window.Icon name="check" size={11} stroke={3}/> {lang === 'es' ? 'Cancelación gratis 24h antes' : 'Free cancellation 24h before'}</span>
        </div>
        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
          <window.LangToggle lang={lang} onChange={setLang} dark />
          <span style={{ display: 'flex', gap: 10 }}>
            <a href="https://www.instagram.com/onroute.tulum?igsh=a2N3ZDdrYmI5bWN5&utm_source=qr" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'inline-flex' }}>
              <window.Icon name="instagram" size={13} stroke={1.8}/>
            </a>
            <a href="https://www.facebook.com/share/16oa6iX9CD/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'inline-flex' }}>
              <window.Icon name="facebook" size={13} stroke={1.8}/>
            </a>
          </span>
        </div>
      </div>
      {/* Barra superior de utilidades sólo para móviles (idioma, redes) */}
      <div className="show-on-mobile-flex" style={{ padding: '6px 16px', background: '#0a1f12', color: '#fff', justifyContent: 'flex-end', alignItems: 'center', gap: 16 }}>
        <window.LangToggle lang={lang} onChange={setLang} dark />
        <span style={{ display: 'flex', gap: 14 }}>
          <a href="https://www.instagram.com/onroute.tulum?igsh=a2N3ZDdrYmI5bWN5&utm_source=qr" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'inline-flex' }}>
            <window.Icon name="instagram" size={14} stroke={1.8}/>
          </a>
          <a href="https://www.facebook.com/share/16oa6iX9CD/?mibextid=wwXIfr" target="_blank" rel="noreferrer" style={{ color: 'inherit', display: 'inline-flex' }}>
            <window.Icon name="facebook" size={14} stroke={1.8}/>
          </a>
        </span>
      </div>
      <nav className="resp-nav" style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '14px 40px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.97)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,10,10,0.08)',
      }}>
        <a onClick={() => setPage('home')} style={{ cursor: 'pointer' }}><window.OnrouteLogo size={28} /></a>
        <div className="hide-on-mobile" style={{ display: 'flex', gap: 22, fontSize: 13, fontWeight: 500 }}>
          {links.map(l => (
            <a key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} style={{ color: page === l.id ? accent : 'rgba(10,10,10,0.75)', cursor: 'pointer', fontWeight: page === l.id ? 700 : 500 }}>{l.label}</a>
          ))}
        </div>
        <div className="hide-on-mobile" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <button onClick={() => setPage('contact')} style={{ padding: '8px 14px', borderRadius: 8, border: 'none', background: accent, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
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
            <div style={{ cursor: 'pointer' }} onClick={() => { setPage('home'); setMenuOpen(false); }}><window.OnrouteLogo size={28} /></div>
            <button onClick={() => setMenuOpen(false)} style={{ background: 'transparent', border: 'none', padding: 8, cursor: 'pointer' }}><window.Icon name="menu" size={24} /></button>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20, fontSize: 22, fontWeight: 700, marginTop: 20 }}>
            {links.map(l => (
              <a key={l.id} onClick={() => { setPage(l.id); setMenuOpen(false); }} style={{ color: page === l.id ? accent : '#0a0a0a', cursor: 'pointer', fontWeight: 700 }}>{l.label}</a>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const Footer = ({ lang, setPage }) => {
  const t = window.COPY[lang];
  return (
    <footer className="section-pad" style={{ padding: '36px 40px 20px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 11 }}>
      <div className="footer-grid" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr 1fr', gap: 32, marginBottom: 28 }}>
        <div>
          <window.OnrouteLogo size={24} color="#fff"/>
          <p style={{ marginTop: 12, lineHeight: 1.6, maxWidth: 240, fontSize: 11 }}>{lang === 'es' ? 'Traslados privados y tours en la Riviera Maya y Yucatán.' : 'Private transfers and tours in Riviera Maya and Yucatán.'}</p>
        </div>
        {[
          { t: t.nav.servicios, l: t.services.list.map(s => ({ label: s.t, page: 'home' })) },
          { t: t.nav.destinos,  l: t.destinos.list.slice(0, 4).map(d => ({ label: d.n, page: 'tours' })) },
          { t: t.nav.tours,     l: t.tours.list.slice(0, 4).map(x => ({ label: x.loc, page: 'tours' })) },
          { t: lang === 'es' ? 'Empresa' : 'Company', l: [{ label: t.nav.nosotros, page: 'about' }, { label: t.nav.blog, page: 'blog' }, { label: t.nav.contacto, page: 'contact' }, { label: 'FAQ', page: 'faq' }] },
        ].map((col, i) => (
          <div key={i}>
            <div style={{ color: '#fff', fontWeight: 700, marginBottom: 12, fontSize: 11, letterSpacing: 0.5, textTransform: 'uppercase' }}>{col.t}</div>
            {col.l.map((x, j) => <a key={j} onClick={() => setPage && setPage(x.page)} style={{ display: 'block', color: 'inherit', padding: '3px 0', cursor: 'pointer' }}>{x.label}</a>)}
          </div>
        ))}
      </div>
      <div className="resp-stack-col" style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>{t.footer.rights}</div>
        <div style={{ display: 'flex', gap: 16 }}>{t.footer.links.map((l, i) => <a key={i} onClick={() => setPage && setPage(l.page)} style={{ color: 'inherit', cursor: 'pointer' }}>{l.label}</a>)}</div>
      </div>
    </footer>
  );
};

// Breadcrumb hero para subpáginas
const PageHero = ({ kicker, title, sub, crumbs, imgKey, imgURL }) => {
  const accent = '#1FA84A';
  return (
    <section className="section-pad" style={{ padding: '32px 40px 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', minHeight: 320 }}>
          {imgURL ? (
            <img src={imgURL} alt={title} style={{ width: '100%', height: 320, objectFit: 'cover', display: 'block' }} />
          ) : (
            <window.ImagePlaceholder paletteKey={imgKey || 'tulum'} label="" aspect="16/5" rounded={16} showLabel={false} style={{ height: '100%', aspectRatio: 'auto', minHeight: 320 }}/>
          )}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,31,18,0.45) 0%, rgba(10,31,18,0.75) 100%)' }}/>
          <div style={{ position: 'absolute', inset: 0, padding: '32px 40px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', color: '#fff' }}>
            {crumbs && <div style={{ fontSize: 11, marginBottom: 12, opacity: 0.75, display: 'flex', gap: 6 }}>{crumbs.map((c, i) => <React.Fragment key={i}>{i > 0 && <span>/</span>}<span>{c}</span></React.Fragment>)}</div>}
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: '#7dd87e', textTransform: 'uppercase', marginBottom: 8 }}>{kicker}</div>
            <h1 className="title-h1" style={{ fontSize: 48, lineHeight: 1, letterSpacing: -1.4, margin: 0, fontFamily: 'Archivo, sans-serif', fontWeight: 800, textWrap: 'balance', maxWidth: 760 }}>{title}</h1>
            {sub && <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', maxWidth: 620, marginTop: 14, marginBottom: 0 }}>{sub}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

// Card de Tour reutilizable
const TourCard = ({ tour, onClick, accentDark = '#0F6B2E', accent = '#1FA84A', lang = 'es' }) => (
  <div onClick={onClick} style={{ background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', cursor: 'pointer', display: 'flex', flexDirection: 'column', transition: 'transform .2s' }}
    onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
    onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
    <div style={{ position: 'relative' }}>
      {tour.isURL && tour.img ? (
        <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}>
          <img src={tour.img} alt={tour.t} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
        </div>
      ) : (
        <window.ImagePlaceholder paletteKey={tour.img || 'tulum-tour'} label="" aspect="4/3" rounded={0} showLabel={false}/>
      )}
      <div style={{ position: 'absolute', top: 8, left: 8, background: 'rgba(255,255,255,0.95)', padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 3 }}>
        <window.Icon name="star" size={9} color="#F5B700" stroke={0}/> {tour.rating} <span style={{ opacity: 0.6 }}>({tour.rev})</span>
      </div>
      <div style={{ position: 'absolute', top: 8, right: 8, background: 'rgba(10,10,10,0.6)', backdropFilter: 'blur(8px)', color: '#fff', padding: '3px 8px', borderRadius: 4, fontSize: 9, fontWeight: 600 }}>{tour.dur}</div>
    </div>
    <div style={{ padding: 12, display: 'flex', flexDirection: 'column', flex: 1 }}>
      <div style={{ fontSize: 9, color: 'rgba(10,10,10,0.5)', letterSpacing: 0.4, marginBottom: 4, textTransform: 'uppercase', fontWeight: 700 }}>{tour.loc}</div>
      <h3 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.2, lineHeight: 1.25, fontFamily: 'Archivo, sans-serif' }}>{tour.t}</h3>
      <div style={{ display: 'flex', gap: 4, marginBottom: 10, flexWrap: 'wrap' }}>
        {(Array.isArray(tour.tags) ? tour.tags : []).slice(0, 3).map((tag, j) => <span key={j} style={{ fontSize: 9, background: '#f0f7f2', padding: '2px 6px', borderRadius: 3, color: accentDark, fontWeight: 600 }}>{tag}</span>)}
      </div>
      <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', paddingTop: 8, borderTop: '1px solid rgba(10,10,10,0.06)' }}>
        <div>
          <div style={{ fontSize: 9, color: 'rgba(10,10,10,0.5)' }}>Desde</div>
          <div style={{ fontSize: 15, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{tour.price}</div>
        </div>
        <button style={{ padding: '5px 10px', borderRadius: 6, border: 'none', background: accent, color: '#fff', fontSize: 10, fontWeight: 700, cursor: 'pointer' }}>{lang === 'es' ? 'Ver más' : 'See more'}</button>
      </div>
    </div>
  </div>
);

// PÁGINA: Tours y Actividades (listing con datos vivos de WP)
const ToursPage = ({ lang, setPage, setTourIdx }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const accentDark = '#0F6B2E';
  const [filter, setFilter] = React.useState('all');
  const [sort, setSort] = React.useState('featured');

  const { tours: wpTours, loading } = window.useWPTours ? window.useWPTours() : { tours: [], loading: false };
  const fallback = t.tours.list;
  const allTours = wpTours.length > 0 ? wpTours : fallback;

  const filters = [
    { id: 'all',     label: lang === 'es' ? 'Todos' : 'All' },
    { id: 'cenotes', label: 'Cenotes' },
    { id: 'ruins',   label: lang === 'es' ? 'Ruinas' : 'Ruins' },
    { id: 'islands', label: lang === 'es' ? 'Islas' : 'Islands' },
    { id: 'food',    label: lang === 'es' ? 'Gastro' : 'Food' },
  ];

  return (
    <>
      <PageHero
        kicker={lang === 'es' ? 'Tours & Experiencias' : 'Tours & Experiences'}
        title={lang === 'es' ? 'Tours que se quedan en la memoria' : 'Tours that stay with you'}
        sub={lang === 'es' ? 'Explora cenotes, ruinas mayas, islas y experiencias culinarias con guías locales certificados.' : 'Explore cenotes, Mayan ruins, islands and culinary experiences with certified local guides.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', lang === 'es' ? 'Tours y Actividades' : 'Tours']}
        imgKey="uploads/Imagenes para sitio/flamencos-rosas-las-coloradas-yucatan-tour.jpg"
      />
      <section className="section-pad" style={{ padding: '32px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          {/* Barra de filtros */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 16, background: '#fff', borderRadius: 12, border: '1px solid rgba(10,10,10,0.06)', marginBottom: 24, flexWrap: 'wrap', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6, alignItems: 'center', flexWrap: 'wrap' }}>
              <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 0.5, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginRight: 8 }}>{lang === 'es' ? 'Filtrar:' : 'Filter:'}</span>
              {filters.map(f => (
                <button key={f.id} onClick={() => setFilter(f.id)} style={{ padding: '6px 12px', borderRadius: 999, border: '1px solid ' + (filter === f.id ? '#0a0a0a' : 'rgba(10,10,10,0.12)'), background: filter === f.id ? '#0a0a0a' : '#fff', color: filter === f.id ? '#fff' : '#0a0a0a', fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{f.label}</button>
              ))}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <span style={{ color: 'rgba(10,10,10,0.5)' }}>{allTours.length} {lang === 'es' ? 'tours' : 'tours'}</span>
              <span style={{ color: 'rgba(10,10,10,0.2)' }}>·</span>
              <select value={sort} onChange={e => setSort(e.target.value)} style={{ padding: '6px 10px', borderRadius: 6, border: '1px solid rgba(10,10,10,0.12)', fontSize: 12, fontFamily: 'Inter, sans-serif', background: '#fff', fontWeight: 600 }}>
                <option value="featured">{lang === 'es' ? 'Destacados' : 'Featured'}</option>
                <option value="price">{lang === 'es' ? 'Precio: menor a mayor' : 'Price: low to high'}</option>
                <option value="rating">{lang === 'es' ? 'Mejor calificados' : 'Top rated'}</option>
              </select>
            </div>
          </div>

          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(10,10,10,0.4)', fontSize: 14 }}>
              <div style={{ width: 32, height: 32, border: `3px solid ${accent}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              {lang === 'es' ? 'Cargando tours...' : 'Loading tours...'}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          <div className="resp-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 14 }}>
            {!loading && allTours.map((tour, i) => (
              <TourCard
                key={tour.id || i}
                tour={tour}
                lang={lang}
                accent={accent}
                accentDark={accentDark}
                onClick={() => {
                  if (setTourIdx) setTourIdx(i);
                  // Guardar tour seleccionado en window para que TourDetailPage lo lea
                  window._selectedTour = tour;
                  setPage('tour-detail');
                }}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

// PÁGINA: Tour detail — lee el tour seleccionado desde window._selectedTour o fallback
const TourDetailPage = ({ lang, setPage, routeSlug }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const accentDark = '#0F6B2E';

  const { tours, loading } = window.useWPTours();

  let tour = window._selectedTour;
  if (routeSlug && (!tour || tour.slug !== routeSlug)) {
    const found = tours.find(x => x.slug === routeSlug || x.id == routeSlug);
    if (found) tour = found;
  }

  const [pax, setPax] = React.useState(2);
  const [date, setDate] = React.useState('');
  const [tab, setTab] = React.useState('description');
  const [galleryImages, setGalleryImages] = React.useState([]);
  const [isLightboxOpen, setIsLightboxOpen] = React.useState(false);
  const [lightboxIndex, setLightboxIndex] = React.useState(0);

  React.useEffect(() => {
    if (!tour) return;
    const imgIds = tour.meta?.imagen?.[0];
    if (imgIds) {
      fetch(`https://onroutemx.com/wp-json/wp/v2/media?include=${imgIds}&per_page=20`)
        .then(res => res.json())
        .then(data => {
            const idArray = imgIds.split(',');
            const sortedUrls = [];
            idArray.forEach(id => {
                const found = data.find(m => m.id == id);
                if (found) sortedUrls.push(found.source_url);
            });
            const finalGallery = [tour.img, ...sortedUrls.filter(u => u !== tour.img)];
            setGalleryImages(finalGallery);
        })
        .catch(e => console.error(e));
    } else {
        setGalleryImages([tour.img]);
    }
  }, [tour]);

  if (loading && !tour) {
     return <div style={{textAlign: 'center', padding: '100px 0'}}>Cargando tour...</div>;
  }

  if (!tour) {
     tour = t.tours.list[0]; // fallback final
  }

  // Parse WP data
  const meta = tour.meta || {};
  
  const itinerary = [];
  for (let i = 1; i <= 9; i++) {
    const time = meta[`horario-${i}`]?.[0];
    const desc = meta[`itinerario-de-horario-${i}`]?.[0];
    if (time && desc) {
      itinerary.push({ time, t: lang === 'es' ? 'Actividad' : 'Activity', d: desc });
    }
  }
  if (itinerary.length === 0) {
    itinerary.push(
      { time: '09:00', t: lang === 'es' ? 'Pick-up en tu hotel' : 'Pick-up at your hotel', d: lang === 'es' ? 'Recogida puntual en la recepción de tu hotel o Airbnb.' : 'On-time pick-up at your hotel or Airbnb reception.' },
      { time: '10:30', t: lang === 'es' ? 'Llegada a la zona arqueológica' : 'Arrival at the archaeological site', d: lang === 'es' ? 'Guía certificado te acompaña durante el recorrido.' : 'Certified guide joins you for the tour.' },
      { time: '13:00', t: lang === 'es' ? 'Comida tradicional' : 'Traditional lunch', d: lang === 'es' ? 'Buffet de comida yucateca en restaurante local.' : 'Yucatecan buffet at a local restaurant.' },
      { time: '15:00', t: lang === 'es' ? 'Baño en cenote' : 'Swim at cenote', d: lang === 'es' ? 'Nada en aguas cristalinas con equipo incluido.' : 'Swim in crystal waters, gear included.' },
      { time: '18:00', t: lang === 'es' ? 'Regreso' : 'Return', d: lang === 'es' ? 'Te dejamos de vuelta en tu hotel.' : 'Drop-off back at your hotel.' }
    );
  }

  const parsePHPSerializedBooleans = (str) => {
    if (!str) return [];
    const results = [];
    const regex = /s:\d+:"([^"]+)";s:(4|5):"(true|false)"/g;
    let match;
    while ((match = regex.exec(str)) !== null) {
      if (match[3] === 'true') {
        results.push(match[1]);
      }
    }
    return results;
  };

  const includedItems = parsePHPSerializedBooleans(meta['incluir-en-la-experiencia']?.[0]);
  const notIncludedItems = parsePHPSerializedBooleans(meta['no-incluye']?.[0]);
  const bringItems = parsePHPSerializedBooleans(meta['informacion-a-turistas']?.[0]);

  const finalIncluded = includedItems.length > 0 ? includedItems : [lang==='es'?'Transporte privado':'Private transport', lang==='es'?'Guía certificado bilingüe':'Certified bilingual guide', lang==='es'?'Entradas incluidas':'Entry fees included', lang==='es'?'Seguro de viaje':'Travel insurance'];
  const finalNotIncluded = notIncludedItems.length > 0 ? notIncludedItems : [lang==='es'?'Propinas (opcionales)':'Tips (optional)', lang==='es'?'Bebidas alcohólicas':'Alcoholic drinks', lang==='es'?'Gastos personales':'Personal expenses'];

  const priceNum = parseFloat(String(tour.price).replace(/[$,]/g, '')) || 0;

  return (
    <>
      <section className="section-pad" style={{ padding: '24px 40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <a onClick={() => setPage('tours')} style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
            {lang === 'es' ? 'Volver a tours' : 'Back to tours'}
          </a>
        </div>
      </section>

      <section className="section-pad" style={{ padding: '16px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          {/* Image hero gallery DESKTOP */}
          <div className="hide-on-mobile" style={{ display: 'grid', gridTemplateColumns: galleryImages.length >= 5 ? '2fr 1fr 1fr' : (galleryImages.length > 1 ? '2fr 1fr' : '1fr'), gap: 12, borderRadius: 16, overflow: 'hidden', height: 440, marginBottom: 24, cursor: 'pointer' }} onClick={() => { setLightboxIndex(0); setIsLightboxOpen(true); }}>
            <div style={{ width: '100%', height: '100%', position: 'relative' }}>
              <img src={galleryImages[0] || tour.img || ''} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {galleryImages.length >= 5 ? (
              <>
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12, height: '100%' }}>
                  <img src={galleryImages[1]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                  <img src={galleryImages[2]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                </div>
                <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12, height: '100%' }}>
                  <img src={galleryImages[3]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                  <div style={{ position: 'relative', height: '100%' }}>
                    <img src={galleryImages[4]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                    {galleryImages.length > 5 && (
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'rgba(10,10,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700 }}>
                        +{galleryImages.length - 5} {lang === 'es' ? 'fotos' : 'photos'}
                      </div>
                    )}
                  </div>
                </div>
              </>
            ) : galleryImages.length > 1 ? (
              <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 12, height: '100%' }}>
                <img src={galleryImages[1]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                {galleryImages[2] && (
                  <div style={{ position: 'relative', height: '100%' }}>
                    <img src={galleryImages[2]} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', borderRadius: 8 }} />
                    {galleryImages.length > 3 && (
                      <div style={{ position: 'absolute', inset: 0, borderRadius: 8, background: 'rgba(10,10,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 16, fontWeight: 700 }}>
                        +{galleryImages.length - 3} {lang === 'es' ? 'fotos' : 'photos'}
                      </div>
                    )}
                  </div>
                )}
              </div>
            ) : <div/>}
          </div>

          {/* Image hero gallery MOBILE */}
          <div className="show-on-mobile" style={{ marginBottom: 24, cursor: 'pointer' }} onClick={() => { setLightboxIndex(0); setIsLightboxOpen(true); }}>
            <div style={{ height: 260, borderRadius: 16, overflow: 'hidden', marginBottom: 8, position: 'relative' }}>
               <img src={galleryImages[0] || tour.img || ''} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
            {galleryImages.length > 1 && (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {galleryImages.slice(1, 5).map((img, idx) => (
                  <div key={idx} style={{ height: 68, borderRadius: 8, overflow: 'hidden', position: 'relative' }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                    {idx === 3 && galleryImages.length > 5 && (
                      <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,10,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 13, fontWeight: 700 }}>
                        +{galleryImages.length - 5}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1.6fr 1fr', gap: 40 }}>
            {/* Left: content */}
            <div>
              <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 8 }}>{tour.loc}</div>
              <h1 style={{ fontSize: 40, fontWeight: 800, margin: 0, letterSpacing: -1.2, fontFamily: 'Archivo, sans-serif', lineHeight: 1.05, textWrap: 'balance' }} dangerouslySetInnerHTML={{ __html: tour.t }}></h1>
              <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 12, color: 'rgba(10,10,10,0.7)', flexWrap: 'wrap', rowGap: 8 }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="star" size={12} color="#F5B700" stroke={0}/> <strong>{tour.rating}</strong> ({tour.rev} {lang === 'es' ? 'reseñas' : 'reviews'})</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="clock" size={12} stroke={2}/> {tour.dur} {lang === 'es' ? 'de duración' : 'duration'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="users" size={12} stroke={2}/> {lang === 'es' ? 'Aforo máx.' : 'Max group'} {meta['num-personas']?.[0] || '12'}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>{lang === 'es' ? 'Edad min.' : 'Min age'} {meta['edad']?.[0] || '6'}+</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><window.Icon name="globe" size={12} stroke={2}/> ES / EN</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6, opacity: 0.6 }}>ID: {meta['id-exp']?.[0] || 'N/A'}</span>
              </div>

              {/* Tags */}
              <div style={{ display: 'flex', gap: 6, marginTop: 14, flexWrap: 'wrap' }}>
                {(Array.isArray(tour.tags) ? tour.tags : []).map((tag, j) => <span key={j} style={{ fontSize: 11, background: '#f0f7f2', padding: '5px 10px', borderRadius: 6, color: accentDark, fontWeight: 600 }}>{tag}</span>)}
              </div>

              {/* Tabs */}
              <div style={{ marginTop: 32, borderBottom: '1px solid rgba(10,10,10,0.1)', display: 'flex', gap: 24, overflowX: 'auto', whiteSpace: 'nowrap', scrollbarWidth: 'none' }}>
                {[
                  { id: 'description', label: lang === 'es' ? 'Descripción' : 'Description' },
                  { id: 'itinerary', label: lang === 'es' ? 'Itinerario' : 'Itinerary' },
                  { id: 'includes',  label: lang === 'es' ? 'Incluye' : 'Includes' },
                  { id: 'bring',     label: lang === 'es' ? 'Qué llevar' : 'What to bring' },
                  { id: 'reviews',   label: lang === 'es' ? 'Reseñas' : 'Reviews' },
                ].map(x => (
                  <button key={x.id} onClick={() => setTab(x.id)} style={{ padding: '10px 0', border: 'none', background: 'transparent', fontSize: 13, fontWeight: 700, cursor: 'pointer', color: tab === x.id ? '#0a0a0a' : 'rgba(10,10,10,0.5)', borderBottom: '2px solid ' + (tab === x.id ? accent : 'transparent'), marginBottom: -1, fontFamily: 'Inter, sans-serif' }}>{x.label}</button>
                ))}
              </div>

              <div style={{ paddingTop: 24, paddingBottom: 40 }}>
                {tab === 'description' && (
                  <div className="tour-description" style={{ fontSize: 14, color: 'rgba(10,10,10,0.8)', lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: tour.content || (lang === 'es' ? '<p>No hay descripción disponible para este tour.</p>' : '<p>No description available for this tour.</p>') }} />
                )}
                {tab === 'itinerary' && (
                  <div>
                    {itinerary.map((it, i) => (
                      <div key={i} style={{ display: 'grid', gridTemplateColumns: '120px 16px 1fr', gap: 16, paddingBottom: 20, position: 'relative' }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a', fontFamily: 'ui-monospace, monospace' }}>{it.time}</div>
                        <div style={{ position: 'relative' }}>
                          <div style={{ width: 12, height: 12, borderRadius: '50%', background: accent, border: '3px solid #fff', boxShadow: '0 0 0 1.5px ' + accent, marginTop: 2 }}/>
                          {i < itinerary.length - 1 && <div style={{ position: 'absolute', left: 6, top: 16, bottom: -20, width: 1, background: 'rgba(10,10,10,0.12)' }}/>}
                        </div>
                        <div>
                          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.2, fontFamily: 'Archivo, sans-serif' }}>{it.t}</div>
                          <div style={{ fontSize: 13, color: 'rgba(10,10,10,0.7)', marginTop: 4, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>{it.d}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {tab === 'includes' && (
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 10px 0', fontFamily: 'Archivo, sans-serif', color: accentDark }}>✓ {lang === 'es' ? 'Incluido' : 'Included'}</h4>
                      {finalIncluded.map((x, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13, color: 'rgba(10,10,10,0.75)' }}>
                          <window.Icon name="check" size={14} color={accent} stroke={3}/> {x}
                        </div>
                      ))}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 13, fontWeight: 700, margin: '0 0 10px 0', fontFamily: 'Archivo, sans-serif', color: 'rgba(10,10,10,0.5)' }}>× {lang === 'es' ? 'No incluido' : 'Not included'}</h4>
                      {finalNotIncluded.map((x, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 0', fontSize: 13, color: 'rgba(10,10,10,0.6)' }}>
                          <span style={{ color: 'rgba(10,10,10,0.3)', fontWeight: 700 }}>×</span> {x}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {tab === 'bring' && (
                  <div>
                    <h4 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 12px 0', fontFamily: 'Archivo, sans-serif', color: '#0a0a0a' }}>{lang === 'es' ? 'Recomendaciones' : 'Recommendations'}</h4>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                      {bringItems.length > 0 ? bringItems.map((x, i) => (
                        <span key={i} style={{ fontSize: 12, background: 'rgba(10,10,10,0.04)', padding: '6px 12px', borderRadius: 8, color: '#0a0a0a', fontWeight: 500, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                           <span style={{ width: 4, height: 4, borderRadius: '50%', background: accent }}></span> {x}
                        </span>
                      )) : (
                        <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', margin: 0 }}>{lang === 'es' ? 'Ropa cómoda y protector solar.' : 'Comfortable clothes and sunscreen.'}</p>
                      )}
                    </div>
                    {meta['pregunta-1'] && meta['pregunta-1'][0] && (
                      <div style={{ marginTop: 20, padding: 16, background: '#f0f7f2', borderRadius: 12, fontSize: 13, color: accentDark, lineHeight: 1.5 }} dangerouslySetInnerHTML={{ __html: meta['pregunta-1'][0] }} />
                    )}
                  </div>
                )}
                {tab === 'reviews' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    {[
                      { n: 'Sarah K.', c: '🇺🇸', d: 'Oct 2025', r: 5, text: lang === 'es' ? 'Experiencia increíble. El guía sabía muchísimo y el cenote fue un sueño.' : 'Incredible experience. The guide was amazing and the cenote was a dream.' },
                      { n: 'Thomas B.', c: '🇩🇪', d: 'Sep 2025', r: 5, text: lang === 'es' ? 'Puntualidad impecable. El precio justo por todo lo que incluye.' : 'Flawless punctuality. Fair price for everything included.' },
                      { n: 'Camille L.', c: '🇫🇷', d: 'Aug 2025', r: 4, text: lang === 'es' ? 'Muy buen tour, lo recomiendo totalmente.' : 'Very good tour, totally recommended.' },
                    ].map((r, i) => (
                      <div key={i} style={{ background: '#fff', padding: 16, borderRadius: 10, border: '1px solid rgba(10,10,10,0.06)' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
                          <div style={{ fontSize: 13, fontWeight: 700 }}>{r.c} {r.n} <span style={{ fontWeight: 400, color: 'rgba(10,10,10,0.5)', fontSize: 11, marginLeft: 8 }}>{r.d}</span></div>
                          <div style={{ display: 'flex', gap: 1 }}>{Array.from({ length: r.r }).map((_, j) => <window.Icon key={j} name="star" size={12} color="#F5B700" stroke={0}/>)}</div>
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
                <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', fontWeight: 600, marginBottom: 4 }}>Desde</div>
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
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 14, fontWeight: 800, fontFamily: 'Archivo, sans-serif' }}>
                    <span>Total</span>
                    <span>${(priceNum * pax).toLocaleString('en-US', { minimumFractionDigits: 2 })} MXN</span>
                  </div>
                </div>

                <button onClick={() => setPage('checkout')} style={{ width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
                  {lang === 'es' ? 'Reservar ahora' : 'Book now'} <window.Icon name="arrowRight" size={14} stroke={2.2}/>
                </button>
                <div style={{ textAlign: 'center', fontSize: 10, color: 'rgba(10,10,10,0.5)', marginTop: 10 }}>{lang === 'es' ? 'No se cobra hasta confirmar disponibilidad' : 'No charge until availability confirmed'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {isLightboxOpen && galleryImages.length > 0 && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'rgba(10,10,10,0.92)', backdropFilter: 'blur(10px)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '20px 30px', display: 'flex', justifyContent: 'space-between', color: '#fff' }}>
            <div style={{ fontSize: 14, fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>{lightboxIndex + 1} / {galleryImages.length}</div>
            <button onClick={() => setIsLightboxOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 4 }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
            <button onClick={() => setLightboxIndex(i => i > 0 ? i - 1 : galleryImages.length - 1)} style={{ position: 'absolute', left: '2%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, backdropFilter: 'blur(4px)' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M15 18l-6-6 6-6"/></svg>
            </button>
            <img src={galleryImages[lightboxIndex]} style={{ maxHeight: '90vh', maxWidth: '90vw', objectFit: 'contain', userSelect: 'none' }} />
            <button onClick={() => setLightboxIndex(i => i < galleryImages.length - 1 ? i + 1 : 0)} style={{ position: 'absolute', right: '2%', background: 'rgba(255,255,255,0.15)', border: 'none', color: '#fff', width: 48, height: 48, borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2, backdropFilter: 'blur(4px)' }}>
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M9 18l6-6-6-6"/></svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

Object.assign(window, { Header, Footer, PageHero, TourCard, ToursPage, TourDetailPage });
