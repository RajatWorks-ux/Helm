import { useEffect, useMemo, useState } from "react";
import {
  Anchor,
  BookOpen,
  CalendarDays,
  Check,
  Compass,
  Dumbbell,
  Gamepad2,
  GraduationCap,
  Moon,
  Phone,
  RotateCcw,
  School,
  Shield,
  Timer,
  Utensils,
} from "lucide-react";
import { chapterById, chapters, subjects, type Chapter } from "@/data/syllabus";
import {
  formatMinutes,
  freeDay,
  hmToMin,
  saturdayLab,
  schoolDay,
  spanMinutes,
  sunday,
  totals,
  type Block,
  type Kind,
  type Slot,
} from "@/data/schedule";
import { keels, phaseForWeek, sessions, type Session } from "@/data/sessions";
import {
  addDays,
  clientToday,
  dateForStudyIndex,
  isSunday,
  mondayOf,
  PLAN_START,
  pretty,
  prettyLong,
  studyIndex,
  weekday,
} from "@/lib/dates";
import { toggleId, useHelm, type HelmState } from "@/lib/helm-store";

type View = "today" | "week" | "path" | "syllabus";

const nav: { id: View; label: string; icon: typeof Anchor }[] = [
  { id: "today", label: "Today", icon: Compass },
  { id: "week", label: "Week", icon: CalendarDays },
  { id: "path", label: "Path", icon: Anchor },
  { id: "syllabus", label: "Syllabus", icon: GraduationCap },
];

function blocksFor(iso: string, offSchool: string[]): Block[] {
  if (isSunday(iso)) return sunday;
  if (offSchool.includes(iso)) return freeDay;
  return schoolDay;
}

function slotCopy(
  session: Session,
  slot: Slot,
  shelter: boolean,
  compressed: boolean,
): { kicker: string; title: string; body: string } {
  if (slot === "drill") {
    return { kicker: "CET", title: "Drill", body: session.drill };
  }
  if (slot === "close") {
    return {
      kicker: "Light",
      title: "Close the day",
      body: "Ten cards from the primary chapter only. If you open a new one, you are negotiating.",
    };
  }
  if (slot === "repair") {
    return {
      kicker: "Repair",
      title: "One shaky chapter",
      body: "Pick the session this week that felt worst. Redo its drill. No new idea.",
    };
  }
  if (slot === "read") {
    return {
      kicker: "English",
      title: "Novel, slowly",
      body: "The Old Man and the Sea until that paper is behind you. Then either A Tiger for Malgudi or The Financial Expert — one, not both.",
    };
  }
  const id = slot === "primary" ? session.primary : slot === "linked" ? session.linked : session.evening;
  const ch = chapterById.get(id);
  let body =
    slot === "primary" ? session.primaryFocus : slot === "linked" ? session.linkedFocus : session.eveningFocus;
  if (compressed && slot === "primary") {
    body = "School already taught this. Ten minutes on your old notes, then put the hour into the drill.";
  } else if (shelter && ch?.level === "12" && (slot === "primary" || slot === "linked")) {
    body = `Class 12 is sheltered until you turn it off. Use the hour on the gate: ${session.because}`;
  }
  const kicker = ch ? `${ch.level === "CET" ? "CET" : `Class ${ch.level}`} · ${ch.subject}` : "Study";
  return { kicker, title: ch?.name ?? "Study", body };
}

function kindIcon(kind: Kind) {
  if (kind === "play") return Gamepad2;
  if (kind === "phone") return Phone;
  if (kind === "body") return Dumbbell;
  if (kind === "school") return School;
  if (kind === "meal") return Utensils;
  if (kind === "sleep") return Moon;
  if (kind === "study") return BookOpen;
  return Compass;
}

function kindClass(kind: Kind, on: boolean): string {
  const surface = kind === "study" ? "bg-foam " : kind === "school" ? "bg-paper-2 " : "bg-card ";
  const border = on ? "border-sea" : "border-line";
  return `rounded-2xl border px-4 py-3 ${surface}${border}`;
}

