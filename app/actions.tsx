'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, streamText } from 'ai';
import { google } from '@ai-sdk/google';

export async function continueConversation(messages: CoreMessage[]) {
    console.log(messages)
    const result = await streamText({
        model: google('models/gemini-1.5-flash'),
        messages,
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}