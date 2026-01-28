import * as monaco from "monaco-editor";

export interface CodeEditorProps {
  storagePrefix?: string;
}

export interface EditorInstances {
  htmlEditor: monaco.editor.IStandaloneCodeEditor | null;
  cssEditor: monaco.editor.IStandaloneCodeEditor | null;
  jsEditor: monaco.editor.IStandaloneCodeEditor | null;
}

export interface ContainerRefs {
  html: HTMLDivElement | null;
  css: HTMLDivElement | null;
  js: HTMLDivElement | null;
}

export type TabType = "html" | "css" | "js";
