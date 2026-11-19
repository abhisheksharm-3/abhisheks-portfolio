import z from "zod";

/**
 * Kept out of data/contact.ts on purpose. That module is imported by the footer, so
 * anything it pulls in ships on every page; the schema is only needed where the form is.
 */
export const CONTACT_FORM_SCHEMA = z.object({
  name: z
    .string()
    .min(2, "a name, so i know who to reply to")
    .max(100, "that name is over 100 characters"),
  email: z.email("that email doesn't look right").max(254, "that email is over 254 characters"),
  message: z
    .string()
    .min(10, "a sentence or two, so i know what this is about")
    .max(5000, "that's over 5000 characters, trim it a little"),
});
