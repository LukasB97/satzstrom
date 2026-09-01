import "./styles.css";
import { Document, Page } from "@satzstrom/primitives";

export default function Starter() {
  return (
    <Document title="My first Satzstrom document" lang="en">
      <Page size="A4">
        <h1>Hello Satzstrom.</h1>
      </Page>
    </Document>
  );
}
