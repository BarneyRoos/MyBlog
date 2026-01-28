import React, { useEffect, useRef, useState } from 'react';
import * as monaco from 'monaco-editor';
import { defaultHTML, defaultCSS, defaultJS } from '../lib/editorUtils';

interface CodeEditorProps {
  storagePrefix?: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ storagePrefix = '' }) => {
  const [activeTab, setActiveTab] = useState('html');
  const [theme, setTheme] = useState('vs-dark');
  const editorsRef = useRef<{
    htmlEditor: monaco.editor.IStandaloneCodeEditor | null;
    cssEditor: monaco.editor.IStandaloneCodeEditor | null;
    jsEditor: monaco.editor.IStandaloneCodeEditor | null;
  }>({
    htmlEditor: null,
    cssEditor: null,
    jsEditor: null,
  });

  const containerRefs = useRef<{
    html: HTMLDivElement | null;
    css: HTMLDivElement | null;
    js: HTMLDivElement | null;
  }>({
    html: null,
    css: null,
    js: null,
  });

  const previewIframeRef = useRef<HTMLIFrameElement | null>(null);
  const consoleOutputRef = useRef<HTMLDivElement | null>(null);

  // 初始化编辑器
  useEffect(() => {
    if (
      !containerRefs.current.html ||
      !containerRefs.current.css ||
      !containerRefs.current.js
    ) {
      return;
    }

    const htmlStorageKey = `${storagePrefix}htmlCode`;
    const cssStorageKey = `${storagePrefix}cssCode`;
    const jsStorageKey = `${storagePrefix}jsCode`;

    const htmlEditor = monaco.editor.create(containerRefs.current.html, {
      value: localStorage.getItem(htmlStorageKey) || defaultHTML,
      language: 'html',
      theme,
      fontSize: 13,
      lineNumbers: 'on',
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    });

    const cssEditor = monaco.editor.create(containerRefs.current.css, {
      value: localStorage.getItem(cssStorageKey) || defaultCSS,
      language: 'css',
      theme,
      fontSize: 13,
      lineNumbers: 'on',
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    });

    const jsEditor = monaco.editor.create(containerRefs.current.js, {
      value: localStorage.getItem(jsStorageKey) || defaultJS,
      language: 'javascript',
      theme,
      fontSize: 13,
      lineNumbers: 'on',
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    });

    editorsRef.current = { htmlEditor, cssEditor, jsEditor };

    return () => {
      htmlEditor.dispose();
      cssEditor.dispose();
      jsEditor.dispose();
    };
  }, [storagePrefix, theme]);

  // 更新预览
  const updatePreview = () => {
    const { htmlEditor, cssEditor, jsEditor } = editorsRef.current;
    if (!htmlEditor || !cssEditor || !jsEditor || !previewIframeRef.current) {
      return;
    }

    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const htmlStorageKey = `${storagePrefix}htmlCode`;
    const cssStorageKey = `${storagePrefix}cssCode`;
    const jsStorageKey = `${storagePrefix}jsCode`;

    localStorage.setItem(htmlStorageKey, html);
    localStorage.setItem(cssStorageKey, css);
    localStorage.setItem(jsStorageKey, js);

    const iframeContent = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        background: #f5f5f5;
        padding: 20px;
      }
      ${css}
    </style>
  </head>
  <body>
    ${html}
    <script>
      window.addEventListener('error', function(e) {
        window.parent.postMessage({
          type: 'console',
          method: 'error',
          message: e.message,
          stack: e.stack
        }, '*');
      });

      window.addEventListener('message', function(e) {
        if (e.data.type === 'console-clear') {
          console.clear();
        }
      });

      const originalLog = console.log;
      const originalError = console.error;
      const originalWarn = console.warn;
      const originalInfo = console.info;

      console.log = function(...args) {
        originalLog.apply(console, args);
        window.parent.postMessage({
          type: 'console',
          method: 'log',
          message: args.map(arg => {
            try {
              return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            } catch (e) {
              return String(arg);
            }
          }).join(' ')
        }, '*');
      };

      console.error = function(...args) {
        originalError.apply(console, args);
        window.parent.postMessage({
          type: 'console',
          method: 'error',
          message: args.map(arg => {
            try {
              return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            } catch (e) {
              return String(arg);
            }
          }).join(' ')
        }, '*');
      };

      console.warn = function(...args) {
        originalWarn.apply(console, args);
        window.parent.postMessage({
          type: 'console',
          method: 'warn',
          message: args.map(arg => {
            try {
              return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            } catch (e) {
              return String(arg);
            }
          }).join(' ')
        }, '*');
      };

      console.info = function(...args) {
        originalInfo.apply(console, args);
        window.parent.postMessage({
          type: 'console',
          method: 'info',
          message: args.map(arg => {
            try {
              return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
            } catch (e) {
              return String(arg);
            }
          }).join(' ')
        }, '*');
      };

      ${js}
    <\/script>
  </body>
</html>`;

    previewIframeRef.current.srcdoc = iframeContent;

    if (consoleOutputRef.current) {
      consoleOutputRef.current.innerHTML = '';
    }
  };

  // 监听编辑器变化
  useEffect(() => {
    const { htmlEditor, cssEditor, jsEditor } = editorsRef.current;
    if (!htmlEditor || !cssEditor || !jsEditor) return;

    const subscriptions = [
      htmlEditor.onDidChangeModelContent(updatePreview),
      cssEditor.onDidChangeModelContent(updatePreview),
      jsEditor.onDidChangeModelContent(updatePreview),
    ];

    updatePreview();

    return () => {
      subscriptions.forEach(sub => sub.dispose());
    };
  }, []);

  // 监听 iframe 的 console 消息
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === 'console' && consoleOutputRef.current) {
        const logDiv = document.createElement('div');
        logDiv.className = `console-log console-${e.data.method}`;
        const timeStr = new Date().toLocaleTimeString('zh-CN');
        logDiv.textContent = `[${timeStr}] ${e.data.message}`;

        let color = '#f0f0f0';
        if (e.data.method === 'error') {
          color = '#ff5555';
        } else if (e.data.method === 'warn') {
          color = '#ffb86c';
        } else if (e.data.method === 'info') {
          color = '#5dade2';
        }
        logDiv.style.color = color;

        consoleOutputRef.current.appendChild(logDiv);
        consoleOutputRef.current.scrollTop = consoleOutputRef.current.scrollHeight;
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const handleThemeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTheme(e.target.value);
    monaco.editor.setTheme(e.target.value);
  };

  const handleClearAll = () => {
    if (confirm('确定要清空所有代码吗？')) {
      const { htmlEditor, cssEditor, jsEditor } = editorsRef.current;
      if (htmlEditor && cssEditor && jsEditor) {
        htmlEditor.setValue('');
        cssEditor.setValue('');
        jsEditor.setValue('');
        localStorage.removeItem(`${storagePrefix}htmlCode`);
        localStorage.removeItem(`${storagePrefix}cssCode`);
        localStorage.removeItem(`${storagePrefix}jsCode`);
        updatePreview();
      }
    }
  };

  const handleDownload = () => {
    const { htmlEditor, cssEditor, jsEditor } = editorsRef.current;
    if (!htmlEditor || !cssEditor || !jsEditor) return;

    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

    const content = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Code</title>
    <style>
${css
        .split('\n')
        .map((line) => '      ' + line)
        .join('\n')}
    </style>
  </head>
  <body>
${html
        .split('\n')
        .map((line) => '    ' + line)
        .join('\n')}
    <script>
${js
        .split('\n')
        .map((line) => '      ' + line)
        .join('\n')}
    <\/script>
  </body>
</html>`;

    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleRefresh = () => {
    updatePreview();
  };

  const handleConsoleClear = () => {
    if (consoleOutputRef.current) {
      consoleOutputRef.current.innerHTML = '';
    }
    previewIframeRef.current?.contentWindow?.postMessage({ type: 'console-clear' }, '*');
  };

  return (
    <div className="flex flex-row gap-1 h-full">
      {/* Left: Editor Section */}
      <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden flex-1">
        <div className="flex border-b-2 border-gray-200 bg-gray-50">
          {['html', 'css', 'js'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setTimeout(() => {
                  editorsRef.current.htmlEditor?.layout();
                  editorsRef.current.cssEditor?.layout();
                  editorsRef.current.jsEditor?.layout();
                }, 0);
              }}
              className={`tab-btn flex-1 px-4 py-3 border-none bg-transparent cursor-pointer text-sm font-medium transition-all ${activeTab === tab
                ? 'border-b-2 border-blue-500 text-blue-500 font-semibold'
                : 'text-gray-500 border-b-2 border-transparent hover:bg-gray-200'
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        <div className="flex-1 relative overflow-hidden bg-gray-100">
          <div
            ref={(el) => {
              containerRefs.current.html = el;
            }}
            className={`absolute inset-0 ${activeTab === 'html' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ transition: 'opacity 0.3s' }}
          />
          <div
            ref={(el) => {
              containerRefs.current.css = el;
            }}
            className={`absolute inset-0 ${activeTab === 'css' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ transition: 'opacity 0.3s' }}
          />
          <div
            ref={(el) => {
              containerRefs.current.js = el;
            }}
            className={`absolute inset-0 ${activeTab === 'js' ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
            style={{ transition: 'opacity 0.3s' }}
          />
        </div>

        <div className="flex gap-2.5 px-4 py-3 border-t border-gray-200 bg-gray-50 items-center">
          <select
            value={theme}
            onChange={handleThemeChange}
            className="px-2.5 py-1.5 border border-gray-400 rounded bg-white text-slate-800 cursor-pointer text-xs transition-all hover:border-blue-500"
          >
            <option value="vs">Light</option>
            <option value="vs-dark">Dark</option>
            <option value="hc-black">High Contrast</option>
          </select>
          <button
            onClick={handleClearAll}
            className="px-3.5 py-2 border border-gray-400 bg-white rounded cursor-pointer text-sm transition-all hover:bg-red-500 hover:text-white hover:border-red-500"
          >
            清空所有
          </button>
          <button
            onClick={handleDownload}
            className="px-3.5 py-2 border border-gray-400 bg-white rounded cursor-pointer text-sm transition-all hover:bg-green-600 hover:text-white hover:border-green-600"
          >
            下载代码
          </button>
          <span className="ml-auto text-xs text-gray-400">自动保存中...</span>
        </div>
      </div>

      {/* Right: Preview and Console Section */}
      <div className="flex flex-col gap-1 flex-1">
        {/* Preview */}
        <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden flex-1">
          <div className="flex justify-between items-center px-4 py-1 border-b border-gray-200 bg-gray-50">
            <h3 className="m-0 text-slate-800 text-sm font-medium">预览</h3>
            <button
              onClick={handleRefresh}
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

        {/* Console */}
        <div className="flex flex-col bg-white rounded-lg shadow overflow-hidden h-48">
          <div className="flex justify-between items-center px-3 py-2 border-b border-gray-200 bg-gray-100">
            <h3 className="m-0 text-gray-800 text-xs font-semibold uppercase">控制台</h3>
            <button
              onClick={handleConsoleClear}
              className="px-2 py-1 border border-gray-300 bg-white rounded text-xs cursor-pointer transition-all hover:bg-gray-100 hover:border-gray-400"
              title="清空控制台"
            >
              清空
            </button>
          </div>
          <div
            ref={consoleOutputRef}
            className="flex-1 overflow-y-auto px-3 py-2 font-mono text-sm leading-relaxed bg-[#2c3e50]"
            style={{ letterSpacing: '0.3px' }}
          />
        </div>
      </div>

      <style>{`
        .editor-pane.active {
          opacity: 1 !important;
          visibility: visible !important;
        }

        .editor-pane:not(.active) {
          opacity: 0 !important;
          visibility: hidden !important;
        }

        .console-log {
          color: #f0f0f0 !important;
          margin: 2px 0 !important;
          padding: 0 !important;
          word-break: break-all;
          font-weight: 500 !important;
        }

        .console-log.console-error {
          color: #ff5555 !important;
          font-weight: 600 !important;
        }

        .console-log.console-warn {
          color: #ffb86c !important;
          font-weight: 600 !important;
        }

        .console-log.console-info {
          color: #5dade2 !important;
          font-weight: 500 !important;
        }
      `}</style>
    </div>
  );
};

export default CodeEditor;
