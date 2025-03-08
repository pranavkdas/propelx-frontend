// app/actions/hypothesisActions.ts

'use server';

import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { z } from 'zod';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

type MarketingHypothesis = {
  id: string;
  hypothesis: string;
  hypothesisAlias: string;
  rationale: string;
  channels: ("meta" | "google")[];
  targetAudience: {
    description: string;
    alias: string;
  };
  estimatedImpact: {
    confidence: number;
    effort: "low" | "medium" | "high";
  };
  selected: boolean;
};


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

const HypothesisArraySchema = z.object({
  hypotheses: z.array(MarketingHypothesisSchema), // ✅ Wrap in an object
});


export async function generateInitialHypotheses(objective: string, product: string) {
  const completion = await openai.beta.chat.completions.parse({
    model: 'gpt-4o',
    messages: [
      { role: 'system', content: 'Generate marketing hypotheses following the given schema.' },
      { role: 'user', content: `Objective: ${objective}\nProduct: ${product}` }
    ],
    response_format: zodResponseFormat(HypothesisArraySchema, "hypotheses"),
  });

  // Extract and return the hypotheses array
  return completion.choices[0].message.parsed.hypotheses;
}


export async function generateMoreHypotheses(
  objective: string,
  product: string,
  feedback: string,
  existingHypotheses: MarketingHypothesis[]
) {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o",
    messages: [
      { role: "system", content: "Generate additional marketing hypotheses following the given schema." },
      { role: "user", content: `Objective: ${objective}\nProduct: ${product}\nFeedback: ${feedback}\nExisting Hypotheses: ${JSON.stringify(existingHypotheses)}` },
    ],
    response_format: zodResponseFormat(HypothesisArraySchema, "hypotheses"), // ✅ Ensure response contains `hypotheses` array
  });

  return completion.choices[0].message.parsed.hypotheses; // ✅ Extract `hypotheses` array properly
}

