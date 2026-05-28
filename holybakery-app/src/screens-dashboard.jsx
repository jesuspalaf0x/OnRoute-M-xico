import React from 'react';

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
    { key: "reservas", label: "Reservas realizadas", icon: <ID.Layers size={16}/> },
    { key: "guardadas", label: "Guardadas", icon: <ID.Bookmark size={16}/> },
    { key: "configuracion", label: "Configuración", icon: <ID.Settings size={16}/> },
  ];
  const adminNav = [
    { key: "panel", label: "Panel", icon: <ID.Home size={16}/> },
    { key: "reservas", label: "Reservas", icon: <ID.Layers size={16}/> },
    { key: "pagos", label: "Pagos", icon: <ID.CreditCard size={16}/> },
    { key: "cancelaciones", label: "Cancelaciones", icon: <ID.ShieldX size={16}/> },
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
          {!isAdmin && <span className="muted">En turno: <strong style={{color:"var(--ink)"}}>Diana Domínguez</strong> · 3 p.m. – 8:30 p.m.</span>}
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
          {isAdmin && (
            <>
              <div className="section-title">Configuración</div>
              {nav.slice(5).map(n => (
                <button key={n.key} className={"nav-item " + (section===n.key ? "active" : "")} onClick={() => setSection(n.key)}>
                  {n.icon} {n.label}
                </button>
              ))}
            </>
          )}
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
const StatusPill = ({ s }) => (
  <span className={"status status-" + (s === "cancelacion_pendiente" ? "pendiente" : s)}>
    {window.MOCK.STATUS_LABEL[s]}
  </span>
);

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
                    <td>{d.employee}</td>
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
              {lEmp ? <div className="muted">Cargando...</div> : (empData && empData.employee) ? (
                <>
                  <div style={{width:40, height:40, borderRadius:"50%", background:"var(--accent)", color:"white", display:"grid", placeItems:"center", fontWeight:800}}>
                    {empData.employee.name.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <strong>{empData.employee.name}</strong>
                    <div className="muted" style={{fontSize:12}}>{empData.employee.role} · {empData.employee.shift_start.substring(0,5)} – {empData.employee.shift_end.substring(0,5)}</div>
                  </div>
                </>
              ) : (
                <div className="muted">Sin empleado en turno actualmente</div>
              )}
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

/* =============================================================
   EMPLOYEE — RESERVAS
============================================================= */
function EmpReservas() {
  const [filter, setFilter] = useStateD("todos");
  
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
          ["cancelada","Canceladas"],
        ].map(([k,l]) => (
          <button key={k} className={"btn btn-sm " + (filter===k ? "btn-primary" : "btn-ghost")} onClick={() => setFilter(k)}>{l}</button>
        ))}
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr>
            <th>ID</th><th>Cuándo</th><th>Destino</th><th>Cliente</th>
            <th>Empleado</th><th>Costo</th><th>Pago</th><th>Estado</th><th></th>
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan="9" style={{textAlign: "center", padding: "20px"}}>Cargando...</td></tr> : list.map(d => (
              <tr key={d.id} style={d.status==="cancelada" ? {opacity:0.55} : {}}>
                <td className="id-cell">{d.tracking_code || d.id}</td>
                <td className="nowrap">{d.date}</td>
                <td><strong>{d.destinationName || d.destination}</strong><div className="muted" style={{fontSize:11}}>{d.zoneName || d.zone}</div></td>
                <td>{d.client}<div className="muted" style={{fontSize:11}}>{d.phone}</div></td>
                <td>{d.employee}</td>
                <td className="money">{fmtMXN(d.cost)}</td>
                <td>{d.paid
                  ? <span style={{color:"var(--accent)", fontWeight:700}}><ID.Check size={12}/> Pagada</span>
                  : <span className="muted">Pendiente</span>}</td>
                <td><StatusPill s={d.status}/></td>
                <td>
                  <div className="flex gap-8">
                    <button className="btn btn-ghost btn-sm flex" onClick={() => setActiveReqDelivery(d)} style={{gap: 6}}>
                      <ID.Settings size={12}/> Solicitudes
                    </button>
                  </div>
                </td>
              </tr>
            ))}
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
        <div className="mp-backdrop" onClick={() => setActiveReqDelivery(null)}>
          <div className="mp-modal" style={{ maxWidth: "540px", height: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="mp-header">
              <div>
                <h3 className="mp-title">Solicitudes para Reserva</h3>
                <p className="mp-sub">ID: <strong>{activeReqDelivery.tracking_code || `DLV-${activeReqDelivery.id}`}</strong> · {activeReqDelivery.destinationName || activeReqDelivery.destination}</p>
              </div>
              <button className="mp-close" onClick={() => setActiveReqDelivery(null)}><ID.X size={16}/></button>
            </div>
            
            <div className="mp-body" style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "20px", overflowY: "auto" }}>
              
              <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "700" }}>🚫 Cancelación</h4>
                <p className="muted" style={{ fontSize: "12.5px", margin: "0 0 12px" }}>Solicita la cancelación formal de la entrega en el sistema.</p>
                <div className="flex gap-8" style={{ marginTop: "8px" }}>
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, height: "36px", padding: "0 12px", fontSize: "13px" }} onClick={async () => {
                    if (confirm("¿Estás seguro de solicitar la cancelación de esta entrega?")) {
                      const res = await fetch(`${API_BASE}/cancellation-requests`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ delivery_id: activeReqDelivery.id, reason: "Cliente canceló" })
                      });
                      if (res.ok) {
                        setData({
                          ...deliveriesData,
                          items: list.map(item => item.id === activeReqDelivery.id ? { ...item, status: 'cancelacion_pendiente' } : item)
                        });
                        alert("Solicitud de cancelación registrada con éxito.");
                        setActiveReqDelivery(null);
                      }
                    }
                  }}>
                    Solicitar cancelación
                  </button>
                  <a className="btn btn-ghost btn-sm" style={{ height: "36px", padding: "0 12px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }} href={`https://wa.me/529841068542?text=Hola,%20necesito%20cancelar%20la%20reserva%20con%20ID%20${activeReqDelivery.tracking_code || activeReqDelivery.id}.`} target="_blank" rel="noreferrer">
                    <ID.WhatsApp size={14}/> Notificar por WhatsApp
                  </a>
                </div>
              </div>

              <div style={{ padding: "16px", background: "var(--surface-2)", borderRadius: "12px", border: "1px solid var(--line)" }}>
                <h4 style={{ margin: "0 0 4px", fontSize: "14px", fontWeight: "700" }}>💰 Cambio de tarifa</h4>
                <p className="muted" style={{ fontSize: "12.5px", margin: "0 0 12px" }}>Solicita un ajuste en la tarifa asignada por el sistema. Costo actual: <strong>{fmtMXN(activeReqDelivery.cost)}</strong></p>
                
                <div className="stack" style={{ gap: "10px", marginBottom: "12px" }}>
                  <div className="field" style={{ height: "40px" }}>
                    <input type="number" id="reqCostInput" placeholder="Ingresa el costo solicitado" className="campo-input" style={{ fontSize: "13px", border: "0", outline: "0", background: "transparent", width: "100%" }} />
                  </div>
                  <div className="field" style={{ height: "40px" }}>
                    <input type="text" id="reqReasonInput" placeholder="Motivo (ej. Cambio de destino, lluvia...)" className="campo-input" style={{ fontSize: "13px", border: "0", outline: "0", background: "transparent", width: "100%" }} />
                  </div>
                </div>
                
                <div className="flex gap-8">
                  <button className="btn btn-primary btn-sm" style={{ flex: 1, height: "36px", padding: "0 12px", fontSize: "13px" }} onClick={async () => {
                    const reqCost = parseFloat(document.getElementById("reqCostInput")?.value);
                    const reqReason = document.getElementById("reqReasonInput")?.value || "Ajuste de tarifa";
                    if (isNaN(reqCost) || reqCost <= 0) {
                      alert("Por favor ingresa un costo solicitado válido mayor a cero.");
                      return;
                    }
                    const res = await fetch(`${API_BASE}/tariff-change-requests`, {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        delivery_id: activeReqDelivery.id,
                        current_cost: activeReqDelivery.cost,
                        requested_cost: reqCost,
                        reason: reqReason
                      })
                    });
                    if (res.ok) {
                      alert("Solicitud de cambio de tarifa registrada con éxito.");
                      setActiveReqDelivery(null);
                    } else {
                      alert("Error al registrar la solicitud.");
                    }
                  }}>
                    Solicitar cambio de tarifa
                  </button>
                  <a className="btn btn-ghost btn-sm" style={{ height: "36px", padding: "0 12px", fontSize: "13px", display: "inline-flex", alignItems: "center", gap: "6px" }} href={`https://wa.me/529841068542?text=Hola,%20necesito%20solicitar%20un%20cambio%20de%20tarifa%20para%20la%20reserva%20con%20ID%20${activeReqDelivery.tracking_code || activeReqDelivery.id}.`} target="_blank" rel="noreferrer">
                    <ID.WhatsApp size={14}/> Notificar por WhatsApp
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
}

