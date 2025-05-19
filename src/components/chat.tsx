'use client';

import { useState } from 'react';
import { Button } from './ui/button';
import useCodeStore from '@/stores/code-store';
import { toast } from 'sonner';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

export default function Chat() {
  const [message, setMessage] = useState<string>('');
  const [response, setResponse] = useState<string>('');

  const { code, language, action, priority } = useCodeStore();

  const handleSubmit = async () => {
    if (!code) {
      toast.error('Some code must be provided');
      return;
    }

    setResponse('');

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        body: JSON.stringify({ message, code, language, action, priority }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Failed to get the response! HTTP error');
      }

      const reader = res.body?.getReader();

      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader!.read();

        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split('\n').filter(Boolean);

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const json = JSON.parse(line.slice(6));

              if (json.message?.content) {
                setResponse((prev) => prev + json.message.content);
              }
            } catch {
              alert('Some parsing error occurred');
              console.error('Problematic line:', line);
            }
          }
        }
      }
    } catch (error) {
      console.error('Failed to parse JSON: ', error);
      toast.error('Failed to get the response');
    }
  };

  return (
    <div className='flex w-full relative max-h-screen flex-col'>
      <div className='h-full overflow-y-auto py-4'>
        <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
          {response}
        </ReactMarkdown>
      </div>
      <div className='flex flex-col border-t gap-y-4 w-full  bg-white'>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={3}
          cols={50}
          className='border resize-none rounded-md p-4 mt-4'
        />
        <Button onClick={handleSubmit}>Send</Button>
      </div>
    </div>
  );
}
