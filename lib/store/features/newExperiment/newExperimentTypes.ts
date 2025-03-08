import { z } from 'zod';

const MarketingHypothesisSchema = z.object({
    id: z.string(), // ❌ Remove `format` or any non-standard properties
    hypothesis: z.string(),
    hypothesisAlias: z.string(),
    rationale: z.string(),
    channels: z.array(z.enum(["meta", "google"])), // ✅ Use z.enum() for enums
    targetAudience: z.object({
        description: z.string(),
        alias: z.string(),
    }),
    estimatedImpact: z.object({
        confidence: z.number(),
        effort: z.enum(["low", "medium", "high"]), // ✅ Use z.enum() instead of a string
    }),
    selected: z.boolean(),
});

export const HypothesisArraySchema = z.object({
    hypotheses: z.array(MarketingHypothesisSchema), // ✅ Wrap in an object
});

export const TargetAudienceSchema = z.object({
    targetAudienceAlias: z.string(),
    targetAudienceDescription: z.string()
});