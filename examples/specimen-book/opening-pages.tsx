import { Math as Formula, Page, Ref } from "@satzstrom/primitives";
import { Figure, Specimen } from "./frame";
import { CoverGlyph, GeodesicDiagram } from "./visuals";
import type { SpecimenData } from "./data";

export function OpeningPages({ data }: { data: SpecimenData }) {
  return (
    <>
      <Page size="A4" bleed={3} cropMarks className="ten-cover-page">
        {({ page, pages }) => (
          <Specimen id="cover" title="Ten document forms">
            {(number) => (
              <div className="ten-cover">
                <header>
                  <b>SATZSTROM</b>
                  <span>{data.issue}</span>
                </header>
                <CoverGlyph />
                <main>
                  <span>SPECIMEN BOOK / {number}</span>
                  <h1>TEN</h1>
                  <p>Ten disciplines. Ten visual systems. One document engine.</p>
                </main>
                <aside>
                  {[
                    ["01", "MATHEMATICS"],
                    ["02", "LAW"],
                    ["03", "JOURNALISM"],
                    ["04", "PHYSICS"],
                    ["05", "MARKETING"],
                    ["06", "FINANCE"],
                    ["07", "ARCHITECTURE"],
                    ["08", "NONFICTION"],
                    ["09", "SYSTEM"],
                  ].map(([n, label]) => (
                    <div key={n}>
                      <b>{n}</b>
                      <span>{label}</span>
                    </div>
                  ))}
                </aside>
                <footer>
                  <span>LOCAL PDF / STRUCTURED / PRINT READY</span>
                  <span>
                    {page} / {pages} - {data.published}
                  </span>
                </footer>
              </div>
            )}
          </Specimen>
        )}
      </Page>

      <Page size="A4" className="math-page">
        {({ page, pages }) => (
          <div className="scholarly-frame">
            <header aria-hidden="true">
              <span>ANNALS OF CONTINUOUS GEOMETRY</span>
              <span>VOL. 41 / NO. 2</span>
            </header>
            <main>
              <Specimen id="mathematics" title="Mathematics - The shape of shortest paths">
                {(number) => (
                  <article className="math-paper">
                    <header
                      style={{ breakInside: "avoid-page", breakAfter: "avoid-page" }}
                      className="math-title"
                    >
                      <h1>The shape of shortest paths</h1>
                      <div>
                        <b>{data.journal.author}</b>
                        <span>{data.journal.institution}</span>
                        <span>Received 14 March 2026</span>
                      </div>
                    </header>
                    <p className="math-abstract">
                      <b>Abstract.</b> We show that a constrained geodesic remains unique inside a
                      convex normal neighbourhood and give a constructive bound for its deviation
                      under smooth perturbation of the metric.
                    </p>
                    <div className="math-keywords">
                      <span>
                        <b>Keywords.</b> geodesics, convexity, metric perturbation
                      </span>
                      <span>
                        <b>MSC 2020.</b> 53C22, 58E10
                      </span>
                    </div>
                    <div style={{ breakInside: "avoid-page" }} className="math-columns">
                      <section>
                        <h2>1. Introduction</h2>
                        <p>
                          Shortest paths on a smooth manifold are governed by a simple variational
                          principle, yet their behaviour under perturbation is subtle. A small
                          change of metric can move the cut locus and destroy global uniqueness.
                          Inside a convex normal neighbourhood the situation is rigid enough to
                          admit a quantitative answer.
                        </p>
                        <p>
                          We fix a compact set <Formula>{String.raw`K\subset M`}</Formula> and
                          compare the minimizing curves of two nearby metrics. The main result
                          controls both the curve and its velocity by the{" "}
                          <Formula>{String.raw`C^2`}</Formula>
                          distance between those metrics.
                        </p>
                        <h3>1.1. Variational setup</h3>
                        <p>
                          Let <Formula>{String.raw`(M,g)`}</Formula> be a complete Riemannian
                          manifold and let <Formula>{String.raw`p,q\in M`}</Formula>. The energy of
                          a smooth curve <Formula>{String.raw`\gamma:[0,1]\to M`}</Formula> is
                        </p>
                        <Formula
                          display
                          label="Energy of a smooth curve"
                        >{String.raw`E(\gamma)=\frac12\int_0^1 g_{\gamma(t)}\!\left(\dot\gamma(t),\dot\gamma(t)\right)\,dt.`}</Formula>
                        <p>
                          Critical points of <Formula>{String.raw`E`}</Formula> with fixed endpoints
                          satisfy the geodesic equation. On a convex neighbourhood the minimizer is
                          the only critical point with sufficiently small energy.
                        </p>
                        <aside
                          style={{ breakInside: "avoid-page" }}
                          className="theorem"
                          id="geodesic-theorem"
                        >
                          <p>
                            <b>Theorem 1.2.</b> For every compact convex set{" "}
                            <Formula>{String.raw`K\subset M`}</Formula>, there exists{" "}
                            <Formula>{String.raw`\varepsilon_K>0`}</Formula> such that every metric{" "}
                            <Formula>{String.raw`h`}</Formula> satisfying{" "}
                            <Formula>{String.raw`\lVert h-g\rVert_{C^2}<\varepsilon_K`}</Formula>{" "}
                            admits one minimizing geodesic between any two points of{" "}
                            <Formula>{String.raw`K`}</Formula>.
                          </p>
                        </aside>
                        <p>
                          The constant depends only on a lower bound for the convexity radius and
                          upper bounds for the curvature and its first derivative on a neighbourhood
                          of <Formula>{String.raw`K`}</Formula>.
                        </p>
                      </section>
                      <section>
                        <Figure
                          id="geodesic-figure"
                          title="Perturbed geodesics joining p and q inside a convex chart."
                          className="math-figure"
                        >
                          <GeodesicDiagram />
                        </Figure>
                        <h2>2. Stability of the minimizer</h2>
                        <p>
                          The proof follows from coercivity of the index form and a quantitative
                          inverse function argument. If <Formula>{String.raw`V`}</Formula> vanishes
                          at both endpoints, convexity gives
                        </p>
                        <Formula
                          display
                        >{String.raw`I_g(V,V)\ge \lambda_K\lVert V\rVert_{H^1}^2.`}</Formula>
                        <div style={{ breakInside: "avoid-page" }} className="proof">
                          <p>
                            <b>Proof.</b> Work in exponential coordinates centered at{" "}
                            <Formula>{String.raw`p`}</Formula>. The Jacobi operator is invertible on
                            the orthogonal complement of the tangent field, with inverse norm at
                            most <Formula>{String.raw`\lambda_K^{-1}`}</Formula>. The coefficients
                            of the operator vary continuously with the metric.
                          </p>
                          <p>
                            Applying the contraction estimate to the endpoint map produces a unique
                            fixed point and the bound
                          </p>
                          <Formula
                            display
                          >{String.raw`\lVert\gamma_h-\gamma_g\rVert_{C^1}\le A_K\lVert h-g\rVert_{C^2}.`}</Formula>
                          <p>
                            The energy inequality then excludes a second minimizer in the chart.
                            Compactness supplies one constant for all endpoint pairs in{" "}
                            <Formula>{String.raw`K\times K`}</Formula>.
                            <sup className="page-footnote-call">1</sup>{" "}
                            <span className="proof-end">□</span>
                          </p>
                        </div>
                        <h2>3. Uniform endpoint control</h2>
                        <p>
                          Choose finitely many convex charts{" "}
                          <Formula>{String.raw`U_1,\ldots,U_N`}</Formula> covering{" "}
                          <Formula>{String.raw`K`}</Formula>. The local estimates agree on overlaps
                          because the minimizing curve is unique, hence
                        </p>
                        <Formula
                          display
                        >{String.raw`A_K=\max_{1\le j\le N}A(U_j)<\infty.`}</Formula>
                        <p>
                          The same argument controls the distance functions uniformly on{" "}
                          <Formula>{String.raw`K\times K`}</Formula>. In particular, the perturbed
                          exponential map remains injective on the relevant tangent vectors.
                        </p>
                        <p className="corollary">
                          <b>Corollary 3.1.</b> The map{" "}
                          <Formula>{String.raw`h\mapsto d_h|_{K\times K}`}</Formula> is locally
                          Lipschitz from the <Formula>{String.raw`C^2`}</Formula> topology to the
                          uniform topology.
                        </p>
                        <div className="math-note">
                          Article {number}. The bounded-path argument reappears in the evidentiary
                          standard on page <Ref target="law" value="page" />.
                        </div>
                        <h2>4. Sharpness and limitations</h2>
                        <p>
                          The loss of two derivatives is natural. The geodesic equation contains the
                          first derivatives of the metric, while stability of its linearization
                          requires one further derivative. For a conformal family{" "}
                          <Formula>{String.raw`g_s=e^{2sf}g`}</Formula>, differentiation at{" "}
                          <Formula>{String.raw`s=0`}</Formula> gives
                        </p>
                        <Formula
                          display
                        >{String.raw`\left.\frac{d}{ds}\right|_{s=0}\gamma_{g_s}= -J_g^{-1}\!\left(\nabla f-2\,df(\dot\gamma)\dot\gamma\right).`}</Formula>
                        <p>
                          Thus the constant must depend on curvature control near the entire image
                          of the curve. No estimate uniform over all of{" "}
                          <Formula>{String.raw`M`}</Formula> can hold when the convexity radius
                          tends to zero.
                        </p>
                        <h2>References</h2>
                        <ol className="math-references">
                          <li>
                            M. do Carmo, <i>Riemannian Geometry</i>, Birkhäuser, 1992.
                          </li>
                          <li>
                            J. Jost, <i>Riemannian Geometry and Geometric Analysis</i>, 2017.
                          </li>
                          <li>
                            W. Klingenberg, <i>Riemannian Geometry</i>, de Gruyter, 1982.
                          </li>
                        </ol>
                      </section>
                    </div>
                  </article>
                )}
              </Specimen>
            </main>
            <aside className="page-footnote" role="note">
              <span>1.</span>
              <p>
                The bound is uniform only on compact convex subsets; the cut locus prevents a global
                statement.
              </p>
            </aside>
            <footer aria-hidden="true">
              <span>OPEN METHODS EDITION</span>
              <span>
                {page} / {pages}
              </span>
            </footer>
          </div>
        )}
      </Page>

      <Page size="Letter" className="law-page">
        {({ page, pages }) => (
          <div className="legal-frame">
            <header aria-hidden="true">
              <span>HIGH COURT OF AURELIA</span>
              <span>OPINION 24-118</span>
            </header>
            <main>
              <Specimen id="law" title="Law - Opinion of the Court">
                {(number) => (
                  <article className="legal-opinion">
                    <header
                      style={{ breakInside: "avoid-page", breakAfter: "avoid-page" }}
                      className="legal-title"
                    >
                      <b>SUPREME COURT OF AURELIA</b>
                      <h1>Marin v. Office of Civic Algorithms</h1>
                      <p>No. 24-118 - Argued February 11, 2026 - Decided June 4, 2026</p>
                    </header>
                    <div style={{ breakInside: "avoid-page" }} className="legal-rule">
                      <b>HELD</b>
                      <p>
                        An automated public decision is reviewable when its output materially
                        determines access to a statutory benefit.
                      </p>
                    </div>
                    <div style={{ breakInside: "avoid-page" }} className="legal-grid">
                      <aside>
                        <b>REYES, C.J.</b>
                        <span>delivered the opinion of the Court.</span>
                        <ol>
                          <li>Background</li>
                          <li>Reviewability</li>
                          <li>Reasons</li>
                          <li>Remedy</li>
                        </ol>
                        <div className="legal-cite">
                          24 AUR. 118
                          <br />
                          2026 AHC {number}
                        </div>
                      </aside>
                      <section>
                        <p className="legal-lead">
                          The question is whether a citizen may challenge a score that no official
                          formally adopts, yet every official follows. We hold that she may.
                        </p>
                        <h2>I</h2>
                        <p>
                          The Civic Allocation Act requires the Office to give reasons when it
                          denies priority housing. Marin received only a number - 0.41 - generated
                          by a model trained on prior applications. Her caseworker lacked authority
                          to depart from it.
                        </p>
                        <p>
                          Agency action is final when it marks the consummation of a decision
                          process and determines rights or obligations. <i>Bennett v. Spear</i>, 520
                          U.S. 154, 177-178 (1997). The score did both.
                          <sup className="page-footnote-call">2</sup>
                        </p>
                        <h2>II</h2>
                        <p>
                          A reason need not disclose source code. It must identify the decisive
                          facts, the governing rule, and the route connecting them. A conclusion
                          that cannot be traced cannot be reviewed.
                        </p>
                        <h2>III</h2>
                        <p>
                          When an automated output supplies the operative reason, the agency must
                          preserve the factors, weights, and review path used in the individual
                          case. A generic description of the model cannot substitute for that
                          record.
                        </p>
                        <h2>IV</h2>
                        <p>
                          The remedy is a new determination by an officer empowered to examine the
                          score, correct the record, and give reasons that respond to Marin&apos;s
                          actual evidence. Review requires a decision that can still be changed.
                        </p>
                        <blockquote style={{ breakInside: "avoid-page" }}>
                          <b>THE COURT</b>
                          <p>
                            Administrative convenience does not convert an operative decision into a
                            mere recommendation.
                          </p>
                        </blockquote>
                        <p>
                          The judgment is reversed, and the case is remanded for proceedings
                          consistent with this opinion.
                        </p>
                        <div className="legal-close">
                          <span>It is so ordered.</span>
                          <b>REVERSED AND REMANDED</b>
                        </div>
                      </section>
                    </div>
                  </article>
                )}
              </Specimen>
            </main>
            <aside className="page-footnote" role="note">
              <span>2.</span>
              <p>
                The Office may use automated tools. It must still expose the path from material
                facts to the legal conclusion.
              </p>
            </aside>
            <footer aria-hidden="true">
              <span>PUBLIC LAW REPORTS</span>
              <span>
                {page} OF {pages}
              </span>
            </footer>
          </div>
        )}
      </Page>
    </>
  );
}
