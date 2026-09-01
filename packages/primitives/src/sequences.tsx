import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useId,
  useMemo,
  type ReactElement,
  type ReactNode,
} from "react";
import { useLayoutState } from "./layout-store.js";
import { DocumentLabelsContext } from "./document-context.js";
import type { SequenceEntry } from "./types.js";

export type SequenceDefinition<TitleRequired extends boolean = boolean> = Readonly<{
  name: string;
  titleRequired: TitleRequired;
}>;

export function defineSequence<const TitleRequired extends boolean = false>(config: {
  name: string;
  titleRequired?: TitleRequired;
}): SequenceDefinition<TitleRequired> {
  if (!/^[A-Za-z][A-Za-z0-9_-]*$/.test(config.name)) {
    throw new Error(`Ungültiger Sequence-Name: ${config.name}`);
  }
  return Object.freeze({
    name: config.name,
    titleRequired: Boolean(config.titleRequired) as TitleRequired,
  });
}

type SequenceParent = { itemId: string; depth: number };
const SequenceContext = createContext<Record<string, SequenceParent>>({});

type SequenceRenderValue = {
  number: ReactNode;
  title: string | undefined;
  depth: number;
};

type SequenceBaseProps<S extends SequenceDefinition<boolean>> = {
  sequence: S;
  id?: string;
  numberLabel?: string;
  children: (value: SequenceRenderValue) => ReactNode;
};

type SequenceTitleProps<S extends SequenceDefinition<boolean>> =
  S extends SequenceDefinition<true> ? { title: string } : { title?: string };

export type SequenceProps<S extends SequenceDefinition<boolean>> = SequenceBaseProps<S> &
  SequenceTitleProps<S>;

export function Sequence<S extends SequenceDefinition<boolean>>({
  sequence,
  id,
  title,
  numberLabel,
  children,
}: SequenceProps<S>) {
  const parents = useContext(SequenceContext);
  const labels = useContext(DocumentLabelsContext);
  const reactId = useId().replaceAll(":", "");
  const itemId = `${sequence.name}-${reactId}`;
  const parent = parents[sequence.name];
  const depth = (parent?.depth ?? 0) + 1;
  const targetId = id ?? `rr-${itemId}`;
  const nextParents = useMemo(
    () => ({ ...parents, [sequence.name]: { itemId, depth } }),
    [parents, sequence.name, itemId, depth],
  );
  const number = (
    <span
      id={targetId}
      data-rr-sequence-number={itemId}
      aria-label={numberLabel ?? labels.sequenceNumber(sequence.name)}
    />
  );

  return (
    <>
      <span
        hidden
        data-rr-sequence-item={itemId}
        data-rr-sequence-name={sequence.name}
        data-rr-sequence-parent={parent?.itemId ?? ""}
        data-rr-sequence-depth={depth}
        data-rr-sequence-target={targetId}
        data-rr-sequence-title={title ?? ""}
        data-rr-sequence-has-title={title === undefined ? "false" : "true"}
        data-rr-sequence-title-required={sequence.titleRequired ? "true" : "false"}
      />
      <SequenceContext.Provider value={nextParents}>
        {children({ number, title, depth })}
      </SequenceContext.Provider>
    </>
  );
}

export type RefProps = {
  target: string;
  value?: "number" | "title" | "page";
  className?: string;
};

export function Ref({ target, value = "number", className }: RefProps) {
  const resolved = useLayoutState().targets[target];
  const text = resolved
    ? value === "page"
      ? String(resolved.page)
      : value === "title"
        ? (resolved.title ?? "?")
        : (resolved.number ?? "?")
    : "?";
  return (
    <a href={`#${target}`} className={className} data-rr-ref={target} data-rr-ref-value={value}>
      {text}
    </a>
  );
}

export type ContentsChildProps = {
  entries?: SequenceEntry[];
};

type ContentsBaseProps = {
  sequence: SequenceDefinition<boolean>;
};

export type ContentsProps = ContentsBaseProps &
  (
    | {
        asChild: true;
        children: ReactElement<ContentsChildProps>;
        className?: never;
      }
    | { asChild?: false; children?: never; className?: string }
  );

export function Contents(props: ContentsProps) {
  const entries = useLayoutState().sequences[props.sequence.name] ?? [];
  if (props.asChild) {
    const child = Children.only(props.children);
    return cloneElement(child, { entries });
  }
  return <DefaultContents entries={entries} className={props.className ?? ""} />;
}

function DefaultContents({ entries, className }: { entries: SequenceEntry[]; className: string }) {
  const visible = entries.filter((entry) => entry.title !== undefined);
  const ids = new Set(visible.map((entry) => entry.id));
  const children = new Map<string, SequenceEntry[]>();
  for (const entry of visible) {
    const parent = entry.parentId && ids.has(entry.parentId) ? entry.parentId : "";
    const values = children.get(parent) ?? [];
    values.push(entry);
    children.set(parent, values);
  }
  const render = (parentId = ""): ReactNode => (
    <ol
      className={parentId ? "rr-contents-children" : "rr-contents-list"}
      data-rr-block={parentId ? undefined : ""}
      data-rr-split={parentId ? undefined : "items"}
    >
      {(children.get(parentId) ?? []).map((entry) => (
        <li key={entry.id} data-rr-contents-depth={entry.depth}>
          <a href={`#${entry.id}`}>
            <span className="rr-contents-number">{entry.number}</span>
            <span className="rr-contents-title">{entry.title}</span>
            <span className="rr-contents-page">{entry.page}</span>
          </a>
          {children.has(entry.id) ? render(entry.id) : null}
        </li>
      ))}
    </ol>
  );
  return <nav className={`rr-contents ${className}`}>{render()}</nav>;
}
