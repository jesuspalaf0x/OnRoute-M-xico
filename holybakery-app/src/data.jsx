// Shared mock data + helpers for Holy Bakery × OnRoute prototype

const EMPLOYEES = [
  { id: 1, name: "Ramiro Carbajal", role: "Cajero", shift: "8:00 a.m. – 3:00 p.m.", initials: "RC", active: true },
  { id: 2, name: "Diana Domínguez", role: "Repostería", shift: "3:00 p.m. – 8:30 p.m.", initials: "DD", active: true },
  { id: 3, name: "Lucía Hernández", role: "Apoyo", shift: "10:00 a.m. – 4:00 p.m.", initials: "LH", active: true },
];

const ZONES = [
  { id: 1, name: "Zona 1", desc: "Centro Tulum / área cercana", local: 150, foreign: 200, color: "#16a34a" },
  { id: 2, name: "Zona 2", desc: "Zona Hotelera Tulum", local: 200, foreign: 280, color: "#0e6a32" },
  { id: 3, name: "Zona 3", desc: "Aldea Zama / residenciales", local: 220, foreign: 300, color: "#3b82f6" },
  { id: 4, name: "Zona 4", desc: "Akumal / Puerto Aventuras", local: 380, foreign: 480, color: "#7c3aed" },
  { id: 5, name: "Zona 5", desc: "Playa del Carmen", local: 550, foreign: 700, color: "#b45309" },
  { id: 6, name: "Zona 6", desc: "Cobá / fuera de zona estándar", local: null, foreign: null, color: "#9aa09c" },
];

const PREFERENTIAL = [
  { id: 1, name: "Casa Banana Restaurante", address: "Carretera Tulum-Boca Paila Km 8", local: 400, foreign: 480, zone: "Zona 2" },
  { id: 2, name: "Hotel Be Tulum", address: "Carretera Boca Paila Km 10", local: 350, foreign: 450, zone: "Zona 2" },
  { id: 3, name: "Mi Amor Boutique Hotel", address: "Carretera Tulum-Boca Paila Km 7.5", local: 320, foreign: 420, zone: "Zona 2" },
];

const DELIVERIES = [
  { id: "DLV-042", date: "Sáb 9 may, 6:15 p.m.", destination: "Satori Tulum", zone: "Zona 2", employee: "Diana Domínguez", cost: 280, paid: false, status: "confirmada", client: "Miranda Reyes", phone: "+1 881 123 4567" },
  { id: "DLV-041", date: "Sáb 9 may, 4:00 p.m.", destination: "Casa Banana", zone: "Especial", employee: "Diana Domínguez", cost: 400, paid: false, status: "entregada", client: "Lorena V.", phone: "+52 984 100 0011" },
  { id: "DLV-040", date: "Vie 8 may, 7:00 p.m.", destination: "Aldea Zama Lote 14", zone: "Zona 3", employee: "Ramiro Carbajal", cost: 220, paid: true, status: "pagada", client: "Juan Pérez", phone: "+52 998 333 4422" },
  { id: "DLV-039", date: "Vie 8 may, 2:30 p.m.", destination: "Hotel Be Tulum", zone: "Especial", employee: "Ramiro Carbajal", cost: 350, paid: false, status: "entregada", client: "Concierge Be", phone: "+52 984 871 0011" },
  { id: "DLV-038", date: "Jue 7 may, 8:00 p.m.", destination: "Centro Tulum, Av. Tulum 200", zone: "Zona 1", employee: "Diana Domínguez", cost: 150, paid: true, status: "pagada", client: "Carla M.", phone: "+52 984 220 0001" },
  { id: "DLV-037", date: "Jue 7 may, 5:15 p.m.", destination: "Mi Amor Boutique Hotel", zone: "Especial", employee: "Diana Domínguez", cost: 320, paid: false, status: "entregada", client: "Recepción", phone: "+52 984 188 9090" },
  { id: "DLV-036", date: "Mié 6 may, 11:00 a.m.", destination: "Akumal Beach Resort", zone: "Zona 4", employee: "Lucía Hernández", cost: 480, paid: false, status: "cancelacion_pendiente", client: "Sergio T.", phone: "+1 305 555 0123" },
  { id: "DLV-035", date: "Mié 6 may, 9:30 a.m.", destination: "Playa Paraíso, Bungalow 3", zone: "Zona 2", employee: "Diana Domínguez", cost: 280, paid: false, status: "cancelada", client: "—", phone: "—" },
  { id: "DLV-034", date: "Mar 5 may, 7:30 p.m.", destination: "Hotel Nômade Tulum", zone: "Zona 2", employee: "Diana Domínguez", cost: 280, paid: true, status: "pagada", client: "Concierge", phone: "+52 984 877 0202" },
];

const DRAFTS = [
  { id: "BRR-008", created: "Hoy, 11:42 a.m.", destination: "Hotel La Valise Tulum", zone: "Zona 2", cost: 280, employee: "Diana Domínguez" },
  { id: "BRR-007", created: "Ayer, 5:20 p.m.", destination: "Cenote Calavera", zone: "Sin zona", cost: null, employee: "Ramiro Carbajal" },
  { id: "BRR-006", created: "7 may, 10:11 a.m.", destination: "Coba Casitas, casa 4", zone: "Zona 6", cost: null, employee: "Diana Domínguez" },
];

const EXTRAS = [
  { id: "EXT-014", date: "Vie 8 may, 8:30 p.m.", linked: "DLV-040", description: "Vuelta extra por pastel olvidado", cost: 150, employee: "Ramiro Carbajal" },
  { id: "EXT-013", date: "Mié 6 may, 1:15 p.m.", linked: null, description: "Servicio de emergencia — entrega cumpleaños", cost: 350, employee: "Diana Domínguez" },
];

const fmtMXN = (n) => n == null ? "—" : `$${n.toLocaleString("es-MX", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN`;
const fmtUSD = (n, rate = 17.5) => n == null ? "—" : `~$${(n / rate).toFixed(2)} USD`;
const fmtNum = (n) => n == null ? "—" : n.toLocaleString("es-MX");

const STATUS_LABEL = {
  borrador: "Borrador",
  confirmada: "Confirmada",
  entregada: "Entregada",
  pagada: "Pagada",
  cancelada: "Cancelada",
  cancelacion_pendiente: "Cancelación pendiente",
  cambio_tarifa_pendiente: "Cambio de Tarifa",
};

window.MOCK = { EMPLOYEES, ZONES, PREFERENTIAL, DELIVERIES, DRAFTS, EXTRAS, STATUS_LABEL };
window.fmt = { fmtMXN, fmtUSD, fmtNum };
