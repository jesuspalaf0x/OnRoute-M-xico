import React, { useState, useEffect, useRef } from "react";

const Ic = ({ size = 18, children }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);
const I = {
  Calendar: (p) => <Ic {...p}><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></Ic>,
  ArrowRight: (p) => <Ic {...p}><path d="M5 12h14M13 5l7 7-7 7"/></Ic>,
  ChevronLeft: (p) => <Ic {...p}><path d="m15 18-6-6 6-6"/></Ic>,
  ChevronRight: (p) => <Ic {...p}><path d="m9 18 6-6-6-6"/></Ic>,
  Check: (p) => <Ic {...p}><path d="M20 6 9 17l-5-5"/></Ic>,
  Clock: (p) => <Ic {...p}><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></Ic>,
  Filter: (p) => <Ic {...p}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></Ic>,
};

const MESES = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
const DOW = ["lu","ma","mi","ju","vi","sá","do"];
const DIAS_CORTOS = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];

const ymd = (d) => d ? `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}` : null;
const sameDay = (a, b) => a && b && ymd(a) === ymd(b);
const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate());
const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate()+n); return x; };
const fmtLong = (d) => d ? `${DIAS_CORTOS[d.getDay()]} ${d.getDate()} de ${MESES[d.getMonth()]} de ${d.getFullYear()}` : null;
const fmtShort = (d) => d ? `${d.getDate()} ${MESES[d.getMonth()].slice(0,3)}. ${d.getFullYear()}` : null;

