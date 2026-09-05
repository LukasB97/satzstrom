import "./styles.css";
import { Document, Math as Formula, PageBreak } from "@satzstrom/primitives";
import { Equation, MathPages, Proof, Theorem } from "./math-components";

export default function VertexEdgeDuality() {
  return (
    <Document
      title="Vertex-Kanten-Dualität"
      author="Satzstrom"
      subject="Der Line-Graph-Satz für kontrahierte Bi-Tilings"
      keywords={["Bi-Tiling", "Liniengraph", "Kontraktion", "Vertex-Kanten-Dualität"]}
      lang="de"
    >
      <MathPages>
        <h1>6 Vertex-Kanten-Dualität</h1>

        <p className="opening">
          Die Kontraktion aus Kapitel 5 verkleinert den unbeschrifteten Zusammenhangskern. Für die
          Portguards muss zusätzlich verfolgt werden, wo die ursprünglichen Randpositionen im
          kontrahierten Kreis liegen.
        </p>

        <h2>6.1 Der kontrahierte Zwischenkreis</h2>

        <p>
          Sei <Formula>{"B"}</Formula> ein verbundenes Bi-Tiling ohne{" "}
          <span className="math-compound" data-rr-atomic>
            <Formula>{"Q"}</Formula>-Block
          </span>
          . Seine primitiven Blöcke seien <Formula>{"I_0,\\ldots,I_{m-1}"}</Formula>. In{" "}
          <Formula>{"I_s"}</Formula> bilde der Dimerpfad <Formula>{"P_s"}</Formula> die Verbindung
          seiner beiden Monomervorkommen. Kontrahiere jeden <Formula>{"P_s"}</Formula> zu einem
          Knoten <Formula>{"p_s"}</Formula>.
        </p>

        <p>
          Jede durch ein altes Monomerpaar erzeugte Kante heiße <em>Flat-Kante</em>; lasse diese
          Kanten <Formula>{"f_0,\\ldots,f_{m-1}"}</Formula> bestehen. Der entstehende zweireguläre
          Multigraph heißt <Formula>{"Q(B)"}</Formula>; er ist ein Kreis, wobei im terminalen
          Einblockfall auch eine einzelne Schleife als Kreis gilt. Seine Knoten sind die
          kontrahierten Blöcke <Formula>{"p_s"}</Formula>, seine Kanten die Flat-Kanten{" "}
          <Formula>{"f_j"}</Formula>.
        </p>

        <h2>6.2 Line-Graph-Satz</h2>

        <p>
          Für einen zweiregulären Multigraphen mit Schleifen erweitern wir den Linienmultigraphen
          inzidenziell: Die beiden Inzidenzen an jedem Knoten erzeugen eine Kante zwischen den
          zugehörigen Kantenknoten; gehören beide Inzidenzen zu derselben Schleife, entsteht eine
          Schleife im Linienmultigraphen.
        </p>

        <Theorem id="line-graph-duality" number="6.1" title="Line-Graph-Dualität">
          <p>
            Identifiziere den Elternrang <Formula>{"j"}</Formula> des kontrahierten Wortes{" "}
            <Formula>{"c(B)"}</Formula> mit der Flat-Kante <Formula>{"f_j"}</Formula>. Die am
            Elternschritt <Formula>{"s"}</Formula> emittierte Rangkante verbindet genau die beiden
            Flat-Kanten an den Enden von <Formula>{"P_s"}</Formula>. Dann gilt
          </p>

          <Equation label="Line-Graph-Isomorphie" number="6.1">
            {"\\boxed{K_{\\mathrm w}(c(B))\\cong L(Q(B)).}"}
          </Equation>
        </Theorem>

        <Proof>
          <p>
            Sortiere die Monomervorkommen beider Rails gemeinsam nach ihrer Rangposition, bei einer
            Gleichheit mit dem linken Vorkommen zuerst. Die beiden Vorkommen eines primitiven Blocks
            sind zwei aufeinanderfolgende Elemente dieser Liste. Gehören sie zu den Flat-Kanten{" "}
            <Formula>{"f_u,f_v"}</Formula>, so ist der kontrahierte Blockknoten{" "}
            <Formula>{"p_s"}</Formula> in <Formula>{"Q(B)"}</Formula> genau mit{" "}
            <Formula>{"f_u,f_v"}</Formula> inzident. Im Liniengraphen erzeugt{" "}
            <Formula>{"p_s"}</Formula> deshalb die Kante <Formula>{"\\{f_u,f_v\\}"}</Formula>.
          </p>

          <p>
            Bei zwei linken Vorkommen sind dies <Formula>{"A_j,A_{j+1}"}</Formula>, und der
            zugehörige{" "}
            <span className="math-compound" data-rr-atomic>
              <Formula>{"U"}</Formula>-Schritt
            </span>{" "}
            emittiert <Formula>{"\\{j,j+1\\}"}</Formula>. Für zwei rechte Vorkommen gilt dies dual
            für <Formula>{"D"}</Formula>. Im gemischten Fall <Formula>{"A_j,B_h"}</Formula>{" "}
            emittiert der{" "}
            <span className="math-compound" data-rr-atomic>
              <Formula>{"F"}</Formula>-Schritt
            </span>{" "}
            <Formula>{"\\{j,h\\}"}</Formula>. In jedem Fall ist dies genau{" "}
            <Formula>{"\\{u,v\\}"}</Formula>; im terminalen Fall fallen <Formula>{"u"}</Formula> und{" "}
            <Formula>{"v"}</Formula> zusammen und beide Seiten von (6.1) besitzen dieselbe Schleife.
          </p>
        </Proof>

        <p>Die Kontraktion ist somit vertex-kanten-dual:</p>

        <Equation label="Vertex-Kanten-Dualität der Kontraktion" number="6.2">
          {
            "\\begin{aligned}\\text{primitiver Block } I_s &\\longleftrightarrow \\text{ Kante des Elternrangkreises},\\\\\\text{Flat-Kante } f_j &\\longleftrightarrow \\text{ Knoten des Elternrangkreises}.\\end{aligned}"
          }
        </Equation>

        <p>
          Insbesondere ist die Elternrangordnung die Monomerpaarordnung, während die
          Elternkantenordnung die Blockordnung ist. Beide werden erst durch denselben Elternkreis
          miteinander gekoppelt.
        </p>

        <PageBreak />
        <h2>6.3 Verlustfreie Expansion</h2>

        <p>
          Sei <Formula>{"\\ell_s"}</Formula> die Ranglänge von <Formula>{"I_s"}</Formula>. Bei einem
          ungeraden{" "}
          <span className="math-compound" data-rr-atomic>
            <Formula>{"F"}</Formula>-Block
          </span>{" "}
          heißt die Angabe, welche Rail sein erstes Monomer enthält, seine <em>Railorientierung</em>
          . Die vollständigen Blockdaten bestehen für jeden Block aus Typ, Länge, Railorientierung
          und der dadurch festgelegten alternierenden inneren Tilefolge.
        </p>

        <p>
          Der <em>markierte Kindpositionskreis</em> ist der zyklische Graph, dessen Knoten die
          ursprünglichen Tile-Ereignisse und damit die Ordnungspositionen des Kindwortes tragen. Aus{" "}
          <Formula>{"Q(B)"}</Formula> und den vollständigen Blockdaten wird er wie folgt
          rekonstruiert:
        </p>

        <ol>
          <li>
            Ersetze den Elternknoten <Formula>{"p_s"}</Formula> durch den geordneten Pfad seiner{" "}
            <Formula>{"\\ell_s-1"}</Formula> nicht-Flat-Kindereignisse.
          </li>
          <li>
            Unterteile jede Elternkante <Formula>{"f_j"}</Formula> durch den zugehörigen
            Flat-Kindknoten.
          </li>
        </ol>

        <p>
          Da <Formula>{"Q(B)"}</Formula> ein Kreis ist, besitzt er gleich viele Knoten und Kanten,
          also genau <Formula>{"m"}</Formula> Flat-Kanten. Die Zahl rekonstruierter Positionen ist
          daher
        </p>

        <Equation label="Zahl der rekonstruierten Kindpositionen" number="6.3">
          {"\\sum_{s=0}^{m-1}(\\ell_s-1)+m = \\sum_{s=0}^{m-1}\\ell_s = n."}
        </Equation>

        <Theorem number="6.2" title="Verlustfrei-kein-Schrumpfen">
          <p>
            Eine Kontraktionsstufe reduziert den verbundenen Rangkern von <Formula>{"n"}</Formula>{" "}
            auf höchstens <Formula>{"n-2"}</Formula> Elternränge. Erhält man jedoch neben dem
            Quotienten die vollständigen Blockdaten, so rekonstruiert die Vertexexpansions- und
            Kantenunterteilungsstruktur weiterhin genau <Formula>{"n"}</Formula> markierte physische
            Randpositionen.
          </p>
        </Theorem>

        <p>
          Ein Sehnenendpunkt an einem nicht-Flat-Ereignis liegt nach der Kontraktion auf dem
          Expansionspfad eines Elternknotens. Ein Endpunkt an einem Flat-Ereignis liegt auf dem
          Unterteilungspunkt einer Elternkante.
        </p>

        <h2>6.4 Faserinvarianz</h2>

        <p>
          Fixiere ein Elternwort <Formula>{"w"}</Formula>. In seinen primitiven Inflationen dürfen
          die{" "}
          <span className="math-compound" data-rr-atomic>
            <Formula>{"U"}</Formula>-
          </span>{" "}
          und{" "}
          <span className="math-compound" data-rr-atomic>
            <Formula>{"D"}</Formula>-Blöcke
          </span>{" "}
          verschiedene gerade positive Längen und die{" "}
          <span className="math-compound" data-rr-atomic>
            <Formula>{"F"}</Formula>-Blöcke
          </span>{" "}
          verschiedene ungerade positive Längen besitzen. Wird ein{" "}
          <span className="math-compound" data-rr-atomic>
            <Formula>{"F"}</Formula>-Zeichen
          </span>{" "}
          von <Formula>{"w"}</Formula> auf positiver Motzkinhöhe ausgeführt, können beide in
          Abschnitt 6.3 definierten Railorientierungen kompatibel sein. Diese Parameter ändern die
          Quotientinzidenz nicht.
        </p>

        <p>
          Ist <Formula>{"\\kappa_w(s)=\\{u_s,v_s\\}"}</Formula> die vom Elternschritt{" "}
          <Formula>{"s"}</Formula> emittierte Rangkante, so gilt in jeder Inflation
        </p>

        <Equation
          label="Inzidenz in einer Inflationsfaser"
          number="6.4"
          className="equation-row--compact"
        >
          {"f_j\\text{ ist mit }p_s\\text{ inzident} \\iff j\\in\\kappa_w(s)."}
        </Equation>

        <p>
          Die rechte Seite hängt allein von <Formula>{"w"}</Formula> ab. Daher sind die
          beschrifteten Kreise <Formula>{"Q(B)"}</Formula> aller Kinder derselben Inflationsfaser
          kanonisch isomorph. Die Adressen der expandierten Randpositionen werden durch die
          vollständigen Blockdaten bestimmt.
        </p>

        <PageBreak />
        <h1>7 Die gemeinsame Auswahl</h1>

        <p>
          Seien <Formula>{"F_1,\\ldots,F_m"}</Formula> die beschränkten Flächen des fixierten
          Outerpaths in ihrer Reihenfolge auf dem schwachen Dualpfad. Für{" "}
          <Formula>{"1\\le i<m"}</Formula> sei <Formula>{"s_i"}</Formula> die Sehne im gemeinsamen
          Rand von <Formula>{"F_i"}</Formula> und <Formula>{"F_{i+1}"}</Formula>. Da jede Sehne
          genau zwei beschränkte Flächen trennt, sind <Formula>{"s_1,\\ldots,s_{m-1}"}</Formula>{" "}
          sämtliche Sehnen von <Formula>{"G"}</Formula>. Damit tragen die Portkontakte des
          Outerpaths eine feste lineare Reihenfolge.
        </p>

        <p>
          Für <Formula>{"n=|V(G)|"}</Formula> sei <Formula>{"\\mathfrak T_n"}</Formula> die Menge
          aller verbundenen Kontraktionstürme, deren Anfangsobjekt <Formula>{"Z_0"}</Formula> ein
          Bi-Tiling auf <Formula>{"n"}</Formula> Rängen ist. Eine <em>Turmphase</em> ist ein Paar{" "}
          <Formula>{"(\\Theta,\\phi)"}</Formula> aus einem Turm{" "}
          <Formula>{"\\Theta\\in\\mathfrak T_n"}</Formula> und einer der <Formula>{"2n"}</Formula>{" "}
          Phasen, welche den Rangkreis von <Formula>{"Z_0"}</Formula> mit dem Randkreis von{" "}
          <Formula>{"G"}</Formula> identifizieren.
        </p>

        <p>Zu jeder Turmphase gehört nach Kapitel 4 die 2-CNF</p>

        <Equation label="Guardformel einer Turmphase" number="7.1">
          {"\\Phi_{G,Z_0,\\phi}."}
        </Equation>

        <p>
          Ihre Variablen beschreiben genau die Ballot-legalen Shuffles von{" "}
          <Formula>{"Z_0"}</Formula>; ihre Guardklauseln beschreiben genau die Portkontakte der
          Sehnen <Formula>{"s_1,\\ldots,s_{m-1}"}</Formula>.
        </p>

        <h2 className="flow-heading">7.1 Gemeinsamer Auswahlsatz</h2>

        <Theorem number="7.1" title="Gemeinsamer Auswahlsatz">
          <Equation label="Gemeinsamer Auswahlsatz" number="7.2">
            {
              "\\boxed{\\begin{gathered}G\\text{ besitzt eine 1-Queue-Anordnung}\\\\\\iff \\exists(\\Theta,\\phi)\\;[\\Theta\\in\\mathfrak T_n\\;\\land\\;\\Phi_{G,Z_0,\\phi}\\text{ ist erfüllbar}].\\end{gathered}}"
            }
          </Equation>
        </Theorem>

        <Proof>
          <p>
            Besitzt <Formula>{"G"}</Formula> eine 1-Queue-Anordnung, so liefert der
            Rangkreis-Normalformsatz eine RCPC-Lösung. Der Bi-Tiling-Satz zerlegt deren Rangpfad in
            ein verbundenes Bi-Tiling <Formula>{"Z_0"}</Formula>, einen Ballot-legalen Shuffle und
            eine Phase <Formula>{"\\phi"}</Formula>. Nach der Eindeutigkeit der Kontraktion ist{" "}
            <Formula>{"Z_0"}</Formula> Anfangsobjekt eines eindeutigen verbundenen Kontraktionsturms{" "}
            <Formula>{"\\Theta"}</Formula>. Der bijunktive Fasersatz zeigt, dass die zum Shuffle
            gehörige Thresholdbelegung (7.1) erfüllt.
          </p>

          <p>
            Umgekehrt liefert ein Turm <Formula>{"\\Theta\\in\\mathfrak T_n"}</Formula> ein
            verbundenes Anfangs-Bi-Tiling <Formula>{"Z_0"}</Formula>. Eine erfüllende Belegung von
            (7.1) liefert nach dem bijunktiven Fasersatz einen Ballot-legalen Shuffle, der in Phase{" "}
            <Formula>{"\\phi"}</Formula> sämtliche Portkontakte erfüllt. Dies ist eine RCPC-Lösung
            und erzeugt nach dem Rangkreis-Normalformsatz eine 1-Queue-Anordnung von{" "}
            <Formula>{"G"}</Formula>.
          </p>
        </Proof>
      </MathPages>
    </Document>
  );
}
