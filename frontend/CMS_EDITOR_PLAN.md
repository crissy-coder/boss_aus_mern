# CMS editor alternatives – plan (no more raw JSON for admins)

Right now, admins create and edit pages by writing **raw JSON** in a textarea. That is risky: one missing comma or bracket can break the page, and non-technical users often don’t know the expected structure.

This doc is a **step-by-step plan** for what we can do later so admins never (or rarely) touch JSON.

---

## 1. Understand the current model

- **Where JSON is used:** New page (`/admin/pages/new`), Edit page (`/admin/pages/[slug]`).
- **What’s in the JSON:** Page “content” – e.g. `hero`, `sections`, `rows`, `cells`, blocks with `title`, `text`, `image`, etc. Structure depends on page type (home, about, contact, service, etc.).
- **Risk:** Invalid JSON → save fails or page breaks; wrong keys → content not shown; no validation before save.

---

## 2. Alternatives (from quick win to full solution)

### Option A – JSON validation + helper (quick win)

- **What:** Keep the JSON textarea but add:
  - **Validate on blur / before save:** Parse JSON and show clear errors (“Missing comma at line 5”).
  - **Format / prettify button:** Auto-format so structure is readable.
  - **Templates dropdown:** “Start from: Home template / About template / Service template” that inserts valid starter JSON.
- **Pros:** Small change, no new UI. **Cons:** Still JSON; only reduces (not removes) risk.

### Option B – Structured form per page type (medium effort)

- **What:** Replace the single “Content (JSON)” textarea with a **form** that matches the content shape:
  - For **Home:** fields for hero title, hero subtitle, CTA text, maybe a list of feature titles.
  - For **About:** sections with title + text (add/remove section).
  - For **Service:** hero + description + optional rows (e.g. “Row 1: title, text, image”).
- **Behind the scenes:** Form state is converted to the same JSON the site already uses; save still sends that JSON to the API. No change to API or front-end rendering.
- **Pros:** No JSON visible; validation is natural (required fields, image URL). **Cons:** Need to define one form per type (or a flexible “sections” builder).

### Option C – Block-based / section builder (higher effort)

- **What:** Admin sees “Add section” and picks from block types: “Hero”, “Text”, “Image”, “Two columns”, “CTA”, etc. Each block has its own small form (title, text, image upload, link). Order by drag-and-drop. Delete/edit per block.
- **Behind the scenes:** Builder state is stored as a list of blocks (e.g. `[{ type: "hero", ... }, { type: "text", ... }]`), which your app converts to the existing JSON or to a new canonical format.
- **Pros:** Very safe and intuitive; scales to many page types. **Cons:** More UI and state logic; need to map blocks to current page structure.

### Option D – Visual / WYSIWYG editor (highest effort)

- **What:** Edit the page in a rich editor (e.g. TipTap, Lexical) or a visual page builder (drag components on a canvas). Content stored as HTML or structured blocks.
- **Pros:** Feels like editing a document. **Cons:** Big integration; may require changing how the public site renders (e.g. from JSON to HTML or to a block renderer).

---

## 3. Recommended path (step-by-step “later we implement”)

### Phase 1 – Reduce risk without changing UX much (do first)

1. **Add JSON validation in the edit form**
   - On “Save” (and optionally on blur of the textarea): `JSON.parse(contentJson)` and catch errors.
   - Show error message under the textarea: “Invalid JSON: Unexpected token at line X.”
   - Don’t call the API if JSON is invalid.

2. **Add a “Format” button**
   - On click: parse JSON, then `JSON.stringify(parsed, null, 2)` and set the textarea value. Makes it easier to spot mistakes.

3. **Add “Template” dropdown or buttons**
   - Define 2–3 minimal valid JSON templates (e.g. “Minimal page”, “Home”, “Service”).
   - “Insert template” fills the textarea so admins start from valid structure instead of an empty `{}`.

4. **Optional: keep a “Show raw JSON” toggle**
   - Default: show the structured form (Phase 2). Advanced users can toggle to see/edit raw JSON when needed.

---

### Phase 2 – One page type with a real form (no JSON visible)

1. **Pick one page type** (e.g. “About” or “Contact”) that has a simple, fixed structure (e.g. hero + 2–3 text sections).

2. **Define the content shape** in code (TypeScript type / interface) so it matches the existing JSON the site expects.

3. **Build a form** that has:
   - One field per top-level key (e.g. hero title, hero subtitle).
   - For repeatable things (e.g. “sections”): “Add section” button, each section has title + text; “Remove” per section.

4. **On load:** If the page has content, parse it and fill the form. On save: build an object from the form and `JSON.stringify` it, then send to the existing API. No change to API.

5. **In the edit UI:** If `page.type === "about"` (or chosen type), show this form; else fall back to the current JSON textarea (or Phase 1 validated textarea).

6. **Extend to 1–2 more types** (e.g. Home, Service) once the pattern is clear.

---

### Phase 3 – Generic “sections” or block builder (optional, later)

1. **Design a single “section” model** that can represent most of your blocks: e.g. type (hero / text / image / two-column / CTA) + a flexible `data` object (title, text, imageUrl, etc.).

2. **Admin UI:** List of sections; “Add section” → choose type → show a small form for that type. Reorder (drag), edit, delete.

3. **Persistence:** Save as `{ sections: [ { type, data } ] }` (or whatever your app already supports). Public site already or is updated to render from this structure.

4. **Templates:** “New page from template” creates a page with a predefined list of sections (e.g. Home = hero + features + CTA).

---

## 4. Technical notes for implementation

- **API:** Can stay as-is (PUT/POST with `content` as JSON). The only change is how the admin UI produces that JSON (form → object → string vs raw textarea).
- **Validation:** Use the same TypeScript types or Zod/Yup schemas on the client (and optionally on the API) so invalid structure is caught before save.
- **Image fields:** In forms, use “Upload” (existing media API) and paste back the image URL into the block’s `image` field, or add a small image picker that calls the media API and inserts the URL.
- **Optional “View raw JSON”:** Store the form state as the source of truth; “View raw” is a read-only or editable JSON view for power users; if they edit it, re-parse and sync back to the form (or warn that form edits will be overwritten).

---

## 5. Summary checklist (for later)

- [ ] **Phase 1:** Validation + Format + Templates for current JSON textarea.
- [ ] **Phase 2:** One page type (e.g. About) with a structured form; then 1–2 more types.
- [ ] **Phase 3 (optional):** Generic section/block builder for all types.
- [ ] Keep API unchanged; only change how the admin UI builds the `content` JSON.
- [ ] Add client-side (and optionally server-side) schema validation so invalid structure never reaches the DB.

This way, we can remove the “high risk” of raw JSON for admins step by step, without a big rewrite.
