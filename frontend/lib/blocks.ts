/**
 * Block types for the CMS page editor.
 * Converts between block-based UI and the content JSON CmsPageView expects.
 */

export type HeroBlock = {
  type: "hero";
  title?: string;
  description?: string;
  image?: string;
};

export type BodyBlock = {
  type: "body";
  text: string;
};

export type SectionBlock = {
  type: "section";
  title?: string;
  text?: string;
};

export type RowCell = {
  title?: string;
  text?: string;
  image?: string;
};

export type RowBlock = {
  type: "row";
  layout: string;
  cells: RowCell[];
};

export type Block = HeroBlock | BodyBlock | SectionBlock | RowBlock;

const LAYOUT_OPTIONS = [
  { value: "12", label: "Full width (1 column)" },
  { value: "6-6", label: "Two columns (50-50)" },
  { value: "8-4", label: "Two columns (66-33)" },
  { value: "4-8", label: "Two columns (33-66)" },
  { value: "4-4-4", label: "Three columns" },
  { value: "3-3-3-3", label: "Four columns" },
] as const;

export { LAYOUT_OPTIONS };

/** Convert content JSON (from DB) to blocks array for the editor */
export function contentToBlocks(content: Record<string, unknown>): Block[] {
  const blocks: Block[] = [];

  const hero = content.hero as { title?: string; description?: string; image?: string } | undefined;
  if (hero && typeof hero === "object") {
    blocks.push({
      type: "hero",
      title: hero.title ?? "",
      description: hero.description ?? "",
      image: hero.image ?? "",
    });
  }

  const body = content.body as string | undefined;
  if (body != null && typeof body === "string") {
    blocks.push({ type: "body", text: body });
  }

  const sections = content.sections as Array<{ title?: string; text?: string }> | undefined;
  if (Array.isArray(sections)) {
    for (const s of sections) {
      if (s && typeof s === "object") {
        blocks.push({
          type: "section",
          title: s.title ?? "",
          text: s.text ?? "",
        });
      }
    }
  }

  const rows = content.rows as Array<{ layout?: string; cells?: RowCell[] }> | undefined;
  if (Array.isArray(rows)) {
    for (const r of rows) {
      if (r && typeof r === "object" && Array.isArray(r.cells)) {
        blocks.push({
          type: "row",
          layout: r.layout ?? "6-6",
          cells: r.cells.map((c) => ({
            title: c?.title ?? "",
            text: c?.text ?? "",
            image: c?.image ?? "",
          })),
        });
      }
    }
  }

  // If no blocks from structured content, check for simple heading/subheading
  if (blocks.length === 0) {
    const heading =
      (content.Heading as string) ?? (content.heading as string) ?? (content.title as string);
    const subheading =
      (content.Subheading as string) ?? (content.subheading as string);
    if (heading || subheading) {
      blocks.push({
        type: "hero",
        title: heading ?? "",
        description: subheading ?? "",
        image: "",
      });
    }
  }

  return blocks.length > 0 ? blocks : [{ type: "hero", title: "", description: "", image: "" }];
}

/** Convert blocks array to content JSON for saving */
export function blocksToContent(blocks: Block[]): Record<string, unknown> {
  const content: Record<string, unknown> = {};
  const sections: Array<{ title?: string; text?: string }> = [];
  const rows: Array<{ layout?: string; cells?: RowCell[] }> = [];
  let heroSet = false;
  let bodySet = false;

  for (const b of blocks) {
    switch (b.type) {
      case "hero":
        if (!heroSet && (b.title || b.description || b.image)) {
          content.hero = {
            ...(b.title && { title: b.title }),
            ...(b.description && { description: b.description }),
            ...(b.image && { image: b.image }),
          };
          heroSet = true;
        }
        break;
      case "body":
        if (!bodySet && b.text.trim()) {
          content.body = b.text.trim();
          bodySet = true;
        }
        break;
      case "section":
        sections.push({
          ...(b.title && { title: b.title }),
          ...(b.text && { text: b.text }),
        });
        break;
      case "row":
        if (b.cells.some((c) => c.title || c.text || c.image)) {
          rows.push({
            layout: b.layout || "6-6",
            cells: b.cells.map((c) => ({
              ...(c.title && { title: c.title }),
              ...(c.text && { text: c.text }),
              ...(c.image && { image: c.image }),
            })),
          });
        }
        break;
    }
  }

  if (sections.length > 0) content.sections = sections;
  if (rows.length > 0) content.rows = rows;

  return content;
}

/** Get default cells count for a layout string (e.g. "6-6" -> 2) */
export function getLayoutCellCount(layout: string): number {
  const parts = layout.trim().split(/[-,\s]+/).filter(Boolean);
  return Math.max(1, parts.length);
}
