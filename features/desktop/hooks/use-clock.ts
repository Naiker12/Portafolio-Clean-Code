"use client";
import { useEffect, useState } from "react";

export function useClock() {
  const [date, setDate] = useState<Date | null>(null);
  useEffect(() => {
    const update = () => setDate(new Date());
    update();
    const interval = setInterval(update, 1000 * 30);
    return () => clearInterval(interval);
  }, []);
  const options = { timeZone: "America/Bogota" };
  return {
    time: date?.toLocaleTimeString("es-CO", { ...options, hour: "2-digit", minute: "2-digit", hour12: false }) ?? "--:--",
    day: date?.toLocaleDateString("es-CO", { ...options, day: "2-digit", month: "long" }) ?? "Naiker OS",
  };
}
