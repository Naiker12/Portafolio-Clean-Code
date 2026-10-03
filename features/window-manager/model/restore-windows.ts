import { clampPosition, clampSize, initialWindows, type WindowState, type DesktopWindow } from "./windows.ts";
import type { AppId } from "../../desktop/model/apps";

export function restoreWindows(value: unknown, knownIds: readonly AppId[], bounds: { width: number; height: number }): WindowState {
  if (!value || typeof value !== "object" || !("windows" in value) || !Array.isArray(value.windows)) return initialWindows;
  const ids = new Set<AppId>();
  const windows: DesktopWindow[] = [];
  for (const entry of value.windows) {
    if (!entry || !knownIds.includes(entry.id) || ids.has(entry.id)) continue;
    const { x, y } = entry.position ?? {};
    if (!Number.isFinite(x) || !Number.isFinite(y)) continue;
    ids.add(entry.id);
    const size = Number.isFinite(entry.size?.width) && Number.isFinite(entry.size?.height) ? clampSize(entry.size, bounds) : undefined;
    windows.push({ id: entry.id, position: clampPosition({ x, y }, bounds, size), minimized: entry.minimized === true, maximized: entry.maximized === true, ...(size ? {size} : {}), ...(entry.snap === "left" || entry.snap === "right" ? { snap: entry.snap } : {}) });
  }
  const focused = "focused" in value && windows.some(entry => entry.id === value.focused && !entry.minimized) ? value.focused as AppId : windows.findLast(entry => !entry.minimized)?.id ?? null;
  return { windows, focused };
}

