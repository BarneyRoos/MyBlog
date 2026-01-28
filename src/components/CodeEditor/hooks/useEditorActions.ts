import { useCallback } from "react";
import type { RefObject } from "react";
import type { EditorInstances } from "../types";

interface UseEditorActionsConfig {
  editorsRef: RefObject<EditorInstances | null>;
  storagePrefix: string;
  updatePreview: () => void;
}

export const useEditorActions = ({
  editorsRef,
  storagePrefix,
  updatePreview,
}: UseEditorActionsConfig) => {
  const handleClearAll = useCallback(() => {
    if (confirm("确定要清空所有代码吗？")) {
      const { htmlEditor, cssEditor, jsEditor } = editorsRef.current || {};
      if (htmlEditor && cssEditor && jsEditor) {
        htmlEditor.setValue("");
        cssEditor.setValue("");
        jsEditor.setValue("");
        localStorage.removeItem(`${storagePrefix}htmlCode`);
        localStorage.removeItem(`${storagePrefix}cssCode`);
        localStorage.removeItem(`${storagePrefix}jsCode`);
        updatePreview();
      }
    }
  }, [storagePrefix, updatePreview, editorsRef]);

  const handleDownload = useCallback(() => {
    const { htmlEditor, cssEditor, jsEditor } = editorsRef.current || {};
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
  }, [editorsRef]);

  return { handleClearAll, handleDownload };
};
