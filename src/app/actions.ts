"use server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import React from "react";
import { CONTACT_FORM_SCHEMA } from "@/data/contact";
import { ContactFormDataType } from "@/lib/types";

/**
 * Mail configuration with environment variable validation
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
            `Missing mail service environment variables: ${missingKeys}`
        );
    }

    return config as Record<keyof typeof config, string>;
};

const mailConfig = getMailConfig();

/**
 * Reusable Nodemailer transporter configured with Gmail OAuth2
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
 * Server Action to submit contact form
 * Replaces the /api/contact route with a more integrated React 19 pattern
 * 
 * @param data - The validated contact form data
 * @returns Result object with success or error status
 */
export async function submitContactForm(
    data: ContactFormDataType
): Promise<{ success?: boolean; message?: string; error?: string }> {
    // Validate input server-side
    const validation = CONTACT_FORM_SCHEMA.safeParse(data);

    if (!validation.success) {
        return {
            error: "Invalid input. Please check your form data."
        };
    }

    try {
        const emailHtml = await render(
            React.createElement(ContactEmailTemplate, {
                name: validation.data.name,
                email: validation.data.email,
                subject: validation.data.subject,
                message: validation.data.message,
                submittedAt: new Date().toLocaleString("en-IN", {
                    timeZone: "Asia/Kolkata",
                }),
                userAgent: "Server Action",
                referer: "Direct submission",
            })
        );

        await transporter.sendMail({
            from: `"${validation.data.name}" <${mailConfig.user}>`,
            to: mailConfig.recipient,
            replyTo: validation.data.email,
            priority: "high",
            subject: `📩 New Portfolio Message: ${validation.data.subject}`,
            html: emailHtml,
        });

        return {
            success: true,
            message: "Email sent successfully."
        };
    } catch (error) {
        console.error("Error sending contact email:", error);
        return {
            error: "An internal server error occurred. Please try again later."
        };
    }
}
