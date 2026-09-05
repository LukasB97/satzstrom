import "./styles.css";
import type { ReactNode } from "react";
import {
  Contents,
  Document,
  Flow,
  Footnote,
  Math as Formula,
  Page,
  PageBreak,
  PageMaster,
  Ref,
  Sequence,
  defineSequence,
  type PageLayoutProps,
} from "@satzstrom/primitives";
import { PageFrame } from "../shared/page-frame";
import { OrbitMark, TransferPlot, ConstellationMap, SignalWave } from "./visuals";

type Data = {
  title: string;
  mission: string;
  generatedAt: string;
  crew: string[];
  telemetry: Array<{ label: string; value: string; delta: string }>;
  trajectory: Array<{
    phase: string;
    epoch: string;
    radius: string;
    velocity: string;
    risk: string;
  }>;
};

const sections = defineSequence({ name: "sections", titleRequired: true });
const figures = defineSequence({ name: "figures", titleRequired: true });
const protocols = defineSequence({ name: "protocols", titleRequired: true });

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Sequence sequence={sections} id={id} title={title}>
      {({ number, depth }) => {
        const Heading = `h${Math.min(depth, 6)}` as "h1";
        const body = (
          <section>
            <Heading className={`rr-heading atlas-heading atlas-heading-${depth}`}>
              <span>{number}</span>
              <span hidden> </span>
              {title}
            </Heading>
            {children}
          </section>
        );
        return body;
      }}
    </Sequence>
  );
}

function Paragraph({ children, lead = false }: { children: ReactNode; lead?: boolean }) {
  return <p className={lead ? "atlas-paragraph atlas-lead" : "atlas-paragraph"}>{children}</p>;
}

function Figure({
  id,
  title,
  children,
  wide = false,
}: {
  id: string;
  title: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <Sequence sequence={figures} id={id} title={title}>
      {({ number }) => (
        <figure className={wide ? "atlas-figure atlas-figure-wide" : "atlas-figure"}>
          {children}
          <figcaption>
            <b>FIG {number}</b>
            <span>{title}</span>
          </figcaption>
        </figure>
      )}
    </Sequence>
  );
}

function Protocol({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Sequence sequence={protocols} id={id} title={title}>
      {({ number }) => (
        <aside style={{ breakInside: "avoid-page" }} className="protocol">
          <div className="protocol-index">PROTOCOL {number}</div>
          <h3>{title}</h3>
          {children}
        </aside>
      )}
    </Sequence>
  );
}

function AtlasLayout(props: PageLayoutProps) {
  return (
    <PageFrame
      {...props}
      margin={{ top: 20, right: 19, bottom: 22, left: 19 }}
      header="HELIOS / 27"
      footer={`HELIOS / 27 · ${props.page} / ${props.pages}`}
    >
      <Flow />
    </PageFrame>
  );
}

