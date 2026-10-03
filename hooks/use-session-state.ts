"use client";
import { useCallback, useSyncExternalStore, type SetStateAction } from "react";

const cache = new Map<string, unknown>();
const listeners = new Map<string, Set<() => void>>();

/** Per-tab view state: survives reloads, never stores credentials. */
export function useSessionState<T>(key: string, fallback: T, validate?: (value: unknown) => T) {
  const storageKey = `naiker-view-v1:${key}`;
  const subscribe = useCallback((listener: () => void) => {
    const group = listeners.get(storageKey) ?? new Set();
    listeners.set(storageKey, group); group.add(listener);
    if (!cache.has(storageKey)) {
      let value = fallback;
      try {
        const saved = sessionStorage.getItem(storageKey);
        if (saved !== null) {
          const parsed: unknown = JSON.parse(saved);
          value = validate ? validate(parsed) : typeof parsed === typeof fallback ? parsed as T : fallback;
        }
      } catch { /* A blocked or damaged store must not break the interface. */ }
      cache.set(storageKey, value); group.forEach(fn => fn());
    }
    return () => { group.delete(listener); };
  }, [storageKey, fallback, validate]);
  const value = useSyncExternalStore(subscribe, () => (cache.get(storageKey) ?? fallback) as T, () => fallback);
  const set = useCallback((action: SetStateAction<T>) => {
    const previous = (cache.get(storageKey) ?? fallback) as T;
    const next = typeof action === "function" ? (action as (value: T) => T)(previous) : action;
    cache.set(storageKey, next);
    try { sessionStorage.setItem(storageKey, JSON.stringify(next)); } catch { /* In-memory operation remains available. */ }
    listeners.get(storageKey)?.forEach(fn => fn());
  }, [storageKey, fallback]);
  return [value, set] as const;
}
