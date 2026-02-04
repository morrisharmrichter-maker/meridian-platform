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

    brand_partner: z.string().optional(),                 // Mercedes-Benz
    launch_year: z.number().optional(),
    handover_year: z.number().optional(),

    yield_range: z.string().optional(),                   // "4-6%"
    price_range: z.string().optional(),                   // "AED 3M-20M+"
    floors: z.number().optional(),                        // 65

    unit_types: z.array(z.object({
      label: z.string(),                                  // "2-3 Bedroom Apartments"
      price: z.string().optional(),                        // "AED 3M-6M"
      yield: z.string().optional(),                        // "5-6%"
      notes: z.string().optional()
    })).default([]),

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

const reports = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),

    report_type: z.enum(["quarterly", "annual", "special"]).default("quarterly"),
    year: z.number(),
    quarter: z.enum(["Q1","Q2","Q3","Q4"]).optional(),

    published_date: z.coerce.date().optional(),
    page_count: z.number().optional(),
    file_format: z.string().default("PDF"),

    status: z.enum(["coming_soon", "available"]).default("coming_soon"),
    pdf_url: z.string().url().optional(),

    summary: z.string(),
    sources: sourcesSchema,
    last_updated: z.coerce.date().optional(),
  }),
});

const developer_reports = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),

    developer_id: z.string(), // must match developers.id

    rating: z.string(),       // "AAA", "AA", "A", "BBB"
    risk_level: z.string(),   // "Minimal Risk"
    published_date: z.coerce.date().optional(),
    status: z.enum(["coming_soon", "available"]).default("coming_soon"),

    summary: z.string(),

    metrics: z.object({
      financial_health: z.string(),
      on_time_delivery: z.string(),
      quality_assessment: z.string(),
      customer_satisfaction: z.string().optional(),
      risk_profile: z.string(),
    }),

    sources: sourcesSchema,
    last_updated: z.coerce.date().optional(),
  }),
});

const guides = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),

    category: z.enum(["tax", "legal", "visa", "finance"]).default("legal"),
    status: z.enum(["coming_soon", "available"]).default("coming_soon"),

    summary: z.string(),

    bullets: z.array(z.string()).default([]),

    published_date: z.coerce.date().optional(),
    last_updated: z.coerce.date().optional(),

    sources: sourcesSchema,
  }),
});

const policies = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    id: z.string(),

    authority: z.enum(["DLD", "RERA", "Dubai Municipality", "UAE Central Bank", "Other"]).default("Other"),
    section: z.string(), // e.g. "Dubai Land Department (DLD) Regulations"

    summary: z.string(),

    bullets: z.array(z.string()).default([]),

    updated_label: z.string().optional(), // "Updated January 2026"
    status: z.enum(["coming_soon", "available"]).default("coming_soon"),

    sources: sourcesSchema,
    last_updated: z.coerce.date().optional(),
  }),
});


export const collections = {
  projects,
  developers,
  reports,
  developer_reports,
  guides,
  policies,
};



