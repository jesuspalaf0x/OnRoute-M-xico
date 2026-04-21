// Datos compartidos: copy bilingüe, destinos, servicios, tours

const COPY = {
  es: {
    nav: { inicio: 'Inicio', servicios: 'Servicios', destinos: 'Destinos', tours: 'Tours', nosotros: 'Nosotros', blog: 'Blog', contacto: 'Contacto' },
    hero: {
      kicker: 'Riviera Maya · Yucatán',
      title1: 'Tu aventura',
      title2: 'comienza',
      title3: 'en el camino',
      sub: 'Traslados privados, taxi turístico y experiencias todo incluido desde aeropuertos de Cancún y Tulum hacia cualquier destino del Caribe mexicano.',
      cta: 'Cotizar traslado',
      cta2: 'Ver tours',
    },
    booker: {
      title: 'Cotiza tu traslado',
      from: 'Desde', fromPH: 'Aeropuerto de Cancún',
      to: 'Hacia', toPH: 'Hotel en Tulum',
      date: 'Fecha', pax: 'Pasajeros',
      round: 'Ida y vuelta',
      submit: 'Cotizar ahora',
      price: 'Desde',
    },
    services: {
      kicker: 'Nuestros servicios',
      title: 'Conectamos cada momento de tu viaje',
      sub: 'Desde el momento que aterrizas hasta que cierras los ojos frente al Caribe.',
      list: [
        { t: 'Traslados aeropuerto', d: 'Puerta a puerta desde CUN y TQO a cualquier hotel, villa o Airbnb. Vuelo monitoreado sin cargo.', tag: 'Más solicitado' },
        { t: 'Taxi turístico', d: 'Servicio por horas o día completo con conductor local bilingüe. Perfecto para explorar a tu ritmo.', tag: null },
        { t: 'Tours todo incluido', d: 'Cenotes, ruinas mayas, senderismo y experiencias culinarias con guía certificado.', tag: null },
        { t: 'Grupos y eventos', d: 'Vans y sprinters para bodas, convenciones o viajes familiares de hasta 16 personas.', tag: null },
      ],
    },
    destinos: {
      kicker: 'Destinos',
      title: 'Cubrimos toda la Riviera Maya y Yucatán',
      list: [
        { n: 'Tulum', m: '2h 00min desde CUN', img: 'tulum' },
        { n: 'Cancún', m: 'Zona Hotelera · 20min', img: 'cancun' },
        { n: 'Playa del Carmen', m: '1h 10min desde CUN', img: 'pdc' },
        { n: 'Chichén Itzá', m: '3h 00min desde CUN', img: 'chichen' },
        { n: 'Holbox', m: '2h 40min + ferry', img: 'holbox' },
        { n: 'Bacalar', m: '4h 30min desde CUN', img: 'bacalar' },
        { n: 'Valladolid', m: '2h 15min desde CUN', img: 'valladolid' },
        { n: 'Mérida', m: '4h 00min desde CUN', img: 'merida' },
      ],
    },
    tours: {
      kicker: 'Experiencias destacadas',
      title: 'Tours que se quedan en la memoria',
      list: [
        { t: 'Tulum, Cobá, Aldea Maya y Cenote', loc: 'Tulum, Q. Roo', price: '$1,306.85', dur: '9:00 hrs', rating: 4.3, rev: 205, tags: ['Cenotes', 'Incluye comida'], img: 'tulum-tour' },
        { t: 'Chichén Itzá Clásico + Cenote Ik Kil', loc: 'Yucatán', price: '$1,450.00', dur: '12:00 hrs', rating: 4.6, rev: 342, tags: ['Almuerzo buffet', 'Valladolid'], img: 'chichen-tour' },
        { t: 'Isla Holbox Full Day', loc: 'Holbox', price: '$1,890.00', dur: '14:00 hrs', rating: 4.8, rev: 128, tags: ['3 playas', 'Lancha privada'], img: 'holbox-tour' },
        { t: 'Ruta de los Cenotes', loc: 'Puerto Morelos', price: '$980.00', dur: '8:00 hrs', rating: 4.5, rev: 189, tags: ['4 cenotes', 'Snorkel'], img: 'cenotes-tour' },
      ],
    },
    gallery: {
      kicker: 'Galería',
      title: 'Lo que viven nuestros pasajeros',
    },
    why: {
      kicker: 'Por qué OnRoute',
      title: 'Un viaje sin sorpresas',
      list: [
        { t: 'Vuelo monitoreado', d: 'Si tu vuelo se retrasa, tu conductor también. Sin cargos extra.' },
        { t: 'Conductores locales', d: 'Bilingües, certificados y con conocimiento profundo de la zona.' },
        { t: 'Tarifa fija', d: 'El precio que ves es el que pagas. Sin cargos ocultos ni sorpresas.' },
        { t: '24/7 soporte', d: 'WhatsApp directo con un humano, siempre. No chatbots.' },
      ],
    },
    footer: {
      tag: 'Travel & Experiences',
      rights: '© 2026 OnRoute México. Todos los derechos reservados.',
      links: ['Términos', 'Privacidad', 'Aviso legal'],
    },
  },
  en: {
    nav: { inicio: 'Home', servicios: 'Services', destinos: 'Destinations', tours: 'Tours', nosotros: 'About', blog: 'Blog', contacto: 'Contact' },
    hero: {
      kicker: 'Riviera Maya · Yucatán',
      title1: 'Your adventure',
      title2: 'begins',
      title3: 'on the road',
      sub: 'Private transfers, tourist taxi and all-inclusive experiences from Cancún and Tulum airports to anywhere in the Mexican Caribbean.',
      cta: 'Get a quote',
      cta2: 'Browse tours',
    },
    booker: {
      title: 'Quote your transfer',
      from: 'From', fromPH: 'Cancún Airport',
      to: 'To', toPH: 'Tulum hotel',
      date: 'Date', pax: 'Passengers',
      round: 'Round trip',
      submit: 'Get quote',
      price: 'From',
    },
    services: {
      kicker: 'What we do',
      title: 'We connect every moment of your trip',
      sub: 'From the moment you land until you fall asleep by the Caribbean.',
      list: [
        { t: 'Airport transfers', d: 'Door-to-door from CUN & TQO to any hotel, villa or Airbnb. Flight tracking at no extra cost.', tag: 'Most booked' },
        { t: 'Tourist taxi', d: 'Hourly or full-day service with a bilingual local driver. Explore at your own pace.', tag: null },
        { t: 'All-inclusive tours', d: 'Cenotes, Mayan ruins, hiking and culinary experiences with certified guides.', tag: null },
        { t: 'Groups & events', d: 'Vans and sprinters for weddings, conventions or family trips up to 16 guests.', tag: null },
      ],
    },
    destinos: {
      kicker: 'Destinations',
      title: 'We cover the whole Riviera Maya and Yucatán',
      list: [
        { n: 'Tulum', m: '2h 00min from CUN', img: 'tulum' },
        { n: 'Cancún', m: 'Hotel Zone · 20min', img: 'cancun' },
        { n: 'Playa del Carmen', m: '1h 10min from CUN', img: 'pdc' },
        { n: 'Chichén Itzá', m: '3h 00min from CUN', img: 'chichen' },
        { n: 'Holbox', m: '2h 40min + ferry', img: 'holbox' },
        { n: 'Bacalar', m: '4h 30min from CUN', img: 'bacalar' },
        { n: 'Valladolid', m: '2h 15min from CUN', img: 'valladolid' },
        { n: 'Mérida', m: '4h 00min from CUN', img: 'merida' },
      ],
    },
    tours: {
      kicker: 'Featured experiences',
      title: 'Tours that stay with you',
      list: [
        { t: 'Tulum, Cobá, Mayan Village & Cenote', loc: 'Tulum, Q. Roo', price: '$1,306.85', dur: '9:00 hrs', rating: 4.3, rev: 205, tags: ['Cenotes', 'Lunch included'], img: 'tulum-tour' },
        { t: 'Classic Chichén Itzá + Ik Kil Cenote', loc: 'Yucatán', price: '$1,450.00', dur: '12:00 hrs', rating: 4.6, rev: 342, tags: ['Buffet lunch', 'Valladolid'], img: 'chichen-tour' },
        { t: 'Holbox Island Full Day', loc: 'Holbox', price: '$1,890.00', dur: '14:00 hrs', rating: 4.8, rev: 128, tags: ['3 beaches', 'Private boat'], img: 'holbox-tour' },
        { t: 'Cenote Route', loc: 'Puerto Morelos', price: '$980.00', dur: '8:00 hrs', rating: 4.5, rev: 189, tags: ['4 cenotes', 'Snorkel'], img: 'cenotes-tour' },
      ],
    },
    gallery: { kicker: 'Gallery', title: 'What our passengers live' },
    why: {
      kicker: 'Why OnRoute',
      title: 'A trip with no surprises',
      list: [
        { t: 'Flight tracking', d: 'If your flight is delayed, so is your driver. No extra charge.' },
        { t: 'Local drivers', d: 'Bilingual, certified and deeply familiar with the region.' },
        { t: 'Flat rate', d: 'The price you see is the price you pay. No hidden fees.' },
        { t: '24/7 support', d: 'Direct WhatsApp with a human. Always. No chatbots.' },
      ],
    },
    footer: {
      tag: 'Travel & Experiences',
      rights: '© 2026 OnRoute México. All rights reserved.',
      links: ['Terms', 'Privacy', 'Legal'],
    },
  },
};

