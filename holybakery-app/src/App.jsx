// Top-level prototype router
import React from 'react';
import { createRoot } from 'react-dom/client';

const { useState: useStateApp } = React;
const II = window.Icons;


function App() {
  const [screen, setScreen] = useStateApp(() => {
    if (sessionStorage.getItem("wp_token_admin")) return "adm/panel";
    if (sessionStorage.getItem("wp_token")) return "emp/resumen";
    return "login";
  });
  const [quoteData, setQuoteData] = useStateApp(null);
  
  const goTo = (k, data) => {
    const map = { dashboard: "emp/resumen" };
    if (data) setQuoteData(data);
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
  else if (screen === "resultado") body = <F.ResultadoScreen goTo={goTo} quoteData={quoteData}/>;
  else if (screen === "reserva") body = <F.ReservaScreen goTo={goTo} quoteData={quoteData}/>;
  else if (screen === "whatsapp") body = <F.WhatsAppScreen goTo={goTo} quoteData={quoteData}/>;
  else if (screen === "admin-login") body = <F.AdminLoginScreen goTo={goTo}/>;
  else if (screen.startsWith("emp/")) {
    const sec = screen.replace("emp/","");
    const map = { resumen: <E.EmpResumen goTo={goTo}/>, reservas: <E.EmpReservas goTo={goTo}/>, guardadas: <E.EmpGuardadas goTo={goTo}/>, empleados: <E.EmpEmpleados goTo={goTo}/>, bancarios: <E.EmpBancarios goTo={goTo}/> };
    body = <Shell role="employee" section={sec} setSection={(k) => setScreen("emp/"+k)} goTo={goTo}>{map[sec]}</Shell>;
  } else if (screen.startsWith("adm/")) {
    const sec = screen.replace("adm/","");
    const map = {
      panel: <A.AdminPanel goTo={goTo}/>, reservas: <A.AdminReservas goTo={goTo}/>, pagos: <A.AdminPagos goTo={goTo}/>,
      solicitudes: <A.AdminSolicitudes goTo={goTo}/>, extras: <A.AdminExtras goTo={goTo}/>,
      "config-zonas": <A.AdminZonas goTo={goTo}/>, "config-pref": <A.AdminPref goTo={goTo}/>, "config-tc": <A.AdminTC goTo={goTo}/>, "config-bank": <A.AdminBank goTo={goTo}/>,
      zonas: <A.AdminZonas goTo={goTo}/>, pref: <A.AdminPref goTo={goTo}/>, tc: <A.AdminTC goTo={goTo}/>, bank: <A.AdminBank goTo={goTo}/>,
    };
    const navMap = { panel:"panel", reservas:"reservas", pagos:"pagos", solicitudes:"solicitudes", extras:"extras", zonas:"config-zonas", pref:"config-pref", tc:"config-tc", bank:"config-bank" };
    body = <Shell role="admin" section={navMap[sec] || sec} setSection={(k) => {
      const inv = { "config-zonas":"zonas", "config-pref":"pref", "config-tc":"tc", "config-bank":"bank" };
      setScreen("adm/" + (inv[k] || k));
    }} goTo={goTo}>{map[sec]}</Shell>;
  }

  return (
    <>
      {body}
    </>
  );
}

const root = createRoot(document.getElementById("root"));
root.render(<App/>);