/* =============================================================
   EMPLOYEE — GUARDADAS
============================================================= */
function EmpGuardadas() {
  const { data: deliveriesData, loading, setData } = useApi("/deliveries?status[]=borrador", {total:0, items:[]});
  
  const drafts = deliveriesData?.items || [];

  const handleEdit = (d) => {
    alert(`Editando borrador: ${d.id}`);
  };

  const handleConfirm = async (id) => {
    const token = sessionStorage.getItem("wp_token");
    try {
      const res = await fetch(`${API_BASE}/deliveries/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": token ? `Bearer ${token}` : ""
        },
        body: JSON.stringify({ status: "confirmada" })
      });
      if (res.ok) {
        setData({ ...deliveriesData, items: drafts.map(d => d.id === id ? { ...d, status: "confirmada" } : d) });
      } else {
        console.warn("API Error, updating UI anyway for prototype demo");
        setData({ ...deliveriesData, items: drafts.map(d => d.id === id ? { ...d, status: "confirmada" } : d) });
      }
    } catch(e) {
      console.error(e);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este borrador?")) return;
    const token = sessionStorage.getItem("wp_token");
    try {
      const res = await fetch(`${API_BASE}/deliveries/${id}`, {
        method: "DELETE",
        headers: { "Authorization": token ? `Bearer ${token}` : "" }
      });
      if (res.ok) {
        setData({ ...deliveriesData, items: drafts.filter(d => d.id !== id) });
      } else {
        console.warn("API Error, updating UI anyway for prototype demo");
        setData({ ...deliveriesData, items: drafts.filter(d => d.id !== id) });
      }
    } catch(e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Cotizaciones guardadas</h1>
          <p>Borradores en espera de confirmación. Editables libremente.</p>
        </div>
        <button className="btn btn-primary btn-sm"><ID.Plus size={14}/> Nueva cotización</button>
      </div>

      {loading ? <p>Cargando borradores...</p> : (
        <div className="row row-3">
          {drafts.length === 0 ? <p className="muted">No hay borradores guardados.</p> : drafts.map(d => (
            <div key={d.id} className="section-card" style={{padding: 18}}>
              <div className="flex-between" style={{marginBottom: 10}}>
                <span className="status status-borrador">Borrador</span>
                <span className="mono muted" style={{fontSize: 11}}>{d.id}</span>
              </div>
              <h3 style={{margin:"4px 0", fontSize: 16}}>{d.destinationName || d.destination}</h3>
              <div className="muted" style={{fontSize: 12.5, marginBottom: 12}}>{d.zoneName || d.zone} · creada {d.created || d.date}</div>
              <div className="price-row" style={{padding:"8px 0"}}>
                <span className="lbl">Costo estimado</span>
                <span className="val">{fmtMXN(d.cost)}</span>
              </div>
              <div className="price-row" style={{padding:"8px 0", borderBottom: 0}}>
                <span className="lbl">Empleado</span>
                <span style={{fontWeight: 600, fontSize: 12.5}}>{d.employee}</span>
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
function EmpConfig() {
  const { data: employees, loading: empLoading, setData: setEmployees } = useApi("/employees", []);
  const { data: bankData, loading: bankLoading } = useApi("/bank-details", {
    banco: "BBVA México",
    titular: "OnRoute México S.A. de C.V.",
    clabe: "012 180 01234567890 1",
    cuenta: "0123 4567 89",
    concepto: "Holy Bakery — Crédito entregas"
  });

  const validEmployees = Array.isArray(employees) && employees.length > 0 ? employees : window.MOCK.EMPLOYEES;

  const handleAddEmployee = async () => {
    const name = prompt("Nombre del empleado:");
    if (!name) return;
    const newEmp = { id: Date.now(), name, role: "Apoyo", shift: "Flexible", initials: name.substring(0, 2).toUpperCase(), active: true };
    const token = sessionStorage.getItem("wp_token");
    try {
      const res = await fetch(`${API_BASE}/employees`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": token ? `Bearer ${token}` : "" },
        body: JSON.stringify(newEmp)
      });
      if (res.ok) {
        const savedEmp = await res.json();
        setEmployees([...validEmployees, savedEmp]);
      } else {
        setEmployees([...validEmployees, newEmp]);
      }
    } catch(e) {
      setEmployees([...validEmployees, newEmp]);
    }
  };

  const handleDeleteEmployee = async (id) => {
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
      <div className="page-header">
        <div>
          <h1>Configuración</h1>
          <p>Empleados activos y datos bancarios para transferencias.</p>
        </div>
      </div>

      <div className="row" style={{gridTemplateColumns:"1.4fr 1fr", gap: 18}}>
        <div className="section-card">
          <div className="flex-between" style={{marginBottom: 14}}>
            <div>
              <h3>Empleados Holy Bakery</h3>
              <p className="desc" style={{margin:0}}>Detección automática por horario laboral.</p>
            </div>
            <button className="btn btn-primary btn-sm" onClick={handleAddEmployee}><ID.Plus size={14}/> Nuevo empleado</button>
          </div>
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
                    <td>{e.id === 2 ? <span className="status status-pagada">En turno</span> : <span className="muted">Inactivo ahora</span>}</td>
                    <td>
                      <div className="flex gap-8">
                        <button className="btn btn-ghost btn-sm"><ID.Edit size={12}/></button>
                        <button className="btn btn-danger-ghost btn-sm" onClick={() => handleDeleteEmployee(e.id)}><ID.Trash size={12}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-card">
          <div className="flex-between" style={{marginBottom: 14}}>
            <div>
              <h3>Datos bancarios</h3>
              <p className="desc" style={{margin:0}}>Solo lectura. El admin actualiza desde su panel.</p>
            </div>
            <span className="status status-borrador"><ID.Lock size={10}/> Read-only</span>
          </div>

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
          <div className="hint-bar" style={{marginTop:14, marginBottom:0}}>
            <ID.Info size={14}/>
            <span>El cobro a Holy Bakery es libre — el admin solicita pago cuando lo decide.</span>
          </div>
        </div>
      </div>
    </>
  );
}

const BankRow = ({ label, value, mono }) => (
  <div className="flex-between" style={{padding:"10px 12px", background:"var(--surface-2)", borderRadius:10}}>
    <div>
      <div className="muted" style={{fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700}}>{label}</div>
      <div style={{fontWeight:700, marginTop:2}} className={mono ? "mono" : ""}>{value}</div>
    </div>
    <button className="btn btn-ghost btn-sm" onClick={() => { navigator.clipboard.writeText(value); alert("Copiado!"); }}><ID.Copy size={12}/></button>
  </div>
);

window.EmpScreens = { EmpResumen, EmpReservas, EmpGuardadas, EmpConfig, AppShell, StatusPill };
