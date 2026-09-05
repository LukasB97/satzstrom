import "./styles.css";
import type { ReactNode } from "react";
import { Document, Page, type PageContext } from "@satzstrom/primitives";
import { CoverOrbit, MaterialField, SpecimenGlyph } from "./visuals";

const materialPalette = {
  mycelium: { background: "#ddd5b9", accent: "#ec5b3f" },
  algae: { background: "#b8d9c8", accent: "#245b4c" },
  copper: { background: "#cc795c", accent: "#431f19" },
  carbon: { background: "#252722", accent: "#d9ff57" },
} as const;

type Data = {
  studio: string;
  issue: string;
  title: string;
  subtitle: string;
  published: string;
  location: string;
  materials: Array<{
    code: string;
    name: string;
    family: string;
    score: number;
    signal: string;
    composition: string;
    palette: keyof typeof materialPalette;
  }>;
  principles: Array<{ number: string; title: string; text: string }>;
};

function AurelisEssayFrame({ children, page, pages }: PageContext & { children: ReactNode }) {
  return (
    <div className="grid grid-rows-[14mm_minmax(0,1fr)_17mm] px-[14mm]">
      <header className="border-b border-[#d4dae2] pt-[5.8mm] pb-[2mm] text-[8pt] tracking-[.02em] text-[#637083]">
        AURELIS STUDIO / FIELD NOTES 03
      </header>
      <main className="min-h-0">{children}</main>
      <footer className="flex items-end justify-center pb-[6.4mm] text-[8pt] tracking-[.02em] text-[#637083]">
        MATERIAL INTELLIGENCE / {page} OF {pages}
      </footer>
    </div>
  );
}