export default function Report(data: Data) {
  return (
    <Document title={data.title} author="Helios Navigation Bureau" lang="de" className="atlas">
      <Page size="A4" className="atlas-cover-page">
        <section style={{ breakInside: "avoid-page" }} className="atlas-cover">
          <div className="cover-top">
            <span>HELIOS NAVIGATION BUREAU</span>
            <span>CLASS // LUMEN</span>
          </div>
          <OrbitMark />
          <div className="cover-title">
            <div>{data.mission}</div>
            <h1>{data.title}</h1>
            <p>Ein typografischer Flugplan für eine Reise jenseits der bekannten Karten.</p>
          </div>
          <div className="cover-bottom">
            <span>FLIGHT COPY 04</span>
            <span>{data.generatedAt}</span>
          </div>
        </section>
      </Page>

      <PageMaster layout={AtlasLayout} size="A4">
        <section className="atlas-index-page">
          <div style={{ breakInside: "avoid-page" }} className="eyebrow">
            NAVIGATION DOSSIER · REVISION 12
          </div>
          <h1 className="rr-heading index-title">Flight index</h1>
          <Contents sequence={sections} className="atlas-contents" />
          <aside style={{ breakInside: "avoid-page" }} className="dispatch">
            <div>
              <span>MISSION</span>
              <strong>{data.mission}</strong>
            </div>
            <div>
              <span>WINDOW</span>
              <strong>2087.199—2088.252</strong>
            </div>
            <div>
              <span>AUTHORITY</span>
              <strong>HNB / L4</strong>
            </div>
          </aside>
          <div style={{ breakInside: "avoid-page" }} className="crew-strip">
            {data.crew.map((name, i) => (
              <div key={name}>
                <span>0{i + 1}</span>
                {name}
              </div>
            ))}
          </div>
          <blockquote style={{ breakInside: "avoid-page" }} className="manifesto">
            “A map becomes useful at the exact moment it admits the unknown.”
            <cite>Navigation doctrine 7.4</cite>
          </blockquote>
        </section>

        <PageBreak />
        <Section id="mission-profile" title="Missionsprofil">
          <Paragraph lead>
            Vier Körper, drei Swing-bys und ein schmales thermisches Fenster bilden den Korridor
            nach Asterion. Dieses Dossier verbindet wissenschaftlichen Satz mit einer visuellen
            Sprache, die auch unter Zeitdruck lesbar bleibt.
          </Paragraph>
          <div style={{ breakInside: "avoid-page" }} className="telemetry-grid">
            {data.telemetry.map((item, i) => (
              <article key={item.label}>
                <span>
                  0{i + 1} / {item.label}
                </span>
                <strong>{item.value}</strong>
                <em>{item.delta}</em>
              </article>
            ))}
          </div>
          <Section id="geometry" title="Geometrie des Transfers">
            <Paragraph>
              Die Route minimiert den Treibstoffbedarf über eine Folge gekoppelter Kegelschnitte.
              Für jeden Abschnitt wird der Zustandsvektor{" "}
              <Formula>{String.raw`\mathbf{x}(t)=(\mathbf{r}(t),\mathbf{v}(t))`}</Formula> so
              gewählt, dass Position und Impuls an den Übergängen stetig bleiben.
              <Footnote>
                Das Modell verwendet ein gepatchtes Zweikörperproblem. Relativistische Effekte
                werden erst innerhalb von 0,4 AU berücksichtigt.
              </Footnote>
            </Paragraph>
            <Figure id="transfer-figure" title="Nominale Transferbahn zwischen Luna und Asterion.">
              <TransferPlot />
            </Figure>
            <Protocol id="continuity" title="Kontinuitätsbedingung">
              <Formula
                display
              >{String.raw`\Delta \mathbf{v}_k = \mathbf{v}^{+}_k-\mathbf{v}^{-}_k,\qquad \mathcal{J}=\sum_{k=1}^{m}\lVert\Delta \mathbf{v}_k\rVert_2`}</Formula>
              <p>
                Die zulässige Bahn minimiert <Formula>{String.raw`\mathcal{J}`}</Formula> unter
                thermischen, zeitlichen und strukturellen Grenzen.
              </p>
            </Protocol>
          </Section>
        </Section>
      </PageMaster>

      <Page size="A3" orientation="landscape" className="foldout-page">
        {({ page, pages }) => (
          <PageFrame
            page={page}
            pages={pages}
            margin={{ top: 15, right: 16, bottom: 16, left: 16 }}
            header="DEEP SPACE NETWORK · HELIOS / 27"
            footer={`FOLDOUT A · ${page} / ${pages}`}
          >
            <div style={{ breakInside: "avoid-page" }} className="foldout-heading">
              <div>
                <span>FOLDOUT A</span>
                <h1>Deep-space navigation lattice</h1>
              </div>
              <p>Primärroute, Knotenstatus und Energiebudget im Maßstab 1 : 4,8 × 10¹⁰.</p>
            </div>
            <Figure
              id="lattice-figure"
              title="Navigationskorridor mit redundanten Peilpunkten."
              wide
            >
              <ConstellationMap />
            </Figure>
            <div style={{ breakInside: "avoid-page" }} className="foldout-grid">
              <table className="trajectory-table">
                <thead>
                  <tr>
                    <th>Phase</th>
                    <th>Epoche</th>
                    <th>Radius</th>
                    <th>v∞</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {data.trajectory.map((row) => (
                    <tr key={row.phase}>
                      <td>{row.phase}</td>
                      <td>{row.epoch}</td>
                      <td>{row.radius}</td>
                      <td>{row.velocity}</td>
                      <td>
                        <span className={`risk risk-${row.risk.toLowerCase()}`}>{row.risk}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <aside style={{ breakInside: "avoid-page" }} className="vector-card">
                <div className="eyebrow">STATE VECTOR / J2000</div>
                <Formula
                  display
                >{String.raw`\mathbf r_0=\begin{bmatrix}-1.842\\0.773\\0.116\end{bmatrix}\!\times10^8\ \mathrm{km}`}</Formula>
                <Formula
                  display
                >{String.raw`\mathbf v_0=\begin{bmatrix}-12.44\\-28.07\\1.92\end{bmatrix}\ \mathrm{km\,s^{-1}}`}</Formula>
                <p>Navigation covariance after gate N-09</p>
                <strong>σ = 18.42 km</strong>
              </aside>
            </div>
            <div style={{ breakInside: "avoid-page" }} className="event-strip">
              <article>
                <span>EVENT 018</span>
                <b>PERIAPSIS</b>
                <strong>0,311 AU</strong>
                <em>1412 K shield peak</em>
              </article>
              <article>
                <span>EVENT 027</span>
                <b>GATE N-09</b>
                <strong>18,42 km</strong>
                <em>3σ covariance</em>
              </article>
              <article>
                <span>EVENT 031</span>
                <b>COMMS SHADOW</b>
                <strong>11m 42s</strong>
                <em>autonomous flight</em>
              </article>
              <article>
                <span>EVENT 044</span>
                <b>INJECTION</b>
                <strong>8,116 AU</strong>
                <em>capture confirmed</em>
              </article>
            </div>
          </PageFrame>
        )}
      </Page>

      <PageMaster layout={AtlasLayout} size="A4">
        <Section id="signal-lab" title="Signal laboratory">
          <Paragraph lead>
            Am Tag 311 erreicht ein schmalbandiger Träger das Schiff aus Richtung NGC 6357. Die
            folgenden Ebenen zeigen denselben Inhalt als Messwert, Wellenform und Bedeutung.
          </Paragraph>
          <Figure
            id="signal-figure"
            title="Bereinigtes Spektrum nach Entfernung des Trägerrauschens."
          >
            <SignalWave />
          </Figure>
          <div style={{ breakInside: "avoid-page" }} className="language-grid">
            <article>
              <span>DE / TRANSKRIPT</span>
              <p>
                Wenn die Dämmerung den äußeren Ring berührt, richtet die Antenne auf den stillen
                Stern.
              </p>
            </article>
            <article lang="ja">
              <span>JP / CONTROL</span>
              <p>薄明が外縁に触れたら、アンテナを静かな星へ向ける。</p>
            </article>
            <article lang="ar" dir="rtl">
              <span>AR / RELAY</span>
              <p>عندما يلامس الشفق الحلقة الخارجية، وجّه الهوائي نحو النجم الهادئ.</p>
            </article>
          </div>
          <Section id="decoding" title="Dekodierung">
            <Paragraph>
              Das Signal wird mit einem Fenster <Formula>{String.raw`w[n]`}</Formula> gefaltet und
              anschließend in 4096 Frequenzzellen zerlegt. Der robuste Schätzer verwirft Ausreißer
              oberhalb des Medianabstands und bewahrt dabei die Phasenlage.
            </Paragraph>
            <Formula
              display
            >{String.raw`X_k=\sum_{n=0}^{N-1}x_n\,w_n\,e^{-i2\pi kn/N}\qquad\operatorname{SNR}=10\log_{10}\!\left(\frac{P_s}{P_n}\right)=31.8\,\mathrm{dB}`}</Formula>
            <Protocol id="decode-protocol" title="Verifikation">
              <ol>
                <li>Trägerphase auf Epoche T+311 d normieren.</li>
                <li>Paritätsrahmen gegen Kanal B-17 prüfen.</li>
                <li>Semantischen Hash mit der Bodenstation vergleichen.</li>
              </ol>
            </Protocol>
          </Section>
        </Section>

        <PageBreak />
        <Section id="flight-rule" title="Final flight rule">
          <div style={{ breakInside: "avoid-page" }} className="final-rule">
            <span>GO / NO-GO</span>
            <strong>PROCEED</strong>
            <p>Die Bahn bleibt innerhalb aller thermischen und dynamischen Grenzen.</p>
          </div>
          <Paragraph>
            Die Ausführung wird freigegeben, sobald Protokoll <Ref target="decode-protocol" /> auf
            Seite <Ref target="decode-protocol" value="page" /> bestätigt ist. Der vollständige
            Navigationskorridor befindet sich in <Ref target="lattice-figure" value="title" /> auf
            Seite <Ref target="lattice-figure" value="page" />.
          </Paragraph>
          <div style={{ breakInside: "avoid-page" }} className="signature-grid">
            <div>
              <span>FLIGHT DYNAMICS</span>
              <b>Mara Venn</b>
            </div>
            <div>
              <span>MISSION CONTROL</span>
              <b>Noor al-Khatib</b>
            </div>
            <div>
              <span>TIME AUTHORITY</span>
              <b>{data.generatedAt}</b>
            </div>
          </div>
          <div style={{ breakInside: "avoid-page" }} className="closing-mark">
            <OrbitMark />
            <div>
              <span>{data.mission}</span>
              <strong>
                THE MAP ENDS.
                <br />
                THE FLIGHT BEGINS.
              </strong>
            </div>
          </div>
        </Section>
      </PageMaster>
    </Document>
  );
}
