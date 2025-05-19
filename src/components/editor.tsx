'use client';

import MonacoEditor from '@monaco-editor/react';
import useCodeStore from '@/stores/code-store';
import LanguageSelect from './language-select';

export default function Editor() {
  const { setCode, language } = useCodeStore();

  const handleEditorChange = (value?: string) => {
    setCode(value || null);
  };

  return (
    <div className='w-full'>
      <LanguageSelect />
      <MonacoEditor
        onChange={handleEditorChange}
        height={500}
        language={language}
        theme='vs-dark'
      />
    </div>
  );
}
