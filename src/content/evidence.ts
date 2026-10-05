import data from "./evidence.json";

export type AuditResult = {
  id: string;
  title: string;
  score: number | null;
  scoreDisplayMode: string;
  displayValue: string;
};

export type Evidence = {
  generatedAt: string;
  targetUrl: string;
  lighthouseVersion: string;
  chromeVersion: string;
  chromeFlags: string[];
  pages: { path: string; audits: AuditResult[] }[];
  webmcpTools: { page: string; name: string; description: string; kind: string }[];
  verifier: { passed: number; total: number; failures: { target: string; check: string; detail: string }[] };
};

export const evidence: Evidence = data;

export type AuditOutcome = "Passed" | "Failed" | "Not applicable" | "Informational";

export function auditOutcome(audit: AuditResult): AuditOutcome {
  if (audit.scoreDisplayMode === "notApplicable") return "Not applicable";
  if (audit.scoreDisplayMode === "informative") return "Informational";
  return audit.score === 1 ? "Passed" : "Failed";
}

export function scoredSummary(audits: AuditResult[]): { passed: number; scored: number } {
  const scored = audits.map(auditOutcome).filter((outcome) => outcome === "Passed" || outcome === "Failed");
  return { passed: scored.filter((outcome) => outcome === "Passed").length, scored: scored.length };
}

export const evidenceDate = evidence.generatedAt.slice(0, 10);
