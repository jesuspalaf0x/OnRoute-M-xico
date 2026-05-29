// Top-level prototype router

const { useState: useStateApp } = React;
const II = window.Icons;

function ProtoNav({ screen, setScreen }) {
  const flow = [
    { k: "login", l: "Login" },
    { k: "cotizador", l: "Cotizador" },
    { k: "resultado", l: "Resultado" },
    { k: "reserva", l: "Reserva" },
    { k: "whatsapp", l: "WhatsApp" },
  ];
  const dash = [
    { k: "emp/resumen", l: "Resumen" },
    { k: "emp/reservas", l: "Reservas" },
    { k: "emp/guardadas", l: "Guardadas" },
    { k: "emp/configuracion", l: "Config" },
  ];
  const admin = [
    { k: "adm/panel", l: "Panel" },
    { k: "adm/reservas", l: "Reservas" },
    { k: "adm/pagos", l: "Pagos" },
    { k: "adm/cancelaciones", l: "Cancelaciones" },
    { k: "adm/extras", l: "Extras" },
    { k: "adm/zonas", l: "Zonas" },
    { k: "adm/pref", l: "Especiales" },
    { k: "adm/tc", l: "Tipo de cambio" },
    { k: "adm/bank", l: "Bancarios" },
  ];

  return (
    <div className="proto-nav">
      <div className="brand"><span className="dot"><II.Cake size={12}/></span> Holy × OnRoute</div>
      <div className="group">
        <span className="group-label">Flujo</span>
        {flow.map(s => <button key={s.k} className={screen===s.k?"active":""} onClick={() => setScreen(s.k)}>{s.l}</button>)}
      </div>
      <div className="group">
        <span className="group-label">Empleado</span>
        {dash.map(s => <button key={s.k} className={screen===s.k?"active":""} onClick={() => setScreen(s.k)}>{s.l}</button>)}
      </div>
      <div className="group">
        <span className="group-label">Admin</span>
        {admin.map(s => <button key={s.k} className={screen===s.k?"active":""} onClick={() => setScreen(s.k)}>{s.l}</button>)}
      </div>
    </div>
  );
}

function App() {
  const [screen, setScreen] = useStateApp("login");
  const goTo = (k) => {
    const map = { dashboard: "emp/resumen" };
    setScreen(map[k] || k);
    window.scrollTo({top: 0});
  };

  const F = window.AppScreens;
  const E = window.EmpScreens;
  const A = window.AdminScreens;
  const Shell = E.AppShell;

  let body = null;
  if (screen === "login") body = <F.LoginScreen goTo={goTo}/>;
  else if (screen === "cotizador") body = <F.CotizadorScreen goTo={goTo}/>;
  else if (screen === "resultado") body = <F.ResultadoScreen goTo={goTo}/>;
  else if (screen === "reserva") body = <F.ReservaScreen goTo={goTo}/>;
  else if (screen === "whatsapp") body = <F.WhatsAppScreen goTo={goTo}/>;
  else if (screen.startsWith("emp/")) {
    const sec = screen.replace("emp/","");
    const map = { resumen: <E.EmpResumen/>, reservas: <E.EmpReservas/>, guardadas: <E.EmpGuardadas/>, configuracion: <E.EmpConfig/> };
    body = <Shell role="employee" section={sec} setSection={(k) => setScreen("emp/"+k)}>{map[sec]}</Shell>;
  } else if (screen.startsWith("adm/")) {
    const sec = screen.replace("adm/","");
    const map = {
      panel: <A.AdminPanel/>, reservas: <A.AdminReservas/>, pagos: <A.AdminPagos/>,
      cancelaciones: <A.AdminCancelaciones/>, extras: <A.AdminExtras/>,
      "config-zonas": <A.AdminZonas/>, "config-pref": <A.AdminPref/>, "config-tc": <A.AdminTC/>, "config-bank": <A.AdminBank/>,
      zonas: <A.AdminZonas/>, pref: <A.AdminPref/>, tc: <A.AdminTC/>, bank: <A.AdminBank/>,
    };
    const navMap = { panel:"panel", reservas:"reservas", pagos:"pagos", cancelaciones:"cancelaciones", extras:"extras", zonas:"config-zonas", pref:"config-pref", tc:"config-tc", bank:"config-bank" };
    body = <Shell role="admin" section={navMap[sec] || sec} setSection={(k) => {
      const inv = { "config-zonas":"zonas", "config-pref":"pref", "config-tc":"tc", "config-bank":"bank" };
      setScreen("adm/" + (inv[k] || k));
    }}>{map[sec]}</Shell>;
  }

  return (
    <>
      <ProtoNav screen={screen} setScreen={setScreen}/>
      {body}
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App/>);
