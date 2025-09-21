import { ContactEmailPropsType } from "@/lib/types";
import {
  Body,
  Container,
  Head,
  Html,
  Preview,
  Text,
  Section,
  Row,
  Column,
  Link,
  Font,
  Hr,
} from "@react-email/components";
import * as React from "react";

/**
 * Design tokens for the email template.
 */
const theme = {
  colors: {
    primary: "#0969da",
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

/**
 * Plain JavaScript objects for styling the email components.
 */
const styles = {
  main: {
    backgroundColor: theme.colors.backgroundSecondary,
    fontFamily: theme.fonts.sans,
  },
  container: {
    maxWidth: "520px",
    margin: "0 auto",
    backgroundColor: theme.colors.background,
    borderRadius: "8px",
    border: `1px solid ${theme.colors.border}`,
  },
  content: { padding: "32px" },
  title: {
    margin: "0 0 12px 0",
    fontSize: "24px",
    fontWeight: 600,
    color: theme.colors.text,
    fontFamily: theme.fonts.serif,
    fontStyle: "italic",
  },
  paragraph: {
    color: theme.colors.textSecondary,
    fontSize: "15px",
    margin: "0 0 24px 0",
    lineHeight: 1.6,
  },
  tableLabel: {
    width: "100px",
    color: theme.colors.text,
    fontWeight: 500,
    padding: "4px 0",
    fontSize: "13px",
  },
  tableValue: {
    padding: "4px 0",
    fontSize: "14px",
    color: theme.colors.textSecondary,
  },
  link: { color: theme.colors.primary, textDecoration: "none" },
  messageBox: {
    background: theme.colors.backgroundSecondary,
    borderRadius: "6px",
    padding: "20px",
    border: `1px solid ${theme.colors.border}`,
    margin: "24px 0",
  },
  footerText: {
    textAlign: "center" as const,
    fontSize: "12px",
    color: "#999999",
  },
  footerMetaText: {
    textAlign: "center" as const,
    fontSize: "11px",
    color: "#b2b2b2",
  },
  hr: { borderColor: theme.colors.border, margin: "20px 0" },
};

/**
 * Renders a branded, theme-aligned email template for contact form submissions.
 * @param {ContactEmailPropsType} props The properties for the email template.
 * @returns {JSX.Element} The rendered email component.
 */
export const ContactEmailTemplate = ({
  name,
  email,
  subject,
  message,
  submittedAt,
  userAgent,
  referer,
}: ContactEmailPropsType) => {
  const previewText = `New message from ${name}: ${subject}`;

  const details = [
    { label: "Name", value: name },
    {
      label: "Email",
      value: (
        <Link href={`mailto:${email}`} style={styles.link}>
          {email}
        </Link>
      ),
    },
    { label: "Subject", value: subject },
    { label: "Submitted", value: submittedAt },
    { label: "Referrer", value: referer },
  ];

  return (
    <Html>
      <Head>
        <Font
          fontFamily="Inter"
          fallbackFontFamily="sans-serif"
          webFont={{ url: "https://rsms.me/inter/inter.css", format: "woff2" }}
        />
        <Font
          fontFamily="Lora"
          fallbackFontFamily="serif"
          webFont={{
            url: "https://fonts.gstatic.com/s/lora/v26/0QI6MX1D_JOuGQbT0g.woff2",
            format: "woff2",
          }}
        />
      </Head>
      <Preview>{previewText}</Preview>
      <Body style={styles.main}>
        <Container style={styles.container}>
          <Section style={styles.content}>
            <Text style={styles.title}>New Portfolio Message</Text>
            <Text style={styles.paragraph}>
              A new message was submitted via your portfolio&apos;s contact
              form. Here are the details:
            </Text>

            {details.map(({ label, value }) => (
              <Row key={label}>
                <Column style={styles.tableLabel}>{label}</Column>
                <Column style={styles.tableValue}>{value}</Column>
              </Row>
            ))}

            <Section style={styles.messageBox}>
              <Text style={{ ...styles.tableValue, whiteSpace: "pre-line" }}>
                {message}
              </Text>
            </Section>

            <Hr style={styles.hr} />
            <Text style={styles.footerText}>
              This message was sent from abhisheksan.com
            </Text>
            <Text style={styles.footerMetaText}>User Agent: {userAgent}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};