import type { SkillCategory } from "../model/content";

export const skillCategories: SkillCategory[] = [
    {
        title: "Frontend",
        icon: "Layout",
        skills: ["React", "Angular", "HTML", "Next.js 15", "TypeScript", "Tailwind CSS"],
        color: "#3b82f6"
    },
    {
        title: "Backend",
        icon: "Database",
        skills: ["Spring Boot", "Node.js", "JavaScript", "PostgreSQL", "Supabase", "Firebase", "FastAPI"],
        color: "#60a5fa"
    },
    {
        title: "DevOps",
        icon: "Settings",
        skills: ["AWS", "Docker", "Terraform", "CI/CD"],
        color: "#2563eb"
    },
    {
        title: "Design",
        icon: "Palette",
        skills: ["Figma", "WebGl", "Blender", "Design Systems"],
        color: "#1d4ed8"
    }
];
