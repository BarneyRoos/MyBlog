import { useEffect, useCallback } from "react";
import type { RefObject } from "react";
import type { EditorInstances } from "../types";

interface UsePreviewUpdateConfig {
  editorsRef: RefObject<EditorInstances | null>;
  previewIframeRef: RefObject<HTMLIFrameElement | null>;
  consoleOutputRef: RefObject<HTMLDivElement | null>;
  storagePrefix: string;
}

export const usePreviewUpdate = ({
  editorsRef,
  previewIframeRef,
  consoleOutputRef,
  storagePrefix,
}: UsePreviewUpdateConfig) => {
  const updatePreview = useCallback(() => {
    const { htmlEditor, cssEditor, jsEditor } = editorsRef.current || {};
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
      consoleOutputRef.current.innerHTML = "";
    }
  }, [storagePrefix]);

  // 监听编辑器变化
  useEffect(() => {
    const { htmlEditor, cssEditor, jsEditor } = editorsRef.current || {};
    if (!htmlEditor || !cssEditor || !jsEditor) return;

    const subscriptions = [
      htmlEditor.onDidChangeModelContent(updatePreview),
      cssEditor.onDidChangeModelContent(updatePreview),
      jsEditor.onDidChangeModelContent(updatePreview),
    ];

    updatePreview();

    return () => {
      subscriptions.forEach((sub) => sub?.dispose());
    };
  }, [updatePreview]);

  return { updatePreview };
};
