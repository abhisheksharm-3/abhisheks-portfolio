import {
  Body, Container, Head, Html, Preview, Text, Section, Row, Column, Link, Font, Hr
} from "@react-email/components";
import * as React from "react";

// --- THEME ---
const theme = {
  colors: {
    primary: "#0969da", // A professional blue, similar to GitHub's
    text: "#1f2328",
    textSecondary: "#656d76",
    background: "#ffffff",
    backgroundSecondary: "#f6f8fa",
    border: "#d0d7de",
  },
  fonts: {
    sans: "Inter, sans-serif",
    serif: "Lora, serif",
  },
};

// --- STYLES ---
const main = { backgroundColor: theme.colors.backgroundSecondary, fontFamily: theme.fonts.sans };
const container = { maxWidth: "520px", margin: "0 auto", backgroundColor: theme.colors.background, borderRadius: "8px", border: `1px solid ${theme.colors.border}` };
const content = { padding: "32px" };
const title = { margin: "0 0 12px 0", fontSize: "24px", fontWeight: 600, color: theme.colors.text, fontFamily: theme.fonts.serif, fontStyle: 'italic' };
const paragraph = { color: theme.colors.textSecondary, fontSize: "15px", margin: "0 0 24px 0", lineHeight: 1.6 };
const tableLabel = { width: "100px", color: theme.colors.text, fontWeight: 500, padding: "4px 0", fontSize: "13px" };
const tableValue = { padding: "4px 0", fontSize: "14px", color: theme.colors.textSecondary };
const link = { color: theme.colors.primary, textDecoration: "none" };
const messageBox = { background: theme.colors.backgroundSecondary, borderRadius: "6px", padding: "20px", border: `1px solid ${theme.colors.border}`, margin: "24px 0" };
const footerText = { textAlign: "center" as const, fontSize: "12px", color: "#999999" };
const hr = { borderColor: theme.colors.border, margin: "20px 0" };

// --- PROPS TYPE ---
interface ContactEmailProps {
  name: string; email: string; subject: string; message: string;
  submittedAt: string; userAgent: string; referer: string;
}

/**
 * Renders a branded, theme-aligned email template for contact form submissions.
 * @returns {JSX.Element} The rendered email component.
 */
export const ContactEmailTemplate = ({ name, email, subject, message, submittedAt, userAgent, referer }: ContactEmailProps) => {
  const previewText = `New message from ${name}: ${subject}`;

  const details = [
    { label: "Name", value: name },
    { label: "Email", value: <Link href={`mailto:${email}`} style={link}>{email}</Link> },
    { label: "Subject", value: subject },
    { label: "Submitted", value: submittedAt },
    { label: "Referrer", value: referer },
  ];

  return (
    <Html>
      <Head>
        <Font fontFamily="Inter" fallbackFontFamily="sans-serif" webFont={{ url: "https://rsms.me/inter/inter.css", format: "woff2" }} />
        <Font fontFamily="Lora" fallbackFontFamily="serif" webFont={{ url: "https://fonts.gstatic.com/s/lora/v26/0QI6MX1D_JOuGQbT0g.woff2", format: "woff2" }} />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={title}>New Portfolio Message</Text>
            <Text style={paragraph}>A new message was submitted via your portfolio&apos;s contact form. Here are the details:</Text>
            
            {/* --- Details Table --- */}
            {details.map(({ label, value }) => (
              <Row key={label}>
                <Column style={tableLabel}>{label}</Column>
                <Column style={tableValue}>{value}</Column>
              </Row>
            ))}

            {/* --- Message Box --- */}
            <Section style={messageBox}>
              <Text style={{ ...tableValue, whiteSpace: 'pre-line' }}>{message}</Text>
            </Section>

            <Hr style={hr} />
            <Text style={footerText}>This message was sent from abhisheksan.com</Text>
            <Text style={{...footerText, color: '#b2b2b2', fontSize: '11px'}}>User Agent: {userAgent}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmailTemplate;