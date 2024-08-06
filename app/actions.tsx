'use server';

import { createStreamableValue } from 'ai/rsc';
import { CoreMessage, embed, embedMany, streamText, tool } from 'ai';
import { google } from '@ai-sdk/google';
import { mistral } from '@ai-sdk/mistral';
import { z } from 'zod';
import { Embedding } from '@/interfaces';

export async function continueConversation(messages: CoreMessage[], prompt: string) {
    
    const result = await streamText({
        model: google('models/gemini-1.5-flash'),
        system: prompt,
        messages
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}

const embeddingModel = mistral.embedding('mistral-embed')

const cosineDistance = (a: number[], b: number[]): number => {
    const dotProduct = a.reduce((sum, ai, i) => sum + ai * b[i], 0);
    const magnitudeA = Math.sqrt(a.reduce((sum, ai) => sum + ai * ai, 0));
    const magnitudeB = Math.sqrt(b.reduce((sum, bi) => sum + bi * bi, 0));
    return 1 - dotProduct / (magnitudeA * magnitudeB);
  };
  

const CHUNK_SIZE = 2048;

const generateChunks = (input: string, chunkSize: number = CHUNK_SIZE): string[] => {
    const chunks: string[] = [];
    for (let i = 0; i < input.length; i += chunkSize) {
        chunks.push(input.slice(i, i + chunkSize));
    }
    console.log(chunks);
    return chunks;
};
  

export const generateEmbeddings = async (value: string,): Promise<Array<Embedding>> => {
  const chunks = generateChunks(value);
  const { embeddings } = await embedMany({
    model: embeddingModel,
    values: [value],
  });
  return embeddings.map((e, i) => ({ content: chunks[i], embedding: e }));
};

export const generateEmbedding = async (value: string): Promise<number[]> => {
  const input = value.replaceAll('\\n', ' ');
  const { embedding } = await embed({
    model: embeddingModel,
    value: input,
  });
  return embedding;
};

const findRelevantContent = async (userQuery: string, embeddings: Embedding[]) => {
    const userQueryEmbedded = await generateEmbedding(userQuery);
  
    const calculateSimilarity = (embedding: number[]) => {
      return 1 - cosineDistance(embedding, userQueryEmbedded);
    };
  
    const similarGuides = embeddings
      .map(e => ({
        content: e.content,
        similarity: calculateSimilarity(e.embedding),
      }))
      .filter(e => e.similarity > 0.5)
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 4);
  
    return similarGuides;
};

export async function ragResponse(messages: CoreMessage[], prompt: string, embeddings: Embedding[]) {
    
    const result = await streamText({
        model: google('models/gemini-1.5-flash'),
        messages,
        system: prompt,
        tools:{
            getInformation: tool({
                description: `get information from your knowledge base to answer questions.`,
                parameters: z.object({
                  question: z.string().describe('the users question'),
                }),
                execute: async ({ question }) => findRelevantContent(question, embeddings),
              }),
        }
        
    });

    const stream = createStreamableValue(result.textStream);
    return stream.value;
}