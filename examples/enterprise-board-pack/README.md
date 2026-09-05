# Board report

The complete React source for the board report shown in the [Satzstrom gallery](https://satzstrom.com/examples).

## Set up

Requires Node.js 20 or newer on Windows x64 or Linux x64, Git and pnpm.
From a working directory of your choice:

```sh
npm install -g satzstrom
git clone https://github.com/LukasB97/satzstrom.git
cd satzstrom
pnpm install
pnpm build
cd examples/enterprise-board-pack
satzstrom dev document.tsx --data data.json
```

If you already cloned and installed the repository, open a terminal in
`examples/enterprise-board-pack` and run the last command.

## Edit and export

Edit `data.json` to change the content, and the React and CSS files to change the layout. The JSON object is passed to the document component as props.
The live preview updates as you save. Keep it running in one terminal and use a
second terminal in the same example directory to check and export:

```sh
satzstrom check document.tsx --data data.json --strict
satzstrom render document.tsx --data data.json --strict
```

Fix any reported layout issues and review the preview before exporting.
The PDF is saved as `document.pdf` in this directory. Add `--overwrite` to the
render command when replacing an existing PDF.
