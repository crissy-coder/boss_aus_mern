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

---

## How to use admin content on the website & get links

### When does a CMS page appear on the site?

- **Any page you create** in Admin → Pages is **viewable at `/{slug}`** on the **public site** – but only if that path is not already taken by a built-in route.
- **Built-in routes** (these are coded in the app and **cannot** be replaced by a CMS page):  
  `/`, `/about`, `/contact`, `/team`, `/services/bpo`, `/services/construction`, etc.  
  So a CMS page with slug `about` will **not** show at `/about`; the static About page will.
- **CMS-only URLs** (no built-in page): use any **other** slug, e.g. `news`, `testingpage`, `blog`, `our-story`, `faq`. Those URLs are handled by the catch-all route and **will** show your CMS page.

**Summary:** Create a page with a **new** slug (e.g. `news` or `our-story`) → it appears at **`https://your-site.com/news`** or **`https://your-site.com/our-story`**.

**How users find it:** When creating or editing a page, choose **Show in menu**:

- **Footer only (default)** – Link appears in the site footer under **“More pages”**.
- **Main navigation** – Link appears in the header top bar (next to Home, About Us, etc.).
- **Under Our Services dropdown** – Link appears inside the **Our Services** dropdown in the header.
- **Under Global dropdown** – Link appears inside the **Global** dropdown in the header.
- **Footer – More pages** – Same as default; link only in the footer.

So the admin can place each new page in the header (main bar, Services submenu, or Global submenu) or leave it in the footer only.

### Where to get links in the admin panel

| What you want | Where to get it |
|---------------|------------------|
| **Link to a CMS page on the site** | **Admin → Pages** → each row has **View** (opens the page) and **Copy link** (copies the full public URL, e.g. `https://yoursite.com/news`). Use that URL in your main nav, footer, or anywhere on the site. |
| **Link to an uploaded image** | **Admin → Media** → each image has **Copy URL**. That gives the full image URL (e.g. `https://yoursite.com/uploads/myimage-123.png`). Paste it into a page’s **Content (JSON)** when editing a page, e.g. in `hero.image` or any field that expects an image URL. |

### How to “insert” admin content into the website

1. **New CMS page**
   - Admin → Pages → **+ New page** → set **Slug** (e.g. `news`), **Title**, **Type**, **Content (JSON)** → **Create page**.
   - The page is live at **`/news`**. Add that link in your header/footer (e.g. in `components/Header.tsx` or `components/Footer.tsx`) so users can open it.

2. **Use an uploaded image in a page**
   - Admin → Media → upload image → click **Copy URL**.
   - Admin → Pages → Edit the page → in **Content (JSON)** put that URL in the right field, e.g. `"hero": { "image": "/uploads/myimage-123.png" }` or `"image": "https://yoursite.com/uploads/..."`.
   - Save. The next time someone opens that CMS page, the image will show.

3. **Link from the main site to a CMS page**
   - In your code (e.g. `Header.tsx`, `Footer.tsx`), add a link: `<Link href="/news">News</Link>` (use the slug you created).
   - Or copy the public URL from Admin → Pages (**Copy link**) and use it in buttons, emails, or external menus.

### Row/column layouts (6/12, 8/4, etc.)

You can define **rows** with column splits so the page renders in a grid (e.g. two 6/12 columns, or 8/12 + 4/12). In the page **Content (JSON)** add a `rows` array. Each row has:

- **layout** – string of column widths out of 12, separated by `-` or `,`. Examples: `"6-6"` (two equal columns), `"8-4"` (two-thirds + one-third), `"4-4-4"` (three columns), `"12"` (full width). The numbers must sum to 12.
- **cells** – array of blocks, one per column. Each cell can have **title**, **text**, and **image** (URL).

Example:

```json
{
  "Heading": "Our Team",
  "rows": [
    {
      "layout": "6-6",
      "cells": [
        { "title": "Left", "text": "Left column content." },
        { "title": "Right", "text": "Right column content." }
      ]
    },
    {
      "layout": "8-4",
      "cells": [
        { "title": "Main", "text": "Main content...", "image": "/uploads/photo.jpg" },
        { "title": "Side", "text": "Sidebar or note." }
      ]
    }
  ]
}
```

On small screens, columns stack to full width. Supported splits: any combination that sums to 12 (e.g. 6-6, 8-4, 4-8, 4-4-4, 3-3-3-3, 5-7, 9-3).

**Full example: heading, description, hero image, then a row with 6/12 + 6/12 or 8/12 + 4/12**

Copy this into **Content (JSON)** when creating or editing a page (replace image URLs with your own from Admin → Media → Copy URL):

```json
{
  "Heading": "About Our Services",
  "subheading": "A short description that appears under the main heading.",
  "hero": {
    "title": "About Our Services",
    "description": "Optional hero description.",
    "image": "/uploads/your-image.jpg"
  },
  "rows": [
    {
      "layout": "6-6",
      "cells": [
        {
          "title": "Left column (6/12)",
          "text": "This column takes half the row. Add your text or use an image below.",
          "image": "/uploads/left-photo.jpg"
        },
        {
          "title": "Right column (6/12)",
          "text": "The other half. You can mix title, text, and image in each cell."
        }
      ]
    },
    {
      "layout": "8-4",
      "cells": [
        {
          "title": "Main content (8/12)",
          "text": "Wider column for main content. Two-thirds of the row."
        },
        {
          "title": "Sidebar (4/12)",
          "text": "Narrow column for a sidebar or highlights."
        }
      ]
    }
  ]
}
```

Result on the page: a hero section with heading, description, and image; then a row of two equal columns (6/12 + 6/12); then a row with 8/12 + 4/12.

---

## Deploying to Vercel – admin login

**.env.local is not deployed.** Vercel does not upload gitignored files, so `ADMIN_PASSWORD` from `.env.local` is **not** available in production. The API then falls back to the default password `admin123`, so your real password (e.g. `Boss@1234`) will not work.

**Fix:** set the password in Vercel:

1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Project → Settings → Environment Variables**.
3. Add:
   - **Name:** `ADMIN_PASSWORD`
   - **Value:** your admin password (e.g. `Boss@1234`)
   - **Environment:** Production (and Preview if you want the same password there).
4. Save and **redeploy** the project (e.g. Deployments → … → Redeploy). Env vars are applied on build, so a new deployment is required.
5. Log in at `https://your-site.vercel.app/admin/login` with that password.
