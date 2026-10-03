"use client";
import { useSessionState } from "@/hooks/use-session-state";
import { Accessibility, Check, Image, Palette, RotateCcw } from "lucide-react";
import { usePreferences } from "./use-preferences";
import "./settings.css";

export function SettingsApp() {
  const { preferences: p, update, reset } = usePreferences();
  const [panel, setPanel] = useSessionState("settings-panel", "appearance");
  return <div className="os-settings-layout"><nav className="os-settings-sidebar" aria-label="Secciones de configuración">{[{ id: "appearance", label: "Apariencia", icon: Palette }, { id: "background", label: "Fondo", icon: Image }, { id: "accessibility", label: "Accesibilidad", icon: Accessibility }].map(item => <button key={item.id} aria-pressed={panel === item.id} onClick={() => setPanel(item.id)}><item.icon size={19} />{item.label}</button>)}</nav><div className="os-settings-app">
    <span className="os-content-eyebrow">TU ESPACIO</span><h3>{panel === "appearance" ? "Apariencia" : panel === "background" ? "Fondo de escritorio" : "Accesibilidad"}</h3><p>Un escritorio a tu manera.</p>
    <section hidden={panel !== "appearance"}><h4>Modo de color</h4><div className="os-color-modes">{(["light", "dark"] as const).map(mode => <button key={mode} aria-pressed={p.colorMode === mode} onClick={() => update({ colorMode: mode })}><span className={`os-color-mode-preview os-color-mode-preview--${mode}`}><i /><i /><i /></span>{mode === "light" ? "Claro" : "Oscuro"}{p.colorMode === mode && <Check size={15} />}</button>)}</div></section>
    <section hidden={panel === "accessibility"}><h4>Fondo de escritorio</h4><div className="os-setting-wallpapers">{(["ubuntu", "night", "minimal"] as const).map((value, i) => <button key={value} aria-pressed={p.wallpaper === value} onClick={() => update({ wallpaper: value })}><span className={`os-setting-preview os-setting-preview--${value}`} /><span>{["Ubuntu", "Noche", "Minimal"][i]}{p.wallpaper === value && <Check size={16} />}</span></button>)}</div></section>
    <section hidden={panel !== "appearance"}><h4>Color de acento</h4><div className="os-setting-accents">{(["orange", "purple", "blue", "green"] as const).map((value, i) => <button key={value} data-color={value} aria-label={["Naranja", "Morado", "Azul", "Verde"][i]} aria-pressed={p.accent === value} onClick={() => update({ accent: value })}>{p.accent === value && <Check size={18} />}</button>)}</div></section>
    <section hidden={panel === "background"}><h4>Escritorio y accesibilidad</h4><label className="os-setting-row"><span>Tamaño de la barra de aplicaciones</span><select value={p.dockSize} onChange={e => update({ dockSize: e.target.value as typeof p.dockSize })}><option value="small">Pequeño</option><option value="medium">Mediano</option><option value="large">Grande</option></select></label><label className="os-setting-row"><span>Mostrar accesos en el escritorio</span><input type="checkbox" checked={p.shortcuts} onChange={e => update({ shortcuts: e.target.checked })} /></label><label className="os-setting-row"><span>Reducir animaciones<small>Entrada más rápida y movimientos suaves desactivados.</small></span><input type="checkbox" checked={p.reducedMotion} onChange={e => update({ reducedMotion: e.target.checked })} /></label></section>
    <footer><p>Las preferencias se guardan en este navegador cuando su almacenamiento está disponible.</p><button className="os-secondary" onClick={reset}><RotateCcw size={15} />Restablecer apariencia</button></footer>
  </div></div>;
}



