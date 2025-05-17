'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import useCodeStore from '@/stores/code-store';
import { toast } from 'sonner';

export default function Chat() {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const { code } = useCodeStore();

  const handleSubmit = async () => {
    if (!code) {
      toast.error('Some code must be provided');
      return;
    }

    setResponse('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      body: JSON.stringify({ message, code }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const reader = res.body?.getReader();

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader!.read();

      if (done) break;

      const chunk = decoder.decode(value);

      try {
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          const json = JSON.parse(line);

          setResponse((prev) => prev + (json.message?.content || ''));
        }
      } catch {
        alert('Some parsing error occurred');
      }
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <textarea
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={10}
        cols={50}
        className='border rounded-md p-4'
      />
      <Button onClick={handleSubmit}>Send</Button>
      <div className='whitespace-pre-wrap mt-4'>{response}</div>
    </div>
  );
}
