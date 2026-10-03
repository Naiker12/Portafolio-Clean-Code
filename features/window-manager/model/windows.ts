import type { AppId } from "../../desktop/model/apps";

export interface Position { x: number; y: number }
export interface Bounds { width: number; height: number }
export interface DesktopWindow {
  id: AppId;
  position: Position;
  minimized: boolean;
  maximized: boolean;
  snap?: "left" | "right";
  size?: Bounds;
}
export interface WindowState { windows: DesktopWindow[]; focused: AppId | null }
export type WindowAction =
  | { type: "open"; id: AppId; bounds: Bounds }
  | { type: "focus" | "minimize" | "close" | "maximize"; id: AppId }
  | { type: "move"; id: AppId; position: Position; bounds: Bounds }
  | { type: "resize"; bounds: Bounds }
  | { type: "geometry"; id: AppId; position: Position; size: Bounds; bounds: Bounds }
  | { type: "snap"; id: AppId; side: "left" | "right" | undefined };

export const initialWindows: WindowState = { windows: [], focused: null };

/** Match the frame CSS, reserving the top bar and bottom dock. */
export function clampPosition(position: Position, bounds: Bounds, size?: Bounds): Position {
  const width = size?.width ?? Math.min(900, Math.max(0, bounds.width - 50));
  const height = size?.height ?? Math.min(620, Math.max(0, bounds.height - 170));
  return {
    x: Math.max(7, Math.min(position.x, Math.max(7, bounds.width - width - 7))),
    y: Math.max(43, Math.min(position.y, Math.max(43, bounds.height - height - 105))),
  };
}

export function clampSize(size: Bounds, bounds: Bounds): Bounds {
  const maxWidth = Math.max(0, bounds.width - 14), maxHeight = Math.max(0, bounds.height - 148);
  return { width: Math.min(maxWidth, Math.max(Math.min(360, maxWidth), size.width)), height: Math.min(maxHeight, Math.max(Math.min(260, maxHeight), size.height)) };
}
const lastVisible = (windows: DesktopWindow[]) => windows.findLast(window => !window.minimized)?.id ?? null;
function bringForward(state: WindowState, id: AppId): WindowState {
  const target = state.windows.find(window => window.id === id);
  if (!target) return state;
  return { windows: [...state.windows.filter(window => window.id !== id), { ...target, minimized: false }], focused: id };
}

export function windowReducer(state: WindowState, action: WindowAction): WindowState {
  if (action.type === "open") {
    if (state.windows.some(window => window.id === action.id)) return bringForward(state, action.id);
    const width = Math.min(900, Math.max(0, action.bounds.width - 50));
    const offset = state.windows.length * 28;
    const position = clampPosition({ x: (action.bounds.width - width) / 2 + offset, y: 80 + offset }, action.bounds);
    return { windows: [...state.windows, { id: action.id, position, minimized: false, maximized: false }], focused: action.id };
  }
  if (action.type === "resize") return { ...state, windows: state.windows.map(window => { const size = window.size ? clampSize(window.size, action.bounds) : undefined; return { ...window, size, position: clampPosition(window.position, action.bounds, size) }; }) };
  if (action.type === "focus") return state.focused === action.id ? state : bringForward(state, action.id);
  if (!state.windows.some(window => window.id === action.id)) return state;
  if (action.type === "close" || action.type === "minimize") {
    const windows = action.type === "close" ? state.windows.filter(window => window.id !== action.id) : state.windows.map(window => window.id === action.id ? { ...window, minimized: true } : window);
    return { windows, focused: state.focused === action.id ? lastVisible(windows) : state.focused };
  }
  if (action.type === "maximize") {
    const next = bringForward(state, action.id);
    return { ...next, windows: next.windows.map(window => window.id === action.id ? { ...window, snap: undefined, maximized: !window.maximized } : window) };
  }
  if (action.type === "snap") {
    const next = bringForward(state, action.id);
    return { ...next, windows: next.windows.map(window => window.id === action.id ? { ...window, snap: action.side, maximized: false } : window) };
  }
  if (action.type === "geometry") { const size = clampSize(action.size, action.bounds); return {...state,windows:state.windows.map(window => window.id === action.id ? {...window,size,position:clampPosition(action.position,action.bounds,size),snap:undefined,maximized:false} : window)}; }
  if (action.type === "move") return { ...state, windows: state.windows.map(window => window.id === action.id && !window.maximized ? { ...window, position: clampPosition(action.position, action.bounds, window.size) } : window) };
  return state;
}
