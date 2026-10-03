export interface Experience {
  company: string;
  role: string;
  period: string;
  description: string;
  skills: string[];
  color: string;
}

export interface SocialLink {
  icon: "Facebook" | "Instagram" | "Linkedin" | "Youtube";
  href: string;
  label: string;
  color: string;
}

export interface SkillCategory {
  title: string;
  icon: "Layout" | "Database" | "Settings" | "Palette";
  skills: string[];
  color: string;
}

export interface TechnologyOrbit {
  speed: number;
  radius: number;
  size: number;
  startAt: number;
  images: { name: string; url: string }[];
}
