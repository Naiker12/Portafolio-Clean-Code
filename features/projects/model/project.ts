import type { StaticImageData } from "next/image";

export interface Project {
  id: string;
  category: "web" | "mobile" | "desktop";
  title: string;
  description: string;
  tech: string[];
  image: StaticImageData | string;
  imageKind?: "presentation";
  gallery?: { image: StaticImageData | string; label: string }[];
  features?: string[];
  demo?: { url: string; label: string; note?: string };
  repositoryStatus?: string;
  repositories?: { label: string; url: string }[];
  link: string;
  github: string;
  colors: { main: string; secondary: string };
}
