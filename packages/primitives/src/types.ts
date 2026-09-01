export type PageSizeName = "A0" | "A1" | "A2" | "A3" | "A4" | "A5" | "Letter" | "Legal";

export type PageSettings = {
  size?: PageSizeName | { width: number; height: number };
  orientation?: "portrait" | "landscape";
  bleed?: number;
  cropMarks?: boolean;
};

export type DocumentMetadata = {
  title: string;
  author?: string;
  subject?: string;
  keywords?: string[];
  lang?: string;
};

export type Diagnostic = {
  code: string;
  severity: "warning" | "error";
  message: string;
  page?: number;
  element?: string;
  source?: { file: string; line: number; column: number };
};

export type RenderResult =
  | { ok: true; pdfPath: string; pages: number; diagnostics: Diagnostic[] }
  | { ok: false; diagnostics: Diagnostic[] };

export type PageContext = {
  page: number;
  pages: number;
};

export type PageLayoutProps = PageContext;

export type SequenceEntry = {
  id: string;
  number: string;
  title?: string;
  page: number;
  depth: number;
  parentId?: string;
};

export type ReferenceTarget = {
  id: string;
  number?: string;
  title?: string;
  page: number;
};

export type LayoutState = {
  pages: number;
  sequences: Record<string, SequenceEntry[]>;
  targets: Record<string, ReferenceTarget>;
  regions: Record<string, { start: number; pages: number }>;
  explicitPages: Record<string, number>;
};
