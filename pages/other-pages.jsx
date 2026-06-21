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
              { icon: 'leaf', t: lang === 'es' ? 'Locales de raíz' : 'Rooted local', d: lang === 'es' ? 'Nos enorgullece presentarnos como personas que han echado raíces en Tulum toda la vida.' : 'We are proud to present ourselves as people who have taken root in Tulum our whole lives.' },
              { icon: 'shield', t: lang === 'es' ? 'Transparencia total' : 'Total transparency', d: lang === 'es' ? 'Todas nuestras tarifas están publicadas, no tenemos ningún cargo oculto, lo que vez es lo que pagas.' : 'All our rates are published, we have no hidden charges, what you see is what you pay.' },
              { icon: 'heart', t: lang === 'es' ? 'Trato humano' : 'Human touch', d: lang === 'es' ? 'WhatsApp directo con un humano, nunca un bot.' : 'Direct WhatsApp with a human, never a bot.' },
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
                { icon: 'phone', t: lang === 'es' ? 'Teléfono' : 'Phone', s: '+52 (984) 115 6844', extra: lang === 'es' ? 'Exclusivamente para llamadas' : 'Calls only', bg: '#fff', color: '#0a0a0a', href: 'tel:+529841156844' },
                { icon: 'mail', t: 'Email', s: 'hola@onroutemx.com', extra: lang === 'es' ? 'Respuesta el mismo día' : 'Same-day reply', bg: '#fff', color: '#0a0a0a', href: 'mailto:hola@onroutemx.com' },
                { icon: 'pin', t: lang === 'es' ? 'Oficina' : 'Office', s: 'Av. Satélite entre Calles Okoot y Tun-kul 63, 21', extra: 'Tulum, Q. Roo, México', bg: '#fff', color: '#0a0a0a', href: 'https://maps.google.com/?q=Av.+Satélite+entre+Calles+Okoot+y+Tun-kul+63,+Tulum' },
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
                : <window.ImagePlaceholder paletteKey="valladolid" label="" aspect="16/10" rounded={0} showLabel={false} style={{ aspectRatio: 'auto', height: '100%' }} />}
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontSize: 10, color: accent, fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 10 }}>⭐ {lang === 'es' ? 'Destacado' : 'Featured'} · {featured.cat} · {featured.readMin}</div>
                <h2 style={{ fontSize: 28, fontWeight: 800, margin: 0, letterSpacing: -0.8, fontFamily: 'Archivo, sans-serif', lineHeight: 1.15, textWrap: 'balance' }}>{featured.t}</h2>
                <p style={{ fontSize: 13, color: 'rgba(10,10,10,0.65)', lineHeight: 1.6, marginTop: 12 }}>{featured.excerpt}</p>
                <div style={{ marginTop: 20, display: 'inline-flex', alignItems: 'center', gap: 6, color: accent, fontSize: 12, fontWeight: 700 }}>
                  {lang === 'es' ? 'Leer artículo' : 'Read article'} <window.Icon name="arrowRight" size={12} stroke={2.2} />
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
                    : <window.ImagePlaceholder paletteKey="tulum" label="" aspect="4/3" rounded={0} showLabel={false} />}
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

