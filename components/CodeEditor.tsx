import React from 'react';
import Editor from '@monaco-editor/react';
import { useInterviewStore } from '@/store/interviewStore';

export function CodeEditor() {
  const { code, setCode, language } = useInterviewStore();

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  return (
    <div className="h-full w-full overflow-hidden border border-border rounded-md">
      <Editor
        height="100%"
        language={language}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          automaticLayout: true,
        }}
      />
    </div>
  );
}