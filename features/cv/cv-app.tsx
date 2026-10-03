"use client";
import { useSessionState } from "@/hooks/use-session-state";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Download, ExternalLink, LoaderCircle, Minus, Plus, Scan } from "lucide-react";
import type { PDFDocumentProxy, RenderTask } from "pdfjs-dist";
import { getAssetPath } from "@/lib/assets";
import "./cv.css";

export function CvApp() {
  const [document, setDocument] = useState<PDFDocumentProxy | null>(null);
  const [page, setPage] = useSessionState("cv-page", 1);
  const [zoom, setZoom] = useSessionState("cv-zoom", 1);
  const [fit, setFit] = useSessionState("cv-fit", true);
  const [width, setWidth] = useState(600);
  const [status, setStatus] = useState("Cargando documento…");
  const [failed, setFailed] = useState(false);
  const canvas = useRef<HTMLCanvasElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const url = getAssetPath("/cv-naiker.pdf");

  useEffect(() => {
    let cancelled = false;
    let task: ReturnType<typeof import("pdfjs-dist").getDocument> | undefined;
    void import("pdfjs-dist").then(pdf => {
      if (cancelled) return;
      pdf.GlobalWorkerOptions.workerSrc = getAssetPath("/pdf/pdf.worker.min.mjs");
      task = pdf.getDocument({ url, cMapUrl: getAssetPath("/pdf/cmaps/"), cMapPacked: true, standardFontDataUrl: getAssetPath("/pdf/standard_fonts/") });
      return task.promise.then(value => { if (!cancelled) { setPage(previous => Math.min(value.numPages, Math.max(1, Math.floor(previous)))); setDocument(value); } });
    }).catch(() => { if (!cancelled) { setFailed(true); setStatus("No pudimos mostrar el documento. Puedes abrirlo o descargarlo."); } });
    return () => { cancelled = true; void task?.destroy(); };
  }, [url, setPage]);

  useEffect(() => {
    const target = viewport.current;
    if (!target) return;
    const observer = new ResizeObserver(entries => setWidth(Math.max(150, entries[0].contentRect.width - 40)));
    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!document || !canvas.current) return;
    let cancelled = false;
    let render: RenderTask | undefined;
    void document.getPage(page).then(async pdfPage => {
      if (cancelled || !canvas.current) return;
      const base = pdfPage.getViewport({ scale: 1 });
      const scale = fit ? width / base.width : zoom;
      const view = pdfPage.getViewport({ scale });
      const outputScale = Math.min(globalThis.devicePixelRatio || 1, 2);
      const target = canvas.current;
      target.width = Math.floor(view.width * outputScale);
      target.height = Math.floor(view.height * outputScale);
      target.style.width = `${view.width}px`;
      target.style.height = `${view.height}px`;
      render = pdfPage.render({ canvas: target, viewport: view, transform: [outputScale, 0, 0, outputScale, 0, 0] });
      await render.promise;
      if (!cancelled && viewport.current) {
        try { viewport.current.scrollTop = Number(sessionStorage.getItem("naiker-scroll:cv-page")) || 0; } catch { /* Optional view storage. */ }
      }
      const text = await pdfPage.getTextContent();
      if (!cancelled) { target.setAttribute("aria-label", text.items.map(item => "str" in item ? item.str : "").join(" ")); setStatus(`Página ${page} de ${document.numPages}`); }
    }).catch(error => { if (!cancelled && error?.name !== "RenderingCancelledException") { setFailed(true); setStatus("No pudimos renderizar esta página."); } });
    return () => { cancelled = true; render?.cancel(); };
  }, [document, page, zoom, fit, width]);

  const changeZoom = (amount: number) => { setFit(false); setZoom(value => Math.max(.5, Math.min(2, value + amount))); };
  return <div className="os-document-app"><div className="os-document-toolbar">
    <div className="os-document-controls"><button aria-label="Página anterior" disabled={!document || page === 1} onClick={() => setPage(value => value - 1)}><ChevronLeft size={17} /></button><span>{page} / {document?.numPages ?? "—"}</span><button aria-label="Página siguiente" disabled={!document || page === document.numPages} onClick={() => setPage(value => value + 1)}><ChevronRight size={17} /></button></div>
    <div className="os-document-controls"><button aria-label="Reducir zoom" disabled={!document || (!fit && zoom <= .5)} onClick={() => changeZoom(-.25)}><Minus size={16} /></button><span>{fit ? "Ajustado" : `${Math.round(zoom * 100)}%`}</span><button aria-label="Ampliar zoom" disabled={!document || (!fit && zoom >= 2)} onClick={() => changeZoom(.25)}><Plus size={16} /></button><button aria-label="Ajustar al ancho" aria-pressed={fit} onClick={() => setFit(true)}><Scan size={16} /></button></div>
    <a className="os-primary" href={url} download><Download size={16} />Descargar CV</a>
  </div><div ref={viewport} className="os-document-viewport" onScroll={event => { try { sessionStorage.setItem("naiker-scroll:cv-page", String(event.currentTarget.scrollTop)); } catch { /* Optional view storage. */ } }}>{!document && !failed && <LoaderCircle className="os-spinner" size={24} />}<canvas ref={canvas} hidden={failed} role="img" aria-label="Currículum de Naiker" /></div><footer><span role="status">{status}</span><a href={url} target="_blank" rel="noopener noreferrer">Abrir PDF <ExternalLink size={14} /></a></footer></div>;
}


