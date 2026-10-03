import { ApplicationIcon } from "@/features/desktop/components/application-icon";
import { Search, X } from "lucide-react";
import { desktopApps, type AppId } from "@/features/desktop/model/apps";
import type { WindowState } from "../model/windows";

interface ActivitiesProps {
  state: WindowState;
  search: string;
  setSearch: (value: string) => void;
  open: (id: AppId) => void;
  close: (id: AppId) => void;
  dismiss: () => void;
}
const summaries: Record<string, string> = { about: "Perfil, tecnologías y contacto", cv: "Currículum de Naiker", settings: "Personaliza tu escritorio" };

export function ActivitiesOverview({ state, search, setSearch, open, close, dismiss }: ActivitiesProps) {
  const visible = state.windows.filter(window => desktopApps.find(app => app.id === window.id)!.title.toLocaleLowerCase("es").includes(search.toLocaleLowerCase("es")));
  return (
    <section className="os-launcher os-activities" aria-label="Ventanas abiertas">
      <div className="os-launcher-search"><Search size={20} /><input autoFocus value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar ventanas…" aria-label="Buscar ventanas" /><button aria-label="Cerrar actividades" onClick={dismiss}><X size={18} /></button></div>
      <div className="os-activities-grid">{visible.map(window => {
        const app = desktopApps.find(item => item.id === window.id)!;
        return <article key={window.id} className={state.focused === window.id ? "os-activity is-focused" : "os-activity"}>
          <button className="os-activity-open" onClick={() => open(window.id)} aria-label={`Continuar en ${app.title}`}><ApplicationIcon id={app.id} /><strong>{app.title}</strong><span>{summaries[window.id] ?? "Vista previa, tecnologías y código"}</span><small>{window.minimized ? "Minimizada · Restaurar" : "Continuar"}</small></button>
          <button className="os-activity-close" aria-label={`Cerrar ${app.title} desde actividades`} onClick={() => close(window.id)}><X size={17} /></button>
        </article>;
      })}</div>
      {visible.length === 0 && <p>{state.windows.length ? "No se encontraron ventanas." : "Todavía no hay ventanas abiertas. Abre una aplicación desde el dock."}</p>}
    </section>
  );
}

