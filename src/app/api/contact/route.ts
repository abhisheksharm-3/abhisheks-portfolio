import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  // @ts-expect-error nodemailer types don't recognize OAuth2 options
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // use TLS
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER!,
    pass: process.env.MAIL_PASS!,
    clientId: process.env.MAIL_CLIENT_ID!,
    clientSecret: process.env.MAIL_CLIENT_SECRET!,
    refreshToken: process.env.MAIL_REFRESH_TOKEN!,
  },
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const {
      name: senderName,
      email: senderEmail,
      subject: senderSubject,
      message: senderMessage,
    } = reqBody;

const mailOptions: nodemailer.SendMailOptions = {
  from: `"${senderName}" <${senderEmail}>`,
  to: process.env.MY_MAIL!,
  replyTo: senderEmail,
  priority: "high",
  subject: `📩 ${senderSubject || "New Contact Form Submission"}`,
  html: `
  <body style="margin:0;background:#f6f8fa;padding:32px 0;font-family:'Inter',system-ui,sans-serif;">
    <div style="max-width:480px;margin:0 auto;background:#fff;border-radius:16px;box-shadow:0 8px 32px 0 #0002;border:1px solid #e5e7eb;">
      <div style="padding:36px 32px 28px 32px;">
        <div style="display:flex;align-items:center;gap:8px;margin-bottom:18px;">
          <span style="display:inline-block;width:22px;height:22px;border-radius:6px;background:#6366f1cc;display:flex;align-items:center;justify-content:center;">
            <svg width="12" height="12" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="10" fill="#fff" fill-opacity="0.18"/><circle cx="10" cy="10" r="5" fill="#6366F1"/></svg>
          </span>
          <span style="font-size:12px;letter-spacing:0.05em;color:#6366f1;font-weight:500;text-transform:uppercase;">Contact Form Submission</span>
        </div>
        <h2 style="margin:0 0 4px 0;font-size:1.45rem;font-weight:600;color:#18181b;font-family:inherit;">You've got a new message</h2>
        <div style="height:2px;width:48px;background:linear-gradient(90deg,#6366f180,#6366F1 40%,#6366f140);border-radius:1px;margin:12px 0 24px 0;"></div>
        <p style="color:#52525b;font-size:15px;margin:0 0 20px 0;">Hi, you received a new message from your portfolio website. Details below:</p>
        <table style="width:100%;margin-bottom:18px;">
          <tr>
            <td style="color:#6366f1;font-weight:500;padding:6px 0 2px 0;font-size:13px;">Name:</td>
            <td style="padding:6px 0 2px 0;font-size:13px;color:#18181b;">${senderName || "Anonymous"}</td>
          </tr>
          <tr>
            <td style="color:#6366f1;font-weight:500;padding:6px 0 2px 0;font-size:13px;">Email:</td>
            <td style="padding:6px 0 2px 0;font-size:13px;">
              <a href="mailto:${senderEmail}" style="color:#6366f1;text-decoration:none;">${senderEmail}</a>
            </td>
          </tr>
          <tr>
            <td style="color:#6366f1;font-weight:500;padding:6px 0 2px 0;font-size:13px;">Subject:</td>
            <td style="padding:6px 0 2px 0;font-size:13px;color:#18181b;">${senderSubject || "(No subject)"}</td>
          </tr>
        </table>
        <div style="margin:22px 0 16px 0;">
          <div style="background:#f3f4f6;border-radius:8px;padding:18px 16px;border:1px solid #e5e7eb;">
            <span style="display:block;color:#6366f1;font-size:13px;font-weight:500;margin-bottom:6px;">Message:</span>
            <div style="color:#18181b;font-size:15px;white-space:pre-line;line-height:1.7;">
              ${senderMessage.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>")}
            </div>
          </div>
        </div>
        <div style="margin-top:28px;text-align:center;">
          <span style="font-size:11px;color:#a1a1aa;">This message was sent via your portfolio's contact form.</span>
        </div>
      </div>
    </div>
  </body>
  `,
};

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const mailResponse = await transporter.sendMail(mailOptions);

    // Log success
    // console.log("Email sent successfully:", mailResponse);

    return NextResponse.json(
      { success: true, message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    // Log error
    console.error("Error sending email:", error);

    // Return appropriate error response
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 }
    );
  }
}