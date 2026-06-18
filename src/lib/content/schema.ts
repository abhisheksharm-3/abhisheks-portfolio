import { z } from "zod"

export const PostFrontmatter = z.object({
  title: z.string().min(1).max(60),
  subhead: z.string().min(1).max(160),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "date must be YYYY-MM-DD"),
  updatedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  keywords: z.array(z.string()).length(6, "exactly 6 keywords required"),
  tags: z.array(z.string()).min(1).max(4),
  readingTime: z.number().int().min(1),
  type: z.enum(["technical", "essay"]),
  searchIntent: z.enum(["informational", "bofu", "commercial_investigation"]),
  draft: z.boolean(),
  faqs: z
    .array(
      z.object({
        question: z.string().min(10),
        answer: z.string().min(50),
      })
    )
    .min(4)
    .optional(),
  toc: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
        depth: z.literal(2),
      })
    )
    .optional(),
  relatedPosts: z
    .array(
      z.object({
        slug: z.string(),
        title: z.string(),
        readingTime: z.number(),
        date: z.string(),
      })
    )
    .max(3)
    .optional(),
}).refine(
  (data) => data.type === "essay" || (data.faqs && data.faqs.length >= 4),
  { message: "technical posts require at least 4 FAQs" }
)

export type PostFrontmatterType = z.infer<typeof PostFrontmatter>
