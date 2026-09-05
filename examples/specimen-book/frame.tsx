import type { ReactNode } from "react";
import { Sequence, defineSequence } from "@satzstrom/primitives";

export const specimens = defineSequence({ name: "specimens", titleRequired: true });
export const figures = defineSequence({ name: "specimen-figures", titleRequired: true });

export function Specimen({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: (number: ReactNode) => ReactNode;
}) {
  return (
    <Sequence sequence={specimens} id={id} title={title}>
      {({ number }) => children(number)}
    </Sequence>
  );
}

export function Figure({
  id,
  title,
  children,
  className = "",
}: {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Sequence sequence={figures} id={id} title={title}>
      {({ number }) => (
        <figure className={className}>
          {children}
          <figcaption>
            <b>FIG {number}</b>
            <span>{title}</span>
          </figcaption>
        </figure>
      )}
    </Sequence>
  );
}
