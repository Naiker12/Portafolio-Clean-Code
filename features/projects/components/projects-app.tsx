"use client";

import { useSessionState } from "@/hooks/use-session-state";
import { useRef, useState } from "react";
import Image from "next/image";
import { DemoBrowser } from "./demo-browser";
import { ProjectCapture } from "./project-capture";
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Folder, Globe, Monitor, Search, Smartphone } from "lucide-react";
import { projects } from "../data/catalog";
import type { Project } from "../model/project";
import "../projects.css";

const categories = [
  { id: "all", label: "Todos", icon: Folder },
  { id: "web", label: "Web", icon: Globe },
  { id: "mobile", label: "Móvil", icon: Smartphone },
  { id: "desktop", label: "Escritorio", icon: Monitor },
] as const;
type Category = typeof categories[number]["id"];

function externalAction(project: Project) {
  if (project.demo) return { href: project.demo.url, label: project.demo.label };
  if (project.link.includes("github.com")) return null;
  return project.link.includes("youtube.com") ? { href: project.link, label: "Ver presentación" } : null;
}

export function ProjectsApp({ projectId }: { projectId?: string }) {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState<Project | null>(() => projects.find(item => item.id === projectId) ?? null);
  const [view, setView] = useSessionState<"preview" | "details" | "demo">(`project-view:${projectId ?? "browser"}`, "preview");
  const heading = useRef<HTMLHeadingElement>(null);
  const cardRefs = useRef(new Map<string, HTMLButtonElement>());
  const filtered = projects.filter(project => (category === "all" || project.category === category) && `${project.title} ${project.tech.join(" ")}`.toLocaleLowerCase("es").includes(query.trim().toLocaleLowerCase("es")));
  const open = (project: Project) => {
    setSelected(project); setView("preview");
    requestAnimationFrame(() => heading.current?.focus());
  };
  const back = () => {
    const id = selected?.id;
    setSelected(null);
    requestAnimationFrame(() => { if (id) cardRefs.current.get(id)?.focus(); });
  };

  if (selected) {
    const action = externalAction(selected);
    return <div className="os-project-detail">
      <div className="os-project-detail-toolbar">{!projectId && <button className="os-secondary" onClick={back}><ArrowLeft size={16} /> Volver a proyectos</button>}<h3 tabIndex={-1} ref={heading}>{selected.title}</h3></div>
      <div className="os-project-view-controls" role="group" aria-label="Vista del proyecto"><button aria-pressed={view === "preview"} onClick={() => setView("preview")}>Vista previa</button><button aria-pressed={view === "details"} onClick={() => setView("details")}>Detalles</button>{selected.demo && <button aria-pressed={view === "demo"} onClick={() => setView("demo")}><Globe size={15} /> Abrir demo aquí</button>}</div>
      <div className="os-project-detail-layout">
        <div className="os-project-preview">
          {view === "demo" && selected.demo ? <DemoBrowser key={selected.demo.url} title={selected.title} url={selected.demo.url} note={selected.demo.note} /> : view === "preview" ? <><div className="os-preview-address"><Globe size={16} /><span>{selected.title}</span><small>{selected.imageKind === "presentation" ? "Presentación visual" : "Captura del proyecto"}</small></div><ProjectCapture project={selected} /><p className="os-preview-note">{selected.imageKind === "presentation" ? "Portada ilustrada del proyecto. Consulta el repositorio para explorar su implementación." : "Explora la captura. Los enlaces de demo y código se abren en otra pestaña."}</p></> : <div className="os-project-written-details"><span className="os-content-eyebrow">ACERCA DEL PROYECTO</span><h4>{selected.title}</h4><p>{selected.description}</p><h4>Funciones principales</h4><ul className="os-project-features">{(selected.features ?? [selected.description]).map(feature => <li key={feature}>{feature}</li>)}</ul><h4>Tecnologías utilizadas</h4><div className="os-skill-chips">{selected.tech.map(tech => <span key={tech}>{tech}</span>)}{selected.tech.length === 0 && <p>Tecnologías pendientes de verificación.</p>}</div><p className="os-project-type">Aplicación {categories.find(item => item.id === selected.category)?.label.toLocaleLowerCase("es")}</p></div>}
        </div>
        <aside className="os-project-info"><span className="os-content-eyebrow">{categories.find(item => item.id === selected.category)?.label}</span><h3>{selected.title}</h3><p>{selected.description}</p><div className="os-skill-chips">{selected.tech.map(tech => <span key={tech}>{tech}</span>)}{selected.tech.length === 0 && <p>Tecnologías pendientes de verificación.</p>}</div><div className="os-project-links">{action && <a className="os-primary" href={action.href} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} />{action.label}</a>}{!selected.repositoryStatus && <a className={action ? "os-secondary" : "os-primary"} href={selected.github} target="_blank" rel="noopener noreferrer"><Code2 size={17} /> Ver código</a>}</div>{selected.repositories && <div className="os-project-links">{selected.repositories.map(repo => <a className="os-secondary" key={repo.url} href={repo.url} target="_blank" rel="noopener noreferrer"><Code2 size={16} />{repo.label}</a>)}</div>}<p className="os-project-availability">{selected.demo?.note ?? (selected.demo ? "Demo pública verificada. Se abre en otra pestaña." : "Sin demo web pública verificada. Consulta el código o la presentación disponible.")}</p>{selected.repositoryStatus && <p className="os-project-availability">{selected.repositoryStatus}</p>}</aside>
      </div>
    </div>;
  }

  return <div className="os-project-browser">
    <div className="os-project-browser-toolbar"><div><Folder size={17} /><span>Inicio <span aria-hidden="true">/</span> Proyectos</span></div><label className="os-project-search"><Search size={17} /><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Buscar proyecto o tecnología…" aria-label="Buscar proyecto o tecnología" /></label></div>
    <div className="os-project-browser-layout"><nav className="os-project-categories" aria-label="Categorías de proyectos">{categories.map(item => <button key={item.id} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}><item.icon size={18} />{item.label}</button>)}</nav>
      <div className="os-project-results"><div className="os-project-results-heading"><h3>Mis proyectos</h3><span role="status">{filtered.length} {filtered.length === 1 ? "proyecto" : "proyectos"}</span></div><div className="os-project-grid">{filtered.map(project => <button key={project.id} ref={element => { if (element) cardRefs.current.set(project.id, element); else cardRefs.current.delete(project.id); }} onClick={() => open(project)} aria-label={`Abrir ${project.title}`}><div className="os-project-image"><Image src={project.image} alt="" fill sizes="(max-width: 640px) 90vw, 350px" /></div><div className="os-project-caption"><span>{project.title}<small>{project.tech.slice(0, 3).join(" · ")}</small></span><ArrowRight size={16} /></div></button>)}</div>{filtered.length === 0 && <div className="os-project-empty"><Search size={28} /><p>No encontramos proyectos con estos filtros.</p><button className="os-secondary" onClick={() => { setQuery(""); setCategory("all"); }}>Limpiar filtros</button></div>}</div>
    </div>
  </div>;
}






