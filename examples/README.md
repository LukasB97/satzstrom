# Satzstrom examples

These seven projects are the complete sources behind the document gallery on [satzstrom.com](https://satzstrom.com/examples). They use React components, CSS, and JSON data. The Wright article loads its photographs directly from the Library of Congress and Wikimedia Commons; the other examples use local assets.

## Run an example

Requires Node.js 20 or newer on Windows x64 or Linux x64, Git and pnpm.
Each example has its own README with a complete setup and export workflow.
For the invoice, start in a working directory of your choice:

```sh
npm install -g satzstrom
git clone https://github.com/LukasB97/satzstrom.git
cd satzstrom
pnpm install
pnpm build
cd examples/invoice
satzstrom dev document.tsx --data data.json
```

Replace `invoice` with `specimen-book`, `deep-space-atlas`, `enterprise-board-pack`, `aurelis-material-notes`, or `mathematics`. The mathematics example accepts an empty object from its checked-in `data.json`.

The [Beyond the room](./beyond-the-room/README.md) architecture article uses no data file.
From the repository root:

```sh
cd examples/beyond-the-room
satzstrom dev document.tsx
```

Run `pnpm test:examples` from the repository root to type-check every public example together.

## Invoice walkthrough

The invoice is the smallest complete data-driven example. Its files have distinct jobs:

- `invoice/data.json` contains the invoice number, date, customer, and line items.
- `invoice/document.tsx` defines the typed component props, totals, semantic table, and page structure.
- `invoice/styles.css` owns the visual system and print layout.
- `shared/page-frame.tsx` provides the reusable header, footer, and page margins.

Start the live preview from `examples/invoice`:

```sh
satzstrom dev document.tsx --data data.json
```

Edit `data.json` or the React and CSS sources while the preview is running. Satzstrom reloads the document and keeps the current page and zoom. When the result is ready, check and render the same inputs:

```sh
satzstrom check document.tsx --data data.json --strict
satzstrom render document.tsx --data data.json --out invoice.pdf --strict
```

The JSON object is passed directly to the default React component as props. TypeScript checks the component during development. Add runtime validation inside the project only when the data source requires it.
