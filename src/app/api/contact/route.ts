import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { z } from "zod";
import * as React from "react";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: process.env.MAIL_USER!,
    clientId: process.env.MAIL_CLIENT_ID!,
    clientSecret: process.env.MAIL_CLIENT_SECRET!,
    refreshToken: process.env.MAIL_REFRESH_TOKEN!,
  },
} as nodemailer.TransportOptions);

const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  subject: z.string().min(5, "Subject must be at least 5 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const validation = contactFormSchema.safeParse(reqBody);

    if (!validation.success) {
      return NextResponse.json({ error: "Invalid input.", details: validation.error.format() }, { status: 400 });
    }

    const { name, email, subject, message } = validation.data;

    const emailHtml = await render( // Added 'await' here
      React.createElement(ContactEmailTemplate, {
        name: name,
        email: email,
        subject: subject,
        message: message,
        submittedAt: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        userAgent: request.headers.get("user-agent") || "Unknown",
        referer: request.headers.get("referer") || "Unknown",
      })
    );

    const mailOptions: nodemailer.SendMailOptions = {
      from: `"${name}" <${process.env.MAIL_USER!}>`,
      to: process.env.MY_MAIL!,
      replyTo: email,
      priority: "high",
      subject: `📩 New Portfolio Message: ${subject}`,
      html: emailHtml,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Email sent successfully" }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}