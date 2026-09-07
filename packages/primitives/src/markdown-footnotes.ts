type Node = {
  type: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: Node[];
};

/** Turn remark's endnotes into the same source markers used by Footnote. */
export function markdownFootnotes(options: { label: string }) {
  return (tree: Node) => {
    const definitions = new Map<string, Node[]>();
    const backlinks = new Map<string, string>();
    const collect = (node: Node) => {
      if (node.properties?.dataFootnoteBackref !== undefined) {
        backlinks.set(
          String(node.properties.href).slice(1),
          String(node.properties.ariaLabel ?? ""),
        );
      }
      if (node.tagName === "section" && node.properties?.dataFootnotes !== undefined) {
        for (const list of node.children ?? []) {
          for (const item of list.children ?? []) {
            if (item.tagName === "li" && typeof item.properties?.id === "string") {
              definitions.set(item.properties.id, stripBacklinks(item.children ?? []));
            }
          }
        }
      }
      node.children?.forEach(collect);
    };
    collect(tree);
    const emitted = new Set<string>();
    const visit = (node: Node) => {
      if (!node.children) return;
      node.children = node.children.flatMap((child): Node[] => {
        if (child.tagName === "section" && child.properties?.dataFootnotes !== undefined) return [];
        const link =
          child.tagName === "sup"
            ? child.children?.find(
                (value) => value.tagName === "a" && value.properties?.dataFootnoteRef !== undefined,
              )
            : undefined;
        const id = String(link?.properties?.href ?? "").slice(1);
        const content = definitions.get(id);
        if (link && content) {
          child.properties = {
            ...child.properties,
            className: ["rr-footnote-call"],
            dataRrFootnoteCall: id,
            dataRrAtomic: "",
          };
          const backLabel = backlinks.get(String(link.properties?.id)) ?? "";
          link.properties = {
            href: `#${id}`,
            ariaLabel: options.label,
            dataFootnoteRef: true,
            dataRrLabel: options.label,
            dataRrBackLabel: backLabel,
          };
          if (!emitted.has(id)) {
            emitted.add(id);
            return [
              child,
              {
                type: "element",
                tagName: "span",
                properties: { id, hidden: true, dataRrFootnoteKey: id, dataRrFootnoteContent: "" },
                children: content,
              },
            ];
          }
          return [child];
        }
        visit(child);
        return [child];
      });
    };
    visit(tree);
  };
}

function stripBacklinks(nodes: Node[]): Node[] {
  return nodes.flatMap((node) => {
    if (node.properties?.dataFootnoteBackref !== undefined) return [];
    return [{ ...node, children: node.children ? stripBacklinks(node.children) : undefined }];
  });
}
