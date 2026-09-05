import { Contents, Math as Formula, Page, Ref, type SequenceEntry } from "@satzstrom/primitives";
import { Specimen, specimens } from "./frame";
import { BlueprintPlan, BlueprintSection, BookEtching, RevenueChart } from "./visuals";
import type { SpecimenData } from "./data";

export function ClosingPages({ data }: { data: SpecimenData }) {
  return (
    <>
      <Page size="A4" className="finance-page">
        {({ pages }) => (
          <Specimen id="finance" title="Finance - Northstar quarterly pulse">
            {(number) => (
              <article className="finance-layout">
                <header>
                  <div>
                    <b>NORTHSTAR</b>
                    <span>BOARD PULSE / Q3 FY26</span>
                  </div>
                  <div>
                    CONFIDENTIAL
                    <br />
                    {number} / {pages}
                  </div>
                </header>
                <main>
                  <div style={{ breakInside: "avoid-page" }} className="finance-title">
                    <div>
                      <h1>
                        Growth with
                        <br />
                        operating leverage.
                      </h1>
                    </div>
                    <aside>
                      <b>DECISION 03</b>
                      <p>Release the sovereign cloud capacity envelope.</p>
                      <strong>€4.2m</strong>
                    </aside>
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="finance-kpis">
                    {[
                      ["ARR", "€84.2m", "+31%"],
                      ["NRR", "119%", "+4 pp"],
                      ["GROSS MARGIN", "78.4%", "+2.3 pp"],
                      ["EBITDA", "€8.7m", "+€6.1m"],
                    ].map(([label, value, change]) => (
                      <article key={label}>
                        <span>{label}</span>
                        <b>{value}</b>
                        <em>{change}</em>
                      </article>
                    ))}
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="finance-grid">
                    <section>
                      <div className="finance-section-title">
                        <b>REVENUE / €M</b>
                        <span>ACTUAL ■ PLAN ▪</span>
                      </div>
                      <RevenueChart values={data.quarters} />
                      <div className="finance-comment">
                        <b>Signal</b>
                        <p>Expansion and usage pricing offset slower new-logo volume.</p>
                      </div>
                    </section>
                    <section>
                      <div className="finance-section-title">
                        <b>PORTFOLIO</b>
                        <span>Q3 CLOSE</span>
                      </div>
                      <table>
                        <thead>
                          <tr>
                            <th>Segment</th>
                            <th>Revenue</th>
                            <th>Growth</th>
                            <th>GM</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.portfolio.map((p) => (
                            <tr key={p.name}>
                              <td>{p.name}</td>
                              <td>{p.revenue}</td>
                              <td>{p.growth}</td>
                              <td>{p.margin}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      <div className="finance-risk">
                        <span>WATCH</span>
                        <b>Delivery capacity</b>
                        <p>Sovereign cloud is the critical path for 14 signed customers.</p>
                      </div>
                    </section>
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="finance-bridge">
                    <span>
                      OPENING ARR <b>78.1</b>
                    </span>
                    <i>+</i>
                    <span>
                      NEW <b>3.8</b>
                    </span>
                    <i>+</i>
                    <span>
                      EXPANSION <b>3.1</b>
                    </span>
                    <i>-</i>
                    <span>
                      CHURN <b>0.8</b>
                    </span>
                    <i>=</i>
                    <span className="total">
                      CLOSING ARR <b>84.2</b>
                    </span>
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="finance-outlook">
                    <section>
                      <div>
                        <span>FY26 OUTLOOK</span>
                        <b>€91-94m</b>
                        <small>ARR range / 84% confidence</small>
                      </div>
                      <div className="outlook-track">
                        <i />
                        <i />
                        <i />
                        <b>BASE</b>
                      </div>
                    </section>
                    <section>
                      <span>CAPITAL ALLOCATION</span>
                      {[
                        ["PRODUCT", 38],
                        ["SOVEREIGN CLOUD", 27],
                        ["GO-TO-MARKET", 21],
                        ["CONTROL FABRIC", 14],
                      ].map(([label, value]) => (
                        <div className="allocation-row" key={String(label)}>
                          <b>{label}</b>
                          <i>
                            <em style={{ width: `${value}%` }} />
                          </i>
                          <span>{value}%</span>
                        </div>
                      ))}
                    </section>
                    <aside>
                      <span>NEXT THREE GATES</span>
                      <ol>
                        <li>
                          <b>08 AUG</b>Sovereign readiness
                        </li>
                        <li>
                          <b>15 SEP</b>Atlas beta exit
                        </li>
                        <li>
                          <b>22 OCT</b>Q4 board
                        </li>
                      </ol>
                    </aside>
                  </div>
                </main>
                <footer>
                  <span>FINANCE + STRATEGY / 19 JULY 2026</span>
                  <span>BOARD MATERIAL</span>
                </footer>
              </article>
            )}
          </Specimen>
        )}
      </Page>

      <Page size="A3" orientation="landscape" className="blueprint-page">
        {({ pages }) => (
          <Specimen id="architecture" title="Architecture - House for many voices">
            {(number) => (
              <article className="blueprint-layout">
                <header>
                  <div>
                    <b>ATELIER NORD</b>
                    <span>COMPETITION SET / A-101</span>
                  </div>
                  <div>
                    1 : 200
                    <br />
                    ISSUE FOR REVIEW
                    <br />
                    {number} / {pages}
                  </div>
                </header>
                <main>
                  <div className="blueprint-title">
                    <h1>
                      House for
                      <br />
                      many voices
                    </h1>
                    <p>
                      A civic room formed by one continuous wall, a shaded court and seven ways in.
                    </p>
                  </div>
                  <div className="blueprint-plan">
                    <BlueprintPlan />
                    <div className="blueprint-labels">
                      <span>A</span>
                      <span>B</span>
                      <span>C</span>
                      <span>D</span>
                    </div>
                  </div>
                  <div className="blueprint-section">
                    <BlueprintSection />
                  </div>
                  <aside style={{ breakInside: "avoid-page" }} className="blueprint-data">
                    <div>
                      <span>GROSS AREA</span>
                      <b>7 860 m²</b>
                    </div>
                    <div>
                      <span>PUBLIC FLOOR</span>
                      <b>71%</b>
                    </div>
                    <div>
                      <span>EMBODIED C</span>
                      <b>312 kg/m²</b>
                    </div>
                    <div>
                      <span>GRID</span>
                      <b>7.2 m</b>
                    </div>
                  </aside>
                  <div style={{ breakInside: "avoid-page" }} className="blueprint-notes">
                    <article>
                      <b>01 / WALL</b>
                      <p>Rammed earth carries structure, thermal mass and the public route.</p>
                    </article>
                    <article>
                      <b>02 / COURT</b>
                      <p>Rain, shade and sound collect in the centre rather than at the edge.</p>
                    </article>
                    <article>
                      <b>03 / ROOF</b>
                      <p>A timber cassette field spans every room with one repeatable detail.</p>
                    </article>
                  </div>
                  <div className="blueprint-stamp">
                    <span>STATUS</span>
                    <b>SHORTLIST</b>
                    <small>07.2026</small>
                  </div>
                </main>
                <footer>
                  <span>DRAWING A-101 / GENERAL ARRANGEMENT</span>
                  <span>ALL DIMENSIONS IN MILLIMETRES</span>
                </footer>
              </article>
            )}
          </Specimen>
        )}
      </Page>

      <Page size="A5" className="nonfiction-page">
        {({ page, pages }) => (
          <div className="book-frame">
            <header aria-hidden="true">
              <span>THE QUIET MACHINE</span>
              <span>CHAPTER IV</span>
            </header>
            <main>
              <Specimen id="nonfiction" title="Nonfiction - The quiet machine">
                {(number) => (
                  <article className="book-layout">
                    <header style={{ breakInside: "avoid-page", breakAfter: "avoid-page" }}>
                      <h1>The quiet machine</h1>
                      <p>How a mechanical bird taught its makers to listen</p>
                    </header>
                    <figure style={{ breakInside: "avoid-page" }} className="book-etching">
                      <BookEtching />
                      <figcaption>Plate {number}. The third prototype at rest.</figcaption>
                    </figure>
                    <p className="book-opening">
                      The bird did not sing on the first morning. It clicked, waited, and turned its
                      brass head toward the rain.
                    </p>
                    <p>
                      For eleven years, engineer Hana Vale had reduced flight to ratios: lift over
                      drag, mass over span, stored energy over time. The equations were exact. The
                      animal remained impossible.
                    </p>
                    <p>
                      Her breakthrough came from the reeds. A living wing never meets still air; it
                      reads a field of small disturbances and yields before it corrects. Vale
                      replaced the rigid joint with a thin spring that could remember its last
                      position.
                      <sup className="page-footnote-call">3</sup>
                    </p>
                    <blockquote style={{ breakInside: "avoid-page" }}>
                      A machine becomes graceful when correction stops looking like resistance.
                    </blockquote>
                    <p>
                      The new mechanism used less energy because it ceased fighting every error. Its
                      control law was almost modest:
                    </p>
                    <Formula
                      display
                      label="Adaptive control law"
                    >{String.raw`u_{t+1}=u_t+\alpha e_t-\beta\left(u_t-u_{t-1}\right)`}</Formula>
                    <p>
                      Vale tuned the final mechanism by ear. A clean return made one soft click; a
                      correction that arrived too late made two. By winter, the machine could yield
                      to a gust, recover its line, and settle without the rigid shudder of the
                      earlier frames.
                    </p>
                    <p>
                      The same principle appears elsewhere in this book. The shortest path on page{" "}
                      <Ref target="mathematics" value="page" /> and the reviewable path on page{" "}
                      <Ref target="law" value="page" /> both depend on bounded correction.
                    </p>
                    <div className="book-end">IV</div>
                  </article>
                )}
              </Specimen>
            </main>
            <aside className="page-footnote" role="note">
              <span>3.</span>
              <p>
                The final spring was 0.18 millimetres thick and cut from tempered phosphor bronze.
              </p>
            </aside>
            <footer aria-hidden="true">
              <span>{page}</span>
              <span>{pages}</span>
            </footer>
          </div>
        )}
      </Page>

      <Page size={{ width: 210, height: 210 }} className="index-page">
        {({ pages }) => (
          <Specimen id="system" title="System - Index of forms">
            {(number) => (
              <article className="index-layout">
                <header>
                  <div>
                    <b>TEN</b>
                    <span>DOCUMENT SPECIMEN BOOK</span>
                  </div>
                  <div>
                    {data.issue}
                    <br />
                    {number} / {pages}
                  </div>
                </header>
                <main>
                  <div className="index-title">
                    <h1>
                      One engine.
                      <br />
                      <i>Many forms.</i>
                    </h1>
                  </div>
                  <Contents sequence={specimens} asChild>
                    <SpecimenIndex />
                  </Contents>
                </main>
                <aside>
                  <div>
                    <b>10</b>
                    <span>PHYSICAL PAGES</span>
                  </div>
                  <div>
                    <b>08</b>
                    <span>PAPER FORMATS</span>
                  </div>
                  <div>
                    <b>01</b>
                    <span>REACT TREE</span>
                  </div>
                </aside>
                <footer>
                  <span>SATZSTROM</span>
                  <span>STRUCTURE / LAYOUT / PDF</span>
                </footer>
              </article>
            )}
          </Specimen>
        )}
      </Page>
    </>
  );
}

function SpecimenIndex({ entries = [] }: { entries?: SequenceEntry[] }) {
  return (
    <ol className="specimen-index">
      {entries.map((entry) => (
        <li key={entry.id}>
          <a href={`#${entry.id}`}>
            <b>{entry.number}</b>
            <span>{entry.title}</span>
            <em>{String(entry.page).padStart(2, "0")}</em>
          </a>
        </li>
      ))}
    </ol>
  );
}
