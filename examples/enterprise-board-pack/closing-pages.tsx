import { BoardSection } from "./frame";
import { BrandMark, statusClass } from "./visuals";
import type { BoardData } from "./data";

export function ClosingPages({ data }: { data: BoardData }) {
  return (
    <>
      <BoardSection
        id="roadmap"
        title="Transformation roadmap"
        eyebrow="05 · One operating plan"
        size="A3"
        orientation="landscape"
        margin={14}
        className="enterprise-roadmap-page"
      >
        <div
          style={{ breakInside: "avoid-page" }}
          className="mb-[4mm] grid grid-cols-[50mm_25mm_25mm_repeat(7,1fr)] border-y border-line bg-white text-[6.5pt] font-bold tracking-[.08em] text-slatecopy uppercase"
        >
          <div className="p-[2mm]">Program</div>
          <div className="p-[2mm]">Owner</div>
          <div className="p-[2mm]">Status</div>
          {["Q4 Jul", "Q4 Aug", "Q4 Sep", "Q4 Oct", "Q4 Nov", "Q4 Dec", "Q1 Jan"].map((label) => (
            <div key={label} className="border-l border-line p-[2mm] text-center">
              {label}
            </div>
          ))}
        </div>
        <div style={{ breakInside: "avoid-page" }} className="space-y-[2mm]">
          {data.programs.map((program) => (
            <article
              key={program.name}
              className="grid min-h-[23mm] grid-cols-[50mm_25mm_25mm_repeat(7,1fr)] items-center border-b border-line bg-white"
            >
              <div className="px-[2mm]">
                <span className="block text-[6pt] font-bold tracking-[.08em] text-blue uppercase">
                  {program.workstream}
                </span>
                <strong className="text-[9pt] text-navy">{program.name}</strong>
                <small className="mt-[.5mm] block text-[6pt] text-slatecopy">
                  {program.outcome}
                </small>
              </div>
              <div className="px-[2mm] text-[7pt] font-semibold text-navy">{program.owner}</div>
              <div className="px-[2mm]">
                <span
                  className={`rounded-full px-[2mm] py-[1mm] text-[6pt] font-bold ${statusClass[program.status]}`}
                >
                  {program.status.toUpperCase()}
                </span>
              </div>
              {Array.from({ length: 7 }, (_, i) => (
                <div key={i} className="self-stretch border-l border-line p-[2mm]">
                  <div
                    className={`min-h-[12mm] self-stretch rounded-[1.5mm] ${i + 1 >= program.start && i + 1 <= program.end ? (program.status === "watch" ? "bg-amber-300" : program.status === "complete" ? "bg-blue-300" : "bg-cyan") : "bg-transparent"}`}
                  />
                </div>
              ))}
            </article>
          ))}
        </div>
        <div style={{ breakInside: "avoid-page" }} className="mt-[6mm] grid grid-cols-4 gap-[4mm]">
          {[
            ["Committed investment", "€12.8m"],
            ["Benefits at run-rate", "€21.4m"],
            ["Critical dependencies", "3"],
            ["Board decisions linked", "2"],
          ].map(([label, value]) => (
            <article key={label} className="rounded-[2mm] bg-navy p-[4mm] text-white">
              <span className="text-[6.5pt] font-bold tracking-[.1em] text-slate-400 uppercase">
                {label}
              </span>
              <strong className="mt-[1mm] block text-[18pt]">{value}</strong>
            </article>
          ))}
        </div>
        <div
          style={{ breakInside: "avoid-page" }}
          className="mt-[6mm] grid grid-cols-[34mm_repeat(4,1fr)] overflow-hidden rounded-[2.5mm] border border-line bg-white"
        >
          <div className="bg-blue p-[4mm] text-white">
            <span className="text-[6pt] font-bold tracking-[.12em] text-blue-100">GOVERNANCE</span>
            <strong className="mt-[2mm] block text-[11pt]">Milestone gates</strong>
          </div>
          {[
            ["08 AUG", "Sovereign readiness"],
            ["15 SEP", "Atlas beta exit"],
            ["22 OCT", "Q4 board"],
            ["15 JAN", "EU general release"],
          ].map(([date, label]) => (
            <article key={date} className="border-l border-line p-[4mm]">
              <span className="text-[6.5pt] font-bold text-blue">{date}</span>
              <strong className="mt-[1.5mm] block text-[8pt] text-navy">{label}</strong>
            </article>
          ))}
        </div>
      </BoardSection>

      <BoardSection id="decisions" title="Decisions requested" eyebrow="06 · Resolution sheet">
        <div style={{ breakInside: "avoid-page" }} className="space-y-[5mm]">
          {data.decisions.map((decision, i) => (
            <article
              key={decision.id}
              className="grid grid-cols-[19mm_1fr_44mm] overflow-hidden rounded-[3mm] border border-line"
            >
              <div className="flex flex-col items-center justify-center bg-navy p-[3mm] text-white">
                <span className="text-[6pt] font-bold tracking-[.1em] text-slate-400">ITEM</span>
                <strong className="mt-[1mm] text-[13pt]">{String(i + 1).padStart(2, "0")}</strong>
              </div>
              <div className="p-[4mm]">
                <span className="text-[6.5pt] font-bold tracking-[.1em] text-blue">
                  {decision.id}
                </span>
                <h2 className="my-[1.5mm] text-[13pt] font-bold text-navy">{decision.title}</h2>
                <p className="m-0 text-[8pt] text-slatecopy">
                  <b className="text-navy">Ask:</b> {decision.ask}
                </p>
                <p className="mt-[2mm] mb-0 text-[8pt] leading-[1.4] text-slatecopy">
                  {decision.rationale}
                </p>
              </div>
              <div className="flex flex-col justify-between bg-mist p-[4mm]">
                <span className="text-[6pt] font-bold tracking-[.1em] text-slatecopy">
                  MANAGEMENT
                </span>
                <strong className="text-[8pt] leading-[1.35] text-emerald-800">
                  {decision.recommendation}
                </strong>
                <div className="border-b border-slate-400 pb-[1mm] text-[6pt] text-slatecopy">
                  Board initials
                </div>
              </div>
            </article>
          ))}
        </div>
        <aside
          style={{ breakInside: "avoid-page" }}
          className="mt-[8mm] flex items-center justify-between rounded-[3mm] bg-blue p-[5mm] text-white"
        >
          <div>
            <span className="text-[6.5pt] font-bold tracking-[.12em] text-blue-100">
              NEXT FORMAL CHECKPOINT
            </span>
            <strong className="mt-[1mm] block text-[15pt]">FY26 Q4 Board · 22 October 2026</strong>
          </div>
          <div className="text-right text-[8pt] text-blue-100">
            Materials close
            <br />
            <b className="text-white">15 October · 18:00 CET</b>
          </div>
        </aside>
        <footer
          style={{ breakInside: "avoid-page" }}
          className="mt-[13mm] flex items-center justify-between border-t border-line pt-[5mm]"
        >
          <BrandMark />
          <div className="text-right text-[6.5pt] leading-[1.5] text-slatecopy">
            Prepared by Finance & Strategy
            <br />
            Source systems closed 18 July 2026
          </div>
        </footer>
      </BoardSection>
    </>
  );
}
