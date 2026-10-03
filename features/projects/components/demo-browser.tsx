"use client";

import { useEffect, useState } from "react";
import { ExternalLink, Globe, LoaderCircle, RotateCw } from "lucide-react";

interface DemoBrowserProps { title: string; url: string; note?: string }

/** Remote frames may report load even when embedding is blocked. */
export function DemoBrowser({ title, url, note }: DemoBrowserProps) {
  const [attempt, setAttempt] = useState(0);
  const [status, setStatus] = useState<"loading" | "opened" | "slow">("loading");
  useEffect(() => {
    const timeout = setTimeout(() => setStatus(value => value === "loading" ? "slow" : value), 12000);
    return () => clearTimeout(timeout);
  }, [attempt]);
  const reload = () => { setStatus("loading"); setAttempt(value => value + 1); };
  return <div className="os-demo-browser">
    <div className="os-preview-address">
      <Globe size={16} aria-hidden="true" /><span title={url}>{url}</span>
      <button onClick={reload} aria-label={`Recargar demo de ${title}`} title="Recargar demo"><RotateCw size={16} /></button>
      <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Abrir demo en otra pestaña" title="Abrir en otra pestaña"><ExternalLink size={16} /></a>
    </div>
    <div className="os-demo-status" role="status" aria-live="polite">
      {status === "loading" ? <><LoaderCircle size={15} className="os-spinner" /> Cargando demo…</> : status === "slow" ? "La demo está tardando. Puedes recargarla o abrirla en otra pestaña." : "Vista web abierta. Si aparece vacía, usa el enlace externo."}
    </div>
    <iframe key={`${url}:${attempt}`} src={url} title={`Demo de ${title}`} onLoad={() => setStatus("opened")} onError={() => setStatus("slow")} sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads" referrerPolicy="strict-origin-when-cross-origin" />
    <details className="os-demo-help"><summary>¿La demo no se muestra?</summary><p>Algunas páginas no permiten abrirse dentro de otra web. <a href={url} target="_blank" rel="noopener noreferrer">Abrir {title} en otra pestaña <ExternalLink size={13} /></a></p>{note && <p>{note}</p>}</details>
  </div>;
}
