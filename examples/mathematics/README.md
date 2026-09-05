# Mathematics paper

The complete React source for the mathematics paper shown in the [Satzstrom gallery](https://satzstrom.com/examples).

## Set up

Requires Node.js 20 or newer on Windows x64 or Linux x64, Git and pnpm.
From a working directory of your choice:

```sh
npm install -g satzstrom
git clone https://github.com/LukasB97/satzstrom.git
cd satzstrom
pnpm install
cd examples/mathematics
satzstrom dev document.tsx
```

If you already cloned and installed the repository, open a terminal in
`examples/mathematics` and run the last command.

## Edit and export

Edit `document.tsx` and `styles.css` to change the content and layout. This example needs no data file.
The live preview updates as you save. Keep it running in one terminal and use a
second terminal in the same example directory to check and export:

```sh
satzstrom check document.tsx --strict
satzstrom render document.tsx --strict
```

Fix any reported layout issues and review the preview before exporting.
The PDF is saved as `document.pdf` in this directory. Add `--overwrite` to the
render command when replacing an existing PDF.
