import { useContext, useEffect, useId, useRef, type ReactNode } from "react";
import katex from "katex";
import { DocumentLabelsContext } from "./document-context.js";

export function Footnote({ children, label }: { children: ReactNode; label?: string }) {
  const key = useId().replaceAll(":", "");
  const id = `rr-footnote-${key}`;
  const labels = useContext(DocumentLabelsContext);
  const resolvedLabel = label ?? labels.footnote;
  return (
    <>
      <sup className="rr-footnote-call" data-rr-footnote-call={key} data-rr-atomic="">
        <a href={`#${id}`} aria-label={resolvedLabel} data-rr-label={resolvedLabel} />
      </sup>
      <span id={id} data-rr-footnote-key={key} data-rr-footnote-content="" hidden>
        {children}
      </span>
    </>
  );
}

export function Math({
  children,
  display = false,
  label,
}: {
  children: string;
  display?: boolean;
  label?: string;
}) {
  let html: string;
  try {
    html = katex.renderToString(children, {
      displayMode: display,
      throwOnError: false,
      output: "htmlAndMathml",
      strict: "warn",
    });
  } catch {
    html = `<span>${escapeHtml(children)}</span>`;
  }
  const Tag = display ? "div" : "span";
  return (
    <Tag
      className={display ? "rr-math rr-math-display" : "rr-math rr-math-inline"}
      data-rr-block={display ? "" : undefined}
      data-rr-atomic=""
      data-rr-math-label={label ?? ""}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function escapeHtml(value: string) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

declare global {
  interface Window {
    __RR_PENDING__?: number;
  }
}

export function useRenderReady(ready: boolean) {
  const pending = useRef(false);
  useEffect(() => {
    if (!ready && !pending.current) {
      window.__RR_PENDING__ = (window.__RR_PENDING__ ?? 0) + 1;
      pending.current = true;
    }
    if (ready && pending.current) {
      window.__RR_PENDING__ = globalThis.Math.max(0, (window.__RR_PENDING__ ?? 1) - 1);
      pending.current = false;
    }
    return () => {
      if (pending.current) {
        window.__RR_PENDING__ = globalThis.Math.max(0, (window.__RR_PENDING__ ?? 1) - 1);
        pending.current = false;
      }
    };
  }, [ready]);
}
