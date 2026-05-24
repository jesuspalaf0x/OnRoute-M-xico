// Variación 1: MINIMALISTA
// Hero editorial gigantesco, mucho aire, tipografía protagónica, pocos elementos por sección.
// Paleta casi monocroma — verde aparece solo como acento puntual.

const V1Minimal = ({ lang, setLang }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const [navOpen, setNavOpen] = React.useState(false);
  const scrollRef = React.useRef(null);

  const scrollTo = (id) => {
    const el = scrollRef.current?.querySelector(`[data-sec="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={scrollRef} style={{
      width: '100%', height: '100%', overflow: 'auto', position: 'relative',
      background: '#fafaf7', color: '#0a0a0a',
      fontFamily: 'Inter, -apple-system, sans-serif',
    }}>
      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '20px 56px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(250,250,247,0.88)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,10,10,0.05)',
      }}>
        <window.OnrouteLogo size={28} />
        <div style={{ display: 'flex', gap: 28, fontSize: 13, fontWeight: 500 }}>
          <a onClick={() => scrollTo('servicios')} style={navLinkStyle}>{t.nav.servicios}</a>
          <a onClick={() => scrollTo('destinos')} style={navLinkStyle}>{t.nav.destinos}</a>
          <a onClick={() => scrollTo('tours')} style={navLinkStyle}>{t.nav.tours}</a>
          <a onClick={() => scrollTo('galeria')} style={navLinkStyle}>{t.nav.blog}</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <window.LangToggle lang={lang} onChange={setLang} />
          <button style={{
            padding: '10px 18px', borderRadius: 999, border: '1px solid #0a0a0a',
            background: '#0a0a0a', color: '#fff', fontSize: 12, fontWeight: 600,
            cursor: 'pointer', letterSpacing: 0.3, fontFamily: 'Inter, sans-serif',
          }}>{t.hero.cta}</button>
        </div>
      </nav>

      {/* HERO — editorial, gigantesco, mucho aire */}
      <section style={{ padding: '80px 56px 100px', position: 'relative' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'end' }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginBottom: 32 }}>
              — {t.hero.kicker}
            </div>
            <h1 style={{
              fontSize: 104, lineHeight: 0.95, letterSpacing: -3.5, margin: 0,
              fontFamily: 'Archivo, sans-serif', fontWeight: 800, color: '#0a0a0a',
            }}>
              {t.hero.title1}<br/>
              {t.hero.title2}<br/>
              <span style={{ fontStyle: 'italic', fontWeight: 500, color: accent }}>{t.hero.title3}.</span>
            </h1>
          </div>
          <div style={{ paddingBottom: 16 }}>
            <p style={{ fontSize: 17, lineHeight: 1.55, color: 'rgba(10,10,10,0.65)', margin: 0, maxWidth: 420, textWrap: 'pretty' }}>
              {t.hero.sub}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 32 }}>
              <button onClick={() => scrollTo('cotizar')} style={primaryBtn(accent)}>
                {t.hero.cta} <window.Icon name="arrowRight" size={16} stroke={2.2}/>
              </button>
              <button onClick={() => scrollTo('tours')} style={ghostBtn}>
                {t.hero.cta2}
              </button>
            </div>
          </div>
        </div>

        {/* Imagen hero + stats mínimos */}
        <div style={{ marginTop: 72, display: 'grid', gridTemplateColumns: '2.5fr 1fr', gap: 40, alignItems: 'stretch' }}>
          <window.ImagePlaceholder paletteKey="tulum-tour" label="hero · jungle road to tulum" aspect="16/9" rounded={4} />
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px 0' }}>
            {[
              { n: '12K+', l: lang === 'es' ? 'Viajes completados' : 'Trips completed' },
              { n: '4.9', l: lang === 'es' ? 'Rating promedio' : 'Avg rating' },
              { n: '24/7', l: lang === 'es' ? 'Soporte humano' : 'Human support' },
            ].map((s, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(10,10,10,0.1)', paddingTop: 14 }}>
                <div style={{ fontSize: 44, fontWeight: 800, letterSpacing: -1.5, fontFamily: 'Archivo, sans-serif', lineHeight: 1 }}>{s.n}</div>
                <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.55)', marginTop: 6 }}>{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* COTIZADOR — horizontal, un solo card discreto */}
      <section data-sec="cotizar" style={{ padding: '40px 56px 100px' }}>
        <div style={{
          background: '#fff', borderRadius: 20, padding: 28,
          border: '1px solid rgba(10,10,10,0.06)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.02), 0 12px 40px rgba(0,0,0,0.04)',
        }}>
          <window.Booker t={t.booker} accent={accent} />
        </div>
      </section>

      {/* SERVICIOS — 2x2 minimalista, solo tipografía + línea */}
      <section data-sec="servicios" style={{ padding: '80px 56px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginBottom: 16 }}>— {t.services.kicker}</div>
        <h2 style={sectionTitle}>{t.services.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, marginTop: 72, background: 'rgba(10,10,10,0.08)' }}>
          {t.services.list.map((s, i) => (
            <div key={i} style={{ padding: '44px 36px', background: '#fafaf7', display: 'flex', flexDirection: 'column', minHeight: 240 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 28 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: 'rgba(10,10,10,0.4)', fontFamily: 'Archivo, sans-serif' }}>{String(i + 1).padStart(2, '0')}</div>
                {s.tag && <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: accent, background: 'rgba(31,168,74,0.1)', padding: '4px 10px', borderRadius: 999 }}>{s.tag}</span>}
              </div>
              <h3 style={{ fontSize: 28, fontWeight: 700, margin: '0 0 14px 0', letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif', lineHeight: 1.1 }}>{s.t}</h3>
              <p style={{ fontSize: 14, lineHeight: 1.55, color: 'rgba(10,10,10,0.6)', margin: 0, textWrap: 'pretty' }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* DESTINOS — lista vertical editorial tipo tabla */}
      <section data-sec="destinos" style={{ padding: '100px 56px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 80, alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: 120 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginBottom: 16 }}>— {t.destinos.kicker}</div>
            <h2 style={{ ...sectionTitle, fontSize: 56 }}>{t.destinos.title}</h2>
          </div>
          <div>
            {t.destinos.list.map((d, i) => (
              <div key={i} style={{
                display: 'grid', gridTemplateColumns: '60px 1fr 1fr 40px', gap: 20,
                padding: '22px 0', borderTop: '1px solid rgba(10,10,10,0.1)',
                alignItems: 'center', cursor: 'pointer', transition: 'padding-left .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.paddingLeft = '12px'}
              onMouseLeave={e => e.currentTarget.style.paddingLeft = '0'}>
                <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.4)', fontFamily: 'ui-monospace, monospace' }}>{String(i + 1).padStart(2, '0')}</div>
                <div style={{ fontSize: 22, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.4 }}>{d.n}</div>
                <div style={{ fontSize: 13, color: 'rgba(10,10,10,0.55)' }}>{d.m}</div>
                <div style={{ color: accent, display: 'flex', justifyContent: 'flex-end' }}><window.Icon name="arrowRight" size={18} stroke={1.8}/></div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid rgba(10,10,10,0.1)' }}/>
          </div>
        </div>
      </section>

      {/* TOURS */}
      <section data-sec="tours" style={{ padding: '100px 56px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginBottom: 16 }}>— {t.tours.kicker}</div>
        <h2 style={sectionTitle}>{t.tours.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 40, marginTop: 72 }}>
          {t.tours.list.slice(0, 2).map((tour, i) => (
            <div key={i} style={{ cursor: 'pointer' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('.tour-img'); if (img) img.style.transform = 'scale(1.03)'; }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('.tour-img'); if (img) img.style.transform = 'scale(1)'; }}>
              <div style={{ overflow: 'hidden', borderRadius: 4, marginBottom: 20 }}>
                <div className="tour-img" style={{ transition: 'transform .5s cubic-bezier(.2,.7,.3,1)' }}>
                  <window.ImagePlaceholder paletteKey={tour.img} label={tour.loc} aspect="4/3" rounded={0}/>
                </div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 20 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)', marginBottom: 6, letterSpacing: 0.3 }}>{tour.loc} · {tour.dur}</div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: -0.4, fontFamily: 'Archivo, sans-serif', lineHeight: 1.2 }} dangerouslySetInnerHTML={{ __html: tour.t }} />
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.5)' }}>{t.booker.price}</div>
                  <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Archivo, sans-serif' }}>{tour.price}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div style={{ textAlign: 'center', marginTop: 64 }}>
          <button style={ghostBtn}>{lang === 'es' ? 'Ver todos los tours' : 'See all tours'} <window.Icon name="arrowRight" size={14} stroke={2.2}/></button>
        </div>
      </section>

      {/* GALERÍA */}
      <section data-sec="galeria" style={{ padding: '100px 56px' }}>
        <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', marginBottom: 16 }}>— {t.gallery.kicker}</div>
        <h2 style={sectionTitle}>{t.gallery.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginTop: 72 }}>
          {['tulum', 'cenotes-tour', 'holbox', 'bacalar', 'chichen', 'pdc'].map((k, i) => (
            <window.ImagePlaceholder key={i} paletteKey={k} label={k} aspect="1/1" rounded={0} showLabel={false}/>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '120px 56px', background: '#0a0a0a', color: '#fff' }}>
        <div style={{ maxWidth: 720 }}>
          <h2 style={{ fontSize: 72, fontWeight: 800, margin: 0, letterSpacing: -2, fontFamily: 'Archivo, sans-serif', lineHeight: 1 }}>
            {lang === 'es' ? <>¿Listo para <span style={{ color: accent, fontStyle: 'italic', fontWeight: 500 }}>rodar</span>?</> : <>Ready to <span style={{ color: accent, fontStyle: 'italic', fontWeight: 500 }}>roll</span>?</>}
          </h2>
          <p style={{ fontSize: 18, color: 'rgba(255,255,255,0.65)', marginTop: 24, maxWidth: 500 }}>
            {lang === 'es' ? 'Cotiza tu traslado en menos de 30 segundos o escríbenos por WhatsApp.' : 'Quote your transfer in under 30 seconds or message us on WhatsApp.'}
          </p>
          <div style={{ display: 'flex', gap: 14, marginTop: 40 }}>
            <button onClick={() => scrollTo('cotizar')} style={{ ...primaryBtn(accent), color: '#fff' }}>{t.hero.cta} <window.Icon name="arrowRight" size={16} stroke={2.2}/></button>
            <button style={{ ...ghostBtn, border: '1px solid rgba(255,255,255,0.25)', color: '#fff' }}>WhatsApp</button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '40px 56px', background: '#0a0a0a', color: 'rgba(255,255,255,0.5)', fontSize: 12, borderTop: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between' }}>
        <div>{t.footer.rights}</div>
        <div style={{ display: 'flex', gap: 20 }}>{t.footer.links.map((l, i) => <a key={i} style={{ color: 'inherit', cursor: 'pointer' }}>{l}</a>)}</div>
      </footer>

      <window.WhatsappFAB label={lang === 'es' ? '¿Dudas? Escríbenos' : 'Questions? Chat with us'} />
    </div>
  );
};

const navLinkStyle = { color: 'rgba(10,10,10,0.7)', cursor: 'pointer', textDecoration: 'none' };
const sectionTitle = { fontSize: 64, fontWeight: 800, margin: 0, letterSpacing: -2, lineHeight: 1.02, fontFamily: 'Archivo, sans-serif', textWrap: 'balance', maxWidth: 900 };
const primaryBtn = (accent) => ({ padding: '14px 22px', borderRadius: 999, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, letterSpacing: 0.3, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif' });
const ghostBtn = { padding: '14px 22px', borderRadius: 999, border: '1px solid rgba(10,10,10,0.15)', background: 'transparent', color: 'inherit', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'Inter, sans-serif' };

window.V1Minimal = V1Minimal;
