'use client';

import MonacoEditor from '@monaco-editor/react';
import useCodeStore from '@/stores/code-store';

export default function Editor() {
  const { setCode } = useCodeStore();

  const handleEditorChange = (value: string | undefined) => {
    if (value) {
      setCode(value);
    }
  };

  return (
    <div>
      <MonacoEditor
        onChange={handleEditorChange}
        height={500}
        language='typescript'
        theme='vs-dark'
      />
    </div>
  );
}
