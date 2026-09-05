import { Document, Page } from "@satzstrom/primitives";
import "./styles.css";

// Original photographs. Attribution and licence terms are in credits.txt.
const fallingwater =
  "https://tile.loc.gov/image-services/iiif/master:pnp:habshaer:pa:pa1600:pa1690:photos:134143pu/full/2400,/0/default.jpg";
const guggenheim =
  "https://upload.wikimedia.org/wikipedia/commons/d/df/Rotunda%2C_Guggenheim_Museum.JPG";
const interior =
  "https://upload.wikimedia.org/wikipedia/commons/b/ba/Fallingwater_-_Living_Room_from_Kitchen_-_HABS_PA%2C26-OHPY.V%2C1-48.jpg";

const sources = {
  fallingwater:
    "https://fallingwater.org/history/the-kaufmanns-fallingwater/designing-fallingwater/",
  prairie: "https://www.flwright.org/explore/prairie-style",
  guggenheim:
    "https://www.guggenheim.org/about-us/architecture/frank-lloyd-wright-and-the-guggenheim",
  guide:
    "https://www.guggenheim.org/wp-content/uploads/2016/10/guggenheim-education-architecture-teacher-resource-final.pdf",
  photo1: "https://www.loc.gov/pictures/item/pa1690.photos.134143p/",
  photo2: "https://commons.wikimedia.org/wiki/File:Rotunda,_Guggenheim_Museum.JPG",
  photo3:
    "https://commons.wikimedia.org/wiki/File:Fallingwater_-_Living_Room_from_Kitchen_-_HABS_PA,26-OHPY.V,1-48.jpg",
};

function Running({ page }: { page: number }) {
  return (
    <>
      <header className="running" aria-hidden="true">
        <span>Spaces</span>
        <span>Frank Lloyd Wright</span>
      </header>
      <footer className="folio" aria-hidden="true">
        <span>Satzstrom</span>
        <span>{page}</span>
      </footer>
    </>
  );
}

