import Image from "next/image";
import { getAssetPath } from "@/lib/assets";
import type { AppId } from "../model/apps";
import "../application-icons.css";

/** Original vector artwork, shared by all desktop surfaces. */
export function ApplicationIcon({ id, compact = false }: { id: AppId; compact?: boolean }) {
  const name = id.replace("project:", "");
  const originals: Record<string, string> = { mediadock: "/icons/apps/mediadock.svg", "sentinel-ai": "/icons/apps/sentinel.svg", "sparta-agent": "/icons/apps/sparta.png", autem: "/icons/apps/autem.svg", "dragonball-api": "/icons/apps/dragonball.png" };
  if (originals[name]) return <span className={`os-app-icon os-original-icon os-repository-icon ${compact ? "os-original-icon--compact" : ""}`} aria-hidden="true"><Image src={getAssetPath(originals[name])} alt="" width={80} height={80} unoptimized /></span>;
  const art: Record<string, React.ReactNode> = {
    "sparta-agent": <><path d="M17 23q15-21 30 0v23H17z" fill="#ffe6cf" /><path d="M24 23h16v8l-8 8-8-8z" fill="#87362f" /><path d="M32 10v11M21 14l3 8M43 14l-3 8" stroke="#ffab6e" strokeWidth="4" strokeLinecap="round" /><path d="M23 42l9 9 9-9" fill="none" stroke="#ffab6e" strokeWidth="3" /><path d="M28 28h8" stroke="#ffdab3" strokeWidth="2" /></>,
    autem: <><path d="M11 48l21-34 21 34H42L32 31 22 48z" fill="#f1e7cd" /><path d="M28 42h8v10h-8z" fill="#c6b789" /><path d="M12 53h40" stroke="#c6b789" strokeWidth="2" strokeLinecap="round" /></>,
    geomaps: <><path d="M12 19l13-5 14 6 13-5v33l-13 5-14-6-13 5z" fill="#d8f2df" /><path d="M25 15v32M39 20v32" stroke="#70b8a0" strokeWidth="2" /><path d="M32 17c-15 0-15 15 0 28 15-13 15-28 0-28z" fill="#207b83" /><circle cx="32" cy="27" r="5" fill="#c8f4ee" /></>,
    about: <><circle cx="32" cy="23" r="9" fill="#fff4e7" /><path d="M16 49c0-17 32-17 32 0" fill="#fff4e7" /></>,
    cv: <><path d="M19 11h20l9 10v32H19z" fill="#fff" /><path d="M39 11v11h9" fill="#f69c55" /><path d="M25 29h15M25 36h15M25 43h10" stroke="#64748b" strokeWidth="3" strokeLinecap="round" /></>,
    settings: <><path d="M18 20h28M18 32h28M18 44h28" stroke="#e7edf4" strokeWidth="4" strokeLinecap="round" /><circle cx="27" cy="20" r="5" fill="#ff9c54" /><circle cx="39" cy="32" r="5" fill="#b5a6ff" /><circle cx="25" cy="44" r="5" fill="#8edbd7" /></>,
    "coca-cola": <><path d="M28 12h8v8l4 8v23c0 5-16 5-16 0V28l4-8z" fill="#fff5ed" /><path d="M24 32h16v13H24z" fill="#d92738" /><path d="M28 15h8" stroke="#d92738" strokeWidth="3" /><path d="M28 37c5-5 4 6 8 0" fill="none" stroke="white" strokeWidth="2" /></>,
    "portal-datos-abiertos": <><rect x="12" y="13" width="40" height="38" rx="6" fill="#eaf1ff" /><path d="M12 23h40" stroke="#bbcaf4" strokeWidth="2" /><circle cx="18" cy="18" r="2" fill="#7898ed" /><path d="M20 43V35M29 43V29M38 43V32M46 43V26" stroke="#5d6de5" strokeWidth="5" strokeLinecap="round" /></>,
    "dragonball-api": <><circle cx="32" cy="32" r="21" fill="#ffae22" stroke="#ffe194" strokeWidth="2" />{[[24,25],[40,25],[24,39],[40,39]].map(([x,y]) => <path key={`${x}-${y}`} d="M0-5 1.5-1.5 5-1 2 1.5 3 5 0 3-3 5-2 1.5-5-1-1.5-1.5z" transform={`translate(${x} ${y})`} fill="#c94224" />)}<path d="M20 17q7-6 16-4" stroke="#fff7cb" strokeWidth="3" fill="none" strokeLinecap="round" /></>,
    "call-connect": <><rect x="12" y="17" width="30" height="27" rx="8" fill="#efeaff" /><path d="M42 25l11-6v24l-11-6z" fill="#c7b6ff" /><path d="M20 48q10 8 21 0" stroke="#95f2d0" strokeWidth="3" fill="none" strokeLinecap="round" /><circle cx="26" cy="30" r="6" fill="#9270dc" /></>,
    "mercado-express": <><path d="M17 24h32l-4 22H21z" fill="#eafff2" /><path d="M25 25l7-13 8 13" fill="none" stroke="#b8f0d0" strokeWidth="4" strokeLinecap="round" /><path d="M27 32v7M37 32v7" stroke="#319a70" strokeWidth="3" strokeLinecap="round" /><path d="M11 30h5M9 37h7" stroke="#ffd987" strokeWidth="3" strokeLinecap="round" /></>,
    gallery: <><rect x="13" y="15" width="36" height="34" rx="6" transform="rotate(-9 32 32)" fill="#d1beff" /><rect x="17" y="19" width="36" height="32" rx="5" fill="#fff2f9" /><circle cx="42" cy="28" r="5" fill="#f5ac65" /><path d="M19 45l10-13 8 8 5-5 9 10z" fill="#9368c6" /></>,
    "tienda-virtual": <><path d="M17 26h30v26H17z" fill="#fff0df" /><path d="M15 14h34l4 13H11z" fill="#ffbc69" /><path d="M20 14l-2 13M32 14v13M44 14l2 13" stroke="#ffefd3" strokeWidth="5" /><path d="M25 36h14v16H25z" fill="#397f9c" /><path d="M11 27q5 9 10 0 5 9 11 0 5 9 10 0 5 9 11 0" fill="#ffbc69" /></>,
  };
  return <span className={`os-app-icon os-original-icon os-original-icon--${name} ${compact ? "os-original-icon--compact" : ""}`} aria-hidden="true"><svg viewBox="0 0 64 64" fill="none">{art[name] ?? art.settings}</svg></span>;
}


