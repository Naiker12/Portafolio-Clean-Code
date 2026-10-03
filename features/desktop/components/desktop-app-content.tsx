import { experiences } from "@/features/portfolio/data/experiences";
import { CvApp } from "@/features/cv/cv-app";
import { SettingsApp } from "@/features/preferences/settings-app";
import { ProfileAvatar } from "@/components/profile-avatar";
import { profile } from "@/features/portfolio/data/profile";
import { ArrowRight, ExternalLink } from "lucide-react";
import { ProjectsApp } from "@/features/projects/components/projects-app";
import { skillCategories } from "@/features/portfolio/data/skillCategories";
import { socialLinks } from "@/features/portfolio/data/socialLinks";

import type { AppId } from "../model/apps";



interface AppContentProps {
  app: AppId;
  open: (id: AppId) => void;


}

export function DesktopAppContent({ app, open }: AppContentProps) {
  if (app.startsWith("project:")) return <ProjectsApp projectId={app.slice(8)} />;
  if (app === "about") return (
    <div className="os-about">
      <div className="os-about-heading"><ProfileAvatar className="os-profile-mark" /><div><span className="os-content-eyebrow">SOBRE MÍ</span><h3>Hola, soy <em>{profile.givenNames}</em></h3><p className="os-profile-family-name">{profile.familyNames}</p><p>{profile.role}</p></div></div>
      <p className="os-about-description">Transformo ideas en sistemas digitales. Mi enfoque es el desarrollo backend, las arquitecturas escalables y el código limpio.</p>
      <div className="os-skill-chips">{skillCategories.flatMap(category => category.skills).slice(0, 13).map(skill => <span key={skill}>{skill}</span>)}</div>
      <section className="os-about-experience"><h3>Experiencia y enfoque</h3>{experiences.map(item => <article key={item.role}><strong>{item.role}</strong><small>{item.company} · {item.period}</small><p>{item.description}</p></article>)}</section><div className="os-about-actions"><button className="os-primary" onClick={() => open("projects")}>Explorar proyectos <ArrowRight size={17} /></button><button className="os-secondary" onClick={() => open("cv")}>Ver mi CV</button></div>
      <div className="os-social-links">{socialLinks.map(link => <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<ExternalLink size={13} /></a>)}</div>
    </div>
  );
  if (app === "projects") return <ProjectsApp />;
  if (app === "cv") return <CvApp />;
  return <SettingsApp />;
}


