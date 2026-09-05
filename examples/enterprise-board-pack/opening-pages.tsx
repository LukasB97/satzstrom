import { Contents, Page } from "@satzstrom/primitives";
import { BoardPage, BoardSection, sections } from "./frame";
import { BrandMark, MiniSpark, RevenueChart, SectionLabel } from "./visuals";
import type { BoardData } from "./data";

export function OpeningPages({ data }: { data: BoardData }) {
  return (
    <>
      <Page size="A4" className="enterprise-cover-page">
        <section
          style={{ breakInside: "avoid-page" }}
          className="enterprise-cover-grid absolute inset-0 flex flex-col justify-between overflow-hidden p-[17mm] text-white"
        >
          <div className="flex items-start justify-between">
            <BrandMark light />
            <span className="rounded-full border border-white/25 px-[3mm] py-[1.5mm] text-[6.5pt] font-bold tracking-[.16em] text-white/70">
              {data.classification}
            </span>
          </div>
          <div className="relative z-10 max-w-[150mm]">
            <div className="mb-[5mm] text-[8pt] font-bold tracking-[.2em] text-cyan uppercase">
              {data.period} · Board of Directors
            </div>
            <h1 className="m-0 text-[43pt] leading-[.98] font-semibold tracking-[-.055em]">
              Operating
              <br />
              Review
            </h1>
            <p className="mt-[7mm] max-w-[105mm] text-[13pt] leading-[1.45] text-slate-300">
              Performance, exposure and the decisions that shape the next operating cycle.
            </p>
          </div>
          <div className="grid grid-cols-3 border-t border-white/20 pt-[5mm] text-[7pt] text-slate-400">
            <div>
              <span className="block font-bold tracking-[.14em] text-white/60">MEETING</span>
              {data.meetingDate}
            </div>
            <div>
              <span className="block font-bold tracking-[.14em] text-white/60">PACK ID</span>
              NS-BRD-26Q3-04
            </div>
            <div className="text-right">
              <span className="block font-bold tracking-[.14em] text-white/60">VERSION</span>
              Final · 19:30 CET
            </div>
          </div>
          <div className="absolute right-0 top-[72mm] h-[92mm] w-[92mm] rounded-full border-[16mm] border-cyan/10">
            <div className="absolute inset-[13mm] rounded-full border border-cyan/35" />
          </div>
        </section>
      </Page>

      <BoardPage title="Board agenda">
        <div
          style={{ breakInside: "avoid-page" }}
          className="mb-[8mm] flex items-center justify-between"
        >
          <BrandMark />
          <div className="text-right text-[7pt] font-semibold tracking-[.12em] text-slatecopy">
            {data.period}
            <br />
            {data.meetingDate}
          </div>
        </div>
        <div
          style={{ breakInside: "avoid-page" }}
          className="mb-[2mm] text-[7pt] font-bold tracking-[.16em] text-blue uppercase"
        >
          Board operating review
        </div>
        <h1 className="rr-heading mb-[10mm] text-[32pt] leading-none font-semibold tracking-[-.045em] text-navy">
          Agenda & reading map
        </h1>
        <Contents
          sequence={sections}
          className="[&_.rr-contents-list]:m-0 [&_.rr-contents-list]:list-none [&_.rr-contents-list]:p-0 [&_li]:border-t [&_li]:border-line [&_a]:grid [&_a]:grid-cols-[14mm_1fr_12mm] [&_a]:gap-[2mm] [&_a]:py-[4mm] [&_a]:text-navy [&_a]:no-underline [&_.rr-contents-number]:font-bold [&_.rr-contents-number]:text-blue [&_.rr-contents-title]:text-[11pt] [&_.rr-contents-page]:text-right [&_.rr-contents-page]:text-[8pt]"
        />
        <aside
          style={{ breakInside: "avoid-page" }}
          className="mt-[10mm] grid grid-cols-[1.2fr_1fr] overflow-hidden rounded-[3mm] border border-line"
        >
          <div className="bg-navy p-[6mm] text-white">
            <div className="text-[7pt] font-bold tracking-[.14em] text-cyan">CHAIR NOTE</div>
            <p className="mt-[4mm] text-[14pt] leading-[1.4] font-medium">
              Growth remains ahead of plan. This meeting should convert that momentum into durable
              capacity and controlled execution.
            </p>
          </div>
          <div className="p-[6mm]">
            <SectionLabel>Meeting outcomes</SectionLabel>
            <ol className="m-0 space-y-[3mm] pl-[5mm] text-[9pt] leading-[1.4] text-slatecopy">
              <li>Confirm Q4 resource envelope</li>
              <li>Approve sovereign infrastructure</li>
              <li>Align risk ownership before audit close</li>
            </ol>
          </div>
        </aside>
        <div
          style={{ breakInside: "avoid-page" }}
          className="mt-[7mm] grid grid-cols-[1fr_1fr_1fr] gap-[3mm]"
        >
          {[
            ["120 min", "Session length", "Six focused modules"],
            ["3", "Decisions requested", "All management-backed"],
            ["100%", "Pre-read complete", "Submitted on time"],
          ].map(([value, label, note], i) => (
            <article
              key={label}
              className="relative overflow-hidden rounded-[2.5mm] border border-line bg-white p-[4mm] shadow-[0_2mm_8mm_rgba(15,23,42,.05)]"
            >
              <div
                className={`absolute inset-y-0 left-0 w-[1mm] ${i === 1 ? "bg-cyan" : "bg-blue"}`}
              />
              <strong className="block text-[18pt] leading-none text-navy">{value}</strong>
              <span className="mt-[2mm] block text-[7pt] font-bold tracking-[.08em] text-slatecopy uppercase">
                {label}
              </span>
              <small className="mt-[1mm] block text-[6.5pt] text-slate-500">{note}</small>
            </article>
          ))}
        </div>
      </BoardPage>

      <BoardSection
        id="executive"
        title="Executive snapshot"
        eyebrow="01 · Performance at a glance"
      >
        <div style={{ breakInside: "avoid-page" }} className="mb-[7mm] grid grid-cols-4 gap-[3mm]">
          {data.kpis.map((kpi) => (
            <article
              key={kpi.label}
              className="rounded-[2.5mm] border border-line bg-white p-[4mm]"
            >
              <span className="block min-h-[9mm] text-[6.5pt] font-bold tracking-[.08em] text-slatecopy uppercase">
                {kpi.label}
              </span>
              <strong className="block text-[19pt] leading-none tracking-[-.04em] text-navy">
                {kpi.value}
              </strong>
              <em className="mt-[2mm] block text-[7pt] font-bold text-emerald-700 not-italic">
                {kpi.change}
              </em>
              <small className="mt-[1mm] block text-[6.5pt] text-slatecopy">{kpi.note}</small>
            </article>
          ))}
        </div>
        <div
          style={{ breakInside: "avoid-page" }}
          className="mb-[7mm] grid grid-cols-[1.3fr_.7fr] gap-[5mm]"
        >
          <article className="rounded-[3mm] bg-navy p-[6mm] text-white">
            <div className="text-[7pt] font-bold tracking-[.14em] text-cyan">MANAGEMENT VIEW</div>
            <h2 className="my-[3mm] text-[19pt] leading-[1.1] font-semibold tracking-[-.03em]">
              The model is crossing from growth proof to operating leverage.
            </h2>
            <p className="m-0 text-[9pt] leading-[1.5] text-slate-300">
              Revenue, retention and margin expanded together for the third consecutive quarter. The
              constraint has shifted from demand generation to delivery capacity in sovereign cloud
              and North America.
            </p>
          </article>
          <article className="rounded-[3mm] border border-line p-[5mm]">
            <SectionLabel>FY26 confidence</SectionLabel>
            <div
              className="relative mx-auto my-[4mm] h-[34mm] w-[34mm] rounded-full"
              style={{
                background: "conic-gradient(#175cd3 0 84%, #e2e8f0 84% 100%)",
              }}
            >
              <div className="absolute inset-[4mm] flex items-center justify-center rounded-full bg-white text-[15pt] font-bold text-navy">
                84%
              </div>
            </div>
            <p className="m-0 text-center text-[7pt] text-slatecopy">
              Probability of achieving the upgraded ARR range.
            </p>
          </article>
        </div>
        <SectionLabel>What changed since the last board</SectionLabel>
        <div style={{ breakInside: "avoid-page" }} className="grid grid-cols-3 gap-[3mm]">
          {[
            [
              "01",
              "Expansion accelerated",
              "Top-50 customers added €3.1m ARR, led by policy automation.",
            ],
            [
              "02",
              "Cloud unit cost fell",
              "Routing and reserved capacity reduced inference cost per workflow by 18%.",
            ],
            [
              "03",
              "Delivery risk moved",
              "Sovereign launch is now the critical path for Q1 enterprise commitments.",
            ],
          ].map(([n, title, text]) => (
            <article key={n} className="border-t-2 border-blue pt-[3mm]">
              <span className="text-[6.5pt] font-bold text-blue">{n}</span>
              <h3 className="my-[1.5mm] text-[10pt] font-bold text-navy">{title}</h3>
              <p className="m-0 text-[8pt] leading-[1.45] text-slatecopy">{text}</p>
            </article>
          ))}
        </div>
        <SectionLabel className="mt-[6mm]">Operating pulse · trailing 8 weeks</SectionLabel>
        <div style={{ breakInside: "avoid-page" }} className="grid grid-cols-4 gap-[3mm]">
          {[
            ["Product availability", "99.98%", [72, 74, 70, 78, 82, 80, 86, 88], "#175cd3"],
            ["Weekly active teams", "4,821", [52, 54, 58, 61, 64, 69, 73, 79], "#06aed4"],
            ["Time to value", "18 days", [82, 78, 74, 71, 66, 61, 58, 54], "#8b5cf6"],
            ["Employee eNPS", "+46", [61, 58, 63, 66, 64, 70, 72, 75], "#10b981"],
          ].map(([label, value, points, color]) => (
            <article
              key={String(label)}
              className="rounded-[2.5mm] border border-line bg-white p-[3.5mm] shadow-[0_2mm_7mm_rgba(15,23,42,.045)]"
            >
              <span className="text-[6.5pt] font-bold tracking-[.07em] text-slatecopy uppercase">
                {String(label)}
              </span>
              <strong className="mt-[1mm] block text-[14pt] text-navy">{String(value)}</strong>
              <MiniSpark values={points as number[]} color={String(color)} />
            </article>
          ))}
        </div>
      </BoardSection>

      <BoardSection
        id="financials"
        title="Financial performance"
        eyebrow="02 · Durable growth and leverage"
      >
        <div
          style={{ breakInside: "avoid-page" }}
          className="mb-[6mm] grid grid-cols-[1.35fr_.65fr] gap-[5mm]"
        >
          <RevenueChart values={data.quarters} />
          <aside style={{ breakInside: "avoid-page" }} className="rounded-[3mm] bg-mist p-[5mm]">
            <SectionLabel>Q3 bridge</SectionLabel>
            <div className="space-y-[4mm]">
              {[
                ["Opening ARR", "€78,1m"],
                ["New logos", "+€3,8m"],
                ["Expansion", "+€3,1m"],
                ["Churn", "−€0,8m"],
                ["Closing ARR", "€84,2m"],
              ].map(([label, value], i) => (
                <div
                  key={label}
                  className={`flex items-end justify-between border-b pb-[2mm] ${i === 4 ? "border-blue font-bold text-navy" : "border-line text-slatecopy"}`}
                >
                  <span className="text-[8pt]">{label}</span>
                  <strong className="text-[10pt]">{value}</strong>
                </div>
              ))}
            </div>
          </aside>
        </div>
        <SectionLabel>Segment economics</SectionLabel>
        <table className="mb-[7mm] w-full border-collapse text-[8pt]">
          <thead>
            <tr className="border-y border-line bg-mist text-left text-[6.5pt] tracking-[.1em] text-slatecopy uppercase">
              <th className="p-[2.5mm]">Segment</th>
              <th>ARR</th>
              <th>YoY growth</th>
              <th>Gross margin</th>
              <th className="w-[52mm]">Portfolio share</th>
            </tr>
          </thead>
          <tbody>
            {data.segments.map((segment) => (
              <tr key={segment.name} className="border-b border-line">
                <td className="p-[3mm] font-bold text-navy">{segment.name}</td>
                <td>{segment.arr}</td>
                <td className="font-bold text-emerald-700">{segment.growth}</td>
                <td>{segment.margin}</td>
                <td>
                  <div className="flex h-[2.5mm] rounded-full bg-slate-100">
                    <div
                      className="self-stretch rounded-full bg-blue"
                      style={{ width: `${segment.share}%` }}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div style={{ breakInside: "avoid-page" }} className="grid grid-cols-2 gap-[4mm]">
          <article className="rounded-[2.5mm] border-l-[1mm] border-emerald-500 bg-emerald-50 p-[4mm]">
            <SectionLabel>Upside</SectionLabel>
            <p className="m-0 text-[9pt] leading-[1.45] text-emerald-950">
              Enterprise expansion and usage pricing add €2.4m potential ARR above the current
              outlook.
            </p>
          </article>
          <article className="rounded-[2.5mm] border-l-[1mm] border-amber-500 bg-amber-50 p-[4mm]">
            <SectionLabel>Watch item</SectionLabel>
            <p className="m-0 text-[9pt] leading-[1.45] text-amber-950">
              Hiring acceleration brings €1.1m of Q4 spend forward, with benefit beginning in Q1.
            </p>
          </article>
        </div>
        <SectionLabel className="mt-[5mm]">Cash & capacity</SectionLabel>
        <div
          style={{ breakInside: "avoid-page" }}
          className="grid grid-cols-[1fr_1fr_1.2fr] gap-[3mm]"
        >
          <article className="rounded-[2.5mm] border border-line bg-white p-[4mm]">
            <span className="text-[6.5pt] font-bold text-slatecopy uppercase">Cash balance</span>
            <strong className="mt-[1mm] block text-[17pt] text-navy">€38.6m</strong>
            <small className="text-[6.5pt] text-emerald-700">+€3.8m QoQ</small>
          </article>
          <article className="rounded-[2.5mm] border border-line bg-white p-[4mm]">
            <span className="text-[6.5pt] font-bold text-slatecopy uppercase">Rule of 40</span>
            <strong className="mt-[1mm] block text-[17pt] text-navy">41.3</strong>
            <small className="text-[6.5pt] text-emerald-700">First quarter above 40</small>
          </article>
          <article className="rounded-[2.5mm] bg-gradient-to-br from-blue to-cyan p-[4mm] text-white">
            <span className="text-[6.5pt] font-bold text-blue-100 uppercase">Forward signal</span>
            <strong className="mt-[1mm] block text-[12pt]">
              Operating cash flow turns sustainably positive in Q4.
            </strong>
          </article>
        </div>
      </BoardSection>
    </>
  );
}
