import { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { defaultHTML, defaultCSS, defaultJS } from "../utils/editorUtils";
import type { EditorInstances, ContainerRefs } from "../types";

interface UseCodeEditorConfig {
  storagePrefix: string;
  theme: string;
}

export const useCodeEditor = ({
  storagePrefix,
  theme,
}: UseCodeEditorConfig) => {
  const editorsRef = useRef<EditorInstances>({
    htmlEditor: null,
    cssEditor: null,
    jsEditor: null,
  });

  const containerRefs = useRef<ContainerRefs>({
    html: null,
    css: null,
    js: null,
  });

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
      language: "html",
      theme,
      fontSize: 13,
      lineNumbers: "on",
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    });

    const cssEditor = monaco.editor.create(containerRefs.current.css, {
      value: localStorage.getItem(cssStorageKey) || defaultCSS,
      language: "css",
      theme,
      fontSize: 13,
      lineNumbers: "on",
      automaticLayout: true,
      minimap: { enabled: false },
      formatOnPaste: true,
      formatOnType: true,
    });

    const jsEditor = monaco.editor.create(containerRefs.current.js, {
      value: localStorage.getItem(jsStorageKey) || defaultJS,
      language: "javascript",
      theme,
      fontSize: 13,
      lineNumbers: "on",
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

  return { editorsRef, containerRefs };
};
