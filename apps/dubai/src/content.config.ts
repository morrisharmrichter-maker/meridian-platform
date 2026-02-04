import { defineCollection, z } from "astro:content";

const sourcesSchema = z.array(z.object({
  title: z.string(),
  url: z.string().url(),
  publisher: z.string().optional(),
  date: z.string().optional(),
})).default([]);

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),
    developer: z.string(),
    area: z.string().optional(),
    status: z.enum(["offplan", "ready"]).default("offplan"),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).optional(),
    golden_visa_eligible: z.boolean().default(false),
    sources: sourcesSchema,
    last_updated: z.coerce.date().optional(),
  }),
});

const developers = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),
    website: z.string().url().optional(),
    credibility_score: z.number().min(0).max(100).optional(),
    sources: sourcesSchema,
    last_updated: z.coerce.date().optional(),
  }),
});

export const collections = {
  projects,
  developers,
};
