# @satzstrom/primitives

React components and types for Satzstrom documents.

```sh
npm install @satzstrom/primitives react react-dom
```

The package includes document, page, flow, sequence, reference, footnote, and
mathematics primitives. It contains no native renderer implementation.

`Document` metadata is optional and absent fields are omitted from the PDF. PDF/UA-1 output requires a usable `title`. In a custom `PageMaster` layout, `Flow` and `Footnotes` are the accessibility boundaries: layout branches outside it are hidden automatically unless an intentional branch uses `aria-hidden="false"`.

## Markdown

`Markdown` renders unstyled semantic HTML from GitHub Flavored Markdown. Inline
and display formulas use the same KaTeX-backed `Math` primitive as JSX-authored
formulas. Raw HTML and MDX are not supported. Use `$x+y$` inline, `$$` on separate
lines for display math, and `\$` for a literal dollar sign.

Use `String.raw` to keep LaTeX backslashes readable. Markdown follows standard
indentation rules, so keep the template content flush left.

```tsx
import { Document, Markdown, Page } from "@satzstrom/primitives";

export default function Report() {
  return (
    <Document title="Fibonacci" lang="en">
      <Page>
        <Markdown>{String.raw`
# Fibonacci

The relation is $F_n=F_{n-1}+F_{n-2}$.

$$
F_n=\left[\frac{1}{\sqrt 5}\varphi^n\right]
$$
`}</Markdown>
      </Page>
    </Document>
  );
}
```

Footnote accessibility text follows the language set on `Document`. Use
`Markdown.labels` when a document needs different wording.

## Footnote placement

Place one `<Footnotes />` outside `<Flow />` in your PageMaster layout, or inside a fixed `<Page>`. Footnotes require this placeholder. It accepts normal aside attributes, className and style, but no children. It is hidden when empty and inherits typography without a separator or fixed spacing.

A flex column with `<Flow style={{ flex: 1, minHeight: 0 }} />` followed by `<Footnotes style={{ maxHeight: "20%" }} />` shares a definite page height between text and notes. Give the parent a definite height for percentage limits. The layout controls appearance and maximum height; Satzstrom assigns and breaks the content. Long notes continue in the same PageMaster. Fixed Pages report overflow.

Markdown and JSX notes share numbering. Repeated Markdown calls link to the first note; backlinks return to the calls. Missing or multiple placeholders produce diagnostics.
