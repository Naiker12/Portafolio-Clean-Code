import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(src: string) {
  const basePath = "/Portafolio-Clean-Code";
  // Remove slash if present to avoid double slash
  const cleanSrc = src.startsWith("/") ? src : `/${src}`;
  return `${basePath}${cleanSrc}`;
}
