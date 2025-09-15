import { TypeContactEmailProps } from "@/lib/types";
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
} from "@react-email/components";
import * as React from "react";

const main = {
  backgroundColor: "#f6f8fa",
  fontFamily: "'Inter', system-ui, sans-serif",
};

const container = {
  maxWidth: "480px",
  margin: "0 auto",
  backgroundColor: "#ffffff",
  borderRadius: "16px",
  border: "1px solid #e5e7eb",
  boxShadow: "0 8px 32px 0 rgba(0,0,0,0.08)",
};

const content = { padding: "36px 32px 28px 32px" };
const title = { margin: "0 0 4px 0", fontSize: "1.45rem", fontWeight: 600, color: "#18181b" };
const paragraph = { color: "#52525b", fontSize: "15px", margin: "0 0 20px 0" };
const tableLabel = { color: "#6366f1", fontWeight: 500, padding: "4px 0", fontSize: "13px" };
const tableValue = { padding: "4px 0", fontSize: "13px", color: "#18181b" };
const messageBox = {
  background: "#f3f4f6",
  borderRadius: "8px",
  padding: "18px 16px",
  border: "1px solid #e5e7eb",
  margin: "22px 0 16px 0",
};

export const ContactEmailTemplate = ({
  name,
  email,
  subject,
  message,
  submittedAt,
  userAgent,
  referer,
}: TypeContactEmailProps) => {
  const previewText = `New message from ${name}: ${subject}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={content}>
            <Text style={title}>You&apos;ve got a new message</Text>
            <Text style={paragraph}>A new message was submitted via your portfolio&apos;s contact form.</Text>

            {/* --- Details Table --- */}
            <Row>
              <Column style={tableLabel}>Name:</Column>
              <Column style={tableValue}>{name}</Column>
            </Row>
            <Row>
              <Column style={tableLabel}>Email:</Column>
              <Column style={tableValue}>
                <Link href={`mailto:${email}`} style={{ color: "#6366f1", textDecoration: "none" }}>
                  {email}
                </Link>
              </Column>
            </Row>
            <Row>
              <Column style={tableLabel}>Subject:</Column>
              <Column style={tableValue}>{subject}</Column>
            </Row>
            <Row>
              <Column style={tableLabel}>Submitted:</Column>
              <Column style={tableValue}>{submittedAt}</Column>
            </Row>
            <Row>
              <Column style={tableLabel}>Referrer:</Column>
              <Column style={tableValue}>{referer}</Column>
            </Row>

            {/* --- Message Box --- */}
            <Section style={messageBox}>
              <Text style={{ ...tableLabel, marginBottom: '6px' }}>Message:</Text>
              <Text style={{ ...tableValue, whiteSpace: 'pre-line', lineHeight: 1.7 }}>{message}</Text>
            </Section>

            <Text style={{ marginTop: '28px', textAlign: 'center', fontSize: '11px', color: '#a1a1aa' }}>
              User Agent: {userAgent}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
};

export default ContactEmailTemplate;