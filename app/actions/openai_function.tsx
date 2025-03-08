"use server";

import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY!,
});


export async function generateSummary(user_input: string) {
    const completion = await openai.beta.chat.completions.parse({
        model: 'gpt-4o',
        messages: [
            { role: 'system', content: 'Generate copy to be given to a creative agency of the following selected hypothesis' },
            { role: 'user', content: `${user_input}` }
        ],
    });

    // Extract and return the hypotheses array
    return completion.choices[0].message.content;
}