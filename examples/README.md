# Satzstrom examples

These six projects are the complete sources behind the document gallery on [satzstrom.com](https://satzstrom.com/examples). They use only local React components, CSS, and JSON data. No external assets are required.

## Run an example

Install the repository dependencies and the Satzstrom CLI, then choose any example:

```sh
pnpm install
npm install -g satzstrom
satzstrom dev examples/invoice/document.tsx --data examples/invoice/data.json
satzstrom render examples/invoice/document.tsx --data examples/invoice/data.json --out invoice.pdf --strict
```

Replace `invoice` with `specimen-book`, `deep-space-atlas`, `enterprise-board-pack`, `aurelis-material-notes`, or `mathematics`. The mathematics example accepts an empty object from its checked-in `data.json`.

Run `pnpm test:examples` to type-check every public example together.

## Invoice walkthrough

The invoice is the smallest complete data-driven example. Its files have distinct jobs:

- `invoice/data.json` contains the invoice number, date, customer, and line items.
- `invoice/document.tsx` defines the typed component props, totals, semantic table, and page structure.
- `invoice/styles.css` owns the visual system and print layout.
- `shared/page-frame.tsx` provides the reusable header, footer, and page margins.

Start the live preview:

```sh
satzstrom dev examples/invoice/document.tsx --data examples/invoice/data.json
```

Edit `data.json` or the React and CSS sources while the preview is running. Satzstrom reloads the document and keeps the current page and zoom. When the result is ready, check and render the same inputs:

```sh
satzstrom check examples/invoice/document.tsx --data examples/invoice/data.json --strict
satzstrom render examples/invoice/document.tsx --data examples/invoice/data.json --out invoice.pdf --strict
```

The JSON object is passed directly to the default React component as props. TypeScript checks the component during development. Add runtime validation inside the project only when the data source requires it.
