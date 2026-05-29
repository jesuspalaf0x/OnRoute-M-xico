import React from 'react';
import pricesData from './data/prices.json';
// Admin screens — panel, reservas, pagos, cancelaciones, extras, configuración

const { useState: useStateA, useEffect, useRef } = React;
const IA = window.Icons;
const { fmtMXN: fmtMXN_A } = window.fmt;
const StatusPillA = window.EmpScreens.StatusPill;

const API_BASE = "https://onroutemx.com/wp-json/hb/v1";
async function apiFetch(endpoint, method = "GET", body = null) {
  const token = sessionStorage.getItem("wp_token_admin") || sessionStorage.getItem("wp_token");
  const headers = { "Content-Type": "application/json" };
  if (token) headers["Authorization"] = `Bearer ${token}`;
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, { method, headers, body: body ? JSON.stringify(body) : null });
    if (!res.ok) throw new Error("API error");
    return await res.json();
  } catch (err) {
    console.error("API Fetch Error:", err);
    return null;
  }
}

/* ============ ADMIN — PANEL ============ */
function AdminPanel() {
  const [approvals, setApprovals] = useStateA([]);
  const [kpis, setKpis] = useStateA({ total: 147, credit: 3180, collected: 5420, requests: 1, extras: 2 });
  const [zonesData, setZonesData] = useStateA(window.MOCK.ZONES.slice(0,5));

  const fetchDashboard = async () => {
    const pendReq = await apiFetch("/admin/pending-requests");
    const credSum = await apiFetch("/admin/credit-summary");

    if (pendReq) {
      const formatted = [
        ...(pendReq.cancellations || []).map(c => ({ id: c.id, dlv_id: c.tracking_code || `DLV-${c.delivery_id}`, type: "Cancelación", desc: `Motivo: ${c.reason}`, cta: "Aprobar", raw: c })),
        ...(pendReq.tariff_changes || []).map(t => ({ id: t.id, dlv_id: t.tracking_code || `DLV-${t.delivery_id}`, type: "Cambio de tarifa", desc: `De $${t.current_cost} a $${t.requested_cost}`, cta: "Aprobar", raw: t }))
      ];
      setApprovals(formatted);
    }
    if (credSum) {
      setKpis({ total: credSum.total_reservations, credit: credSum.total_pendiente, collected: credSum.total_acumulado, requests: ((pendReq?.cancellations?.length || 0) + (pendReq?.tariff_changes?.length || 0)), extras: credSum.extras_mes });
    }
  };

  useEffect(() => {
    fetchDashboard();
    const interval = setInterval(fetchDashboard, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleAction = async (item, action) => {
    const endpoint = item.type === "Cancelación" ? `/cancellation-requests/${item.id}` : `/tariff-change-requests/${item.id}`;
    await apiFetch(endpoint, "PATCH", { action, admin_id: 1 });
    fetchDashboard();
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Panel maestro</h1>
          <p>Visión global · todos los empleados, todos los periodos.</p>
        </div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm"><IA.Filter size={14}/> Rango: Mayo 2026</button>
          <button className="btn btn-ghost btn-sm"><IA.Download size={14}/> Exportar</button>
        </div>
      </div>

      <div className="kpis">
        <div className="kpi"><div className="kpi-label">Reservas totales</div><div className="kpi-value">{kpis.total}</div><div className="kpi-sub">Acumulado</div></div>
        <div className="kpi kpi-warn"><div className="kpi-label">Crédito Holy Bakery</div><div className="kpi-value">${kpis.credit}</div><div className="kpi-sub">entregas pendientes</div></div>
        <div className="kpi kpi-accent"><div className="kpi-label">Cobrado en mes</div><div className="kpi-value">${kpis.collected}</div><div className="kpi-sub">entregas</div></div>
        <div className="kpi"><div className="kpi-label">Solicitudes</div><div className="kpi-value">{kpis.requests}</div><div className="kpi-sub">Cancelaciones · cambios</div></div>
        <div className="kpi"><div className="kpi-label">Extras del mes</div><div className="kpi-value">{kpis.extras}</div><div className="kpi-sub">sumados al crédito</div></div>
      </div>

      <div className="row" style={{gridTemplateColumns:"1.4fr 1fr", gap: 18}}>
        <div className="section-card">
          <div className="flex-between" style={{marginBottom: 12}}>
            <h3>Bandeja de aprobaciones</h3>
            <button className="lnk">Ver todas →</button>
          </div>
          <div className="stack">
            {approvals.length > 0 ? approvals.map(a => (
              <ApprovalRow key={a.type + a.id} icon={a.type === "Cancelación" ? <IA.ShieldX size={16}/> : <IA.RefreshCcw size={16}/>} title={`${a.type} · ${a.dlv_id}`} desc={a.desc} cta="Aprobar" onApprove={() => handleAction(a, "approve")} onReject={() => handleAction(a, "reject")} />
            )) : (
              <div className="muted" style={{fontSize: 13}}>No hay solicitudes pendientes.</div>
            )}
          </div>
        </div>

        <div className="section-card">
          <div className="flex-between" style={{marginBottom: 12}}>
            <h3>Distribución por zona</h3>
            <span className="muted" style={{fontSize:12}}>Últimos 30 días</span>
          </div>
          <div className="stack" style={{gap:10}}>
            {zonesData.map((z, i) => {
              const pct = z.pct || [42, 28, 14, 9, 7][i] || 0;
              return (
                <div key={z.id}>
                  <div className="flex-between" style={{fontSize:13, marginBottom: 4}}>
                    <span><span className="swatch" style={{width:10, height:10, borderRadius:3, background:z.color, display:"inline-block", marginRight:8}}></span><strong>{z.name}</strong> · {z.desc}</span>
                    <span className="mono" style={{fontWeight:700}}>{pct}%</span>
                  </div>
                  <div style={{height: 6, background: "var(--bg-alt)", borderRadius: 999, overflow:"hidden"}}>
                    <div style={{width: pct + "%", height: "100%", background: z.color, borderRadius: 999}}></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
const ApprovalRow = ({ icon, title, desc, cta, onApprove, onReject }) => (
  <div className="flex-between" style={{padding:"12px 14px", background:"var(--surface-2)", borderRadius:12, gap:14}}>
    <div className="flex" style={{gap:12, alignItems:"flex-start"}}>
      <div style={{width:36, height:36, borderRadius:10, background:"var(--accent-soft)", color:"var(--accent)", display:"grid", placeItems:"center"}}>{icon}</div>
      <div>
        <strong style={{display:"block"}}>{title}</strong>
        <span className="muted" style={{fontSize: 12.5}}>{desc}</span>
      </div>
    </div>
    <div className="flex gap-8">
      <button className="btn btn-soft btn-sm" onClick={onReject}>Rechazar</button>
      <button className="btn btn-primary btn-sm" onClick={onApprove}>{cta}</button>
    </div>
  </div>
);

/* ============ ADMIN — RESERVAS ============ */
function AdminReservas() {
  const [deliveries, setDeliveries] = useStateA([]);

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

  const fetchDeliveries = async () => {
    const res = await apiFetch("/deliveries");
    if (res && res.items) setDeliveries(res.items);
    else setDeliveries([]);
  };

  useEffect(() => {
    fetchDeliveries();
    const interval = setInterval(fetchDeliveries, 30000); // polling 30s
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async (id, status, extra = {}) => {
    try {
      const res = await apiFetch(`/admin/deliveries/${id}/status`, "PATCH", { status, ...extra });
      if (res && res.success) {
        fetchDeliveries();
      } else {
        await apiFetch(`/deliveries/${id}`, "PUT", { status, ...extra });
        fetchDeliveries();
      }
    } catch (e) {
      console.error("Error updating status:", e);
    }
  };

  return (
    <>
      <div className="page-header">
        <div><h1>Gestión de reservas</h1><p>Marca entregadas, pagadas, aprueba cambios. Sin eliminación permanente.</p></div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm"><IA.Filter size={14}/> Filtros</button>
          <button className="btn btn-primary btn-sm" onClick={() => fetchDeliveries()}><IA.RefreshCcw size={14}/> Actualizar</button>
        </div>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr>
            <th style={{width:32}}><input type="checkbox"/></th>
            <th>ID</th><th>Fecha y Hora</th><th>Destino</th><th>Empleado</th><th>Costo</th><th>Estado</th><th>Acciones</th>
          </tr></thead>
          <tbody>
            {deliveries.map(d => {
              const dt = formatDateTime(d.date);
              const statusKey = d.status || "confirmada";
              return (
                <tr key={d.id} style={statusKey==="cancelada" ? {opacity:0.55} : {}}>
                  <td><input type="checkbox" defaultChecked={statusKey==="entregada" && !d.paid}/></td>
                  <td className="id-cell">{d.tracking_code || d.id}</td>
                  <td className="nowrap">
                    <strong>{dt.date}</strong>
                    <div style={{fontSize:11, color:"var(--muted)", marginTop:2}}>{dt.time}</div>
                  </td>
                  <td>
                    <strong>{getDestinationShortName(d.destinationName || d.destination)}</strong>
                    <div className="muted" style={{fontSize:11, marginTop:2}}>{getZoneText(d)}</div>
                  </td>
                  <td>{d.comments && d.comments.includes('| EMP_NAME:') ? d.comments.split('| EMP_NAME:')[1].trim() : (d.employee && d.employee.trim() !== "Empleado" ? d.employee : window.MOCK.getCurrentEmployee().name)}</td>
                  <td className="money">{fmtMXN_A(d.cost)}</td>
                  <td><StatusPillA s={statusKey}/></td>
                  <td>
                    <div className="flex gap-8">
                      {statusKey === "confirmada" && <button className="btn btn-soft btn-sm" onClick={() => updateStatus(d.id, "entregada")}>Marcar entregada</button>}
                      {statusKey === "entregada" && <button className="btn btn-accent btn-sm" onClick={() => updateStatus(d.id, "pagada", { paid: true })}>Marcar pagada</button>}
                      <button className="btn btn-ghost btn-sm" title="Detalle"><IA.Eye size={12}/></button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ============ ADMIN — PAGOS ============ */
function AdminPagos() {
  const [deliveries, setDeliveries] = useStateA([]);
  const [selectedIds, setSelectedIds] = useStateA([]);

  const fetchDeliveries = async () => {
    const res = await apiFetch("/deliveries?status[]=entregada&status[]=pagada&limit=500");
    if (res && res.items) setDeliveries(res.items);
    else setDeliveries([]);
  };

  useEffect(() => { fetchDeliveries(); }, []);

  const pending = deliveries.filter(d => !d.paid && (d.status==="entregada" || d.status==="confirmada"));
  const paid = deliveries.filter(d => d.paid);
  const totalPending = pending.reduce((s,d) => s + d.cost, 0);
  const totalPaid = paid.reduce((s,d) => s + d.cost, 0);
  const totalAcumulado = totalPending + totalPaid;

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) setSelectedIds(selectedIds.filter(x => x !== id));
    else setSelectedIds([...selectedIds, id]);
  };

  const markSelectedAsPaid = async () => {
    for (const id of selectedIds) {
      await apiFetch(`/admin/deliveries/${id}/status`, "PATCH", { status: "pagada", paid: true });
    }
    setSelectedIds([]);
    fetchDeliveries();
  };

  const selectedTotal = pending.filter(d => selectedIds.includes(d.id)).reduce((s,d) => s + d.cost, 0);

  return (
    <>
      <div className="page-header">
        <div><h1>Crédito Holy Bakery</h1><p>Cobro libre — solicita el pago cuando lo decidas.</p></div>
      </div>

      <div className="row" style={{gridTemplateColumns:"1fr 1fr 1fr", gap: 14, marginBottom: 22}}>
        <SummaryCard label="Total acumulado" value={fmtMXN_A(totalAcumulado)} sub={`${deliveries.length} entregas`}/>
        <SummaryCard label="Total pagado" value={fmtMXN_A(totalPaid)} sub={`${paid.length} entregas`} tone="accent"/>
        <SummaryCard label="Total pendiente" value={fmtMXN_A(totalPending)} sub={pending.length + " entregas"} tone="warn"/>
      </div>

      <div className="section-card">
        <div className="flex-between" style={{marginBottom: 12}}>
          <h3>Entregas pendientes de pago</h3>
          <div className="flex gap-8">
            <button className="btn btn-ghost btn-sm"><IA.Filter size={14}/> Rango de fechas</button>
            <button className="btn btn-accent btn-sm" onClick={markSelectedAsPaid} disabled={selectedIds.length===0}><IA.Check size={14}/> Marcar seleccionadas como pagadas</button>
          </div>
        </div>

        <div className="table-wrap">
          <table className="table">
            <thead><tr><th style={{width:32}}><input type="checkbox" onChange={(e) => setSelectedIds(e.target.checked ? pending.map(d=>d.id) : [])} checked={selectedIds.length === pending.length && pending.length > 0}/></th><th>ID</th><th>Cuándo</th><th>Destino</th><th>Empleado</th><th>Costo</th></tr></thead>
            <tbody>
              {pending.map(d => (
                <tr key={d.id}>
                  <td><input type="checkbox" checked={selectedIds.includes(d.id)} onChange={() => toggleSelect(d.id)}/></td>
                  <td className="id-cell">{d.tracking_code || d.id}</td>
                  <td className="nowrap">{d.date}</td>
                  <td><strong>{d.destination}</strong></td>
                  <td>{d.employee}</td>
                  <td className="money">{fmtMXN_A(d.cost)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-foot">
            <span className="muted">{selectedIds.length} entregas seleccionadas</span>
            <span><strong>Total a marcar:</strong> <span className="money" style={{color:"var(--accent)"}}>{fmtMXN_A(selectedTotal)}</span></span>
          </div>
        </div>
      </div>
    </>
  );
}
const SummaryCard = ({ label, value, sub, tone }) => (
  <div className="kpi" style={tone === "accent" ? {borderColor:"var(--accent-soft-2)", background:"var(--accent-soft)"} : tone === "warn" ? {borderColor:"#fde9bf", background:"#fff8eb"} : {}}>
    <div className="kpi-label">{label}</div>
    <div className="kpi-value" style={tone === "accent" ? {color:"var(--accent)"} : tone === "warn" ? {color:"var(--warning)"} : {}}>{value}</div>
    <div className="kpi-sub">{sub}</div>
  </div>
);

/* ============ ADMIN — SOLICITUDES ============ */
function AdminSolicitudes() {
  const [requests, setRequests] = useStateA([]);
  const [activeTariffRequest, setActiveTariffRequest] = useStateA(null);
  const [newTariffCost, setNewTariffCost] = useStateA("");

  const fetchRequests = async () => {
    const res = await apiFetch("/admin/pending-requests");
    if (res) {
      const cancellations = (res.cancellations || []).map(c => ({
        ...c,
        type: "cancellation",
        labelType: "Cancelación",
        cost: c.cost,
        destination: c.destination_name || "Sin destino",
        employee: c.employee_name ? c.employee_name : (c.driver_id ? `Empleado ${c.driver_id}` : window.MOCK.getCurrentEmployee().name),
        date: c.scheduled_date || c.created_at,
        tracking: c.tracking_code || `DLV-${c.delivery_id}`
      }));
      
      const tariff_changes = (res.tariff_changes || []).map(t => ({
        ...t,
        type: "tariff_change",
        labelType: "Cambio de tarifa",
        cost: t.cost,
        destination: t.destination_name || "Sin destino",
        employee: t.employee_name ? t.employee_name : (t.driver_id ? `Empleado ${t.driver_id}` : window.MOCK.getCurrentEmployee().name),
        date: t.scheduled_date || t.created_at,
        tracking: t.tracking_code || `DLV-${t.delivery_id}`
      }));
      
      setRequests([...cancellations, ...tariff_changes]);
    } else {
      // Fallback fallback to empty
      setRequests([]);
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  const handleApproveCancellation = async (req) => {
    if (confirm("¿Confirmas la aprobación de esta cancelación?")) {
      await apiFetch(`/cancellation-requests/${req.id}`, "PATCH", { action: "approve", admin_id: 1 });
      fetchRequests();
    }
  };

  const handleRejectRequest = async (req) => {
    if (confirm(`¿Confirmas rechazar esta solicitud de ${req.labelType.toLowerCase()}?`)) {
      const endpoint = req.type === "cancellation" 
        ? `/cancellation-requests/${req.id}` 
        : `/tariff-change-requests/${req.id}`;
      await apiFetch(endpoint, "PATCH", { action: "reject", admin_id: 1 });
      fetchRequests();
    }
  };

  const handleApproveTariffClick = (req) => {
    setActiveTariffRequest(req);
    setNewTariffCost(req.requested_cost || req.new_tariff || "");
  };

  const handleConfirmTariffApproval = async () => {
    const costVal = parseFloat(newTariffCost);
    if (isNaN(costVal) || costVal <= 0) {
      alert("Por favor ingresa una tarifa válida mayor a cero.");
      return;
    }
    await apiFetch(`/tariff-change-requests/${activeTariffRequest.id}`, "PATCH", { 
      action: "approve", 
      cost: costVal, 
      admin_id: 1 
    });
    setActiveTariffRequest(null);
    fetchRequests();
  };

  return (
    <>
      <div className="page-header">
        <div>
          <h1>Bandeja de solicitudes</h1>
          <p>Aprueba o rechaza cancelaciones y cambios de tarifa en tiempo real.</p>
        </div>
      </div>

      <h3 style={{marginBottom: 16}}>Cancelaciones</h3>
      <div className="stack" style={{marginBottom: 32}}>
        {requests.filter(req => req.type === "cancellation").length === 0 ? (
          <div className="empty section-card">No hay cancelaciones pendientes en este momento.</div>
        ) : requests.filter(req => req.type === "cancellation").map(req => (
          <div className="section-card" key={req.type + req.id}>
            <div className="flex" style={{gap: 14, alignItems:"flex-start"}}>
              <div style={{
                width: 44, 
                height: 44, 
                borderRadius: 12, 
                background: "var(--danger-soft)", 
                color: "var(--danger)", 
                display:"grid", 
                placeItems:"center"
              }}>
                <IA.ShieldX size={20}/>
              </div>
              <div style={{flex:1}}>
                <div className="flex-between">
                  <div>
                    <strong style={{fontSize: 15}}>{req.tracking} · {req.destination}</strong>
                    <div className="muted" style={{fontSize: 12.5}}>
                      Solicitado por {req.employee || "Empleado"} · {req.date}
                    </div>
                  </div>
                  <span className={`status status-pendiente`}>{req.labelType}</span>
                </div>
                
                <div className="card-tight" style={{background:"var(--surface-2)", borderRadius:10, marginTop: 12, fontSize: 13}}>
                  <strong>Motivo de la solicitud:</strong> "{req.reason || "Sin especificar"}"
                </div>
                
                <div className="row" style={{gridTemplateColumns:"repeat(4, 1fr)", gap: 12, marginTop: 14}}>
                  <Mini label="Costo original" value={fmtMXN_A(req.cost || req.old_tariff || 0)}/>
                  <Mini label="Zona" value="Local/Cobertura"/>
                  <Mini label="Cliente" value={req.customer_name || req.client || "N/A"}/>
                  <Mini label="Fecha entrega" value={req.date}/>
                </div>
                
                <div className="flex-end" style={{marginTop: 14}}>
                  <button className="btn btn-soft btn-sm" onClick={() => handleRejectRequest(req)}>Rechazar</button>
                  <button className="btn btn-primary btn-sm" onClick={() => handleApproveCancellation(req)}>
                    <IA.Check size={14}/> Aprobar cancelación
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{marginBottom: 16}}>Cambios de Tarifa</h3>
      <div className="stack">
        {requests.filter(req => req.type === "tariff_change").length === 0 ? (
          <div className="empty section-card">No hay cambios de tarifa pendientes en este momento.</div>
        ) : requests.filter(req => req.type === "tariff_change").map(req => (
          <div className="section-card" key={req.type + req.id}>
            <div className="flex" style={{gap: 14, alignItems:"flex-start"}}>
              <div style={{
                width: 44, 
                height: 44, 
                borderRadius: 12, 
                background: "var(--accent-soft)", 
                color: "var(--accent)", 
                display:"grid", 
                placeItems:"center"
              }}>
                <IA.RefreshCcw size={20}/>
              </div>
              <div style={{flex:1}}>
                <div className="flex-between">
                  <div>
                    <strong style={{fontSize: 15}}>{req.tracking} · {req.destination}</strong>
                    <div className="muted" style={{fontSize: 12.5}}>
                      Solicitado por {req.employee || "Empleado"} · {req.date}
                    </div>
                  </div>
                  <span className={`status status-pendiente`}>{req.labelType}</span>
                </div>
                
                <div className="card-tight" style={{background:"var(--surface-2)", borderRadius:10, marginTop: 12, fontSize: 13}}>
                  <strong>Motivo de la solicitud:</strong> "{req.reason || "Sin especificar"}"
                </div>
                
                <div className="row" style={{gridTemplateColumns:"repeat(5, 1fr)", gap: 12, marginTop: 14}}>
                  <Mini label="Costo original" value={fmtMXN_A(req.cost || req.old_tariff || 0)}/>
                  <Mini label="Nuevo costo" value={fmtMXN_A(req.requested_cost || req.new_tariff || 0)}/>
                  <Mini label="Zona" value="Local/Cobertura"/>
                  <Mini label="Cliente" value={req.customer_name || req.client || "N/A"}/>
                  <Mini label="Fecha entrega" value={req.date}/>
                </div>
                
                <div className="flex-end" style={{marginTop: 14}}>
                  <button className="btn btn-soft btn-sm" onClick={() => handleRejectRequest(req)}>Rechazar</button>
                  <button className="btn btn-accent btn-sm" onClick={() => handleApproveTariffClick(req)}>
                    <IA.Check size={14}/> Aprobar cambio de tarifa
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeTariffRequest && (
        <div className="mp-backdrop" onClick={() => setActiveTariffRequest(null)}>
          <div className="mp-modal" style={{ maxWidth: "460px", height: "auto" }} onClick={(e) => e.stopPropagation()}>
            <div className="mp-header">
              <div>
                <h3 className="mp-title">Aprobar Cambio de Tarifa</h3>
                <p className="mp-sub">Ingresa la tarifa autorizada para <strong>{activeTariffRequest.tracking}</strong></p>
              </div>
              <button className="mp-close" onClick={() => setActiveTariffRequest(null)}><IA.X size={16}/></button>
            </div>
            
            <div className="mp-body" style={{ display: "flex", flexDirection: "column", padding: "20px", gap: "16px", overflowY: "auto" }}>
              <div>
                <label className="label">Costo actual</label>
                <div className="mono" style={{ fontSize: "16px", fontWeight: "700", marginBottom: "12px" }}>
                  {fmtMXN_A(activeTariffRequest.cost || activeTariffRequest.old_tariff || 0)}
                </div>
              </div>
              
              <div>
                <label className="label">Costo solicitado</label>
                <div className="mono" style={{ fontSize: "16px", fontWeight: "700", color: "var(--warning)", marginBottom: "12px" }}>
                  {fmtMXN_A(activeTariffRequest.requested_cost || activeTariffRequest.new_tariff || 0)}
                </div>
              </div>
              
              <div>
                <label className="label">Tarifa autorizada ($ MXN)</label>
                <div className="field">
                  <IA.DollarSign size={18} className="icon"/>
                  <input 
                    type="number" 
                    value={newTariffCost} 
                    onChange={e => setNewTariffCost(e.target.value)} 
                    placeholder="0.00" 
                    className="campo-input"
                    style={{ fontSize: "14px", border: "0", outline: "0", background: "transparent", width: "100%" }}
                  />
                </div>
              </div>
              
              <div className="flex gap-8" style={{ marginTop: "8px" }}>
                <button className="btn btn-ghost btn-sm" style={{ flex: 1 }} onClick={() => setActiveTariffRequest(null)}>
                  Cancelar
                </button>
                <button className="btn btn-accent btn-sm" style={{ flex: 1 }} onClick={handleConfirmTariffApproval}>
                  Confirmar Aprobación
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const Mini = ({ label, value }) => (
  <div style={{padding:"10px 12px", background:"var(--surface-2)", borderRadius:10}}>
    <div className="muted" style={{fontSize:11, textTransform:"uppercase", letterSpacing:"0.12em", fontWeight:700}}>{label}</div>
    <div style={{fontWeight:700, marginTop: 2}}>{value}</div>
  </div>
);

/* ============ ADMIN — EXTRAS ============ */
function AdminExtras() {
  const [extras, setExtras] = useStateA([]);
  const [desc, setDesc] = useStateA("");
  const [cost, setCost] = useStateA("");
  const [linked, setLinked] = useStateA("");

  const fetchExtras = async () => {
    const res = await apiFetch("/admin/extra-services");
    if (res && res.items) setExtras(res.items);
    else setExtras([]);
  };

  useEffect(() => { fetchExtras(); }, []);

  const handleAdd = async () => {
    if (!desc || !cost) return;
    const newExtra = {
      delivery_id: linked || null,
      description: desc,
      cost: Number(cost),
      service_date: new Date().toISOString().split('T')[0],
      service_time: new Date().toTimeString().split(' ')[0],
      added_by_admin_id: 1
    };
    const res = await apiFetch("/admin/extra-services", "POST", newExtra);
    if (res && res.success) {
      fetchExtras();
    } else {
      // Optimistic update for demo if API fails
      setExtras([{ id: "EXT-" + Math.floor(Math.random() * 1000), ...newExtra, date: newExtra.service_date }, ...extras]);
    }
    setDesc("");
    setCost("");
    setLinked("");
  };

  return (
    <>
      <div className="page-header">
        <div><h1>Servicios adicionales</h1><p>Vueltas extra, reubicaciones o emergencias fuera de la reserva original.</p></div>
        <button className="btn btn-primary btn-sm" onClick={handleAdd}><IA.Plus size={14}/> Añadir servicio extra</button>
      </div>

      <div className="row" style={{gridTemplateColumns:"1.4fr 1fr", gap: 18}}>
        <div className="section-card">
          <h3>Historial de extras</h3>
          <p className="desc">Visibles para todo el equipo y se suman al crédito.</p>
          <div className="table-wrap">
            <table className="table">
              <thead><tr><th>ID</th><th>Cuándo</th><th>Reserva vinculada</th><th>Descripción</th><th>Costo</th></tr></thead>
              <tbody>
                {extras.map(x => (
                  <tr key={x.id}>
                    <td className="id-cell">{x.id}</td>
                    <td className="nowrap">{x.date}</td>
                    <td>{x.linked ? <span className="mono">{x.linked}</span> : <span className="muted">Independiente</span>}</td>
                    <td>{x.description}<div className="muted" style={{fontSize:11}}>Por {x.employee}</div></td>
                    <td className="money">{fmtMXN_A(x.cost)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="section-card">
          <h3>Nuevo servicio extra</h3>
          <p className="desc">Anotación para suma al crédito.</p>
          <div className="stack">
            <div>
              <label className="label">Vincular a reserva (opcional)</label>
              <div className="field"><IA.Layers size={18} className="icon"/><input value={linked} onChange={e => setLinked(e.target.value)} placeholder="DLV-XXX o dejar vacío"/></div>
            </div>
            <div>
              <label className="label">Descripción</label>
              <div className="field field-textarea"><textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} placeholder="Vuelta adicional, reubicación, emergencia…"/></div>
            </div>
            <div className="row row-2">
              <div>
                <label className="label">Fecha</label>
                <div className="field"><IA.Calendar size={18} className="icon"/><input type="date" defaultValue={new Date().toISOString().split('T')[0]}/></div>
              </div>
              <div>
                <label className="label">Costo</label>
                <div className="field"><IA.DollarSign size={18} className="icon"/><input type="number" value={cost} onChange={e => setCost(e.target.value)} placeholder="0.00"/></div>
              </div>
            </div>
            <button className="btn btn-primary btn-block" onClick={handleAdd}>Registrar extra</button>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ ADMIN — CONFIG ZONAS ============ */
function AdminZonas() {
  const [zones, setZones] = useStateA(pricesData);
  const [editingId, setEditingId] = useStateA(null);
  const [editLocal, setEditLocal] = useStateA("");
  const [editForeign, setEditForeign] = useStateA("");

  useEffect(() => {
    apiFetch("/settings/zones").then(res => {
      if (res && Array.isArray(res)) setZones(res);
    });
  }, []);

  const startEdit = (z) => {
    setEditingId(z.id);
    setEditLocal(z.local_price);
    setEditForeign(z.foreign_price);
  };

  const saveEdit = async (id) => {
    const updated = zones.map(z => z.id === id ? { ...z, local_price: Number(editLocal), foreign_price: Number(editForeign) } : z);
    setZones(updated);
    await apiFetch(`/settings/zones/${id}`, "PUT", { local_price: Number(editLocal), foreign_price: Number(editForeign) });
    setEditingId(null);
  };

  return (
    <>
      <div className="page-header">
        <div><h1>Tarifas por zona</h1><p>Polígonos GeoJSON + tarifas locales y extranjero. Se reflejan al instante.</p></div>
        <div className="flex gap-8">
          <button className="btn btn-ghost btn-sm"><IA.Download size={14}/> Exportar GeoJSON</button>
          <button className="btn btn-primary btn-sm"><IA.Plus size={14}/> Cargar archivo</button>
        </div>
      </div>

      <div className="row" style={{gridTemplateColumns:"1.5fr 1fr", gap: 18}}>
        <div className="section-card" style={{padding: 0}}>
          <div className="zone-row head" style={{position: "sticky", top: 0, zIndex: 2}}><span>Zona</span><span>Tarifa local</span><span>Tarifa extranjero</span><span></span></div>
          <div style={{maxHeight: "500px", overflowY: "auto"}}>
            {zones.map(z => {
              const isEditing = editingId === z.id;
              return (
                <div key={z.id} className="zone-row" style={{gridTemplateColumns: "1fr 100px 100px 70px"}}>
                  <div><strong>{z.name}</strong></div>
                  
                  {isEditing ? (
                    <>
                      <div className="field" style={{padding:0, minHeight:32}}><input type="number" value={editLocal} onChange={e=>setEditLocal(e.target.value)} style={{padding:"0 8px"}}/></div>
                      <div className="field" style={{padding:0, minHeight:32}}><input type="number" value={editForeign} onChange={e=>setEditForeign(e.target.value)} style={{padding:"0 8px"}}/></div>
                      <div className="flex-end gap-8">
                        <button className="btn btn-primary btn-sm" onClick={() => saveEdit(z.id)}><IA.Check size={14}/></button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="mono">${z.local_price}</div>
                      <div className="mono">${z.foreign_price}</div>
                      <div className="flex-end"><button className="btn btn-ghost btn-sm" onClick={() => startEdit(z)}><IA.Edit size={14}/></button></div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="section-card" style={{padding: 0, overflow:"hidden"}}>
          <div style={{padding:"18px 20px", borderBottom:"1px solid var(--line)"}}>
            <h3 style={{margin:0}}>Mapa de cobertura</h3>
            <p className="desc" style={{margin:"4px 0 0"}}>Polígonos cargados desde GeoJSON.</p>
          </div>
          <div style={{height: 360, position:"relative"}} className="map-canvas">
            <svg viewBox="0 0 360 360" preserveAspectRatio="xMidYMid slice">
              <path d="M 60 80 Q 130 40 200 60 Q 250 80 270 130 Q 250 170 180 170 Q 110 170 70 130 Z" fill="rgba(22,163,74,0.18)" stroke="#16a34a" strokeWidth="1.5"/>
              <text x="120" y="115" fontSize="11" fontWeight="700" fontFamily="Manrope">Zona 1</text>

              <path d="M 200 130 Q 270 130 300 180 Q 270 230 200 220 Q 170 200 200 130 Z" fill="rgba(14,106,50,0.18)" stroke="#0e6a32" strokeWidth="1.5"/>
              <text x="220" y="180" fontSize="11" fontWeight="700" fontFamily="Manrope">Zona 2</text>

              <path d="M 80 180 Q 130 200 160 240 Q 130 280 80 260 Q 50 220 80 180 Z" fill="rgba(59,130,246,0.18)" stroke="#3b82f6" strokeWidth="1.5"/>
              <text x="90" y="225" fontSize="11" fontWeight="700" fontFamily="Manrope">Zona 3</text>

              <path d="M 220 240 Q 290 240 320 290 Q 280 330 220 320 Q 180 290 220 240 Z" fill="rgba(124,58,237,0.18)" stroke="#7c3aed" strokeWidth="1.5"/>
              <text x="240" y="285" fontSize="11" fontWeight="700" fontFamily="Manrope">Zona 4</text>
            </svg>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ ADMIN — PREFERENCIALES ============ */
function AdminPref() {
  const [prefs, setPrefs] = useStateA(window.MOCK.PREFERENTIAL);
  useEffect(() => {
    apiFetch("/settings/preferential").then(res => {
      if (res && Array.isArray(res)) setPrefs(res);
    });
  }, []);

  return (
    <>
      <div className="page-header">
        <div><h1>Tarifas especiales</h1><p>Precios fijos que sobreescriben la zona. No aparecen en el Excel estándar.</p></div>
        <button className="btn btn-primary btn-sm"><IA.Plus size={14}/> Nueva ubicación</button>
      </div>

      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>Lugar</th><th>Dirección</th><th>Zona base</th><th>Tarifa local</th><th>Tarifa extranjero</th><th></th></tr></thead>
          <tbody>
            {prefs.map(p => (
              <tr key={p.id}>
                <td><strong>{p.name}</strong></td>
                <td className="muted">{p.address}</td>
                <td><span className="zone-chip">{p.zone}</span></td>
                <td className="money">${p.local}.00</td>
                <td className="money">${p.foreign}.00</td>
                <td>
                  <div className="flex gap-8">
                    <button className="btn btn-ghost btn-sm"><IA.Edit size={12}/></button>
                    <button className="btn btn-danger-ghost btn-sm"><IA.Trash size={12}/></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ============ ADMIN — TIPO DE CAMBIO ============ */
function AdminTC() {
  const [rate, setRate] = useStateA(17.50);
  
  useEffect(() => {
    apiFetch("/settings/exchange_rate").then(res => {
      if (res && res.rate) setRate(res.rate);
    });
  }, []);

  const handleUpdate = async () => {
    await apiFetch("/settings/exchange_rate", "PUT", { rate });
    alert("Tipo de cambio actualizado");
  };
  return (
    <>
      <div className="page-header">
        <div><h1>Tipo de cambio</h1><p>Manual. Aplica a todos los cotizadores. Sin APIs externas.</p></div>
      </div>

      <div className="row" style={{gridTemplateColumns:"1fr 1fr", gap: 18}}>
        <div className="section-card">
          <h3>Valor MXN / USD</h3>
          <p className="desc">Última actualización: hoy 9:14 a.m. por OnRoute Admin.</p>
          <div className="flex" style={{alignItems:"flex-end", gap: 18, marginTop: 18}}>
            <div style={{fontSize: 56, fontWeight: 800, letterSpacing: "-0.03em", lineHeight:1}}>${rate.toFixed(2)}</div>
            <div className="muted" style={{paddingBottom: 12}}>MXN / 1 USD</div>
          </div>
          <div className="row row-2" style={{marginTop: 22}}>
            <div>
              <label className="label">Nuevo valor</label>
              <div className="field"><IA.DollarSign size={18} className="icon"/><input type="number" step="0.01" value={rate} onChange={e => setRate(Number(e.target.value))}/></div>
            </div>
            <div className="flex" style={{alignItems:"flex-end"}}>
              <button className="btn btn-primary btn-block" onClick={handleUpdate}>Actualizar tipo de cambio</button>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3>Vista previa</h3>
          <p className="desc">Cómo se ve para el empleado al cotizar.</p>
          <div className="stack" style={{marginTop: 12}}>
            <div className="price-row"><span className="lbl">Tarifa local</span><span className="val">$200.00 MXN</span></div>
            <div className="price-row"><span className="lbl">Tarifa extranjero</span><span className="val">$280.00 MXN</span></div>
            <div className="price-row featured"><span className="lbl">Equivalente USD</span><span className="val">~${(280/rate).toFixed(2)}</span></div>
          </div>
        </div>
      </div>
    </>
  );
}

/* ============ ADMIN — DATOS BANCARIOS ============ */
function AdminBank() {
  const [bankData, setBankData] = useStateA({ banco: "BBVA México", titular: "OnRoute México S.A. de C.V.", clabe: "012 180 01234567890 1", cuenta: "0123 4567 89", concepto: "Holy Bakery — Crédito entregas" });

  useEffect(() => {
    apiFetch("/settings/bank").then(res => {
      if (res && res.banco) setBankData(res);
    });
  }, []);

  const handleSave = async () => {
    await apiFetch("/settings/bank", "PUT", bankData);
    alert("Datos bancarios guardados");
  };

  return (
    <>
      <div className="page-header">
        <div><h1>Datos bancarios</h1><p>Visibles para empleados en modo lectura.</p></div>
        <button className="btn btn-primary btn-sm" onClick={handleSave}><IA.Save size={14}/> Guardar cambios</button>
      </div>

      <div className="section-card" style={{maxWidth: 720}}>
        <div className="stack">
          <div className="row row-2">
            <div><label className="label">Banco</label><div className="field"><IA.Building size={18} className="icon"/><input value={bankData.banco} onChange={e=>setBankData({...bankData, banco: e.target.value})}/></div></div>
            <div><label className="label">Titular</label><div className="field"><IA.Users size={18} className="icon"/><input value={bankData.titular} onChange={e=>setBankData({...bankData, titular: e.target.value})}/></div></div>
          </div>
          <div className="row row-2">
            <div><label className="label">CLABE (18 dígitos)</label><div className="field"><IA.CreditCard size={18} className="icon"/><input value={bankData.clabe} onChange={e=>setBankData({...bankData, clabe: e.target.value})}/></div></div>
            <div><label className="label">Cuenta</label><div className="field"><IA.CreditCard size={18} className="icon"/><input value={bankData.cuenta} onChange={e=>setBankData({...bankData, cuenta: e.target.value})}/></div></div>
          </div>
          <div><label className="label">Concepto sugerido</label><div className="field"><IA.Edit size={18} className="icon"/><input value={bankData.concepto} onChange={e=>setBankData({...bankData, concepto: e.target.value})}/></div></div>
        </div>
      </div>
    </>
  );
}

window.AdminScreens = { AdminPanel, AdminReservas, AdminPagos, AdminSolicitudes, AdminExtras, AdminZonas, AdminPref, AdminTC, AdminBank };
