"use client";
import { useSyncExternalStore } from "react";

export const defaults = { colorMode: "dark", wallpaper: "ubuntu", accent: "orange", dockSize: "medium", reducedMotion: false, shortcuts: true } as const;
export interface Preferences { colorMode: "dark" | "light"; wallpaper: "ubuntu" | "night" | "minimal"; accent: "orange" | "purple" | "blue" | "green"; dockSize: "small" | "medium" | "large"; reducedMotion: boolean; shortcuts: boolean }
export const accents = { orange: "#e85a22", purple: "#9254d7", blue: "#2878d0", green: "#268448" };
const key = "naiker-os-preferences-v1";
let current: Preferences = defaults;
const listeners = new Set<() => void>();
function read() {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    const next: Preferences = { ...defaults };
    if (value && typeof value === "object") {
      if (["dark", "light"].includes(value.colorMode)) next.colorMode = value.colorMode;
      if (["ubuntu", "night", "minimal"].includes(value.wallpaper)) next.wallpaper = value.wallpaper;
      if (["orange", "purple", "blue", "green"].includes(value.accent)) next.accent = value.accent;
      if (["small", "medium", "large"].includes(value.dockSize)) next.dockSize = value.dockSize;
      if (typeof value.reducedMotion === "boolean") next.reducedMotion = value.reducedMotion;
      if (typeof value.shortcuts === "boolean") next.shortcuts = value.shortcuts;
    }
    if (JSON.stringify(next) !== JSON.stringify(current)) { current = next; listeners.forEach(fn => fn()); }
  } catch { /* Keep usable defaults when browser storage is unavailable or damaged. */ }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  read();
  const sync = (event: StorageEvent) => { if (event.key === key || event.key === null) read(); };
  window.addEventListener("storage", sync);
  return () => { listeners.delete(listener); window.removeEventListener("storage", sync); };
}
function update(patch: Partial<Preferences>) {
  current = { ...current, ...patch };
  try { localStorage.setItem(key, JSON.stringify(current)); } catch { /* Changes still work during this visit. */ }
  listeners.forEach(fn => fn());
}
export function usePreferences() {
  const preferences = useSyncExternalStore(subscribe, () => current, () => defaults);
  return { preferences, update, reset: () => update(defaults) };
}

