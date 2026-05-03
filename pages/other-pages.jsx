// Páginas: About, Contact, Blog, BlogPost, FAQ, Checkout

const AboutPage = ({ lang }) => {
  const t = window.COPY[lang];
  const accent = '#1FA84A';
  return (
    <>
      <window.PageHero
        kicker={lang === 'es' ? 'Nosotros' : 'About us'}
        title={lang === 'es' ? 'Somos gente local trabajando en rutas caribeñas desde 2018' : 'We are local people working on Caribbean routes since 2018'}
        sub={lang === 'es' ? 'Somos un equipo de conductores, guías y operadores de la Riviera Maya que conocemos cada curva del camino.' : "We're drivers, guides and operators from the Riviera Maya who know every bend of the road."}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', lang === 'es' ? 'Nosotros' : 'About']}
        imgKey="uploads/Imagenes para sitio/tour-cenote-zemway-nadar-riviera-maya.jpg"
      />
      <section className="section-pad" style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }}>
            <div>
              <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: 1.5, color: accent, textTransform: 'uppercase', marginBottom: 10 }}>{lang === 'es' ? 'Nuestra historia' : 'Our story'}</div>
              <h2 style={{ fontSize: 36, fontWeight: 800, margin: 0, letterSpacing: -1, fontFamily: 'Archivo, sans-serif', lineHeight: 1.1, textWrap: 'balance' }}>
                {lang === 'es' ? 'Nuestra Historia: De la Pasión por la Riviera Maya al Emprendimiento Familiar.' : 'Our Story: From Passion for the Riviera Maya to a Family Enterprise.'}
              </h2>
              <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', lineHeight: 1.65, marginTop: 18, textWrap: 'pretty' }}>
                {lang === 'es' ? '¡Hola! Mi nombre es Jesús Palafox. Mi camino en el mundo del turismo nacional y extranjero comenzó en 2018, en cuanto cumplí la mayoría de edad. Desde entonces, y hasta la fecha, he recorrido miles de kilómetros a lo largo y ancho de Quintana Roo y Yucatán.' : 'Hello! My name is Jesús Palafox. My journey in the world of national and foreign tourism began in 2018, as soon as I came of age. Since then, and to date, I have traveled thousands of kilometers across Quintana Roo and Yucatán.'}
              </p>
              <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', lineHeight: 1.65, marginTop: 14, textWrap: 'pretty' }}>
                {lang === 'es' ? 'Empecé esta travesía al volante de un taxi, una experiencia que me permitió conocer cada rincón de la región y perfeccionar el trato con los viajeros. Luego, evolucioné hacia la guía turística, y hoy, me enorgullece presentarme como un emprendedor independiente. Mi misión es clara: mostrar la verdadera esencia y el lado más auténtico de nuestra amada ciudad, Tulum.' : 'I started this journey behind the wheel of a taxi, an experience that allowed me to know every corner of the region and perfect my interaction with travelers. Then, I evolved into a tour guide, and today, I am proud to present myself as an independent entrepreneur. My mission is clear: to show the true essence and the most authentic side of our beloved city, Tulum.'}
              </p>
              <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.7)', lineHeight: 1.65, marginTop: 14, textWrap: 'pretty' }}>
                {lang === 'es' ? 'Este proyecto es un sueño compartido y un negocio 100% familiar. Operado por mi padre, José Antonio, y por mí, nos dedicamos a ofrecer experiencias agradables y seguras a todos los destinos que nos solicitan. Para nosotros, no eres solo un cliente; nos esforzamos por brindar siempre un trato cálido, humano y transparente, como si estuviéramos recibiendo a amigos en casa.' : 'This project is a shared dream and a 100% family business. Operated by my father, José Antonio, and me, we are dedicated to offering pleasant and safe experiences to all the destinations we are asked for. For us, you are not just a customer; we strive to always provide a warm, human, and transparent treatment, as if we were receiving friends at home.'}
              </p>
            </div>
            <window.ImagePlaceholder paletteKey="tulum" label="" aspect="4/3" rounded={12} showLabel={false} />
          </div>

          <div className="resp-grid-3" style={{ marginTop: 80, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            {[
              { icon: 'leaf',   t: lang === 'es' ? 'Locales de raíz' : 'Rooted local',        d: lang === 'es' ? 'Nos enorgullece presentarnos como personas que han echado raíces en Tulum toda la vida.' : 'We are proud to present ourselves as people who have taken root in Tulum our whole lives.' },
              { icon: 'shield', t: lang === 'es' ? 'Transparencia total' : 'Total transparency', d: lang === 'es' ? 'Todas nuestras tarifas están publicadas, no tenemos ningún cargo oculto, lo que vez es lo que pagas.' : 'All our rates are published, we have no hidden charges, what you see is what you pay.' },
              { icon: 'heart',  t: lang === 'es' ? 'Trato humano' : 'Human touch',             d: lang === 'es' ? 'WhatsApp directo con un humano, nunca un bot.' : 'Direct WhatsApp with a human, never a bot.' },
            ].map((v, i) => (
              <div key={i} style={{ background: '#fff', padding: 24, borderRadius: 12, border: '1px solid rgba(10,10,10,0.06)' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(31,168,74,0.1)', color: '#0F6B2E', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <window.Icon name={v.icon} size={22} stroke={2} />
                </div>
                <h3 style={{ fontSize: 17, fontWeight: 700, margin: '0 0 8px 0', letterSpacing: -0.3, fontFamily: 'Archivo, sans-serif' }}>{v.t}</h3>
                <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.6)', lineHeight: 1.55, margin: 0 }}>{v.d}</p>
              </div>
            ))}
          </div>

          <div className="resp-grid-2" style={{ marginTop: 60, background: '#0a1f12', color: '#fff', borderRadius: 16, padding: 40, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
            {[['12K+', lang === 'es' ? 'Traslados' : 'Transfers'], ['48', lang === 'es' ? 'Destinos' : 'Destinations'], ['5', lang === 'es' ? 'Conductores' : 'Drivers'], ['4.9', lang === 'es' ? 'Rating Google' : 'Google rating']].map((n, i) => (
              <div key={i} style={{ borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.12)' : 'none', paddingLeft: i > 0 ? 28 : 0 }}>
                <div style={{ fontSize: 52, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -1.6, lineHeight: 1 }}>{n[0]}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.65)', marginTop: 6 }}>{n[1]}</div>
              </div>
            ))}
          </div>
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
        title={lang === 'es' ? '¿Hablamos?' : "Let's talk"}
        sub={lang === 'es' ? 'Por WhatsApp contestamos en menos de 10 minutos. Por email, el mismo día.' : 'We reply on WhatsApp in under 10 minutes. Email, same day.'}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', lang === 'es' ? 'Contacto' : 'Contact']}
        imgKey="uploads/Imagenes para sitio/turista-reservacion-tour-tulum-riviera-maya.png"
      />
      <section className="section-pad" style={{ padding: '40px 40px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { icon: 'whatsapp', t: 'WhatsApp', s: '+52 984 106 8542', extra: lang === 'es' ? 'Respuesta < 10 min' : 'Reply < 10 min', bg: '#25D366', color: '#fff', href: 'https://wa.me/529841068542' },
                { icon: 'phone',    t: lang === 'es' ? 'Teléfono' : 'Phone', s: '+52 (984) 115 6844', extra: lang === 'es' ? 'Exclusivamente para llamadas' : 'Calls only', bg: '#fff', color: '#0a0a0a', href: 'tel:+529841156844' },
                { icon: 'mail',     t: 'Email', s: 'hola@onroutemx.com', extra: lang === 'es' ? 'Respuesta el mismo día' : 'Same-day reply', bg: '#fff', color: '#0a0a0a', href: 'mailto:hola@onroutemx.com' },
                { icon: 'pin',      t: lang === 'es' ? 'Oficina' : 'Office', s: 'Av. Satélite entre Calles Okoot y Tun-kul 63, 21', extra: 'Tulum, Q. Roo, México', bg: '#fff', color: '#0a0a0a', href: 'https://maps.google.com/?q=Av.+Satélite+entre+Calles+Okoot+y+Tun-kul+63,+Tulum' },
              ].map((c, i) => (
                <a key={i} href={c.href} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18, borderRadius: 12, background: c.bg, color: c.color, border: c.bg === '#fff' ? '1px solid rgba(10,10,10,0.08)' : 'none', cursor: 'pointer', textDecoration: 'none' }}>
                  <div style={{ width: 42, height: 42, borderRadius: 10, background: c.bg === '#fff' ? 'rgba(31,168,74,0.1)' : 'rgba(255,255,255,0.2)', color: c.bg === '#fff' ? '#0F6B2E' : '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <window.Icon name={c.icon} size={20} stroke={2} />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, opacity: 0.7, fontWeight: 600, letterSpacing: 0.3 }}>{c.t}</div>
                    <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Archivo, sans-serif', marginTop: 2 }}>{c.s}</div>
                    <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>{c.extra}</div>
                  </div>
                  <window.Icon name="arrowRight" size={14} stroke={2.2} />
                </a>
              ))}
            </div>

            <form onSubmit={e => { e.preventDefault(); setSent(true); }} style={{ background: '#fff', padding: 28, borderRadius: 14, border: '1px solid rgba(10,10,10,0.06)' }}>
              <h3 style={{ fontSize: 22, fontWeight: 800, margin: 0, letterSpacing: -0.6, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Escríbenos' : 'Send a message'}</h3>
              <p style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 6 }}>{lang === 'es' ? 'Respondemos en menos de 2 horas hábiles.' : 'We reply in under 2 business hours.'}</p>
              {sent ? (
                <div style={{ marginTop: 24, padding: 28, background: '#f0f7f2', borderRadius: 10, textAlign: 'center' }}>
                  <div style={{ width: 48, height: 48, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                    <window.Icon name="check" size={24} stroke={3} />
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.3 }}>{lang === 'es' ? '¡Mensaje enviado!' : 'Message sent!'}</div>
                  <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', marginTop: 6 }}>{lang === 'es' ? 'Te respondemos pronto a tu email.' : "We'll reply to your email shortly."}</div>
                </div>
              ) : (
                <>
                  <div className="resp-split" style={{ marginTop: 20, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder={lang === 'es' ? 'Tu nombre' : 'Your name'} style={formInput} />
                    <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="you@email.com" style={formInput} />
                  </div>
                  <select value={form.service} onChange={e => setForm({ ...form, service: e.target.value })} style={{ ...formInput, marginTop: 10, width: '100%' }}>
                    <option value="traslado">{lang === 'es' ? 'Traslado aeropuerto' : 'Airport transfer'}</option>
                    <option value="tour">{lang === 'es' ? 'Tour / experiencia' : 'Tour / experience'}</option>
                    <option value="evento">{lang === 'es' ? 'Grupo o evento' : 'Group or event'}</option>
                    <option value="otro">{lang === 'es' ? 'Otro' : 'Other'}</option>
                  </select>
                  <textarea required rows={5} value={form.msg} onChange={e => setForm({ ...form, msg: e.target.value })} placeholder={lang === 'es' ? 'Cuéntanos sobre tu viaje...' : 'Tell us about your trip...'} style={{ ...formInput, marginTop: 10, width: '100%', resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
                  <button type="submit" style={{ marginTop: 14, width: '100%', padding: '14px', borderRadius: 10, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'es' ? 'Enviar mensaje' : 'Send message'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </>
  );
};

// BLOG PAGE — datos vivos de WordPress
const BlogPage = ({ lang, setPage }) => {
  const accent = '#1FA84A';
  const { posts: wpPosts, loading } = window.useWPPosts ? window.useWPPosts(12) : { posts: [], loading: false };
  const featured = wpPosts[0] || null;
  const rest = wpPosts.slice(1);

  return (
    <>
      <window.PageHero
        kicker="Blog"
        title={lang === 'es' ? 'Historias, guías y consejos del camino' : 'Stories, guides and tips from the road'}
        sub={lang === 'es' ? 'Lo que hemos aprendido llevando miles de viajeros por la Riviera Maya.' : "What we've learned moving thousands of travelers across the Riviera Maya."}
        crumbs={[lang === 'es' ? 'Inicio' : 'Home', 'Blog']}
        imgKey="uploads/Imagenes para sitio/descanso-playa-caribe-vacaciones-riviera-maya.jpg"
      />
      <section className="section-pad" style={{ padding: '40px 40px 60px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          {loading && (
            <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(10,10,10,0.4)', fontSize: 14 }}>
              <div style={{ width: 32, height: 32, border: `3px solid ${accent}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite', margin: '0 auto 16px' }} />
              {lang === 'es' ? 'Cargando artículos...' : 'Loading articles...'}
              <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            </div>
          )}

          {!loading && featured && (
            <div className="resp-split" onClick={() => { window._selectedPost = featured; setPage('blog-post'); }}
              style={{ cursor: 'pointer', background: '#fff', borderRadius: 14, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', display: 'grid', gridTemplateColumns: '1.3fr 1fr', marginBottom: 32 }}>
              {featured.img
                ? <img src={featured.img} alt={featured.t} style={{ width: '100%', height: 300, objectFit: 'cover', display: 'block' }} />
                : <window.ImagePlaceholder paletteKey="valladolid" label="" aspect="16/10" rounded={0} showLabel={false} style={{ aspectRatio: 'auto', height: '100%' }}/>}
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>⭐ {lang === 'es' ? 'Destacado' : 'Featured'} · {featured.cat} · {featured.readMin}</div>
                <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif', lineHeight: 1.15, textWrap: 'balance' }}>{featured.t}</h2>
                <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.65)', lineHeight: 1.6, marginTop: 12 }}>{featured.excerpt}</p>
                <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, color: accent, fontSize: 12, fontWeight: 700 }}>
                  {lang === 'es' ? 'Leer artículo' : 'Read article'} <window.Icon name="arrowRight" size={12} stroke={2.2}/>
                </div>
              </div>
            </div>
          )}

          {!loading && (
            <div className="resp-scroll-cards" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
              {rest.map((p, i) => (
                <div key={p.id || i} onClick={() => { window._selectedPost = p; setPage('blog-post'); }}
                  style={{ cursor: 'pointer', background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(10,10,10,0.06)', transition: 'transform .2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-3px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  {p.img
                    ? <div style={{ aspectRatio: '4/3', overflow: 'hidden' }}><img src={p.img} alt={p.t} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} /></div>
                    : <window.ImagePlaceholder paletteKey="tulum" label="" aspect="4/3" rounded={0} showLabel={false}/>}
                  <div style={{ padding: 16 }}>
                    <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', marginBottom: 6 }}>{p.cat} · {p.readMin}</div>
                    <h3 style={{ fontSize: 14, fontWeight: 700, margin: 0, letterSpacing: -0.2, lineHeight: 1.3, fontFamily: 'Archivo, sans-serif' }}>{p.t}</h3>
                    <p style={{ fontSize: 11, color: 'rgba(10,10,10,0.55)', margin: '8px 0 0', lineHeight: 1.5 }}>{p.excerpt && p.excerpt.length > 90 ? p.excerpt.slice(0, 90) + '…' : p.excerpt}</p>
                    <div style={{ fontSize: 10, color: 'rgba(10,10,10,0.4)', marginTop: 8 }}>{p.date}</div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

// BLOG POST — lee el artículo seleccionado de window._selectedPost
const BlogPostPage = ({ lang, setPage }) => {
  const accent = '#1FA84A';
  const post = window._selectedPost || null;

  if (!post) {
    return (
      <section style={{ padding: '80px 40px', textAlign: 'center' }}>
        <p style={{ color: 'rgba(10,10,10,0.5)' }}>{lang === 'es' ? 'Artículo no encontrado.' : 'Article not found.'}</p>
        <button onClick={() => setPage('blog')} style={{ marginTop: 16, padding: '10px 20px', borderRadius: 8, border: 'none', background: accent, color: '#fff', cursor: 'pointer', fontWeight: 700 }}>
          {lang === 'es' ? 'Volver al Blog' : 'Back to Blog'}
        </button>
      </section>
    );
  }

  return (
    <>
      <section style={{ padding: '32px 40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <a onClick={() => setPage('blog')} style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M19 12H5M11 18l-6-6 6-6"/></svg>
            {lang === 'es' ? 'Volver al blog' : 'Back to blog'}
          </a>
        </div>
      </section>
      <article className="section-pad" style={{ padding: '24px 40px 60px', maxWidth: 820, margin: '0 auto' }}>
        <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1.5, textTransform: 'uppercase', marginBottom: 14 }}>
          {post.cat} · {post.readMin} · {post.date}
        </div>
        <h1 style={{ fontSize: 44, fontWeight: 800, margin: 0, letterSpacing: -1.4, fontFamily: 'Archivo, sans-serif', lineHeight: 1.05, textWrap: 'balance' }}>
          {post.t}
        </h1>

        {post.img && (
          <div style={{ margin: '30px 0', borderRadius: 12, overflow: 'hidden' }}>
            <img src={post.img} alt={post.t} style={{ width: '100%', maxHeight: 460, objectFit: 'cover', display: 'block' }} />
          </div>
        )}

        <div style={{ fontSize: 16, color: 'rgba(10,10,10,0.85)', lineHeight: 1.7 }}>
          <p style={{ fontSize: 18, fontWeight: 500, color: '#0a0a0a', textWrap: 'pretty' }}>{post.excerpt}</p>
          <div style={{ marginTop: 32, padding: 24, background: '#f0f7f2', borderRadius: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 13, color: '#0F6B2E', fontWeight: 600, marginBottom: 12 }}>
              {lang === 'es' ? 'Para leer el artículo completo visita nuestro blog en WordPress.' : 'Read the full article on our WordPress blog.'}
            </div>
            <a href={post.link} target="_blank" rel="noopener noreferrer"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: accent, color: '#fff', borderRadius: 8, fontWeight: 700, fontSize: 14, cursor: 'pointer' }}>
              {lang === 'es' ? 'Leer artículo completo' : 'Read full article'} <window.Icon name="arrowRight" size={14} stroke={2.2}/>
            </a>
          </div>
        </div>

        <div className="resp-stack-col" style={{ marginTop: 48, padding: 24, background: '#0a1f12', color: '#fff', borderRadius: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20 }}>
          <div>
            <div style={{ fontSize: 11, color: '#7dd87e', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{lang === 'es' ? '¿Quieres el traslado privado?' : 'Want a private transfer?'}</div>
            <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Archivo, sans-serif', marginTop: 4, letterSpacing: -0.4 }}>{lang === 'es' ? 'CUN → Tu destino. Tarifa fija.' : 'CUN → Your destination. Flat rate.'}</div>
          </div>
          <button onClick={() => setPage('contact')} style={{ padding: '12px 20px', borderRadius: 8, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>{lang === 'es' ? 'Cotizar' : 'Quote'}</button>
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
        { q: lang === 'es' ? '¿Cuándo se cobra mi reserva?' : 'When is my booking charged?', a: lang === 'es' ? 'Solo cuando confirmamos disponibilidad. Si no confirmamos en 2 horas, nada se cobra.' : "Only when we confirm availability. If we don't confirm within 2 hours, nothing is charged." },
        { q: lang === 'es' ? '¿Qué métodos de pago aceptan?' : 'What payment methods do you accept?', a: lang === 'es' ? 'Visa, Mastercard, Amex, PayPal y transferencia SPEI (solo México).' : 'Visa, Mastercard, Amex, PayPal and SPEI transfer (Mexico only).' },
        { q: lang === 'es' ? '¿Puedo cancelar mi reserva?' : 'Can I cancel my booking?', a: lang === 'es' ? 'Sí, gratis hasta 24h antes del servicio. Cancelaciones con menos de 24h tienen cargo del 50%.' : 'Yes, free up to 24h before the service. Cancellations under 24h incur a 50% charge.' },
      ],
    },
    {
      t: lang === 'es' ? 'Traslados' : 'Transfers',
      list: [
        { q: lang === 'es' ? '¿Qué pasa si mi vuelo se retrasa?' : 'What if my flight is delayed?', a: lang === 'es' ? 'Monitoreamos tu vuelo en tiempo real. El conductor te espera sin cargo extra hasta 90 minutos después de la llegada real.' : 'We track your flight in real time. Driver waits up to 90 min after actual arrival at no extra charge.' },
        { q: lang === 'es' ? '¿Dónde me encuentra el conductor?' : 'Where does the driver meet me?', a: lang === 'es' ? 'En la zona de arribo del aeropuerto, con un cartel con tu nombre. Te mandamos la foto y WhatsApp del conductor antes del viaje.' : "At the airport arrivals area, with a sign with your name. We send the driver's photo and WhatsApp before the trip." },
        { q: lang === 'es' ? '¿Hay sillas para bebés?' : 'Are baby seats available?', a: lang === 'es' ? "Sí, sin cargo. Solo avísanos al reservar la edad del niño." : "Yes, no extra charge. Just tell us the child's age when booking." },
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
        sub={lang === 'es' ? 'Si no encuentras tu respuesta, escríbenos por WhatsApp.' : "If you don't find your answer, message us on WhatsApp."}
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
                      <span style={{ color: accent, transform: isOpen ? 'rotate(180deg)' : 'none', transition: 'transform .2s' }}><window.Icon name="chevronDown" size={16} stroke={2.2} /></span>
                    </button>
                    {isOpen && <div style={{ padding: '0 18px 16px', fontSize: 13, color: 'rgba(10,10,10,0.7)', lineHeight: 1.6 }}>{f.a}</div>}
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

  const booking = window._bookingParams || {};
  const tour = booking.tour || { t: 'Tour o Traslado', loc: 'Riviera Maya', price: '0', img: null };
  const pax = booking.pax || 2;
  const date = booking.date || new Date().toISOString().split('T')[0];
  const subtotal = booking.total || 0;
  const serviceFees = subtotal * 0.05; // 5% fee example
  const taxes = subtotal * 0.16; // 16% IVA
  const total = subtotal + serviceFees + taxes;
  const formatMoney = (val) => '$' + val.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const [loadingPayment, setLoadingPayment] = React.useState(false);

  const handlePayment = async () => {
    setLoadingPayment(true);
    try {
      // 1. Aquí se generaría el Token de Clip (Clip.createToken({...}))
      // Por ahora simularemos el token para conectar el flujo:
      const mockClipToken = 'tok_' + Math.random().toString(36).substr(2);

      const payload = {
        clip_token: mockClipToken,
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        tour_title: tour.t,
        pax: pax,
        date: date,
        total: total
      };

      const res = await fetch('https://onroutemx.com/wp-json/onroute/v1/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (data.success) {
        setStep(3); // Mostrar confirmación
      } else {
        alert('Error al procesar el pago: ' + (data.message || 'Intente de nuevo.'));
      }
    } catch (e) {
      alert('Error de conexión.');
    }
    setLoadingPayment(false);
  };

  return (
    <>
      <section className="section-pad" style={{ padding: '24px 40px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <a onClick={() => setPage('home')} style={{ fontSize: 12, color: 'rgba(10,10,10,0.6)', cursor: 'pointer' }}>← {lang === 'es' ? 'Volver al inicio' : 'Back to home'}</a>
        </div>
      </section>

      <section className="section-pad" style={{ padding: '24px 40px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', width: '100%' }}>
          <div className="hide-on-mobile" style={{ display: 'flex', gap: 0, marginBottom: 32 }}>
            {[lang === 'es' ? 'Detalles' : 'Details', lang === 'es' ? 'Pago' : 'Payment', lang === 'es' ? 'Confirmación' : 'Confirmation'].map((s, i) => {
              const n = i + 1;
              const done = step > n;
              const active = step === n;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: '50%', background: done || active ? accent : 'rgba(10,10,10,0.1)', color: done || active ? '#fff' : 'rgba(10,10,10,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700, fontFamily: 'Archivo, sans-serif' }}>
                    {done ? <window.Icon name="check" size={14} stroke={3} /> : n}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? '#0a0a0a' : 'rgba(10,10,10,0.5)' }}>{s}</div>
                  {i < 2 && <div style={{ flex: 1, height: 1, background: done ? accent : 'rgba(10,10,10,0.12)', marginLeft: 10 }} />}
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
                    <input required value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} style={formInput} />
                  </div>
                  <div>
                    <label style={formLabel}>{lang === 'es' ? 'Teléfono (WhatsApp)' : 'Phone (WhatsApp)'}</label>
                    <input required value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+1 555 000 0000" style={formInput} />
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <label style={formLabel}>Email</label>
                  <input required type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={formInput} />
                </div>
                <div style={{ marginTop: 10 }}>
                  <label style={formLabel}>{lang === 'es' ? 'Notas al conductor (opcional)' : 'Notes to driver (optional)'}</label>
                  <textarea rows={3} value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder={lang === 'es' ? 'Número de vuelo, silla de bebé...' : 'Flight number, baby seat...'} style={{ ...formInput, resize: 'vertical', fontFamily: 'Inter, sans-serif' }} />
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
                  <window.Icon name="shield" size={13} stroke={2} color={accent} /> {lang === 'es' ? 'Encriptación SSL · procesado por Stripe' : 'SSL encryption · processed by Stripe'}
                </p>
                <label style={formLabel}>{lang === 'es' ? 'Número de tarjeta' : 'Card number'}</label>
                <input value={card.num} onChange={e => setCard({ ...card, num: e.target.value })} placeholder="4242 4242 4242 4242" style={formInput} />
                <div className="resp-split" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 10 }}>
                  <div>
                    <label style={formLabel}>{lang === 'es' ? 'Expira' : 'Expires'}</label>
                    <input value={card.exp} onChange={e => setCard({ ...card, exp: e.target.value })} placeholder="MM/YY" style={formInput} />
                  </div>
                  <div>
                    <label style={formLabel}>CVV</label>
                    <input value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} placeholder="123" style={formInput} />
                  </div>
                </div>
                <div style={{ marginTop: 10 }}>
                  <label style={formLabel}>{lang === 'es' ? 'Nombre en la tarjeta' : 'Name on card'}</label>
                  <input value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} style={formInput} />
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 20 }}>
                  <button onClick={() => setStep(1)} style={{ padding: '14px 20px', borderRadius: 10, border: '1px solid rgba(10,10,10,0.15)', background: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    ← {lang === 'es' ? 'Atrás' : 'Back'}
                  </button>
                  <button disabled={loadingPayment} onClick={handlePayment} style={{ flex: 1, padding: '14px', borderRadius: 10, border: 'none', background: loadingPayment ? 'rgba(10,10,10,0.2)' : accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: loadingPayment ? 'not-allowed' : 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    {loadingPayment ? (lang === 'es' ? 'Procesando...' : 'Processing...') : (lang === 'es' ? 'Confirmar y pagar' : 'Confirm & pay')}
                  </button>
                </div>
              </>
            )}
            {step === 3 && (
              <div style={{ textAlign: 'center', padding: '20px 20px' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: accent, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <window.Icon name="check" size={40} stroke={3} />
                </div>
                <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? '¡Reserva confirmada!' : 'Booking confirmed!'}</h2>
                <p style={{ fontSize: 14, color: 'rgba(10,10,10,0.65)', marginTop: 10, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.55 }}>
                  {lang === 'es' ? 'Te enviamos los detalles a tu email y WhatsApp. El conductor te contacta 24h antes del servicio.' : "We sent the details to your email and WhatsApp. Your driver will contact you 24h before the service."}
                </p>
                <div style={{ marginTop: 24 }}>
                  <button onClick={() => setPage('home')} style={{ padding: '12px 20px', borderRadius: 10, border: 'none', background: '#0a0a0a', color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'es' ? 'Volver al inicio' : 'Back to home'}
                  </button>
                </div>
              </div>
            )}
          </div>

          <div>
            <div style={{ position: 'sticky', top: 80, background: '#fff', borderRadius: 14, padding: 22, border: '1px solid rgba(10,10,10,0.06)' }}>
              <h3 style={{ fontSize: 14, fontWeight: 700, margin: '0 0 14px 0', letterSpacing: -0.2, fontFamily: 'Archivo, sans-serif' }}>{lang === 'es' ? 'Resumen de reserva' : 'Booking summary'}</h3>
              {tour.img ? (
                <div style={{ aspectRatio: '16/9', overflow: 'hidden', borderRadius: 8, marginBottom: 12 }}>
                  <img src={tour.img} alt={tour.t} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ) : (
                <window.ImagePlaceholder paletteKey="tulum-tour" label="" aspect="16/9" rounded={8} showLabel={false} style={{ marginBottom: 12 }} />
              )}
              <div style={{ fontSize: 10, color: '#0F6B2E', fontWeight: 700, letterSpacing: 0.5, textTransform: 'uppercase', marginBottom: 4 }}>{tour.loc}</div>
              <div style={{ fontSize: 15, fontWeight: 700, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.2 }} dangerouslySetInnerHTML={{ __html: tour.t }}></div>
              <div style={{ fontSize: 11, color: 'rgba(10,10,10,0.6)', marginTop: 6 }}>{date} · {pax} pax</div>
              <div style={{ borderTop: '1px dashed rgba(10,10,10,0.12)', margin: '16px 0 12px' }} />
              {[
                [lang === 'es' ? 'Servicio' : 'Service', formatMoney(subtotal)],
                [lang === 'es' ? 'Cargos de servicio' : 'Service fees', formatMoney(serviceFees)],
                [lang === 'es' ? 'Impuestos (16%)' : 'Taxes (16%)', formatMoney(taxes)],
              ].map((l, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, color: 'rgba(10,10,10,0.7)', padding: '4px 0' }}>
                  <span>{l[0]}</span><span style={{ fontWeight: 600 }}>{l[1]}</span>
                </div>
              ))}
              <div style={{ borderTop: '1px solid rgba(10,10,10,0.08)', marginTop: 10, paddingTop: 12, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>Total</span>
                <span style={{ fontSize: 22, fontWeight: 800, fontFamily: 'Archivo, sans-serif', letterSpacing: -0.5 }}>{formatMoney(total)} <span style={{ fontSize: 11, fontWeight: 500, color: 'rgba(10,10,10,0.5)' }}>MXN</span></span>
              </div>
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

const PrivacyPage = ({ lang }) => {
  const t = window.COPY[lang];
  return (
    <>
      <window.PageHero
        kicker={lang === 'es' ? 'Privacidad' : 'Privacy'}
        title={lang === 'es' ? 'Aviso de Privacidad Integral' : 'Comprehensive Privacy Policy'}
        sub={lang === 'es' ? 'Última actualización: 23 de abril de 2026' : 'Last updated: April 23, 2026'}
        crumbs={[t.nav.inicio, lang === 'es' ? 'Privacidad' : 'Privacy']}
        imgKey="uploads/Imagenes para sitio/Playas-de-tulum-playa-paraiso.png"
      />
      <section className="section-pad" style={{ padding: '60px 40px' }}>
        <div style={{ maxWidth: 800, margin: '0 auto', width: '100%', lineHeight: 1.7, fontSize: 14, color: 'rgba(10,10,10,0.8)' }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>1. Identidad y Domicilio del Responsable</h3>
          <p>OnRoute México (en adelante "OnRoute"), con domicilio en Tulum, Quintana Roo, México, es el responsable del uso y protección de sus datos personales. Ponemos a su disposición este aviso en cumplimiento con la normativa mexicana vigente para informarle qué información recabamos y para qué fines.</p>
          
          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>2. Datos Personales que Recabamos</h3>
          <p>Para llevar a cabo las finalidades descritas en este aviso, recabaremos las siguientes categorías de datos:</p>
          <ul>
            <li><strong>Datos de identificación:</strong> Nombre completo, firma, identificación oficial (para verificación de identidad).</li>
            <li><strong>Datos de contacto:</strong> Correo electrónico, teléfono móvil y/o fijo, domicilio, usuario de redes sociales (Facebook/Instagram).</li>
            <li><strong>Datos de navegación:</strong> Dirección IP, tipo de navegador, cookies y tecnologías de rastreo a través de https://onroutemx.com/.</li>
            <li><strong>Datos de servicio:</strong> Historial de viajes, destinos solicitados y preferencias turísticas.</li>
          </ul>
          <p><em>Nota:</em> OnRoute no recaba datos personales sensibles (origen racial, estado de salud, información genética, creencias religiosas, etc.).</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>3. Finalidades del Tratamiento de Datos</h3>
          <p>Sus datos serán utilizados para las siguientes finalidades <strong>primarias</strong>, necesarias para el servicio:</p>
          <ul>
            <li>Gestionar y confirmar sus reservaciones de transporte y experiencias turísticas.</li>
            <li>Verificar su identidad para garantizar la seguridad del servicio.</li>
            <li>Emitir comprobantes fiscales (facturación) y gestionar pagos.</li>
            <li>Mantener comunicación directa sobre el estatus de su servicio vía WhatsApp, llamada o correo.</li>
            <li>Almacenamiento y gestión de su expediente de cliente en nuestra plataforma CRM (HubSpot).</li>
          </ul>
          <p>De manera <strong>secundaria</strong>, utilizaremos su información para:</p>
          <ul>
            <li>Evaluar la calidad del servicio mediante encuestas.</li>
            <li>Enviar promociones, boletines informativos y novedades sobre Tulum y la región (pudiendo darse de baja en cualquier momento).</li>
          </ul>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>4. Transferencia de Datos y Terceros</h3>
          <p>Le informamos que sus datos personales son compartidos exclusivamente con:</p>
          <ul>
            <li><strong>Proveedores de Servicios Tecnológicos:</strong> Utilizamos HubSpot para la gestión de relaciones con clientes y almacenamiento de datos bajo estrictos estándares de seguridad digital.</li>
            <li><strong>Autoridades:</strong> Solo en caso de requerimiento legal o judicial debidamente fundado.</li>
          </ul>
          <p>OnRoute México no vende, alquila ni comparte su información personal con terceras empresas con fines comerciales ajenos a nuestra operación.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>5. Derechos ARCO (Acceso, Rectificación, Cancelación y Oposición)</h3>
          <p>Usted tiene derecho a conocer qué datos tenemos de usted, para qué los utilizamos y las condiciones del uso que les damos (Acceso). Asimismo, es su derecho solicitar la corrección de su información (Rectificación), que la eliminemos de nuestros registros (Cancelación) o ponerse al uso de sus datos para fines específicos (Oposición).</p>
          <p>Para ejercer sus <strong>Derechos ARCO</strong>, deberá enviar una solicitud al correo <a href="mailto:hola@onroutemx.com" style={{ color: '#1FA84A', fontWeight: 600 }}>hola@onroutemx.com</a> que contenga:</p>
          <ol>
            <li>Nombre completo del titular.</li>
            <li>Documento que acredite su identidad (INE o Pasaporte escaneado).</li>
            <li>Descripción clara de los datos sobre los que busca ejercer sus derechos.</li>
            <li>Cualquier otro elemento que facilite la localización de los datos.</li>
          </ol>
          <p>Daremos respuesta a su solicitud en un plazo máximo de 20 días hábiles.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>6. Uso de Cookies y Tecnologías de Rastreo</h3>
          <p>Nuestro sitio web utiliza cookies para mejorar su experiencia. Estas herramientas nos permiten recordar sus preferencias y analizar el tráfico del sitio.</p>
          <ul>
            <li>Usted puede desactivar el uso de cookies desde la configuración de su navegador; sin embargo, esto podría afectar algunas funciones de personalización de nuestra web.</li>
            <li>Los datos obtenidos (IP, tiempo de navegación) se tratan de forma agregada y no vulneran la seguridad de su equipo.</li>
          </ul>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>7. Seguridad de la Información</h3>
          <p>En OnRoute, implementamos medidas de seguridad administrativas, técnicas y físicas para proteger sus datos personales contra daño, pérdida, alteración o uso no autorizado. Toda la comunicación vía formularios web está protegida por protocolos de cifrado.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>8. Cambios al Aviso de Privacidad</h3>
          <p>OnRoute se reserva el derecho de efectuar en cualquier momento modificaciones o actualizaciones al presente aviso para la atención de novedades legislativas o políticas internas. Estas modificaciones estarán disponibles en nuestra página web <a href="https://onroutemx.com/" style={{ color: '#1FA84A', fontWeight: 600 }}>https://onroutemx.com/</a>.</p>

          <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0a0a0a', marginTop: 40, marginBottom: 12 }}>9. Contacto</h3>
          <p>Si tiene dudas sobre el tratamiento de su información, puede contactarnos directamente en:</p>
          <ul>
            <li><strong>Correo electrónico:</strong> <a href="mailto:hola@onroutemx.com" style={{ color: '#1FA84A', fontWeight: 600 }}>hola@onroutemx.com</a></li>
            <li><strong>Ubicación:</strong> Tulum, Quintana Roo, México.</li>
          </ul>
        </div>
      </section>
    </>
  );
};

Object.assign(window, { AboutPage, ContactPage, BlogPage, BlogPostPage, FAQPage, CheckoutPage, PrivacyPage });
