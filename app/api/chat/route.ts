import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';
import { NextRequest } from 'next/server';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const payload: OpenAI.Chat.Completions.ChatCompletionCreateParams = {
    model: 'gpt-4o',
    stream: true,
    messages,
  };

  const stream = OpenAIStream(payload, {
    apiKey: process.env.OPENAI_API_KEY!,
  });

  return new StreamingTextResponse(stream);
}
