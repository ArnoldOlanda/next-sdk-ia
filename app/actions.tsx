'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, embed, embedMany, streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';

export async function continueConversation(messages: CoreMessage[], prompt: string) {
    
    const result = await streamText({
        model: google('models/gemini-1.5-flash'),
        system: prompt,
        messages
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}