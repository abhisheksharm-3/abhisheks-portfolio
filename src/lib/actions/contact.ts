"use server";

import { render } from "@react-email/render";
import nodemailer from "nodemailer";
import { ContactEmailTemplate } from "@/components/emails/ContactEmailTemplate";
import React from "react";
import { CONTACT_FORM_SCHEMA } from "@/data/contact";
import type {
    ContactFormDataType,
    MailConfigType,
    ContactSubmissionResultType,
} from "@/lib/types";

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
    data: ContactFormDataType
): Promise<ContactSubmissionResultType> {
    const validation = CONTACT_FORM_SCHEMA.safeParse(data);

    if (!validation.success) {
        return { error: "Invalid input. Please check your form data." };
    }

    let mailConfig: MailConfigType;
    try {
        mailConfig = getMailConfig();
    } catch {
        return { error: "Mail service is not configured. Please email directly at abhishek@abhisheksan.com" };
    }

    const safeName = validation.data.name.replace(/[\r\n<>"]/g, "").trim();

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
            subject: `New Portfolio Message: ${validation.data.subject}`,
            html: emailHtml,
        });
    } catch {
        return { error: "Failed to send. Please email directly at abhishek@abhisheksan.com" };
    }

    return { success: true, message: "Email sent successfully." };
}
