import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Page } from "../dist/index.js";

test("orientation normalizes custom dimensions instead of blindly swapping them", () => {
  for (const [orientation, width, height] of [
    ["landscape", 148, 105],
    ["portrait", 105, 148],
    [undefined, 148, 105],
  ]) {
    const html = renderToStaticMarkup(
      createElement(Page, { size: { width: 148, height: 105 }, orientation }, "Card"),
    );
    assert.match(html, new RegExp(`data-rr-page-width="${width}"`));
    assert.match(html, new RegExp(`data-rr-page-height="${height}"`));
  }
});
