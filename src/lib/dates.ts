export const PLAN_START = "2026-10-31";

export function parseISO(iso: string): Date {
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function fmtISO(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function addDays(iso: string, n: number): string {
  const d = parseISO(iso);
  d.setDate(d.getDate() + n);
  return fmtISO(d);
}

export function weekday(iso: string): number {
  return parseISO(iso).getDay();
}

export function isSunday(iso: string): boolean {
  return weekday(iso) === 0;
}

export function pretty(iso: string): string {
  return parseISO(iso).toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });
}

export function prettyLong(iso: string): string {
  return parseISO(iso).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

export function mondayOf(iso: string): string {
  const d = weekday(iso);
  const delta = d === 0 ? -6 : 1 - d;
  return addDays(iso, delta);
}

export function studyIndex(start: string, iso: string): number | null {
  if (iso < start || isSunday(iso)) return null;
  let n = 0;
  let cur = start;
  while (cur < iso) {
    if (!isSunday(cur)) n += 1;
    cur = addDays(cur, 1);
  }
  return n;
}

export function dateForStudyIndex(start: string, index: number): string {
  let left = index;
  let cur = isSunday(start) ? addDays(start, 1) : start;
  while (left > 0) {
    cur = addDays(cur, 1);
    if (!isSunday(cur)) left -= 1;
  }
  return cur;
}

export function clientToday(): string {
  const d = new Date();
  return fmtISO(d);
}
