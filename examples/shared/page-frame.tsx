import { cloneElement, isValidElement, type ReactNode } from "react";
import { Flow, type FlowProps, type PageContext } from "@satzstrom/primitives";

export type PageMargins = number | { top: number; right: number; bottom: number; left: number };

type PageFrameProps = PageContext & {
  children: ReactNode;
  margin?: PageMargins;
  header?: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function PageFrame({
  children,
  margin = { top: 22, right: 20, bottom: 22, left: 20 },
  header,
  footer,
  className = "",
}: PageFrameProps) {
  const value =
    typeof margin === "number"
      ? { top: margin, right: margin, bottom: margin, left: margin }
      : margin;
  const contentStyle = { gridColumn: 2, gridRow: 2, minHeight: 0, minWidth: 0 };
  const content =
    isValidElement<FlowProps>(children) && children.type === Flow
      ? cloneElement(children, {
          style: { width: "100%", height: "100%", ...children.props.style },
        })
      : children;
  return (
    <div
      className={className}
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        gridTemplateColumns: `${value.left}mm minmax(0, 1fr) ${value.right}mm`,
        gridTemplateRows: `${value.top}mm minmax(0, 1fr) ${value.bottom}mm`,
      }}
    >
      <header
        className="rr-page-header"
        aria-hidden="true"
        style={{
          left: `${value.left}mm`,
          right: `${value.right}mm`,
          top: `${Math.max(4, value.top * 0.42)}mm`,
        }}
      >
        {header}
      </header>
      <main style={contentStyle}>{content}</main>
      <footer
        className="rr-page-footer"
        aria-hidden="true"
        style={{
          left: `${value.left}mm`,
          right: `${value.right}mm`,
          bottom: `${Math.max(4, value.bottom * 0.38)}mm`,
        }}
      >
        {footer}
      </footer>
    </div>
  );
}
