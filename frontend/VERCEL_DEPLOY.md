# Deploying to Vercel

This Next.js app lives in the **`frontend`** folder. The repo root does not contain `package.json`, so you must tell Vercel to use `frontend` as the project root.

## Fix: "No Next.js version detected"

1. Open your project on [vercel.com](https://vercel.com).
2. Go to **Settings** → **General**.
3. Under **Root Directory**, click **Edit**.
4. Enter **`frontend`** (no leading slash).
5. Click **Save**.
6. **Redeploy**: Deployments → … on latest deployment → **Redeploy**.

Vercel will then run `npm install` and `next build` from the `frontend` directory and detect Next.js correctly.

## Team / Git author error

If you see: *"Git author ... must have access to the team ... to create deployments"*:

- The commit author (`vikask@mirakitech.com`) is not a member of the Vercel team that owns the project.
- **Fix:** Either add that email as a team member in Vercel (Team Settings → Members), or push commits from an account that already has access to the team’s projects.
