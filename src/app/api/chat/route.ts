import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || 'dummy',
});

// IMPORTANT: Set the runtime to edge
export const runtime = 'edge';

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        stream: true,
        messages: [
            {
                role: 'system',
                content: `You are Aavkar’s applied AI assistant. You are helpful, professional, and knowledgeable about Aavkar Intelligence's services.
    
    Aavkar Intelligence designs AI-native workflows, copilots, and digital employees for creative, learning, health, and operations teams.
    
    Key domains:
    1. Media & Content: AI-augmented creative workbench.
    2. Education: Personalized learning paths.
    3. Healthcare & Fitness: Clinical support and coaching.
    4. Business & Enterprise: Digital employees for operations.
    
    Tone: Futuristic, professional, yet accessible.`,
            },
            ...messages,
        ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response as any);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}