export function HelmApp() {
  const { state, setState } = useHelm();
  const [view, setView] = useState<View>("today");
  const [selected, setSelected] = useState(PLAN_START);
  const [nowMin, setNowMin] = useState<number | null>(null);
  const [timer, setTimer] = useState<{ blockId: string; left: number; total: number } | null>(null);
  const [query, setQuery] = useState("");
  const [level, setLevel] = useState<"All" | "11" | "12" | "CET">("All");
  const [confirmReset, setConfirmReset] = useState(false);
  const [right, setRight] = useState(48);
  const [wrong, setWrong] = useState(12);

  useEffect(() => {
    setSelected(clientToday());
  }, []);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setNowMin(d.getHours() * 60 + d.getMinutes());
    };
    tick();
    const id = window.setInterval(tick, 20000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    if (!timer) return;
    const id = window.setInterval(() => {
      setTimer((current) => (current && current.left > 0 ? { ...current, left: current.left - 1 } : current));
    }, 1000);
    return () => window.clearInterval(id);
  }, [timer?.blockId]);

  const index = studyIndex(state.start, selected);
  const pass = index == null ? 1 : Math.floor(index / sessions.length) + 1;
  const session = index == null ? null : sessions[index % sessions.length];
  const phase = session ? phaseForWeek(session.week) : { name: "Rest", line: "No new chapter. The week needs a day with nothing to advance." };
  const blocks = blocksFor(selected, state.offSchool);
  const sum = totals(blocks);
  const doneCount = sessions.filter((s) => state.done.includes(s.id)).length;

  const activeId = useMemo(() => {
    if (nowMin == null || selected !== clientToday()) return null;
    for (const block of blocks) {
      const a = hmToMin(block.start);
      const b = hmToMin(block.end);
      const hit = b > a ? nowMin >= a && nowMin < b : nowMin >= a || nowMin < b;
      if (hit) return block.id;
    }
    return null;
  }, [blocks, nowMin, selected]);

  function openDay(iso: string, next: View = "today") {
    setSelected(iso);
    setView(next);
  }

  function markSession() {
    if (!session) return;
    setState((prev) => completeSession(prev, session));
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-paper text-ink">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 px-4 pt-6 pb-28 md:pb-16">
        <header className="flex items-start justify-between gap-4 border-b border-line pb-5">
          <div>
            <p className="flex items-center gap-2 text-xs font-medium tracking-[0.18em] text-sea uppercase">
              <Anchor className="size-3.5" aria-hidden="true" />
              Helm
            </p>
            <h1 className="mt-1 font-display text-4xl leading-none font-medium text-ink">
              {view === "today" ? prettyLong(selected) : view === "week" ? "This week" : view === "path" ? "The keel" : "Syllabus"}
            </h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted">
              Class 11, Class 12, and IMU CET in one order. A chapter shows up only after the idea it needs.
            </p>
          </div>
          <p className="hidden text-right text-sm text-muted sm:block">
            <span className="block font-display text-2xl text-ink">{doneCount}</span>
            of {sessions.length} days
          </p>
        </header>

        <nav className="hidden gap-2 md:flex" aria-label="Sections">
          {nav.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setView(item.id)}
              className={
                "min-h-11 rounded-full px-4 text-sm font-medium " +
                (view === item.id ? "bg-sea text-paper" : "bg-card text-ink ring-1 ring-line")
              }
            >
              {item.label}
            </button>
          ))}
        </nav>

        {view === "today" && (
          <Today
            iso={selected}
            session={session}
            phaseName={phase.name}
            phaseLine={phase.line}
            pass={pass}
            blocks={blocks}
            sum={sum}
            state={state}
            setState={setState}
            activeId={activeId}
            timer={timer}
            setTimer={setTimer}
            onMark={markSession}
            showBack={selected !== clientToday()}
            onBack={() => openDay(clientToday())}
          />
        )}
        {view === "week" && (
          <Week selected={selected} start={state.start} done={state.done} onOpen={(iso) => openDay(iso)} />
        )}
        {view === "path" && (
          <Path
            state={state}
            query={query}
            setQuery={setQuery}
            onOpen={(id) => {
              const i = sessions.findIndex((s) => s.id === id);
              if (i >= 0) openDay(dateForStudyIndex(state.start, i));
            }}
          />
        )}
        {view === "syllabus" && (
          <Syllabus
            state={state}
            setState={setState}
            level={level}
            setLevel={setLevel}
            query={query}
            setQuery={setQuery}
            right={right}
            wrong={wrong}
            setRight={setRight}
            setWrong={setWrong}
            confirmReset={confirmReset}
            setConfirmReset={setConfirmReset}
          />
        )}
      </div>

      <nav
        className="fixed inset-x-0 bottom-0 z-20 border-t border-line bg-card/95 backdrop-blur md:hidden"
        aria-label="Sections"
      >
        <ul className="mx-auto grid max-w-lg grid-cols-4">
          {nav.map((item) => {
            const Icon = item.icon;
            const on = view === item.id;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => setView(item.id)}
                  className={"flex min-h-14 w-full flex-col items-center justify-center gap-1 text-xs " + (on ? "text-sea" : "text-muted")}
                >
                  <Icon className="size-5" aria-hidden="true" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function completeSession(prev: HelmState, session: Session): HelmState {
  const ids = [session.primary, session.linked, session.evening, ...(session.covers ?? [])];
  const add = ids.filter((id) => {
    const ch = chapterById.get(id);
    if (!ch) return false;
    if (prev.shelter && ch.level === "12") return false;
    return true;
  });
  return {
    ...prev,
    done: prev.done.includes(session.id) ? prev.done : [...prev.done, session.id],
    ticks: Array.from(new Set([...prev.ticks, ...add])),
  };
}

function Today({
  iso,
  session,
  phaseName,
  phaseLine,
  pass,
  blocks,
  sum,
  state,
  setState,
  activeId,
  timer,
  setTimer,
  onMark,
  showBack,
  onBack,
}: {
  iso: string;
  session: Session | null;
  phaseName: string;
  phaseLine: string;
  pass: number;
  blocks: Block[];
  sum: ReturnType<typeof totals>;
  state: HelmState;
  setState: React.Dispatch<React.SetStateAction<HelmState>>;
  activeId: string | null;
  timer: { blockId: string; left: number; total: number } | null;
  setTimer: (t: { blockId: string; left: number; total: number } | null) => void;
  onMark: () => void;
  showBack: boolean;
  onBack: () => void;
}) {
  const compressed = session ? state.compressed.includes(session.id) : false;
  const marked = session ? state.done.includes(session.id) : false;
  const off = state.offSchool.includes(iso);

  return (
    <div className="flex flex-col gap-5">
      <section className="grid gap-3 sm:grid-cols-[1.4fr_1fr]">
        <div className="rounded-3xl bg-sea px-5 py-5 text-paper">
          <p className="text-xs tracking-[0.16em] uppercase text-foam">
            {phaseName}
            {session ? ` · week ${session.week}` : ""}
            {pass > 1 ? ` · pass ${pass}` : ""}
          </p>
          <p className="mt-2 font-display text-2xl leading-snug">{session ? chapterById.get(session.primary)?.name : "Sunday"}</p>
          <p className="mt-2 text-sm leading-relaxed text-foam">{session ? session.because : phaseLine}</p>
        </div>
        <dl className="grid grid-cols-2 gap-2 text-sm">
          <Stat label="Study" value={formatMinutes(sum.study)} />
          <Stat label="Games" value={formatMinutes(sum.play)} />
          <Stat label="Phone" value={formatMinutes(sum.phone)} />
          <Stat label="Sleep" value={formatMinutes(sum.sleep)} />
        </dl>
      </section>

      {!state.seenIntro && (
        <section className="rounded-2xl border border-line bg-card px-4 py-4">
          <p className="text-sm leading-relaxed">
            One idea before school. The chapter that uses it after school. One light thing after dinner — English, PE, or CET
            aptitude, never all three. Games are already on the clock.
          </p>
          <button
            type="button"
            className="mt-3 min-h-11 text-sm font-medium text-sea"
            onClick={() => setState((s) => ({ ...s, seenIntro: true }))}
          >
            Got it
          </button>
        </section>
      )}

      {showBack && (
        <button type="button" onClick={onBack} className="min-h-11 self-start text-sm font-medium text-sea">
          Back to today
        </button>
      )}

      <div className="flex flex-wrap gap-2">
        {!isSunday(iso) && (
          <button
            type="button"
            onClick={() => setState((s) => ({ ...s, offSchool: toggleId(s.offSchool, iso) }))}
            className="min-h-11 rounded-full bg-card px-4 text-sm ring-1 ring-line"
          >
            {off ? "School day" : "No school today"}
          </button>
        )}
        {session && (
          <button
            type="button"
            onClick={() => setState((s) => ({ ...s, compressed: toggleId(s.compressed, session.id) }))}
            className="min-h-11 rounded-full bg-card px-4 text-sm ring-1 ring-line"
          >
            {compressed ? "Full chapter" : "Already taught — compress"}
          </button>
        )}
        <button
          type="button"
          onClick={() => setState((s) => ({ ...s, shelter: !s.shelter }))}
          className={"min-h-11 rounded-full px-4 text-sm ring-1 " + (state.shelter ? "bg-sea text-paper ring-sea" : "bg-card ring-line")}
        >
          {state.shelter ? "Class 12 sheltered" : "Shelter Class 12"}
        </button>
      </div>

      {session && pass > 1 && (
        <p className="text-sm leading-relaxed text-muted">
          Pass {pass}. Same order. Only past-paper questions and the mistakes from last time — don’t reread the chapter from the first page.
        </p>
      )}

      {weekday(iso) === 6 && (
        <p className="rounded-2xl bg-paper-2 px-4 py-3 text-sm leading-relaxed">
          <span className="font-medium">Saturday lab. </span>
          {saturdayLab(session?.week ?? 1)} Practicals are 30 marks. They are not extra homework.
        </p>
      )}

      {timer && (
        <div className="flex items-center justify-between gap-3 rounded-2xl bg-ink px-4 py-3 text-paper">
          <p className="flex items-center gap-2 text-sm">
            <Timer className="size-4" aria-hidden="true" />
            {timer.left > 0 ? formatClock(timer.left) : "Time. Tick the block."}
          </p>
          <button type="button" className="min-h-11 text-sm text-foam" onClick={() => setTimer(null)}>
            Stop
          </button>
        </div>
      )}

      <ol className="flex flex-col gap-3">
        {blocks.map((block) => {
          const Icon = kindIcon(block.kind);
          const on = activeId === block.id;
          const checked = state.checks.includes(`${iso}|${block.id}`);
          const copy = block.slot && session ? slotCopy(session, block.slot, state.shelter, compressed) : null;
          return (
            <li key={block.id} className="grid grid-cols-[4.5rem_1fr] gap-3">
              <div className="pt-3 text-right">
                <p className="text-sm font-medium tabular-nums">{block.start}</p>
                <p className="text-xs text-muted">{formatMinutes(spanMinutes(block.start, block.end))}</p>
              </div>
              <article className={kindClass(block.kind, on)}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <p className="flex items-center gap-2 text-xs tracking-wide text-muted uppercase">
                      <Icon className="size-3.5" aria-hidden="true" />
                      {on ? "Now" : block.kind === "play" ? "Protected" : copy?.kicker ?? block.kind}
                    </p>
                    <h2 className="mt-1 text-base font-medium">{copy?.title ?? block.title}</h2>
                  </div>
                  <button
                    type="button"
                    aria-pressed={checked}
                    aria-label={checked ? `Undo ${block.title}` : `Done: ${block.title}`}
                    onClick={() =>
                      setState((s) => ({ ...s, checks: toggleId(s.checks, `${iso}|${block.id}`) }))
                    }
                    className={
                      "flex size-11 shrink-0 items-center justify-center rounded-full " +
                      (checked ? "bg-sea text-paper" : "bg-paper text-muted ring-1 ring-line")
                    }
                  >
                    <Check className="size-4" aria-hidden="true" />
                  </button>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted">{copy?.body ?? block.detail}</p>
                {block.kind === "play" && (
                  <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-sea">
                    <Shield className="size-3.5" aria-hidden="true" />
                    Not a reward. Part of the day.
                  </p>
                )}
                {block.kind === "study" && (
                  <button
                    type="button"
                    className="mt-3 inline-flex min-h-11 items-center gap-2 text-sm font-medium text-sea"
                    onClick={() =>
                      setTimer({
                        blockId: block.id,
                        left: spanMinutes(block.start, block.end) * 60,
                        total: spanMinutes(block.start, block.end) * 60,
                      })
                    }
                  >
                    <Timer className="size-4" aria-hidden="true" />
                    Start this block
                  </button>
                )}
              </article>
            </li>
          );
        })}
      </ol>

      {session && (
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onMark}
            className="min-h-11 rounded-full bg-sea px-5 text-sm font-medium text-paper"
          >
            {marked ? "Session kept" : "Mark session done"}
          </button>
          {session.later && <p className="text-sm text-muted">Later: {session.later}</p>}
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-card px-3 py-3 ring-1 ring-line">
      <dt className="text-xs tracking-wide text-muted uppercase">{label}</dt>
      <dd className="mt-1 font-display text-2xl">{value}</dd>
    </div>
  );
}

function formatClock(total: number): string {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function Week({
  selected,
  start,
  done,
  onOpen,
}: {
  selected: string;
  start: string;
  done: string[];
  onOpen: (iso: string) => void;
}) {
  const monday = mondayOf(selected);
  const days = Array.from({ length: 7 }, (_, i) => addDays(monday, i));
  return (
    <div className="flex flex-col gap-4">
      <p className="text-sm text-muted">Tap a day. Sunday does not advance the path.</p>
      <ul className="flex w-full min-w-0 snap-x gap-3 overflow-x-auto pb-2 md:grid md:grid-cols-7 md:overflow-visible">
        {days.map((iso) => {
          const idx = studyIndex(start, iso);
          const session = idx == null ? null : sessions[idx % sessions.length];
          const name = session ? chapterById.get(session.primary)?.name : "Rest";
          const on = iso === selected;
          const finished = session ? done.includes(session.id) : false;
          return (
            <li key={iso} className="min-w-[70%] snap-start md:min-w-0">
              <button
                type="button"
                onClick={() => onOpen(iso)}
                className={
                  "flex h-full min-h-36 w-full flex-col items-start rounded-2xl px-3 py-3 text-left " +
                  (on ? "bg-sea text-paper" : "bg-card text-ink ring-1 ring-line")
                }
              >
                <span className={"text-xs tracking-wide uppercase " + (on ? "text-foam" : "text-muted")}>{pretty(iso)}</span>
                <span className="mt-2 text-sm leading-snug font-medium">{name}</span>
                {session && (
                  <span className={"mt-auto pt-3 text-xs " + (on ? "text-foam" : "text-sea")}>
                    {finished ? "Done" : phaseForWeek(session.week).name}
                  </span>
                )}
              </button>
            </li>
          );
        })}
      </ul>
      <WeekBars days={days} />
    </div>
  );
}

function WeekBars({ days }: { days: string[] }) {
  return (
    <div className="rounded-3xl bg-card p-4 ring-1 ring-line">
      <h2 className="font-display text-xl">Hours already decided</h2>
      <p className="mt-1 text-sm text-muted">Study against games. The games do not shrink on a school day.</p>
      <ul className="mt-4 flex flex-col gap-3">
        {days.map((iso) => {
          const blocks = isSunday(iso) ? sunday : schoolDay;
          const t = totals(blocks);
          const max = 420;
          return (
            <li key={iso} className="grid grid-cols-[4.5rem_1fr] items-center gap-3 text-sm">
              <span className="text-muted">{pretty(iso).split(" ")[0]}</span>
              <div className="flex h-3 overflow-hidden rounded-full bg-paper-2">
                <span className="h-full bg-sea" style={{ width: `${(t.study / max) * 100}%` }} />
                <span className="h-full bg-foam" style={{ width: `${(t.play / max) * 100}%` }} />
              </div>
            </li>
          );
        })}
      </ul>
      <p className="mt-3 flex gap-4 text-xs text-muted">
        <span className="inline-flex items-center gap-1">
          <i className="inline-block size-2 rounded-full bg-sea" /> Study
        </span>
        <span className="inline-flex items-center gap-1">
          <i className="inline-block size-2 rounded-full bg-foam ring-1 ring-line" /> Games
        </span>
      </p>
    </div>
  );
}

function Path({
  state,
  query,
  setQuery,
  onOpen,
}: {
  state: HelmState;
  query: string;
  setQuery: (q: string) => void;
  onOpen: (id: string) => void;
}) {
  const q = query.trim().toLowerCase();
  const weeks = Array.from(new Set(sessions.map((s) => s.week)));
  return (
    <div className="flex flex-col gap-6">
      <label className="block">
        <span className="sr-only">Search the path</span>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search a chapter"
          className="min-h-11 w-full rounded-2xl border border-line bg-card px-4 text-sm"
        />
      </label>
      <ul className="grid gap-3 md:grid-cols-2">
        {keels.map((keel) => (
          <li key={keel.title} className="rounded-2xl bg-card px-4 py-4 ring-1 ring-line">
            <h2 className="font-display text-xl">{keel.title}</h2>
            <ol className="mt-2 flex flex-col gap-1 text-sm text-muted">
              {keel.steps.map((step, i) => (
                <li key={step}>
                  <span className="mr-2 text-sea tabular-nums">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </li>
        ))}
      </ul>
      {weeks.map((week) => {
        const phase = phaseForWeek(week);
        const list = sessions.filter((s) => {
          if (s.week !== week) return false;
          if (!q) return true;
          const names = [s.primary, s.linked, s.evening].map((id) => chapterById.get(id)?.name ?? "");
          return [s.because, s.primaryFocus, ...names].join(" ").toLowerCase().includes(q);
        });
        if (list.length === 0) return null;
        return (
          <section key={week}>
            <h2 className="font-display text-2xl">
              Week {week}
              <span className="ml-2 text-base text-muted">{phase.name}</span>
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-relaxed text-muted">{phase.line}</p>
            <ul className="mt-3 flex flex-col gap-2">
              {list.map((s) => {
                const ch = chapterById.get(s.primary);
                const finished = state.done.includes(s.id);
                return (
                  <li key={s.id}>
                    <button
                      type="button"
                      onClick={() => onOpen(s.id)}
                      className="flex w-full min-h-11 items-start gap-3 rounded-2xl bg-card px-3 py-3 text-left ring-1 ring-line"
                    >
                      <span
                        className={
                          "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full " +
                          (finished ? "bg-sea text-paper" : "bg-paper-2 text-muted")
                        }
                      >
                        {finished ? <Check className="size-3.5" aria-hidden="true" /> : <span className="text-xs">{s.week}</span>}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-medium">{ch?.name}</span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-muted">{s.because}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}

function Syllabus({
  state,
  setState,
  level,
  setLevel,
  query,
  setQuery,
  right,
  wrong,
  setRight,
  setWrong,
  confirmReset,
  setConfirmReset,
}: {
  state: HelmState;
  setState: React.Dispatch<React.SetStateAction<HelmState>>;
  level: "All" | "11" | "12" | "CET";
  setLevel: (l: "All" | "11" | "12" | "CET") => void;
  query: string;
  setQuery: (q: string) => void;
  right: number;
  wrong: number;
  setRight: (n: number) => void;
  setWrong: (n: number) => void;
  confirmReset: boolean;
  setConfirmReset: (v: boolean) => void;
}) {
  const q = query.trim().toLowerCase();
  const score = right * 1 - wrong * 0.24;
  const visible = chapters.filter((ch) => {
    if (level !== "All" && ch.level !== level) return false;
    if (!q) return true;
    return `${ch.name} ${ch.subject} ${ch.note ?? ""}`.toLowerCase().includes(q);
  });

  return (
    <div className="flex flex-col gap-6">
      <section className="grid gap-3 md:grid-cols-3">
        <Fact title="School 11 & 12" body="Theory 70 or 80, plus practical or internal. English elective is 80 + a 20-mark seminar." />
        <Fact title="IMU CET" body="200 questions, 3 hours. Physics 50, Chemistry 20, Maths 50, English 40, Aptitude 20, GK 20." />
        <Fact
          title="Rank"
          body="No fixed cutoff. Campus BSc, BTech, or DNS needs rank. Private DNS needs a qualify plus a company. Under about 4000 keeps strong sponsors open."
        />
      </section>

      <section className="rounded-3xl bg-card p-4 ring-1 ring-line">
        <h2 className="font-display text-2xl">Marking lab</h2>
        <p className="mt-1 text-sm leading-relaxed text-muted">
          +1 for a right answer, −0.24 for a wrong one. A blank is zero, which is often the brave score.
        </p>
        <div className="mt-4 flex flex-wrap items-end gap-4">
          <Num label="Right" value={right} set={setRight} />
          <Num label="Wrong" value={wrong} set={setWrong} />
          <p className="pb-2">
            <span className="block text-xs tracking-wide text-muted uppercase">Score</span>
            <span className="font-display text-4xl">{score.toFixed(2)}</span>
          </p>
        </div>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          A blind guess on four options is worth about +0.07 if you truly know nothing — and less the moment you
          misread. If you cannot kill one option, leave it.
        </p>
        <button
          type="button"
          className="mt-3 min-h-11 text-sm font-medium text-sea"
          onClick={() =>
            setState((s) => ({
              ...s,
              scores: [{ iso: clientToday(), correct: right, wrong, label: "Slice" }, ...s.scores].slice(0, 6),
            }))
          }
        >
          Save this slice
        </button>
        {state.scores.length > 0 && (
          <ul className="mt-3 flex flex-col gap-1 text-sm text-muted">
            {state.scores.map((row, i) => (
              <li key={`${row.iso}-${i}`}>
                {pretty(row.iso)} · {row.correct} right, {row.wrong} wrong · {(row.correct - row.wrong * 0.24).toFixed(2)}
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search syllabus"
          className="min-h-11 flex-1 rounded-2xl border border-line bg-card px-4 text-sm"
        />
        <div className="flex gap-2">
          {(["All", "11", "12", "CET"] as const).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setLevel(item)}
              className={
                "min-h-11 rounded-full px-3 text-sm " +
                (level === item ? "bg-sea text-paper" : "bg-card ring-1 ring-line")
              }
            >
              {item === "All" ? "All" : item === "CET" ? "CET" : `Class ${item}`}
            </button>
          ))}
        </div>
      </div>

      {subjects.map((subject) => {
        const rows = visible.filter((ch) => ch.subject === subject);
        if (rows.length === 0) return null;
        const ticked = rows.filter((ch) => state.ticks.includes(ch.id)).length;
        return (
          <section key={subject}>
            <h2 className="flex items-baseline justify-between font-display text-2xl">
              {subject}
              <span className="text-sm text-muted">
                {ticked}/{rows.length}
              </span>
            </h2>
            <ul className="mt-2 overflow-hidden rounded-2xl ring-1 ring-line">
              {rows.map((ch) => (
                <ChapterRow
                  key={ch.id}
                  chapter={ch}
                  on={state.ticks.includes(ch.id)}
                  onToggle={() => setState((s) => ({ ...s, ticks: toggleId(s.ticks, ch.id) }))}
                />
              ))}
            </ul>
          </section>
        );
      })}

      <div className="pt-2">
        {confirmReset ? (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="min-h-11 rounded-full bg-ink px-4 text-sm text-paper"
              onClick={() => {
                setState({ ...initialState() });
                setConfirmReset(false);
              }}
            >
              Yes, clear this plan
            </button>
            <button type="button" className="min-h-11 px-4 text-sm" onClick={() => setConfirmReset(false)}>
              Keep it
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted"
            onClick={() => setConfirmReset(true)}
          >
            <RotateCcw className="size-4" aria-hidden="true" />
            Reset ticks and days
          </button>
        )}
      </div>
    </div>
  );
}

function initialState(): HelmState {
  return {
    start: PLAN_START,
    done: [],
    checks: [],
    offSchool: [],
    ticks: [],
    compressed: [],
    shelter: false,
    seenIntro: true,
    scores: [],
  };
}

function Fact({ title, body }: { title: string; body: string }) {
  return (
    <article className="rounded-2xl bg-card px-4 py-4 ring-1 ring-line">
      <h2 className="font-display text-xl">{title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-muted">{body}</p>
    </article>
  );
}

function Num({ label, value, set }: { label: string; value: number; set: (n: number) => void }) {
  return (
    <label className="text-sm">
      <span className="block text-xs tracking-wide text-muted uppercase">{label}</span>
      <input
        type="number"
        min={0}
        inputMode="numeric"
        value={value}
        onChange={(e) => set(Math.max(0, Number(e.target.value) || 0))}
        className="mt-1 w-24 rounded-xl border border-line bg-paper px-3 py-2 text-lg"
      />
    </label>
  );
}

function ChapterRow({ chapter, on, onToggle }: { chapter: Chapter; on: boolean; onToggle: () => void }) {
  return (
    <li className="border-b border-line last:border-b-0">
      <button type="button" onClick={onToggle} className="flex min-h-11 w-full items-start gap-3 bg-card px-3 py-3 text-left">
        <span
          className={
            "mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full " +
            (on ? "bg-sea text-paper" : "bg-paper text-transparent ring-1 ring-line")
          }
        >
          <Check className="size-3.5" aria-hidden="true" />
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium">{chapter.name}</span>
          <span className="mt-0.5 block text-xs text-muted">
            {chapter.level === "CET" ? "CET" : `Class ${chapter.level}`}
            {chapter.weight ? ` · ${chapter.weight}${/^\d+$/.test(chapter.weight) ? " marks" : ""}` : ""}
            {chapter.note ? ` · ${chapter.note}` : ""}
          </span>
        </span>
      </button>
    </li>
  );
}
