'use server';

import OpenAI from 'openai';
import { zodResponseFormat } from 'openai/helpers/zod';
import { HypothesisArraySchema, TargetAudienceSchema, totalSummarySchema } from '@/lib/store/features/newExperiment/newExperimentTypes'

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateInitialHypotheses(productName, productDescription, marketingObjective, hypothesisFeedback) {
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'Generate 3 marketing hypotheses following the given schema.' },
            {
                role: 'user', content: `Objective: ${marketingObjective} \nProduct name: ${productName} \nProduct Description: ${productDescription} \nFeedback on hypothesis: ${hypothesisFeedback}`
            }
        ],
        response_format: zodResponseFormat(HypothesisArraySchema, "hypotheses"),
    });

    // Extract and return the hypotheses array
    return completion.choices[0].message.parsed.hypotheses;
}

export async function generateTargetAudienceForHypothesis(productName, productDescription, marketingObjective, hypothesisData) {
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'Generate target audience for the marketing hypothesis following the given schema.' },
            {
                role: 'user', content: `Objective: ${marketingObjective} \nProduct name: ${productName} \nProduct Description: ${productDescription} \n HypothesisData: \n ${JSON.stringify(hypothesisData)}`
            }
        ],
        response_format: zodResponseFormat(TargetAudienceSchema, "target_audience"),
    });
    console.log('inside', completion)

    return completion.choices[0].message.parsed;
}

export async function generateSummaryForBranch(productDetails) {
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'Using the details provided below, create a summary for the marketing strategy for the given product in plain text (no markdown. only use new line)' },
            {
                role: 'user', content: `${productDetails}`
            }
        ],
    });
    console.log('inside', completion)

    return completion.choices[0].message.content;
}


export async function generateSummaryForAllBranches(productDetails) {
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'Using the details provided below for each product, create a summary for the marketing strategy for the given product in plain text (no markdown. only use new line)' },
            {
                role: 'user', content: `${productDetails}`
            }
        ],
        // response_format: zodResponseFormat(totalSummarySchema, "total_summary"),
    });
    console.log('inside', completion)

    return completion.choices[0].message.content;
    // return completion.choices[0].message.parsed;
}