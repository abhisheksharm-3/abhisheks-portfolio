import z from "zod";

/**
 * Animation timing configurations for the Contact CTA section.
 */
export const CONTACT_ANIMATION_CONFIG = {
  section: { duration: 1 },
  header: { duration: 0.8, delay: 0.4 },
  content: { duration: 0.8, delay: 0.3 },
  buttons: { duration: 0.5, delay: 0.6 },
  contactInfo: { duration: 0.8, delay: 0.9 },
  channels: { duration: 0.8, delay: 1 },
  channelItem: { duration: 0.5, baseDelay: 1.1, stagger: 0.1 },
  pathAnimation: { duration: 2, delay: 0.5 },
  hoverTransition: { duration: 0.8 },
} as const;

/**
 * Zod schema for validating the contact form data.
 * Defines the shape and constraints for incoming requests.
 */
export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.email("Please enter a valid email address."),
  subject: z.string().min(3, "Subject must be at least 3 characters."),
  message: z.string().min(10, "Message must be at least 10 characters."),
});
