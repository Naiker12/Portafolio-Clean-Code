import { Database, Facebook, Instagram, Layout, Linkedin, Palette, Settings, Youtube } from "lucide-react";
import type { SkillCategory, SocialLink } from "@/features/portfolio/model/content";

const socialIcons = { Facebook, Instagram, Linkedin, Youtube };
const skillIcons = { Layout, Database, Settings, Palette };

export function SocialIcon({ name }: { name: SocialLink["icon"] }) {
  const Icon = socialIcons[name];
  return <Icon />;
}

export function SkillIcon({ name }: { name: SkillCategory["icon"] }) {
  const Icon = skillIcons[name];
  return <Icon className="w-5 h-5" />;
}
