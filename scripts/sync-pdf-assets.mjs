import { cp, mkdir } from "node:fs/promises";
await mkdir("public/pdf", { recursive: true });
await cp("node_modules/pdfjs-dist/build/pdf.worker.min.mjs", "public/pdf/pdf.worker.min.mjs");
for (const directory of ["cmaps", "standard_fonts"]) {
  await cp(`node_modules/pdfjs-dist/${directory}`, `public/pdf/${directory}`, { recursive: true });
}
await cp("node_modules/pdfjs-dist/LICENSE", "public/pdf/LICENSE");
