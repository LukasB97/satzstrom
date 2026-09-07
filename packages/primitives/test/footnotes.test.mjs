import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Footnotes, Page } from "../dist/index.js";

test("Footnotes is an empty styled placeholder inside a fixed Page", () => {
  const html = renderToStaticMarkup(
    createElement(
      Page,
      null,
      createElement(Footnotes, { style: { maxHeight: "20%" }, className: "notes" }),
    ),
  );
  assert.match(html, /<aside[^>]*class="notes"[^>]*data-rr-footnotes=""><\/aside>/u);
  assert.match(html, /max-height:20%/u);
});

test("Footnotes requires a page context", () => {
  assert.throws(() => renderToStaticMarkup(createElement(Footnotes)), /Page or PageMaster layout/u);
});
