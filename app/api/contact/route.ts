import { appendFile, mkdir } from "node:fs/promises";
import { resolve4 } from "node:dns/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

type ContactPayload = {
  fullName?: string;
  workEmail?: string;
  companyName?: string;
  requiredService?: string;
  projectDetails?: string;
};

function clean(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

async function appendLog(fileName: string, entry: Record<string, string>) {
  const logDir = path.join(process.cwd(), "docs");
  const logPath = path.join(logDir, fileName);
  await mkdir(logDir, { recursive: true });
  await appendFile(logPath, `${JSON.stringify({ ...entry, savedAt: new Date().toISOString() })}\n`, "utf8");
}

async function saveInquiryLocally(entry: Record<string, string>) {
  await appendLog("contact-inquiries.jsonl", entry);
}

async function saveEmailError(entry: Record<string, string>) {
  await appendLog("contact-email-errors.jsonl", entry);
}

async function resolveIpv4Host(host: string) {
  try {
    const addresses = await resolve4(host);
    return addresses[0] || host;
  } catch {
    return host;
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    const fullName = clean(body.fullName);
    const workEmail = clean(body.workEmail);
    const companyName = clean(body.companyName);
    const requiredService = clean(body.requiredService);
    const projectDetails = clean(body.projectDetails);

    if (!fullName || !workEmail || !requiredService || !projectDetails) {
      return NextResponse.json({ error: "Please fill in all required fields." }, { status: 400 });
    }

    const inquiry = {
      fullName,
      workEmail,
      companyName: companyName || "Not provided",
      requiredService,
      projectDetails,
    };

    const smtpHost = process.env.SMTP_HOST;
    const smtpPort = Number(process.env.SMTP_PORT || 587);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const smtpSecure = process.env.SMTP_SECURE === "true";
    const smtpFrom = process.env.SMTP_FROM || smtpUser;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || smtpUser;

    const missingEnv = [
      !smtpHost ? "SMTP_HOST" : "",
      !smtpUser ? "SMTP_USER" : "",
      !smtpPass ? "SMTP_PASS" : "",
    ].filter(Boolean);

    if (missingEnv.length > 0) {
      await saveInquiryLocally(inquiry);
      await saveEmailError({
        ...inquiry,
        reason: `Missing env: ${missingEnv.join(", ")}`,
      });

      return NextResponse.json({
        ok: true,
        emailed: false,
        message: "Your query was saved on the website, but email delivery is not configured yet.",
      });
    }

    const smtpConfig = {
      host: smtpHost!,
      user: smtpUser!,
      pass: smtpPass!,
    };

    const resolvedHost = await resolveIpv4Host(smtpConfig.host);

    const transporter = nodemailer.createTransport({
      host: resolvedHost,
      port: smtpPort,
      secure: smtpSecure,
      requireTLS: !smtpSecure,
      auth: {
        user: smtpConfig.user,
        pass: smtpConfig.pass,
      },
      tls: {
        servername: smtpConfig.host,
      },
      connectionTimeout: 4000,
      greetingTimeout: 4000,
      socketTimeout: 4000,
    });

    const subject = `Project Inquiry - ${requiredService}`;
    const text = [
      "New inquiry received from the website.",
      "",
      `Full Name: ${fullName}`,
      `Work Email: ${workEmail}`,
      `Company Name: ${companyName || "Not provided"}`,
      `Required Service: ${requiredService}`,
      "",
      "Project Details:",
      projectDetails,
    ].join("\n");

    const html = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #0f172a;">
        <h2 style="margin-bottom: 16px;">New Website Inquiry</h2>
        <p><strong>Full Name:</strong> ${escapeHtml(fullName)}</p>
        <p><strong>Work Email:</strong> ${escapeHtml(workEmail)}</p>
        <p><strong>Company Name:</strong> ${escapeHtml(companyName || "Not provided")}</p>
        <p><strong>Required Service:</strong> ${escapeHtml(requiredService)}</p>
        <p><strong>Project Details:</strong></p>
        <p style="white-space: pre-wrap;">${escapeHtml(projectDetails)}</p>
      </div>
    `;

    try {
      await transporter.sendMail({
        from: smtpFrom,
        to: receiverEmail,
        replyTo: workEmail,
        subject,
        text,
        html,
      });

      return NextResponse.json({
        ok: true,
        emailed: true,
        message: "Your query has been sent successfully.",
      });
    } catch (error) {
      const reason = error instanceof Error ? error.message : "Unknown SMTP error";
      console.error("Contact form email failed, saving locally instead:", error);
      await saveInquiryLocally(inquiry);
      await saveEmailError({
        ...inquiry,
        reason,
      });

      return NextResponse.json({
        ok: true,
        emailed: false,
        message: "Your query was saved on the website, but email was not delivered to the inbox.",
      });
    }
  } catch (error) {
    console.error("Contact form submission failed:", error);
    return NextResponse.json(
      { error: "Unable to send your query right now. Please try again in a moment." },
      { status: 500 }
    );
  }
}
