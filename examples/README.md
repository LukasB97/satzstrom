# Satzstrom examples

These seven projects are the complete sources behind the document gallery on [satzstrom.com](https://satzstrom.com/examples). They use React components, CSS, and JSON data. The Wright article loads its photographs directly from the Library of Congress and Wikimedia Commons; the other examples use local assets.

## Run an example

Requires Node.js 20 or newer on Windows x64 or Linux x64.
Each example has its own README with a complete setup and export workflow.
For the invoice, start in a working directory of your choice:

```sh
npm install -g satzstrom
satzstrom init invoice --example invoice
cd invoice
satzstrom dev document.tsx --data data.json
```

Other example names are `specimen-book`, `deep-space-atlas`, `enterprise-board-pack`, `aurelis-material-notes`, `mathematics` and `beyond-the-room`. The CLI prints the preview command, including an explicit data path when needed.

To copy an example into an existing Satzstrom TypeScript project, run `satzstrom add invoice.tsx --example invoice`. Supporting files go into `invoice.assets`; existing files and compatible dependency declarations are preserved.

Use Check, Create PDF and Inspect in the browser preview. Create PDF asks before replacing an existing file.

## Invoice walkthrough

The invoice is the smallest complete data-driven example. Its files have distinct jobs:

- `data.json` contains the invoice number, date, customer, and line items.
- `document.tsx` defines the typed component props, totals, semantic table, and page structure.
- `styles.css` owns the visual system and print layout.
- `shared/page-frame.tsx` provides the reusable header, footer, and page margins.

Start the live preview from the created `invoice` directory:

```sh
satzstrom dev document.tsx --data data.json
```

Edit `data.json` or the React and CSS sources while the preview is running. Satzstrom reloads the document and keeps the current page and zoom. When the result is ready, check and render the same inputs:

```sh
satzstrom check document.tsx --data data.json --strict
satzstrom render document.tsx --data data.json --out invoice.pdf --strict
```

The JSON object is passed directly to the default React component as props. TypeScript checks the component during development. Add runtime validation inside the project only when the data source requires it.
