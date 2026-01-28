import React, { useRef, useState } from 'react';
import { useCodeEditor } from './hooks/useCodeEditor';
import { usePreviewUpdate } from './hooks/usePreviewUpdate';
import { useConsoleOutput } from './hooks/useConsoleOutput';
import { useEditorActions } from './hooks/useEditorActions';
import { useTabAndTheme } from './hooks/useTabAndTheme';
import type { CodeEditorProps, TabType } from './types';
import EditorPanel from './EditorPanel';
import PreviewPanel from './PreviewPanel';
import ConsolePanel from './ConsolePanel';

const CodeEditor: React.FC<CodeEditorProps> = ({ storagePrefix = '' }) => {
  const [activeTab, setActiveTab] = useState<TabType>('html');
  const [theme, setTheme] = useState('vs-dark');

  const previewIframeRef = useRef<HTMLIFrameElement | null>(null);
  const consoleOutputRef = useRef<HTMLDivElement | null>(null);

  const { editorsRef, containerRefs } = useCodeEditor({
    storagePrefix,
    theme,
  });

  const { updatePreview } = usePreviewUpdate({
    editorsRef,
    previewIframeRef,
    consoleOutputRef,
    storagePrefix,
  });

  const { handleConsoleClear } = useConsoleOutput({
    consoleOutputRef,
    previewIframeRef,
  });

  const { handleClearAll, handleDownload } = useEditorActions({
    editorsRef,
    storagePrefix,
    updatePreview,
  });

  const { handleTabChange: computeTabChange, handleThemeChange: computeThemeChange } = useTabAndTheme({
    editorsRef,
  });

  // 状态更新的包装函数
  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    computeTabChange(tab);
  };

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
    computeThemeChange(newTheme);
  };

  const handleRefresh = () => {
    updatePreview();
  };

  return (
    <div className="flex flex-row gap-1 h-full">
      {/* Left: Editor Section */}
      <EditorPanel
        activeTab={activeTab}
        onTabChange={handleTabChange}
        containerRefs={containerRefs}
        theme={theme}
        onThemeChange={handleThemeChange}
        onClearAll={handleClearAll}
        onDownload={handleDownload}
      />

      {/* Right: Preview and Console Section */}
      <div className="flex flex-col gap-1 flex-1">
        <PreviewPanel previewIframeRef={previewIframeRef} onRefresh={handleRefresh} />
        <ConsolePanel consoleOutputRef={consoleOutputRef} onClear={handleConsoleClear} />
      </div>
    </div>
  );
};

export default CodeEditor;
