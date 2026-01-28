import React from 'react';
import type { RefObject } from 'react';
import type { TabType, ContainerRefs } from './types';

interface EditorPanelProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  containerRefs: RefObject<ContainerRefs | null>;
  theme: string;
  onThemeChange: (theme: string) => void;
  onClearAll: () => void;
  onDownload: () => void;
}

const EditorPanel: React.FC<EditorPanelProps> = ({
  activeTab,
  onTabChange,
  containerRefs,
  theme,
  onThemeChange,
  onClearAll,
  onDownload,
}) => {
  const handleTabClick = (tab: TabType) => {
    onTabChange(tab);
  };

  return (
    <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden flex-1">
      {/* Tab Buttons */}
      <div className="flex border-b-2 border-gray-200 bg-gray-50">
        {(['html', 'css', 'js'] as TabType[]).map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`tab-btn flex-1 px-4 py-3 border-none bg-transparent cursor-pointer text-sm font-medium transition-all ${activeTab === tab
              ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
              : 'text-gray-500 border-b-2 border-transparent hover:bg-gray-200'
              }`}
          >
            {tab.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Editor Containers */}
      <div className="flex-1 relative overflow-hidden bg-gray-100">
        <div
          ref={(el) => {
            if (containerRefs.current) {
              containerRefs.current.html = el;
            }
          }}
          className={`absolute inset-0 ${activeTab === 'html' ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          style={{ transition: 'opacity 0.3s' }}
        />
        <div
          ref={(el) => {
            if (containerRefs.current) {
              containerRefs.current.css = el;
            }
          }}
          className={`absolute inset-0 ${activeTab === 'css' ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          style={{ transition: 'opacity 0.3s' }}
        />
        <div
          ref={(el) => {
            if (containerRefs.current) {
              containerRefs.current.js = el;
            }
          }}
          className={`absolute inset-0 ${activeTab === 'js' ? 'opacity-100 visible' : 'opacity-0 invisible'
            }`}
          style={{ transition: 'opacity 0.3s' }}
        />
      </div>

      {/* Toolbar */}
      <div className="flex gap-2.5 px-4 py-3 border-t border-gray-200 bg-gray-50 items-center">
        <select
          value={theme}
          onChange={(e) => onThemeChange(e.target.value)}
          className="px-2.5 py-1.5 border border-gray-400 rounded bg-white text-slate-800 cursor-pointer text-xs transition-all hover:border-blue-500"
        >
          <option value="vs">Light</option>
          <option value="vs-dark">Dark</option>
          <option value="hc-black">High Contrast</option>
        </select>
        <button
          onClick={onClearAll}
          className="px-3.5 py-2 border border-gray-400 bg-white rounded cursor-pointer text-sm transition-all hover:bg-red-500 hover:text-white hover:border-red-500"
        >
          清空所有
        </button>
        <button
          onClick={onDownload}
          className="px-3.5 py-2 border border-gray-400 bg-white rounded cursor-pointer text-sm transition-all hover:bg-green-600 hover:text-white hover:border-green-600"
        >
          下载代码
        </button>
        <span className="ml-auto text-xs text-gray-400">自动保存中...</span>
      </div>
    </div>
  );
};

export default EditorPanel;
