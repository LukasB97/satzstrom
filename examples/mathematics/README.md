# Mathematics paper

The complete React source for the mathematics paper shown in the [Satzstrom gallery](https://satzstrom.com/examples).

## Set up

Requires Node.js 20 or newer on Windows x64 or Linux x64.
From a working directory of your choice:

```sh
npm install -g satzstrom
satzstrom init mathematics --example mathematics
cd mathematics
satzstrom dev document.tsx
```

To add this example to an existing project, run `satzstrom add mathematics.tsx --example mathematics` there. The CLI prints the document and data paths to use.

## Edit and export

Edit `document.tsx` and `styles.css` to change the content and layout. This example needs no data file.
The live preview updates as you save. Use Check, Create PDF and Inspect in the preview, or run these commands in the example directory:

```sh
satzstrom check document.tsx --strict
satzstrom render document.tsx --strict
```

Fix any reported layout issues and review the preview before exporting.
The PDF is saved as `document.pdf` in this directory. Add `--overwrite` to the
render command when replacing an existing PDF.
