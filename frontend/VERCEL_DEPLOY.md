# Deploying to Vercel

This Next.js app lives in the **`frontend`** folder. The repo root does not contain `package.json`, so you must tell Vercel to use `frontend` as the project root.

## 1. Set root directory

1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**, enter **`frontend`** (no leading slash), then **Save**.

## 2. Environment variables

In Vercel: **Settings** → **Environment Variables**. Add these (for Production, Preview, and Development as needed):

| Name | Description | Where to get it |
|------|-------------|-----------------|
| `ADMIN_PASSWORD` | Admin CMS login password | Choose a strong password |
| `DATABASE_URL` | Neon Postgres connection string | Vercel → Storage → Postgres, or [Neon Console](https://console.neon.tech) → Connection string (pooled) |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob token for CMS uploads | Vercel → Storage → Blob → your store → **.env.local** tab |

After adding or changing env vars, **redeploy** (Deployments → … → Redeploy) so the new values are used.

## 3. Database and Blob setup

- **Neon:** Ensure the `cms_pages` table exists. Run `frontend/scripts/init-cms-pages.sql` in the Neon SQL Editor if you haven’t already.
- **Blob:** Create a Blob store in Vercel (Storage → Create Database → Blob) and copy its `BLOB_READ_WRITE_TOKEN` into the project’s env vars.

## Fix: "No Next.js version detected"

1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**.
4. Enter **`frontend`** (no leading slash).
5. Click **Save**.
6. **Redeploy**: Deployments → … on latest deployment → **Redeploy**.

Vercel will then run `npm install` and `next build` from the `frontend` directory and detect Next.js correctly.

## Local development (fix "Missing DATABASE_URL")

If `/api/admin/db-ping` returns `{"ok":false,"error":"Missing DATABASE_URL"}` when running locally:

1. In the **`frontend`** folder, create or edit **`.env.local`** (this file is not committed).
2. Add or set:
   - `ADMIN_PASSWORD` = your admin password  
   - `DATABASE_URL` = your Neon Postgres connection string (same as on Vercel)  
   - `BLOB_READ_WRITE_TOKEN` = your Vercel Blob token (optional for media uploads)
3. Restart the dev server: stop `npm run dev`, then run it again.

Get `DATABASE_URL` from [Neon Console](https://console.neon.tech) → your project → Connection string (use the **pooled** one), or from Vercel → Storage → Postgres → .env.

## Deployed app returns "Missing DATABASE_URL"

If the **deployed** site (on Vercel) shows that error when you call the API or use admin:

1. In Vercel: **Settings** → **Environment Variables**.
2. Add **`DATABASE_URL`** with your Neon connection string.
3. Select **Production** (and Preview/Development if you use them), then Save.
4. **Redeploy**: Deployments → … on latest deployment → **Redeploy** (env vars apply only to new deployments).

## Deprecation warning: @vercel/postgres

The app uses **Neon** via `@neondatabase/serverless` only; it does not use `@vercel/postgres`. The deprecated package has been removed from `package.json`, so the warning should disappear on the next deploy. No code changes are required.

## Team / Git author error

If you see: *"Git author ... must have access to the team ... to create deployments"*:

- The commit author (`vikask@mirakitech.com`) is not a member of the Vercel team that owns the project.
- **Fix:** Either add that email as a team member in Vercel (Team Settings → Members), or push commits from an account that already has access to the team’s projects.