// Iconos de marca para compartir (SVG inline, brand-correct)
const ShareIcon = ({ name, size = 17 }) => {
  const paths = {
    facebook: <path d="M22 12a10 10 0 10-11.6 9.9v-7H7.9V12h2.5V9.8c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.5h-1.300000000000001c-1.2 0-1.6.8-1.6 1.6V12h2.8l-.4 2.9h-2.4v7A10 10 0 0022 12z" fill="currentColor" stroke="none"/>,
    whatsapp: <path d="M12 2a10 10 0 00-8.5 15.2L2 22l4.9-1.3A10 10 0 1012 2zm0 18a8 8 0 01-4.1-1.1l-.3-.2-2.9.8.8-2.8-.2-.3A8 8 0 1112 20zm4.5-6c-.2-.1-1.4-.7-1.7-.8-.2-.1-.4-.1-.5.1l-.7.9c-.1.2-.3.2-.5.1-1.4-.7-2.3-1.3-3.2-2.9-.2-.4.2-.4.6-1.2.1-.1 0-.3 0-.4l-.8-1.9c-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.8.8-1 1.9-.5 3.2.6 1.5 1.6 2.9 3 4 2 1.7 3.5 1.9 4.3 1.8.6-.1 1.4-.6 1.6-1.2.2-.5.2-1 .1-1.1-.1-.1-.2-.2-.4-.3z" fill="currentColor" stroke="none"/>,
    x: <path d="M18.2 2.5h3.3l-7.2 8.2 8.5 11.3h-6.7l-5.2-6.9-6 6.9H1.6l7.7-8.8L1.1 2.5h6.8l4.7 6.3 5.6-6.3zm-1.2 17.8h1.8L7.1 4.3H5.2L17 20.3z" fill="currentColor" stroke="none"/>,
    linkedin: <path d="M20.4 3H3.6C3.3 3 3 3.3 3 3.6v16.8c0 .3.3.6.6.6h16.8c.3 0 .6-.3.6-.6V3.6c0-.3-.3-.6-.6-.6zM8.3 18.3H5.6V9.7h2.7v8.6zM7 8.5a1.5 1.5 0 110-3.1 1.5 1.5 0 010 3.1zm11.3 9.8h-2.7v-4.2c0-1 0-2.3-1.4-2.3s-1.6 1.1-1.6 2.2v4.3h-2.7V9.7h2.6v1.2h.1c.4-.7 1.2-1.4 2.5-1.4 2.7 0 3.2 1.8 3.2 4.1v4.7z" fill="currentColor" stroke="none"/>,
    telegram: <path d="M22 3.4l-3.3 15.6c-.2 1.1-.9 1.4-1.8.9l-5-3.7-2.4 2.3c-.3.3-.5.5-1 .5l.3-5 9.1-8.2c.4-.4-.1-.6-.6-.2L6.3 13.2l-4.8-1.5c-1-.3-1-1 .2-1.5l18.7-7.2c.9-.3 1.7.2 1.4 1.4z" fill="currentColor" stroke="none"/>,
    email: <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zm0 2v.5l8 5 8-5V6H4zm16 12V8.5l-8 5-8-5V18h16z" fill="currentColor" stroke="none"/>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24">{paths[name]}</svg>;
};

const SHARE_NETWORKS = [
  { id: 'facebook', label: 'Facebook', color: '#1877F2' },
  { id: 'whatsapp', label: 'WhatsApp', color: '#25D366' },
  { id: 'x', label: 'X', color: '#0a0a0a' },
  { id: 'linkedin', label: 'LinkedIn', color: '#0A66C2' },
  { id: 'telegram', label: 'Telegram', color: '#26A5E4' },
  { id: 'email', label: 'Email', color: '#EA4335' },
];

const ShareBar = ({ lang, titleText }) => {
  const [copied, setCopied] = React.useState(false);
  const share = (id) => {
    const url = typeof window !== 'undefined' ? window.location.href : 'https://onroutemx.com';
    const title = titleText || (lang === 'es' ? 'Artículo de OnRoute' : 'OnRoute Article');
    const u = encodeURIComponent(url), x = encodeURIComponent(title);
    const links = {
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${u}`,
      whatsapp: `https://wa.me/?text=${x}%20${u}`,
      x: `https://twitter.com/intent/tweet?text=${x}&url=${u}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${u}`,
      telegram: `https://t.me/share/url?url=${u}&text=${x}`,
      email: `mailto:?subject=${x}&body=${x}%20${u}`,
    };
    try { 
      if (id === 'email') window.open(links[id], '_self');
      else window.open(links[id], '_blank', 'noopener,width=600,height=540'); 
    } catch (e) {}
  };
  const copyLink = () => {
    try { navigator.clipboard.writeText(window.location.href); } catch (e) {}
    setCopied(true); setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap', justifyContent: 'flex-start' }}>
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1.2, color: 'rgba(10,10,10,0.45)', textTransform: 'uppercase' }}>
        {lang === 'es' ? 'Compartir' : 'Share'}
      </span>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
        {SHARE_NETWORKS.map(n => (
          <button key={n.id} onClick={() => share(n.id)} title={n.label} aria-label={n.label}
            style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(10,10,10,0.1)', background: '#fff', color: 'rgba(10,10,10,0.55)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .16s', padding: 0 }}
            onMouseEnter={e => { e.currentTarget.style.background = n.color; e.currentTarget.style.borderColor = n.color; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(10,10,10,0.1)'; e.currentTarget.style.color = 'rgba(10,10,10,0.55)'; e.currentTarget.style.transform = 'translateY(0)'; }}>
            <ShareIcon name={n.id}/>
          </button>
        ))}
        <button onClick={copyLink} title={lang === 'es' ? 'Copiar enlace' : 'Copy link'} aria-label="Copy link"
          style={{ width: 38, height: 38, borderRadius: '50%', border: '1px solid rgba(10,10,10,0.1)', background: copied ? '#1FA84A' : '#fff', color: copied ? '#fff' : 'rgba(10,10,10,0.55)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .16s', padding: 0 }}
          onMouseEnter={e => { if(!copied) { e.currentTarget.style.background = '#1FA84A'; e.currentTarget.style.borderColor = '#1FA84A'; e.currentTarget.style.color = '#fff'; e.currentTarget.style.transform = 'translateY(-2px)'; } }}
          onMouseLeave={e => { if(!copied) { e.currentTarget.style.background = '#fff'; e.currentTarget.style.borderColor = 'rgba(10,10,10,0.1)'; e.currentTarget.style.color = 'rgba(10,10,10,0.55)'; e.currentTarget.style.transform = 'translateY(0)'; } }}>
          {copied
            ? <window.Icon name="check" size={16} stroke={3}/>
            : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 007 0l3-3a5 5 0 00-7-7l-1 1M14 11a5 5 0 00-7 0l-3 3a5 5 0 007 7l1-1"/></svg>}
        </button>
      </div>
    </div>
  );
};

// Reproductor de audio del artículo — usa speechSynthesis para leer en voz alta
const ArticleAudioPlayer = ({ lang, text, minutes }) => {
  const accent = '#1FA84A';
  const [state, setState] = React.useState('idle'); // idle | playing | paused
  const [progress, setProgress] = React.useState(0);
  const totalSec = Math.max(30, Math.round((text.split(/\s+/).length / (lang === 'es' ? 150 : 170)) * 60));
  const rafRef = React.useRef(null);
  const startRef = React.useRef(0);
  const elapsedRef = React.useRef(0);

  const supported = typeof window !== 'undefined' && 'speechSynthesis' in window;

  const tick = () => {
    const elapsed = elapsedRef.current + (Date.now() - startRef.current) / 1000;
    setProgress(Math.min(1, elapsed / totalSec));
    if (elapsed < totalSec && window.speechSynthesis.speaking) {
      rafRef.current = requestAnimationFrame(tick);
    }
  };

  const stopAll = () => {
    if (supported) window.speechSynthesis.cancel();
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    elapsedRef.current = 0;
    setProgress(0);
    setState('idle');
  };

  React.useEffect(() => () => { if (supported) window.speechSynthesis.cancel(); if (rafRef.current) cancelAnimationFrame(rafRef.current); }, []);
  // Reinicia si cambia el idioma
  React.useEffect(() => { stopAll(); }, [lang]);

  const play = () => {
    if (!supported) return;
    if (state === 'paused') {
      window.speechSynthesis.resume();
      startRef.current = Date.now();
      setState('playing');
      rafRef.current = requestAnimationFrame(tick);
      return;
    }
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang === 'es' ? 'es-MX' : 'en-US';
    u.rate = 1; u.pitch = 1;
    u.onend = () => { setState('idle'); setProgress(1); elapsedRef.current = 0; if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    elapsedRef.current = 0;
    startRef.current = Date.now();
    window.speechSynthesis.speak(u);
    setState('playing');
    rafRef.current = requestAnimationFrame(tick);
  };

  const pause = () => {
    if (!supported) return;
    window.speechSynthesis.pause();
    elapsedRef.current += (Date.now() - startRef.current) / 1000;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setState('paused');
  };

  const fmt = (s) => `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}`;
  const curSec = progress * totalSec;

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', border: '1px solid rgba(10,10,10,0.08)', borderRadius: 999, padding: '8px 16px 8px 8px', minWidth: 280 }}>
      <button onClick={state === 'playing' ? pause : play} disabled={!supported}
        aria-label={state === 'playing' ? 'Pause' : 'Play'}
        style={{ width: 42, height: 42, borderRadius: '50%', border: 'none', flexShrink: 0, background: supported ? accent : 'rgba(10,10,10,0.2)', color: '#fff', cursor: supported ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'playing'
          ? <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>
          : <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" style={{ marginLeft: 2 }}><path d="M7 5.3v13.4c0 .8.9 1.3 1.6.8l10.2-6.7a1 1 0 000-1.6L8.6 4.5C7.9 4 7 4.5 7 5.3z"/></svg>}
      </button>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: '#0a0a0a', letterSpacing: -0.1 }}>
            {state === 'idle' ? (lang === 'es' ? 'Escuchar artículo' : 'Listen to article') : (state === 'paused' ? (lang === 'es' ? 'En pausa' : 'Paused') : (lang === 'es' ? 'Reproduciendo…' : 'Playing…'))}
          </span>
          {state !== 'idle' && (
            <button onClick={stopAll} style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>{lang === 'es' ? 'Detener' : 'Stop'}</button>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ flex: 1, height: 4, borderRadius: 2, background: 'rgba(10,10,10,0.1)', overflow: 'hidden' }}>
            <div style={{ width: `${progress * 100}%`, height: '100%', background: accent, borderRadius: 2, transition: 'width .2s linear' }}/>
          </div>
          <span style={{ fontSize: 10, color: 'rgba(10,10,10,0.5)', fontFamily: 'ui-monospace, monospace', flexShrink: 0 }}>
            {fmt(curSec)} / {fmt(totalSec)}
          </span>
        </div>
      </div>
    </div>
  );
};

// BLOG POST — lee el artículo seleccionado de window._selectedPost
const BlogPostPage = ({ lang, setPage }) => {
  const accent = '#1FA84A';
  const CONTENT_W = 720;
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

  const rawText = post.content.replace(/<[^>]+>/g, '').trim();
  const authorName = post.author?.name || 'Luis García';
  const authorRole = post.author?.role || (lang === 'es' ? 'Fundador OnRoute' : 'OnRoute founder');
  const authorAvatar = post.author?.avatar || 'https://ui-avatars.com/api/?name=LG&background=0F6B2E&color=fff';
  const authorInitials = authorName.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();

  return (
    <>
      <article style={{ padding: '32px 40px 70px', maxWidth: CONTENT_W, margin: '0 auto' }}>
        {/* Fecha de publicación + categoría principal — alineadas al ancho de contenido */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: 13, fontWeight: 600, color: 'rgba(10,10,10,0.55)' }}>
            {lang === 'es' ? 'Publicado el ' : 'Published '}{post.date}
          </span>
          <span style={{ width: 1, height: 14, background: 'rgba(10,10,10,0.2)' }}/>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(31,168,74,0.1)', color: '#0F6B2E', fontSize: 11, fontWeight: 700, letterSpacing: 0.8, textTransform: 'uppercase', padding: '6px 13px', borderRadius: 999, whiteSpace: 'nowrap' }}>
            <span style={{ width: 5, height: 5, borderRadius: '50%', background: accent }}/>
            {post.cat}
          </span>
        </div>

        {/* Título */}
        <h1 style={{ fontSize: 46, fontWeight: 800, margin: '18px 0 0 0', letterSpacing: -1.6, fontFamily: 'Archivo, sans-serif', lineHeight: 1.04, textWrap: 'balance' }}>
          {post.t}
        </h1>

        {/* Bajada / dek */}
        <p style={{ fontSize: 19, color: 'rgba(10,10,10,0.6)', lineHeight: 1.5, marginTop: 18, marginBottom: 0, fontWeight: 400, textWrap: 'pretty' }}>
          {post.excerpt}
        </p>

        {/* Autor + fecha */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 26 }}>
          {post.author?.avatar ? (
            <img src={authorAvatar} alt={authorName} style={{ width: 44, height: 44, borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }} />
          ) : (
            <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #0F6B2E, #1FA84A)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 16, fontFamily: 'Archivo, sans-serif', flexShrink: 0 }}>{authorInitials}</div>
          )}
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#0a0a0a' }}>{authorName}</div>
            <div style={{ fontSize: 12, color: 'rgba(10,10,10,0.55)' }}>{authorRole} · {post.date}</div>
          </div>
        </div>

        {/* Barra de compartir — debajo del autor, por encima de la imagen */}
        <div style={{ marginTop: 24, paddingTop: 22, borderTop: '1px solid rgba(10,10,10,0.08)' }}>
          <ShareBar lang={lang} titleText={post.t}/>
        </div>

        {/* Imagen principal */}
        {post.img && (
          <div style={{ margin: '26px 0 0' }}>
            <img src={post.img} alt={post.t} style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', borderRadius: 14, display: 'block' }} />
          </div>
        )}

        {/* Meta: tiempo de lectura + reproducir audio — debajo de la imagen */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', margin: '24px 0 8px', padding: '16px 0', borderTop: '1px solid rgba(10,10,10,0.08)', borderBottom: '1px solid rgba(10,10,10,0.08)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, fontWeight: 600, color: 'rgba(10,10,10,0.7)' }}>
              <window.Icon name="clock" size={16} stroke={2} color={accent}/>
              {post.readMin} {lang === 'es' ? 'min de lectura' : 'min read'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 13, color: 'rgba(10,10,10,0.5)' }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 7h16M4 12h10M4 17h13"/></svg>
              {(post.wordCount || 0).toLocaleString()} {lang === 'es' ? 'palabras' : 'words'}
            </span>
          </div>
          <ArticleAudioPlayer lang={lang} text={rawText} minutes={post.readMin}/>
        </div>

        {/* Cuerpo del post renderizado desde WordPress */}
        <div className="wp-content" style={{ fontSize: 17, color: 'rgba(10,10,10,0.85)', lineHeight: 1.75 }}>
          <style>{`
            .wp-content h1, .wp-content h2, .wp-content h3, .wp-content h4 {
              color: #0a0a0a;
              margin-top: 2.2em;
              margin-bottom: 0.8em;
              font-family: Archivo, sans-serif;
              font-weight: 800;
              letter-spacing: -0.7px;
              line-height: 1.2;
            }
            .wp-content h2 { font-size: 27px; margin-top: 44px; margin-bottom: 0; }
            .wp-content h3 { font-size: 19px; margin-top: 32px; margin-bottom: 0; letter-spacing: -0.3px; }
            .wp-content p { margin-top: 16px; margin-bottom: 0; text-wrap: pretty; }
            .wp-content img {
              max-width: 100%;
              height: auto;
              border-radius: 14px;
              margin: 2em 0;
            }
            .wp-content a {
              color: #1FA84A;
              text-decoration: none;
            }
            .wp-content a:hover { border-bottom: 1px solid #1FA84A; }
            .wp-content ul, .wp-content ol {
              margin-top: 16px;
              margin-bottom: 16px;
              padding-left: 1.5em;
            }
            .wp-content li { margin-bottom: 0.6em; }
            .wp-content figure { margin: 2.5em 0; }
            .wp-content figcaption {
              font-size: 13px;
              color: rgba(10,10,10,0.5);
              text-align: center;
              margin-top: 10px;
            }
            .wp-content blockquote {
              border-left: 4px solid #1FA84A;
              padding-left: 20px;
              margin-left: 0;
              font-style: italic;
              color: rgba(10,10,10,0.7);
              background: rgba(31,168,74,0.04);
              padding: 24px;
              border-radius: 0 12px 12px 0;
              font-size: 19px;
            }
            .wp-content pre {
              background: #2d2d2d;
              color: #fff;
              padding: 16px;
              border-radius: 8px;
              overflow-x: auto;
              font-size: 14px;
            }
          `}</style>
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: 26, background: '#0a1f12', color: '#fff', borderRadius: 14, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
          <div>
            <div style={{ fontSize: 11, color: '#7dd87e', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase' }}>{lang === 'es' ? '¿Quieres el traslado privado?' : 'Want a private transfer?'}</div>
            <div style={{ fontSize: 21, fontWeight: 800, fontFamily: 'Archivo, sans-serif', marginTop: 4, letterSpacing: -0.4 }}>{lang === 'es' ? 'CUN → Tu destino. Tarifa fija.' : 'CUN → Your destination. Flat rate.'}</div>
          </div>
          <button onClick={() => setPage('contact')} style={{ padding: '13px 22px', borderRadius: 9, border: 'none', background: accent, color: '#fff', fontSize: 13, fontWeight: 700, cursor: 'pointer', fontFamily: 'Inter, sans-serif', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
            {lang === 'es' ? 'Cotizar ahora' : 'Quote now'} <window.Icon name="arrowRight" size={15} stroke={2.2}/>
          </button>
        </div>

        {/* Compartir (repetido al final, conveniencia) */}
        <div style={{ marginTop: 40, paddingTop: 26, borderTop: '1px solid rgba(10,10,10,0.08)' }}>
          <ShareBar lang={lang} titleText={post.t}/>
        </div>

        {/* Taxonomías / etiquetas — al final de la página */}
        {post.tags && post.tags.length > 0 && (
          <div style={{ marginTop: 36 }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: 1, color: 'rgba(10,10,10,0.45)', textTransform: 'uppercase', marginBottom: 14 }}>
              {lang === 'es' ? 'Etiquetas' : 'Tags'}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
              {post.tags.map((tag, i) => (
                <a key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 600, color: 'rgba(10,10,10,0.7)', background: '#fff', border: '1px solid rgba(10,10,10,0.1)', padding: '7px 13px', borderRadius: 999, cursor: 'pointer', transition: 'all .15s', whiteSpace: 'nowrap' }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = accent; e.currentTarget.style.color = '#0F6B2E'; e.currentTarget.style.background = 'rgba(31,168,74,0.06)'; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(10,10,10,0.1)'; e.currentTarget.style.color = 'rgba(10,10,10,0.7)'; e.currentTarget.style.background = '#fff'; }}>
                  <span style={{ color: accent, fontWeight: 700 }}>#</span>{tag}
                </a>
              ))}
            </div>
          </div>
        )}
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
  const [clipCardObj, setClipCardObj] = React.useState(null);

  React.useEffect(() => {
    if (step === 2 && window.ClipSDK) {
      try {
        // Inicializa el SDK con la llave pública. REEMPLAZAR CON LA TUYA DE PRODUCCIÓN/PRUEBAS.
        const clip = new window.ClipSDK('f92a4f3a-8ce8-424d-952e-8974fa53a7f4');
        const card = clip.element.create("Card", { locale: lang === 'es' ? 'es' : 'en' });
        card.mount("clip-checkout-div");
        setClipCardObj(card);
      } catch (e) {
        console.error("Error al montar Clip SDK", e);
      }
    }
  }, [step, lang]);

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
      if (!clipCardObj) throw new Error("El sistema de pagos no está inicializado.");

      // 1. Obtener Token Seguro de Clip
      const cardToken = await clipCardObj.cardToken();
      if (!cardToken || !cardToken.id) {
        throw new Error("No se pudo generar el token. Revisa los datos de la tarjeta.");
      }

      const payload = {
        clip_token: cardToken.id,
        name: form.name,
        email: form.email,
        phone: form.phone,
        notes: form.notes,
        tour_title: tour.t,
        pax: pax,
        date: date,
        total: Number(total.toFixed(2)) // Forzamos 2 decimales estrictos en JavaScript
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
                    <window.Icon name="shield" size={13} stroke={2} color={accent} /> {lang === 'es' ? 'Encriptación PCI · procesado por Clip' : 'PCI encryption · processed by Clip'}
                  </p>
                  {/* Contenedor donde Clip inyectará su formulario seguro (iframe) */}
                  <div id="clip-checkout-div" style={{ minHeight: 250 }}></div>

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
