/**
 * @file Next.js API route for handling contact form submissions.
 *
 * This route validates incoming form data, renders a React-based email template,
 * and sends it using Nodemailer with Gmail OAuth2.
 */

import { NextRequest, NextResponse } from "next/server";
import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import React from "react";
import { ContactFormDataType } from "@/lib/types";
import { contactFormSchema } from "@/lib/config/contact";

/**
 * Gathers and validates required environment variables for the mail service.
 * Throws an error during server startup if any variables are missing.
 */
const getMailConfig = () => {
  const config = {
    user: process.env.MAIL_USER,
    clientId: process.env.MAIL_CLIENT_ID,
    clientSecret: process.env.MAIL_CLIENT_SECRET,
    refreshToken: process.env.MAIL_REFRESH_TOKEN,
    recipient: process.env.MY_MAIL,
  };

  const missingVars = Object.entries(config).filter(([, value]) => !value);
  if (missingVars.length > 0) {
    const missingKeys = missingVars.map(([key]) => key).join(", ");
    throw new Error(
      `Missing mail service environment variables: ${missingKeys}`,
    );
  }

  return config as Record<keyof typeof config, string>;
};

const mailConfig = getMailConfig();

/**
 * Reusable Nodemailer transporter instance configured with Gmail OAuth2.
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
 * Renders the email template and sends the contact email.
 * @param {ContactFormDataType} data - The validated form data.
 * @param {object} metadata - Additional request metadata.
 * @param {string} metadata.userAgent - The sender's user agent.
 * @param {string} metadata.referer - The request's referer header.
 * @returns {Promise<void>}
 */
const sendContactEmail = async (
  data: ContactFormDataType,
  metadata: { userAgent: string; referer: string },
) => {
  const emailHtml = await render(
    React.createElement(ContactEmailTemplate, {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      submittedAt: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
      }),
      userAgent: metadata.userAgent,
      referer: metadata.referer,
    }),
  );

  const mailOptions: nodemailer.SendMailOptions = {
    from: `"${data.name}" <${mailConfig.user}>`,
    to: mailConfig.recipient,
    replyTo: data.email,
    priority: "high",
    subject: `📩 New Portfolio Message: ${data.subject}`,
    html: emailHtml,
  };

  await transporter.sendMail(mailOptions);
};

/**
 * Handles POST requests to the contact API endpoint.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} A JSON response indicating success or failure.
 */
export const POST = async (request: NextRequest): Promise<NextResponse> => {
  try {
    const body = await request.json();
    const validation = contactFormSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid input.", details: validation.error.format() },
        { status: 400 },
      );
    }

    await sendContactEmail(validation.data, {
      userAgent: request.headers.get("user-agent") || "Unknown",
      referer: request.headers.get("referer") || "Unknown",
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error in contact API route:", error);
    return NextResponse.json(
      { error: "An internal server error occurred." },
      { status: 500 },
    );
  }
};
