// 导入 Monaco Editor
import * as monaco from "monaco-editor";

// 默认模板
const defaultHTML = `<div class="container">
  <h1>欢迎来到代码练兵场</h1>
  <p>这是一个使用 Monaco Editor 的实时编辑预览工具</p>
  <button class="btn">点击我</button>
</div>`;

const defaultCSS = `.container {
  max-width: 600px;
  margin: 40px auto;
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

const defaultJS = `// 这里编写你的 JavaScript 代码
let clickCount = 0;
document.querySelector('.btn').addEventListener('click', function() {
  clickCount++;
  const message = document.createElement('div');
  message.textContent = '✓ 你点击了按钮' + clickCount + '次';
  message.style.cssText = 'color: #27ae60; font-weight: bold; margin-top: 20px; padding: 10px; background: #ecf0f1; border-radius: 4px; text-align: center;';
  this.parentElement.appendChild(message);
  setTimeout(() => message.remove(), 1000);
});`;

// 初始化编辑器
export function initMonacoEditor() {
  // 创建编辑器实例
  const htmlEditor = monaco.editor.create(document.getElementById("htmlPane"), {
    value: localStorage.getItem("htmlCode") || defaultHTML,
    language: "html",
    theme: "vs-dark",
    fontSize: 14,
    lineNumbers: "on",
    automaticLayout: true,
    minimap: { enabled: false },
    formatOnPaste: true,
    formatOnType: true,
  });

  const cssEditor = monaco.editor.create(document.getElementById("cssPane"), {
    value: localStorage.getItem("cssCode") || defaultCSS,
    language: "css",
    theme: "vs-dark",
    fontSize: 14,
    lineNumbers: "on",
    automaticLayout: true,
    minimap: { enabled: false },
    formatOnPaste: true,
    formatOnType: true,
  });

  const jsEditor = monaco.editor.create(document.getElementById("jsPane"), {
    value: localStorage.getItem("jsCode") || defaultJS,
    language: "javascript",
    theme: "vs-dark",
    fontSize: 14,
    lineNumbers: "on",
    automaticLayout: true,
    minimap: { enabled: false },
    formatOnPaste: true,
    formatOnType: true,
  });

  const previewFrame = document.getElementById("previewFrame");
  const tabButtons = document.querySelectorAll(".tab-btn");
  const editorPanes = document.querySelectorAll(".editor-pane");
  const clearBtn = document.getElementById("clearBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const refreshBtn = document.getElementById("refreshBtn");
  const themeSelector = document.getElementById("themeSelector");

  // 标签页切换
  tabButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const tabName = e.target.dataset.tab;

      tabButtons.forEach((b) => b.classList.remove("active"));
      editorPanes.forEach((p) => p.classList.remove("active"));

      e.target.classList.add("active");
      document
        .querySelector(`.editor-pane[data-tab="${tabName}"]`)
        .classList.add("active");

      // 触发编辑器重新布局
      setTimeout(() => {
        htmlEditor.layout();
        cssEditor.layout();
        jsEditor.layout();
      }, 0);
    });
  });

  // 更新预览
  function updatePreview() {
    const html = htmlEditor.getValue();
    const css = cssEditor.getValue();
    const js = jsEditor.getValue();

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
      ${js}
    <\/script>
  </body>
</html>`;

    previewFrame.srcdoc = iframeContent;

    // 自动保存到localStorage
    localStorage.setItem("htmlCode", html);
    localStorage.setItem("cssCode", css);
    localStorage.setItem("jsCode", js);
  }

  // 监听编辑器内容变化
  htmlEditor.onDidChangeModelContent(updatePreview);
  cssEditor.onDidChangeModelContent(updatePreview);
  jsEditor.onDidChangeModelContent(updatePreview);

  // 主题切换
  if (themeSelector) {
    themeSelector.addEventListener("change", (e) => {
      const theme = e.target.value;
      monaco.editor.setTheme(theme);
    });
  }

  // 清空所有
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      if (confirm("确定要清空所有代码吗？")) {
        htmlEditor.setValue("");
        cssEditor.setValue("");
        jsEditor.setValue("");
        localStorage.removeItem("htmlCode");
        localStorage.removeItem("cssCode");
        localStorage.removeItem("jsCode");
        updatePreview();
      }
    });
  }

  // 下载代码
  if (downloadBtn) {
    downloadBtn.addEventListener("click", () => {
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
    refreshBtn.addEventListener("click", updatePreview);
  }

  // 初始化预览
  updatePreview();

  // 快捷键：Ctrl+S 下载
  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.key === "s") {
      e.preventDefault();
      downloadBtn.click();
    }
  });
}

// 确保DOM加载完成后初始化
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMonacoEditor);
} else {
  initMonacoEditor();
}
