"use client";
import { useSessionState } from "@/hooks/use-session-state";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, LoaderCircle } from "lucide-react";
import { ProfileAvatar } from "@/components/profile-avatar";
import { profile } from "@/features/portfolio/data/profile";
import { DesktopShell } from "@/features/desktop/components/desktop-shell";
import { Wallpaper } from "@/features/desktop/components/wallpaper";
import { usePreferences, accents } from "@/features/preferences/use-preferences";
import type { CSSProperties } from "react";
import { useClock } from "@/features/desktop/hooks/use-clock";
import "./session.css";
import "@/features/desktop/system-controls.css";

type SessionStage = "welcome" | "unlocking" | "desktop";

export function NaikerSession() {
  const { preferences } = usePreferences();
  const [entered, setEntered] = useSessionState("entered", false);
  const [stage, setStage] = useState<SessionStage>("welcome");
  const [dots, setDots] = useState(0);
  const entering = useRef(false);
  const { time, day } = useClock();
  useEffect(() => {
    if (stage !== "unlocking") return;
    const reduced = preferences.reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const typing = setInterval(() => setDots(value => Math.min(value + 1, 6)), 70);
    const enter = setTimeout(() => { setEntered(true); setStage("desktop"); }, reduced ? 50 : 650);
    return () => { clearInterval(typing); clearTimeout(enter); };
  }, [stage, preferences.reducedMotion, setEntered]);
  const unlock = () => {
    if (entering.current) return;
    entering.current = true;
    setStage("unlocking");
  };
  return (
    <div className="naiker-os" data-theme={preferences.colorMode} data-motion={preferences.reducedMotion ? "reduced" : "full"} data-dock={preferences.dockSize} style={{ "--os-orange": accents[preferences.accent] } as CSSProperties}>
      {entered || stage === "desktop" ? <DesktopShell onSessionAction={action => {
        if (action !== "lock") { try { Object.keys(sessionStorage).filter(key => key.startsWith("naiker-scroll:")).forEach(key => sessionStorage.removeItem(key)); } catch {} }
        setEntered(false); setStage("welcome"); setDots(0); entering.current = false;
      }} /> : (
        <main className="os-welcome" aria-label="Bienvenida a Naiker OS">
          <Wallpaper blurred /><div className="os-welcome-shade" />
          <header className="os-welcome-clock"><time className="os-lock-time">{time}</time><span className="os-lock-date">{day}</span></header>
          <div className={`os-login ${stage === "unlocking" ? "os-login--entering" : ""}`}>
            <ProfileAvatar className="os-avatar" priority />
            <h1 className="os-login-full-name"><span>{profile.givenNames}</span>{" "}<span>{profile.familyNames}</span></h1><p className="os-welcome-subtitle">Bienvenido a mi espacio</p><p className="os-welcome-role">{profile.role}</p>
            <div className="os-login-action">
              {stage === "welcome" ? <button className="os-enter-button" onClick={unlock}>Entrar <ArrowRight size={19} /></button> : <div className="os-password-animation" aria-hidden="true">{Array.from({ length: 6 }, (_, index) => <span key={index} className={index < dots ? "is-typed" : ""} />)}<i /></div>}
              <p className="os-entry-status" role="status" aria-live="polite">{stage === "unlocking" ? <><LoaderCircle size={17} className="os-spinner" /> Preparando tu escritorio…</> : "Acceso de visitante"}</p>
            </div>
          </div>
          <footer className="os-welcome-footer"><span>Naiker <strong>OS</strong></span></footer>
        </main>
      )}
    </div>
  );
}




