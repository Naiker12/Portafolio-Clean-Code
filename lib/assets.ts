/** Shared by Next config and public-file consumers in development and Pages. */
export const basePath = process.env.NODE_ENV === "production"
  ? "/Portafolio-Clean-Code"
  : "";

export function getAssetPath(src: string): string {
  return `${basePath}/${src.replace(/^\/+/, "")}`;
}
