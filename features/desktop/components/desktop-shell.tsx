"use client";
import { useSessionState } from "@/hooks/use-session-state";
import { restoreWindows } from "@/features/window-manager/model/restore-windows";
import type { WindowAction } from "@/features/window-manager/model/windows";
import { projects } from "@/features/projects/data/catalog";
import { ApplicationIcon } from "./application-icon";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Code2, Grid3X3, Search, Terminal, X, Settings, LockKeyhole, LogOut, RotateCcw, Monitor, PanelsTopLeft } from "lucide-react";
import { WindowFrame } from "@/features/window-manager/components/window-frame";
import { ActivitiesOverview } from "@/features/window-manager/components/activities-overview";
import { initialWindows, windowReducer } from "@/features/window-manager/model/windows";
import { Wallpaper } from "./wallpaper";
import { DesktopAppContent } from "./desktop-app-content";
import { usePreferences } from "@/features/preferences/use-preferences";
import { useClock } from "../hooks/use-clock";
import { desktopApps, type AppId } from "../model/apps";
import "@/features/window-manager/windows.css";

const restorePins = (value: unknown): AppId[] => Array.isArray(value) ? Array.from(new Set(value.filter(id => desktopApps.some(app => app.id === id)))) : ["about", "cv"];
const restoreSavedWindows = (value: unknown) => restoreWindows(value, desktopApps.map(app => app.id), { width: innerWidth, height: innerHeight });
export function DesktopShell({ onSessionAction }: { onSessionAction: (action: "lock" | "logout" | "restart") => void }) {
  const [systemMenu, setSystemMenu] = useState(false);
  const [pins, setPins] = useSessionState<AppId[]>("desktop-pins", ["about", "cv"], restorePins);
  const togglePin = (id: AppId) => setPins(value => value.includes(id) ? value.filter(item => item !== id) : [...value, id]);
  const [windows, setWindows] = useSessionState("windows", initialWindows, restoreSavedWindows);
  const dispatch = (action: WindowAction) => setWindows(state => windowReducer(state, action));
  const [activities, setActivities] = useSessionState("activities", false);
  const [windowSearch, setWindowSearch] = useSessionState("window-search", "");
  const [launcher, setLauncher] = useSessionState("launcher", false);
  const [appFilter, setAppFilter] = useSessionState("app-filter", "all");
  const [search, setSearch] = useSessionState("search", "");
  const [notification, setNotification] = useState(true);
  const { preferences } = usePreferences();
  const desktopTitle = useRef<HTMLHeadingElement>(null);
  const launcherInput = useRef<HTMLInputElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);
  const { time, day } = useClock();
  const visibleApps = desktopApps.filter(item => {
    const project = projects.find(project => `project:${project.id}` === item.id);
    if (appFilter !== "all" && project?.category !== appFilter) return false;
    return `${item.title} ${project?.tech.join(" ") ?? ""}`.toLocaleLowerCase("es").includes(search.trim().toLocaleLowerCase("es"));
  });

  useEffect(() => { desktopTitle.current?.focus(); }, []);
  useEffect(() => {
    if (launcher) launcherInput.current?.focus();

  }, [launcher]);

  useEffect(() => {
    const resize = () => setWindows(state => windowReducer(state, { type: "resize", bounds: { width: innerWidth, height: innerHeight } }));
    globalThis.addEventListener("resize", resize);
    return () => globalThis.removeEventListener("resize", resize);
  }, [setWindows]);

  const open = (id: AppId) => {
    if (id === "projects") { setLauncher(true); setActivities(false); return; }
    if (!(document.activeElement instanceof HTMLElement) || !document.activeElement.closest(".os-window")) {
      previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    dispatch({ type: "open", id, bounds: { width: innerWidth, height: innerHeight } }); setLauncher(false); setActivities(false);
  };
  const toggleLauncher = () => {
    previousFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActivities(false); setLauncher(value => !value);
  };

  return (
    <main className={`os-desktop os-desktop--${preferences.wallpaper}`} onKeyDown={event => {
      if (event.key === "Escape") setSystemMenu(false);
      if (event.altKey && windows.focused && (event.key === "ArrowLeft" || event.key === "ArrowRight")) { event.preventDefault(); dispatch({type:"snap",id:windows.focused,side:event.key === "ArrowLeft" ? "left" : "right"}); }
      if (event.key === "Escape" && (launcher || activities)) { setLauncher(false); setActivities(false); previousFocus.current?.focus(); }
    }}>
      <Wallpaper />
      <header className="os-topbar"><button aria-expanded={activities} onClick={() => { previousFocus.current = document.activeElement as HTMLElement; setLauncher(false); setActivities(value => !value); }}><PanelsTopLeft size={15} /> Actividades</button><span className="os-topbar-title"><Monitor size={14} /> Naiker OS</span><div className="os-topbar-right"><span>{day} · {time}</span><button aria-label="Controles del sistema" aria-expanded={systemMenu} aria-controls="os-system-menu" onClick={() => setSystemMenu(value => !value)}><Settings size={16} /><ChevronDown size={14} /></button></div></header>
      {systemMenu && <><button className="os-system-backdrop" aria-label="Cerrar controles del sistema" onClick={() => setSystemMenu(false)} /><section id="os-system-menu" className="os-system-menu" aria-label="Controles del sistema"><strong>Naiker OS</strong><small>Sesión de visitante · Portafolio interactivo</small><button onClick={() => {open("settings");setSystemMenu(false);}}><Settings size={17} /> Configuración</button><button onClick={() => {setLauncher(false);setActivities(false);setWindows(state => ({...state,focused:null,windows:state.windows.map(entry => ({...entry,minimized:true}))}));setSystemMenu(false);}}><Monitor size={17} /> Mostrar escritorio</button><button onClick={() => onSessionAction("lock")}><LockKeyhole size={17} /> Bloquear pantalla</button><button onClick={() => {setWindows(initialWindows);setLauncher(false);setActivities(false);setSearch("");setAppFilter("all");onSessionAction("logout");}}><LogOut size={17} /> Cerrar sesión de visitante</button><button onClick={() => {setWindows(initialWindows);setLauncher(false);setActivities(false);setSearch("");setAppFilter("all");onSessionAction("restart");}}><RotateCcw size={17} /> Reiniciar escritorio</button><small>Alt + ← / →: dividir la ventana activa.</small></section></>}
      {preferences.shortcuts && <nav className="os-shortcuts" aria-label="Aplicaciones del escritorio">{desktopApps.filter(item => pins.includes(item.id)).map(item => <button key={item.id} onClick={() => open(item.id)}><ApplicationIcon id={item.id} /><span>{item.title}</span></button>)}</nav>}
      <div className="os-desktop-hero"><span className="os-desktop-kicker"><span /> DISPONIBLE PARA CREAR</span><h1 ref={desktopTitle} tabIndex={-1}>Naiker<span>.</span></h1><p>Ingeniero de Software</p><small>Desarrollo backend <span>·</span> Clean Code</small></div>
      <div className="os-wallpaper-signature"><Code2 size={32} /><span>naiker.codes</span></div>

      <div className="os-window-layer" inert={launcher || activities}>
        {windows.windows.map((entry, index) => <WindowFrame key={entry.id} window={entry} focused={windows.focused === entry.id} suspended={launcher || activities} layer={index} dispatch={dispatch} pinned={pins.includes(entry.id)} onPin={() => togglePin(entry.id)} onDismiss={() => {
          const next = windows.windows.filter(item => item.id !== entry.id && !item.minimized).at(-1);
          if (!next) previousFocus.current?.focus();
        }}><DesktopAppContent app={entry.id} open={open} /></WindowFrame>)}
      </div>
      {activities && <ActivitiesOverview state={windows} search={windowSearch} setSearch={setWindowSearch} open={open} close={id => dispatch({ type: "close", id })} dismiss={() => { setActivities(false); previousFocus.current?.focus(); }} />}
      {launcher && <section className="os-launcher" aria-label="Lanzador de aplicaciones"><div className="os-launcher-search"><Search size={20} /><input ref={launcherInput} value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar una aplicación…" aria-label="Buscar aplicación" /><button aria-label="Cerrar actividades" onClick={() => { setLauncher(false); previousFocus.current?.focus(); }}><X size={18} /></button></div><div className="os-launcher-filters" role="group" aria-label="Filtrar aplicaciones">{[{id:"all",label:"Todas"},{id:"web",label:"Web"},{id:"mobile",label:"Móvil"},{id:"desktop",label:"Escritorio"}].map(filter => <button key={filter.id} aria-pressed={appFilter === filter.id} onClick={() => setAppFilter(filter.id)}>{filter.label}</button>)}</div>{[{ title: "Tu espacio", apps: visibleApps.filter(item => !item.id.startsWith("project:")) }, { title: "Aplicaciones desarrolladas", apps: visibleApps.filter(item => item.id.startsWith("project:")) }].filter(group => group.apps.length > 0).map(group => <section className="os-application-group" key={group.title}><h2>{group.title}</h2><div className="os-launcher-grid">{group.apps.map(item => <div className="os-launcher-app" key={item.id}><button onClick={() => open(item.id)}><ApplicationIcon id={item.id} />{item.title}</button><button className="os-pin-app" aria-pressed={pins.includes(item.id)} aria-label={`${pins.includes(item.id) ? "Quitar" : "Añadir"} ${item.title} ${pins.includes(item.id) ? "del" : "al"} escritorio`} onClick={() => togglePin(item.id)}>{pins.includes(item.id) ? "En el escritorio ✓" : "+ Escritorio"}</button></div>)}</div></section>)}{visibleApps.length === 0 && <p>No se encontraron aplicaciones.</p>}<p>Cada proyecto es una aplicación. Ábrelo para explorar su vista previa y sus tecnologías.</p></section>}
      {notification && !launcher && !activities && windows.windows.length === 0 && <aside className="os-notification" aria-label="Bienvenida"><span className="os-notification-icon"><Terminal size={23} /></span><div><strong>Bienvenido a Naiker OS</strong><p>Abre una aplicación para explorar mi trabajo.</p></div><button aria-label="Cerrar bienvenida" onClick={() => setNotification(false)}><X size={16} /></button></aside>}
      <footer className="os-dock"><button className={launcher ? "os-dock-launcher is-active" : "os-dock-launcher"} aria-label="Mostrar aplicaciones" aria-expanded={launcher} onClick={toggleLauncher}><Grid3X3 size={26} /></button><span className="os-dock-divider" /><nav aria-label="Barra de aplicaciones">{desktopApps.filter(item => !item.id.startsWith("project:") || windows.windows.some(entry => entry.id === item.id)).map(item => <button key={item.id} title={item.title} aria-label={item.title} className={`${windows.windows.some(entry => entry.id === item.id) ? "is-open" : ""} ${windows.focused === item.id ? "is-active" : ""}`} onClick={() => open(item.id)}><ApplicationIcon id={item.id} /><span className="os-dock-tooltip">{item.title}</span></button>)}</nav><span className="os-dock-divider" /><div className="os-dock-brand">naiker.codes</div></footer>
    </main>
  );
}










