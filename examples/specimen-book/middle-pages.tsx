import { Math as Formula, Page } from "@satzstrom/primitives";
import { Figure, Specimen } from "./frame";
import { EvidenceChart, ParticleEvent, ProductForm } from "./visuals";
import type { SpecimenData } from "./data";

export function MiddlePages({ data }: { data: SpecimenData }) {
  return (
    <>
      <Page size="A4" className="press-page">
        {({ pages }) => (
          <Specimen id="journalism" title="Data journalism - The unequal shade of summer">
            {(number) => (
              <article className="press-layout">
                <header>
                  <div>
                    <b>THE SIGNAL</b>
                    <span>WEEKEND DATA EDITION</span>
                  </div>
                  <div>
                    {data.published}
                    <br />
                    CLIMATE / CITIES / HEALTH
                    <br />
                    {number} OF {pages}
                  </div>
                </header>
                <main>
                  <h1>
                    The unequal
                    <br />
                    <i>shade</i> of summer
                  </h1>
                  <p className="press-deck">
                    A block-by-block analysis finds that trees protect the coolest neighbourhoods
                    twice over, while the hottest streets wait longest for relief.
                  </p>
                  <div style={{ breakInside: "avoid-page" }} className="press-byline">
                    <b>By Mara Venn</b>
                    <span>Data reporting by Elias Roth</span>
                    <span>Illustration by Studio North</span>
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="press-columns">
                    <section>
                      <p className="press-opening">
                        At 4:10 p.m., the pavement on Delancey Street reached 54 degrees Celsius.
                        Two kilometres west, beneath mature plane trees, it was 17 degrees cooler.
                      </p>
                      <p>
                        The Signal combined 1.8 million satellite temperature readings with the city
                        tree register. The pattern was sharper than income alone could explain.
                        Streets built before 1940 held nearly twice the canopy of post-war
                        districts.
                      </p>
                      <blockquote style={{ breakInside: "avoid-page" }}>
                        <strong>17°C</strong>
                        <span>
                          the largest temperature gap measured between two streets on the same
                          afternoon
                        </span>
                      </blockquote>
                    </section>
                    <section>
                      <Figure
                        id="shade-chart"
                        title="Canopy cover and annual hours above the local heat threshold."
                        className="press-figure"
                      >
                        <EvidenceChart cities={data.cities} />
                      </Figure>
                      <div className="press-legend">
                        <span>
                          <i className="bar" />
                          canopy cover
                        </span>
                        <span>
                          <i className="dot" />
                          heat hours
                        </span>
                        <b>Source: Urban Climate Observatory, 2025</b>
                      </div>
                    </section>
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="press-findings">
                    <article>
                      <b>01</b>
                      <h2>Shade follows age</h2>
                      <p>
                        Older street grids hold the widest crowns and the smallest gaps between
                        them.
                      </p>
                    </article>
                    <article>
                      <b>02</b>
                      <h2>Night is the risk</h2>
                      <p>Emergency calls rise when streets stay above 29°C after midnight.</p>
                    </article>
                    <article>
                      <b>03</b>
                      <h2>Maintenance wins</h2>
                      <p>
                        Survival after five years matters more than the number planted in year one.
                      </p>
                    </article>
                  </div>
                </main>
                <footer>
                  <span>THE SIGNAL / EVIDENCE FOR PUBLIC LIFE</span>
                  <span>CONTINUED ONLINE WITH METHODS AND DATA</span>
                </footer>
              </article>
            )}
          </Specimen>
        )}
      </Page>

      <Page size="A4" orientation="landscape" className="physics-page">
        {({ pages }) => (
          <Specimen id="physics" title="Physics - Anatomy of an event">
            {(number) => (
              <article className="physics-layout">
                <header>
                  <div>
                    <b>ATLAS / EVENT 881204</b>
                    <span>PROTON-PROTON COLLISION / 13.6 TeV</span>
                  </div>
                  <div>
                    RUN 4812
                    <br />
                    LUMINOSITY BLOCK 77
                    <br />
                    {number} / {pages}
                  </div>
                </header>
                <main>
                  <div className="physics-title">
                    <h1>
                      Anatomy
                      <br />
                      of an event
                    </h1>
                    <p>
                      Six charged tracks, two jets and one imbalance that may point beyond the
                      standard model.
                    </p>
                  </div>
                  <Figure
                    id="particle-event"
                    title="Transverse view of candidate event 881204."
                    className="physics-event"
                  >
                    <ParticleEvent />
                  </Figure>
                  <aside style={{ breakInside: "avoid-page" }} className="physics-readout">
                    <div>
                      <span>LEADING JET</span>
                      <b>482.7</b>
                      <small>GeV / c</small>
                    </div>
                    <div>
                      <span>MISSING ET</span>
                      <b>214.3</b>
                      <small>GeV</small>
                    </div>
                    <div>
                      <span>VERTICES</span>
                      <b>37</b>
                      <small>reconstructed</small>
                    </div>
                    <div>
                      <span>SIGNIFICANCE</span>
                      <b>4.1σ</b>
                      <small>local</small>
                    </div>
                  </aside>
                  <div style={{ breakInside: "avoid-page" }} className="physics-equation">
                    <span>INVARIANT MASS</span>
                    <Formula
                      display
                      label="Invariant mass relation"
                    >{String.raw`m^2c^4=E^2-p^2c^2\qquad m_{jj}=3.82\ \mathrm{TeV}/c^2`}</Formula>
                  </div>
                  <div style={{ breakInside: "avoid-page" }} className="physics-notes">
                    <article>
                      <b>TRIGGER</b>
                      <p>Passed HLT_j420 and missing-energy cross-check.</p>
                    </article>
                    <article>
                      <b>INTERPRETATION</b>
                      <p>
                        Compatible with a heavy resonance; global significance remains below
                        discovery threshold.
                      </p>
                    </article>
                    <article>
                      <b>NEXT TEST</b>
                      <p>Compare the opposite-charge channel in the full Run 4 sample.</p>
                    </article>
                  </div>
                </main>
                <footer>
                  <span>OPEN COLLIDER LAB / PRELIMINARY</span>
                  <span>DOI 10.4801/OCL.881204</span>
                </footer>
              </article>
            )}
          </Specimen>
        )}
      </Page>

      <Page size="A4" bleed={3} className="campaign-page">
        {({ pages }) => (
          <Specimen id="marketing" title="Marketing - Auralis One launch campaign">
            {(number) => (
              <article className="campaign-layout">
                <header>
                  <b>AURALIS</b>
                  <span>ONE / FIELD EDITION 02</span>
                  <span>
                    {number} / {pages}
                  </span>
                </header>
                <div className="campaign-orbit" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                </div>
                <ProductForm />
                <main>
                  <h1>
                    Make space
                    <br />
                    for <i>sound.</i>
                  </h1>
                  <p>
                    Auralis One turns any room into a listening field. Twelve hours untethered. One
                    continuous form.
                  </p>
                  <div className="campaign-actions">
                    <b>LISTEN WITHOUT EDGES</b>
                    <span>auralis.audio/one</span>
                  </div>
                </main>
                <aside style={{ breakInside: "avoid-page" }} className="campaign-specs">
                  <div>
                    <b>12 h</b>
                    <span>BATTERY</span>
                  </div>
                  <div>
                    <b>360°</b>
                    <span>FIELD</span>
                  </div>
                  <div>
                    <b>1.8 kg</b>
                    <span>WEIGHT</span>
                  </div>
                  <div>
                    <b>IP67</b>
                    <span>SEALED</span>
                  </div>
                </aside>
                <footer>
                  <span>DESIGNED IN COPENHAGEN</span>
                  <span>RECYCLED ALUMINIUM / REPAIRABLE CORE</span>
                </footer>
              </article>
            )}
          </Specimen>
        )}
      </Page>
    </>
  );
}