export default function Report(data: Data) {
  return (
    <Document title={data.title} author={data.studio} lang="en" className="aurelis">
      <Page size="A4" className="aurelis-cover-page relative overflow-hidden p-[15mm]">
        <header className="relative z-10 flex items-start justify-between border-t border-ink pt-[3mm] text-[7pt] font-bold tracking-[.14em] uppercase">
          <span>{data.studio}</span>
          <span>
            {data.issue}
            <br />
            {data.published}
          </span>
        </header>
        <CoverOrbit />
        <div className="absolute top-[63mm] left-[15mm] flex h-[72mm] w-[8mm] items-center justify-center bg-ink text-[6pt] font-bold tracking-[.2em] text-paper [writing-mode:vertical-rl]">
          MATERIAL INTELLIGENCE
        </div>
        <div className="absolute right-[15mm] bottom-[15mm] left-[15mm] z-10 grid grid-cols-[1fr_43mm] items-end gap-[10mm] border-b border-ink pb-[5mm]">
          <div>
            <span className="mb-[4mm] block text-[8pt] font-bold tracking-[.18em] text-clay uppercase">
              {data.subtitle}
            </span>
            <h1 className="aurelis-cover-word m-0 text-[51pt] leading-[.83] font-semibold text-ink">
              Tactile
              <br />
              Futures
            </h1>
          </div>
          <p className="m-0 text-[8pt] leading-[1.5] text-ink">
            Four materials. Three principles. One proposition for a more intimate industrial future.
          </p>
        </div>
        <div className="absolute bottom-[7mm] left-[15mm] text-[6pt] font-bold tracking-[.16em] uppercase">
          {data.location}
        </div>
      </Page>

      <Page size="A4" className="aurelis-essay-page">
        {({ page, pages }) => (
          <AurelisEssayFrame page={page} pages={pages}>
            <header
              style={{ breakInside: "avoid-page", breakAfter: "avoid-page" }}
              className="mb-[8mm] grid grid-cols-[1fr_39mm] items-start gap-[8mm] border-b border-ink pb-[5mm]"
            >
              <div>
                <span className="text-[7pt] font-bold tracking-[.18em] text-clay uppercase">
                  01 / A new material language
                </span>
                <h1 className="aurelis-serif mt-[4mm] mb-0 text-[34pt] leading-[.97] font-normal tracking-[-.04em]">
                  Matter learns
                  <br />
                  <i>to listen.</i>
                </h1>
              </div>
              <div className="pt-[5mm] text-[7pt] leading-[1.55]">
                <b className="block tracking-[.12em] uppercase">Research note</b>
                Behaviour replaces finish as the new measure of quality.
              </div>
            </header>
            <div
              style={{ breakInside: "avoid-page" }}
              className="grid grid-cols-[1fr_79mm] gap-[8mm]"
            >
              <section>
                <p className="aurelis-serif mt-0 mb-[5mm] text-[13pt] leading-[1.45]">
                  The next generation of objects will feel less manufactured and more{" "}
                  <i>negotiated</i> - shaped by moisture, touch, time and repair.
                </p>
                <p className="m-0 text-[8.5pt] leading-[1.65] text-[#474940]">
                  A material is no longer a silent surface. It records pressure, reveals origin and
                  carries an honest path into its next life. This changes the brief. Designers begin
                  with behaviour and only then draw the form.
                </p>
                <blockquote
                  style={{ breakInside: "avoid-page" }}
                  className="aurelis-serif my-[8mm] border-l-[2mm] border-clay pl-[5mm] text-[20pt] leading-[1.15] tracking-[-.025em]"
                >
                  “The most advanced surface may be the one that ages in public.”
                </blockquote>
                <div className="space-y-[4mm]">
                  {data.principles.map((item) => (
                    <article
                      key={item.number}
                      className="aurelis-card grid grid-cols-[9mm_1fr] border-t border-ink pt-[3mm]"
                    >
                      <b className="text-[7pt] text-clay">{item.number}</b>
                      <div>
                        <h2 className="m-0 text-[10pt] font-bold">{item.title}</h2>
                        <p className="mt-[1mm] mb-0 text-[7.5pt] leading-[1.45] text-[#5f6158]">
                          {item.text}
                        </p>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
              <aside>
                <MaterialField />
                <div className="mt-[4mm] border-t border-ink pt-[3mm]">
                  <span className="text-[6pt] font-bold tracking-[.14em] uppercase">
                    Sensitivity field / 2026
                  </span>
                  <p className="mt-[2mm] mb-0 text-[7pt] leading-[1.45]">
                    The preferred zone balances origin, tactility and repair with a restrained
                    carbon load.
                  </p>
                </div>
                <div className="mt-[8mm] grid grid-cols-3 gap-[2mm]">
                  {data.materials.slice(0, 3).map((item) => (
                    <div key={item.code}>
                      <div
                        className="h-[19mm]"
                        style={{ background: materialPalette[item.palette].background }}
                      />
                      <span className="mt-[1.5mm] block text-[5.5pt] font-bold tracking-[.08em]">
                        {item.code}
                      </span>
                      <b className="block text-[6.5pt]">{item.name}</b>
                    </div>
                  ))}
                </div>
              </aside>
            </div>
          </AurelisEssayFrame>
        )}
      </Page>

      <Page
        size="A4"
        className="aurelis-atlas-page aurelis-atlas-grid relative overflow-hidden p-[14mm] text-paper"
      >
        {({ page, pages }) => (
          <>
            <header className="flex items-end justify-between border-b border-paper/40 pb-[4mm]">
              <div>
                <span className="text-[7pt] font-bold tracking-[.18em] text-lime uppercase">
                  02 / The material atlas
                </span>
                <h1 className="aurelis-serif mt-[2mm] mb-0 text-[30pt] font-normal italic">
                  Four states of progress.
                </h1>
              </div>
              <div className="text-right text-[6.5pt] leading-[1.5] tracking-[.1em] uppercase">
                Lab series 14
                <br />
                Copenhagen / 2026
              </div>
            </header>
            <div
              style={{ breakInside: "avoid-page" }}
              className="mt-[7mm] grid grid-cols-2 gap-[4mm]"
            >
              {data.materials.map((item, index) => (
                <article
                  key={item.code}
                  className="aurelis-card grid h-[71mm] grid-cols-[1fr_42mm] overflow-hidden rounded-[1.5mm]"
                  style={{
                    background: materialPalette[item.palette].background,
                    color: materialPalette[item.palette].accent,
                  }}
                >
                  <div className="flex flex-col justify-between p-[5mm]">
                    <div>
                      <span className="text-[6pt] font-bold tracking-[.15em] uppercase">
                        {item.code} / {item.family}
                      </span>
                      <h2 className="aurelis-serif mt-[2mm] mb-0 text-[19pt] font-normal tracking-[-.03em]">
                        {item.name}
                      </h2>
                    </div>
                    <div>
                      <b className="block text-[7pt]">{item.signal}</b>
                      <span className="mt-[1mm] block text-[6pt] leading-[1.4]">
                        {item.composition}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between border-l border-current/25 p-[4mm]">
                    <SpecimenGlyph
                      index={index}
                      foreground={materialPalette[item.palette].accent}
                    />
                    <div>
                      <span className="text-[5.5pt] font-bold tracking-[.12em] uppercase">
                        Circularity
                      </span>
                      <strong className="block text-[23pt] leading-none">{item.score}</strong>
                      <div className="mt-[2mm] flex h-[1.5mm] bg-current/20">
                        <div
                          className="self-stretch bg-current"
                          style={{ width: `${item.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
            <div
              style={{ breakInside: "avoid-page" }}
              className="mt-[7mm] grid grid-cols-[1fr_62mm] gap-[8mm] border-t border-paper/40 pt-[5mm]"
            >
              <div>
                <span className="text-[6pt] font-bold tracking-[.16em] text-lime uppercase">
                  Design position / 03
                </span>
                <p className="aurelis-serif mt-[2mm] mb-0 text-[18pt] leading-[1.2]">
                  Beauty becomes evidence that a system can remain useful, legible and loved.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-[3mm] text-[6.5pt]">
                <div>
                  <b className="block text-[18pt] text-lime">87.3</b>mean circularity
                </div>
                <div>
                  <b className="block text-[18pt] text-clay">04</b>active specimens
                </div>
              </div>
            </div>
            <footer className="absolute right-[14mm] bottom-[8mm] left-[14mm] flex justify-between border-t border-paper/20 pt-[2mm] text-[5.5pt] font-bold tracking-[.14em] uppercase">
              <span>
                {data.studio} / {data.issue}
              </span>
              <span>
                {page} / {pages}
              </span>
            </footer>
          </>
        )}
      </Page>
    </Document>
  );
}
