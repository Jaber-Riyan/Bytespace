"use client";
import { useCallback, useSyncExternalStore } from "react";

const fallback = new Map<string, string>();
const eventName = "bytespace:preference";
function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener(eventName, callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(eventName, callback);
  };
}
const serverSnapshot = () => null;

export function useLocalPreference(key: string) {
  const snapshot = useCallback(() => {
    try {
      return window.localStorage.getItem(key) ?? fallback.get(key) ?? null;
    } catch {
      return fallback.get(key) ?? null;
    }
  }, [key]);
  const value = useSyncExternalStore(subscribe, snapshot, serverSnapshot);
  const setValue = useCallback(
    (next: string) => {
      fallback.set(key, next);
      try {
        window.localStorage.setItem(key, next);
      } catch {
        /* Session memory still works when storage is unavailable. */
      }
      window.dispatchEvent(new Event(eventName));
    },
    [key],
  );
  return [value, setValue] as const;
}
