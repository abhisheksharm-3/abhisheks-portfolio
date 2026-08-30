import z from "zod";

/**
 * Kept out of data/contact.ts on purpose. That module is imported by the footer, so
 * anything it pulls in ships on every page; the schema is only needed where the form is.
 */
export const CONTACT_FORM_SCHEMA = z.object({
  name: z.string().min(2, "Name must be at least 2 characters.").max(100),
  email: z.email("Please enter a valid email address.").max(254),
  subject: z.string().min(3, "Subject must be at least 3 characters.").max(200),
  message: z.string().min(10, "Message must be at least 10 characters.").max(5000),
});