export default function Wright() {
  return (
    <Document
      title="Beyond the room | Frank Lloyd Wright"
      lang="en"
      subject="An architectural essay on space, movement and enclosure at Fallingwater and the Solomon R. Guggenheim Museum."
    >
      <Page size={{ width: 210, height: 280 }} className="magazine opener">
        <Running page={38} />
        <main>
          <header className="opening">
            <h1>
              Beyond
              <br />
              the room
            </h1>
            <p className="deck">
              At Fallingwater and the Guggenheim, Frank Lloyd Wright connects shelter, movement and
              the world beyond. How much freedom does his architecture leave us?
            </p>
          </header>
          <figure className="fallingwater">
            <div className="photo-window">
              <img
                src={fallingwater}
                alt="Fallingwater seen from below the falls. Pale concrete terraces project from a stone core over layered rock and flowing water."
              />
            </div>
            <figcaption>
              <b>01</b> Fallingwater, Pennsylvania. Designed in 1935.
              <br />
              The terraces extend the horizontal rhythm of the rock ledges.
            </figcaption>
          </figure>
          <section className="copy fallingwater-copy">
            <h2>Above the falls</h2>
            <p>
              The Kaufmann family expected a house with a view of their waterfall. Wright placed it
              over the falls instead. Designed in 1935, Fallingwater brings the stream beneath the
              living space, turning a familiar prospect into a place to inhabit.
              <a className="ref" href={sources.fallingwater}>
                1
              </a>{" "}
              Landscape is encountered from within, through sound, proximity and movement.
            </p>
            <p>
              Its form makes that relationship legible. Rough stone anchors the house to the
              hillside; concrete terraces reach out above the water. Horizontal edges echo the rock
              ledges below. The sense of suspension depends on the mass that holds the house in
              place.
            </p>
            <p>
              Inside, stone flooring continues onto the terraces. Broad glazing and outward-opening
              corner windows loosen the boundary of the room. Low ceilings make the interior feel
              sheltered, while the terraces offer immediate release.
              <a className="ref" href={sources.fallingwater}>
                1
              </a>{" "}
              Openness gains force because enclosure is still felt.
            </p>
            <p>
              Wright’s organic architecture joins building, purpose and setting. His earlier Prairie
              houses developed a low, horizontal language in response to the Midwestern landscape.
              <a className="ref" href={sources.prairie}>
                2
              </a>{" "}
              At Fallingwater, stone, structure and outlook give each other meaning. The room is
              understood through what lies beyond it.
            </p>
          </section>
        </main>
        <aside className="credit credit-left">
          <a href={sources.photo1}>
            Photograph: Jack E. Boucher, 1985 · Library of Congress, HABS PA-5346-4
          </a>
        </aside>
      </Page>
      <Page size={{ width: 210, height: 280 }} className="magazine continuation">
        <Running page={39} />
        <main>
          <article className="copy article-flow">
            <figure className="guggenheim">
              <img
                src={guggenheim}
                alt="Looking up through the Guggenheim rotunda. Curved ramp parapets rise towards a radial glass skylight."
              />
              <figcaption>
                <b>02</b> Solomon R. Guggenheim Museum, New York, 1959.
                <br />
                One continuous ramp connects the gallery levels.
              </figcaption>
            </figure>
            <h2>A common centre</h2>
            <p>
              In New York, Wright turns this continuity inward. The Solomon R. Guggenheim Museum
              opened in 1959, six months after his death. A spiral ramp encircles a tall rotunda
              beneath a glass skylight.
              <a className="ref" href={sources.guggenheim}>
                3
              </a>{" "}
              Here, the space at the centre gives the galleries a shared point of reference.
            </p>
            <p>
              Wright intended visitors to take the lift to the top and descend gradually along the
              ramp. Art would be encountered in a continuous sequence, with views across the rotunda
              linking one level to another.
              <a className="ref" href={sources.guide}>
                4
              </a>{" "}
              The building gives each work a place along a route. It also makes the act of moving
              between works part of the visit.
            </p>
            <p>
              The photograph compresses that experience into overlapping curves. Close parapets
              occupy the foreground; more distant edges draw the eye towards the skylight. Each turn
              belongs to the same space, yet appears at a different distance and height. Walking
              changes these relationships. Across the open centre, a stretch of gallery can be seen
              before it is reached. Even when looking at a single work, the visitor remains aware of
              the larger building.
            </p>
            <section className="closing-pair">
              <div>
                <h2>Architecture in motion</h2>
                <p>
                  Fallingwater reaches towards the forest; the Guggenheim gathers its galleries
                  around an interior void. Glimpses of what comes next give these spaces depth; a
                  change of position alters the balance between shelter and exposure.
                </p>
                <p>
                  Such clarity also gives the architect considerable control. Before the museum
                  opened, artists feared that its architecture would compete with their work.
                  <a className="ref" href={sources.guide}>
                    4
                  </a>{" "}
                  A building can enrich an encounter while prescribing its terms. Wright makes both
                  possibilities felt: the pleasure of being guided, and the desire to find our own
                  way.
                </p>
              </div>
              <figure className="interior">
                <img
                  src={interior}
                  alt="Fallingwater living room with a stone floor, low ceiling, built-in seating and broad windows looking into the woods."
                />
                <figcaption>
                  <b>03</b> Fallingwater. The living room opens towards the woods.
                  <br />
                  <a href={sources.photo3}>
                    Jack E. Boucher, 1985 · Library of Congress, HABS 1-48
                  </a>
                </figcaption>
              </figure>
            </section>
          </article>
        </main>
        <aside className="credit credit-right">
          <div>
            <a href={sources.photo2}>02 Cory Hartman, 2007</a> ·{" "}
            <a href="https://creativecommons.org/licenses/by-sa/3.0/">CC BY-SA 3.0</a> · Cropped and
            converted to monochrome; same licence.
          </div>
          <div>
            Sources: <a href={sources.fallingwater}>1 Fallingwater</a> ·{" "}
            <a href={sources.prairie}>2 Frank Lloyd Wright Trust</a> ·{" "}
            <a href={sources.guggenheim}>3 Guggenheim</a> ·{" "}
            <a href={sources.guide}>4 Architecture guide</a>
          </div>
        </aside>
      </Page>
    </Document>
  );
}
