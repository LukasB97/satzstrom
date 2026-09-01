import assert from "node:assert/strict";
import test from "node:test";
import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { Document, Markdown, Page } from "../dist/index.js";

test("Markdown renders GFM and Satzstrom math as semantic markup", () => {
  const source = String.raw`# Sequence

*Emphasis*, ~~removed~~, and https://example.com.

- [x] verified

| n | value |
| - | ----: |
| 1 |     1 |

Inline $$F_n=F_{n-1}+F_{n-2}$$.

$$
F_n=\left[\frac{1}{\sqrt 5}\varphi^n\right]
$$

~~~ts
const n = 1;
~~~`;

  const html = renderToStaticMarkup(createElement(Markdown, null, source));

  assert.match(html, /^<h1>Sequence<\/h1>/u);
  assert.match(html, /<em>Emphasis<\/em>/u);
  assert.match(html, /<del>removed<\/del>/u);
  assert.match(html, /<a href="https:\/\/example\.com">https:\/\/example\.com<\/a>/u);
  assert.match(html, /<input type="checkbox" disabled="" checked=""\/>/u);
  assert.match(html, /<table>/u);
  assert.match(html, /class="rr-math rr-math-inline"/u);
  assert.match(html, /class="rr-math rr-math-display"/u);
  assert.match(html, /data-rr-block=""/u);
  assert.match(html, /data-rr-atomic=""/u);
  assert.match(html, /<pre><code class="language-ts">/u);
  assert.equal(html.match(/<pre>/gu)?.length, 1);
});

test("Markdown preserves currency and namespaces footnotes per block", () => {
  const note = (label) => `Revenue was $5.00.[^source]\n\n[^source]: ${label}`;
  const html = renderToStaticMarkup(
    createElement(
      Fragment,
      null,
      createElement(Markdown, null, note("First source")),
      createElement(Markdown, null, note("Second source")),
    ),
  );

  assert.match(html, /Revenue was \$5\.00\./u);
  assert.doesNotMatch(html, /rr-math/u);

  const ids = [...html.matchAll(/id="([^"]+)"/gu)].map((match) => match[1]);
  assert.equal(new Set(ids).size, ids.length);

  const references = [
    ...html.matchAll(/<a [^>]*href="#([^"]+)"[^>]*data-footnote-ref[^>]*>/gu),
  ].map((match) => match[1]);
  assert.equal(references.length, 2);
  for (const target of references) assert.ok(ids.includes(target));
  assert.notEqual(references[0], references[1]);
});

test("Markdown skips raw HTML and sanitizes unsafe URLs", () => {
  const source = `<script>alert("unsafe")</script>\n\n[unsafe](javascript:alert(1))`;
  const html = renderToStaticMarkup(createElement(Markdown, null, source));

  assert.doesNotMatch(html, /<script|javascript:/u);
  assert.match(html, />unsafe<\/a>/u);
});

test("Markdown footnote labels follow the document language", () => {
  const source = "Text.[^note]\n\n[^note]: Quelle";
  const html = renderToStaticMarkup(
    createElement(
      Document,
      { title: "Deutsch", lang: "de-DE" },
      createElement(Page, null, createElement(Markdown, null, source)),
    ),
  );

  assert.match(html, />Fußnoten<\/h2>/u);
  assert.match(html, /aria-label="Zurück zu Verweis 1"/u);
  assert.doesNotMatch(html, /Footnotes|Back to reference/u);
});

test("Markdown footnote labels can be overridden", () => {
  const source = "Text.[^note]\n\n[^note]: Source";
  const html = renderToStaticMarkup(
    createElement(
      Document,
      { title: "English", lang: "en" },
      createElement(
        Page,
        null,
        createElement(Markdown, {
          labels: {
            footnotes: "Sources",
            backToReference: (reference) => `Return to source ${reference + 1}`,
          },
          children: source,
        }),
      ),
    ),
  );

  assert.match(html, />Sources<\/h2>/u);
  assert.match(html, /aria-label="Return to source 1"/u);
});
