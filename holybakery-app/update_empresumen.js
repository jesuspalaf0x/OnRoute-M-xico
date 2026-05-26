const fs = require('fs');
let code = fs.readFileSync('src/screens-dashboard.jsx', 'utf8');

const targetStr = `function EmpResumen({ goTo }) {
  const { data: deliveries, loading } = useApi("/deliveries", []);

  // Calculate metrics
  const validDeliveries = Array.isArray(deliveries) ? deliveries : [];
  const entregadas = validDeliveries.filter(d => d.status === "entregada" || d.status === "pagada");
  const numEntregadas = entregadas.length;
  const pendienteCobro = validDeliveries.filter(d => d.status === "entregada" && !d.paid).reduce((acc, d) => acc + (d.cost || 0), 0);
  const numPendiente = validDeliveries.filter(d => d.status === "entregada" && !d.paid).length;
  const yaPagadas = validDeliveries.filter(d => d.status === "pagada").reduce((acc, d) => acc + (d.cost || 0), 0);
  const numPagadas = validDeliveries.filter(d => d.status === "pagada").length;
  const enAdeudo = validDeliveries.filter(d => d.status === "entregada" && !d.paid).length;
  const borradores = validDeliveries.filter(d => d.status === "borrador").length;

  const upcoming = validDeliveries.filter(d => d.status !== "borrador" && d.status !== "cancelada").slice(0, 5);`;

const newStr = `function EmpResumen({ goTo }) {
  const now = new Date(new Date().toLocaleString("en-US", { timeZone: "America/Cancun" }));
  const y = now.getFullYear();
  const m = String(now.getMonth() + 1).padStart(2, '0');
  const dLast = new Date(y, now.getMonth() + 1, 0).getDate();
  const dateFrom = \`\${y}-\${m}-01\`;
  const dateTo = \`\${y}-\${m}-\${dLast}\`;

  const { data: mesData, loading: l1 } = useApi(\`/deliveries?status[]=entregada&status[]=pagada&date_from=\${dateFrom}&date_to=\${dateTo}\`, {total:0, items:[]}, 45000);
  const { data: pendientesData, loading: l2 } = useApi(\`/deliveries?status[]=entregada\`, {total:0, items:[]}, 45000);
  const { data: pagadasData, loading: l3 } = useApi(\`/deliveries?status[]=pagada&date_from=\${dateFrom}&date_to=\${dateTo}\`, {total:0, items:[]}, 45000);
  const { data: borradorData, loading: l4 } = useApi(\`/deliveries?status[]=borrador\`, {total:0, items:[]}, 45000);
  const { data: empData, loading: lEmp } = useApi(\`/employees/on-shift\`, null, 45000);
  const { data: upcomingData, loading: lUp } = useApi(\`/deliveries?limit=5\`, {total:0, items:[]}, 45000);

  const numEntregadas = mesData?.total || 0;
  const pendienteCobro = (pendientesData?.items || []).reduce((acc, d) => acc + (d.cost || 0), 0);
  const numPendiente = pendientesData?.total || 0;
  const yaPagadas = (pagadasData?.items || []).reduce((acc, d) => acc + (d.cost || 0), 0);
  const numPagadas = pagadasData?.total || 0;
  const enAdeudo = pendientesData?.total || 0;
  const borradores = borradorData?.total || 0;
  
  const upcoming = (upcomingData?.items || []).filter(d => d.status !== "borrador" && d.status !== "cancelada").slice(0, 5);
  const loading = l1 || l2 || l3 || l4;`;

code = code.replace(targetStr, newStr);

// Also update Empleado en turno widget in EmpResumen
const empWidgetTarget = `<div className="card-tight" style={{background:"var(--accent-soft)", borderRadius:12, display:"flex", gap:12, alignItems:"center"}}>
              <div style={{width:40, height:40, borderRadius:"50%", background:"var(--accent)", color:"white", display:"grid", placeItems:"center", fontWeight:800}}>DD</div>
              <div>
                <strong>Diana Domínguez</strong>
                <div className="muted" style={{fontSize:12}}>Repostería · 3:00 p.m. – 8:30 p.m.</div>
              </div>
            </div>`;

const empWidgetNew = `<div className="card-tight" style={{background:"var(--accent-soft)", borderRadius:12, display:"flex", gap:12, alignItems:"center"}}>
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
            </div>`;

code = code.replace(empWidgetTarget, empWidgetNew);

fs.writeFileSync('src/screens-dashboard.jsx', code);
