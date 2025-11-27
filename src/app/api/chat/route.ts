import { google } from '@ai-sdk/google';
import { streamText } from 'ai';
import { getContext } from '@/lib/rag';

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Get the last user message
    const lastMessage = messages[messages.length - 1];
    const userQuery = lastMessage.content;

    // Retrieve context (RAG)
    const context = await getContext(userQuery);

    const systemPrompt = `You are Aavkar’s applied AI assistant. You are helpful, professional, and knowledgeable about Aavkar Intelligence's services.
    
    Aavkar Intelligence designs AI-native workflows, copilots, and digital employees for creative, learning, health, and operations teams.
    
    Tone: Futuristic, professional, yet accessible.
    
    ${context ? `\nRELEVANT CONTEXT FROM KNOWLEDGE BASE:\n${context}\n\nUse this context to answer the user's question accurately.` : ''}
    `;

    const result = await streamText({
        model: google('gemini-1.5-pro-latest') as any,
        system: systemPrompt,
        messages: messages,
    });

    return result.toDataStreamResponse();
}