function MonthGrid({ year, month, from, to, hover, today, onPick, onHover }) {
  const first = new Date(year, month, 1);
  let startDow = (first.getDay() + 6) % 7; // Monday-first
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevDays = new Date(year, month, 0).getDate();

  const cells = [];
  for (let i = 0; i < startDow; i++) cells.push({ day: prevDays - startDow + 1 + i, muted: true, date: new Date(year, month - 1, prevDays - startDow + 1 + i) });
  for (let d = 1; d <= daysInMonth; d++) cells.push({ day: d, muted: false, date: new Date(year, month, d) });
  while (cells.length % 7 !== 0 || cells.length < 42) {
    const n = cells.length - (startDow + daysInMonth) + 1;
    cells.push({ day: n, muted: true, date: new Date(year, month + 1, n) });
    if (cells.length >= 42) break;
  }

  const rangeEnd = to || hover;
  const inBand = (date) => {
    if (!from || !rangeEnd) return false;
    const lo = from < rangeEnd ? from : rangeEnd;
    const hi = from < rangeEnd ? rangeEnd : from;
    return date > lo && date < hi;
  };

  return (
    <div>
      <div className="month-title">{MESES[month]} {year}</div>
      <div className="dow">{DOW.map(d => <span key={d}>{d}</span>)}</div>
      <div className="grid">
        {cells.map((c, i) => {
          const isFrom = sameDay(c.date, from);
          const isTo = sameDay(c.date, to);
          const band = inBand(c.date);
          const isStart = from && rangeEnd && sameDay(c.date, from < rangeEnd ? from : rangeEnd);
          const isEnd = from && rangeEnd && sameDay(c.date, from < rangeEnd ? rangeEnd : from);
          const cellCls = ["drp-cell"];
          if ((band || isStart || isEnd) && from && rangeEnd && !sameDay(from, rangeEnd)) cellCls.push("in-range");
          if (isStart && from && rangeEnd && !sameDay(from, rangeEnd)) cellCls.push("range-start");
          if (isEnd && from && rangeEnd && !sameDay(from, rangeEnd)) cellCls.push("range-end");
          const dayCls = ["drp-day"];
          if (c.muted) dayCls.push("muted");
          if (sameDay(c.date, today)) dayCls.push("today");
          if (isFrom || isTo) dayCls.push("endpoint");
          else if (band) dayCls.push("in-band");
          return (
            <div key={i} className={cellCls.join(" ")}>
              <button className={dayCls.join(" ")}
                onClick={() => onPick(c.date)}
                onMouseEnter={() => onHover(c.date)}>
                {c.day}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function DateRangePicker({ 
  onApply, 
  initialFrom = null, 
  initialTo = null, 
  placeholder = "Rango de fechas",
  buttonType = "default" // "default" for simple button, "triggers" for the two big inputs
}) {
  const today = stripTime(new Date());
  const [open, setOpen] = useState(false);
  const [view, setView] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [from, setFrom] = useState(initialFrom);
  const [to, setTo] = useState(initialTo);
  const [hover, setHover] = useState(null);
  const [activeShortcut, setActiveShortcut] = useState(null);
  const containerRef = useRef(null);

  useEffect(() => {
    if (initialFrom && initialTo) {
      setFrom(stripTime(new Date(initialFrom)));
      setTo(stripTime(new Date(initialTo)));
    }
  }, [initialFrom, initialTo]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const pick = (date) => {
    const d = stripTime(date);
    setActiveShortcut(null);
    if (!from || (from && to)) { setFrom(d); setTo(null); setHover(null); }
    else { if (d < from) { setTo(from); setFrom(d); } else setTo(d); }
  };

  const shortcuts = [
    { key: "hoy", label: "Hoy", calc: () => [today, today] },
    { key: "ayer", label: "Ayer", calc: () => [addDays(today,-1), addDays(today,-1)] },
    { key: "7", label: "Últimos 7 días", calc: () => [addDays(today,-6), today] },
    { key: "14", label: "Últimos 14 días", calc: () => [addDays(today,-13), today] },
    { key: "30", label: "Últimos 30 días", calc: () => [addDays(today,-29), today] },
    { key: "mes", label: "Este mes", calc: () => [new Date(today.getFullYear(), today.getMonth(), 1), today] },
    { key: "prev", label: "Mes pasado", calc: () => [new Date(today.getFullYear(), today.getMonth()-1, 1), new Date(today.getFullYear(), today.getMonth(), 0)] },
    { key: "all", label: "Todo el historial", calc: () => [null, null] },
  ];

  const applyShortcut = (s) => {
    const [a, b] = s.calc();
    setFrom(a); setTo(b); setHover(null); setActiveShortcut(s.key);
    if (b) {
      setView({ year: b.getFullYear(), month: b.getMonth() });
    }
  };

  const moveMonth = (delta) => {
    let m = view.month + delta, y = view.year;
    if (m < 0) { m = 11; y--; } if (m > 11) { m = 0; y++; }
    setView({ year: y, month: m });
  };
  const next = (() => { let m = view.month + 1, y = view.year; if (m > 11) { m = 0; y++; } return { year: y, month: m }; })();

  const nights = from && to ? Math.round((to - from) / 86400000) : 0;
  const dayCount = from && to ? nights + 1 : 0;

  const apply = () => { 
    setOpen(false);
    if (onApply) {
      onApply(from ? ymd(from) : null, to ? ymd(to) : null);
    }
  };

  const getLabel = () => {
    if (!from && !to) return placeholder;
    if (from && to) return `Rango: ${fmtShort(from)} → ${fmtShort(to)}`;
    if (from) return `Desde ${fmtShort(from)}...`;
    return placeholder;
  };

  return (
    <div className="drp-wrap" ref={containerRef} style={{ position: "relative" }}>
      {buttonType === "default" ? (
        <button className="btn btn-ghost btn-sm" onClick={() => setOpen(!open)}>
          <I.Filter size={14}/> {getLabel()}
        </button>
      ) : (
        <div className="trigger-row">
          <div className={"trigger " + (open ? "is-open" : "")} onClick={() => setOpen(true)}>
            <div className="ic"><I.Calendar size={18}/></div>
            <div>
              <div className="t-label">Desde</div>
              <div className={"t-value " + (from ? "" : "empty")}>{from ? fmtLong(from) : "Selecciona fecha"}</div>
            </div>
          </div>
          <div className={"trigger " + (open ? "is-open" : "")} onClick={() => setOpen(true)}>
            <div className="ic"><I.ArrowRight size={18}/></div>
            <div>
              <div className="t-label">Hasta</div>
              <div className={"t-value " + (to ? "" : "empty")}>{to ? fmtLong(to) : "Selecciona fecha"}</div>
            </div>
          </div>
        </div>
      )}

      {open && (
        <div className="drp-panel-container">
          <div className="drp-panel">
            <div className="panel-body">
              <div className="rail">
                <div className="rail-label">Atajos</div>
                {shortcuts.map(s => (
                  <button key={s.key} className={activeShortcut === s.key ? "active" : ""} onClick={() => applyShortcut(s)}>{s.label}</button>
                ))}
              </div>

              <div className="cals">
                <div className="cals-head">
                  <button className="nav-btn" onClick={() => moveMonth(-1)}><I.ChevronLeft size={18}/></button>
                  <span style={{ fontSize: 12, fontWeight: 700, color: "var(--muted)" }}><I.Clock size={12}/> Selecciona inicio y fin</span>
                  <button className="nav-btn" onClick={() => moveMonth(1)}><I.ChevronRight size={18}/></button>
                </div>
                <div className="months">
                  <MonthGrid year={view.year} month={view.month} from={from} to={to} hover={hover} today={today} onPick={pick} onHover={(d) => !to && from && setHover(stripTime(d))}/>
                  <MonthGrid year={next.year} month={next.month} from={from} to={to} hover={hover} today={today} onPick={pick} onHover={(d) => !to && from && setHover(stripTime(d))}/>
                </div>
              </div>
            </div>

            <div className="panel-foot">
              <div className="foot-summary">
                {from && to ? (
                  <><strong>{fmtShort(from)}</strong> → <strong>{fmtShort(to)}</strong><span className="count"><I.Check size={11}/> {dayCount} {dayCount === 1 ? "día" : "días"}</span></>
                ) : from ? (
                  <>Inicio: <strong>{fmtShort(from)}</strong> · elige la fecha final</>
                ) : (
                  "Elige la fecha de inicio del rango"
                )}
              </div>
              <div className="foot-actions">
                <button className="btn btn-ghost" onClick={() => { setFrom(null); setTo(null); setHover(null); setActiveShortcut(null); }}>Limpiar</button>
                <button className="btn btn-primary" onClick={apply}><I.Check size={15}/> Aplicar rango</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
