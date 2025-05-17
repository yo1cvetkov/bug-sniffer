import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  const ollamaResponse = await fetch('http://localhost:11434/api/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'llama3',
      stream: true,
      messages: [
        {
          role: 'user',
          content: body.message,
        },
      ],
    }),
  });

  return new NextResponse(ollamaResponse.body, {
    headers: {
      'Content-Type': 'text/event-stream',
    },
  });
}
