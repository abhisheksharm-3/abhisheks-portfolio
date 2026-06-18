/** Mail service configuration */
export interface MailConfigType {
    user: string;
    clientId: string;
    clientSecret: string;
    refreshToken: string;
    recipient: string;
}

/** Contact form submission result */
export interface ContactSubmissionResultType {
    isSuccess?: boolean;
    message?: string;
    error?: string;
}

/** Anti-spam metadata accompanying a contact form submission */
export interface ContactAntiSpamType {
    /** Hidden honeypot value; non-empty indicates an automated submission */
    honeypot: string;
    /** Epoch milliseconds when the form mounted, used to reject instant submissions */
    renderedAt: number;
}
