"use client";

import { useState } from "react";
import ImagePicker from "./ImagePicker";
import {
  type Block,
  type HeroBlock,
  type BodyBlock,
  type SectionBlock,
  type RowBlock,
  type RowCell,
  LAYOUT_OPTIONS,
  getLayoutCellCount,
} from "@/lib/blocks";

const BLOCK_TYPES = [
  { value: "hero", label: "Hero (title, subtitle, image)" },
  { value: "body", label: "Body text" },
  { value: "section", label: "Section (title + text)" },
  { value: "row", label: "Row (columns: 6-6, 8-4, etc.)" },
] as const;

function createBlock(type: Block["type"]): Block {
  switch (type) {
    case "hero":
      return { type: "hero", title: "", description: "", image: "" };
    case "body":
      return { type: "body", text: "" };
    case "section":
      return { type: "section", title: "", text: "" };
    case "row":
      return { type: "row", layout: "6-6", cells: [{ title: "", text: "", image: "" }, { title: "", text: "", image: "" }] };
    default:
      return { type: "hero", title: "", description: "", image: "" };
  }
}

export default function BlockEditor({
  blocks,
  onChange,
}: {
  blocks: Block[];
  onChange: (blocks: Block[]) => void;
}) {
  const [addOpen, setAddOpen] = useState(false);

  const updateBlock = (index: number, updater: (b: Block) => Block) => {
    const next = [...blocks];
    next[index] = updater(next[index]);
    onChange(next);
  };

  const removeBlock = (index: number) => {
    const next = blocks.filter((_, i) => i !== index);
    onChange(next.length > 0 ? next : [createBlock("hero")]);
  };

  const moveBlock = (index: number, dir: "up" | "down") => {
    const next = [...blocks];
    const target = dir === "up" ? index - 1 : index + 1;
    if (target < 0 || target >= next.length) return;
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  };

  const addBlock = (type: Block["type"]) => {
    setAddOpen(false);
    onChange([...blocks, createBlock(type)]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-theme-muted">Page content</p>
        <div className="relative">
          <button
            type="button"
            onClick={() => setAddOpen(!addOpen)}
            className="rounded-lg border border-theme bg-theme-card px-4 py-2 text-sm font-medium text-theme-heading hover:bg-(--page-pattern-color)"
          >
            + Add block
          </button>
          {addOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setAddOpen(false)}
                aria-hidden
              />
              <div className="absolute right-0 top-full z-20 mt-1 min-w-[220px] rounded-lg border border-theme bg-theme-card py-1 shadow-lg">
                {BLOCK_TYPES.map((t) => (
                  <button
                    key={t.value}
                    type="button"
                    onClick={() => addBlock(t.value as Block["type"])}
                    className="block w-full px-4 py-2 text-left text-sm text-theme-heading hover:bg-(--page-pattern-color)"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {blocks.map((block, i) => (
          <BlockCard
            key={i}
            block={block}
            index={i}
            total={blocks.length}
            onUpdate={(updater) => updateBlock(i, updater)}
            onRemove={() => removeBlock(i)}
            onMoveUp={() => moveBlock(i, "up")}
            onMoveDown={() => moveBlock(i, "down")}
          />
        ))}
      </div>
    </div>
  );
}

function BlockCard({
  block,
  index,
  total,
  onUpdate,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  block: Block;
  index: number;
  total: number;
  onUpdate: (updater: (b: Block) => Block) => void;
  onRemove: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const label = BLOCK_TYPES.find((t) => t.value === block.type)?.label ?? block.type;

  return (
    <div className="rounded-xl border border-theme bg-theme-card p-4">
      <div className="mb-3 flex items-center justify-between">
        <span className="text-sm font-medium text-theme-muted">{label}</span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={index === 0}
            className="rounded p-1.5 text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading disabled:opacity-40"
            aria-label="Move up"
          >
            ↑
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={index === total - 1}
            className="rounded p-1.5 text-theme-muted hover:bg-(--page-pattern-color) hover:text-theme-heading disabled:opacity-40"
            aria-label="Move down"
          >
            ↓
          </button>
          <button
            type="button"
            onClick={onRemove}
            className="rounded p-1.5 text-red-400 hover:bg-red-900/20"
            aria-label="Remove block"
          >
            ✕
          </button>
        </div>
      </div>

      {block.type === "hero" && (
        <HeroBlockForm block={block} onChange={(b) => onUpdate(() => b)} />
      )}
      {block.type === "body" && (
        <BodyBlockForm block={block} onChange={(b) => onUpdate(() => b)} />
      )}
      {block.type === "section" && (
        <SectionBlockForm block={block} onChange={(b) => onUpdate(() => b)} />
      )}
      {block.type === "row" && (
        <RowBlockForm block={block} onChange={(b) => onUpdate(() => b)} />
      )}
    </div>
  );
}

function HeroBlockForm({
  block,
  onChange,
}: {
  block: HeroBlock;
  onChange: (b: HeroBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-xs text-theme-muted">Title</label>
        <input
          type="text"
          value={block.title ?? ""}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          placeholder="Page heading"
          className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-theme-muted">Subtitle</label>
        <input
          type="text"
          value={block.description ?? ""}
          onChange={(e) => onChange({ ...block, description: e.target.value })}
          placeholder="Short description"
          className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-theme-muted">Image</label>
        <ImagePicker
          value={block.image ?? ""}
          onChange={(url) => onChange({ ...block, image: url })}
        />
      </div>
    </div>
  );
}

function BodyBlockForm({
  block,
  onChange,
}: {
  block: BodyBlock;
  onChange: (b: BodyBlock) => void;
}) {
  return (
    <div>
      <label className="mb-1 block text-xs text-theme-muted">Text</label>
      <textarea
        value={block.text ?? ""}
        onChange={(e) => onChange({ ...block, text: e.target.value })}
        rows={4}
        placeholder="Main body content..."
        className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading placeholder:text-theme-muted"
      />
    </div>
  );
}

function SectionBlockForm({
  block,
  onChange,
}: {
  block: SectionBlock;
  onChange: (b: SectionBlock) => void;
}) {
  return (
    <div className="space-y-3">
      <div>
        <label className="mb-1 block text-xs text-theme-muted">Section title</label>
        <input
          type="text"
          value={block.title ?? ""}
          onChange={(e) => onChange({ ...block, title: e.target.value })}
          placeholder="Section heading"
          className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading"
        />
      </div>
      <div>
        <label className="mb-1 block text-xs text-theme-muted">Content</label>
        <textarea
          value={block.text ?? ""}
          onChange={(e) => onChange({ ...block, text: e.target.value })}
          rows={3}
          placeholder="Section content..."
          className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading placeholder:text-theme-muted"
        />
      </div>
    </div>
  );
}

function RowBlockForm({
  block,
  onChange,
}: {
  block: RowBlock;
  onChange: (b: RowBlock) => void;
}) {
  const count = getLayoutCellCount(block.layout);
  const cells = block.cells.slice(0, count);
  while (cells.length < count) {
    cells.push({ title: "", text: "", image: "" });
  }

  const updateLayout = (layout: string) => {
    const newCount = getLayoutCellCount(layout);
    const newCells: RowCell[] = [];
    for (let i = 0; i < newCount; i++) {
      newCells.push(cells[i] ?? { title: "", text: "", image: "" });
    }
    onChange({ ...block, layout, cells: newCells });
  };

  const updateCell = (cellIdx: number, updater: (c: RowCell) => RowCell) => {
    const newCells = [...cells];
    newCells[cellIdx] = updater(newCells[cellIdx] ?? { title: "", text: "", image: "" });
    onChange({ ...block, cells: newCells });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="mb-1 block text-xs text-theme-muted">Layout</label>
        <select
          value={block.layout}
          onChange={(e) => updateLayout(e.target.value)}
          className="w-full rounded-lg border border-theme bg-theme-card px-3 py-2 text-sm text-theme-heading"
        >
          {LAYOUT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {cells.map((cell, i) => (
          <div
            key={i}
            className="rounded-lg border border-theme bg-theme-section p-3"
          >
            <p className="mb-2 text-xs font-medium text-theme-muted">
              Column {i + 1}
            </p>
            <div className="space-y-2">
              <input
                type="text"
                value={cell.title ?? ""}
                onChange={(e) => updateCell(i, (c) => ({ ...c, title: e.target.value }))}
                placeholder="Title"
                className="w-full rounded border border-theme bg-theme-card px-2 py-1.5 text-sm text-theme-heading"
              />
              <textarea
                value={cell.text ?? ""}
                onChange={(e) => updateCell(i, (c) => ({ ...c, text: e.target.value }))}
                rows={2}
                placeholder="Text"
                className="w-full rounded border border-theme bg-theme-card px-2 py-1.5 text-sm text-theme-heading"
              />
              <div>
                <label className="mb-0.5 block text-xs text-theme-muted">Image</label>
                <ImagePicker
                  value={cell.image ?? ""}
                  onChange={(url) => updateCell(i, (c) => ({ ...c, image: url }))}
                  placeholder="Optional image URL"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
