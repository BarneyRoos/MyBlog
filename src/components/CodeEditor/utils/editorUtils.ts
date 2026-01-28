import * as monaco from "monaco-editor";

export const defaultHTML = `<div class="container">
  <h1>欢迎来到代码练兵场</h1>
  <p>这是一个使用 Monaco Editor 的实时编辑预览工具</p>
  <button class="btn">点击我</button>
</div>`;

export const defaultCSS = `.container {
  max-width: 100%;
  margin: 0;
  padding: 20px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  text-align: center;
}

h1 {
  color: #2c3e50;
  margin-bottom: 10px;
}

p {
  color: #7f8c8d;
  margin-bottom: 20px;
}

.btn {
  padding: 10px 20px;
  background: #3498db;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  transition: background 0.3s;
}

.btn:hover {
  background: #2980b9;
}`;

export const defaultJS = `// 这里编写你的 JavaScript 代码
let clickCount = 0;
document.querySelector('.btn').addEventListener('click', function() {
  clickCount++;
  const message = document.createElement('div');
  message.textContent = '✓ 你点击了按钮' + clickCount + '次';
  console.log('按钮被点击了 ' + clickCount + ' 次');
  message.style.cssText = 'color: #27ae60; font-weight: bold; margin-top: 20px; padding: 10px; background: #ecf0f1; border-radius: 4px; text-align: center;';
  this.parentElement.appendChild(message);
  setTimeout(() => message.remove(), 1000);
});`;

export interface EditorConfig {
  htmlPaneId: string;
  cssPaneId: string;
  jsPaneId: string;
  previewFrameId: string;
  consoleOutputId: string;
  themeId: string;
  clearBtnId: string;
  downloadBtnId: string;
  refreshBtnId: string;
  consoleClearBtnId: string;
  storagePrefix?: string;
}

export interface EditorInstances {
  htmlEditor: monaco.editor.IStandaloneCodeEditor;
  cssEditor: monaco.editor.IStandaloneCodeEditor;
  jsEditor: monaco.editor.IStandaloneCodeEditor;
}

export function createEditors(config: EditorConfig): EditorInstances {
  const storagePrefix = config.storagePrefix || "";
  const htmlStorageKey = `${storagePrefix}htmlCode`;
  const cssStorageKey = `${storagePrefix}cssCode`;
  const jsStorageKey = `${storagePrefix}jsCode`;

  const htmlEditor = monaco.editor.create(
    document.getElementById(config.htmlPaneId)!,
    {
      value: localStorage.getItem(htmlStorageKey) || defaultHTML,
      language: "html",
      theme: "vs-dark",
      fontSize: 13,
      lineNumbers: "on",
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    },
  );

  const cssEditor = monaco.editor.create(
    document.getElementById(config.cssPaneId)!,
    {
      value: localStorage.getItem(cssStorageKey) || defaultCSS,
      language: "css",
      theme: "vs-dark",
      fontSize: 13,
      lineNumbers: "on",
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    },
  );

  const jsEditor = monaco.editor.create(
    document.getElementById(config.jsPaneId)!,
    {
      value: localStorage.getItem(jsStorageKey) || defaultJS,
      language: "javascript",
      theme: "vs-dark",
      fontSize: 13,
      lineNumbers: "on",
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    },
  );

  return { htmlEditor, cssEditor, jsEditor };
}

