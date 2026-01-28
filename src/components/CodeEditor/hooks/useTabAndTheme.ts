import { useCallback } from "react";
import type { RefObject } from "react";
import * as monaco from "monaco-editor";
import type { TabType, EditorInstances } from "../types";

interface UseTabAndThemeConfig {
  editorsRef: RefObject<EditorInstances | null>;
}

export const useTabAndTheme = ({ editorsRef }: UseTabAndThemeConfig) => {
  const handleTabChange = useCallback(
    (tab: TabType) => {
      setTimeout(() => {
        editorsRef.current?.htmlEditor?.layout();
        editorsRef.current?.cssEditor?.layout();
        editorsRef.current?.jsEditor?.layout();
      }, 0);
      return tab;
    },
    [editorsRef],
  );

  const handleThemeChange = useCallback((newTheme: string) => {
    monaco.editor.setTheme(newTheme);
    return newTheme;
  }, []);

  return { handleTabChange, handleThemeChange };
};
