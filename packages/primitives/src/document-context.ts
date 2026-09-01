import { createContext } from "react";

export const DocumentLanguageContext = createContext<string | undefined>(undefined);

export type DocumentLabels = {
  document?: string;
  footnote?: string;
  footnotes?: string;
  sequenceNumber?: (name: string) => string;
};

export type ResolvedDocumentLabels = Required<DocumentLabels>;

const englishLabels: ResolvedDocumentLabels = {
  document: "Document",
  footnote: "Footnote",
  footnotes: "Footnotes",
  sequenceNumber: (name) => `${name} number`,
};

export const DocumentLabelsContext = createContext<ResolvedDocumentLabels>(englishLabels);

export function resolveDocumentLabels(
  language: string | undefined,
  labels: DocumentLabels = {},
): ResolvedDocumentLabels {
  const defaults: ResolvedDocumentLabels =
    language?.toLowerCase().split("-")[0] === "de"
      ? {
          document: "Dokument",
          footnote: "Fußnote",
          footnotes: "Fußnoten",
          sequenceNumber: (name) => `${name} Nummer`,
        }
      : englishLabels;
  return { ...defaults, ...labels };
}
