# @satzstrom/primitives

React components and types for Satzstrom documents.

```sh
npm install @satzstrom/primitives react react-dom
```

The package includes document, page, flow, sequence, reference, footnote, and
mathematics primitives. It contains no native renderer implementation.

## Markdown

`Markdown` renders unstyled semantic HTML from GitHub Flavored Markdown. Inline
and display formulas use the same KaTeX-backed `Math` primitive as JSX-authored
formulas. Raw HTML and MDX are not supported. Double dollar delimiters keep
ordinary currency such as `$5.00` as text: use `$$x+y$$` inline or put the
delimiters on their own lines for display math.

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

The relation is $$F_n=F_{n-1}+F_{n-2}$$.

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
