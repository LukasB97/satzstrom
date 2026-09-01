import React, { type ComponentPropsWithoutRef, type ElementType } from "react";

type RepeatBoxOwnProps<E extends ElementType> = {
  as?: E;
};

export type RepeatBoxProps<E extends ElementType = "div"> = RepeatBoxOwnProps<E> &
  Omit<ComponentPropsWithoutRef<E>, keyof RepeatBoxOwnProps<E>>;

export function RepeatBox<E extends ElementType = "div">({ as, ...props }: RepeatBoxProps<E>) {
  const Component = (as ?? "div") as ElementType;
  return React.createElement(Component, {
    ...props,
    "data-rr-repeat-box": "",
  });
}
