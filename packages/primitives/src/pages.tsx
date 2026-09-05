import {
  createContext,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ComponentType,
  type ReactNode,
} from "react";
import { useLayoutState } from "./layout-store.js";
import {
  DocumentLabelsContext,
  DocumentLanguageContext,
  resolveDocumentLabels,
  type DocumentLabels,
} from "./document-context.js";
import type { SequenceDefinition } from "./sequences.js";
import type {
  DocumentMetadata,
  PageContext,
  PageLayoutProps,
  PageSettings,
  PageSizeName,
} from "./types.js";

const pageSizes: Record<PageSizeName, [number, number]> = {
  A0: [841, 1189],
  A1: [594, 841],
  A2: [420, 594],
  A3: [297, 420],
  A4: [210, 297],
  A5: [148, 210],
  Letter: [215.9, 279.4],
  Legal: [215.9, 355.6],
};

function pageAttributes(settings: PageSettings = {}) {
  if (settings.bleed !== undefined && (!Number.isFinite(settings.bleed) || settings.bleed < 0)) {
    throw new Error("bleed must be a positive millimeter value or 0.");
  }
  const size = settings.size ?? "A4";
  let [width, height] = typeof size === "string" ? pageSizes[size] : [size.width, size.height];
  if (settings.orientation === "landscape") [width, height] = [height, width];
  return {
    "data-rr-page-width": width,
    "data-rr-page-height": height,
    "data-rr-page-bleed": settings.bleed ?? 0,
    "data-rr-crop-marks": settings.cropMarks ? "true" : "false",
  };
}

export type DocumentProps = DocumentMetadata & {
  children: ReactNode;
  dir?: "ltr" | "rtl";
  className?: string;
  bookmarks?: SequenceDefinition<boolean>;
  labels?: DocumentLabels;
};

export type { DocumentLabels } from "./document-context.js";

const PageMasterLayoutContext = createContext(false);

export type FlowProps = Omit<
  ComponentPropsWithoutRef<"div">,
  "children" | "dangerouslySetInnerHTML"
>;

export function Flow(props: FlowProps) {
  if (!useContext(PageMasterLayoutContext)) {
    throw new Error("Flow can only be used inside a PageMaster layout.");
  }
  return <div {...props} data-rr-master-flow="" />;
}

export function Document({
  children,
  title,
  author,
  subject,
  keywords,
  lang = "de",
  dir = "ltr",
  className = "",
  bookmarks,
  labels,
}: DocumentProps) {
  const resolvedLabels = resolveDocumentLabels(lang, labels);
  return (
    <DocumentLanguageContext value={lang}>
      <DocumentLabelsContext value={resolvedLabels}>
        <article
          className={`rr-document ${className}`}
          data-rr-document=""
          data-rr-document-label={resolvedLabels.document}
          data-rr-footnotes-label={resolvedLabels.footnotes}
          data-rr-title={title}
          data-rr-author={author}
          data-rr-subject={subject}
          data-rr-keywords={keywords ? JSON.stringify(keywords) : undefined}
          data-rr-bookmarks={bookmarks?.name ?? ""}
          lang={lang}
          dir={dir}
        >
          {children}
        </article>
      </DocumentLabelsContext>
    </DocumentLanguageContext>
  );
}

export type PageMasterProps = {
  children: ReactNode;
  layout?: ComponentType<PageLayoutProps>;
  size?: PageSettings["size"];
  orientation?: PageSettings["orientation"];
  bleed?: PageSettings["bleed"];
  cropMarks?: PageSettings["cropMarks"];
  className?: string;
};

export function PageMaster({
  children,
  layout: Layout,
  size,
  orientation,
  bleed,
  cropMarks,
  className = "",
}: PageMasterProps) {
  const id = `rr-master-${useId().replaceAll(":", "")}`;
  const state = useLayoutState();
  const region = state.regions[id];
  const start = region?.start ?? 1;
  const count = region?.pages ?? 1;
  const pages = globalThis.Math.max(1, state.pages);
  return (
    <section
      className={className}
      data-rr-page-master={id}
      data-rr-page-class={className}
      {...pageAttributes({ size, orientation, bleed, cropMarks })}
    >
      <div data-rr-page-master-source="">{children}</div>
      {Layout ? (
        <div data-rr-master-templates={id} hidden aria-hidden="true">
          {Array.from({ length: count }, (_, index) => {
            const page = start + index;
            return (
              <div key={page} data-rr-master-template={page}>
                <div data-rr-master-root="">
                  <PageMasterLayoutContext value>
                    <Layout page={page} pages={pages} />
                  </PageMasterLayoutContext>
                </div>
              </div>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

export type PageProps = Omit<ComponentPropsWithoutRef<"section">, "children"> &
  PageSettings & {
    children: ReactNode | ((context: PageContext) => ReactNode);
  };

export function Page({
  children,
  size,
  orientation,
  bleed,
  cropMarks,
  className = "",
  ...props
}: PageProps) {
  const id = `rr-page-${useId().replaceAll(":", "")}`;
  const state = useLayoutState();
  const page = state.explicitPages[id] ?? 1;
  const content =
    typeof children === "function"
      ? children({ page, pages: globalThis.Math.max(1, state.pages) })
      : children;
  return (
    <section
      {...props}
      className={className}
      data-rr-explicit-page={id}
      data-rr-page-class={className}
      {...pageAttributes({ size, orientation, bleed, cropMarks })}
    >
      {content}
    </section>
  );
}

export function PageBreak() {
  return <div data-rr-page-break="" aria-hidden="true" />;
}
