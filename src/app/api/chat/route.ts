import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.message) {
    return NextResponse.json({ error: 'Message is required' }, { status: 400 });
  }

  if (!body.code) {
    return NextResponse.json({ error: 'Code is required' }, { status: 400 });
  }

  if (!body.action) {
    return NextResponse.json({ error: 'Action is required' }, { status: 400 });
  }

  if (!body.priority) {
    return NextResponse.json(
      { error: 'Priority is required' },
      { status: 400 }
    );
  }

  if (!body.language) {
    return NextResponse.json(
      { error: 'Language is required' },
      { status: 400 }
    );
  }

  console.log(body.priority);

  const prompt = `
  You are a helpful assistant that can help with code.
  You are given a code and a message.
  You need to help the user with the code.
  You should ${body.action} the code with the focus on ${body.priority} and nothing else than that.
  The code is:
  ${body.code}
  The language is:
  ${body.language}
  The message is:
  ${body.message}

  The response should highlight critical parts of the code and explain the problem for each critical line.
  The response should be structured as the line of the code followed by the explanation for the problem and the solution.
  `;

  try {
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

    if (!ollamaResponse.ok) {
      throw new Error(`Ollama API error: ${ollamaResponse.statusText}`);
    }

    const transformStream = new TransformStream({
      transform(chunk, controller) {
        const text = new TextDecoder().decode(chunk);
        const lines = text.split('\n').filter(Boolean);

        for (const line of lines) {
          try {
            const json = JSON.parse(line);
            if (json.message?.content) {
              controller.enqueue(
                new TextEncoder().encode(`data: ${JSON.stringify(json)}\n\n`)
              );
            }
          } catch (e) {
            console.error('Error parsing Ollama response: ', e);
          }
        }
      },
    });

    return new NextResponse(ollamaResponse.body?.pipeThrough(transformStream), {
      headers: {
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        Connection: 'keep-alive',
      },
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
