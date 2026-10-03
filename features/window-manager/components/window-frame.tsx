"use client";
import { useEffect, useRef, useState, type Dispatch, type ReactNode } from "react";
import { Maximize2, Minus, X, PanelLeft, PanelRight, Ellipsis, Monitor, Move, Scaling } from "lucide-react";
import { ApplicationIcon } from "@/features/desktop/components/application-icon";
import { desktopApps } from "@/features/desktop/model/apps";
import type { DesktopWindow, WindowAction } from "../model/windows";

interface FrameProps {
  window: DesktopWindow;
  focused: boolean;
  suspended: boolean;
  layer: number;
  dispatch: Dispatch<WindowAction>;
  children: ReactNode;
  onDismiss: () => void;
  onPin: () => void;
  pinned: boolean;
}

export function WindowFrame({ window: entry, focused, suspended, layer, dispatch, children, onDismiss, onPin, pinned }: FrameProps) {
  const [menu, setMenu] = useState(false);
  const [resizing, setResizing] = useState(false);
  const [moving, setMoving] = useState(false);
  const frame = useRef<HTMLElement>(null);
  const resizeStart = useRef<{x:number;y:number;left:number;top:number;width:number;height:number;edge:string} | null>(null);
  const title = useRef<HTMLHeadingElement>(null);
  const content = useRef<HTMLDivElement>(null);
  useEffect(() => {
    try { if (content.current) content.current.scrollTop = Number(sessionStorage.getItem(`naiker-scroll:${entry.id}`)) || 0; } catch { /* Optional view storage. */ }
  }, [entry.id]);
  const drag = useRef<{ pointer: number; x: number; y: number; originX: number; originY: number } | null>(null);
  const app = desktopApps.find(item => item.id === entry.id)!;
  useEffect(() => { if (focused && !entry.minimized && !suspended) title.current?.focus({ preventScroll: true }); }, [focused, entry.minimized, suspended]);
  return (
    <section hidden={entry.minimized} className={`os-window os-managed-window ${entry.snap ? `os-window--snap-${entry.snap}` : ""} ${entry.maximized ? "os-window--maximized" : ""} ${focused ? "os-window--focused" : "os-window--background"}`}
      ref={frame} data-moving={moving} data-resizing={resizing} aria-labelledby={`window-title-${entry.id}`} style={{ left: entry.position.x, top: entry.position.y, ...(!entry.maximized && !entry.snap && entry.size ? {width:entry.size.width,height:entry.size.height} : {}), zIndex: 10 + layer }}
      onKeyDown={event => { if(event.key === "Escape") setMenu(false); }}
      onPointerDown={() => dispatch({ type: "focus", id: entry.id })} onFocusCapture={() => dispatch({ type: "focus", id: entry.id })}>
      <header className="os-window-titlebar"
        onContextMenu={event => {event.preventDefault();setMenu(true);}}
        onDoubleClick={event => { if (!(event.target as HTMLElement).closest("button")) dispatch({ type: "maximize", id: entry.id }); }}
        onPointerDown={event => {
          if (event.button !== 0 || (event.target as HTMLElement).closest("button") || globalThis.innerWidth <= 640) return;
          event.preventDefault();
          setMoving(true); setMenu(false);
          let origin = entry.position;
          if (entry.snap || entry.maximized) {
            const size=entry.size ?? {width:Math.min(900,innerWidth-50),height:Math.min(620,innerHeight-170)};
            origin={x:Math.max(7,Math.min(event.clientX-size.width/2,innerWidth-size.width-7)),y:Math.max(43,event.clientY-24)};
            dispatch({type:"geometry",id:entry.id,position:origin,size,bounds:{width:innerWidth,height:innerHeight}});
          }
          drag.current = { pointer: event.pointerId, x: event.clientX, y: event.clientY, originX: origin.x, originY: origin.y };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={event => {
          const start = drag.current;
          if (!start || start.pointer !== event.pointerId) return;
          dispatch({ type: "move", id: entry.id, position: { x: start.originX + event.clientX - start.x, y: start.originY + event.clientY - start.y }, bounds: { width: innerWidth, height: innerHeight } });
        }}
        onPointerUp={event => { if (drag.current) { if (event.clientX < 25) dispatch({type:"snap",id:entry.id,side:"left"}); else if (event.clientX > innerWidth - 25) dispatch({type:"snap",id:entry.id,side:"right"}); else if (event.clientY < 45) dispatch({type:"maximize",id:entry.id}); } drag.current = null; setMoving(false); }} onPointerCancel={() => { drag.current = null;setMoving(false); }} onLostPointerCapture={() => { drag.current = null;setMoving(false); }}>
        <div><ApplicationIcon id={app.id} compact /><h2 id={`window-title-${entry.id}`} ref={title} tabIndex={-1}>{app.title}</h2></div>
        <div className="os-window-controls">
          <button aria-label={`Opciones de ${app.title}`} aria-expanded={menu} onClick={() => setMenu(value => !value)}><Ellipsis size={17} /></button>
          <button className="os-snap-control" aria-label={`Colocar ${app.title} a la izquierda`} onClick={() => dispatch({type:"snap",id:entry.id,side:entry.snap === "left" ? undefined : "left"})}><PanelLeft size={15} /></button>
          <button className="os-snap-control" aria-label={`Colocar ${app.title} a la derecha`} onClick={() => dispatch({type:"snap",id:entry.id,side:entry.snap === "right" ? undefined : "right"})}><PanelRight size={15} /></button>
          <button aria-label={`Minimizar ${app.title}`} onClick={() => { dispatch({ type: "minimize", id: entry.id }); onDismiss(); }}><Minus size={16} /></button>
          <button aria-label={`${entry.maximized ? "Restaurar" : "Maximizar"} ${app.title}`} onClick={() => dispatch({ type: "maximize", id: entry.id })}><Maximize2 size={14} /></button>
          <button className="os-window-close" aria-label={`Cerrar ${app.title}`} onClick={() => { dispatch({ type: "close", id: entry.id }); onDismiss(); }}><X size={17} /></button>
        </div>
      </header>
      {menu && <><button className="os-frame-menu-dismiss" aria-label="Cerrar opciones de ventana" onClick={() => setMenu(false)} /><div className="os-frame-menu" aria-label={`Opciones de ventana ${app.title}`}><strong>Ventana</strong><button onClick={() => {dispatch({type:"maximize",id:entry.id});setMenu(false);}}><Maximize2 size={15}/>{entry.maximized ? "Restaurar tamaño" : "Maximizar"}</button><button className="os-snap-control" onClick={() => {dispatch({type:"snap",id:entry.id,side:"left"});setMenu(false);}}><PanelLeft size={15}/>Mitad izquierda</button><button className="os-snap-control" onClick={() => {dispatch({type:"snap",id:entry.id,side:"right"});setMenu(false);}}><PanelRight size={15}/>Mitad derecha</button><button onClick={() => {dispatch({type:"geometry",id:entry.id,position:{x:Math.max(7,(innerWidth-640)/2),y:70},size:{width:640,height:460},bounds:{width:innerWidth,height:innerHeight}});setMenu(false);}}><Scaling size={15}/>Tamaño compacto</button><button onClick={() => {dispatch({type:"snap",id:entry.id,side:undefined});setMenu(false);}}><Move size={15}/>Ventana libre</button><button onClick={() => {onPin();setMenu(false);}}><Monitor size={15}/>{pinned ? "Quitar del escritorio" : "Añadir al escritorio"}</button><small>Arrastra la cabecera para mover. Usa los bordes o esquinas para cambiar el tamaño.</small></div></>}
      <div ref={content} className="os-window-content" onScroll={event => { try { sessionStorage.setItem(`naiker-scroll:${entry.id}`, String(event.currentTarget.scrollTop)); } catch { /* Optional view storage. */ } }}>{children}</div>
      {!entry.maximized && !entry.snap && ["n","s","e","w","ne","nw","se","sw"].map(edge => <div key={edge} className={`os-resize-handle os-resize-${edge}`} aria-hidden="true"
        onPointerDown={event => { if(event.button !== 0 || innerWidth <= 640) return; event.preventDefault();event.stopPropagation();const rect=frame.current!.getBoundingClientRect();resizeStart.current={x:event.clientX,y:event.clientY,left:rect.left,top:rect.top,width:rect.width,height:rect.height,edge};setResizing(true);dispatch({type:"focus",id:entry.id});event.currentTarget.setPointerCapture(event.pointerId); }}
        onPointerMove={event => {const start=resizeStart.current;if(!start)return;const dx=event.clientX-start.x,dy=event.clientY-start.y;const width=Math.max(360,start.width+(edge.includes("e")?dx:edge.includes("w")?-dx:0));const height=Math.max(260,start.height+(edge.includes("s")?dy:edge.includes("n")?-dy:0));dispatch({type:"geometry",id:entry.id,size:{width,height},position:{x:edge.includes("w")?start.left+start.width-width:start.left,y:edge.includes("n")?start.top+start.height-height:start.top},bounds:{width:innerWidth,height:innerHeight}});}}
        onPointerUp={() => {resizeStart.current=null;setResizing(false);}} onPointerCancel={() => {resizeStart.current=null;setResizing(false);}} onLostPointerCapture={() => {resizeStart.current=null;setResizing(false);}} />)}
    </section>
  );
}

