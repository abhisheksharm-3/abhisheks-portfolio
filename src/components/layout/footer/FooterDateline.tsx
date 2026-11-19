"use client";

/** The line under the signature: city, weekday, date and the current time in Pune, like a letter's dateline. */
import { useSyncExternalStore } from "react";

const REFRESH_MS = 30_000;

const PUNE_TIME = new Intl.DateTimeFormat("en-IN", {
  timeZone: "Asia/Kolkata",
  weekday: "long",
  day: "numeric",
  month: "long",
  hour: "numeric",
  minute: "2-digit",
});

const readNow = () => {
  const parts = PUNE_TIME.formatToParts(new Date());
  const part = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((entry) => entry.type === type)?.value ?? "";
  return `${part("weekday")}, ${part("day")} ${part("month")} · ${part("hour")}:${part("minute")} ${part("dayPeriod")}`.toLowerCase();
};

const subscribe = (onTick: () => void) => {
  const interval = window.setInterval(onTick, REFRESH_MS);
  return () => window.clearInterval(interval);
};

/** Prerendering has no viewer clock, so the server renders the city alone and the time fills in on mount. */
const readNothing = () => null;

export const FooterDateline = () => {
  const now = useSyncExternalStore(subscribe, readNow, readNothing);

  return (
    <p className="mt-2.5 font-mono text-[11px] tracking-[0.04em] text-foreground/60 tabular-nums">
      pune{now && ` · ${now}`}
    </p>
  );
};
