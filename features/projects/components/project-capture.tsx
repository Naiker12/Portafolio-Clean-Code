"use client";
import { useSessionState } from "@/hooks/use-session-state";
import { useRef, useState } from "react";
import Image from "next/image";
import { Expand, X } from "lucide-react";
import type { Project } from "../model/project";

export function ProjectCapture({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);
  const [index, setIndex] = useSessionState(`capture:${project.id}`, 0);
  const gallery = project.gallery ?? [{ image: project.image, label: "Vista principal" }];
  const active = gallery[index] ?? gallery[0];
  const dialog = useRef<HTMLDialogElement>(null);
  return <><div className="os-project-full-image"><Image src={active.image} alt={`Vista previa de ${project.title}`} fill sizes="(max-width: 640px) 95vw, 700px" /><button className="os-capture-expand" onClick={() => { setExpanded(true); dialog.current?.showModal(); }}><Expand size={16} />{project.imageKind === "presentation" ? "Ampliar portada" : "Ampliar captura"}</button></div>{gallery.length > 1 && <nav className="os-capture-gallery" aria-label="Capturas del proyecto">{gallery.map((capture, i) => <button key={capture.label} aria-pressed={index === i} onClick={() => setIndex(i)}><Image src={capture.image} alt="" width={110} height={65} unoptimized />{capture.label}</button>)}</nav>}<dialog aria-label={`Captura de ${project.title}`} ref={dialog} className="os-capture-dialog" onClose={() => setExpanded(false)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}><header><strong>{project.title}</strong><button autoFocus aria-label="Cerrar captura ampliada" onClick={() => dialog.current?.close()}><X size={20} /></button></header>{expanded && <Image src={active.image} alt={`Captura ampliada de ${project.title}`} sizes="95vw" style={{ width: "100%", height: "auto" }} />}<p>{project.imageKind === "presentation" ? "Portada ilustrada del proyecto" : "Captura del proyecto"}</p></dialog></>;
}



