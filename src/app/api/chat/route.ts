import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export async function POST(request: Request) {
  const body = await request.json();
  const messages: ChatMessage[] = body?.messages ?? [];
  const systemPrompt: string = body?.systemPrompt ?? "You are an AI assistant for Aavkar Intelligence.";

  if (!process.env.OPENAI_API_KEY) {
    return NextResponse.json(
      { message: "OpenAI API key missing." },
      { status: 500 }
    );
  }

  try {
    const completion = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map((msg) => ({ role: msg.role, content: msg.content })),
        ],
        temperature: 0.5,
        max_tokens: 256,
      }),
    });

    const data = await completion.json();
    const content = data?.choices?.[0]?.message?.content ?? "I couldn't find an answer just now.";

    return NextResponse.json({ message: content });
  } catch (error) {
    console.error("OpenAI request failed", error);
    return NextResponse.json({ message: "Sorry, I’m having trouble right now." }, { status: 500 });
  }
}
