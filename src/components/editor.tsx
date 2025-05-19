'use client';

import MonacoEditor from '@monaco-editor/react';
import useCodeStore from '@/stores/code-store';
import LanguageSelect from './language-select';
import PrioritySelect from './priority-select';
import ActionSelect from './action-select';

export default function Editor() {
  const { setCode, language } = useCodeStore();

  const handleEditorChange = (value?: string) => {
    setCode(value || null);
  };

  return (
    <div className='w-full'>
      <div className='flex justify-between items-center mb-4'>
        <LanguageSelect />
        <div className='flex items-center gap-2'>
          <ActionSelect />
          <span className='text-xs'>the code and focus on</span>
          <PrioritySelect />
        </div>
      </div>
      <div className='rounded-md overflow-hidden'>
        <MonacoEditor
          onChange={handleEditorChange}
          height={500}
          language={language}
          theme='vs-dark'
          options={{
            minimap: { enabled: false },
            scrollbar: {
              vertical: 'hidden',
              horizontal: 'hidden',
            },
            padding: {
              top: 16,
              left: 16,
              right: 16,
            },
            fontFamily: 'var(--font-geist-mono)',
            fontSize: 16,
          }}
        />
      </div>
    </div>
  );
}
