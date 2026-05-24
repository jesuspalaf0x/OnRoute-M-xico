// Variación 2: INTERMEDIA
// Hero con imagen grande + cotizador integrado (pattern clásico travel).
// Densidad balanceada: cards con imagen + copy, badges, ratings visibles.

const V2Balanced = ({ lang, setLang }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  const dark = '#0a1f12';
  const scrollRef = React.useRef(null);

  const scrollTo = (id) => {
    const el = scrollRef.current?.querySelector(`[data-sec="${id}"]`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div ref={scrollRef} style={{
      width: '100%', height: '100%', overflow: 'auto', position: 'relative',
      background: '#fff', color: '#0a0a0a', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Top bar anuncio */}
      <div style={{ background: dark, color: '#fff', padding: '8px 32px', fontSize: 11, textAlign: 'center', letterSpacing: 0.3, fontWeight: 500 }}>
        ✓ {lang === 'es' ? 'Reserva con 3 días y obtén 10% de descuento en tu primer traslado' : 'Book 3 days ahead and get 10% off your first transfer'}
      </div>

      {/* Nav */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 20, padding: '16px 48px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(255,255,255,0.96)', backdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(10,10,10,0.06)',
      }}>
        <window.OnrouteLogo size={30} />
        <div style={{ display: 'flex', gap: 28, fontSize: 13, fontWeight: 500 }}>
          <a onClick={() => scrollTo('servicios')} style={navLink2}>{t.nav.servicios}</a>
          <a onClick={() => scrollTo('destinos')} style={navLink2}>{t.nav.destinos}</a>
          <a onClick={() => scrollTo('tours')} style={navLink2}>{t.nav.tours}</a>
          <a onClick={() => scrollTo('why')} style={navLink2}>{t.nav.nosotros}</a>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <window.LangToggle lang={lang} onChange={setLang} />
          <a style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 600, color: '#0a0a0a' }}>
            <window.Icon name="phone" size={14} stroke={2}/> +52 998 000 0000
          </a>
          <button style={primaryBtn2(accent)}>{t.hero.cta}</button>
        </div>
      </nav>

      {/* HERO — imagen grande + cotizador overlay */}
      <section style={{ position: 'relative', padding: '40px 48px 0' }}>
        <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', minHeight: 560 }}>
          <window.ImagePlaceholder paletteKey="tulum-tour" label="hero · riviera maya" aspect="16/8" rounded={20} showLabel={false}/>
          {/* Overlay degradado */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(10,31,18,0.15) 0%, rgba(10,31,18,0.7) 100%)' }}/>
          <div style={{ position: 'absolute', inset: 0, padding: '56px 56px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', color: '#fff' }}>
            <div>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)',
                padding: '6px 14px', borderRadius: 999, fontSize: 11, fontWeight: 600, letterSpacing: 0.5,
                border: '1px solid rgba(255,255,255,0.2)',
              }}>
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: accent, boxShadow: `0 0 8px ${accent}` }}/>
                {t.hero.kicker}
              </div>
              <h1 style={{
                fontSize: 84, lineHeight: 0.98, letterSpacing: -2.5, margin: '20px 0 0 0',
                fontFamily: 'Archivo, sans-serif', fontWeight: 800, maxWidth: 820, textWrap: 'balance',
              }}>
                {t.hero.title1} {t.hero.title2} <span style={{ color: '#7dd87e' }}>{t.hero.title3}</span>.
              </h1>
              <p style={{ fontSize: 16, lineHeight: 1.5, color: 'rgba(255,255,255,0.85)', maxWidth: 540, marginTop: 24 }}>
                {t.hero.sub}
              </p>
            </div>
            {/* Ratings + badges */}
            <div style={{ display: 'flex', gap: 28, alignItems: 'center', fontSize: 12, color: 'rgba(255,255,255,0.9)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <div style={{ display: 'flex', gap: 2 }}>
                  {[1,2,3,4,5].map(i => <window.Icon key={i} name="star" size={14} color="#F5B700" stroke={0}/>)}
                </div>
                <span style={{ fontWeight: 700 }}>4.9</span> · 2,340 {lang === 'es' ? 'reseñas' : 'reviews'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <window.Icon name="shield" size={14} stroke={2}/> {lang === 'es' ? 'Conductores certificados' : 'Certified drivers'}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <window.Icon name="clock" size={14} stroke={2}/> {lang === 'es' ? 'Confirmación en 10 min' : '10 min confirmation'}
              </div>
            </div>
          </div>
        </div>

        {/* Cotizador flotante sobre el hero */}
        <div style={{ position: 'relative', marginTop: -80, margin: '-80px 60px 0', zIndex: 5 }}>
          <div style={{ background: '#fff', borderRadius: 18, padding: 24, boxShadow: '0 20px 60px rgba(0,0,0,0.18)', border: '1px solid rgba(10,10,10,0.04)' }}>
            <window.Booker t={t.booker} variant="inline" accent={accent} />
          </div>
        </div>
      </section>

      {/* SERVICIOS — 4 cards con icono + tag */}
      <section data-sec="servicios" style={{ padding: '100px 48px 60px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, gap: 40, flexWrap: 'wrap' }}>
          <div>
            <div style={kicker2(accent)}>{t.services.kicker}</div>
            <h2 style={sectionTitle2}>{t.services.title}</h2>
          </div>
          <p style={{ fontSize: 15, color: 'rgba(10,10,10,0.6)', maxWidth: 360, margin: 0, lineHeight: 1.5, textWrap: 'pretty' }}>{t.services.sub}</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {t.services.list.map((s, i) => {
            const icons = ['plane', 'car', 'leaf', 'users'];
            return (
              <div key={i} style={{
                background: '#f7f7f4', borderRadius: 14, padding: 24,
                border: '1px solid rgba(10,10,10,0.04)', position: 'relative',
                transition: 'all .2s', cursor: 'pointer', display: 'flex', flexDirection: 'column',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(31,168,74,0.3)'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#f7f7f4'; e.currentTarget.style.borderColor = 'rgba(10,10,10,0.04)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
                {s.tag && <div style={{ position: 'absolute', top: 12, right: 12, fontSize: 9, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', color: accent, background: 'rgba(31,168,74,0.12)', padding: '3px 8px', borderRadius: 999 }}>{s.tag}</div>}
                <div style={{ width: 44, height: 44, borderRadius: 12, background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                  <window.Icon name={icons[i]} size={22} stroke={1.8}/>
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.3, fontFamily: 'Archivo, sans-serif' }}>{s.t}</h3>
                <p style={{ fontSize: 13, lineHeight: 1.5, color: 'rgba(10,10,10,0.6)', margin: 0, flex: 1, textWrap: 'pretty' }}>{s.d}</p>
                <div style={{ marginTop: 16, fontSize: 12, fontWeight: 600, color: accent, display: 'flex', alignItems: 'center', gap: 4 }}>
                  {lang === 'es' ? 'Ver más' : 'Learn more'} <window.Icon name="arrowRight" size={12} stroke={2.2}/>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* DESTINOS — grid de cards con imagen */}
      <section data-sec="destinos" style={{ padding: '60px 48px', background: '#f7f7f4' }}>
        <div style={kicker2(accent)}>{t.destinos.kicker}</div>
        <h2 style={sectionTitle2}>{t.destinos.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginTop: 48 }}>
          {t.destinos.list.map((d, i) => (
            <div key={i} style={{ cursor: 'pointer', position: 'relative', borderRadius: 12, overflow: 'hidden' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('.dest-img'); if (img) img.style.transform = 'scale(1.08)'; }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('.dest-img'); if (img) img.style.transform = 'scale(1)'; }}>
              <div className="dest-img" style={{ transition: 'transform .5s cubic-bezier(.2,.7,.3,1)' }}>
                <window.ImagePlaceholder paletteKey={d.img} label="" aspect="3/4" rounded={0} showLabel={false}/>
              </div>
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.75) 100%)' }}/>
              <div style={{ position: 'absolute', bottom: 16, left: 16, right: 16, color: '#fff' }}>
                <div style={{ fontSize: 20, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.4 }}>{d.n}</div>
                <div style={{ fontSize: 11, opacity: 0.85, marginTop: 2 }}>{d.m}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TOURS */}
      <section data-sec="tours" style={{ padding: '100px 48px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
          <div>
            <div style={kicker2(accent)}>{t.tours.kicker}</div>
            <h2 style={sectionTitle2}>{t.tours.title}</h2>
          </div>
          <button style={ghostBtn2}>{lang === 'es' ? 'Ver todos' : 'See all'} <window.Icon name="arrowRight" size={14} stroke={2.2}/></button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          {t.tours.list.map((tour, i) => (
            <div key={i} style={{ background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', cursor: 'pointer', transition: 'all .2s', display: 'flex', flexDirection: 'column' }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
              <div style={{ position: 'relative' }}>
                <window.ImagePlaceholder paletteKey={tour.img} label="" aspect="4/3" rounded={0} showLabel={false}/>
                <div style={{ position: 'absolute', top: 10, left: 10, background: 'rgba(255,255,255,0.95)', padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
                  <window.Icon name="star" size={10} color="#F5B700" stroke={0}/> {tour.rating} ({tour.rev})
                </div>
              </div>
              <div style={{ padding: 16, display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', letterSpacing: 0.3, marginBottom: 6, textTransform: 'uppercase', fontWeight: 600 }}>{tour.loc}</div>
                <h3 style={{ fontSize: 15, fontWeight: 700, margin: '0 0 10px 0', letterSpacing: -0.2, lineHeight: 1.25, fontFamily: 'Archivo, sans-serif', textWrap: 'balance' }} dangerouslySetInnerHTML={{ __html: tour.t }} />
                <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
                  {tour.tags.map((tag, j) => <span key={j} style={{ fontSize: 10, background: '#f0f0ec', padding: '3px 8px', borderRadius: 4, color: 'rgba(10,10,10,0.7)', fontWeight: 500 }}>{tag}</span>)}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 'auto', paddingTop: 12, borderTop: '1px solid rgba(10,10,10,0.06)' }}>
                  <div>
                    <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)' }}>{t.booker.price}</div>
                    <div style={{ fontSize: 18, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{tour.price}</div>
                  </div>
                  <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.55)', display: 'flex', alignItems: 'center', gap: 4 }}>
                    <window.Icon name="clock" size={11} stroke={2}/> {tour.dur}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WHY */}
      <section data-sec="why" style={{ padding: '80px 48px', background: dark, color: '#fff' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 80, alignItems: 'start' }}>
          <div>
            <div style={{ ...kicker2(accent), color: accent }}>{t.why.kicker}</div>
            <h2 style={{ ...sectionTitle2, color: '#fff', fontSize: 48 }}>{t.why.title}</h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 28 }}>
            {t.why.list.map((w, i) => (
              <div key={i} style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: accent, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <window.Icon name="check" size={14} stroke={3}/>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, margin: 0, letterSpacing: -0.2, fontFamily: 'Archivo, sans-serif' }}>{w.t}</h3>
                </div>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', margin: 0, lineHeight: 1.55, textWrap: 'pretty' }}>{w.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section data-sec="galeria" style={{ padding: '100px 48px' }}>
        <div style={kicker2(accent)}>{t.gallery.kicker}</div>
        <h2 style={sectionTitle2}>{t.gallery.title}</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginTop: 40, gridAutoRows: 160 }}>
          {[
            ['tulum', '1/3', '1/3'],
            ['cenotes-tour', '1/3', '3/5'],
            ['holbox', '1/3', '5/7'],
            ['bacalar', '1/3', '7/9'],
            ['chichen', '3/5', '1/4'],
            ['pdc', '3/5', '4/7'],
            ['merida', '3/5', '7/9'],
          ].map(([k, r, c], i) => (
            <div key={i} style={{ gridRow: r, gridColumn: c, borderRadius: 8, overflow: 'hidden' }}>
              <window.ImagePlaceholder paletteKey={k} label={k} aspect="auto" rounded={0} showLabel={false} style={{ height: '100%', aspectRatio: 'auto' }}/>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ padding: '60px 48px 32px', background: dark, color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 1fr', gap: 40, marginBottom: 40 }}>
          <div>
            <window.OnrouteLogo size={26} color="#fff"/>
            <p style={{ marginTop: 16, fontSize: 12, lineHeight: 1.6, maxWidth: 280 }}>{lang === 'es' ? 'Traslados privados y experiencias turísticas en la Riviera Maya.' : 'Private transfers and tourist experiences in the Riviera Maya.'}</p>
          </div>
          {[
            { t: t.nav.servicios, l: t.services.list.map(s => s.t) },
            { t: t.nav.destinos, l: t.destinos.list.slice(0,4).map(d => d.n) },
            { t: t.nav.nosotros, l: [t.nav.nosotros, t.nav.blog, t.nav.contacto] },
          ].map((col, i) => (
            <div key={i}>
              <div style={{ color: '#fff', fontWeight: 700, marginBottom: 16, fontSize: 12, letterSpacing: 0.5 }}>{col.t}</div>
              {col.l.map((x, j) => <a key={j} style={{ display: 'block', color: 'inherit', fontSize: 12, padding: '4px 0', cursor: 'pointer' }}>{x}</a>)}
            </div>
          ))}
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 24, display: 'flex', justifyContent: 'space-between' }}>
          <div>{t.footer.rights}</div>
          <div style={{ display: 'flex', gap: 16 }}>{t.footer.links.map((l, i) => <a key={i} style={{ color: 'inherit', cursor: 'pointer' }}>{l}</a>)}</div>
        </div>
      </footer>

      <window.WhatsappFAB label={lang === 'es' ? '¿Hablamos?' : 'Let\'s chat'} />
    </div>
  );
};

const navLink2 = { color: 'rgba(10,10,10,0.75)', cursor: 'pointer' };
const kicker2 = (accent) => ({ fontSize: 11, fontWeight: 700, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginBottom: 14, fontFamily: 'Inter, sans-serif' });
const sectionTitle2 = { fontSize: 44, fontWeight: 800, margin: 0, letterSpacing: -1.4, lineHeight: 1.05, fontFamily: 'Archivo, sans-serif', textWrap: 'balance', maxWidth: 720 };
const primaryBtn2 = (accent) => ({ padding: '10px 18px', borderRadius: 999, border: 'none', background: accent, color: '#fff', fontSize: 12, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' });
const ghostBtn2 = { padding: '10px 18px', borderRadius: 999, border: '1px solid rgba(10,10,10,0.15)', background: '#fff', color: '#0a0a0a', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' };

window.V2Balanced = V2Balanced;
