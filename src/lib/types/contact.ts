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
    success?: boolean;
    message?: string;
    error?: string;
}
