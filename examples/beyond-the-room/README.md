# Beyond the room

A two-page article about Frank Lloyd Wright, Fallingwater and the Guggenheim Museum.
The complete React and CSS source of the PDF shown on satzstrom.com.

## Run the example

Requires Node.js 20 or newer on Windows x64 or Linux x64.

From a working directory of your choice:

```sh
npm install -g satzstrom
satzstrom init beyond-the-room --example beyond-the-room
cd beyond-the-room
satzstrom dev document.tsx
```

Use Check, Create PDF and Inspect in the preview, or run these commands in the example directory:

```sh
satzstrom check document.tsx --strict
satzstrom render document.tsx --out article.pdf --strict
```

Fix any reported layout issues and review the preview before exporting.
The PDF is saved as `article.pdf` in this directory.

## How the pages work

Each page measures 210 × 280 mm. The first is a fixed editorial composition;
the second uses a float followed by a two-column closing section. The text sets
that closing section's height, including its adjacent photograph and caption.
The layout is composed for this edited article; substantial text changes need a
layout review. It uses Arial and Georgia, so installed fonts affect rendering.

The renderer loads the three photographs directly from the Library of Congress and
Wikimedia Commons using the image URLs in `document.tsx`. Rendering requires an
internet connection. No image files or data file need to be downloaded manually.
Cropping and the Guggenheim's monochrome treatment are applied in CSS. All
photographs show the actual buildings.

## License and photographs

The React and CSS example is available under the MIT license in `LICENSE`.
Photographs retain their own terms; the MIT license does not cover them.
See `credits.txt` for original sources, attribution and alterations. The Guggenheim
photograph and its adaptation are CC BY-SA 3.0. The two Library of Congress
photographs are public domain in the United States. Keep these credits when reusing images.
