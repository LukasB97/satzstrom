# Specimen book

The complete React source for the specimen book shown in the [Satzstrom gallery](https://satzstrom.com/examples).

## Set up

Requires Node.js 20 or newer on Windows x64 or Linux x64.
From a working directory of your choice:

```sh
npm install -g satzstrom
satzstrom init specimen-book --example specimen-book
cd specimen-book
satzstrom dev document.tsx --data data.json
```

To add this example to an existing project, run `satzstrom add specimen-book.tsx --example specimen-book` there. The CLI prints the document and data paths to use.

## Edit and export

Edit `data.json` to change the content, and the React and CSS files to change the layout. The JSON object is passed to the document component as props.
The live preview updates as you save. Use Check, Create PDF and Inspect in the preview, or run these commands in the example directory:

```sh
satzstrom check document.tsx --data data.json --strict
satzstrom render document.tsx --data data.json --strict
```

Fix any reported layout issues and review the preview before exporting.
The PDF is saved as `document.pdf` in this directory. Add `--overwrite` to the
render command when replacing an existing PDF.
