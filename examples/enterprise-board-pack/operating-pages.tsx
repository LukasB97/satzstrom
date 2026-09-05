import { BoardSection } from "./frame";
import { SectionLabel, TrendBadge } from "./visuals";
import type { BoardData } from "./data";

export function OperatingPages({ data }: { data: BoardData }) {
  return (
    <>
      <BoardSection
        id="commercial"
        title="Commercial engine"
        eyebrow="03 · Pipeline, conversion and concentration"
        orientation="landscape"
        margin={14}
        className="enterprise-landscape-page"
      >
        <div
          style={{ breakInside: "avoid-page" }}
          className="grid grid-cols-[1.1fr_.9fr] gap-[7mm]"
        >
          <section>
            <SectionLabel>Enterprise pipeline · next two quarters</SectionLabel>
            <div style={{ breakInside: "avoid-page" }} className="space-y-[3mm]">
              {data.pipeline.map((stage, i) => (
                <article
                  key={stage.stage}
                  className="relative overflow-hidden rounded-[2mm] border border-line bg-white p-[3mm]"
                >
                  <div
                    className="absolute inset-y-0 left-0 bg-blue-50"
                    style={{ width: `${stage.width}%` }}
                  />
                  <div className="absolute inset-y-0 left-0 w-[1.2mm] bg-blue" />
                  <div className="relative grid grid-cols-[1fr_26mm_20mm_20mm] items-center gap-[3mm]">
                    <div>
                      <span className="text-[6pt] font-bold text-slatecopy">0{i + 1}</span>
                      <strong className="ml-[2mm] text-[9pt] text-navy">{stage.stage}</strong>
                    </div>
                    <b className="text-[12pt] text-navy">{stage.value}</b>
                    <span className="text-[7pt] text-slatecopy">{stage.count} opps</span>
                    <span className="rounded-full bg-white px-[2mm] py-[1mm] text-center text-[7pt] font-bold text-blue">
                      {stage.coverage}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </section>
          <section>
            <SectionLabel>Regional attainment</SectionLabel>
            <div style={{ breakInside: "avoid-page" }} className="grid grid-cols-2 gap-[3mm]">
              {[
                ["DACH", "112%", "€8.4m", "+18%"],
                ["North America", "94%", "€6.9m", "+46%"],
                ["UKI", "103%", "€4.1m", "+27%"],
                ["Nordics", "107%", "€2.8m", "+31%"],
              ].map(([region, attainment, bookings, growth]) => (
                <article key={region} className="rounded-[2mm] border border-line p-[4mm]">
                  <span className="text-[7pt] font-bold tracking-[.1em] text-slatecopy">
                    {region}
                  </span>
                  <strong className="mt-[2mm] block text-[20pt] leading-none text-navy">
                    {attainment}
                  </strong>
                  <div className="mt-[3mm] flex justify-between text-[7pt]">
                    <span>{bookings} bookings</span>
                    <b className="text-emerald-700">{growth}</b>
                  </div>
                </article>
              ))}
            </div>
          </section>
        </div>
        <div
          style={{ breakInside: "avoid-page" }}
          className="mt-[7mm] grid grid-cols-[1fr_1fr_1fr] gap-[4mm] border-t border-line pt-[5mm]"
        >
          {[
            ["Win rate", "31.8%", "+3.4 pp"],
            ["Median sales cycle", "104 days", "−17 days"],
            ["Top-10 concentration", "22%", "−5 pp"],
          ].map(([label, value, change]) => (
            <article key={label} className="flex items-end justify-between">
              <div>
                <span className="block text-[6.5pt] font-bold tracking-[.1em] text-slatecopy uppercase">
                  {label}
                </span>
                <strong className="text-[18pt] text-navy">{value}</strong>
              </div>
              <b className="mb-[1mm] text-[8pt] text-emerald-700">{change}</b>
            </article>
          ))}
        </div>
        <div
          style={{ breakInside: "avoid-page" }}
          className="mt-[6mm] grid grid-cols-[30mm_1fr_27mm_27mm_27mm] items-center rounded-[2.5mm] bg-navy p-[4mm] text-white"
        >
          <span className="text-[6.5pt] font-bold tracking-[.13em] text-cyan">DEAL DESK PULSE</span>
          <strong className="text-[9pt]">Top 10 opportunities</strong>
          <div>
            <small className="block text-[5.5pt] text-slate-400">VALUE</small>
            <b>€9.8m</b>
          </div>
          <div>
            <small className="block text-[5.5pt] text-slate-400">LEGAL CLEAR</small>
            <b>7 / 10</b>
          </div>
          <div>
            <small className="block text-[5.5pt] text-slate-400">EXEC SPONSOR</small>
            <b>10 / 10</b>
          </div>
        </div>
      </BoardSection>

      <BoardSection
        id="risk"
        title="Risk & operating controls"
        eyebrow="04 · Exposure, ownership and response"
        orientation="landscape"
        margin={14}
        className="enterprise-landscape-page"
      >
        <div style={{ breakInside: "avoid-page" }} className="grid grid-cols-[78mm_1fr] gap-[7mm]">
          <section>
            <SectionLabel>Enterprise risk matrix</SectionLabel>
            <div
              style={{ breakInside: "avoid-page" }}
              className="risk-matrix relative h-[74mm] rounded-[2mm] border border-line bg-gradient-to-tr from-emerald-50 via-amber-50 to-rose-50"
            >
              {data.risks.map((risk) => (
                <div
                  key={risk.id}
                  className="absolute flex h-[7mm] w-[7mm] items-center justify-center rounded-full border-2 border-white bg-navy text-[5.5pt] font-bold text-white shadow"
                  style={{
                    left: `calc(${(risk.likelihood - 0.5) * 20}% - 3.5mm)`,
                    bottom: `calc(${(risk.impact - 0.5) * 20}% - 3.5mm)`,
                  }}
                >
                  {risk.id.slice(2)}
                </div>
              ))}
              <span className="absolute bottom-[2mm] right-[2mm] text-[5.5pt] font-bold tracking-[.1em] text-slatecopy">
                LIKELIHOOD →
              </span>
              <span className="absolute left-[2mm] top-[2mm] text-[5.5pt] font-bold tracking-[.1em] text-slatecopy">
                IMPACT ↑
              </span>
            </div>
          </section>
          <section>
            <SectionLabel>Top enterprise risks</SectionLabel>
            <table className="w-full border-collapse text-[7pt]">
              <thead>
                <tr className="border-y border-line bg-mist text-left text-[6pt] tracking-[.08em] text-slatecopy uppercase">
                  <th className="p-[2mm]">ID</th>
                  <th>Exposure</th>
                  <th>Owner</th>
                  <th>Trend</th>
                  <th>Active mitigation</th>
                </tr>
              </thead>
              <tbody>
                {data.risks.map((risk) => (
                  <tr key={risk.id} className="border-b border-line">
                    <td className="p-[2.2mm] font-bold text-blue">{risk.id}</td>
                    <td className="font-semibold text-navy">{risk.title}</td>
                    <td>{risk.owner}</td>
                    <td>
                      <TrendBadge value={risk.trend} />
                    </td>
                    <td className="text-slatecopy">{risk.mitigation}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <aside
          style={{ breakInside: "avoid-page" }}
          className="mt-[6mm] grid grid-cols-[31mm_1fr_34mm] items-center gap-[4mm] rounded-[2.5mm] bg-navy p-[4mm] text-white"
        >
          <span className="text-[6.5pt] font-bold tracking-[.13em] text-cyan">CONTROL SIGNAL</span>
          <p className="m-0 text-[9pt]">
            92% of key controls now produce evidence automatically, up from 67% in Q1.
          </p>
          <strong className="text-right text-[20pt]">92%</strong>
        </aside>
        <div style={{ breakInside: "avoid-page" }} className="mt-[5mm] grid grid-cols-4 gap-[3mm]">
          {[
            ["Access governance", "96%", "Healthy"],
            ["Change management", "91%", "Healthy"],
            ["Vendor assurance", "84%", "Watch"],
            ["Evidence freshness", "94%", "Healthy"],
          ].map(([label, value, state]) => (
            <article key={label} className="rounded-[2mm] border border-line bg-white p-[3mm]">
              <div className="flex items-center justify-between">
                <span className="text-[6pt] font-bold tracking-[.06em] text-slatecopy uppercase">
                  {label}
                </span>
                <b
                  className={`rounded-full px-[1.5mm] py-[.6mm] text-[5.5pt] ${state === "Watch" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"}`}
                >
                  {state}
                </b>
              </div>
              <strong className="mt-[2mm] block text-[15pt] text-navy">{value}</strong>
              <div className="mt-[1.5mm] flex h-[1.8mm] rounded-full bg-slate-100">
                <div className="self-stretch rounded-full bg-blue" style={{ width: value }} />
              </div>
            </article>
          ))}
        </div>
      </BoardSection>
    </>
  );
}
