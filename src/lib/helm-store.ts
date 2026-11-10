import { useEffect, useState } from "react";
import { PLAN_START } from "@/lib/dates";

export type ScoreRow = {
  iso: string;
  correct: number;
  wrong: number;
  label: string;
};

export type HelmState = {
  start: string;
  done: string[];
  checks: string[];
  offSchool: string[];
  ticks: string[];
  compressed: string[];
  shelter: boolean;
  seenIntro: boolean;
  scores: ScoreRow[];
};

const KEY = "helm-plan-v1";

export const initialHelm: HelmState = {
  start: PLAN_START,
  done: [],
  checks: [],
  offSchool: [],
  ticks: [],
  compressed: [],
  shelter: false,
  seenIntro: false,
  scores: [],
};

export function useHelm() {
  const [state, setState] = useState<HelmState>(initialHelm);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<HelmState>;
        setState({ ...initialHelm, ...parsed });
      }
    } catch {
      /* keep the default plan */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    localStorage.setItem(KEY, JSON.stringify(state));
  }, [state, ready]);

  return { state, setState, ready };
}

export function toggleId(list: string[], id: string): string[] {
  return list.includes(id) ? list.filter((item) => item !== id) : [...list, id];
}
