import React, { RefObject } from 'react';

interface PreviewPanelProps {
  previewIframeRef: RefObject<HTMLIFrameElement | null>;
  onRefresh: () => void;
}

const PreviewPanel: React.FC<PreviewPanelProps> = ({ previewIframeRef, onRefresh }) => {
  return (
    <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden flex-1">
      <div className="flex justify-between items-center px-4 py-1 border-b border-gray-200 bg-gray-50">
        <h3 className="m-0 text-slate-800 text-sm font-medium">预览</h3>
        <button
          onClick={onRefresh}
          className="px-3 py-1.5 border border-gray-400 bg-white rounded cursor-pointer text-base transition-all hover:bg-blue-500 hover:text-white hover:border-blue-500"
          title="刷新预览"
        >
          ⟳
        </button>
      </div>
      <iframe
        ref={previewIframeRef}
        className="flex-1 border-none bg-white"
        sandbox="allow-scripts"
        title="preview"
      />
    </div>
  );
};

export default PreviewPanel;
