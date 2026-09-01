import {
  isValidElement,
  useContext,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import ReactMarkdown, { type Components, type ExtraProps } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import { Math } from "./content.js";
import { DocumentLabelsContext, DocumentLanguageContext } from "./document-context.js";

export type MarkdownLabels = {
  footnotes?: string;
  backToReference?: (referenceIndex: number, rereferenceIndex: number) => string;
};

export type MarkdownProps = {
  children: string;
  labels?: MarkdownLabels;
};

type CodeProps = ComponentPropsWithoutRef<"code"> & ExtraProps;
type PreProps = ComponentPropsWithoutRef<"pre"> & ExtraProps;
type AnchorProps = ComponentPropsWithoutRef<"a"> & ExtraProps;
type HeadingProps = ComponentPropsWithoutRef<"h2"> & ExtraProps;

export function Markdown({ children, labels }: MarkdownProps) {
  const language = useContext(DocumentLanguageContext);
  const documentLabels = useContext(DocumentLabelsContext);
  const defaultLabels = labelsFor(language);
  const footnotePrefix = `rr-markdown-${useId().replaceAll(":", "")}-`;
  const footnoteLabelId = `${footnotePrefix}footnote-label`;
  const components: Components = {
    code: MarkdownCode,
    pre: MarkdownPre,
    a: (props) => MarkdownAnchor(props, footnoteLabelId),
    h2: (props) => MarkdownHeading(props, footnoteLabelId),
  };
  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm, [remarkMath, { singleDollarTextMath: false }]]}
      remarkRehypeOptions={{
        clobberPrefix: footnotePrefix,
        footnoteLabel: labels?.footnotes ?? documentLabels.footnotes ?? defaultLabels.footnotes,
        footnoteBackLabel: labels?.backToReference ?? defaultLabels.backToReference,
      }}
      skipHtml
    >
      {children}
    </ReactMarkdown>
  );
}

function labelsFor(language: string | undefined): Required<MarkdownLabels> {
  if (language?.toLowerCase().split("-")[0] === "de") {
    return {
      footnotes: "Fußnoten",
      backToReference: (referenceIndex, rereferenceIndex) =>
        `Zurück zu Verweis ${referenceIndex + 1}${rereferenceIndex > 1 ? `-${rereferenceIndex}` : ""}`,
    };
  }
  return {
    footnotes: "Footnotes",
    backToReference: (referenceIndex, rereferenceIndex) =>
      `Back to reference ${referenceIndex + 1}${rereferenceIndex > 1 ? `-${rereferenceIndex}` : ""}`,
  };
}

function MarkdownAnchor({ node, ...props }: AnchorProps, footnoteLabelId: string) {
  void node;
  const describedBy = props["aria-describedby"];
  return (
    <a
      {...props}
      aria-describedby={describedBy === "footnote-label" ? footnoteLabelId : describedBy}
    />
  );
}

function MarkdownHeading({ id, node, ...props }: HeadingProps, footnoteLabelId: string) {
  void node;
  if (id !== "footnote-label") return <h2 id={id} {...props} />;
  return (
    <h2
      {...props}
      id={footnoteLabelId}
      style={{
        position: "absolute",
        width: 1,
        height: 1,
        padding: 0,
        margin: -1,
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        fontSize: 0,
        lineHeight: 0,
        border: 0,
        ...props.style,
      }}
    />
  );
}

function MarkdownCode({ children, className, node, ...props }: CodeProps) {
  void node;
  if (hasClass(className, "math-inline")) {
    return <Math>{textContent(children)}</Math>;
  }
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

function MarkdownPre({ children, node, ...props }: PreProps) {
  void node;
  if (isValidElement<CodeProps>(children) && hasClass(children.props.className, "math-display")) {
    return <Math display>{textContent(children.props.children)}</Math>;
  }
  return <pre {...props}>{children}</pre>;
}

function hasClass(className: string | undefined, name: string) {
  return className?.split(/\s+/u).includes(name) ?? false;
}

function textContent(children: ReactNode): string {
  if (Array.isArray(children)) return children.map(textContent).join("");
  if (typeof children === "string" || typeof children === "number") {
    return String(children);
  }
  return "";
}
