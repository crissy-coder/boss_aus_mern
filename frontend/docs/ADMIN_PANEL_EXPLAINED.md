# How the Admin Panel Works

## Is it Next.js or Nest?

**It is 100% Next.js.** There is no Nest.js in this project.

- **Admin UI** = Next.js pages (React) under `app/admin/`
- **API** = Next.js Route Handlers under `app/api/admin/`
- **Storage** = JSON files and image files on disk (no database)

---

## Big picture

```
┌─────────────────┐     ┌──────────────────────┐     ┌─────────────────────┐
│   Admin UI      │     │   Next.js API        │     │   Storage           │
│   (React)       │────▶│   (Route Handlers)   │────▶│   (Files on disk)   │
│   /admin/*     │     │   /api/admin/*       │     │   content/ + public/ │
└─────────────────┘     └──────────────────────┘     └─────────────────────┘
        │                            │                          │
        │                            │                          │
        └────────────────────────────┴──────────────────────────┘
                    All inside the same Next.js app
```

1. You use the **admin UI** in the browser (e.g. create/edit page, upload image).
2. The UI calls **Next.js API routes** (e.g. `POST /api/admin/pages`, `PUT /api/admin/pages/testingpage`).
3. Those API routes use **`lib/cms.ts`** to read/write **files** (JSON for pages, binary for images).
4. **No database** – everything is file-based.

---

## Where is data saved?

| What           | Where on disk                          | Used for                    |
|----------------|----------------------------------------|-----------------------------|
| **Page list**  | `content/pages/index.json`             | List of all CMS pages       |
| **One page**   | `content/pages/<slug>.json`            | Full page (title, type, content JSON) |
| **Images**     | `public/uploads/<filename>`            | Images you upload in Media  |

Example after creating a page with slug `testingpage`:

- **`content/pages/index.json`** – array of `{ slug, title, type, updatedAt }`.
- **`content/pages/testingpage.json`** – full page object including `content: { Heading, subheading, ... }`.

---

## How Create works

1. You open **Admin → Pages → “+ New page”**.
2. You fill **Slug**, **Title**, **Type**, and **Content (JSON)**, then click **Create page**.
3. The form does:
   ```ts
   fetch('/api/admin/pages', {
     method: 'POST',
     body: JSON.stringify({ slug, title, type, content })
   })
   ```
4. **`app/api/admin/pages/route.ts`** (POST):
   - Checks admin cookie (you must be logged in).
   - Calls `savePage()` from `lib/cms.ts`.
5. **`lib/cms.ts` → `savePage()`**:
   - Writes **`content/pages/<slug>.json`** with the full page (slug, title, type, updatedAt, content).
   - Updates **`content/pages/index.json`** so this page appears in the list.

Result: new JSON file on disk; the new page appears in the list and is viewable at `/{slug}` (e.g. `/testingpage`).

---

## How Edit / Update works

1. You open **Admin → Pages**, click **Edit** on a page (e.g. `testingpage`).
2. The edit page loads that page:
   ```ts
   fetch(`/api/admin/pages/${encodeURIComponent(slug)}`)
   ```
3. **`app/api/admin/pages/[slug]/route.ts`** (GET):
   - Checks admin cookie.
   - Calls `getPage(slug)` from `lib/cms.ts`.
   - `getPage()` reads **`content/pages/<slug>.json`** and returns it as JSON.
4. You change **Title**, **Type**, or **Content (JSON)** and click **Save changes**.
5. The form does:
   ```ts
   fetch(`/api/admin/pages/${encodeURIComponent(slug)}`, {
     method: 'PUT',
     body: JSON.stringify({ title, type, content })
   })
   ```
6. **`app/api/admin/pages/[slug]/route.ts`** (PUT):
   - Checks admin cookie.
   - Builds the new page object (existing data + your changes).
   - Calls `savePage(page)`.
7. **`lib/cms.ts` → `savePage()`**:
   - **Overwrites** **`content/pages/<slug>.json`** with the new full page.
   - **Updates** **`content/pages/index.json`** (title, type, updatedAt for that slug).

Result: the same file is updated on disk; the public page at `/{slug}` shows the new content on next load.

---

## How viewing a CMS page on the site works

1. User opens e.g. **`http://localhost:3000/testingpage`**.
2. Next.js matches the route **`app/[...slug]/page.tsx`** (catch-all).
3. That page (server component) calls **`getPage('testingpage')`** from `lib/cms.ts`.
4. `getPage()` reads **`content/pages/testingpage.json`** and returns the object.
5. The **`CmsPageView`** component receives that object and renders:
   - **Heading** / **subheading** (and other supported keys) from `content`.
   - Or full **hero / body / sections** if you use that structure.
   - Or **ServicePageTemplate** if it’s a service-type page with the right shape.

So: **edit/update in admin** = change JSON files → **view on site** = same app reads those JSON files and renders them. No Nest, no separate backend; everything is Next.js and files.

---

## How Media (images) work

1. **Upload:** Admin → Media → “+ Upload image” → file is sent to **`POST /api/admin/media`** (FormData).
2. **`app/api/admin/media/route.ts`** checks admin cookie and calls **`saveUpload(file)`** in `lib/cms.ts`.
3. **`saveUpload()`** saves the file under **`public/uploads/<name>-<timestamp>.<ext>`**.
4. You use the **Copy URL** in admin (e.g. `/uploads/myimage-123.png`) in your page **content JSON** (e.g. `hero.image` or `Heading`/body text that references the image). The site then loads the image from `public/uploads/`.

---

## Summary table

| Action        | Admin UI calls              | API route                    | lib/cms.ts    | Disk change                          |
|---------------|-----------------------------|-----------------------------|---------------|--------------------------------------|
| List pages    | GET /api/admin/pages        | GET → listPages()           | listPages()   | Read index.json                      |
| Create page   | POST /api/admin/pages       | POST → savePage()           | savePage()    | Write \<slug>.json, update index.json|
| Edit (load)   | GET /api/admin/pages/:slug  | GET → getPage()             | getPage()     | Read \<slug>.json                    |
| Update page   | PUT /api/admin/pages/:slug  | PUT → savePage()            | savePage()    | Overwrite \<slug>.json, update index |
| Delete page   | (future or manual)          | DELETE → deletePage()       | deletePage()  | Remove \<slug>.json, update index     |
| List media    | GET /api/admin/media        | GET → listMedia()           | listMedia()   | Read public/uploads/                 |
| Upload image  | POST /api/admin/media       | POST → saveUpload()         | saveUpload()  | Write file in public/uploads/        |
| View on site  | User visits /testingpage    | (no API) getPage() in route | getPage()     | Read \<slug>.json                    |

---

## Auth (how “login” works)

- **Login:** You submit the password to **`POST /api/admin/auth`**. If it matches `ADMIN_PASSWORD` (from `.env.local`), the API sets an **HTTP-only cookie** (`admin_session`).
- **Every admin API** (pages, media) checks that cookie. If it’s missing or wrong, the API returns 401 Unauthorized.
- **Logout:** **`DELETE /api/admin/auth`** clears that cookie.

So: **Next.js only** (no Nest), **data = JSON + files**, **create = write new JSON**, **edit/update = overwrite that JSON and refresh the index**.
