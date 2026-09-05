import assert from "node:assert/strict";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Flow, Page, defineSequence } from "../dist/index.js";

test("author-facing primitive errors are English", () => {
  assert.throws(
    () => renderToStaticMarkup(createElement(Page, { bleed: -1 })),
    /bleed must be a positive millimeter value or 0/u,
  );
  assert.throws(
    () => renderToStaticMarkup(createElement(Flow)),
    /Flow can only be used inside a PageMaster layout/u,
  );
  assert.throws(() => defineSequence({ name: "1-invalid" }), /Invalid Sequence name/u);
});
