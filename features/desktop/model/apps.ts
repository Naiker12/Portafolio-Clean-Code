import { projects } from "@/features/projects/data/catalog";

export type AppId = "about" | "cv" | "projects" | "settings" | `project:${string}`;
export const desktopApps: { id: AppId; title: string }[] = [
  { id: "about", title: "Sobre mí" },
  { id: "cv", title: "CV" },
  { id: "settings", title: "Configuración" },
  ...projects.map(project => ({ id: `project:${project.id}` as AppId, title: project.title })),
];
