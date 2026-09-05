export type BoardData = {
  company: string;
  period: string;
  meetingDate: string;
  classification: string;
  kpis: Array<{ label: string; value: string; change: string; note: string }>;
  quarters: Array<{ label: string; revenue: number; plan: number }>;
  segments: Array<{
    name: string;
    arr: string;
    growth: string;
    margin: string;
    share: number;
  }>;
  pipeline: Array<{
    stage: string;
    value: string;
    count: number;
    coverage: string;
    width: number;
  }>;
  risks: Array<{
    id: string;
    title: string;
    owner: string;
    impact: number;
    likelihood: number;
    trend: "up" | "down" | "flat";
    mitigation: string;
  }>;
  programs: Array<{
    name: string;
    workstream: string;
    owner: string;
    start: number;
    end: number;
    status: "on-track" | "watch" | "complete";
    outcome: string;
  }>;
  decisions: Array<{
    id: string;
    title: string;
    ask: string;
    recommendation: string;
    rationale: string;
  }>;
};
