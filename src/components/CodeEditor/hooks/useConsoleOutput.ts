import { useEffect } from "react";
import type { RefObject } from "react";

interface UseConsoleOutputConfig {
  consoleOutputRef: RefObject<HTMLDivElement | null>;
  previewIframeRef: RefObject<HTMLIFrameElement | null>;
}

export const useConsoleOutput = ({
  consoleOutputRef,
  previewIframeRef,
}: UseConsoleOutputConfig) => {
  // 监听 iframe 的 console 消息
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (e.data.type === "console" && consoleOutputRef.current) {
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

        consoleOutputRef.current.appendChild(logDiv);
        consoleOutputRef.current.scrollTop =
          consoleOutputRef.current.scrollHeight;
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  const handleConsoleClear = () => {
    if (consoleOutputRef.current) {
      consoleOutputRef.current.innerHTML = "";
    }
    previewIframeRef.current?.contentWindow?.postMessage(
      { type: "console-clear" },
      "*",
    );
  };

  return { handleConsoleClear };
};
