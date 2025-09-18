import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { z } from "zod";
import * as React from "react";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";

// --- Configuration ---

/**
 * Configuration object for the email service.
 * It's crucial to ensure all environment variables are set.
 */
const mailConfig = {
  user: process.env.MAIL_USER,
  clientId: process.env.MAIL_CLIENT_ID,
  clientSecret: process.env.MAIL_CLIENT_SECRET,
  refreshToken: process.env.MAIL_REFRESH_TOKEN,
  recipient: process.env.MY_MAIL,
};

// Validate that all required environment variables are present on startup.
const missingEnvVars = Object.entries(mailConfig).filter(([, value]) => !value);
if (missingEnvVars.length > 0) {
  const missingKeys = missingEnvVars.map(([key]) => key).join(", ");
  throw new Error(
    `Missing required environment variables for mail service: ${missingKeys}`
  );
}

/**
 * Nodemailer transporter configured with Gmail OAuth2.
 * This instance is created once and reused for all email sending operations.
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  auth: {
    type: "OAuth2",
    user: mailConfig.user,
    clientId: mailConfig.clientId,
    clientSecret: mailConfig.clientSecret,
    refreshToken: mailConfig.refreshToken,
  },
} as nodemailer.TransportOptions);

/**
 * Zod schema for validating the contact form data.
 * Defines the shape and constraints of the expected input.
 */
const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});

// Infer the type from the Zod schema for strong type-safety.
type ContactFormData = z.infer<typeof contactFormSchema>;

// --- Helper Function ---

/**
 * Renders the React Email template and sends the email.
 * @param {ContactFormData} data The validated form data.
 * @param {object} metadata Additional metadata from the request.
 * @param {string} metadata.userAgent The user-agent of the sender.
 * @param {string} metadata.referer The referer header from the request.
 */
const sendContactEmail = async (
  data: ContactFormData,
  metadata: { userAgent: string; referer: string }
) => {
  const { name, email, subject, message } = data;
  const emailHtml = await render(
    React.createElement(ContactEmailTemplate, {
      name: name,
      email: email,
      subject: subject,
      message: message,
      submittedAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      userAgent: metadata.userAgent,
      referer: metadata.referer,
    })
  );

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"${name}" <${mailConfig.user}>`,
    to: mailConfig.recipient,
    replyTo: email,
    priority: "high",
    subject: `📩 New Portfolio Message: ${subject}`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};

// --- API Route Handler ---

/**
 * Handles POST requests for the contact form.
 * It validates the incoming data, triggers the email sending process,
 * and returns an appropriate JSON response.
 * @param {NextRequest} request The incoming Next.js request object.
 * @returns {Promise<NextResponse>} The response to be sent to the client.
 */
export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input.", details: validation.error.format() },
        { status: 400 }
      );
    }

    await sendContactEmail(validation.data, {
      userAgent: request.headers.get("user-agent") || "Unknown",
      referer: request.headers.get("referer") || "Unknown",
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    // Return a generic error to avoid exposing implementation details.
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 }
    );
  }
};