// Placeholders fotográficos con gradientes + texturas evocativas (sin hand-drawn SVG complejo)
// Cada destino/tour tiene un "ambiente" de color distinto pero coherente con el Caribe mexicano
const IMG_PALETTES = {
  tulum:      ['#0ea5a3', '#fbbf24', '#84cc16'],
  cancun:     ['#0891b2', '#67e8f9', '#fde68a'],
  pdc:        ['#14b8a6', '#fef08a', '#22c55e'],
  chichen:    ['#a16207', '#f59e0b', '#78350f'],
  holbox:     ['#06b6d4', '#fda4af', '#fde68a'],
  bacalar:    ['#0369a1', '#22d3ee', '#a5f3fc'],
  valladolid: ['#b45309', '#f59e0b', '#fbbf24'],
  merida:     ['#9a3412', '#ea580c', '#fef3c7'],
  'tulum-tour':   ['#0d9488', '#fbbf24', '#166534'],
  'chichen-tour': ['#78350f', '#f59e0b', '#fef3c7'],
  'holbox-tour':  ['#0891b2', '#67e8f9', '#fef3c7'],
  'cenotes-tour': ['#065f46', '#34d399', '#a7f3d0'],
};

function paletteFor(key) {
  return IMG_PALETTES[key] || ['#1FA84A', '#0F6B2E', '#84cc16'];
}

Object.assign(window, { COPY, paletteFor });
