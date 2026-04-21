// Páginas: About, Contact, Blog, BlogPost, FAQ, Checkout

const AboutPage = ({ lang }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  return (
    <>
      <window.PageHero
        kicker={lang === 'es' ? 'Nosotros' : 'About us'}
        title={lang === 'es' ? 'Locales. Bilingües. En ruta desde 2018.' : 'Local. Bilingual. On the road since 2018.'}
        sub={lang === 'es' ? 'Somos un equipo de conductores, guías y operadores de la Riviera Maya que conocemos cada curva del camino.' : 'We\'re drivers, guides and operators from the Riviera Maya who know every bend of the road.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', lang === 'es' ? 'Nosotros' : 'About']}
        imgKey="pdc"
      />
      <section className="section-pad" style={{ padding: '60px 40px' }}>
        <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
          <div>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: accent, textTransform: 'uppercase', marginBottom: 10 }}>{lang === 'es' ? 'Nuestra historia' : 'Our story'}</div>
            <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0, letterSpacing: -1, fontFamily: 'Archivo, sans-serif', lineHeight: 1.1, textWrap: 'balance' }}>
              {lang === 'es' ? 'Empezamos con una camioneta y una promesa.' : 'We started with one van and one promise.'}
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', lineHeight: 1.65, marginTop: 18, textWrap: 'pretty' }}>
              {lang === 'es' ? 'En 2018, Luis y Diego — amigos de la infancia en Playa del Carmen — compraron una Toyota Hiace con el último ahorro del mes y empezaron a trasladar turistas desde el aeropuerto de Cancún. La promesa era simple: puntualidad, honestidad, y tratar a cada pasajero como invitado.' : 'In 2018, Luis and Diego — childhood friends from Playa del Carmen — bought a Toyota Hiace with their last savings and started shuttling tourists from Cancún airport. The promise was simple: be on time, be honest, treat every passenger like a guest.'}
            </p>
            <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', lineHeight: 1.65, marginTop: 14, textWrap: 'pretty' }}>
              {lang === 'es' ? 'Hoy somos un equipo de 24 conductores certificados, 12 guías bilingües y una flotilla de 18 vehículos cubriendo toda la Riviera Maya y Yucatán. La promesa sigue siendo la misma.' : 'Today we\'re a team of 24 certified drivers, 12 bilingual guides and a fleet of 18 vehicles covering the whole Riviera Maya and Yucatán. The promise hasn\'t changed.'}
            </p>
          </div>
          <window.ImagePlaceholder paletteKey="tulum" label="" aspect="4/3" rounded={12} showLabel={false}/>
        </div>

        {/* Valores */}
        <div className="resp-grid-3" style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {[
            { icon: 'leaf', t: lang === 'es' ? 'Locales de raíz' : 'Rooted local', d: lang === 'es' ? 'Todo el equipo vive y creció en la Riviera Maya. Te llevamos a lugares que solo conocemos quienes somos de aquí.' : 'Every team member lives and grew up in the Riviera Maya. We take you places only locals know.' },
            { icon: 'shield', t: lang === 'es' ? 'Transparencia total' : 'Total transparency', d: lang === 'es' ? 'Tarifa fija publicada. Sin cargos ocultos. Sin comisiones sorpresa. Si algo falla, respondemos.' : 'Published flat rate. No hidden fees. No surprise commissions. If something fails, we respond.' },
            { icon: 'heart', t: lang === 'es' ? 'Trato humano' : 'Human touch', d: lang === 'es' ? 'WhatsApp directo con un humano, nunca un bot. Tu conductor sabe tu nombre antes de verte.' : 'Direct WhatsApp with a human, never a bot. Your driver knows your name before they meet you.' },
          ].map((v, i) => (
            <div key={i} style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid rgba(10,10,10,0.06)' }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(31,168,74,0.1)', color: '#0F6B2E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <window.Icon name={v.icon} size={22} stroke={2}/>
              </div>
              <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.3, fontFamily: 'Archivo, sans-serif' }}>{v.t}</h3>
              <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', lineHeight: 1.55, margin: 0, textWrap: 'pretty' }}>{v.d}</p>
            </div>
          ))}
        </div>

        {/* Números */}
        <div className="resp-grid-2" style={{ marginTop: 60, background: '#0a1f12', color: '#fff', borderRadius: 16, padding: 40, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
          {[['12K+', lang === 'es' ? 'Traslados' : 'Transfers'], ['48', lang === 'es' ? 'Destinos' : 'Destinations'], ['24', lang === 'es' ? 'Conductores' : 'Drivers'], ['4.9', lang === 'es' ? 'Rating Google' : 'Google rating']].map((n, i) => (
            <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', paddingLeft: i > 0 ? 28 : 0 }}>
              <div style={{ fontSize: 52, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -1.6, lineHeight: 1 }}>{n[0]}</div>
              <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{n[1]}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const ContactPage = ({ lang }) => {
  const accent = '#1FA84A';
  const [form, setForm] = React.useState({ name: '', email: '', service: 'traslado', msg: '' });
  const [sent, setSent] = React.useState(false);
  return (
    <>
      <window.PageHero
        kicker={lang === 'es' ? 'Contacto' : 'Contact'}
        title={lang === 'es' ? '¿Hablamos?' : 'Let\'s talk'}
        sub={lang === 'es' ? 'Por WhatsApp contestamos en menos de 10 minutos. Por email, el mismo día.' : 'We reply on WhatsApp in under 10 minutes. Email, same day.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', lang === 'es' ? 'Contacto' : 'Contact']}
        imgKey="bacalar"
      />
      <section className="section-pad" style={{ padding: '40px 40px 60px' }}>
        <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
          {/* Métodos directos */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              { icon: 'whatsapp', t: 'WhatsApp', s: '+52 998 000 0000', extra: lang === 'es' ? 'Respuesta < 10 min' : 'Reply < 10 min', bg: '#25D366', color: '#fff' },
              { icon: 'phone', t: lang === 'es' ? 'Teléfono' : 'Phone', s: '+52 998 000 0000', extra: lang === 'es' ? 'Lun-Dom · 7am-11pm' : 'Mon-Sun · 7am-11pm', bg: '#fff', color: '#0a0a0a' },
              { icon: 'mail', t: 'Email', s: 'hola@onroutemx.com', extra: lang === 'es' ? 'Respuesta el mismo día' : 'Same-day reply', bg: '#fff', color: '#0a0a0a' },
              { icon: 'pin', t: lang === 'es' ? 'Oficina' : 'Office', s: 'Av. Juárez 123, Playa del Carmen', extra: 'Q. Roo, México', bg: '#fff', color: '#0a0a0a' },
            ].map((c, i) => (
              <a key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, borderRadius: 12, background: c.bg, color: c.color, border: c.bg === '#fff' ? '1px solid rgba(10,10,10,0.08)' : 'none', cursor: 'pointer' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg === '#fff' ? 'rgba(31,168,74,0.1)' : 'rgba(255,255,255,0.2)', color: c.bg === '#fff' ? '#0F6B2E' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <window.Icon name={c.icon} size={20} stroke={2}/>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, letterSpacing: 0.3 }}>{c.t}</div>
                  <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Archivo, sans-serif', marginTop: 2 }}>{c.s}</div>
                  <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>{c.extra}</div>
                </div>
                <window.Icon name="arrowRight" size={14} stroke={2.2}/>
              </a>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ background: '#fff', padding: 28, borderRadius: 14, border: '1px solid rgba(10,10,10,0.06)' }}>
            <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.6, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Escríbenos' : 'Send a message'}</h3>
            <p style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 6 }}>{lang === 'es' ? 'Respondemos en menos de 2 horas hábiles.' : 'We reply in under 2 business hours.'}</p>

            {sent ? (
              <div style={{ marginTop: 24, padding: 28, background: '#f0f7f2', borderRadius: 10, textAlign: 'center' }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <window.Icon name="check" size={24} stroke={3}/>
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</div>
                <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 6 }}>{lang === 'es' ? 'Te respondemos pronto a tu email.' : 'We\'ll reply to your email shortly.'}</div>
              </div>
            ) : (
              <>
                <div className="resp-split" style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} style={formInput}/>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" style={formInput}/>
                </div>
                <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...formInput, marginTop: 10, width: '100%' }}>
                  <option value="traslado">{lang === 'es' ? 'Traslado aeropuerto' : 'Airport transfer'}</option>
                  <option value="tour">{lang === 'es' ? 'Tour / experiencia' : 'Tour / experience'}</option>
                  <option value="evento">{lang === 'es' ? 'Grupo o evento' : 'Group or event'}</option>
                  <option value="otro">{lang === 'es' ? 'Otro' : 'Other'}</option>
                </select>
                <textarea required rows={5} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder={lang === 'es' ? 'Cuéntanos sobre tu viaje...' : 'Tell us about your trip...'} style={{ ...formInput, marginTop: 10, width: '100%', resize: 'vertical', fontFamily: 'Inter, sans-serif' }}/>
                <button type="submit" style={{ marginTop: 14, width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  {lang === 'es' ? 'Enviar mensaje' : 'Send message'}
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </>
  );
};

