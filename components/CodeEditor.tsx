import React from 'react';
import Editor from '@monaco-editor/react';
import { useInterviewStore } from '@/store/interviewStore';

export function CodeEditor() {
  const { code, setCode, language, problem, isLoadingProblem } = useInterviewStore();

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setCode(value);
    }
  };

  const getMonacoLanguage = (lang: string) => {
    switch (lang) {
      case 'cpp': return 'cpp';
      case 'javascript': return 'javascript';
      case 'python': return 'python';
      case 'java': return 'java';
      default: return 'cpp';
    }
  };

  if (isLoadingProblem) {
    return (
      <div className="h-full w-full flex items-center justify-center border border-border rounded-md">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-sm text-muted-foreground">Loading problem...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full w-full overflow-hidden border border-border rounded-md">
      <div className="bg-muted px-3 py-2 text-sm text-muted-foreground border-b">
        <span className="font-medium">
          {problem?.title || 'Code Editor'} - {language.toUpperCase()}
        </span>
        <span className="ml-2 text-xs">
          Write only the function implementation. Test runner will be added automatically.
        </span>
      </div>
      <Editor
        height="calc(100% - 40px)"
        language={getMonacoLanguage(language)}
        value={code}
        onChange={handleEditorChange}
        theme="vs-dark"
        options={{
          minimap: { enabled: false },
          fontFamily: 'Fira Code, monospace',
          fontLigatures: true,
          fontSize: 14,
          wordWrap: 'on',
          scrollBeyondLastLine: false,
          lineNumbers: 'on',
          glyphMargin: false,
          folding: true,
          automaticLayout: true,
          suggestOnTriggerCharacters: true,
          quickSuggestions: true,
          parameterHints: { enabled: true },
        }}
      />
    </div>
  );
}
