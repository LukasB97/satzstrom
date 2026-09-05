import "./styles.css";
import { Document } from "@satzstrom/primitives";
import { specimens } from "./frame";
import { OpeningPages } from "./opening-pages";
import { ClosingPages } from "./closing-pages";
import { MiddlePages } from "./middle-pages";
import type { SpecimenData } from "./data";

export default function Report(data: SpecimenData) {
  return (
    <Document
      title="TEN - A Document Specimen Book"
      author="Satzstrom"
      subject="Ten crafted document forms built with React"
      keywords={["publishing", "typography", "reports", "React", "PDF"]}
      lang="en"
      className="specimen-document"
      bookmarks={specimens}
    >
      <OpeningPages data={data} />
      <MiddlePages data={data} />
      <ClosingPages data={data} />
    </Document>
  );
}
