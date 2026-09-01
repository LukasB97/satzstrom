---
name: satzstrom
description: Author and refine Satzstrom projects using React, project dependencies, local document inspection, and PDF rendering.
---

# Satzstrom

Satzstrom is a rendering engine that turns ordinary React code—with its components, data, styling, and libraries—into precisely paginated PDFs with LaTeX-quality typesetting.

## Why Satzstrom Exists

LaTeX is exceptionally good at producing precise, stable documents. It understands physical pages, typography, references, mathematical notation, and long-form structure. But it is not an accessible visual design environment. Although almost any design is theoretically possible, creating something distinctive and modern often requires specialized knowledge and considerable effort.

Modern frontend development has the opposite strengths. React, CSS, TypeScript, and the surrounding component ecosystem make it easy to build expressive, data-driven interfaces. Existing libraries provide polished components without requiring every visual element to be built from scratch. But turning that work into a reliable, paginated document is unusually difficult.

Satzstrom brings these two worlds together. Authors work with normal React and the frontend tools they already know. Satzstrom adds physical pages, professional typesetting, deterministic pagination, document structure, and PDF output.

## How Satzstrom Works

Satzstrom does not introduce its own document language. A Satzstrom document is a normal React project built with React, TypeScript, semantic HTML, CSS, and the libraries its authors choose. Components, styles, data, fonts, and dependencies remain under the project’s control.

Satzstrom adds a minimal set of primitives where physical document structure is required. These primitives define fixed pages, flowing page layouts, page breaks, repeated boxes, numbering, references, contents, footnotes, and mathematics without replacing normal React composition.

Satzstrom runs locally and is available through both a CLI and a local MCP server. The CLI creates projects, runs the live preview, checks layouts, and renders final PDFs. The MCP server allows agents to inspect pagination and render exact pages while continuing to work in the project’s normal source files.

The same pagination engine powers inspection, preview, and final output. It supports fixed and flowing page systems, layout diagnostics, automatic numbering and references, multilingual typesetting, mathematical notation, tagged PDFs, PDF/A-2a, and PDF/UA-1.

# Setup and Quickstart

