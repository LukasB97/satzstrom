import { Children, cloneElement, isValidElement, type ReactNode } from "react";
import {
  Flow,
  Math as Formula,
  PageMaster,
  Sequence,
  defineSequence,
  type PageLayoutProps,
} from "@satzstrom/primitives";

const statements = defineSequence({ name: "statements" });

type StatementProps = {
  id?: string;
  number?: string;
  title?: string;
  children: ReactNode;
};

type StatementKind = "Satz" | "Lemma" | "Folgerung";

function isParagraph(element: ReactNode) {
  return isValidElement(element) && element.type === "p";
}

function prependLead(children: ReactNode, lead: ReactNode) {
  const nodes = Children.toArray(children);
  const first = nodes[0];

  if (isValidElement<{ children?: ReactNode }>(first) && isParagraph(first)) {
    nodes[0] = cloneElement(first, {}, lead, " ", first.props.children);
    return nodes;
  }

  return [<p key="lead">{lead}</p>, ...nodes];
}

function appendEndMark(nodes: ReactNode[]) {
  const result = [...nodes];
  const lastIndex = result.length - 1;
  const last = result[lastIndex];
  const mark = (
    <span className="proof__qed" aria-label="Ende des Beweises">
      □
    </span>
  );

  if (isValidElement<{ children?: ReactNode }>(last) && isParagraph(last)) {
    result[lastIndex] = cloneElement(last, {}, last.props.children, " ", mark);
    return result;
  }

  result.push(<p key="qed">{mark}</p>);
  return result;
}

function Statement({
  kind,
  id,
  number: fixedNumber,
  title,
  children,
}: StatementProps & { kind: StatementKind }) {
  return (
    <Sequence sequence={statements} id={id} title={title}>
      {({ number }) => (
        <section className="statement" data-statement-kind={kind}>
          <div className="statement__body">
            {prependLead(
              children,
              <span className="statement__heading">
                <strong>
                  {fixedNumber ? (
                    <span className="statement__sequence-anchor">{number}</span>
                  ) : null}
                  {kind} {fixedNumber ?? number}.
                </strong>
                {title ? <span> {title}.</span> : null}
              </span>,
            )}
          </div>
        </section>
      )}
    </Sequence>
  );
}

export function Theorem(props: StatementProps) {
  return <Statement kind="Satz" {...props} />;
}

export function Lemma(props: StatementProps) {
  return <Statement kind="Lemma" {...props} />;
}

export function Corollary(props: StatementProps) {
  return <Statement kind="Folgerung" {...props} />;
}

export function Proof({ title = "Beweis", children }: { title?: string; children: ReactNode }) {
  const body = appendEndMark(
    prependLead(children, <span className="proof__heading">{title}.</span>),
  );

  return (
    <section className="proof">
      <div className="proof__body">{body}</div>
    </section>
  );
}

export function Equation({
  children,
  label,
  number,
  className,
}: {
  children: string;
  label: string;
  number?: string;
  className?: string;
}) {
  return (
    <div className={className ? `equation-row ${className}` : "equation-row"}>
      <Formula display label={label}>
        {children}
      </Formula>
      {number ? <span className="equation-number">({number})</span> : null}
    </div>
  );
}

function MathPage({ page }: PageLayoutProps) {
  return (
    <article className="math-page">
      <Flow className="math-page__content" />
      <footer className="math-page__folio" aria-hidden="true">
        {page}
      </footer>
    </article>
  );
}

export function MathPages({ children }: { children: ReactNode }) {
  return (
    <PageMaster layout={MathPage} size="A4" className="math-pages">
      {children}
    </PageMaster>
  );
}
