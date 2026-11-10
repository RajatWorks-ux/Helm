export type Kind = "study" | "phone" | "play" | "body" | "school" | "meal" | "sleep" | "off";

export type Slot = "primary" | "linked" | "evening" | "drill" | "repair" | "close" | "read";

export type Block = {
  id: string;
  start: string;
  end: string;
  kind: Kind;
  title: string;
  detail?: string;
  slot?: Slot;
};

export const schoolDay: Block[] = [
  { id: "wake", start: "05:50", end: "06:05", kind: "off", title: "Wake", detail: "Water. Phone stays face-down." },
  { id: "move", start: "06:05", end: "06:25", kind: "body", title: "Move", detail: "Walk or four asanas. This is PE, not a warm-up you skip." },
  { id: "phone1", start: "06:25", end: "06:40", kind: "phone", title: "Phone", detail: "Fifteen minutes. Then it leaves the desk." },
  { id: "deep", start: "06:40", end: "07:25", kind: "study", title: "Primary", slot: "primary" },
  { id: "breakfast", start: "07:25", end: "07:50", kind: "meal", title: "Breakfast" },
  { id: "school", start: "08:00", end: "14:30", kind: "school", title: "School", detail: "Listen in the period that matches today’s chapter. Don’t open a second syllabus in the corridor." },
  { id: "land", start: "14:30", end: "15:00", kind: "meal", title: "Land and snack" },
  { id: "phone2", start: "15:00", end: "15:20", kind: "phone", title: "Phone", detail: "Twenty minutes, on a timer." },
  { id: "linked", start: "15:25", end: "16:40", kind: "study", title: "Linked", slot: "linked" },
  { id: "breath", start: "16:40", end: "16:50", kind: "off", title: "Eyes up" },
  { id: "drill", start: "16:50", end: "17:35", kind: "study", title: "CET drill", slot: "drill" },
  { id: "sport", start: "17:35", end: "18:10", kind: "body", title: "Sport or yoga" },
  { id: "dinner", start: "18:10", end: "19:00", kind: "meal", title: "Dinner" },
  { id: "evening", start: "19:00", end: "19:40", kind: "study", title: "One light thing", slot: "evening" },
  { id: "games", start: "19:40", end: "20:40", kind: "play", title: "Games", detail: "A full hour. It is in the plan, not a prize you earn by suffering." },
  { id: "close", start: "20:40", end: "21:05", kind: "study", title: "Close", slot: "close", detail: "Ten cards from today only. No new chapter." },
  { id: "phone3", start: "21:05", end: "21:25", kind: "phone", title: "Phone, winding down" },
  { id: "sleep", start: "21:30", end: "05:50", kind: "sleep", title: "Sleep", detail: "About eight hours. Rank does not grow after midnight." },
];

export const freeDay: Block[] = [
  { id: "wake", start: "07:00", end: "07:20", kind: "off", title: "Wake" },
  { id: "move", start: "07:20", end: "07:45", kind: "body", title: "Move" },
  { id: "breakfast", start: "07:45", end: "08:15", kind: "meal", title: "Breakfast" },
  { id: "phone1", start: "08:15", end: "08:35", kind: "phone", title: "Phone", detail: "Twenty minutes." },
  { id: "deep", start: "08:35", end: "10:05", kind: "study", title: "Primary", slot: "primary" },
  { id: "breath", start: "10:05", end: "10:20", kind: "off", title: "Break" },
  { id: "linked", start: "10:20", end: "11:35", kind: "study", title: "Linked", slot: "linked" },
  { id: "drill", start: "11:35", end: "12:20", kind: "study", title: "CET drill", slot: "drill" },
  { id: "lunch", start: "12:20", end: "13:10", kind: "meal", title: "Lunch" },
  { id: "games", start: "13:10", end: "14:40", kind: "play", title: "Games", detail: "Ninety minutes. Daylight if you can." },
  { id: "sport", start: "14:40", end: "15:25", kind: "body", title: "Sport or yoga" },
  { id: "evening", start: "15:25", end: "16:15", kind: "study", title: "One light thing", slot: "evening" },
  { id: "free", start: "16:15", end: "19:00", kind: "off", title: "Off the desk", detail: "People, outside, nothing academic." },
  { id: "dinner", start: "19:00", end: "19:45", kind: "meal", title: "Dinner" },
  { id: "close", start: "19:45", end: "20:10", kind: "study", title: "Close", slot: "close" },
  { id: "phone2", start: "20:10", end: "20:30", kind: "phone", title: "Phone" },
  { id: "sleep", start: "21:00", end: "07:00", kind: "sleep", title: "Sleep" },
];

export const sunday: Block[] = [
  { id: "wake", start: "07:30", end: "08:20", kind: "off", title: "Wake late" },
  { id: "breakfast", start: "08:20", end: "09:00", kind: "meal", title: "Long breakfast" },
  { id: "repair", start: "09:00", end: "10:20", kind: "study", title: "One repair", slot: "repair", detail: "The shakiest chapter from Mon–Sat. No new idea." },
  { id: "read", start: "10:20", end: "11:05", kind: "study", title: "Novel", slot: "read", detail: "Old Man and the Sea now. Tiger for Malgudi or The Financial Expert after the Class 11 boards season." },
  { id: "games", start: "11:05", end: "13:05", kind: "play", title: "Games", detail: "Two hours. The long one." },
  { id: "lunch", start: "13:05", end: "14:00", kind: "meal", title: "Lunch" },
  { id: "out", start: "14:00", end: "17:30", kind: "off", title: "Out", detail: "Walk, family, a match. Phone is allowed. The desk is not." },
  { id: "drill", start: "17:30", end: "18:05", kind: "study", title: "Fifteen mixed", slot: "drill", detail: "Only chapters you have already done. Then stop." },
  { id: "dinner", start: "18:30", end: "19:30", kind: "meal", title: "Dinner" },
  { id: "phone", start: "19:30", end: "20:15", kind: "phone", title: "Phone" },
  { id: "sleep", start: "21:00", end: "07:30", kind: "sleep", title: "Sleep" },
];

export function hmToMin(hm: string): number {
  const [h, m] = hm.split(":").map(Number);
  return h * 60 + m;
}

export function spanMinutes(start: string, end: string): number {
  const a = hmToMin(start);
  const b = hmToMin(end);
  return b > a ? b - a : 1440 - a + b;
}

export function formatMinutes(mins: number): string {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h <= 0) return `${m}m`;
  if (m === 0) return `${h}h`;
  return `${h}h ${m}m`;
}

export function totals(blocks: Block[]) {
  const add = (kind: Kind) =>
    blocks.filter((b) => b.kind === kind).reduce((n, b) => n + spanMinutes(b.start, b.end), 0);
  return {
    study: add("study"),
    play: add("play"),
    phone: add("phone"),
    body: add("body"),
    sleep: add("sleep"),
  };
}

const labs = [
  "Chemistry lab: melting point, or crystallise alum. Eight lines of procedure.",
  "Physics lab: one observation table from the manual, written as if the viva is tomorrow.",
  "PE practical: the asana or test named this week. Film nothing. Just do it and note the steps.",
  "Chemistry: pH of three things in the kitchen. One sentence each on why the number is what it is.",
];

export function saturdayLab(week: number): string {
  return labs[(week - 1) % labs.length] ?? labs[0];
}
