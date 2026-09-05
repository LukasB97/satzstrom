import type { ReactNode } from "react";
import { Page, Sequence, defineSequence } from "@satzstrom/primitives";
import { PageFrame, type PageMargins } from "../shared/page-frame";

export const sections = defineSequence({
  name: "board-sections",
  titleRequired: true,
});

export function BoardPage({
  title,
  children,
  size = "A4",
  orientation = "portrait",
  margin = { top: 18, right: 17, bottom: 20, left: 17 },
  className = "",
}: {
  title: string;
  children: ReactNode;
  size?: "A3" | "A4";
  orientation?: "portrait" | "landscape";
  margin?: PageMargins;
  className?: string;
}) {
  return (
    <Page size={size} orientation={orientation} className={className}>
      {({ page, pages }) => (
        <PageFrame
          page={page}
          pages={pages}
          margin={margin}
          header={title}
          footer={`BOARD CONFIDENTIAL · ${page} / ${pages}`}
        >
          {children}
        </PageFrame>
      )}
    </Page>
  );
}

export function BoardSection({
  id,
  title,
  eyebrow,
  children,
  size,
  orientation,
  margin,
  className = "",
}: {
  id: string;
  title: string;
  eyebrow: string;
  children: ReactNode;
  size?: "A3" | "A4";
  orientation?: "portrait" | "landscape";
  margin?: PageMargins;
  className?: string;
}) {
  return (
    <BoardPage
      title={title}
      size={size}
      orientation={orientation}
      margin={margin}
      className={className}
    >
      <Sequence sequence={sections} id={id} title={title}>
        {({ number }) => (
          <section>
            <header
              style={{ breakInside: "avoid-page", breakAfter: "avoid-page" }}
              className="mb-[7mm] flex items-end justify-between border-b border-line pb-[4mm]"
            >
              <div>
                <div className="mb-[1.5mm] text-[7pt] font-bold tracking-[.16em] text-blue uppercase">
                  {eyebrow}
                </div>
                <h1 className="m-0 text-[26pt] leading-none font-semibold tracking-[-.035em] text-navy">
                  {title}
                </h1>
              </div>
              <div className="text-[8pt] font-semibold text-slatecopy">{number}</div>
            </header>
            {children}
          </section>
        )}
      </Sequence>
    </BoardPage>
  );
}
