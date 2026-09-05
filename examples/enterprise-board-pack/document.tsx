import "./styles.css";
import { Document } from "@satzstrom/primitives";
import { ClosingPages } from "./closing-pages";
import { OpeningPages } from "./opening-pages";
import { OperatingPages } from "./operating-pages";
import type { BoardData } from "./data";

export default function Report(data: BoardData) {
  return (
    <Document
      title="Northstar Systems Board Operating Review"
      author={data.company}
      lang="en"
      className="enterprise-document"
    >
      <OpeningPages data={data} />
      <OperatingPages data={data} />
      <ClosingPages data={data} />
    </Document>
  );
}
