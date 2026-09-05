import "./styles.css";
import { Document, Flow, PageMaster, type PageLayoutProps } from "@satzstrom/primitives";
import { PageFrame } from "../shared/page-frame";

type Data = {
  number: string;
  date: string;
  customer: { name: string; street: string; city: string };
  items: Array<{ description: string; quantity: number; price: number }>;
};
const euro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
});

export default function Report(data: Data) {
  const net = data.items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  function InvoiceLayout(props: PageLayoutProps) {
    return (
      <PageFrame
        {...props}
        margin={18}
        header={`Rechnung ${data.number}`}
        footer={
          <>
            Brückner Studio · {props.page} / {props.pages}
          </>
        }
      >
        <Flow />
      </PageFrame>
    );
  }
  return (
    <Document title="Rechnung" author="Brückner Studio">
      <PageMaster layout={InvoiceLayout} size="A4">
        <section style={{ breakInside: "avoid-page" }} className="invoice-page">
          <header className="invoice-head">
            <div className="invoice-logo">
              BRÜCKNER
              <br />
              <span>STUDIO</span>
            </div>
            <div>
              <b>RECHNUNG</b>
              <small>{data.number}</small>
            </div>
          </header>
          <section className="invoice-address">
            <div>
              <small>Empfänger</small>
              <strong>{data.customer.name}</strong>
              <span>{data.customer.street}</span>
              <span>{data.customer.city}</span>
            </div>
            <div>
              <small>Rechnungsdatum</small>
              <strong>{data.date}</strong>
              <small>Zahlbar innerhalb von 14 Tagen</small>
            </div>
          </section>
          <table className="rr-table">
            <caption>Leistungen</caption>
            <thead>
              <tr>
                <th>Beschreibung</th>
                <th>Menge</th>
                <th>Einzelpreis</th>
                <th>Gesamt</th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.description}>
                  <td>{item.description}</td>
                  <td>{item.quantity}</td>
                  <td>{euro.format(item.price)}</td>
                  <td>{euro.format(item.quantity * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <section className="invoice-total">
            <div>
              <span>Netto</span>
              <b>{euro.format(net)}</b>
            </div>
            <div>
              <span>USt. 19 %</span>
              <b>{euro.format(net * 0.19)}</b>
            </div>
            <div className="grand">
              <span>Gesamt</span>
              <b>{euro.format(net * 1.19)}</b>
            </div>
          </section>
          <p className="rr-paragraph">
            Vielen Dank für die Zusammenarbeit. Bitte geben Sie bei der Überweisung die
            Rechnungsnummer an.
          </p>
          <footer className="invoice-bank">
            <span>Brückner Studio</span>
            <span>IBAN DE12 3456 7890 1234 5678 00</span>
            <span>USt-IdNr. DE123456789</span>
          </footer>
        </section>
      </PageMaster>
    </Document>
  );
}
