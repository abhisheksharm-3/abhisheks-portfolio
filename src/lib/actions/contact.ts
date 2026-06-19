"use server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import React from "react";
import { CONTACT_FORM_SCHEMA } from "@/data/contact";
import type { ContactFormDataType } from "@/lib/types/components";
import type {
    ContactAntiSpamType,
    MailConfigType,
    ContactSubmissionResultType,
} from "@/lib/types/contact";

const MIN_SUBMIT_MS = 2_000;

const sanitizeHeader = (value: string): string =>
    value.replace(/[\r\n]+/g, " ").trim();

const getMailConfig = (): MailConfigType => {
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

    return config as MailConfigType;
};

let _transporter: nodemailer.Transporter | null = null;

const getTransporter = (): nodemailer.Transporter => {
    if (_transporter) return _transporter;
    const { user, clientId, clientSecret, refreshToken } = getMailConfig();
    _transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            type: "OAuth2",
            user,
            clientId,
            clientSecret,
            refreshToken,
        },
    } as nodemailer.TransportOptions);
    return _transporter;
};

export async function submitContactForm(
    data: ContactFormDataType,
    antiSpam: ContactAntiSpamType
): Promise<ContactSubmissionResultType> {
    const validation = CONTACT_FORM_SCHEMA.safeParse(data);

    if (!validation.success) {
        return { error: "Invalid input. Please check your form data." };
    }

    const isAutomated =
        antiSpam.honeypot.trim() !== "" ||
        Date.now() - antiSpam.renderedAt < MIN_SUBMIT_MS;

    if (isAutomated) {
        console.warn("Contact form: submission rejected by anti-spam gate");
        return { isSuccess: true, message: "Email sent successfully." };
    }

    let mailConfig: MailConfigType;
    try {
        mailConfig = getMailConfig();
    } catch (error) {
        console.error("Contact form: mail service is not configured", error);
        return { error: "Mail service is not configured. Please email directly at abhishek@abhisheksan.com" };
    }

    const safeName = sanitizeHeader(validation.data.name).replace(/["<>]/g, "");
    const safeSubject = sanitizeHeader(validation.data.subject);

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

    try {
        await getTransporter().sendMail({
            from: `"${safeName}" <${mailConfig.user}>`,
            to: mailConfig.recipient,
            replyTo: validation.data.email,
            priority: "high",
            subject: `New Portfolio Message: ${safeSubject}`,
            html: emailHtml,
        });
    } catch (error) {
        console.error("Contact form: failed to send email", error);
        return { error: "Failed to send. Please email directly at abhishek@abhisheksan.com" };
    }

    return { isSuccess: true, message: "Email sent successfully." };
}