export function setupEditorListeners(
  config: EditorConfig,
  editors: EditorInstances,
  updatePreviewCallback: () => void,
) {
  const tabButtons = document.querySelectorAll(`.tab-btn`);
  const editorPanes = document.querySelectorAll(".editor-pane");
  const clearBtn = document.getElementById(config.clearBtnId);
  const downloadBtn = document.getElementById(config.downloadBtnId);
  const refreshBtn = document.getElementById(config.refreshBtnId);
  const themeSelector = document.getElementById(
    config.themeId,
  ) as HTMLSelectElement;
  const consoleClearBtn = document.getElementById(config.consoleClearBtnId);
  const consoleOutput = document.getElementById(config.consoleOutputId);
  const previewFrame = document.getElementById(
    config.previewFrameId,
  ) as HTMLIFrameElement;

  const storagePrefix = config.storagePrefix || "";
  const htmlStorageKey = `${storagePrefix}htmlCode`;
  const cssStorageKey = `${storagePrefix}cssCode`;
  const jsStorageKey = `${storagePrefix}jsCode`;

  // 标签页切换
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      const tabName = target?.dataset?.tab;

      tabButtons.forEach((b) => b.classList.remove("active"));
      editorPanes.forEach((p) => p.classList.remove("active"));

      target.classList.add("active");
      document
        .querySelector(`.editor-pane[data-tab="${tabName}"]`)
        ?.classList.add("active");

      setTimeout(() => {
        editors.htmlEditor.layout();
        editors.cssEditor.layout();
        editors.jsEditor.layout();
      }, 0);
    });
  });

  // 监听编辑器内容变化
  editors.htmlEditor.onDidChangeModelContent(updatePreviewCallback);
  editors.cssEditor.onDidChangeModelContent(updatePreviewCallback);
  editors.jsEditor.onDidChangeModelContent(updatePreviewCallback);

  // 主题切换
  if (themeSelector) {
    themeSelector.addEventListener("change", (e) => {
      const theme = (e.target as HTMLSelectElement).value;
      monaco.editor.setTheme(theme);
    });
  }

  // 清空所有
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("确定要清空所有代码吗？")) {
        editors.htmlEditor.setValue("");
        editors.cssEditor.setValue("");
        editors.jsEditor.setValue("");
        localStorage.removeItem(htmlStorageKey);
        localStorage.removeItem(cssStorageKey);
        localStorage.removeItem(jsStorageKey);
        updatePreviewCallback();
      }
    });
  }

  // 下载代码
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
      const html = editors.htmlEditor.getValue();
      const css = editors.cssEditor.getValue();
      const js = editors.jsEditor.getValue();

      const content = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Code</title>
    <style>
${css
  .split("\n")
  .map((line) => "      " + line)
  .join("\n")}
    </style>
  </head>
  <body>
${html
  .split("\n")
  .map((line) => "    " + line)
  .join("\n")}
    <script>
${js
  .split("\n")
  .map((line) => "      " + line)
  .join("\n")}
    <\/script>
  </body>
</html>`;

      const blob = new Blob([content], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "index.html";
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  // 刷新预览
  if (refreshBtn) {
    refreshBtn.addEventListener("click", updatePreviewCallback);
  }

  // Console清除
  if (consoleClearBtn) {
    consoleClearBtn.addEventListener("click", () => {
      if (consoleOutput) {
        consoleOutput.innerHTML = "";
      }
      previewFrame?.contentWindow?.postMessage({ type: "console-clear" }, "*");
    });
  }

  // 监听iframe的console消息
  window.addEventListener("message", (e) => {
    if (e.data.type === "console" && consoleOutput) {
      const logDiv = document.createElement("div");
      logDiv.className = `console-log console-${e.data.method}`;
      const timeStr = new Date().toLocaleTimeString("zh-CN");
      logDiv.textContent = `[${timeStr}] ${e.data.message}`;

      let color = "#f0f0f0";
      if (e.data.method === "error") {
        color = "#ff5555";
      } else if (e.data.method === "warn") {
        color = "#ffb86c";
      } else if (e.data.method === "info") {
        color = "#5dade2";
      }
      logDiv.style.color = color;

      consoleOutput.appendChild(logDiv);
      consoleOutput.scrollTop = consoleOutput.scrollHeight;
    }
  });
}

export function generatePreviewHTML(
  html: string,
  css: string,
  js: string,
): string {
  return `<!DOCTYPE html>
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
}

export function setupCompleteEditor(config: EditorConfig): EditorInstances {
  const editors = createEditors(config);
  const previewFrame = document.getElementById(
    config.previewFrameId,
  ) as HTMLIFrameElement;
  const consoleOutput = document.getElementById(
    config.consoleOutputId,
  ) as HTMLElement;

  function updatePreview() {
    const html = editors.htmlEditor.getValue();
    const css = editors.cssEditor.getValue();
    const js = editors.jsEditor.getValue();

    const iframeContent = generatePreviewHTML(html, css, js);
    previewFrame.srcdoc = iframeContent;

    const storagePrefix = config.storagePrefix || "";
    localStorage.setItem(`${storagePrefix}htmlCode`, html);
    localStorage.setItem(`${storagePrefix}cssCode`, css);
    localStorage.setItem(`${storagePrefix}jsCode`, js);

    if (consoleOutput) {
      consoleOutput.innerHTML = "";
    }
  }

  setupEditorListeners(config, editors, updatePreview);
  updatePreview();

  return editors;
}