Follow the current [Satzstrom Quickstart](https://satzstrom.com/quickstart.md) for installation, project setup, explicit data inputs, inspection, and rendering. The complete agent-readable documentation index is available at [satzstrom.com/docs/llms.txt](https://satzstrom.com/docs/llms.txt).

# Authoring Satzstrom Documents

Build a Satzstrom document from its physical structure outward. Decide which pages are fixed, which content must flow, and which information belongs to the document model before refining individual components.

The public primitives are `Document`, `Page`, `PageMaster`, `Flow`, `PageBreak`, `RepeatBox`, `defineSequence`, `Sequence`, `Contents`, `Ref`, `Footnote`, `Math`, and `useRenderReady`.

## The Document Module

`document.tsx` must export one React component as its default export. That component renders exactly one `Document` as its root. Hooks and ordinary React composition work normally.

`Document` owns the metadata written into the PDF. Give it an accurate `title` and `lang`, then add `author`, `subject`, `keywords`, and `dir` when the document needs them.

A document without external arguments needs only its default component. For external arguments, export a named Zod object `schema`. Satzstrom validates an explicit inline object or JSON file and passes its fields directly as component props.

```tsx
import { z } from "zod";
import { Document, Page } from "@satzstrom/primitives";

export const schema = z.object({
  title: z.string(),
  total: z.number(),
});

type Data = z.infer<typeof schema>;

export default function Report({ title, total }: Data) {
  return (
    <Document title={title} lang="en">
      <Page>{total}</Page>
    </Document>
  );
}
```

The schema must validate an object. Supply arguments explicitly with CLI `--args <json>` or `--data <dataPath>`, or with the equivalent MCP fields `args` or `dataPath`. Omit both for a parameterless document.

## Fixed and Flowing Pages

Every direct child of `Document` is either a `Page` or a `PageMaster`.

Use `Page` for a single, deliberately composed physical page such as a cover, divider, poster, or full-page visual. Its children may also be a function receiving the current page number and total page count.

Use `PageMaster` when content should flow across pages. Without a `layout`, the whole page is the flow area. A custom `layout` is a normal React component receiving `page` and `pages`; render exactly one `Flow` where the content belongs. Its CSS box may sit anywhere inside ordinary React composition, with headers, footers, sidebars, and decorations around it.

Multiple pages and page masters may follow one another in the same document. Each can use a named paper size, a custom width and height in millimeters, portrait or landscape orientation, bleed, and crop marks. Page numbers remain global across the document.

Use `PageBreak` inside a page master before content that must begin on a new page, or after content that must end the current page. Forced page breaks use this primitive; CSS break rules keep related content together.

## Styling and Project Libraries

Use semantic HTML and normal CSS. Import every stylesheet used by the document or its components. Satzstrom bundles those CSS imports and uses the project's PostCSS configuration when present. The filename and project structure remain the author's choice.

Use any component libraries, styling systems, fonts, and other packages needed by the document project. Install them there and import them normally. Satzstrom follows the document’s import graph and resolves packages from its project. Node.js-only modules cannot run inside the browser-rendered document.

Use physical units where the printed result requires a physical measurement. Millimeters work well for page margins and recurring regions; points work well for typography. Use flexible CSS inside those boundaries so content can respond to its available page area.

## Pagination and Fragmentation

Write the natural document structure first. Satzstrom splits text by its composed lines, tables by rows, and lists between their items. Normal containers remain nested and can continue across pages.

Use CSS break rules when the content expresses a real relationship:

```css
.card {
  break-inside: avoid-page;
}

.heading {
  break-after: avoid-page;
}
```

`break-inside: avoid-page` keeps an element together when it fits on a page. `break-after: avoid-page` keeps an element with the content that follows it. Headings and figures receive sensible keep behavior by default.

Normal containers use sliced box decoration as they continue across pages. Use `RepeatBox` when every fragment should repeat the complete border, padding, and background while the content itself continues without duplication.

Long table rows, list items, and footnotes can continue onto later pages. Oversized images and other atomic media are reduced proportionally when they exceed the content area. CSS columns, normal floats, top and bottom page floats, counters, and generated content remain available when the design needs them.

Transformed or clipped containers, sticky positioning, dense grids, grid template areas, and grid rows spanning multiple tracks cannot always be fragmented safely. Satzstrom keeps these structures atomic and reports a layout diagnostic instead of silently producing the wrong result. Reshape the component when its content must flow across pages.

## Numbering, Contents, and References

Use `defineSequence` to describe a numbering system. Wrap each numbered item in `Sequence`. Nested items in the same sequence receive hierarchical numbers, while separate sequences count independently.

```tsx
import type { ReactNode } from "react";
import { Sequence, defineSequence } from "@satzstrom/primitives";

const sections = defineSequence({
  name: "sections",
  titleRequired: true,
});

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <Sequence sequence={sections} id={id} title={title}>
      {({ number }) => (
        <section>
          <h2>
            {number} {title}
          </h2>
          {children}
        </section>
      )}
    </Sequence>
  );
}
```

`Contents` renders the collected numbers, titles, and page numbers. Its `asChild` form passes the entries to a custom contents component. `Ref` links to an HTML ID and can display its number, title, or page. Pass a sequence to `Document` through `bookmarks` when the same hierarchy should become the PDF outline.

## Footnotes, Mathematics, and Async Content

`Footnote` places a numbered call in the text and moves its content into the footnote region of the current page. Footnotes remain part of the logical reading order and may continue when they are longer than the available region.

`Math` renders KaTeX input as inline or display mathematics with HTML and MathML. Set `display` for block equations and `label` when the equation needs a stable label.

Call `useRenderReady` when content depends on asynchronous browser work. Pass `false` while the content is incomplete and `true` once its final layout is ready. Satzstrom waits for all pending calls before measuring the document.

## Inspect and Refine

Use the live preview while shaping the document. It shows the same paginated pages as the final renderer and exposes layout diagnostics without writing a PDF.

After a structural or visual change, inspect the document state and render the pages affected by that change. Check the first and last page of a flowing region as well as pages around a deliberate break. Use debug rendering when a content boundary, split, keep rule, or overflow is unclear.

With MCP, use `check` for issues and `inspect` for page images or text. Without MCP, use:

```sh
satzstrom check path/to/document.tsx
satzstrom inspect path/to/document.tsx --start-page 3 --end-page 3 --images --debug
```

`inspect` writes compact JSON and absolute PNG paths. Its page range is one-based and inclusive; `0/-1` selects every page. Run `check --strict` before the final render so layout warnings fail the check instead of passing unnoticed.

## Render the Final PDF

Render the stable document with an explicit output path when the surrounding workflow depends on the filename:

```sh
satzstrom render path/to/document.tsx --out annual-report.pdf --strict
```

Use `--pdfa 2a` for PDF/A-2a and `--pdfua 1` for PDF/UA-1. Both may be enabled together. PDF/UA relies on semantic HTML, an accurate document language, useful alternative text, and accessible names for links and graphics. Mark purely decorative repeated headers and footers with `aria-hidden="true"`.

Set `bleed` and `cropMarks` on `Page` or `PageMaster` when the document will be trimmed after printing. Satzstrom writes the physical page, trim, and bleed geometry into the PDF.

Satzstrom currently produces sRGB output. It does not provide CMYK separation, spot colors, or PDF/X. Keep those requirements outside the Satzstrom workflow until the engine supports them explicitly.