const BlogPage = ({ lang, setPage }) => {
  const accent = '#1FA84A';
  const posts = [
    { t: lang === 'es' ? 'Cómo llegar a Tulum desde el aeropuerto de Cancún' : 'How to get to Tulum from Cancún airport', cat: 'Tulum', img: 'tulum', m: '4 min', d: '2026-04-15', feat: true },
    { t: lang === 'es' ? 'Los 5 cenotes imperdibles de la Riviera Maya' : 'The 5 must-visit cenotes in Riviera Maya', cat: 'Cenotes', img: 'cenotes-tour', m: '6 min', d: '2026-04-10' },
    { t: lang === 'es' ? 'Qué empacar para un viaje a Yucatán' : 'What to pack for a Yucatán trip', cat: 'Tips', img: 'chichen', m: '3 min', d: '2026-04-03' },
    { t: lang === 'es' ? 'Holbox en un día: guía completa' : 'Holbox in one day: full guide', cat: 'Holbox', img: 'holbox', m: '8 min', d: '2026-03-28' },
    { t: lang === 'es' ? 'Dónde comer comida yucateca auténtica' : 'Where to eat authentic Yucatecan food', cat: 'Gastro', img: 'merida', m: '5 min', d: '2026-03-20' },
    { t: lang === 'es' ? 'Bacalar: la laguna de los 7 colores' : 'Bacalar: the 7-color lagoon', cat: 'Bacalar', img: 'bacalar', m: '7 min', d: '2026-03-12' },
    { t: lang === 'es' ? 'Chichén Itzá: guía para visitarlo bien' : 'Chichén Itzá: a guide to visit it right', cat: 'Ruinas', img: 'chichen', m: '10 min', d: '2026-03-05' },
  ];
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <>
      <window.PageHero
        kicker="Blog"
        title={lang === 'es' ? 'Historias, guías y consejos del camino' : 'Stories, guides and tips from the road'}
        sub={lang === 'es' ? 'Lo que hemos aprendido llevando miles de viajeros por la Riviera Maya.' : 'What we\'ve learned moving thousands of travelers across the Riviera Maya.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', 'Blog']}
        imgKey="valladolid"
      />
      <section className="section-pad" style={{ padding: '40px 40px 60px' }}>
        {/* Featured */}
        <div className="resp-split" onClick={() => setPage('blog-post')} style={{ cursor: 'pointer', background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', display: 'grid', gridTemplateColumns: '1.3fr 1fr', marginBottom: 32 }}>
          <window.ImagePlaceholder paletteKey={featured.img} label="" aspect="16/10" rounded={0} showLabel={false} style={{ aspectRatio: 'auto', height: '100%' }}/>
          <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>⭐ {lang === 'es' ? 'Destacado' : 'Featured'} · {featured.cat} · {featured.m}</div>
            <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif', lineHeight: 1.15, textWrap: 'balance' }}>{featured.t}</h2>
            <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.65)', lineHeight: 1.6, marginTop: 12, textWrap: 'pretty' }}>
              {lang === 'es' ? 'La distancia directa, las opciones de transporte, tips para ahorrar y lo que nadie te cuenta sobre el tráfico en la 307.' : 'The direct distance, transport options, money-saving tips and what no one tells you about traffic on Highway 307.'}
            </p>
            <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, color: accent, fontSize: 12, fontWeight: 700 }}>
              {lang === 'es' ? 'Leer artículo' : 'Read article'} <window.Icon name="arrowRight" size={12} stroke={2.2}/>
            </div>
          </div>
        </div>

        {/* Grid */}
        <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
          {rest.map((p, i) => (
            <div key={i} onClick={() => setPage('blog-post')} style={{ cursor: 'pointer', background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)' }}>
              <window.ImagePlaceholder paletteKey={p.img} label="" aspect="4/3" rounded={0} showLabel={false}/>
              <div style={{ padding: 16 }}>
                <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>{p.cat} · {p.m}</div>
                <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: -0.2, lineHeight: 1.3, fontFamily: 'Archivo, sans-serif', textWrap: 'balance' }}>{p.t}</h3>
                <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.45)', marginTop: 8 }}>{p.d}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

const BlogPostPage = ({ lang, setPage }) => {
  const accent = '#1FA84A';
  return (
    <>
      <section style={{ padding: '32px 40px 0' }}>
        <a onClick={() => setPage('blog')} style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', cursor: 'pointer' }}>← {lang === 'es' ? 'Volver al blog' : 'Back to blog'}</a>
      </section>
      <article className="section-pad" style={{ padding: '24px 40px 60px', maxWidth: 820, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>Tulum · 4 min · 2026-04-15</div>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: 0, letterSpacing: -1.4, fontFamily: 'Archivo, sans-serif', lineHeight: 1.05, textWrap: 'balance' }}>
          {lang === 'es' ? 'Cómo llegar a Tulum desde el aeropuerto de Cancún' : 'How to get to Tulum from Cancún airport'}
        </h1>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 20, fontSize: 12, color: 'rgba(10,10,10,0.6)' }}>
          <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#0F6B2E' }}/>
          <span><strong style={{ color: '#0a0a0a' }}>Luis García</strong> · {lang === 'es' ? 'Fundador OnRoute' : 'OnRoute founder'}</span>
        </div>

        <div style={{ margin: '30px 0' }}>
          <window.ImagePlaceholder paletteKey="tulum" label="" aspect="16/9" rounded={12} showLabel={false}/>
        </div>

        <div style={{ fontSize: 16, color: 'rgba(10,10,10,0.85)', lineHeight: 1.7 }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#0a0a0a', textWrap: 'pretty' }}>
            {lang === 'es' ? 'La distancia de Cancún a Tulum es de 131 km — en teoría 1h 45min. En la práctica, depende de la hora y del camino que tomes. Esto es lo que aprendimos después de hacer el viaje más de mil veces.' : 'Cancún to Tulum is 131 km — in theory, 1h 45min. In practice, it depends on the hour and the road you pick. Here\'s what we learned after doing this trip over a thousand times.'}
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 800, fontFamily: 'Archivo, sans-serif', marginTop: 40, letterSpacing: -0.6 }}>{lang === 'es' ? 'Opciones principales' : 'Main options'}</h2>
          <p style={{ textWrap: 'pretty' }}>{lang === 'es' ? 'Hay tres rutas: el transporte compartido (ADO), el traslado privado, y rentar un auto. Cada uno tiene sentido en contextos distintos.' : 'There are three routes: shared transport (ADO), private transfer, or renting a car. Each makes sense in different contexts.'}</p>
          <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Archivo, sans-serif', marginTop: 28 }}>1. ADO — {lang === 'es' ? 'el más barato' : 'the cheapest'}</h3>
          <p style={{ textWrap: 'pretty' }}>{lang === 'es' ? 'El autobús ADO sale desde el aeropuerto cada 90 minutos. Cuesta $300 MXN aproximadamente, tarda 2h 30min y te deja en la terminal de Tulum, de donde aún tienes que tomar un taxi al hotel. Si viajas solo y con poco equipaje, es la mejor opción económica.' : 'The ADO bus leaves the airport every 90 minutes. About $300 MXN, takes 2h 30min and drops you at Tulum terminal, where you still need a taxi to your hotel. If you\'re solo and travel light, it\'s the best budget option.'}</p>
          <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Archivo, sans-serif', marginTop: 28 }}>2. {lang === 'es' ? 'Traslado privado' : 'Private transfer'} — {lang === 'es' ? 'el más cómodo' : 'the most comfortable'}</h3>
          <p style={{ textWrap: 'pretty' }}>{lang === 'es' ? 'Puerta a puerta. Conductor te espera con cartel. Sin paradas, sin esperas. Para 2-4 personas sale similar o más barato que ADO + taxi. Para familias, es definitivamente lo mejor.' : 'Door to door. Driver waits with a sign. No stops, no waits. For 2-4 people it ends up similar or cheaper than ADO + taxi. For families, it\'s clearly the best.'}</p>
          <div style={{ background: 'rgba(31,168,74,0.08)', borderLeft: `3px solid ${accent}`, padding: 18, borderRadius: 6, margin: '24px 0' }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#0F6B2E', letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 6 }}>💡 {lang === 'es' ? 'Tip de local' : 'Local tip'}</div>
            <p style={{ margin: 0, fontSize: 14, color: '#0a0a0a', textWrap: 'pretty' }}>{lang === 'es' ? 'Si llegas después de las 10 PM o antes de las 6 AM, el ADO tiene frecuencias muy reducidas. Ahí el privado casi siempre gana.' : 'If you arrive after 10 PM or before 6 AM, ADO runs on reduced frequency. Private wins almost every time then.'}</p>
          </div>
          <h3 style={{ fontSize: 18, fontWeight: 700, fontFamily: 'Archivo, sans-serif', marginTop: 28 }}>3. {lang === 'es' ? 'Rentar auto' : 'Rent a car'}</h3>
          <p style={{ textWrap: 'pretty' }}>{lang === 'es' ? 'Tiene sentido solo si planeas moverte mucho fuera de Tulum. Estaciónate en Tulum pueblo cuesta $200-400 MXN por día en lugares seguros. En la zona hotelera casi no hay estacionamiento público.' : 'Only makes sense if you plan to move around a lot outside Tulum. Parking in Tulum town costs $200-400 MXN/day in safe spots. The hotel zone has almost no public parking.'}</p>
        </div>

        <div className="resp-stack-col" style={{ marginTop: 48, padding: 24, background: '#0a1f12', color: '#fff', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7dd87e', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{lang === 'es' ? '¿Quieres el traslado privado?' : 'Want a private transfer?'}</div>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Archivo, sans-serif', marginTop: 4, letterSpacing: -0.4 }}>{lang === 'es' ? 'CUN → Tulum desde $125 USD' : 'CUN → Tulum from $125 USD'}</div>
          </div>
          <button onClick={() => setPage('home')} style={{ padding: '12px 20px', borderRadius: 8, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{lang === 'es' ? 'Cotizar' : 'Quote'}</button>
        </div>
      </article>
    </>
  );
};

const FAQPage = ({ lang }) => {
  const accent = '#1FA84A';
  const [open, setOpen] = React.useState(0);
  const groups = [
    {
      t: lang === 'es' ? 'Reservas y pagos' : 'Booking & payment',
      list: [
        { q: lang === 'es' ? '¿Cuándo se cobra mi reserva?' : 'When is my booking charged?', a: lang === 'es' ? 'Solo cuando confirmamos disponibilidad. Si no confirmamos en 2 horas, nada se cobra.' : 'Only when we confirm availability. If we don\'t confirm within 2 hours, nothing is charged.' },
        { q: lang === 'es' ? '¿Qué métodos de pago aceptan?' : 'What payment methods do you accept?', a: lang === 'es' ? 'Visa, Mastercard, Amex, PayPal y transferencia SPEI (solo México).' : 'Visa, Mastercard, Amex, PayPal and SPEI transfer (Mexico only).' },
        { q: lang === 'es' ? '¿Puedo cancelar mi reserva?' : 'Can I cancel my booking?', a: lang === 'es' ? 'Sí, gratis hasta 24h antes del servicio. Cancelaciones con menos de 24h tienen cargo del 50%.' : 'Yes, free up to 24h before the service. Cancellations under 24h incur a 50% charge.' },
      ],
    },
    {
      t: lang === 'es' ? 'Traslados' : 'Transfers',
      list: [
        { q: lang === 'es' ? '¿Qué pasa si mi vuelo se retrasa?' : 'What if my flight is delayed?', a: lang === 'es' ? 'Monitoreamos tu vuelo en tiempo real. El conductor te espera sin cargo extra hasta 90 minutos después de la llegada real.' : 'We track your flight in real time. Driver waits up to 90 min after actual arrival at no extra charge.' },
        { q: lang === 'es' ? '¿Dónde me encuentra el conductor?' : 'Where does the driver meet me?', a: lang === 'es' ? 'En la zona de arribo del aeropuerto, con un cartel con tu nombre. Te mandamos la foto y WhatsApp del conductor antes del viaje.' : 'At the airport arrivals area, with a sign with your name. We send the driver\'s photo and WhatsApp before the trip.' },
        { q: lang === 'es' ? '¿Hay sillas para bebés?' : 'Are baby seats available?', a: lang === 'es' ? 'Sí, sin cargo. Solo avísanos al reservar la edad del niño.' : 'Yes, no extra charge. Just tell us the child\'s age when booking.' },
      ],
    },
    {
      t: lang === 'es' ? 'Tours' : 'Tours',
      list: [
        { q: lang === 'es' ? '¿Los tours son privados o compartidos?' : 'Are tours private or shared?', a: lang === 'es' ? 'Ofrecemos ambos. El precio de referencia en la web es para grupo compartido. Tours privados +40-60%.' : 'We offer both. The price shown on the site is shared-group. Private tours +40-60%.' },
        { q: lang === 'es' ? '¿Qué idiomas hablan los guías?' : 'What languages do guides speak?', a: lang === 'es' ? 'Todos hablan español e inglés. Francés, alemán e italiano bajo solicitud con 48h de antelación.' : 'All speak Spanish and English. French, German and Italian on request with 48h notice.' },
      ],
    },
  ];
  let counter = 0;
  return (
    <>
      <window.PageHero
        kicker="FAQ"
        title={lang === 'es' ? 'Preguntas frecuentes' : 'Frequently asked'}
        sub={lang === 'es' ? 'Si no encuentras tu respuesta, escríbenos por WhatsApp.' : 'If you don\'t find your answer, message us on WhatsApp.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', 'FAQ']}
        imgKey="cenotes-tour"
      />
      <section className="section-pad" style={{ padding: '40px 40px 60px', maxWidth: 900, margin: '0 auto' }}>
        {groups.map((g, gi) => (
          <div key={gi} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, margin: '0 0 16px 0', letterSpacing: -0.5, fontFamily: 'Archivo, sans-serif' }}>{g.t}</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {g.list.map((f, i) => {
                const idx = counter++;
                const isOpen = open === idx;
                return (
                  <div key={i} style={{ background: '#fff', borderRadius: 10, border: '1px solid ' + (isOpen ? accent : 'rgba(10,10,10,0.08)'), overflow: 'hidden', transition: 'border-color .15s' }}>
                    <button onClick={() => setOpen(isOpen ? -1 : idx)} style={{ width: '100%', padding: '16px 18px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'Inter, sans-serif' }}>
                      <span style={{ fontSize: 14, fontWeight: 700, letterSpacing: -0.1 }}>{f.q}</span>
                      <span style={{ color: accent, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><window.Icon name="chevronDown" size={16} stroke={2.2}/></span>
                    </button>
                    {isOpen && <div style={{ padding: '0 18px 16px', fontSize: 13, color: 'rgba(10,10,10,0.7)', lineHeight: 1.6, textWrap: 'pretty' }}>{f.a}</div>}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </section>
    </>
  );
};

const CheckoutPage = ({ lang, setPage }) => {
  const accent = '#1FA84A';
  const [step, setStep] = React.useState(1);
  const [form, setForm] = React.useState({ name: '', email: '', phone: '', notes: '' });
  const [card, setCard] = React.useState({ num: '', exp: '', cvv: '', name: '' });

  return (
    <>
      <section className="section-pad" style={{ padding: '24px 40px 0' }}>
        <a onClick={() => setPage('home')} style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', cursor: 'pointer' }}>← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}</a>
      </section>

      {/* Stepper */}
      <section className="section-pad" style={{ padding: '24px 40px' }}>
        <div className="hide-on-mobile" style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
          {[lang === 'es' ? 'Detalles' : 'Details', lang === 'es' ? 'Pago' : 'Payment', lang === 'es' ? 'Confirmación' : 'Confirmation'].map((s, i) => {
            const n = i + 1;
            const done = step > n;
            const active = step === n;
            return (
              <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: done || active ? accent : 'rgba(10,10,10,0.1)', color: done || active ? '#fff' : 'rgba(10,10,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: 'Archivo, sans-serif' }}>
                  {done ? <window.Icon name="check" size={14} stroke={3}/> : n}
                </div>
                <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#0a0a0a' : 'rgba(10,10,10,0.5)' }}>{s}</div>
                {i < 2 && <div style={{ flex: 1, height: 1, background: done ? accent : 'rgba(10,10,10,0.12)', marginLeft: 10 }}/>}
              </div>
            );
          })}
        </div>

        <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24 }}>
          <div style={{ background: '#fff', borderRadius: 14, padding: 28, border: '1px solid rgba(10,10,10,0.06)' }}>
            {step === 1 && (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.6, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Tus datos de contacto' : 'Your contact details'}</h2>
                <p style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 4, marginBottom: 20 }}>{lang === 'es' ? 'Necesitamos estos datos para confirmar tu servicio.' : 'We need these to confirm your service.'}</p>
                <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                  <div>
                    <label style={formLabel}>{lang === 'es' ? 'Nombre completo' : 'Full name'}</label>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={formInput}/>
                  </div>
                  <div>
                    <label style={formLabel}>{lang === 'es' ? 'Teléfono (WhatsApp)' : 'Phone (WhatsApp)'}</label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 000 0000" style={formInput}/>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <label style={formLabel}>Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={formInput}/>
                </div>
                <div style={{ marginTop: 10 }}>
                  <label style={formLabel}>{lang === 'es' ? 'Notas al conductor (opcional)' : 'Notes to driver (optional)'}</label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder={lang === 'es' ? 'Número de vuelo, silla de bebé, parada en OXXO...' : 'Flight number, baby seat, OXXO stop...'} style={{ ...formInput, resize: 'vertical', fontFamily: 'Inter, sans-serif' }}/>
                </div>
                <button onClick={() => setStep(2)} style={{ marginTop: 20, width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                  {lang === 'es' ? 'Continuar al pago' : 'Continue to payment'}
                </button>
              </>
            )}
            {step === 2 && (
              <>
                <h2 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.6, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Pago seguro' : 'Secure payment'}</h2>
                <p style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 4, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 6 }}>
                  <window.Icon name="shield" size={13} stroke={2} color={accent}/> {lang === 'es' ? 'Encriptación SSL · procesado por Stripe' : 'SSL encryption · processed by Stripe'}
                </p>
                <label style={formLabel}>{lang === 'es' ? 'Número de tarjeta' : 'Card number'}</label>
                <input value={card.num} onChange={e => setCard({ ...card, num: e.target.value })} placeholder="4242 4242 4242 4242" style={formInput}/>
                <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                  <div>
                    <label style={formLabel}>{lang === 'es' ? 'Expira' : 'Expires'}</label>
                    <input value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" style={formInput}/>
                  </div>
                  <div>
                    <label style={formLabel}>CVV</label>
                    <input value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} placeholder="123" style={formInput}/>
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <label style={formLabel}>{lang === 'es' ? 'Nombre en la tarjeta' : 'Name on card'}</label>
                  <input value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} style={formInput}/>
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '14px 20px', borderRadius: 10, border: '1px solid rgba(10,10,10,0.15)', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    ← {lang === 'es' ? 'Atrás' : 'Back'}
                  </button>
                  <button onClick={() => setStep(3)} style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'es' ? 'Confirmar y pagar' : 'Confirm & pay'}
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 20px' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <window.Icon name="check" size={40} stroke={3}/>
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? '¡Reserva confirmada!' : 'Booking confirmed!'}</h2>
                <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.65)', marginTop: 10, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55, textWrap: 'pretty' }}>
                  {lang === 'es' ? 'Te enviamos los detalles a tu email y WhatsApp. El conductor te contacta 24h antes del servicio.' : 'We sent the details to your email and WhatsApp. Your driver will contact you 24h before the service.'}
                </p>
                <div style={{ marginTop: 24, padding: 16, background: '#f4f5f2', borderRadius: 10, display: 'inline-block', fontFamily: 'ui-monospace, monospace' }}>
                  <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', textTransform: 'uppercase', letterSpacing: 0.8 }}>{lang === 'es' ? 'Código de reserva' : 'Booking code'}</div>
                  <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: 2, marginTop: 4 }}>OR-2026-{Math.floor(Math.random() * 9000 + 1000)}</div>
                </div>
                <div style={{ marginTop: 24 }}>
                  <button onClick={() => setPage('home')} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: '#0a0a0a', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Summary */}
          <div>
            <div style={{ position: 'sticky', top: 80, background: '#fff', borderRadius: 14, padding: 22, border: '1px solid rgba(10,10,10,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 14px 0', letterSpacing: -0.2, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Resumen de reserva' : 'Booking summary'}</h3>
              <window.ImagePlaceholder paletteKey="tulum-tour" label="" aspect="16/9" rounded={8} showLabel={false} style={{ marginBottom: 12 }}/>
              <div style={{ fontSize: 10, color: '#0F6B2E', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>{lang === 'es' ? 'Traslado privado' : 'Private transfer'}</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.2 }}>Cancún Airport (CUN) → Tulum</div>
              <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.6)', marginTop: 6 }}>2026-05-15 · 2 pax · {lang === 'es' ? 'ida' : 'one way'}</div>
              <div style={{ borderTop: '1px dashed rgba(10,10,10,0.12)', margin: '16px 0 12px' }}/>
              {[
                [lang === 'es' ? 'Traslado privado' : 'Private transfer', '$125.00'],
                [lang === 'es' ? 'Cargos de servicio' : 'Service fees', '$8.00'],
                [lang === 'es' ? 'Impuestos' : 'Taxes', '$12.50'],
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.7)', padding: '4px 0' }}>
                  <span>{l[0]}</span><span style={{ fontWeight: 600 }}>{l[1]}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(10,10,10,0.08)', marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.5 }}>$145.50 <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(10,10,10,0.5)' }}>USD</span></span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

const formLabel = { display: 'block', fontSize: 10, fontWeight: 700, letterSpacing: 1, color: 'rgba(10,10,10,0.55)', textTransform: 'uppercase', marginBottom: 6, fontFamily: 'Inter, sans-serif' };
const formInput = { width: '100%', padding: '10px 12px', borderRadius: 8, border: '1px solid rgba(10,10,10,0.1)', fontSize: 13, fontFamily: 'Inter, sans-serif', background: '#fff', outline: 'none' };

Object.assign(window, { AboutPage, ContactPage, BlogPage, BlogPostPage, FAQPage, CheckoutPage });
