import { neon } from "@neondatabase/serverless";

const DATABASE_URL = process.env.DATABASE_URL;

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  createdAt: string;
};

function getSql() {
  if (!DATABASE_URL) {
    throw new Error("Missing DATABASE_URL");
  }
  return neon(DATABASE_URL);
}

export async function saveSubmission(data: {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
}): Promise<ContactSubmission | null> {
  try {
    const sql = getSql();
    const rows = await sql`
      INSERT INTO contact_submissions (name, email, phone, subject, message)
      VALUES (${data.name}, ${data.email}, ${data.phone ?? null}, ${data.subject ?? null}, ${data.message})
      RETURNING id, name, email, phone, subject, message, created_at
    `;
    const r = (rows as { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; created_at: Date }[])[0];
    if (!r) return null;
    return {
      id: r.id,
      name: r.name,
      email: r.email,
      phone: r.phone,
      subject: r.subject,
      message: r.message,
      createdAt: new Date(r.created_at).toISOString(),
    };
  } catch {
    return null;
  }
}

export async function listSubmissions(options: {
  from?: string;
  to?: string;
  limit?: number;
  offset?: number;
}): Promise<{ items: ContactSubmission[]; total: number }> {
  const sql = getSql();
  const limit = Math.min(Math.max(options.limit ?? 50, 1), 200);
  const offset = Math.max(options.offset ?? 0, 0);
  const fromDate = options.from ? new Date(options.from) : null;
  const toDate = options.to ? new Date(options.to) : null;
  const hasFrom = fromDate && !Number.isNaN(fromDate.getTime());
  const hasTo = toDate && !Number.isNaN(toDate.getTime());

  let countRows: { c: number }[];
  let listRows: { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; created_at: Date }[];

  if (hasFrom && hasTo) {
    countRows = await sql`
      SELECT COUNT(*)::int AS c FROM contact_submissions
      WHERE created_at >= ${fromDate!.toISOString()}
        AND created_at <= ${toDate!.toISOString()}
    ` as { c: number }[];
    listRows = await sql`
      SELECT id, name, email, phone, subject, message, created_at
      FROM contact_submissions
      WHERE created_at >= ${fromDate!.toISOString()}
        AND created_at <= ${toDate!.toISOString()}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    ` as { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; created_at: Date }[];
  } else if (hasFrom) {
    countRows = await sql`
      SELECT COUNT(*)::int AS c FROM contact_submissions
      WHERE created_at >= ${fromDate!.toISOString()}
    ` as { c: number }[];
    listRows = await sql`
      SELECT id, name, email, phone, subject, message, created_at
      FROM contact_submissions
      WHERE created_at >= ${fromDate!.toISOString()}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    ` as { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; created_at: Date }[];
  } else if (hasTo) {
    countRows = await sql`
      SELECT COUNT(*)::int AS c FROM contact_submissions
      WHERE created_at <= ${toDate!.toISOString()}
    ` as { c: number }[];
    listRows = await sql`
      SELECT id, name, email, phone, subject, message, created_at
      FROM contact_submissions
      WHERE created_at <= ${toDate!.toISOString()}
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    ` as { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; created_at: Date }[];
  } else {
    countRows = await sql`SELECT COUNT(*)::int AS c FROM contact_submissions` as { c: number }[];
    listRows = await sql`
      SELECT id, name, email, phone, subject, message, created_at
      FROM contact_submissions
      ORDER BY created_at DESC
      LIMIT ${limit} OFFSET ${offset}
    ` as { id: string; name: string; email: string; phone: string | null; subject: string | null; message: string; created_at: Date }[];
  }

  const total = countRows[0]?.c ?? 0;
  const items = listRows.map((r) => ({
    id: r.id,
    name: r.name,
    email: r.email,
    phone: r.phone,
    subject: r.subject,
    message: r.message,
    createdAt: new Date(r.created_at).toISOString(),
  }));

  return { items, total };
}

/** Stats for chart: count per day in range. */
export async function getStats(options: { from: string; to: string }): Promise<{ date: string; count: number }[]> {
  const sql = getSql();
  const fromDate = new Date(options.from);
  const toDate = new Date(options.to);
  if (Number.isNaN(fromDate.getTime()) || Number.isNaN(toDate.getTime())) {
    return [];
  }

  const rows = await sql`
    SELECT DATE(created_at AT TIME ZONE 'UTC') AS day, COUNT(*)::int AS count
    FROM contact_submissions
    WHERE created_at >= ${fromDate.toISOString()}
      AND created_at <= ${toDate.toISOString()}
    GROUP BY DATE(created_at AT TIME ZONE 'UTC')
    ORDER BY day ASC
  `;
  return (rows as { day: string; count: number }[]).map((r) => ({
    date: r.day,
    count: r.count,
  }));
}

/** Total count and counts for this week / this month. */
export async function getCounts(): Promise<{ total: number; thisWeek: number; thisMonth: number }> {
  const sql = getSql();
  const now = new Date();
  const weekStart = new Date(now);
  weekStart.setDate(weekStart.getDate() - 7);
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);

  const [totalRow, weekRow, monthRow] = await Promise.all([
    sql`SELECT COUNT(*)::int AS c FROM contact_submissions`,
    sql`SELECT COUNT(*)::int AS c FROM contact_submissions WHERE created_at >= ${weekStart.toISOString()}`,
    sql`SELECT COUNT(*)::int AS c FROM contact_submissions WHERE created_at >= ${monthStart.toISOString()}`,
  ]);

  return {
    total: (totalRow as { c: number }[])[0]?.c ?? 0,
    thisWeek: (weekRow as { c: number }[])[0]?.c ?? 0,
    thisMonth: (monthRow as { c: number }[])[0]?.c ?? 0,
  };
}
