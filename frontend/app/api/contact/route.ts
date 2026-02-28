import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { saveSubmission } from "@/lib/contact-submissions";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateBody(body: unknown): { name: string; email: string; phone?: string; subject?: string; message: string } | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const name = typeof b.name === "string" ? b.name.trim() : "";
  const email = typeof b.email === "string" ? b.email.trim() : "";
  const message = typeof b.message === "string" ? b.message.trim() : "";
  if (!name || !email || !message) return null;
  if (!EMAIL_REGEX.test(email)) return null;
  return {
    name,
    email,
    message,
    phone: typeof b.phone === "string" ? b.phone.trim() : undefined,
    subject: typeof b.subject === "string" ? b.subject.trim() : undefined,
  };
}

export async function POST(request: NextRequest) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const data = validateBody(body);
  if (!data) {
    return NextResponse.json(
      { error: "Name, email, and message are required. Email must be valid." },
      { status: 400 }
    );
  }

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.MAIL_FROM;
  const to = process.env.MAIL_TO;

  if (!host || !user || !pass || !to) {
    console.error("[contact] Missing SMTP config: SMTP_HOST, SMTP_USER, SMTP_PASS, MAIL_TO required.");
    return NextResponse.json(
      { error: "Contact form is not configured. Please try again later." },
      { status: 503 }
    );
  }

  const portNum = port ? parseInt(port, 10) : 587;
  const secure = process.env.SMTP_SECURE === "true";

  const transporter = nodemailer.createTransport({
    host,
    port: Number.isNaN(portNum) ? 587 : portNum,
    secure,
    auth: { user, pass },
  });

  const subject = data.subject
    ? `Contact form: ${data.subject}`
    : "Contact form submission";
  const fromAddr = from || user;
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    data.phone ? `Phone: ${data.phone}` : "",
    data.subject ? `Subject: ${data.subject}` : "",
    "",
    "Message:",
    data.message,
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <p><strong>Name:</strong> ${escapeHtml(data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(data.email)}</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${data.subject ? `<p><strong>Subject:</strong> ${escapeHtml(data.subject)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
  `.trim();

  try {
    await transporter.sendMail({
      from: fromAddr,
      to,
      subject,
      text,
      html,
    });
    if (process.env.DATABASE_URL) {
      try {
        await saveSubmission({
          name: data.name,
          email: data.email,
          phone: data.phone ?? null,
          subject: data.subject ?? null,
          message: data.message,
        });
      } catch (e) {
        console.error("[contact] Save submission failed:", e);
      }
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Send failed:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
