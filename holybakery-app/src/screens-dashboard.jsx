import React from 'react';
import InteractiveMap from './components/InteractiveMap';

// Dashboard (employee) and Admin screens

const { useState: useStateD } = React;
const ID = window.Icons;
const { fmtMXN, fmtUSD, fmtNum } = window.fmt;

/* =============================================================
   API HOOK
============================================================= */
const API_BASE = "https://onroutemx.com/wp-json/hb/v1";

const useApi = (endpoint, defaultData = null, pollInterval = null) => {
  const [data, setData] = useStateD(defaultData);
  const [loading, setLoading] = useStateD(true);
  const [error, setError] = useStateD(null);

  React.useEffect(() => {
    let isMounted = true;
    const fetchApi = async () => {
      try {
        const token = sessionStorage.getItem("wp_token") || sessionStorage.getItem("wp_token_admin");
        const res = await fetch(`${API_BASE}${endpoint}`, {
          headers: { "Authorization": token ? `Bearer ${token}` : "" }
        });
        if (!res.ok) throw new Error("API Error");
        const json = await res.json();
        if (isMounted) {
          setData(json);
          setError(null);
        }
      } catch (e) {
        if (isMounted && (!data || !data.items)) setError(e.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };
    
    fetchApi();
    
    let intervalId;
    if (pollInterval) {
      intervalId = setInterval(fetchApi, pollInterval);
    }
    
    return () => { 
      isMounted = false; 
      if (intervalId) clearInterval(intervalId);
    };
  }, [endpoint, pollInterval]);

  return { data, setData, loading, error };
};

/* =============================================================
   SHELL: top bar + sidebar
============================================================= */
function AppShell({ role, section, setSection, goTo, children }) {
  const isAdmin = role === "admin";
  const employeeNav = [
    { key: "resumen", label: "Resumen", icon: <ID.Home size={16}/> },
    { key: "reservas", label: "Reservas realizadas", icon: <ID.Layers size={16}/>, badge: "12" },
    { key: "localizador", label: "Localizador", icon: <ID.Map size={16}/>, badge: "2" },
    { key: "guardadas", label: "Guardadas", icon: <ID.Bookmark size={16}/>, badge: "3" },
    { key: "empleados", label: "Empleados", icon: <ID.Users size={16}/> },
    { key: "bancarios", label: "Datos bancarios", icon: <ID.Banknote size={16}/> },
  ];
  const adminNav = [
    { key: "panel", label: "Panel", icon: <ID.Home size={16}/> },
    { key: "reservas", label: "Reservas", icon: <ID.Layers size={16}/> },
    { key: "pagos", label: "Pagos", icon: <ID.CreditCard size={16}/> },
    { key: "solicitudes", label: "Solicitudes", icon: <ID.Bell size={16}/> },
    { key: "extras", label: "Extras", icon: <ID.PackagePlus size={16}/> },
    { key: "config-zonas", label: "Zonas y tarifas", icon: <ID.Map size={16}/> },
    { key: "config-pref", label: "Tarifas especiales", icon: <ID.Star size={16}/> },
    { key: "config-tc", label: "Tipo de cambio", icon: <ID.RefreshCcw size={16}/> },
    { key: "config-bank", label: "Datos bancarios", icon: <ID.Banknote size={16}/> },
  ];
  const nav = isAdmin ? adminNav : employeeNav;

  const handleLogout = () => {
    sessionStorage.removeItem("wp_token");
    sessionStorage.removeItem("wp_token_admin");
    if (isAdmin) {
      goTo("admin-login");
    } else {
      goTo("login");
    }
  };

  return (
    <div className="app-shell">
      <div className="app-top">
        <div className="brand">
          <div className="marks">
            <span className="mark"><span className="swatch" style={{background:"#0d2618"}}></span>Holy Bakery Tulum</span>
            <span className="mark"><span className="swatch" style={{background:"#16a34a"}}></span>OnRoute México</span>
          </div>
        </div>
        <div className="top-right">
          <span className="pill"><ID.RefreshCcw size={12}/> $17.50 MXN/USD</span>
          {!isAdmin && (() => {
            const currentEmp = window.MOCK.getCurrentEmployee();
            return <span className="muted">En turno: <strong style={{color:"var(--ink)"}}>{currentEmp.name}</strong> · {currentEmp.shift}</span>;
          })()}
          {isAdmin && <span className="muted">Admin · <strong style={{color:"var(--ink)"}}>OnRoute Master</strong></span>}
          <button className="btn btn-ghost btn-sm"><ID.Bell size={14}/></button>
          <button className="btn btn-ghost btn-sm" onClick={handleLogout}><ID.LogOut size={14}/> Salir</button>
        </div>
      </div>
      <div className="app-body">
        <aside className="sidebar">
          <div className="section-title">{isAdmin ? "Operación" : "Mi turno"}</div>
          {nav.slice(0, isAdmin ? 5 : 4).map(n => (
            <button key={n.key} className={"nav-item " + (section===n.key ? "active" : "")} onClick={() => setSection(n.key)}>
              {n.icon} {n.label} {n.badge && <span className="badge">{n.badge}</span>}
            </button>
          ))}
          <div className="section-title" style={{marginTop: 20}}>Configuración</div>
          {nav.slice(isAdmin ? 5 : 4).map(n => (
            <button key={n.key} className={"nav-item " + (section===n.key ? "active" : "")} onClick={() => setSection(n.key)}>
              {n.icon} {n.label} {n.badge && <span className="badge">{n.badge}</span>}
            </button>
          ))}
          <div className="employee-card">
            <div className="avatar">{isAdmin ? "OR" : "DD"}</div>
            <div className="meta">
              <strong>{isAdmin ? "OnRoute Admin" : "Diana Domínguez"}</strong>
              {isAdmin ? "admin@onroutemx.com" : "Repostería"}
            </div>
          </div>
        </aside>
        <main className="main">{children}</main>
      </div>
    </div>
  );
}

/* =============================================================
   STATUS PILL
============================================================= */
const StatusPill = ({ s }) => {
  const statusKey = s || "confirmada";
  return (
    <span className={"status status-" + (statusKey === "cancelacion_pendiente" || statusKey === "cambio_tarifa_pendiente" || statusKey === "cambio_tarifa" ? "pendiente" : statusKey)}>
      {window.MOCK.STATUS_LABEL[statusKey] || (statusKey === "cambio_tarifa" ? "Cambio de tarifa" : statusKey)}
    </span>
  );
};

/* =============================================================
   EMPLOYEE — RESUMEN
============================================================= */
function EmpResumen({ goTo }) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Cancun" }));
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const dLast = new Date(y, now.getMonth() + 1, 0).getDate();
  const dateFrom = `${y}-${m}-01`;
  const dateTo = `${y}-${m}-${dLast}`;

  const { data: mesData, loading: l1 } = useApi(`/deliveries?status[]=entregada&status[]=pagada&date_from=${dateFrom}&date_to=${dateTo}`, {total:0, items:[]}, 45000);
  const { data: pendientesData, loading: l2 } = useApi(`/deliveries?status[]=entregada`, {total:0, items:[]}, 45000);
  const { data: pagadasData, loading: l3 } = useApi(`/deliveries?status[]=pagada&date_from=${dateFrom}&date_to=${dateTo}`, {total:0, items:[]}, 45000);
  const { data: borradorData, loading: l4 } = useApi(`/deliveries?status[]=borrador`, {total:0, items:[]}, 45000);
  const { data: empData, loading: lEmp } = useApi(`/employees/on-shift`, null, 45000);
  const { data: upcomingData, loading: lUp } = useApi(`/deliveries?limit=5`, {total:0, items:[]}, 45000);

  const numEntregadas = mesData?.total || 0;
  const pendienteCobro = (pendientesData?.items || []).reduce((acc, d) => acc + (d.cost || 0), 0);
  const numPendiente = pendientesData?.total || 0;
  const yaPagadas = (pagadasData?.items || []).reduce((acc, d) => acc + (d.cost || 0), 0);
  const numPagadas = pagadasData?.total || 0;
  const enAdeudo = pendientesData?.total || 0;
  const borradores = borradorData?.total || 0;

  const upcoming = (upcomingData?.items || []).filter(d => d.status !== "borrador" && d.status !== "cancelada").slice(0, 5);
  const loading = l1 || l2 || l3 || l4;

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Resumen del turno</h1>
          <p>Vista compartida del equipo Holy Bakery — todos ven todo.</p>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm"><ID.Download size={14}/> Exportar</button>
          <button className="btn btn-primary btn-sm" onClick={() => goTo("cotizador")}><ID.Plus size={14}/> Nueva reserva</button>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi">
          <div className="kpi-label">Entregas realizadas</div>
          <div className="kpi-value">{loading ? "..." : numEntregadas}</div>
          <div className="kpi-sub">Mes en curso</div>
        </div>
        <div className="kpi kpi-warn">
          <div className="kpi-label">Pendiente de cobro</div>
          <div className="kpi-value">{loading ? "..." : fmtMXN(pendienteCobro)}</div>
          <div className="kpi-sub">{loading ? "..." : `${numPendiente} entregas sin pagar`}</div>
        </div>
        <div className="kpi kpi-accent">
          <div className="kpi-label">Ya pagadas</div>
          <div className="kpi-value">{loading ? "..." : fmtMXN(yaPagadas)}</div>
          <div className="kpi-sub">{loading ? "..." : `${numPagadas} entregas`}</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">En adeudo</div>
          <div className="kpi-value">{loading ? "..." : enAdeudo}</div>
          <div className="kpi-sub">Completadas sin pago</div>
        </div>
        <div className="kpi">
          <div className="kpi-label">Borradores</div>
          <div className="kpi-value">{loading ? "..." : borradores}</div>
          <div className="kpi-sub">Sin seguimiento</div>
        </div>
      </div>

      <div className="row" style={{gridTemplateColumns:"2fr 1fr", gap: 18}}>
        <div className="section-card">
          <div className="flex-between" style={{marginBottom: 14}}>
            <div>
              <h3>Próximas entregas</h3>
              <p className="desc" style={{margin:0}}>Hoy y mañana, ordenadas por hora.</p>
            </div>
            <button className="lnk">Ver todas →</button>
          </div>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>ID</th><th>Cuándo</th><th>Destino</th><th>Empleado</th><th>Costo</th><th>Estado</th></tr></thead>
              <tbody>
                {loading ? <tr><td colSpan="6" style={{textAlign: "center", padding: "20px"}}>Cargando...</td></tr> : upcoming.map(d => (
                  <tr key={d.id}>
                    <td className="id-cell">{d.tracking_code || d.id}</td>
                    <td>{d.date}</td>
                    <td><strong>{d.destinationName || d.destination}</strong> <span className="muted" style={{fontSize:11}}> · {d.zoneName || d.zone}</span></td>
                    <td>{d.comments && d.comments.includes('| EMP_NAME:') ? d.comments.split('| EMP_NAME:')[1].trim() : (d.employee && d.employee.trim() !== "Empleado" ? d.employee : window.MOCK.getCurrentEmployee().name)}</td>
                    <td className="money">{fmtMXN(d.cost)}</td>
                    <td><StatusPill s={d.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="stack">
          <div className="section-card">
            <h3>Empleado en turno</h3>
            <p className="desc">Detección automática por horario.</p>
            <div className="card-tight" style={{background:"var(--accent-soft)", borderRadius:12, display:"flex", gap:12, alignItems:"center"}}>
              {(() => {
                const emp = window.MOCK.getCurrentEmployee();
                return (
                  <>
                    <div style={{width:40, height:40, borderRadius:"50%", background:"var(--accent)", color:"white", display:"grid", placeItems:"center", fontWeight:800}}>
                      {emp.initials}
                    </div>
                    <div>
                      <strong>{emp.name}</strong>
                      <div className="muted" style={{fontSize:12}}>{emp.role} · {emp.shift}</div>
                    </div>
                  </>
                );
              })()}
            </div>
          </div>
          <div className="section-card">
            <h3>Acciones rápidas</h3>
            <div className="stack" style={{gap:8, marginTop: 10}}>
              <button className="btn btn-soft btn-block" style={{justifyContent:"flex-start"}} onClick={() => goTo("cotizador")}><ID.Plus size={14}/> Nueva cotización</button>
              <button className="btn btn-soft btn-block" style={{justifyContent:"flex-start"}}><ID.Bookmark size={14}/> Convertir borradores</button>
              <button className="btn btn-soft btn-block" style={{justifyContent:"flex-start"}}><ID.Banknote size={14}/> Ver datos bancarios</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function SolicitudesModal({ delivery, onClose, onSuccess }) {
  const [cancelReq, setCancelReq] = useStateD(false);
  const [tariffReq, setTariffReq] = useStateD(false);
  const [newCost, setNewCost] = useStateD("");
  const [reason, setReason] = useStateD("");
  const [waClicked, setWaClicked] = useStateD(false);
  
  // Can only close if not processing, and if requested, WA must be clicked
  const canClose = (!cancelReq && !tariffReq) || waClicked;

  const handleClose = () => {
    if (canClose) {
      if (cancelReq) onSuccess('cancellation', delivery.id);
      else if (tariffReq) onSuccess('tariff_change', delivery.id, parseFloat(newCost));
      else onClose();
    }
  };

  const handleCancelClick = async () => {
    if (!confirm("¿Estás seguro de solicitar la cancelación de esta entrega?")) return;
    
    const res = await fetch(`${API_BASE}/cancellation-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ delivery_id: delivery.id, reason: "Cliente canceló" })
    });
    if (res.ok) {
      setCancelReq(true);
    } else {
      alert("Error al registrar la solicitud.");
    }
  };

  const handleTariffClick = async () => {
    const costVal = parseFloat(newCost);
    if (isNaN(costVal) || costVal <= 0) {
      alert("Por favor ingresa un costo solicitado válido mayor a cero.");
      return;
    }
    const reqReason = reason.trim() || "Ajuste de tarifa";
    
    if (!confirm("¿Estás seguro de solicitar este cambio de tarifa?")) return;
    
    const res = await fetch(`${API_BASE}/tariff-change-requests`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        delivery_id: delivery.id,
        current_cost: delivery.cost,
        requested_cost: costVal,
        reason: reqReason
      })
    });
    if (res.ok) {
      setTariffReq(true);
    } else {
      alert("Error al registrar la solicitud.");
    }
  };

  const tracking = delivery.tracking_code || `DLV-${delivery.id}`;
  const wpTextCancel = `Hola,%20necesito%20cancelar%20la%20reserva%20con%20ID%20${tracking}.`;
  const wpTextTariff = `Hola,%20necesito%20solicitar%20un%20cambio%20de%20tarifa%20para%20la%20reserva%20con%20ID%20${tracking}.`;
  
  return (
    <div className="sol-backdrop" onClick={handleClose}>
      <div className="sol-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="sol-header">
          <div>
            <h3 className="sol-title">Solicitudes para Reserva</h3>
            <p className="sol-sub">ID: <strong>{tracking}</strong> · {delivery.destinationName || delivery.destination}</p>
          </div>
          <button className="sol-close" onClick={handleClose} aria-label="Cerrar" disabled={!canClose}><ID.X size={18}/></button>
        </div>

        <div className="sol-body">
          <section className={"sol-section " + (cancelReq ? "is-requested" : "")}>
            <div className="sol-section-head">
              <div className="sol-section-icon sol-icon-cancel"><ID.ShieldX size={18}/></div>
              <div>
                <h4>Cancelación</h4>
                <p>Solicita la cancelación formal de la entrega en el sistema.</p>
              </div>
            </div>
            <div className="sol-actions">
              <button
                className={"sol-btn-primary " + (cancelReq ? "sol-btn-done" : "")}
                onClick={handleCancelClick}
                disabled={cancelReq || tariffReq}>
                {cancelReq ? (<><ID.Check size={16}/> Solicitud registrada</>) : "Solicitar cancelación"}
              </button>
              <button
                className={"sol-btn-wa " + (cancelReq && !waClicked ? "sol-btn-wa--active" : "")}
                disabled={!cancelReq}
                onClick={() => {
                  window.open(`https://wa.me/529841068542?text=${wpTextCancel}`, '_blank');
                  setWaClicked(true);
                }}>
                <ID.WhatsApp size={16}/> Notificar por WhatsApp
              </button>
            </div>
          </section>

          <section className={"sol-section " + (tariffReq ? "is-requested" : "")}>
            <div className="sol-section-head">
              <div className="sol-section-icon sol-icon-tariff"><ID.DollarSign size={18}/></div>
              <div>
                <h4>Cambio de tarifa</h4>
                <p>Solicita un ajuste en la tarifa asignada por el sistema. Costo actual: <strong>{fmtMXN(delivery.cost)}</strong></p>
              </div>
            </div>

            <div className="sol-inputs">
              <input
                className="sol-input"
                type="number"
                placeholder="Ingresa el costo solicitado"
                value={newCost}
                onChange={(e) => setNewCost(e.target.value)}
                disabled={tariffReq || cancelReq}
              />
              <input
                className="sol-input"
                type="text"
                placeholder="Motivo (ej. Cambio de destino, lluvia…)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                disabled={tariffReq || cancelReq}
              />
            </div>

            <div className="sol-actions">
              <button
                className={"sol-btn-primary " + (tariffReq ? "sol-btn-done" : "")}
                onClick={handleTariffClick}
                disabled={tariffReq || cancelReq}>
                {tariffReq ? (<><ID.Check size={16}/> Solicitud registrada</>) : "Solicitar cambio de tarifa"}
              </button>
              <button
                className={"sol-btn-wa " + (tariffReq && !waClicked ? "sol-btn-wa--active" : "")}
                disabled={!tariffReq}
                onClick={() => {
                  window.open(`https://wa.me/529841068542?text=${wpTextTariff}`, '_blank');
                  setWaClicked(true);
                }}>
                <ID.WhatsApp size={16}/> Notificar por WhatsApp
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   EMPLOYEE — RESERVAS ACTIVAS
============================================================= */
function EmpReservas() {
  const [filter, setFilter] = useStateD("todos");

  const formatDateTime = (dateStr) => {
    if (!dateStr) return { date: '', time: '' };
    const regex = /^(\d{4})-(\d{2})-(\d{2})(?:\s+|T)(\d{2}):(\d{2}):(\d{2})/;
    const match = dateStr.match(regex);
    let year, month, day, hours, minutes;
    if (match) {
      year = parseInt(match[1], 10);
      month = parseInt(match[2], 10) - 1;
      day = parseInt(match[3], 10);
      hours = parseInt(match[4], 10);
      minutes = parseInt(match[5], 10);
    } else {
      if (dateStr.includes(',')) {
        const parts = dateStr.split(',');
        return { date: parts[0].trim() + ',', time: parts[1] ? parts[1].trim() : '' };
      }
      const dateObj = new Date(dateStr.replace(' ', 'T'));
      if (isNaN(dateObj.getTime())) return { date: dateStr, time: '' };
      year = dateObj.getFullYear();
      month = dateObj.getMonth();
      day = dateObj.getDate();
      hours = dateObj.getHours();
      minutes = dateObj.getMinutes();
    }
    const dateObj = new Date(year, month, day, hours, minutes);
    const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
    const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
    const dayName = days[dateObj.getDay()];
    const monthName = months[dateObj.getMonth()];
    const ampm = hours >= 12 ? 'p.m.' : 'a.m.';
    let displayHours = hours % 12;
    displayHours = displayHours ? displayHours : 12;
    const displayMinutes = String(minutes).padStart(2, '0');
    return { date: `${dayName} ${day} ${monthName},`, time: `${displayHours}:${displayMinutes} ${ampm}` };
  };

  const getDestinationShortName = (dest) => {
    if (!dest) return '';
    return dest.split(',')[0].trim();
  };

  const getZoneText = (d) => {
    if (d.zoneName) return d.zoneName;
    if (d.zone && isNaN(d.zone)) return d.zone;
    const zoneId = d.zone_id || (d.zone ? Number(d.zone) : null);
    if (zoneId) {
      const z = window.MOCK.ZONES.find(x => x.id === zoneId);
      if (z) return `${z.name} · ${z.desc}`;
    }
    return 'Sin zona';
  };
  
  // Create dynamic URL query based on filter
  const queryParams = new URLSearchParams();
  queryParams.append("limit", "50");
  if (filter !== "todos") {
    queryParams.append("status[]", filter);
  }
  
  const { data: deliveriesData, loading, setData } = useApi(`/deliveries?${queryParams.toString()}`, {total:0, items:[]});
  const [activeReqDelivery, setActiveReqDelivery] = useStateD(null);

  const list = deliveriesData?.items || [];
  const pending = list.filter(d => !d.paid && d.status !== "cancelada" && d.status !== "cancelacion_pendiente").reduce((s,d) => s + (d.cost || 0), 0);

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Reservas realizadas</h1>
          <p>Historial completo de todos los empleados.</p>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm"><ID.Filter size={14}/> Filtrar fechas</button>
          <button className="btn btn-ghost btn-sm"><ID.Download size={14}/> Exportar CSV</button>
        </div>
      </div>

      <div className="flex gap-8" style={{marginBottom: 16, flexWrap:"wrap"}}>
        {[
          ["todos","Todos"],
          ["confirmada","Confirmadas"],
          ["entregada","Entregadas"],
          ["pagada","Pagadas"],
          ["cancelacion_pendiente","Cancelación pendiente"],
          ["cambio_tarifa_pendiente","Cambio de tarifa"],
          ["cancelada","Canceladas"],
        ].map(([k,l]) => (
          <button key={k} className={"btn btn-sm " + (filter===k ? "btn-primary" : "btn-ghost")} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr>
            <th>ID</th><th>Fecha y Hora</th><th>Destino</th><th>Cliente</th>
            <th>Empleado</th><th>Costo</th><th>Pago</th><th>Estado</th><th>Acciones</th>
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="9" style={{textAlign: "center", padding: "20px"}}>Cargando...</td></tr> : list.map(d => {
              const dt = formatDateTime(d.date);
              const statusKey = d.status || "confirmada";
              return (
                <tr key={d.id} style={statusKey==="cancelada" ? {opacity:0.55} : {}}>
                  <td className="id-cell">{d.tracking_code || d.id}</td>
                  <td className="nowrap">
                    <strong>{dt.date}</strong>
                    <div style={{fontSize:11, color:"var(--muted)", marginTop:2}}>{dt.time}</div>
                  </td>
                  <td>
                    <strong>{getDestinationShortName(d.destinationName || d.destination)}</strong>
                    <div className="muted" style={{fontSize:11, marginTop:2}}>{getZoneText(d)}</div>
                  </td>
                  <td>{d.client}<div className="muted" style={{fontSize:11}}>{d.phone}</div></td>
                  <td>{d.comments && d.comments.includes('| EMP_NAME:') ? d.comments.split('| EMP_NAME:')[1].trim() : (d.employee && d.employee.trim() !== "Empleado" ? d.employee : window.MOCK.getCurrentEmployee().name)}</td>
                  <td className="money">{fmtMXN(d.cost)}</td>
                  <td>{d.paid
                    ? <span style={{color:"var(--accent)", fontWeight:700}}><ID.Check size={12}/> Pagada</span>
                    : <span className="muted">Pendiente</span>}</td>
                  <td><StatusPill s={statusKey}/></td>
                  <td>
                    <div className="flex gap-8">
                      <button 
                        className="btn btn-soft btn-sm flex" 
                        onClick={() => setActiveReqDelivery(d)} 
                        style={{gap: 6, whiteSpace: "nowrap"}}
                        disabled={statusKey !== "confirmada"}
                        title={statusKey !== "confirmada" ? "Solo disponible en estado Confirmada" : "Solicitudes"}
                      >
                        <ID.Settings size={14}/> Solicitudes
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {!loading && (
          <div className="table-foot">
            <span className="muted">Mostrando {list.length} de {deliveriesData?.total || list.length} reservas</span>
            <span><strong>Pendiente acumulado:</strong> <span className="money" style={{color:"var(--warning)"}}>{fmtMXN(pending)}</span></span>
          </div>
        )}
      </div>

      {activeReqDelivery && (
        <SolicitudesModal 
          delivery={activeReqDelivery} 
          onClose={() => setActiveReqDelivery(null)}
          onSuccess={(type, id, requestedCost) => {
            if (type === 'cancellation') {
              setData({
                ...deliveriesData,
                items: list.map(item => item.id === id ? { ...item, status: 'cancelacion_pendiente' } : item)
              });
            } else if (type === 'tariff_change') {
              setData({
                ...deliveriesData,
                items: list.map(item => item.id === id ? { ...item, status: 'cambio_tarifa_pendiente', cost: requestedCost } : item)
              });
            }
            setActiveReqDelivery(null);
          }}
        />
      )}
    </>
  );
}


/* =============================================================
   EMPLOYEE — GUARDADAS
============================================================= */
function EmpGuardadas({ goTo }) {
  const [drafts, setDrafts] = useStateD([]);
  const [loading, setLoading] = useStateD(true);

  React.useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('holy_drafts') || '[]');
      setDrafts(stored);
    } catch(e) {
      console.error(e);
    }
    setLoading(false);
  }, []);

  const formatDraftDate = (isoString) => {
    if (!isoString) return "";
    const d = new Date(isoString);
    if (isNaN(d.getTime())) return isoString;
    
    const now = new Date();
    const dateD = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    const dateNow = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const diffDays = Math.floor((dateNow - dateD) / (1000 * 60 * 60 * 24));
    
    let timeStr = d.toLocaleTimeString('es-MX', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    timeStr = timeStr.replace(/\./g, '').replace('a m', 'a.m.').replace('p m', 'p.m.');

    if (diffDays === 0) return `creada Hoy, ${timeStr}`;
    if (diffDays === 1) return `creada Ayer, ${timeStr}`;
    if (diffDays === 2) return `creada Antier`;
    return `creada hace ${diffDays} días`;
  };

  const handleEdit = (d) => {
    if (goTo) {
      if (d.quoteData) {
        goTo("resultado", d.quoteData);
      } else {
        goTo("cotizador");
      }
    }
  };

  const handleConfirm = (id) => {
    const d = drafts.find(x => x.id === id);
    if (d && goTo) {
      if (d.quoteData) {
        goTo("resultado", d.quoteData);
      } else {
        goTo("cotizador");
      }
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este borrador?")) return;
    const updated = drafts.filter(d => d.id !== id);
    setDrafts(updated);
    localStorage.setItem('holy_drafts', JSON.stringify(updated));
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Cotizaciones guardadas</h1>
          <p>Borradores en espera de confirmación. Editables libremente.</p>
        </div>
        <button className="btn btn-primary btn-sm" onClick={() => goTo && goTo("cotizador")}><ID.Plus size={14}/> Nueva cotización</button>
      </div>

      {loading ? <p>Cargando borradores...</p> : (
        <div className="row row-3">
          {drafts.length === 0 ? <p className="muted">No hay borradores guardados.</p> : drafts.map(d => (
            <div key={d.id} className="section-card" style={{padding: 18}}>
              <div className="flex-between" style={{marginBottom: 10}}>
                <span className="status status-borrador">Borrador</span>
                <span className="mono muted" style={{fontSize: 11}}>{d.id}</span>
              </div>
              <h3 style={{margin:"4px 0", fontSize: 16}}>{d.destinationName}</h3>
              <div className="muted" style={{fontSize: 12.5, marginBottom: 12}}>{d.zoneName} · {formatDraftDate(d.created_at)}</div>
              <div className="price-row" style={{padding:"8px 0"}}>
                <span className="lbl">Costo estimado</span>
                <span className="val">{fmtMXN(d.cost)}</span>
              </div>
              <div className="price-row" style={{padding:"8px 0", borderBottom: 0}}>
                <span className="lbl">Empleado</span>
                <span style={{fontWeight: 600, fontSize: 12.5}}>{d.employee_name}</span>
              </div>
              <div className="flex gap-8" style={{marginTop: 14}}>
                <button className="btn btn-soft btn-sm" style={{flex:1}} onClick={() => handleEdit(d)}><ID.Edit size={12}/> Editar</button>
                <button className="btn btn-primary btn-sm" style={{flex:1}} onClick={() => handleConfirm(d.id)}><ID.Check size={12}/> Confirmar</button>
                <button className="btn btn-danger-ghost btn-sm" title="Eliminar" onClick={() => handleDelete(d.id)}><ID.Trash size={12}/></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

/* =============================================================
   EMPLOYEE — CONFIGURACIÓN
============================================================= */
function NuevoEmpleadoModal({ employee, onClose, onSave }) {
  const isEditing = !!employee;
  const [name, setName] = useStateD(employee ? employee.name : "");
  const [role, setRole] = useStateD(employee ? employee.role : "");
  const [start, setStart] = useStateD("");
  const [end, setEnd] = useStateD("");

  const fmtHour = (v) => {
    if (!v) return "—";
    const [h, m] = v.split(":").map(Number);
    const ap = h >= 12 ? "p.m." : "a.m.";
    const h12 = h % 12 === 0 ? 12 : h % 12;
    return `${h12}:${String(m).padStart(2,"0")} ${ap}`;
  };
  const initials = name.trim().split(/\s+/).slice(0,2).map(w => w[0] || "").join("").toUpperCase() || "?";

  const handleSave = () => {
    if (!name.trim()) return alert("El nombre es requerido.");
    const shiftStr = start || end ? `${fmtHour(start)} – ${fmtHour(end)}` : (employee ? employee.shift : "Flexible");
    onSave({
      ...(employee || {}),
      id: employee ? employee.id : Date.now(),
      name: name.trim(),
      role: role || "Apoyo",
      shift: shiftStr,
      initials,
      active: true
    });
  };

  return (
    <div className="sol-backdrop" onClick={onClose}>
      <div className="sol-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true">
        <div className="sol-header">
          <div>
            <h3 className="sol-title">{isEditing ? "Editar empleado" : "Nuevo empleado"}</h3>
            <p className="sol-sub">{isEditing ? "Modifica los datos del empleado." : "Alta en el equipo de Holy Bakery. La detección de turno usa el horario."}</p>
          </div>
          <button className="sol-close" onClick={onClose} aria-label="Cerrar"><ID.X size={18}/></button>
        </div>

        <div className="sol-body">
          <div className="ne-preview" style={{display:"flex", gap:14, alignItems:"center", padding:16, background:"var(--surface-2)", border:"1px solid var(--line)", borderRadius:14}}>
            <div className="ne-avatar" style={{width:48,height:48,borderRadius:"50%",background:"var(--primary)",color:"white",display:"grid",placeItems:"center",fontWeight:800,fontSize:16,flexShrink:0}}>{initials}</div>
            <div className="ne-preview-meta" style={{display:"flex", flexDirection:"column", gap:3}}>
              <strong style={{fontSize:15}}>{name || "Nombre del empleado"}</strong>
              <span style={{fontSize:12.5, color:"var(--muted)"}}>{role || "Cargo"} · {start || end ? `${fmtHour(start)} – ${fmtHour(end)}` : (employee ? employee.shift : "Horario sin definir")}</span>
            </div>
          </div>

          <div className="ne-field" style={{display:"flex", flexDirection:"column", gap:8}}>
            <label className="label">Nombre completo</label>
            <div className="field">
              <ID.Users size={18} className="icon" style={{color:"var(--accent)"}}/>
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Ej. Ramiro Carbajal"/>
            </div>
          </div>

          <div className="ne-field" style={{display:"flex", flexDirection:"column", gap:8}}>
            <label className="label">Cargo</label>
            <div className="field">
              <ID.Cake size={18} className="icon" style={{color:"var(--accent)"}}/>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="">Selecciona un cargo</option>
                <option value="Cajero">Cajero</option>
                <option value="Repostería">Repostería</option>
                <option value="Apoyo">Apoyo</option>
                <option value="Mostrador">Mostrador</option>
              </select>
              <ID.ChevronDown size={16} className="right"/>
            </div>
          </div>

          <div className="ne-field" style={{display:"flex", flexDirection:"column", gap:8}}>
            <label className="label">Horario laboral</label>
            <div className="row" style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:16}}>
              <div className="field">
                <ID.Clock size={18} className="icon" style={{color:"var(--accent)"}}/>
                <input type="time" value={start} onChange={(e) => setStart(e.target.value)}/>
              </div>
              <div className="field">
                <ID.Clock size={18} className="icon" style={{color:"var(--accent)"}}/>
                <input type="time" value={end} onChange={(e) => setEnd(e.target.value)}/>
              </div>
            </div>
            <div className="hint-bar" style={{marginTop: 12}}>
              <ID.Info size={14}/>
              <span>El sistema preselecciona al empleado en turno comparando la hora actual contra este horario.</span>
            </div>
          </div>
        </div>

        <div className="ne-foot" style={{display:"flex", justifyContent:"flex-end", gap:10, padding:"16px 24px", borderTop:"1px solid var(--line)", background:"var(--surface)"}}>
          <button className="btn btn-ghost" onClick={onClose}>Cancelar</button>
          <button className="btn btn-primary" onClick={handleSave}><ID.Check size={16}/> {isEditing ? "Guardar cambios" : "Dar de alta"}</button>
        </div>
      </div>
    </div>
  );
}

function EmpEmpleados() {
  const { data: employees, loading: empLoading, setData: setEmployees } = useApi("/employees", []);
  const validEmployees = Array.isArray(employees) && employees.length > 0 ? employees : window.MOCK.EMPLOYEES;
  const [modalOpen, setModalOpen] = useStateD(false);
  const [editingEmp, setEditingEmp] = useStateD(null);

  const handleSaveEmployee = async (empData) => {
    const isNew = !validEmployees.find(e => e.id === empData.id);
    const token = sessionStorage.getItem("wp_token");
    try {
      const method = isNew ? "POST" : "PUT";
      const url = isNew ? `${API_BASE}/employees` : `${API_BASE}/employees/${empData.id}`;
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", "Authorization": token ? `Bearer ${token}` : "" },
        body: JSON.stringify(empData)
      });
      if (res.ok) {
        const savedEmp = await res.json();
        setEmployees(isNew ? [...validEmployees, savedEmp] : validEmployees.map(e => e.id === empData.id ? savedEmp : e));
      } else {
        setEmployees(isNew ? [...validEmployees, empData] : validEmployees.map(e => e.id === empData.id ? empData : e));
      }
    } catch(e) {
      setEmployees(isNew ? [...validEmployees, empData] : validEmployees.map(e => e.id === empData.id ? empData : e));
    }
    setModalOpen(false);
    setEditingEmp(null);
  };

  const handleDeleteEmployee = async (id) => {
    if (validEmployees.length <= 1) {
      alert("No puedes eliminar a todos los empleados. Debe quedar por lo menos uno en turno.");
      return;
    }
    if (!window.confirm("¿Dar de baja a este empleado?")) return;
    const token = sessionStorage.getItem("wp_token");
    try {
      await fetch(`${API_BASE}/employees/${id}`, { method: "DELETE", headers: { "Authorization": token ? `Bearer ${token}` : "" } });
      setEmployees(validEmployees.filter(e => e.id !== id));
    } catch(e) {
      setEmployees(validEmployees.filter(e => e.id !== id));
    }
  };

  return (
    <>
      <div className="page-header flex-between">
        <div>
          <h1>Empleados</h1>
          <p>Alta y baja del equipo Holy Bakery. Detección automática por horario laboral.</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setEditingEmp(null); setModalOpen(true); }}><ID.Plus size={14}/> Nuevo empleado</button>
      </div>

      <div className="section-card">
        <div className="table-wrap">
          <table className="table">
            <thead><tr><th>Nombre</th><th>Cargo</th><th>Horario</th><th>Estado</th><th></th></tr></thead>
            <tbody>
              {empLoading ? <tr><td colSpan="5" style={{textAlign:"center", padding:"20px"}}>Cargando...</td></tr> : validEmployees.map(e => (
                <tr key={e.id}>
                  <td>
                    <div style={{display:"flex", gap:10, alignItems:"center"}}>
                      <div style={{width:32,height:32,borderRadius:"50%", background:"var(--bg-alt)", display:"grid", placeItems:"center", fontWeight:800, fontSize:11}}>{e.initials}</div>
                      <strong>{e.name}</strong>
                    </div>
                  </td>
                  <td>{e.role}</td>
                  <td className="mono" style={{fontSize: 12.5}}>{e.shift}</td>
                  <td>{window.MOCK.getCurrentEmployee().id === e.id ? <span className="status status-pagada"><span style={{width:6,height:6,borderRadius:"50%",background:"#16a34a",display:"inline-block",marginRight:6}}></span>En Turno</span> : <span className="muted">Inactivo ahora</span>}</td>
                  <td>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm" onClick={() => { setEditingEmp(e); setModalOpen(true); }}><ID.Edit size={12}/></button>
                      <button className="btn btn-danger-ghost btn-sm" onClick={() => handleDeleteEmployee(e.id)}><ID.Trash size={12}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {modalOpen && <NuevoEmpleadoModal employee={editingEmp} onClose={() => setModalOpen(false)} onSave={handleSaveEmployee}/>}
    </>
  );
}

function EmpBancarios() {
  const { data: bankData, loading: bankLoading } = useApi("/bank-details", {
    banco: "BBVA México",
    titular: "OnRoute México S.A. de C.V.",
    clabe: "012 180 01234567890 1",
    cuenta: "0123 4567 89",
    concepto: "Holy Bakery — Crédito entregas"
  });

  return (
    <>
      <div className="page-header flex-between" style={{alignItems:"flex-start"}}>
        <div>
          <h1>Datos bancarios</h1>
          <p>Datos para transferencias. Solo lectura — el admin los actualiza desde su panel.</p>
        </div>
        <span className="status status-borrador"><ID.Lock size={10}/> Read-Only</span>
      </div>

      <div className="section-card" style={{maxWidth: 680}}>
        <div className="stack" style={{gap: 12}}>
          {bankLoading ? <p>Cargando datos bancarios...</p> : (
            <>
              <BankRow label="Banco" value={bankData.banco || "BBVA México"}/>
              <BankRow label="Titular" value={bankData.titular || "OnRoute México S.A. de C.V."}/>
              <BankRow label="CLABE" value={bankData.clabe || "012 180 01234567890 1"} mono/>
              <BankRow label="Cuenta" value={bankData.cuenta || "0123 4567 89"} mono/>
              <BankRow label="Concepto" value={bankData.concepto || "Holy Bakery — Crédito entregas"}/>
            </>
          )}
        </div>
        <div className="hint-bar" style={{marginTop:16, marginBottom:0}}>
          <ID.Info size={14}/>
          <span>El cobro a Holy Bakery es libre — el admin solicita pago cuando lo decide.</span>
        </div>
      </div>
    </>
  );
}

const BankRow = ({ label, value, mono }) => (
  <div className="flex-between" style={{padding:"14px 16px", background:"var(--surface-2)", borderRadius:12}}>
    <div>
      <div className="muted" style={{fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700}}>{label}</div>
      <div style={{fontWeight:700, marginTop:4, fontSize:15}} className={mono ? "mono" : ""}>{value}</div>
    </div>
    <button className="btn btn-ghost" style={{padding:"8px 12px"}} onClick={() => { navigator.clipboard.writeText(value); alert("Copiado!"); }}><ID.Copy size={16}/></button>
  </div>
);

function ZoneMap({ pin }) {
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <defs>
        <pattern id="g" width="6" height="6" patternUnits="userSpaceOnUse"><path d="M 6 0 L 0 0 0 6" fill="none" stroke="#e7e7e2" strokeWidth="0.2"/></pattern>
        <linearGradient id="s" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stopColor="#cfe6f5"/><stop offset="1" stopColor="#aed4ec"/></linearGradient>
      </defs>
      <rect width="100" height="100" fill="#f5f4ee"/>
      <rect width="100" height="100" fill="url(#g)"/>
      <path d="M 100 0 L 88 8 L 92 22 L 86 36 L 92 50 L 84 66 L 90 80 L 86 100 L 100 100 Z" fill="url(#s)"/>
      <path d="M 26 30 L 42 26 L 50 38 L 44 50 L 28 52 L 22 42 Z" fill="rgba(22,163,74,0.16)" stroke="#16a34a" strokeWidth="0.35" strokeDasharray="0.8 0.6"/>
      <path d="M 60 50 L 78 48 L 86 64 L 80 80 L 64 80 L 56 66 Z" fill="rgba(14,106,50,0.18)" stroke="#0e6a32" strokeWidth="0.35" strokeDasharray="0.8 0.6"/>
      <path d="M 40 44 L 58 46 L 60 60 L 48 62 L 36 56 Z" fill="rgba(59,130,246,0.14)" stroke="#3b82f6" strokeWidth="0.35" strokeDasharray="0.8 0.6"/>
      <path d="M 10 40 Q 40 42 70 60 T 100 88" fill="none" stroke="#d6d3c6" strokeWidth="0.9"/>
      {pin && (
        <path d={`M ${pin.x} ${pin.y - 5.5} C ${pin.x - 3} ${pin.y - 5.5} ${pin.x - 3.6} ${pin.y - 2.4} ${pin.x - 3.6} ${pin.y - 0.6} C ${pin.x - 3.6} ${pin.y + 2} ${pin.x - 1.4} ${pin.y + 3.6} ${pin.x} ${pin.y + 5} C ${pin.x + 1.4} ${pin.y + 3.6} ${pin.x + 3.6} ${pin.y + 2} ${pin.x + 3.6} ${pin.y - 0.6} C ${pin.x + 3.6} ${pin.y - 2.4} ${pin.x + 3} ${pin.y - 5.5} ${pin.x} ${pin.y - 5.5} Z`} fill="#0d2618"/>
      )}
    </svg>
  );
}

function EmpLocalizador({ navigate }) {
  const [copied, setCopied] = useStateD(false);
  const [incoming, setIncoming] = useStateD(window.MOCK.INCOMING_LOCATIONS || []);
  
  React.useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await fetch('/api/get_locations.php');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setIncoming(data);
            window.MOCK.INCOMING_LOCATIONS = data;
          }
        }
      } catch (err) {
        console.error("Polling error:", err);
      }
    };

    // Initial fetch
    fetchLocations();

    // Poll every 30 seconds
    const interval = setInterval(fetchLocations, 30000);

    const handleStorage = (e) => {
      if (e.key === 'holy_incoming') {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) {
            setIncoming(parsed);
            window.MOCK.INCOMING_LOCATIONS = parsed;
          }
        } catch (err) {}
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      clearInterval(interval);
    };
  }, []);
  const fresh = incoming.filter(i => {
    if (i.status !== "nueva") return false;
    if (!i.created_at) return true;
    const created = new Date(i.created_at.replace(' ', 'T'));
    return (Date.now() - created.getTime()) < 24 * 60 * 60 * 1000;
  }).length;

  const SHARE_LINK = "holybakery.onroutemx.com/ubicacion";
  const waMsgEncoded = "Hello!%20%F0%9F%91%8B%20Please%20share%20your%20delivery%20location%20using%20this%20link.%0A%0AIt's%20super%20easy%3A%20open%20the%20map%2C%20select%20your%20exact%20location%20(or%20use%20your%20current%20location)%20and%20send%20it.%20Thank%20you!%20%E2%9C%A8%0A%0A%F0%9F%93%8D%20" + encodeURIComponent(SHARE_LINK);
  const waLink = `https://api.whatsapp.com/send?text=${waMsgEncoded}`;
  const copy = () => { navigator.clipboard.writeText(SHARE_LINK); setCopied(true); setTimeout(() => setCopied(false), 1800); };
  
  const statusPill = (i) => {
    if (i.status === "nueva") {
      if (i.created_at) {
        const created = new Date(i.created_at.replace(' ', 'T'));
        if ((Date.now() - created.getTime()) >= 24 * 60 * 60 * 1000) return null;
      }
      return <span className="status status-confirmada">Nueva</span>;
    }
    return i.status === "revisar" ? <span className="status status-pendiente">Revisar zona</span> : <span className="status status-pagada">Convertida</span>;
  };

  const renderAddress = (addr) => {
    if (!addr) return null;
    const parts = addr.split('|');
    if (parts.length === 2) {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <span style={{ fontWeight: 600, color: '#1f2937' }}>{parts[0]}</span>
          <span style={{ fontSize: '12px', color: '#6b7280' }}>{parts[1]}</span>
        </div>
      );
    }
    return <span>{addr}</span>;
  };

  const handleConvert = (loc) => {
    navigate("/cotizador"); 
  };

  return (
    <>
      <div className="loc-flow">
        <div className="loc-step"><span className="loc-step-n">1</span><div><strong>Comparte el enlace</strong><span>A organizadores o directo al cliente final.</span></div></div>
        <ID.ChevronRight size={16} className="loc-flow-arrow"/>
        <div className="loc-step"><span className="loc-step-n">2</span><div><strong>El cliente fija el punto</strong><span>Con su ubicación o tocando el mapa.</span></div></div>
        <ID.ChevronRight size={16} className="loc-flow-arrow"/>
        <div className="loc-step"><span className="loc-step-n">3</span><div><strong>Llega al dashboard</strong><span>Con zona, costo, distancia y ETA.</span></div></div>
      </div>

      <div className="row loc-grid" style={{ gridTemplateColumns: "minmax(0, 1fr) 340px", alignItems: "start", gap: 18 }}>
        <div className="section-card">
          <div className="flex-between" style={{ marginBottom: 14 }}>
            <div><h3 style={{margin:"0 0 4px"}}>Ubicaciones recibidas</h3><p className="desc" style={{ margin: 0 }}>Enviadas por clientes en tiempo real.</p></div>
            {fresh > 0 && <span className="loc-count"><ID.Inbox size={13}/> {fresh} nuevas</span>}
          </div>
          <div className="loc-list">
            {incoming.map(i => (
              <div key={i.id} className={"loc-card " + (i.status === "convertida" ? "is-done" : "")}>
                <div className="loc-card-map"><InteractiveMap readOnly pin={{ lat: i.y, lng: i.x }} /></div>
                <div className="loc-card-body">
                  <div className="loc-card-top">
                    <div><strong>{i.client}</strong><span className="mono loc-id">{i.id}</span></div>
                    {statusPill(i)}
                  </div>
                  <div className="loc-addr" style={{ alignItems: 'flex-start' }}><ID.Pin size={13} style={{ marginTop: 2, flexShrink: 0 }}/> {renderAddress(i.addr)}</div>
                  {i.ref !== "—" && <div className="loc-ref">Referencia: {i.ref}</div>}
                  <div className="loc-meta">
                    <span className="loc-chip"><ID.Map size={12}/> {i.zone}</span>
                    <span className="loc-chip"><ID.Route size={12}/> {i.km} km</span>
                    <span className="loc-chip"><ID.Clock size={12}/> {i.eta}</span>
                    <span className={"loc-chip " + (i.cost == null ? "loc-chip-warn" : "loc-chip-cost")}><ID.DollarSign size={12}/> {i.cost == null ? "A consultar" : `$${i.cost}.00`}</span>
                  </div>
                  <div className="loc-card-foot">
                    <span className="loc-time">{i.time}</span>
                    <div className="flex gap-8">
                      <button className="btn btn-ghost btn-sm"><ID.Eye size={12}/> Ver</button>
                      {i.status === "convertida" ? <button className="btn btn-soft btn-sm" disabled><ID.Check size={12}/> En reservas</button> : <button className="btn btn-primary btn-sm" onClick={() => handleConvert(i)}><ID.ArrowRight size={12}/> Convertir a reserva</button>}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <aside className="stack">
          <div className="section-card">
            <h3 style={{margin:"0 0 4px"}}>Tu enlace para compartir</h3>
            <p className="desc">Mismo enlace para todos los clientes. Cada punto entra etiquetado.</p>
            <div className="loc-linkbox"><ID.Link size={15}/><span className="loc-link-text mono">{SHARE_LINK}</span></div>
            <div className="row row-2" style={{ marginTop: 12, gap: 10 }}>
              <button className={"btn btn-sm " + (copied ? "btn-accent" : "btn-soft")} onClick={copy}>{copied ? <><ID.Check size={14}/> Copiado</> : <><ID.Copy size={14}/> Copiar</>}</button>
              <a className="btn btn-accent btn-sm pulse-btn" style={{ display: "flex", justifyContent: "center" }} href={waLink} target="_blank" rel="noopener noreferrer"><ID.WhatsApp size={14}/> WhatsApp</a>
            </div>
            <button className="btn btn-ghost btn-sm btn-block" style={{ marginTop: 10 }}><ID.Share size={14}/> Más opciones de envío</button>
            <div className="loc-qr" style={{ alignItems: "flex-start" }}>
              <img src="/qr-code.svg" width="64" height="64" alt="Código QR" style={{ borderRadius: 8, flexShrink: 0 }} />
              <div>
                <strong>Código QR</strong>
                <p style={{margin:"3px 0 8px", fontSize: 12, color: "var(--muted)", lineHeight: 1.3}}>Para imprimir en mostrador o catálogo de bodas.</p>
                <a href="/qr-code.svg" download="HolyBakery_QR.svg" className="btn btn-soft btn-sm" style={{ padding: "5px 10px", fontSize: 12, height: "auto" }}>
                  <ID.Download size={13} /> Descargar SVG
                </a>
              </div>
            </div>
            <div style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line-strong)" }}>
              <h3 style={{margin:"0 0 4px", fontSize: 14}}>Vista del cliente final</h3>
              <p style={{margin:"0 0 12px", fontSize: 12, color: "var(--muted)", lineHeight: 1.4}}>
                Abre el localizador en una nueva pestaña para visualizar exactamente lo que ve el cliente en su dispositivo móvil al entrar al enlace.
              </p>
              <a className="btn btn-soft btn-sm btn-block" href="/ubicacion" target="_blank" style={{ display: "flex", justifyContent: "center" }}><ID.Eye size={14}/> Previsualizar mapa</a>
            </div>
          </div>
          <div className="section-card info-soft">
            <div className="flex" style={{ gap: 10 }}>
              <ID.Info size={18} style={{ color: "var(--accent)", flexShrink: 0 }}/>
              <div style={{ fontSize: 12.5, color: "#0e5a2c" }}><strong style={{ color: "var(--accent)" }}>Pensado para turistas.</strong> Si el cliente no sabe su dirección, solo fija el punto en el mapa — no necesita escribir nada.</div>
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}

window.EmpScreens = { EmpResumen, EmpReservas, EmpGuardadas, EmpEmpleados, EmpBancarios, EmpLocalizador, AppShell, StatusPill };

