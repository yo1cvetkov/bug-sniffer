import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  if (!body.code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  const prompt = `
  You are a helpful assistant that can help with code.
  You are given a code and a message.
  You need to help the user with the code.
  The code is:
  ${body.code}
  The message is:
  ${body.message}

  The response should highlight critical parts of the code and explain the problem for each critical line.
  The response should be structured as the line of the code followed by the explanation for the problem and the solution.
  `;

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
          content: prompt,
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
