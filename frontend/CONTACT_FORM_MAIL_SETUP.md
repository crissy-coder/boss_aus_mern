# Contact form – SMTP / mail setup (step-by-step)

The contact page form currently calls `POST /contact` with `name`, `email`, `phone`, `subject`, `message`. There is **no backend yet** for this; the client uses `http://localhost:3000` and no API route exists. Follow these steps to add email sending via SMTP.

---

## 1. Choose how to send email

**Option A – SMTP (your own or provider)**  
- Use a package like **Nodemailer** in a Next.js API route.  
- You need: SMTP host, port, user, password, and “from” address.  
- Examples: Gmail (with App Password), Outlook, or an SMTP provider (e.g. SendGrid SMTP, Mailgun SMTP, Brevo/Sendinblue).

**Option B – Transactional email API (no SMTP)**  
- Use a service like **Resend**, **SendGrid API**, or **Mailgun API** with their SDK.  
- Often easier on Vercel (no SMTP connection issues).  
- This guide focuses on **Option A (SMTP)**; the same API route shape applies for Option B.

---

## 2. Get SMTP credentials

- **Gmail:**  
  - Enable 2FA, then create an [App Password](https://myaccount.google.com/apppasswords).  
  - Host: `smtp.gmail.com`, Port: `587` (TLS) or `465` (SSL), user = your Gmail, password = App Password.

- **Outlook / Microsoft 365:**  
  - Host: `smtp.office365.com`, Port: `587`, user = your email, password = your account password (or app password if 2FA).

- **Other provider (e.g. SendGrid, Mailgun, Brevo):**  
  - In the provider dashboard, find “SMTP” or “Integration” and copy: host, port (usually 587 or 465), username, password.

---

## 3. Add environment variables

In **`frontend/.env.local`** (and in **Vercel → Settings → Environment Variables** for production), add:

| Variable | Description | Example |
|----------|-------------|--------|
| `SMTP_HOST` | SMTP server hostname | `smtp.gmail.com` |
| `SMTP_PORT` | Port (usually 587 or 465) | `587` |
| `SMTP_SECURE` | `true` for port 465, else `false` | `false` |
| `SMTP_USER` | SMTP login username (often your email) | `yourname@gmail.com` |
| `SMTP_PASS` | SMTP password (App Password for Gmail) | `xxxx xxxx xxxx xxxx` |
| `MAIL_FROM` | “From” address (can equal SMTP_USER) | `noreply@yourdomain.com` or your email |
| `MAIL_TO` | Where contact form submissions go | `info@bossgroup.com.au` |

Optional: `SMTP_REJECT_UNAUTHORIZED` = `false` only for local dev with self-signed certs (do not use in production).

---

## 4. Backend: create the API route

- Add **`frontend/app/api/contact/route.ts`** (or `app/contact/route.ts` if you prefer a route under `/contact`; Next.js 13+ App Router uses `route.ts` for API handlers).
- In that route:
  - Accept **POST** only.
  - Read body: `name`, `email`, `phone`, `subject`, `message` (validate presence/format as needed).
  - Load `SMTP_*` and `MAIL_*` from `process.env`.
  - Use **Nodemailer** (or another SMTP client) to send one email:
    - **To:** `MAIL_TO`
    - **From:** `MAIL_FROM`
    - **Subject:** e.g. `Contact form: ${subject}`
    - **Body:** plain text and/or HTML listing name, email, phone, subject, message.
  - On success: return `200` with `{ ok: true }` (or similar).
  - On failure: return `500` and log the error (do not expose SMTP details to the client).

---

## 5. Install Nodemailer

In `frontend`:

```bash
npm install nodemailer
npm install -D @types/nodemailer
```

Use Nodemailer’s `createTransport` with the env vars above and `transport.sendMail(...)` in the API route.

---

## 6. Frontend: point the form to the new API

- In **`frontend/services/api.ts`** (or wherever `sendContact` is defined):
  - Change the request URL from `http://localhost:3000/contact` to a **relative** URL, e.g. **`/api/contact`**, so it works on both local and Vercel:
    - `axios.post('/api/contact', data)`  
    - or `fetch(process.env.NEXT_PUBLIC_APP_URL + '/api/contact', { method: 'POST', ... })` if you need an absolute URL (e.g. from a different origin). Prefer relative `/api/contact` when the form is on the same app.

---

## 7. Security and rate limiting (recommended)

- **Validation:** Check required fields and basic email format; reject invalid payloads with `400`.
- **Rate limiting:** On Vercel you can use Vercel’s rate limit or a middleware to limit POSTs to `/api/contact` per IP (e.g. 5 per minute) to reduce abuse.
- **Secrets:** Never expose `SMTP_PASS` or other secrets to the client; keep them only in server-side env.

---

## 8. Vercel deployment

- Add the same env vars in **Vercel → Project → Settings → Environment Variables** (Production/Preview as needed).
- Redeploy so the new API route and env are active.
- If your SMTP provider blocks “less secure” logins, use App Passwords or provider-specific auth; for Gmail, an App Password is required.

---

## 9. Optional: add to `.env.example`

Add placeholders (no real credentials) so others know what to set:

```env
# Contact form – SMTP (optional)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
MAIL_FROM=noreply@yourdomain.com
MAIL_TO=info@yourdomain.com
```

---

## Storing submissions (admin stats & export)

To show contact form statistics and export data in the admin panel, submissions are also saved to Neon Postgres when `DATABASE_URL` is set. Run this **once** in the Neon SQL Editor (same project as CMS):

```sql
-- See frontend/scripts/init-contact-submissions.sql
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx ON contact_submissions (created_at DESC);
```

Then use **Admin → Contact** for stats, date filter, chart, and CSV export.

---

## Summary checklist

1. [ ] Choose SMTP provider and get host, port, user, password.
2. [ ] Add `SMTP_*` and `MAIL_*` to `.env.local` and Vercel.
3. [ ] Install `nodemailer` (and `@types/nodemailer`).
4. [ ] Create `app/api/contact/route.ts` (POST, validate body, send email via Nodemailer).
5. [ ] Update frontend to POST to `/api/contact` (relative URL).
6. [ ] (Optional) Run `init-contact-submissions.sql` in Neon to enable admin stats and export.
7. [ ] Test locally, then deploy and test on Vercel.
